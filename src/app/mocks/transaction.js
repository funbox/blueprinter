const transactionBuilder = (method) => (
  {
    element: 'httpTransaction',
    content: [
      {
        element: 'httpRequest',
        attributes: {
          method: {
            element: 'string',
            content: method,
          },
        },
        content: [],
      },
      {
        element: 'httpResponse',
        content: [],
        attributes: {
          statusCode: {
            element: 'string',
            content: '200',
          },
        },
      },
    ],
  }
);

export default {
  GET: transactionBuilder('GET'),
  POST: transactionBuilder('POST'),
  PATCH: transactionBuilder('PATCH'),
  DELETE: transactionBuilder('DELETE'),
};
