const Page__Footer = (props) => (
  <div className={b('page__footer', props)}>
    {props.children}
  </div>
);

Page__Footer.propTypes = {
  children: PropTypes.node,
};

export default Page__Footer;
