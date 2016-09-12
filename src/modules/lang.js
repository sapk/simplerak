import VueI18n from 'vue-i18n'

import store from './store'

import locales from '../locales.json';

var current = store.config.language;
var language = localStorage.userLanguage || window.navigator.userLanguage || window.navigator.language || navigator.browserLanguage || navigator.systemLanguage || S.config.default_language;
language = language.split("-")[0];
if ($.inArray(language, Object.keys(locales)) > -1) //TODO use locales.json index Object.keys(); for possible value
    current = language;


export default {
  current: current,
  locales : locales,
  init : function(Vue){
    /* Save language */
    store.config.language = current;

    Vue.use(VueI18n);
      // set locales
    Object.keys(locales).forEach(function (lang) {
      console.log(lang, locales[lang]);
      Vue.locale(lang, locales[lang]);
    });
    /* Apply language */
    Vue.config.lang = store.config.language

  }
}
