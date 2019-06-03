import { withRouter } from 'react-router-dom';
import MessageCard from './message-card';

export default withRouter(MessageCard);

require('./__body/message-card__body.scss');
require('./__description/message-card__description.scss');
require('./__heading/message-card__heading.scss');
require('./__title/message-card__title.scss');
require('./__link/message-card__link.scss');

require('./message-card.scss');
