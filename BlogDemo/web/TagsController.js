var blogDao = require("../dao/BlogDao");
var tagsDao = require("../dao/TagsDao");
var TagBlogMappingDao = require("../dao/TagBlogMappingDao");
var timeutil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");
var url = require("url");

var path = new Map();

function queryRandomTags(request, response){
    tagsDao.queryAllTag(function(result){
        result.sort(function(){
            return Math.random() > 0.5 ? true : false;
        })
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}

path.set("/queryRandomTags", queryRandomTags);

function queryBlogByTag(request,response){
    var params = url.parse(request.url, true).query;
    tagsDao.queryTag(params.tag, function(result){
        if(result == null || result.length == 0){
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "评论成功", result));
            response.end();
        }else{
            TagBlogMappingDao.queryBlogByTag(parseInt(result[0].id), parseInt(params.page), parseInt(params.pageSize), function(result){
                var blogList = [];
                for(var i = 0; i < result.length; i++){
                    blogDao.queryBlogById(result[i].blog_id, function(result){
                        blogList.push(result[0]);
                    });
                }
                getResult(blogList, result.length, response);
        })
    }
})
}

path.set("/queryBlogByTag", queryBlogByTag);

function getResult(blogList, len, response){
    if(blogList.length < len){
        setTimeout(function(){
            getResult(blogList, len, response);
        }, 10);
    }else{
        for(var i = 0; i < blogList.length; i++){
            blogList[i].content = blogList[i].content.replace(/<img[\w\W]*>/g, "[图片]");
            blogList[i].content = blogList[i].content.replace(/<[\w\W]{1,5}>/g, "");
            blogList[i].content = blogList[i].content.substring(0, 300);
            blogList[i].ctime = timeutil.timestampToTime(blogList[i].ctime);
        }
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", blogList));
        response.end();
    }
}

function queryBlogByTagCount(request, response){
    var params = url.parse(request.url, true).query;
    // console.log(params);
    tagsDao.queryTag(params.tag, function (result) {
        // console.log(result);
        TagBlogMappingDao.queryBlogByTagCount(result[0].id, function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "查询成功", result));
            response.end();
        });
    });
}

path.set("/queryBlogByTagCount", queryBlogByTagCount);

module.exports.path = path;