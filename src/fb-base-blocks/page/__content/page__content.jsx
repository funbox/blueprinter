const Page__Content = (props) => (
  <div className={b('page__content', props)}>
    {props.children}
  </div>
);

Page__Content.propTypes = {
  children: PropTypes.node,
};

export default Page__Content;
