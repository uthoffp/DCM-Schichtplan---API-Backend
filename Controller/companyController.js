const db = require('../Script/db_connect');

module.exports.contactData = function (companyId) {
    var query = `SELECT CompanyName1, CompanyName2, Street, Postcode, City, Phone FROM [B_BaseData] WHERE Company = '${companyId}'`
    return db.query(query).then(result => {
        return result;
    });
}