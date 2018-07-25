const Transition__ExampleNames = (props) => {
  const {
    title,
    options,
    onLabelClick,
  } = props;

  const onClick = (event) => {
    const labelId = event.target.dataset.id;
    if (onLabelClick) {
      onLabelClick(labelId);
    }
  };

  return (
    <div className={b('transition__example-names', props)}>
      {title}

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
  title: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    selected: PropTypes.bool,
  })),
  onLabelClick: PropTypes.func,
};

export default Transition__ExampleNames;
