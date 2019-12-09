import { withRouter } from 'react-router-dom';
import SearchField from 'app/components/search-field';
import SearchService from 'app/common/services/search-service';

const propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
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

    const { groups, resources, actions } = props;

    this.searchQuery = null;
    this.searchService = new SearchService(groups, resources, actions);

    this.onSearch = this.onSearch.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onShowMoreButtonClick = this.onShowMoreButtonClick.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
  }

  onSearch(searchQuery) {
    this.searchQuery = searchQuery;

    const searchResult = this.searchService.search(searchQuery);

    this.setState({
      searchedItems: searchResult,
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
        location={this.props.location}
      />
    );
  }
}

SearchFieldContainer.propTypes = propTypes;
SearchFieldContainer.defaultProps = defaultProps;

export default withRouter(SearchFieldContainer);
