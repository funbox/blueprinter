import SlideToggle from 'react-slide-toggle';
import { Menu__Item } from 'fb-base-blocks/menu';

const propTypes = {
  collapsed: PropTypes.bool,
  getSubmenuContent: PropTypes.func,
  mods: PropTypes.object,
};

class CollapsibleMenuItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: props.collapsed,
    };
    this.toggleClass = this.toggleClass.bind(this);
  }

  toggleClass() {
    this.setState(prevState => ({ ...prevState, collapsed: !prevState.collapsed }));
  }

  render() {
    const {
      getSubmenuContent,
      mods = {},
    } = this.props;
    const { collapsed } = this.state;

    const localMods = Object.assign({ collapsed }, mods);
    const localProps = Object.assign({}, this.props);

    delete localProps.getSubmenuContent;
    delete localProps.collapsed;

    return (
      <SlideToggle
        bestPerformance
        collapsed={collapsed}
        onCollapsed={this.toggleClass}
        onExpanding={this.toggleClass}
      >
        {
          ({ onToggle, setCollapsibleElement }) => (
            <Menu__Item
              {...localProps}
              mods={localMods}
              submenu={{
                content: collapsed ? null : getSubmenuContent(),
                ref: setCollapsibleElement,
              }}
              onClick={onToggle}
            />
          )
        }
      </SlideToggle>
    );
  }
}

CollapsibleMenuItem.propTypes = propTypes;

export default CollapsibleMenuItem;
