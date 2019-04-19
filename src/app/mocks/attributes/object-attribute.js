export default {
  element: 'member',
  content: {
    key: {
      element: 'string',
      content: 'result',
    },
    value: {
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
  },
  meta: {
    description: {
      element: 'string',
      content: 'requested user',
    },
  },
};
