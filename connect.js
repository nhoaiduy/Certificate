var sql = require('mssql/msnodesqlv8');
var config = {
    server: "localhost",
    user: "sa",
    password: "1234@",
    database: "QLCC",
    port: 1433
}

var connect = new sql.ConnectionPool(config).connect().then(pool => {return pool})

module.exports = {
    connect: connect,
    sql: sql
}