module.exports = {
  extends: '@funbox',
  env: {
    browser: true
  },
  globals: {
    ENV: true,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'config/webpack.app.build.js',
      }
    }
  },
}
