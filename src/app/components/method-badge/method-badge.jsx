const MethodBadge = (props = {}) => {
  const {
    method,
    mods = {},
    mix = [],
  } = props;

  const aliases = {
    delete: 'del',
    options: 'opt',
    message: 'mes',
  };

  if (method) {
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
