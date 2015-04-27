var S = {
    default_language: "fr",
    init: function () {

        var language = localStorage.userLanguage || window.navigator.userLanguage || window.navigator.language || navigator.browserLanguage || navigator.systemLanguage || S.default_language;
        //TEST 
        //language = "en-US"
        language = language.split("-")[0]
        if ($.inArray(language, ["en","fr"]) === -1)
            language = S.default_language;
        
        console.log(language);
        html10n.localize(language);

        S.attach_event.global();

        if (localStorage.theme)
            $("body").addClass("theme-" + localStorage.theme);
    },
    app: {
        isWebBrowser: function () {
            return !(document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1);
        }
    },
    attach_event: {
        global: function () {
            //Le menu se ferme au clic lorsque l'on est sur  mobile mais pas sur tablette
            $("nav #show_menu").sideNav({closeOnClick: !($(document).width() > 992)});
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