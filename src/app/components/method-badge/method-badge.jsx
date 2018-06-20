const MethodBadge = (props) => (
  <p className={b('method-badge', props)}>
    {props.method && (
      <span className="method-badge__text">{props.method}</span>
    )}
  </p>
);

MethodBadge.propTypes = {
  method: PropTypes.string,
};

export default MethodBadge;
