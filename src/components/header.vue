<style>

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
        <li v-link-active><a v-link="{ path: '/home', activeClass: 'active'}" >{{ $t("nav-menu") }}</a></li>
        <li v-link-active><a v-link="{ path: '/account', activeClass: 'active'}">{{ $t("nav-my-account") }}</a></li>
        <li v-link-active><a v-link="{ path: '/settings', activeClass: 'active'}">{{ $t("nav-configuration") }}</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  ready: function(){
    $(".button-collapse[data-activates='menu']").sideNav({
      menuWidth: 300, // Default is 240
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
