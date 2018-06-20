export default class Main extends React.Component {
  render() {
    const {
      children,
    } = this.props;

    return (
      <div>
        {children}
      </div>
    );
  }
}

Main.propTypes = {
  children: PropTypes.node,
};
