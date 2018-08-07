import hrefVariables from './hrefVariables';

const actionBuilder = (title, content) => (
  {
    element: 'transition',
    meta: {
      title: {
        content: title,
      },
      text: {
        content: 'Action description',
      },
    },
    content: [content],
    attributes: {
      href: {
        content: '/user',
      },
      hrefVariables,
    },
  }
);

export default actionBuilder;
