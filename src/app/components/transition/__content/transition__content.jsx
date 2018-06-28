import AttributesList from 'app/components/attirbutes-list';
import CodeSnippet from 'app/components/code-snippet';
import Section from 'app/components/section';

const formatHeaders = arrayOfHeaders => arrayOfHeaders.reduce((res, h) => {
  res = `${res}${h.key}: ${h.value}\n`;
  return res;
}, '');

const Transition__Content = (props) => {
  const { data, contentType } = props;

  if (Object.keys(data).length === 0) return null;

  const { headers, attributes, body, description, schema } = data;
  return (
    <div className="transition__content">
      <div className="transition__example-names">
        {contentType}
      </div>

      {!!description && (
        <Section
          title="Описание"
          titleTag="h5"
          mods={{ hiddenTitle: true }}
          mix="transition__description"
        >
          {description}
        </Section>
      )}

      {!!headers && headers.length > 0 && (
        <Section
          title="Headers"
          titleTag="h5"
          mods={{ for: 'transition' }}
        >
          <CodeSnippet syntax="http">
            {formatHeaders(headers)}
          </CodeSnippet>
        </Section>
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
            {body instanceof String ? body : JSON.stringify(body, null, 2)}
          </CodeSnippet>
        </Section>
      )}

      {!!schema && (
        <Section
          title="Schema"
          titleTag="h5"
          mods={{ for: 'transition' }}
        >
          <CodeSnippet>
            {schema instanceof String ? schema : JSON.stringify(schema, null, 2)}
          </CodeSnippet>
        </Section>
      )}
    </div>
  );
};

Transition__Content.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.shape({
      headers: PropTypes.arrayOf(PropTypes.object),
      attributes: PropTypes.arrayOf(PropTypes.object),
      body: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    }),
    PropTypes.shape({
      statusCode: PropTypes.number,
      headers: PropTypes.arrayOf(PropTypes.object),
      attributes: PropTypes.arrayOf(PropTypes.object),
      body: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      description: PropTypes.string,
      schema: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    }),
  ]),
  contentType: PropTypes.oneOf(['Requests', 'Responses']),
};

export default Transition__Content;
