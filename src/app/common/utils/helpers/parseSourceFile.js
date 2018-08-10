import { get, htmlFromText } from './index';
import uniqid from 'uniqid';

const refactorHeader = header => ({
  key: get('content', 'key', 'content').from(header),
  value: get('content', 'value', 'content').from(header),
});

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

      return (index > -1) ? httpSource.content[index].content.content : null;
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
      method,
    },
    id: action.id,
    content: transactions,
  };
};

const parseSourceFile = ({ content }) => {
  const source = content[0];
  const categories = {
    dataStructuresArray: [],
    messageBodyArray: [],
    resourceGroupArray: [],
    resourcePrototypesArray: [],
  };

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

  const refactoredActions = actions.map(refactorAction);

  return {
    topLevelMeta,
    actions: refactoredActions,
    groups: categories.resourceGroupArray,
  };
};

export default parseSourceFile;
