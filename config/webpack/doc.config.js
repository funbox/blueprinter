const merge = require('webpack-merge');
const path = require('path');

const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

const { PATH } = require('./vars');

const config = merge(
  require('./build.config.js'),
  {
    name: 'doc',
    mode: 'production',
    optimization: {
      noEmitOnErrors: true,
      minimize: true,
    },
    output: {
      path: path.resolve(PATH.PROJECT, 'static'),
      publicPath: PATH.BASE,
      filename: '[name].[contenthash].js',
    },
    plugins: [
      new HtmlWebpackInlineSourcePlugin(),
    ],
  },
);

config.module.rules.forEach(rule => {
  if (rule.test.toString().includes('woff')) {
    rule.use.loader = 'base64-inline-loader?name=[name].[ext]';
  }
});

config.plugins.forEach(plugin => {
  if (plugin.constructor.name === 'HtmlWebpackPlugin') {
    plugin.options.inlineSource = '.(js|css)$';
  }
});

module.exports = config;
