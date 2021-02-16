module.exports.source = `# My API

# Group Foo

# GET /foo

+ Response 200 (application/json)
    + Attributes
        + o (object, fixed, fixed-type)
            + a: hello
`;

module.exports.parentElement = {
  title: '/foo',
  href: '/foo',
  hashForLegacyUrl: 'foo-1',
  route: '/group-foo/resource-foo-2910be4',
};

module.exports.processed = {
  title: 'GET /foo',
  route: '/group-foo/resource-foo-2910be4/action-get-foo-649fe33',
  hashForLegacyUrl: 'foo-1-foo-get',
  element: 'transition',
  attributes: {
    hrefVariables: null,
    href: '/foo',
    method: 'GET',
  },
  content: [
    {
      request: {},
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
                content: 'o',
              },
              value: {
                element: 'object',
                attributes: {
                  typeAttributes: {
                    element: 'array',
                    content: [
                      {
                        element: 'string',
                        content: 'fixed',
                      },
                      {
                        element: 'string',
                        content: 'non-nullable',
                      },
                    ],
                  },
                },
                content: [
                  {
                    element: 'member',
                    content: {
                      key: {
                        element: 'string',
                        content: 'a',
                      },
                      value: {
                        element: 'string',
                        content: 'hello',
                        attributes: {
                          typeAttributes: {
                            content: [
                              {
                                element: 'string',
                                content: 'fixed',
                              },
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
        body: '{\n  "o": {\n    "a": "hello"\n  }\n}',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
        schema: '{\n  "$schema": "http://json-schema.org/draft-04/schema#",\n  "type": "object",\n  "properties": {\n    "o": {\n      "type": "object",\n      "properties": {\n        "a": {\n          "type": "string",\n          "enum": [\n            "hello"\n          ]\n        }\n      },\n      "required": [\n        "a"\n      ],\n      "additionalProperties": false\n    }\n  }\n}',
        statusCode: 200,
      },
    },
  ],
  type: 'transaction',
  routePreset: null,
  nestedRoutePresets: [],
};
