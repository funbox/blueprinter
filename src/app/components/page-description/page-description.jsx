import { Trans } from '@lingui/macro';
import RawContent from 'app/components/raw-content';
import { htmlFromText } from 'app/common/utils/helpers';

const propTypes = {
  description: PropTypes.string,
  mix: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
};

const PageDescription = (props) => {
  const {
    mix,
  } = props;

  return (
    <RawContent mix={[b('page__description'), mix]}>
      <h2>
        <Trans>General information</Trans>
      </h2>

      {htmlFromText(props.description)}
    </RawContent>
  );
};

PageDescription.propTypes = propTypes;

export default PageDescription;
