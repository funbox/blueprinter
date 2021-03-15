import { UnconnectedThemeToggler } from 'app/components/theme-toggler';
import { Theme } from 'app/constants/ui-themes';

const SandboxDemo = (props) => {
  const [theme, setTheme] = React.useState(Theme.LIGHT);

  const { mods, mix } = props;
  const { hasThemeToggler } = mods;
  const localMods = hasThemeToggler ? { ...mods, theme } : mods;

  return (
    <div className={b('sandbox-demo', { mix, mods: localMods })}>
      <div className="sandbox-demo__canvas">
        {props.children}
      </div>
      { hasThemeToggler && (
        <UnconnectedThemeToggler updateTheme={setTheme} theme={theme} mix={b('sandbox-demo__theme-toggler')}/>
      )}
    </div>
  );
};

SandboxDemo.propTypes = {
  children: PropTypes.node.isRequired,
  mods: PropTypes.shape({
    theme: PropTypes.string,
    for: PropTypes.string,
    hasThemeToggler: PropTypes.bool,
  }),
  mix: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
  ]),
};

SandboxDemo.defaultProps = {
  mods: {},
  mix: '',
};

export default SandboxDemo;
