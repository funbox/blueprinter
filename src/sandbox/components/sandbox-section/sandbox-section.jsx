import SandboxAnchor from 'sandbox/components/sandbox-anchor';

const SandboxSection = (props) => (
  <div className="sandbox-section">
    {
      props.title && (
        <div className="sandbox-section__header">
          <h2
            id={props.id}
            className="sandbox-section__title sandbox-anchor-context"
          >
            {props.id && <SandboxAnchor id={props.id}/>}
            {props.title}
          </h2>
        </div>
      )
    }
    <div className="sandbox-section__body">
      {props.children}
    </div>
  </div>
);

SandboxSection.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  id: PropTypes.string,
};

export default SandboxSection;
