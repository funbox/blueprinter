import Menu, { Menu__Item } from 'app/components/menu';
import Navigation from 'app/components/navigation';
import ResourceGroup from 'app/components/resource-group';

const SideMenu = ({ data }) => {
  const buildMenuList = () => {
    if (!data) return null;

    return data.map((group, index) => (
      <Menu__Item
        key={`group-${index}`}
        tag="div"
      >
        <ResourceGroup group={group}/>
      </Menu__Item>
    ));
  };

  return (
    <Navigation title="Ресурсы API" mods={{ for: 'side-menu' }} mix="side-menu">
      <Menu mods={{ type: 'side' }}>
        {buildMenuList()}
      </Menu>
    </Navigation>
  );
};

SideMenu.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    element: PropTypes.string,
    meta: PropTypes.object,
    content: PropTypes.array,
  })),
};

export default SideMenu;
