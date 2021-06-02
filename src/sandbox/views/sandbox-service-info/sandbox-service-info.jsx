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
      <h2>Помощь по сервису</h2>

      <SandboxParagraph>
        Кнопка открытия модального окна с информацией по сервису:
      </SandboxParagraph>

      <SandboxDemo mods={{ theme: 'standard' }}>
        <InfoButton/>
      </SandboxDemo>

      <SandboxParagraph>
        Диалог
      </SandboxParagraph>

      <SandboxDemo mods={{ theme: 'standard' }}>
        <Button
          mods={{
            theme: 'sandbox',
          }}
          onClick={toggleDialog}
          text="Показать диалог"
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
            title="Уведомление"
            closeButton={{
              mods: {
                onlyIcon: true,
              },
            }}
          >
            <p>
              Никому не говорите, что вы видели это сообщение.
            </p>
          </DialogWindow>
        </Dialog>
      </SandboxDemo>

      <SandboxParagraph>
        Окно диалога
      </SandboxParagraph>

      <SandboxDemo mods={{ theme: 'standard' }}>
        <DialogWindow
          mods={{
            theme: 'standard',
          }}
          title="Уведомление"
          closeButton={{
            mods: {
              onlyIcon: true,
            },
          }}
        >
          <p>
            Никому не говорите, что вы видели это сообщение.
          </p>
        </DialogWindow>
      </SandboxDemo>

      <SandboxDemo mods={{ theme: 'light' }}>
        <ServiceInfo/>
      </SandboxDemo>
    </div>
  );
};
