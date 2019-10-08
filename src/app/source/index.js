let source = {}; // eslint-disable-line

if (ENV !== 'production') {
  // файл создаётся автоматически, см. npm-скрипт "make-stub"
  // eslint-disable-next-line import/no-unresolved
  source = require('./refract.json');
}

export default source;
