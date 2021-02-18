module.exports.source = `# My API

# Group Группа 1 с якорем

<!-- anchor: first-group -->

## Ресурс с якорем [/resource-with-anchor]

<!-- anchor: resource -->

### Запрос с якорем [GET]

<!-- anchor: first-action -->

+ Response 200 (application/json)

# Group WS /chat_messages

<!-- anchor: second-group -->

## Message ServerToClientMessage NewParticipant
<!-- anchor: first-message -->

+ Attributes
    + name (string, required)
`;

module.exports.processed = {
  topLevelMeta: {
    title: 'My API',
    description: null,
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
          content: 'Группа 1 с якорем',
        },
      },
      content: [
        {
          element: 'copy',
          content: '<!-- anchor: first-group -->',
        },
        {
          element: 'resource',
          attributes: {
            href: {
              element: 'string',
              content: '/resource-with-anchor',
            },
          },
          content: [
            {
              element: 'copy',
              content: '<!-- anchor: resource -->',
            },
            {
              id: 0,
              meta: {
                title: {
                  element: 'string',
                  content: 'Запрос с якорем',
                },
              },
              title: 'Запрос с якорем',
              route: '/first-action',
              hashForLegacyUrl: 'first-action',
              element: 'transition',
              attributes: {
                hrefVariables: null,
                href: '/resource-with-anchor',
                method: 'GET',
              },
              content: [
                {
                  element: 'copy',
                  content: '<!-- anchor: first-action -->',
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
              routePreset: '/first-action',
              nestedRoutePresets: [],
              parentResource: {
                title: 'Ресурс с якорем',
                href: '/resource-with-anchor',
                hashForLegacyUrl: 'resource',
                route: '/resource',
                group: {
                  title: 'Группа 1 с якорем',
                  hashForLegacyUrl: 'first-group',
                  route: '/first-group',
                },
              },
            },
          ],
          meta: {
            title: {
              element: 'string',
              content: 'Ресурс с якорем',
            },
          },
          id: 0,
          nestedRoutePresets: [
            '/first-action',
          ],
          hashForLegacyUrl: 'resource',
          route: '/resource',
          title: 'Ресурс с якорем',
          parentGroup: {
            title: 'Группа 1 с якорем',
            hashForLegacyUrl: 'first-group',
            route: '/first-group',
          },
        },
      ],
      hashForLegacyUrl: 'first-group',
      route: '/first-group',
      title: 'Группа 1 с якорем',
      id: 0,
      nestedRoutePresets: [
        '/resource',
        '/first-action',
      ],
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
          content: 'WS /chat_messages',
        },
      },
      content: [
        {
          element: 'copy',
          content: '<!-- anchor: second-group -->',
        },
        {
          id: 0,
          element: 'message',
          meta: {
            title: {
              element: 'string',
              content: 'ServerToClientMessage NewParticipant',
            },
          },
          type: 'message',
          description: '<!-- anchor: first-message -->',
          attributes: [
            {
              element: 'member',
              content: {
                key: {
                  element: 'string',
                  content: 'name',
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
                  element: 'array',
                  content: [
                    {
                      element: 'string',
                      content: 'required',
                    },
                  ],
                },
              },
            },
          ],
          body: '{\n  "name": "hello"\n}',
          schema: '{\n  "$schema": "http://json-schema.org/draft-04/schema#",\n  "type": "object",\n  "properties": {\n    "name": {\n      "type": "string"\n    }\n  },\n  "required": [\n    "name"\n  ]\n}',
          hashForLegacyUrl: 'first-message',
          route: '/first-message',
          title: 'ServerToClientMessage NewParticipant',
          routePreset: '/first-message',
          nestedRoutePresets: [],
          parentGroup: {
            title: 'WS /chat_messages',
            hashForLegacyUrl: 'second-group',
            route: '/second-group',
          },
        },
      ],
      hashForLegacyUrl: 'second-group',
      route: '/second-group',
      title: 'WS /chat_messages',
      id: 0,
      nestedRoutePresets: [
        '/first-message',
      ],
    },
  ],
  resources: [
    {
      element: 'resource',
      attributes: {
        href: {
          element: 'string',
          content: '/resource-with-anchor',
        },
      },
      content: [
        {
          element: 'copy',
          content: '<!-- anchor: resource -->',
        },
        {
          id: 0,
          meta: {
            title: {
              element: 'string',
              content: 'Запрос с якорем',
            },
          },
          title: 'Запрос с якорем',
          route: '/first-action',
          hashForLegacyUrl: 'first-action',
          element: 'transition',
          attributes: {
            hrefVariables: null,
            href: '/resource-with-anchor',
            method: 'GET',
          },
          content: [
            {
              element: 'copy',
              content: '<!-- anchor: first-action -->',
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
          routePreset: '/first-action',
          nestedRoutePresets: [],
          parentResource: {
            title: 'Ресурс с якорем',
            href: '/resource-with-anchor',
            hashForLegacyUrl: 'resource',
            route: '/resource',
            group: {
              title: 'Группа 1 с якорем',
              hashForLegacyUrl: 'first-group',
              route: '/first-group',
            },
          },
        },
      ],
      meta: {
        title: {
          element: 'string',
          content: 'Ресурс с якорем',
        },
      },
      id: 0,
      nestedRoutePresets: [
        '/first-action',
      ],
      hashForLegacyUrl: 'resource',
      route: '/resource',
      title: 'Ресурс с якорем',
      parentGroup: {
        title: 'Группа 1 с якорем',
        hashForLegacyUrl: 'first-group',
        route: '/first-group',
      },
    },
    {
      id: 0,
      element: 'message',
      meta: {
        title: {
          element: 'string',
          content: 'ServerToClientMessage NewParticipant',
        },
      },
      type: 'message',
      description: '<!-- anchor: first-message -->',
      attributes: [
        {
          element: 'member',
          content: {
            key: {
              element: 'string',
              content: 'name',
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
              element: 'array',
              content: [
                {
                  element: 'string',
                  content: 'required',
                },
              ],
            },
          },
        },
      ],
      body: '{\n  "name": "hello"\n}',
      schema: '{\n  "$schema": "http://json-schema.org/draft-04/schema#",\n  "type": "object",\n  "properties": {\n    "name": {\n      "type": "string"\n    }\n  },\n  "required": [\n    "name"\n  ]\n}',
      hashForLegacyUrl: 'first-message',
      route: '/first-message',
      title: 'ServerToClientMessage NewParticipant',
      routePreset: '/first-message',
      nestedRoutePresets: [],
      parentGroup: {
        title: 'WS /chat_messages',
        hashForLegacyUrl: 'second-group',
        route: '/second-group',
      },
    },
  ],
  actions: [
    {
      id: 0,
      meta: {
        title: {
          element: 'string',
          content: 'Запрос с якорем',
        },
      },
      title: 'Запрос с якорем',
      route: '/first-action',
      hashForLegacyUrl: 'first-action',
      element: 'transition',
      attributes: {
        hrefVariables: null,
        href: '/resource-with-anchor',
        method: 'GET',
      },
      content: [
        {
          element: 'copy',
          content: '<!-- anchor: first-action -->',
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
      routePreset: '/first-action',
      nestedRoutePresets: [],
      parentResource: {
        title: 'Ресурс с якорем',
        href: '/resource-with-anchor',
        hashForLegacyUrl: 'resource',
        route: '/resource',
        group: {
          title: 'Группа 1 с якорем',
          hashForLegacyUrl: 'first-group',
          route: '/first-group',
        },
      },
    },
  ],
};
