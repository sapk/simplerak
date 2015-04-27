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
        S.attach_event.menu();
        $.get(S.menu.config.json_url, S.menu.parse, "json");
    },
    parse: function (d) {
        S.page.list = d;
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