import Page, {
  Page__Body,
  Page__Aside,
  Page__AsideElement,
  Page__Layout,
} from 'app/components/page';
import Sidebar from 'app/components/sidebar';
import PageTitle from 'app/components/page-title';
import ThemeToggler from 'app/components/theme-toggler';
import SandboxNavigation from 'sandbox/components/sandbox-navigation';

export default class SandboxLayout extends React.Component {
  render() {
    const {
      children,
    } = this.props;

    return (
      <Page mix={b('sandbox-layout', this.props)}>
        <Page__Layout>
          <Sidebar
            mix="page__sidebar"
            mods={{ for: 'sandbox' }}
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
          </Sidebar>

          <Page__Body>
            <Page__Aside mods={{ for: 'actions' }}>
              <Page__AsideElement mods={{ for: 'theme-toggler' }}>
                <ThemeToggler/>
              </Page__AsideElement>
            </Page__Aside>
            {children}
          </Page__Body>
        </Page__Layout>
      </Page>
    );
  }
}

SandboxLayout.propTypes = {
  children: PropTypes.node,
  mods: PropTypes.shape({
    theme: PropTypes.string,
  }),
};
