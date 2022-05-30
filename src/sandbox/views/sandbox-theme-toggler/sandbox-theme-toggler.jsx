import SandboxDemo from 'sandbox/components/sandbox-demo';
import SandboxParagraph from 'sandbox/components/sandbox-paragraph';

import { UnconnectedThemeToggler } from 'app/components/theme-toggler';

export default () => {
  const [theme, setTheme] = React.useState('light');

  return (
    <div>
      <h2>Theme toggler</h2>

      <SandboxParagraph>
        Checked state means dark theme is enabled:
      </SandboxParagraph>

      <SandboxDemo mods={{ theme: 'standard' }}>
        <UnconnectedThemeToggler theme={theme} updateTheme={setTheme}/>
      </SandboxDemo>
    </div>
  );
};
