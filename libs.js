//libs.js
var Schedule = Schedule || {};
!(function (global) {
    "use strict";
    var
        isObject = function (entity) {
            return Object.prototype.toString.call(entity) === '[object Object]';
        },

        isFunction = function (entity) {
            return Object.prototype.toString.call(entity) === '[object Function]'
        },

        normalizeMethod = function (method) {
            method = String.prototype.toLowerCase.call(method);
            switch (method) {
                case 'get':
                case 'post':
                    break;
                default:
                    throw new Error('Ajax method is not supported');
            }
            return method;
        },


        createXmlHttpRequest = function (url, params) {
            var xhr = new XMLHttpRequest();
            xhr.open(params.method, url, params.async);
            xhr.send();
            xhr.onreadystatechange = function () {
                if (this.readyState != 4) return;
                if (this.status != 200) {
                    params.error('ошибка: ' + (this.status ? this.statusText : 'запрос не удался'));
                    return;
                }
                params.success(this.responseText);
            };
            return xhr;
        },

        ajax = function (url, settings) {
            settings = isObject(settings) ? settings : {};
            settings.method = typeof (settings.method) !== 'undefined' ? normalizeMethod(settings.method) : 'GET';
            if (!isFunction(settings.error)) {
                settings.error = Schedule.successCallback;
            }
            if (!isFunction(settings.success)) {
                settings.success = Schedule.errorCallback;
            }
            settings.async = settings.async ? !!settings.async : true;
            var xhr = createXmlHttpRequest(url, settings);
            return xhr;
        }
    ;

    global.libs = {
        ajax: ajax
    };
}(window.Schedule));