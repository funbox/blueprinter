module.exports.source = `# My API

# Data Structures

## NormalResponse (object, fixed)
+ status: ok (required) - штатный ответ
`;

const member = {
  element: 'object',
  content: [
    {
      element: 'member',
      content: {
        key: { element: 'string', content: 'status' },
        value: { element: 'string' },
      },
    },
  ],
  referenceDataStructure: 'NormalResponse',
};

module.exports.memberToCache = {
  ...member,
  attributes: {
    typeAttributes: {
      element: 'array',
      content: [{ element: 'string', content: 'required' }],
    },
  },
};

module.exports.memberToObtain = {
  ...member,
  attributes: {
    typeAttributes: {
      element: 'array',
      content: [{ element: 'string', content: 'optional' }],
    },
  },
};
