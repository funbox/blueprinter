import Toggler from 'fb-base-blocks/toggler';
import { Theme, THEME_HOTKEY } from 'app/constants/ui-themes';
import withTheme from 'app/common/HOCs/with-theme';

import NightIcon from './__night-icon/theme-toggler__night-icon.svg?inline';

const propTypes = {
  theme: PropTypes.oneOf(Object.values(Theme)).isRequired,
  updateTheme: PropTypes.func.isRequired,
};

const ThemeToggler = (props) => {
  const onDarkThemeToggle = (checked) => {
    const theme = checked ? Theme.DARK : Theme.LIGHT;
    props.updateTheme(theme);
  };

  const active = props.theme === Theme.DARK;

  return (
    <div className={b('theme-togger', props)}>
      <NightIcon className={b('theme-toggler__night-icon', { mods: { active } })}/>
      <Toggler
        className={b('theme-toggler__control')}
        mods={{ checked: active }}
        onChange={onDarkThemeToggle}
        title={THEME_HOTKEY.TEXT}
      >
        Включить тёмную тему
      </Toggler>
    </div>
  );
};

ThemeToggler.propTypes = propTypes;

export default withTheme(ThemeToggler);
export { ThemeToggler as UnconnectedThemeToggler };
