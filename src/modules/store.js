import cache from './cache'
import {remove, parseData, parseMeal} from './tools'

if (typeof window.store === 'undefined') {
    window.store = {
      config: {
        //source: "https://resel.fr/services/rak/menu.json", //old
        //source: "menu.json",
        //source_format: "json",
        source: "http://services.telecom-bretagne.eu/rak/rss/menus.xml",
        //source: "test/menus.xml",
        source_format: "xml",
        timeout: 48 * 60 * 60,
        account_urls : //*
        {
          base: "https://services.ard.fr/fr/espaces-clients/etablissements/enst/accueil.html?no_cache=1",
          portemonnaie: "https://services.ard.fr/fr/espaces-clients/etablissements/enst/menu-utilisateur/recharger-mes-porte-monnaie.html",
          operations: "https://services.ard.fr/fr/espaces-clients/etablissements/enst/menu-utilisateur/mes-dernieres-operations.html?no_cache=1",
          rechargements: "https://services.ard.fr/fr/espaces-clients/etablissements/enst/menu-utilisateur/mes-derniers-rechargements-en-ligne.html?no_cache=1"
        }//*/
        /*
        {
              base: "test/accueil-logged.html",
              portemonnaie: "test/recharger-mes-porte-monnaie.html",
              operations: "test/mes-dernieres-operations.html",
              rechargements: "test/mes-derniers-rechargements-en-ligne.html"
        }//*/
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
            let date = (/Menu de la semaine .* \(du (.*) au (.*)\)/g).exec(week_title);
            var endOfWeek = parseData(date[2]);// new Date(Math.max.apply(null,[parseData(data[1]),parseData(data[2])]));
            //console.log(week_title,endOfWeek);
            var days = $(week).html().split("<u>")
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
              var menu = day.split("</u>")[1];

              menu = remove(menu,["<!--[CDATA[<BR/-->]]&gt;","---]]&gt;","<!--[CDATA[","]]-->","]]&gt;","<STRONG-->",'TARGET="_blank"--']);
              let tmp = (/\*\*\*Rampe\*\*\*\| Dejeuner \| (.*) \| \*\*\*Rampe\*\*\*\| Diner \| (.*) \| \*\*\*Cafeteria\*\*\*\| Dejeuner \| /g).exec(menu);

              var meals = tmp[1].split(" | ");
              for (i = 0; i < meals.length; i++) {
                data[date_id].lunch.push(parseMeal(meals[i]));
              }
              var meals = tmp[2].split(" | ");
              for (i = 0; i < meals.length; i++) {
                data[date_id].dinner.push(parseMeal(meals[i]));
              }
            });
          })
          return data;
        },
        update : function(){
          return cache.get(window.store.config.source, window.store.config.timeout, window.store.config.source_format).then(window.store.menu.format)
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

export default window.store
