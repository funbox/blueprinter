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

function findMatch(source, substr) {
  if (!source || !substr || (typeof source !== 'string') || (typeof substr !== 'string')) {
    console.error(`Invalid search params: ${source}, ${substr}`);
    return false;
  }
  return source.toLowerCase().includes(substr.toLowerCase());
}

export default SearchService;
