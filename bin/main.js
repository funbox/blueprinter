const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const crafter = require('@funbox/crafter');

const { errMessage, astHasError } = require('./utils');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

const BASE_PATH = `${__dirname}/..`;

const createRefract = inputFileName => promisify(crafter.parseFile)(inputFileName, {})
  .then(res => {
    try {
      const ast = JSON.stringify(res.toRefract());
      const [hasError, error] = astHasError(res);
      if (hasError) {
        console.error(`Crafter error: ${error}`);
        return Promise.resolve(ast);
      }
      return Promise.resolve(ast);
    } catch (e) {
      return Promise.reject(e);
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
    await mkdir(path.dirname(outputFileName), { recursive: true });
    await writeFile(outputFileName, htmlWithRefract);
  } catch (error) {
    throw errMessage('Error writing rendered html', error);
  }
};

const renderRefract = async (inputFileName) => {
  const refract = await createRefract(inputFileName)
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
