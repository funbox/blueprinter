import { Switch, Route, Redirect } from 'react-router-dom';
import uniqid from 'uniqid';
import parseSourceFile from 'app/common/utils/helpers/parse-source-file';
import { HASH_DELIMITER } from 'app/common/utils/helpers/hash';
import IdProvider from 'app/common/utils/helpers/id-provider';
import sourceMock from 'app/source';

import MainLayout from 'app/components/main-layout';
import PageDescription from 'app/components/page-description';
import GroupRoutes from 'app/views/groups';
import ResourceRoutes from 'app/views/resources';
import ActionRoutes from 'app/views/actions';
import Error from 'app/views/error';
import ContentNotFound from 'app/views/404';
import ManualSearch from 'app/views/manual-search';
import ServiceInfoDialog from 'app/components/service-info-dialog';

import ViewContext, { ViewMode } from './view-context';

const source = window.refract || sourceMock;
const idProvider = IdProvider(uniqid.time);
const parsedSource = parseSourceFile(source, idProvider);

const {
  topLevelMeta,
  groups,
  resources,
  actions,
} = parsedSource;

const isModal = location => {
  const modalPaths = ['/service-help'];
  return modalPaths.indexOf(location.pathname) >= 0;
};

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.lastBackgroundLocation = { pathname: '/' };
    this.closeModal = this.closeModal.bind(this);
  }

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
    const { history, location } = this.props;

    if (prevProps.location.pathname !== location.pathname) {
      window.scrollTo(0, 0);
    }

    if (history.action !== 'POP') {
      if (!isModal(location)) {
        this.lastBackgroundLocation = location;
      }
    }
  }

  closeModal() {
    const { history } = this.props;
    history.push(this.lastBackgroundLocation);
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

    const { location } = this.props;

    const isModalLocation = isModal(location);
    const backgroundLocation = isModalLocation ? this.lastBackgroundLocation : location;

    return (
      <MainLayout
        topLevelMeta={topLevelMeta}
        groups={groups}
        resources={resources}
        actions={actions}
      >
        <Switch location={backgroundLocation}>
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
                  topLevelMeta.description && (
                    <PageDescription description={topLevelMeta.description} mix="page-description_version_print"/>
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

        {/* Модальные роуты */}
        <Route
          exact
          path="/service-help"
          render={() => (<ServiceInfoDialog isOpen onClose={this.closeModal}/>)}
        />
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
