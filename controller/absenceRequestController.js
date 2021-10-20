const db = require('../config/db');

module.exports.getAbRequest = async function (req, res) {
    const cId = req.params.cId;
    const uId = req.params.uId;
    const query = `SELECT RequestDate, ApprovedFirstDate, ApprovedLastDate
                   FROM S_AbsenceRequest
                   WHERE Company = ${cId}
                     AND [EmployeeNumber] = ${uId} AND [Status] <> 2
                   ORDER BY [AbsenceFirstDate]`;
    const result = await db.query(query);
    res.send(result);
}

module.exports.addAbRequest = async function (req, res) {
    const cId = req.params.cId;
    const uId = req.params.uId;
    const query = `SELECT RequestDate, ApprovedFirstDate, ApprovedLastDate
                   FROM S_AbsenceRequest
                   WHERE Company = ${cId}
                     AND [EmployeeNumber] = ${uId} AND [Status] <> 2
                   ORDER BY [AbsenceFirstDate]`;
    const result = await db.query(query);
    res.send(result);
}