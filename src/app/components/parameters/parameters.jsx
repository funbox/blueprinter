const Fragment = React.Fragment;
import RawContent from 'app/components/raw-content';

class Parameters extends React.Component {
  constructor(props) {
    super(props);

    this.state = { collapsed: false };
    this.toggleClass = this.toggleClass.bind(this);
  }

  toggleClass() {
    this.setState(prevState => ({ ...prevState, collapsed: !prevState.collapsed }));
  }

  render() {
    const { params } = this.props;
    const { collapsed } = this.state;

    return (
      params.length > 0 ?
        <section>
          <div className="parameters__title">
            <strong>URI Parameters</strong>
            <div className="collapse-button" onClick={this.toggleClass}>
              {this.state.collapsed ? 'Show' : 'Hide'}
            </div>
          </div>
          <div className={b('parameters__content', { mods: { collapsed } })}>
            <dl>
              {params.map((param, index) => (
                <Fragment key={index * 2}>
                  <dt className="parameters__item-title" key={index * 2}>{param.content.key.content}</dt>
                  <dd className="parameters__item" key={index * 2 + 1}>
                    <RawContent>
                      <code>{param.meta.title || 'string'}</code>
                      &nbsp;
                      {param.attributes.typeAttributes.map((attr, attrIndex) => (
                        <span key={attrIndex}>({attr})</span>
                      ))}
                      &nbsp;
                      {param.content.value.content &&
                        <span className="parameters__example">
                          <strong>Example:</strong>
                          <span>{param.content.value.content}</span>
                        </span>
                      }
                      &nbsp;
                      <p>{param.meta.description}</p>
                    </RawContent>
                  </dd>
                </Fragment>
              ))}
            </dl>
          </div>
        </section> : null
    );
  }
}

Parameters.propTypes = {
  params: PropTypes.array,
};

export default Parameters;
