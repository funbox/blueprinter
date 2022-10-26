module.exports = {
  locales: ['ru', 'en'],
  catalogs: [{
    path: 'src/locales/{locale}/messages',
    include: ['src/app', 'src/fb-base-blocks'],
  }],
  format: 'minimal',
  sourceLocale: 'en',
};
