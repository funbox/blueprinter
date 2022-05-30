import SandboxSection from 'sandbox/components/sandbox-section';
import SandboxDemo from 'sandbox/components/sandbox-demo';
import SandboxParagraph from 'sandbox/components/sandbox-paragraph';
import InlineCode from 'sandbox/components/inline-code';

import CheckboxField from 'app/components/checkbox-field';
import Toggler from 'app/components/toggler';

export default () => {
  const [checked, onChange] = React.useState({ usual: false, hiddenLabel: false, toggler: false });

  return (
    <div>
      <h2>Checkbox</h2>

      <SandboxSection title="Default checkbox" id="standard-checkbox">
        <SandboxParagraph>
          Checkbox has standard default theme
        </SandboxParagraph>

        <SandboxDemo mods={{ hasThemeToggler: true }}>
          <CheckboxField
            mods={{ checked: checked.usual }}
            onChange={(state) => onChange((prevState) => ({ ...prevState, usual: state }))}
          >
            Checkbox
          </CheckboxField>
        </SandboxDemo>

        <SandboxParagraph id="standard-checkbox-hidden-label">
          Standard checkbox with hidden label:
          {' '}
          <InlineCode>
            mods={'{{ hiddenLabel: true }}'}
          </InlineCode>
        </SandboxParagraph>

        <SandboxDemo mods={{ hasThemeToggler: true }}>
          <CheckboxField
            mods={{
              hiddenLabel: true,
              checked: checked.hiddenLabel,
            }}
            onChange={(state) => onChange((prevState) => ({ ...prevState, hiddenLabel: state }))}
          >
            Checkbox
          </CheckboxField>
        </SandboxDemo>

        <SandboxParagraph id="standard-checkbox-states">
          All checkbox states:
        </SandboxParagraph>

        <SandboxParagraph>
          Unchecked:
        </SandboxParagraph>
        <SandboxDemo mods={{ hasThemeToggler: true }}>
          <CheckboxField
            onChange={() => {}}
          >
            Option 1
          </CheckboxField>
        </SandboxDemo>

        <SandboxParagraph>
          Checked:
        </SandboxParagraph>
        <SandboxDemo mods={{ hasThemeToggler: true }}>

          <CheckboxField
            mods={{
              checked: true,
            }}
            onChange={() => {}}
          >
            Option 2
          </CheckboxField>
        </SandboxDemo>
        <SandboxParagraph>

          Unchecked, disabled:
        </SandboxParagraph>
        <SandboxDemo mods={{ hasThemeToggler: true }}>
          <CheckboxField
            mods={{
              disabled: true,
            }}
            onChange={() => {}}
          >
            Option 1
          </CheckboxField>
        </SandboxDemo>

        <SandboxParagraph>
          Checked, disabled:
        </SandboxParagraph>

        <SandboxDemo mods={{ hasThemeToggler: true }}>
          <CheckboxField
            mods={{
              checked: true,
              disabled: true,
            }}
            onChange={() => {}}
          >
            Option 1
          </CheckboxField>
        </SandboxDemo>

        <SandboxParagraph id="standard-checkbox-multiline">
          Checkbox with large multiline label:
        </SandboxParagraph>

        <SandboxDemo mods={{ hasThemeToggler: true }}>
          <CheckboxField
            mods={{
              checked: true,
            }}
            onChange={() => {}}
          >
            I guess we could discuss the implications of the phrase meant to be. That is if we wanted to drown ourselves
            in a sea of backwardly referential semantics and other mumbo-jumbo. Maybe such a discussion would result in
            the determination that meant to be is exactly as meaningless a phrase as it seems to be, and that none of
            us is actually meant to be doing anything at all.
          </CheckboxField>
        </SandboxDemo>
      </SandboxSection>

      <SandboxSection title="Toggler" id="toggler-checkbox">
        <SandboxParagraph>
          Toggling checkbox:
          {' '}
          <InlineCode>
            mods={'{{ theme: toggler }}'}
          </InlineCode>
          . For convenience purposes shared as a separate component
          {' '}
          <InlineCode>Toggler</InlineCode>
          .
        </SandboxParagraph>

        <SandboxDemo mods={{ hasThemeToggler: true }}>
          <Toggler
            mods={{
              checked: checked.toggler,
            }}
            onChange={(state) => onChange((prevState) => ({ ...prevState, toggler: state }))}
          >
            Checkbox
          </Toggler>
        </SandboxDemo>

        <SandboxParagraph id="toggler-checkbox-states">
          All toggler states:
        </SandboxParagraph>

        <SandboxParagraph>
          Unchecked:
        </SandboxParagraph>
        <SandboxDemo mods={{ hasThemeToggler: true }}>
          <Toggler
            onChange={() => {}}
          >
            Option 1
          </Toggler>
        </SandboxDemo>

        <SandboxParagraph>
          Checked:
        </SandboxParagraph>
        <SandboxDemo mods={{ hasThemeToggler: true }}>
          <Toggler
            mods={{
              checked: true,
            }}
            onChange={() => {}}
          >
            Option 2
          </Toggler>
        </SandboxDemo>

        <SandboxParagraph>
          Unchecked, disabled:
        </SandboxParagraph>
        <SandboxDemo mods={{ hasThemeToggler: true }}>
          <Toggler
            mods={{
              disabled: true,
            }}
            onChange={() => {}}
          >
            Option 1
          </Toggler>
        </SandboxDemo>

        <SandboxParagraph>
          Checked, disabled:
        </SandboxParagraph>
        <SandboxDemo mods={{ hasThemeToggler: true }}>
          <Toggler
            mods={{
              checked: true,
              disabled: true,
            }}
            onChange={() => {}}
          >
            Option 1
          </Toggler>
        </SandboxDemo>
      </SandboxSection>
    </div>
  );
};
