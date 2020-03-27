const defaultFound = Object.freeze({
  group: [],
  resource: [],
  action: [],
});

class SearchService {
  constructor(groups, resources, actions) {
    this.sourceGroups = groups;
    this.sourceResources = resources;
    this.sourceActions = actions;

    this.found = defaultFound;
  }

  search(searchQuery) {
    if (!searchQuery) return [];
    const [groupHigh, groupMid, groupLow] = searchInSource(searchQuery, this.sourceGroups, 'group');
    const [resHigh, resMid, resLow] = searchInSource(searchQuery, this.sourceResources, 'resource');
    const [actionHigh, actionMid, actionLow] = searchInSource(searchQuery, this.sourceActions, 'action');

    const highPriorityMatch = groupHigh.concat(resHigh, actionHigh);
    const midPriorityMatch = groupMid.concat(resMid, actionMid);
    const lowPriorityMatch = groupLow.concat(resLow, actionLow);

    this.found = {
      ...defaultFound,
      group: groupHigh.concat(groupMid, groupLow),
      resource: resHigh.concat(resMid, resLow),
      action: actionHigh.concat(actionMid, actionLow),
    };

    return highPriorityMatch.concat(midPriorityMatch, lowPriorityMatch);
  }

  applyFilter(activeFilters) {
    return Object.entries(activeFilters).reduce((acc, entry) => {
      const [type, isActive] = entry;
      if (isActive) {
        const res = this.found[type];
        return acc.concat(res);
      }
      return acc;
    }, []);
  }
}

function searchInSource(query, source, sourceType) {
  const highPriorityMatch = [];
  const midPriorityMatch = [];
  const lowPriorityMatch = [];

  source.forEach((sourceItem) => {
    const descriptionEl = sourceItem.content ? sourceItem.content.find(el => el.element === 'copy') : null;
    const description = descriptionEl ? descriptionEl.content : null;
    const titleMatch = findMatch(sourceItem.title, query);
    const descriptionMatch = description && findMatch(description, query);
    const method = sourceType === 'action' ? getMethod(sourceItem) : null;

    const searchItem = {
      label: sourceItem.title,
      value: sourceItem.route,
      to: sourceItem.route,
      type: sourceType,
      method,
    };

    if (sourceType === 'action') {
      const href = sourceItem.attributes.href;
      const hrefMatch = href && findMatch(href, query);

      if (hrefMatch) {
        highPriorityMatch.push({
          ...searchItem,
          label: href,
        });
      }
    }

    if (titleMatch) {
      midPriorityMatch.push(searchItem);
    }

    if (descriptionMatch) {
      lowPriorityMatch.push(searchItem);
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

export default SearchService;
