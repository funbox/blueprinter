import SandboxNavigation from 'sandbox/components/sandbox-navigation';

const Fragment = React.Fragment;

export default class SandboxLayout extends React.Component {
  render() {
    const {
      children,
    } = this.props;

    return (
      <Fragment>
        <div className="sandbox-layout">
          <div className="sandbox-layout__content">
            {children}
          </div>
          <div className="sandbox-layout__drawer">
            <SandboxNavigation/>
          </div>
        </div>
      </Fragment>
    );
  }
}

SandboxLayout.propTypes = {
  children: PropTypes.node,
};
