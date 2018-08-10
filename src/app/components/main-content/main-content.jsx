import RawContent from 'app/components/raw-content';
import { Page__Main, Page__Title, Page__Content } from 'app/components/page';
import PageTitle from 'app/components/page-title';

class MainContent extends React.Component {
  constructor(props) {
    super(props);

    this.mainContent = React.createRef();
  }

  componentDidMount() {
    const self = this;
    // вызов через таймаут нужен для того,
    // чтобы применились все стили и функция получила
    // актуальную информацию о положении нужного элемента
    setTimeout(() => {
      const distanceToTop = self.mainContent.current.getBoundingClientRect().top;
      document.documentElement.style.setProperty('--main-content-padding', `${distanceToTop}px`);
    }, 1);
  }

  render() {
    const {
      title,
      description,
      children,
    } = this.props;

    return (
      <Page__Main>
        <Page__Title>
          <PageTitle
            mods={{ for: 'main-content' }}
          >{title}</PageTitle>
        </Page__Title>

        <Page__Content myRef={this.mainContent}>
          <RawContent mix="page__description">
            {description}
          </RawContent>
        </Page__Content>

        <Page__Content>
          {children}
        </Page__Content>
      </Page__Main>
    );
  }
}

MainContent.defaultProps = {
  title: 'API',
};

MainContent.propTypes = {
  children: PropTypes.node,
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  title: PropTypes.string,
};

export default MainContent;
