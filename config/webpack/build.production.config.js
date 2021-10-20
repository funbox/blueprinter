const { merge } = require('webpack-merge');

module.exports = merge(
  require('./build.config.js'),
  {
    name: 'build-production',
    mode: 'production',
    plugins: [],
  },
);
