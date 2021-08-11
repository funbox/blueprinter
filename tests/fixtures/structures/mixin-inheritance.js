module.exports.source = `# My API

Defines attributes using mixin.

# Data Structures

# User

+ name: John (string, required) - user name

# Admin

+ accessLevel: all (string, required)
`;

module.exports.parentElement = {
  element: 'dataStructure',
  content: {
    element: 'User',
    content: [
      {
        element: 'ref',
        attributes: { path: { element: 'string', content: 'content' } },
        content: 'Admin',
      },
    ],
  },
};

module.exports.processed = {
  element: 'object',
  content: [
    {
      element: 'member',
      content: {
        key: { element: 'string', content: 'name' },
        value: {
          element: 'string',
          attributes: {
            samples: {
              element: 'array',
              content: [{ element: 'string', content: 'John' }],
            },
          },
        },
      },
      attributes: {
        typeAttributes: {
          element: 'array',
          content: [{ element: 'string', content: 'required' }],
        },
      },
      meta: {
        description: { element: 'string', content: 'user name' },
      },
    },
    {
      element: 'member',
      content: {
        key: { element: 'string', content: 'accessLevel' },
        value: {
          element: 'string',
          attributes: {
            samples: {
              element: 'array',
              content: [{ element: 'string', content: 'all' }],
            },
          },
        },
      },
      attributes: {
        typeAttributes: {
          element: 'array',
          content: [{ element: 'string', content: 'required' }],
        },
      },
    },
  ],
  referenceDataStructure: 'User',
  usedStructures: ['User', 'Admin'],
};
