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

    let prevYear = await getPrevYear(cId, uId, year);
    let thisYear = await getThisYear(uId);
    let corrections = await getCorrections(cId, uId, year);
    let taken = (await getTaken(cId, uId, year)) * -1;
    let thisRequest = (await getThisRequest(startDate, endDate)) * -1;
    let total = await prevYear + await thisYear;
    let open = total + await corrections + await taken;
    let remaining = open + await thisRequest;

    res.send({
        'prev': prevYear,
        'this': thisYear,
        'total': total,
        'corrections': corrections,
        'taken': taken,
        'open': open,
        'thisRequest': thisRequest,
        'remaining': remaining
    });
}

async function getPrevYear(cId, uId, year) {
    year -= 1;

    const query = `SELECT HolidayStart FROM B_Salery WHERE EmployeeNumber = ${uId} AND Company = ${cId} AND Year = ${year} AND HolidayStart IS NOT NULL;`;
    const result = await db.query(query);
    if (result[0] !== undefined) return result[0].HolidayStart;
    else return 0;
}

async function getThisYear(uId) {
    const query = `SELECT HolidayPerYear FROM B_Employees WHERE EmployeeNumber = ${uId}`;
    const result = await db.query(query);
    if (result[0] !== undefined) return result[0].HolidayPerYear;
    else return 0;
}

async function getCorrections(cId, uId, year) {
    const query = `SELECT HolidayAdjustment FROM S_TimeAdjustment WHERE EmployeeNumber = ${uId} AND Company = ${cId} AND Year = ${year} AND HolidayAdjustment IS NOT NULL;`;
    const result = await db.query(query);
    if (result[0] !== undefined) return result[0].HolidayAdjustment;
    else return 0;
}

async function getTaken(cId, uId, year) {
    const query = `SELECT sum(DaysHoliday) as holidays FROM DCM.dbo.S_WeekPlan WHERE EmployeeNumber = ${uId} AND Company = ${cId} AND Year = ${year};`;
    const result = await db.query(query);
    if (result[0] !== undefined) return result[0].holidays;
    else return 0;
}

async function getThisRequest(start, end) {
    const query = `SELECT COUNT(Date) as Count FROM B_Calendar WHERE Date >= '${start}' AND Date <= '${end}' AND (KindOfDay = 0 OR KindOfDay = 4 OR KindOfDay = 7)`;
    const result = await db.query(query);
    if (result[0] !== undefined) return result[0].Count;
    else return 0;
}
