import RawContent from 'app/components/raw-content';
import { Page__Main, Page__Content } from 'app/components/page';

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
      description,
      children,
    } = this.props;

    return (
      <Page__Main>
        <Page__Content myRef={this.mainContent}>
          {
            description && (
              <RawContent mix="page__description">
                <h2>
                  Общие сведения
                </h2>

                {description}
              </RawContent>
            )
          }
        </Page__Content>

        <Page__Content>
          {children}
        </Page__Content>
      </Page__Main>
    );
  }
}

MainContent.propTypes = {
  children: PropTypes.node,
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
};

export default MainContent;
