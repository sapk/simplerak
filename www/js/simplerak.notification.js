/* global cordova */

if (typeof S === 'undefined') {
    var S = {};
}

S.notification = {
    config: {
        icon: "res://icon",
        smallIcon: "res://ic_dialog_info"
                //smallIcon : "res://ic_input_get"
    },
    init: function (force) {

        force = force === true ? true : false;
        //si le plugin est pas chargé on ne continue pas ou que c'est le navigateur 
        if (S.app.isWebBrowser() || !cordova.plugins.notification)
            return;
        //si le module menu n'est pas chargé on arrete car dépendant
        if (!S.menu)
            return;

        //We clear all if we have updated data
        S.menu.get(function (e, list, today, from_cache) {
            if (!from_cache || force) {
                cordova.plugins.notification.local.clearAll(function () {
                    S.notification.parseMenu(list, today);
                }, this);
            }
        });
    },
    parseMenu: function (list, today) {
        //TODO only 3 next day and take configuration in account
        for (var day in list) {
            if (day < today)
                continue;

            var days = localStorage.days ? JSON.parse(localStorage.days) : {};
            var day = S.template.numtoshortday((new Date(day)).getDay());
            if (typeof days[day] !== "undefined" && days[day] === false)
                continue;

            var menu = list[day];
            console.log([day, menu]);

            soir = new Date(day + " 19:00");
            //Si cela fait plus d'une heure que le repas à commencé on n'affiche pas
            if (soir.getTime() < (new Date()).getTime() - 60 * 60 * 1000)
                continue;
            cordova.plugins.notification.local.schedule({
                id: parseInt(day.replace("-", "") + 1),
                title: day + " - Repas du soir",
                text: menu.dinner.main,
                at: soir,
                icon: S.notification.config.icon,
                smallIcon: S.notification.config.smallIcon,
                led: "11FF11"
            });


            midi = new Date(day + " 11:45");
            //Si cela fait plus d'une heure que le repas à commencé on n'affiche pas
            if (midi.getTime() < (new Date()).getTime() - 60 * 60 * 1000)
                continue;
            cordova.plugins.notification.local.schedule({
                id: parseInt(day.replace("-", "") + 2),
                title: day + " - Repas du midi",
                text: menu.lunch.main,
                at: midi,
                icon: S.notification.config.icon,
                smallIcon: S.notification.config.smallIcon,
                led: "11FF11"
            });

        }
    }
};
document.addEventListener('deviceready', S.notification.init, false);
if (S.app.isWebBrowser())
    $(S.notification.init);
