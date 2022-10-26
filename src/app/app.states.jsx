import { HashRouter, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';

import ThemeProvider from 'app/common/providers/theme-provider';
import App from 'app/components/app';
import { messages as enMessages } from 'locales/en/messages';
import { messages as ruMessages } from 'locales/ru/messages';

const sandbox = () => {
  if (ENV !== 'production') {
    const SandboxApp = require('sandbox/components/sandbox-app').default;
    return <Route path="/sandbox" component={SandboxApp}/>;
  }

  return null;
};

i18n.load({
  en: enMessages,
  ru: ruMessages,
});
i18n.activate('ru');

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
