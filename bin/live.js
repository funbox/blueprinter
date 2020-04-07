const { isPortFree } = require('@funbox/free-port-finder');

const browserSync = require('browser-sync').create();

let refract = '';

const { BASE_PATH, renderRefract } = require('./main');

const serverParams = {
  server: `${BASE_PATH}/static`,
  injectChanges: false,
};

const renderAndServe = async (inputFileName, port, host) => {
  const watchSource = (filePaths) => {
    const watcher = browserSync.watch(filePaths);

    watcher.on('change', async (path) => {
      console.log(`Updated ${path}`);
      let newRefractData;
      let newFilePaths;
      try {
        [newRefractData, newFilePaths] = await renderRefract(inputFileName);
      } catch (e) {
        console.error(e);
      }
      refract = newRefractData;
      browserSync.reload();
      watcher.close();
      watchSource([inputFileName, ...newFilePaths]);
    });
  };

  let refractData;
  let filePaths;
  try {
    [refractData, filePaths] = await renderRefract(inputFileName);
  } catch (e) {
    console.error(e);
  }
  const isFree = await isPortFree(port);
  refract = refractData;
  if (!isFree) {
    throw new Error(`Error starting server. Port ${port} is busy`);
  }

  await startServer(port, host).then(() => watchSource([inputFileName, ...filePaths]));
};

function startServer(port, host) {
  console.log(`Starting server at ${host}:${port}`);
  serverParams.host = host;
  serverParams.port = port;
  serverParams.middleware = [{
    route: '/refract.js',
    handle: (req, res) => {
      res.setHeader('Content-Type', 'text/javascript');
      res.end(refract);
    },
  }];

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
