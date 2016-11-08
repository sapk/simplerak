import cache from './cache'
import {remove, parseData, parseMeal} from './tools'
import config from '../config.json';
//import Vue from 'vue'


if (typeof window.store === 'undefined') {
    window.store = {
      config: config,
      meal : {
        list : {},
        parse : function(id,obj){
//          console.log(obj)
          //console.log(id,obj)
          var dom = $(obj.data);
          let meal = {
            id : id,
            name: "",
            img : "",
            type : "unknown",
            contain :{
              viande : "unknown",
              porc   : "unknown",
              gluten : "unknown",
              alcool : "unknown"
            }
          }

          meal.name = dom.find("article>.row h1").text().trim();
          meal.img = dom.find(".fenetre img.thumbnail").attr("src");
          meal.type = dom.find(".fenetre h4").text().split(" : ")[1];
          dom.find(".fenetre .description>ul>li").each(function(index, el) {
              var d = $(el).text().split(" : ");
              meal.contain[d[0]] = d[1];
          });
          window.store.meal.list[id] = meal;
          return meal;
        },
        get : function(id){
          if(window.store.meal.list[id] == null){
            return cache.get(window.store.config.source_plat+id, window.store.config.timeout_meal, "html")
            .then((obj)=>{return window.store.meal.parse(id,obj)})
            .catch(function (req) {
              console.log(req);
            });
          }else{
            return Promise.resolve(window.store.meal.list[id]);
          }
        }
      },
      menu : {
        list : {},
        format : function(obj){
          //Parse xml from RAK  to near old json from resel
          //TODO simplify and spli all of this.
          var data = {};
          var weeks = $(obj.data).find("item");
          $(weeks).each(function(id,week){
            let week_title = $(week).find("title").text()
            console.log("Week Title : ",week_title);
            let date = (/Menu de la semaine .* \(du (.*) au (.*)\)/g).exec(week_title);
            console.log("Date : ",date);
            var endOfWeek = parseData(date[2]);// new Date(Math.max.apply(null,[parseData(data[1]),parseData(data[2])]));
            console.log("endOfWeek : ",endOfWeek);
            //console.log(week_title,endOfWeek);
            var days = $(week).html().split("<u>")
            console.log("days : ",days);
            days.splice(0, 1);
            $(days).each(function(n,day){
              var date = new Date();
              date.setDate(endOfWeek.getDate() - (days.length - 1) + n);
              var date_id = date.toJSON().split('T')[0];
              data[date_id] = {
                "lunch":[],
                "dinner":[]
              };

              var day_title = day.split("</u>")[0];
              console.log("day_title : ",day_title);
              var menu = day.split("</u>")[1];
              console.log("menu : ",menu);

              menu = remove(menu,["<!--[CDATA[<BR/-->]]&gt;","---]]&gt;","<!--[CDATA[","]]-->","]]&gt;","<STRONG-->",'TARGET="_blank"--']);
              console.log("menu : ",menu);
              let tmp = (/\*\*\*Rampe\*\*\*\| Dejeuner \| (.*) \| \*\*\*Rampe\*\*\*\| Diner \| (.*) \| \*\*\*Cafeteria\*\*\*\| Dejeuner \| /g).exec(menu);
              console.log("tmp : ",tmp);
              if(tmp == null){ //No cafeteria maybe
                tmp = (/\*\*\*Rampe\*\*\*\| Dejeuner \| (.*) \| \*\*\*Rampe\*\*\*\| Diner \| (.*) \| ((--- )|(<\/description>))/g).exec(menu);
                console.log("tmp : ",tmp);
              }

              var meals = tmp[1].split(" | ");
              console.log("meals : ",meals);
              for (i = 0; i < meals.length; i++) {
                data[date_id].lunch.push(parseMeal(meals[i]));
              }
              var meals = tmp[2].split(" | ");
              for (i = 0; i < meals.length; i++) {
                data[date_id].dinner.push(parseMeal(meals[i]));
              }
              console.log("data : ",data);
            });
          })
          return data;
        },
        update : function(){
          return cache.get(window.store.config.source, window.store.config.timeout, window.store.config.source_format)
          .then(window.store.menu.format)
            .catch(function (req) {
              console.log(req);
              //onError
              if (req.statusText == 'timeout')
                console.log('The server is not responding');
              if (req.statusText == 'error')
                console.log("Error getting url ! ", req);
            });
        }
      }
    };
}

window.store.config.expandallmenu = localStorage.expandallmenu === "true";

export default window.store
