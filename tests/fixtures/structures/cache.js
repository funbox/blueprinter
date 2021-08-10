module.exports.source = `# My API

# Data Structures

## NormalResponse (object, fixed)
+ status: ok (required) - штатный ответ

## Base Response (object)
+ status: OK (required, fixed) - успешный результат
+ result (optional, object) - объект с данными

## Response A (object)
+ client_id (enum[string], optional)
  + Members
    + web

## Response B (object)
+ timestamp: \`1560513461\` (number, required)
+ body: \`Завтра +5, возможны цунами\` (string, required)

## Response C (object)
+ msisdn: 79251112233 (number, required)
+ status: \`subscribed\` (string, required)
`;

module.exports.memberWithReference = {
  element: 'object',
  content: [
    {
      element: 'member',
      content: {
        key: { element: 'string', content: 'status' },
        value: { element: 'string' },
      },
    },
  ],
  referenceDataStructure: 'NormalResponse',
};

module.exports.memberWithReferenceAndOwnStructure = {
  element: 'object',
  content: [
    {
      element: 'member',
      content: {
        key: { element: 'string', content: 'status' },
        value: { element: 'string' },
      },
    },
    {
      element: 'member',
      content: {
        key: { element: 'string', content: 'result' },
        value: { element: 'object' },
      },
    },
    {
      element: 'member',
      content: {
        key: { element: 'string', content: 'total' },
        value: { element: 'number' },
      },
    },
  ],
  referenceDataStructure: 'NormalResponse',
};

module.exports.memberWithoutReference = {
  element: 'string',
  content: 'hello',
};

module.exports.memberWithResponseA = {
  element: 'Base Response',
  content: [
    {
      element: 'member',
      content: {
        key: {
          element: 'string',
          content: 'result',
        },
        value: {
          element: 'Response A',
        },
      },
    },
  ],
};

module.exports.memberWithResponseB = {
  element: 'Base Response',
  content: [
    {
      element: 'member',
      content: {
        key: {
          element: 'string',
          content: 'result',
        },
        value: {
          element: 'array',
          content: [
            {
              element: 'Response B',
            },
          ],
        },
      },
    },
  ],
};

module.exports.memberWithResponseC = {
  element: 'Base Response',
  content: [
    {
      element: 'member',
      content: {
        key: {
          element: 'string',
          content: 'result',
        },
        value: {
          element: 'Response C',
        },
      },
    },
  ],
};
