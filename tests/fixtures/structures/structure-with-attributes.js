module.exports.source = `# My API

# Data Structures

## NormalResponse (object, fixed)
+ status: ok (required) - штатный ответ
`;

module.exports.parentElement = {
  element: 'dataStructure',
  content: {
    element: 'NormalResponse',
    attributes: {
      typeAttributes: {
        element: 'array',
        content: [{ element: 'string', content: 'required' }],
      },
    },
  },
};

module.exports.processed = {
  element: 'object',
  attributes: {
    typeAttributes: {
      element: 'array',
      content: [
        {
          element: 'string',
          content: 'required',
        },
        {
          element: 'string',
          content: 'fixed',
        },
      ],
    },
  },
  content: [
    {
      element: 'member',
      content: {
        key: {
          element: 'string',
          content: 'status',
        },
        value: {
          element: 'string',
          content: 'ok',
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
          content: 'штатный ответ',
        },
      },
    },
  ],
  referenceDataStructure: 'NormalResponse',
};
