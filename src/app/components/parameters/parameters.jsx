import PropTypes from 'prop-types';
import Section from 'app/components/section';
import ParametersTable, { parameterProps } from 'app/components/parameters-table';

class Parameters extends React.Component {
  render() {
    const { params, mix } = this.props;

    if (params.length === 0) return null;

    return (
      <Section
        title="URI Parameters"
        titleTag="h5"
        mods={{ for: 'uri-parameters' }}
        mix={mix}
      >
        <ParametersTable params={params}/>
      </Section>
    );
  }
}

Parameters.propTypes = {
  params: PropTypes.arrayOf(parameterProps),
  mix: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
};

export default Parameters;
