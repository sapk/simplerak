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
                var form = S.account.getForm(d);
                //TODO use enc_pass
                if (localStorage.user && localStorage.pass) {
                    form.user = localStorage.user;
                    form.pass = localStorage.pass;
                } else {
                    form.user = prompt("User", "");
                    if (form.user == null) {
                        //L'utilisateur n'as pas voulu sisir ces identifiants on affiche un bouton pour reload et on quitte
                        $("#container").html('<br><a onclick="window.location.reload()" class="waves-effect waves-light btn-large" style="width: 90%;margin: 0 5%;"><i class="mdi-navigation-refresh left"></i>Réessayer</a>')
                        return;
                    }
                    form.pass = prompt("Password", "");
                    if (form.pass == null) {
                        //L'utilisateur n'as pas voulu sisir ces identifiants on affiche un bouton pour reload et on quitte
                        $("#container").html('<br><a onclick="window.location.reload()" class="waves-effect waves-light btn-large" style="width: 90%;margin: 0 5%;"><i class="mdi-navigation-refresh left"></i>Réessayer</a>')
                        return;
                    }
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
        $('#container>.collapsible').show();
        $('#container>.fixed-action-btn').show();
        
        $("#container>h5").append($(d).find('#user').html().replace(/Bonjour /g, ''))

        $.get(S.account.urls.portemonnaie, function (d) {
            $("#portemonnaie>.collapsible-body").append('<p> Solde : ' + $(d).find(".dernier_solde").html() + '</p>')
            $("#portemonnaie>.collapsible-header").addClass("active")
            $('.collapsible').collapsible({
                accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
            });
        });
        $.get(S.account.urls.operations, function (d) {
//                        alert(d)
//                        $("#container").append('<p> Solde : ' + $(d).find(".dernier_solde").html() + '</p>')

//            $("#container").append('<p> Dernière transaction : </p>')
            $("#operations>.collapsible-body").append($(d).find("#tx_ardrecharge>table").html())
            /*                 
             $("#container").append('<p> Dernière transaction : <ul id="transcations"></ul></p>')
             /*                
             $(d).find("#tx_ardrecharge>table>toby>tr").each(function (){
             $
             });
             */
        });

        $.get(S.account.urls.rechargements, function (d) {
            //$("#container").append('<p> Derniers rechargements : </p>')
            $("#rechargements>.collapsible-body").append($(d).find("#tx_ardrecharge>table").html())
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