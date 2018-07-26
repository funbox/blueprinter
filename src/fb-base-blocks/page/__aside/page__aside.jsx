const Page__Aside = (props) => (
  <aside className={b('page__aside', props)}>
    {props.children}
  </aside>
);

Page__Aside.propTypes = {
  children: PropTypes.node,
};

export default Page__Aside;
