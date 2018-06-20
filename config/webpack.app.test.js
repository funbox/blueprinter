/**
 * Webpack config for tests
 */
module.exports = require('./webpack.app.config')({
  build: false,
  test: true,
});
