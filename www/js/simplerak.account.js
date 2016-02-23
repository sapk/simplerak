/* global Materialize */

/* MD5 definition */ /* TODO use a lib in bower like crypto-js */
/*
 *  md5.jvs 1.0b 27/06/96
 *
 * Javascript implementation of the RSA Data Security, Inc. MD5
 * Message-Digest Algorithm.
 *
 * Copyright (c) 1996 Henri Torgemane. All Rights Reserved.
 *
 * Permission to use, copy, modify, and distribute this software
 * and its documentation for any purposes and without
 * fee is hereby granted provided that this copyright notice
 * appears in all copies.
 *
 * Of course, this soft is provided "as is" without express or implied
 * warranty of any kind.
 */
function array(a){for(i=0;i<a;i++)this[i]=0;this.length=a}function integer(a){return a%4294967296}function shr(a,b){return a=integer(a),b=integer(b),a-2147483648>=0?(a%=2147483648,a>>=b,a+=1073741824>>b-1):a>>=b,a}function shl1(a){return a%=2147483648,a&!0?(a-=1073741824,a*=2,a+=2147483648):a*=2,a}function shl(a,b){a=integer(a),b=integer(b);for(var c=0;b>c;c++)a=shl1(a);return a}function and(a,b){a=integer(a),b=integer(b);var c=a-2147483648,d=b-2147483648;return c>=0?d>=0?(c&d)+2147483648:c&b:d>=0?a&d:a&b}function or(a,b){a=integer(a),b=integer(b);var c=a-2147483648,d=b-2147483648;return c>=0?d>=0?(c|d)+2147483648:(c|b)+2147483648:d>=0?(a|d)+2147483648:a|b}function xor(a,b){a=integer(a),b=integer(b);var c=a-2147483648,d=b-2147483648;return c>=0?d>=0?c^d:(c^b)+2147483648:d>=0?(a^d)+2147483648:a^b}function not(a){return a=integer(a),4294967295-a}function F(a,b,c){return or(and(a,b),and(not(a),c))}function G(a,b,c){return or(and(a,c),and(b,not(c)))}function H(a,b,c){return xor(xor(a,b),c)}function I(a,b,c){return xor(b,or(a,not(c)))}function rotateLeft(a,b){return or(shl(a,b),shr(a,32-b))}function FF(a,b,c,d,e,f,g){return a=a+F(b,c,d)+e+g,a=rotateLeft(a,f),a+=b}function GG(a,b,c,d,e,f,g){return a=a+G(b,c,d)+e+g,a=rotateLeft(a,f),a+=b}function HH(a,b,c,d,e,f,g){return a=a+H(b,c,d)+e+g,a=rotateLeft(a,f),a+=b}function II(a,b,c,d,e,f,g){return a=a+I(b,c,d)+e+g,a=rotateLeft(a,f),a+=b}function transform(a,b){var c=0,d=0,e=0,f=0,g=transformBuffer;for(c=state[0],d=state[1],e=state[2],f=state[3],i=0;i<16;i++)for(g[i]=and(a[4*i+b],255),j=1;j<4;j++)g[i]+=shl(and(a[4*i+j+b],255),8*j);c=FF(c,d,e,f,g[0],S11,3614090360),f=FF(f,c,d,e,g[1],S12,3905402710),e=FF(e,f,c,d,g[2],S13,606105819),d=FF(d,e,f,c,g[3],S14,3250441966),c=FF(c,d,e,f,g[4],S11,4118548399),f=FF(f,c,d,e,g[5],S12,1200080426),e=FF(e,f,c,d,g[6],S13,2821735955),d=FF(d,e,f,c,g[7],S14,4249261313),c=FF(c,d,e,f,g[8],S11,1770035416),f=FF(f,c,d,e,g[9],S12,2336552879),e=FF(e,f,c,d,g[10],S13,4294925233),d=FF(d,e,f,c,g[11],S14,2304563134),c=FF(c,d,e,f,g[12],S11,1804603682),f=FF(f,c,d,e,g[13],S12,4254626195),e=FF(e,f,c,d,g[14],S13,2792965006),d=FF(d,e,f,c,g[15],S14,1236535329),c=GG(c,d,e,f,g[1],S21,4129170786),f=GG(f,c,d,e,g[6],S22,3225465664),e=GG(e,f,c,d,g[11],S23,643717713),d=GG(d,e,f,c,g[0],S24,3921069994),c=GG(c,d,e,f,g[5],S21,3593408605),f=GG(f,c,d,e,g[10],S22,38016083),e=GG(e,f,c,d,g[15],S23,3634488961),d=GG(d,e,f,c,g[4],S24,3889429448),c=GG(c,d,e,f,g[9],S21,568446438),f=GG(f,c,d,e,g[14],S22,3275163606),e=GG(e,f,c,d,g[3],S23,4107603335),d=GG(d,e,f,c,g[8],S24,1163531501),c=GG(c,d,e,f,g[13],S21,2850285829),f=GG(f,c,d,e,g[2],S22,4243563512),e=GG(e,f,c,d,g[7],S23,1735328473),d=GG(d,e,f,c,g[12],S24,2368359562),c=HH(c,d,e,f,g[5],S31,4294588738),f=HH(f,c,d,e,g[8],S32,2272392833),e=HH(e,f,c,d,g[11],S33,1839030562),d=HH(d,e,f,c,g[14],S34,4259657740),c=HH(c,d,e,f,g[1],S31,2763975236),f=HH(f,c,d,e,g[4],S32,1272893353),e=HH(e,f,c,d,g[7],S33,4139469664),d=HH(d,e,f,c,g[10],S34,3200236656),c=HH(c,d,e,f,g[13],S31,681279174),f=HH(f,c,d,e,g[0],S32,3936430074),e=HH(e,f,c,d,g[3],S33,3572445317),d=HH(d,e,f,c,g[6],S34,76029189),c=HH(c,d,e,f,g[9],S31,3654602809),f=HH(f,c,d,e,g[12],S32,3873151461),e=HH(e,f,c,d,g[15],S33,530742520),d=HH(d,e,f,c,g[2],S34,3299628645),c=II(c,d,e,f,g[0],S41,4096336452),f=II(f,c,d,e,g[7],S42,1126891415),e=II(e,f,c,d,g[14],S43,2878612391),d=II(d,e,f,c,g[5],S44,4237533241),c=II(c,d,e,f,g[12],S41,1700485571),f=II(f,c,d,e,g[3],S42,2399980690),e=II(e,f,c,d,g[10],S43,4293915773),d=II(d,e,f,c,g[1],S44,2240044497),c=II(c,d,e,f,g[8],S41,1873313359),f=II(f,c,d,e,g[15],S42,4264355552),e=II(e,f,c,d,g[6],S43,2734768916),d=II(d,e,f,c,g[13],S44,1309151649),c=II(c,d,e,f,g[4],S41,4149444226),f=II(f,c,d,e,g[11],S42,3174756917),e=II(e,f,c,d,g[2],S43,718787259),d=II(d,e,f,c,g[9],S44,3951481745),state[0]+=c,state[1]+=d,state[2]+=e,state[3]+=f}function init(){for(count[0]=count[1]=0,state[0]=1732584193,state[1]=4023233417,state[2]=2562383102,state[3]=271733878,i=0;i<digestBits.length;i++)digestBits[i]=0}function update(a){var b;b=and(shr(count[0],3),63),count[0]<4294967288?count[0]+=8:(count[1]++,count[0]-=4294967296,count[0]+=8),buffer[b]=and(a,255),b>=63&&transform(buffer,0)}function finish(){var b,a=new array(8),c=0,d=0,e=0;for(c=0;4>c;c++)a[c]=and(shr(count[0],8*c),255);for(c=0;4>c;c++)a[c+4]=and(shr(count[1],8*c),255);for(d=and(shr(count[0],3),63),e=56>d?56-d:120-d,b=new array(64),b[0]=128,c=0;e>c;c++)update(b[c]);for(c=0;8>c;c++)update(a[c]);for(c=0;4>c;c++)for(j=0;j<4;j++)digestBits[4*c+j]=and(shr(state[c],8*j),255)}function hexa(a){var b="0123456789abcdef",c="",d=a;for(hexa_i=0;hexa_i<8;hexa_i++)c=b.charAt(Math.abs(d)%16)+c,d=Math.floor(d/16);return c}function MD5(a){var b,c,d,e,f,g,h;for(init(),d=0;d<a.length;d++)b=a.charAt(d),update(ascii.lastIndexOf(b));for(finish(),e=f=g=h=0,i=0;i<4;i++)e+=shl(digestBits[15-i],8*i);for(i=4;i<8;i++)f+=shl(digestBits[15-i],8*(i-4));for(i=8;i<12;i++)g+=shl(digestBits[15-i],8*(i-8));for(i=12;i<16;i++)h+=shl(digestBits[15-i],8*(i-12));return c=hexa(h)+hexa(g)+hexa(f)+hexa(e)}var state=new array(4),count=new array(2);count[0]=0,count[1]=0;var buffer=new array(64),transformBuffer=new array(16),digestBits=new array(16),S11=7,S12=12,S13=17,S14=22,S21=5,S22=9,S23=14,S24=20,S31=4,S32=11,S33=16,S34=23,S41=6,S42=10,S43=15,S44=21,ascii="01234567890123456789012345678901 !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
/****** MD5 definition end *******/

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
        base: "https://services.ard.fr/fr/espaces-clients/etablissements/enst/accueil.html?no_cache=1",
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
        return $(d).find("h1.home").length;
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
            if (S.app.isTesting()) {
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
        if (S.app.isTesting()) {
            //Testing envirronement
            S.account.urls = {
                base: "test/file/enst-logged.html",
                portemonnaie: "test/file/recharger-mes-porte-monnaie.html",
                operations: "test/file/mes-dernieres-operations.html",
                rechargements: "test/file/mes-derniers-rechargements-en-ligne.html"
            };
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
        //$(d).find("h1.home>span").remove();
        $("#container>h5").append($(d).find("h1.home").text().replace(/Bonjour /g, '').replace(/Choisissez .*/g, ''));

        //On cache le porte monnaie mais on accepte que 5 min ici car cela permet qu'il soi dispo pour les notifications
        S.cache.get(S.account.urls.portemonnaie, 5 * 60, function (d) {
            $("#portemonnaie>.collapsible-body").append('<p> ' + _('Balance') + ' : <b>' + $(d).find(".dernier_solde").html() + '</b></p>');
            $("#portemonnaie>.collapsible-header").addClass("active");
            $('.collapsible').collapsible({
                accordion: true // A setting that changes the collapsible behavior to expandable instead of the default accordion style
            });
            window.setTimeout('$(".progress").hide();', 500);
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
