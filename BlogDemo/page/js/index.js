var everyDay = new Vue({
    el:"#every-day",
    data: {
        contenet: "fdsagdsagdsagsdagsdag"
    },
    computed: {
        getContent: function(){
            return this.contenet;
        }
    },
    created: function() {
        axios({
            methods: "get",
            url: "/queryEveryDay"
        }).then(function(resp){
            // console.log(resp);
            everyDay.contenet = resp.data.data[0].content;
        }).catch(function(resp){
            console.log("请求失败");
        })
    }
});

var articleList = new Vue({
    el: "#article-list",
    data: {
        page: 1,
        pageSize: 5,
        count: 100,
        pageNumList: [],
        articleList:[
            {
                title:"2019年9月9日-9月15日日本动画销量情况",
                content: "七月新番《君主·埃尔梅罗二世事件簿 魔眼收集列车 Grace note》首卷第二周销量412，目前累计销量4191。web动画《IDOLiSH7 Vibrato》第三周销量508，目前累计销量25377。剧场版《Fate/stay night [Heavens Feel] II.lost butterfly》第四周销量1367，目前累计销量78719。剧场版《谭雅战记》第四周销量537。目前累计销量23049。\
                （以上销量数据暂时包含了一部分待完整周榜杂志确认的销量数据，仅计算出了数据的版本）\
                上周动画BD周冠是《JOJO的奇妙冒险：黄金之风》，动画DVD周冠是《高校星歌剧 第三季》\
                本周发售的主要动画碟片：七月新番《擅长捉弄的高木同学 第二季》首卷、一月新番《Star☆Twinkle光之美少女》首卷BD；剧场版《心理测量者 Sinners of the System Case.1 罪与罚》、《心理测量者 Sinners of the System Case.2 First Guardian》、《心理测量者 Sinners of the System Case.3 在恩怨的彼方》\
                作者：名作之壁吧",
                date: "2019-9-19",
                views: "101",
                tags: "test1 test2",
                id: "1",
                link: ""
            }
        ]
    },
    computed :{
        jumpTo: function(){
            return function(page){
                this.getPage(page, this.pageSize);
            }
        },
        getPage: function(){
            return function(page, pageSize){
                var searcheUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
                var tag = "";
                var blog = "";
                for(var i = 0; i < searcheUrlParams.length; i++){
                    if(searcheUrlParams[i].split("=")[0] == "tag"){
                        try{
                            tag = searcheUrlParams[i].split("=")[1];
                        }catch(e){
                            console.log(e);
                        }
                    }else
                    if(searcheUrlParams[i].split("=")[0] == "blog"){
                        try{
                            blog = searcheUrlParams[i].split("=")[1];
                        }catch(e){
                            console.log(e);
                        }
                    }
                }
                if(tag == "" && blog == ""){
                    axios({
                        method:"get",
                        url: "/queryBlogByPage?page=" + (page - 1) + "&pageSize=" + pageSize
                    }).then(function(resp){
                        var result = resp.data.data;
                        var list = [];
                        for(var i = 0; i < result.length; i++){
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.tags = result[i].tags;
                            temp.date = result[i].ctime;
                            temp.views = result[i].views;
                            temp.id = result[i].id;0
                            temp.link = "/blog.html?bid=" + result[i].id;
                            list.push(temp);
                        }
                        articleList.articleList = list;
                        articleList.page = page;
                    }).catch(function(resp){
                        console.log("错误")
                    });
                    axios({
                        method:"get",
                        url:"/queryBlogCount"
                    }).then(function(resp){
                        articleList.count = resp.data.data[0].count;
                        articleList.generatePageTool;
                    });
                }else if(blog != ""){
                    axios({
                        method:"get",
                        url: "/queryBlogBySearch?page=" + (page - 1) + "&pageSize=" + pageSize + "&blog=" + blog
                    }).then(function(resp){
                        var result = resp.data.data;
                        var list = [];
                        for(var i = 0; i < result.length; i++){
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.tags = result[i].tags;
                            temp.date = result[i].ctime;
                            temp.views = result[i].views;
                            temp.id = result[i].id;0
                            temp.link = "/blog.html?bid=" + result[i].id;
                            list.push(temp);
                        }
                        articleList.articleList = list;
                        articleList.page = page;
                    }).catch(function(resp){
                        console.log("错误")
                    });
                    axios({
                        method:"get",
                        url:"/queryBlogBySearchCount?blog=" + blog
                    }).then(function(resp){
                        articleList.count = resp.data.data[0].count;
                        articleList.generatePageTool;
                    });
                }else{
                    axios({
                        method:"get",
                        url: "/queryBlogByTag?page=" + (page - 1) + "&pageSize=" + pageSize + "&tag=" + tag
                    }).then(function(resp){
                        var result = resp.data.data;
                        var list = [];
                        for(var i = 0; i < result.length; i++){
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.tags = result[i].tags;
                            temp.date = result[i].ctime;
                            temp.views = result[i].views;
                            temp.id = result[i].id;0
                            temp.link = "/blog.html?bid=" + result[i].id;
                            list.push(temp);
                        }
                        articleList.articleList = list;
                        articleList.page = page;
                    }).catch(function(resp){
                        console.log("错误")
                    });
                    axios({
                        method:"get",
                        url:"/queryBlogByTagCount?tag=" + tag
                    }).then(function(resp){
                        articleList.count = resp.data.data[0].count;
                        articleList.generatePageTool;
                    });
                }
                
            }
        },
        generatePageTool: function(){
            var nowPage = this.page;
            var pageSize = this.pageSize;
            var totalCount = this.count;
            var result = [];
            result.push({text: "<<", page: 1});
            if(nowPage > 2){
                result.push({text: nowPage-2, page: nowPage-2});
            }
            if(nowPage > 1){
                result.push({text: nowPage-1, page: nowPage-1});
            }
            result.push({text: nowPage, page: nowPage});
            if(nowPage + 1 <= (totalCount + pageSize -1) / pageSize){
                result.push({text: nowPage + 1, page: nowPage + 1});
            }
            if(nowPage + 2 <= (totalCount + pageSize -1) / pageSize){
                result.push({text: nowPage + 2, page: nowPage + 2});
            }
            result.push({text: ">>", page: parseInt((totalCount + pageSize -1) / pageSize)});
            // console.log(result);
            this.pageNumList = result;
            return result;
        }
    },
    created: function(){
        this.getPage(this.page, this.pageSize);
    }
})