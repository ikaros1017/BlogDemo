var everyDayDao = require("../dao/everyDayDao");
var timeutil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");
var path = new Map();

function editEveryDay(req, res){
    req.on("data", function(data){
        everyDayDao.insertEveryDay(data.toString().trim(), timeutil.getNow(), function(result){
            res.writeHead(200);
            res.write(respUtil.writeResult("success", "添加成功", null));
            res.end();
        });
    })
}

path.set("/editEveryDay", editEveryDay);

function queryEveryDay(req, res){
    everyDayDao.queryEveryDay(function(result){
            res.writeHead(200);
            res.write(respUtil.writeResult("success", "添加成功", result));
            res.end();
    });
}

path.set("/queryEveryDay", queryEveryDay);

module.exports.path = path;