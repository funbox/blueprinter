import { SlideToggle } from 'react-slide-toggle';
import { extractTransactionMethod as extractMethod, get } from 'app/common/utils/helpers/';
import { hashFromTitle, combineHashes } from 'app/common/utils/helpers/hash';

import Link from 'app/components/link';
import Menu, { Menu__Item } from 'app/components/menu';
import MethodBadge from 'app/components/method-badge';

const MAX_NESTING_LEVEL = 3;
const DEFAULT_TITLE = 'Resource Group';

let prevHash = '';

class ResourceGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = { collapsed: false };
    this.toggleClass = this.toggleClass.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const { group } = nextProps;
    const { route } = nextContext.router;
    const title = get('meta', 'title').from(group) || DEFAULT_TITLE;
    const hash = hashFromTitle(title);
    return `#${hash}` === route.location.hash;
  }


  buildContentList(content, options = {}) {
    const { level, parentHash = '' } = options;
    const { route } = this.context.router;
    let descriptionSection;
    if (level > MAX_NESTING_LEVEL) return null;

    const menuItems = content.reduce((acc, item, index) => {
      if (item.element === 'copy') {
        if (!descriptionSection) descriptionSection = item;
        return acc;
      }

      const itemType = item.element;
      const nextLevel = level + 1;
      let hasSubmenu = level < MAX_NESTING_LEVEL && !!item.content && item.content.length > 0;
      const hasOnlyChild = !!item.content && item.content.length === 1;
      let title = item.meta.title.content;
      let badge = null;
      let mainHash = hashFromTitle(title);

      if (itemType === 'resource' && hasOnlyChild) {
        hasSubmenu = false;
        const method = extractMethod(item.content[0]);
        badge = <MethodBadge method={method} mix="menu__item-icon"/>;
      }

      if (itemType === 'transition') {
        const method = extractMethod(item);
        badge = <MethodBadge method={method} mix="menu__item-icon"/>;
        const href = get('attributes', 'href', 'content').from(item) || get('attributes', 'href').from(item);
        title = title || `${method.toUpperCase()} ${href}`;
        mainHash = hashFromTitle(`${title} ${method}`);
      }

      if (itemType === 'message') {
        hasSubmenu = false;
        badge = <MethodBadge mods={{ type: 'message' }} mix="menu__item-icon"/>;
      }

      const hash = combineHashes(parentHash, mainHash);

      const itemMods = {
        ...(level ? { level, submenu: true } : {}),
        badged: !!badge,
      };

      const menuItem = (
        <Menu__Item
          mods={itemMods}
          key={`${itemType}-${index}`}
          text={title}
          to={{ hash, pathname: route.location.pathname }}
          submenu={hasSubmenu
            ? this.buildContentList(item.content, {
              level: nextLevel,
              parentHash: hash,
            })
            : null}
        >{badge}</Menu__Item>
      );
      acc.push(menuItem);
      return acc;
    }, []);

    if (level === 2 && descriptionSection) {
      const descriptionHeaders = [];
      const regex = /#{2,}\s?(.+)\n/g;
      let match = regex.exec(descriptionSection.content);
      while (match) {
        descriptionHeaders.push(match[1]);
        match = regex.exec(descriptionSection.content);
      }
      const headerItems = descriptionHeaders.map(header => {
        const hash = hashFromTitle(`header-${header.toLowerCase()}`);
        return (
          <Menu__Item
            mods={{ level: 2, submenu: true }}
            key={`header-${header}`}
            text={header}
            to={{ hash, pathname: route.location.pathname }}
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
    const { route } = this.context.router;
    const { group } = this.props;
    const { collapsed } = this.state;
    const hasContent = !!group.content && group.content.length > 0;

    const title = get('meta', 'title', 'content').from(group) || DEFAULT_TITLE;
    const hash = hashFromTitle(title);

    const needJumpToGroup = () => {
      const currentHash = decodeURIComponent(window.location.hash);
      const need = currentHash !== prevHash;
      prevHash = currentHash;
      return need;
    };

    return (
      <SlideToggle
        bestPerformance
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
                to={{ hash, pathname: route.location.pathname }}
              >{title}</Link>
            </h3>

            <div className="resource-group__content" ref={setCollapsibleElement}>
              {hasContent ? this.buildContentList(group.content, { level: 2, parentHash: hash }) : null}
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
