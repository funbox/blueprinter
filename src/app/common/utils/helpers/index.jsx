import parser from 'html-react-parser';
import Anchor from 'app/components/anchor';
import { get, getDescriptionHeadersWithHash } from './getters';

const commonmark = require('@funbox/commonmark');

const markdownParser = new commonmark.Parser();
const htmlRenderer = new commonmark.HtmlRenderer();

const customFenceRegex = /:{3}\s?(note|warning)/;

const htmlFromText = (text, wrap = 'no-wrap', Tag = 'div') => {
  let parsedMarkdown;
  if (customFenceRegex.test(text)) {
    parsedMarkdown = parseTextWithCustomBlocks(text);
  } else {
    parsedMarkdown = markdownParser.parse(text);
  }
  const htmlString = htmlRenderer.render(parsedMarkdown);

  if (wrap === 'wrap') {
    return <Tag dangerouslySetInnerHTML={{ __html: htmlString }}/>;
  }

  return <React.Fragment>{parser(htmlString)}</React.Fragment>;
};

const extractAttributeData = (attribute) => {
  const typeAlias = {
    select: 'One of',
  };

  const key = get('content', 'key').from(attribute);
  const value = get('content', 'value').from(attribute);
  const attributeStructureName = attribute.referenceDataStructure;
  let attributeKey;
  let attributeType;
  let attributeExample;
  let recursive = attribute.recursive;

  if (key && value) {
    attributeKey = key.content || null;
    attributeType = value.element || null;
    attributeExample = getAttributeExample(value);
  } else {
    attributeType = typeAlias[attribute.element] || attribute.element || null;
    attributeExample = getAttributeExample(attribute);
  }

  const attributeDescription = get('meta', 'description', 'content').from(attribute);
  let attributeProps = get('attributes', 'typeAttributes', 'content').from(attribute);

  if (value) {
    const valueAttributes = get('attributes', 'typeAttributes', 'content').from(value);
    if (Array.isArray(valueAttributes)) {
      attributeProps = attributeProps || [];
      attributeProps = attributeProps.concat(valueAttributes);
    }
    recursive = value.recursive || recursive;
  }

  return {
    attributeKey,
    attributeType,
    attributeExample,
    attributeDescription,
    attributeProps,
    attributeStructureName,
    recursive,
  };
};

const getAttributeChildren = attribute => {
  const complexTypes = ['array', 'enum', 'object', 'select', 'option'];
  const childrenByType = {
    array: (attr) => (Array.isArray(attr.content) ? attr.content : attr.content.value.content),
    enum: (attr) => (Array.isArray(attr.content) ? attr.content : attr.content.value.attributes.enumerations.content),
    object: (attr) => (Array.isArray(attr.content) ? attr.content : attr.content.value.content),
    select: (attr) => (attr.content),
    option: (attr) => (attr.content),
  };

  const value = (attribute.content && attribute.content.value) || attribute.content;
  const attributeType = (value && value.element) ? value.element : attribute.element;

  if (complexTypes.includes(attributeType) && attribute.content) {
    return childrenByType[attributeType](attribute);
  }

  return (attributeType === 'enum' && get('attributes', 'enumerations', 'content').from(attribute)) || [];
};

const withHeaderAnchors = (description, pathname) => {
  const headers = getDescriptionHeadersWithHash(description);
  const html = htmlFromText(description);

  const modifiedChildren = React.Children.map(html.props.children, textElement => {
    if (textElement.type && /^h\d$/.exec(textElement.type)) {
      const text = textElement.props.children;
      const hash = headers.find(header => header.title === text).hash;
      const childrenArray = React.Children.toArray(textElement.props.children);

      childrenArray[0] = childrenArray[0].concat(' ');
      childrenArray.push(
        <Anchor
          hash={hash}
          pathname={pathname}
          mods={{ for: 'description' }}
          key={`anchor-of-${text}`}
        />,
      );

      return React.cloneElement(textElement, { id: hash }, childrenArray);
    }

    return textElement;
  });

  return React.cloneElement(html, {}, modifiedChildren);
};

function parseTextWithCustomBlocks(text) {
  const splitChar = '\n';
  const lines = text.split(splitChar);
  const fenceStartRegex = customFenceRegex;
  const fenceEndRegex = /:{3}$/;

  let uniqueId = 0;
  let fencedBlocks = [];
  let currentFencedBlock = null;

  const replacedLines = lines.map(line => {
    if (!currentFencedBlock && fenceStartRegex.test(line)) {
      const type = fenceStartRegex.exec(line)[1];
      const id = uniqueId++;
      currentFencedBlock = {
        id,
        type,
        contentLines: [],
      };
      return '```'.concat(`${type}${id}`);
    }
    if (currentFencedBlock && fenceEndRegex.test(line)) {
      fencedBlocks.push(currentFencedBlock);
      currentFencedBlock = null;
      return '```';
    }
    if (currentFencedBlock) {
      currentFencedBlock.contentLines.push(line);
    }
    return line;
  });

  const replacedText = replacedLines.join(splitChar);
  const parsedMarkdown = markdownParser.parse(replacedText);

  fencedBlocks = fencedBlocks.map(block => {
    const contentText = block.contentLines.join(splitChar);
    const parsedContent = markdownParser.parse(contentText);
    const openingTag = new commonmark.Node('html_block');
    const closingTag = new commonmark.Node('html_block');
    openingTag.literal = `<div class="${b('information', { mods: { type: block.type } })}">`;
    closingTag.literal = '</div>';
    parsedContent.prependChild(openingTag);
    parsedContent.appendChild(closingTag);
    return {
      ...block,
      contentText,
      parsedContent,
    };
  });

  const walker = parsedMarkdown.walker();
  let event = walker.next();
  let node;

  while (event) {
    node = event.node;
    if (node.type === 'code_block' && (/^(note|warning)\d+/.test(node.info))) {
      const [, type, id] = /^(note|warning)(\d+)/.exec(node.info);
      const correspondingBlock = fencedBlocks.find(block => (Number(block.id) === Number(id) && block.type === type));
      node.insertBefore(correspondingBlock.parsedContent);
      node.unlink();
    }
    event = walker.next();
  }

  return parsedMarkdown;
}

function getAttributeExample(valueElement) {
  if (valueElement.content !== undefined && isPrimitive(valueElement.content)) {
    return valueElement.content;
  }

  const samples = get('attributes', 'samples', 'content').from(valueElement);
  return Array.isArray(samples) ? samples.map(sampleElement => {
    if (sampleElement.element === 'array') {
      return `[${sampleElement.content.map(sample => sample.content).join(', ')}]`;
    }

    return sampleElement.content;
  }).join(', ') : null;
}

function isPrimitive(value) {
  return ['string', 'number', 'boolean'].includes(typeof value);
}

export {
  extractAttributeData,
  getAttributeChildren,
  htmlFromText,
  withHeaderAnchors,
};
