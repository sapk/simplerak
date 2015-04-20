if (typeof S === 'undefined') {
    var S = {};
}


S.menu = {
    config: {
        json_url: "http://resel.fr/services/rak/menu.json"
    },
    start: function () {

        var app = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
        if (!app) {
            S.menu.config.json_url = "menu.json";
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

        var day = (new Date()).toJSON().split("T")[0]
        S.page.today = parseInt($(".page>h5:contains('" + day + "')").css("color", "#f44336").parent().attr('id'))
        S.page.goTo(S.page.today, 0);
    }
}