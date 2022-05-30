import React from 'react';
import SandboxDemo from 'sandbox/components/sandbox-demo';
import SandboxParagraph from 'sandbox/components/sandbox-paragraph';
import Button from 'sandbox/components/button';

import InfoButton from 'app/components/info-button';
import Dialog from 'app/components/dialog';
import DialogWindow from 'app/components/dialog-window';
import ServiceInfo from 'app/components/service-info';

export default () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDialog = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <h2>Service info</h2>

      <SandboxParagraph>
        Button to show service info dialog:
      </SandboxParagraph>

      <SandboxDemo mods={{ theme: 'standard' }}>
        <InfoButton/>
      </SandboxDemo>

      <SandboxParagraph>
        Dialog
      </SandboxParagraph>

      <SandboxDemo mods={{ theme: 'standard' }}>
        <Button
          mods={{
            theme: 'sandbox',
          }}
          onClick={toggleDialog}
          text="Show dialog"
        />
        <Dialog
          mods={{
            theme: 'standard',
          }}
          id="demo-dialog-1"
          initialFocusNode="#demo-dialog-1"
          isOpen={isOpen}
          onClose={toggleDialog}
        >
          <DialogWindow
            mods={{
              theme: 'standard',
            }}
            title="Notification"
            closeButton={{
              mods: {
                onlyIcon: true,
              },
            }}
          >
            <p>
              This message contains confidential information and is intended only for the individual named.
            </p>
          </DialogWindow>
        </Dialog>
      </SandboxDemo>

      <SandboxParagraph>
        Dialog window
      </SandboxParagraph>

      <SandboxDemo mods={{ theme: 'standard' }}>
        <DialogWindow
          mods={{
            theme: 'standard',
          }}
          title="Attention"
          closeButton={{
            mods: {
              onlyIcon: true,
            },
          }}
        >
          <p>
            This message contains confidential information and is intended only for the individual named.
          </p>
        </DialogWindow>
      </SandboxDemo>

      <SandboxDemo mods={{ theme: 'light' }}>
        <ServiceInfo/>
      </SandboxDemo>
    </div>
  );
};
