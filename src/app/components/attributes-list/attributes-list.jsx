import Attribute from 'app/components/attribute';
import { getAttributeChildren, extractAttributeData } from 'app/common/utils/helpers';

const AttributesList = (props) => {
  const { attributes, parentType, nested = false } = props;

  return (
    <ul className={b('attributes-list')}>
      {
        attributes.map((a, i) => {
          const attributeData = extractAttributeData(a);
          const { attributeType } = attributeData;
          const nestedAttrs = getAttributeChildren(a);
          const hasChildren = !!nestedAttrs && !!nestedAttrs.length && nestedAttrs.length > 0;
          const renderNestedAttrs = hasChildren
            ? (() => (
              <AttributesList
                attributes={nestedAttrs}
                parentType={attributeType}
                nested
              />
            )) : (() => null);

          return (
            <li className="attributes-list__item" key={`attr-${i}`}>
              <Attribute
                mods={{ hasChildren, nested }}
                attributeData={attributeData}
                parentType={parentType}
                renderNestedAttrs={renderNestedAttrs}
              />
            </li>
          );
        })
      }
    </ul>
  );
};

AttributesList.defaultProps = {
  attributes: [],
};

AttributesList.propTypes = {
  attributes: PropTypes.arrayOf(PropTypes.object),
  parentType: PropTypes.string,
  nested: PropTypes.bool,
};

export default AttributesList;
