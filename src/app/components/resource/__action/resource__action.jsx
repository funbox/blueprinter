const Resource__Action = (props) => (
  <div
    className={b('resource__action', props)}
    data-id={`action-${props.id}`}
  >
    {props.children}
  </div>
);

Resource__Action.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
};

export default Resource__Action;
