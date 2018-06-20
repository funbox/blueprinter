import SandboxNavigation from 'sandbox/components/sandbox-navigation';

const Fragment = React.Fragment;

export default class SandboxLayout extends React.Component {
  render() {
    const {
      children,
    } = this.props;

    return (
      <Fragment>
        {children}
        <SandboxNavigation/>
      </Fragment>
    );
  }
}

SandboxLayout.propTypes = {
  children: PropTypes.node,
};
