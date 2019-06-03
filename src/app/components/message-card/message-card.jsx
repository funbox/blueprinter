import RawContent from 'app/components/raw-content';
import Link from 'app/components/link';
import { get, htmlFromText, withHeaderAnchors } from 'app/common/utils/helpers';
import { hashFromTitle, combineHashes } from 'app/common/utils/helpers/hash';

const MessageCard = (props) => {
  const {
    message,
    location,
    parentHash,
  } = props;

  const title = get('meta', 'title', 'content').from(message);
  const descriptionEl = message.content.find(el => el.element === 'copy');
  const description = get('content').from(descriptionEl);

  const mainHash = hashFromTitle(`${title || props.title}`);
  const hash = combineHashes(parentHash, mainHash);

  return (
    <div
      className={b('message-card')}
      id={hash}
    >
      <div className="message-card__heading">
        <Link
          mix="message-card__link"
          to={{ hash, pathname: location.pathname }}
        >
          Message
        </Link>

        {title && (
          <h4 className="message-card__title">
            {title.content || title}
          </h4>
        )}
      </div>

      {description && (
        <div className="message-card__body">
          <RawContent mix="message-card__description">
            {withHeaderAnchors(htmlFromText(description))}
          </RawContent>
        </div>
      )}
    </div>
  );
};

MessageCard.propTypes = {
  message: PropTypes.shape({
    element: PropTypes.string,
    meta: PropTypes.object,
    content: PropTypes.array,
    attributes: PropTypes.object,
  }),
  title: PropTypes.string,
  location: PropTypes.object,
  parentHash: PropTypes.string.isRequired,
};

export default MessageCard;