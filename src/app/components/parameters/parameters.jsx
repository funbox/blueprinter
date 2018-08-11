import { SlideToggle } from 'react-slide-toggle';
import RawContent from 'app/components/raw-content';
import PropTypes from 'prop-types';
import Button from 'fb-base-blocks/button';

import { get } from 'app/common/utils/helpers';

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
                {params.map((param, index) => {
                  const title = get('meta', 'title', 'content').from(param);
                  const description = get('meta', 'description', 'content').from(param);
                  const defaultValue = get('content', 'value', 'attributes', 'default', 'content').from(param);
                  const example = get('content', 'value', 'content').from(param);

                  return (
                    <div className="parameters__item" key={index * 2}>
                      <div className="parameters__item-title" key={index * 2}>{param.content.key.content}</div>
                      <div className="parameters__item-content" key={index * 2 + 1}>
                        <RawContent>
                          <code>{title || 'string'}</code>
                          &nbsp;
                          {param.attributes.typeAttributes.map((attr, attrIndex) => (
                            <span key={attrIndex}>({attr.content})</span>
                          ))}
                          &nbsp;
                          {defaultValue &&
                            <span className="parameters__default">
                              <strong>Default: </strong>
                              <span>{defaultValue}</span>
                            </span>
                          }
                          &nbsp;
                          {example &&
                            <span className="parameters__example">
                              <strong>Example: </strong>
                              <span>{example}</span>
                            </span>
                          }
                          &nbsp;
                          {description && <p>{description}</p>}
                        </RawContent>
                      </div>
                    </div>
                  );
                })}
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
      description: PropTypes.shape({
        element: PropTypes.string,
        content: PropTypes.string,
      }),
      title: PropTypes.shape({
        element: PropTypes.string,
        content: PropTypes.string,
      }),
    }),
    attributes: PropTypes.shape({
      typeAttributes: PropTypes.arrayOf(PropTypes.shape({
        element: PropTypes.string,
        content: PropTypes.string,
      })),
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
