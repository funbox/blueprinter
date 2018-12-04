import RawContent from 'app/components/raw-content';
import Link from 'app/components/link';
import Parameters from 'app/components/parameters';
import { get, extractTransactionMethod, htmlFromText, withHeaderAnchors } from 'app/common/utils/helpers';
import { hashFromTitle, combineHashes } from 'app/common/utils/helpers/hash';

const ActionCard = (props) => {
  const {
    action,
    location,
    parentHash,
  } = props;

  const href = get('attributes', 'href').from(action) || props.href;
  const hrefVariables = get('attributes', 'hrefVariables', 'content').from(action);
  const title = get('meta', 'title').from(action);
  const description = action.content[0].element === 'copy' ? action.content[0].content : null;
  const method = props.method || extractTransactionMethod(action);

  const actionHash = hashFromTitle(`${title || props.title} ${method.toLowerCase()}`);
  const hash = combineHashes(parentHash, actionHash);

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
              {withHeaderAnchors(htmlFromText(description))}
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
