import SearchResult from 'app/components/search-result';
import SearchService from 'app/common/services/search-service';
import locationParams from 'app/common/utils/helpers/locationParams';

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

class SearchResultView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      displayedResults: [],
      currentPage: 1,
      totalPages: 1,
      title: '',
    };

    this.pageSize = 20;

    const { groups, resources, actions } = props;
    this.searchService = new SearchService(groups, resources, actions);

    this.setPage = this.setPage.bind(this);
  }

  componentDidMount() {
    const { q: searchQuery, page } = locationParams.parse(this.props.location);
    if (searchQuery) {
      this.performNewSearch(searchQuery).then(() => {
        if (page) {
          this.setPage(parseInt(page, 10));
        }
      });
      this.searchQuery = searchQuery;
    }
  }

  componentDidUpdate(prevProps) {
    const { q: prevQuery } = locationParams.parse(prevProps.location);
    const { q: currentQuery } = locationParams.parse(this.props.location);

    if (prevQuery !== currentQuery) {
      this.performNewSearch(currentQuery);
      this.searchQuery = currentQuery;
    }
  }

  performNewSearch(searchQuery) {
    const searchResults = this.searchService.search(searchQuery);
    const totalPages = Math.ceil(searchResults.length / this.pageSize);
    const displayedResults = searchResults.slice(0, this.pageSize);

    return new Promise((resolve) => {
      this.setState({
        title: searchQuery,
        currentPage: 1,
        totalPages,
        searchResults,
        displayedResults,
      }, resolve);
    });
  }

  setPage(newPage) {
    const { searchQuery } = this;
    const { searchResults } = this.state;
    const { location, history } = this.props;
    const startItem = (newPage - 1) * this.pageSize;
    const displayedResults = searchResults.slice(startItem, this.pageSize * newPage);
    const newParams = {
      q: searchQuery,
      page: newPage,
    };

    this.setState({
      currentPage: newPage,
      displayedResults,
    }, () => {
      window.scrollTo(0, 0);
      history.replace({ ...location, search: locationParams.combine(newParams) });
    });
  }

  render() {
    const {
      title,
      searchResults,
      displayedResults,
      currentPage,
      totalPages,
    } = this.state;

    return (
      <SearchResult
        title={title}
        searchItems={displayedResults}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={searchResults.length}
        setPage={this.setPage}
      />
    );
  }
}

SearchResultView.propTypes = propTypes;
SearchResultView.defaultProps = defaultProps;

export default SearchResultView;
