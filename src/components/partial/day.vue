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
#menu-container>.page .collapsible-header {
    font-weight: bold;
    white-space: nowrap;
}
/*
#menu-container>.page .collapsible-body{
    padding: 1.5rem 0 0.5rem 0;
}
*/
</style>

<template>
<div class="page carousel-item" id="{{id}}">
  <div class="center date">{{date}}</div>
  <h5 class="center-align">{{dayofweek()}}</h5>
  <ul class="collapsible">
    <li>
      <div class="collapsible-header"><i class="material-icons">brightness_low</i> Lunch </div>
      <div class="collapsible-body">
        <ul class="collection">
            <template v-for="meal in menu.lunch">
                <meal :meal="meal"></meal>
            </template>
        </ul>
      </div>
    </li>
    <li>
      <div class="collapsible-header"><i class="material-icons">brightness_3</i> Dinner </div>
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
  props: ['id', 'date', 'menu'],
  components: {
    meal: meal
  },
  data: ()=>{ return {/*
    meals : {

    }
    */
  }},
  methods : {
    dayofweek : function(){
      days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      return days[(new Date(this.date)).getDay()];
    }
  },
  ready: function(){
    var vue = this;
    $('#'+this.id+'>.collapsible').collapsible();
    $(this.menu.lunch).each(function(i,meal){
      store.meal.get(meal.id).then(function(mealFull){
        if (mealFull == null){
          console.log("Meal not found !",meal.id)
          return //Don't do anything (keep old one)
        }
        vue.$set('menu.lunch['+i+']', mealFull)
        console.log(meal.id,vue.menu.lunch[i].type,vue.menu.lunch[i]);
      })
    });

    $(this.menu.dinner).each(function(i,meal){
      store.meal.get(meal.id).then(function(mealFull){
        if (mealFull == null){
          console.log("Meal not found !",meal.id)
          return //Don't do anything (keep old one)
        }
        vue.$set('menu.dinner['+i+']', mealFull)
        console.log(meal.id,vue.menu.dinner[i].type,vue.menu.dinner[i]);
      })
    });
  }
}
</script>
