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
import ResourceGroupSection from 'app/components/resource-group-section';
import Resource from 'app/components/resource';
import ApiHost from 'app/components/api-host';

import uniqid from 'uniqid';

import source from 'app/source';

const { topLevelMeta, groups, actions } = source;

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.transitions = new Map();

    actions.forEach((action) => {
      this.transitions.set(action.id, React.createRef());
    });

    this.synchronizeDimensions = this.synchronizeDimensions.bind(this);
  }

  componentDidMount() {
    // вызов через таймаут нужен для того,
    // чтобы применились все стили и функция получила
    // актуальную информацию о высоте нужных элементов
    setTimeout(this.synchronizeDimensions, 1);
    window.addEventListener('resize', this.synchronizeDimensions);

    document.title = topLevelMeta.title || 'API Blueprint';
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
      transition.style.paddingTop = `${difference}px`;
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
              <SideMenu data={groups}/>
            </Page__Navigation>
          </Resizable>

          <Page__Body>
            <MainContent
              title={topLevelMeta.title}
              description={topLevelMeta.description}
            >
              {groups.map(group => (
                <ResourceGroupSection
                  group={group}
                  key={uniqid.time()}
                  mix="main-content__resource-group"
                >
                  {group.content
                    .filter(gItem => gItem.element !== 'copy')
                    .map(resource => (
                      <Resource
                        resource={resource}
                        key={uniqid.time()}
                      />
                  ))}
                </ResourceGroupSection>
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

              {topLevelMeta.host && (
                <Page__Stripe mods={{ for: 'api-host' }}>
                  <ApiHost host={topLevelMeta.host}/>
                </Page__Stripe>
              )}

              {
                actions.map(action => (
                  <Page__Stripe mods={{ for: 'transition' }} key={uniqid.time()}>
                    <TransitionContainer
                      myRef={this.transitions.get(action.id)}
                    >
                      <Transition
                        mods={{ for: 'page-aside' }}
                        transactions={action.content}
                        attributes={action.attributes}
                      />
                    </TransitionContainer>
                  </Page__Stripe>
                ))
              }
            </Page__Aside>
          </Resizable>
        </Page__Layout>
      </Page>
    );
  }
}
