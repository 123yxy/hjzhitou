MyCollect = {
    PageInit: function () {
        var obj = this;
        obj.threeReport();
        obj.Select();
    },

    threeReport:function(){
        function dataList(list){
            var html='';
            for(var i=0;i<list.length;i++){
                // console.log(list[i].attach[1])
                 var listObj = JSON.stringify(list[i]);
           if(list[i].rating==""){
           	 if(list[i].zsz==null||list[i].syl==null&&list[i].rating==""){
                    html+="<a data-listObj='"+listObj+"' code='"+list[i].stock_code+"' class='con-item' target='_blank'><p><span>"+list[i].rtypename+"</span>"+list[i].title+"</p><div><span>发布时间："+list[i].release_time+"</span><span>所属行业："+list[i].industry_name+"</span><span>来源："+list[i].rorgname+"</span><span>本次评级：--</span><span>分析师："+list[i].analyst+"</span></div><div>"+list[i].content+"</div></a></a>"
                }else{
                    html+="<a data-listObj='"+listObj+"' code='"+list[i].stock_code+"' class='con-item' target='_blank'><p><span>"+list[i].rtypename+"</span>"+list[i].title+"</p><div><span>发布时间："+list[i].release_time+"</span><span>所属行业："+list[i].industry_name+"</span><span>来源："+list[i].rorgname+"</span><span>本次评级：--</span><span>分析师："+list[i].analyst+"</span><span>总市值：<span class='num'>"+list[i].zsz+"</span>亿</span><span>市盈率（静）：<span>"+list[i].syl+"</span></span></div><div>"+list[i].content+"</div></a></a>"
                }
           }else{
           	 if(list[i].zsz==null||list[i].syl==null&&list[i].rating==""){
                    html+="<a data-listObj='"+listObj+"' code='"+list[i].stock_code+"' class='con-item' target='_blank'><p><span>"+list[i].rtypename+"</span>"+list[i].title+"</p><div><span>发布时间："+list[i].release_time+"</span><span>所属行业："+list[i].industry_name+"</span><span>来源："+list[i].rorgname+"</span><span>本次评级："+list[i].rating+"</span><span>分析师："+list[i].analyst+"</span></div><div>"+list[i].content+"</div></a></a>"
                }else{
                    html+="<a data-listObj='"+listObj+"' code='"+list[i].stock_code+"' class='con-item' target='_blank'><p><span>"+list[i].rtypename+"</span>"+list[i].title+"</p><div><span>发布时间："+list[i].release_time+"</span><span>所属行业："+list[i].industry_name+"</span><span>来源："+list[i].rorgname+"</span><span>本次评级："+list[i].rating+"</span><span>分析师："+list[i].analyst+"</span><span>总市值：<span class='num'>"+list[i].zsz+"</span>亿</span><span>市盈率（静）：<span>"+list[i].syl+"</span></span></div><div>"+list[i].content+"</div></a></a>"
                }
           }
               

            }
            $(".notice-content").html(html);
            $(".notice-content .con-item").on("click",function(){
            		localStorage.setItem('sfybobj',$(this).attr("data-listObj"));
            		// window.location.href="/detail/detail.html?type=sf&stockCode="+$(this).attr("code");
                window.open("/detail/detail.html?type=sf&stockCode="+$(this).attr("code"));
            });
        }
        var paraminfo='{"body":{}}';
        var pageNum=0,totalPage=0,reportList=[],totalNum=0;
        var val='';
        var typeId="";
        $.axsRequest("FT307",paraminfo,true,function(data){
            if(data.retCode=="0000"){
                console.log(data);
                 reportList=data.retData.infoList;
                pageNum=data.retData.pageNum;
                totalPage=data.retData.totalPage;
                totalNum = data.retData.totalNum;
                dataList(reportList)
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
        //点击加载更多
        $(".add-more").click(function(){
            addMore(paraminfo);
        })
        function addMore(){
            pageNum++;
            console.log(pageNum);
            console.log(totalPage);
            if(pageNum<=totalPage){
                if($(".hyfl .s-title").attr("data")==1){
                    paraminfo='{"body":{"pageNum":"'+pageNum+'","serch_key":"'+val+'","oneLevel":"HYFL","twoLevel":"'+typeId+'"}}';
                }else if($(".hylx .s-title").attr("data")==1){
                    paraminfo='{"body":{"pageNum":"'+pageNum+'","serch_key":"'+val+'","oneLevel":"HYLX","twoLevel":"'+typeId+'"}}';
                }else if($(".gsyj .s-title").attr("data")==1){
                    paraminfo='{"body":{"pageNum":"'+pageNum+'","serch_key":"'+val+'","oneLevel":"GSYJ","twoLevel":"'+typeId+'"}}';
                }else if($(".dsb .s-title").attr("data")==1){
                    paraminfo='{"body":{"pageNum":"'+pageNum+'","serch_key":"'+val+'","oneLevel":"XSB","twoLevel":"'+typeId+'"}}';
                }else if($(".zbqs .s-title").attr("data")==1){
                    paraminfo='{"body":{"pageNum":"'+pageNum+'","serch_key":"'+val+'","oneLevel":"AQS","twoLevel":"'+typeId+'"}}';
                }else if($(".timer .s-title").attr("data")==1){
                    paraminfo='{"body":{"pageNum":"'+pageNum+'","serch_key":"'+val+'","oneLevel":"ASJ","twoLevel":"'+typeId+'"}}';
                }else{
                    paraminfo='{"body":{"pageNum":"'+pageNum+'","serch_key":"'+val+'"}}';
                }
                $.axsRequest("FT307",paraminfo,true,function(data){
                    if(data.retCode=="0000"){
                        console.log(data);
                        reportList=reportList.concat(data.retData.infoList);
                        dataList(reportList);
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
            }
        }
        //点击搜索发送请求
        $("#search").keydown(function(){
            if(event.keyCode == "13") {
                val=$(this).val();
                console.log(val);
                if($(".hyfl .s-title").attr("data")==1){
                    paraminfo='{"body":{"serch_key":"'+val+'","oneLevel":"HYFL","twoLevel":"'+typeId+'"}}';
                }else if($(".hylx .s-title").attr("data")==1){
                    paraminfo='{"body":{"serch_key":"'+val+'","oneLevel":"HYLX","twoLevel":"'+typeId+'"}}';
                }else if($(".gsyj .s-title").attr("data")==1){
                    paraminfo='{"body":{"serch_key":"'+val+'","oneLevel":"GSYJ","twoLevel":"'+typeId+'"}}';
                }else if($(".dsb .s-title").attr("data")==1){
                    paraminfo='{"body":{"serch_key":"'+val+'","oneLevel":"XSB","twoLevel":"'+typeId+'"}}';
                }else if($(".zbqs .s-title").attr("data")==1){
                    paraminfo='{"body":{"serch_key":"'+val+'","oneLevel":"AQS","twoLevel":"'+typeId+'"}}';
                }else if($(".timer .s-title").attr("data")==1){
                    paraminfo='{"body":{"serch_key":"'+val+'","oneLevel":"ASJ","twoLevel":"'+typeId+'"}}';
                }else{
                    paraminfo='{"body":{"serch_key":"'+val+'"}}';
                }

                $.axsRequest("FT307",paraminfo,true,function(data){
                    if(data.retCode=="0000"){
                        console.log(data);
                        reportList=data.retData.infoList;
                        pageNum=data.retData.pageNum;
                        totalPage=data.retData.totalPage;
                        totalNum = data.retData.totalNum;
                        console.log(pageNum);
                        console.log(totalPage);
                        dataList(reportList);
                        $(".totalNum").html(totalNum);
                        if(pageNum==totalPage||totalPage==0){
                            $(".add-more").hide();
                        }else{
                            $(".add-more").show()
                        }
                        $.UserLogJsonData({"userId":localStorage.getItem("userId"),"modelName":"三方研报关键词检索"},true,function(data){});
                    }else{
                        errorAlert(data.retCode,data.retMsg);
                    }
                });
            }
        });
        //点击行业分类检索列表
        $(".hyfl").on("click",".s-content li a",function(){
            $(".hyfl .s-title").attr("data","1").parents().siblings().children(".s-title").attr("data","");
            typeId=$(this).attr("name");
                  var index=$(this).parent().index();
            if(index==0){
            	paraminfo='{"body":{"serch_key":"'+val+'"}}';
            }else{
            	paraminfo='{"body":{"serch_key":"'+val+'","oneLevel":"HYFL","twoLevel":"'+typeId+'"}}';
            }
            
            
            $.axsRequest("FT307",paraminfo,true,function(data){
                if(data.retCode=="0000"){
                    console.log(data);
                    reportList=data.retData.infoList;
                    pageNum=data.retData.pageNum;
                    totalPage=data.retData.totalPage;
                    totalNum = data.retData.totalNum;
                    dataList(reportList)
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
        //点击行业类型检索列表
        $(".hylx").on("click",".s-content li a",function(){
            $(".hylx .s-title").attr("data","1").parents().siblings().children(".s-title").attr("data","");
            typeId=$(this).attr("name");
                 var index=$(this).parent().index();
            if(index==0){
            	paraminfo='{"body":{"serch_key":"'+val+'"}}';
            }else{
            	paraminfo='{"body":{"serch_key":"'+val+'","oneLevel":"HYLX","twoLevel":"'+typeId+'"}}';
            }
            
            $.axsRequest("FT307",paraminfo,true,function(data){
                if(data.retCode=="0000"){
//                  console.log(data);
                    reportList=data.retData.infoList;
                    pageNum=data.retData.pageNum;
                    totalPage=data.retData.totalPage;
                    totalNum = data.retData.totalNum;
                    dataList(reportList);
//                  console.log(totalPage,pageNum);
                    $(".totalNum").html(totalNum);
                    if(pageNum==totalPage||totalPage==0){
                        $(".add-more").hide();
                    }else{
                        $(".add-more").show()
                    }
                }else{
                    errorAlert(data.retCode,data.retMsg);
                }
            })
        })
        //点击公司研究检索列表
        $(".gsyj").on("click",".s-content li a",function(){
            $(".gsyj .s-title").attr("data","1").parents().siblings().children(".s-title").attr("data","");
            typeId=$(this).attr("name");
            var index=$(this).parent().index();
            if(index==0){
            	 paraminfo='{"body":{"serch_key":"'+val+'"}}';
            }else{
            	   paraminfo='{"body":{"serch_key":"'+val+'","oneLevel":"GSYJ","twoLevel":"'+typeId+'"}}';
            }
         
            $.axsRequest("FT307",paraminfo,true,function(data){
                if(data.retCode=="0000"){
                    console.log(data);
                    reportList=data.retData.infoList;
                    pageNum=data.retData.pageNum;
                    totalPage=data.retData.totalPage;
                    totalNum = data.retData.totalNum;
                    dataList(reportList);
                    console.log(totalPage,pageNum);
                    $(".totalNum").html(totalNum);
                    if(pageNum==totalPage||totalPage==0){
                        $(".add-more").hide();
                    }else{
                        $(".add-more").show()
                    }
                }else{
                    errorAlert(data.retCode,data.retMsg);
                }
            })
        })
        //点击第三板检索列表
        $(".dsb").on("click",".s-content li a",function(){
            $(".dsb .s-title").attr("data","1").parents().siblings().children(".s-title").attr("data","");
            typeId=$(this).attr("name");
             var index=$(this).parent().index();
            if(index==0){
            	paraminfo='{"body":{"serch_key":"'+val+'"}}';
            }else{
            	paraminfo='{"body":{"serch_key":"'+val+'","oneLevel":"XSB","twoLevel":"'+typeId+'"}}';
            }
            
            
            $.axsRequest("FT307",paraminfo,true,function(data){
                if(data.retCode=="0000"){
//                  console.log(data);
                    reportList=data.retData.infoList;
                    pageNum=data.retData.pageNum;
                    totalPage=data.retData.totalPage;
                    totalNum = data.retData.totalNum;
                    dataList(reportList);
//                  console.log(totalPage,pageNum);
                    $(".totalNum").html(totalNum);
                    if(pageNum==totalPage||totalPage==0){
                        $(".add-more").hide();
                    }else{
                        $(".add-more").show()
                    }
                }else{
                    errorAlert(data.retCode,data.retMsg);
                }
            })
        })
        //点击主板券商检索列表
        $(".zbqs").on("click",".s-content li a",function(){
            $(".zbqs .s-title").attr("data","1").parents().siblings().children(".s-title").attr("data","");
            typeId=$(this).attr("name");
             var index=$(this).parent().index();
            if(index==0){
            	paraminfo='{"body":{"serch_key":"'+val+'"}}';
            }else{
            	paraminfo='{"body":{"serch_key":"'+val+'","oneLevel":"AQS","twoLevel":"'+typeId+'"}}';
            }
            
            $.axsRequest("FT307",paraminfo,true,function(data){
                if(data.retCode=="0000"){
                    //console.log(data);
                    reportList=data.retData.infoList;
                    pageNum=data.retData.pageNum;
                    totalPage=data.retData.totalPage;
                    totalNum = data.retData.totalNum;
                    dataList(reportList);
                    //console.log(totalPage,pageNum);
                    $(".totalNum").html(totalNum);
                    if(pageNum==totalPage||totalPage==0){
                        $(".add-more").hide();
                    }else{
                        $(".add-more").show()
                    }
                }else{
                    errorAlert(data.retCode,data.retMsg);
                }
            })
        })
        //点击时间检索列表
        $(".timer").on("click",".s-content li a",function(){
            $(".timer .s-title").attr("data","1").parents().siblings().children(".s-title").attr("data","");
            typeId=$(this).attr("name");
            var index=$(this).parent().index();
            if(index==0){
            	paraminfo='{"body":{"serch_key":"'+val+'"}}';
            }else{
            	paraminfo='{"body":{"serch_key":"'+val+'","oneLevel":"ASJ","twoLevel":"'+typeId+'"}}';
            }
            
            $.axsRequest("FT307",paraminfo,true,function(data){
                if(data.retCode=="0000"){
//                  console.log(data);
                    reportList=data.retData.infoList;
                    pageNum=data.retData.pageNum;
                    totalPage=data.retData.totalPage;
                    totalNum = data.retData.totalNum;
                    dataList(reportList);
                    console.log(totalPage,pageNum);
                    $(".totalNum").html(totalNum);
                    if(pageNum==totalPage||totalPage==0){
                        $(".add-more").hide();
                    }else{
                        $(".add-more").show()
                    }
                }else{
                    errorAlert(data.retCode,data.retMsg);
                }
            })
        })
      

    },
    Select:function(){
        function selectList(type,contentBox) {
            var  paraminfo='{"body":{"type":"'+type+'"}}';
            $.axsRequest("FT003",paraminfo,true,function(data){
                if(data.retCode=="0000"){
//                  console.log(data);
                    var list=data.retData.infoList;
                 console.log(list);
                    var html='';
                    for(var i=0;i<list.length;i++){
                        html+="<li><a href='#' name="+list[i].code+">"+list[i].name+"</a></li>"
                    }
                    $(contentBox).html(html)
                }else{
                    errorAlert(data.retCode,data.retMsg);
                }
            });
        }
        selectList(20,".hyfl ul");
        selectList(21,".hylx ul");
        // selectList(22,".gsyj ul");
        selectList(23,".dsb ul");
        // selectList(31,".zbqs ul");
        selectList(32,".timer ul");
        // 主办券商
        var  paraminfo='{"body":{"type":"31"}}';
        $.axsRequest("FT003",paraminfo,true,function(data){
            if(data.retCode=="0000"){
                console.log(data);
                var list=data.retData.infoList;
                console.log(list);
                var html='';
                for(var i=0;i<list.length;i++){
                    html+="<li><a href='#' name="+list[i].code+">"+list[i].name+"</a></li>"
                }
                $(".zbqs ul").html(html)
            }else{
                errorAlert(data.retCode,data.retMsg);
            }
        });
        // 公司研究
        var  paraminfo1='{"body":{"type":"22"}}';
        $.axsRequest("FT003",paraminfo1,true,function(data){
            if(data.retCode=="0000"){
                console.log(data);
                var list=data.retData.infoList;
                console.log(list);
                var html='';
                for(var i=0;i<list.length;i++){
                    html+="<li><a href='#' name="+list[i].code+">"+list[i].name+"</a></li>"
                }
                $(".gsyj ul").html(html)
            }else{
                errorAlert(data.retCode,data.retMsg);
            }
        });

    },

};


$(function() {
    MyCollect.PageInit();
});