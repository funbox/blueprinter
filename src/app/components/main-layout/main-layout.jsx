import Page, {
  Page__Body,
  Page__Aside,
  Page__Navigation,
  Page__Layout,
  Page__Stripe,
  Page__Title,
} from 'app/components/page';
import PageTitle from 'app/components/page-title';
import Resizable from 'app/components/resizable';
import SideMenu from 'app/components/side-menu';
import PrintMenu from 'app/components/print-menu';
import MainContent from 'app/components/main-content';
import Notification from 'app/components/notification';
import DocumentWarnings from 'app/components/document-warnings';
import ApiHost from 'app/components/api-host';
import Link from 'app/components/link';
import SearchStripe from 'app/components/search-stripe';

import { API_DEFAULT_TITLE } from 'app/constants/defaults';

const propTypes = {
  topLevelMeta: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    host: PropTypes.string,
    warnings: PropTypes.arrayOf(PropTypes.object),
  }),
  groups: PropTypes.arrayOf(PropTypes.object),
  resources: PropTypes.arrayOf(PropTypes.object),
  actions: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.node,
};

class MainLayout extends React.PureComponent {
  constructor(props) {
    super(props);

    this.warnings = props.topLevelMeta.warnings;

    this.state = {
      isWarningNotificationOpen: this.warnings.length > 0,
    };

    this.closeNotification = this.closeNotification.bind(this);
  }

  componentDidMount() {
    document.title = this.props.topLevelMeta.title || 'API Blueprint';
  }

  closeNotification() {
    this.setState({
      isWarningNotificationOpen: false,
    });
  }

  render() {
    const {
      topLevelMeta,
      groups,
      resources,
      actions,
      children,
    } = this.props;

    return (
      <Page>
        <Page__Layout>
          <Resizable
            mix="page__resizable"
            direction="right"
            initialSize={{ width: '360px' }}
            minWidth="10%"
          >
            <Page__Aside mods={{ for: 'navigation' }}>
              <Page__Title>
                <PageTitle mods={{ for: 'main-content' }}>
                  <Link
                    mix="page-title__link"
                    to="/"
                  >
                    {topLevelMeta.title || API_DEFAULT_TITLE}
                  </Link>
                </PageTitle>

                {topLevelMeta.host && (
                  <Page__Stripe mods={{ for: 'api-host' }}>
                    <ApiHost host={topLevelMeta.host}/>
                  </Page__Stripe>
                )}
              </Page__Title>

              <Page__Stripe mods={{ for: 'search' }}>
                <SearchStripe
                  groups={groups}
                  resources={resources}
                  actions={actions}
                />
              </Page__Stripe>

              <Page__Navigation>
                <SideMenu data={groups}/>
                <PrintMenu data={groups}/>
              </Page__Navigation>
            </Page__Aside>
          </Resizable>

          <Page__Body>
            <MainContent description={topLevelMeta.description}>
              {children}
            </MainContent>
          </Page__Body>
        </Page__Layout>

        {this.state.isWarningNotificationOpen && (
          <Notification
            onClose={this.closeNotification}
            title="API Blueprint has warnings"
          >
            <DocumentWarnings warnings={this.warnings}/>
          </Notification>
        )}
      </Page>
    );
  }
}

MainLayout.propTypes = propTypes;

export default MainLayout;
