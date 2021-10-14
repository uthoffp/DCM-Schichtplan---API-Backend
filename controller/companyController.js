const db = require('../config/db_connect');

module.exports.companyData = async function (req, res) {
    const cId = req.params.cId;
    const query = `SELECT CompanyName1, CompanyName2, Street, Postcode, City, Phone
                   FROM [B_BaseData]
                   WHERE Company = '${cId}'`;
    const cData = await db.query(query);
    res.send(cData[0]);
}

module.exports.specialTime = function (req, res) {
    const typeKey = req.params.typeKey;
    const cId = req.params.cId;
    const query = `SELECT [Name]
                   FROM [B_SpecialTime]
                   WHERE [Company] = '${cId}' AND LanguageKey = 'deu' AND TypeKey = ${{typeKey}}`;
    db.query(query);
}

module.exports.settings = async function (req, res) {
    const cId = req.params.cId;
    const query = `SELECT * FROM [B_GeneralSettings] WHERE [Company] = ${{cId}}`;
    const result = db.query(query);
    res.send(result);
}