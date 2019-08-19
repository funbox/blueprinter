import { Page__Main, Page__Content } from 'app/components/page';

class MainContent extends React.Component {
  render() {
    const {
      children,
    } = this.props;

    return (
      <Page__Main>
        <Page__Content>
          {children}
        </Page__Content>
      </Page__Main>
    );
  }
}

MainContent.propTypes = {
  children: PropTypes.node,
};

export default MainContent;
