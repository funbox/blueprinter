import deepEqual from 'deep-equal';
import { get } from './index';

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
      valueMember.content.unshift(...referencedObjectContent);
      valueMember.element = standardTypes.includes(referencedObjectType) ? referencedObjectType : 'object';
      valueMember.attributes = usefulContent.attributes;
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

const refactorMessage = (message) => ({
  id: message.id,
  type: 'message',
  attributes: getDataAttributes(message),
  body: getBody(message),
  schema: getSchema(message),
  title: get('meta', 'title', 'content').from(message),
});

const refactorAction = action => {
  let method = '';

  const transactions = action.content.filter(item => item.element !== 'copy').map(transaction => {
    const sourceRequest = transaction.content.find(tItem => tItem.element === 'httpRequest');
    const sourceResponse = transaction.content.find(tItem => tItem.element === 'httpResponse');

    const request = {
      attributes: getDataAttributes(sourceRequest),
      body: getBody(sourceRequest),
      description: getDescription(sourceRequest),
      headers: sourceRequest.attributes.headers ? sourceRequest.attributes.headers.content.map(extractHeaderData) : null,
      schema: getSchema(sourceRequest),
      title: get('meta', 'title', 'content').from(sourceRequest),
    };

    const response = {
      attributes: getDataAttributes(sourceResponse),
      body: getBody(sourceResponse),
      description: getDescription(sourceResponse),
      headers: sourceResponse.attributes.headers ? sourceResponse.attributes.headers.content.map(extractHeaderData) : null,
      schema: getSchema(sourceResponse),
      statusCode: get('attributes', 'statusCode', 'content').from(sourceResponse),
    };

    method = get('attributes', 'method', 'content').from(sourceRequest);

    return {
      request: removeEmpty(request),
      response: removeEmpty(response),
    };
  });

  const filteredTransactions = transactions.map((trans, i, oldArray) => {
    if (i === 0) {
      return {
        request: trans.request,
        response: trans.response,
      };
    }

    const isRequestUnique = oldArray.some(t => !deepEqual(t.request, trans.request));
    return {
      request: isRequestUnique ? trans.request : {},
      response: trans.response,
    };
  });

  return {
    attributes: {
      href: action.attributes.href.content || action.attributes.href,
      hrefVariables: get('attributes', 'hrefVariables', 'content').from(action),
      method,
    },
    id: action.id,
    content: filteredTransactions,
    type: 'transaction',
  };
};

const refactorSource = (source) => (
  source.element === 'message' ? refactorMessage(source) : refactorAction(source)
);

export default refactorSource;

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
    item.element === 'asset' && item.meta.classes[0] === 'messageBodySchema'));

  return (index > -1) ? httpSource.content[index].content : null;
}

function getDataAttributes(httpSource) {
  const index = getSourceElementIndexByType(httpSource, 'dataStructure');

  if (index === -1) return null;

  const valueMember = httpSource.content[index].content;
  resolveInheritance(valueMember, httpSource.content[index]);

  return valueMember.content;
}

function getDescription(httpSource) {
  const index = getSourceElementIndexByType(httpSource, 'copy');

  if (index === -1) return null;

  return httpSource.content[index].content;
}
