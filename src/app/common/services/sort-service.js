import cookies from 'app/common/utils/helpers/cookies';

import { SORT_METHOD_GROUPS_COOKIE_NAME } from 'app/constants/sort';

class SortService {
  constructor() {
    this.isGroupsSortingEnabled = !!cookies.get({
      name: SORT_METHOD_GROUPS_COOKIE_NAME,
    });

    this.toggleGroupsSorting = this.toggleGroupsSorting.bind(this);
  }

  sortGroups(groups) {
    return [...groups].sort((a, b) => a.title.localeCompare(b.title));
  }

  toggleGroupsSorting() {
    if (this.isGroupsSortingEnabled) {
      cookies.remove({ name: SORT_METHOD_GROUPS_COOKIE_NAME });
    } else {
      cookies.set({ name: SORT_METHOD_GROUPS_COOKIE_NAME, value: true });
    }

    window.location.reload();
  }
}

export const sortService = new SortService();
