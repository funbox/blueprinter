import Resizable from 'app/components/resizable';
import Button from 'fb-base-blocks/button';
import isHotkey from 'app/common/utils/helpers/is-hotkey';

const SIDEBAR_SIZE = {
  CLOSED: 52,
  MIN: 240,
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
    this.onToggleKeyDown = this.onToggleKeyDown.bind(this);
    this.onClosedSidebarClick = this.onClosedSidebarClick.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onResizeStop = this.onResizeStop.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onToggleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onToggleKeyDown);
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

  onToggleKeyDown(e) {
    if (isHotkey(e, TOGGLE_HOTKEY.CODE)) this.toggleSidebarStage();
  }

  onClosedSidebarClick() {
    const { isClosed } = this.state;

    if (isClosed) {
      this.setState({
        isClosed: false,
      }, this.updateSize);
    }
  }

  onResize() {
    const { initialSize: { height } } = this.props;

    const sidebarWidth = this.resizable.current.size.width;

    if (sidebarWidth <= SIDEBAR_SIZE.MIN) {
      this.resizable.current.updateSize({ width: SIDEBAR_SIZE.MIN, height });
    }
  }

  onResizeStop() {
    const sidebarWidth = this.resizable.current.size.width;

    if (sidebarWidth === SIDEBAR_SIZE.MIN) {
      this.setState({
        isClosed: true,
      }, this.updateSize);
    }
  }

  render() {
    const {
      direction,
      children,
      initialSize,
    } = this.props;

    const { isClosed } = this.state;

    return (
      <div
        className={b('sidebar', this.props, { closed: isClosed })}
        onClick={this.onClosedSidebarClick}
      >
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
          onResize={this.onResize}
          onResizeStop={this.onResizeStop}
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
