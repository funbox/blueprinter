export default {
  element: 'member',
  meta: {
    description: {
      element: 'string',
      content: 'список идентификаторов',
    },
  },
  attributes: {
    typeAttributes: [
      {
        element: 'string',
        content: 'required',
      },
    ],
  },
  content: {
    key: {
      element: 'string',
      content: 'ids',
    },
    value: {
      element: 'array',
      content: [
        {
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
                  content: 'John',
                },
              },
              meta: {
                description: {
                  element: 'string',
                  content: 'user name',
                },
              },
              attributes: {
                typeAttributes: [
                  {
                    element: 'string',
                    content: 'required',
                  },
                ],
              },
            },
            {
              element: 'member',
              content: {
                key: {
                  element: 'string',
                  content: 'email',
                },
                value: {
                  element: 'string',
                  content: 'me@mail.ru',
                },
              },
            },
            {
              element: 'member',
              content: {
                key: {
                  element: 'string',
                  content: 'phone',
                },
                value: {
                  element: 'string',
                },
              },
            },
            {
              element: 'member',
              content: {
                key: {
                  element: 'string',
                  content: 'age',
                },
                value: {
                  element: 'number',
                },
              },
            },
          ],
        },
      ],
    },
  },
};

