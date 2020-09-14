var Schedule = Schedule || {};
!(function (global) {
    "use strict";

    function Table() {
        this.rows = [];
    }

    function Row() {
        this.cells = [];
    }

    function DoctorCell(firstName, middleName, lastName, room, speciality) {
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.speciality = speciality;
        this.room = room;
    }

    function TimeCell(time_from, time_to) {
        this.time_from = time_from;
        this.time_to = time_to;
    }

    function HeadLineDoctor(doctor) {
        this.doctor = doctor;
    }

    function HeadLineDay(day, date) {
        this.day = day;
        this.date = date;
    }

    Row.prototype.addHeadDoctor = function (doctorHeadCell) {
        this.cells.push(doctorHeadCell);
    };

    Row.prototype.addDayCells = function (dayCell) {
        this.cells.push(dayCell);
    };

    Row.prototype.addDoctorCells = function (doctorCell) {
        this.cells.push(doctorCell);
    };

    Table.prototype.addRow = function (row) {
        this.rows.push(row);
    };

    global.Table = Table;
    global.Row = Row;
    global.DoctorCell = DoctorCell;
    global.TimeCell = TimeCell;
    global.HeadLineDoctor = HeadLineDoctor;
    global.HeadLineDay = HeadLineDay;

}(window.Schedule));