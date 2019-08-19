import RawContent from 'app/components/raw-content';

const propTypes = {
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
};

const PageDescription = (props) => (
  <RawContent mix={[b('page__description')]}>
    <h2>
      Общие сведения
    </h2>

    {props.description}
  </RawContent>
);

PageDescription.propTypes = propTypes;

export default PageDescription;
