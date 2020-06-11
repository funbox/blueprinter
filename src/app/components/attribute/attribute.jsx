import SlideToggle from 'react-slide-toggle';
import ViewContext from 'app/components/app/view-context';

import Attribute__Row from './__row';

class Attribute extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = { collapsed: context !== 'expanded' };
    this.toggleCollapsedState = this.toggleCollapsedState.bind(this);
  }

  toggleCollapsedState() {
    this.setState((prevState) => ({
      ...prevState,
      collapsed: !prevState.collapsed,
    }));
  }

  render() {
    const {
      attributeData,
      parentType,
      renderNestedAttrs,
      mods = {},
      mix = [],
    } = this.props;
    const viewMode = this.context;

    const { hasChildren } = mods;

    if (hasChildren) {
      mods.collapsed = this.state.collapsed;
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

          { !!hasChildren && (
            <div className="attribute__children">
              {renderNestedAttrs()}
            </div>
          )}
        </div>
      );
    }

    return (
      <SlideToggle
        duration={200}
        bestPerfomance
        onExpanded={this.toggleCollapsedState}
        onCollapsing={this.toggleCollapsedState}
        collapsed={viewMode !== 'expanded'}
      >
        {({ onToggle, setCollapsibleElement }) => (
          <div className={b('attribute', { mods, mix })}>
            <Attribute__Row
              attributeData={attributeData}
              parentType={parentType}
              onClick={onToggle}
            />

            {!!hasChildren && (!this.state.collapsed)
            && <div className="attribute__children" ref={setCollapsibleElement}>{renderNestedAttrs()}</div>
            }
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
  }),
  parentType: PropTypes.string,
  renderNestedAttrs: PropTypes.func,
  mods: PropTypes.object,
  mix: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
};

export default Attribute;
