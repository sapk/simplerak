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
#menu-container>.page .collapsible-body{
    padding: 1.5rem 0 0.5rem 0;
}
</style>

<template>
<div class="page carousel-item" id="{{id}}">
  <div class="center date">{{date}}</div>
  <h5 class="center-align">{{dayofweek()}}</h5>
  <ul class="collapsible">
    <li>
      <div class="collapsible-header"><i class="material-icons">brightness_low</i> Lunch </div>
      <div class="collapsible-body">
        <div v-for="meal in menu.lunch" id="{{meal.id}}" >{{meal.name}}</div>
      </div>
    </li>
    <li>
      <div class="collapsible-header"><i class="material-icons">brightness_3</i> Dinner </div>
      <div class="collapsible-body">
        <div v-for="meal in menu.dinner" id="{{meal.id}}" >{{meal.name}}</div>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  props: ['id','date', 'menu', 'expandAllMenu'],
  methods : {
    dayofweek : function(){
      days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      return days[(new Date(this.date)).getDay()];
    }
  },
  ready: function(){
    $('#'+this.id+'>.collapsible').collapsible();
  }
}
</script>
