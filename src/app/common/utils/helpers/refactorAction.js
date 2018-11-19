import deepEqual from 'deep-equal';
import { get } from './index';

import categories from './categories';

const standardTypes = ['number', 'string', 'boolean', 'array', 'enum', 'object'];

const refactorHeader = header => ({
  key: get('content', 'key', 'content').from(header),
  value: get('content', 'value', 'content').from(header),
});

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
    const dsContent = Array.isArray(ds.content) ? ds.content[0].meta.id : ds.content.meta.id;
    return type === 'ref' ? dsContent === valueMember.content.href : dsContent === valueMember.element;
  });

  if (referencedDataStructure) {
    const refDSContent = Array.isArray(referencedDataStructure.content)
      ? referencedDataStructure.content[0].content : referencedDataStructure.content.content;
    refDSContent.forEach(item => resolveInheritance(item, referencedDataStructure.content[0]));
    const referencedObjectContent = [...referencedDataStructure.content[0].content];
    const referencedObjectType = referencedDataStructure.content[0].element;

    if (type === 'ref') {
      const refMemberIndex = parent.content.indexOf(valueMember);
      const refilledArray = parent.content.slice(0, refMemberIndex)
        .concat(referencedObjectContent)
        .concat(parent.content.slice(refMemberIndex + 1));
      parent.content = [...refilledArray];
    } else {
      if (!Array.isArray(valueMember.content)) valueMember.content = [];
      valueMember.content.unshift(...referencedObjectContent);
      valueMember.element = standardTypes.includes(referencedObjectType) ? referencedObjectType : 'object';
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

const refactorAction = action => {
  const getSourceElementIndexByType = (source, type) => source.content.findIndex(item => item.element === type);
  let method = '';

  const transactions = action.content.filter(item => item.element !== 'copy').map(transaction => {
    const sourceRequest = transaction.content.find(tItem => tItem.element === 'httpRequest');
    const sourceResponse = transaction.content.find(tItem => tItem.element === 'httpResponse');

    const getBody = httpSource => {
      const index = getSourceElementIndexByType(httpSource, 'asset');

      return (index > -1) ? httpSource.content[index].content : null;
    };

    const getSchema = httpSource => {
      const index = httpSource.content.findIndex(item => (
        item.element === 'asset' && item.meta.classes[0] === 'messageBodySchema'));

      return (index > -1) ? httpSource.content[index].content : null;
    };

    const getDataAttributes = httpSource => {
      const index = getSourceElementIndexByType(httpSource, 'dataStructure');

      if (index === -1) return null;

      const valueMember = httpSource.content[index].content[0];
      resolveInheritance(valueMember, httpSource.content[index]);

      return valueMember.content;
    };

    const getDescription = httpSource => {
      const index = getSourceElementIndexByType(httpSource, 'copy');

      if (index === -1) return null;

      return httpSource.content[index].content;
    };

    const request = {
      attributes: getDataAttributes(sourceRequest),
      body: getBody(sourceRequest),
      description: getDescription(sourceRequest),
      headers: sourceRequest.attributes.headers ? sourceRequest.attributes.headers.content.map(refactorHeader) : null,
      title: get('meta', 'title', 'content').from(sourceRequest),
    };

    const response = {
      attributes: getDataAttributes(sourceResponse),
      body: getBody(sourceResponse),
      description: getDescription(sourceResponse),
      headers: sourceResponse.attributes.headers ? sourceResponse.attributes.headers.content.map(refactorHeader) : null,
      schema: getSchema(sourceResponse),
      statusCode: get('attributes', 'statusCode').from(sourceResponse),
    };

    method = get('attributes', 'method').from(sourceRequest);

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
  };
};

export default refactorAction;
