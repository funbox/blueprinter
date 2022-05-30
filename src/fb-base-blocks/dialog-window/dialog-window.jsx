import Button from 'fb-base-blocks/button';

export const propTypes = {
  children: PropTypes.node,
  title: PropTypes.node,
  titleId: PropTypes.string,
  onClose: PropTypes.func,
  closeButton: PropTypes.shape({
    mods: PropTypes.shape({
      for: PropTypes.string,
      theme: PropTypes.string,
      type: PropTypes.string,
    }),
    title: PropTypes.string,
    text: PropTypes.string,
  }),
  noCloseButton: PropTypes.bool,
};

const defaultProps = {
  children: null,
  closeButton: {},
  title: null,
  titleId: null,
  onClose: undefined,
  noCloseButton: false,
};

const DialogWindow = (props) => {
  const {
    children,
    title,
    titleId,
    onClose,
    closeButton,
    noCloseButton,
  } = props;

  if (!closeButton.title) {
    closeButton.title = 'Close';
  }

  if (!closeButton.text) {
    closeButton.text = 'Close';
  }

  return (
    <div className={b('dialog-window', props)}>
      <div className={b('dialog-window__content')}>
        {
          title && (
            <div className={b('dialog-window__header')}>
              <h2
                id={titleId}
                className={b('dialog-window__title')}
              >
                {title}
              </h2>
            </div>
          )
        }
        <div className={b('dialog-window__body')}>
          {children}
        </div>
        {!noCloseButton && (
          <Button
            mix={b('dialog-window__close')}
            onClick={onClose}
            {...closeButton}
          />
        )}
      </div>
    </div>
  );
};

DialogWindow.propTypes = propTypes;
DialogWindow.defaultProps = defaultProps;

export default DialogWindow;
