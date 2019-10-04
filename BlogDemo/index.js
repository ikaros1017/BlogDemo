var express = require("express");
var globalConfig = require("./config");
var loader = require("./loader");

var http = require('https');
// var bgimg = {};

// function getbgimg(){
//     http.get('https://s0.xinger.ink/acgimg/acgurl.php', function (res) {
//         // console.log(res.headers.location);
//         bgimg = res.headers;
//     }); 
// }



var app = new express();

app.use(express.static("./page/"));

app.post("/editEveryDay", loader.get("/editEveryDay"));
app.get("/queryEveryDay", loader.get("/queryEveryDay"));

app.post("/editBlog", loader.get("/editBlog"));
app.get("/queryBlogByPage", loader.get("/queryBlogByPage"));

app.get("/queryBlogCount", loader.get("/queryBlogCount"));
app.get("/queryBlogById", loader.get("/queryBlogById"));

app.get("/addComment", loader.get("/addComment"));

app.get("/queryRandomCode", loader.get("/queryRandomCode"));
app.get("/queryCommentsByBlogId", loader.get("/queryCommentsByBlogId"));

app.get("/queryAllBlog", loader.get("/queryAllBlog"));

app.get("/queryRandomTags", loader.get("/queryRandomTags"));
app.get("/queryNewComments", loader.get("/queryNewComments"));
app.get("/queryNewHot", loader.get("/queryNewHot"));

app.get("/queryBlogByTag", loader.get("/queryBlogByTag"));
app.get("/queryBlogByTagCount", loader.get("/queryBlogByTagCount"));

app.get("/queryBlogBySearch", loader.get("/queryBlogBySearch"));
app.get("/queryBlogBySearchCount", loader.get("/queryBlogBySearchCount"));

app.get('/getimg', function(req, res){
    http.get('https://s0.xinger.ink/acgimg/acgurl.php', function (result) {
        res.json(result.headers);        
    }); 
});
app.listen(globalConfig.port, function(){
    console.log("sever opening"+ globalConfig.port);
});

