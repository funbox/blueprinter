import Page, { Page__Body, Page__Aside, Page__Navigation, Page__Layout, Page__Content } from 'app/components/page';
import Resizable from 'app/components/resizable';
import SideMenu from 'app/components/side-menu';
import MainContent from 'app/components/main-content';
import Transition from 'app/components/transition';
import ResourceGroupSection from 'app/components/resource-group-section';
import Resource from 'app/components/resource';
import ActionCard from 'app/components/action-card';

import parseSourceFile from 'app/common/utils/helpers/parseSourceFile';

import source from 'app/mocks/main';

const { topLevelMeta, groups, actions } = parseSourceFile(source);

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
              title={topLevelMeta.title}
              description={topLevelMeta.description}
            >
              {groups.map(group => (
                <ResourceGroupSection group={group}>
                  {group.content
                    .filter(gItem => gItem.element !== 'copy')
                    .map(resource => (
                      <Resource resource={resource}>
                        {resource.content
                          .filter(rItem => rItem.element !== 'copy')
                          .map(action => (
                            <ActionCard action={action}/>
                          ))
                        }
                      </Resource>
                    ))
                  }
                </ResourceGroupSection>
              ))}
            </MainContent>
          </Page__Body>

          <Resizable
            mix="page__resizable"
            direction="left"
            initialSize={{ width: '500px' }}
            minWidth="10%"
          >
            <Page__Aside>
              {
                actions.map(action => (
                  <Page__Content mods={{ for: 'transition' }}>
                    <Transition
                      mods={{ for: 'page-aside' }}
                      transactions={action.content}
                      attributes={action.attributes}
                    />
                  </Page__Content>
                ))
              }
            </Page__Aside>
          </Resizable>
        </Page__Layout>
      </Page>
    );
  }
}
