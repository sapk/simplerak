/* global cordova */

if (typeof S === 'undefined') {
    var S = {};
}

S.notification = {
    config: {
        smallIcon: "res://ic_dialog_info"
                //smallIcon : "res://ic_input_get"
    },
    init: function () {
        //si le plugin est pas chargé on ne continue pas (sauf si browser : test) 
        if (!S.app.isWebBrowser() && !cordova.plugins.notification)
            return;
        //si le module menu n'est pas chargé on arrete car dépendant
        if (!S.menu)
            return;

        S.menu.get(function (e, list, today) {
            for (var day in list) {
                if (day < today)
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
                    icon: "file://img/logo.png",
                    smallIcon: "res://ic_dialog_info",
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
                    icon: "file://img/logo.png",
                    smallIcon: "res://ic_dialog_info",
                    led: "11FF11"
                });

            }
        });

    }
};
document.addEventListener('deviceready', S.notification.init, false);
if (S.app.isWebBrowser())
    $(S.notification.init);