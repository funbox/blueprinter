const propTypes = {
  children: PropTypes.node.isRequired,
};

const Code = (props) => (
  <code className={b('code', props)}>
    {props.children}
  </code>
);

Code.propTypes = propTypes;

export default Code;
