module.exports.source = `# My API

# Data Structures

## DNSSettings
+ parent (DNSServerWithSettings, required, nullable)

## DNSServerWithSettings
+ address (string, required)
+ settings (DNSSettings)
`;

module.exports.parentElement = {
  element: 'dataStructure',
  content: { element: 'DNSServerWithSettings' },
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
        key: {
          element: 'string',
          content: 'settings',
        },
        value: {
          element: 'object',
          content: [
            {
              element: 'member',
              content: {
                key: { element: 'string', content: 'parent' },
                value: {
                  element: 'DNSServerWithSettings',
                  attributes: {
                    typeAttributes: {
                      element: 'array',
                      content: [{ element: 'string', content: 'nullable' }],
                    },
                  },
                  recursive: true,
                  usedStructuresHash: 1326339797,
                },
              },
              attributes: {
                typeAttributes: {
                  element: 'array',
                  content: [{ element: 'string', content: 'required' }],
                },
              },
              usedStructuresHash: 3979019391,
            },
          ],
          referenceDataStructure: 'DNSSettings',
          usedStructuresHash: 4375297526,
        },
      },
      usedStructuresHash: 8354316917,
    },
  ],
  referenceDataStructure: 'DNSServerWithSettings',
  recursive: true,
  usedStructuresHash: 9680656714,
};
