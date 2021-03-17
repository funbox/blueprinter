/* eslint-disable react/no-unused-state */
import cookies from 'app/common/utils/helpers/cookies';
import { Theme, themeCookieName, THEME_HOTKEY } from 'app/constants/ui-themes';
import documentationDomain from 'app/constants/documentation-domain';
import isHotkey from 'app/common/utils/helpers/is-hotkey';

const defaultThemeState = {
  theme: Theme.LIGHT,
};

export const ThemeContext = React.createContext(defaultThemeState);

const propTypes = {
  children: PropTypes.node.isRequired,
};

class ThemeProvider extends React.Component {
  constructor() {
    super();

    this.updateTheme = this.updateTheme.bind(this);

    this.state = {
      ...defaultThemeState,
      updateTheme: this.updateTheme,
    };

    this.darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

    this.onKeydown = this.onKeydown.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
  }

  componentDidMount() {
    const theme = cookies.get({ name: themeCookieName });

    if (theme) {
      this.applyTheme(theme);
    } else {
      this.applySystemTheme();
      this.darkQuery.addListener(this.applySystemTheme);
    }
    document.addEventListener('keydown', this.onKeydown);
  }

  componentWillUnmount() {
    this.darkQuery.removeListener(this.applySystemTheme);
    document.removeEventListener('keydown', this.onKeydown);
  }

  applySystemTheme() {
    const systemTheme = this.darkQuery.matches ? Theme.DARK : Theme.LIGHT;
    this.applyTheme(systemTheme);
  }

  applyTheme(theme) {
    const previousTheme = this.state.theme;
    const rootElement = document.documentElement;

    if (rootElement.classList.contains(previousTheme)) {
      rootElement.classList.replace(previousTheme, theme);
    } else {
      rootElement.classList.add(theme);
    }

    this.setState({ theme });
  }

  onKeydown(event) {
    if (isHotkey(event, THEME_HOTKEY.CODE)) this.toggleTheme();
  }

  updateTheme(theme) {
    this.applyTheme(theme);
    cookies.set({ name: themeCookieName, value: theme, options: { domain: documentationDomain } });
    this.darkQuery.removeListener(this.applySystemTheme);
  }

  toggleTheme() {
    const currentTheme = this.state.theme;
    const newTheme = currentTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    this.updateTheme(newTheme);
  }

  render() {
    return (
      <ThemeContext.Provider value={this.state}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

ThemeProvider.propTypes = propTypes;

export default ThemeProvider;
