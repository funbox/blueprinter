module.exports.source = `# My API

# Data Structures

# Age (number, minimum="18", maximum="100")`;

module.exports.parentElement = {
  element: 'dataStructure',
  content: {
    element: 'object',
    content: [
      {
        element: 'member',
        content: {
          key: {
            element: 'string',
            content: 'age',
          },
          value: {
            element: 'Age',
          },
        },
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
        key: {
          element: 'string',
          content: 'age',
        },
        value: {
          element: 'number',
          attributes: {
            typeAttributes: {
              element: 'array',
              content: [
                {
                  element: 'member',
                  content: {
                    key: {
                      element: 'string',
                      content: 'minimum',
                    },
                    value: {
                      element: 'string',
                      content: 18,
                    },
                  },
                },
                {
                  element: 'member',
                  content: {
                    key: {
                      element: 'string',
                      content: 'maximum',
                    },
                    value: {
                      element: 'string',
                      content: 100,
                    },
                  },
                },
              ],
            },
          },
        },
      },
    },
  ],
};
