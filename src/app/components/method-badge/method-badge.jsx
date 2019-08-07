const MethodBadge = (props = {}) => {
  const {
    mods = {},
    mix = [],
  } = props;

  const aliases = {
    delete: 'del',
    options: 'opt',
    message: 'mes',
  };
  let method;

  if (props.method) {
    method = props.method.toLowerCase();
    mods.type = method;
  }

  return (
    <span className={b('method-badge', { mods, mix })}>
      {method && (
        aliases[method] || method
      )}
    </span>
  );
};

MethodBadge.propTypes = {
  method: PropTypes.string,
  mods: PropTypes.object,
  mix: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
  ]),
};

export default MethodBadge;
