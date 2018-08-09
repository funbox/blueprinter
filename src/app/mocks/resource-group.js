import resource from './resource';

const resourceGroup = groupName => (
  {
    element: 'category',
    meta: {
      title: {
        content: groupName,
      },
    },
    content: [
      { element: 'copy', content: 'Resource Group content' },
      resource,
      resource,
    ],
  }
);

export default [
  resourceGroup('Users Group'),
  resourceGroup('Senders Group'),
  resourceGroup('Templates Group'),
];
