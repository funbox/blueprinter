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
  attributes: {
    href: {
      content: '/user',
    },
  },
};

export default resource;
