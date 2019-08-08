import { SlideToggle } from 'react-slide-toggle';
import { Menu__Item } from 'fb-base-blocks/menu';

class CollapsibleMenuItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: true,
    };
    this.toggleClass = this.toggleClass.bind(this);
  }

  toggleClass() {
    this.setState(prevState => ({ ...prevState, collapsed: !prevState.collapsed }));
  }

  render() {
    const {
      submenu,
      mods = {},
    } = this.props;
    const { collapsed } = this.state;

    const localMods = Object.assign({ collapsed }, mods);

    return (
      <SlideToggle
        bestPerformance
        collapsed
        onCollapsed={this.toggleClass}
        onExpanding={this.toggleClass}
      >
        {
          ({ onToggle, setCollapsibleElement }) => (
            <Menu__Item
              {...this.props}
              mods={localMods}
              submenu={{
                content: submenu,
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

export default CollapsibleMenuItem;
