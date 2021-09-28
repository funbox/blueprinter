module.exports.source = `# My API

# Data Structures

## Post Code (enum)

+ Include East Code

## East Code (enum)

+ EC2A
+ E1
`;

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
            content: 'code',
          },
          value: {
            element: 'Post Code',
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
          content: 'code',
        },
        value: {
          element: 'enum',
          attributes: {
            enumerations: {
              content: [
                {
                  element: 'string',
                  attributes: {
                    typeAttributes: {
                      element: 'array',
                      content: [
                        {
                          element: 'string',
                          content: 'fixed',
                        },
                      ],
                    },
                  },
                  content: 'EC2A',
                },
                {
                  element: 'string',
                  attributes: {
                    typeAttributes: {
                      element: 'array',
                      content: [
                        {
                          element: 'string',
                          content: 'fixed',
                        },
                      ],
                    },
                  },
                  content: 'E1',
                },
              ],
            },
          },
          usedStructuresHash: -347669139,
        },
      },
      usedStructuresHash: -347669139,
    },
  ],
  usedStructuresHash: -347669139,
};
