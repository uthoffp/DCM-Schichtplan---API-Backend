const db = require('../Script/db_connect');
const crypto = require('../Script/encrypt');
const jwt = require('jsonwebtoken');

module.exports.login = async function (req, res) {
    const cId = req.params.cId;
    const email = req.params.email;
    const pw = crypto.encrypt(req.query.pw);

    const query = `SELECT EmployeeNumber, FamilyName, FirstName, Password, Company, WebAccessBlocked
                   FROM [B_Employees]
                   WHERE Company = ${cId} AND EMail = '${email}'`;
    const result = await db.query(query);
    const user = result[0];

    if (user != undefined && pw === user.Password) {
        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '60m'});
        res.json({access_token: token});
    } else {
        res.sendStatus(401);
    }
}

module.exports.blockAccount = function (req, res) {
    const cId = req.params.cId;
    const email = req.params.email;
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const query = `UPDATE [B_Employees]
                   SET WebAccessBlocked = 1, LastChange = '${date}', LastUser='WEB-Access'
                   WHERE Company = '${cId}' AND EMail = ${email}`
    db.db_connect(query);
}