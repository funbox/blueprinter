import Link from 'app/components/link';

const hashFromTitle = title => title.split(' ').join('-');

const Anchor = (props) => {
  const { title, pathname } = props;
  return (
    <Link
      className={b('anchor', props)}
      to={{ hash: hashFromTitle(title), pathname }}
    >¶</Link>
  );
};

Anchor.defaultProps = {
  title: '',
  pathname: '',
};

Anchor.propTypes = {
  title: PropTypes.string,
  pathname: PropTypes.string,
};

export default Anchor;
