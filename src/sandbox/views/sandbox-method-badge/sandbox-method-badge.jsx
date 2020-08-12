import SandboxSection from 'sandbox/components/sandbox-section';
import SandboxDemo from 'sandbox/components/sandbox-demo';
import SandboxParagraph from 'sandbox/components/sandbox-paragraph';
import SandboxTable from 'sandbox/components/sandbox-table';
import InlineCode from 'sandbox/components/inline-code';

import MethodBadge from 'app/components/method-badge';

const HTTP_METHODS = ['delete', 'get', 'head', 'options', 'patch', 'post', 'put'];

export default class SandboxMethodBadge extends React.Component {
  render() {
    const badgeTableRows = [
      HTTP_METHODS,
      HTTP_METHODS.map(m => <MethodBadge method={m}/>),
    ];

    return (
      <div>
        <h2>Бейдж http-метода</h2>

        <SandboxSection id="method-bage">
          <SandboxParagraph>
            <InlineCode>mods={'{{ type: method }}'}</InlineCode>, где method - один из методов из таблицы ниже.
          </SandboxParagraph>

          <SandboxDemo mods={{ theme: 'air' }}>
            <SandboxTable
              data={badgeTableRows}
              mods={{ for: 'method-badges' }}
            />
          </SandboxDemo>
        </SandboxSection>
      </div>
    );
  }
}
