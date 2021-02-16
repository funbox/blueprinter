module.exports.source = `# My API

# Group WS /chat_messages

## SubGroup chat:1234

### Message ServerToClientMessage NewParticipant

+ Attributes
    + name (string, required)
`;

module.exports.parentElement = {
  title: 'chat:1234',
  href: null,
  hashForLegacyUrl: 'ws-/chat_messages-chat:1234',
  route: '/group-ws-chat_messages/resource-chat:1234-6e9bc589',
};

module.exports.processed = {
  element: 'message',
  meta: {
    title: {
      element: 'string',
      content: 'ServerToClientMessage NewParticipant',
    },
  },
  type: 'message',
  description: null,
  attributes: [
    {
      element: 'member',
      content: {
        key: {
          element: 'string',
          content: 'name',
        },
        value: {
          element: 'string',
          attributes: {
            typeAttributes: {
              content: [
                {
                  element: 'string',
                  content: 'non-nullable',
                },
              ],
              element: 'array',
            },
          },
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
  body: '{\n  "name": "hello"\n}',
  schema: '{\n  "$schema": "http://json-schema.org/draft-04/schema#",\n  "type": "object",\n  "properties": {\n    "name": {\n      "type": "string"\n    }\n  },\n  "required": [\n    "name"\n  ]\n}',
  hashForLegacyUrl: 'ws-/chat_messages-chat:1234-servertoclientmessage-newparticipant',
  route: '/group-ws-chat_messages/resource-chat:1234-6e9bc589/message-servertoclientmessage-newparticipant',
  title: 'ServerToClientMessage NewParticipant',
  routePreset: null,
  nestedRoutePresets: [],
};
