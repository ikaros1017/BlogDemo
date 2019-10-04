var dbutil = require("./DButil");

function insertBlog(title, content, tags, views, ctime, utime, success){
    var insertSql = "insert into blog (`title`, `content`, `tags`, `views`, `ctime`, `utime`) values (?, ?, ?, ?, ?, ?)";
    var params = [title, content, tags, views, ctime, utime];
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

function queryBlogByPage(page, pageSize, success){
    var querySql = "select * from blog order by id desc limit ?, ?";
    var params = [page * pageSize, pageSize];
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

function queryBlogCount(success){
    var querySql = "select count(1) as count from blog";
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

function queryBlogById(id, success){
    var querySql = "select * from blog where id = ?";
    var params = [id];
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

function queryAllBlog(success){
    var querySql = "select * from blog order by id desc ";
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

function updateBlogViewsById(id, success){
    var updateSql = "update blog set views = views + 1 where id = ?";
    var params = [id];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(updateSql, params, function(error, result){
        if(error == null){
            success(result);
            // console.log(result);
        }else{
            console.log(error);
        }
    });
    connection.end();
}

function queryNewHot(success){
    var querySql = "select * from blog order by views desc limit 0,5";
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

function queryBlogBySearch(blog, page, pageSize, success){
    var querySql = "select * from blog where title like ? limit ?,?;";
    var params = [blog, page * pageSize, pageSize];
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

function queryBlogBySearchCount(blog, success){
    var querySql = "select count(1) as count from blog where title like ?;";
    var params = [blog];
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



module.exports.insertBlog = insertBlog;
module.exports.queryBlogByPage = queryBlogByPage;
module.exports.queryBlogCount = queryBlogCount;
module.exports.queryBlogById = queryBlogById;
module.exports.queryAllBlog = queryAllBlog;
module.exports.updateBlogViewsById = updateBlogViewsById;
module.exports.queryNewHot = queryNewHot;
module.exports.queryBlogBySearch = queryBlogBySearch;
module.exports.queryBlogBySearchCount = queryBlogBySearchCount;