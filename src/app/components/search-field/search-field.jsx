/* eslint-disable react/no-danger */
import Button from 'fb-base-blocks/button';
import TextField from 'app/components/text-field';
import MethodBadge from 'app/components/method-badge';

const MAX_VISIBLE_ITEMS = 10;
const MIN_QUERY_LENGTH = 3; // нужно ввести более трёх символов

const propTypes = {
  mods: PropTypes.object,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
      type: PropTypes.oneOf(['group', 'resource', 'action', 'message']),
      method: PropTypes.string,
    }),
  ),
  onSearch: PropTypes.func,
  onSelect: PropTypes.func,
  onKeyDown: PropTypes.func,
  onShowMoreButtonClick: PropTypes.func,
};

const defaultProps = {
  mods: {},
  items: [],
  onSearch: undefined,
  onSelect: undefined,
  onKeyDown: undefined,
  onShowMoreButtonClick: undefined,
};

class SearchField extends React.Component {
  constructor(props) {
    super(props);

    this.defaultState = {
      open: false,
      filterString: '',
      highlightedItem: null,
    };

    this.state = { ...this.defaultState };
    this.dropdown = React.createRef();
    this.input = React.createRef();

    this.onSearch = this.onSearch.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.closeOnClickAround = this.closeOnClickAround.bind(this);
    this.onShowMoreButtonClick = this.onShowMoreButtonClick.bind(this);
    this.select = this.select.bind(this);
  }

  componentDidMount() {
    window.addEventListener('click', this.closeOnClickAround);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.closeOnClickAround);
  }

  onSearch(value) {
    const {
      items,
      onSearch,
    } = this.props;

    this.setState({ filterString: value });

    if (!value) {
      this.close();
      return;
    }

    if (!!value && items) {
      this.setState({ open: true });
    }

    if (onSearch && value.length >= MIN_QUERY_LENGTH) {
      onSearch(value);
    }
  }

  onKeyDown(event) {
    const { items, onKeyDown } = this.props;
    const { highlightedItem } = this.state;
    const itemsCount = items.length;

    if (itemsCount === 0) {
      this.setState({ highlightedItem: null });
      return;
    }

    const itemIndex = items.indexOf(highlightedItem);
    switch (event.key) {
      case 'ArrowDown':
        this.setState({ highlightedItem: (itemIndex === itemsCount - 1 ? items[0] : items[itemIndex + 1]) });
        break;

      case 'ArrowUp':
        this.setState({ highlightedItem: (itemIndex === 0 ? items[itemsCount - 1] : items[itemIndex - 1]) });
        break;

      case 'Enter':
        if (!highlightedItem) return;
        this.select(highlightedItem);
        if (onKeyDown) onKeyDown(highlightedItem);
        break;

      default:
        this.setState({ highlightedItem: null });
    }
  }

  select(item) {
    const { onSelect } = this.props;

    if (onSelect) {
      onSelect(item);
    }
    this.close();
  }

  close() {
    const { open } = this.state;
    const { resetSearch } = this.props;

    if (!open) return;
    this.setState({ ...this.defaultState });
    if (resetSearch) {
      resetSearch();
    }
  }

  closeOnClickAround(e) {
    const dropdownElement = this.dropdown.current;
    const inputElement = this.input.current;
    const dropdownClick = dropdownElement && dropdownElement.contains(e.target);
    const inputClick = inputElement && inputElement.parentElement.contains(e.target);

    if (!(dropdownClick || inputClick)) {
      this.close();
    }
  }

  onShowMoreButtonClick() {
    const { onShowMoreButtonClick } = this.props;
    this.close();

    if (onShowMoreButtonClick) {
      onShowMoreButtonClick();
    }
  }

  render() {
    const {
      open,
      filterString,
      highlightedItem,
    } = this.state;

    const {
      items,
    } = this.props;

    const textFieldProps = Object.assign({}, this.props);
    const textFieldMods = textFieldProps.mods || {};

    delete textFieldProps.mods;
    delete textFieldProps.id;
    delete textFieldProps.mix;

    const defaultMods = { open };
    const visibleItems = items.slice(0, MAX_VISIBLE_ITEMS);
    const showMoreStories = items.length > visibleItems.length;
    const shortQuery = filterString.length < MIN_QUERY_LENGTH;

    return (
      <div className={b('search-field', this.props, defaultMods)}>
        <TextField
          mods={{
            type: 'search',
            theme: 'standard',
            ...textFieldMods,
          }}
          id="search-field-input"
          mix={b('search-field__field')}
          input={{
            mix: b('search-field__input'),
            onKeyDown: this.onKeyDown,
            ref: this.input,
          }}
          value={filterString}
          onChange={this.onSearch}
          placeholder="Поиск"
          {...textFieldProps}
        >
          <Button
            type="reset"
            mix={[b('search-field__clear-button')]}
            mods={{
              onlyIcon: true,
            }}
            htmlFor="search-field-input"
            text="Очистить поле"
            onClick={() => this.onSearch('')}
          />
        </TextField>

        <div
          className={b('search-field__dropdown')}
          ref={this.dropdown}
        >
          {
            visibleItems.length > 0 && (
              <>
                <ul className={b('search-field__option-list')}>
                  {
                    visibleItems.map(item => {
                      const highlighted = highlightedItem && highlightedItem.value === item.value;
                      const text = getHighlightedSuggestion(item.label, filterString.trim());
                      return (
                        <li
                          key={item.value}
                          className={b('search-field__option', { mods: { highlighted, type: item.type } })}
                        >
                          <Button
                            onClick={() => this.select(item)}
                            mix={b('search-field__option-text')}
                            to={item.to}
                          >
                            <span
                              className={b('button__text')}
                              dangerouslySetInnerHTML={{ __html: text }}
                            />
                          </Button>

                          {item.type === 'action' && (
                            <MethodBadge
                              method={item.method}
                              mix={b('search-field__badge')}
                            />
                          )}
                        </li>
                      );
                    })
                  }
                </ul>

                {
                  showMoreStories && (
                    <Button
                      mix={[b('search-field__more-stories')]}
                      onClick={this.onShowMoreButtonClick}
                    >
                      Показать больше
                    </Button>
                  )
                }
              </>
            )
          }

          {
            visibleItems.length === 0 && (
              <p className={b('search-field__message')}>
                {
                  shortQuery ? 'Введите не менее 3-х символов' : 'Ничего не найдено'
                }
              </p>
            )
          }
        </div>
      </div>
    );
  }
}

SearchField.propTypes = propTypes;
SearchField.defaultProps = defaultProps;

export default SearchField;

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getHighlightedSuggestion(suggestion, filterString) {
  const filterRegexp = new RegExp(escapeRegExp(filterString), 'gi');
  return suggestion.replace(filterRegexp, '<mark class="mark">$&</mark>');
}
