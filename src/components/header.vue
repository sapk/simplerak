<style>
#nav-menu ul.side-nav h2 {
    color: #666;
    text-align: center;
    margin: 0;
    padding: 5px;
    border-bottom: 1px solid #CCC;
    font-size: 48px;
}
</style>

<template>
  <nav id="nav-menu" >
    <div class="nav-wrapper lime accent-4">
      <a href="#!" class="brand-logo center">SimpleRAK</a>
      <a href="#"  data-activates="menu" class="button-collapse"><i class="material-icons">menu</i></a>
      <ul class="right" v-if="config.displayTodayIcon">
        <li class="{{config.activeTodayIcon?'active':''}}"><a v-on:click="showToday"><i class="material-icons">today</i></a></li>
      </ul>
      <ul class="side-nav fixed" id="menu">
        <li><h2>SimpleRAK</h2></li>
        <li v-link-active><a class="waves-effect" v-link="{ path: '/home', activeClass: 'active'}" ><i class="material-icons">restaurant_menu</i>{{ $t("nav-menu") }}</a></li>
        <li v-link-active><a class="waves-effect" v-link="{ path: '/account', activeClass: 'active'}"><i class="material-icons">account_balance</i>{{ $t("nav-my-account") }}</a></li>
        <li v-link-active><a class="waves-effect" v-link="{ path: '/settings', activeClass: 'active'}"><i class="material-icons">settings</i>{{ $t("nav-configuration") }}</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
import $ from 'jquery'

export default {
  ready: function(){
    $(".button-collapse[data-activates='menu']").sideNav({
      menuWidth: 260, // Default is 240
      edge: 'left', // Choose the horizontal origin
      closeOnClick: document.body.clientWidth < 992 // Closes side-nav on <a> clicks if on mobile
    });
  },
  props : ["config"],
  methods : {
    showToday : function(){
      this.config.onShowToday();
    }
  }
}
</script>
