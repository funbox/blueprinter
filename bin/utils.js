const errMessage = (message, error) => {
  error.message = `${message}: ${error.message}`;
  return error;
};

module.exports = {
  errMessage,
};
