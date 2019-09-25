import RawContent from 'app/components/raw-content';
import Link from 'app/components/link';
import Parameters from 'app/components/parameters';
import { get, extractTransactionMethod, withHeaderAnchors } from 'app/common/utils/helpers';
import { hashFromComment, createHash, combineHashes } from 'app/common/utils/helpers/hash';

const ActionCard = (props) => {
  const {
    action,
    location,
    parentHash,
  } = props;

  const href = get('attributes', 'href', 'content').from(action) || props.href;
  const hrefVariables = get('attributes', 'hrefVariables', 'content').from(action);
  const title = get('meta', 'title', 'content').from(action);
  const descriptionEl = action.content.find(el => el.element === 'copy');
  const description = get('content').from(descriptionEl);
  const method = props.method || extractTransactionMethod(action);

  const presetHash = description && hashFromComment(description);
  const hash = presetHash ? createHash(presetHash) : combineHashes(parentHash, createHash(`${title || props.title} ${method}`));

  return (
    <div
      className={b('action-card', { mods: { type: method } })}
      id={hash}
    >
      <div className="action-card__heading">
        <Link
          mix="action-card__method"
          to={{ hash, pathname: location.pathname }}
        >
          {method}
        </Link>

        <span className="action-card__href">{href.content || href}</span>

        {!!title && <h4 className="action-card__title">{title.content || title}</h4>}
      </div>

      {(!!description || !!hrefVariables) && (
        <div className="action-card__body">
          {!!description && (
            <RawContent
              mix="action-card__description"
            >
              {withHeaderAnchors(description)}
            </RawContent>
          )}

          {!!hrefVariables && (
            <div className="action-card__content">
              <Parameters params={hrefVariables}/>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

ActionCard.propTypes = {
  action: PropTypes.shape({
    element: PropTypes.string,
    meta: PropTypes.object,
    content: PropTypes.array,
    attributes: PropTypes.object,
  }),
  href: PropTypes.string,
  title: PropTypes.string,
  method: PropTypes.string,
  location: PropTypes.object,
  parentHash: PropTypes.string.isRequired,
};

export default ActionCard;
