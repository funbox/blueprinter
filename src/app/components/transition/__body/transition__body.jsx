import { t } from '@lingui/macro';
import AttributesList from 'app/components/attributes-list';
import CodeSnippet from 'app/components/code-snippet';
import CollapsibleSection from 'app/components/collapsible-section';
import Section from 'app/components/section';
import Code from 'app/components/code';
import RawContent from 'app/components/raw-content';
import { htmlFromText } from 'app/common/utils/helpers';
import stringify from 'app/common/utils/helpers/stringify';

import { addOptionMetaToAttributes, generateBody } from 'app/common/utils/helpers/body-generation';

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
      selectedOptions: [],
    };

    this.onOptionLabelClick = this.onOptionLabelClick.bind(this);
    this.onOptionSelect = this.onOptionSelect.bind(this);
  }

  onOptionLabelClick(labelId) {
    const {
      availableTransactions,
    } = this.props;
    const selectedTransaction = availableTransactions[labelId];
    this.setState({
      selectedTransaction,
      selectedOptions: [],
    });
  }

  onOptionSelect(optionMeta, selected) {
    this.setState(prevState => {
      if (selected) {
        return {
          selectedOptions: [...prevState.selectedOptions, optionMeta],
        };
      }
      return {
        selectedOptions: prevState.selectedOptions.filter(opt => opt.id !== optionMeta.id),
      };
    });
  }

  render() {
    const {
      availableTransactions,
      contentType,
    } = this.props;

    const {
      selectedTransaction,
      selectedOptions,
    } = this.state;

    if (!selectedTransaction) return null;

    const isEmpty = Object.keys(selectedTransaction).length === 1 && (!!selectedTransaction.statusCode || !!selectedTransaction.title);

    const {
      title,
      headers,
      body: defaultBody,
      bodyTemplate,
      schema,
      structureType,
      description,
    } = selectedTransaction;

    const attributes = selectedTransaction.attributes && addOptionMetaToAttributes(selectedTransaction.attributes);

    const descriptionPredecessor = contentType === 'request' && !!title ? title.trim() : undefined;

    const selectedDataId = availableTransactions.indexOf(selectedTransaction);
    const examplesList = availableTransactions.map((d, index) => {
      const titleDescription = d.description ? ` – ${d.description.split('\n')[0].split('.')[0]}` : '';

      return {
        content: (contentType === 'request' ? d.title : `${d.statusCode}${titleDescription}`),
        selected: index === selectedDataId,
      };
    });

    const body = (selectedOptions.length > 0 && bodyTemplate) ? generateBody(attributes, bodyTemplate, selectedOptions) : defaultBody;
    const formattedBody = body && stringify(body);
    const isJsonBody = formattedBody && ['{', '['].includes(formattedBody[0]);
    const emptyContentText = {
      request: t`This request has no content`,
      response: t`This response has no content`,
    };

    return (
      <>
        <Transition__ExampleList
          options={examplesList}
          onLabelClick={this.onOptionLabelClick}
        />

        {isEmpty && (
          <p className="transition__no-content-notice">
            {emptyContentText[contentType]}
          </p>
        )}

        {!!description && (
          <Section
            title={t`Description`}
            titleTag="h5"
            mods={{ hiddenTitle: true }}
            mix={b('transition__description')}
          >
            <RawContent>
              { descriptionPredecessor && (
                <p>
                  <b>{descriptionPredecessor}</b>
                </p>
              )}
              {htmlFromText(description)}
            </RawContent>
          </Section>
        )}

        {!!headers && headers.length > 0 && (
          <Section
            title={t`Headers`}
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
            <AttributesList
              attributes={attributes}
              onOptionSelect={this.onOptionSelect}
              selectedOptions={selectedOptions}
            />
          </Section>
        )}

        {!!formattedBody && (
          <Section
            title={t`Body`}
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
            mods={{ print: 'hidden' }}
            title={t`Schema`}
          >
            <Section
              mods={{ for: 'transition-content' }}
            >
              <CodeSnippet
                mods={{ for: 'asset' }}
              >
                {stringify(schema)}
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

function getAttributesTitle(structureType) {
  const prefix = t`Attributes`;

  if (!structureType) return prefix;

  const typeAttributes = structureType.typeAttributes
    && ` ${structureType.typeAttributes.map(attr => attr.content).join(', ')}` || '';

  if (!structureType.recursive) {
    return `${prefix} (${structureType.type})${typeAttributes}`;
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
      )
      {typeAttributes}
    </>
  );
}
