class CollapsibleSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: true,
    };
  }

  render() {
    const { collapsed } = this.state;
    const { children, title } = this.props;

    return (
      <div className={b('collapsible-section', this.props, { collapsed })}>
        <h5
          className="collapsible-section__title"
          role="button"
          onClick={() => this.setState(state => ({ collapsed: !state.collapsed }))}
        >
          {title}
        </h5>

        {!collapsed && children}
      </div>
    );
  }
}

CollapsibleSection.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
};

export default CollapsibleSection;
