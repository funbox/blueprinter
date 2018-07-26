const Page__Navigation = (props) => (
  <div className={b('page__navigation', props)}>
    {props.children}
  </div>
);

Page__Navigation.propTypes = {
  children: PropTypes.node,
};

export default Page__Navigation;
