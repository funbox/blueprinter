class ApiHost extends React.Component {
  constructor(props) {
    super(props);

    this.apiHostRef = React.createRef();
  }

  componentDidMount() {
    const blockHeight = this.apiHostRef.current.offsetHeight;
    document.documentElement.style.setProperty('--page-description-height', `${blockHeight}px`);
  }

  render() {
    const { host } = this.props;
    const href = /^(http|https):\/\/.+$/.exec(host) ? host : `http://${host}`;

    return (
      <div className={b('api-host', this.props)} ref={this.apiHostRef}>
        <h5 className="api-host__title">
          API Endpoint
        </h5>
        <a className="api-host__link" href={href}>
          {host}
        </a>
      </div>
    );
  }
}

ApiHost.propTypes = {
  host: PropTypes.string,
};

export default ApiHost;
