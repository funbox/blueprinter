import { Switch, Route, Redirect } from 'react-router-dom';
import parseSourceFile from 'app/common/utils/helpers/parseSourceFile';
import sourceMock from 'app/source';

import MainLayout from 'app/components/main-layout';
import PageDescription from 'app/components/page-description';
import GroupRoutes from 'app/views/groups';
import ResourceRoutes from 'app/views/resources';
import ActionRoutes from 'app/views/actions';
import Error from 'app/views/error';
import ContentNotFound from 'app/views/404';

const source = window.refract || sourceMock;
const parsedSource = parseSourceFile(source);

const {
  topLevelMeta,
  groups,
  resources,
  actions,
} = parsedSource;

export default class App extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    if (topLevelMeta.error) {
      return (
        <Error
          error={topLevelMeta.error}
          warnings={topLevelMeta.warnings}
        />
      );
    }

    const groupRoutes = GroupRoutes(groups);
    const resourceRoutes = ResourceRoutes(resources);
    const actionRoutes = ActionRoutes(actions);

    const routes = groupRoutes.concat(resourceRoutes, actionRoutes);
    const emptyApib = routes.length === 0;

    return (
      <MainLayout
        topLevelMeta={topLevelMeta}
        groups={groups}
      >
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              topLevelMeta.description ? (
                <PageDescription description={topLevelMeta.description}/>
              ) : (
                <Redirect to={emptyApib ? '/404' : routes[0].props.path}/>
              )
            )}
          />
          {routes}
          <Route
            exact
            path="/404"
            component={ContentNotFound}
          />
        </Switch>
      </MainLayout>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};
