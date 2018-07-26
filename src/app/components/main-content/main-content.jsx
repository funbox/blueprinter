import RawContent from 'app/components/raw-content';
import { Page__Main, Page__Title, Page__Content } from 'app/components/page';
import PageTitle from 'app/components/page-title';

const MainContent = (props) => {
  const {
    title,
    description,
    children,
  } = props;
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

      <Page__Content>
        {children}
      </Page__Content>
    </Page__Main>
  );
};

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
