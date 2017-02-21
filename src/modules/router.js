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
window.router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: home },
    { path: '/account', component: account },
    { path: '/settings', component: settings }
  ]
});

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
/*
window.router.init = function (component,elm) {
  window.router.start(Vue.extend(component), elm);
};
*/
export default window.router;
