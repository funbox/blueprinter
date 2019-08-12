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
import MainContent from 'app/components/main-content';
import ResourceGroupSection from 'app/components/resource-group-section';
import Notification from 'app/components/notification';
import DocumentWarnings from 'app/components/document-warnings';
import ApiHost from 'app/components/api-host';
import Link from 'app/components/link';
import { get } from 'app/common/utils/helpers';
import { combineHashes } from 'app/common/utils/helpers/hash';

const propTypes = {
  parsedSource: PropTypes.shape({
    topLevelMeta: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      host: PropTypes.string,
    }),
    groups: PropTypes.arrayOf(PropTypes.object),
    actions: PropTypes.arrayOf(PropTypes.object),
  }),
  location: PropTypes.shape({
    hash: PropTypes.string,
  }),
};

const defaultTitle = 'API';

export default class Home extends React.PureComponent {
  constructor(props) {
    super(props);

    const { topLevelMeta, groups } = props.parsedSource;

    this.topLevelMeta = topLevelMeta;
    this.groups = groups;
    this.warnings = topLevelMeta.warnings;

    this.state = {
      isWarningNotificationOpen: this.warnings.length > 0,
    };

    this.closeNotification = this.closeNotification.bind(this);
  }

  componentDidMount() {
    const elementFindingFunction = (id) => findElementById(document, id);
    this.scrollToAnchor(elementFindingFunction);

    document.title = this.topLevelMeta.title || 'API Blueprint';
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      const elementFindingFunction = (id) => document.getElementById(id);
      this.scrollToAnchor(elementFindingFunction);
    }
  }

  scrollToAnchor(getElementById) {
    const { location } = this.props;
    const id = decodeURIComponent(location.hash.replace('#', ''));
    const element = getElementById(id);
    if (element) element.scrollIntoView();
  }

  closeNotification() {
    this.setState({
      isWarningNotificationOpen: false,
    });
  }

  render() {
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
                <PageTitle
                  mods={{ for: 'main-content' }}
                >
                  <Link
                    mix="page-title__link"
                    to="/"
                  >
                    {this.topLevelMeta.title || defaultTitle}
                  </Link>
                </PageTitle>

                {this.topLevelMeta.host && (
                  <Page__Stripe mods={{ for: 'api-host' }}>
                    <ApiHost host={this.topLevelMeta.host}/>
                  </Page__Stripe>
                )}
              </Page__Title>

              <Page__Navigation>
                <SideMenu data={this.groups}/>
              </Page__Navigation>
            </Page__Aside>
          </Resizable>

          <Page__Body>
            <MainContent
              description={this.topLevelMeta.description}
            >
              {this.groups.map(group => (
                <ResourceGroupSection
                  group={group}
                  key={`group-${get('meta', 'title', 'content').from(group)}`}
                  mix="main-content__resource-group"
                />
              ))}
            </MainContent>
          </Page__Body>
        </Page__Layout>

        {this.state.isWarningNotificationOpen && (
          <Notification onClose={this.closeNotification}>
            <DocumentWarnings warnings={this.warnings}/>
          </Notification>
        )}
      </Page>
    );
  }
}

Home.propTypes = propTypes;

function findElementById(document, id) {
  const possiblePrefixes = [
    'group',
    'subgroup',
    'resource',
    'action',
    'message',
  ];
  let element = document.getElementById(id);
  if (element) {
    return element;
  }
  for (let i = 0; i < possiblePrefixes.length; i++) {
    const prefix = possiblePrefixes[i];
    const idWithPrefix = combineHashes(prefix, id);
    const possibleElement = document.getElementById(idWithPrefix);
    if (possibleElement) {
      element = possibleElement;
      break;
    }
  }
  return element;
}
