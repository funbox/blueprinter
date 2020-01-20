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

const createRefract = (inputFileName, strictMode) => promisify(crafter.parseFile)(inputFileName, {})
  .then(res => {
    try {
      const [result, filePaths] = res;
      const ast = JSON.stringify(result.toRefract());

      const [hasError, error] = astHasError(result);
      if (hasError) {
        return Promise.reject(new Error(`Crafter error: ${error}`));
      }

      if (strictMode && result.annotations.some(anno => anno.type === 'warning')) {
        return Promise.reject(new Error('Warnings are not allowed in strict mode'));
      }

      return Promise.resolve([ast, filePaths]);
    } catch (e) {
      return Promise.reject(errMessage('Error parsing input', e));
    }
  });

const sendStaticFile = async (outputFileName, refractData) => {
  const htmlData = await readFile(staticFileLocation, { encoding: 'utf-8' });

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

const basicRenderRefract = async (inputFileName, processResult, strictMode = false) => {
  const [refract, filePaths] = await createRefract(inputFileName, strictMode)
    .catch(error => Promise.reject(error));

  const refractData = processResult ? processResult(refract) : refract;

  return [refractData, filePaths];
};

const renderRefract = async (inputFileName, strictMode = false) => {
  const processor = (refract) => `refract = ${refract};`;
  return basicRenderRefract(inputFileName, processor, strictMode);
};

const renderAndBuild = async (inputFileName, outputFileName, strictMode = false) => {
  const [refractData] = await renderRefract(inputFileName, strictMode);
  await sendStaticFile(outputFileName, refractData);
  console.log(`Rendering done. Open "${outputFileName}" to see result.`);
};

module.exports = {
  BASE_PATH,
  basicRenderRefract,
  renderRefract,
  renderAndBuild,
};
