import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './components/App.vue'

import router from './modules/router'

var main = Vue.extend({
  components: {
    app: App
  }
})

router.start(main, 'body');
