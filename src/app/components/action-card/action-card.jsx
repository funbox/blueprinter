import RawContent from 'app/components/raw-content';
import Link from 'app/components/link';
import Parameters from 'app/components/parameters';
import { get, extractTransactionMethod, withHeaderAnchors } from 'app/common/utils/helpers';
import { hashFromComment, createHash, combineHashes } from 'app/common/utils/helpers/hash';
import formatHref from 'app/common/utils/helpers/formatHref';

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
  const hashFriendlyHref = href.slice(1).replace(/\//g, '-');

  const presetHash = description && hashFromComment(description);
  const mainHash = title ? createHash(`${title} ${method}`) : createHash(`${hashFriendlyHref} ${method}`);
  const hash = presetHash ? createHash(presetHash) : combineHashes(parentHash, mainHash);
  const hashWithPrefix = presetHash ? hash : combineHashes('action', hash);
  const formattedHref = hrefVariables ? formatHref(href, hrefVariables) : href;

  return (
    <div
      className={b('action-card', { mods: { type: method } })}
      id={hashWithPrefix}
    >
      <div className="action-card__heading">
        {
          !!title && (
            <h4 className="action-card__title">
              {title}
            </h4>
          )
        }

        <p className="action-card__method-href-container">
          <Link
            mix="action-card__method"
            to={{ hash: hashWithPrefix, pathname: location.pathname }}
          >
            {method}
          </Link>

          <span className="action-card__href">
            {href}
          </span>
        </p>

        {
          <p className="action-card__formatted-href">
            {formattedHref}
          </p>
        }
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
  method: PropTypes.string,
  location: PropTypes.object,
  parentHash: PropTypes.string.isRequired,
};

export default ActionCard;
