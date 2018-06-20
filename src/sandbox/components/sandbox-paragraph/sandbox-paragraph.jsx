import SandboxAnchor from 'sandbox/components/sandbox-anchor';

const SandboxParagraph = (props) => (
  <p
    id={props.id}
    className="sandbox-paragraph sandbox-anchor-context"
  >
    {props.id && <SandboxAnchor id={props.id}/>}
    {props.children}
  </p>
);

SandboxParagraph.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
};

export default SandboxParagraph;
