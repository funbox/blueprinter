import uniqid from 'uniqid';

export const propTypes = {
  mods: PropTypes.shape({
    for: PropTypes.string,
    theme: PropTypes.string,
    type: PropTypes.string,
    masked: PropTypes.bool,
    focused: PropTypes.bool,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    processing: PropTypes.bool,
    validationState: PropTypes.oneOf(['error', 'success']),
  }),
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  maxLength: PropTypes.number,
  autoComplete: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  autoFocus: PropTypes.bool,
  input: PropTypes.object, /* eslint-disable-line react/forbid-prop-types */
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  children: PropTypes.node,
  mix: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.string,
    ),
  ]),
};

const defaultProps = {
  mods: {},
  id: undefined,
  name: null,
  placeholder: '',
  type: null,
  value: undefined,
  maxLength: null,
  autoComplete: false,
  autoFocus: false,
  input: {},
  onFocus: undefined,
  onBlur: undefined,
  onChange: undefined,
  children: null,
  mix: [],
};

class TextField extends React.Component {
  static getPseudoPlaceholder(value, mask) {
    const realValue = value.indexOf('\u2007') > 0 ? value.substr(0, value.indexOf('\u2007')) : value;

    return realValue.concat(mask.slice(realValue.length));
  }

  static getInputTypeFromMod(mod) {
    switch (mod) {
      case 'number':
        // Doesn't work with a masked input field
        // https://github.com/sanniassin/react-input-mask/issues/110
        return 'tel';
      default:
        return mod;
    }
  }

  static getAutoCompleteValue(autoComplete) {
    if (typeof autoComplete === 'string') {
      return autoComplete;
    }

    return autoComplete ? 'on' : 'off';
  }

  constructor(props) {
    super(props);

    this.defaulId = uniqid.time('text-field');

    this.state = {
      focused: false,
    };

    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onBlur() {
    this.setState({
      focused: false,
    });

    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  onFocus() {
    this.setState({
      focused: true,
    });

    if (this.props.onFocus) {
      this.props.onFocus();
    }
  }

  onChange({ target: { value } }) {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  render() {
    const {
      mods,
      mix,
      id = this.defaulId,
      name,
      placeholder,
      type,
      value,
      maxLength,
      autoComplete,
      autoFocus,
      input,
      children,
    } = this.props;

    const {
      focused,
    } = this.state;

    mods.focused = focused;

    const inputType = type || TextField.getInputTypeFromMod(mods.type) || 'text';

    const isDisabled = mods.disabled || mods.processing;

    let placeholderMask = mods.masked ? placeholder : '';
    if (placeholderMask) {
      placeholderMask = value ? TextField.getPseudoPlaceholder(value, placeholderMask) : placeholderMask;
    }

    const inputProps = { ...input };
    const inputMix = inputProps.mix || [];

    delete inputProps.mix;

    if (mods.masked) {
      delete inputProps.ref;
      delete inputProps.maskRef;
    }

    return (
      <div className={b('text-field', { mods, mix })}>
        <input
          className={b('text-field__input', { mix: inputMix })}
          id={id}
          name={name}
          placeholder={placeholder}
          type={inputType}
          value={value}
          required={mods.required || null}
          disabled={isDisabled || null}
          maxLength={maxLength}
          autoComplete={TextField.getAutoCompleteValue(autoComplete)}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChange}
          autoFocus={autoFocus}
          {...(mods.masked && input.ref ? { inputRef: input.ref } : {})}
          {...(mods.masked && input.maskRef ? { ref: input.maskRef } : {})}
          {...inputProps}
        />

        {
          (placeholderMask) && (
            <span className={b('text-field__placeholder-mask')}>
              <input
                className={b('text-field__input', {}, { masked: true })}
                aria-hidden="true"
                id={`${id}-placeholder-mask`}
                name={`${name}-placeholder-mask`}
                value={placeholderMask}
                type={inputType}
                readOnly="readOnly"
                tabIndex="-1"
              />
            </span>
          )
        }

        {children}
      </div>
    );
  }
}

TextField.propTypes = propTypes;
TextField.defaultProps = defaultProps;

export default TextField;
