const SandboxAnchor = (props) => (
  <a
    className="sandbox-anchor"
    href={`#${props.id}`}
  >
    #
  </a>
);

SandboxAnchor.propTypes = {
  id: PropTypes.string,
};

export default SandboxAnchor;
