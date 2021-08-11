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
                  usedStructures: [
                    'DNSServerWithSettings',
                  ],
                },
              },
              attributes: {
                typeAttributes: {
                  element: 'array',
                  content: [{ element: 'string', content: 'required' }],
                },
              },
              usedStructures: [
                'DNSServerWithSettings',
                'DNSServerWithSettings',
                'DNSServerWithSettings',
              ],
            },
          ],
          referenceDataStructure: 'DNSSettings',
          usedStructures: [
            'DNSSettings',
            'DNSServerWithSettings',
            'DNSServerWithSettings',
          ],
        },
      },
      usedStructures: [
        'DNSSettings',
        'DNSServerWithSettings',
        'DNSServerWithSettings',
        'DNSServerWithSettings',
        'DNSServerWithSettings',
        'DNSServerWithSettings',
      ],
    },
  ],
  referenceDataStructure: 'DNSServerWithSettings',
  recursive: true,
  usedStructures: [
    'DNSServerWithSettings',
    'DNSSettings',
    'DNSServerWithSettings',
    'DNSServerWithSettings',
    'DNSServerWithSettings',
    'DNSServerWithSettings',
    'DNSServerWithSettings',
  ],
};
