import Toggler from 'fb-base-blocks/toggler';
import Theme from 'app/constants/ui-themes';

import NightIcon from './__night-icon/theme-toggler__night-icon.svg?inline';

const ThemeToggler = (props) => {
  const [theme, setTheme] = React.useState(Theme.LIGHT);

  const onDarkThemeToggle = (checked) => {
    if (checked) setTheme(Theme.DARK);
    else setTheme(Theme.LIGHT);
  };

  const active = theme === Theme.DARK;

  return (
    <div className={b('theme-togger', props)}>
      <NightIcon className={b('theme-toggler__night-icon', { mods: { active } })}/>
      <Toggler
        className={b('theme-toggler__control')}
        mods={{ checked: active }}
        onChange={onDarkThemeToggle}
      >
        Включить тёмную тему
      </Toggler>
    </div>
  );
};

export default ThemeToggler;
