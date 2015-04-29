if (typeof S === 'undefined') {
    var S = {};
}


S.menu = {
    config: {
        json_url: "http://resel.fr/services/rak/menu.json"
    },
    start: function () {

        if (S.app.isWebBrowser()) {
            S.menu.config.json_url = "test/file/menu.json";
        }
        //TODO
        S.menu.attach_event();
        $.get(S.menu.config.json_url, S.menu.parse, "json");
    },
    attach_event: function () {
        $("#container").hammer()
        $("#container").on("swipeleft", S.page.goRight);
        $("#container").on("swiperight", S.page.goLeft);
        window.addEventListener("orientationchange", function () {
            window.setTimeout("S.page.goTo(S.page.pos,300)", 100);
        }, true);
    },
    parse: function (d) {
//console.log(d);
// ON ajoute à S.page.list de manière ordonné
        $(Object.keys(d).sort()).each(function (i, key) {
//console.log(key);
            S.page.list[key] = d[key];
        });
        //S.page.list = d.sort();
        //console.log(S.page.list);
        i = 0
        for (var index in S.page.list) {
            var menu = S.page.list[index];
            $("#container").append(S.template.jour(i++, index, menu["lunch"], menu["dinner"]))
        }

        if ((new Date()).getHours() < 13)
            $('.collapsible>li:first-child>.collapsible-header').addClass('active')
        else
            $('.collapsible>li:last-child>.collapsible-header').addClass('active')

        $(".progress").hide()
        $('.collapsible').collapsible();
        var day = (new Date()).toJSON().split("T")[0];
        S.page.today = parseInt($(".page[data-date='" + day + "']>h5").css("color", "#ef5350").css("font-weight", "bold").parent().attr('id'))
        S.page.goTo(S.page.today, 0);
    }
}