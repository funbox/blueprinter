const Page__AsideElement = (props) => (
  <div className={b('page__aside-element', props)}>
    {props.children}
  </div>
);

Page__AsideElement.propTypes = {
  children: PropTypes.node,
};

export default Page__AsideElement;
