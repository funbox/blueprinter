import { extractAttributeData } from 'app/common/utils/helpers';

const Attribute__Row = (props) => {
  const { attribute, disabledExample } = props;
  const {
    attributeKey,
    attributeType,
    attributeExample,
    attributeProps,
    attributeDescription,
  } = extractAttributeData(attribute, disabledExample);

  return (
    <dl className={b('attribute__row', props)} onClick={props.onClick}>
      <dt className="attribute__key">
        {attributeKey}
        {attributeProps &&
          <small className="attribute__props">{attributeProps}</small>
        }
      </dt>
      <dd className="attribute__description-container">
        {attributeType && <p className="attribute__type">{attributeType}</p>}
        {attributeDescription && <p className="attribute__description">{attributeDescription}</p>}
        {attributeExample && <p className="attribute__example">{attributeExample}</p>}
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
    ]),
  }),
  disabledExample: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Attribute__Row;
