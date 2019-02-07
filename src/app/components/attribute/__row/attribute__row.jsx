import { extractAttributeData } from 'app/common/utils/helpers';

const Attribute__Row = (props) => {
  const { attribute, parentType, disabledExample } = props;
  const {
    attributeKey,
    attributeType,
    attributeExample,
    attributeProps,
    attributeDescription,
  } = extractAttributeData(attribute, disabledExample);

  const enumMember = parentType === 'enum';
  const oneOfMember = parentType === 'One of';
  const oneOfElement = attributeType === 'One of';

  const attributeKeyByType = {
    enum: attributeExample,
    'One of': attributeType,
  };

  return (
    <dl className={b('attribute__row', props)} onClick={props.onClick}>
      <dt className="attribute__key">
        {attributeKeyByType[parentType] || attributeKeyByType[attributeType] || attributeKey}
        {attributeProps && (
          <span className="attribute__props">
            {attributeProps.map(prop => (
              <small
                key={`${prop}_attr`}
                className={b('attribute__prop', {
                  mods: (prop === 'required' ? { highlighted: true } : {}),
                })}
              >
                {prop}
              </small>
            ))}
          </span>
        )}
      </dt>
      <dd className="attribute__description-container">
        {attributeType
          && !oneOfElement
          && !oneOfMember
          && <p className="attribute__type">{attributeType}</p>
        }
        {attributeDescription && <p className="attribute__description">{attributeDescription}</p>}
        {attributeExample && !enumMember && <p className="attribute__example">{attributeExample}</p>}
      </dd>
    </dl>
  );
};

Attribute__Row.propTypes = {
  attribute: PropTypes.shape({
    element: PropTypes.string,
    content: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
      PropTypes.string,
      PropTypes.number,
    ]),
  }),
  parentType: PropTypes.string,
  disabledExample: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Attribute__Row;
