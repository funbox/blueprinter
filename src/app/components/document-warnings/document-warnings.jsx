export const warningProps = PropTypes.arrayOf(PropTypes.shape({
  text: PropTypes.string,
  positionDetails: PropTypes.shape({
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
  <details className={b('document-warnings', props)} open={props.detailsAreOpen}>
    <summary className={b('document-warnings__summary')}>
      See details
    </summary>
    <ul className={b('document-warnings__list')}>
      {
        props.warnings.map(({ text, positionDetails = {}, id }) => (
          <li className={b('document-warnings__item')} key={id}>
            <span className={b('document-warnings__line')}>
              Line {positionDetails.line}:
            </span>
            {'\u00a0'}
            <span className={b('document-warnings__text')}>
              {positionDetails.file ? `(in ${positionDetails.file}): ` : ''}
              {text}
            </span>
          </li>
        ))
      }
    </ul>
  </details>
);

DocumentWarnings.propTypes = propTypes;
DocumentWarnings.defaultProps = defaultProps;

export default DocumentWarnings;
