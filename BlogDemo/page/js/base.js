var searchBar = new Vue({
    el: "#search-bar",
    data:{
        searchVal:""
    },
    computed: {
        search: function(){
            return function(){
                console.log(searchBar.searchVal);
                location.href = "/index.html?blog=" + searchBar.searchVal;             
            }
        }
    }
})

var randomTags = new Vue({
    el: "#random-tags",
    data: {
        tags:[]
    },
    computed: {
        randomColor: function(){
            return function(){
                var red = Math.random() * 255 +50;
                var green = Math.random() * 255 +50;
                var blue = Math.random() * 255 +50;
                return "rgb(" + red + "," + green + "," + blue + ")";
            }
        },
        randomSize: function(){
            return function(){
                var size = Math.random() *20 +12 + "px";
                return size;
            }
        }
    },
    created() {
        axios({
            method: "get",
            url: "/queryRandomTags"
        }).then(function(resp){
            // console.log(resp);
            var tag = [];
            for(var i = 0; i < resp.data.data.length; i++){
                var temp = {};
                temp.tags = resp.data.data[i].tag;
                temp.link = "/index.html?tag=" + resp.data.data[i].tag;
                tag.push(temp);
            }
            randomTags.tags = tag;
        })
    },
});

var newHot = new Vue({
    el: "#new-hot",
    data: {
        titleList: [
            {
                title: "Anitama NEWS190917 bilibili专栏版",
                link: "http://bilibili.com"
            }
        ]
    },
    computed: {
        
    },
    created: function(){
        axios({
            method: "get",
            url: "/queryNewHot"
        }).then(function(resp){
            newHot.titleList = resp.data.data;
            for(var i = 0; i < resp.data.data.length; i++){
                newHot.titleList[i].link = "/blog.html?bid=" + resp.data.data[i].id;
            }
        })
    }
});

var newComments = new Vue({
    el: "#new-comments",
    data: {
        commentList: [
            {
                name: "这里是用户名",
                date: "2019-9-19",
                comment: "win95兼容就行（至少我行）"
            }
        ]
    },
    computed: {
        
    },
    created() {
        axios({
            method: "get",
            url: "/queryNewComments"
        }).then(function(resp){
            // console.log(resp);
            newComments.commentList = resp.data.data;
        })
    }
});