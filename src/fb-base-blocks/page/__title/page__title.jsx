const Page__Title = (props) => (
  <div className={b('page__title', props)}>
    {props.children}
  </div>
);

Page__Title.propTypes = {
  children: PropTypes.node,
};

export default Page__Title;
