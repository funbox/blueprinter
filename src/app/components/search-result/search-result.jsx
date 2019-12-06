import CheckboxField from 'fb-base-blocks/checkbox-field';
import SerpList, { serpListProps, searchItemType } from 'app/components/serp-list';
import Pagination from 'app/components/pagination';
import getPlural from 'app/common/utils/helpers/getPlural';

const getMatchesPlural = (n) => getPlural(n, 'совпадение', 'совпадения', 'совпадений');

const propTypes = {
  title: PropTypes.string,
  searchItems: serpListProps.items,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  totalItems: PropTypes.number,
  setPage: PropTypes.func,
  onFilterChange: PropTypes.func,
};

const defaultProps = {
  title: '',
  searchItems: [],
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
};

class SearchResult extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchFilters: {
        group: true,
        resource: true,
        action: true,
      },
    };
  }

  onFilterChange(type, checked) {
    this.setState(prevState => ({
      searchFilters: {
        ...prevState.searchFilters,
        [type]: checked,
      },
    }), () => {
      if (this.props.onFilterChange) {
        this.props.onFilterChange(this.state.searchFilters);
      }
    });
  }

  render() {
    const { searchFilters } = this.state;
    const {
      title,
      searchItems,
      currentPage,
      totalPages,
      totalItems,
      setPage,
    } = this.props;

    return (
      <div className={b('search-result', this.props)}>
        <div className={b('search-result__header')}>
          <h2 className={b('search-result__title')}>
            {title}
          </h2>

          <p className={b('search-result__match-counter')}>
            Найдено <b className={b('mark')}>{totalItems}</b> {getMatchesPlural(totalItems)}
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

        {
          totalPages > 1 && (
            <div className={b('search-result__footer')}>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setPage={setPage}
              />
            </div>
          )
        }
      </div>
    );
  }
}

SearchResult.propTypes = propTypes;
SearchResult.defaultProps = defaultProps;

export default SearchResult;
