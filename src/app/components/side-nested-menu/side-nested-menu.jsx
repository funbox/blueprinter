import Menu from 'app/components/menu';
import MethodBadge from 'app/components/method-badge';
import { getDescriptionHeadersWithHash } from 'app/common/utils/helpers/getters';

import SideNestedMenu__Item from './__item';

const MAX_NESTING_LEVEL = 3;

const propTypes = {
  content: PropTypes.arrayOf(PropTypes.object).isRequired,
  level: PropTypes.number.isRequired,
  parentRoute: PropTypes.string.isRequired,
  autoBuild: PropTypes.bool,
  visible: PropTypes.bool,
};

class SideNestedMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
    };
  }

  componentDidMount() {
    if (this.props.autoBuild) {
      this.createContent();
    }
  }

  createContent() {
    const { content, level, parentRoute } = this.props;
    const nestedContent = this.buildContent(content, { level, parentRoute });
    if (nestedContent.length > 0) {
      this.setState({
        content: nestedContent,
      });
    }
  }

  buildContent(content, options = {}) {
    const { level, parentRoute = '' } = options;
    const headingItems = [];
    let descriptionSection;

    if (level > MAX_NESTING_LEVEL) return [];

    const menuItems = content.reduce((acc, item, index) => {
      if (item.element === 'copy') {
        if (!descriptionSection) descriptionSection = item;
        return acc;
      }

      const { title, route, nestedRoutePresets } = item;
      const itemType = item.element;
      const nextLevel = level + 1;
      let hasSubmenu = level < MAX_NESTING_LEVEL && !!item.content && item.content.length > 0;
      let badge = null;

      const typeSpecificModifier = {
        transition: () => {
          const method = item.attributes.method;
          badge = <MethodBadge method={method}/>;
        },
        message: () => {
          hasSubmenu = false;
          badge = <MethodBadge method="message"/>;
        },
      };

      if (typeSpecificModifier[itemType]) {
        typeSpecificModifier[itemType]();
      }

      const itemMods = {
        ...(level ? { level } : {}),
        hasSubmenu,
      };

      const menuItem = (
        <SideNestedMenu__Item
          key={`${itemType}-${index}`}
          mods={itemMods}
          title={title}
          route={route}
          content={item.content}
          currentLevel={level}
          nextLevel={nextLevel}
          parentRoute={parentRoute}
          nestedRoutePresets={nestedRoutePresets}
          icon={badge ? {
            content: badge,
          } : null}
        />
      );
      acc.push(menuItem);
      return acc;
    }, []);

    if (level === 2 && descriptionSection) {
      const descriptionHeaders = getDescriptionHeadersWithHash(descriptionSection.content);

      headingItems.push(...descriptionHeaders.map((header) => (
        <SideNestedMenu__Item
          mods={{ level }}
          key={`header-${header.title}`}
          title={header.title}
          route={`${parentRoute}#${header.hash}`}
          nestedRoutePresets={[]}
        />
      )));
    }

    return headingItems.concat(menuItems);
  }

  render() {
    return (
      <Menu mods={{ type: 'side' }}>
        {this.state.content.map(item => (
          React.cloneElement(item, { visible: this.props.visible })
        ))}
      </Menu>
    );
  }
}

SideNestedMenu.propTypes = propTypes;

export default SideNestedMenu;
