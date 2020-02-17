import { withRouter } from 'react-router-dom';
import { Menu__Item } from 'app/components/menu';
import MenuCollapsibleSection from 'app/components/menu-collapsible-section';

import SideNestedMenu__Title from '../__title';

const propTypes = {
  mods: PropTypes.object,
  title: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  content: PropTypes.arrayOf(PropTypes.object),
  currentLevel: PropTypes.number,
  nextLevel: PropTypes.number,
  visible: PropTypes.bool,
  icon: PropTypes.shape({
    content: PropTypes.node,
  }),
};

class SideNestedMenu__Item extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { route, location, visible } = this.props;
    const { visible: nVisible, location: nLocation } = nextProps;

    const prevMatch = matchRoute(route, location.pathname);
    const nextMatch = matchRoute(route, nLocation.pathname);
    const visibilityChange = visible !== nVisible;
    const locationChange = location.pathname !== nLocation.pathname;
    const selectedChange = ((prevMatch || nextMatch) && locationChange);
    return selectedChange || visibilityChange;
  }

  render() {
    const {
      mods,
      title,
      route,
      location,
      content,
      currentLevel,
      nextLevel,
      visible,
      icon,
    } = this.props;

    const selected = matchRoute(route, location.pathname);
    const current = matchRoute(route, location.pathname, true);
    const localMods = {
      ...mods,
      selected,
      current,
    };

    if (mods.hasSubmenu) {
      return (
        <Menu__Item
          mods={localMods}
          tag="div"
          className="menu__item-content"
        >
          <MenuCollapsibleSection
            route={route}
            content={content}
            currentLevel={currentLevel}
            nextLevel={nextLevel}
            visible={visible}
          >
            <SideNestedMenu__Title
              currentLevel={currentLevel}
              selected={selected}
              current={current}
              title={title}
              to={route}
              icon={icon}
            />
          </MenuCollapsibleSection>
        </Menu__Item>
      );
    }

    return (
      <Menu__Item
        mods={localMods}
        tag="div"
        className="menu__item-content"
      >
        <SideNestedMenu__Title
          currentLevel={currentLevel}
          selected={selected}
          current={current}
          title={title}
          to={route}
          icon={icon}
        />
      </Menu__Item>
    );
  }
}

SideNestedMenu__Item.propTypes = propTypes;

export default withRouter(SideNestedMenu__Item);

function matchRoute(route, pathname, strict) {
  const locationRegex = new RegExp(`^${route}${strict ? '$' : '.*'}`);
  return pathname !== '/' && locationRegex.test(pathname);
}
