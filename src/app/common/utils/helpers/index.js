const extractTransactionMethod = transition => (
  transition.content[0].content[0].attributes.method.content
);

const extractAttributeData = (attribute, disabledExample = false) => {
  const { key, value } = attribute.content;
  let attributeKey;
  let attributeType;
  let attributeExample;

  if (key && value) {
    attributeKey = key.content || null;
    attributeType = value.element || null;
    attributeExample = (!disabledExample && value.content) || null;
  } else {
    attributeType = attribute.element || null;
    attributeExample = (!disabledExample && attribute.content) || null;
  }

  const attributeDescription = (!!attribute.meta && attribute.meta.description.content) || null;
  const attributeProps = (!!attribute.attributes && attribute.attributes.typeAttributes[0].content) || null;

  return { attributeKey, attributeType, attributeExample, attributeDescription, attributeProps };
};

const getAttributeChildren = attribute => {
  const complexTypes = ['array', 'enum', 'object'];
  const childrenByType = {
    array: (attr) => (Array.isArray(attr.content) ? attr.content : attr.content.value.content),
    enum: (attr) => attr.content.value.attributes.enumerations.content,
    object: (attr) => (Array.isArray(attr.content) ? attr.content : attr.content.value.content),
  };

  const { value } = attribute.content;
  const attributeType = value ? value.element : attribute.element;

  if (!complexTypes.includes(attributeType)) {
    return [];
  }
  return childrenByType[attributeType](attribute);
};

export {
  extractTransactionMethod,
  extractAttributeData,
  getAttributeChildren,
};
