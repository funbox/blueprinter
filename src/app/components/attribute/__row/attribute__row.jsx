import { extractAttributeData, get } from 'app/common/utils/helpers';

const Attribute__Row = (props) => {
  const { attribute, parentType } = props;
  const {
    attributeKey,
    attributeType,
    attributeExample,
    attributeProps,
    attributeDescription,
  } = extractAttributeData(attribute);

  const enumMember = parentType === 'enum';
  const oneOfMember = parentType === 'One of';
  const oneOfElement = attributeType === 'One of';

  const attributeKeyByType = {
    enum: enumMember ? attributeExample : attributeKey,
    'One of': attributeType,
  };

  const attributeKeys = [
    attributeKeyByType[parentType],
    attributeKeyByType[attributeType],
    attributeKey,
  ];
  const displayedAttrKey = attributeKeys.find(key => key !== undefined);

  return (
    <dl className={b('attribute__row', props)} onClick={props.onClick}>
      <dt className="attribute__key">
        {displayedAttrKey}
        {attributeProps && (
          <ul className="attribute__props">
            {attributeProps.map(prop => {
              const propContent = getAttributePropContent(prop);
              return (
                <li
                  key={`${propContent}_attr`}
                  className={b('attribute__prop', {
                    mix: (propContent === 'required' ? ['attribute__code'] : []),
                  })}
                >
                  {propContent}
                </li>
              );
            })}
          </ul>
        )}
      </dt>
      <dd className="attribute__description-container">
        {
          attributeType
          && !oneOfElement
          && !oneOfMember
          && (
            <p className={b('attribute__type', { mix: [b('attribute__code')] })}>
              {attributeType}
            </p>
          )
        }
        {attributeDescription && (
          <p className="attribute__description">
            {attributeDescription}
          </p>
        )}
        {attributeExample !== null && !enumMember && (
          <p className="attribute__example">
            {attributeExample.toString()}
          </p>
        )}
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
  onClick: PropTypes.func,
};

function getAttributePropContent(prop) {
  const { content } = prop;
  const isParametrized = typeof content === 'object';

  if (!isParametrized) {
    return content;
  }

  const attrName = get('key', 'content').from(content);
  const attrValue = get('value', 'content').from(content);
  return `${attrName}=${attrValue}`;
}

export default Attribute__Row;
