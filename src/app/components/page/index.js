export * from 'fb-base-blocks/page';
export { default } from 'fb-base-blocks/page';

export { default as Page__Navigation } from './__navigation/page__navigation';
export { default as Page__Layout } from './__layout/page__layout';

require('./__aside/_for/_navigation/page__aside_for_navigation.scss');
require('./__aside/_for/_actions/page__aside_for_actions.scss');
require('./__body/page__body.scss');
require('./__description/page__description.scss');
require('./__layout/page__layout.scss');
require('./__navigation/page__navigation.scss');
require('./__stripe/_for/_api-host/page__stripe_for_api-host.scss');
require('./__stripe/_for/_search/page__stripe_for_search.scss');
require('./__stripe/_for/_group/page__stripe_for_group.scss');
require('./__stripe/_for/_sort/page-stripe_for_sort.scss');
require('./__title/page__title.scss');

require('./_type/_error/page_type_error.scss');
