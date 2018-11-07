import { get } from './';

const parameteresRegex = /(?:{\?(.+)}$)/; // example: {?kind,full} -> "kind,full"

const defaultValues = {
  string: 'hello',
  boolean: 'true',
  number: '1',
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
    const type = get('meta', 'title', 'content').from(variable) || get('meta', 'title').from(variable);

    let definedValue;

    if (!value) {
      definedValue = type ? defaultValues[type] : name;
    } else {
      definedValue = (Array.isArray(value) && value[0]) ? value[0].content : (value.content || value);
    }

    if (Array.isArray(paramKeys) && paramKeys.includes(name)) {
      constructedParams.push(`${name}=${definedValue}`);
    }

    href = href.replace(`{${name}}`, definedValue);
  });

  if (constructedParams.length > 0) {
    href = href.concat(`?${constructedParams.join('&')}`);
  }

  return href;
};

export default formatHref;
