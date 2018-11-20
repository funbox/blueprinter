import SandboxSection from 'sandbox/components/sandbox-section';
import SandboxDemo from 'sandbox/components/sandbox-demo';
import SandboxParagraph from 'sandbox/components/sandbox-paragraph';
import InlineCode from 'sandbox/components/inline-code';

import CodeSnippet from 'app/components/code-snippet';
import AttributesList from 'app/components/attirbutes-list';
import Transition from 'app/components/transition';

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

          <SandboxParagraph>
            Для подсветки http-заголовков можно использовать свойство
            {' '}
            <InlineCode>syntax=&quot;http&quot;</InlineCode>:
          </SandboxParagraph>
          <SandboxDemo>
            <CodeSnippet syntax="http">
              Content-Type: application/json
              {'\n'}
              X-Auth-Token: Session token
            </CodeSnippet>
          </SandboxDemo>
        </SandboxSection>

        <SandboxSection id="single-attribute" title="Одиночный атрибут">
          <SandboxDemo mods={{ for: 'attributes-list' }}>
            <AttributesList attributes={[singleAttribute]}/>
          </SandboxDemo>
        </SandboxSection>

        <SandboxSection id="object-attribute" title="Атрибут-объект">
          <SandboxDemo mods={{ for: 'attributes-list' }}>
            <AttributesList attributes={[objectAttribute]}/>
          </SandboxDemo>
        </SandboxSection>

        <SandboxSection id="array-attribute" title="Атрибут-массив">
          <SandboxDemo mods={{ for: 'attributes-list' }}>
            <AttributesList attributes={[arrayAttribute]}/>
          </SandboxDemo>
        </SandboxSection>

        <SandboxSection id="complex-object" title="Вложенный объект">
          <SandboxDemo mods={{ for: 'attributes-list' }}>
            <AttributesList attributes={[complexObject]}/>
          </SandboxDemo>
        </SandboxSection>

        <SandboxSection id="array-of-objects" title="Массив объектов">
          <SandboxDemo mods={{ for: 'attributes-list' }}>
            <AttributesList attributes={[arrayOfObjects]}/>
          </SandboxDemo>
        </SandboxSection>

        <SandboxSection id="attributes-block" title="Блок атрибутов">
          <SandboxDemo mods={{ for: 'attributes-list' }}>
            <AttributesList attributes={attributeBlock}/>
          </SandboxDemo>
        </SandboxSection>

        <SandboxSection id="request-response-section" title="Запрос-ответ">
          <SandboxDemo mods={{ for: 'transition-block' }}>
            <Transition
              transactions={request.content}
              attributes={request.attributes}
            />
          </SandboxDemo>
        </SandboxSection>
      </div>
    );
  }
}
