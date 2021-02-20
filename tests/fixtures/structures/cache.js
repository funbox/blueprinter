module.exports.source = `# My API

# Data Structures

## NormalResponse (object, fixed)
+ status: ok (required) - штатный ответ
`;

module.exports.memberWithReference = {
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

module.exports.memberWithoutReference = {
  element: 'string',
  content: 'hello',
};
