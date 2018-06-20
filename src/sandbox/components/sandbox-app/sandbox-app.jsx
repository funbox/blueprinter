import { Route, Switch } from 'react-router-dom';

import SandboxLayout from 'sandbox/common/layouts/sandbox-layout';
import SandboxHome from 'sandbox/views/sandbox-home';
import SandboxSideMenu from 'sandbox/views/sandbox-side-menu';

const SandboxApp = () => (
  <SandboxLayout>
    <Switch>
      <Route exact path="/sandbox" component={SandboxHome}/>
      <Route exact path="/sandbox/side-menu" component={SandboxSideMenu}/>
    </Switch>
  </SandboxLayout>
);

export default SandboxApp;
