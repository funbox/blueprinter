import Page, {
  Page__Body,
  Page__Aside,
  Page__Layout,
} from 'app/components/page';
import Resizable from 'app/components/resizable';
import PageTitle from 'app/components/page-title';

import SandboxNavigation from 'sandbox/components/sandbox-navigation';

export default class SandboxLayout extends React.Component {
  render() {
    const {
      children,
    } = this.props;

    return (
      <Page mix="sandbox-layout">
        <Page__Layout>
          <Resizable
            mix="page__resizable"
            direction="right"
            initialSize={{ width: '360px' }}
            minWidth="10%"
          >
            <Page__Aside mods={{ for: 'navigation' }}>
              <PageTitle
                mods={{ for: 'main-content' }}
                mix="page__title"
              >
                Навигация по песочнице
              </PageTitle>

              <SandboxNavigation mix="page__navigation"/>
            </Page__Aside>
          </Resizable>

          <Page__Body>{children}</Page__Body>
        </Page__Layout>
      </Page>
    );
  }
}

SandboxLayout.propTypes = {
  children: PropTypes.node,
};
