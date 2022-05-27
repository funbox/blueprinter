const Menu = (props) => {
  const {
    children,
  } = props;

  // TODO change the "ul" tag if a menu has the only one element

  return (
    <ul className={b('menu', props)}>
      {children}
    </ul>
  );
};

Menu.propTypes = {
  children: PropTypes.node,
};

export default Menu;
