const fs = require('fs');
const { promisify } = require('util');
const { basicRenderRefract } = require('../bin/main');
const { SOURCE_FILE, OUTPUT_FILE } = require('./apib-mock-vars');

const writeFile = promisify(fs.writeFile);

basicRenderRefract(SOURCE_FILE, undefined, undefined, true).then(async ([refractData]) => {
  try {
    await writeFile(OUTPUT_FILE, refractData);
    console.log('Refract created.');
  } catch (e) {
    console.error('Error writing refracted output');
    throw e;
  }
}).catch(error => {
  console.error(error.message);
});
