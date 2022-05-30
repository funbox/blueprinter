import Page, {
  Page__Body,
  Page__Title,
  Page__Content,
  Page__Main,
} from 'app/components/page';
import PageTitle from 'app/components/page-title';
import CrafterDiagnosticMessage from 'app/components/crafter-diagnostic-message';
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
          <PageTitle>
            Errors and warnings
          </PageTitle>
        </Page__Title>

        <Page__Content>
          <CrafterDiagnosticMessage
            type="error"
            subTitle={props.error.text}
          >
            <ErrorInfo
              error={props.error}
            />
          </CrafterDiagnosticMessage>
        </Page__Content>

        { props.warnings.length > 0 && (
          <Page__Content>
            <CrafterDiagnosticMessage type="warning">
              <DocumentWarnings
                warnings={props.warnings}
                mods={{
                  for: 'error-page',
                }}
                detailsAreOpen
              />
            </CrafterDiagnosticMessage>
          </Page__Content>
        )}
      </Page__Main>
    </Page__Body>
  </Page>
);

Error.propTypes = propTypes;
Error.defaultProps = defaultProps;

export default Error;
