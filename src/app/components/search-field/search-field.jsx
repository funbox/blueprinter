/* eslint-disable react/no-danger */
import { FixedSizeList } from 'react-window';
import Button from 'fb-base-blocks/button';
import TextField from 'app/components/text-field';
import MethodBadge from 'app/components/method-badge';
import locationParams from 'app/common/utils/helpers/locationParams';

import SearchField__OptionList from './__option-list';

const SEARCH_OPTIONS_PER_FRAME = 10;
const SEARCH_OPTION_HEIGHT = 36;

const FORWARD_SLASH_KEY_CODE = 191;

const propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
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
  resetSearch: PropTypes.func,
  onSelect: PropTypes.func,
  onKeyDown: PropTypes.func,
  onShowMoreButtonClick: PropTypes.func,
};

const defaultProps = {
  mods: {},
  items: [],
  onSearch: undefined,
  resetSearch: undefined,
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
    this.onInputKeyDown = this.onInputKeyDown.bind(this);
    this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this);
    this.closeOnClickAround = this.closeOnClickAround.bind(this);
    this.onShowMoreButtonClick = this.onShowMoreButtonClick.bind(this);
    this.onInputFocus = this.onInputFocus.bind(this);
    this.select = this.select.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
    this.getItemKey = this.getItemKey.bind(this);
  }

  componentDidMount() {
    window.addEventListener('click', this.closeOnClickAround);
    document.addEventListener('keydown', this.onDocumentKeyDown);
    const { q: searchQuery } = locationParams.parse(this.props.location);
    if (searchQuery) {
      this.onSearch(searchQuery, false);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.closeOnClickAround);
    document.removeEventListener('keydown', this.onDocumentKeyDown);
  }

  onSearch(value, showDropdown = true) {
    const {
      onSearch,
    } = this.props;

    this.setState({ filterString: value });

    if (!value) {
      this.resetSearch();
      return;
    }

    if (showDropdown && value && !this.state.open) {
      this.setState({ open: true });
    }

    onSearch(value);
  }

  onInputKeyDown(event) {
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
        if (!highlightedItem) {
          this.onShowMoreButtonClick();
          return;
        }
        this.select(highlightedItem);
        if (onKeyDown) onKeyDown(highlightedItem);
        break;

      default:
        this.setState({ highlightedItem: null });
    }
  }

  onDocumentKeyDown(event) {
    const inputElement = this.input.current;

    if (!inputElement) return;

    const inputIsFocused = document.activeElement === inputElement;

    if (event.keyCode === FORWARD_SLASH_KEY_CODE && !inputIsFocused) {
      event.preventDefault(); // иначе символ `/` сразу же попадает в инпут поиска
      inputElement.focus();
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

    if (!open) return;
    this.setState(prevState => ({
      ...this.defaultState,
      filterString: prevState.filterString,
    }));
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

  onInputFocus() {
    const { open } = this.state;

    if (!open && this.props.items.length) {
      this.setState({ open: true });
    }
  }

  resetSearch() {
    const { resetSearch } = this.props;
    this.setState(this.defaultState);
    if (resetSearch) {
      resetSearch();
    }
  }

  getItemKey(index) {
    const { items } = this.props;

    return items[index] ? items[index].id : null;
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

    const dropdownHeight = items.length < SEARCH_OPTIONS_PER_FRAME
      ? items.length * SEARCH_OPTION_HEIGHT
      : SEARCH_OPTIONS_PER_FRAME * SEARCH_OPTION_HEIGHT;

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
            onKeyDown: this.onInputKeyDown,
            ref: this.input,
          }}
          onFocus={this.onInputFocus}
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
            onClick={this.resetSearch}
          />
        </TextField>

        <div
          className={b('search-field__dropdown')}
          ref={this.dropdown}
        >
          {
            items.length > 0 && (
              <FixedSizeList
                height={dropdownHeight}
                width="100%"
                itemCount={items.length}
                itemSize={SEARCH_OPTION_HEIGHT}
                innerElementType={SearchField__OptionList}
                itemKey={this.getItemKey}
              >
                {({ index, style }) => {
                  const item = items[index];
                  const highlighted = highlightedItem && highlightedItem.value === item.value;
                  const text = getHighlightedSuggestion(item.label, filterString.trim());
                  return (
                    <li
                      style={style}
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
                }}
              </FixedSizeList>
            )
          }

          {
            items.length === 0 && (
              <p className={b('search-field__message')}>
                Ничего не найдено
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
