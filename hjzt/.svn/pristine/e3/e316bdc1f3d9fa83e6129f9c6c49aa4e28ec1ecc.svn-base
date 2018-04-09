MyCollect = {
    PageInit: function () {
        var obj = this;
        obj.Newslist();
        obj.NewsType();
    },
    //新闻列表展示
    Newslist:function(){
        function dataList(list){
            var html='';

            for(var i=0;i<list.length;i++){
            	var listObj = JSON.stringify(list[i]);
                 console.log(listObj)
                html+="<a data-listObj='"+listObj+"' code="+list[i].news_url+" class='con-item' target='_blank'><p>"+list[i].title+"</p><div><span>来源："+list[i].source_site+"</span><span>发布时间："+list[i].release_time+"</span></div><div>"+list[i].digest+"</div></a>"
            }
            $(".notice-content").html(html);  
              $(".notice-content .con-item").on("click",function(){
            		localStorage.setItem('xwzxobj',$(this).attr("data-listObj"));
            		// window.location.href="/detail/detail.html?type=sf&stockCode="+$(this).attr("code");
                window.open("/detail/detail.html?type=xw&newsurl="+$(this).attr("code"));
            });
        }
        var val='';
        var pageNum=0,totalPage=0,newsList=[],totalNum=0;
        var startTime='';
        var endTime='';
        var typeId='';
        var sTime=0;
        var eTime=0;
        var paraminfo = '{"body":{"serch_key":"' + val + '","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '"}}';
        $.axsRequest("FT306",paraminfo,true,function(data){
            if(data.retCode=="0000"){
                console.log(data);
                newsList=data.retData.infoList;
                pageNum=data.retData.pageNum;
                totalPage=data.retData.totalPage;
                totalNum=data.retData.totalNum;
                console.log(pageNum);
                console.log(totalPage);
                dataList(newsList);
                $(".totalNum").html(totalNum);
                if(pageNum==totalPage||totalPage==0){
                    $(".add-more").hide();
                }
            }else{
                errorAlert(data.retCode,data.retMsg);
            }
        });
        //点击搜索发送请求
        $("#search").keydown(function(){
            if(event.keyCode == "13") {
                val=$(this).val();
                console.log(val);
                 paraminfo='{"body":{"serch_key":"'+val+'","newsType":"'+typeId+'","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '"}}';
                $.axsRequest("FT306",paraminfo,true,function(data){
                    if(data.retCode=="0000"){
                        console.log(data);
                         newsList=data.retData.infoList;
                        pageNum=data.retData.pageNum;
                        totalPage=data.retData.totalPage;
                        totalNum = data.retData.totalNum;
                        console.log(pageNum);
                        console.log(totalPage);
                       dataList(newsList);
                        $(".totalNum").html(totalNum);
                        if(pageNum==totalPage||totalPage==0){
                            $(".add-more").hide();
                        }else{
                            $(".add-more").show()
                        }
                        $.UserLogJsonData({"userId":localStorage.getItem("userId"),"modelName":"新闻资讯关键词检索"},true,function(data){});
                        
                    }else{
                        errorAlert(data.retCode,data.retMsg);
                    }
                });
            }
        });
        //点击加载更多

        $(".add-more").click(function(){
            addMore(paraminfo);
        });
        function addMore(paraminfo){
                pageNum++;
                console.log(pageNum);
                console.log(totalPage);
                    paraminfo='{"body":{"pageNum":"'+pageNum+'","serch_key":"' + val + '","newsType":"'+typeId+'","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '"}}';
                    $.axsRequest("FT306",paraminfo,true,function(data){
                        if(data.retCode=="0000"){
                            console.log(data);
                            newsList=newsList.concat(data.retData.infoList);
                            dataList(newsList);
                   
                        }else{
                            errorAlert(data.retCode,data.retMsg)
                        }
                    })
            if(pageNum==totalPage||totalPage==0){
                $(".add-more").hide();
            }else{
                $(".add-more").show()
            }

        }
        //点击新闻类型检索列表
        $(".news-type").on("click",".s-content li a",function(){
            typeId=$(this).attr("name");
            paraminfo='{"body":{"serch_key":"'+val+'","newsType":"'+typeId+'","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '"}}';
            $.axsRequest("FT306",paraminfo,true,function(data){
                if(data.retCode=="0000"){
                    newsList=data.retData.infoList;
                    pageNum=data.retData.pageNum;
                    totalPage=data.retData.totalPage;
                    totalNum = data.retData.totalNum;
                    console.log(data)
                    dataList(newsList);
                    $(".totalNum").html(totalNum);
                    if(pageNum==totalPage||totalPage==0){
                        $(".add-more").hide();
                    }else{
                        $(".add-more").show()
                    }
    
                }else{
                    errorAlert(data.retCode,data.retMsg);
                }
            });
        });
        //日历
        var mySchedule1 = new Schedule({
            el: '#schedule-box1',
            //date: '2018-9-20',
            clickCb: function (y, m, d) {
                if(d.length==1){
                    document.querySelector('#start-time').innerHTML = y + '-' + m + '-0' + d;
//                  sTime=y+'-'+m+'-0'+d;
                     if(m<10){
                    	 sTime=y+'-0'+m+'-0'+d;
                    }else{
                    	 sTime=y+'-'+m+'-0'+d;
                    }
                }else{
                    document.querySelector('#start-time').innerHTML = y + '-' + m + '-' + d;
//                  sTime=y+'-'+m+'-'+d;
                    if(m<10){
                    	  sTime=y+'-0'+m+'-'+d;
                    }else{
                    	  sTime=y+'-'+m+'-'+d;
                    }
                }
               sTime=sTime.split("-").join("");
                console.log(sTime);
                console.log(eTime);
                if(sTime-eTime>0&&eTime!=0){
                 var txt=  "开始时间不能大于结束时间";
         	 var option = {
         		 title: "提示",
         		 btn: parseInt("0011",2),
         		 onOk: function(){
		       
         		 }
         	 }
         	   window.alert.bcConfirm(txt, window.alert.bcConfirm.typeEnum.info, option);
   }

                
                $("#schedule-box1").addClass("hide");
                $(".start-time>span").removeClass("active").removeClass("active");
                $(".start-time>span").addClass("close").removeClass("bot");
                startTime=$("#start-time").html();
                paraminfo = '{"body":{"serch_key":"'+val+'","newsType":"'+typeId+'","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '"}}';
                $.axsRequest("FT306",paraminfo,true,function(data){
                    if(data.retCode=="0000"){
                        console.log(data);
                        newsList=data.retData.infoList;
                        pageNum=data.retData.pageNum;
                        totalPage=data.retData.totalPage;
                        totalNum = data.retData.totalNum;
                        dataList(newsList);
                        $(".totalNum").html(totalNum);
                        if(pageNum==totalPage||totalPage==0){
                            $(".add-more").hide();
                        }else{
                            $(".add-more").show()
                        }
          
                    }else{
                        errorAlert(data.retCode,data.retMsg);
                    }
                });
            },
            nextMonthCb: function (y, m, d) {
                document.querySelector('#start-time').innerHTML = y + '-' + m + '-' + d;
            },
            nextYeayCb: function (y, m, d) {
                document.querySelector('#start-time').innerHTML = y + '-' + m + '-' + d
            },
            prevMonthCb: function (y, m, d) {
                document.querySelector('#start-time').innerHTML = y + '-' + m + '-' + d
            },
            prevYearCb: function (y, m, d) {
                document.querySelector('#start-time').innerHTML = y + '-' + m + '-' + d
            }
        });
        var mySchedule2 = new Schedule({
            el: '#schedule-box2',
            //date: '2018-9-20',
            clickCb: function (y, m, d) {
                if(d.length==1){
                    document.querySelector('#end-time').innerHTML = y + '-' + m + '-0' + d;
//                  eTime=y+'-'+m+'-0'+d;
                    if(m<10){
                    	 eTime=y+'-0'+m+'-0'+d;
                    }else{
                    	 eTime=y+'-'+m+'-0'+d;
                    }
                }else{
                    document.querySelector('#end-time').innerHTML = y + '-' + m + '-' + d;
//                  eTime=y+'-'+m+'-'+d;
                     if(m<10){
                    	  eTime=y+'-0'+m+'-'+d;
                    }else{
                    	 eTime=y+'-'+m+'-'+d;
                    }
                }
                
                eTime=eTime.split("-").join("");
                console.log(sTime);
                console.log(eTime);
                   if(sTime-eTime>0&&sTime!=0){
                    var txt=  "开始时间不能大于结束时间";
            	 var option = {
            		 title: "提示",
            		 btn: parseInt("0011",2),
            		 onOk: function(){
		       
            		 }
            	 }
            	   window.alert.bcConfirm(txt, window.alert.bcConfirm.typeEnum.info, option);
      }
                $("#schedule-box2").addClass("hide");
                $(".end-time>span").removeClass("active");
                $(".end-time>span").addClass("close").removeClass("bot");
                endTime=$("#end-time").html();
                paraminfo = '{"body":{"serch_key":"'+val+'","newsType":"'+typeId+'","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '"}}';
                $.axsRequest("FT306",paraminfo,true,function(data){
                    if(data.retCode=="0000"){
                        console.log(data);
                        newsList=data.retData.infoList;
                        pageNum=data.retData.pageNum;
                        totalPage=data.retData.totalPage;
                        totalNum = data.retData.totalNum;
                        dataList(newsList);
                        $(".totalNum").html(totalNum);
                        if(pageNum==totalPage||totalPage==0){
                            $(".add-more").hide();
                        }else{
                            $(".add-more").show()
                        }
                        $.UserLogJsonData({"userId":localStorage.getItem("userId"),"modelName":"结束时间检索列表"},true,function(data){});
                    }else{
                        errorAlert(data.retCode,data.retMsg);
                    }
                });
            },
            nextMonthCb: function (y, m, d) {
                document.querySelector('#end-time').innerHTML = y + '-' + m + '-' + d;
            },
            nextYeayCb: function (y, m, d) {
                document.querySelector('#end-time').innerHTML = y + '-' + m + '-' + d
            },
            prevMonthCb: function (y, m, d) {
                document.querySelector('#end-time').innerHTML = y + '-' + m + '-' + d
            },
            prevYearCb: function (y, m, d) {
                document.querySelector('#end-time').innerHTML = y + '-' + m + '-' + d
            }
        });
    
      //点击叉号清空日历
    $(".start-time").on("click","span.close",function(){
    	$(this).removeClass("close");
    	$("#schedule-box1").attr("style","display:none");
    	$(".start-time>span").removeClass("active");
		$("#start-time").html("开始时间");
		startTime="";
                paraminfo = '{"body":{"serch_key":"'+val+'","newsType":"'+typeId+'","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '"}}';
                $.axsRequest("FT306",paraminfo,true,function(data){
                    if(data.retCode=="0000"){
                        console.log(data);
                        newsList=data.retData.infoList;
                        pageNum=data.retData.pageNum;
                        totalPage=data.retData.totalPage;
                        totalNum = data.retData.totalNum;
                        dataList(newsList);
                        $(".totalNum").html(totalNum);
                        if(pageNum==totalPage||totalPage==0){
                            $(".add-more").hide();
                        }else{
                            $(".add-more").show()
                        }
                       
                    }else{
                        errorAlert(data.retCode,data.retMsg);
                    }
                });
		
    })
    
    $(".end-time").on("click","span.close",function(){
    	$(this).removeClass("close").removeClass("active");
		$("#end-time").html("结束时间");
		$("#schedule-box2").attr("style","display:none");
		endTime="";
		 paraminfo = '{"body":{"serch_key":"'+val+'","newsType":"'+typeId+'","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '"}}';
                $.axsRequest("FT306",paraminfo,true,function(data){
                    if(data.retCode=="0000"){
                        console.log(data);
                        newsList=data.retData.infoList;
                        pageNum=data.retData.pageNum;
                        totalPage=data.retData.totalPage;
                        totalNum = data.retData.totalNum;
                        dataList(newsList);
                        $(".totalNum").html(totalNum);
                        if(pageNum==totalPage||totalPage==0){
                            $(".add-more").hide();
                        }else{
                            $(".add-more").show()
                        }
                 
                    }else{
                        errorAlert(data.retCode,data.retMsg);
                    }
                });
    })
    
    },
  
    //点击新闻类型下拉框
   NewsType:function(){
    var paraminfo = '{"body":{"type":"19"}}';
       $.axsRequest("FT003", paraminfo, true, function (data) {
//     		console.log(data);
           if (data.retCode == "0000") {
               
               var list = data.retData.infoList;
               var html = ''
               for (var i = 0; i < list.length; i++) {
                   html += "<li><a href='#' name="+list[i].id+">"+list[i].name+"</a></li>"
               }
               $(".news-type ul").html(html)
           } else {
               errorAlert(data.retCode, data.retMsg);
           }
       });
   }

}


$(function() {
    MyCollect.PageInit();
});