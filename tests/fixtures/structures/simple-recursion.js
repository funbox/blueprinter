module.exports.source = `# My API

# Data Structures

## DNSServer
+ address (string, required)
+ parent (DNSServer, nullable)
`;

module.exports.parentElement = {
  element: 'dataStructure',
  content: { element: 'DNSServer' },
};

module.exports.processed = {
  element: 'object',
  content: [
    {
      element: 'member',
      content: {
        key: { element: 'string', content: 'address' },
        value: { element: 'string' },
      },
      attributes: {
        typeAttributes: {
          element: 'array',
          content: [{ element: 'string', content: 'required' }],
        },
      },
    },
    {
      element: 'member',
      content: {
        key: { element: 'string', content: 'parent' },
        value: {
          element: 'DNSServer',
          attributes: {
            typeAttributes: {
              element: 'array',
              content: [{ element: 'string', content: 'nullable' }],
            },
          },
          recursive: true,
          usedStructures: [
            'DNSServer',
          ],
        },
      },
      usedStructures: [
        'DNSServer',
        'DNSServer',
      ],
    },
  ],
  referenceDataStructure: 'DNSServer',
  recursive: true,
  usedStructures: [
    'DNSServer',
    'DNSServer',
    'DNSServer',
  ],
};
