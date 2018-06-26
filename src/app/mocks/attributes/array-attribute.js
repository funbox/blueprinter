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
          element: 'string',
          content: 'f1e52303-a7ba-4bcb-be3a-c7e8467614b9',
        },
      ],
    },
  },
};

