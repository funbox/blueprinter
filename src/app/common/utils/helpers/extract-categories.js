import { GROUP_DEFAULT_TITLE } from 'app/constants/defaults';

/**
 * @typedef {Object} Categories
 * @property {Object[]} dataStructuresArray
 * @property {Object[]} schemaStructuresArray
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
    resourceGroupArray: [],
    resourcePrototypesArray: [],
  };
  const needToFlatten = ['dataStructuresArray', 'schemaStructuresArray', 'resourcePrototypesArray'];

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
      const categoryType = item.meta.classes.content[0].content;
      const categoryKey = `${categoryType}Array`;

      if (Array.isArray(categories[categoryKey])) {
        const categoryItems = needToFlatten.includes(categoryKey) ? item.content : [item];
        categories[categoryKey].push(...categoryItems);
      }
    }

    if (item.element === 'resource') {
      groupForStandaloneResources.content.push(item);
    }
  });

  if (groupForStandaloneResources.content.length > 0) {
    categories.resourceGroupArray.unshift(groupForStandaloneResources);
  }

  return categories;
}
