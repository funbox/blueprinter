import SandboxSection from 'sandbox/components/sandbox-section';
import SandboxDemo from 'sandbox/components/sandbox-demo';
import SandboxParagraph from 'sandbox/components/sandbox-paragraph';
import InlineCode from 'sandbox/components/inline-code';

import CheckboxField from 'fb-base-blocks/checkbox-field';
import Toggler from 'fb-base-blocks/toggler';

export default () => {
  const [checked, onChange] = React.useState({ usual: false, hiddenLabel: false, toggler: false });

  return (
    <div>
      <h2>Чекбокс</h2>

      <SandboxSection title="Стандартный чекбокс" id="standard-checkbox">
        <SandboxParagraph>
          У чекбокса стандартная тема по-умолчанию:
        </SandboxParagraph>

        <SandboxDemo>
          <CheckboxField
            mods={{ checked: checked.usual }}
            onChange={(state) => onChange((prevState) => ({ ...prevState, usual: state }))}
          >
            Чекбокс
          </CheckboxField>
        </SandboxDemo>

        <SandboxParagraph id="standard-checkbox-hidden-label">
          Стандартный чекбокс со скрытым лейблом:
          {' '}
          <InlineCode>
            mods={'{{ hiddenLabel: true }}'}
          </InlineCode>
        </SandboxParagraph>

        <SandboxDemo>
          <CheckboxField
            mods={{
              hiddenLabel: true,
              checked: checked.hiddenLabel,
            }}
            onChange={(state) => onChange((prevState) => ({ ...prevState, hiddenLabel: state }))}
          >
            Чекбокс
          </CheckboxField>
        </SandboxDemo>

        <SandboxParagraph id="standard-checkbox-states">
          Все состояния чекбокса в статике:
        </SandboxParagraph>

        <SandboxDemo>
          <p>
            Пустой:
          </p>
          <CheckboxField
            onChange={() => {}}
          >
            Вариант 1
          </CheckboxField>

          <p>
            Отмеченный:
          </p>
          <CheckboxField
            mods={{
              checked: true,
            }}
            onChange={() => {}}
          >
            Вариант 2
          </CheckboxField>

          <p>
            Пустой, отключенный:
          </p>
          <CheckboxField
            mods={{
              disabled: true,
            }}
            onChange={() => {}}
          >
            Вариант 1
          </CheckboxField>
          <p>
            Отмеченный, отключенный:
          </p>
          <CheckboxField
            mods={{
              checked: true,
              disabled: true,
            }}
            onChange={() => {}}
          >
            Вариант 1
          </CheckboxField>
        </SandboxDemo>

        <SandboxParagraph id="standard-checkbox-multiline">
          Чекбокс с длинной подписью в несколько строк:
        </SandboxParagraph>

        <SandboxDemo>
          <CheckboxField
            mods={{
              checked: true,
            }}
            onChange={() => {}}
          >
            Цитата как бы придвигает к нам прошлое, при этом волокно представляет собой жидкофазный подтекст.
            Различное расположение мгновенно. Индуцированное соответствие разъедает жидкий катализатор,
            таким образом за синтез 3,4-метилендиоксиметамфетамина ожидает уголовное наказание.
            Бордосская жидкость, в отличие от классического случая, иллюстрирует мифологический бензол,
            и это придает ему свое звучание, свой характер.
          </CheckboxField>
        </SandboxDemo>
      </SandboxSection>

      <SandboxSection title="Переключатель" id="toggler-checkbox">
        <SandboxParagraph>
          Чекбокс-переключатель:
          {' '}
          <InlineCode>
            mods={'{{ theme: toggler }}'}
          </InlineCode>
          . Для удобства вынесен в отдельный компонент
          {' '}
          <InlineCode>Toggler</InlineCode>
          .
        </SandboxParagraph>

        <SandboxDemo>
          <Toggler
            mods={{
              checked: checked.toggler,
            }}
            onChange={(state) => onChange((prevState) => ({ ...prevState, toggler: state }))}
          >
            Чекбокс
          </Toggler>
        </SandboxDemo>

        <SandboxParagraph id="toggler-checkbox-states">
          Все состояния переключателя в статике:
        </SandboxParagraph>

        <SandboxDemo>
          <p>
            Пустой:
          </p>
          <Toggler
            onChange={() => {}}
          >
            Вариант 1
          </Toggler>

          <p>
            Отмеченный:
          </p>
          <Toggler
            mods={{
              checked: true,
            }}
            onChange={() => {}}
          >
            Вариант 2
          </Toggler>

          <p>
            Пустой, отключенный:
          </p>
          <Toggler
            mods={{
              disabled: true,
            }}
            onChange={() => {}}
          >
            Вариант 1
          </Toggler>
          <p>
            Отмеченный, отключенный:
          </p>
          <Toggler
            mods={{
              checked: true,
              disabled: true,
            }}
            onChange={() => {}}
          >
            Вариант 1
          </Toggler>
        </SandboxDemo>
      </SandboxSection>
    </div>
  );
};
