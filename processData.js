//processData.js обработка данных
var Schedule = Schedule || {};
!(function (global) {
    "use strict";

    var
        modelBuild = function (rawData) {
            var array = rawData.schedule.lpu[0];

            function getSpecbyid(id) {
                for (var l = 0; l < array.speciality.length; l++) {
                    if (array.speciality[l].id === id) {
                        return array.speciality[l].name;
                    }
                }
            }

            function getDivisionbyid(id) {
                for (var l = 0; l < array.divisions.length; l++) {
                    if (array.divisions[l].code === id) {
                        return array.divisions[l].name;
                    }
                }
            }

            var raws = [];
            for (var i = 0; i <= array.doctors.length - 1; i++) {
                var lastName = array.doctors[i].last_name;
                var firstName = array.doctors[i].first_name;
                var middleName = array.doctors[i].middle_name;
                var spec = getSpecbyid(array.doctors[i].speciality_code);
                for (var t = 0; t <= array.doctors[i].tickets.length - 1; t++) {
                    var room = array.doctors[i].tickets[t].room;
                    var division_name = getDivisionbyid(array.doctors[i].tickets[t].division_code);
                    var time = array.doctors[i].tickets[t].time;

                    raws.push({
                        name: lastName + ' ' + middleName + ' ' + firstName,
                        speciality: spec,
                        room: room,
                        divisionName: division_name,
                        time: time
                    });
                }
            }
            //console.log(raws);
        };

    global.modelBuild = modelBuild

}(window.Schedule));