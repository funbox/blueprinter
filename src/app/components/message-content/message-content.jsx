import AttributesList from 'app/components/attirbutes-list';
import CodeSnippet from 'app/components/code-snippet';
import Section from 'app/components/section';

const MessageContent = (props) => {
  const {
    message: {
      attributes,
      body,
    },
  } = props;

  const isEmpty = !attributes && !body;
  const isString = s => (typeof s === 'string' || s instanceof String);

  return (
    <div className={b('message-content', props)}>
      {isEmpty && (
        <p className="message-content__no-content-notice">
          This message has no content
        </p>
      )}

      {!!attributes && attributes.length > 0 && (
        <Section
          title="Attributes"
          titleTag="h5"
          mods={{ for: 'transition' }}
        >
          <AttributesList attributes={attributes}/>
        </Section>
      )}

      {!!body && (
        <Section
          title="Body"
          titleTag="h5"
          mods={{ for: 'transition' }}
        >
          <CodeSnippet>
            {isString(body) ? body.trim() : JSON.stringify(body, null, 2)}
          </CodeSnippet>
        </Section>
      )}
    </div>
  );
};

MessageContent.propTypes = {
  message: PropTypes.shape({
    attributes: PropTypes.arrayOf(PropTypes.object),
    body: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }),
};

export default MessageContent;
