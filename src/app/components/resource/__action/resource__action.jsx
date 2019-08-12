const Resource__Action = (props) => (
  <div className={b('resource__action', props)}>
    {props.children}
  </div>
);

Resource__Action.propTypes = {
  children: PropTypes.node,
};

export default Resource__Action;
