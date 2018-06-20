const settings = {
  apiBase: '/api',
};

const settingsEnv = require('app.settings.env');
Object.assign(settings, settingsEnv.default);

export default settings;
