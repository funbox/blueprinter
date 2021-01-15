import RawContent from 'app/components/raw-content';

const propTypes = {
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  mix: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
};

const PageDescription = (props) => {
  const {
    mix,
  } = props;

  return (
    <RawContent mix={[b('page__description'), mix]}>
      <h2>
        Общие сведения
      </h2>

      {props.description}
    </RawContent>
  );
};

PageDescription.propTypes = propTypes;

export default PageDescription;
