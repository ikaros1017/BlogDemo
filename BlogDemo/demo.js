var express = require('express');
var http = require('https');
var app = express();
var bgimg = {};
function getbgimg(){
    http.get('https://s0.xinger.ink/acgimg/acgurl.php', function (res) {
        console.log(res.headers.location);
        bgimg = res.headers;
    }); 
}
app.all('*', function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "X-Requested-With");
     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
     res.header("X-Powered-By", ' 3.2.1');
        res.header("Content-Type", "application/json;charset=utf-8");
        next();
    });


app.listen(1017,function(){
    console.log("open");
});
app.get('/getimg', function(req, res){
    getbgimg();
    res.json(bgimg);
});



