if (typeof S === 'undefined') {
    var S = {};
}

S.cache = {
    data: {},
    init: function () {
        if (typeof localStorage.cache !== 'undefined') {
            console.log("Restoring cache from localstorage")
            S.cache.data = JSON.parse(localStorage.cache);
        }
    },
    reset: function () {
        S.cache.data = {};
        localStorage.cache = JSON.stringify(S.cache.data);
    },
    get: function (url, duration, callback, format) {
        //duration in second
        if (typeof S.cache.data[url] !== 'undefined' && S.cache.data[url].at + duration * 1000 > (new Date().getTime())) {
            //We get from cache
            console.log("Getting " + url + " from cache");
            if (typeof _("nav-menu") === 'undefined') {
                //Tant que la traduction est pas chargé on attends
                console.log("Waiting for traduction to be ready !");
                html10n.bind("indexed", function () {
                    console.log("Traduction ready !");
                    callback(S.cache.data[url].data, true);
                });
            } else {
                callback(S.cache.data[url].data, true);
            }
        } else {
            //We get from web
            console.log("Getting " + url + " from web");
            $.get(url, function (d) {
                S.cache.data[url] = {data: d, at: (new Date().getTime())};
                localStorage.cache = JSON.stringify(S.cache.data);
                callback(d, false);
            }, format);
        }
    }
};

$(S.cache.init);