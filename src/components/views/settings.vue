<style>
#settings-container {
    /*background-color:#DDD;*/
    white-space: nowrap;
    /*overflow: hidden;*/
    width: 90%;
    margin: 0 5%;
}
#settings-container .input-field{
    margin-top: 0;
}

</style>

<template>
  <div id="settings-container">
    <br>
    <div class="row">
        <a v-on:click="account_reset()" class="waves-effect waves-light btn-large" style="width: 100%;"><i class="material-icons left">settings</i><span>Reset Account</span></a>
    </div>
    <div class="row">
        <a v-on:click="cache_reset()" class="waves-effect waves-light btn-large" style="width: 100%;"><i class="material-icons left">refresh</i><span>Clear Cache</span></a>
    </div>
    <div class="row">
        <a v-on:click="config_reset()" class="waves-effect waves-light btn-large" style="width: 100%;"><i class="material-icons left">clear</i><span>Reset Configuration</span></a>
    </div>
    <div class="row">
        <div class="input-field col s12">
            <select onchange="localStorage.theme = $(this).val();
                    window.location.reload();">
                <option value="" disabled selected>Thème</option>
                <option value="blanc">Blanc</option> <!-- par défaut -->
                <option value="sombre">Sombre</option>
                <option value="fip">FIP</option>
            </select>
        </div>
    </div>
    <div class="row">
        <div class="input-field col s12">
            <select onchange="localStorage.userLanguage = $(this).val();
                    window.location.reload();">
                <option value="" disabled selected>Langue</option>
                <option value="en">English</option>
                <option value="fr">Français</option><!-- par défaut -->
            </select>
        </div>
    </div>
    <div class="row" style="padding-bottom: 20px;">
        <div class="input-field col s12">
            <div class="switch">
                <label style="width: 100%;">
                    <span>Expand all menu by default</span>
                    <input type="checkbox" v-model="expandAllMenu" v-on:change="saveExpandAllMenu">
                    <span class="lever right"></span>
                </label>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
  import cache from '../../modules/cache'
  import store from '../../modules/store'
  import { isLogged, getForm } from '../../modules/tools'


  export default {
    data : function(){
      return {expandAllMenu:localStorage.expandallmenu === "true"}
    },
    methods : {
      saveExpandAllMenu: function(el){
        window.store.config.expandallmenu = this.expandAllMenu;
        localStorage.expandallmenu = this.expandAllMenu;
      },
      config_reset:function(){
        console.log(localStorage.expandallmenu);
        localStorage.removeItem('userLanguage');
        localStorage.removeItem('theme');
        localStorage.removeItem('expandallmenu');
        Materialize.toast('Config cleared !', 3000);
        window.setTimeout('window.location.reload();', 750);
      },
      cache_reset:function(){
        cache.reset();
        Materialize.toast('Cache cleared !', 3000)
      },
      account_reset: function () {
          localStorage.removeItem('pass');
          localStorage.removeItem('user');
          cache.reset();
          $.get(store.config.account_urls.logout, function (d) {
            Materialize.toast('Logins cleared !', 3000)
          });
      },
    },
    ready : function(){
      $(document).ready(function() {
        $('select').material_select();
      });
    }
  }
</script>
