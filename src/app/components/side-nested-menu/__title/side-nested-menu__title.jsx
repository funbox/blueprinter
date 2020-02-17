import Link from 'app/components/link';

const propTypes = {
  current: PropTypes.bool,
  selected: PropTypes.bool,
  currentLevel: PropTypes.number,
  title: PropTypes.string,
  to: PropTypes.string,
  icon: PropTypes.shape({
    content: PropTypes.node,
  }),
};

const SideNestedMenu__Title = (props) => {
  const {
    current,
    currentLevel,
    selected,
    title,
    to,
    icon,
  } = props;

  const TitleTag = {
    1: 'h3',
    2: 'h4',
    3: 'h5',
  }[currentLevel] || 'p';
  const TextTag = current ? 'span' : Link;

  return (
    <TitleTag className={b('menu__item-title', { mods: { highlighted: selected } })}>
      <TextTag
        {...(!current ? {
          mix: 'menu__item-text',
          to,
        } : {
          className: 'menu__item-text',
        })}
      >
        {title}
      </TextTag>

      { !!icon && (
        <span className={b('menu__item-icon')}>
          {icon.content}
        </span>
      )}
    </TitleTag>
  );
};

SideNestedMenu__Title.propTypes = propTypes;

export default SideNestedMenu__Title;
