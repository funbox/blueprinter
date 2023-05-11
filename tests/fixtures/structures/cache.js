module.exports.source = `# My API

# Data Structures

# User

+ name: John (string, required) - user name
+ email
+ phone
+ age (number)

# Name

+ first (string, required)
+ last (string, required)`;

module.exports.parentElement = {
  element: 'dataStructure',
  content: { element: 'User' },
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
        key: { element: 'string', content: 'email' },
        value: { element: 'string' },
      },
    },
    {
      element: 'member',
      content: {
        key: { element: 'string', content: 'phone' },
        value: { element: 'string' },
      },
    },
    {
      element: 'member',
      content: {
        key: { element: 'string', content: 'age' },
        value: { element: 'number' },
      },
    },
  ],
  referenceDataStructure: 'User',
};

module.exports.memberWithReference = {
  element: 'User',
};

module.exports.memberWithReferenceAndOwnStructure = {
  element: 'User',
  content: [
    {
      element: 'member',
      content: {
        key: { element: 'string', content: 'sex' },
        value: { element: 'string' },
      },
    },
  ],
};

module.exports.memberWithOverridedStructure = {
  element: 'User',
  content: [
    {
      element: 'member',
      content: {
        key: { element: 'string', content: 'phone' },
        value: { element: 'number' },
      },
    },
  ],
};

module.exports.memberWithOverridedStructureByDS = {
  element: 'User',
  content: [
    {
      element: 'member',
      content: {
        key: { element: 'string', content: 'name' },
        value: { element: 'Name' },
      },
    },
  ],
};

module.exports.memberWithReferenceAndOwnAttributes = {
  element: 'User',
  attributes: {
    typeAttributes: {
      element: 'array',
      content: [
        { element: 'string', content: 'fixed' },
      ],
    },
  },
};

module.exports.memberWithoutReference = {
  element: 'string',
  content: 'hello',
};
