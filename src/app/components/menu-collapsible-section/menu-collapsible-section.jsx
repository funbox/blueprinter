import SlideToggle from 'react-slide-toggle';
import { withRouter } from 'react-router-dom';

import Button from 'fb-base-blocks/button';
import SideNestedMenu from '../side-nested-menu';

const propTypes = {
  route: PropTypes.string,
  content: PropTypes.arrayOf(PropTypes.object),
  currentLevel: PropTypes.number,
  nextLevel: PropTypes.number,
  visible: PropTypes.bool,
  children: PropTypes.node,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  nestedRoutePresets: PropTypes.arrayOf(PropTypes.string),
};

class MenuCollapsibleSection extends React.Component {
  constructor(props) {
    super(props);

    const {
      route,
      location: { pathname },
      nestedRoutePresets,
    } = props;

    const current = matchRoute(route, pathname) || nestedRoutePresets.includes(pathname);

    this.state = {
      collapsed: !current,
      content: null,
    };

    this.nestedMenuRef = React.createRef();

    this.toggleCollapsed = this.toggleCollapsed.bind(this);
  }

  componentDidMount() {
    const { content, visible } = this.props;
    const hasContent = !!content && content.length > 0;

    if (hasContent && (visible || this.autoBuildContent())) {
      this.setState({ content }, () => {
        this.nestedMenuRef.current.createContent();
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { content, visible } = this.props;
    const becameVisible = visible && !prevProps.visible;
    const becameHidden = !visible && prevProps.visible;

    if (this.autoBuildContent()) {
      return;
    }

    if (becameVisible) {
      const hasContent = !!content && content.length > 0;
      if (hasContent) {
        this.setState({ content }, () => {
          this.nestedMenuRef.current.createContent();
        });
      }
    }

    if (becameHidden) {
      this.setState({ content: null });
    }
  }

  toggleCollapsed() {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed,
    }));
  }

  autoBuildContent() {
    return this.props.currentLevel === 1;
  }

  render() {
    const {
      route,
      nextLevel,
      children,
    } = this.props;
    const { collapsed, content } = this.state;

    return (
      <SlideToggle
        bestPerformance
        collapsed={collapsed}
        onCollapsed={this.toggleCollapsed}
        onExpanding={this.toggleCollapsed}
      >
        {({ onToggle, setCollapsibleElement }) => (
          <div className={b('menu-collapsible-section', { mods: { collapsed } })}>
            <div className={b('menu-collapsible-section__heading')}>
              {children}

              <Button
                mix={b('menu-collapsible-section__switcher')}
                mods={{
                  onlyIcon: true,
                }}
                text={collapsed ? 'Expand' : 'Collapse'}
                onClick={onToggle}
              />
            </div>

            <div className={b('menu-collapsible-section__content')} ref={setCollapsibleElement}>
              { content && (
                <SideNestedMenu
                  content={content}
                  level={nextLevel}
                  parentRoute={route}
                  ref={this.nestedMenuRef}
                  visible={!collapsed}
                />
              )}
            </div>
          </div>
        )}
      </SlideToggle>
    );
  }
}

MenuCollapsibleSection.propTypes = propTypes;

export default withRouter(MenuCollapsibleSection);

function matchRoute(route, pathname) {
  const locationRegex = new RegExp(`^${route}.*`);
  return pathname !== '/' && locationRegex.test(pathname);
}
