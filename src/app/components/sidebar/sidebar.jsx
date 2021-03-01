import Resizable from 'app/components/resizable';
import Button from 'fb-base-blocks/button';

const SIDEBAR_SIZE = {
  CLOSED: 52,
};

const TOGGLE_HOTKEY = {
  TEXT: '(S)',
  CODE: 83,
};

const propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
  initialSize: PropTypes.shape({
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
};

const defaultProps = {
  direction: ['left', 'right'],
  initialSize: { width: '360px', height: '100%' },
};

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.resizable = React.createRef();

    this.state = {
      isClosed: false,
    };

    this.toggleSidebarStage = this.toggleSidebarStage.bind(this);
  }

  updateSize() {
    const { isClosed } = this.state;
    const { initialSize: { width, height } } = this.props;

    if (isClosed) {
      this.resizable.current.updateSize({ width: SIDEBAR_SIZE.CLOSED, height });

      return;
    }

    this.resizable.current.updateSize({ width, height });
  }

  toggleSidebarStage() {
    this.setState(prevState => ({
      isClosed: !prevState.isClosed,
    }), this.updateSize);
  }

  render() {
    const {
      direction,
      children,
      initialSize,
    } = this.props;

    const { isClosed } = this.state;

    return (
      <div className={b('sidebar', this.props, { closed: isClosed })}>
        <Button
          mix={b('sidebar__toggle')}
          mods={{
            onlyIcon: true,
          }}
          text={TOGGLE_HOTKEY.TEXT}
          onClick={this.toggleSidebarStage}
        />
        <Resizable
          ref={this.resizable}
          mix={b('sidebar__resizable')}
          direction={direction}
          initialSize={{ ...initialSize }}
        >
          {children}
        </Resizable>
      </div>
    );
  }
}

Sidebar.defaultProps = defaultProps;
Sidebar.propTypes = propTypes;

export default Sidebar;
