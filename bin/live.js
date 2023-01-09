const { isPortFree } = require('@funboxteam/free-port-finder');

const browserSync = require('browser-sync').create();

let refract = '';
let customCss = '';
let localeData = '';
let locale = 'en';

const { BASE_PATH, renderRefract, renderCustomCss, renderLocale } = require('./main');

const serverParams = {
  server: `${BASE_PATH}/static`,
  injectChanges: false,
};

const renderAndServe = async (inputFileName, cssFileName, port, host, userLocale) => {
  const watchSource = (filePaths) => {
    const watcher = browserSync.watch(filePaths);

    watcher.on('change', async (path) => {
      console.log(`Updated ${path}`);

      if (cssFileName && path === cssFileName) {
        customCss = await renderCustomCss(cssFileName);

        browserSync.reload();
      } else {
        const [newRefractData, newFilePaths] = await renderRefract(inputFileName);

        refract = newRefractData;

        if (cssFileName) newFilePaths.push(cssFileName);

        browserSync.reload();
        watcher.close();
        watchSource([inputFileName, ...newFilePaths]);
      }
    });
  };

  const isFree = await isPortFree(port);
  if (!isFree) {
    throw new Error(`Error starting server. Port ${port} is busy`);
  }

  const [refractData, filePaths] = await renderRefract(inputFileName);

  refract = refractData;

  if (cssFileName) {
    customCss = await renderCustomCss(cssFileName);
    filePaths.push(cssFileName);
  }

  if (userLocale) {
    localeData = await renderLocale(userLocale);
    locale = userLocale;
  }

  await startServer(port, host).then(() => watchSource([inputFileName, ...filePaths]));
};

function startServer(port, host) {
  console.log(`Starting server at ${host}:${port}`);
  serverParams.host = host;
  serverParams.port = port;
  serverParams.middleware = [
    {
      route: '/refract.js',
      handle: (req, res) => {
        res.setHeader('Content-Type', 'text/javascript');
        res.end(refract);
      },
    },
    {
      route: '/custom-style.css',
      handle: (req, res) => {
        res.setHeader('Content-Type', 'text/css');
        res.end(customCss);
      },
    },
    {
      route: '/locale.js',
      handle: (req, res) => {
        res.setHeader('Content-Type', 'text/javascript');
        res.end(localeData);
      },
    },
  ];
  serverParams.rewriteRules = [
    {
      match: /lang="\w+"/,
      replace: `lang="${locale}"`,
    },
  ];

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
