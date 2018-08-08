import Page, { Page__Body, Page__Aside, Page__Navigation, Page__Layout, Page__Content } from 'app/components/page';
import Resizable from 'app/components/resizable';
import SideMenu from 'app/components/side-menu';
import MainContent from 'app/components/main-content';
import Transition from 'app/components/transition';
import ResourceGroupSection from 'app/components/resource-group-section';
import Resource from 'app/components/resource';
import ActionCard from 'app/components/action-card';

import groups from 'app/mocks/resource-group';
import request from 'app/mocks/request';
import resource from 'app/mocks/resource';

export default class Home extends React.Component {
  render() {
    return (
      <Page>
        <Page__Layout>
          <Resizable
            mix="page__resizable"
            direction="right"
            initialSize={{ width: '16.5%' }}
            minWidth="10%"
          >
            <Page__Navigation>
              <SideMenu data={groups}/>
            </Page__Navigation>
          </Resizable>

          <Page__Body>
            <MainContent
              title="API Blueprint"
              description={<p>Документация проекта "Новый проект"</p>}
            >
              <ResourceGroupSection group={groups[0]}>
                <Resource resource={resource}>
                  <ActionCard action={resource.content[0]}/>
                </Resource>
              </ResourceGroupSection>
            </MainContent>
          </Page__Body>

          <Resizable
            mix="page__resizable"
            direction="left"
            initialSize={{ width: '500px' }}
            minWidth="10%"
          >
            <Page__Aside>
              <Page__Content mods={{ for: 'transition' }}>
                <Transition
                  mods={{ for: 'page-aside' }}
                  transactions={request.content}
                  attributes={request.attributes}
                />
              </Page__Content>

              <Page__Content mods={{ for: 'transition' }}>
                <Transition
                  mods={{ for: 'page-aside' }}
                  transactions={request.content}
                  attributes={request.attributes}
                />
              </Page__Content>
            </Page__Aside>
          </Resizable>
        </Page__Layout>
      </Page>
    );
  }
}
