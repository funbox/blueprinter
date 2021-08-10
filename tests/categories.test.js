import Crafter from '@funbox/crafter';
import extractCategories from 'app/common/utils/helpers/extract-categories';

describe('extract-categories', () => {
  it('returns an empty categories set', () => {
    const categories = extractCategories();

    expect(categories).toBeDefined();
    expect(typeof categories).toBe('object');
    expect(categories.dataStructuresArray).toHaveLength(0);
    expect(categories.schemaStructuresArray).toHaveLength(0);
    expect(categories.resourceGroupArray).toHaveLength(0);
    expect(categories.resourcePrototypesArray).toHaveLength(0);
  });

  it('extracts data structures', async () => {
    const apib = `# My API

# Data Structures

## NamedType

+ foo (string)
+ bar (number)

## NamedString (string)
`;

    const [result] = await Crafter.parse(apib);
    const ast = result.toRefract();
    const content = ast.content[0].content;
    const categories = extractCategories(content);

    expect(categories.dataStructuresArray).toHaveLength(2);
    expect(categories.schemaStructuresArray).toHaveLength(0);
    expect(categories.resourceGroupArray).toHaveLength(0);
    expect(categories.resourcePrototypesArray).toHaveLength(0);

    expect(categories.dataStructuresArray[0]).toEqual({
      id: 'NamedType',
      element: 'dataStructure',
      content: {
        element: 'object',
        content: [
          {
            element: 'member',
            content: { key: { element: 'string', content: 'foo' }, value: { element: 'string' } },
          },
          {
            element: 'member',
            content: { key: { element: 'string', content: 'bar' }, value: { element: 'number' } },
          },
        ],
        meta: { id: { element: 'string', content: 'NamedType' } },
      },
    });
    expect(categories.dataStructuresArray[1]).toEqual({
      element: 'dataStructure',
      id: 'NamedString',
      content: {
        element: 'string',
        meta: { id: { element: 'string', content: 'NamedString' } },
      },
    });
  });

  it('extracts schema structures', async () => {
    const apib = `# My API

# Schema Structures

## Message

+ Body

      {}

+ Schema

      {}
`;

    const [result] = await Crafter.parse(apib);
    const ast = result.toRefract();
    const content = ast.content[0].content;
    const categories = extractCategories(content);

    expect(categories.dataStructuresArray).toHaveLength(0);
    expect(categories.schemaStructuresArray).toHaveLength(1);
    expect(categories.resourceGroupArray).toHaveLength(0);
    expect(categories.resourcePrototypesArray).toHaveLength(0);

    expect(categories.schemaStructuresArray[0]).toEqual({
      element: 'schemaStructure',
      meta: {
        id: { element: 'string', content: 'Message' },
      },
      content: [
        {
          element: 'asset',
          meta: {
            classes: {
              element: 'array',
              content: [
                { element: 'string', content: 'messageBody' },
              ],
            },
          },
          content: '{}\n',
        },
        {
          element: 'asset',
          meta: {
            classes: {
              element: 'array',
              content: [
                { element: 'string', content: 'messageBodySchema' },
              ],
            },
          },
          attributes: {
            contentType: { element: 'string', content: 'application/schema+json' },
          },
          content: '{}',
        },
      ],
    });
  });

  it('extracts resource groups', async () => {
    const apib = `# API name

# Group Users

## Users [/users]

# Group Payments

## Payments [/payments]`;

    const [result] = await Crafter.parse(apib);
    const ast = result.toRefract();
    const content = ast.content[0].content;
    const categories = extractCategories(content);

    expect(categories.dataStructuresArray).toHaveLength(0);
    expect(categories.schemaStructuresArray).toHaveLength(0);
    expect(categories.resourceGroupArray).toHaveLength(2);
    expect(categories.resourcePrototypesArray).toHaveLength(0);

    expect(categories.resourceGroupArray[0]).toEqual({
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
          content: 'Users',
        },
      },
      content: [
        {
          element: 'resource',
          attributes: {
            href: {
              element: 'string',
              content: '/users',
            },
          },
          content: [],
          meta: {
            title: {
              element: 'string',
              content: 'Users',
            },
          },
        },
      ],
    });

    expect(categories.resourceGroupArray[1]).toEqual({
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
          content: 'Payments',
        },
      },
      content: [
        {
          element: 'resource',
          attributes: {
            href: {
              element: 'string',
              content: '/payments',
            },
          },
          content: [],
          meta: {
            title: {
              element: 'string',
              content: 'Payments',
            },
          },
        },
      ],
    });
  });

  it('extracts resource prototypes', async () => {
    const apib = `# API name

# Resource Prototypes

## NotFound

+ Response 404

## NormalResponse

+ Response 200
`;

    const [result] = await Crafter.parse(apib);
    const ast = result.toRefract();
    const content = ast.content[0].content;
    const categories = extractCategories(content);

    expect(categories.dataStructuresArray).toHaveLength(0);
    expect(categories.schemaStructuresArray).toHaveLength(0);
    expect(categories.resourceGroupArray).toHaveLength(0);
    expect(categories.resourcePrototypesArray).toHaveLength(2);

    expect(categories.resourcePrototypesArray[0]).toEqual({
      element: 'resourcePrototype',
      meta: {
        id: {
          element: 'string',
          content: 'NotFound',
        },
      },
      content: [
        {
          element: 'httpResponse',
          content: [],
          attributes: {
            statusCode: {
              element: 'number',
              content: 404,
            },
          },
        },
      ],
    });

    expect(categories.resourcePrototypesArray[1]).toEqual({
      element: 'resourcePrototype',
      meta: {
        id: {
          element: 'string',
          content: 'NormalResponse',
        },
      },
      content: [
        {
          element: 'httpResponse',
          content: [],
          attributes: {
            statusCode: {
              element: 'number',
              content: 200,
            },
          },
        },
      ],
    });
  });

  it('extracts resources as a standalone group', async () => {
    const apib = `# API name

# Foo [/foo]

## Get foo [GET]

# Bar [/bar]

## Get bar [GET]

# /baz

## Get baz [GET]`;

    const [result] = await Crafter.parse(apib);
    const ast = result.toRefract();
    const content = ast.content[0].content;
    const categories = extractCategories(content);

    expect(categories.dataStructuresArray).toHaveLength(0);
    expect(categories.schemaStructuresArray).toHaveLength(0);
    expect(categories.resourceGroupArray).toHaveLength(1);
    expect(categories.resourcePrototypesArray).toHaveLength(0);
    expect(categories.resourceGroupArray[0].content).toBeDefined();
    expect(categories.resourceGroupArray[0].meta.title.content).toBe('Resource Group');

    const resources = categories.resourceGroupArray[0].content;

    expect(resources).toHaveLength(3);
    expect(resources[0]).toEqual({
      element: 'resource',
      attributes: {
        href: {
          element: 'string',
          content: '/foo',
        },
      },
      content: [
        {
          element: 'transition',
          content: [],
          meta: {
            title: {
              element: 'string',
              content: 'Get foo',
            },
          },
        },
      ],
      meta: {
        title: {
          element: 'string',
          content: 'Foo',
        },
      },
    });
    expect(resources[1]).toEqual({
      element: 'resource',
      attributes: {
        href: {
          element: 'string',
          content: '/bar',
        },
      },
      content: [
        {
          element: 'transition',
          content: [],
          meta: {
            title: {
              element: 'string',
              content: 'Get bar',
            },
          },
        },
      ],
      meta: {
        title: {
          element: 'string',
          content: 'Bar',
        },
      },
    });
    expect(resources[2]).toEqual({
      element: 'resource',
      attributes: {
        href: {
          element: 'string',
          content: '/baz',
        },
      },
      content: [
        {
          element: 'transition',
          content: [],
          meta: {
            title: {
              element: 'string',
              content: 'Get baz',
            },
          },
        },
      ],
    });
  });
});
