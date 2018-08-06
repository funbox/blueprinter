import { withRouter } from 'react-router-dom';

import ActionCard from './action-card';

export default withRouter(ActionCard);

require('./action-card.scss');
require('./__body/action-card__body.scss');
require('./__heading/action-card__heading.scss');
require('./__href/action-card__href.scss');
require('./__method/action-card__method.scss');
require('./__title/action-card__title.scss');

require('./_type/_delete/action-card_type_delete.scss');
require('./_type/_get/action-card_type_get.scss');
require('./_type/_head/action-card_type_head.scss');
require('./_type/_options/action-card_type_options.scss');
require('./_type/_patch/action-card_type_patch.scss');
require('./_type/_post/action-card_type_post.scss');
require('./_type/_put/action-card_type_put.scss');
