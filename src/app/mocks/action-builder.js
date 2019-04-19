import hrefVariables from './hrefVariables';

const actionBuilder = (title, content, id) => (
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
      href: {
        element: 'string',
        content: '/user',
      },
      hrefVariables,
    },
  }
);

export default actionBuilder;
