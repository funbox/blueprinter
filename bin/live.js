const { isPortFree } = require('@funbox/free-port-finder');

const browserSync = require('browser-sync').create();

const { BASE_PATH, renderRefract } = require('./main');

const serverParams = {
  server: `${BASE_PATH}/static`,
  injectChanges: false,
};

const renderAndServe = async (inputFileName, port, host, options) => {
  const watchSource = (filePaths) => {
    const watcher = browserSync.watch(filePaths);

    watcher.on('change', async (path) => {
      console.log(`Updated ${path}`);
      const filePaths = await renderRefract(inputFileName, options);
      browserSync.reload();
      watcher.close();
      watchSource([inputFileName, ...filePaths]);
    });
  };

  const filePaths = await renderRefract(inputFileName);
  const isFree = await isPortFree(port);

  if (!isFree) {
    throw new Error(`Error starting server. Port ${port} is busy`);
  }

  await startServer(port, host).then(() => watchSource([inputFileName, ...filePaths]));
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
