import uniqid from 'uniqid';
import transaction from './transaction';
import actionBuilder from './action-builder';

const getUsers = actionBuilder('List users', transaction(), uniqid.time(), 'GET');
const deleteUser = actionBuilder('Delete user', transaction(), uniqid.time(), 'DELETE');

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
  route: '/users-resource-content',
  nestedRoutePresets: [],
  title: 'Users resource content',
};

export const resourceWithNote = {
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
      content: '::: note\n\n## Extensions\n\nSome non-standard Markdown extensions are also supported, such as this informational container, which can also contain **formatting**. Features include:\n\n* Informational block fenced with `::: note` and `:::`\n\n* Warning block fenced with `::: warning` and `:::`\n\nThese extensions may change in the future as the [CommonMark specification](http://spec.commonmark.org/) defines a [standard extension syntax](https://github.com/jgm/CommonMark/wiki/Proposed-Extensions).\n:::\n\n::: warning\n\n## Caution\n\nIf the value for `title` or `body` is `null` or `undefined`, then the corresponding value is not modified on the server.\nHowever, if you send an empty string instead then it will **permanently overwrite** the original value.\n:::',
    },
  ],
  attributes: {
    href: {
      element: 'string',
      content: '/user',
    },
  },
};

export default resource;
