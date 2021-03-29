/*
Если в UI не выбрано ни одной опции, то отображается body по умолчанию из ассета messageBody.
Если выбранные опции есть, то body генерируется динамически на клиенте из ассета messageBodyTemplate.

Каждой опции присваивается мета-инфорамация в виде числового id и массива nestedIds, содержащего идентификаторы
всех вложенных опций.

Когда пользователь выбирает опцию для вывода body, её путь добавляется в массив selectedOptions.

getTreeWithOneOfsAndOptions обходит дерево атрибутов и создаёт новое дерево, содержащее только элементы one of и option.
Пример дерева с выбранными опциями 1, 2, 6 и 7:

[One Of]
  [option 1] *
  [option 2] *
    [One Of]
      [option 3]
      [option 4]
[One Of]
  [option 5]
  [option 6] *
  [option 7] *

Значение selectedOptions для этого примера:

[
  { id: 1, nestedIds: [] },
  { id: 2, nestedIds: [3, 4] },
  { id: 6, nestedIds: [] },
  { id: 7, nestedIds: [] }
]

getTreeWithNextOptionVariants создаёт на основе предыдущего дерева новое дерево, содержащее только опции.
Эти опции ссылаются на возможные следующие опции в комбинации. Каждый уникальный путь от корня к листу - это одна из комбинаций.
Пример такого дерева:

[root]
  [option 1]
    [option 6]
    [option 7]
  [option 2]
    [option 6]
    [option 7]

getPathCombinations обходит дерево, полученное с помощью getTreeWithNextOptionVariants, и создаёт список всех возможных
комбинаций выбранных опций:

1) 1, 6
2) 1, 7
3) 2, 6
4) 2, 7

Для каждой комбинации генерируется body. При генерации из каждого поля __oneOf__ выбирается ровно одна опция.
1) Если опция есть в текущей комбинации, то выбирается она.
2) Иначе выбирается опция, которая содержит хотя бы одну из опций в текущей комбинации.
3) Иначе выбирается первая опция.
*/

export function addOptionMetaToAttributes(attributes) {
  let nextId = 0;
  const getNextId = () => {
    nextId += 1;
    return nextId;
  };

  return attributes.map(el => addMetaRecursively(el));

  function addMetaRecursively(element, addNestedOptionToParent) {
    switch (element.element) {
      case 'option': {
        const id = getNextId();
        if (addNestedOptionToParent) {
          addNestedOptionToParent(id);
        }
        const nestedIds = [];
        const addNestedOption = (nestedId) => {
          nestedIds.push(nestedId);
          if (addNestedOptionToParent) {
            addNestedOptionToParent(nestedId);
          }
        };
        return {
          ...element,
          optionMeta: { id, nestedIds },
          content: element.content.map(el => addMetaRecursively(el, addNestedOption)),
        };
      }
      case 'array':
      case 'object':
      case 'select':
        return {
          ...element,
          ...(element.content && { content: element.content.map(el => addMetaRecursively(el, addNestedOptionToParent)) }),
        };
      case 'member':
        return {
          ...element,
          content: { ...element.content, value: addMetaRecursively(element.content.value, addNestedOptionToParent) },
        };
      default:
        return { ...element };
    }
  }
}

function addMetaToBodyTemplate(bodyTemplate) {
  let nextId = 0;
  const getNextId = () => {
    nextId += 1;
    return nextId;
  };

  return addMetaRecursively(bodyTemplate);

  function addMetaRecursively(field, addNestedOptionToParent) {
    if (Array.isArray(field)) {
      return field.map(x => addMetaRecursively(x, addNestedOptionToParent));
    }
    if (field !== null && typeof field === 'object') {
      const result = {};
      Object.keys(field).forEach(key => {
        if (/^__oneOf-\d+__$/.test(key)) {
          result[key] = field[key].map(option => {
            const id = getNextId();
            if (addNestedOptionToParent) {
              addNestedOptionToParent(id);
            }
            const nestedIds = [];
            const addNestedOption = (nestedId) => {
              nestedIds.push(nestedId);
              if (addNestedOptionToParent) {
                addNestedOptionToParent(nestedId);
              }
            };
            return {
              optionMeta: { id, nestedIds },
              content: addMetaRecursively(option, addNestedOption),
            };
          });
        } else {
          result[key] = addMetaRecursively(field[key], addNestedOptionToParent);
        }
      });
      return result;
    }
    return field;
  }
}

export function generateBody(attributes, bodyTemplateStr, allSelectedOptions) {
  let bodyTemplate;
  try {
    bodyTemplate = JSON.parse(bodyTemplateStr);
  } catch (error) {
    return bodyTemplateStr;
  }
  const bodyTemplateWithMeta = addMetaToBodyTemplate(bodyTemplate);

  const bodyStrings = [];
  const selectedOptions = removeRedundantOptions(allSelectedOptions);
  const tree = getTreeWithOneOfsAndOptions(attributes, selectedOptions);
  const variantsTree = getTreeWithNextOptionVariants(tree.oneOfs.find(oneOfHasSelectedOptions));
  const combinations = getCombinations(variantsTree);

  combinations.forEach(combination => {
    const body = generateBodyFromBodyTemplateWithMeta(bodyTemplateWithMeta, combination);
    bodyStrings.push(JSON.stringify(body, null, 2));
  });

  return bodyStrings.join('\n\n');
}

