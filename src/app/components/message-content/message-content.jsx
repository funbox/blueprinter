import { Trans, t } from '@lingui/macro';
import AttributesList from 'app/components/attributes-list';
import CodeSnippet from 'app/components/code-snippet';
import Section from 'app/components/section';

const MessageContent = (props) => {
  const {
    message: {
      attributes,
      body,
      schema,
    },
  } = props;

  const isEmpty = !attributes && !body && !schema;
  const isString = s => (typeof s === 'string' || s instanceof String);

  return (
    <div className={b('message-content', props)}>
      {isEmpty && (
        <p className="message-content__no-content-notice">
          <Trans>This message has no content</Trans>
        </p>
      )}

      {!!attributes && attributes.length > 0 && (
        <Section
          title={t`Attributes`}
          titleTag="h5"
          mods={{ for: 'transition-content' }}
          mix={b('message-content__section')}
        >
          <AttributesList attributes={attributes}/>
        </Section>
      )}

      {!!body && (
        <Section
          title={t`Body`}
          titleTag="h5"
          mods={{ for: 'transition-content' }}
          mix={b('message-content__section')}
        >
          <CodeSnippet mods={{ for: 'asset' }}>
            {isString(body) ? body.trim() : JSON.stringify(body, null, 2)}
          </CodeSnippet>
        </Section>
      )}

      {!!schema && (
        <Section
          title={t`Schema`}
          titleTag="h5"
          mods={{ for: 'transition-content' }}
          mix={b('message-content__section')}
        >
          <CodeSnippet mods={{ for: 'asset' }}>
            {isString(schema) ? schema.trim() : JSON.stringify(schema, null, 2)}
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
    schema: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }),
};

export default MessageContent;
