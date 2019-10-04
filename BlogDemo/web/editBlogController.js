var blogDao = require("../dao/BlogDao");
var tagsDao = require("../dao/TagsDao");
var TagBlogMappingDao = require("../dao/TagBlogMappingDao");
var timeutil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");
var url = require("url");

var path = new Map();

function queryNewHot(request, response){
    blogDao.queryNewHot(function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "评论成功", result));
        response.end();
    })
}

path.set("/queryNewHot", queryNewHot);


function queryAllBlog(request,response){
    blogDao.queryAllBlog(function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}

path.set("/queryAllBlog", queryAllBlog);

function queryBlogById(request, response){
    var params = url.parse(request.url, true).query;
    // console.log(params);
    blogDao.queryBlogById(parseInt(params.bid), function(result){
        for(var i = 0; i < result.length; i++){
            result[i].ctime = timeutil.timestampToTime(result[i].ctime);
        }
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
        blogDao.updateBlogViewsById(parseInt(params.bid), function(result){
        })
    })
}

path.set("/queryBlogById", queryBlogById);

function queryBlogCount(request, response){
    blogDao.queryBlogCount(function(result){
        // console.log(result);
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}

path.set("/queryBlogCount", queryBlogCount);

function queryBlogByPage(request, response){
    var params = url.parse(request.url, true).query;
    blogDao.queryBlogByPage(parseInt(params.page), parseInt(params.pageSize), function(result){
        for(var i = 0; i < result.length; i++){
            result[i].content = result[i].content.replace(/<img[\w\W]*>/g, "[图片]");
            result[i].content = result[i].content.replace(/<[\w\W]{1,5}>/g, "");
            result[i].content = result[i].content.substring(0, 300);
            result[i].ctime = timeutil.timestampToTime(result[i].ctime);
        }
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    });
}
path.set("/queryBlogByPage", queryBlogByPage);

function editBlog(request, response){
    var params = url.parse(request.url, true).query;
    var tags = params.tags.replace(/ /g, "").replace("，", ",");
    request.on("data", function(data){
        blogDao.insertBlog(params.title, data.toString(), tags, 0, timeutil.getNow(), timeutil.getNow(), function(result){
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "添加成功", null));
            response.end();
            var blogId = result.insertId;
            var tagList = tags.split(",");
            for(var i = 0; i < tagList.length; i++){
                if(tagList[i] == ""){
                    continue;
                }else{
                    queryTag(tagList[i], blogId);
                }
            }
        })
    })
}

path.set("/editBlog" ,editBlog);

function queryTag(tag, blogId){
    tagsDao.queryTag(tag, function(result){
        if(result == null || result.length == 0){
            insertTag(tag, blogId);
        }else{
            TagBlogMappingDao.insertTagBlogMapping(result[0].id, blogId, timeutil.getNow(), timeutil.getNow(), function(result){

            });
        }
    })
}

function insertTag(tag, blogId){
    tagsDao.insertTag(tag, timeutil.getNow(), timeutil.getNow(), function(result){
        insertTagBlogMapping(result.insertId, blogId);
    })
}

function insertTagBlogMapping(tagId, blogId){
    TagBlogMappingDao.insertTagBlogMapping(tagId, blogId, timeutil.getNow(), timeutil.getNow(), function(result){

    })
}

function queryBlogBySearch(request,response){
    var params = url.parse(request.url, true).query;
    var blog = "%" + params.blog + "%";
    blogDao.queryBlogBySearch(blog, parseInt(params.page), parseInt(params.pageSize), function(result){
        var blogList = [];
        // console.log(result);
        for(var i = 0; i < result.length; i++){
            blogDao.queryBlogById(result[i].id, function(result){
                blogList.push(result[0]);
            });
        }
        getResult(blogList, result.length, response);
    })
}


path.set("/queryBlogBySearch", queryBlogBySearch);

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

function queryBlogBySearchCount(request, response){
    var params = url.parse(request.url, true).query;
    var blog = "%" + params.blog + "%";
    // console.log(params);
    // blogDao.queryTag(params.tag, function (result) {
        // console.log(result);
        blogDao.queryBlogBySearchCount(blog, function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "查询成功", result));
            response.end();
        });
    // });
}

path.set("/queryBlogBySearchCount", queryBlogBySearchCount);

module.exports.path = path;