/**
 * Конфигурация Webpack для сборки приложения.
 */
module.exports = require('./webpack.app.config')({
  build: true,
  test: false,
  skipUglify: true,
});
