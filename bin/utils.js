function errMessage(message, error) {
  error.message = `${message}: ${error.message}`;
  return error;
}

function astHasError(parseResult) {
  const errorAnnotationIndex = parseResult.annotations.findIndex(anno => anno.type === 'error');
  if (errorAnnotationIndex > -1) {
    const anno = parseResult.annotations[errorAnnotationIndex];
    const { text } = anno;

    if (!anno.sourceMap) {
      return [true, { text }];
    }

    const position = anno.sourceMap.charBlocks[0];
    const file = anno.sourceMap.file;
    return [true, { text, position, file }];
  }
  return [false];
}

module.exports = {
  errMessage,
  astHasError,
};
