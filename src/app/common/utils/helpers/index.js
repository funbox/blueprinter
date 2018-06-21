const extractTransactionMethod = transition => (
  transition.content[0].content[0].attributes.method.content
);

export {
  extractTransactionMethod,
};
