if (typeof S === 'undefined') {
    var S = {};
}


S.template = {
    accordion: function (matin, soir) {
        return 	'<ul class="collapsible" data-collapsible="accordion">' +
                '<li><div class="collapsible-header"><i class="mdi-device-brightness-low"></i>Midi</div>' +
                '<div class="collapsible-body"><p>' + matin.replace(/\n/g, "<br />") + '</p></div>' +
                '</li>' +
                '<li>' +
                '<div class="collapsible-header"><i class="mdi-image-brightness-3"></i>Soir</div>' +
                '<div class="collapsible-body"><p>' + soir.replace(/\n/g, "<br />") + '</p></div>' +
                '</li>' +
                '</ul>'
    },
    jour: function (id, date, matin, soir) {
        return '<div class="page" id="' + id + '"><h5 class="center-align">' + date + '</h5>' + S.template.accordion(matin, soir) + '</div>';
    }
}