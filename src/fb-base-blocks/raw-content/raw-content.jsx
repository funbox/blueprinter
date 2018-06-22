const RawContent = (props) => (
  <div className={b('raw-content', props)}>
    {props.children}
  </div>
);

RawContent.propTypes = {
  children: PropTypes.node,
};

export default RawContent;
