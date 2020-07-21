import RawContent from 'app/components/raw-content';

export const errorProps = {
  text: PropTypes.string,
  positionDetails: PropTypes.shape({
    line: PropTypes.number,
    column: PropTypes.number,
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
    positionDetails = {},
  } = props.error;

  return (
    <div className={b('error-info', props)}>
      <RawContent>
        <p className={b('error-info__message')}>
          {text}
        </p>

        {(Object.keys(positionDetails)).length > 0 && (
          <dl className={b('error-info__positionDetails')}>
            <dt className={b('error-info__summary-text')}>
              Details
            </dt>
            {positionDetails.line && (
              <dd className={b('error-info__summary-line')}>
                Line: {positionDetails.line}
              </dd>
            )}
            {positionDetails.column && (
              <dd className={b('error-info__summary-line')}>
                Column: {positionDetails.column}
              </dd>
            )}
            {positionDetails.file && (
              <dd className={b('error-info__summary-line')}>
                Source file: {positionDetails.file}
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
