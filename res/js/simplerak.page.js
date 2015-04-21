if (typeof S === 'undefined') {
    var S = {};
}


S.page = {
    pos: 0,
    today: 0,
    list: {},
    goTo: function (n, duration) {
        S.page.pos = n;
        $('#container').animate({scrollLeft: n * $('#container').width() + "px"}, duration);
        //console.log([S.page.pos ,S.page.today])
        if (S.page.pos == S.page.today)
            $("#go_today").parent().addClass('active');
        else
            $("#go_today").parent().removeClass('active');
    },
    goRight: function () {
        S.page.pos = (++S.page.pos > S.page.list.length) ? S.page.list.length : S.page.pos
        S.page.goTo(S.page.pos, 150)
    },
    goLeft: function () {
        S.page.pos = (--S.page.pos < 0) ? 0 : S.page.pos
        S.page.goTo(S.page.pos, 150)
    }
}