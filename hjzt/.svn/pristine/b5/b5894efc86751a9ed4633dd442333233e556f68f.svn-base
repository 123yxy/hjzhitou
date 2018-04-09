MyCollect = {
    PageInit: function () {
        var obj = this;
        obj.Ruluelist();
        obj.Jgselect();
    },

    //公告列表展示
    Ruluelist:function(){
        function dataList(list){
            var html='';
            for(var i=0;i<list.length;i++){
                var listObj = JSON.stringify(list[i]);
             
                html+="<a data-listObj='"+listObj+"' code='' class='con-item rulue-item' target='_blank'><p>"+list[i].title+"</p><div><span title="+list[i].publishOrgName+">发布机关："+list[i].publishOrgName+"</span><span>发布日期："+list[i].publishDate+"</span></div><div>"+list[i].digest+"</div></a>"
            }
            $(".notice-content").html(html);
              $(".notice-content .con-item").on("click",function(){
            		localStorage.setItem('zcfgobj',$(this).attr("data-listObj"));
                window.open("/detail/detail.html?type=fg&postNum="+$(this).attr("code"));
            });
        }
        var paraminfo='{"body":{}}';
        var pageNum=0,totalPage=0,rulueList=[],totalNum=0;
        var val='';
        var startTime="";
        var endTime="";
        var typeId="";
         var sTime=0;
        var eTime=0;
        $.axsRequest("FT309",paraminfo,true,function(data){
            if(data.retCode=="0000"){
                console.log(data);
                rulueList=data.retData.infoList;
                pageNum=data.retData.pageNum;
                totalPage=data.retData.totalPage;
                totalNum=data.retData.totalNum;
                console.log(pageNum);
                console.log(totalPage);
                dataList(rulueList)
                $(".totalNum").html(totalNum);
                if(pageNum==totalPage||totalPage==0){
                    $(".btn").hide();
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
                 paraminfo='{"body":{"serch_key":"'+val+'","publishOrgId":"'+typeId+'","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '"}}';
                $.axsRequest("FT309",paraminfo,true,function(data){
                    if(data.retCode=="0000"){
                        console.log(data);
                        rulueList=data.retData.infoList;
                        pageNum=data.retData.pageNum;
                        totalPage=data.retData.totalPage;
                        totalNum = data.retData.totalNum;
                        console.log(pageNum);
                        console.log(totalPage);
                        dataList(rulueList);
                        $(".totalNum").html(totalNum);
                        if(pageNum==totalPage||totalPage==0){
                            $(".btn").hide();
                        }else{
                            $(".btn").show()
                        }
                        $.UserLogJsonData({"userId":localStorage.getItem("userId"),"modelName":"政策法规关键词检索"},true,function(data){});
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
        function addMore(paraminfo) {
            pageNum++;
                console.log(pageNum);
                console.log(totalPage);
                if(pageNum<=totalPage){
                    paraminfo='{"body":{"pageNum":"'+pageNum+'","serch_key":"'+val+'","publishOrgId":"'+typeId+'","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '"}}';
                    $.axsRequest("FT309",paraminfo,true,function(data){
                        if(data.retCode=="0000"){
                            console.log(data);
                            rulueList=rulueList.concat(data.retData.infoList);
                            dataList(rulueList);
                                if(pageNum==totalPage||totalPage==0){
                            $(".btn").hide();
                        }else{
                            $(".btn").show()
                        }
                        }else{
                            errorAlert(data.retCode,data.retMsg)
                        }
                    })
                }
        }
        //点击发布机关检索列表
        $(".jg").on("click",".s-content li a",function(){
            typeId=$(this).attr("name");
            paraminfo='{"body":{"serch_key":"'+val+'","publishOrgId":"'+typeId+'","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '"}}';
            $.axsRequest("FT309",paraminfo,true,function(data){
                if(data.retCode=="0000"){
                    console.log(data);
                    rulueList=data.retData.infoList;
                    pageNum=data.retData.pageNum;
                    totalPage=data.retData.totalPage;
                    totalNum = data.retData.totalNum;
                    console.log(pageNum);
                    console.log(totalPage);
                    dataList(rulueList);
                    $(".totalNum").html(totalNum);
                    if(pageNum==totalPage||totalPage==0){
                        $(".btn").hide();
                    }else{
                        $(".btn").show()
                    }
                }else{
                    errorAlert(data.retCode,data.retMsg);
                }
            });
        });

        var mySchedule1 = new Schedule({
            el: '#schedule-box1',
            //date: '2018-9-20',
            clickCb: function (y, m, d) {
                        if(d.length==1){
                    document.querySelector('#start-time').innerHTML = y + '-' + m + '-0' + d;
                    sTime=y+'-'+m+'-0'+d;
                    if(m<10){
                    	 sTime=y+'-0'+m+'-0'+d;
                    }else{
                    	 sTime=y+'-'+m+'-0'+d;
                    }
                }else{
                    document.querySelector('#start-time').innerHTML = y + '-' + m + '-' + d;
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
                 $(".start-time>span").addClass("close").removeClass("bot");
                $(".start-time>span").removeClass("active");
                startTime=$("#start-time").html();
                paraminfo = '{"body":{"serch_key":"'+val+'","publishOrgId":"'+typeId+'","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '"}}';
                $.axsRequest("FT309",paraminfo,true,function(data){
                    if(data.retCode=="0000"){
                        console.log(data);
                        rulueList=data.retData.infoList;
                        pageNum=data.retData.pageNum;
                        totalPage=data.retData.totalPage;
                        totalNum = data.retData.totalNum;
                        console.log(pageNum);
                        console.log(totalPage);
                        dataList(rulueList);
                        $(".totalNum").html(totalNum);
                        if(pageNum==totalPage||totalPage==0){
                            $(".btn").hide();
                        }else{
                            $(".btn").show()
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
                    if(m<10){
                    	 eTime=y+'-0'+m+'-0'+d;
                    }else{
                    	 eTime=y+'-'+m+'-0'+d;
                    }
                    console.log(eTime);
                }else{
                    document.querySelector('#end-time').innerHTML = y + '-' + m + '-' + d;
                   
                    if(m<10){
                    	  eTime=y+'-0'+m+'-'+d;
                    }else{
                    	 eTime=y+'-'+m+'-'+d;
                    }
                    console.log(eTime);
                }
                
                eTime=eTime.split("-").join("");
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
                paraminfo = '{"body":{"serch_key":"'+val+'","publishOrgId":"'+typeId+'","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '"}}';
                $.axsRequest("FT309",paraminfo,true,function(data){
                    if(data.retCode=="0000"){
                        console.log(data);
                        rulueList=data.retData.infoList;
                        pageNum=data.retData.pageNum;
                        totalPage=data.retData.totalPage;
                        totalNum = data.retData.totalNum;
                        console.log(pageNum);
                        console.log(totalPage);
                        dataList(rulueList);
                        $(".totalNum").html(totalNum);
                        if(pageNum==totalPage||totalPage==0){
                            $(".btn").hide();
                        }else{
                            $(".btn").show()
                        }
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
    	$(this).removeClass("close").removeClass("active");
    	$("#schedule-box1").attr("style","display:none");
		$("#start-time").html("开始时间");
		startTime="";
           paraminfo = '{"body":{"serch_key":"'+val+'","publishOrgId":"'+typeId+'","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '"}}';
                $.axsRequest("FT309",paraminfo,true,function(data){
                    if(data.retCode=="0000"){
                        console.log(data);
                        rulueList=data.retData.infoList;
                        pageNum=data.retData.pageNum;
                        totalPage=data.retData.totalPage;
                        totalNum = data.retData.totalNum;
                        console.log(pageNum);
                        console.log(totalPage);
                        dataList(rulueList);
                        $(".totalNum").html(totalNum);
                        if(pageNum==totalPage||totalPage==0){
                            $(".btn").hide();
                        }else{
                            $(".btn").show()
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
		   paraminfo = '{"body":{"serch_key":"'+val+'","publishOrgId":"'+typeId+'","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '"}}';
                $.axsRequest("FT309",paraminfo,true,function(data){
                    if(data.retCode=="0000"){
                        console.log(data);
                        rulueList=data.retData.infoList;
                        pageNum=data.retData.pageNum;
                        totalPage=data.retData.totalPage;
                        totalNum = data.retData.totalNum;
                        console.log(pageNum);
                        console.log(totalPage);
                        dataList(rulueList);
                        $(".totalNum").html(totalNum);
                        if(pageNum==totalPage||totalPage==0){
                            $(".btn").hide();
                        }else{
                            $(".btn").show()
                        }
                    }else{
                        errorAlert(data.retCode,data.retMsg);
                    }
                });
    })
        
        
        
    },
    
    

    
    //发布机关下拉框
    Jgselect:function(){
    var paraminfo='{"body":{"type":"35"}}';
        $.axsRequest("FT003",paraminfo,true,function(data){
            if(data.retCode=="0000"){
                console.log(data);
                var list=data.retData.infoList;
                var html='';
                var id;
                var title;
                for(var i=0;i<list.length;i++){
                	id=list[i].id;
                	//title=list[i].name;
                	html+="<li><a name="+id+">"+list[i].name+"</a></li>"
                }
                $(".jg ul").html(html)
            }else{
                errorAlert(data.retCode,data.retMsg);
            }
        });
}
};


$(function() {
    MyCollect.PageInit();
});