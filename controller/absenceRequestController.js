const db = require('../config/db');

module.exports.addAbRequest = async function (req, res) {
    const cId = req.params.cId;
    const uId = req.params.uId;
    const query = `INSERT INTO [S_AbsenceRequest] (Company, Department, EmployeeNumber, Status, RequestDate, TypeKey,
                                                   SubTypeKey, AbsenceFirstDate, RequestFirstDate,
                                                   RequestFirstDate_Half,
                                                   RequestLastDate, RequestLastDate_Half, RequestComment, Picture,
                                                   PictureOrgFileName, PictureFileExtension, LastUser)
                   VALUES (${cId}, '${req.body.nameValuePairs.department}', ${uId}, 0, GETDATE(),
                           ${req.body.nameValuePairs.type}, 0, '${req.body.nameValuePairs.start}',
                           '${req.body.nameValuePairs.start}', ${req.body.nameValuePairs.startHalf},
                           '${req.body.nameValuePairs.stop}', ${req.body.nameValuePairs.stopHalf},
                           '${req.body.nameValuePairs.comment}', null, null, '.jpg', ${cId})`;
    const result = await db.query(query);
    res.send(result);
}

module.exports.getHolidays = async function (req, res) {
    const cId = req.params.cId;
    const uId = req.params.uId;
    const startDate = req.params.start;
    const endDate = req.params.end;
    let year = startDate.substring(0, 4);

    let prevYear = getPrevYear(cId, uId, year);
    let thisYear = getThisYear(cId, uId, year);
    let corrections = getCorrections(cId, uId, year);
    let taken = getTaken(cId, uId, year);
    let thisRequest = getThisRequest(cId, uId, startDate, endDate);
    let total = await prevYear + await thisYear;
    let open = total + await corrections + await taken;
    let remaining = open + await thisRequest;

    res.send({
        'prev': prevYear,
        'this': thisYear,
        'corrections': corrections,
        'taken': taken,
        'thisRequest': thisRequest,
        'total': total,
        'open': open,
        'remaining': remaining
    });
}

async function getPrevYear(cId, uId, year) {
    year -= 1;

    const query = `SELECT HolidayStart FROM B_Salery WHERE EmployeeNumber = ${uId} AND Company = ${cId} AND Year = ${year} AND HolidayStart IS NOT NULL;`;
    const result = await db.query(query);
    if (result[0] !== undefined) return result.HolidayStart;
    else return 0;
}

async function getThisYear(cId) {
    const query = `SELECT HolidayPerYear FROM B_Employees WHERE EmployeeNumber = ${cId}`;
    const result = await db.query(query);
    if (result[0] !== undefined) return result.HolidayPerYear;
    else return 0;
}

async function getCorrections(cId, uId, year) {
    const query = `SELECT HolidayAdjustment FROM S_TimeAdjustment WHERE EmployeeNumber = ${uId} AND Company = ${cId} AND Year = ${year} AND HolidayAdjustment IS NOT NULL;`;
    const result = await db.query(query);
    if (result[0] !== undefined) return result.HolidayAdjustment;
    else return 0;
}

async function getTaken(cId, uId, year) {
    const query = `SELECT sum(DaysHoliday) as holidays FROM DCM.dbo.S_WeekPlan WHERE EmployeeNumber = ${uId} AND Company = ${cId} AND Year = ${year};`;
    const result = await db.query(query);
    if (result[0] !== undefined) return result.holidays;
    else return 0;
}

async function getThisRequest(start, end) {
    const query = `SELECT COUNT(Date) as Count FROM B_Calendar WHERE Date >= '${start}' AND Date <= '${end}' AND (KindOfDay = 0 OR KindOfDay = 4 OR KindOfDay = 7)`;
    const result = await db.query(query);
    if (result[0] !== undefined) return result.Count;
    else return 0;
}
