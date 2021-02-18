module.exports.source = `
FORMAT: 1A
HOST: https://api.example.com

# My API

A plain text description`;

module.exports.processed = {
  topLevelMeta: {
    title: 'My API',
    description: 'A plain text description',
    host: ' https://api.example.com',
    warnings: [],
  },
  groups: [],
  resources: [],
  actions: [],
};
