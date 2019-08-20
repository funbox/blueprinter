import RawContent from 'app/components/raw-content';
import { get, htmlFromText } from 'app/common/utils/helpers';

import Parameter__Prop from './__prop';

const URIParameter = (props) => {
  const { parameter } = props;

  const name = get('content', 'key', 'content').from(parameter);
  const typeAttributes = get('attributes', 'typeAttributes', 'content').from(parameter);
  const title = get('meta', 'title', 'content').from(parameter);
  const valueType = get('content', 'value', 'element').from(parameter);
  const description = get('meta', 'description', 'content').from(parameter);
  const defaultValue = get('content', 'value', 'attributes', 'default', 'content').from(parameter);

  let example = get('content', 'value', 'content').from(parameter);
  const choices = get('content', 'value', 'attributes', 'enumerations', 'content').from(parameter);

  if (valueType === 'enum') {
    example = get('attributes', 'samples').from(parameter);
  }

  const exampleValue = Array.isArray(example) ? example.map(exItem => exItem.content).join(', ') : example;

  return (
    <div className={b('parameter', props)}>
      <div className={b('parameter__content')}>
        <div className={b('parameter__main-info')}>
          <Parameter__Prop
            title="Название"
            mods={{ for: 'name' }}
          >
            {name}
          </Parameter__Prop>

          <code className={b('parameter__code')}>
            {title || 'string'}
          </code>

          {
            typeAttributes && (
              <span className={b('parameter__attributes')}>
                {'('}
                {typeAttributes.map(attr => attr.content).join(', ')}
                {')'}
              </span>
            )
          }
        </div>
        <div className={b('parameter__default')}>
          {
            defaultValue && (
              <Parameter__Prop title="Default">
                {defaultValue}
              </Parameter__Prop>
            )
          }
        </div>
        <div className={b('parameter__example')}>
          {
            exampleValue && (
              <Parameter__Prop title="Example">
                {exampleValue}
              </Parameter__Prop>
            )
          }
        </div>
      </div>

      {
        (choices || description) && (
          <div className={b('parameter__description')}>
            <RawContent>
              {description && htmlFromText(description)}
            </RawContent>

            {
              choices && choices.length > 0 && (
                <Parameter__Prop
                  title="Choices"
                  mods={{ for: 'choices' }}
                >
                  <ul className={b('parameter__choices')}>
                    {choices.map(choice => {
                      const choiceDescription = get('meta', 'description', 'content').from(choice);
                      return (
                        <li
                          className={b('parameter__choice')}
                          key={`enum-member-${choice.content}`}
                        >
                          <code className={b('parameter__code')}>
                            {choice.content}
                          </code>
                          {choiceDescription && ` \u2014 ${choiceDescription}`}
                        </li>
                      );
                    })}
                  </ul>
                </Parameter__Prop>
              )
            }
          </div>
        )
      }
    </div>
  );
};

export const parameterProps = PropTypes.shape({
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
});

URIParameter.propTypes = {
  parameter: parameterProps,
};

export default URIParameter;
