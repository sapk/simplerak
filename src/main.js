//import Vue from 'vue'

import App from './components/App.vue'

import router from './modules/router'

router.init({
  components: {
    app: App
  }
}, 'body');
//router.start(main, 'body');
