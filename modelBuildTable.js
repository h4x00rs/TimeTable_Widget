var Schedule = Schedule || {};
!(function (global) {
    "use strict";

    var table = new global.Table;

    function tableBuild(tableData) {
        var row = new global.Row;
        var headLineDoctor = new global.HeadLineDoctor('Врач');
        row.addHeadDoctor(headLineDoctor);
        var serverTime = (tableData.schedule.lpu[0].serverTime);
        var timeZone = (new Date().getTimezoneOffset() * 60000);
        var currentDay = new Date((serverTime * 1000) + 25200000 + timeZone);
        var days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
        var mondayDate = new Date(findMonday(currentDay));
        for (var d = 0; d <= days.length - 1; d++) {
            var date = mondayDate.getDate() + '.0' + (mondayDate.getMonth() + 1) + '.' + mondayDate.getFullYear();
            var headLineDay = new global.HeadLineDay(days[d], date);
            row.addDayCells(headLineDay);
            mondayDate.setDate(mondayDate.getDate() + 1);
        }
        table.addRow(row);
        for (var n = 0; n <= tableData.schedule.lpu[0].doctors.length - 1; n++) {
            for (var r = 0; r <= tableData.schedule.lpu[0].doctors[n].tickets.length - 1; r++) {
                if (tableData.schedule.lpu[0].doctors[n].tickets[r].time <= 0) {
                    break
                } else {
                    var row = new global.Row;
                    var doctorCell = new global.DoctorCell(tableData.schedule.lpu[0].doctors[n].first_name, tableData.schedule.lpu[0].doctors[n].middle_name, tableData.schedule.lpu[0].doctors[n].last_name, tableData.schedule.lpu[0].doctors[n].tickets[r].room, getSpecbyid(tableData.schedule.lpu[0].doctors[n].speciality_code, tableData));
                    row.addDoctorCells(doctorCell);
                    for (var d = 1; d <= 7; d++) {
                        var timeArray = [];
                        row.addDoctorCells(timeArray);
                    }
                    for (var t = 0; t <= tableData.schedule.lpu[0].doctors[n].tickets[r].time.length - 1; t++) {
                        var time_from = new Date((tableData.schedule.lpu[0].doctors[n].tickets[r].time[t].time_from) + 25200000 + timeZone);
                        var time_to = new Date((tableData.schedule.lpu[0].doctors[n].tickets[r].time[t].time_to) + 25200000 + timeZone);
                        var weekDay = time_from.getDay();
                        if (weekDay == 1) {
                            var timeCell = new global.TimeCell(time_from, time_to);
                            row.cells[1].push(timeCell);
                        } else if (weekDay == 2) {
                            var timeCell = new global.TimeCell(time_from, time_to);
                            row.cells[2].push(timeCell);
                        } else if (weekDay == 3) {
                            var timeCell = new global.TimeCell(time_from, time_to);
                            row.cells[3].push(timeCell);
                        } else if (weekDay == 4) {
                            var timeCell = new global.TimeCell(time_from, time_to);
                            row.cells[4].push(timeCell);
                        } else if (weekDay == 5) {
                            var timeCell = new global.TimeCell(time_from, time_to);
                            row.cells[5].push(timeCell);
                        } else if (weekDay == 6) {
                            var timeCell = new global.TimeCell(time_from, time_to);
                            row.cells[6].push(timeCell);
                        } else if (weekDay == 0) {
                            var timeCell = new global.TimeCell(time_from, time_to);
                            row.cells[7].push(timeCell);
                        }
                    }
                }
            }
            table.addRow(row);
        }
        console.log(table);
        return table;
    }

    function findMonday(currentDay) {
        var dayWeekDay = new Date(currentDay);
        var dayWeek = dayWeekDay.getDay() - 1;
        if (dayWeek != 0) {
            var firstDay = dayWeekDay.setDate(dayWeekDay.getDate() - dayWeek);
            return firstDay;
        }
        return dayWeekDay;
    }

    function getSpecbyid(id, tableData) {
        for (var l = 0; l < tableData.schedule.lpu[0].speciality.length; l++) {
            if (tableData.schedule.lpu[0].speciality[l].id === id) {
                return tableData.schedule.lpu[0].speciality[l].name;
            }
        }
    }

    global.tableBuild = tableBuild;

}(window.Schedule));