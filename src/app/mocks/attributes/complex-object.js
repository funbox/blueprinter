export default {
  element: 'member',
  content: {
    key: {
      element: 'string',
      content: 'social',
    },
    value: {
      element: 'object',
      content: [
        {
          element: 'member',
          content: {
            key: {
              element: 'string',
              content: 'github',
            },
            value: {
              element: 'object',
              content: [
                {
                  element: 'member',
                  content: {
                    key: {
                      element: 'string',
                      content: 'active',
                    },
                    value: {
                      element: 'boolean',
                      content: true,
                    },
                  },
                },
                {
                  element: 'member',
                  content: {
                    key: {
                      element: 'string',
                      content: 'id',
                    },
                    value: {
                      element: 'number',
                      content: 1234,
                    },
                  },
                },
                {
                  element: 'member',
                  content: {
                    key: {
                      element: 'string',
                      content: 'uri',
                    },
                    value: {
                      element: 'string',
                      content: 'pksunkara',
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    },
  },
};
