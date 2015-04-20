var S = {
    config: {
        ics_url: "http://resel.fr/services/rak/menu.ics"
    },
    init: function () {
        S.attach_event.global();

    },
    start_menu: function () {
        var app = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
        if (!app) {
            S.config.ics_url = "menu.ics";
        }

        S.attach_event.menu();
        $.get(S.config.ics_url, S.parse_cal)
    },
    attach_event: {
        global: function () {
            $("nav #show_menu").sideNav({closeOnClick: true});
        },
        menu: function () {
            $("#container").hammer()

            $("#container").on("swipeleft", S.page.goRight);
            $("#container").on("swiperight", S.page.goLeft);
        }
    },
    parse_cal: function (d) {
        //console.log(d);
        ics = ICAL.parse(d)
        for (i = 1; i < ics[2].length; i++) {
            if (ics[2][i][0] == "vevent") {
                //console.log(ics[2][i])
                //console.log([ics[2][i][1][0][3],ics[2][i][1][3][3],ics[2][i][1][4][3]])
                var daytime = ics[2][i][1][4][3].split("T");
                if (!S.page.list.hasOwnProperty(daytime[0]))
                    S.page.list[daytime[0]] = {};

                S.page.list[daytime[0]][daytime[1]] = ics[2][i][1][3][3];
            }
        }

        i = 0
        for (var index in S.page.list) {
            var menu = S.page.list[index];
            $("#container").append(S.template.jour(i++, index, menu["12:00:00"], menu["19:15:00"]))
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
};

$(S.init)