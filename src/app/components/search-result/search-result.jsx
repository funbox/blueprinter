import CheckboxField from 'fb-base-blocks/checkbox-field';
import SerpList, { serpListProps, searchItemType } from 'app/components/serp-list';
import Pagination from 'app/components/pagination';

const propTypes = {
  title: PropTypes.string,
  searchItems: serpListProps.items,
};

const defaultProps = {
  title: '',
  searchItems: [],
};

class SearchResult extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchFilters: {
        group: true,
        resource: true,
        action: true,
        message: true,
      },
    };
  }

  onFilterChange(type, checked) {
    this.setState(prevState => ({
      searchFilters: {
        ...prevState.searchFilters,
        [type]: checked,
      },
    }));
  }

  render() {
    const { searchFilters } = this.state;
    const {
      title,
      searchItems,
    } = this.props;

    return (
      <div className={b('search-result', this.props)}>
        <div className={b('search-result__header')}>
          <h2 className={b('search-result__title')}>
            {title}
          </h2>

          <p className={b('search-result__match-counter')}>
            Найдено <b className={b('mark')}>1 892</b> совпадения
          </p>

          <div className={b('search-result__filter')}>
            <fieldset className={b('search-result__fieldset')}>
              <legend className={b('search-result__legend')}>
                Выберите отображаемые ресурсы:
              </legend>
              {
                Object.keys(searchFilters).map((filterType) => (
                  <CheckboxField
                    key={`filter-${filterType}`}
                    id={`filter-${filterType}`}
                    onChange={(checked) => this.onFilterChange(filterType, checked)}
                    name="filter"
                    value={filterType}
                    mods={{
                      checked: searchFilters[filterType],
                      for: 'search-filter',
                    }}
                    mix={b('search-result__checkbox')}
                  >
                    {searchItemType[filterType]}
                  </CheckboxField>
                ))
              }
            </fieldset>
          </div>
        </div>

        <div className={b('search-result__body')}>
          <SerpList items={searchItems}/>
        </div>

        <div className={b('search-result__footer')}>
          <Pagination currentPage={1} totalPages={4}/>
        </div>
      </div>
    );
  }
}

SearchResult.propTypes = propTypes;
SearchResult.defaultProps = defaultProps;

export default SearchResult;
