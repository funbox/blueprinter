module.exports.source = `# My API

# Get test [GET /test]

+ Response 200
    + Attributes
        + arr (array[string], fixed-type)

+ Response 200
    + Attributes(User) - unacceptable description
`;

module.exports.processed = {
  topLevelMeta: {
    error: {
      text: 'Invalid Attributes signature. Expected format: "Attributes (Type Definition)".',
      positionDetails: {
        line: 10,
        column: 7,
      },
      id: 0,
    },
    warnings: [
      {
        text: 'fixed-type keyword is redundant',
        positionDetails: {
          line: 7,
          column: 9,
        },
        id: 0,
      },
    ],
  },
};
