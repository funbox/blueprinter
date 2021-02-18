module.exports.source = `# My API

# User [/user]

## GET (ResourceNotFound)

+ Response 200 (application/json)
`;

module.exports.processed = {
  topLevelMeta: {
    error: {
      text: 'Unknown resource prototype "ResourceNotFound"',
      positionDetails: {
        line: 5,
        column: 1,
      },
      id: 0,
    },
    warnings: [],
  },
};
