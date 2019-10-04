var mysql = require("mysql");

function createConnection(){
    var connection = mysql.createConnection({
        host: "192.168.0.112",
        port: "3306",
        user: "root",
        password: "981017",
        database: "my_bolg"
    });
    return connection;
}

module.exports.createConnection = createConnection;