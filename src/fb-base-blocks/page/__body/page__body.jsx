const Page__Body = (props) => (
  <div className={b('page__body', props)}>
    {props.children}
  </div>
);

Page__Body.propTypes = {
  children: PropTypes.node,
};

export default Page__Body;
