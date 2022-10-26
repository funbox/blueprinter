import { t } from '@lingui/macro';
import Dialog from 'app/components/dialog';
import DialogWindow from 'app/components/dialog-window';
import ServiceInfo from 'app/components/service-info';

const propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

const ServiceInfoDialog = (props) => {
  const { isOpen, onClose } = props;

  return (
    <Dialog
      mods={{
        theme: 'standard',
      }}
      id="service-info-dialog"
      initialFocusNode="#service-info-dialog"
      isOpen={isOpen}
      onClose={onClose}
    >
      <DialogWindow
        mods={{
          theme: 'standard',
          hiddenTitle: true,
        }}
        title={t`Useful information`}
        closeButton={{
          mods: {
            onlyIcon: true,
          },
        }}
      >
        <ServiceInfo/>
      </DialogWindow>
    </Dialog>
  );
};

ServiceInfoDialog.propTypes = propTypes;

export default ServiceInfoDialog;
