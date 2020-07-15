import AttributesList from 'app/components/attributes-list';
import CodeSnippet from 'app/components/code-snippet';
import CollapsibleSection from 'app/components/collapsible-section';
import Section from 'app/components/section';
import Code from 'app/components/code';

import Transition__ExampleList from '../__example-list';

export const propTypes = {
  availableTransactions: PropTypes.arrayOf(
    PropTypes.oneOfType([
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
  ),
  contentType: PropTypes.oneOf(['request', 'response']),
};

class Transition__Body extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedTransaction: props.availableTransactions[0],
    };

    this.availableTransactions = props.availableTransactions;

    this.onOptionLabelClick = this.onOptionLabelClick.bind(this);
  }

  onOptionLabelClick(labelId) {
    const {
      availableTransactions,
    } = this.props;
    const selectedTransaction = availableTransactions[labelId];
    this.setState({ selectedTransaction });
  }

  render() {
    const {
      availableTransactions,
      contentType,
    } = this.props;

    const {
      selectedTransaction,
    } = this.state;

    if (!selectedTransaction) return null;

    const isEmpty = Object.keys(selectedTransaction).length === 1 && (!!selectedTransaction.statusCode || !!selectedTransaction.title);

    const { title, headers, attributes, body, schema, structureType } = selectedTransaction;

    let { description } = selectedTransaction;

    if (contentType === 'request' && title) {
      description = (
        <>
          <p className={b('transition__description-title')}>
            {title.trim()}
          </p>
          {description || ''}
        </>
      );
    }

    const selectedDataId = availableTransactions.indexOf(selectedTransaction);
    const examplesList = availableTransactions.map((d, index) => {
      const titleDescription = d.description ? ` – ${d.description.split('\n')[0].split('.')[0]}` : '';

      return {
        content: (contentType === 'request' ? d.title : `${d.statusCode}${titleDescription}`),
        selected: index === selectedDataId,
      };
    });

    const formattedBody = body && (isString(body) ? body.trim() : JSON.stringify(body, null, 2));
    const isJsonBody = body && body[0] === '{';

    return (
      <>
        <Transition__ExampleList
          options={examplesList}
          onLabelClick={this.onOptionLabelClick}
        />

        {isEmpty && (
          <p className="transition__no-content-notice">
            This {contentType} has no content
          </p>
        )}

        {!!description && (
          <Section
            title="Описание"
            titleTag="h5"
            mods={{ hiddenTitle: true }}
            mix={b('transition__description')}
          >
            {description}
          </Section>
        )}

        {!!headers && headers.length > 0 && (
          <Section
            title="Headers"
            titleTag="h5"
            mods={{ for: 'transition-content' }}
            mix={b('transition__section')}
          >
            <CodeSnippet
              syntax="http"
              mods={{ for: 'headers' }}
            >
              {formatHeaders(headers)}
            </CodeSnippet>
          </Section>
        )}

        {!!attributes && attributes.length > 0 && (
          <Section
            title={getAttributesTitle(structureType)}
            titleTag="h5"
            mods={{ for: 'transition-content' }}
            mix={b('transition__section')}
          >
            <AttributesList attributes={attributes}/>
          </Section>
        )}

        {!!formattedBody && (
          <Section
            title="Body"
            titleTag="h5"
            mods={{ for: 'transition-content' }}
            mix={b('transition__section')}
          >
            <CodeSnippet
              mods={{ for: 'asset', disabledSyntax: !isJsonBody }}
            >
              {formattedBody}
            </CodeSnippet>
          </Section>
        )}

        {!!schema && (
          <CollapsibleSection
            mix="transition__section"
            title="Schema"
          >
            <Section
              mods={{ for: 'transition-content' }}
            >
              <CodeSnippet
                mods={{ for: 'asset' }}
              >
                {isString(schema) ? schema : JSON.stringify(schema, null, 2)}
              </CodeSnippet>
            </Section>
          </CollapsibleSection>
        )}
      </>
    );
  }
}

Transition__Body.propTypes = propTypes;

export default Transition__Body;

function formatHeaders(arrayOfHeaders) {
  return arrayOfHeaders.reduce((res, h) => `${res}${h.key}: ${h.value}\n`, '');
}

function isString(s) {
  return (typeof s === 'string' || s instanceof String);
}

function getAttributesTitle(structureType) {
  const prefix = 'Attributes';

  if (!structureType) {
    return prefix;
  }

  if (!structureType.recursive) {
    return `${prefix} (${structureType.type})`;
  }

  return (
    <>
      {prefix}
      {' '}
      {`(${structureType.type}`}
      {' '}
      <Code
        mods={{ theme: 'standard', recursive: true }}
        mix={b('transition__structure-name')}
      >
        {structureType.name}
      </Code>
      {')'}
    </>
  );
}
