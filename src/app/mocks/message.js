export default {
  element: 'message',
  content: [
    {
      element: 'copy',
      content: 'Notification about a new user being added to the channel',
    },
    {
      element: 'dataStructure',
      content: {
        element: 'object',
        content: [
          {
            element: 'member',
            content: {
              key: {
                element: 'string',
                content: 'name',
              },
              value: {
                element: 'string',
              },
            },
            attributes: {
              typeAttributes: {
                element: 'array',
                content: [
                  {
                    element: 'string',
                    content: 'required',
                  },
                ],
              },
            },
            meta: {
              description: {
                element: 'string',
                content: 'user name',
              },
            },
          },
        ],
      },
    },
    {
      element: 'asset',
      meta: {
        classes: [
          'messageBody',
        ],
      },
      content: '{\n  "name": ""\n}',
    },
  ],
  meta: {
    title: {
      element: 'string',
      content: 'ServerToClientMessage NewParticipant',
    },
  },
};
