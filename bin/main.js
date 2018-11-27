const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const crafter = require('@funbox/crafter');

const { errMessage } = require('./utils');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const defaultOptions = {
  filterInput: true,
  includePath: process.cwd(),
};

const BASE_PATH = `${__dirname}/..`;

const filterSource = source => source.replace(/\r\n?/g, '\n').replace(/\t/g, '    ');

const createRefract = source => promisify(crafter.parse)(source, {})
  .then(res => {
    try {
      const ast = JSON.stringify(res.toRefract());
      return Promise.resolve(ast);
    } catch (e) {
      return Promise.reject();
    }
  });

const sendStaticFile = async (outputFileName) => {
  const staticFileLocation = path.resolve(BASE_PATH, 'static/index.html');
  const refractFileLocation = path.resolve(BASE_PATH, 'static/refract.js');
  const htmlData = await readFile(staticFileLocation, { encoding: 'utf-8' });
  const refractData = await readFile(refractFileLocation, { encoding: 'utf-8' });

  const htmlWithRefract = htmlData
    .replace('<script src="./refract.js"></script>', `<script>${refractData}</script>`)
    .replace(/\/favicon/g, `${BASE_PATH}/static$&`)
    .replace(/\/safari-pinned-tab/, `${BASE_PATH}/static$&`)
    .replace(/\/apple-touch-icon/, `${BASE_PATH}/static$&`);
  try {
    await writeFile(outputFileName, htmlWithRefract);
  } catch (error) {
    throw errMessage('Error writing rendered html', error);
  }
};

const renderRefract = async (inputFileName, opts) => {
  const options = { ...defaultOptions, ...opts };

  const filteredInput = await readFile(inputFileName, { encoding: 'utf-8' })
    .then(input => (options.filterInput ? filterSource(input) : input))
    .catch(error => Promise.reject(errMessage('Error reading file', error)));

  const refract = await createRefract(filteredInput)
    .catch(error => Promise.reject(errMessage('Error parsing input', error)));

  const data = `refract = ${refract};`;

  await writeFile(`${BASE_PATH}/static/refract.js`, data)
    .catch(error => Promise.reject(errMessage('Error writing refracted output', error)));
};

const renderAndBuild = async (inputFileName, outputFileName, opts) => {
  await renderRefract(inputFileName, opts);
  await sendStaticFile(outputFileName);
  console.log(`Rendering done. Open "${outputFileName}" to see result.`);
};

module.exports = {
  BASE_PATH,
  renderRefract,
  renderAndBuild,
};
