import Navigation from 'app/components/navigation';
import SideNestedMenu from 'app/components/side-nested-menu';

const SideMenu = ({ data }) => (
  <Navigation title="Ресурсы API" mods={{ for: 'side-menu' }}>
    { data && (
      <SideNestedMenu
        content={data}
        autoBuild
        level={1}
        parentRoute="/"
      />
    )}
  </Navigation>
);

SideMenu.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    element: PropTypes.string,
    meta: PropTypes.object,
    content: PropTypes.array,
  })),
};

export default SideMenu;
