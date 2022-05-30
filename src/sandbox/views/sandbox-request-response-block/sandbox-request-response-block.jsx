import SandboxSection from 'sandbox/components/sandbox-section';
import SandboxDemo from 'sandbox/components/sandbox-demo';
import SandboxParagraph from 'sandbox/components/sandbox-paragraph';
import InlineCode from 'sandbox/components/inline-code';

import CodeSnippet from 'app/components/code-snippet';
import AttributesList from 'app/components/attributes-list';
import TransitionContainer from 'app/components/transition-container';

import { body, schema, rawBody } from 'app/mocks/json';
import request from 'app/mocks/request';
import {
  arrayAttribute,
  arrayOfObjects,
  objectAttribute,
  complexObject,
  singleAttribute,
  attributeBlock,
} from 'app/mocks/attributes';

export default class SandboxRequestResponseBlock extends React.Component {
  render() {
    return (
      <div>
        <h2>Request/response blocks</h2>

        <SandboxSection id="code-snippet" title="Code snippet">
          <SandboxDemo>
            <CodeSnippet>
              {JSON.stringify(body, null, 2)}
            </CodeSnippet>
          </SandboxDemo>

          <SandboxDemo>
            <CodeSnippet>
              {JSON.stringify(schema, null, 2)}
            </CodeSnippet>
          </SandboxDemo>

          <SandboxParagraph>
            To disable syntax highlight provide <InlineCode>{'mods={{ disabledSyntax: true }}'}</InlineCode> modifier:
          </SandboxParagraph>

          <SandboxDemo>
            <CodeSnippet mods={{ disabledSyntax: true }}>
              {rawBody}
            </CodeSnippet>
          </SandboxDemo>

          <SandboxParagraph>
            To highlight HTTP headers provide prop
            {' '}
            <InlineCode>syntax=&quot;http&quot;</InlineCode>:
          </SandboxParagraph>

          <SandboxDemo>
            <CodeSnippet syntax="http" mods={{ for: 'headers' }}>
              Content-Type: application/json
              {'\n'}
              X-Auth-Token: Session token
            </CodeSnippet>
          </SandboxDemo>
        </SandboxSection>

        <SandboxSection id="single-attribute" title="Single attribute">
          <SandboxDemo mods={{ for: 'attributes-list' }}>
            <AttributesList attributes={[singleAttribute]}/>
          </SandboxDemo>
        </SandboxSection>

        <SandboxSection id="object-attribute" title="Object attribute">
          <SandboxDemo mods={{ for: 'attributes-list' }}>
            <AttributesList attributes={[objectAttribute]}/>
          </SandboxDemo>
        </SandboxSection>

        <SandboxSection id="array-attribute" title="Array attribute">
          <SandboxDemo mods={{ for: 'attributes-list' }}>
            <AttributesList attributes={[arrayAttribute]}/>
          </SandboxDemo>
        </SandboxSection>

        <SandboxSection id="complex-object" title="Complex object attribute">
          <SandboxDemo mods={{ for: 'attributes-list' }}>
            <AttributesList attributes={[complexObject]}/>
          </SandboxDemo>
        </SandboxSection>

        <SandboxSection id="array-of-objects" title="Array of object">
          <SandboxDemo mods={{ for: 'attributes-list' }}>
            <AttributesList attributes={[arrayOfObjects]}/>
          </SandboxDemo>
        </SandboxSection>

        <SandboxSection id="attributes-block" title="Attributes block">
          <SandboxDemo mods={{ for: 'attributes-list' }}>
            <AttributesList attributes={attributeBlock}/>
          </SandboxDemo>
        </SandboxSection>

        <SandboxSection id="request-response-section" title="Request-response">
          <SandboxDemo mods={{ for: 'transition-block' }}>
            <TransitionContainer
              transactions={request.content}
              attributes={request.attributes}
            />
          </SandboxDemo>
        </SandboxSection>
      </div>
    );
  }
}
