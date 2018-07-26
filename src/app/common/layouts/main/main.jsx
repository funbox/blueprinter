import Page, { Page__Body, Page__Aside, Page__Navigation, Page__Layout } from 'app/components/page';
import SideMenu from 'app/components/side-menu';
import MainContent from 'app/components/main-content';
import Transition from 'app/components/transition';
import ResourceGroupSection from 'app/components/resource-group-section';

import groups from 'app/mocks/resource-group';
import request from 'app/mocks/request';

export default class Main extends React.Component {
  render() {
    return (
      <Page>
        <Page__Layout>
          <Page__Navigation>
            <SideMenu data={groups}/>
          </Page__Navigation>

          <Page__Body>
            <MainContent
              title="API Blueprint"
              description={<p>Документация проекта "Новый проект"</p>}
            >
              <ResourceGroupSection group={groups[0]}/>
            </MainContent>
          </Page__Body>

          <Page__Aside>
            <Transition
              transactions={request.content}
              attributes={request.attributes}
            />
          </Page__Aside>
        </Page__Layout>
      </Page>
    );
  }
}

Main.propTypes = {
  children: PropTypes.node,
};
