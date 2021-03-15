import { HashRouter, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import ThemeProvider from 'app/common/providers/theme-provider';
import App from 'app/components/app';

const sandbox = () => {
  if (ENV !== 'production') {
    const SandboxApp = require('sandbox/components/sandbox-app').default;
    return <Route path="/sandbox" component={SandboxApp}/>;
  }

  return null;
};

const component = () => (
  <HashRouter basename={BASE_PATH}>
    <ThemeProvider>
      <Switch>
        {sandbox()}
        <Route component={App}/>
      </Switch>
    </ThemeProvider>
  </HashRouter>
);

const Application = ENV === 'dev' ? hot(component) : component;

ReactDOM.render(<Application/>, document.getElementById('react-app'));
