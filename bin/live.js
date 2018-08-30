const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const { isPortFree } = require('funbox-free-port-finder');

const { BASE_PATH, renderRefract } = require('./main');

const buildConfig = require(path.resolve(BASE_PATH, 'config/webpack.app.serve.js'));
const serverOptions = buildConfig.devServer;

let resolveInitialBuild;

serverOptions.hot = true;
serverOptions.inline = true;
serverOptions.stats = 'errors-only';

delete buildConfig.devServer;

const renderAndServe = async (inputFileName, port, host, options, callback) => {
  const watchSource = (fileName) => {
    const watcher = chokidar.watch(fileName);

    watcher.on('change', (path) => {
      console.log(`Updated ${path}`);
      renderRefract(inputFileName, options, callback);
    })
  };

  try {
    await renderRefract(inputFileName, options, callback);
    const isFree = await isPortFree(port);

    if (!isFree) {
      return callback(new Error(`Error starting server. Port ${port} is busy`));
    }

    startServer(port, host).then(() => watchSource(inputFileName));
  } catch (error) {
    return callback(error);
  }
};

// В данном примере для реализации работы live-режима использует плагин funbox-rebuild-in-progress-webpack-plugin
const rebuildInProgressFile = path.resolve(__dirname, '../node_modules/.rebuildInProgress');

fs.watch(path.dirname(rebuildInProgressFile), (eventType, filename) => {
  if (eventType === 'rename' && filename === path.basename(rebuildInProgressFile)) {
    if (fs.existsSync(rebuildInProgressFile)) {
      // Сборка началась
    } else {
      if (resolveInitialBuild) {
        resolveInitialBuild();
        resolveInitialBuild = null;
      }
    }
  }
});

function startServer(port, host) {
  console.log(`Starting server at ${host}:${port}`);
  return new Promise(resolve => {
    new WebpackDevServer(webpack(buildConfig), serverOptions).listen(port, host, (err) => {
      if (err) {
        console.log(`Ошибка сборки: ${err}`);
        process.exit(1);
      }

      resolveInitialBuild = resolve;
    });
  });
}

module.exports = {
  renderAndServe,
};
