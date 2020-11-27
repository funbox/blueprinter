export const errorProps = {
  positionDetails: PropTypes.shape({
    line: PropTypes.number,
    column: PropTypes.number,
    file: PropTypes.string,
    lines: PropTypes.arrayOf(PropTypes.string),
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
    positionDetails = {},
  } = props.error;

  const { line, column, file, lines } = positionDetails;
  const hasErrorDetails = [line, column, file].filter(Boolean).length > 0;
  const hasErrorSourceLines = !!lines;

  if (!hasErrorDetails && !hasErrorSourceLines) {
    return null;
  }

  return (
    <div className={b('error-info', props)}>
      { hasErrorDetails && (
        <section className={b('error-info__section')}>
          <h3 className={b('error-info__title')}>
            Details
          </h3>

          <div className={b('error-info__content', { mods: { for: 'details' } })}>
            <table className={b('error-info__details')}>
              <tbody className={b('error-info__body')}>
                { line && (
                  <tr className={b('error-info__row')}>
                    <td className={b('error-info__data', {}, { type: 'name' })}>
                      Line:
                    </td>
                    <td className={b('error-info__data', {}, { type: 'value' })}>
                      {line}
                    </td>
                  </tr>
                )}
                { column && (
                  <tr className={b('error-info__row')}>
                    <td className={b('error-info__data', {}, { type: 'name' })}>
                      Column:
                    </td>
                    <td className={b('error-info__data', {}, { type: 'value' })}>
                      {column}
                    </td>
                  </tr>
                )}
                { file && (
                  <tr className={b('error-info__row')}>
                    <td className={b('error-info__data', {}, { type: 'name' })}>
                      Source file:
                    </td>
                    <td className={b('error-info__data', {}, { type: 'value' })}>
                      {file}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      { hasErrorSourceLines && (
        <section className={b('error-info__section')}>
          <h3 className={b('error-info__title')}>
            Source lines:
          </h3>

          <div className={b('error-info__content', { mods: { for: 'source-lines' } })}>
            <pre className={b('error-info__source-lines')}>
              {lines.map((ln, index) => {
                const highlighted = ln.trim().startsWith('>');
                return (
                  <code key={index} className={b('error-info__line', {}, { highlighted })}>
                    {ln}
                  </code>
                );
              })}
            </pre>
          </div>
        </section>
      )}
    </div>
  );
};

ErrorInfo.propTypes = propTypes;
ErrorInfo.defaultProps = defaultProps;

export default ErrorInfo;
