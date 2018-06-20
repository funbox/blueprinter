const SandboxDemo = (props) => (
  <div className={b('sandbox-demo', props)}>
    <div className="sandbox-demo__canvas">
      {props.children}
    </div>
  </div>
);

SandboxDemo.propTypes = {
  children: PropTypes.node,
};

export default SandboxDemo;
