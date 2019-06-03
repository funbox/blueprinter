const ResourceGroupSection__Message = (props) => (
  <div
    className={b('resource-group-section__message', props)}
    data-id={`action-${props.id}`}
  >
    {props.children}
  </div>
);

ResourceGroupSection__Message.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
};

export default ResourceGroupSection__Message;
