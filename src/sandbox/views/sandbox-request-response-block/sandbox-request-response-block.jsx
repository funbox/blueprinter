import SandboxSection from 'sandbox/components/sandbox-section';
import SandboxDemo from 'sandbox/components/sandbox-demo';
import SandboxParagraph from 'sandbox/components/sandbox-paragraph';
import InlineCode from 'sandbox/components/inline-code';

import CodeSnippet from 'app/components/code-snippet';
import { body, schema, rawBody } from 'app/mocks/json';

export default class SandboxRequestResponseBlock extends React.Component {
  render() {
    return (
      <div>
        <h1>Блок структуры запроса-ответа</h1>

        <SandboxSection id="code-snippet" title="Блок вывода фрагмента кода">
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
            Передача модификатора <InlineCode>{'mods={{ disabledSyntax: true }}'}</InlineCode> отключает подсветку:
          </SandboxParagraph>
          <SandboxDemo>
            <CodeSnippet mods={{ disabledSyntax: true }}>
              {rawBody}
            </CodeSnippet>
          </SandboxDemo>
        </SandboxSection>
      </div>
    );
  }
}
