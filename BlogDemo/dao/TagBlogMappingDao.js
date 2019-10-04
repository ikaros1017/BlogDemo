var dbutil = require("./DButil");

function insertTagBlogMapping(tagId, blogId, ctime, utime, success){
    var insertSql = "insert into tab_blog_mapping (`tag_id`, `blog_id`, `ctime`, `utime`) values (?, ?, ?, ?)";
    var params = [tagId, blogId, ctime, utime];

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

function queryBlogByTag(tagId, page, pageSize, success){
    var querySql = "select * from tab_blog_mapping where tag_id = ? limit ?,?;";
    var params = [tagId, page * pageSize, pageSize];
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

function queryBlogByTagCount(tagId, success){
    var querySql = "select count(1) as count from tab_blog_mapping where tag_id = ?";
    var params = [tagId];
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


module.exports.insertTagBlogMapping = insertTagBlogMapping;
module.exports.queryBlogByTag = queryBlogByTag;
module.exports.queryBlogByTagCount = queryBlogByTagCount;