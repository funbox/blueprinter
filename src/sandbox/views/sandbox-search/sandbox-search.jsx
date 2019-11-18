import uniqid from 'uniqid';
import SandboxSection from 'sandbox/components/sandbox-section';
import SandboxDemo from 'sandbox/components/sandbox-demo';
import SandboxParagraph from 'sandbox/components/sandbox-paragraph';

import SearchField from 'app/components/search-field';

const items = [
  {
    value: 'group-apply',
    label: 'Групповое применение',
    type: 'group',
  },
  {
    value: 'group',
    label: 'Группа',
    type: 'group',
  },
  {
    value: 'change-group',
    label: 'Изменить группу сотрудников',
    type: 'resource',
  },
  {
    value: 'get-group-employees',
    label: 'Получить сотрудников группы',
    type: 'action',
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
        <h1>Поиск</h1>

        <SandboxSection id="search-field" title="Поле поиска">
          <SandboxParagraph>
            Есть более 10 результатов
          </SandboxParagraph>
          <SandboxDemo mods={{ theme: 'standard', for: 'search-field' }}>
            <SearchField items={[...getUniqueItems(items), ...getUniqueItems(items), ...getUniqueItems(items)]}/>
          </SandboxDemo>

          <SandboxParagraph>
            Есть менее 10 результатов
          </SandboxParagraph>
          <SandboxDemo mods={{ theme: 'standard', for: 'search-field' }}>
            <SearchField items={getUniqueItems(items)}/>
          </SandboxDemo>

          <SandboxParagraph>
            Нет результатов
          </SandboxParagraph>
          <SandboxDemo mods={{ theme: 'standard', for: 'search-field' }}>
            <SearchField items={[]}/>
          </SandboxDemo>
        </SandboxSection>
      </div>
    );
  }
}

function getUniqueItems(initialItems) {
  return initialItems.map(item => ({
    ...item,
    value: uniqid.time(item.value),
  }));
}
