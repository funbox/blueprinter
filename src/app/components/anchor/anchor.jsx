import Link from 'app/components/link';

import { hashFromTitle } from 'app/common/utils/helpers/hash';

const Anchor = (props) => {
  const { title, pathname, hash } = props;
  return (
    <Link
      className={b('anchor', props)}
      to={{ hash: hash || hashFromTitle(title), pathname }}
    >¶</Link>
  );
};

Anchor.defaultProps = {
  title: '',
  pathname: '',
  hash: '',
};

Anchor.propTypes = {
  title: PropTypes.string,
  pathname: PropTypes.string,
  hash: PropTypes.string,
};

export default Anchor;
