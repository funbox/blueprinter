module.exports.source = `# My API

# Group Users

## Create user [POST /user]

+ Request (application/json)
    + Attributes
        + name: John (string, required)

+ Response 200 (application/json)
    + Attributes
        + status: ok (required, fixed)`;

module.exports.parentElement = {
  title: 'Create user',
  href: '/user',
  hashForLegacyUrl: 'resource-group-create-user',
  route: '/group-resource-group/resource-user-6b52b97c',
};

module.exports.processed = {
  meta: {
    title: {
      element: 'string',
      content: 'Create user',
    },
  },
  title: 'Create user',
  route: '/group-resource-group/resource-user-6b52b97c/action-post-user-5eb18651',
  hashForLegacyUrl: 'resource-group-create-user-create-user-post',
  element: 'transition',
  attributes: {
    hrefVariables: null,
    href: '/user',
    method: 'POST',
  },
  content: [
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
        ],
        body: '{\n  "name": "John"\n}',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
        schema: '{\n  "$schema": "http://json-schema.org/draft-04/schema#",\n  "type": "object",\n  "properties": {\n    "name": {\n      "type": "string"\n    }\n  },\n  "required": [\n    "name"\n  ]\n}',
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
                content: 'ok',
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
        body: '{\n  "status": "ok"\n}',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
        schema: '{\n  "$schema": "http://json-schema.org/draft-04/schema#",\n  "type": "object",\n  "properties": {\n    "status": {\n      "type": "string",\n      "enum": [\n        "ok"\n      ]\n    }\n  },\n  "required": [\n    "status"\n  ]\n}',
        statusCode: 200,
      },
    },
  ],
  type: 'transaction',
  routePreset: null,
  nestedRoutePresets: [],
};
