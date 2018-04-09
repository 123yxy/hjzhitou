var sbhtml='';
var awhtml='';
MyCollect = {
    PageInit: function () {
        var obj = this;
        obj.Reportlist();
        obj.sbList();
        obj.awList()
    },

    //列表展示
    Reportlist:function(){
        function dataList(list){
            var html='';
            for(var i=0;i<list.length;i++){
                var peRatio=list[i].peRatio.toFixed(2);
                if(peRatio<0){
                		peRatio="-";
                }else{
                		peRatio=peRatio;
                }
                if(list[i].dealType=="-"){ 
                		html+="<a href='../../slideJump/slideJump.html?txt="+list[i].url+"' class='con-item' target='_blank'><p>"+list[i].title+"</p><div><span>所属行业："+list[i].industry_name+"</span><span>地区："+list[i].state+"</span><span>总市值：<span class='num'>"+list[i].totalMarketValue+"</span>亿</span><span>市盈率（静）：<span class='num'>"+peRatio+"</span></span></div><div>"+list[i].enterpriseIntroduction+"</div></a>";
                }else{
               	 	html+="<a href='../../slideJump/slideJump.html?txt="+list[i].url+"' class='con-item' target='_blank'><p>"+list[i].title+"</p><div><span>所属行业："+list[i].industry_name+"</span><span>地区："+list[i].state+"</span><span>转让方式："+list[i].dealType+"</span><span>总市值：<span class='num'>"+list[i].totalMarketValue+"</span>亿</span><span>市盈率（静）：<span class='num'>"+peRatio+"</span></span></div><div>"+list[i].enterpriseIntroduction+"</div></a>";
                }
                
            }
            $(".notice-content").html(html)
        }
        var paraminfo='{"body":{}}';
        var pageNum=0,totalPage=0,reportList=[],totalNum=0;
        var val='';
        var awKey="";
        var sbKey="";
        $.axsRequest("FT305",paraminfo,true,function(data){
            if(data.retCode=="0000"){
                console.log(data);
                reportList=data.retData.infoList;
                pageNum=data.retData.pageNum;
                totalNum=data.retData.totalNum;
                totalPage=data.retData.totalPage;
//              console.log(pageNum);
//              console.log(totalPage);
                dataList(reportList);
                $(".totalNum").html(totalNum);
                if(pageNum==totalPage||totalPage==0){
                    $(".add-more").hide();
                }
            }else{
                errorAlert(data.retCode,data.retMsg);
            }
        });
        // 点击搜索发送请求
        $("#search").keydown(function(){
            if(event.keyCode == "13") {
                 val=$(this).val();
                var typeName=$(".three .s-title").attr("name");
                if(typeName==2){
                    paraminfo='{"body":{"serch_key":"'+val+'","oneLevel":"A","twoLevel":"'+awKey+'"}}';
                }else if(typeName==1){
                    paraminfo='{"body":{"serch_key":"'+val+'","oneLevel":"SB","twoLevel":"'+sbKey+'"}}';
                }else{
                    paraminfo='{"body":{"serch_key":"'+val+'"}}';
                }
                $.axsRequest("FT305",paraminfo,true,function(data){
                    if(data.retCode=="0000"){
//                      console.log(data);
                        reportList=data.retData.infoList;
                        pageNum=data.retData.pageNum;
                        totalPage=data.retData.totalPage;
                        totalNum=data.retData.totalNum;
//                      console.log(pageNum);
//                      console.log(totalPage);
                        dataList(reportList)
                        $(".totalNum").html(totalNum)
                        if(pageNum==totalPage||totalPage==0){
                            $(".add-more").hide();
                        }else{
                            $(".add-more").show()
                        }
                        
                        $.UserLogJsonData({"userId":localStorage.getItem("userId"),"modelName":"智能研报关键词检索"},true,function(data){});
                        
                        
                    }else{
                        errorAlert(data.retCode,data.retMsg);
                    }
                });
            }
        });
        //点击加载更多
        $(".add-more").click(function(){
            addMore(paraminfo)
        });
        function addMore(paraminfo){
            var sbname=$(".three .s-title").attr("data");
            var awname=$(".two .s-title").attr("data");
                pageNum++;
//              console.log(pageNum);
//              console.log(totalPage);
                if(pageNum<=totalPage||totalPage==0){
 var val2=$(".three .s-title").attr("name");
                    if(val2==2){
                    	console.log(1111)
                        paraminfo='{"body":{"pageNum":"'+pageNum+'","serch_key":"'+val+'","oneLevel":"A","twoLevel":"'+awKey+'"}}';
                    }else if(val2==1){
                    	console.log(2222)
                        paraminfo='{"body":{"pageNum":"'+pageNum+'","serch_key":"'+val+'","oneLevel":"SB","twoLevel":"'+sbKey+'"}}';
                    }else{
                    	console.log(3333)
                        paraminfo='{"body":{"pageNum":"'+pageNum+'","serch_key":"'+val+'"}}';
                    }
                    $.axsRequest("FT305",paraminfo,true,function(data){
                        if(data.retCode=="0000"){
//                          console.log(data);
                            reportList=reportList.concat(data.retData.infoList);
                            dataList(reportList);
                              if(pageNum==totalPage||totalPage==0){
                            $(".add-more").hide();
                        }else{
                            $(".add-more").show()
                        }
                 
                        }else{
                            errorAlert(data.retCode,data.retMsg)
                        }
                    })
                }

        }
        //点击第三板下拉框里面内容检索列表
        $(".item-content").on("click","ul li a",function(){
            $(".three>.s-title").html($(this).html()+"<span></span>")
            val2=$(this).attr("name");
//          console.log(val2);
            if($(".three .content-box>li:nth-child(2)>a").hasClass("hover")){
                $(".three .s-title").attr("name","1");
                sbKey=$(this).attr("name")
             
                 paraminfo='{"body":{"oneLevel":"SB","twoLevel":"'+val2+'","serch_key":"'+val+'"}}';
            }else{
                $(".three .s-title").attr("name","2");
                awKey=$(this).attr("name")
                paraminfo='{"body":{"oneLevel":"A","twoLevel":"'+val2+'","serch_key":"'+val+'"}}';
            }
            $.axsRequest("FT305",paraminfo,true,function(data){
                if(data.retCode=="0000"){
//                  console.log(data);
                    reportList=data.retData.infoList;
                    pageNum=data.retData.pageNum;
                    totalPage=data.retData.totalPage;
                    totalNum=data.retData.totalNum;
//                  console.log(pageNum);
//                  console.log(totalPage);
                    dataList(reportList)
                    $(".totalNum").html(totalNum)
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
        
        //点击全部检索列表
        	$(".s-content ").on("click",".all",function(){
			$(".three .s-title").attr("name","0");
			  paraminfo = '{"body":{"serch_key":"' + val + '"}}';
			  $(".three .s-title").attr("name","0");
		   $.axsRequest("FT305",paraminfo,true,function(data){
                if(data.retCode=="0000"){
//                  console.log(data);
                    reportList=data.retData.infoList;
                    pageNum=data.retData.pageNum;
                    totalPage=data.retData.totalPage;
                    totalNum=data.retData.totalNum;
//                  console.log(pageNum);
//                  console.log(totalPage);
                    dataList(reportList)
                    $(".totalNum").html(totalNum)
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
        
        
        
        //点击第三板下拉框里面内容检索列表
//      $(".sb .content-box").on("click","li a",function(){
//          $(".three .s-title").attr("data","1");
//         $(".two .s-title").attr("data","");
//          sbKey=$(this).attr("name");
//          console.log(sbKey);
//          $(".three .s-title").attr("name",sbKey);
//          paraminfo='{"body":{"oneLevel":"SB","twoLevel":"'+sbKey+'","serch_key":"'+val+'"}}';
//   	 $.axsRequest("FT305",paraminfo,true,function(data){
//              if(data.retCode=="0000"){
//                  console.log(data);
//                  reportList=data.retData.infoList;
//                  pageNum=data.retData.pageNum;
//                  totalPage=data.retData.totalPage;
//                  totalNum=data.retData.totalNum;
//                  console.log(pageNum);
//                  console.log(totalPage);
//                  dataList(reportList)
//                  $(".totalNum").html(totalNum)
//                  if(pageNum==totalPage||totalPage==0){
//                      $(".btn").hide();
//                  }else{
//
//                      $(".btn").show()
//                  }
//              }else{
//                  errorAlert(data.retCode,data.retMsg);
//              }
//          });
//      })
//      //点击A股下拉框里面的内容检索列表
//      $(".aw .content-box").on("click","li a",function(){
//          $(".three .s-title").attr("data","");
//          $(".two .s-title").attr("data","1");
//           awKey=$(this).attr("name");
//          $(".two .s-title").attr("name",awKey);
//          paraminfo='{"body":{"oneLevel":"A","twoLevel":"'+awKey+'","serch_key":"'+val+'"}}';
//           $.axsRequest("FT305",paraminfo,true,function(data){
//              if(data.retCode=="0000"){
//                  console.log(data);
//                  reportList=data.retData.infoList;
//                  pageNum=data.retData.pageNum;
//                  totalPage=data.retData.totalPage;
//                  totalNum=data.retData.totalNum;
//                  console.log(pageNum);
//                  console.log(totalPage);
//                  dataList(reportList)
//                  $(".totalNum").html(totalNum)
//                  if(pageNum==totalPage||totalPage==0){
//                      $(".btn").hide();
//                  }else{
//
//                      $(".btn").show()
//                  }
//              }else{
//                  errorAlert(data.retCode,data.retMsg);
//              }
//          });
//      })

    },
    //第三板下拉框内容
    sbList:function(){
        var sbInfo='{"body":{"type":"SB"}}';
        $.axsRequest("FT002",sbInfo,true,function(data){
            if(data.retCode=="0000"){
//              console.log(data)
                var sbList=data.retData.infoList;
               // var html='';
                for(var i=0;i<sbList.length;i++){
                    sbhtml+="<li><a href='#' name="+sbList[i].category_id+">"+sbList[i].category_name+"</a></li>"
                }
                //$(".sb .content-box").html(sbhtml)
            }else{
                errorAlert(data.retCode,data.retMsg);
            }
        });
    },
    //A股下拉框内容
    awList:function(){
        var awInfo='{"body":{"type":"A"}}';
        $.axsRequest("FT002",awInfo,true,function(data){
            if(data.retCode=="0000"){
//              console.log(data)
                var awList=data.retData.infoList;
//              var html='';
                for(var i=0;i<awList.length;i++){
                    awhtml+="<li><a href='#' name="+awList[i].category_id+">"+awList[i].category_name+"</a></li>"
                }
               // $(".aw .content-box").html(awhtml)
            }else{
                errorAlert(data.retCode,data.retMsg);
            }
        });
        
        $(".content-box a").mouseenter(function(){
        var val=$(this).attr("name");
        if(val=="sb"){
//          console.log("sb")
            $(".item-content ul").html(sbhtml)
//          console.log(sbhtml);
        }
        if(val=="aw"){
        	$(".item-content ul").html(awhtml)
//      	 console.log(awhtml);
        }

     })
    }

};


$(function() {
    MyCollect.PageInit();
});