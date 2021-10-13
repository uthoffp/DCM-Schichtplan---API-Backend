const sql = require("mssql");
module.exports.query = async function (query) {
    const config = {
        port: 1433,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        server: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        trustServerCertificate: true
    };

    let db = await sql.connect(config)
    let result = await db.request().query(query);
    return result.recordsets[0];
}