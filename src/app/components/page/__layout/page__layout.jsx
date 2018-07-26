const Page__Layout = (props) => (
  <div className={b('page__layout', props)}>
    {props.children}
  </div>
);

Page__Layout.propTypes = {
  children: PropTypes.node,
};

export default Page__Layout;
