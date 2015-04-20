var S = {
    init: function () {
        S.attach_event.global();
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
        }
    }
};

$(S.init)