import objectAttribute from './object-attribute';
import arrayAttribute from './array-attribute';
import complexObject from './complex-object';
import arrayOfObjects from './array-of-objects';

export default [
  {
    element: 'member',
    content: {
      key: {
        element: 'string',
        content: 'name',
      },
      value: {
        element: 'string',
        content: 'John',
      },
    },
    meta: {
      description: {
        element: 'string',
        content: 'User name',
      },
    },
    attributes: {
      typeAttributes: [
        {
          element: 'string',
          content: 'required',
        },
      ],
    },
  },
  {
    element: 'member',
    content: {
      key: {
        element: 'string',
        content: 'email',
      },
      value: {
        element: 'string',
        content: 'admin@localhost',
      },
    },
    attributes: {
      typeAttributes: [
        {
          element: 'string',
          content: 'optional',
        },
      ],
    },
  },
  {
    element: 'member',
    content: {
      key: {
        element: 'string',
        content: 'age',
      },
      value: {
        element: 'number',
        content: '42',
      },
    },
  },
  objectAttribute,
  arrayAttribute,
  complexObject,
  arrayOfObjects,
];
