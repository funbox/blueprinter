const ApiHost = (props) => {
  const host = props.host.trim();
  const href = /^(http|https):\/\/.+$/.exec(host) ? host : `http://${host}`;

  return (
    <div className={b('api-host', props)}>
      <h5 className="api-host__title">
        API Host
      </h5>
      <a className="api-host__link" href={href}>
        {host}
      </a>
    </div>
  );
};

ApiHost.propTypes = {
  host: PropTypes.string,
};

export default ApiHost;
