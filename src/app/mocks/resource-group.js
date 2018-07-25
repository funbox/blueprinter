import resource from './resource';

const resourceGroup = groupName => (
  {
    element: 'category',
    meta: {
      title: {
        content: groupName,
      },
      text: {
        content: 'Resource Group content',
      },
    },
    content: [resource, resource],
  }
);

export default [
  resourceGroup('Users Group'),
  resourceGroup('Senders Group'),
  resourceGroup('Templates Group'),
];
