const Page__Stripe = (props) => {
  const Tag = props.tag || 'div';

  return (
    <Tag
      id={props.id}
      className={b('page__stripe', props)}
    >
      {props.children}
    </Tag>
  );
};

Page__Stripe.propTypes = {
  id: PropTypes.string,
  tag: PropTypes.string,
  children: PropTypes.node,
};

export default Page__Stripe;
