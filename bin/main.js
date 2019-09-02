const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const crafter = require('@funbox/crafter');

const { errMessage, astHasError } = require('./utils');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

const BASE_PATH = `${__dirname}/..`;
const staticFileLocation = path.resolve(BASE_PATH, 'static/index.html');
const refractFileLocation = path.resolve(BASE_PATH, 'static/refract.js');

const createRefract = inputFileName => promisify(crafter.parseFile)(inputFileName, {})
  .then(res => {
    try {
      const [result, filePaths] = res;
      const ast = JSON.stringify(result.toRefract());
      const [hasError, error] = astHasError(result);
      if (hasError) {
        console.error(`Crafter error: ${error}`);
        return Promise.resolve(ast);
      }
      return Promise.resolve([ast, filePaths]);
    } catch (e) {
      return Promise.reject(e);
    }
  });

const sendStaticFile = async (outputFileName) => {
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

const basicRenderRefract = async (inputFileName, outputFileName, processResult) => {
  const [refract, filePaths] = await createRefract(inputFileName)
    .catch(error => Promise.reject(errMessage('Error parsing input', error)));

  const refractData = processResult ? processResult(refract) : refract;

  await writeFile(outputFileName, refractData)
    .catch(error => Promise.reject(errMessage('Error writing refracted output', error)));

  return filePaths;
};

const renderRefract = async (inputFileName) => {
  const processor = (refract) => `refract = ${refract};`;
  return basicRenderRefract(inputFileName, refractFileLocation, processor);
};

const renderAndBuild = async (inputFileName, outputFileName) => {
  await renderRefract(inputFileName);
  await sendStaticFile(outputFileName);
  console.log(`Rendering done. Open "${outputFileName}" to see result.`);
};

module.exports = {
  BASE_PATH,
  basicRenderRefract,
  renderRefract,
  renderAndBuild,
};
