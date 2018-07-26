const Page__Main = (props) => (
  <main className={b('page__main', props)}>
    {props.children}
  </main>
);

Page__Main.propTypes = {
  children: PropTypes.node,
};

export default Page__Main;
