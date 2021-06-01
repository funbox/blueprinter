import _DialogWindow, { propTypes as dialogWindowPropTypes } from 'fb-base-blocks/dialog-window';
import DialogWindow__CloseIcon from './__close-icon/dialog-window__close-icon.svg?inline';

const DialogWindow = (props) => {
  const { closeButton } = props;

  return (
    <_DialogWindow
      {...props}
      closeButton={{
        ...closeButton,
        icon: {
          content: <DialogWindow__CloseIcon/>,
          mix: b('dialog-window__close-icon'),
        },
      }}
    />
  );
};

DialogWindow.propTypes = dialogWindowPropTypes;

export default DialogWindow;
