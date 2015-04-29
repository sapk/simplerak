if (typeof S === 'undefined') {
    var S = {};
}

S.notification = {
    init: function () {

        cordova.plugins.notification.local.on("schedule", function (notification) {
            //alert("scheduled: " + JSON.stringify(notification));
        });
        cordova.plugins.notification.local.on("trigger", function (notification) {
            alert("triggered: " + JSON.stringify(notification));
            cordova.plugins.notification.local.update([{
                    id: 1,
                    title: "Updated Midi Notification"
                }, {
                    id: 2,
                    title: "Updated Soir Notification"
                }, {
                    id: 3,
                    title: "Updated Test Notification"
                }]);
        });
        cordova.plugins.notification.local.on("update", function(notification) {
            alert("updated: " + JSON.stringify(notification));
        });
        cordova.plugins.notification.local.on("click", function (notification) {
            alert("clicked: " + JSON.stringify(notification));
        });
        now = new Date().getTime();
        //alert(now);
        var start = new Date();
        start.setHours(0, 0, 0, 0);
        start = start.getTime();
        //alert(start);

        midi = new Date(start + (11 * 60 * 60 + 40 * 60) * 1000);
        //alert(midi);
        cordova.plugins.notification.local.schedule({
            id: 1,
            title: "Midi !",
            text: "...",
            at: midi,
            every: "day",
            led: "11FF11"
        });

        soir = new Date(start + (19 * 60 * 60 + 5 * 60) * 1000);
        //alert(soir);
        cordova.plugins.notification.local.schedule({
            id: 2,
            title: "Soir !",
            text: "...",
            at: soir,
            every: "day",
            led: "1111FF"
        });
        //*
        test = new Date(now + 10 * 1000);
        alert(test);
        cordova.plugins.notification.local.schedule({
            id: 3,
            title: "Test !",
            text: "...",
            at: test,
            every: "day",
            led: "FF1111"
        });
        //*/
        //*/
        /*
         cordova.plugins.notification.local.schedule({
         id: 1,
         title: "Midi !",
         message: "...",
         icon: "img/logo.png",
         sound: null,
         data: {}
         }, function () {
         }, function () {
         });
         */
    }
};

document.addEventListener('deviceready', S.notification.init, false);