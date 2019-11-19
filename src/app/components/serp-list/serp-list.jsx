import Button from 'fb-base-blocks/button';
import MethodBadge from 'app/components/method-badge';

export const searchItemType = {
  group: 'Группа',
  resource: 'Ресурс',
  action: 'Экшен',
  message: 'Сообщение',
};

export const propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
      type: PropTypes.oneOf(Object.keys(searchItemType)),
      method: PropTypes.string,
    }),
  ),
};

const defaultProps = {
  items: [],
};

const SerpList = (props) => {
  const { items } = props;

  return (
    <ul className={b('serp-list', props)}>
      {
        items.map(item => (
          <li
            key={item.value}
            className={b('serp-list__item')}
          >
            <span className={b('serp-list__label')}>
              {searchItemType[item.type]}
            </span>

            <Button
              mix={b('serp-list__title')}
              to={item.to}
              onClick={item.onClick}
            >
              {item.label}
            </Button>

            {item.type === 'action' && (
              <MethodBadge
                method={item.method}
                mix={b('serp-list__badge')}
              />
            )}
          </li>
        ))
      }
    </ul>
  );
};

SerpList.propTypes = propTypes;
SerpList.defaultProps = defaultProps;

export default SerpList;
