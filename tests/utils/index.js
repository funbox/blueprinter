import Crafter from '@funbox/crafter';
import extractCategories from 'app/common/utils/helpers/extract-categories';

export async function getCategories(apib) {
  const [result] = await Crafter.parse(apib);
  const ast = result.toRefract();
  const content = ast.content[0].content;

  return extractCategories(content);
}

export function getActions(categories) {
  const actions = [];
  categories.resourceGroupArray.forEach(group => {
    const groupChild = group.content[0];
    if (groupChild.element === 'resource' && Array.isArray(groupChild.content)) {
      actions.push(...groupChild.content);
    }
  });
  return actions;
}

export function getMessages(categories) {
  const messages = [];
  categories.resourceGroupArray.forEach(group => {
    const groupChild = group.content[0];
    if (groupChild.element === 'message') {
      messages.push(groupChild);
    } else if (Array.isArray(groupChild.content)) {
      groupChild.content.forEach(item => {
        if (item.element === 'message') {
          messages.push(item);
        }
      });
    }
  });
  return messages;
}
