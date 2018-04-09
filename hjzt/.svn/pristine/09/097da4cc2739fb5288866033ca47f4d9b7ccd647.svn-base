MyCollect = {
    PageInit: function () {
        var obj = this;
        obj.Notlist();
        obj.selList();
    },
   //公告列表展示
    Notlist:function(){
        function dataList(list){
            var html='';
            for(var i=0;i<list.length;i++){
                html+='<li><a href='+list[i].pdfUrl+'>'+list[i].companyName+"："+list[i].title+"</a><span>发布时间:"+list[i].publishDate+"</span><p>"+list[i].typeName+"</p></li>"
            }
            $(".gjj_gongg_list ul").html(html)
        }
        var pageNum=0,totalPage=0,List=[],totalNum=0;
        var val='';
        var startTime="";
        var endTime="";
        var val2='';
       var stockCode= getUrlParam("stockcode");
        var sTime=0;
        var eTime=0;
        if(isXSBCompany(stockCode)){
            var isXSB=true;
        }else{
            var isXSB=false;
        }
        var paraminfo = '{"body":{"orderStr":"desc","serch_key":"' + val + '","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '","stockCode": "'+stockCode+'"}}';
            $.axsRequest("FT308",paraminfo,false,function(data){
                if(data.retCode=="0000"){
                    console.log(data);
                    List=data.retData.infoList;
                    pageNum=data.retData.pageNum;
                    totalNum=data.retData.totalNum;
                    totalPage=data.retData.totalPage;
                    dataList(List);
                    // $(".big-t").hide();
                    // $(".totalNum").html(totalNum);
                    if(pageNum==totalPage||totalPage==0){
                        $("#moreGongGao").html("没有更多数据");
                    }else{
                        $("#moreGongGao").html("加载更多");
                    }
                }else{
                    errorAlert(data.retCode,data.retMsg);
                }
            });
        // 点击搜索发送请求
        $("#search").keydown(function(){
            if(event.keyCode == "13") {
                 val=$(this).val();
                console.log(val);
                if(val==''){
                    $(".big-t").hide();
                }else{
                    $(".big-t").show();
                }
                    // if(!$(".select-box div.fr>b").hasClass("active")){
                    //     paraminfo = '{"body":{"orderStr":"asc","serch_key":"' + val + '","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '"}}';
                    // }else{
                    //     paraminfo = '{"body":{"orderStr":"desc","serch_key":"' + val + '","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '"}}';
                    // }

                if($(".three .s-title").attr("name")=="1"){
                    if(!$(".select-box div.fr>b").hasClass("active")){
                        paraminfo = '{"body":{"orderStr":"asc","serch_key":"' + val + '","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '","oneLevel":"SB","twoLevel":"'+val2+'"}}';
                    }else{
                        paraminfo = '{"body":{"orderStr":"desc","serch_key":"' + val + '","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '","oneLevel":"SB","twoLevel":"'+val2+'"}}';
                    }
                }else if($(".three .s-title").attr("name")=="2"){
                    if(!$(".select-box div.fr>b").hasClass("active")){
                        paraminfo = '{"body":{"orderStr":"asc","serch_key":"' + val + '","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '","oneLevel":"A","twoLevel":"'+val2+'"}}';
                    }else{
                        paraminfo = '{"body":{"orderStr":"desc","serch_key":"' + val + '","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '","oneLevel":"A","twoLevel":"'+val2+'"}}';
                    }
                }else{
                    if(!$(".select-box div.fr>b").hasClass("active")){
                        paraminfo = '{"body":{"orderStr":"asc","serch_key":"' + val + '","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '"}}';
                    }else{
                        paraminfo = '{"body":{"orderStr":"desc","serch_key":"' + val + '","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '"}}';
                    }
                }
                    $.axsRequest("FT308", paraminfo, false, function (data) {
                        if (data.retCode == "0000") {
                            console.log(data);
                            List = data.retData.infoList;
                            pageNum = data.retData.pageNum;
                            totalPage = data.retData.totalPage;
                            totalNum = data.retData.totalNum;
                            console.log(pageNum);
                            console.log(totalPage);
                            dataList(List);
                            $(".search-word").html(val);
                            $(".totalNum").html(totalNum);
                            if (pageNum==totalPage||totalPage==0) {
                                $(".btn").hide();
                            }else{
                                $(".btn").show()
                            }
                        } else {
                            errorAlert(data.retCode, data.retMsg);
                        }
                    });

            }
        });
        //点击加载更多
        $("#moreGongGao").click(function(){
            addMore(paraminfo);
        })
        function addMore(paraminfo){
            pageNum++;
                console.log(pageNum);
                console.log(totalPage);
                if(pageNum<=totalPage&&totalPage!=0){
                    if(isXSB=="true"){
                        if(!$(".select-box div.fr>b").hasClass("active")){
                            paraminfo = '{"body":{"pageNum":"'+pageNum+'","orderStr":"asc","serch_key":"' + val + '","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '","oneLevel":"SB","twoLevel":"'+val2+'","stockCode": "'+stockCode+'"}}';
                        }else{
                            paraminfo = '{"body":{"pageNum":"'+pageNum+'","orderStr":"desc","serch_key":"' + val + '","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '","oneLevel":"SB","twoLevel":"'+val2+'","stockCode": "'+stockCode+'"}}';
                        }
                    }else{
                        if(!$(".select-box div.fr>b").hasClass("active")){
                            paraminfo = '{"body":{"pageNum":"'+pageNum+'","orderStr":"asc","serch_key":"' + val + '","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '","oneLevel":"A","twoLevel":"'+val2+'","stockCode": "'+stockCode+'"}}';
                        }else{
                            paraminfo = '{"body":{"pageNum":"'+pageNum+'","orderStr":"desc","serch_key":"' + val + '","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '","oneLevel":"A","twoLevel":"'+val2+'","stockCode": "'+stockCode+'"}}';
                        }
                    }
                    console.log(paraminfo);
                    $.axsRequest("FT308",paraminfo,false,function(data){
                        if(data.retCode=="0000"){
                            console.log(data);
                            List=List.concat(data.retData.infoList);
                            dataList(List);
                        }else{
                            errorAlert(data.retCode,data.retMsg)
                        }
                    });
                    $("#moreGongGao").html("加载更多");
                }else{
                    $("#moreGongGao").html("没有更多数据");
                }



        }
        var mySchedule1 = new Schedule({
            el: '#schedule-box1',
            //date: '2018-9-20',
            clickCb: function (y, m, d) {
                             if(d.length==1){
                    document.querySelector('#start-time').innerHTML = y + '-' + m + '-0' + d;
                    sTime=y+'-'+m+'-0'+d;
                }else{
                    document.querySelector('#start-time').innerHTML = y + '-' + m + '-' + d;
                    sTime=y+'-'+m+'-'+d;
                }
               sTime=sTime.split("-").join("");
                console.log(sTime);
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
                $(".start-time>span").removeClass("active");
                   $(".start-time>span").addClass("close").removeClass("bot");
                startTime=$("#start-time").html();
                // if(!$(".select-box div.fr>b").hasClass("active")){
                //     paraminfo = '{"body":{"orderStr":"asc","serch_key":"' + val + '","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '"}}';
                // }else{
                //     paraminfo = '{"body":{"orderStr":"desc","serch_key":"' + val + '","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '"}}';
                // }
                if(isXSB=="true"){
                    if(!$(".select-box div.fr>b").hasClass("active")){
                        paraminfo = '{"body":{"orderStr":"asc","serch_key":"' + val + '","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '","oneLevel":"SB","oneLevel":"'+val2+'","stockCode": "'+stockCode+'"}}';
                    }else{
                        paraminfo = '{"body":{"orderStr":"desc","serch_key":"' + val + '","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '","oneLevel":"SB","oneLevel":"'+val2+'","stockCode": "'+stockCode+'"}}';
                    }
                }else{
                    if(!$(".select-box div.fr>b").hasClass("active")){
                        paraminfo = '{"body":{"orderStr":"asc","serch_key":"' + val + '","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '","oneLevel":"A","oneLevel":"'+val2+'","stockCode": "'+stockCode+'"}}';
                    }else{
                        paraminfo = '{"body":{"orderStr":"desc","serch_key":"' + val + '","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '","oneLevel":"A","oneLevel":"'+val2+'","stockCode": "'+stockCode+'"}}';
                    }
                }

                $.axsRequest("FT308", paraminfo, false, function (data) {
                    if (data.retCode == "0000") {
                        console.log(data);
                        List = data.retData.infoList;
                        pageNum = data.retData.pageNum;
                        totalPage = data.retData.totalPage;
                        totalNum = data.retData.totalNum;
                        console.log(pageNum);
                        console.log(totalPage);
                        dataList(List);
                        $(".totalNum").html(totalNum);
                        if(pageNum==totalPage||totalPage==0){
                            $("#moreGongGao").html("没有更多数据");
                            console.log("没有更多数据")
                        }else{
                            $("#moreGongGao").html("加载更多");
                            console.log("加载更多")
                        }
                    } else {
                        errorAlert(data.retCode, data.retMsg);
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
                    eTime=y+'-'+m+'-0'+d;
                }else{
                    document.querySelector('#end-time').innerHTML = y + '-' + m + '-' + d;
                    eTime=y+'-'+m+'-'+d;
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
                // if(!$(".select-box div.fr>b").hasClass("active")){
                //     paraminfo = '{"body":{"orderStr":"asc","serch_key":"' + val + '","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '"}}';
                // }else{
                //     paraminfo = '{"body":{"orderStr":"desc","serch_key":"' + val + '","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '"}}';
                // }
                if(isXSB=="true"){
                    if(!$(".select-box div.fr>b").hasClass("active")){
                        paraminfo = '{"body":{"orderStr":"asc","serch_key":"' + val + '","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '","oneLevel":"SB","oneLevel":"'+val2+'","stockCode": "'+stockCode+'"}}';
                    }else{
                        paraminfo = '{"body":{"orderStr":"desc","serch_key":"' + val + '","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '","oneLevel":"SB","oneLevel":"'+val2+'","stockCode": "'+stockCode+'"}}';
                    }
                }else{
                    if(!$(".select-box div.fr>b").hasClass("active")){
                        paraminfo = '{"body":{"orderStr":"asc","serch_key":"' + val + '","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '","oneLevel":"A","oneLevel":"'+val2+'","stockCode": "'+stockCode+'"}}';
                    }else{
                        paraminfo = '{"body":{"orderStr":"desc","serch_key":"' + val + '","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '","oneLevel":"A","oneLevel":"'+val2+'","stockCode": "'+stockCode+'"}}';
                    }
                }
                $.axsRequest("FT308", paraminfo, false, function (data) {
                    if (data.retCode == "0000") {
                        console.log(data);
                        List = data.retData.infoList;
                        pageNum = data.retData.pageNum;
                        totalPage = data.retData.totalPage;
                        totalNum = data.retData.totalNum;
                        console.log(pageNum);
                        console.log(totalPage);
                        dataList(List);
                        $(".totalNum").html(totalNum);
                        if(pageNum==totalPage||totalPage==0){
                            $("#moreGongGao").html("没有更多数据");
                        }else{
                            $("#moreGongGao").html("加载更多");
                        }
                    } else {
                        errorAlert(data.retCode, data.retMsg);
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
                  if(isXSB=="true"){
                    if(!$(".select-box div.fr>b").hasClass("active")){
                        paraminfo = '{"body":{"orderStr":"asc","serch_key":"' + val + '","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '","oneLevel":"SB","oneLevel":"'+val2+'","stockCode": "'+stockCode+'"}}';
                    }else{
                        paraminfo = '{"body":{"orderStr":"desc","serch_key":"' + val + '","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '","oneLevel":"SB","oneLevel":"'+val2+'","stockCode": "'+stockCode+'"}}';
                    }
                }else{
                    if(!$(".select-box div.fr>b").hasClass("active")){
                        paraminfo = '{"body":{"orderStr":"asc","serch_key":"' + val + '","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '","oneLevel":"A","oneLevel":"'+val2+'","stockCode": "'+stockCode+'"}}';
                    }else{
                        paraminfo = '{"body":{"orderStr":"desc","serch_key":"' + val + '","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '","oneLevel":"A","oneLevel":"'+val2+'","stockCode": "'+stockCode+'"}}';
                    }
                }

                $.axsRequest("FT308", paraminfo, false, function (data) {
                    if (data.retCode == "0000") {
                        console.log(data);
                        List = data.retData.infoList;
                        pageNum = data.retData.pageNum;
                        totalPage = data.retData.totalPage;
                        totalNum = data.retData.totalNum;
                        console.log(pageNum);
                        console.log(totalPage);
                        dataList(List);
                        $(".totalNum").html(totalNum);
                        if(pageNum==totalPage||totalPage==0){
                            $("#moreGongGao").html("没有更多数据");
                            console.log("没有更多数据")
                        }else{
                            $("#moreGongGao").html("加载更多");
                            console.log("加载更多")
                        }
                    } else {
                        errorAlert(data.retCode, data.retMsg);
                    }
                });
		
    })
    
    $(".end-time").on("click","span.close",function(){
    	$(this).removeClass("close").removeClass("active");
		$("#end-time").html("结束时间");
		$("#schedule-box2").attr("style","display:none");
		endTime="";
		      if(isXSB=="true"){
                    if(!$(".select-box div.fr>b").hasClass("active")){
                        paraminfo = '{"body":{"orderStr":"asc","serch_key":"' + val + '","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '","oneLevel":"SB","oneLevel":"'+val2+'","stockCode": "'+stockCode+'"}}';
                    }else{
                        paraminfo = '{"body":{"orderStr":"desc","serch_key":"' + val + '","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '","oneLevel":"SB","oneLevel":"'+val2+'","stockCode": "'+stockCode+'"}}';
                    }
                }else{
                    if(!$(".select-box div.fr>b").hasClass("active")){
                        paraminfo = '{"body":{"orderStr":"asc","serch_key":"' + val + '","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '","oneLevel":"A","oneLevel":"'+val2+'","stockCode": "'+stockCode+'"}}';
                    }else{
                        paraminfo = '{"body":{"orderStr":"desc","serch_key":"' + val + '","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '","oneLevel":"A","oneLevel":"'+val2+'","stockCode": "'+stockCode+'"}}';
                    }
                }
                $.axsRequest("FT308", paraminfo, false, function (data) {
                    if (data.retCode == "0000") {
                        console.log(data);
                        List = data.retData.infoList;
                        pageNum = data.retData.pageNum;
                        totalPage = data.retData.totalPage;
                        totalNum = data.retData.totalNum;
                        console.log(pageNum);
                        console.log(totalPage);
                        dataList(List);
                        $(".totalNum").html(totalNum);
                        if(pageNum==totalPage||totalPage==0){
                            $("#moreGongGao").html("没有更多数据");
                        }else{
                            $("#moreGongGao").html("加载更多");
                        }
                    } else {
                        errorAlert(data.retCode, data.retMsg);
                    }
                });
    })
        
        
        //点击发布时间排序
        $(".select-box>div>.time").click(function(){
            if(isXSB=="true"){
                if(!$(".select-box div.fr>b").hasClass("active")){
                    paraminfo = '{"body":{"orderStr":"desc","serch_key":"' + val + '","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '","oneLevel":"SB","twoLevel":"'+val2+'","stockCode": "'+stockCode+'"}}';
                    $(".select-box div.fr>b").addClass("active");
                }else{
                    paraminfo = '{"body":{"orderStr":"asc","serch_key":"' + val + '","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '","oneLevel":"SB","twoLevel":"'+val2+'","stockCode": "'+stockCode+'"}}';
                    $(".select-box div.fr>b").removeClass("active");

                }
            }else{
                if(!$(".select-box div.fr>b").hasClass("active")){
                    paraminfo = '{"body":{"orderStr":"desc","serch_key":"' + val + '","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '","oneLevel":"A","twoLevel":"'+val2+'","stockCode": "'+stockCode+'"}}';
                    $(".select-box div.fr>b").addClass("active");
                }else{
                    paraminfo = '{"body":{"orderStr":"asc","serch_key":"' + val + '","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '","oneLevel":"A","twoLevel":"'+val2+'","stockCode": "'+stockCode+'"}}';
                    $(".select-box div.fr>b").removeClass("active");
                }
            }
            $.axsRequest("FT308", paraminfo, false, function (data) {
                if (data.retCode == "0000") {
                    console.log(data);
                    List = data.retData.infoList;
                    pageNum = data.retData.pageNum;
                    totalPage = data.retData.totalPage;
                    totalNum = data.retData.totalNum;
                    console.log(pageNum);
                    console.log(totalPage);
                    dataList(List);
                    $(".big-t").show();
                    $(".search-word").html(val);
                    $(".totalNum").html(totalNum);
                    if(pageNum==totalPage||totalPage==0){
                        $("#moreGongGao").html("没有更多数据");
                    }else{
                        $("#moreGongGao").html("加载更多");
                    }
                } else {
                    errorAlert(data.retCode, data.retMsg);
                }
            });
        });
        //点击二级菜单
        $(".ggSelect").on("click","li",function(){
            $(".three>.s-title").html($(this).html()+"<span></span>")
            val2=$(this).attr("name");
            console.log(val2);
            if(isXSB=="true"){
                console.log(11111)
                if(!$(".select-box div.fr>b").hasClass("active")){
                    paraminfo = '{"body":{"orderStr":"asc","serch_key":"' + val + '","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '","oneLevel":"SB","twoLevel":"'+val2+'","stockCode": "'+stockCode+'"}}';
                }else{
                    paraminfo = '{"body":{"orderStr":"desc","serch_key":"' + val + '","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '","oneLevel":"SB","twoLevel":"'+val2+'","stockCode": "'+stockCode+'"}}';
                }
            }else{
                console.log(222)
                if(!$(".select-box div.fr>b").hasClass("active")){
                    paraminfo = '{"body":{"orderStr":"asc","serch_key":"' + val + '","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '","oneLevel":"A","twoLevel":"'+val2+'","stockCode": "'+stockCode+'"}}';
                }else{
                    paraminfo = '{"body":{"orderStr":"desc","serch_key":"' + val + '","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '","oneLevel":"A","twoLevel":"'+val2+'","stockCode": "'+stockCode+'"}}';
                }
            }

            $.axsRequest("FT308", paraminfo, false, function (data) {
                if (data.retCode == "0000") {
                    console.log(data);
                    List = data.retData.infoList;
                    pageNum = data.retData.pageNum;
                    totalPage = data.retData.totalPage;
                    totalNum = data.retData.totalNum;
                    console.log(pageNum);
                    console.log(totalPage);
                    dataList(List);
                    $(".search-word").html(val);
                    $(".totalNum").html(totalNum);
                    if(pageNum==totalPage||totalPage==0){
                        $("#moreGongGao").html("没有更多数据");
                    }else{
                        $("#moreGongGao").html("加载更多");
                    }
                } else {
                    errorAlert(data.retCode, data.retMsg);
                }
            });
        })

    },
    //下拉框列表展示
    selList:function(){
        var stockCode= getUrlParam("stockcode");
        var html=''
        if(isXSBCompany(stockCode)){
            var isXSB=true;
        }else{
            var isXSB=false;
        }
        if(isXSB==true){
            var  paraminfo='{"body":{"type":"33"}}';
        }else {
            var  paraminfo='{"body":{"type":"34"}}';
        }


        $.axsRequest("FT003",paraminfo,false,function(data){
            if(data.retCode=="0000"){
                var list=data.retData.infoList;
                console.log(list);

                for(var i=0;i<list.length;i++){
                        html+="<li name="+list[i].code+"><a href='#'>"+list[i].name+"</a></li>"
                }
                $(".ggSelect").html(html)
            }else{
                errorAlert(data.retCode,data.retMsg);
            }
        });
    }
};


$(function() {
MyCollect.PageInit();
});