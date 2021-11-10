const db = require('../config/db');
const crypto = require('../config/encrypt');
const jwt = require('jsonwebtoken');

module.exports.login = async function (req, res) {
    const cId = req.params.cId;
    const email = req.params.email;
    const pw = crypto.encrypt(req.query.pw);

    const query = `SELECT EmployeeNumber, FamilyName, FirstName, Password, Company, WebAccessBlocked, Department
                   FROM [B_Employees]
                   WHERE Company = ${cId}
                     AND EMail = '${email}'`;
    const result = await db.query(query);
    const user = result[0];

    if (user !== undefined && pw === user.Password) {
        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '60m'});
        res.json({
            token: token,
            uId: user.EmployeeNumber,
            familyName: user.FamilyName,
            firstName: user.FirstName,
            company: user.Company,
            department: user.Department
        });
    } else {
        res.sendStatus(401);
    }
}

module.exports.blockAccount = function (req) {
    const cId = req.params.cId;
    const email = req.params.email;
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const query = `UPDATE [B_Employees]
                   SET WebAccessBlocked = 1,
                       LastChange       = '${date}',
                       LastUser='WEB-Access'
                   WHERE Company = '${cId}'
                     AND EMail = ${email}`
    db.query(query);
}

module.exports.changePassword = function (req) {
    const cId = req.params.cId;
    const uId = req.params.uId;
    const pw = crypto.encrypt(req.body.pw);

    const query = `UPDATE [B_Employees]
                   SET [Password] = '${pw}'
                   WHERE [Company] = ${cId}
                     AND [EmployeeNumber] = ${uId}`;
    db.query(query);
}