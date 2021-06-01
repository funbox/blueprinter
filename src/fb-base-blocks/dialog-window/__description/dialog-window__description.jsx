const propTypes = {
  children: PropTypes.node.isRequired,
};

const DialogWindow__Description = (props) => (
  <div className={b('dialog-window__description', props)}>
    {props.children}
  </div>
);

DialogWindow__Description.propTypes = propTypes;

export default DialogWindow__Description;
