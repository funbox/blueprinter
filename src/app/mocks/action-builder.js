const actionBuilder = (title, content) => (
  {
    element: 'transition',
    meta: {
      title: {
        content: title,
      },
    },
    content: [content],
  }
);

export default actionBuilder;
