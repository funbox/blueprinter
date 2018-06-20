const SandboxDemo = (props) => (
  <div className={b('sandbox-demo', props)}>
    {props.children}
  </div>
);

SandboxDemo.propTypes = {
  children: PropTypes.node,
};

export default SandboxDemo;
