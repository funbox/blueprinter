/**
 * Общая конфигурация Webpack.
 */

const defaultsDeep = require('lodash/defaultsDeep');
const path = require('path');
const frontendEnv = require('funbox-frontend-env-webpack');

const webpack = frontendEnv.webpack;

const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

const Csso = require('csso-webpack-plugin').default;

const BASE_PATH = `${__dirname}/..`;

module.exports = options => {
  defaultsDeep(options, {
    appVersion: require('./webpack.app.version'),
    // proxyApiTarget: 'http://example.com/api/',
    projectBasePath: BASE_PATH,
    sassImports: require('./webpack.app.sassImports'),
    htmlEntries: [
      {
        inputFile: `${BASE_PATH}/src/index.jade`,
        chunksOrder: ['vendor', 'app'],
      },
    ],
  });

  const config = frontendEnv.webpackConfigurationBuilder(options);

  config.entry = {
    app: `${__dirname}/../src/app/app.entry.js`,
  };

  config.resolve.extensions = ['.js', '.jsx'];

  defaultsDeep(config.resolve.alias, {
    'app.envDeps.env': path.resolve(__dirname, `../src/app/app.envDeps.${frontendEnv.envName}`),
  });

  config.module.rules = config.module.rules.concat([
    {
      test: /\.jsx?$/,
      loader: 'babel-loader',
      query: {
        presets: [
          ['env', {
            targets: ['> 1%', 'android >= 4.4.4', 'ios >= 9'],
            useBuiltIns: true,
          }],
          'react',
        ].concat(!options.disableHmre && !options.build ? 'react-hmre' : []),
        plugins: ['transform-object-rest-spread'].concat(options.build
          ? ['transform-react-constant-elements', 'transform-react-remove-prop-types']
          : []),
      },
      exclude: /node_modules[\\/](?!(blueprinter-frontend)[\\/]).*/,
    },
  ]);

  config.plugins = config.plugins.concat([
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks({ userRequest }) {
        return typeof userRequest === 'string' && userRequest.split('!').pop().includes('node_modules');
      },
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      PropTypes: 'prop-types',
      ReactDOM: 'react-dom',
      b: 'bem-react-helper',
    }),
    new webpack.DefinePlugin({
      // для того, чтобы матчиться в коде
      ENV: JSON.stringify(process.env.ENV),
      // для того, чтобы редаксы-реакты выкидывали ненужный код при минификации
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new webpack.ContextReplacementPlugin(
      /highlight.js[\\/]lib[\\/]languages$/,
      new RegExp('^./(json|http)$'),
    ),
  ]);

  if (options.inlineSource) {
    // При сборке проекта из APIB-доки инлайним скрипты, стили и шрифты в html,
    // чтобы получить один файл

    config.plugins
      .map(plugin => {
        if (plugin.constructor.name === 'HtmlWebpackPlugin') {
          plugin.options.inlineSource = '.(js|css)$';
        }
      });

    config.plugins = config.plugins.concat([
      new HtmlWebpackInlineSourcePlugin(),
    ]);

    // Удаляем woff-шрифты из file-loader и используем для них inline-loader
    config.module.rules
      .map(rule => {
        if (rule.loader && rule.loader.startsWith('file-loader') && rule.test.toString().includes('|woff')) {
          rule.test = /\.(ttf|otf|eot)$/;
        }
      });

    config.module.rules = config.module.rules.concat([
      {
        test: /\.(woff|woff2)$/,
        loader: 'base64-inline-loader?name=[name].[ext]',
      },
    ]);
  }

  if (!options.disableCssExtracting) {
    // Меняем в настройках плагина для экстракции CSS в файл, шаблон имени файла.
    // Вместо дефолтного для рабочего окружения chunkhash, используем contenthash.
    // Чтобы при правках CSS и JS кода хэши для соответствующих файлов менялись независимо.
    config.plugins
      .map(plugin => {
        if (plugin.constructor.name === 'ExtractTextPlugin' && `${plugin.filename}`.indexOf('.css') > 0) {
          plugin.filename = '[name].[contenthash:16].css'
        }
      });

    config.plugins = config.plugins.concat([
      new Csso(),
    ]);
  }

  const cssFromScssCommonLoaders = [
    {
      loader: 'css-loader',
      options: {
        minimize: false,
        sourceMaps: options.disableCssExtracting,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: [
          require('postcss-url')({
            url: 'inline',
            maxSize: 5,
          }),
          require('autoprefixer')({
            browsers: ['> 1%', 'android >= 4.4.4', 'ios >= 9'],
          }),
        ],
      },
    },
    'resolve-url-loader',
    {
      loader: 'sass-loader',
      options: {
        sourceMap: options.disableCssExtracting,
        includePaths: [path.resolve('src')],
      },
    },
    {
      loader: 'funbox-scss-imports-loader',
      options: {
        paths: require('./webpack.app.scssImports').map(scssPath => `${BASE_PATH.replace(/\\/g, '/')}/src/${scssPath}`),
      },
    },
    'funbox-scss-vars-loader',
  ];

  const cssFromScssDevLoaders = ['style-loader'].concat(cssFromScssCommonLoaders);

  if (options.disableCssExtracting) {
    config.module.rules = config.module.rules.concat([
      {
        test: /\.scss$/,
        use: cssFromScssDevLoaders,
      },
    ]);
  } else {
    config.module.rules = config.module.rules.concat([
      {
        test: /\.scss$/,
        use: require('extract-text-webpack-plugin').extract({
          fallback: 'style-loader',
          use: cssFromScssCommonLoaders,
        }),
      },
    ]);
  }

  return config;
};
