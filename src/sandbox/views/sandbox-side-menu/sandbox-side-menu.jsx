import SandboxSection from 'sandbox/components/sandbox-section';
import SandboxDemo from 'sandbox/components/sandbox-demo';
import SandboxParagraph from 'sandbox/components/sandbox-paragraph';
import SandboxTable from 'sandbox/components/sandbox-table';
import InlineCode from 'sandbox/components/inline-code';

import MethodBadge from 'app/components/method-badge';

export default class SandboxSideMenu extends React.Component {
  render() {

    const httpMethods = ['delete', 'get', 'head', 'options', 'patch', 'post', 'put'];
    const badgeTableRows = [
      httpMethods,
      httpMethods.map(m => <MethodBadge mods={{ type: m }} method={m.toUpperCase()}/>)
    ];

    return (
      <div>
        <h1>Боковое меню</h1>

        <SandboxSection id="method-bage" title="Бейдж http-метода">
          <SandboxParagraph>
            <InlineCode>mods={"{{ type: method }}"}</InlineCode>, где method - один из методов из таблицы ниже.
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
