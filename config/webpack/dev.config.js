/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');

const { merge } = require('webpack-merge');

module.exports = merge(
  require('./base.config'),
  {
    name: 'dev',
    mode: 'development',
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
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
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
                sourceMap: true,
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
    devServer: {
      host: '0.0.0.0',
      port: 8080,
      historyApiFallback: true,
      hot: true,
    },
  },
);
