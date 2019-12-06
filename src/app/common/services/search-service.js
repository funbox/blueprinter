const hrefRegex = /(\/\S*)/i;
const methodRegex = /(delete|get|head|options|patch|post|put)/i;

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

    if (hrefRegex.test(searchQuery) || methodRegex.test(searchQuery)) {
      const actionMatch = searchInAction(searchQuery, this.sourceActions);
      this.found = {
        ...defaultFound,
        action: actionMatch,
      };
      return actionMatch;
    }
    const groupMatch = searchInSource(searchQuery, this.sourceGroups, 'group');
    const resourceMatch = searchInSource(searchQuery, this.sourceResources, 'resource');
    const actionMatch = searchInSource(searchQuery, this.sourceActions, 'action');
    this.found = {
      ...defaultFound,
      group: groupMatch,
      resource: resourceMatch,
      action: actionMatch,
    };
    const fullMatch = groupMatch.concat(resourceMatch, actionMatch);
    return fullMatch;
  }

  applyFilter(activeFilters) {
    const fullMatch = Object.entries(activeFilters).reduce((acc, entry) => {
      const [type, isActive] = entry;
      if (isActive) {
        const res = this.found[type];
        return acc.concat(res);
      }
      return acc;
    }, []);
    return fullMatch;
  }
}

function searchInSource(query, source, sourceType) {
  const searchResult = source.reduce((result, sourceItem) => {
    const descriptionEl = sourceItem.content ? sourceItem.content.find(el => el.element === 'copy') : null;
    const description = descriptionEl ? descriptionEl.content : null;
    const titleMatch = findMatch(sourceItem.title, query);
    const descriptionMatch = description && findMatch(description, query);
    let method = null;
    if (sourceType === 'action') {
      method = sourceItem.type === 'message' ? 'message' : sourceItem.attributes.method;
    }

    if (titleMatch || descriptionMatch) {
      return result.concat([{
        label: sourceItem.title,
        value: sourceItem.route,
        to: sourceItem.route,
        type: sourceType,
        method,
      }]);
    }

    return result;
  }, []);
  return searchResult;
}

function searchInAction(query, source) {
  const methodRegexpMatch = methodRegex.exec(query);
  const hrefRegexpMatch = hrefRegex.exec(query);

  const methodFromQuery = methodRegexpMatch && methodRegexpMatch[1] || null;
  const hrefFromQuery = hrefRegexpMatch && hrefRegexpMatch[1] || null;

  const searchResult = source.reduce((result, sourceItem) => {
    const titleMatch = findMatch(sourceItem.title, query);
    const methodMatch = methodFromQuery ? findMatch(sourceItem.attributes.method, methodFromQuery) : null;
    const hrefMatch = hrefFromQuery ? findMatch(sourceItem.attributes.href, hrefFromQuery) : null;
    const methodHrefMatch = methodFromQuery && hrefFromQuery ? (methodMatch && hrefMatch) : (methodMatch || hrefMatch);

    if (methodHrefMatch || titleMatch) {
      return result.concat([{
        label: hrefMatch ? sourceItem.attributes.href : sourceItem.title,
        value: sourceItem.route,
        to: sourceItem.route,
        type: 'action',
        method: sourceItem.attributes.method,
      }]);
    }
    return result;
  }, []);

  return searchResult;
}

function findMatch(source, substr) {
  if (!source || !substr || (typeof source !== 'string') || (typeof substr !== 'string')) {
    console.error(`Invalid search params: ${source}, ${substr}`);
    return false;
  }
  return source.toLowerCase().includes(substr.toLowerCase());
}

export default SearchService;
