<style>

#menu-container>.page{
    height: 100%;
    width: 100%;
    overflow-y: auto;
}
#menu-container>.page>.date {
    color: #BBB;
    position: relative;
    top: 85%;
    margin-bottom: -20px;
}
#menu-container>.page>h5.today {
    color: #ef5350;
    font-weight: bold;
}
#menu-container>.page .collapsible-header {
    font-weight: bold;
    white-space: nowrap;
    font-size: 19px;
    background: #EFEFEF;
}
/*
#menu-container>.page .collapsible-body{
    padding: 1.5rem 0 0.5rem 0;
}
*/

@media only screen and (min-width : 480px) { /* Display in 2 columns */
  #menu-container>.page ul.collection{
    columns: 2;
    -webkit-columns: 2;
    -moz-columns: 2;
  }
  #menu-container>.page .collapsible-body li {
    margin-right: -6px;
    margin-left: -7px;
    border-right: 1px solid #e0e0e0;
  }
  #menu-container>.page .collapsible-body li>svg {
      margin: 0px -50px -38px 0 !important; /* Allow display of text over img */
  }

}
@media only screen and (max-width : 680px) and (min-width : 580px) {
  #menu-container>.page .collapsible-body .title {
    font-size: 16px !important;
  }
}
@media only screen and (max-width : 580px) and (min-width : 520px) {
  #menu-container>.page .collapsible-body .title {
    font-size: 14px !important;
  }
}
@media only screen and (max-width : 520px) and (min-width : 480px) {
  #menu-container>.page .collapsible-body .title {
    font-size: 12px !important;
  }
}
</style>

<template>
<div class="page carousel-item" id="{{id}}">
  <div class="center date">{{date}}</div>
  <h5 class="center-align {{state()}}" >{{ $t(dayofweek()) }}</h5>
  <ul class="collapsible" data-collapsible="{{collapsible}}">
    <li>
      <div class="collapsible-header {{lunch_active}}"><i class="material-icons">brightness_low</i> {{ $t("Lunch") }} </div>
      <div class="collapsible-body">
        <ul class="collection">
            <template v-for="meal in menu.lunch">
                <meal :meal="meal"></meal>
            </template>
        </ul>
      </div>
    </li>
    <li>
      <div class="collapsible-header {{dinner_active}}"><i class="material-icons">brightness_3</i> {{ $t("Dinner") }} </div>
      <div class="collapsible-body">
        <ul class="collection">
          <template v-for="meal in menu.dinner">
              <meal :meal="meal"></meal>
          </template>
        </ul>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
import meal from './meal.vue'
import store from '../../modules/store'

export default {
  props: ['id', 'date', 'menu', 'today_id'],
  components: {
    meal: meal
  },
  data: ()=>{ return {
    collapsible : (localStorage.expandallmenu === "true")?"expandable":"accordion",
    lunch_active : (localStorage.expandallmenu === "true" || (new Date()).getHours() < 13)?"active":"",
    dinner_active : (localStorage.expandallmenu === "true" || (new Date()).getHours() >= 13)?"active":""
  }},
  methods : {
    state : function(){
      return this.today_id === this.id ? "today" : "";
    },
    dayofweek : function(){
      days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      return days[(new Date(this.date)).getDay()];
    }
  },
  ready: function(){
    var vue = this;
    var pData = this.$parent._data;
    //console.log(pData.loading)
    //this.$parent.$options.data.someParentMethod(data)

    $('#'+this.id+'>.collapsible').collapsible();
    $(this.menu.lunch).each(function(i,meal){
      pData.loading++;
      //console.log("ask",pData.loading)
      store.meal.get(meal.id).then(function(mealFull){
        if (mealFull == null){
          console.log("Meal not found !",meal.id)
          return //Don't do anything (keep old one)
        }
        pData.loading--;
        //console.log("receive",pData.loading)
        vue.$set('menu.lunch['+i+']', mealFull)
      })
    });

    $(this.menu.dinner).each(function(i,meal){
      pData.loading++;
      //console.log("ask",pData.loading)
      store.meal.get(meal.id).then(function(mealFull){
        if (mealFull == null){
          console.log("Meal not found !",meal.id)
          return //Don't do anything (keep old one)
        }
        pData.loading--;
        //console.log("receive",pData.loading)
        vue.$set('menu.dinner['+i+']', mealFull)
      })
    });
  }
}
</script>
