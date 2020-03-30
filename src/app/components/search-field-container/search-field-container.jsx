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

    this.searchService = new SearchService(groups, resources, actions);

    this.onSearch = this.onSearch.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
  }

  onSearch(searchQuery) {
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

  render() {
    const { searchedItems } = this.state;

    return (
      <SearchField
        items={searchedItems}
        onSearch={this.onSearch}
        onKeyDown={this.onKeyDown}
        resetSearch={this.resetSearch}
        location={this.props.location}
      />
    );
  }
}

SearchFieldContainer.propTypes = propTypes;
SearchFieldContainer.defaultProps = defaultProps;

export default withRouter(SearchFieldContainer);
