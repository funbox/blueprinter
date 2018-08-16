export * from 'fb-base-blocks/page';
export { default } from 'fb-base-blocks/page';

export { default as Page__Navigation } from './__navigation/page__navigation';
export { default as Page__Layout } from './__layout/page__layout';

require('./__aside/page__aside.scss');
require('./__body/page__body.scss');
require('./__description/page__description.scss');
require('./__layout/page__layout.scss');
require('./__navigation/page__navigation.scss');
require('./__stripe/_for/_transition/page__stripe_for_transition.scss');
require('./__stripe/_for/_aside-placeholder/page__stripe_for_aside-placeholder.scss');
require('./__stripe/_for/_api-host/page__stripe_for_api-host.scss');
require('./__title/page__title.scss');
