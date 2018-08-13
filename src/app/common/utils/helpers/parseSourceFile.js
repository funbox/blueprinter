import { get, htmlFromText } from './index';
import uniqid from 'uniqid';

const refactorHeader = header => ({
  key: get('content', 'key', 'content').from(header),
  value: get('content', 'value', 'content').from(header),
});

const categories = {
  dataStructuresArray: [],
  messageBodyArray: [],
  resourceGroupArray: [],
  resourcePrototypesArray: [],
};

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
  let method = '';

  const transactions = action.content.filter(item => item.element !== 'copy').map(transaction => {
    const sourceRequest = transaction.content.find(tItem => tItem.element === 'httpRequest');
    const sourceResponse = transaction.content.find(tItem => tItem.element === 'httpResponse');

    const bodyIndex = httpSource => httpSource.content.findIndex(item => item.element === 'asset');
    const getBody = httpSource => {
      const index = bodyIndex(httpSource);

      return (index > -1) ? httpSource.content[index].content : null;
    };

    const dataStructureIndex = httpSource => httpSource.content.findIndex(item => item.element === 'dataStructure');
    const getDataAttributes = httpSource => {
      const index = dataStructureIndex(httpSource);

      if (index === -1) return null;

      const valueMember = httpSource.content[index].content;
      resolveInheritance(valueMember, httpSource.content[index]);

      return valueMember.content;
    };

    const request = {
      attributes: getDataAttributes(sourceRequest),
      body: getBody(sourceRequest),
      description: null,
      headers: sourceRequest.attributes.headers ? sourceRequest.attributes.headers.content.map(refactorHeader) : null,
      title: get('meta', 'title', 'content').from(sourceRequest),
    };

    const response = {
      attributes: getDataAttributes(sourceResponse),
      body: getBody(sourceResponse),
      description: null,
      headers: sourceResponse.attributes.headers ? sourceResponse.attributes.headers.content.map(refactorHeader) : null,
      schema: null,
      statusCode: get('attributes', 'statusCode', 'content').from(sourceResponse),
    };

    method = get('attributes', 'method', 'content').from(sourceRequest);

    return {
      request,
      response,
    };
  });

  return {
    attributes: {
      href: action.attributes.href.content,
      hrefVariables: get('attributes', 'hrefVariables', 'content').from(action),
      method,
    },
    id: action.id,
    content: transactions,
  };
};

const parseSourceFile = ({ content }) => {
  const source = content[0];

  const groupForStandaloneResources = {
    element: 'category',
    content: [],
  };

  const getHost = () => {
    const hostMetaElement = get('attributes', 'metadata', 'content').from(source)
      .find(item => item.content.key.content === 'HOST');
    return hostMetaElement ? hostMetaElement.content.value.content : null;
  };

  const actions = [];

  const topLevelDescription = source.content.find(i => i.element === 'copy');
  const topLevelDescriptionElement = topLevelDescription ? htmlFromText(topLevelDescription.content) : null;
  const topLevelContentItems = source.content;

  const topLevelMeta = {
    title: get('meta', 'title', 'content').from(source),
    description: topLevelDescriptionElement,
    host: getHost(),
  };

  topLevelContentItems.forEach(item => {
    if (item.element === 'category') {
      const categoryType = Array.isArray(item.meta.classes) ?
        item.meta.classes[0] : item.meta.classes.content[0].content;

      categories[`${categoryType}Array`].push(item);
    }

    if (item.element === 'resource') {
      groupForStandaloneResources.content.push(item);
    }
  });

  if (groupForStandaloneResources.content.length > 0) {
    categories.resourceGroupArray.unshift(groupForStandaloneResources);
  }

  categories.resourceGroupArray.forEach(group => {
    group.content.forEach(resource => {
      if (resource.element === 'copy') return;

      resource.content.forEach(action => {
        if (action.element === 'copy') return;

        if (!action.attributes) {
          action.attributes = resource.attributes;
        }
        action.id = uniqid.time();
        actions.push(action);
      });
    });
  });

  if (categories.dataStructuresArray[0]) {
    categories.dataStructuresArray = [...categories.dataStructuresArray[0].content];
  }

  const refactoredActions = actions.map(refactorAction);

  return {
    topLevelMeta,
    actions: refactoredActions,
    groups: categories.resourceGroupArray,
  };
};

export default parseSourceFile;
