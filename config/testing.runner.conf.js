const path = require('path'); // eslint-disable-line import/no-extraneous-dependencies

module.exports = {
  projectBasePath: path.join(__dirname, '/..'),
  runners: ['unit', 'e2e'],
};
