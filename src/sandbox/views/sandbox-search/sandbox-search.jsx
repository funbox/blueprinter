import uniqid from 'uniqid';
import SandboxSection from 'sandbox/components/sandbox-section';
import SandboxDemo from 'sandbox/components/sandbox-demo';
import SandboxParagraph from 'sandbox/components/sandbox-paragraph';

import SearchField from 'app/components/search-field';

const items = [
  {
    value: 'group-apply',
    label: 'Group apply',
    type: 'group',
  },
  {
    value: 'group',
    label: 'Group',
    type: 'group',
  },
  {
    value: 'change-group',
    label: 'Change employees group',
    type: 'resource',
  },
  {
    value: 'get-group-employees',
    label: 'Get employees group',
    type: 'action',
    method: 'get',
  },
  {
    value: 'server-to-client-message',
    label: 'ServerToClientMessage',
    type: 'message',
  },
];

export default class SandboxRequestResponseBlock extends React.Component {
  render() {
    return (
      <div>
        <h2>Search</h2>

        <SandboxSection id="search-field">
          <SandboxParagraph>More than 10 results in list</SandboxParagraph>

          <SandboxDemo mods={{ theme: 'standard', for: 'search-field' }}>
            <SearchField
              location={{ search: '' }}
              items={[...getUniqueItems(items), ...getUniqueItems(items), ...getUniqueItems(items)]}
              onSearch={() => {}}
            />
          </SandboxDemo>

          <SandboxParagraph>Less than 10 results in list</SandboxParagraph>

          <SandboxDemo mods={{ theme: 'standard', for: 'search-field' }}>
            <SearchField
              location={{ search: '' }}
              items={getUniqueItems(items)}
              onSearch={() => {}}
            />
          </SandboxDemo>

          <SandboxParagraph>No results</SandboxParagraph>

          <SandboxDemo mods={{ theme: 'standard', for: 'search-field' }}>
            <SearchField
              location={{ search: '' }}
              items={[]}
              onSearch={() => {}}
            />
          </SandboxDemo>
        </SandboxSection>
      </div>
    );
  }
}

function getUniqueItems(initialItems) {
  return initialItems.map(item => ({
    ...item,
    id: uniqid.time(item.value),
  }));
}
