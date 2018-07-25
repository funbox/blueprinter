const Transition__ExampleNames = (props) => {
  const {
    contentType,
    options,
    selectedOption,
  } = props;
  return (
    <div className={b('transition__example-names', props)}>
      {contentType}
    </div>
  );
};

Transition__ExampleNames.propTypes = {
  contentType: PropTypes.oneOf(['Requests', 'Responses']),
  options: PropTypes.arrayOf(PropTypes.string),
  selectedOption: PropTypes.string,
};

export default Transition__ExampleNames;
