import { t, Trans } from '@lingui/macro';
import Code from 'app/components/code';
import ServiceInfo__Section from 'app/components/service-info/__section';

const ServiceInfo = () => (
  <div className={b('service-info')}>
    <ServiceInfo__Section
      mods={{ for: 'hot-keys' }}
      title={t`Hotkeys`}
      definitions={[
        {
          id: 'key-theme',
          term: 'N',
          details: t`toggles dark theme`,
        },
        {
          id: 'key-sidebar',
          term: 'S',
          details: t`toggles sidebar`,
        },
        {
          id: 'key-search',
          term: '/',
          details: t`sets focus on the search field`,
        },
      ]}
    />
    <ServiceInfo__Section
      title={t`Search modifiers`}
      subtitle={t`Type a modifier in the search field before the search query.`}
      definitions={[
        {
          id: 'search-method',
          term: 'method:*',
          details: t`filters result to list only actions with the specified method`,
          note: (
            <Trans>
              where * is an HTTP method (GET, POST, PUT, DELETE, etc.),
              <br/>
              {'for example: '}
              <Code mods={{ theme: 'standard' }}>method:get</Code>
              {' or '}
              <Code mods={{ theme: 'standard' }}>method:post</Code>
            </Trans>
          ),
        },
        {
          id: 'search-group',
          term: 'type:group',
          details: t`finds only groups`,
        },
        {
          id: 'search-resource',
          term: 'type:resource',
          details: t`finds only resources`,
        },
        {
          id: 'search-action',
          term: 'type:action',
          details: t`finds only actions`,
        },
      ]}
    />
  </div>
);

export default ServiceInfo;
