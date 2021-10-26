const db = require('../config/db');

module.exports.companyData = async function (req, res) {
    const cId = req.params.cId;
    const query = `SELECT Company as ID, CompanyName1, CompanyName2, Street, Postcode, City, Phone, Picture
                   FROM [B_BaseData]
                   WHERE Company = '${cId}'`;
    const cData = await db.query(query);
    res.send(cData[0]);
}

module.exports.allCompanies = async function (res) {
    const query = `SELECT Company as ID, CompanyName1, CompanyName2, Street, Postcode, City, Phone, Picture
                   FROM [B_BaseData]`;
    const cData = await db.query(query);
    res.send(cData);
}

module.exports.specialTime = async function (req, res) {
    const typeKey = req.params.type;
    const cId = req.params.cId;
    const query = `SELECT TypeKey, ShortName, Name, DaysInAdvance, Red, Green, Blue
                   FROM [B_SpecialTime]
                   WHERE [Company] = ${cId}
                     AND LanguageKey = 'deu'
                     AND TypeKey = ${typeKey}`;
    const result = await db.query(query);
    res.send(result);
}

module.exports.subSpecialTime = async function (req, res) {
    const cId = req.params.cId;
    const query = `SELECT TypeKey,
                          SubTypeKey,
                          ShortName,
                          Name,
                          DaysInAdvance,
                          Red,
                          Green,
                          Blue
                   FROM B_SubSpecialTime
                   WHERE Company = ${cId}
                     AND LanguageKey = 'deu'
                   ORDER BY TypeKey, SubTypeKey`;
    const result = await db.query(query);
    res.send(result);
}

module.exports.settings = async function (req, res) {
    const cId = req.params.cId;
    const query = `SELECT *
                   FROM [B_GeneralSettings]
                   WHERE [Company] = ${cId}`;
    const result = db.query(query);
    res.send(result);
}