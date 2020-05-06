import deepEqual from 'deep-equal';
import { MESSAGE_DEFAULT_TITLE } from 'app/constants/defaults';
import { get } from './index';
import { createHash, createRoute } from './hash';
import categories from './categories';

const standardTypes = ['number', 'string', 'boolean', 'array', 'enum', 'object'];

const removeEmpty = object => (
  Object.keys(object).reduce((res, key) => {
    if (object[key]) {
      res[key] = object[key];
    }
    return res;
  }, {}));

const resolveInheritance = (valueMember, parent) => {
  const type = valueMember.element;
  const referencedDataStructure = categories.dataStructuresArray.find(ds => {
    const dsContent = Array.isArray(ds.content) ? ds.content[0].meta.id.content : ds.content.meta.id.content;
    return type === 'ref' ? dsContent === valueMember.content : dsContent === valueMember.element;
  });
  const referencedSchemaStructure = categories.schemaStructuresArray.find(ss => {
    const ssContent = ss.meta.id.content;
    return ssContent === valueMember.element;
  });

  if (referencedDataStructure) {
    const refDSContent = referencedDataStructure.content;
    const enumContent = get('attributes', 'enumerations').from(refDSContent);
    const isEnum = !!enumContent;
    if (!standardTypes.includes(refDSContent.element)) {
      resolveInheritance(refDSContent);
    }
    const referencedObjectType = refDSContent.element;
    const usefulContent = isEnum ? enumContent : refDSContent;

    let referencedObjectContent;
    if (Array.isArray(usefulContent.content)) {
      usefulContent.content.forEach(item => resolveInheritance(item, usefulContent));
      referencedObjectContent = [...usefulContent.content];
    }

    if (type === 'ref') {
      const refMemberIndex = parent.content.indexOf(valueMember);
      const refilledArray = parent.content.slice(0, refMemberIndex)
        .concat(referencedObjectContent)
        .concat(parent.content.slice(refMemberIndex + 1));
      parent.content = [...refilledArray];
    } else if (isEnum) {
      valueMember.attributes = valueMember.attributes || {};
      valueMember.attributes.enumerations = valueMember.attributes.enumerations || {};
      valueMember.attributes.enumerations.content = valueMember.attributes.enumerations.content || [];
      valueMember.attributes.enumerations.content.unshift(...referencedObjectContent);
      valueMember.element = standardTypes.includes(referencedObjectType) ? referencedObjectType : 'object';
    } else if (!referencedObjectContent) {
      valueMember.element = standardTypes.includes(referencedObjectType) ? referencedObjectType : 'object';
      valueMember.attributes = usefulContent.attributes;
    } else {
      if (!Array.isArray(valueMember.content)) valueMember.content = [];
      if (valueMember.content.length && referencedObjectContent.length) {
        referencedObjectContent = referencedObjectContent.filter(rfcItem => !valueMember.content.find(vmcItem => {
          if (rfcItem.element === 'member' && vmcItem.element === 'member') {
            return rfcItem.content.key.content === vmcItem.content.key.content;
          }
          return false;
        }));
      }

      valueMember.content.unshift(...referencedObjectContent);
      valueMember.element = standardTypes.includes(referencedObjectType) ? referencedObjectType : 'object';
      valueMember.attributes = usefulContent.attributes;
    }
  }

  if (referencedSchemaStructure) {
    const refSSContent = referencedSchemaStructure.content;
    if (Array.isArray(refSSContent) && refSSContent.every(item => item.element === 'asset')) {
      valueMember.element = 'schema type';
    }
  }

  let childElement;
  if (type === 'member') {
    const elementType = valueMember.content.value.element;
    childElement = standardTypes.includes(elementType) ? valueMember.content.value : valueMember;
  } else {
    childElement = valueMember;
  }
  const childElementContent = childElement.content;

  if (Array.isArray(childElementContent)) {
    childElementContent.map(item => resolveInheritance(item, childElement));
  } else if (childElementContent && childElementContent.value) {
    resolveInheritance(childElementContent.value, valueMember);
  }

  return valueMember;
};

export const refactorMessage = (message) => {
  const title = get('meta', 'title', 'content').from(message) || MESSAGE_DEFAULT_TITLE;
  const hash = message.hash || createHash(title);
  const route = message.route || createRoute(title);

  return ({
    id: message.id,
    element: message.element,
    meta: message.meta,
    type: 'message',
    description: getDescription(message),
    attributes: getDataAttributes(message),
    body: getBody(message),
    schema: getSchema(message),
    hash,
    route,
    title,
  });
};

export const refactorAction = (action) => {
  let method = '';
  const copyElements = [];

  const transactions = action.content.reduce((acc, trans) => {
    if (trans.element === 'copy') {
      copyElements.push(trans);
      return acc;
    }

    const sourceRequest = trans.content.find(tItem => tItem.element === 'httpRequest');
    const sourceResponse = trans.content.find(tItem => tItem.element === 'httpResponse');
    method = get('attributes', 'method', 'content').from(sourceRequest);

    const request = {
      structureType: getDataStructureType(sourceRequest),
      attributes: getDataAttributes(sourceRequest),
      body: getBody(sourceRequest),
      description: getDescription(sourceRequest),
      headers: sourceRequest.attributes.headers ? sourceRequest.attributes.headers.content.map(extractHeaderData) : null,
      schema: getSchema(sourceRequest),
      title: get('meta', 'title', 'content').from(sourceRequest),
    };

    const response = {
      structureType: getDataStructureType(sourceResponse),
      attributes: getDataAttributes(sourceResponse),
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
  const hashFriendlyHref = href.slice(1).replace(/\//g, '-');
  const title = get('meta', 'title', 'content').from(action);
  const displayedTitle = title || `${method.toUpperCase()} ${href}`;
  const hashBase = title ? `${title} ${method}` : `${hashFriendlyHref} ${method}`;
  const hash = createHash(hashBase);
  const route = createRoute(hashBase);

  return {
    id: action.id,
    meta: action.meta,
    title: displayedTitle,
    hash,
    route,
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

export default function refactorSource(source) {
  return source.element === 'message' ? refactorMessage(source) : refactorAction(source);
}

function extractHeaderData(header) {
  return {
    key: get('content', 'key', 'content').from(header),
    value: get('content', 'value', 'content').from(header),
  };
}

function getSourceElementIndexByType(source, type) {
  return source.content.findIndex(item => item.element === type);
}

function getBody(httpSource) {
  const index = getSourceElementIndexByType(httpSource, 'asset');

  return (index > -1) ? httpSource.content[index].content : null;
}

function getSchema(httpSource) {
  const index = httpSource.content.findIndex(item => (
    item.element === 'asset' && item.meta.classes.content[0].content === 'messageBodySchema'));

  return (index > -1) ? httpSource.content[index].content : null;
}

function getDataAttributes(httpSource) {
  const index = getSourceElementIndexByType(httpSource, 'dataStructure');

  if (index === -1) return null;

  const valueMember = httpSource.content[index].content;

  resolveInheritance(valueMember, httpSource.content[index]);
  fillAdditionalAttributes(valueMember);

  return valueMember.content;
}

function getDataStructureType(httpSource) {
  const index = getSourceElementIndexByType(httpSource, 'dataStructure');

  if (index === -1) return null;

  const valueMember = httpSource.content[index].content;

  resolveInheritance(valueMember, httpSource.content[index]);

  return valueMember.element;
}

function getDescription(httpSource) {
  const index = getSourceElementIndexByType(httpSource, 'copy');

  if (index === -1) return null;

  return httpSource.content[index].content;
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