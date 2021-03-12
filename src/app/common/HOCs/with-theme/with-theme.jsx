import { ThemeContext } from 'app/common/providers/theme-provider';

export default function withTheme(Component) {
  return function WrapperComponent(props) {
    return (
      <ThemeContext.Consumer>
        {state => <Component {...props} {...state}/>}
      </ThemeContext.Consumer>
    );
  };
}
