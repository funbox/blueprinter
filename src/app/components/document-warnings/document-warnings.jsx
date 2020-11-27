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
            Line {positionDetails.line}{positionDetails.file ? ` (in ${positionDetails.file})` : ''}:
            &nbsp;
            {text}
          </li>
        ))
      }
    </ul>
  </details>
);

DocumentWarnings.propTypes = propTypes;
DocumentWarnings.defaultProps = defaultProps;

export default DocumentWarnings;
