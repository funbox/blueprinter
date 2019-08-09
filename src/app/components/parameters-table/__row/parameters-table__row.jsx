import RawContent from 'app/components/raw-content';
import { get, htmlFromText } from 'app/common/utils/helpers';

const ParametersTable__Row = ({ parameter }) => {
  const name = get('content', 'key', 'content').from(parameter);
  const typeAttributes = get('attributes', 'typeAttributes', 'content').from(parameter);
  const title = get('meta', 'title', 'content').from(parameter);
  const description = get('meta', 'description', 'content').from(parameter);

  return (
    <div className={b('parameters-table__row')}>
      <div className={b('parameters-table__cell', { mods: { type: 'name' } })}>
        {name}
      </div>
      <div className={b('parameters-table__cell', { mods: { type: 'attribute' } })}>
        {
          typeAttributes.length && (
            <ul className={b('parameters-table__attributes-list')}>
              {
                typeAttributes.map((attr) => (
                  <li
                    className={b('parameters-table__attribute')}
                    key={`attribute-${attr.content}`}
                  >
                    <code className={b('parameters-table__code')}>
                      {attr.content}
                    </code>
                  </li>
                ))
              }
            </ul>
          )
        }
      </div>
      <div className={b('parameters-table__cell', { mods: { type: 'valueType' } })}>
        <code className={b('parameters-table__code')}>
          {title || 'string'}
        </code>
      </div>
      <div className={b('parameters-table__cell', { mods: { type: 'description' } })}>
        <RawContent>
          {description && htmlFromText(description)}
        </RawContent>
      </div>
    </div>
  );
};

export const parameterProps = PropTypes.shape({
  meta: PropTypes.shape({
    description: PropTypes.shape({
      element: PropTypes.string,
      content: PropTypes.string,
    }),
    title: PropTypes.shape({
      element: PropTypes.string,
      content: PropTypes.string,
    }),
  }),
  attributes: PropTypes.shape({
    typeAttributes: PropTypes.shape({
      element: PropTypes.string,
      content: PropTypes.array,
    }),
  }),
  content: PropTypes.shape({
    key: PropTypes.shape({
      element: PropTypes.string,
      content: PropTypes.string,
    }),
    value: PropTypes.shape({
      element: PropTypes.string,
      content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
        PropTypes.shape({
          attributes: PropTypes.shape({
            enumerations: PropTypes.shape({
              element: PropTypes.string,
              content: PropTypes.array,
            }),
          }),
        }),
      ]),
    }),
  }),
});

ParametersTable__Row.propTypes = {
  parameter: parameterProps,
};

export default ParametersTable__Row;
