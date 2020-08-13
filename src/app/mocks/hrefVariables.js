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
        content: 'количество записей N, которое нужно возвратить. Максимальное значение - 100; если передано большее значение, нужно возвратить 100 записей.',
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
        content: 'возвратить N новостей, опубликованных после новости с id=xxx',
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
