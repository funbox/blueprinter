import { withRouter } from 'react-router-dom';
import SearchField from 'app/components/search-field';

const hrefRegex = /(\/\S*)/i;
const methodRegex = /(delete|get|head|options|patch|post|put)/i;

const propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  groups: PropTypes.arrayOf(PropTypes.object),
  resources: PropTypes.arrayOf(PropTypes.object),
  actions: PropTypes.arrayOf(PropTypes.object),
};

const defaultProps = {
  groups: [],
  resources: [],
  actions: [],
};

class SearchFieldContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchedItems: [],
    };

    this.searchQuery = null;

    this.onSearch = this.onSearch.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onShowMoreButtonClick = this.onShowMoreButtonClick.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
  }

  onSearch(searchQuery) {
    const { groups, resources, actions } = this.props;
    this.searchQuery = searchQuery;

    if (hrefRegex.test(searchQuery) || methodRegex.test(searchQuery)) {
      const actionMatch = searchInAction(searchQuery, actions);
      this.setState({
        searchedItems: actionMatch,
      });
      return;
    }
    const groupMatch = searchInSource(searchQuery, groups, 'group');
    const resourceMatch = searchInSource(searchQuery, resources, 'resource');
    const actionMatch = searchInSource(searchQuery, actions, 'action');
    const fullMatch = groupMatch.concat(resourceMatch, actionMatch);
    this.setState({
      searchedItems: fullMatch,
    });
  }

  resetSearch() {
    this.setState({
      searchedItems: [],
    });
  }

  onKeyDown(selectedItem) {
    this.props.history.push(selectedItem.to);
  }

  onShowMoreButtonClick() {
    const queryString = encodeURIComponent(this.searchQuery);
    this.props.history.push(`/search-result?q=${queryString}`);
  }

  render() {
    const { searchedItems } = this.state;

    return (
      <SearchField
        items={searchedItems}
        onSearch={this.onSearch}
        onKeyDown={this.onKeyDown}
        onShowMoreButtonClick={this.onShowMoreButtonClick}
        resetSearch={this.resetSearch}
      />
    );
  }
}

SearchFieldContainer.propTypes = propTypes;
SearchFieldContainer.defaultProps = defaultProps;

export default withRouter(SearchFieldContainer);

function searchInSource(query, source, sourceType) {
  const searchResult = source.reduce((result, sourceItem) => {
    const descriptionEl = sourceItem.content.find(el => el.element === 'copy');
    const description = descriptionEl ? descriptionEl.content : null;
    const titleMatch = findMatch(sourceItem.title, query);
    const descriptionMatch = description && findMatch(description, query);

    if (titleMatch || descriptionMatch) {
      return result.concat([{
        label: sourceItem.title,
        value: sourceItem.route,
        to: sourceItem.route,
        type: sourceType,
        method: sourceType === 'action' ? sourceItem.attributes.method : null,
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
