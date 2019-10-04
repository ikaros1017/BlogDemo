var blogDao = require("../dao/BlogDao");
var tagsDao = require("../dao/TagsDao");
var TagBlogMappingDao = require("../dao/TagBlogMappingDao");
var commentDao = require("../dao/CommentDao");
var timeutil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");
var captcha = require("svg-captcha");
var url = require("url");

var path = new Map();

function queryNewComments(request,response){
    commentDao.queryNewComments(function(result){
        for(var i = 0; i < result.length; i++){
            result[i].ctime = timeutil.timestampToTime(result[i].ctime);
        }
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}

path.set("/queryNewComments", queryNewComments);

function queryCommentsByBlogId(request,response){
    var params = url.parse(request.url, true).query;

    commentDao.queryCommentsByBlogId(parseInt(params.bid),function(result){
        for(var i = 0; i < result.length; i++){
            result[i].ctime = timeutil.timestampToTime(result[i].ctime);
        }
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "评论成功", result));
        response.end();
    })
}

path.set("/queryCommentsByBlogId", queryCommentsByBlogId);

function addComment(request, response){
    var params = url.parse(request.url, true).query;

    commentDao.insertComment(parseInt(params.bid), parseInt(params.parent), params.parentName, params.userName, params.email, params.content, timeutil.getNow(), timeutil.getNow(),function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "评论成功", null));
        response.end();
    })
}

path.set("/addComment", addComment);

function queryRandomCode(request, response){
    var img = captcha.create({fontSize: 50, width: 100,height: 34});
    // console.log(img);
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "请求成功", img));
    response.end();
}

path.set("/queryRandomCode", queryRandomCode);

module.exports.path = path;