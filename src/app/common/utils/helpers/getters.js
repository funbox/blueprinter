import { createHash, hashFromComment } from './hash';

export function get(...path) {
  const from = (source) => path.reduce((xs, x) => ((xs && xs[x] !== undefined) ? xs[x] : null), source);

  return { from };
}

export function getSourceElementIndexByType(source, type) {
  return source.content.findIndex(item => item.element === type);
}

export function getSourceElementIndexByTypeAndClass(source, type, cls) {
  return source.content.findIndex(item => (
    item.element === type && item.meta.classes.content[0].content === cls));
}

export function getBody(source) {
  const index = getSourceElementIndexByTypeAndClass(source, 'asset', 'messageBody');

  return (index > -1) ? source.content[index].content : null;
}

export function getBodyTemplate(source) {
  const index = getSourceElementIndexByTypeAndClass(source, 'asset', 'messageBodyTemplate');

  return (index > -1) ? source.content[index].content : null;
}

export function getSchema(source) {
  const index = getSourceElementIndexByTypeAndClass(source, 'asset', 'messageBodySchema');

  return (index > -1) ? source.content[index].content : null;
}

export function getDescription(source) {
  const index = getSourceElementIndexByType(source, 'copy');

  return (index > -1) ? source.content[index].content : null;
}

export function getDescriptionWithoutHeaders(source) {
  const description = getDescription(source);

  if (!description) return description;

  const descriptionHeaders = getDescriptionHeaders(description);

  return descriptionHeaders.length > 0
    ? description.slice(0, descriptionHeaders[0].index - 1)
    : description;
}

export function getDescriptionHeaders(description) {
  const descriptionHeaders = [];
  const regex = /#{2,}\s?(.+)\n?/g;
  let match = regex.exec(description);
  while (match) {
    descriptionHeaders.push({ title: match[1], index: match.index });
    match = regex.exec(description);
  }

  return descriptionHeaders;
}

export function getDescriptionHeadersWithHash(description) {
  const descriptionHeaders = getDescriptionHeaders(description);

  return descriptionHeaders.map((item, idx) => {
    let headerDescriptionPart;
    if (idx === descriptionHeaders.length - 1) {
      headerDescriptionPart = description.slice(descriptionHeaders[idx].index, description.length);
    } else {
      headerDescriptionPart = description.slice(descriptionHeaders[idx].index, descriptionHeaders[idx + 1].index - 1);
    }

    const presetHash = headerDescriptionPart && hashFromComment(headerDescriptionPart);
    const hash = presetHash ? createHash(presetHash) : createHash(`header-${item.title}`);
    return { title: item.title, hash };
  });
}
