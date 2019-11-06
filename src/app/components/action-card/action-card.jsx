import RawContent from 'app/components/raw-content';
import Link from 'app/components/link';
import Parameters from 'app/components/parameters';
import TransitionContainer from 'app/components/transition-container';
import { get, withHeaderAnchors } from 'app/common/utils/helpers';
import formatHref from 'app/common/utils/helpers/formatHref';

const ActionCard = (props) => {
  const {
    action,
    location,
  } = props;

  const { route, title, attributes } = action;
  const href = attributes.href || props.href;
  const hrefVariables = attributes.hrefVariables;
  const descriptionEl = action.content.find(isCopy);
  const description = get('content').from(descriptionEl);
  const method = attributes.method || props.method;

  const formattedHref = hrefVariables ? formatHref(href, hrefVariables) : href;

  return (
    <div className={b('action-card', { mods: { type: method } })}>
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
            to={route}
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

      <div className="action-card__body">
        {!!description && (
          <RawContent
            mix="action-card__description"
          >
            {withHeaderAnchors(description, location.pathname)}
          </RawContent>
        )}

        {!!hrefVariables && (
          <Parameters params={hrefVariables} mix="action-card__content"/>
        )}

        <TransitionContainer
          transactions={action.content.filter(el => !isCopy(el))}
          transitionProps={{
            mix: 'action-card__content',
          }}
        />
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
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

function isCopy(item) {
  return item.element === 'copy';
}

export default ActionCard;
