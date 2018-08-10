class TransitionContainer extends React.Component {
  render() {
    return (
      <div
        className={b('transition-container', this.props)}
        ref={this.props.myRef}
      >
        {this.props.children}
      </div>
    );
  }
}

TransitionContainer.propTypes = {
  children: PropTypes.node,
  myRef: PropTypes.object,
};

export default TransitionContainer;
