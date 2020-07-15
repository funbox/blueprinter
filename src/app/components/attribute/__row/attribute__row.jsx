import Code from 'app/components/code';
import { get } from 'app/common/utils/helpers/getters';

const Attribute__Row = (props) => {
  const { attributeData, parentType } = props;
  const {
    attributeKey,
    attributeType,
    attributeExample,
    attributeProps,
    attributeDescription,
    attributeStructureName,
    recursive,
  } = attributeData;

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
                  className={b('attribute__prop')}
                >
                  { propContent === 'required' ? (
                    <Code mods={{ theme: 'standard' }}>
                      {propContent}
                    </Code>
                  ) : propContent }
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
            <p className={b('attribute__type')} title={recursive ? 'Эта структура является рекурсивной' : undefined}>
              <Code mods={{ theme: 'standard' }}>
                {
                  recursive && attributeStructureName
                    ? `${attributeStructureName} (${attributeType})`
                    : attributeType
                }
              </Code>
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
  attributeData: PropTypes.shape({
    attributeKey: PropTypes.string,
    attributeType: PropTypes.string,
    attributeExample: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
    ]),
    attributeProps: PropTypes.arrayOf(
      PropTypes.object,
    ),
    attributeDescription: PropTypes.string,
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
