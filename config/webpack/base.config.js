/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const path = require('path');

const { CleanWebpackPlugin: Clean } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { ENV, PATH } = require('./vars');

module.exports = {
  name: 'base',
  mode: 'none',
  entry: {
    app: [
      path.resolve(PATH.PROJECT, 'src/app/app.entry.js'),
    ],
  },
  output: {
    path: path.resolve(PATH.PROJECT, PATH.PUBLIC),
    publicPath: PATH.BASE,
    filename: '[name].[contenthash:16].js',
  },
  resolve: {
    modules: [path.resolve(PATH.PROJECT, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx'],
    alias: {
      'app.settings.env': path.resolve(PATH.PROJECT, `src/app/app.settings.${ENV}`),
      'app.envDeps.env': path.resolve(PATH.PROJECT, `src/app/app.envDeps.${ENV}`),
      'react-dom': '@hot-loader/react-dom',
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        oneOf: [
          {
            resourceQuery: /inline/,
            use: [
              {
                loader: '@svgr/webpack',
                options: {
                  svgo: true,
                  svgoConfig: {
                    full: true,
                    plugins: [{
                      prefixIds: {
                        prefixIds: true,
                        prefixClassNames: false,
                      },
                    }],
                  },
                },
              },
            ],
          },
          {
            use: {
              loader: 'file-loader',
              options: {
                name: 'images/[contenthash].[ext]',
              },
            },
          },
        ],
      },
      {
        test: /\.(webp|png|jpg|jpeg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'images/[contenthash].[ext]',
          },
        },
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[contenthash].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new Clean(),
    new webpack.DefinePlugin({
      BASE_PATH: JSON.stringify(PATH.BASE),
      ENV: JSON.stringify(ENV),
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      PropTypes: 'prop-types',
      ReactDOM: 'react-dom',
      b: 'bem-react-helper',
    }),
    new webpack.ContextReplacementPlugin(
      /highlight.js[\\/]lib[\\/]languages$/,
      /^.\/(json|http|plaintext)$/,
    ),
    new HtmlWebpackPlugin({
      template: path.resolve(PATH.PROJECT, 'src/index.ejs'),
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
      chunks: ['app', 'vendor'],
      scriptLoading: 'blocking',
    }),
  ],
};
