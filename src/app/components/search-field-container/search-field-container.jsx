import { withRouter } from 'react-router-dom';
import SearchField from 'app/components/search-field';

const propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

class SearchFieldContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchedItems: [],
    };

    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(searchQuery) {
    console.log(searchQuery);
  }

  render() {
    const { searchedItems } = this.state;

    return (
      <SearchField
        items={searchedItems}
        onSearch={this.onSearch}
      />
    );
  }
}

SearchFieldContainer.propTypes = propTypes;

export default withRouter(SearchFieldContainer);
