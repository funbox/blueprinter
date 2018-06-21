import { SlideToggle } from 'react-slide-toggle';
import { extractTransactionMethod as extractMethod } from 'app/common/utils/helpers/';

import Link from 'app/components/link';
import Menu, { Menu__Item } from 'app/components/menu';
import MethodBadge from 'app/components/method-badge';

const maxNestingLevel = 3;
const defaultTitle = 'Resource Group';
const hashFromTitle = title => title.split(' ').join('-');

class ResourceGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = { collapsed: false };
    this.toggleClass = this.toggleClass.bind(this);
  }

  buildContentList(content, options = {}) {
    const { level } = options;
    if (level > maxNestingLevel) return null;

    const menuItems = content.map((item, index) => {
      const itemType = item.element;
      const title = item.meta.title.content;
      const nextLevel = level + 1;
      const hasSubmenu = level < maxNestingLevel && !!item.content && item.content.length > 0;

      const badge = itemType === 'transition' ?
        <MethodBadge method={extractMethod(item)} mix="menu__item-icon"/> : null;

      return (
        <Menu__Item
          mods={level ? { level, submenu: true } : {}}
          key={`${itemType}-${index}`}
          text={title}
          to={{ hash: hashFromTitle(title) }}
          submenu={hasSubmenu ? this.buildContentList(item.content, { level: nextLevel }) : null}
        >{badge}</Menu__Item>
      );
    });

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
    const hasTitle = !!group.meta && !!group.meta.title && !!group.meta.title.content;

    const title = hasTitle ? group.meta.title.content : defaultTitle;

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
              onClick={onToggle}
            >
              <Link mix="resource-group__title" to={{ hash: hashFromTitle(title) }}>{title}</Link>
            </h3>

            <div className="resource-group__content" ref={setCollapsibleElement}>
              {hasContent ? this.buildContentList(group.content, { level: 2 }) : null}
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