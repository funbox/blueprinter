import { t } from '@lingui/macro';
import PropTypes from 'prop-types';
import Section from 'app/components/section';
import URIParameter, { parameterProps } from 'app/components/parameter';

class Parameters extends React.Component {
  render() {
    const { params, mix } = this.props;

    if (params.length === 0) return null;

    return (
      <Section
        title={t`URI Parameters`}
        titleTag="h5"
        mods={{ for: 'uri-parameters' }}
        mix={mix}
      >
        <ul className={b('parameters', this.props)}>
          {
            params.map((parameter, index) => (
              <li
                className={b('parameters__item')}
                key={`parameter-${index}`}
              >
                <URIParameter parameter={parameter}/>
              </li>
            ))
          }
        </ul>
      </Section>
    );
  }
}

Parameters.propTypes = {
  params: PropTypes.arrayOf(parameterProps),
  mix: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
};

export default Parameters;
