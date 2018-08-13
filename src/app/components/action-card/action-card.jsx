import RawContent from 'app/components/raw-content';
import Link from 'app/components/link';
import Parameters from 'app/components/parameters';
import { get, extractTransactionMethod } from 'app/common/utils/helpers';

const hashFromTitle = title => title.split(' ').join('-');

const ActionCard = (props) => {
  const {
    action,
    location,
  } = props;

  const description = get('meta', 'text', 'content').from(action);
  const href = props.href || get('attributes', 'href', 'content').from(action);
  const hrefVariables = get('attributes', 'hrefVariables', 'content').from(action);
  const title = get('meta', 'title', 'content').from(action);
  const method = props.method || extractTransactionMethod(action);

  return (
    <div className={b('action-card', { mods: { type: method } })}>
      <div className="action-card__heading">
        <Link
          mix="action-card__method"
          to={{ hash: hashFromTitle(`${title} ${method}`), pathname: location.pathname }}
        >
          {method}
        </Link>

        <span className="action-card__href">{href}</span>

        {!!title && <h4 className="action-card__title">{title}</h4>}
      </div>

      <div className="action-card__body">
        {!!description && (
          <RawContent
            mix="action-card__description"
          >
            {description}
          </RawContent>
        )}

        {!!hrefVariables && (
          <div className="action-card__content">
            <Parameters params={hrefVariables}/>
          </div>
        )}
      </div>
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
};

export default ActionCard;