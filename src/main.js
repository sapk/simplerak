import Vue from 'vue'

import App from './components/App.vue'

import lang from './modules/lang'
import router from './modules/router'

lang.init();
var main = Vue.extend({
  components: {
    app: App
  }
})

router.start(main, 'body');
