module.exports.source = `# My API

# Data Structures

## NormalResponse (object, fixed)
+ status: ok (required) - штатный ответ
`;

module.exports.parentElement = {
  element: 'dataStructure',
  content: { element: 'NormalResponse' },
};

module.exports.memberToCache = {
  element: 'NormalResponse',
  attributes: {
    typeAttributes: {
      element: 'array',
      content: [
        { element: 'string', content: 'required' },
      ],
    },
  },
};

module.exports.memberToObtain = {
  element: 'NormalResponse',
  attributes: {
    typeAttributes: {
      element: 'array',
      content: [
        { element: 'string', content: 'optional' },
      ],
    },
  },
};
