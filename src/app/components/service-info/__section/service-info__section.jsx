import { Fragment } from 'react';
import Code from 'app/components/code';

const propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  definitions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      term: PropTypes.string,
      details: PropTypes.string,
      note: PropTypes.node,
    }),
  ),
  children: PropTypes.node,
};

const ServiceInfo__Section = (props) => {
  const { title, subtitle, definitions, children } = props;

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
        {definitions && (
          <dl className={b('service-info__definitions')}>
            { definitions.map(definition => (
              <Fragment key={definition.id}>
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
              </Fragment>
            ))}
          </dl>
        )}

        {children}
      </div>
    </section>
  );
};

ServiceInfo__Section.propTypes = propTypes;

export default ServiceInfo__Section;
