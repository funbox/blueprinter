import { Link } from 'react-router-dom';

const Button = React.forwardRef((props, ref) => {
  const {
    mods = {},
    children,
    to,
    href, // "to" is used only for internal URLs, for external use href
    icon,
    text,
    type,
    onClick,
  } = props;

  const isLink = !!to || !!href;
  let Tag = 'button';
  if (isLink) {
    if (to) {
      Tag = Link;
    } else {
      Tag = 'a';
    }
  }
  const isExternalLink = isLink && mods.external || false;

  const buttonProps = !isLink ? {
    type: type || 'button',
    disabled: mods.disabled,
  } : {};

  const externalLinkProps = isExternalLink ? {
    target: '_blank',
    rel: 'nofollow noopener noreferrer',
  } : {};

  const title = props.title || props.text;

  const localProps = Object.assign({}, props, buttonProps, externalLinkProps);
  delete localProps.mods;
  delete localProps.mix;
  delete localProps.icon;
  delete localProps.text;
  delete localProps.title;

  return (
    <Tag
      className={b('button', props)}
      {...(mods.onlyIcon ? { title } : {})}
      {...localProps}
      onClick={onClick}
      ref={ref}
    >
      {
        icon && (
          <span className={b('button__icon', { mix: icon.mix })}>
            {icon.content}
          </span>
        )
      }
      {
        text && (
          <span className={b('button__text', { mix: text.mix })}>
            {text.content || text }
          </span>
        )
      }
      {children}
    </Tag>
  );
});

Button.propTypes = {
  children: PropTypes.node,
  mods: PropTypes.object,
  to: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  href: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.shape({
    content: PropTypes.node,
    mods: PropTypes.object,
    mix: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(
        PropTypes.string,
      ),
    ]),
  }),
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      content: PropTypes.string,
      mods: PropTypes.object,
      mix: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(
          PropTypes.string,
        ),
      ]),
    }),
  ]),
  type: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
