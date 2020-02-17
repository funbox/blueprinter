import Link from '../../link';

const Menu__Item = (props) => {
  const {
    mods = {},
    children,
    icon,
    text,
    tag,
    submenu = {},
    onClick,
  } = props;
  const isCurrent = mods ? mods.current : false;
  const Tag = tag || (isCurrent ? 'span' : Link);

  const localProps = Object.assign({}, props);

  delete localProps.mods;
  delete localProps.mix;
  delete localProps.icon;
  delete localProps.text;
  delete localProps.submenu;
  delete localProps.tag;

  return (
    <li className={b('menu__item', props)}>
      <Tag
        {...(!isCurrent ? {
          mix: 'menu__item-content',
          ...localProps,
        } : {
          className: 'menu__item-content',
        })}
        onClick={onClick}
      >
        {!!icon && (<span className="menu__item-icon">{icon.content}</span>)}
        {!!text && (<span className="menu__item-text">{text}</span>)}
        {children}
      </Tag>

      {!!submenu.content && (
        <div
          className="menu__item-submenu"
          ref={submenu.ref}
        >
          {submenu.content}
        </div>
      )}
    </li>
  );
};

Menu__Item.propTypes = {
  mods: PropTypes.object,
  icon: PropTypes.object,
  text: PropTypes.string,
  tag: PropTypes.string,
  children: PropTypes.node,
  submenu: PropTypes.shape({
    content: PropTypes.node,
    ref: PropTypes.func,
  }),
  onClick: PropTypes.func,
};

export default Menu__Item;
