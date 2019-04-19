import resource from './resource';

const resourceGroup = groupName => (
  {
    element: 'category',
    meta: {
      classes: [
        'resourceGroup',
      ],
      title: {
        element: 'string',
        content: groupName,
      },
    },
    content: [
      {
        element: 'copy',
        content: 'Resource Group content',
      },
      resource,
    ],
  }
);

export default [
  resourceGroup('Users Group'),
  resourceGroup('Senders Group'),
  resourceGroup('Templates Group'),
];
