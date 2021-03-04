const possibleModifiers = {
  type: ['group', 'action', 'resource'],
  method: ['delete', 'get', 'head', 'options', 'patch', 'post', 'put', 'message'],
};

const modifiersRegexps = Object.keys(possibleModifiers).map(modifierType => {
  const modifierValues = possibleModifiers[modifierType];
  return new RegExp(`^(${modifierType}):(${modifierValues.join('|')})\\s+(.+)`, 'i');
});

class SearchService {
  constructor(groups, resources, actions) {
    this.sourceGroups = groups;
    this.sourceResources = resources;
    this.sourceActions = actions;
  }

  search(rawSearchQuery) {
    if (!rawSearchQuery) return [];

    const { searchQuery, modifiers } = extractModifiers(rawSearchQuery);

    const [groupHigh, groupMid, groupLow] = searchInSource(searchQuery, this.sourceGroups, 'group', modifiers);
    const [resHigh, resMid, resLow] = searchInSource(searchQuery, this.sourceResources, 'resource', modifiers);
    const [actionHigh, actionMid, actionLow] = searchInSource(searchQuery, this.sourceActions, 'action', modifiers);

    const highPriorityMatch = groupHigh.concat(resHigh, actionHigh);
    const midPriorityMatch = groupMid.concat(resMid, actionMid);
    const lowPriorityMatch = groupLow.concat(resLow, actionLow);

    return highPriorityMatch.concat(midPriorityMatch, lowPriorityMatch);
  }
}

function searchInSource(query, source, sourceType, searchModifiers) {
  const highPriorityMatch = [];
  const midPriorityMatch = [];
  const lowPriorityMatch = [];

  const emptyResponse = [[], [], []];

  if (searchModifiers.type !== undefined && searchModifiers.type !== sourceType) {
    return emptyResponse;
  }

  if (searchModifiers.method !== undefined && sourceType !== 'action') {
    return emptyResponse;
  }

  source.forEach((sourceItem) => {
    const titleMatch = findMatch(sourceItem.title, query);
    const descriptionEl = sourceItem.content ? sourceItem.content.find(el => el.element === 'copy') : null;
    const description = descriptionEl ? descriptionEl.content : null;
    const descriptionMatch = description && findMatch(description, query);
    const method = sourceType === 'action' ? getMethod(sourceItem) : null;
    const methodMatch = searchModifiers.method === undefined
      ? true
      : method.toLowerCase() === searchModifiers.method.toLowerCase();

    const searchItemBase = {
      label: sourceItem.title,
      value: sourceItem.route,
      to: sourceItem.route,
      type: sourceType,
      method,
    };

    if (sourceType === 'action') {
      if (!methodMatch) {
        return;
      }

      const href = sourceItem.attributes && sourceItem.attributes.href;
      const hrefMatch = href && findMatch(href, query);

      if (hrefMatch) {
        highPriorityMatch.push({
          ...searchItemBase,
          label: href,
          id: `high-${sourceType}-${searchItemBase.value}`,
        });
      }
    }

    if (titleMatch) {
      midPriorityMatch.push({
        ...searchItemBase,
        id: `mid-${sourceType}-${searchItemBase.value}`,
      });
    }

    if (descriptionMatch) {
      lowPriorityMatch.push({
        ...searchItemBase,
        id: `low-${sourceType}-${searchItemBase.value}`,
      });
    }
  });

  return [highPriorityMatch, midPriorityMatch, lowPriorityMatch];

  function getMethod(element) {
    return element.type === 'message' ? 'message' : element.attributes.method;
  }
}

function findMatch(source, substr) {
  if (!source || !substr || (typeof source !== 'string') || (typeof substr !== 'string')) {
    console.error(`Invalid search params: ${source}, ${substr}`);
    return false;
  }
  const lcSource = source.toLowerCase();
  const lcSubstr = substr.toLowerCase();
  const words = lcSubstr.split(' ').filter(Boolean);
  return words.every((word) => lcSource.includes(word));
}

function extractModifiers(rawSearchQuery) {
  return modifiersRegexps.reduce((result, regex) => {
    if (regex.test(rawSearchQuery)) {
      const [, type, value, extractedQuery] = regex.exec(rawSearchQuery);
      result.searchQuery = extractedQuery;
      result.modifiers[type] = value;
    }
    return result;
  }, { searchQuery: rawSearchQuery, modifiers: {} });
}

export default SearchService;
