module.exports = {
  extends: '@funboxteam',
  env: {
    browser: true
  },
  globals: {
    ENV: true,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'config/webpack/base.config.js',
      }
    }
  },
}
