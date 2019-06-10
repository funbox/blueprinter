import RawContent from 'app/components/raw-content';

export const errorProps = {
  text: PropTypes.string,
  details: PropTypes.shape({
    line: PropTypes.number,
    file: PropTypes.string,
  }),
};

const propTypes = {
  error: PropTypes.shape(errorProps),
};

const defaultProps = {
  error: {},
};

const ErrorInfo = (props) => {
  const {
    text,
    details = {},
  } = props.error;

  return (
    <div className={b('error-info', props)}>
      <RawContent>
        <p className={b('error-info__message')}>
          {text}
        </p>

        {(details.line || details.file) && (
          <dl className={b('error-info__details')}>
            <dt className={b('error-info__summary-text')}>
              Details
            </dt>
            {details.line && (
              <dd className={b('error-info__summary-line')}>
                Line: {details.line}
              </dd>
            )}
            {details.file && (
              <dd className={b('error-info__summary-line')}>
                Source file: {details.file}
              </dd>
            )}
          </dl>
        )}
      </RawContent>
    </div>
  );
};

ErrorInfo.propTypes = propTypes;
ErrorInfo.defaultProps = defaultProps;

export default ErrorInfo;
