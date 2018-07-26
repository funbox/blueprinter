const Page__Header = (props) => (
  <div className={b('page__header', props)}>
    {props.children}
  </div>
);

Page__Header.propTypes = {
  children: PropTypes.node,
};

export default Page__Header;
