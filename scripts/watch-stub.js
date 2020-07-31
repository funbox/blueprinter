const chokidar = require('chokidar');
const fs = require('fs');
const {
  isAbsolute,
  dirname,
  join,
} = require('path');
const { promisify } = require('util');
const { basicRenderRefract } = require('../bin/main');
const {
  SOURCE_FILE,
  OUTPUT_FILE,
} = require('./apib-mock-vars');

const writeFile = promisify(fs.writeFile);

const renderRefract = async () => {
  const [refractData, filePaths] = await basicRenderRefract(SOURCE_FILE);
  await writeFile(OUTPUT_FILE, refractData);

  return filePaths;
};

const watchSource = (filePaths) => {
  const absPath = filePaths.find(p => isAbsolute(p));
  const baseDir = absPath ? dirname(absPath) : '';
  const truePaths = getAbsoluteFilePaths(filePaths, baseDir);

  const watcher = chokidar.watch(truePaths);

  watcher.on('change', async (path) => {
    try {
      const newFilePaths = await renderRefract();
      console.log(`Updated ${path}`);
      watcher.close();
      watchSource([SOURCE_FILE, ...newFilePaths]);
    } catch (e) {
      console.log(`Update failed at ${path}`);
    }
  });
};

renderRefract().then((filePaths) => {
  console.log('Refract created, and now my watch begins.');
  watchSource([SOURCE_FILE, ...filePaths]);
}).catch(error => {
  console.error(error.message);
});

function getAbsoluteFilePaths(filePaths, baseDir) {
  return filePaths.map(p => (isAbsolute(p) ? p : join(baseDir, p)));
}
