import Page, {
  Page__Body,
  Page__Aside,
  Page__Navigation,
  Page__Layout,
  Page__Stripe,
} from 'app/components/page';
import Resizable from 'app/components/resizable';
import SideMenu from 'app/components/side-menu';
import MainContent from 'app/components/main-content';
import Transition from 'app/components/transition';
import TransitionContainer from 'app/components/transition-container';
import MessageContent from 'app/components/message-content';
import ResourceGroupSection from 'app/components/resource-group-section';
import Notification from 'app/components/notification';
import DocumentWarnings from 'app/components/document-warnings';
import ApiHost from 'app/components/api-host';
import { get } from 'app/common/utils/helpers';

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
};

export default class Home extends React.PureComponent {
  constructor(props) {
    super(props);

    const { topLevelMeta, groups, actions } = props.parsedSource;

    this.topLevelMeta = topLevelMeta;
    this.groups = groups;
    this.actions = actions;
    this.transitions = new Map();
    this.warnings = topLevelMeta.warnings;

    this.state = {
      isWarningNotificationOpen: this.warnings.length > 0,
    };

    actions.forEach((action) => {
      this.transitions.set(action.id, React.createRef());
    });

    this.synchronizeDimensions = this.synchronizeDimensions.bind(this);
    this.closeNotification = this.closeNotification.bind(this);
  }

  componentDidMount() {
    // вызов через таймаут нужен для того,
    // чтобы применились все стили и функция получила
    // актуальную информацию о высоте нужных элементов
    setTimeout(this.synchronizeDimensions, 1);
    window.addEventListener('resize', this.synchronizeDimensions);

    document.title = this.topLevelMeta.title || 'API Blueprint';
  }

  componentDidUpdate() {
    this.synchronizeDimensions();
  }

  synchronizeDimensions() {
    this.transitions.forEach((ref, id) => {
      const transition = ref.current;

      const actionCard = document.querySelector(`[data-id=action-${id}]`);

      if (id && !actionCard) {
        // После обновления refract-источника (json) для транзакций создаются новые id и вызывается componentDidUpdate
        // однако ссылки (ref) на элементы не меняются, они создаются только во время выполнения конструктора
        // В этом случае надо перезагрузить страницу, чтобы пересоздать ref для блоков транзакций по новым id
        window.location.reload();
      }

      const actionCardStyle = getComputedStyle(actionCard);
      const transitionCardStyle = getComputedStyle(transition);

      const transitionCardPaddingTop = parseInt(transitionCardStyle.getPropertyValue('padding-top'), 10) || 0;
      const actionCardPaddingTop = parseInt(actionCardStyle.getPropertyValue('padding-top'), 10) || 0;
      const actionCardHeight = actionCard.offsetHeight - actionCardPaddingTop;
      const transitionCardHeight = transition.offsetHeight - transitionCardPaddingTop;

      const requiredHeight = Math.max(actionCardHeight, transitionCardHeight);
      transition.style.setProperty('min-height', `${requiredHeight}px`);
      actionCard.style.setProperty('min-height', `${requiredHeight}px`);

      const difference = actionCard.offsetTop - transition.offsetTop;
      if (difference > 0) {
        transition.style.paddingTop = `${difference}px`;
      } else {
        transition.style.marginTop = `${difference}px`;
      }
    });
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
            initialSize={{ width: '16.5%' }}
            minWidth="10%"
            onResizeStop={this.synchronizeDimensions}
          >
            <Page__Navigation>
              <SideMenu data={this.groups}/>
            </Page__Navigation>
          </Resizable>

          <Page__Body>
            <MainContent
              title={this.topLevelMeta.title}
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

          <Resizable
            mix="page__resizable"
            direction="left"
            initialSize={{ width: '500px' }}
            minWidth="10%"
            onResizeStop={this.synchronizeDimensions}
          >
            <Page__Aside>
              <Page__Stripe mods={{ for: 'aside-placeholder' }}/>

              {this.topLevelMeta.host && (
                <Page__Stripe mods={{ for: 'api-host' }}>
                  <ApiHost host={this.topLevelMeta.host}/>
                </Page__Stripe>
              )}

              {
                this.actions.map(action => (
                  <Page__Stripe mods={{ for: 'transition' }} key={`transition-${action.id}`}>
                    <TransitionContainer
                      myRef={this.transitions.get(action.id)}
                    >
                      {action.type === 'message' ? (
                        <MessageContent
                          message={action}
                        />
                      ) : (
                        <Transition
                          mods={{ for: 'page-aside' }}
                          transactions={action.content}
                          attributes={action.attributes}
                        />
                      )}
                    </TransitionContainer>
                  </Page__Stripe>
                ))
              }
            </Page__Aside>
          </Resizable>
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
