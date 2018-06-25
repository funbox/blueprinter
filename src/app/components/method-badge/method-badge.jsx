const MethodBadge = (props = {}) => {
  const { method } = props;
  const mods = method ? Object.assign({}, props.mods, { type: method }) : props.mods;
  const extendedProps = Object.assign({}, props, { mods });

  return (
    <p className={b('method-badge', extendedProps)}>
      {method && (
        <span className="method-badge__text">{method.toUpperCase()}</span>
      )}
    </p>
  );
};

MethodBadge.propTypes = {
  method: PropTypes.string,
  mods: PropTypes.object,
};

export default MethodBadge;
