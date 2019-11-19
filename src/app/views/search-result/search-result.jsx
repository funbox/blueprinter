import SearchResult from 'app/components/search-result';

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
    method: 'get',
  },
];

class SearchResultView extends React.Component {
  render() {
    return (
      <SearchResult
        title="Группа"
        searchItems={[...items, ...items, ...items, ...items]}
      />
    );
  }
}

export default SearchResultView;
