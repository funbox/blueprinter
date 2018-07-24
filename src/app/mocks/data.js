import Transaction from './transaction';
import actionBuilder from './action-builder';

const getUsers = actionBuilder('List users', Transaction.GET);
const deleteUser = actionBuilder('Delete user', Transaction.DELETE);

const resource = {
  element: 'resource',
  meta: {
    title: {
      content: 'Users',
    },
    text: {
      content: 'Users resource content',
    },
  },
  content: [getUsers, deleteUser],
};

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
  resource,
];
