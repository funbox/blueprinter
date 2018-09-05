const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const protagonist = require('protagonist');

const { errMessage } = require('./utils');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const defaultOptions = {
  filterInput: true,
  includePath: process.cwd(),
};

const BASE_PATH = `${__dirname}/..`;

const filterSource = source => source.replace(/\r\n?/g, '\n').replace(/\t/g, '    ');

const createRefract = source => promisify(protagonist.parse)(source, {})
  .then(res => {
    try {
      const ast = JSON.stringify(res);
      return Promise.resolve(ast);
    } catch (e) {
      return Promise.reject();
    }
  });

const sendStaticFile = (outputFileName) => {
  const renderedFileLocation = path.resolve(BASE_PATH, 'static/index.html');
  fs.copyFileSync(renderedFileLocation, outputFileName);
};

const renderRefract = async (inputFileName, opts, callback) => {
  const options = { ...defaultOptions, ...opts };

  try {
    const filteredInput = await readFile(inputFileName, { encoding: 'utf-8' })
      .then(input => options.filterInput ? filterSource(input) : input)
      .catch(error => callback(errMessage('Error reading file', error)));

    const refract = await createRefract(filteredInput)
      .catch(error => callback(errMessage('Error parsing input', error)));

    await writeFile(`${BASE_PATH}/src/app/source/refract.json`, refract)
      .catch(error => callback(errMessage('Error writing refracted output', error)));

  } catch (error) {
    callback(error);
  }
};

const renderAndBuild = async (inputFileName, outputFileName, opts, callback) => {
  try {
    await renderRefract(inputFileName, opts, callback);
    sendStaticFile(outputFileName);
    return callback();
  } catch (error) {
    return callback(error);
  }
};

module.exports = {
  BASE_PATH,
  renderRefract,
  renderAndBuild,
};
