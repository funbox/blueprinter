process.env.ENV = 'production';
process.env.NODE_ENV = 'production';

const path = require('path');
const webpack = require('webpack');
const SuppressEntryChunksPlugin = require('suppress-chunks-webpack-plugin').default;

const BASE_PATH = `${__dirname}/..`;
const buildConfig = require(path.resolve(BASE_PATH, 'config/webpack/doc.config.js'));

buildConfig.plugins.push(
  new SuppressEntryChunksPlugin(
    ['app', 'vendor'],
    { filter: /\.(js|css|map|json)$/ }, // leave only index.html and favicon in the static folder
  ),
);
buildConfig.bail = true;

const compiler = webpack(buildConfig);

compiler.run((err, stats) => {
  if (err || stats.hasErrors()) {
    console.log('Webpack compiling error');
    console.log(err ? err.message : stats.toJson().errors);
  }
  console.log('Done compiling');
});
