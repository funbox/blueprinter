import { SlideToggle } from 'react-slide-toggle';
import { extractTransactionMethod as extractMethod, get } from 'app/common/utils/helpers/';
import { hashFromComment, createHash, combineHashes } from 'app/common/utils/helpers/hash';

import Link from 'app/components/link';
import Menu, { Menu__Item } from 'app/components/menu';
import MethodBadge from 'app/components/method-badge';

const MAX_NESTING_LEVEL = 3;
const DEFAULT_TITLE = 'Resource Group';

let prevHash = '';

class ResourceGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = { collapsed: true };
    this.toggleClass = this.toggleClass.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const { group } = nextProps;
    const { route } = nextContext.router;
    const title = get('meta', 'title', 'content').from(group) || DEFAULT_TITLE;

    const descriptionEl = group.content.find(el => el.element === 'copy');
    const presetHash = descriptionEl && hashFromComment(descriptionEl.content);
    const hash = presetHash ? createHash(presetHash) : createHash(title);
    const hashWithPrefix = presetHash ? hash : combineHashes('group', hash);

    return `#${hashWithPrefix}` === route.location.hash;
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
      const actualIndex = descriptionSection ? index : (index + 1);
      let hasSubmenu = level < MAX_NESTING_LEVEL && !!item.content && item.content.length > 0;
      const href = get('attributes', 'href', 'content').from(item);
      let title = get('meta', 'title', 'content').from(item);
      let badge = null;
      let prefix = '';

      const descriptionEl = item.content.find(el => el.element === 'copy');
      let description;
      if (descriptionEl) {
        const descriptionHeaders = this.getDescritionHeaders(descriptionEl.content);
        if (descriptionHeaders.length > 0) {
          description = descriptionEl.content.slice(0, descriptionHeaders[0].index - 1);
        } else {
          description = descriptionEl.content;
        }
      }
      const presetHash = description && hashFromComment(description);
      let mainHash = title ? createHash(title) : String(actualIndex);

      const typeSpecificModifier = {
        resource: () => {
          title = title || href;
          prefix = 'resource';
        },
        transition: () => {
          const method = extractMethod(item);
          const hashFriendlyHref = href.slice(1).replace(/\//g, '-');
          badge = <MethodBadge method={method} mix="menu__item-icon"/>;
          mainHash = title ? createHash(`${title} ${method}`) : createHash(`${hashFriendlyHref} ${method}`);
          title = title || `${method.toUpperCase()} ${href}`;
          prefix = 'action';
        },
        message: () => {
          title = title || 'Message';
          hasSubmenu = false;
          badge = <MethodBadge mods={{ type: 'message' }} mix="menu__item-icon"/>;
          prefix = 'message';
        },
        category: () => {
          prefix = 'subgroup';
        },
      };

      if (typeSpecificModifier[itemType]) {
        typeSpecificModifier[itemType]();
      }

      const hash = presetHash ? createHash(presetHash) : combineHashes(parentHash, mainHash);
      const hashWithPrefix = presetHash ? hash : combineHashes(prefix, hash);

      const itemMods = {
        ...(level ? { level, submenu: true } : {}),
        badged: !!badge,
      };

      const menuItem = (
        <Menu__Item
          mods={itemMods}
          key={`${itemType}-${index}`}
          text={title}
          to={{ hash: hashWithPrefix, pathname: route.location.pathname }}
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
      const descriptionHeaders = this.getDescritionHeaders(descriptionSection.content);

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
            mods={{ level: 2, submenu: true }}
            key={`header-${item.title}`}
            text={item.title}
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

  getDescritionHeaders(description) {
    const descriptionHeaders = [];
    const regex = /#{2,}\s?(.+)\n?/g;
    let match = regex.exec(description);
    while (match) {
      descriptionHeaders.push({ title: match[1], index: match.index });
      match = regex.exec(description);
    }

    return descriptionHeaders;
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

    const descriptionEl = group.content.find(el => el.element === 'copy');
    const presetHash = descriptionEl && hashFromComment(descriptionEl.content);
    const hash = presetHash ? createHash(presetHash) : createHash(title);
    const hashWithPrefix = presetHash ? hash : combineHashes('group', hash);

    const needJumpToGroup = () => {
      const currentHash = decodeURIComponent(window.location.hash);
      const need = currentHash !== prevHash;
      prevHash = currentHash;
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
                to={{ hash: hashWithPrefix, pathname: route.location.pathname }}
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
