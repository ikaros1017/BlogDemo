var dbutil = require("./DButil");

function insertEveryDay(content, ctime, success){
    var insertSql = "insert into everyday (`content`, `ctime`) values (?, ?)";
    var params = [content, ctime];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function(error, result){
        if(error == null){
            success(result);
        }else{
            console.log(error);
        }
    });
    connection.end();
}

function queryEveryDay(success){
    var querySql = "select * from everyday order by id desc limit 1";
    var params = [];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function(error, result){
        if(error == null){
            success(result);
            // console.log(result);
        }else{
            console.log(error);
        }
    });
    connection.end();
}

module.exports.insertEveryDay = insertEveryDay;
module.exports.queryEveryDay = queryEveryDay;