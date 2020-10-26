const merge = require('webpack-merge');

const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Csso = require('csso-webpack-plugin').default;

module.exports = merge(
  require('./base.config.js'),
  {
    name: 'build',
    mode: 'none',
    module: {
      rules: [
        {
          test: /\.(js|jsx)?$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [require.resolve('@babel/preset-env'), {
                  useBuiltIns: 'entry',
                  corejs: 3,
                  targets: {
                    esmodules: true,
                  },
                }],
                require.resolve('@babel/preset-react'),
              ],
              plugins: [
                require.resolve('react-hot-loader/babel'),
                require.resolve('@babel/plugin-proposal-object-rest-spread'),
                require.resolve('@babel/plugin-proposal-class-properties'),
                require.resolve('@babel/plugin-transform-react-constant-elements'),
              ],
            },
          },
          exclude: /node_modules[\\/](?!(blueprinter-frontend)[\\/]).*/,
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
              loader: '@funbox/scss-imports-loader',
              options: {
                paths: require('../scss-imports'),
              },
            },
            '@funbox/scss-vars-loader',
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
  },
);
