MyCollect = {
    PageInit: function () {
        var obj = this;
        obj.Hover();
        obj.Search();
        obj.DQSelect();
        obj.HYSelect();
        obj.Select();
    },
    // 遮罩层滑动效果
    Hover:function () {
        var leftBoxs=$('.result-item .left-box'),
            liBox=$(".shade li");
        $(".result-box").on("mouseenter",".left-box",function(){
            $(this).siblings(".shade").removeClass("hide");
            $(this).parent().siblings().children(".shade").addClass("hide");
            // $(this).parent().css("padding","20px").siblings().css("padding","20px 0");
            // console.log($(this).siblings(".btn"));
            $(this).siblings(".btn").attr("style","margin-right:20px;").parent().siblings().children(".btn").attr("style","margin-right:0;")
        });

        $(".result-box").on("mouseleave",function(){
            $(".shade").addClass("hide");
            // $(".result-item").css("padding","20px 0");
            $(".btn").attr("style","margin-right:0")
        });
        $(".result-box").on("mouseover",".shade li",function(){
            $(this).addClass("active")//li
                .children()
                .children("b").addClass("active")//b
                .siblings().removeClass("hide")//span
                .parent()//a
                .parent()//li
                .siblings().removeClass("active");//li
            $(this).parent()
                .addClass("active");
        });
        $(".result-box").on("mouseout",".shade li",function(){
            $(this).removeClass("active")
                .children()
                .children('b').removeClass("active")
                .siblings().addClass("hide");
            $(this).parent()
                .removeClass("active");
        })
    },
    //企业搜索列表
    Search:function(){
        var txt = getUrlParam("txt");
        function dataList(list){
        		console.log(list)
            var html='';
            $(".result-box").html("");
            if(list.length==0) return;
            for(var i=0;i<list.length;i++){
                if(list[i].isCunXu==0){
                		var content=list[i].stockName+","+list[i].stockCode;
                		var chiName=list[i].chiName;
                		var keychiName=chiName.replace(new RegExp(txt,"gm"),"<font color='red'>"+txt+"</font>");
                    html+="<div class='result-item'><div class='fl left-box'><div class='fl img-box'><img src="+list[i].logo+"></div><div class='fl com-infor'><div class='com-name'>"+keychiName+"</div>"+
                    "<p>注册资金："+list[i].registeredCapital+"万元&nbsp;&nbsp;&nbsp;&nbsp;法定代表人："+list[i].legalPerson+"&nbsp;&nbsp;&nbsp;&nbsp;成立时间："+list[i].registrationDate+"</p><p>电话："+list[i].phone+"&nbsp;&nbsp;&nbsp;&nbsp;邮箱："+list[i].companyMail+"</p>"+
					"<p>地址："+list[i].businessAddress+"</p><p>股票简称："+list[i].stockName+"</p></div></div><div class='shade hide' name="+list[i].stockCode+" stockName="+list[i].stockName+"><div class='prompt'>点击进入企业全貌</div>"+
                    "<ul class='clearfix'><li class='one'><a href='/searchList.html?stockcode="+list[i].stockCode+"&type=2&tj=&content="+content+"&tab=content_xw'><b class=''></b><span class='hide'>新闻</span></a></li>"+
                    "<li class='two'><a href='/searchList.html?stockcode="+list[i].stockCode+"&type=2&tj=&content="+content+"&tab=content_gg'><b></b><span class='hide'>公告</span></a></li>"+
                    "<li class='three'><a href='/searchList.html?stockcode="+list[i].stockCode+"&type=2&tj=&content="+content+"&tab=content_yb'><b></b><span class='hide'>研报</span></a></li>"+
//					"<li class='four'><a href='/businessDetails/financialData.html?stockCode="+list[i].stockCode+"&stockName="+list[i].stockName+"'><b></b><span class='hide'>财务数据</span></a></li>"+
                    "</ul></div></div>"

                }else{
                    var content=list[i].stockName+","+list[i].stockCode;
                    var chiName=list[i].chiName;
                		var keychiName=chiName.replace(new RegExp(txt,"gm"),"<font color='red'>"+txt+"</font>");
                    html+="<div class='result-item'><div class='fl left-box'><div class='fl img-box'><img src="+list[i].logo+"></div><div class='fl com-infor'><div class='com-name'>"+keychiName+"</div>"+
                        "<p>注册资金："+list[i].registeredCapital+"万元&nbsp;&nbsp;&nbsp;&nbsp;法定代表人："+list[i].legalPerson+"&nbsp;&nbsp;&nbsp;&nbsp;成立时间："+list[i].registrationDate+"</p><p>电话："+list[i].phone+"&nbsp;&nbsp;&nbsp;&nbsp;邮箱："+list[i].companyMail+"</p>"+
						"<p>地址："+list[i].businessAddress+"</p><p>股票简称："+list[i].stockName+"</p></div></div><button class='button_special fr'>存续</button><div class='shade hide' name="+list[i].stockCode+" stockName="+list[i].stockName+"><div class='prompt'>点击进入企业全貌</div>"+
                        "<ul class='clearfix'><li class='one'><a href='/searchList.html?stockcode="+list[i].stockCode+"&type=2&tj=&content="+content+"&tab=content_xw'><b class=''></b><span class='hide'>新闻</span></a></li>"+
                        "<li class='two'><a href='/searchList.html?stockcode="+list[i].stockCode+"&type=2&tj=&content="+content+"&tab=content_gg'><b></b><span class='hide'>公告</span></a></li>"+
                        "<li class='three'><a href='/searchList.html?stockcode="+list[i].stockCode+"&type=2&tj=&content="+content+"&tab=content_yb'><b></b><span class='hide'>研报</span></a></li>"+
//                      "<li class='four'><a href='/businessDetails/financialData.html?stockCode="+list[i].stockCode+"&stockName="+list[i].stockName+"'><b></b><span class='hide'>财务数据</span></a></li>"+
						"</ul></div></div>"

                }

            }
            $(".result-box").html(html);

        }
        $(".key-word em").html(txt);
        var paraminfo='{"body":{"serch_key":"'+txt+'"}}';
        var pageNum=0,totalPage=0,conList=[],totalNum=0;
        var typeId='',szId='',zgbId='',timeId='',dqId='',hyId='';
        $.axsRequest("FT304",paraminfo,true,function(data){
            if(data.retCode=="0000"){
                conList=data.retData.EnterpriseList;
                pageNum=data.retData.pageNum;
                totalNum=data.retData.totalNum;
                totalPage=data.retData.totalPage;
//              console.log(conList);
				if(totalNum>0){
					$(".total-num").html(totalNum);
				}else{
					$(".total-num").html(0)
				}
                
            		dataList(conList);
                if(pageNum==totalPage||totalPage==0){
                    $(".add-more").addClass("hide");
                }
            }else{
                errorAlert(data.retCode,data.retMsg);
            }
        });
        //点击加载更多
        $(".add-more").click(function(){
           addMore()
        });
        function addMore(){
            pageNum++;
//          console.log(pageNum);
//          console.log(totalPage);
            if(pageNum<=totalPage){
                paraminfo='{"body":{"pageNum":"'+pageNum+'","serch_key":"'+txt+'","companyTypeCode":"'+typeId+'","marketValueCode":"'+szId+'","amountTotalCode":"'+zgbId+'","registeredYearCode":"'+timeId+'","registeredAreaId":"'+dqId+'","companyCategoryId":"'+hyId+'"}}';
                $.axsRequest("FT304",paraminfo,true,function(data){
                    if(data.retCode=="0000"){
//                      console.log(data);
                        conList=conList.concat(data.retData.EnterpriseList);
                        dataList(conList);
                         if(pageNum==totalPage||totalPage==0){
                    $(".add-more").addClass("hide");
                }
                    }else{
                        errorAlert(data.retCode,data.retMsg)
                    }
                })
            }
        }
        //点击企业类别检索列表
        $(".qy").on("click",".s-content li a",function (){
            typeId=$(this).attr("name");
            paraminfo='{"body":{"serch_key":"'+txt+'","companyTypeCode":"'+typeId+'","marketValueCode":"'+szId+'","amountTotalCode":"'+zgbId+'","registeredYearCode":"'+timeId+'","registeredAreaId":"'+dqId+'","companyCategoryId":"'+hyId+'"}}';
            $.axsRequest("FT304",paraminfo,true,function(data){
                if(data.retCode=="0000"){
//                  console.log(data);
                    conList=data.retData.EnterpriseList;
                    pageNum=data.retData.pageNum;
                    totalNum=data.retData.totalNum;
//                  console.log(pageNum);
                    totalPage=data.retData.totalPage;
//                  console.log(conList);
                    dataList(conList);
                    if(totalNum>0){
                    		$(".total-num").html(totalNum);
                    }else{
                    		$(".total-num").html(0);
                    }
                    
                     if(pageNum==totalPage||totalPage==0){
                    $(".add-more").addClass("hide");
                }
                }else{
                    errorAlert(data.retCode,data.retMsg);
                }
            });
        });
        //点击市值检索列表
        $(".sz").on("click",".s-content li a",function (){
            szId=$(this).attr("name");
            paraminfo='{"body":{"serch_key":"'+txt+'","companyTypeCode":"'+typeId+'","marketValueCode":"'+szId+'","amountTotalCode":"'+zgbId+'","registeredYearCode":"'+timeId+'","registeredAreaId":"'+dqId+'","companyCategoryId":"'+hyId+'"}}';
            $.axsRequest("FT304",paraminfo,true,function(data){
                if(data.retCode=="0000"){
//                  console.log(data);
                    conList=data.retData.EnterpriseList;
                    pageNum=data.retData.pageNum;
                    totalNum=data.retData.totalNum;
//                  console.log(pageNum);
                    totalPage=data.retData.totalPage;
//                  console.log(conList);
                    dataList(conList);
                    if(totalNum>0){
                    		$(".total-num").html(totalNum);
                    }else{
                    		$(".total-num").html(0);
                    }
                    $(".total-num").html(totalNum)
                     if(pageNum==totalPage||totalPage==0){
                    $(".add-more").addClass("hide");
                }
                }else{
                    errorAlert(data.retCode,data.retMsg);
                }
            });
        });
        //点击总股本检索列表
        $(".zgb").on("click",".s-content li a",function (){
            zgbId=$(this).attr("name");
            paraminfo='{"body":{"serch_key":"'+txt+'","companyTypeCode":"'+typeId+'","marketValueCode":"'+szId+'","amountTotalCode":"'+zgbId+'","registeredYearCode":"'+timeId+'","registeredAreaId":"'+dqId+'","companyCategoryId":"'+hyId+'"}}';
            $.axsRequest("FT304",paraminfo,true,function(data){
                if(data.retCode=="0000"){
//                  console.log(data);
                    conList=data.retData.EnterpriseList;
                    pageNum=data.retData.pageNum;
                    totalNum=data.retData.totalNum;
//                  console.log(pageNum);
                    totalPage=data.retData.totalPage;
//                  console.log(conList);
                    dataList(conList);
                    if(totalNum>0){
                    		$(".total-num").html(totalNum);
                    }else{
                    		$(".total-num").html(0);
                    }
                    $(".total-num").html(totalNum)
                     if(pageNum==totalPage||totalPage==0){
                    $(".add-more").addClass("hide");
                }
                }else{
                    errorAlert(data.retCode,data.retMsg);
                }
            });
        });
        //点击挂牌时间检索列表
        $(".timer").on("click",".s-content li a",function (){
            timeId=$(this).attr("name");
            paraminfo='{"body":{"serch_key":"'+txt+'","companyTypeCode":"'+typeId+'","marketValueCode":"'+szId+'","amountTotalCode":"'+zgbId+'","registeredYearCode":"'+timeId+'","registeredAreaId":"'+dqId+'","companyCategoryId":"'+hyId+'"}}';
            $.axsRequest("FT304",paraminfo,true,function(data){
                if(data.retCode=="0000"){
                    console.log(data);
                    conList=data.retData.EnterpriseList;
                    pageNum=data.retData.pageNum;
                    totalNum=data.retData.totalNum;
                    console.log(pageNum);
                    totalPage=data.retData.totalPage;
                    console.log(conList);
                    dataList(conList);
                    if(totalNum>0){
                    		$(".total-num").html(totalNum);
                    }else{
                    		$(".total-num").html(0);
                    }
                    $(".total-num").html(totalNum)
                     if(pageNum==totalPage||totalPage==0){
                    $(".add-more").addClass("hide");
                }
                }else{
                    errorAlert(data.retCode,data.retMsg);
                }
            });
        });
        //点击省份地区检索列表
        $(".dq").on("click",".s-content li a",function (){
            dqId=$(this).attr("name");
            paraminfo='{"body":{"serch_key":"'+txt+'","companyTypeCode":"'+typeId+'","marketValueCode":"'+szId+'","amountTotalCode":"'+zgbId+'","registeredYearCode":"'+timeId+'","registeredAreaId":"'+dqId+'","companyCategoryId":"'+hyId+'"}}';
            $.axsRequest("FT304",paraminfo,true,function(data){
                if(data.retCode=="0000"){
//                  console.log(data);
                    conList=data.retData.EnterpriseList;
                    pageNum=data.retData.pageNum;
                    totalNum=data.retData.totalNum;
//                  console.log(pageNum);
                    totalPage=data.retData.totalPage;
//                  console.log(conList);
                    dataList(conList);
                    if(totalNum>0){
                    		$(".total-num").html(totalNum);
                    }else{
                    		$(".total-num").html(0);
                    }
                    $(".total-num").html(totalNum)
                   if(pageNum==totalPage||totalPage==0){
                    $(".add-more").addClass("hide");
                }
                }else{
                    errorAlert(data.retCode,data.retMsg);
                }
            });
        });
        //点击行业门类检索列表
        $(".hy").on("click",".s-content li a",function (){
            hyId=$(this).attr("name");
            paraminfo='{"body":{"serch_key":"'+txt+'","companyTypeCode":"'+typeId+'","marketValueCode":"'+szId+'","amountTotalCode":"'+zgbId+'","registeredYearCode":"'+timeId+'","registeredAreaId":"'+dqId+'","companyCategoryId":"'+hyId+'"}}';
            $.axsRequest("FT304",paraminfo,true,function(data){
                if(data.retCode=="0000"){
                    conList=data.retData.EnterpriseList;
                    pageNum=data.retData.pageNum;
                    totalNum=data.retData.totalNum;
                    totalPage=data.retData.totalPage;
                    dataList(conList);
                    if(totalNum>0){
                    		$(".total-num").html(totalNum);
                    }else{
                    		$(".total-num").html(0);
                    }
                    $(".total-num").html(totalNum)
                    if(pageNum==totalPage||totalPage==0){
                    $(".add-more").addClass("hide");
                }
                }else{
                    errorAlert(data.retCode,data.retMsg);
                }
            });
        });

        //点击进入企业全貌
        $(".result-box").on("click",".shade",function(){
            var stockCode=$(this).attr("name");
            var stockName=$(this).attr("stockName");
            var content=stockName+","+stockCode;
                location.href="/searchList.html?stockcode="+stockCode+"&type=2&tj=&content="+content
        });
        },
    //省份下拉列表
    DQSelect:function(){
            var paraminfo='{"body":{}}';
            $.axsRequest("FT001",paraminfo,true,function(data){
                if(data.retCode=="0000"){
                    var html="";
//                  console.log(data);
//					html+='<li><a title="全部" name="">全部</a></li>';
                    var dqList=data.retData.infoList;
                    for(var i=0;i<dqList.length;i++){
	                    if(dqList[i].name_cn!="" && dqList[i].name_cn!=undefined){
	                    		var name_cn=dqList[i].name_cn;
	                    		var id=dqList[i].id;
	                    }else{
	                    		var name_cn="";
	                    		var id="";
	                    }
                        html+='<li><a title="'+name_cn+'" name="'+id+'">'+name_cn+'</a></li>';
                    }
                $(".dq .s-content ul").html(html);
                }else{
                    errorAlert(data.retCode,data.retMsg);
                }
            });
    },
    //行业下拉列表
    HYSelect:function(){
            var paraminfo='{"body":{}}';
            $.axsRequest("FT002",paraminfo,true,function(data){
                if(data.retCode=="0000"){
                    var html="";
                    console.log(111)
                    console.log(data);
                    var hyList=data.retData.infoList;
                    for(var i=0;i<hyList.length;i++){
                        html+='<li><a name="'+hyList[i].category_id+'" title="'+hyList[i].category_name+'">'+hyList[i].category_name+'</a></li>';
                    }
                    $(".hy .s-content ul").html(html);
                }else{
                    errorAlert(data.retCode,data.retMsg);
                }
            });
    },
//下拉框列表接口
    Select:function(){
        function selectList(type,contentBox) {
            var  paraminfo='{"body":{"type":"'+type+'"}}';
//          console.log(type)
            $.axsRequest("FT003",paraminfo,true,function(data){
                if(data.retCode=="0000"){
                    var list=data.retData.infoList;
//                  console.log(list);
                    var html='';
                    for(var i=0;i<list.length;i++){
                        html+='<li><a title="'+list[i].name+'" name="'+list[i].code+'">'+list[i].name+'</a></li>';
                    }
                    $(contentBox).html(html)
                }else{
                    errorAlert(data.retCode,data.retMsg);
                }
            });
        }
        selectList(15,".qy ul");
        selectList(16,".sz ul");
        selectList(17,".zgb ul");
        selectList(18,".timer ul");
    }


}




$(function(){
    MyCollect.PageInit();
});