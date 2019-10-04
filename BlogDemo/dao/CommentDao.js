var dbutil = require("./DButil");

function insertComment(blogId, parent, parentName, userName, email, comments, ctime, utime, success){
    var insertSql = "insert into comments (`blog_id`, `parent`, `parent_name`, `user_name`, `email`,`comments` , `ctime`, `utime`) values (?, ?, ?, ?, ?, ?, ?, ?)";
    var params = [blogId, parent, parentName, userName, email, comments, ctime, utime];
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

function queryCommentsByBlogId(blogId, success){
    var querySql = "select * from comments where blog_id = ?";
    var params = [blogId];
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

function queryNewComments(success){
    var querySql = "select * from comments order by id desc limit 0,5";
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

module.exports.insertComment = insertComment;
module.exports.queryCommentsByBlogId = queryCommentsByBlogId;
module.exports.queryNewComments = queryNewComments;