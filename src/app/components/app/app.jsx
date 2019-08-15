import { Switch } from 'react-router-dom';
import parseSourceFile from 'app/common/utils/helpers/parseSourceFile';
import sourceMock from 'app/source';

import MainLayout from 'app/components/main-layout';
import GroupRoutes from 'app/views/groups';
import ResourceRoutes from 'app/views/resources';
import ActionRoutes from 'app/views/actions';
import Error from 'app/views/error';

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

    return (
      <MainLayout
        topLevelMeta={topLevelMeta}
        groups={groups}
      >
        <Switch>
          {routes}
        </Switch>
      </MainLayout>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};
