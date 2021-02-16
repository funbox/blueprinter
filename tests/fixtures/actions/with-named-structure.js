module.exports.source = `# My API

# Data Structures

# User

+ name: John (string, required)
+ email
+ phone
+ age (number)

# Group Users

## Get user [GET /user]

+ Response 200 (application/json)
    + Attributes(User)

+ Response 300 (application/json)
    + Attributes(User)
`;

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
      content: 'Get user',
    },
  },
  title: 'Get user',
  route: '/group-users/resource-user-e7344de/action-get-user-67541df5',
  hashForLegacyUrl: 'users-get-user-get-user-get',
  element: 'transition',
  attributes: {
    hrefVariables: null,
    href: '/user',
    method: 'GET',
  },
  content: [
    {
      request: {},
      response: {
        structureType: {
          type: 'object',
          typeAttributes: null,
          name: 'User',
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
                  samples: {
                    element: 'array',
                    content: [
                      {
                        element: 'string',
                        content: 'John',
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
          {
            element: 'member',
            content: {
              key: {
                element: 'string',
                content: 'email',
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
          {
            element: 'member',
            content: {
              key: {
                element: 'string',
                content: 'phone',
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
          {
            element: 'member',
            content: {
              key: {
                element: 'string',
                content: 'age',
              },
              value: {
                element: 'number',
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
        body: '{\n  "name": "John",\n  "email": "hello",\n  "phone": "hello",\n  "age": 1\n}',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
        schema: '{\n  "$schema": "http://json-schema.org/draft-04/schema#",\n  "type": "object",\n  "properties": {\n    "name": {\n      "type": "string"\n    },\n    "email": {\n      "type": "string"\n    },\n    "phone": {\n      "type": "string"\n    },\n    "age": {\n      "type": "number"\n    }\n  },\n  "required": [\n    "name"\n  ]\n}',
        statusCode: 200,
      },
    },
    {
      request: {},
      response: {
        structureType: {
          type: 'object',
          typeAttributes: null,
          name: 'User',
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
                  samples: {
                    element: 'array',
                    content: [
                      {
                        element: 'string',
                        content: 'John',
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
          {
            element: 'member',
            content: {
              key: {
                element: 'string',
                content: 'email',
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
          {
            element: 'member',
            content: {
              key: {
                element: 'string',
                content: 'phone',
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
          {
            element: 'member',
            content: {
              key: {
                element: 'string',
                content: 'age',
              },
              value: {
                element: 'number',
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
        body: '{\n  "name": "John",\n  "email": "hello",\n  "phone": "hello",\n  "age": 1\n}',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
        schema: '{\n  "$schema": "http://json-schema.org/draft-04/schema#",\n  "type": "object",\n  "properties": {\n    "name": {\n      "type": "string"\n    },\n    "email": {\n      "type": "string"\n    },\n    "phone": {\n      "type": "string"\n    },\n    "age": {\n      "type": "number"\n    }\n  },\n  "required": [\n    "name"\n  ]\n}',
        statusCode: 300,
      },
    },
  ],
  type: 'transaction',
  routePreset: null,
  nestedRoutePresets: [],
};
