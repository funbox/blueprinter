import Code from 'app/components/code';
import ServiceInfo__Section from 'app/components/service-info/__section';

const ServiceInfo = () => (
  <div className={b('service-info')}>
    <ServiceInfo__Section
      mods={{ for: 'hot-keys' }}
      title="Hotkeys"
      definitions={[
        {
          id: 'key-theme',
          term: 'N',
          details: 'toggles dark theme',
        },
        {
          id: 'key-sidebar',
          term: 'S',
          details: 'toggles sidebar',
        },
        {
          id: 'key-search',
          term: '/',
          details: 'sets focus on the search field',
        },
      ]}
    />
    <ServiceInfo__Section
      title="Search modifiers"
      subtitle="Type a modifier in the search field before the search query."
      definitions={[
        {
          id: 'search-method',
          term: 'method:*',
          details: 'filters result to list only actions with the specified method',
          note: (
            <>
              where * is an HTTP method (GET, POST, PUT, DELETE, etc.),
              <br/>
              for example:
              {' '}
              <Code mods={{ theme: 'standard' }}>method:get</Code>
              {' '}
              or
              {' '}
              <Code mods={{ theme: 'standard' }}>method:post</Code>
            </>
          ),
        },
        {
          id: 'search-group',
          term: 'type:group',
          details: 'finds only groups',
        },
        {
          id: 'search-resource',
          term: 'type:resource',
          details: 'finds only resources',
        },
        {
          id: 'search-action',
          term: 'type:action',
          details: 'finds only actions',
        },
      ]}
    />
  </div>
);

export default ServiceInfo;
