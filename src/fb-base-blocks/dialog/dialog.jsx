import React, { Fragment } from 'react';
import AriaModal from '@funbox/react-aria-modal';

const propTypes = {
  mods: PropTypes.shape({
    for: PropTypes.string,
    theme: PropTypes.string,
    type: PropTypes.string,
    modal: PropTypes.bool,
    required: PropTypes.bool,
  }),
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  stackId: PropTypes.string,
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  initialFocusNode: PropTypes.node,
  focusDialog: PropTypes.bool,
};

const defaultProps = {
  mods: {},
  stackId: null,
  onClose: undefined,
  isOpen: false,
  initialFocusNode: null,
  focusDialog: false,
};

class Dialog extends React.Component {
  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    if (this.props.onClose) this.props.onClose();
  }

  render() {
    const {
      mods,
      isOpen,
      id,
      children,
      initialFocusNode,
      focusDialog,
      stackId,
    } = this.props;

    const isModal = mods.modal || true;

    const ReactAriaModal = stackId ? AriaModal.renderTo(`#${stackId}`) : AriaModal;

    if (!isOpen) return null;

    const backdropClasses = [
      'dialog__backdrop',
      mods.required ? 'dialog__backdrop_active' : null,
    ];
    const localProps = { ...this.props, mix: backdropClasses };

    const dialogClasses = b('dialog', localProps, mods);

    const dialogWindow = React.cloneElement(
      children,
      {
        ...children.props,
        titleId: id,
        ...(!children.props.onClose ? {
          onClose: this.onClose,
        } : {}),
      },
      children.props.children,
    );

    return (
      <Fragment>
        {isModal && (
          <ReactAriaModal
            titleId={id}
            onExit={this.onClose}
            focusDialog={focusDialog}
            initialFocus={initialFocusNode}
            includeDefaultStyles={false}
            underlayClass={dialogClasses}
            dialogClass={b('dialog__window')}
            scrollDisabled={!stackId}
            underlayClickExits={!mods.required}
            escapeExits={!mods.required}
          >
            {dialogWindow}
          </ReactAriaModal>
        )}
      </Fragment>
    );
  }
}

Dialog.propTypes = propTypes;
Dialog.defaultProps = defaultProps;

export default Dialog;
