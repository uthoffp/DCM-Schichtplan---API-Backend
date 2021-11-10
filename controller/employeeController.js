const db = require('../config/db');

module.exports.userDays = async function (req, res) {
    const cId = req.params.cId;
    const uId = req.params.uId;
    const year = req.params.year;

    const query = `SELECT Year, HolidayStart, HolidayPerYear, WorkingdaysPerWeek
                   FROM DCM.dbo.B_Salery
                   WHERE Company = ${cId}
                     AND EmployeeNumber = ${uId}
                     AND Year = ${year}`;
    const result = await db.query(query);
    res.send(result);
}

module.exports.plannedHolidays = async function (req, res) {
    const cId = req.params.cId;
    const uId = req.params.uId;
    const year = req.params.year;

    const query = `SELECT sum(DaysHoliday) as DH
                   FROM DCM.dbo.S_WeekPlan
                   WHERE Company = ${cId}
                     AND EmployeeNumber = ${uId}
                     AND Year = ${year}`;
    const result = await db.query(query);
    res.send(await result[0].DH.toString());
}

module.exports.actualHolidays = async function (req, res) {
    const cId = req.params.cId;
    const uId = req.params.uId;
    const year = req.params.year;

    const query = `SELECT sum(DaysHoliday) as DH
                   FROM DCM.dbo.S_WeekActual
                   WHERE Company = ${cId}
                     AND EmployeeNumber = ${uId}
                     AND Year = ${year}`;
    const result = await db.query(query);
    res.send(await result[0].DH.toString());
}

module.exports.fromLastYear = async function (req, res) {
    const cId = req.params.cId;
    const uId = req.params.uId;
    const year = req.params.year;

    const query = `SELECT sum(DaysHoliday) as DH
                   FROM DCM.dbo.S_WeekActual
                   WHERE Company = ${cId}
                     AND EmployeeNumber = ${uId}
                     AND Year = ${year}`;
    const result = await db.query(query);
    res.send(await result[0].DH.toString());
}