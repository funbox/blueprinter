const ENV = process.env.NODE_ENV || process.env.JENKINS_URL && 'ci' || 'dev';

const PATH = {
  BASE: '',
  PUBLIC: process.env.DIST_DIR || 'public',
  PROJECT: `${__dirname}/../..`,
};

module.exports = {
  ENV,
  PATH,
};
