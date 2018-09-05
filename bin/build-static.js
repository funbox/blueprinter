const path = require('path');
const webpack = require('funbox-frontend-env-webpack').webpack;
const SuppressEntryChunksPlugin = require('suppress-chunks-webpack-plugin').default;

const BASE_PATH = `${__dirname}/..`;
const buildConfig = require(path.resolve(BASE_PATH, 'config/webpack.app.doc.js'));

buildConfig.plugins.push(
  new SuppressEntryChunksPlugin(
    ['app', 'vendor'],
    { filter: /\.(js|css|map|json)$/ } // оставляем в папке static только index.html и favicon
  )
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
