import uniqid from 'uniqid';
import Transaction from './transaction';
import actionBuilder from './action-builder';

const getUsers = actionBuilder('List users', Transaction.GET, uniqid.time());
const deleteUser = actionBuilder('Delete user', Transaction.DELETE, uniqid.time());

const resource = {
  element: 'resource',
  meta: {
    title: {
      element: 'string',
      content: 'Users',
    },
  },
  content: [
    {
      element: 'copy',
      content: 'Users resource content',
    },
    getUsers,
    deleteUser,
  ],
  attributes: {
    href: {
      element: 'string',
      content: '/user',
    },
  },
};

export default resource;
