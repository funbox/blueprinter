import deepEqual from 'deep-equal';
import { MESSAGE_DEFAULT_TITLE, STANDARD_TYPES } from 'app/constants/defaults';
import { get, getSourceElementIndexByType, getBody, getSchema, getDescription } from './getters';
import { combineHashes, combineRoutes, createHash, createRoute, createSlug, getHashCode, hashFromComment } from './hash';

const propertyAttributes = ['required', 'optional']; // see https://apielements.org/en/latest/element-definitions.html#member-element

class ActionProcessor {
  /** @param {InheritanceResolver} resolver */
  constructor(resolver) {
    this.resolver = resolver;
  }

  /**
   * @public
   * @param {Object} source
   * @param {{ route: string, hashForLegacyUrl: string }} parentSource
   */
  refactorSource(source, parentSource) {
    return source.element === 'message'
      ? this.refactorMessage(source, parentSource)
      : this.refactorAction(source, parentSource);
  }

  /**
   * @public
   * @param {Object} action
   * @param {{ route: string, hashForLegacyUrl: string }} parentSource
   */
  refactorAction(action, parentSource) {
    let method = '';
    const copyElements = [];

    const transactions = action.content.reduce((acc, trans) => {
      if (trans.element === 'copy') {
        copyElements.push(trans);
        return acc;
      }

      const sourceRequest = trans.content.find(tItem => tItem.element === 'httpRequest');
      const sourceResponse = trans.content.find(tItem => tItem.element === 'httpResponse');
      const processedRequest = this.resolveSourceElementInheritance(sourceRequest);
      const processedResponse = this.resolveSourceElementInheritance(sourceResponse);
      method = get('attributes', 'method', 'content').from(sourceRequest);

      const request = {
        structureType: getDataStructureType(processedRequest),
        attributes: get('content').from(this.fillAdditionalAttributes(processedRequest)),
        body: getBody(sourceRequest),
        description: getDescription(sourceRequest),
        headers: sourceRequest.attributes.headers ? sourceRequest.attributes.headers.content.map(extractHeaderData) : null,
        schema: getSchema(sourceRequest),
        title: get('meta', 'title', 'content').from(sourceRequest),
      };

      const response = {
        structureType: getDataStructureType(processedResponse),
        attributes: get('content').from(this.fillAdditionalAttributes(processedResponse)),
        body: getBody(sourceResponse),
        description: getDescription(sourceResponse),
        headers: sourceResponse.attributes.headers ? sourceResponse.attributes.headers.content.map(extractHeaderData) : null,
        schema: getSchema(sourceResponse),
        statusCode: get('attributes', 'statusCode', 'content').from(sourceResponse),
      };

      const formattedTransaction = {
        request: removeEmpty(request),
        response: removeEmpty(response),
      };

      if (acc.length === 0) {
        acc.push(formattedTransaction);
        return acc;
      }

      const isRequestUnique = !acc.some(t => deepEqual(t.request, formattedTransaction.request));
      const isResponseUnique = !acc.some(t => deepEqual(t.response, formattedTransaction.response));

      acc.push({
        request: isRequestUnique ? formattedTransaction.request : {},
        response: isResponseUnique ? formattedTransaction.response : {},
      });
      return acc;
    }, []);

    const href = get('attributes', 'href', 'content').from(action);
    const title = get('meta', 'title', 'content').from(action);
    const displayedTitle = title || `${method.toUpperCase()} ${href}`;
    const description = getDescription({ content: copyElements }); // чтобы не обходить содержимое action заново

    const { route: parentRoute, hashForLegacyUrl: parentLegacyHash } = parentSource;

    const hashCode = getHashCode(`${title || ''}-${href}-${method}`);
    const presetHash = description ? hashFromComment(description) : null;
    const mainHash = `action-${method}-${href.slice(1)}-${hashCode.toString(16)}`;
    const legacyHashBase = title ? `${title} ${method}` : `${href.slice(1).replace(/\//g, '-')} ${method}`;

    const legacyHash = presetHash ? createHash(presetHash) : combineHashes(parentLegacyHash, createHash(legacyHashBase));
    const route = presetHash ? createRoute(presetHash) : combineRoutes(parentRoute, createRoute(mainHash));

    return {
      id: action.id,
      meta: action.meta,
      title: displayedTitle,
      route,
      hashForLegacyUrl: legacyHash,
      element: action.element,
      attributes: {
        hrefVariables: get('attributes', 'hrefVariables', 'content').from(action),
        href,
        method,
      },
      content: copyElements.concat(transactions),
      type: 'transaction',
      routePreset: presetHash ? route : null,
      nestedRoutePresets: [],
    };
  }

  /**
   * @public
   * @param {Object} message
   * @param {{ route: string, hashForLegacyUrl: string }} parentSource
   */
  refactorMessage(message, parentSource) {
    const messageTitle = get('meta', 'title', 'content').from(message) || MESSAGE_DEFAULT_TITLE;
    const messageDescription = getDescription(message);
    const presetHash = messageDescription ? hashFromComment(messageDescription) : null;
    const mainHash = `message-${messageTitle}`;

    const { route: parentRoute, hashForLegacyUrl: parentLegacyHash } = parentSource;

    const messageLegacyHash = presetHash ? createHash(presetHash) : combineHashes(parentLegacyHash, createHash(messageTitle));
    const messageRoute = presetHash ? createRoute(presetHash) : combineRoutes(parentRoute, createRoute(mainHash, createSlug));

    const processedMessage = this.resolveSourceElementInheritance(message);

    return ({
      id: message.id,
      element: message.element,
      meta: message.meta,
      type: 'message',
      description: getDescription(message),
      attributes: get('content').from(this.fillAdditionalAttributes(processedMessage)),
      body: getBody(message),
      schema: getSchema(message),
      hashForLegacyUrl: messageLegacyHash,
      route: messageRoute,
      title: messageTitle,
      routePreset: presetHash ? messageRoute : null,
      nestedRoutePresets: [],
    });
  }

