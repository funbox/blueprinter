import Code from 'app/components/code';
import ServiceInfo__Section from 'app/components/service-info/__section';

const ServiceInfo = () => (
  <div className={b('service-info')}>
    <ServiceInfo__Section
      mods={{ for: 'hot-keys' }}
      title="Горячие клавиши"
      definitions={[
        {
          id: 'key-theme',
          term: 'N',
          details: 'переключает светлую тему на тёмную и обратно',
        },
        {
          id: 'key-sidebar',
          term: 'S',
          details: 'скрывает и раскрывает сайдбар',
        },
        {
          id: 'key-search',
          term: '/',
          details: 'переводит фокус в поле поиска',
        },
      ]}
    />
    <ServiceInfo__Section
      title="Модификаторы поиска"
      subtitle="Модификатор указывается в строке поиска перед поисковым запросом"
      definitions={[
        {
          id: 'search-method',
          term: 'method:*',
          details: 'оставляет в\u00A0результатах поиска только экшены с\u00A0указанным методом',
          note: (
            <>
              где * — HTTP-метод (GET, POST, PUT, DELETE и т.д.).
              <br/>
              Пример:
              {' '}
              <Code mods={{ theme: 'standard' }}>method:get</Code>
              {' '}
              или
              {' '}
              <Code mods={{ theme: 'standard' }}>method:post</Code>.
            </>
          ),
        },
        {
          id: 'search-group',
          term: 'type:group',
          details: 'ищет только группы',
        },
        {
          id: 'search-resource',
          term: 'type:resource',
          details: 'ищет только ресурсы',
        },
        {
          id: 'search-action',
          term: 'type:action',
          details: 'ищет только экшены',
        },
      ]}
    />
  </div>
);

export default ServiceInfo;
