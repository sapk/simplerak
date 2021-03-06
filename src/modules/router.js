import Vue from 'vue'
import VueRouter from 'vue-router'

import lang from './lang'

import home from '../components/views/home.vue'
import account from '../components/views/account.vue'
import settings from '../components/views/settings.vue'

import {App} from './tools'

window.Vue = Vue;
lang.init(Vue);
Vue.use(VueRouter)
window.router = new VueRouter();

window.router.map({
    '/home': {
        component: home
    },
    '/account': {
        component: account
    },
    '/settings': {
        component: settings
    }
});
window.router.redirect({ //TODO test with .alias
  // redirect any navigation to / to /home
  '/': '/home',

  // redirect any not-found route to home
  //'*': '/home'
})

window.router.beforeEach(function (transition) {
  //console.log(transition,router);
  //console.log(App,App());
  App().headerConfig = {
    displayTodayIcon : false,
    activeTodayIcon  : false,
    onShowToday: null
  };
  transition.next()
  //TODO reset initial state of hederConfig ?
})

window.router.init = function (component,elm) {
  router.start(Vue.extend(component), elm);
};
export default window.router;
