import Navigation from 'app/components/navigation';
import SideNestedMenu from 'app/components/side-nested-menu';

const SideMenu = ({ data }) => (
  <Navigation title="API resources" mods={{ for: 'side-menu' }}>
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
    title: PropTypes.string,
    route: PropTypes.string,
  })),
};

export default SideMenu;
