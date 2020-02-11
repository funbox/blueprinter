import { get } from '.';

const parameteresRegex = /(?:{\?(.+)}$)/; // example: {?kind,full} -> "kind,full"

const defaultValues = {
  string: 'hello',
  boolean: 'true',
  number: '1',
  array: 'hello',
  enum: 'hello',
  object: encodeURIComponent('{}'),
};

const formatHref = (href, variables) => {
  let paramKeys;
  const constructedParams = [];

  const paramsMatch = parameteresRegex.exec(href);
  if (paramsMatch && paramsMatch[1]) {
    const fullMatch = paramsMatch[0];
    const groupMatch = paramsMatch[1];
    paramKeys = groupMatch.split(',');
    href = href.slice(0, href.length - fullMatch.length);
  }

  variables.forEach(variable => {
    const name = get('content', 'key', 'content').from(variable);
    const value = get('content', 'value', 'content').from(variable);
    const rawType = get('meta', 'title', 'content').from(variable) || get('meta', 'title').from(variable);
    const resolvedType = resolveType(rawType);
    const type = resolvedType.nestedTypes[0] ? resolvedType.nestedTypes[0] : resolvedType.type;

    let definedValue;

    if (!value) {
      definedValue = type ? defaultValues[type] : name;
    } else {
      definedValue = (Array.isArray(value) && value[0]) ? value[0].content : (value.content || value);
    }

    if (Array.isArray(paramKeys)) {
      if (paramKeys.includes(name)) {
        constructedParams.push(`${name}=${definedValue}`);
      } else if (paramKeys.includes(`${name}*`)) {
        definedValue
          .split(',')
          .forEach(definedValueItem => constructedParams.push(`${name}=${definedValueItem.trim()}`));
      }
    }

    href = href.replace(`{${name}}`, definedValue);
  });

  if (constructedParams.length > 0) {
    href = href.concat(`?${constructedParams.join('&')}`);
  }

  return href;
};

export default formatHref;

function resolveType(type) {
  const result = {
    type,
    nestedTypes: [],
  };

  const matchData = /^(.*?)\s*(\[(.*)])?$/.exec(type);
  const resolvedType = matchData[1];
  result.type = resolvedType;
  if (matchData[3]) {
    result.nestedTypes = matchData[3].split(',').map(rawType => rawType.trim()).filter(t => !!t);
  }

  return result;
}
