import SandboxDemo from 'sandbox/components/sandbox-demo';
import SandboxParagraph from 'sandbox/components/sandbox-paragraph';

import ThemeToggler from 'app/components/theme-toggler';

export default () => (
  <div>
    <h2>Переключатель тем</h2>

    <SandboxParagraph>
      Включенное состояние обозначает применённую темную тему:
    </SandboxParagraph>

    <SandboxDemo mods={{ theme: 'standard' }}>
      <ThemeToggler/>
    </SandboxDemo>
  </div>
);
