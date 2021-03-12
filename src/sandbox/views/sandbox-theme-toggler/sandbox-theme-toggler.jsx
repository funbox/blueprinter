import SandboxDemo from 'sandbox/components/sandbox-demo';
import SandboxParagraph from 'sandbox/components/sandbox-paragraph';

import { UnconnectedThemeToggler } from 'app/components/theme-toggler';

export default () => {
  const [theme, setTheme] = React.useState('light');

  return (
    <div>
      <h2>Переключатель тем</h2>

      <SandboxParagraph>
        Включенное состояние обозначает применённую темную тему:
      </SandboxParagraph>

      <SandboxDemo mods={{ theme: 'standard' }}>
        <UnconnectedThemeToggler theme={theme} updateTheme={setTheme}/>
      </SandboxDemo>
    </div>
  );
};
