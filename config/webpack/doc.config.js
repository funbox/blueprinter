const { merge } = require('webpack-merge');
const path = require('path');

const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { PATH } = require('./vars');

const config = merge(
  require('./build.config.js'),
  {
    name: 'doc',
    mode: 'production',
    optimization: {
      emitOnErrors: false,
    },
    output: {
      path: path.resolve(PATH.PROJECT, 'static'),
      publicPath: PATH.BASE,
      filename: '[name].[contenthash].js',
      uniqueName: 'blueprinter-frontend',
    },
    plugins: [
      new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin),
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
    plugin.userOptions.inlineSource = '.(js|css)$';
  }
});

module.exports = config;
