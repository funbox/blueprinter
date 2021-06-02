import Code from 'app/components/code';

const propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  definitions: PropTypes.arrayOf(
    PropTypes.shape({
      term: PropTypes.string,
      details: PropTypes.string,
      note: PropTypes.node,
    }),
  ).isRequired,
};

const ServiceInfo__Section = (props) => {
  const { title, subtitle, definitions } = props;

  return (
    <section className={b('service-info__section', props)}>
      <div className={b('service-info__header')}>
        <h3 className={b('service-info__title')}>
          {title}
        </h3>
        { subtitle && (
          <p className={b('service-info__subtitle')}>
            {subtitle}
          </p>
        )}
      </div>
      <div className={b('service-info__body')}>
        <dl className={b('service-info__definitions')}>
          { definitions.map(definition => (
            <>
              <dt className={b('service-info__term')}>
                <Code mods={{ theme: 'standard' }} mix={b('service-info__code')}>
                  {definition.term}
                </Code>
              </dt>
              <dd className={b('service-info__details')}>
                {definition.details}
                { definition.note && (
                  <span className={b('service-info__note')}>
                    {definition.note}
                  </span>
                )}
              </dd>
            </>
          ))}
        </dl>
      </div>
    </section>
  );
};

ServiceInfo__Section.propTypes = propTypes;

export default ServiceInfo__Section;
