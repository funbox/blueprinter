module.exports.source = `# My API

# Group Users

## Create user [POST /user]

Test transition description

+ Request (application/json)

    Test request description

    + Attributes
        + name (string)

+ Response 200 (application/json)

    Test response description

    + Attributes
        + status: ok (required, fixed)`;

module.exports.parentElement = {
  title: 'Create user',
  href: '/user',
  hashForLegacyUrl: 'users-create-user',
  route: '/group-users/resource-user-6b52b97c',
};

module.exports.processed = {
  meta: {
    title: {
      element: 'string',
      content: 'Create user',
    },
  },
  title: 'Create user',
  route: '/group-users/resource-user-6b52b97c/action-post-user-5eb18651',
  hashForLegacyUrl: 'users-create-user-create-user-post',
  element: 'transition',
  attributes: {
    hrefVariables: null,
    href: '/user',
    method: 'POST',
  },
  requests: [
    {
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
  ],
  responses: [
    {
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
      description: 'Test response description',
      headers: [
        {
          key: 'Content-Type',
          value: 'application/json',
        },
      ],
      schema: '{\n  "$schema": "http://json-schema.org/draft-04/schema#",\n  "type": "object",\n  "properties": {\n    "status": {\n      "type": "string",\n      "enum": [\n        "ok"\n      ]\n    }\n  },\n  "required": [\n    "status"\n  ]\n}',
      statusCode: 200,
    },
  ],
  content: [
    {
      element: 'copy',
      content: 'Test transition description',
    },
  ],
  type: 'transaction',
  routePreset: null,
  nestedRoutePresets: [],
};
