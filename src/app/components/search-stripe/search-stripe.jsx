import Button from 'fb-base-blocks/button';
import SearchFieldContainer from 'app/components/search-field-container';

const SearchStripe = (props) => (
  <div className={b('search-stripe', props)}>
    <SearchFieldContainer
      {...props}
      mix={b('search-stripe__search-field')}
    />

    <Button
      text={{
        content: 'Перейти на страницу ручного поиска',
        mix: b('search-stripe__button-hint'),
      }}
      to="/manual-search-page"
      mix={b('search-stripe__manual-search-button')}
    />
  </div>
);

export default SearchStripe;
