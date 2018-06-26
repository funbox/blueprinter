import Attribute__Row from './__row';

class Attribute extends React.Component {
  constructor(props) {
    super(props);

    this.state = { collapsed: true };
    this.toggleCollapsedState = this.toggleCollapsedState.bind(this);
  }

  toggleCollapsedState() {
    this.setState((prevState) => ({
      ...prevState,
      collapsed: !prevState.collapsed,
    }));
  }

  render() {
    const {
      attribute,
      nestedAttributes,
      mods = {},
      mix = [],
    } = this.props;

    if (nestedAttributes) {
      mods.hasChildren = true;
      mods.collapsed = this.state.collapsed;
    }

    return (
      <div className={b('attribute', { mods, mix })}>
        <Attribute__Row
          attribute={attribute}
          disabledExample={!!nestedAttributes}
          onClick={nestedAttributes ? this.toggleCollapsedState : null}
        />

        {!!nestedAttributes &&
          <div className="attribute__children">{nestedAttributes}</div>
        }
      </div>
    );
  }
}

Attribute.propTypes = {
  attribute: PropTypes.shape({
    element: PropTypes.string,
    content: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
      PropTypes.string,
    ]),
  }),
  nestedAttributes: PropTypes.node,
  mods: PropTypes.object,
  mix: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
};

export default Attribute;
