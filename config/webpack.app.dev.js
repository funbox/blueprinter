/**
 * Конфигурация Webpack для сборки окружения разработки приложения.
 */
module.exports = require('./webpack.app.config')({
  build: false,
  test: false,
  skipUglify: true,
  disableCssExtracting: true,
});
