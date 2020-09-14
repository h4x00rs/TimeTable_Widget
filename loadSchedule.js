//loadSchedule.js запрашивает данные
var Schedule = Schedule || {};
!(function (global) {
    "use strict";

    var loadSchedule = function (apiUrl, lpu, onScheduleLoaded) {
        var
            URL = apiUrl + '?lpu=' + lpu,

            processRawData = function (rawData) {
                var rawData = JSON.parse(rawData);
                return rawData;
            },

            successCallback = function (rawData) {
                var rawData = processRawData(rawData);
                 onScheduleLoaded(rawData);
            },
            errorCallback = function (e) {
                console.log(e);
            };

        Schedule.libs.ajax(URL, {
            method: 'GET',
            success: successCallback,
            async: true,
            error: errorCallback
        });
    };

    global.loadSchedule = loadSchedule;
    global.successCallback = loadSchedule.successCallback;
    global.errorCallback = loadSchedule.errorCallback;
}(window.Schedule, window.Schedule.libs));