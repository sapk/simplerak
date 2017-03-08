<style>
    /* Offset for fixed menu */
    .app {
      padding-left: 260px;
    }
    @media only screen and (max-width : 992px) {
      .app {
        padding-left: 0;
      }
    }

/* Thème sombre */

body.theme-sombre {
    background: #212121;
    color: white !important;
}
/*
body.theme-sombre .collapsible{
    margin: 0.5rem 1px 1rem 1px;
}
*/
body.theme-sombre input,body.theme-sombre .input-field{
    background: #616161 ;
}
body.theme-sombre .side-nav{
    background: #bdbdbd;
}
body.theme-sombre .collapsible-header {
    background: #616161 ;
}

body.theme-sombre tbody>tr {
    filter: brightness(0.80);
    -webkit-filter: brightness(0.80);
    color: #333;
}

body.theme-sombre table.striped tbody tr:nth-child(even){
    background: #bdbdbd
}

body.theme-sombre .modal {
    background: #616161 ;
}
body.theme-sombre #menu-container.carousel .indicators .indicator-item.active {
    background-color: #FFF;
}
body.theme-sombre #menu-container.carousel .indicators .indicator-item {
    background-color: #666;
}


/* Thème FIP */

body.theme-fip {
    background: #f5f5f5;
    color: #000 !important;
}

body.theme-fip .nav-wrapper{
    background: #f06292 !important;
}

body.theme-fip .nav-wrapper .brand-logo{
    width: 280px;
}
body.theme-fip .nav-wrapper .brand-logo:before {
    content:url(img/wing-left.png);
    float: left;
}
body.theme-fip .nav-wrapper .brand-logo:after {
    content:url(img/wing-right.png);
    float: right;
}
body.theme-fip .modal {
    background: #616161 ;
}
/*
body.theme-fip table.striped tbody tr:nth-child(odd) {
    background-color: #fce4ec;
}
*/
/* small phone */
@media only screen and (max-width: 320px) {
    body.theme-fip .nav-wrapper .brand-logo{
        width: 224px;
        margin-left: -6px;
    }
    body.theme-fip .nav-wrapper .brand-logo:before,body.theme-fip .nav-wrapper .brand-logo:after  {
        width: 48px;
    }
    body.theme-fip .nav-wrapper .brand-logo:after  {
        margin-left: -14px;
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
import $ from 'jquery'
import router from '../modules/router'

import header from './header.vue'
//import 'vue-material/dist/vue-material.css'
//Vue.use(VueMaterial) //Global method
//Vue.use(VueMaterial.MdCore) //Required to boot vue material

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
  },
  created: function(){
    if (localStorage.theme){
      console.log("Loading theme :",localStorage.theme)
      $("body").addClass("theme-" + localStorage.theme)
    }
    const app = new Vue({
      router
    }).$mount('app')
  }
}
</script>
