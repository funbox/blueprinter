import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import App from './components/app';

const sandbox = () => {
  if (ENV !== 'production') {
    const SandboxApp = require('sandbox/components/sandbox-app').default;
    return <Route path="/sandbox" component={SandboxApp}/>;
  }

  return null;
};

const component = () => (
  <BrowserRouter basename={BASE_PATH}>
    <Switch>
      {sandbox()}
      <Route component={App}/>
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(
  React.createElement(ENV === 'dev' ? hot(component) : component),
  document.getElementById('react-app'),
);
