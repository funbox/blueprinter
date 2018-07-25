const Transition__ExampleNames = (props) => {
  const {
    contentType,
    options,
    onLabelClick,
  } = props;

  const onClick = (event) => {
    const labelId = event.target.dataset.id;
    if (onLabelClick) {
      onLabelClick(contentType, labelId);
    }
  };

  return (
    <div className={b('transition__example-names', props)}>
      {contentType}

      <ul className="transition__example-list">
        {options.map((option, index) => (
          <li
            key={`transition-label-${index}`}
            data-id={index}
            className={b('transition__example-label', { mods: { selected: option.selected } })}
            onClick={option.selected ? null : onClick}
          >{option.content}</li>
        ))}
      </ul>
    </div>
  );
};

Transition__ExampleNames.propTypes = {
  contentType: PropTypes.oneOf(['Requests', 'Responses']),
  options: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    selected: PropTypes.bool,
  })),
  onLabelClick: PropTypes.func,
};

export default Transition__ExampleNames;
