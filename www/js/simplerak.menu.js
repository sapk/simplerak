if (typeof S === 'undefined') {
    var S = {};
}


S.menu = {
    config: {
        json_url: "http://resel.fr/services/rak/menu.json"
    },
    list: {},
    get: function (callback) {
        if (S.menu.today) {
            callback(null, S.menu.list, S.menu.today);
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

        if (S.app.isWebBrowser()) {
            S.menu.config.json_url = "test/file/menu.json";
        }

        //Si on a des pages et que l'on a pas déjà analysé
        if (S.page && !S.page.attached)
            S.page.attach_event();

        //TODO check if connectivity and update every 24h with connection and 5 days retention without
        //On cache le menu 48h
        S.cache.get(S.menu.config.json_url, 48 * 60 * 60, S.menu.parse, "json");
    },
    parse: function (d) {
        //On initialise le menu
        S.menu.list = {};
//console.log(d);
// ON ajoute à S.page.list de manière ordonné
        $(Object.keys(d).sort()).each(function (i, key) {
            //console.log(key);
            S.menu.list[key] = d[key];
        });
        //S.page.list = d.sort();
        console.log(S.menu.list);
        i = 0;
        if (S.page) {
            S.page.list = S.menu.list;
            for (var index in S.menu.list) {
                var menu = S.menu.list[index];
                $("#container").append(S.template.jour(i++, index, menu["lunch"], menu["dinner"]));
            }
        }

        if ((new Date()).getHours() < 13)
            $('.collapsible>li:first-child>.collapsible-header').addClass('active')
        else
            $('.collapsible>li:last-child>.collapsible-header').addClass('active')

        $(".progress").hide()
        $('.collapsible').collapsible();

        S.menu.today = (new Date()).toJSON().split("T")[0];

        if (S.page) {
            S.page.today = parseInt($(".page[data-date='" + S.menu.today + "']>h5").css("color", "#ef5350").css("font-weight", "bold").parent().attr('id'));
            S.page.goTo(S.page.today, 0);
        }

        $(S.menu).trigger("menu_parsed", [S.menu.list, S.menu.today]);
    }
};