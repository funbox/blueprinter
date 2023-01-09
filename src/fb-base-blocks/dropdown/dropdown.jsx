import { t } from '@lingui/macro';
import Link from '../link';
import Button from '../button';

// https://www.w3.org/TR/2017/NOTE-wai-aria-practices-1.1-20171214/#menubutton

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.defaultState = {
      opened: false,
    };

    this.state = this.defaultState;

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.toggle = this.toggle.bind(this);

    this.handleLink = this.handleLink.bind(this);

    this.controlByKeys = this.controlByKeys.bind(this);
    this.closeByEsc = this.closeByEsc.bind(this);

    this.waitClickOutside = this.waitClickOutside.bind(this);
    this.stopWaitingClickOutside = this.stopWaitingClickOutside.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);

    this.liftingStateUp = this.liftingStateUp.bind(this);
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    if (this.props.mods && this.props.mods.opened) {
      this.open();
    }
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps) {
    if (nextProps.mods && nextProps.mods.opened !== undefined) {
      this.setState({
        opened: nextProps.mods.opened,
      });

      if (nextProps.mods.opened) {
        this.waitClickOutside();
      } else {
        this.stopWaitingClickOutside();
      }
    }
  }

  componentWillUnmount() {
    this.stopWaitingClickOutside();
    this.unmounted = true;
  }

  open() {
    this.waitClickOutside();

    this.setState({
      opened: true,
    });

    this.liftingStateUp({ opened: true });
  }

  close() {
    if (this.unmounted) return;
    this.stopWaitingClickOutside();
    this.setState({
      opened: false,
    });

    this.liftingStateUp({ opened: false });
  }

  liftingStateUp(state) {
    if (this.props.onChange) {
      this.props.onChange(state);
    }
  }

  waitClickOutside() {
    document.addEventListener('click', this.handleOutsideClick);
  }

  stopWaitingClickOutside() {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick(event) {
    if (this.dropdown && this.dropdown.contains(event.target)) {
      return;
    }
    this.close();
  }

  toggle() {
    return this.state.opened ? this.close() : this.open();
  }

  handleLink(event) {
    event.preventDefault();
    this.toggle();
  }

  controlByKeys(event) {
    this.closeByEsc(event);

    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  }

  closeByEsc(event) {
    const KEY_ESC = 27;

    if (event.keyCode === KEY_ESC) {
      this.close();
    }
  }

  render() {
    const {
      children,
      mods = {},
      mix = [],
      handle = { content: t`Menu` },
      popup = { mix: [] },
    } = this.props;

    const {
      opened,
    } = this.state;

    mods.opened = opened;

    const handleProps = { ...handle };
    const handleMods = handleProps.mods || {};
    const handleMix = handleProps.mix || [];

    delete handleProps.content;
    delete handleProps.mods;
    delete handleProps.mix;

    const popupMix = popup.mix || [];

    const handleText = typeof handle.content === 'string' ? handle.content : '';

    return (
      <div
        className={b('dropdown', { mods, mix })}
        onKeyDown={this.controlByKeys}
        ref={r => { this.dropdown = r; }}
      >
        {mods.handle !== 'link'
          && (
            <Button
              mods={handleMods}
              mix={['dropdown__handle', ...handleMix]}
              onClick={this.toggle}
              aria-haspopup="true"
              aria-expanded={opened}
              {...handleProps}
              {...(handleText ? { text: handleText } : {})}
            >
              {!handleText && handle.content}
            </Button>
          )}
        {mods.handle === 'link'
          && (
            <Link
              mods={handleMods}
              mix={['dropdown__handle', ...handleMix]}
              role="button"
              onClick={this.handleLink}
              aria-haspopup="true"
              aria-expanded={opened}
              {...handleProps}
            >
              {handle.content}
            </Link>
          )}

        <div className="dropdown__popup-context">
          <div
            className={b('dropdown__popup', { mix: popupMix })}
            aria-hidden={!opened}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  children: PropTypes.node,
  mods: PropTypes.object,
  mix: PropTypes.array,
  handle: PropTypes.object,
  popup: PropTypes.shape({
    mix: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
  }),
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
};

export default Dropdown;
