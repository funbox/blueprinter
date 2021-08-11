module.exports.source = `# My API

# Group Foo

# GET /foo

+ Response 200 (application/json)
    + Attributes
        + o (object, fixed)
            + a: hello
            + b: world
            + c: bar (string, sample, optional)
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
            usedStructures: [],
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
                  {
                    element: 'member',
                    content: {
                      key: {
                        element: 'string',
                        content: 'b',
                      },
                      value: {
                        element: 'string',
                        content: 'world',
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
                  {
                    element: 'member',
                    content: {
                      key: {
                        element: 'string',
                        content: 'c',
                      },
                      value: {
                        element: 'string',
                        attributes: {
                          samples: {
                            element: 'array',
                            content: [
                              {
                                element: 'string',
                                content: 'bar',
                              },
                            ],
                          },
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
                        element: 'array',
                        content: [
                          {
                            element: 'string',
                            content: 'optional',
                          },
                        ],
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
        body: '{\n  "o": {\n    "a": "hello",\n    "b": "world",\n    "c": "bar"\n  }\n}',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
        schema: '{\n  "$schema": "http://json-schema.org/draft-04/schema#",\n  "type": "object",\n  "properties": {\n    "o": {\n      "type": "object",\n      "properties": {\n        "a": {\n          "type": "string",\n          "enum": [\n            "hello"\n          ]\n        },\n        "b": {\n          "type": "string",\n          "enum": [\n            "world"\n          ]\n        },\n        "c": {\n          "type": "string"\n        }\n      },\n      "required": [\n        "a",\n        "b"\n      ],\n      "additionalProperties": false\n    }\n  }\n}',
        statusCode: 200,
      },
    },
  ],
  type: 'transaction',
  routePreset: null,
  nestedRoutePresets: [],
};
