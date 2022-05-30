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
        <h2>HTTP method badge</h2>

        <SandboxSection id="method-bage">
          <SandboxParagraph>
            <InlineCode>mods={'{{ type: method }}'}</InlineCode>, where method is one of methods from the table below.
          </SandboxParagraph>

          <SandboxDemo>
            <SandboxTable
              data={badgeTableRows}
              mods={{ for: 'method-badges' }}
            />
          </SandboxDemo>

          <SandboxParagraph>
            For non-REST interaction (e.g. sockets) one can use badge with modifier
            {' '}
            <InlineCode>mods={'{{ type: message }}'}</InlineCode>
          </SandboxParagraph>

          <SandboxDemo>
            <MethodBadge method="message"/>
          </SandboxDemo>
        </SandboxSection>
      </div>
    );
  }
}
