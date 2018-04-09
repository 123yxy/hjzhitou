
MyCollect = {
    PageInit: function () {
        var obj = this;
        obj.Detail();

    },
    Detail:function () {
        function getName(name){
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            var context = "";
            if (r != null) {
                context = r[2];
                reg = null;
                r = null;
                return context == null || context == "" || context == "undefined" ? "" : context;}};
        var txt=decodeURI(getName("txt"));
        var txt2=decodeURI(getName("txt2"));
        var newsTxt=decodeURI(getName("newsurl"));
        var postNum=decodeURI(getName("postNum"));
        var stockCode=decodeURI(getName("stockCode"));
        var pageNum=decodeURI(getName("pageNum"));
        var serchKey=decodeURI(getName("serchKey"));
        var startTime=decodeURI(getName("publishStartDate"));
        var endTime=decodeURI(getName("publishEndDate"));
        var typeId=decodeURI(getName("publishOrgId"))
        console.log(txt);
        console.log(newsTxt);
        if(newsTxt=="undefined"&&postNum=="undefined"&&stockCode=="undefined"&&txt2=="undefined"){
            console.log("txt");
            indexJump();
        }else if(newsTxt=="undefined"&&txt=="undefined"&&stockCode=="undefined"&&txt2=="undefined"){
            console.log("postNum");
            rulueJump();
        }else if(postNum=="undefined"&&txt=="undefined"&&stockCode=="undefined"&&txt2=="undefined"){
            console.log("newsTxt");
            newsJump();
        }else if(newsTxt=="undefined"&&postNum=="undefined"&&stockCode=="undefined"&&txt=="undefined"){
            console.log("txt2");
            indexYb()
        }else {
            threeJump();
        }



        function indexJump() {
            var paraminfo='{"body":{"news_url":"'+txt+'"}}';
            $.axsRequest("FT311",paraminfo,false,function(data){
                if(data.retCode=="0000"){  
                    var html="";
                  
                    var listZX=data.retData.infoList_ZX;
                    for(var i=0;i<listZX.length;i++){
                        var newsurl2=listZX[i].news_url;
                        if(newsurl2==txt){
                            console.log(listZX[i].news_content);
                            html+="<div class='detail'><span class='detail_tit'>"+listZX[i].content_title+"</span><div class='com_infor clear'><p>来源 : "+listZX[i].source_site+"</p><p>发布时间 : "+listZX[i].release_time+"</p></div><p class='detail_cont'>"+listZX[i].news_content+"</p><div class='news-url'><a href="+txt+">[原文链接]</a></div></div>"
                        }
                    }
                    console.log(html);
                    $(".container").html(html)
                }else{
                    errorAlert(data.retCode,data.retMsg);
                }
            });
        }
        function indexYb(){
             var paraminfo='{"body":{"pdf_url":"'+txt2+'"}}';
            $.axsRequest("FT311",paraminfo,false,function(data){
                if(data.retCode=="0000"){
                    console.log(data.retData);
                    var html="";
                    var list=data.retData.infoList_YB;
                    for(var i=0;i<list.length;i++){
                        var newsurl1=list[i].pdf_url;
                        if(newsurl1==txt2){
                            console.log(list[i])
                       html+="<div class='detail'><span class='detail_tit'>"+list[i].title+"</span><div class='com_infor clear'><p>本次评级 : "+list[i].rating+"</p><p>发布机构 : "+list[i].rorgcode+"</p><p>发布时间 :"+ list[i].release_time+"</p></div><p class='detail_cont'>"+list[i].content+"</p><div class='com_infor clear' style='border-bottom:0'><p class='news-url'>附件名称 :<a href="+list[i].pdf_url+">["+list[i].rorgname+"-"+list[i].title+".pdf]</a></p><p>附件大小 :"+ list[i].size+"</p><p>附件页数 :"+ list[i].page+"</p></div></div>";
             }
                    }
                    console.log(html);
                    $(".container").html(html)
                }else{
                    errorAlert(data.retCode,data.retMsg);
                }
            });
        }

        
              function newsJump() {
          var html="";
            var xwzxobj=localStorage.getItem("xwzxobj");
            var list= JSON.parse(xwzxobj);
        html+="<div class='detail'><span class='detail_tit'>"+list.title+"</span><div class='com_infor clear'><p>来源 : "+list.source_site+"</p><p>发布时间 :"+ list.release_time+"</p></div><p class='detail_cont'>"+list.content+"</p><div class='news-url'><a href="+newsTxt+">[原文链接]</a></div></div>"
     $(".container").html(html); 
        }

     function rulueJump(){
         var html="";
            var zcfgobj=localStorage.getItem("zcfgobj");
            console.log(zcfgobj)
            var list= JSON.parse(zcfgobj);
            var list2=JSON.parse(list.attach);
            var fjHtml="";
            for(var i=0;i<list2.length;i++){
                fjHtml+="<a href="+list2[i].url+" style='margin-left:30px;'>"+ list2[i].name+"</a><br>"
            }
            if(list2.length!==0){
            	 html+="<div class='detail'><span class='detail_tit'>"+list.title+"</span><div class='com_infor clear'><p>来源 : "+list.publishOrgName+"</p><p>发布时间 :"+ list.publishDate+"</p></div><p class='detail_cont'>"+list.content+"</p><div class='clear news-url' style='border-bottom:0;'><p style='margin:10px 0'>附件名称 :</p>"+fjHtml+"</div></div>"
   
            }else{
            	 html+="<div class='detail'><span class='detail_tit'>"+list.title+"</span><div class='com_infor clear'><p>来源 : "+list.publishOrgName+"</p><p>发布时间 :"+ list.publishDate+"</p></div><p class='detail_cont'>"+list.content+"</p></div>"
   
            }
        
   $(".container").html(html);
     }



        function threeJump(){
            var html="";
            var sfybobj=localStorage.getItem("sfybobj");
            var list= JSON.parse(sfybobj);
            html+="<div class='detail'><span class='detail_tit'>"+list.title+"</span><div class='com_infor clear'><p>本次评级 : "+list.rating+"</p><p>发布机构 : "+list.rorgcode+"</p><p>发布时间 :"+ list.release_time+"</p></div><p class='detail_cont'>"+list.content+"</p><div class='com_infor clear' style='border-bottom:0'><p class='news-url'>附件名称 :<a href="+list.pdf_url+">["+list.rorgname+"-"+list.title+".pdf]</a></p><p>附件大小 :"+ list.size+"</p><p>附件页数 :"+ list.page+"</p></div></div>";
            $(".container").html(html);
        }

    }
}




$(function(){
    MyCollect.PageInit();
});