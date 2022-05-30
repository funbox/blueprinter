export default {
  element: 'member',
  meta: {
    description: {
      element: 'string',
      content: 'identifiers list',
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
