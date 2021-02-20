module.exports.source = `# My API

# Schema Structures

# SchemaNamedType

+ Body

      {
          "test": "Hello"
      }

+ Schema

      {
          "$schema": "http://json-schema.org/draft-04/schema#",
          "type": "object",
          "properties": {
              "test": {
                  "type": "string"
              }
          }
      }
`;

module.exports.parentElement = {
  element: 'dataStructure',
  content: { element: 'SchemaNamedType' },
};

module.exports.processed = { element: 'schema type' };
