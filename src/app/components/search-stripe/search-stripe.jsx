import { t } from '@lingui/macro';
import Button from 'fb-base-blocks/button';
import SearchFieldContainer from 'app/components/search-field-container';

import SearchStripe__ManualSearchButtonIcon from './__manual-search-button-icon/search-stripe__manual-search-button-icon.svg?inline';

const SearchStripe = (props) => (
  <div className={b('search-stripe', props)}>
    <SearchFieldContainer
      {...props}
      mix={b('search-stripe__search-field')}
    />

    <Button
      text={{
        content: t`To manual search page`,
        mix: b('search-stripe__button-hint'),
      }}
      icon={{
        content: <SearchStripe__ManualSearchButtonIcon/>,
        mix: b('search-stripe__manual-search-button-icon'),
      }}
      to="/manual-search-page"
      mix={b('search-stripe__manual-search-button')}
    />
  </div>
);

export default SearchStripe;
