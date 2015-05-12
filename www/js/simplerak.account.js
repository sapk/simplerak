/* global Materialize */

if (typeof S === 'undefined') {
    var S = {};
}

//Polyfill
Number.isInteger = Number.isInteger || function (value) {
    return typeof value === "number" &&
            isFinite(value) &&
            Math.floor(value) === value;
};

S.account = {
    urls: {
        base: "https://services.ard.fr/fr/espaces-clients/etablissements/enst.html",
        portemonnaie: "https://services.ard.fr/fr/espaces-clients/etablissements/enst/menu-utilisateur/recharger-mes-porte-monnaie.html",
        operations: "https://services.ard.fr/fr/espaces-clients/etablissements/enst/menu-utilisateur/mes-dernieres-operations.html?no_cache=1",
        rechargements: "https://services.ard.fr/fr/espaces-clients/etablissements/enst/menu-utilisateur/mes-derniers-rechargements-en-ligne.html?no_cache=1"
    },
    urls_test: {
        base: "test/file/enst-logged.html",
        portemonnaie: "test/file/recharger-mes-porte-monnaie.html",
        operations: "test/file/mes-dernieres-operations.html",
        rechargements: "test/file/mes-derniers-rechargements-en-ligne.html"
    },
    hash: function (form) {
        if (form.pass) {
            var enc_pass = MD5(form.pass);
            var str = form.user + ":" + enc_pass + ":" + form.challenge;
            form.pass = MD5(str);
            return true;
        } else {
            return false;
        }
    },
    isLogged: function (d) {
        return $(d).find("#user").length;
    },
    rechargeOf: function (num) {
        num = parseInt(num);
        if (!(Number.isInteger(num)) || num < 50)
            return alert("Montant non numérique ou inférieur à 50");

        $(".fixed-action-btn").mouseleave();
        $(".fixed-action-btn>a.btn-floating.btn-large").removeClass('red').removeClass('waves-effect').addClass('grey').addClass('disabled');
        $(".fixed-action-btn>a.btn-floating.btn-large>div.preloader-wrapper.small").addClass('active').css("top", "-50px");

        //return;
        //console.log("Rechargement de : " + num + "€")
        $.get(S.account.urls.portemonnaie, function (d) {
            form = S.account.getForm(d, "form");
            //console.log(form)
            //form[Object.keys(form)[0]] = num
            var data = {
                xajax : "_paypreviewAction",
                xajaxr : new Date().getTime(),
                "xajaxargs[]" : ("<xjxquery><q>" + Object.keys(form)[0] + "=" + num + ".00&pdav0=0.00%20%E2%82%AC&pdav1=50.00%20%E2%82%AC%20&pdav2=60.00%20%E2%82%AC%20&pdav3=70.00%20%E2%82%AC%20&pdav4=80.00%20%E2%82%AC%20&pdav5=90.00%20%E2%82%AC%20&pdav6=100.00%20%E2%82%AC%20</q></xjxquery>")
            };
            //alert(JSON.stringify(S.account.getForm(d, "form")))
            //alert(JSON.stringify(data))
            //TODO 
            if (S.app.isWebBrowser()) {
                $.get("test/file/portemonnaie-rechargement-reponse.html", function (d) {
                    $("#modal-payement .modal-content").html(
                            '<FORM METHOD=POST ACTION="https://scellius.lapostefinance.fr/cgis-payment-scellius/prod/callpayment" target="_top">' +
                            $(d).find("form[action*='lapostefinance']").html() +
                            '</FORM>');
                    $("#modal-payement .modal-content img,#modal-payement .modal-content input[type='IMAGE']").each(function () {
//                        $(this).attr("src", "https://services.ard.fr/" + $(this).attr("src"));
                        $(this).attr("src", "img/card/" + $(this).attr("src").split('\\').pop().split('/').pop());
                    }).on("click", function (e) {
                        $(this).parent().hide();
                        $("#modal-payement .modal-content").append("<div class='center'>" + $(".fixed-action-btn .preloader-wrapper")[0].outerHTML + "</div>");
                        $("#modal-payement .modal-content .preloader-wrapper").removeClass("small").attr("style", "height: 56px;width: 56px").addClass("active");
                        //e.preventDefault();
                    });
                    $("#modal-payement .modal-content>form>div[align='center']:eq(0)").html(_('paiement-choice') + " :<br><br>");
                    $('#modal-payement').openModal();
                    $(".fixed-action-btn>a.btn-floating.btn-large").addClass('red').addClass('waves-effect').removeClass('grey').removeClass('disabled');
                    $(".fixed-action-btn>a.btn-floating.btn-large>div.preloader-wrapper.small").removeClass('active').css("top", "0px");
                }, "html");
            } else {
                $.post(S.account.urls.portemonnaie + "?type=110124", data, function (d) {
                    //alert(d)
                    $("#modal-payement .modal-content").html(
                            '<FORM METHOD=POST ACTION="https://scellius.lapostefinance.fr/cgis-payment-scellius/prod/callpayment" target="_top">' +
                            $(d).find("form[action*='lapostefinance']").html() +
                            '</FORM>');
                    //alert($("#modal-payement .modal-content").html())
                    $("#modal-payement .modal-content img,#modal-payement .modal-content input[type='IMAGE']").each(function () {
                        //$(this).attr("src", "https://services.ard.fr/" + $(this).attr("src"));
                        $(this).attr("src", "img/card/" + $(this).attr("src").split('\\').pop().split('/').pop());
                    }).on("click", function (e) {
                        $(this).parent().hide();
                        $("#modal-payement .modal-content").append("<div class='center'>" + $(".fixed-action-btn .preloader-wrapper")[0].outerHTML + "</div>");
                        $("#modal-payement .modal-content .preloader-wrapper").removeClass("small").attr("style", "height: 56px;width: 56px").addClass("active");
                        //e.preventDefault();
                    });
                    $("#modal-payement .modal-content>form>div[align='center']:eq(0)").html(_('paiement-choice') + " :<br><br>");
                    $('#modal-payement').openModal();
                    $(".fixed-action-btn>a.btn-floating.btn-large").addClass('red').addClass('waves-effect').removeClass('grey').removeClass('disabled');
                    $(".fixed-action-btn>a.btn-floating.btn-large>div.preloader-wrapper.small").removeClass('active').css("top", "0px");
                }, "html");
            }
        });
    },
    getForm: function (d, selector) {
        if (!selector)
            selector = ".tx-newloginbox-pi1 form";

        data = $(d).find(selector).serializeArray();
        var form = {};
        $.map(data, function (n, i) {
            form[n['name']] = n['value'];
        });
        return form;
    },
    reset: function () {
        $.get(S.account.urls.base, function (d) {
            if (S.account.isLogged(d)) {
                //page contain logout form
                var form = S.account.getForm(d);
                $.post(S.account.urls.base, form, function (d) {
                    if (S.account.isLogged(d))
                        Materialize.toast('It seem it doesn\'t work well!', 3000);
                    else
                        Materialize.toast('Reset done !', 3000);
                });
            }
        });
        S.cache.reset();
        localStorage.removeItem('pass');
        localStorage.removeItem('user');
    },
    start: function () {
        if (S.app.isWebBrowser()) {
            //Testing envirronement
            S.account.urls = S.account.urls_test;
        }
        //on cache 5 minute histoire d'éviter trop d'appel à chaque ouverture de page
        S.cache.get(S.account.urls.base, 5 * 60, function (d, from_cache) {
            if (S.account.isLogged(d)) {
                S.account.parse_page(d);
            } else {
                console.log("We are not logged!");
                if (from_cache) {
                    //On vient du cache et on est pas auth donc on clear et on restart
                    S.cache.reset();
                    window.location.reload();
                } else {
                    $(S.account).on("logged", function (e, isLogged) {
                        if (isLogged) {
                            //On est authentifié on reset le cache et on restart
                            S.cache.reset();
                            window.location.reload();
                        } else {
                            //Sinon on demande à recommencer
                            $(".progress").hide();
                            $("#container").html('<br><a onclick="window.location.reload()" class="waves-effect waves-light btn-large" style="width: 90%;margin: 0 5%;"><i class="mdi-navigation-refresh left"></i>Réessayer</a>');
                        }
                    });
                    S.account.login(d);
                }
            }
        }, null, function () {
            //OnFail
            $("#container").html('<br><a onclick="window.location.reload()" class="waves-effect waves-light btn-large" style="width: 90%;margin: 0 5%;"><i class="mdi-navigation-refresh left"></i>Réessayer</a>');
        });

    },
    login: function (d) {
        var form = S.account.getForm(d);
        //TODO use enc_pass
        if (localStorage.user && localStorage.pass) {
            form.user = localStorage.user;
            form.pass = localStorage.pass;
        } else {
            form.user = prompt("User", "");
            if (form.user === null) {
                //L'utilisateur n'as pas voulu sisir ces identifiants on affiche un bouton pour reload et on quitte
                return $(S.account).trigger("logged", [false]);
            }
            form.pass = prompt("Password", "");
            if (form.pass === null) {
                //L'utilisateur n'as pas voulu saisir ces identifiants on affiche un bouton pour reload et on quitte
                return $(S.account).trigger("logged", [false]);
            }
            //TODO only if validate
            localStorage.user = form.user;
            localStorage.pass = form.pass;
        }
        S.account.hash(form);
        //alert(JSON.stringify(form))
        $.post(S.account.urls.base, form, function (d) {
            if (S.account.isLogged(d)) {
                //On est auth donc on nettoie le cache
                return $(S.account).trigger("logged", [true]);
            } else {
                //We are not loggued so the credential are bad
                //TODO detect if not hotspot login page
                localStorage.removeItem('pass');
                localStorage.removeItem('user');
                return $(S.account).trigger("logged", [false]);
            }
        });
    },
    parse_page: function (d) {
        //TODO check if we are connectedd
        //alert(d);
        $('#container>.collapsible').show();
        $('#container>.fixed-action-btn').show();

        $("#container>h5").append($(d).find('#user').html().replace(/Bonjour /g, ''));

        //On cache le porte monnaie mais on accepte que 5 min ici car cela permet qu'il soi dispo pour les notifications
        S.cache.get(S.account.urls.portemonnaie, 5 * 60, function (d) {
            $("#portemonnaie>.collapsible-body").append('<p> ' + _('Balance') + ' : <b>' + $(d).find(".dernier_solde").html() + '</b></p>');
            $("#portemonnaie>.collapsible-header").addClass("active");
            $('.collapsible').collapsible({
                accordion: true // A setting that changes the collapsible behavior to expandable instead of the default accordion style
            });
            window.setTimeout('$(".progress").hide();', 300);
        });
        S.cache.get(S.account.urls.operations, 5 * 60, function (d) {
            $("#operations>.collapsible-body").append("<table class='striped'>" + $(d).find("#tx_ardrecharge>table").html() + "</table>");
            $("#operations>.collapsible-body thead").remove();
            $("#operations>.collapsible-body tfoot").remove();
            $("#operations>.collapsible-body tbody tr:first-child").remove();
            $("#operations>.collapsible-body tbody tr td:first-child").remove();
        });

        S.cache.get(S.account.urls.rechargements, 5 * 60, function (d) {
            $("#rechargements>.collapsible-body").append("<table class='striped'>" + $(d).find("#tx_ardrecharge>table").html() + "</table>");
            $("#rechargements>.collapsible-body thead").remove();
            $("#rechargements>.collapsible-body tfoot").remove();
            $("#rechargements>.collapsible-body tbody tr td:nth-child(2)").remove();
            $("#rechargements>.collapsible-body tbody tr td:nth-child(4)").each(function () {
                if ($(this).text().toLowerCase().indexOf("accepté") >= 0) {
                    $(this).parent().addClass("green lighten-5");
                } else if ($(this).text().toLowerCase().indexOf("refusé") >= 0) {
                    $(this).parent().addClass("red lighten-5");
                }
            }).remove();
            //$("#rechargements>.collapsible-body tbody tr:first-child").remove()
            $("#rechargements>.collapsible-body table").prepend("<thead>" + $("#rechargements>.collapsible-body tbody tr:first-child").remove().html() + "</thead>");
            $("#rechargements>.collapsible-body table thead td").each(function () {
                $(this).replaceWith($('<th>' + this.innerHTML + '</th>'));
            });

        });

    }
};
