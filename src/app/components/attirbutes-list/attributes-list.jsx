import Attribute from 'app/components/attribute';
import { getAttributeChildren, extractAttributeData } from 'app/common/utils/helpers';

const AttributesList = (props) => {
  const { attributes } = props;

  const renderAttributes = (attrs, parentType) => {
    const items = attrs.map((a, i) => {
      const { attributeType } = extractAttributeData(a);
      const nestedAttrs = getAttributeChildren(a);
      const hasChildren = !!nestedAttrs && !!nestedAttrs.length && nestedAttrs.length > 0;
      const renderNestedAttrs = hasChildren
        ? (() => renderAttributes(nestedAttrs, attributeType))
        : (() => null);

      return (
        <li className="attributes-list__item" key={`attr-${i}`}>
          <Attribute
            mods={{ hasChildren }}
            attribute={a}
            parentType={parentType}
            renderNestedAttrs={renderNestedAttrs}
          />
        </li>
      );
    });

    return (
      <ul className={b('attributes-list', props)}>
        {items}
      </ul>
    );
  };

  return renderAttributes(attributes);
};

AttributesList.defaultProps = {
  attributes: [],
};

AttributesList.propTypes = {
  attributes: PropTypes.arrayOf(PropTypes.object),
};

export default AttributesList;
