const hrefVariables = [
  {
    element: 'member',
    content: {
      key: {
        element: 'string',
        content: 'count',
      },
      value: {
        element: 'string',
      },
    },
    meta: {
      description: {
        element: 'string',
        content: 'number of records N to return. Max value - 100; if requested more than max, return 100 records.',
      },
      title: {
        element: 'string',
        content: 'number',
      },
    },
    attributes: {
      typeAttributes: {
        element: 'array',
        content: [
          {
            element: 'string',
            content: 'optional',
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
        content: 'after',
      },
      value: {
        element: 'string',
        content: 'xxx',
      },
    },
    meta: {
      description: {
        element: 'string',
        content: 'return N news, published after the news record with id=xxx',
      },
      title: {
        element: 'string',
        content: 'string',
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
];

export default hrefVariables;
