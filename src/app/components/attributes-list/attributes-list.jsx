import Attribute from 'app/components/attribute';
import { getAttributeChildren, extractAttributeData } from 'app/common/utils/helpers';
import { optionMetaShape } from 'app/common/utils/helpers/body-generation';

const AttributesList = (props) => {
  const { attributes, parentType, nested = false, onOptionSelect, selectedOptions } = props;

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
                onOptionSelect={onOptionSelect}
                selectedOptions={selectedOptions}
              />
            )) : (() => null);

          return (
            <li className="attributes-list__item" key={`attr-${i}`}>
              <Attribute
                mods={{ hasChildren, nested }}
                attributeData={attributeData}
                parentType={parentType}
                renderNestedAttrs={renderNestedAttrs}
                onOptionSelect={onOptionSelect}
                selectedOptions={selectedOptions}
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
  onOptionSelect: () => {},
  selectedOptions: [],
};

AttributesList.propTypes = {
  attributes: PropTypes.arrayOf(PropTypes.object),
  parentType: PropTypes.string,
  nested: PropTypes.bool,
  onOptionSelect: PropTypes.func,
  selectedOptions: PropTypes.arrayOf(optionMetaShape),
};

export default AttributesList;
