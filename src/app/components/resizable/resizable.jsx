import { Resizable as _Resizable } from 're-resizable';

const Resizable = React.forwardRef((props, ref) => {
  const {
    direction,
    children,
    initialSize,
  } = props;

  const permittedDirections = {
    top: false,
    right: false,
    bottom: false,
    left: false,
    topRight: false,
    bottomRight: false,
    bottomLeft: false,
    topLeft: false,
  };

  if (typeof direction === 'string') {
    permittedDirections[direction] = true;
  }

  if (Array.isArray(direction)) {
    direction.forEach(dir => {
      permittedDirections[dir] = true;
    });
  }

  return !!children && (
    <_Resizable
      ref={ref}
      enable={permittedDirections}
      className={b('resizable', props)}
      defaultSize={{ ...initialSize }}
    >
      {props.children}
    </_Resizable>
  );
});

Resizable.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]).isRequired,
  initialSize: PropTypes.shape({
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
};

export default Resizable;
