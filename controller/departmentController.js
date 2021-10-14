const db = require('../config/db_connect');

module.exports.departmentData = async function (req, res) {
    const cId = req.params.cId;
    const dep = req.params.dep;

    const query = `SELECT * FROM [B_Departments] WHERE [Company] = ${{cId}} AND [Department] = '${{cId}}'`;
    const result = db.query(query);
    res.send(result);
}

module.exports.userDepartment = async function (req, res) {
    const query = "";
    const result = db.query(query);
    res.send(result);
}

module.exports.settings = async function (req, res) {
    const query = "";
    const result = db.query(query);
    res.send(result);
}