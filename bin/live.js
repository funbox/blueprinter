const { isPortFree } = require('funbox-free-port-finder');

const browserSync = require('browser-sync').create();

const { BASE_PATH, renderRefract } = require('./main');

const serverParams = {
  server: `${BASE_PATH}/static`,
  injectChanges: false,
};

const renderAndServe = async (inputFileName, port, host, options, callback) => {
  const watchSource = (fileName) => {
    const watcher = browserSync.watch(fileName);

    watcher.on('change', (path) => {
      console.log(`Updated ${path}`);
      renderRefract(inputFileName, options, callback).then(() => browserSync.reload());
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

function startServer(port, host) {
  console.log(`Starting server at ${host}:${port}`);
  serverParams.host = host;
  serverParams.port = port;

  return new Promise(resolve => {
    browserSync.init(serverParams, () => {
      console.log('Server started');
      resolve();
    });
  });
}

module.exports = {
  renderAndServe,
};
