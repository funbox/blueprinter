export default {
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
      content: 'User name',
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
};
