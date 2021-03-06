import { Route, Switch } from 'react-router-dom';

import SandboxLayout from 'sandbox/common/layouts/sandbox-layout';
import SandboxHome from 'sandbox/views/sandbox-home';
import SandboxSideMenu from 'sandbox/views/sandbox-side-menu';
import SandboxMethodBadge from 'sandbox/views/sandbox-method-badge';
import SandboxContentSection from 'sandbox/views/sandbox-content-section';
import SandboxRequestResponseBlock from 'sandbox/views/sandbox-request-response-block';
import SandboxSearch from 'sandbox/views/sandbox-search';
import SandboxCheckbox from 'sandbox/views/sandbox-checkbox';
import SandboxThemeToggler from 'sandbox/views/sandbox-theme-toggler';
import SandboxServiceInfo from 'sandbox/views/sandbox-service-info';
import withTheme from 'app/common/HOCs/with-theme';

const propTypes = {
  theme: PropTypes.string.isRequired,
};

const SandboxApp = (props) => {
  const { theme } = props;

  return (
    <SandboxLayout mods={{ theme }}>
      <Switch>
        <Route exact path="/sandbox" component={SandboxHome}/>
        <Route exact path="/sandbox/side-menu" component={SandboxSideMenu}/>
        <Route exact path="/sandbox/method-badge" component={SandboxMethodBadge}/>
        <Route exact path="/sandbox/raw-content" component={SandboxContentSection}/>
        <Route exact path="/sandbox/request-response" component={SandboxRequestResponseBlock}/>
        <Route exact path="/sandbox/search" component={SandboxSearch}/>
        <Route exact path="/sandbox/checkbox" component={SandboxCheckbox}/>
        <Route exact path="/sandbox/theme-toggler" component={SandboxThemeToggler}/>
        <Route exact path="/sandbox/service-info" component={SandboxServiceInfo}/>
      </Switch>
    </SandboxLayout>
  );
};

SandboxApp.propTypes = propTypes;

export default withTheme(SandboxApp);
