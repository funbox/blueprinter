/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');

const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Csso = require('csso-webpack-plugin').default;

module.exports = merge(
  require('./base.config'),
  {
    name: 'build',
    mode: 'none',
    module: {
      rules: [
        {
          test: /\.(js|jsx)?$/,
          use: {
            loader: 'babel-loader',
          },
          exclude: /node_modules[\\/](?!(blueprinter)[\\/]).*/,
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  require('postcss-url')({
                    url: 'inline',
                    maxSize: 3,
                  }),
                  require('autoprefixer'),
                ],
              },
            },
            'resolve-url-loader',
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  includePaths: [path.resolve('src')],
                },
              },
            },
            {
              loader: '@funboxteam/scss-imports-loader',
              options: {
                paths: require('../scss-imports'),
              },
            },
            '@funboxteam/scss-vars-loader',
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash:16].css',
      }),
      new Csso(),
    ],
    stats: {
      children: false,
    },
  },
);
