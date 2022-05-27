import { Link as _Link } from 'react-router-dom';

const Link = (props) => {
  const {
    mods = {},
    children,
  } = props;

  const isExternal = mods.external || false;
  const Tag = props.to ? _Link : 'a';

  const externalLinkProps = isExternal ? {
    target: '_blank',
    rel: 'nofollow noopener noreferrer',
  } : {};

  const localProps = { ...props, ...externalLinkProps };

  delete localProps.mods;
  delete localProps.mix;

  return (
    <Tag
      className={b('link', props)}
      {...localProps}
    >
      {children}
    </Tag>
  );
};

Link.propTypes = {
  children: PropTypes.node,
  mods: PropTypes.object,
  to: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  href: PropTypes.string,
};

export default Link;
