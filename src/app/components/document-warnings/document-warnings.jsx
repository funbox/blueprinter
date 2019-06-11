export const warningProps = PropTypes.arrayOf(PropTypes.shape({
  text: PropTypes.string,
  details: PropTypes.shape({
    line: PropTypes.number,
    file: PropTypes.string,
  }),
}));

const propTypes = {
  warnings: warningProps,
  detailsAreOpen: PropTypes.bool,
};

const defaultProps = {
  warnings: [],
  detailsAreOpen: false,
};

const DocumentWarnings = (props) => (
  <div className={b('document-warnings', props)}>
    <p className={b('document-warnings__title')}>
      API Blueprint has warnings
    </p>

    <details className={b('document-warnings__details')} open={props.detailsAreOpen}>
      <summary className={b('document-warnings__summary')}>
        See details
      </summary>
      <ul className={b('document-warnings__list')}>
        {
          props.warnings.map(({ text, details = {}, id }) => (
            <li className={b('document-warnings__item')} key={id}>
              Line {details.line}{details.file ? ` (in ${details.file})` : ''}:
              &nbsp;
              {text}
            </li>
          ))
        }
      </ul>
    </details>
  </div>
);

DocumentWarnings.propTypes = propTypes;
DocumentWarnings.defaultProps = defaultProps;

export default DocumentWarnings;
