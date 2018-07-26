const hrefVariables = {
  element: 'hrefVariables',
  content: [
    {
      element: 'member',
      meta: {
        description: 'количество записей N, которое нужно возвратить. Максимальное значение - 100; если передано большее значение, нужно возвратить 100 записей.',
        title: 'number',
      },
      attributes: {
        typeAttributes: [
          'optional',
        ],
      },
      content: {
        key: {
          element: 'string',
          content: 'count',
        },
        value: {
          element: 'string',
        },
      },
    },
    {
      element: 'member',
      meta: {
        description: 'возвратить N новостей, опубликованных после новости с id=xxx',
        title: 'string',
      },
      attributes: {
        typeAttributes: [
          'required',
        ],
      },
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
    },
  ],
};

export default hrefVariables;
