const path = require('path');

const BASE_PATH = `${__dirname}/..`;
const SOURCE_FILE = path.resolve(BASE_PATH, 'src/apib-mock/doc.apib');
const OUTPUT_FILE = path.resolve(BASE_PATH, 'src/app/source/refract.json');

module.exports = {
  SOURCE_FILE,
  OUTPUT_FILE,
};
