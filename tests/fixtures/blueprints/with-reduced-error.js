module.exports.source = `# My API

It produces an error annotation without position details

# Data Structures

# A
+ member
+ Include A

# GET /

+ Response 200 (application/json)
    + Attributes (A)
`;

module.exports.processed = {
  topLevelMeta: {
    error: {
      text: "Base type 'A' circularly referencing itself",
      id: 0,
    },
    warnings: [],
  },
};
