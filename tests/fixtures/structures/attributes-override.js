module.exports.source = `# My API

# Data Structures

## NewEmployeeMonitoring
+ kind: employee (string, required, fixed)

## NewZoneMonitoring (NewEmployeeMonitoring)
+ kind: zone (string, required, fixed)`;

module.exports.parentElement = {
  element: 'dataStructure',
  content: { element: 'NewZoneMonitoring' },
};

module.exports.processed = {
  element: 'object',
  content: [
    {
      element: 'member',
      content: {
        key: {
          element: 'string',
          content: 'kind',
        },
        value: {
          element: 'string',
          attributes: {
            typeAttributes: {
              element: 'array',
              content: [
                {
                  element: 'string',
                  content: 'fixed',
                },
              ],
            },
          },
          content: 'zone',
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
  ],
  referenceDataStructure: 'NewZoneMonitoring',
  usedStructuresHash: 467360436,
};
