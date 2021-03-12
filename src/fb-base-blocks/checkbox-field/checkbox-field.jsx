import uniqid from 'uniqid';

export const propTypes = {
  id: PropTypes.string,
  mods: PropTypes.shape({
    for: PropTypes.string,
    theme: PropTypes.string,
    type: PropTypes.string,
    readonly: PropTypes.bool,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    focused: PropTypes.bool,
    validationState: PropTypes.oneOf(['error', 'success']),
  }),
  name: PropTypes.string,
  children: PropTypes.node.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  title: PropTypes.string,
};

const defaultProps = {
  mods: {},
  id: undefined,
  name: null,
  value: undefined,
  onFocus: undefined,
  onBlur: undefined,
  title: undefined,
};

class CheckboxField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: false,
    };

    this.defaultId = uniqid.time('checkbox');

    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onFocus() {
    this.setState({
      focused: true,
    });

    if (this.props.onFocus) {
      this.props.onFocus();
    }
  }

  onBlur() {
    this.setState({
      focused: false,
    });

    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  onChange(event) {
    this.props.onChange(event.target.checked);
  }

  render() {
    const {
      id = this.defaultId,
      children,
      name,
      value,
      mods,
      title,
    } = this.props;

    const {
      focused,
    } = this.state;

    mods.focused = focused;

    return (
      <div className={b('checkbox-field', this.props, { theme: 'standard' })}>
        <input
          className={b('checkbox-field__input')}
          id={id}
          type="checkbox"
          value={value}
          name={name}
          checked={mods.checked}
          disabled={mods.disabled}
          readOnly={mods.readonly}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChange}
        />

        <label
          className={b('checkbox-field__label')}
          htmlFor={id}
          title={title}
        >
          <div className={b('checkbox-field__label-content')}>{children}</div>
        </label>
      </div>
    );
  }
}

CheckboxField.propTypes = propTypes;
CheckboxField.defaultProps = defaultProps;

export default CheckboxField;
