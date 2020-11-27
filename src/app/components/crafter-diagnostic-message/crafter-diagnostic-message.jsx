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

  return (
    <div className={b('crafter-diagnostic-message', { mods: { type } })}>
      <div className={b('crafter-diagnostic-message__header')}>
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