function generateBodyFromBodyTemplateWithMeta(bodyTemplateWithMeta, combination) {
  if (Array.isArray(bodyTemplateWithMeta)) {
    return bodyTemplateWithMeta.map(x => generateBodyFromBodyTemplateWithMeta(x, combination));
  }
  if (bodyTemplateWithMeta !== null && typeof bodyTemplateWithMeta === 'object') {
    let result = {};
    Object.keys(bodyTemplateWithMeta).forEach(key => {
      if (/^__oneOf-\d+__$/.test(key)) {
        const selectedOption = bodyTemplateWithMeta[key].find(option => combination.some(optionMeta => (
          option.optionMeta.id === optionMeta.id || option.optionMeta.nestedIds.includes(optionMeta.id)
        ))) || bodyTemplateWithMeta[key][0];
        result = { ...result, ...generateBodyFromBodyTemplateWithMeta(selectedOption.content, combination) };
      } else {
        result[key] = generateBodyFromBodyTemplateWithMeta(bodyTemplateWithMeta[key], combination);
      }
    });
    return result;
  }
  return bodyTemplateWithMeta;
}

function getTreeWithOneOfsAndOptions(attributes, selectedOptions) {
  const root = { oneOfs: [] };
  attributes.forEach((el) => traverse(el, root));
  return root;

  function traverse(element, parent) {
    switch (element.element) {
      case 'member':
        traverse(element.content.value, parent);
        break;
      case 'option': {
        const option = {
          isSelected: isOptionSelected(element.optionMeta.id, selectedOptions),
          isNestedOptionSelected: isNestedOptionSelected(element.optionMeta.nestedIds, selectedOptions),
          optionMeta: element.optionMeta,
          oneOfs: [],
          parent,
        };
        parent.options.push(option);
        element.content.map((el) => traverse(el, option));
        break;
      }
      case 'array':
        if (element.content) {
          element.content.map((el) => traverse(el, parent));
        }
        break;
      case 'object':
        if (element.content) {
          element.content.map((el) => traverse(el, parent));
        }
        break;
      case 'select': {
        const oneOf = {
          options: [],
          nextOneOf: null,
          parent,
        };
        if (parent.oneOfs.length > 0) {
          parent.oneOfs[parent.oneOfs.length - 1].nextOneOf = oneOf;
        }
        parent.oneOfs.push(oneOf);
        element.content.map((el) => traverse(el, oneOf));
        break;
      }
      default:
        break;
    }
  }
}

function getTreeWithNextOptionVariants(oneOf) {
  if (!oneOf) {
    return [];
  }
  let result = [];
  oneOf.options.forEach(option => {
    if (option.isSelected) {
      result.push({
        ...option,
        nextOptionVariants: getTreeWithNextOptionVariants(getNextOneOf(option)),
      });
    } else if (option.isNestedOptionSelected) {
      result = [...result, ...getTreeWithNextOptionVariants(option.oneOfs[0])];
    }
  });
  return result;
}

function getCombinations(variantsTree) {
  const combinations = [];
  variantsTree.forEach(option => {
    fillCombinations(option);
  });
  return combinations;

  function fillCombinations(option, combination = []) {
    if (option.nextOptionVariants.length === 0) {
      combinations.push([...combination, option.optionMeta]);
      return;
    }
    option.nextOptionVariants.forEach(nextOption => {
      fillCombinations(nextOption, [...combination, option.optionMeta]);
    });
  }
}

function getNextOneOf(option) {
  if (!option.parent) {
    return null;
  }
  if (option.parent.nextOneOf && oneOfHasSelectedOptions(option.parent.nextOneOf)) {
    return option.parent.nextOneOf;
  }
  return getNextOneOf(option.parent.parent);
}

function oneOfHasSelectedOptions(oneOf) {
  return oneOf.options.some(option => option.isSelected || option.isNestedOptionSelected);
}

export function isOptionSelected(optionId, selectedOptions) {
  return selectedOptions.some(opt => opt.id === optionId);
}

export function isNestedOptionSelected(nestedIds, selectedOptions) {
  return nestedIds.some(nestedId => isOptionSelected(nestedId, selectedOptions));
}

export const optionMetaShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  nestedIds: PropTypes.arrayOf(PropTypes.number).isRequired,
});

/**
 * Удаляет лишние выбранные опции — опции, которые содержат в себе какую-то из других выбранных опций.
 *
 * Например, если выбраны опции 1 и 2, и опция 1 включает опцию 2, то опция 1 — лишняя.
 */
function removeRedundantOptions(selectedOptions) {
  const selectedIds = selectedOptions.map(option => option.id);
  return selectedOptions.filter(option => !option.nestedIds.some(id => selectedIds.includes(id)));
}
