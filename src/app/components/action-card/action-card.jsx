import URL from 'url-parse';
import parser from 'html-react-parser';

import RawContent from 'app/components/raw-content';
import Link from 'app/components/link';
import Parameters from 'app/components/parameters';
import TransitionContainer from 'app/components/transition-container';
import { withHeaderAnchors } from 'app/common/utils/helpers';
import { get } from 'app/common/utils/helpers/getters';
import formatHref from 'app/common/utils/helpers/format-href';

const parseQuery = query => {
  if (!query) return [];

  // Декодирование URI реализовано по аналогии с модулем querystringify, который
  // используется по умолчанию для парсинга query строк в библиотеке url-parse
  const decodedQuery = decodeURIComponent(query.replace(/\+/g, ' '));

  return decodedQuery
    .slice(decodedQuery.indexOf('?') + 1)
    .split('&');
};

const highlightQuery = queryPairs => (
  queryPairs.map(queryPair => {
    const [queryKey, queryValue] = queryPair.split('=');

    const key = `<span class="hljs-params">${queryKey}</span>`;
    const value = `<span class="hljs-value">${queryValue}</span>`;

    return `${key}=${value}`;
  }).join('&')
);

const ActionCard = (props) => {
  const {
    action,
    location,
  } = props;

  const { route, title, attributes, id } = action;
  const href = attributes.href || props.href;
  const hrefVariables = attributes.hrefVariables;
  const descriptionEl = action.content.find(isCopy);
  const description = get('content').from(descriptionEl);
  const method = attributes.method || props.method;

  const formattedHref = hrefVariables ? formatHref(href, hrefVariables) : href;

  const { pathname, query } = new URL(formattedHref, parseQuery);
  const formattedQuery = highlightQuery(query);

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

        <p className="action-card__formatted-href">
          <span className="action-card__example-method">{method}</span>
          {' '}
          {pathname}
          {!!formattedQuery && '?'}
          <span className="transition__query">{parser(formattedQuery)}</span>
        </p>
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
            parentId: id,
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
