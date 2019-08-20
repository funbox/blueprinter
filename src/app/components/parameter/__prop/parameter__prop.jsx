const propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

const Parameter__Prop = (props) => {
  const {
    title,
    children,
  } = props;

  return (
    <dl className={b('parameter__prop', props)}>
      <dt className={b('parameter__prop-title')}>
        {title}
      </dt>
      <dd className={b('parameter__prop-content')}>
        {children}
      </dd>
    </dl>
  );
};

Parameter__Prop.propTypes = propTypes;

export default Parameter__Prop;
