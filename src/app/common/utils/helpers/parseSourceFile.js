import { get, htmlFromText } from './index';
import uniqid from 'uniqid';

import categories from './categories';
import refactorAction from './refactorAction';

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
