import RawContent from 'app/components/raw-content';
import Link from 'app/components/link';
import MessageContent from 'app/components/message-content';
import { withHeaderAnchors } from 'app/common/utils/helpers';

const MessageCard = (props) => {
  const {
    message,
    location,
  } = props;

  const {
    title,
    description,
    route,
  } = message;

  return (
    <div className={b('message-card')}>
      <div className="message-card__heading">
        {
          !!title && (
            <h4 className="message-card__title">
              {title}
            </h4>
          )
        }

        <p className="message-card__link-container">
          <Link
            mix="message-card__link"
            to={route}
          >
            Message
          </Link>
        </p>
      </div>

      <div className="message-card__body">
        {description && (
          <RawContent mix="message-card__description">
            {withHeaderAnchors(description, location.pathname)}
          </RawContent>
        )}

        <MessageContent message={message}/>
      </div>
    </div>
  );
};

MessageCard.propTypes = {
  message: PropTypes.shape({
    title: PropTypes.string,
    route: PropTypes.string,
    description: PropTypes.string,
    attributes: PropTypes.arrayOf(PropTypes.object),
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

export default MessageCard;
