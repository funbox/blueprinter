import RawContent from 'app/components/raw-content';
import { Page__Main, Page__Title, Page__Content } from 'app/components/page';
import PageTitle from 'app/components/page-title';

class MainContent extends React.Component {
  constructor(props) {
    super(props);

    this.mainContent = React.createRef();
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

        <Page__Content>
          <RawContent mix="page__description">
            {description}
          </RawContent>
        </Page__Content>

        <Page__Content myRef={this.mainContent}>
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
