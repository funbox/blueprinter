import Link from 'app/components/link';
import { createHash } from 'app/common/utils/helpers/hash';

const Anchor = (props) => {
  const { title, pathname } = props;
  const hash = props.hash || createHash(title);

  return (
    <Link
      className={b('anchor', props)}
      to={{ hash, pathname }}
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
