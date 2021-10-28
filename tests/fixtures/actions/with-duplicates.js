module.exports.source = `# My API

# Group Users

## Create user [POST /user]

+ Request (application/json)
    + Attributes
        + name (string)

+ Request (application/json)
    + Attributes
        + name (string)

+ Request (application/json)
    + Attributes
        + address (string)

+ Response 200 (application/json)
    + Attributes
        + status: ok (string, fixed)

+ Response 200 (application/json)
    + Attributes
        + status: ok (string, fixed)

+ Response 500`;

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
      headers: [
        {
          key: 'Content-Type',
          value: 'application/json',
        },
      ],
      schema: '{\n  "$schema": "http://json-schema.org/draft-04/schema#",\n  "type": "object",\n  "properties": {\n    "name": {\n      "type": "string"\n    }\n  }\n}',
    },
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
              content: 'address',
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
      body: '{\n  "address": "hello"\n}',
      headers: [
        {
          key: 'Content-Type',
          value: 'application/json',
        },
      ],
      schema: '{\n  "$schema": "http://json-schema.org/draft-04/schema#",\n  "type": "object",\n  "properties": {\n    "address": {\n      "type": "string"\n    }\n  }\n}',
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
      headers: [
        {
          key: 'Content-Type',
          value: 'application/json',
        },
      ],
      schema: '{\n  "$schema": "http://json-schema.org/draft-04/schema#",\n  "type": "object",\n  "properties": {\n    "status": {\n      "type": "string",\n      "enum": [\n        "ok"\n      ]\n    }\n  }\n}',
      statusCode: 200,
    },
    {
      statusCode: 500,
    },
  ],
  content: [],
  type: 'transaction',
  routePreset: null,
  nestedRoutePresets: [],
};
