import parser from 'html-react-parser';
import showdown from 'showdown';

import Anchor from 'app/components/anchor';

const converter = new showdown.Converter({ disableForced4SpacesIndentedSublists: true });

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

const extractTransactionMethod = transition => {
  const method = transition.content.filter(i => i.element !== 'copy')[0].content[0].attributes.method;
  return method.content || method;
};

const extractAttributeData = (attribute, disabledExample = false) => {
  const typeAlias = {
    select: 'One of',
  };

  const key = get('content', 'key').from(attribute);
  const value = get('content', 'value').from(attribute);
  let attributeKey;
  let attributeType;
  let attributeExample;

  if (key && value) {
    attributeKey = key.content || null;
    attributeType = value.element || null;
    attributeExample = (!disabledExample && value.content) || null;
  } else {
    attributeType = typeAlias[attribute.element] || attribute.element || null;
    attributeExample = (!disabledExample && attribute.content) || null;
  }

  const attributeDescription = get('meta', 'description').from(attribute);
  const attributeProps = get('attributes', 'typeAttributes', '0').from(attribute);

  return { attributeKey, attributeType, attributeExample, attributeDescription, attributeProps };
};

const getAttributeChildren = attribute => {
  const complexTypes = ['array', 'enum', 'object', 'select', 'option'];
  const childrenByType = {
    array: (attr) => (Array.isArray(attr.content) ? attr.content : attr.content.value.content),
    enum: (attr) => (Array.isArray(attr.content) ? attr.content : attr.content.value.content),
    object: (attr) => (Array.isArray(attr.content) ? attr.content : attr.content.value.content),
    select: (attr) => (attr.content),
    option: (attr) => (attr.content),
  };

  const value = (attribute.content && attribute.content.value) || attribute.content;
  const attributeType = (value && value.element) ? value.element : attribute.element;

  if (!complexTypes.includes(attributeType) || !attribute.content) {
    return [];
  }

  return childrenByType[attributeType](attribute);
};

const hashFromTitle = title => title.split(' ').join('-');

const withHeaderAnchors = (description) => {
  const modifiedChildren = React.Children.map(description.props.children, textElement => {
    if (textElement.type && /^h\d$/.exec(textElement.type)) {
      const text = textElement.props.children.toLowerCase();
      const title = `header-${text}`;
      const childrenArray = React.Children.toArray(textElement.props.children);

      childrenArray[0] = childrenArray[0].concat(' ');
      childrenArray.push(<Anchor title={title} mods={{ for: 'description' }} key={`anchor-of-${text}`}/>);

      return React.cloneElement(textElement, { id: hashFromTitle(title) }, childrenArray);
    }

    return textElement;
  });

  return React.cloneElement(description, {}, modifiedChildren);
};

export {
  extractTransactionMethod,
  extractAttributeData,
  getAttributeChildren,
  get,
  hashFromTitle,
  htmlFromText,
  withHeaderAnchors,
};
