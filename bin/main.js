const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const protagonist = require('protagonist');
const webpack = require('webpack');

const { errMessage } = require('./utils');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const defaultOptions = {
  filterInput: true,
  includePath: process.cwd(),
};

const BASE_PATH = `${__dirname}/..`;
const buildConfig = require(path.resolve(BASE_PATH, 'config/webpack.app.doc.js'));
buildConfig.bail = true;

const filterSource = source => source.replace(/\r\n?/g, '\n').replace(/\t/g, '    ');

const buildFile = () => (
  new Promise((resolve, reject) => {
    const compiler = webpack(buildConfig);

    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) {
        console.log('Webpack compiling error');
        console.log(err ? err.message : stats.toJson().errors);
        return reject();
      }
      console.log('Done compiling');
      resolve();
    });
  })
);

const createRefract = source => promisify(protagonist.parse)(source, {})
  .then(res => {
    try {
      const ast = JSON.stringify(res);
      return Promise.resolve(ast);
    } catch (e) {
      return Promise.reject();
    }
  });

const sendRenderedFile = (outputFileName) => {
  const renderedFileLocation = path.resolve(BASE_PATH, 'public/index.html');
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
    await buildFile();
    sendRenderedFile(outputFileName);
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
