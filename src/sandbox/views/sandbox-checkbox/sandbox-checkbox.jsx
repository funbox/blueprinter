import SandboxDemo from 'sandbox/components/sandbox-demo';
import SandboxParagraph from 'sandbox/components/sandbox-paragraph';
import InlineCode from 'sandbox/components/inline-code';

import CheckboxField from 'fb-base-blocks/checkbox-field';

export default () => {
  const [checked, onChange] = React.useState({ usual: false, hiddenLabel: false });

  return (
    <div>
      <h2>Чекбокс</h2>

      <SandboxParagraph id="checkbox-standard">
        Чекбокс обычный:
      </SandboxParagraph>

      <SandboxDemo>
        <CheckboxField
          mods={{ checked: checked.usual }}
          onChange={(state) => onChange((prevState) => ({ ...prevState, usual: state }))}
        >
          Чекбокс
        </CheckboxField>
      </SandboxDemo>

      <SandboxParagraph id="checkbox-hidden-label">
        Чекбокс со скрытым лейблом:
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

      <SandboxParagraph id="checkbox-states">
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

      <SandboxParagraph id="checkbox-multiline">
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
    </div>
  );
};
