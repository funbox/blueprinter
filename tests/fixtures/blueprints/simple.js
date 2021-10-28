module.exports.source = `# My API

Defines a simple API.

# Users [/users]

## List [GET]

+ Response 200 (application/json)
`;

module.exports.processed = {
  topLevelMeta: {
    title: 'My API',
    description: 'Defines a simple API.',
    host: null,
    warnings: [],
  },
  groups: [
    {
      element: 'category',
      content: [
        {
          element: 'resource',
          attributes: {
            href: {
              element: 'string',
              content: '/users',
            },
          },
          content: [
            {
              id: 0,
              meta: {
                title: {
                  element: 'string',
                  content: 'List',
                },
              },
              title: 'List',
              route: '/group-resource-group/resource-users-25a52abe/action-get-users-d5b1b11',
              hashForLegacyUrl: 'resource-group-users-list-get',
              element: 'transition',
              attributes: {
                hrefVariables: null,
                href: '/users',
                method: 'GET',
              },
              requests: [],
              responses: [
                {
                  headers: [
                    {
                      key: 'Content-Type',
                      value: 'application/json',
                    },
                  ],
                  statusCode: 200,
                },
              ],
              content: [],
              type: 'transaction',
              routePreset: null,
              nestedRoutePresets: [],
              parentResource: {
                title: 'Users',
                href: '/users',
                hashForLegacyUrl: 'resource-group-users',
                route: '/group-resource-group/resource-users-25a52abe',
                group: {
                  title: 'Resource Group',
                  hashForLegacyUrl: 'resource-group',
                  route: '/group-resource-group',
                },
              },
            },
          ],
          meta: {
            title: {
              element: 'string',
              content: 'Users',
            },
          },
          id: 0,
          nestedRoutePresets: [],
          hashForLegacyUrl: 'resource-group-users',
          route: '/group-resource-group/resource-users-25a52abe',
          title: 'Users',
          parentGroup: {
            title: 'Resource Group',
            hashForLegacyUrl: 'resource-group',
            route: '/group-resource-group',
          },
        },
      ],
      meta: {
        title: {
          element: 'string',
          content: 'Resource Group',
        },
      },
      hashForLegacyUrl: 'resource-group',
      route: '/group-resource-group',
      title: 'Resource Group',
      id: 0,
      nestedRoutePresets: [],
    },
  ],
  resources: [
    {
      element: 'resource',
      attributes: {
        href: {
          element: 'string',
          content: '/users',
        },
      },
      content: [
        {
          id: 0,
          meta: {
            title: {
              element: 'string',
              content: 'List',
            },
          },
          title: 'List',
          route: '/group-resource-group/resource-users-25a52abe/action-get-users-d5b1b11',
          hashForLegacyUrl: 'resource-group-users-list-get',
          element: 'transition',
          attributes: {
            hrefVariables: null,
            href: '/users',
            method: 'GET',
          },
          requests: [],
          responses: [
            {
              headers: [
                {
                  key: 'Content-Type',
                  value: 'application/json',
                },
              ],
              statusCode: 200,
            },
          ],
          content: [],
          type: 'transaction',
          routePreset: null,
          nestedRoutePresets: [],
          parentResource: {
            title: 'Users',
            href: '/users',
            hashForLegacyUrl: 'resource-group-users',
            route: '/group-resource-group/resource-users-25a52abe',
            group: {
              title: 'Resource Group',
              hashForLegacyUrl: 'resource-group',
              route: '/group-resource-group',
            },
          },
        },
      ],
      meta: {
        title: {
          element: 'string',
          content: 'Users',
        },
      },
      id: 0,
      nestedRoutePresets: [],
      hashForLegacyUrl: 'resource-group-users',
      route: '/group-resource-group/resource-users-25a52abe',
      title: 'Users',
      parentGroup: {
        title: 'Resource Group',
        hashForLegacyUrl: 'resource-group',
        route: '/group-resource-group',
      },
    },
  ],
  actions: [
    {
      id: 0,
      meta: {
        title: {
          element: 'string',
          content: 'List',
        },
      },
      title: 'List',
      route: '/group-resource-group/resource-users-25a52abe/action-get-users-d5b1b11',
      hashForLegacyUrl: 'resource-group-users-list-get',
      element: 'transition',
      attributes: {
        hrefVariables: null,
        href: '/users',
        method: 'GET',
      },
      requests: [],
      responses: [
        {
          headers: [
            {
              key: 'Content-Type',
              value: 'application/json',
            },
          ],
          statusCode: 200,
        },
      ],
      content: [],
      type: 'transaction',
      routePreset: null,
      nestedRoutePresets: [],
      parentResource: {
        title: 'Users',
        href: '/users',
        hashForLegacyUrl: 'resource-group-users',
        route: '/group-resource-group/resource-users-25a52abe',
        group: {
          title: 'Resource Group',
          hashForLegacyUrl: 'resource-group',
          route: '/group-resource-group',
        },
      },
    },
  ],
};
