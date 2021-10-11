const sql = require("mssql");
module.exports.db_connect = async function (query) {
    const config = {
        port: 1433,
        user: 'dcmuser',
        password: 'dcm',
        server: 'localhost',
        database: 'DCM',
        trustServerCertificate: true
    };

    let db = await sql.connect(config)
    return db.request().query('select * from B_BaseData').recordsets;
}