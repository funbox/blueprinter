import { Switch, Route, Redirect } from 'react-router-dom';
import parseSourceFile from 'app/common/utils/helpers/parseSourceFile';
import { createRoute, combineRoutes } from 'app/common/utils/helpers/hash';
import sourceMock from 'app/source';

import MainLayout from 'app/components/main-layout';
import PageDescription from 'app/components/page-description';
import GroupRoutes from 'app/views/groups';
import ResourceRoutes from 'app/views/resources';
import ActionRoutes from 'app/views/actions';
import Error from 'app/views/error';
import SearchResultView from 'app/views/search-result';
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
  componentDidMount() {
    const { location, history } = this.props;

    if (location.hash !== '') {
      const route = createRouteFromHash(location.hash);
      if (route) {
        history.push(route);
      }
    }
  }

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
        resources={resources}
        actions={actions}
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
            path="/search-result"
            render={(routeProps) => (
              <SearchResultView
                {...routeProps}
                groups={groups}
                resources={resources}
                actions={actions}
              />
            )}
          />
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
    hash: PropTypes.string,
    pathname: PropTypes.string,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

function createRouteFromHash(hash) {
  let groupHash = '';
  let resourceHash = '';
  let actionHash = '';
  let localHash = decodeURIComponent(hash).slice(1); // remove #

  for (let i = 0; i < groups.length; i++) {
    const group = groups[i];
    if (localHash.startsWith(group.hash)) {
      groupHash = group.hash;
      break;
    }
  }
  localHash = localHash.slice(groupHash.length + 1);

  if (localHash === '') {
    return createRoute(groupHash);
  }

  for (let i = 0; i < resources.length; i++) {
    const resource = resources[i];
    const hashWithoutGroup = resource.hash.slice(groupHash.length + 1);
    if (hashWithoutGroup.length > 0 && localHash.startsWith(hashWithoutGroup)) {
      resourceHash = hashWithoutGroup;
      break;
    }
  }
  localHash = localHash.slice(resourceHash.length + 1);

  if (localHash === '') {
    return combineRoutes(
      createRoute(groupHash),
      createRoute(resourceHash),
    );
  }

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    const hashWithoutGroupAndResource = action.hash.slice(groupHash.length + 1 + resourceHash.length + 1);
    if (hashWithoutGroupAndResource.length > 0 && localHash.startsWith(hashWithoutGroupAndResource)) {
      actionHash = hashWithoutGroupAndResource;
      break;
    }
  }

  return combineRoutes(
    combineRoutes(
      createRoute(groupHash),
      createRoute(resourceHash),
    ),
    createRoute(actionHash),
  );
}
