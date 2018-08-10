const Page__Content = (props) => (
  <div
    className={b('page__content', props)}
    ref={props.myRef}
  >
    {props.children}
  </div>
);

Page__Content.propTypes = {
  children: PropTypes.node,
  myRef: PropTypes.object,
};

export default Page__Content;
