const Menu = (props) => {
  const {
    children,
  } = props;

  // TODO изменить тег, если в меню всего один пункт

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
