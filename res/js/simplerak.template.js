if (typeof S === 'undefined') {
    var S = {};
}


S.template = {
    accordion: function (midi, soir) {
        return 	'<ul class="collapsible" data-collapsible="accordion">' +
                '<li><div class="collapsible-header"><i class="mdi-device-brightness-low"></i>Midi</div>' +
                '<div class="collapsible-body">' + S.template.repas(midi) + '</div>' +
                '</li>' +
                '<li>' +
                '<div class="collapsible-header"><i class="mdi-image-brightness-3"></i>Soir</div>' +
                '<div class="collapsible-body">' + S.template.repas(soir) + '</div>' +
                '</li>' +
                '</ul>'
    },
    repas: function (repas) {
        return "<h5 class='center-align'>- Entrée -</h5>" + ((repas.hasOwnProperty("starter")) ? "<p>" + repas.starter.replace(/\n/g, "<br>") + "</p>" : "<center>- - -</center>") +
                "<h5 class='center-align'>-&nbsp &nbspPlat&nbsp &nbsp-</h5>" + ((repas.hasOwnProperty("main")) ? "<p>" + repas.main.replace(/\n/g, "<br>") + "</p>" : "<center>- - -</center>") +
                "<h5 class='center-align'>- Dessert -</h5>" + ((repas.hasOwnProperty("dessert")) ? "<p>" + repas.dessert.replace(/\n/g, "<br>") + "</p>" : "<center>- - -</center>");
    },
    jour: function (id, date, midi, soir) {
        return '<div class="page" id="' + id + '"><h5 class="center-align">' + date + '</h5>' + S.template.accordion(midi, soir) + '</div>';
    }
}