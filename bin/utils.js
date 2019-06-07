const errMessage = (message, error) => {
  error.message = `${message}: ${error.message}`;
  return error;
};

const astHasError = (parseResult) => {
  const errorAnnotationIndex = parseResult.annotations.findIndex(anno => anno.type === 'error');
  if (errorAnnotationIndex > -1) {
    return [true, parseResult.annotations[errorAnnotationIndex].text];
  }
  return [false];
};

module.exports = {
  errMessage,
  astHasError,
};
