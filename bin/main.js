const fs = require('fs');
const path = require('path');
const crafter = require('@funbox/crafter');

const { errMessage, astHasError, rejectCrafterError, extendAst } = require('./utils');

const readFile = fs.promises.readFile;
const writeFile = fs.promises.writeFile;
const mkdir = fs.promises.mkdir;

const BASE_PATH = `${__dirname}/..`;
const staticFileLocation = path.resolve(BASE_PATH, 'static/index.html');

const logger = {
  warn(text, details) {
    const [linePos, currentFile] = details;
    const positionText = linePos ? ` at line ${linePos}` : '';
    const fileText = currentFile ? ` (see ${currentFile})` : '';
    console.error('\x1b[33m%s\x1b[0m', `Warning${positionText}${fileText}: ${text}`); // yellow color
  },
};

const createRefract = (inputFileName, strictMode, buildMode) => crafter.parseFile(inputFileName, { logger })
  .then(res => {
    try {
      const [result, filePaths] = res;
      const ast = result.toRefract();

      const [hasError, errorDetails] = astHasError(result);

      if (hasError && buildMode) {
        return rejectCrafterError(inputFileName, errorDetails);
      }

      if (strictMode && result.annotations.some(anno => anno.type === 'warning')) {
        return Promise.reject(new Error('Warnings are not allowed in strict mode'));
      }

      if (hasError) {
        return extendAst(ast, inputFileName, errorDetails).then(modifiedAst => [JSON.stringify(modifiedAst), filePaths]);
      }

      return Promise.resolve([JSON.stringify(ast), filePaths]);
    } catch (e) {
      return Promise.reject(errMessage('Error parsing input', e));
    }
  });

const sendStaticFile = async (outputFileName, refractData, customCssData) => {
  const htmlData = await readFile(staticFileLocation, { encoding: 'utf-8' });

  const htmlWithRefract = htmlData
    // вторым параметром передаётся функция, чтобы определённые символы в refractData не применились как шаблоны замены
    .replace('<script src="./refract.js"></script>', () => `<script>${refractData}</script>`)
    .replace('<link href="./custom-style.css" rel="stylesheet">',`<style>${customCssData}</style>`)
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

const basicRenderRefract = async (inputFileName, processResult, strictMode = false, buildMode = false) => {
  const [refract, filePaths] = await createRefract(inputFileName, strictMode, buildMode)
    .catch(error => Promise.reject(error));

  const refractData = processResult ? processResult(refract) : refract;

  return [refractData, filePaths.map(filePath => path.join(path.dirname(inputFileName), filePath))];
};

const renderRefract = async (inputFileName, strictMode = false, buildMode = false) => {
  const processor = (refract) => `refract = ${refract};`;
  return basicRenderRefract(inputFileName, processor, strictMode, buildMode);
};

const renderCustomCss = async (cssFileName) => {
  const customCss = await readFile(cssFileName, { encoding: 'utf-8' });

  return customCss;
};

const renderAndBuild = async (inputFileName, cssFileName, outputFileName, strictMode = false) => {
  const [refractData] = await renderRefract(inputFileName, strictMode, true);
  const customCssData = cssFileName ? await renderCustomCss(cssFileName) : '';

  await sendStaticFile(outputFileName, refractData, customCssData);
  console.log(`Rendering done. Open "${outputFileName}" to see result.`);
};

module.exports = {
  BASE_PATH,
  basicRenderRefract,
  renderRefract,
  renderCustomCss,
  renderAndBuild,
};
