import hrefVariables from './hrefVariables';

const actionBuilder = (title, content) => (
  {
    element: 'transition',
    meta: {
      title: {
        content: title,
      },
    },
    content: [
      { element: 'copy', content: 'Action description' },
      content,
    ],
    attributes: {
      href: {
        content: '/user',
      },
      hrefVariables,
    },
  }
);

export default actionBuilder;
