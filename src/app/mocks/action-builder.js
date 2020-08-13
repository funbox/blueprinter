import hrefVariables from './hrefVariables';

const actionBuilder = (title, content, id, method) => (
  {
    id,
    element: 'transition',
    meta: {
      title: {
        element: 'string',
        content: title,
      },
    },
    content: [
      {
        element: 'copy',
        content: 'Action description',
      },
      content,
    ],
    attributes: {
      href: '/user',
      hrefVariables,
      method,
    },
  }
);

export default actionBuilder;
