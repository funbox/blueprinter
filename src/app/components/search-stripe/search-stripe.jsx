import Button from 'fb-base-blocks/button';
import SearchFieldContainer from 'app/components/search-field-container';

const SearchStripe = (props) => (
  <div className={b('search-stripe', props)}>
    <SearchFieldContainer
      {...props}
      mix={b('search-stripe__search-field')}
    />

    <Button
      text="Перейти на страницу для ручного поиска"
      mods={{
        onlyIcon: true,
      }}
      to="/manual-search-page"
      mix={b('search-stripe__manual-search-button')}
    />
  </div>
);

export default SearchStripe;
