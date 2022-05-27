const { merge } = require('webpack-merge');

module.exports = merge(
  require('./build.config'),
  {
    name: 'build-production',
    mode: 'production',
    plugins: [],
  },
);
