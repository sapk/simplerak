var S = {
    init: function () {
        S.attach_event.global();
    },
    app: {
        isWebBrowser: function () {
            return !(document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1);
        }
    },
    attach_event: {
        global: function () {
            $("nav #show_menu").sideNav({closeOnClick: true});
            document.addEventListener("menubutton", function () {
                $("nav #show_menu").sideNav('show')
            }, false);
        },
        menu: function () {
            $("#container").hammer()
            $("#container").on("swipeleft", S.page.goRight);
            $("#container").on("swiperight", S.page.goLeft);
            window.addEventListener("orientationchange", function () {
                window.setTimeout("S.page.goTo(S.page.pos,300)", 100);
            }, true);
        }
    }
};

$(S.init)