module.exports.source = `# My API

Only group title is required here

# Group 1

## /users

### GET

+ Response 200 (application/json)

# Group 2

## Message
+ Attributes
  + text (string)
`;

module.exports.processed = {
  topLevelMeta: {
    title: 'My API',
    description: 'Only group title is required here',
    host: null,
    warnings: [],
  },
  groups: [
    {
      element: 'category',
      meta: {
        classes: {
          element: 'array',
          content: [
            {
              element: 'string',
              content: 'resourceGroup',
            },
          ],
        },
        title: {
          element: 'string',
          content: '1',
        },
      },
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
              title: 'GET /users',
              route: '/group-1/resource-users-5cad425a/action-get-users-1ae5028f',
              hashForLegacyUrl: '1-1-users-get',
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
                title: '/users',
                href: '/users',
                hashForLegacyUrl: '1-1',
                route: '/group-1/resource-users-5cad425a',
                group: {
                  title: '1',
                  hashForLegacyUrl: '1',
                  route: '/group-1',
                },
              },
            },
          ],
          id: 0,
          nestedRoutePresets: [],
          hashForLegacyUrl: '1-1',
          route: '/group-1/resource-users-5cad425a',
          title: '/users',
          parentGroup: {
            title: '1',
            hashForLegacyUrl: '1',
            route: '/group-1',
          },
        },
      ],
      hashForLegacyUrl: '1',
      route: '/group-1',
      title: '1',
      id: 0,
      nestedRoutePresets: [],
    },
    {
      element: 'category',
      meta: {
        classes: {
          element: 'array',
          content: [
            {
              element: 'string',
              content: 'resourceGroup',
            },
          ],
        },
        title: {
          element: 'string',
          content: '2',
        },
      },
      content: [
        {
          id: 0,
          element: 'message',
          type: 'message',
          description: null,
          attributes: [
            {
              element: 'member',
              content: {
                key: {
                  element: 'string',
                  content: 'text',
                },
                value: {
                  element: 'string',
                  attributes: {
                    typeAttributes: {
                      content: [
                        {
                          element: 'string',
                          content: 'non-nullable',
                        },
                      ],
                      element: 'array',
                    },
                  },
                },
              },
              attributes: {
                typeAttributes: {
                  content: [
                    {
                      element: 'string',
                      content: 'optional',
                    },
                  ],
                  element: 'array',
                },
              },
            },
          ],
          body: '{\n  "text": "hello"\n}',
          schema: '{\n  "$schema": "http://json-schema.org/draft-04/schema#",\n  "type": "object",\n  "properties": {\n    "text": {\n      "type": "string"\n    }\n  }\n}',
          hashForLegacyUrl: '2-message',
          route: '/group-2/message-message',
          title: 'Message',
          routePreset: null,
          nestedRoutePresets: [],
          parentGroup: {
            title: '2',
            hashForLegacyUrl: '2',
            route: '/group-2',
          },
        },
      ],
      hashForLegacyUrl: '2',
      route: '/group-2',
      title: '2',
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
          title: 'GET /users',
          route: '/group-1/resource-users-5cad425a/action-get-users-1ae5028f',
          hashForLegacyUrl: '1-1-users-get',
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
            title: '/users',
            href: '/users',
            hashForLegacyUrl: '1-1',
            route: '/group-1/resource-users-5cad425a',
            group: {
              title: '1',
              hashForLegacyUrl: '1',
              route: '/group-1',
            },
          },
        },
      ],
      id: 0,
      nestedRoutePresets: [],
      hashForLegacyUrl: '1-1',
      route: '/group-1/resource-users-5cad425a',
      title: '/users',
      parentGroup: {
        title: '1',
        hashForLegacyUrl: '1',
        route: '/group-1',
      },
    },
    {
      id: 0,
      element: 'message',
      type: 'message',
      description: null,
      attributes: [
        {
          element: 'member',
          content: {
            key: {
              element: 'string',
              content: 'text',
            },
            value: {
              element: 'string',
              attributes: {
                typeAttributes: {
                  content: [
                    {
                      element: 'string',
                      content: 'non-nullable',
                    },
                  ],
                  element: 'array',
                },
              },
            },
          },
          attributes: {
            typeAttributes: {
              content: [
                {
                  element: 'string',
                  content: 'optional',
                },
              ],
              element: 'array',
            },
          },
        },
      ],
      body: '{\n  "text": "hello"\n}',
      schema: '{\n  "$schema": "http://json-schema.org/draft-04/schema#",\n  "type": "object",\n  "properties": {\n    "text": {\n      "type": "string"\n    }\n  }\n}',
      hashForLegacyUrl: '2-message',
      route: '/group-2/message-message',
      title: 'Message',
      routePreset: null,
      nestedRoutePresets: [],
      parentGroup: {
        title: '2',
        hashForLegacyUrl: '2',
        route: '/group-2',
      },
    },
  ],
  actions: [
    {
      id: 0,
      title: 'GET /users',
      route: '/group-1/resource-users-5cad425a/action-get-users-1ae5028f',
      hashForLegacyUrl: '1-1-users-get',
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
        title: '/users',
        href: '/users',
        hashForLegacyUrl: '1-1',
        route: '/group-1/resource-users-5cad425a',
        group: {
          title: '1',
          hashForLegacyUrl: '1',
          route: '/group-1',
        },
      },
    },
  ],
};
