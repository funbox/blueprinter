module.exports.source = `# My API

Defines one-line descriptions for various sections.

# Group Comments

Test group description

## Users [/users]

Test resource description

### Create user [POST]

Test transition description

+ Request (application/json)

    Test request description

    + Attributes
        + name (string)

+ Response 200 (application/json)

    Test response description

    + Attributes
        + status: ok (string)`;

module.exports.processed = {
  topLevelMeta: {
    title: 'My API',
    description: 'Defines one-line descriptions for various sections.',
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
          content: 'Comments',
        },
      },
      content: [
        {
          element: 'copy',
          content: 'Test group description',
        },
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
              element: 'copy',
              content: 'Test resource description',
            },
            {
              id: 0,
              meta: {
                title: {
                  element: 'string',
                  content: 'Create user',
                },
              },
              title: 'Create user',
              route: '/group-comments/resource-users-25a52abe/action-post-users-12fa51ca',
              hashForLegacyUrl: 'comments-users-create-user-post',
              element: 'transition',
              attributes: {
                hrefVariables: null,
                href: '/users',
                method: 'POST',
              },
              content: [
                {
                  element: 'copy',
                  content: 'Test transition description',
                },
                {
                  request: {
                    structureType: {
                      type: 'object',
                      typeAttributes: null,
                    },
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
                    body: '{\n  "name": "hello"\n}',
                    description: 'Test request description',
                    headers: [
                      {
                        key: 'Content-Type',
                        value: 'application/json',
                      },
                    ],
                    schema: '{\n  "$schema": "http://json-schema.org/draft-04/schema#",\n  "type": "object",\n  "properties": {\n    "name": {\n      "type": "string"\n    }\n  }\n}',
                  },
                  response: {
                    structureType: {
                      type: 'object',
                      typeAttributes: null,
                    },
                    attributes: [
                      {
                        element: 'member',
                        content: {
                          key: {
                            element: 'string',
                            content: 'status',
                          },
                          value: {
                            element: 'string',
                            attributes: {
                              samples: {
                                element: 'array',
                                content: [
                                  {
                                    element: 'string',
                                    content: 'ok',
                                  },
                                ],
                              },
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
                    body: '{\n  "status": "ok"\n}',
                    description: 'Test response description',
                    headers: [
                      {
                        key: 'Content-Type',
                        value: 'application/json',
                      },
                    ],
                    schema: '{\n  "$schema": "http://json-schema.org/draft-04/schema#",\n  "type": "object",\n  "properties": {\n    "status": {\n      "type": "string"\n    }\n  }\n}',
                    statusCode: 200,
                  },
                },
              ],
              type: 'transaction',
              routePreset: null,
              nestedRoutePresets: [],
              parentResource: {
                title: 'Users',
                href: '/users',
                hashForLegacyUrl: 'comments-users',
                route: '/group-comments/resource-users-25a52abe',
                group: {
                  title: 'Comments',
                  hashForLegacyUrl: 'comments',
                  route: '/group-comments',
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
          hashForLegacyUrl: 'comments-users',
          route: '/group-comments/resource-users-25a52abe',
          title: 'Users',
          parentGroup: {
            title: 'Comments',
            hashForLegacyUrl: 'comments',
            route: '/group-comments',
          },
        },
      ],
      hashForLegacyUrl: 'comments',
      route: '/group-comments',
      title: 'Comments',
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
          element: 'copy',
          content: 'Test resource description',
        },
        {
          id: 0,
          meta: {
            title: {
              element: 'string',
              content: 'Create user',
            },
          },
          title: 'Create user',
          route: '/group-comments/resource-users-25a52abe/action-post-users-12fa51ca',
          hashForLegacyUrl: 'comments-users-create-user-post',
          element: 'transition',
          attributes: {
            hrefVariables: null,
            href: '/users',
            method: 'POST',
          },
          content: [
            {
              element: 'copy',
              content: 'Test transition description',
            },
            {
              request: {
                structureType: {
                  type: 'object',
                  typeAttributes: null,
                },
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
                body: '{\n  "name": "hello"\n}',
                description: 'Test request description',
                headers: [
                  {
                    key: 'Content-Type',
                    value: 'application/json',
                  },
                ],
                schema: '{\n  "$schema": "http://json-schema.org/draft-04/schema#",\n  "type": "object",\n  "properties": {\n    "name": {\n      "type": "string"\n    }\n  }\n}',
              },
              response: {
                structureType: {
                  type: 'object',
                  typeAttributes: null,
                },
                attributes: [
                  {
                    element: 'member',
                    content: {
                      key: {
                        element: 'string',
                        content: 'status',
                      },
                      value: {
                        element: 'string',
                        attributes: {
                          samples: {
                            element: 'array',
                            content: [
                              {
                                element: 'string',
                                content: 'ok',
                              },
                            ],
                          },
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
                body: '{\n  "status": "ok"\n}',
                description: 'Test response description',
                headers: [
                  {
                    key: 'Content-Type',
                    value: 'application/json',
                  },
                ],
                schema: '{\n  "$schema": "http://json-schema.org/draft-04/schema#",\n  "type": "object",\n  "properties": {\n    "status": {\n      "type": "string"\n    }\n  }\n}',
                statusCode: 200,
              },
            },
          ],
          type: 'transaction',
          routePreset: null,
          nestedRoutePresets: [],
          parentResource: {
            title: 'Users',
            href: '/users',
            hashForLegacyUrl: 'comments-users',
            route: '/group-comments/resource-users-25a52abe',
            group: {
              title: 'Comments',
              hashForLegacyUrl: 'comments',
              route: '/group-comments',
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
      hashForLegacyUrl: 'comments-users',
      route: '/group-comments/resource-users-25a52abe',
      title: 'Users',
      parentGroup: {
        title: 'Comments',
        hashForLegacyUrl: 'comments',
        route: '/group-comments',
      },
    },
  ],
  actions: [
    {
      id: 0,
      meta: {
        title: {
          element: 'string',
          content: 'Create user',
        },
      },
      title: 'Create user',
      route: '/group-comments/resource-users-25a52abe/action-post-users-12fa51ca',
      hashForLegacyUrl: 'comments-users-create-user-post',
      element: 'transition',
      attributes: {
        hrefVariables: null,
        href: '/users',
        method: 'POST',
      },
      content: [
        {
          element: 'copy',
          content: 'Test transition description',
        },
        {
          request: {
            structureType: {
              type: 'object',
              typeAttributes: null,
            },
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
            body: '{\n  "name": "hello"\n}',
            description: 'Test request description',
            headers: [
              {
                key: 'Content-Type',
                value: 'application/json',
              },
            ],
            schema: '{\n  "$schema": "http://json-schema.org/draft-04/schema#",\n  "type": "object",\n  "properties": {\n    "name": {\n      "type": "string"\n    }\n  }\n}',
          },
          response: {
            structureType: {
              type: 'object',
              typeAttributes: null,
            },
            attributes: [
              {
                element: 'member',
                content: {
                  key: {
                    element: 'string',
                    content: 'status',
                  },
                  value: {
                    element: 'string',
                    attributes: {
                      samples: {
                        element: 'array',
                        content: [
                          {
                            element: 'string',
                            content: 'ok',
                          },
                        ],
                      },
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
            body: '{\n  "status": "ok"\n}',
            description: 'Test response description',
            headers: [
              {
                key: 'Content-Type',
                value: 'application/json',
              },
            ],
            schema: '{\n  "$schema": "http://json-schema.org/draft-04/schema#",\n  "type": "object",\n  "properties": {\n    "status": {\n      "type": "string"\n    }\n  }\n}',
            statusCode: 200,
          },
        },
      ],
      type: 'transaction',
      routePreset: null,
      nestedRoutePresets: [],
      parentResource: {
        title: 'Users',
        href: '/users',
        hashForLegacyUrl: 'comments-users',
        route: '/group-comments/resource-users-25a52abe',
        group: {
          title: 'Comments',
          hashForLegacyUrl: 'comments',
          route: '/group-comments',
        },
      },
    },
  ],
};
