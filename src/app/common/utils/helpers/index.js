import parser from 'html-react-parser';
import showdown from 'showdown';

const converter = new showdown.Converter();

const htmlFromText = (text, wrap = 'no-wrap', Tag = 'div') => {
  const htmlString = converter.makeHtml(text);
  if (wrap === 'wrap') {
    return <Tag dangerouslySetInnerHTML={{ __html: htmlString }}/>;
  }

  return <React.Fragment>{parser(htmlString)}</React.Fragment>;
};

const get = (...path) => {
  const from = (source) =>
    path.reduce((xs, x) => ((xs && xs[x]) ? xs[x] : null), source);

  return { from };
};

const extractTransactionMethod = transition => (
  transition.content.filter(i => i.element !== 'copy')[0].content[0].attributes.method.content
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

  const attributeDescription = get('meta', 'description', 'content').from(attribute);
  const attributeProps = get('attributes', 'typeAttributes', 'content', '0', 'content').from(attribute);

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
  get,
  htmlFromText,
};
