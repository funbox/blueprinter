import _Resizable from 're-resizable';

const Resizable = (props) => {
  const {
    direction,
    children,
    initialSize,
    minWidth,
    maxWidth,
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
      enable={permittedDirections}
      className={b('resizable', props)}
      minWidth={minWidth}
      maxWidth={maxWidth}
      defaultSize={{ ...initialSize }}
    >
      {props.children}
    </_Resizable>
  );
};

Resizable.defaultProps = {
  directions: ['left', 'right'],
};

Resizable.propTypes = {
  children: PropTypes.node,
  direction: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
  initialSize: PropTypes.shape({
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  minWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Resizable;