  /** @private */
  resolveSourceElementInheritance(httpSource) {
    const index = getSourceElementIndexByType(httpSource, 'dataStructure');

    if (index === -1) return null;

    const valueMember = httpSource.content[index].content;

    if (valueMember && !STANDARD_TYPES.includes(valueMember.element)) {
      const cachedDataStructure = this.resolver.getCachedDataStructure(valueMember);

      if (cachedDataStructure) return cachedDataStructure;
    }

    this.resolver.resolveInheritance(valueMember, httpSource.content[index]);

    return valueMember;
  }

  /** @private */
  fillAdditionalAttributes(member) {
    if (!get('content').from(member)) return member;

    switch (member.element) {
      case 'select':
      case 'object':
      case 'option':
      case 'array': {
        const cachedDataStructure = this.resolver.getCachedDataStructure(member);

        if (cachedDataStructure) return cachedDataStructure;

        const memberHasFixedAttr = checkAttributeExists('fixed', member);

        member.content.forEach(item => {
          if (memberHasFixedAttr) checkAndAddAttribute('fixed', item);
          this.fillAdditionalAttributes(item);
        });

        this.resolver.cacheDataStructure(member);

        break;
      }
      case 'member': {
        const memberHasFixedAttr = checkAttributeExists('fixed', member);
        const memberHasFixedTypeAttr = checkAttributeExists('fixedType', member);

        const hasNullableAttr = checkAttributeExists('nullable', member);
        const hasNonNullableAttr = checkAttributeExists('non-nullable', member);
        const hasRequiredAttr = checkAttributeExists('required', member);
        const hasOptionalAttr = checkAttributeExists('optional', member);

        if (!hasNullableAttr && !hasNonNullableAttr) addAttribute('non-nullable', member);
        if (!hasRequiredAttr && !hasOptionalAttr) addAttribute('optional', member);
        if (memberHasFixedAttr && memberHasFixedTypeAttr) removeAttribute('fixedType', member);

        const childElement = member.content.value;

        if (childElement) {
          if (Array.isArray(childElement.content)) {
            childElement.content.forEach(item => memberHasFixedAttr && checkAndAddAttribute('fixed', item));
          }
          this.fillAdditionalAttributes(childElement);
        }
        break;
      }
      // no default
    }

    return member;
  }
}

export default ActionProcessor;

function extractHeaderData(header) {
  return {
    key: get('content', 'key', 'content').from(header),
    value: get('content', 'value', 'content').from(header),
  };
}

function getDataStructureType(sourceValueMember) {
  if (!sourceValueMember) return sourceValueMember;

  const typeAttributes = get('attributes', 'typeAttributes', 'content').from(sourceValueMember);

  return {
    type: sourceValueMember.element,
    typeAttributes,
    name: sourceValueMember.referenceDataStructure,
    recursive: sourceValueMember.recursive,
  };
}

function addAttribute(attribute, element) {
  const attributesContainer = getAttributesContainer(attribute, element);
  if (attributesContainer !== element) {
    return addAttribute(attribute, attributesContainer);
  }
  if (!element.attributes) element.attributes = { typeAttributes: { content: [], element: 'array' } };
  if (!element.attributes.typeAttributes) element.attributes.typeAttributes = { content: [], element: 'array' };

  element.attributes.typeAttributes.content.push({ element: 'string', content: attribute });
  return element;
}

function removeAttribute(attribute, element) {
  const attributesContainer = getAttributesContainer(attribute, element);
  if (attributesContainer !== element) {
    removeAttribute(attribute, attributesContainer);
    return;
  }
  const elementAttrsContent = get('attributes', 'typeAttributes', 'content').from(element);
  const elementAttrIndex = elementAttrsContent.findIndex(attr => attr.content === attribute);

  elementAttrsContent.splice(elementAttrIndex, 1);
}

function checkAttributeExists(attribute, element) {
  const attributesContainer = getAttributesContainer(attribute, element);
  if (attributesContainer !== element) {
    return checkAttributeExists(attribute, attributesContainer);
  }
  const elementAttrsContent = get('attributes', 'typeAttributes', 'content').from(element);
  return elementAttrsContent && elementAttrsContent.some(attr => attr.content === attribute);
}

function checkAndAddAttribute(attribute, element) {
  const elementHasAttr = checkAttributeExists(attribute, element);
  if (!elementHasAttr) addAttribute(attribute, element);
}

function getAttributesContainer(targetAttribute, element) {
  if (element.element === 'member' && !propertyAttributes.includes(targetAttribute)) {
    return element.content.value;
  }
  return element;
}

function removeEmpty(object) {
  return (
    Object.keys(object).reduce((res, key) => {
      if (object[key]) {
        res[key] = object[key];
      }
      return res;
    }, {}));
}
