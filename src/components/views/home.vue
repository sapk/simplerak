<style>

#menu-container.carousel .indicators .indicator-item {
    background-color: #CCC;
}

#menu-container.carousel .indicators .indicator-item.active {
    background-color: #333;
}

</style>

<template>

<div v-if="len == 0" class="progress" style="margin-top: 0;">
    <div class="indeterminate"></div>
</div>
<div id="menu-container" class="carousel carousel-slider" data-indicators="true">
    <template v-for="date in days">
        <day :id="$index" :date="date" :menu="list[date]"></day>
    </template>
</div>

</template>

<script>

import { debounce }from '../../modules/tools'
import store from '../../modules/store'
import day from '../partial/day.vue'
import { App } from '../../modules/tools'

//TODO open collapsed  at init

export default {
    data: function() {
        return {
            days: [],
            list: store.menu.list,
            today: (new Date()).toJSON().split("T")[0], //TODO use local not UTC
            today_id: -1
        }
    },
    components: {
        day: day,
    },
    methods: {
        parse: function(data) {
            //TODO optimize
            var minDate = new Date();
            var maxDate = new Date();
            minDate.setDate(minDate.getDate() - 3);
            maxDate.setDate(maxDate.getDate() + 14);
            //Set list to nearby date
            this.$set('list', data);
            this.$set('days', Object.keys(data).sort().filter(function(day) {
                var date = new Date(day);
                return (minDate < date && date < maxDate)
            }));
            this.today_id = this.days.indexOf(this.today);
            return true;
        },
        current: function() {
            return $("#menu-container>.indicators>.indicator-item.active").index("#menu-container>.indicators>.indicator-item");
        },
        setToday: function() {
            $('#menu-container').carousel('set', this.today_id);
            App().headerConfig.activeTodayIcon = true;
        }
    },
    computed: {
        len: function() {
            return Object.keys(this.list).length;
        }
    },
    ready: function() {
        var vue = this;
        App().headerConfig.displayTodayIcon = true;
        App().headerConfig.onShowToday = vue.setToday;

        store.menu.update().then(this.parse).then(function() {
            //Init carrousel
            $('#menu-container').carousel({
                    full_width: true
            }).css('height', $(document).height() - 60);
            vue.setToday();

            $("#menu-container").on("touchend mouseup mouseleave click", debounce(function(evt, id) {
                console.log(vue.current());
                App().headerConfig.activeTodayIcon = vue.current() == vue.today_id;
            }, 500))

            $("#menu-container>.page#" + vue.today_id + ">h5").css("color", "#ef5350").css("font-weight", "bold") //TODO setup in day.vue
        });
    }
}

</script>
