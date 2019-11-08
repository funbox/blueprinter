import AttributesList from 'app/components/attirbutes-list';
import CodeSnippet from 'app/components/code-snippet';
import Section from 'app/components/section';
import Transition__ExampleNames from '../__example-names';

const formatHeaders = arrayOfHeaders => arrayOfHeaders.reduce((res, h) => {
  res = `${res}${h.key}: ${h.value}\n`;
  return res;
}, '');

const isString = s => (typeof s === 'string' || s instanceof String);

const Transition__Content = (props) => {
  const {
    selectedData,
    availableData,
    contentType,
    title,
    onLabelClick,
  } = props;

  if (!selectedData) return null;

  const isEmpty = Object.keys(selectedData).length === 1 && (!!selectedData.statusCode || !!selectedData.title);

  const { headers, attributes, body, description, schema } = selectedData;

  const selectedDataId = availableData.indexOf(selectedData);
  const examplesList = availableData.map((d, index) => {
    const titleDescription = d.description ? ` – ${d.description.split('\n')[0].split('.')[0]}` : '';

    return {
      content: (contentType === 'request' ? d.title : `${d.statusCode}${titleDescription}`),
      selected: index === selectedDataId,
    };
  });

  return (
    <div className="transition__content">
      <Transition__ExampleNames
        title={title}
        options={examplesList}
        onLabelClick={onLabelClick}
      />

      {isEmpty && (
        <p className="transition__no-content-notice">This {contentType} has no content</p>
      )}

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
            {isString(body) ? body.trim() : JSON.stringify(body, null, 2)}
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
            {isString(schema) ? schema : JSON.stringify(schema, null, 2)}
          </CodeSnippet>
        </Section>
      )}
    </div>
  );
};

Transition__Content.propTypes = {
  selectedData: PropTypes.oneOfType([
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
  availableData: PropTypes.array,
  contentType: PropTypes.oneOf(['request', 'response']),
  title: PropTypes.string,
  onLabelClick: PropTypes.func,
};

export default Transition__Content;
