module.exports.source = `# My API

# Group Users

## Get users [GET /users]

<!-- anchor: action-anchor -->

+ Response 200 (application/json)`;

module.exports.parentElement = {
  title: 'Get user',
  href: '/user',
  hashForLegacyUrl: 'users-get-user',
  route: '/group-users/resource-user-e7344de',
};

module.exports.processed = {
  meta: {
    title: {
      element: 'string',
      content: 'Get users',
    },
  },
  title: 'Get users',
  route: '/action-anchor',
  hashForLegacyUrl: 'action-anchor',
  element: 'transition',
  attributes: {
    hrefVariables: null,
    href: '/users',
    method: 'GET',
  },
  content: [
    {
      element: 'copy',
      content: '<!-- anchor: action-anchor -->',
    },
    {
      request: {},
      response: {
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
        statusCode: 200,
      },
    },
  ],
  type: 'transaction',
  routePreset: '/action-anchor',
  nestedRoutePresets: [],
};
