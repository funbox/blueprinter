import Crafter from '@funbox/crafter';
import InheritanceResolver from 'app/common/utils/helpers/inheritance-resolver';
import extractCategories from 'app/common/utils/helpers/extract-categories';

describe('Inheritance resolver', () => {
  it('can be instantiated', () => {
    const resolver = new InheritanceResolver();
    expect(resolver).toBeInstanceOf(InheritanceResolver);
  });

  it('resolves inheritance from a data structure', async () => {
    const apib = `# My API

# Data Structures

# User

+ name: John (string, required) - user name
+ email
+ phone
+ age (number)
`;

    const categories = await getCategories(apib);
    const valueMember = { element: 'User' };
    const parent = {
      element: 'dataStructure',
      content: valueMember,
    };
    const resolver = new InheritanceResolver(categories);

    resolver.resolveInheritance(valueMember, parent);

    expect(valueMember).toEqual({
      element: 'object',
      content: [
        {
          element: 'member',
          content: {
            key: { element: 'string', content: 'name' },
            value: {
              element: 'string',
              attributes: {
                samples: {
                  element: 'array',
                  content: [{ element: 'string', content: 'John' }],
                },
              },
            },
          },
          attributes: {
            typeAttributes: {
              element: 'array',
              content: [{ element: 'string', content: 'required' }],
            },
          },
          meta: {
            description: { element: 'string', content: 'user name' },
          },
        },
        {
          element: 'member',
          content: {
            key: { element: 'string', content: 'email' },
            value: { element: 'string' },
          },
        },
        {
          element: 'member',
          content: {
            key: { element: 'string', content: 'phone' },
            value: { element: 'string' },
          },
        },
        {
          element: 'member',
          content: {
            key: { element: 'string', content: 'age' },
            value: { element: 'number' },
          },
        },
      ],
      referenceDataStructure: 'User',
    });
  });

  it('resolves inheritance from a schema structure', async () => {
    const apib = `
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

    const categories = await getCategories(apib);
    const valueMember = { element: 'SchemaNamedType' };
    const parent = {
      element: 'dataStructure',
      content: valueMember,
    };
    const resolver = new InheritanceResolver(categories);

    resolver.resolveInheritance(valueMember, parent);

    expect(valueMember).toEqual({ element: 'schema type' });
  });

  it('resolves nested inheritance', async () => {
    const apib = `
# My API

# Data Structures

## ArrayType (array)
+ example (string)

## ArrayTypeExtended (ArrayType)
+ (object)
   + id (number)
   + name (string)
`;

    const categories = await getCategories(apib);
    const valueMember = { element: 'ArrayTypeExtended' };
    const parent = {
      element: 'dataStructure',
      content: valueMember,
    };
    const resolver = new InheritanceResolver(categories);

    resolver.resolveInheritance(valueMember, parent);

    expect(valueMember).toEqual({
      element: 'array',
      content: [
        {
          element: 'string',
          content: 'example',
        },
        {
          element: 'object',
          content: [
            {
              element: 'member',
              content: {
                key: { element: 'string', content: 'id' },
                value: { element: 'number' },
              },
            },
            {
              element: 'member',
              content: {
                key: { element: 'string', content: 'name' },
                value: { element: 'string' },
              },
            },
          ],
        },
      ],
      referenceDataStructure: 'ArrayTypeExtended',
    });
  });

  it('resolves inheritance from a mixin', async () => {
    const apib = `# My API

Defines attributes using mixin.

# Data Structures

# User

+ name: John (string, required) - user name

# Admin

+ accessLevel: all (string, required)
`;

    const categories = await getCategories(apib);
    const valueMember = {
      element: 'User',
      content: [
        {
          element: 'ref',
          attributes: { path: { element: 'string', content: 'content' } },
          content: 'Admin',
        },
      ],
    };
    const parent = {
      element: 'dataStructure',
      content: valueMember,
    };
    const resolver = new InheritanceResolver(categories);

    resolver.resolveInheritance(valueMember, parent);

    expect(valueMember).toEqual({
      element: 'object',
      content: [
        {
          element: 'member',
          content: {
            key: { element: 'string', content: 'name' },
            value: {
              element: 'string',
              attributes: {
                samples: {
                  element: 'array',
                  content: [{ element: 'string', content: 'John' }],
                },
              },
            },
          },
          attributes: {
            typeAttributes: {
              element: 'array',
              content: [{ element: 'string', content: 'required' }],
            },
          },
          meta: {
            description: { element: 'string', content: 'user name' },
          },
        },
        {
          element: 'member',
          content: {
            key: { element: 'string', content: 'accessLevel' },
            value: {
              element: 'string',
              attributes: {
                samples: {
                  element: 'array',
                  content: [{ element: 'string', content: 'all' }],
                },
              },
            },
          },
          attributes: {
            typeAttributes: {
              element: 'array',
              content: [{ element: 'string', content: 'required' }],
            },
          },
        },
      ],
      referenceDataStructure: 'User',
    });
  });

  it('resolves inheritance from an enum structure', async () => {
    const apib = `# My API

# Data Structures

## Post Code (enum)

+ Include East Code

## East Code (enum)

+ EC2A
+ E1
`;

    const categories = await getCategories(apib);
    const parent = {
      element: 'dataStructure',
      content: {
        element: 'object',
        content: [
          {
            element: 'member',
            content: {
              key: {
                element: 'string',
                content: 'code',
              },
              value: {
                element: 'Post Code',
              },
            },
          },
        ],
      },
    };
    const valueMember = parent.content;
    const resolver = new InheritanceResolver(categories);

    resolver.resolveInheritance(valueMember, parent);

    expect(valueMember).toEqual({
      element: 'object',
      content: [
        {
          element: 'member',
          content: {
            key: {
              element: 'string',
              content: 'code',
            },
            value: {
              element: 'enum',
              attributes: {
                enumerations: {
                  content: [
                    {
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
                      content: 'EC2A',
                    },
                    {
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
                      content: 'E1',
                    },
                  ],
                },
              },
            },
          },
        },
      ],
    });
  });

  it('manages a simple recursive value member', async () => {
    const apib = `
# My API

# Data Structures

## DNSServer
+ address (string, required)
+ parent (DNSServer, nullable)
`;

    const categories = await getCategories(apib);
    const valueMember = { element: 'DNSServer' };
    const parent = {
      element: 'dataStructure',
      content: valueMember,
    };
    const resolver = new InheritanceResolver(categories);

    resolver.resolveInheritance(valueMember, parent);

    expect(valueMember).toEqual({
      element: 'object',
      content: [
        {
          element: 'member',
          content: {
            key: { element: 'string', content: 'address' },
            value: { element: 'string' },
          },
          attributes: {
            typeAttributes: {
              element: 'array',
              content: [{ element: 'string', content: 'required' }],
            },
          },
        },
        {
          element: 'member',
          content: {
            key: { element: 'string', content: 'parent' },
            value: {
              element: 'DNSServer',
              attributes: {
                typeAttributes: {
                  element: 'array',
                  content: [{ element: 'string', content: 'nullable' }],
                },
              },
              recursive: true,
            },
          },
        },
      ],
      referenceDataStructure: 'DNSServer',
      recursive: true,
    });
  });

  it('manages a deep recursive value member', async () => {
    const apib = `
# My API

# Data Structures

## DNSSettings
+ parent (DNSServerWithSettings, required, nullable)

## DNSServerWithSettings
+ address (string, required)
+ settings (DNSSettings)
`;

    const categories = await getCategories(apib);
    const valueMember = { element: 'DNSServerWithSettings' };
    const parent = {
      element: 'dataStructure',
      content: valueMember,
    };
    const resolver = new InheritanceResolver(categories);

    resolver.resolveInheritance(valueMember, parent);

    expect(valueMember).toEqual({
      element: 'object',
      content: [
        {
          element: 'member',
          content: {
            key: { element: 'string', content: 'address' },
            value: { element: 'string' },
          },
          attributes: {
            typeAttributes: {
              element: 'array',
              content: [{ element: 'string', content: 'required' }],
            },
          },
        },
        {
          element: 'member',
          content: {
            key: {
              element: 'string',
              content: 'settings',
            },
            value: {
              element: 'object',
              content: [
                {
                  element: 'member',
                  content: {
                    key: { element: 'string', content: 'parent' },
                    value: {
                      element: 'DNSServerWithSettings',
                      attributes: {
                        typeAttributes: {
                          element: 'array',
                          content: [{ element: 'string', content: 'nullable' }],
                        },
                      },
                      recursive: true,
                    },
                  },
                  attributes: {
                    typeAttributes: {
                      element: 'array',
                      content: [{ element: 'string', content: 'required' }],
                    },
                  },
                },
              ],
              referenceDataStructure: 'DNSSettings',
            },
          },
        },
      ],
      referenceDataStructure: 'DNSServerWithSettings',
      recursive: true,
    });
  });

  it('saves data structure attributes', async () => {
    const apib = `# My API

# Data Structures

## NormalResponse (object, fixed)
+ status: ok (required) - штатный ответ
`;

    const categories = await getCategories(apib);
    const parent = {
      element: 'dataStructure',
      content: {
        element: 'NormalResponse',
        attributes: {
          typeAttributes: {
            element: 'array',
            content: [{ element: 'string', content: 'required' }],
          },
        },
      },
    };
    const valueMember = parent.content;
    const resolver = new InheritanceResolver(categories);

    resolver.resolveInheritance(valueMember, parent);

    expect(valueMember).toEqual({
      element: 'object',
      attributes: {
        typeAttributes: {
          element: 'array',
          content: [
            {
              element: 'string',
              content: 'required',
            },
            {
              element: 'string',
              content: 'fixed',
            },
          ],
        },
      },
      content: [
        {
          element: 'member',
          content: {
            key: {
              element: 'string',
              content: 'status',
            },
            value: {
              element: 'string',
              content: 'ok',
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
              content: 'штатный ответ',
            },
          },
        },
      ],
      referenceDataStructure: 'NormalResponse',
    });
  });

  it('can cache member with referenced data structure', async () => {
    const apib = `# My API

# Data Structures

## NormalResponse (object, fixed)
+ status: ok (required) - штатный ответ
`;

    const categories = await getCategories(apib);
    const resolver = new InheritanceResolver(categories);
    const member = {
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

    resolver.cacheDataStructure(member);

    expect(resolver.cachedDataStructures.size).toBe(1); // TODO: по-хорошему, cachedDataStructures — приватное поле и к нему нельзя обращаться
  });

  it('a member without referenced data structure cannot be cached', async () => {
    const apib = `# My API

# Data Structures

## NormalResponse (object, fixed)
+ status: ok (required) - штатный ответ
`;

    const categories = await getCategories(apib);
    const resolver = new InheritanceResolver(categories);
    const member = {
      element: 'string',
      content: 'hello',
    };

    resolver.cacheDataStructure(member);

    expect(resolver.cachedDataStructures.size).toBe(0);
  });

  it('cached member can be obtained', async () => {
    const apib = `# My API

# Data Structures

## NormalResponse (object, fixed)
+ status: ok (required) - штатный ответ
`;

    const categories = await getCategories(apib);
    const resolver = new InheritanceResolver(categories);
    const member = {
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

    resolver.cacheDataStructure(member);

    const cached = resolver.getCachedDataStructure(member);

    expect(cached).toBe(member);
  });

  it('accounts members attributes when caching', async () => {
    const apib = `# My API

# Data Structures

## NormalResponse (object, fixed)
+ status: ok (required) - штатный ответ
`;

    const categories = await getCategories(apib);
    const resolver = new InheritanceResolver(categories);
    const member = {
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
      attributes: {
        typeAttributes: {
          element: 'array',
          content: [{ element: 'string', content: 'required' }],
        },
      },
      referenceDataStructure: 'NormalResponse',
    };
    const memberToCache = {
      ...member,
      attributes: {
        typeAttributes: {
          element: 'array',
          content: [{ element: 'string', content: 'required' }],
        },
      },
    };
    const memberToObtain = {
      ...member,
      attributes: {
        typeAttributes: {
          element: 'array',
          content: [{ element: 'string', content: 'optional' }],
        },
      },
    };

    resolver.cacheDataStructure(memberToCache);

    const cached = resolver.getCachedDataStructure(memberToObtain);

    expect(cached).toBeNull();
  });

  it('handles attributes override', async () => {
    const apib = `# My API

# Data Structures

## NewEmployeeMonitoring
+ kind: employee (string, required, fixed)

## NewZoneMonitoring (NewEmployeeMonitoring)
+ kind: zone (string, required, fixed)`;

    const categories = await getCategories(apib);
    const valueMember = { element: 'NewZoneMonitoring' };
    const parent = {
      element: 'dataStructure',
      content: { element: 'NewZoneMonitoring' },
    };
    const resolver = new InheritanceResolver(categories);

    resolver.resolveInheritance(valueMember, parent);

    expect(valueMember).toEqual({
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
    });
  });

  it('can inherit type attributes from a primitive data structure', async () => {
    const apib = `# My API

# Data Structures

# Age (number, minimum="18", maximum="100")`;

    const categories = await getCategories(apib);
    const valueMember = {
      element: 'object',
      content: [
        {
          element: 'member',
          content: {
            key: {
              element: 'string',
              content: 'age',
            },
            value: {
              element: 'Age',
            },
          },
        },
      ],
    };
    const parent = {
      element: 'dataStructure',
      content: valueMember,
    };
    const resolver = new InheritanceResolver(categories);

    resolver.resolveInheritance(valueMember, parent);

    expect(valueMember).toEqual({
      element: 'object',
      content: [
        {
          element: 'member',
          content: {
            key: {
              element: 'string',
              content: 'age',
            },
            value: {
              element: 'number',
              attributes: {
                typeAttributes: {
                  element: 'array',
                  content: [
                    {
                      element: 'member',
                      content: {
                        key: {
                          element: 'string',
                          content: 'minimum',
                        },
                        value: {
                          element: 'string',
                          content: 18,
                        },
                      },
                    },
                    {
                      element: 'member',
                      content: {
                        key: {
                          element: 'string',
                          content: 'maximum',
                        },
                        value: {
                          element: 'string',
                          content: 100,
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      ],
    });
  });
});

async function getCategories(apib) {
  const [result] = await Crafter.parse(apib);
  const ast = result.toRefract();
  const content = ast.content[0].content;

  return extractCategories(content);
}
