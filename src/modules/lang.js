import Vue from 'vue'
import VueI18n from 'vue-i18n'

import store from './store'


var current = store.config.language;
var language = localStorage.userLanguage || window.navigator.userLanguage || window.navigator.language || navigator.browserLanguage || navigator.systemLanguage || S.config.default_language;
language = language.split("-")[0];
if ($.inArray(language, ["en", "fr"]) > -1) //TODO use locales.json index Object.keys(); for possible value
    current = language;

export default {
  current: current,
  locales : { // global translated locales //TODO load locales.json
    en: {
      message: {
        hello: 'hello world'
      }
    },
    fr: {
      message: {
        hello: 'bonjour'
      }
    },
    ja: {
      message: {
        hello: 'こんにちは、世界'
      }
    }
  },
  init : function(){
    /* Load language */
    store.config.language = current;
    Vue.config.lang = current
    console.log(current);

    Vue.use(VueI18n);
      // set locales
    console.log(this.locales);
    Object.keys(this.locales).forEach(function (lang) {
      Vue.locale(lang, this.locales[lang])
    });
  }
}
