const { isPortFree } = require('funbox-free-port-finder');

const browserSync = require('browser-sync').create();

const { BASE_PATH, renderRefract } = require('./main');

const serverParams = {
  server: `${BASE_PATH}/static`,
  injectChanges: false,
};

const renderAndServe = async (inputFileName, port, host, options) => {
  const watchSource = (fileName) => {
    const watcher = browserSync.watch(fileName);

    watcher.on('change', (path) => {
      console.log(`Updated ${path}`);
      renderRefract(inputFileName, options).then(() => browserSync.reload());
    })
  };

  await renderRefract(inputFileName, options);
  const isFree = await isPortFree(port);

  if (!isFree) {
    throw new Error(`Error starting server. Port ${port} is busy`);
  }

  await startServer(port, host).then(() => watchSource(inputFileName));
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
