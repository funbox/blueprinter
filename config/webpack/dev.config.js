const path = require('path');

const merge = require('webpack-merge');

module.exports = merge(
  require('./base.config.js'),
  {
    name: 'dev',
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.(js|jsx)?$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                require.resolve('@babel/preset-env'),
                require.resolve('@babel/preset-react'),
              ],
              plugins: [
                require.resolve('react-hot-loader/babel'),
                require.resolve('@babel/plugin-proposal-object-rest-spread'),
                require.resolve('@babel/plugin-proposal-class-properties'),
              ],
            },
          },
          exclude: /node_modules[\\/](?!(blueprinter-frontend)[\\/]).*/,
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
                sassOptions: {
                  sourceMap: true,
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
        {
          test: /\.(woff|woff2|ttf|otf|eot)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'fonts/[contenthash].[ext]',
            },
          },
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
