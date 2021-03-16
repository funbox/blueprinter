import CrafterDiagnosticMessage__Badge_Error from './__badge/crafter-diagnostic-message__badge_error.svg?inline';
import CrafterDiagnosticMessage__Badge_Warning from './__badge/crafter-diagnostic-message__badge_warning.svg?inline';

const propTypes = {
  type: PropTypes.oneOf(['error', 'warning']).isRequired,
  titleTag: PropTypes.string,
  subTitle: PropTypes.string,
  children: PropTypes.node.isRequired,
};

const defaultProps = {
  titleTag: 'h2',
  subTitle: undefined,
};

const titleByType = {
  error: 'Crafter parsing error',
  warning: 'API Blueprint has warnings',
};

const CrafterDiagnosticMessage = (props) => {
  const {
    type,
    titleTag: TitleTag,
    subTitle,
    children,
  } = props;

  const isTypeError = type === 'error';

  return (
    <div className={b('crafter-diagnostic-message', { mods: { type } })}>
      <div className={b('crafter-diagnostic-message__header')}>
        <span className={b('crafter-diagnostic-message__badge')}>
          {isTypeError ? (
            <>
              <CrafterDiagnosticMessage__Badge_Error/>
              <span className={b('crafter-diagnostic-message__badge-text')}>Error</span>
            </>
          ) : (
            <>
              <CrafterDiagnosticMessage__Badge_Warning/>
              <span className={b('crafter-diagnostic-message__badge-text')}>Warning</span>
            </>
          )}
        </span>
        <TitleTag className={b('crafter-diagnostic-message__title')}>
          {titleByType[type]}
        </TitleTag>

        { subTitle && (
          <p className={b('crafter-diagnostic-message__subtitle')}>
            {subTitle}
          </p>
        )}
      </div>

      <div className={b('crafter-diagnostic-message__body')}>
        {children}
      </div>
    </div>
  );
};

CrafterDiagnosticMessage.propTypes = propTypes;
CrafterDiagnosticMessage.defaultProps = defaultProps;

export default CrafterDiagnosticMessage;
