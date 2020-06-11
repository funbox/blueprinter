import deepEqual from 'deep-equal';
import { MESSAGE_DEFAULT_TITLE } from 'app/constants/defaults';
import { get, getSourceElementIndexByType, getBody, getSchema, getDescription } from './getters';
import { combineHashes, combineRoutes, createHash, createRoute, createSlug, getHashCode, hashFromComment } from './hash';
import categories from './categories';
import InheritanceResolver from './inheritance-resolver';

const removeEmpty = object => (
  Object.keys(object).reduce((res, key) => {
    if (object[key]) {
      res[key] = object[key];
    }
    return res;
  }, {}));

const resolver = new InheritanceResolver(categories);

export const refactorMessage = (message, parentSource) => {
  const messageTitle = get('meta', 'title', 'content').from(message) || MESSAGE_DEFAULT_TITLE;
  const messageDescription = getDescription(message);
  const presetHash = messageDescription ? hashFromComment(messageDescription) : null;
  const mainHash = `message-${messageTitle}`;

  const { route: parentRoute, hashForLegacyUrl: parentLegacyHash } = parentSource;

  const messageLegacyHash = presetHash ? createHash(presetHash) : combineHashes(parentLegacyHash, createHash(messageTitle));
  const messageRoute = presetHash ? createRoute(presetHash) : combineRoutes(parentRoute, createRoute(mainHash, createSlug));

  return ({
    id: message.id,
    element: message.element,
    meta: message.meta,
    type: 'message',
    description: getDescription(message),
    attributes: getDataAttributes(message),
    body: getBody(message),
    schema: getSchema(message),
    hashForLegacyUrl: messageLegacyHash,
    route: messageRoute,
    title: messageTitle,
  });
};

export const refactorAction = (action, parentSource) => {
  let method = '';
  const copyElements = [];

  const transactions = action.content.reduce((acc, trans) => {
    if (trans.element === 'copy') {
      copyElements.push(trans);
      return acc;
    }

    const sourceRequest = trans.content.find(tItem => tItem.element === 'httpRequest');
    const sourceResponse = trans.content.find(tItem => tItem.element === 'httpResponse');
    const processedRequest = resolveSourceElementInheritance(sourceRequest);
    const processedResponse = resolveSourceElementInheritance(sourceResponse);
    method = get('attributes', 'method', 'content').from(sourceRequest);

    const request = {
      structureType: getDataStructureType(processedRequest),
      attributes: getDataAttributes(processedRequest),
      body: getBody(sourceRequest),
      description: getDescription(sourceRequest),
      headers: sourceRequest.attributes.headers ? sourceRequest.attributes.headers.content.map(extractHeaderData) : null,
      schema: getSchema(sourceRequest),
      title: get('meta', 'title', 'content').from(sourceRequest),
    };

    const response = {
      structureType: getDataStructureType(processedResponse),
      attributes: getDataAttributes(processedResponse),
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
  };
};

export default function refactorSource(source, parentSource) {
  return source.element === 'message' ? refactorMessage(source, parentSource) : refactorAction(source, parentSource);
}

function extractHeaderData(header) {
  return {
    key: get('content', 'key', 'content').from(header),
    value: get('content', 'value', 'content').from(header),
  };
}

function getDataAttributes(sourceValueMember) {
  if (!sourceValueMember) return sourceValueMember;

  fillAdditionalAttributes(sourceValueMember);

  return sourceValueMember.content;
}

function getDataStructureType(sourceValueMember) {
  if (!sourceValueMember) return sourceValueMember;

  return {
    type: sourceValueMember.element,
    name: sourceValueMember.referenceDataStructure,
    recursive: sourceValueMember.recursive,
  };
}

function resolveSourceElementInheritance(httpSource) {
  const index = getSourceElementIndexByType(httpSource, 'dataStructure');

  if (index === -1) return null;

  const valueMember = httpSource.content[index].content;

  resolver.resolveInheritance(valueMember, httpSource.content[index]);

  return valueMember;
}

function fillAdditionalAttributes(valueMember) {
  const allowedElementTypes = ['object', 'select', 'option'];
  const elementNeedsAttributes = el => allowedElementTypes.includes(el.element) && Array.isArray(el.content);

  const addAttribute = (attribute, element) => {
    element.attributes.typeAttributes.content.push({ element: 'string', content: attribute });
    return element;
  };

  if (elementNeedsAttributes(valueMember)) {
    valueMember.content.forEach(property => {
      if (Array.isArray(property.content)) {
        property.content.forEach(element => fillAdditionalAttributes(element));
      } else {
        if (!property.attributes) property.attributes = { typeAttributes: { content: [], element: 'array' } };

        const attributesContent = property.attributes.typeAttributes.content;

        const hasNullableAttr = attributesContent.some(attr => attr.content === 'nullable');
        const hasNonNullableAttr = attributesContent.some(attr => attr.content === 'non-nullable');
        const hasRequiredAttr = attributesContent.some(attr => attr.content === 'required');
        const hasOptionalAttr = attributesContent.some(attr => attr.content === 'optional');

        if (!hasNullableAttr && !hasNonNullableAttr) addAttribute('non-nullable', property);
        if (!hasRequiredAttr && !hasOptionalAttr) addAttribute('optional', property);

        const childElement = property.content.value;
        if (childElement && elementNeedsAttributes(childElement)) fillAdditionalAttributes(childElement);
      }
    });
  }

  return valueMember;
}
