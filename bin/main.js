const fs = require('fs');
const path = require('path');
const crafter = require('@funboxteam/crafter');

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

const sendStaticFile = async (outputFileName, refractData, customCssData, customFavicon, locale, localeData) => {
  const htmlData = await readFile(staticFileLocation, { encoding: 'utf-8' });

  const htmlWithRefract = htmlData
    // use a function as the second parameter of `replace` to not account particular chars as replace templates
    .replace('<script src="./refract.js"></script>', () => `<script>${refractData}</script>`)
    .replace('<script src="./locale.js"></script>', () => `<script>${localeData}</script>`)
    .replace('<link href="./custom-style.css" rel="stylesheet">', `<style>${customCssData}</style>`)
    .replace(/<link rel="icon" type="image\/png" href="[^"]*"\/?>/, (match) => (
      customFavicon
        ? `<link rel="icon" type="image/png" href="data:image/png;base64,${customFavicon}"/>`
        : match
    ))
    .replace(/lang="\w+"/, `lang="${locale}"`);

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

const renderCustomFavicon = async (faviconFileName) => {
  const fileExt = path.extname(faviconFileName).toLowerCase();

  if (fileExt !== '.png') {
    throw new Error('Favicon must be a PNG image.');
  }

  const customFavicon = await readFile(faviconFileName, { encoding: 'base64' });

  return customFavicon;
};

const renderLocale = async (locale) => {
  const localeFileName = path.resolve(BASE_PATH, `static/locale.${locale}.js`);
  try {
    const localeData = await readFile(localeFileName, { encoding: 'utf-8' });
    return localeData;
  } catch (e) {
    console.error(e);
    return '';
  }
};

const renderAndBuild = async (inputFileName, cssFileName, faviconFileName, outputFileName, locale, strictMode = false) => {
  const [refractData] = await renderRefract(inputFileName, strictMode, true);
  const customCssData = cssFileName ? await renderCustomCss(cssFileName) : '';
  const customFaviconData = faviconFileName ? await renderCustomFavicon(faviconFileName) : null;
  const localeData = await renderLocale(locale);

  await sendStaticFile(outputFileName, refractData, customCssData, customFaviconData, locale, localeData);
  console.log(`Rendering done. Open "${outputFileName}" to see result.`);
};

module.exports = {
  BASE_PATH,
  basicRenderRefract,
  renderRefract,
  renderCustomCss,
  renderLocale,
  renderAndBuild,
};
