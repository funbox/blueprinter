/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const path = require('path');

const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');
const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin').default;

const { PATH } = require('./vars');

const config = merge(
  require('./build.config'),
  {
    name: 'doc',
    mode: 'production',
    optimization: {
      emitOnErrors: false,
    },
    bail: true,
    output: {
      path: path.resolve(PATH.PROJECT, 'static'),
      publicPath: PATH.BASE,
      filename: '[name].[contenthash].js',
      uniqueName: 'blueprinter',
    },
    plugins: [
      new HtmlInlineScriptPlugin({
        scriptMatchPattern: [/vendor.+\.js$/, /app.+\.js$/],
      }),
      new HTMLInlineCSSWebpackPlugin(),
    ],
  },
);

config.module.rules.forEach(rule => {
  if (rule.test.toString().includes('woff')) {
    rule.use.loader = 'base64-inline-loader?name=[name].[ext]';
  }
});

module.exports = config;
