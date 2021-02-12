import { GROUP_DEFAULT_TITLE } from 'app/constants/defaults';

/**
 * @typedef {Object} Categories
 * @property {Object[]} dataStructuresArray
 * @property {Object[]} schemaStructuresArray
 * @property {Object[]} messageBodyArray
 * @property {Object[]} resourceGroupArray
 * @property {Object[]} resourcePrototypesArray
 */

/**
 * @param {Array<object>} content
 * @return {Categories}
 */
export default function extractCategories(content) {
  const categories = {
    dataStructuresArray: [],
    schemaStructuresArray: [],
    messageBodyArray: [],
    resourceGroupArray: [],
    resourcePrototypesArray: [],
  };

  const groupForStandaloneResources = {
    element: 'category',
    content: [],
    meta: {
      title: {
        element: 'string',
        content: GROUP_DEFAULT_TITLE,
      },
    },
  };

  if (!Array.isArray(content)) {
    return categories;
  }

  content.forEach(item => {
    if (item.element === 'category') {
      const categoryType = Array.isArray(item.meta.classes)
        ? item.meta.classes[0]
        : item.meta.classes.content[0].content;

      const categoryKey = `${categoryType}Array`;

      if (Array.isArray(categories[categoryKey])) {
        categories[categoryKey].push(item);
      }
    }

    if (item.element === 'resource') {
      groupForStandaloneResources.content.push(item);
    }
  });

  if (categories.dataStructuresArray.length > 0) {
    categories.dataStructuresArray = categories.dataStructuresArray.reduce((res, dsItem) => {
      res.push(...dsItem.content);
      return res;
    }, []);
  }

  if (categories.schemaStructuresArray.length > 0) {
    categories.schemaStructuresArray = categories.schemaStructuresArray.reduce((res, ssItem) => {
      res.push(...ssItem.content);
      return res;
    }, []);
  }

  if (categories.resourcePrototypesArray.length > 0) {
    categories.resourcePrototypesArray = categories.resourcePrototypesArray.reduce((res, rpItem) => {
      res.push(...rpItem.content);
      return res;
    }, []);
  }

  if (groupForStandaloneResources.content.length > 0) {
    categories.resourceGroupArray.unshift(groupForStandaloneResources);
  }

  return categories;
}
