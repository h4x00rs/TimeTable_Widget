// app.js ядро - приложение - контроллер виджета
var Schedule = Schedule || {};
!(function (global) {
    "use strict";

    var
        Widget = function Widget(params) {
            this.run = function () {
                global.loadSchedule(params.apiUrl, params.lpu,
                    function onScheduleLoaded(rawData) {
                        var table = global.tableBuild(rawData);
                        global.modelView(table);
                    });
            };
        }
    ;

    global.Widget = Widget;
}(window.Schedule, window.Schedule.libs));