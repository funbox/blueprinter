import { t } from '@lingui/macro';
import Toggler from 'app/components/toggler';

import { sortService } from 'app/common/services/sort-service';

const SortToggler = (props) => (
  <div className={b('sort-toggler', props)}>
    <span>
      {t`Sort by name`}
    </span>

    <Toggler
      mods={{ checked: sortService.isGroupsSortingEnabled }}
      onChange={sortService.toggleGroupsSorting}
    >
      {t`Toggle sort by name`}
    </Toggler>
  </div>
);

export default SortToggler;
