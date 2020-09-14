var Schedule = Schedule || {};
!(function (global) {
    "use strict";

    function modelView(table) {
        var myTable = document.getElementById("myTable");
        var row = myTable.insertRow(0);
        var cell1 = row.insertCell(0);
        cell1.innerHTML = table.rows[0].cells[0].doctor;
        for (var d = 1; d <= 7; d++) {
            var cell = row.insertCell(d);
            cell.innerHTML = table.rows[0].cells[d].day + '<br>' + table.rows[0].cells[d].date;
        }
        for (var i = 1; i <= table.rows.length - 1; i++) {
            var row = myTable.insertRow(i);
            var cell1 = row.insertCell(0);
            cell1.innerHTML = table.rows[i].cells[0].lastName + ' ' + table.rows[i].cells[0].firstName + ' ' + table.rows[i].cells[0].middleName
                + '<br>' + table.rows[i].cells[0].room + '<br>' + table.rows[i].cells[0].speciality;
            for (var t = 1; t <= 7; t++) {
                var cell = row.insertCell(t);
                var timeArray = table.rows[i].cells[t];
                if (timeArray.length > 0) {
                    for (var v = 0; v <= timeArray.length - 1; v++) {
                        var time_from = table.rows[i].cells[t][v].time_from;
                        var time_to = table.rows[i].cells[t][v].time_to;
                        var time_from_hours = time_from.getHours();
                        if (time_from_hours < 10) time_from_hours = '0' + time_from_hours;
                        var time_from_minutes = time_from.getMinutes();
                        if (time_from_minutes < 10) time_from_minutes = '0' + time_from_minutes;
                        var time_to_hours = time_to.getHours();
                        if (time_to_hours < 10) time_to_hours = '0' + time_to_hours;
                        var time_to_minutes = time_to.getMinutes();
                        if (time_to_minutes < 10) time_to_minutes = '0' + time_to_minutes;
                        cell.innerHTML += time_from_hours + ':' + time_from_minutes + ' - ' + time_to_hours + ':' + time_to_minutes + '<br>';
                    }
                } else {
                    cell.innerHTML = 'Нет Времени!';
                }
            }
        }
    }

    global.modelView = modelView;

}(window.Schedule));