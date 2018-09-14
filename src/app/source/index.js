let source = {}; // eslint-disable-line

if (ENV !== 'production') {
  source = require('./refract.json');
}

export default source;
