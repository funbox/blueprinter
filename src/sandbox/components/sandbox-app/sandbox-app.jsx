import { Route } from 'react-router-dom';

import SandboxLayout from 'sandbox/common/layouts/sandbox-layout';
import SandboxHome from 'sandbox/views/sandbox-home';

const SandboxApp = () => (
  <SandboxLayout>
    <Route exact path="/sandbox" component={SandboxHome}/>
  </SandboxLayout>
);

export default SandboxApp;
