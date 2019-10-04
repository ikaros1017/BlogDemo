var blogDetail = new Vue({
    el:"#blog_detail",
    data:{
        title: "",
        content: "",
        ctime: "",
        tags: "",
        views: ""
    },
    computed: {
        
    },
    created: function() {
        var searcheUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
        // console.log(searcheUrlParams);
        if(searcheUrlParams == ""){
            return;
        }
        // console.log(searcheUrlParams);
        var bid = -10;
        for(var i = 0; i < searcheUrlParams.length; i++){
            if(searcheUrlParams[i].split("=")[0] == "bid"){
                try{
                    bid = parseInt(searcheUrlParams[i].split("=")[1]);
                }catch(e){
                    console.log(e);
                }
            }
        }
        // console.log(bid);
        axios({
            method:  "get",
            url: "/queryBlogById?bid=" + bid
        }).then(function(resp){
            // console.log(resp.data.data[0]);
            var result = resp.data.data[0];
            blogDetail.title = result.title;
            blogDetail.content = result.content;
            blogDetail.ctime = result.ctime;
            blogDetail.tags = result.tags;
            blogDetail.views = result.views;
        }).catch(function(resp){
            console.log("失败");
        });
    }
})

var sendComment = new Vue({
    el: "#send_comment",
    data:{
        vcode: "",
        rightCode: "",
        code: "",
        name: "",
        email: "",
        replyun: "",
        content: ""
    },
    computed:{
        sendComment: function(){
            return function(){
                if(sendComment.code != sendComment.rightCode){
                    alert("验证码错误");
                    sendComment.changeCode();
                    sendComment.code = "";
                    return
                }
                var searcheUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
                var bid = -10;
                for(var i = 0; i < searcheUrlParams.length; i++){
                    if(searcheUrlParams[i].split("=")[0] == "bid"){
                        try{
                            bid = parseInt(searcheUrlParams[i].split("=")[1]);
                        }catch(e){
                            console.log(e);
                        }
                    }
                }
                var reply = document.getElementById("comment_reply").value;
                var replyName = document.getElementById("comment_reply_name").value;
                var name = sendComment.name;
                var email = sendComment.email;
                var content = sendComment.content;
                axios({
                    method: "get",
                    url: "/addComment?bid=" + bid + "&parent=" + reply + "&userName=" + name + "&email=" + email + "&content=" + content + "&parentName=" + replyName
                }).then(function(resp){
                    // console.log(resp);
                    alert("评论成功");
                    sendComment.name = "";
                    sendComment.email = "";
                    sendComment.content = "";
                    sendComment.code = "";
                    blogDetail.created();
                }).catch(function(resp){
                    console.log("失败");
                })
            }
        },
        changeCode: function(){
            return function(){
                axios({
                    method: "get",
                    url: "/queryRandomCode"
                }).then(function(resp){
                    // console.log(resp);
                    sendComment.vcode = resp.data.data.data;
                    sendComment.rightCode = resp.data.data.text;
                })
            }
        }
    },
    created: function() {
        this.changeCode();
    },
})

var blogComments = new Vue({
    el: "#blog_comments",
    data:{
        total: 0,
        comments: [
            {
                
            }
        ]
    },
    computed: {
        reply: function(){
            return function(commentId, userName){
                document.getElementById("comment_reply").value = commentId;
                document.getElementById("comment_reply_name").value = userName;
                sendComment.replyun = " 回复@" + userName;
                location.href = "#send_comment";
            }
        }
    },
    created: function(){
        var searcheUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
        var bid = -10;
        for(var i = 0; i < searcheUrlParams.length; i++){
            if(searcheUrlParams[i].split("=")[0] == "bid"){
                try{
                    bid = parseInt(searcheUrlParams[i].split("=")[1]);
                }catch(e){
                    console.log(e);
                }
            }
        }
        axios({
            method: "get",
            url: "/queryCommentsByBlogId?bid=" + bid
        }).then(function(resp){
            // console.log(resp);
            blogComments.total = resp.data.data.length;
            blogComments.comments = resp.data.data;
            for(var i = 0; i < blogComments.comments.length; i++){
                if(blogComments.comments[i].parent > -1){
                    blogComments.comments[i].options = "回复@" + blogComments.comments[i].parent_name;
                } 
            }
        });
    }
})