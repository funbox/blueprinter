const propTypes = {
  children: PropTypes.node.isRequired,
};

const DialogWindow__Actions = (props) => (
  <div className={b('dialog-window__actions', props)}>
    {props.children}
  </div>
);

DialogWindow__Actions.propTypes = propTypes;

export default DialogWindow__Actions;
