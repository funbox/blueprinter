import RawContent from 'app/components/raw-content';
import Link from 'app/components/link';
import MessageContent from 'app/components/message-content';
import { withHeaderAnchors } from 'app/common/utils/helpers';
import { hashFromComment, createHash, combineHashes } from 'app/common/utils/helpers/hash';

const MessageCard = (props) => {
  const {
    message,
    location,
    parentHash,
    index,
  } = props;

  const {
    title,
    description,
  } = message;

  const presetHash = description && hashFromComment(description);
  const mainHash = title || String(index + 1);
  const hash = presetHash ? createHash(presetHash) : combineHashes(parentHash, createHash(mainHash));
  const hashWithPrefix = presetHash ? hash : combineHashes('message', hash);

  return (
    <div
      className={b('message-card')}
      id={hashWithPrefix}
    >
      <div className="message-card__heading">
        <Link
          mix="message-card__link"
          to={{ hash: hashWithPrefix, pathname: location.pathname }}
        >
          Message
        </Link>

        {title && (
          <h4 className="message-card__title">
            {title.content || title}
          </h4>
        )}
      </div>

      <div className="message-card__body">
        {description && (
          <RawContent mix="message-card__description">
            {withHeaderAnchors(description)}
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
    description: PropTypes.string,
    attributes: PropTypes.arrayOf(PropTypes.object),
  }),
  index: PropTypes.number.isRequired,
  location: PropTypes.object,
  parentHash: PropTypes.string.isRequired,
};

export default MessageCard;
