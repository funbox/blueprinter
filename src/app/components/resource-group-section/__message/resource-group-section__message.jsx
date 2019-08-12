const ResourceGroupSection__Message = (props) => (
  <div className={b('resource-group-section__message', props)}>
    {props.children}
  </div>
);

ResourceGroupSection__Message.propTypes = {
  children: PropTypes.node,
};

export default ResourceGroupSection__Message;
