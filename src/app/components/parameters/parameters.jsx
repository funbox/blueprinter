import PropTypes from 'prop-types';
import ParametersTable, { parameterProps } from 'app/components/parameters-table';

class Parameters extends React.Component {
  render() {
    const { params } = this.props;

    if (params.length === 0) return null;

    return (
      <section className={b('parameters', this.props)}>
        <div className="parameters__heading">
          <h5 className="parameters__title">
            URI Parameters
          </h5>
        </div>
        <div className="parameters__content">
          <ParametersTable params={params}/>
        </div>
      </section>
    );
  }
}

Parameters.propTypes = {
  params: PropTypes.arrayOf(parameterProps),
};

export default Parameters;
