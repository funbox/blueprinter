module.exports.source = `# My API

# Group WS /chat_messages

## Message ClientToServerMessage
+ Attributes
  + text: Hello (string, required) - message text

## SubGroup chat:1234

Block description of the channel with id "1234"

## Message ServerToClientMessage NewParticipant
Notification about a new user being added to the channel
+ Attributes
    + name: John (string, required) - user name
`;

module.exports.processed = {
  topLevelMeta: {
    title: 'My API',
    description: null,
    host: null,
    warnings: [],
  },
  groups: [
    {
      element: 'category',
      meta: {
        classes: {
          element: 'array',
          content: [
            {
              element: 'string',
              content: 'resourceGroup',
            },
          ],
        },
        title: {
          element: 'string',
          content: 'WS /chat_messages',
        },
      },
      content: [
        {
          id: 0,
          element: 'message',
          meta: {
            title: {
              element: 'string',
              content: 'ClientToServerMessage',
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
                  content: 'text',
                },
                value: {
                  element: 'string',
                  attributes: {
                    samples: {
                      element: 'array',
                      content: [
                        {
                          element: 'string',
                          content: 'Hello',
                        },
                      ],
                    },
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
              meta: {
                description: {
                  element: 'string',
                  content: 'message text',
                },
              },
            },
          ],
          body: '{\n  "text": "Hello"\n}',
          schema: '{\n  "$schema": "http://json-schema.org/draft-04/schema#",\n  "type": "object",\n  "properties": {\n    "text": {\n      "type": "string",\n      "description": "message text"\n    }\n  },\n  "required": [\n    "text"\n  ]\n}',
          hashForLegacyUrl: 'ws-/chat_messages-clienttoservermessage',
          route: '/group-ws-chat_messages/message-clienttoservermessage',
          title: 'ClientToServerMessage',
          routePreset: null,
          nestedRoutePresets: [],
          parentGroup: {
            title: 'WS /chat_messages',
            hashForLegacyUrl: 'ws-/chat_messages',
            route: '/group-ws-chat_messages',
          },
        },
        {
          element: 'category',
          meta: {
            classes: {
              element: 'array',
              content: [
                {
                  element: 'string',
                  content: 'subGroup',
                },
              ],
            },
            title: {
              element: 'string',
              content: 'chat:1234',
            },
          },
          content: [
            {
              element: 'copy',
              content: 'Block description of the channel with id "1234"',
            },
            {
              id: 0,
              element: 'message',
              meta: {
                title: {
                  element: 'string',
                  content: 'ServerToClientMessage NewParticipant',
                },
              },
              type: 'message',
              description: 'Notification about a new user being added to the channel',
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
                        samples: {
                          element: 'array',
                          content: [
                            {
                              element: 'string',
                              content: 'John',
                            },
                          ],
                        },
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
                  meta: {
                    description: {
                      element: 'string',
                      content: 'user name',
                    },
                  },
                },
              ],
              body: '{\n  "name": "John"\n}',
              schema: '{\n  "$schema": "http://json-schema.org/draft-04/schema#",\n  "type": "object",\n  "properties": {\n    "name": {\n      "type": "string",\n      "description": "user name"\n    }\n  },\n  "required": [\n    "name"\n  ]\n}',
              hashForLegacyUrl: 'ws-/chat_messages-chat:1234-servertoclientmessage-newparticipant',
              route: '/group-ws-chat_messages/resource-chat:1234-6e9bc589/message-servertoclientmessage-newparticipant',
              title: 'ServerToClientMessage NewParticipant',
              routePreset: null,
              nestedRoutePresets: [],
              parentResource: {
                title: 'chat:1234',
                href: null,
                hashForLegacyUrl: 'ws-/chat_messages-chat:1234',
                route: '/group-ws-chat_messages/resource-chat:1234-6e9bc589',
                group: {
                  title: 'WS /chat_messages',
                  hashForLegacyUrl: 'ws-/chat_messages',
                  route: '/group-ws-chat_messages',
                },
              },
            },
          ],
          id: 0,
          nestedRoutePresets: [],
          hashForLegacyUrl: 'ws-/chat_messages-chat:1234',
          route: '/group-ws-chat_messages/resource-chat:1234-6e9bc589',
          title: 'chat:1234',
          parentGroup: {
            title: 'WS /chat_messages',
            hashForLegacyUrl: 'ws-/chat_messages',
            route: '/group-ws-chat_messages',
          },
        },
      ],
      hashForLegacyUrl: 'ws-/chat_messages',
      route: '/group-ws-chat_messages',
      title: 'WS /chat_messages',
      id: 0,
      nestedRoutePresets: [],
    },
  ],
  resources: [
    {
      id: 0,
      element: 'message',
      meta: {
        title: {
          element: 'string',
          content: 'ClientToServerMessage',
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
              content: 'text',
            },
            value: {
              element: 'string',
              attributes: {
                samples: {
                  element: 'array',
                  content: [
                    {
                      element: 'string',
                      content: 'Hello',
                    },
                  ],
                },
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
          meta: {
            description: {
              element: 'string',
              content: 'message text',
            },
          },
        },
      ],
      body: '{\n  "text": "Hello"\n}',
      schema: '{\n  "$schema": "http://json-schema.org/draft-04/schema#",\n  "type": "object",\n  "properties": {\n    "text": {\n      "type": "string",\n      "description": "message text"\n    }\n  },\n  "required": [\n    "text"\n  ]\n}',
      hashForLegacyUrl: 'ws-/chat_messages-clienttoservermessage',
      route: '/group-ws-chat_messages/message-clienttoservermessage',
      title: 'ClientToServerMessage',
      routePreset: null,
      nestedRoutePresets: [],
      parentGroup: {
        title: 'WS /chat_messages',
        hashForLegacyUrl: 'ws-/chat_messages',
        route: '/group-ws-chat_messages',
      },
    },
    {
      element: 'category',
      meta: {
        classes: {
          element: 'array',
          content: [
            {
              element: 'string',
              content: 'subGroup',
            },
          ],
        },
        title: {
          element: 'string',
          content: 'chat:1234',
        },
      },
      content: [
        {
          element: 'copy',
          content: 'Block description of the channel with id "1234"',
        },
        {
          id: 0,
          element: 'message',
          meta: {
            title: {
              element: 'string',
              content: 'ServerToClientMessage NewParticipant',
            },
          },
          type: 'message',
          description: 'Notification about a new user being added to the channel',
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
                    samples: {
                      element: 'array',
                      content: [
                        {
                          element: 'string',
                          content: 'John',
                        },
                      ],
                    },
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
              meta: {
                description: {
                  element: 'string',
                  content: 'user name',
                },
              },
            },
          ],
          body: '{\n  "name": "John"\n}',
          schema: '{\n  "$schema": "http://json-schema.org/draft-04/schema#",\n  "type": "object",\n  "properties": {\n    "name": {\n      "type": "string",\n      "description": "user name"\n    }\n  },\n  "required": [\n    "name"\n  ]\n}',
          hashForLegacyUrl: 'ws-/chat_messages-chat:1234-servertoclientmessage-newparticipant',
          route: '/group-ws-chat_messages/resource-chat:1234-6e9bc589/message-servertoclientmessage-newparticipant',
          title: 'ServerToClientMessage NewParticipant',
          routePreset: null,
          nestedRoutePresets: [],
          parentResource: {
            title: 'chat:1234',
            href: null,
            hashForLegacyUrl: 'ws-/chat_messages-chat:1234',
            route: '/group-ws-chat_messages/resource-chat:1234-6e9bc589',
            group: {
              title: 'WS /chat_messages',
              hashForLegacyUrl: 'ws-/chat_messages',
              route: '/group-ws-chat_messages',
            },
          },
        },
      ],
      id: 0,
      nestedRoutePresets: [],
      hashForLegacyUrl: 'ws-/chat_messages-chat:1234',
      route: '/group-ws-chat_messages/resource-chat:1234-6e9bc589',
      title: 'chat:1234',
      parentGroup: {
        title: 'WS /chat_messages',
        hashForLegacyUrl: 'ws-/chat_messages',
        route: '/group-ws-chat_messages',
      },
    },
  ],
  actions: [
    {
      id: 0,
      element: 'message',
      meta: {
        title: {
          element: 'string',
          content: 'ServerToClientMessage NewParticipant',
        },
      },
      type: 'message',
      description: 'Notification about a new user being added to the channel',
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
                samples: {
                  element: 'array',
                  content: [
                    {
                      element: 'string',
                      content: 'John',
                    },
                  ],
                },
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
          meta: {
            description: {
              element: 'string',
              content: 'user name',
            },
          },
        },
      ],
      body: '{\n  "name": "John"\n}',
      schema: '{\n  "$schema": "http://json-schema.org/draft-04/schema#",\n  "type": "object",\n  "properties": {\n    "name": {\n      "type": "string",\n      "description": "user name"\n    }\n  },\n  "required": [\n    "name"\n  ]\n}',
      hashForLegacyUrl: 'ws-/chat_messages-chat:1234-servertoclientmessage-newparticipant',
      route: '/group-ws-chat_messages/resource-chat:1234-6e9bc589/message-servertoclientmessage-newparticipant',
      title: 'ServerToClientMessage NewParticipant',
      routePreset: null,
      nestedRoutePresets: [],
      parentResource: {
        title: 'chat:1234',
        href: null,
        hashForLegacyUrl: 'ws-/chat_messages-chat:1234',
        route: '/group-ws-chat_messages/resource-chat:1234-6e9bc589',
        group: {
          title: 'WS /chat_messages',
          hashForLegacyUrl: 'ws-/chat_messages',
          route: '/group-ws-chat_messages',
        },
      },
    },
  ],
};
