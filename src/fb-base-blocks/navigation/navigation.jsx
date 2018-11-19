import Dropdown from '../dropdown';

const Navigation = (props) => {
  const {
    title,
    titleTag,
    children,
    mods = {},
    dropdown = { mods: {}, handle: { content: 'Меню' } },
  } = props;

  const TitleTag = titleTag || 'h2';

  const popupDefaultProps = {
    mix: ['navigation__menu'],
  };

  const dropdownProps = Object.assign({}, dropdown, { popup: popupDefaultProps });

  return (
    <nav className={b('navigation', props)}>
      <TitleTag className="navigation__title">
        {title}
      </TitleTag>

      {!mods.dropdown
        && <div className="navigation__menu">
          {children}
        </div>
      }
      {!!mods.dropdown
        && <Dropdown
          {...dropdownProps}
        >
          {children}
        </Dropdown>
      }
    </nav>
  );
};

Navigation.propTypes = {
  title: PropTypes.string.isRequired,
  titleTag: PropTypes.string,
  children: PropTypes.node,
  mods: PropTypes.object,
  dropdown: PropTypes.object,
};

export default Navigation;
