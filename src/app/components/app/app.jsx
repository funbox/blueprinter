import { Switch, Route, Redirect } from 'react-router-dom';
import parseSourceFile from 'app/common/utils/helpers/parse-source-file';
import { HASH_DELIMITER } from 'app/common/utils/helpers/hash';
import sourceMock from 'app/source';

import MainLayout from 'app/components/main-layout';
import PageDescription from 'app/components/page-description';
import GroupRoutes from 'app/views/groups';
import ResourceRoutes from 'app/views/resources';
import ActionRoutes from 'app/views/actions';
import Error from 'app/views/error';
import ContentNotFound from 'app/views/404';
import ManualSearch from 'app/views/manual-search';

import ViewContext, { ViewMode } from './view-context';

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

    if (!topLevelMeta.error) {
      const route = convertLegacyUrl(location.pathname);

      if (route && location.pathname !== route) {
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
            path="/manual-search-page"
            render={(props) => (
              <ViewContext.Provider value={ViewMode.EXPANDED}>
                {
                  window.matchMedia('print').matches && !!topLevelMeta.description && (
                    <PageDescription description={topLevelMeta.description}/>
                  )
                }
                <ManualSearch
                  {...props}
                  groups={groups}
                />
              </ViewContext.Provider>
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

function convertLegacyUrl(url) {
  let groupHash = '';
  let resourceHash = '';
  let matchedGroup = null;
  let matchedResource = null;
  let matchedAction = null;
  let localHash = decodeURIComponent(url).slice(1); // remove /

  for (let i = 0; i < groups.length; i++) {
    const group = groups[i];
    if (localHash.startsWith(group.hashForLegacyUrl)) {
      groupHash = group.hashForLegacyUrl;
      matchedGroup = group;
      break;
    }
  }

  localHash = slice(localHash, groupHash);

  if (localHash === '' && matchedGroup !== null) {
    return matchedGroup.route;
  }

  for (let i = 0; i < resources.length; i++) {
    const resource = resources[i];
    const hashWithoutGroup = slice(resource.hashForLegacyUrl, groupHash);
    if (hashWithoutGroup.length > 0 && localHash.startsWith(hashWithoutGroup)) {
      resourceHash = hashWithoutGroup;
      matchedResource = resource;
      break;
    }
  }

  localHash = slice(localHash, resourceHash);

  if (localHash === '' && matchedResource !== null) {
    return matchedResource.route;
  }

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    const hashWithoutGroup = slice(action.hashForLegacyUrl, groupHash);
    const hashWithoutGroupAndResource = slice(hashWithoutGroup, resourceHash);
    if (hashWithoutGroupAndResource.length > 0 && localHash === hashWithoutGroupAndResource) {
      matchedAction = action;
      break;
    }
  }

  if (matchedAction) {
    return matchedAction.route;
  }

  return null;
}

function slice(sourceString, slicedPart = '') {
  const addedLength = slicedPart.length > 0 ? HASH_DELIMITER.length : 0;

  return sourceString.slice(slicedPart.length + addedLength);
}
