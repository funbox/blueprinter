const InlineCode = (props) => (
  <span className="inline-code">
    {props.children}
  </span>
);

InlineCode.propTypes = {
  children: PropTypes.node,
};

export default InlineCode;
