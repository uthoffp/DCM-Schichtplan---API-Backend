const db = require('../config/db');

module.exports.departmentData = async function (req, res) {
    const cId = req.params.cId;
    const dep = req.params.dep;

    const query = `SELECT *
                   FROM [B_Departments]
                   WHERE [Company] = ${cId}
                     AND [Department] = '${dep}'`;
    const result = db.query(query);
    res.send(result);
}

module.exports.userDepartment = async function (req, res) {
    const cId = req.params.cId;
    const uId = req.params.uId;
    const query = `SELECT *
                   FROM [B_EmployeeDepartment]
                   WHERE [Company] = ${cId}
                     AND [EmployeeNumber] = ${uId}`;
    const result = db.query(query);
    res.send(result);
}