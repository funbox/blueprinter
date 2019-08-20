const { basicRenderRefract } = require('../bin/main');
const { SOURCE_FILE, OUTPUT_FILE } = require('./apib-mock-vars');

basicRenderRefract(SOURCE_FILE, OUTPUT_FILE).then(() => {
  console.log('Refract created.');
}).catch(error => {
  console.error(error.message);
});
