import { i18n } from '@lingui/core';
import { en, ru } from 'make-plural/plurals';

const supportedLocales = ['en', 'ru'];
const localeData = {
  en: { plurals: en },
  ru: { plurals: ru },
};

const localeCatalog = window.i18n ? window.i18n.messages : undefined;
const definedLocale = document.documentElement.lang;
const activeLocale = supportedLocales.includes(definedLocale) ? definedLocale : 'en';

if (localeCatalog) {
  i18n.load(activeLocale, localeCatalog);
}
i18n.loadLocaleData(activeLocale, localeData[activeLocale]);
i18n.activate(activeLocale);

export default i18n;
