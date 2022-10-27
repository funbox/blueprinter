import { HashRouter, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { I18nProvider } from '@lingui/react';

import ThemeProvider from 'app/common/providers/theme-provider';
import App from 'app/components/app';
import i18n from 'app/app.i18n';

const sandbox = () => {
  if (ENV !== 'production') {
    const SandboxApp = require('sandbox/components/sandbox-app').default;
    return <Route path="/sandbox" component={SandboxApp}/>;
  }

  return null;
};

const component = () => (
  <HashRouter basename={BASE_PATH}>
    <I18nProvider i18n={i18n}>
      <ThemeProvider>
        <Switch>
          {sandbox()}
          <Route component={App}/>
        </Switch>
      </ThemeProvider>
    </I18nProvider>
  </HashRouter>
);

const Application = ENV === 'dev' ? hot(component) : component;

ReactDOM.render(<Application/>, document.getElementById('react-app'));
