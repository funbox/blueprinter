const MethodBadge = (props = {}) => {
  const {
    method,
    mods = {},
    mix = [],
  } = props;

  if (method) {
    mods.type = method;
  }

  return (
    <p className={b('method-badge', { mods, mix })}>
      {method && (
        <span className="method-badge__text">{method.toUpperCase()}</span>
      )}
    </p>
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
