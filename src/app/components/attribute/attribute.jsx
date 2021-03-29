import SlideToggle from 'react-slide-toggle';
import ViewContext from 'app/components/app/view-context';
import { optionMetaShape } from 'app/common/utils/helpers/body-generation';

import Attribute__Row from './__row';

class Attribute extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = { collapsed: context !== 'expanded' };

    this.openAttribute = this.openAttribute.bind(this);
    this.closeAttribute = this.closeAttribute.bind(this);
  }

  openAttribute() {
    this.setState({ collapsed: false });
  }

  closeAttribute() {
    this.setState({ collapsed: true });
  }

  render() {
    const {
      attributeData,
      parentType,
      renderNestedAttrs,
      onOptionSelect,
      mods = {},
      mix = [],
      selectedOptions,
    } = this.props;

    const { collapsed } = this.state;

    const viewMode = this.context;

    const { hasChildren } = mods;

    if (hasChildren) {
      mods.collapsed = collapsed;
    }

    mods.recursive = attributeData.recursive;

    if (viewMode === 'expanded') {
      mods.static = true;
      return (
        <div className={b('attribute', { mods, mix })}>
          <Attribute__Row
            attributeData={attributeData}
            parentType={parentType}
          />

          {!!hasChildren && (
            <div className="attribute__children">
              {renderNestedAttrs()}
            </div>
          )}
        </div>
      );
    }

    return (
      <SlideToggle
        bestPerfomance
        duration={200}
        collapsed={viewMode !== 'expanded'}
        onExpanded={this.openAttribute}
        onCollapsing={this.closeAttribute}
      >
        {({ onToggle, setCollapsibleElement }) => (
          <div className={b('attribute', { mods, mix })}>
            <Attribute__Row
              attributeData={attributeData}
              parentType={parentType}
              onClick={onToggle}
              onOptionSelect={onOptionSelect}
              selectedOptions={selectedOptions}
            />

            {!!hasChildren && !collapsed && (
              <div className="attribute__children" ref={setCollapsibleElement}>
                {renderNestedAttrs()}
              </div>
            )}
          </div>
        )}
      </SlideToggle>
    );
  }
}

Attribute.contextType = ViewContext;

Attribute.propTypes = {
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
    optionMeta: optionMetaShape,
  }),
  parentType: PropTypes.string,
  renderNestedAttrs: PropTypes.func,
  mods: PropTypes.object,
  mix: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  onOptionSelect: PropTypes.func,
  selectedOptions: PropTypes.arrayOf(optionMetaShape),
};

export default Attribute;
