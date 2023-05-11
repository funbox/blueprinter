module.exports.source = `# My API

# Data Structures

## ArrayType (array)
+ example (string)

## ArrayTypeExtended (ArrayType)
+ (object)
   + id (number)
   + name (string)
`;

module.exports.parentElement = {
  element: 'dataStructure',
  content: { element: 'ArrayTypeExtended' },
};

module.exports.processed = {
  element: 'array',
  content: [
    {
      element: 'string',
      content: 'example',
    },
    {
      element: 'object',
      content: [
        {
          element: 'member',
          content: {
            key: { element: 'string', content: 'id' },
            value: { element: 'number' },
          },
        },
        {
          element: 'member',
          content: {
            key: { element: 'string', content: 'name' },
            value: { element: 'string' },
          },
        },
      ],
    },
  ],
  referenceDataStructure: 'ArrayTypeExtended',
};
