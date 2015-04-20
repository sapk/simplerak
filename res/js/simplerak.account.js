if (typeof S === 'undefined') {
    var S = {};
}
S.account = {
    urls: {
        base: "https://services.ard.fr/fr/espaces-clients/etablissements/enst.html",
        portemonnaie: "https://services.ard.fr/fr/espaces-clients/etablissements/enst/menu-utilisateur/recharger-mes-porte-monnaie.html",
        operations: "https://services.ard.fr/fr/espaces-clients/etablissements/enst/menu-utilisateur/mes-dernieres-operations.html?no_cache=1",
        rechargements: "https://services.ard.fr/fr/espaces-clients/etablissements/enst/menu-utilisateur/mes-derniers-rechargements-en-ligne.html?no_cache=1"
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
    getForm: function (d) {
        d = $(d).find(".tx-newloginbox-pi1 form").serializeArray()
        var form = {};
        $.map(d, function (n, i) {
            form[n['name']] = n['value'];
        });
        return form;
    },
    reset: function () {
        $.get(S.account.urls.base, function (d) {
            if (S.account.isLogged(d)) {
                //page contain logout form
                var form = S.account.getForm(d);
                $.post(url, form, function (d) {
                    //On se délogue                        
                })
            }
            Materialize.toast('Reset done !', 3000)
        });
        localStorage.removeItem('pass');
        localStorage.removeItem('user');
    },
    start: function () {
        $.get(S.account.urls.base, function (d) {
            if (S.account.isLogged(d)) {
                S.account.parse_page(d)
            } else {
                d = $(d).find(".tx-newloginbox-pi1 form").serializeArray()
                var form = {};
                $.map(d, function (n, i) {
                    form[n['name']] = n['value'];
                });
                //TODO use enc_pass
                if (localStorage.user && localStorage.pass) {
                    form.user = localStorage.user;
                    form.pass = localStorage.pass;
                } else {
                    form.user = prompt("User", "");
                    form.pass = prompt("Password", "");
                    //TODO only if validate
                    localStorage.user = form.user;
                    localStorage.pass = form.pass;
                }
                S.account.hash(form)
                //alert(JSON.stringify(form))
                $.post(S.account.urls.base, form, function (d) {
                    if (S.account.isLogged(d)) {
                        //Si on est authentifié on parse
                        S.account.parse_page(d);
                    } else {
                        //We are not loggued so the credential are bad
                        //TODO detect if not hotspot login page
                        localStorage.removeItem('pass');
                        localStorage.removeItem('user');
                        window.location.reload();
                    }
                })
            }
        });

    },
    parse_page: function (d) {
        //TODO check if we are connectedd
        //alert(d);
        $("#container").append('<h5>' + $(d).find('#user').html().replace(/Bonjour /g, '') + '</h5>')

        $.get(S.account.urls.portemonnaie, function (d) {
            $("#container").append('<p> Solde : ' + $(d).find(".dernier_solde").html() + '</p>')
        });
        $.get(S.account.urls.operations, function (d) {
//                        alert(d)
//                        $("#container").append('<p> Solde : ' + $(d).find(".dernier_solde").html() + '</p>')

            $("#container").append('<p> Dernière transaction : </p>')
            $("#container").append($(d).find("#tx_ardrecharge>table").html())
            /*                 
             $("#container").append('<p> Dernière transaction : <ul id="transcations"></ul></p>')
             /*                
             $(d).find("#tx_ardrecharge>table>toby>tr").each(function (){
             $
             });
             */
        });

        $.get(S.account.urls.rechargements, function (d) {
            $("#container").append('<p> Derniers rechargements : </p>')
            $("#container").append($(d).find("#tx_ardrecharge>table").html())
            /*                 
             $("#container").append('<p> Dernière transaction : <ul id="transcations"></ul></p>')
             /*                
             $(d).find("#tx_ardrecharge>table>toby>tr").each(function (){
             $
             });
             */
        });

        $(".progress").hide()
    }
}