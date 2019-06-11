import Page, {
  Page__Body,
  Page__Title,
  Page__Content,
  Page__Main,
} from 'app/components/page';
import PageTitle from 'app/components/page-title';
import ErrorInfo, { errorProps } from 'app/components/error-info';
import DocumentWarnings, { warningProps } from 'app/components/document-warnings';

const propTypes = {
  error: PropTypes.shape(errorProps),
  warnings: warningProps,
};

const defaultProps = {
  error: {},
  warnings: [],
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

        {
          props.warnings.length > 0 && (
            <Page__Content>
              <DocumentWarnings
                warnings={props.warnings}
                mods={{
                  for: 'error-page',
                }}
                detailsAreOpen
              />
            </Page__Content>
          )
        }
      </Page__Main>
    </Page__Body>
  </Page>
);

Error.propTypes = propTypes;
Error.defaultProps = defaultProps;

export default Error;
