/* global html10n */

var S = {
    config: {
        default_language: "en"
    },
    init: function () {

        var language = localStorage.userLanguage || window.navigator.userLanguage || window.navigator.language || navigator.browserLanguage || navigator.systemLanguage || S.config.default_language;
        //TEST
        //language = "en-US"
        language = language.split("-")[0];
        if ($.inArray(language, ["en", "fr"]) === -1)
            language = S.config.default_language;

        console.log(language);
        html10n.localize(language);

        S.attach_event();

        if (localStorage.theme)
            $("body").addClass("theme-" + localStorage.theme);

    },
    app: {
        isTesting : function(){
          return cordova.platformId === "browser";
        }
      /* Not used anymore
        isWebBrowser: function () {
            return !(document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1);
        }
      */
    },
    attach_event: function () {
        //Le menu de navigation se ferme au clic lorsque l'on est sur  mobile mais pas sur tablette
        $("nav #show_menu").sideNav({closeOnClick: !($(document).width() > 992)});
        document.addEventListener("menubutton", function () {
            $("nav #show_menu").sideNav('show');
        }, false);
    }
};

$(S.init);
