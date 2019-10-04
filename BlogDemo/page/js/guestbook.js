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
                var bid = -2;
                
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
        var bid = -2;
        axios({
            method: "get",
            url: "/queryCommentsByBlogId?bid=" + bid
        }).then(function(resp){
            console.log(resp);
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