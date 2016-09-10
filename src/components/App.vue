<style>
    /* Offset for fixed menu */
    .app {
      padding-left: 300px;
    }
    @media only screen and (max-width : 992px) {
      .app {
        padding-left: 0;
      }
    }
</style>

<template>
  <div class="app">
    <menu :config="headerConfig" ></menu>
    <router-view></router-view>
  </div>
</template>

<script>
import header from './header.vue'

export default {
  data : () => { return {
      headerConfig : {
        displayTodayIcon: false,
        activeTodayIcon : false,
        onShowToday: null
      }
    }
  },
  components: {
    menu: header,
  }
}
</script>
