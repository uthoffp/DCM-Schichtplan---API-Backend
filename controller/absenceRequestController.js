const db = require('../config/db');

module.exports.getAbRequest = async function (req, res) {
    const cId = req.params.cId;
    const uId = req.params.uId;
    const query = `SELECT RequestDate, ApprovedFirstDate, ApprovedLastDate
                   FROM S_AbsenceRequest
                   WHERE Company = ${cId}
                     AND [EmployeeNumber] = ${uId}
                     AND [Status] <> 2
                   ORDER BY [AbsenceFirstDate]`;
    const result = await db.query(query);
    res.send(result);
}

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