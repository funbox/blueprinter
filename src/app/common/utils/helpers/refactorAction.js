import { get } from './index';
import deepEqual from 'deep-equal';

import categories from './categories';

const refactorHeader = header => ({
  key: get('content', 'key', 'content').from(header),
  value: get('content', 'value', 'content').from(header),
});

const removeEmpty = object =>
  Object.keys(object).reduce((res, key) => {
    if (object[key]) {
      res[key] = object[key];
    }
    return res;
  }, {});

const resolveInheritance = (valueMember, parent) => {
  const type = valueMember.element;
  const referencedDataStructure = categories.dataStructuresArray.find(ds => {
    const dsContent = ds.content.meta.id.content;
    return type === 'ref' ? dsContent === valueMember.content : dsContent === valueMember.element;
  });

  if (referencedDataStructure) {
    referencedDataStructure.content.content.forEach(item => resolveInheritance(item, referencedDataStructure.content));
    const referencedObjectContent = [...referencedDataStructure.content.content]; // get('content', 'content').from(referencedDataStructure);

    if (type === 'ref') {
      const refMemberIndex = parent.content.indexOf(valueMember);
      const refilledArray = parent.content.slice(0, refMemberIndex)
        .concat(referencedObjectContent)
        .concat(parent.content.slice(refMemberIndex + 1));
      parent.content = [...refilledArray];
    } else {
      if (!Array.isArray(valueMember.content)) valueMember.content = [];
      valueMember.content.push(...referencedObjectContent);
      valueMember.element = 'object';
    }
  }

  const contentMap = {
    object: (item) => item.content,
    member: (item) => item.content.value.content,
  };

  const parentMap = {
    member: (item) => item.content.value,
  };

  const innerContent = contentMap[type] && contentMap[type](valueMember) || valueMember.content;
  const innerContentItemParent = parentMap[type] && parentMap[type](valueMember) || valueMember;

  if (Array.isArray(innerContent)) {
    innerContent.map(item => resolveInheritance(item, innerContentItemParent));
  } else if (innerContent && innerContent.value) {
    resolveInheritance(innerContent.value, valueMember);
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

    const getDataAttributes = httpSource => {
      const index = getSourceElementIndexByType(httpSource, 'dataStructure');

      if (index === -1) return null;

      const valueMember = httpSource.content[index].content;
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
      schema: null,
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
      href: action.attributes.href.content,
      hrefVariables: get('attributes', 'hrefVariables', 'content').from(action),
      method,
    },
    id: action.id,
    content: filteredTransactions,
  };
};

export default refactorAction;