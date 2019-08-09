import RawContent from 'app/components/raw-content';
import PropTypes from 'prop-types';

import { get, htmlFromText } from 'app/common/utils/helpers';

class Parameters extends React.Component {
  render() {
    const { params } = this.props;

    if (params.length === 0) return null;

    return (
      <section className={b('parameters', this.props)}>
        <div className="parameters__heading">
          <h5 className="parameters__title">
            URI Parameters
          </h5>
        </div>
        <div className="parameters__content">
          {params.map((param, index) => {
            const title = get('meta', 'title', 'content').from(param);
            const description = get('meta', 'description', 'content').from(param);
            const defaultValue = get('content', 'value', 'attributes', 'default', 'content').from(param);
            const valueType = get('content', 'value', 'element').from(param);
            let example = get('content', 'value', 'content').from(param);
            const choices = get('content', 'value', 'attributes', 'enumerations', 'content').from(param);

            if (valueType === 'enum') {
              example = get('attributes', 'samples').from(param);
            }

            const exampleValue = Array.isArray(example) ? example.map(exItem => exItem.content).join(', ') : example;

            return (
              <div className="parameters__item" key={index * 2}>
                <div className="parameters__item-title" key={index * 2}>
                  {param.content.key.content}
                </div>
                <div className="parameters__item-content" key={index * 2 + 1}>
                  <RawContent>
                    <code>
                      {title || 'string'}
                    </code>
                    &nbsp;
                    {param.attributes.typeAttributes.content.map((attr, attrIndex) => (
                      <span key={attrIndex}>
                        ({attr.content})
                      </span>
                    ))}
                    &nbsp;
                    {defaultValue && (
                      <span className="parameters__default">
                        <strong>
                          Default:
                        </strong>
                        {' '}
                        <span>
                          {defaultValue}
                        </span>
                      </span>
                    )}
                    &nbsp;
                    {example && (
                      <span className="parameters__example">
                        <strong>
                          Example:
                        </strong>
                        {' '}
                        <span>
                          {exampleValue}
                        </span>
                      </span>
                    )}
                    &nbsp;
                    {description && htmlFromText(description)}
                    {choices && choices.length > 0 && (
                      <div>
                        <strong>
                          Choices:
                        </strong>
                        {' '}
                        <ul>
                          {choices.map(choice => {
                            const choiceDescription = get('meta', 'description', 'content').from(choice);
                            return (
                              <li key={`enum-member-${choice.content}`}>
                                <code>
                                  {choice.content}
                                </code>
                                {choiceDescription && ` \u2014 ${choiceDescription}`}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </RawContent>
                </div>
              </div>
            );
          })}
        </div>
      </section>
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
      typeAttributes: PropTypes.shape({
        element: PropTypes.string,
        content: PropTypes.array,
      }),
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
          PropTypes.shape({
            attributes: PropTypes.shape({
              enumerations: PropTypes.shape({
                element: PropTypes.string,
                content: PropTypes.array,
              }),
            }),
          }),
        ]),
      }),
    }),
  })),
};

export default Parameters;
