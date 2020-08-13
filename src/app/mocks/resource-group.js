import resource from './resource';

const generateRoute = str => str
  .split(' ')
  .map(item => item.toLowerCase())
  .join('-');

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
        ...resource,
      },
    ],
    route: `/${generateRoute(groupName)}`,
    nestedRoutePresets: [],
    title: groupName,
  }
);

export default [
  resourceGroup('Users Group'),
  resourceGroup('Senders Group'),
  resourceGroup('Templates Group'),
];
