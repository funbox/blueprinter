import { t } from '@lingui/macro';

const Transition__ExampleList = (props) => {
  const {
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
    <ul className={b('transition__example-list')}>
      {options.map((option, index) => (
        <li
          key={`transition-label-${index}`}
          data-id={index}
          className={b('transition__example-label', { mods: { selected: option.selected } })}
          onClick={option.selected ? null : onClick}
        >
          {option.content || t`Example ${index + 1}`}
        </li>
      ))}
    </ul>
  );
};

Transition__ExampleList.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    selected: PropTypes.bool,
  })),
  onLabelClick: PropTypes.func,
};

export default Transition__ExampleList;
