import { SlideToggle } from 'react-slide-toggle';
import RawContent from 'app/components/raw-content';
import PropTypes from 'prop-types';
import Button from 'fb-base-blocks/button';

import { get, htmlFromText } from 'app/common/utils/helpers';

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
      params.length > 0
        ? (
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
                    const title = get('meta', 'title').from(param);
                    const description = get('meta', 'description').from(param);
                    const defaultValue = get('content', 'value', 'attributes', 'default').from(param);
                    const valueType = get('content', 'value', 'element').from(param);
                    let example = get('content', 'value', 'content').from(param);
                    let choices;

                    if (valueType === 'enum') {
                      choices = example;
                      example = get('attributes', 'samples').from(param);
                    }

                    const exampleValue = Array.isArray(example) ? example.map(exItem => exItem.content).join(', ') : example;

                    return (
                      <div className="parameters__item" key={index * 2}>
                        <div className="parameters__item-title" key={index * 2}>{param.content.key.content}</div>
                        <div className="parameters__item-content" key={index * 2 + 1}>
                          <RawContent>
                            <code>{title || 'string'}</code>
                            &nbsp;
                            {param.attributes.typeAttributes.map((attr, attrIndex) => (
                              <span key={attrIndex}>({attr})</span>
                            ))}
                            &nbsp;
                            {defaultValue
                              && (
                                <span className="parameters__default">
                                  <strong>Default: </strong>
                                  <span>{defaultValue}</span>
                                </span>
                              )
                            }
                            &nbsp;
                            {example
                              && (
                                <span className="parameters__example">
                                  <strong>Example: </strong>
                                  <span>{exampleValue}</span>
                                </span>
                              )
                            }
                            &nbsp;
                            {description && htmlFromText(description)}
                            {choices && choices.length > 0 && (
                              <p>
                                <strong>Choices: </strong>
                                {choices.map(choice => (
                                  <span key={`enum-member-${choice.content}`}>
                                    {' '}
                                    <code>{choice.content}</code>
                                  </span>
                                ))}
                              </p>
                            )}
                          </RawContent>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </SlideToggle>
        )
        : null
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
      typeAttributes: PropTypes.arrayOf(
        PropTypes.string,
      ),
    }),
    content: PropTypes.shape({
      key: PropTypes.shape({
        element: PropTypes.string,
        content: PropTypes.string,
      }),
      value: PropTypes.shape({
        element: PropTypes.string,
        content: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.array,
        ]),
      }),
    }),
  })),
};

export default Parameters;
