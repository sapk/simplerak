if (typeof S === 'undefined') {
    var S = {};
}

S.menu = {
    config: {
        json_url: "https://resel.fr/services/rak/menu.json"
    },
    list: {},
    get: function (callback) {
        if (S.menu.today) {
            callback(null, S.menu.list, S.menu.today, S.menu.from_cache);
        } else {
            S.menu.start();
            $(S.menu).on("menu_parsed", callback);
        }
        //return S.menu.list;
    },
    start: function () {
        $(S.menu).on("menu_parsed", function () {
            console.log("menu parsed !");
        });

        //Si on a des pages et que l'on a pas déjà analysé
        if (S.page && !S.page.attached)
            S.page.attach_event();

        //On cache le menu 48h
        S.cache.get(S.menu.config.json_url, 48 * 60 * 60, S.menu.parse, "json", function (jqXHR, textStatus, errorThrown) {
            //onError
            if (textStatus == 'timeout')
                console.log('The server is not responding');

            if (textStatus == 'error')
                console.log("Error getting url : " + errorThrown);
        });
    },
    parse: function (d, from_cache) {
        console.log(d.length,d,from_cache);
        //On initialise le menu
        S.menu.list = {};
        S.menu.from_cache = from_cache;
        //TODO reset old cache from previous version maybe in cache
        //On ajoute à S.page.list de manière ordonné
        var minDate = new Date();var maxDate = new Date();
        minDate.setDate(minDate.getDate() - 3);
        maxDate.setDate(maxDate.getDate() + 10);
        if(!from_cache || d.length > 20){ // On verifie seulement si cela est refresh
          //d.length > 20 -> We have a old version with a lot in cache
          $(Object.keys(d).sort()).each(function (i, key) {
              //console.log(key);
              //We recall past after 3 day and only next 10 days max.
              var date = new Date(key);
              if(minDate < date && date < maxDate){
                S.menu.list[key] = d[key];
              }
          });
          //We backup the clean version
          S.cache.data[S.menu.config.json_url] = {data: S.menu.list, at: (new Date().getTime())};
          localStorage.cache = JSON.stringify(S.cache.data);
        }else{
          S.menu.list = d;
        }
        //S.page.list = d.sort();
        console.log(S.menu.list.length, S.menu.list);
        i = 0;
        var html="";
        if (S.page) {
            S.page.list = S.menu.list;
            for (var index in S.menu.list) {
                var menu = S.menu.list[index];
                html += S.template.jour(i++, index, menu["lunch"], menu["dinner"]);
            }
        }
        $("#container").append(html);

        $(".progress").hide();

        if (localStorage.expandallmenu && localStorage.expandallmenu == "true") {
            $('ul.collapsible').attr('data-collapsible', "expandable")
            $('.collapsible>li>.collapsible-header').addClass('active')

            $('.collapsible').collapsible();

        } else {
            $('ul.collapsible').attr('data-collapsible', "accordion")
            if ((new Date()).getHours() < 13)
                $('.collapsible>li:first-child>.collapsible-header').addClass('active')
            else
                $('.collapsible>li:last-child>.collapsible-header').addClass('active')

            $('.collapsible').collapsible();
        }


        S.menu.today = (new Date()).toJSON().split("T")[0];

        if (S.page) {
            S.page.today = parseInt($(".page[data-date='" + S.menu.today + "']>h5").css("color", "#ef5350").css("font-weight", "bold").parent().attr('id'));
            S.page.goTo(S.page.today, 0);
        }

        $(S.menu).trigger("menu_parsed", [S.menu.list, S.menu.today, S.menu.from_cache]);
    }
};
