import { SlideToggle } from 'react-slide-toggle';
import { getDescriptionHeaders } from 'app/common/utils/helpers';
import { hashFromComment, createHash } from 'app/common/utils/helpers/hash';

import CollapsibleMenuItem from 'app/components/collapsible-menu-item';
import Link from 'app/components/link';
import Menu, { Menu__Item } from 'app/components/menu';
import MethodBadge from 'app/components/method-badge';

const MAX_NESTING_LEVEL = 3;

let prevPathname = '';

class ResourceGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = { collapsed: true };
    this.toggleClass = this.toggleClass.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const { group: { route: groupRoute } } = nextProps;
    const { route } = nextContext.router;
    const stateChanged = this.state.collapsed !== nextState.collapsed;
    return stateChanged || groupRoute === route.location.pathname;
  }

  buildContentList(content, options = {}) {
    const { level, parentRoute = '' } = options;

    let descriptionSection;

    if (level > MAX_NESTING_LEVEL) return null;

    const menuItems = content.reduce((acc, item, index) => {
      if (item.element === 'copy') {
        if (!descriptionSection) descriptionSection = item;
        return acc;
      }

      const { title, route } = item;
      const itemType = item.element;
      const nextLevel = level + 1;
      let hasSubmenu = level < MAX_NESTING_LEVEL && !!item.content && item.content.length > 0;
      let badge = null;

      const typeSpecificModifier = {
        transition: () => {
          const method = item.attributes.method;
          badge = <MethodBadge method={method} mix="menu__item-icon"/>;
        },
        message: () => {
          hasSubmenu = false;
          badge = <MethodBadge method="message" mix="menu__item-icon"/>;
        },
      };

      if (typeSpecificModifier[itemType]) {
        typeSpecificModifier[itemType]();
      }

      const itemMods = {
        ...(level ? { level } : {}),
        badged: !!badge,
        hasSubmenu,
      };

      const menuItem = hasSubmenu
        ? (
          <CollapsibleMenuItem
            mods={itemMods}
            key={`${itemType}-${index}`}
            text={title}
            to={route}
            submenu={this.buildContentList(item.content, {
              level: nextLevel,
              parentRoute: route,
            })}
          />
        ) : (
          <Menu__Item
            mods={itemMods}
            key={`${itemType}-${index}`}
            text={title}
            to={route}
          >
            {badge}
          </Menu__Item>
        );
      acc.push(menuItem);
      return acc;
    }, []);

    if (level === 2 && descriptionSection) {
      const descriptionHeaders = getDescriptionHeaders(descriptionSection.content);

      const headerItems = descriptionHeaders.map((item, idx) => {
        const description = descriptionSection.content;
        let headerDescriptionPart;
        if (idx === descriptionHeaders.length - 1) {
          headerDescriptionPart = description.slice(descriptionHeaders[idx].index, description.length);
        } else {
          headerDescriptionPart = description.slice(descriptionHeaders[idx].index, descriptionHeaders[idx + 1].index - 1);
        }

        const presetHash = headerDescriptionPart && hashFromComment(headerDescriptionPart);
        const hash = presetHash ? createHash(presetHash) : createHash(`header-${item.title}`);

        return (
          <Menu__Item
            mods={{ level: 2 }}
            key={`header-${item.title}`}
            text={item.title}
            to={`${parentRoute}#${hash}`}
          />
        );
      });

      menuItems.unshift(...headerItems);
    }

    return (
      <Menu mods={{ type: 'side' }} mix="resource-group__nested">
        {menuItems}
      </Menu>
    );
  }

  toggleClass() {
    this.setState(prevState => ({ ...prevState, collapsed: !prevState.collapsed }));
  }

  render() {
    const { group } = this.props;
    const { collapsed } = this.state;
    const hasContent = !!group.content && group.content.length > 0;

    const { title, route } = group;

    const needJumpToGroup = () => {
      const currentPathname = decodeURIComponent(window.location.pathname);
      const need = currentPathname !== prevPathname;
      prevPathname = currentPathname;
      return need;
    };

    return (
      <SlideToggle
        bestPerformance
        collapsed
        onCollapsed={this.toggleClass}
        onExpanding={this.toggleClass}
      >
        {({ onToggle, setCollapsibleElement }) => (
          <div className={b('resource-group', { mods: { collapsed } })}>
            <h3
              className="resource-group__heading"
              onClick={() => {
                const need = needJumpToGroup();
                return need ? undefined : onToggle();
              }}
            >
              <Link
                mix="resource-group__title"
                to={route}
              >{title}</Link>
            </h3>

            <div className="resource-group__content" ref={setCollapsibleElement}>
              {hasContent ? this.buildContentList(group.content, { level: 2, parentRoute: route }) : null}
            </div>
          </div>
        )}
      </SlideToggle>
    );
  }
}

ResourceGroup.defaultProps = {
  group: {},
};

ResourceGroup.propTypes = {
  group: PropTypes.shape({
    element: PropTypes.string,
    meta: PropTypes.object,
    content: PropTypes.array,
  }),
};

ResourceGroup.contextTypes = {
  router: PropTypes.object,
};

export default ResourceGroup;
