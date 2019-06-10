import Page, {
  Page__Body,
  Page__Title,
  Page__Content,
  Page__Main,
} from 'app/components/page';
import PageTitle from 'app/components/page-title';
import ErrorInfo, { errorProps } from 'app/components/error-info';

const propTypes = {
  error: PropTypes.shape(errorProps),
};

const defaultProps = {
  error: {},
};

const Error = (props) => (
  <Page mods={{ type: 'error' }}>
    <Page__Body>
      <Page__Main>
        <Page__Title>
          <PageTitle mods={{ for: 'main-content' }}>
            Crafter parsing error
          </PageTitle>
        </Page__Title>

        <Page__Content>
          <ErrorInfo
            error={props.error}
          />
        </Page__Content>
      </Page__Main>
    </Page__Body>
  </Page>
);

Error.propTypes = propTypes;
Error.defaultProps = defaultProps;

export default Error;
