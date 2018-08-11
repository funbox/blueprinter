import { SlideToggle } from 'react-slide-toggle';
import RawContent from 'app/components/raw-content';
import PropTypes from 'prop-types';
import Button from 'fb-base-blocks/button';

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
        <SlideToggle
          bestPerformance
          onCollapsed={this.toggleClass}
          onExpanding={this.toggleClass}
        >
          {({ onToggle, setCollapsibleElement }) => (
            <section className={b('parameters', { mods: { collapsed } })}>
              <div className="parameters__heading">
                <h5 className="parameters__title">URI Parameters</h5>
                <Button mix={['parameters__collapse-button']} onClick={onToggle}>
                  {this.state.collapsed ? 'Show' : 'Hide'}
                </Button>
              </div>
              <div className="parameters__content" ref={setCollapsibleElement}>
                {params.map((param, index) => (
                  <div className="parameters__item" key={index * 2}>
                    <div className="parameters__item-title" key={index * 2}>{param.content.key.content}</div>
                    <div className="parameters__item-content" key={index * 2 + 1}>
                      <RawContent>
                        <code>{param.meta.title || 'string'}</code>
                        &nbsp;
                        {param.attributes.typeAttributes.map((attr, attrIndex) => (
                          <span key={attrIndex}>({attr})</span>
                        ))}
                        &nbsp;
                        {param.content.value.attributes.default.content &&
                          <span className="parameters__default">
                            <strong>Default: </strong>
                            <span>{param.content.value.attributes.default.content}</span>
                          </span>
                        }
                        {param.content.value.content &&
                          <span className="parameters__example">
                            <strong>Example:</strong>
                            <span>{param.content.value.content}</span>
                          </span>
                        }
                        &nbsp;
                        <p>{param.meta.description}</p>
                      </RawContent>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </SlideToggle> : null
    );
  }
}

Parameters.propTypes = {
  params: PropTypes.arrayOf(PropTypes.shape({
    meta: PropTypes.shape({
      description: PropTypes.string,
      title: PropTypes.string,
    }),
    attributes: PropTypes.shape({
      typeAttributes: PropTypes.arrayOf(PropTypes.string),
    }),
    content: PropTypes.shape({
      key: PropTypes.shape({
        element: PropTypes.string,
        content: PropTypes.string,
      }),
      value: PropTypes.shape({
        element: PropTypes.string,
        content: PropTypes.string,
      }),
    }),
  })),
};

export default Parameters;
