import RawContent from 'app/components/raw-content';
import { Page__Main, Page__Content } from 'app/components/page';

class MainContent extends React.Component {
  render() {
    const {
      description,
      children,
    } = this.props;

    return (
      <Page__Main>
        <Page__Content>
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
