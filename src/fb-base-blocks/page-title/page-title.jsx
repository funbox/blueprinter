const PageTitle = (props) => (
  <h1 className={b('page-title', props)}>
    {props.children}
  </h1>
);

PageTitle.propTypes = {
  children: PropTypes.node,
};

export default PageTitle;
