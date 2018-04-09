//股票排行
var stockCodeparam=getUrlParam("stockCode");
var stockName=getUrlParam("stockName");
//var userId = localStorage.getItem("userId");
//var contrasts = localStorage.getItem(userId);
var contrasts = findContrastCompany();
$(function(){
	//行业查询
	findSecondLevelTrade();
	//查询指标名称
	findIndicatorName();
	
	//行业鼠标滑过事件
//	$("#workBookList ul").delegate("li","mouseenter",function(){
//		$(this).addClass("bgc").siblings().removeClass("bgc");
//		var tradeId=$(this).attr("data-tradeId");
//	});
	//行业单击事件
	$("#workBookList ul").delegate("li","click",function(e){
		$(this).addClass("bgc").siblings().removeClass("bgc");
		$(this).find("a").addClass("on");
		$(this).siblings().find("a").removeClass("on");
		var tradeId=$(this).attr("data-tradeId");
		findRankTradeStatistics(tradeId);
		//图标更新
		if(typeof(e.originalEvent)=="undefined"){
			changFindRankingParam(false);
		}else{
			changFindRankingParam(true);
		}
		//切换的行业不为空清空掉检索内容
		if(tradeId!=null && tradeId!="" && tradeId!=undefined
				&& $(".yx_hy").text()!=$(this).text()){
//			$("#inputStockCode").attr("data-stock",$("#inputStockCode").val());
			$("#inputTradeName").val('');
			$("#inputStockCode").val("");
		}
		$(".yx_hy").text($(this).find("a").text());
		$(".hangye").slideUp();
	});
	//加载更多行业信息
	$("#moreTrade").on("click",function(){
		if(length>=secondLevelTrade.length){
			$(this).hide();
			return false;
		}
		var eachLength=10;
		if(length+10>=secondLevelTrade.length){
			eachLength=secondLevelTrade.length-length;
		}
		for (var i = 0; i < eachLength; i++) {
			var workBookList='<li data-tradeId="'+secondLevelTrade[i+length].categoryId+'" title="'+secondLevelTrade[i+length].categoryName+'"><a href="javascript:;">'+secondLevelTrade[i+length].categoryName.substring(0,8)+'</a></li>'			
			$("#workBookList ul").append(workBookList);
		}
		length+=eachLength;
		if(length>=secondLevelTrade.length){
			$(this).hide();
			return false;
		}
	});
	//点击切换
	$(".qiehuan").on("click",function(e){
//		if($(".hangye").css("display")=="block"){
//			$(".hangye").hide();
//		}else{
			$(".hangye").show();
//		}
		e.stopPropagation();
		e.preventDefault();
	})
	//点击输入框关闭弹窗
	$(document).bind("mousedown",function(event){
		var $target = $(event.target);
		if((!($target.parents().andSelf().is("#test")))){
			if($("#test").css("display")=="block"){
				$("#test").hide();
				
			}
		}
	})

	
	//时间鼠标滑动事件
	$("#dataTime a").eq(0).addClass("show");
//	$("#dataTime a").on("mouseenter",function(){
//		$(this).addClass("show").siblings().removeClass("show");
//	})
	$("#dataTime a").on("click",function(){
		if($(this).text()=="全部"){
			$(this).prev().prev().show();
			$(this).prev().show();
			$(this).hide();
		}else{
			$(this).addClass("show").siblings().removeClass("show");
			//图标更新
			changFindRankingParam(true);
		}
	})
	//点击加入对比显示弹窗
	$("#stockRanking").delegate(".gpph","click",function(){
		$(".czzx_content").addClass("on");
		$(".gegu_zb").show();
	})
	//升降序
	$(".industry_top span").on("click",function(){
		if($(this).find("i").eq(0).hasClass("rotate")){
			$(this).find("i").eq(0).removeClass("rotate")
			$(this).find("b").eq(0).text("升序");
		}else{
			$(this).find("i").eq(0).addClass("rotate");
			$(this).find("b").eq(0).text("降序");
		}
		//图标更新
		changFindRankingParam(false);
	});
	//行业检索事件
	$("#inputTradeName").keydown(function(event){
		if(event.keyCode=="13" || event.keyCode==13){
			$.each(secondLevelTradeNames, function(index, flag) {
				var val = $.trim($("#inputTradeName").val());
				//console.log("1："+$("#inputTradeName").val());
				var a=secondLevelTradeNames[index];
				if(secondLevelTradeNames[index].indexOf(val)>-1){
					if(a.length>=6){
						a=secondLevelTradeNames[index].substring(0,6)+"...";
					}else{
						a=secondLevelTradeNames[index];
					}
					$("#inputTradeName").val(a);
				}
			});
			setTradeName();
			//隐藏查询的值
			$("ul[id^='ui-id']").hide();
		}
	 });
	$("#inputTradeName").autocomplete({
		minLength: 2,
	    source: secondLevelTradeNames,
	    delay: 500,
	    close: function(event, ui) {
			setTradeName();
		}
	});
	//股票检索事件
	/*$("#inputStockCode").keydown(function(event){
		if(event.keyCode=="13" || event.keyCode==13){
			$.each(stockCodeAndName, function(index, flag) {
				var val = $.trim($("#inputStockCode").val());
				if(val==null||val==""||val==undefined){
					$.zmAlert("未找到匹配股票");
				}else{
					if(stockCodeAndName[index].indexOf(val)>-1){
						$("#inputStockCode").val(stockCodeAndName[index]);
					}
					$(".hy_search i").removeClass("hy-icon");
					$(".hy_search i").addClass("hy_colse");
				}
			});
			setSlider(indicatorName);;
			//隐藏查询的值
			$("ul[id^='ui-id']").hide();
		}
	 });
	$("#inputStockCode").autocomplete({
		minLength: 2,
	    source: stockCodeAndName,
	    delay: 500,
		close: function(event, ui) {
			setSlider(indicatorName);;
			$(".hy_search i").removeClass("hy-icon");
			$(".hy_search i").addClass("hy_colse");
		}
	});*/
	
	/*信息补全开始*/
	$("#inputStockCode").keydown(function(e) {
		if(e.keyCode==13){
			//searchList.length != 0
//			console.log(searchList);
			$.each(searchList, function(index, flag) {
				var val = $.trim($("#inputStockCode").val());
				if (searchList.length != 0) {
//                    $.each(searchList, function (index, flag) {
//                        var val = $.trim($("#inputStockCode").val());
//                        if (stockCodeAndName[index].indexOf(val) > -1) {
//                            $("#inputStockCode").val(stockCodeAndName[index]);
//                            paiming();
//                        }
//                    });
                    $.each(searchList, function(index, flag) {
						if(val.indexOf(flag.code) > -1  || val.indexOf(flag.name) > -1) {
							$("#inputStockCode").val(flag.label);
							paiming();
							$(".ss_gs em").removeClass("hy_ss_icon");
							$(".ss_gs em").addClass("hy_sc");
						}
					});
                } else {
                    $.zmAlert("未找到匹配股票");
                }
			});
		}
	});

	//首页顶部搜索
	$("#inputStockCode").autocomplete({
		minLength: 2,
		source: function(request, response) {
			findCodeName(request, response);
		},
		delay: 100,
		select: function(event, ui) {
			var item = ui.item;
//			console.log(item)
			var code=Number(item.code);
//			console.log(item);
		},
		close: function(event, ui) {
			paiming();
//			setSlider(indicatorName);;
			$(".ss_gs em").removeClass("hy_ss_icon");
			$(".ss_gs em").addClass("hy_sc");
		}
	});
	//hy_sc   输入框的删除符号 hy_colse
	$("div.ss_gs").delegate(".hy_sc","click",function(){
		$("#inputStockCode").val("");
		$(this).removeClass("hy_sc");
		$(this).addClass("hy_ss_icon");
		//图标更新
		//changFindRankingParam(true);
		$("#workBookList ul").find("li").eq(0).click();
	})
	/*$(".hy_search").delegate(".hy-icon","click",function(){
		$("#inputStockCode").val("");
		$(".hy_search i").removeClass("hy-icon");
		$(".hy_search i").addClass("hy_colse");
		//图标更新
		changFindRankingParam(true);
		
	})*/
	
	//显示对比分析
//	$(".contrast_left").on("click",function(){
//		var wi=$('.right_content').width();
//	    var wi2=$('.m_10_box').width();
//		if(wi==null){
//			$(".contrast").css("width",wi2);	
//		}else{
//			$(".contrast").css("width",wi);
//		}
//		$(".contrast_right").show();
//	});
//	$(".contra_yc").on("click",function(){
//		$(".contrast").css("width","");
//		$(".contrast_right").hide();
//	});
	/**
	 * 显示用户添加的对比公司
	 */
//	showContrast();
	/**
	 * 开始对比
	 */
	$("#contrastList_a").click(function(){
		var stockCodes = "";
		var stockNames = "";
		$(".duibiCompany").each(function(){
			stockCodes += $(this).attr("data-code") + ",";
			stockNames += $(this).attr("data-name") + ",";
		})
		if(stockCodes != "" && stockNames != ""){
			location.href = "/multidimensionalStock/multidStockanalysisTable.html";
		}else{
			$.zmAlert("请选择要对比的企业");
		}
	});
	if(stockName==null || stockName=='undefined' || stockCodeparam==null || stockCodeparam=="" || stockCodeparam=='undefined'){
		$("#inputStockCode").val("");
	}else{
		$("#inputStockCode").val(stockName+"("+stockCodeparam+")");
		$(".ss_gs em").removeClass("hy_ss_icon");
		$(".ss_gs em").addClass("hy_sc");
	}
	
	//$("#inputStockCode").keydown();
	//初始化头部信息---第一个行业单击事件
	if(stockCodeparam!="" && stockCodeparam!=null && stockCodeparam!=undefined){
		findCompanyandIndustry(stockCodeparam);
		setSlider(indicatorName);;
	}else{
		$("#workBookList ul").find("li").eq(0).click();
	}
	//console.log($("#inputStockCode").val());
});
//行业加载跟多控制
var secondLevelTrade=null;//所有行业数据
var secondLevelTradeNames=[];
var stockLevelTrade={};//公司对应的二级行业id
//stockLevelTrade[data.obj.stockcode]=data.obj.hangyeId;
//				{"430002":1812,"430003":1813}
var length=0;//行业数据显示位置
/**
 * 自动补全行业代码
 */
function setTradeName(){
	var val = $.trim($("#inputTradeName").val());
	var index=$.inArray(val,secondLevelTradeNames);
	var vlaue=secondLevelTrade[index].categoryName;
	if(index==-1){
		return false;
	}else{
		if(val.length>6){
			vlaue=val.substring(0,5)+"...";
		}
	}
	$("#inputTradeName").val(vlaue);
	$("#inputTradeName").attr("title",val);
	//TODO  第一种交互方案
	var workBookList='<li data-tradeId="'+secondLevelTrade[index].categoryId+'"><a href="#">'+secondLevelTrade[index].categoryName+'</a></li>'			
	$("#workBookList ul").html(workBookList);
	$("#workBookList ul").find("li").eq(0).click();
	$("#inputTradeName").keyup(function(event){
		if($.trim($("#inputTradeName").val())==null || $.trim($("#inputTradeName").val())==""){
			initLoadingSecondLevelTrade();
		}
	});
	//TODO  第二种交互方案
//	if(length<(index+1)){
//		var endLength=(index+1);
//		if(endLength%10!=0){
//			endLength=endLength+(10-endLength%10);
//		}
//		if(endLength>=secondLevelTrade.length){
//			endLength=secondLevelTrade.length;
//		}
//		for (var i = length; i < endLength; i++) {
//			var workBookList='<li data-tradeId="'+secondLevelTrade[i].id+'"><a href="#">'+secondLevelTrade[i].nameCn+'</a></li>'			
//			$("#workBookList ul").append(workBookList);
//		}
//		length=endLength;
//		if(length>=secondLevelTrade.length){
//			$("#moreTrade").hide();
//		}
//	}
//	var objLi=$("#workBookList ul").find("li");
//	var liHeight=objLi.eq(0).height();
//	$.each(objLi,function(index,item){
//		var liText=objLi.eq(index).find("a").eq(0).text();
//		if(liText==val){
//			//定义滚动条位置
//			var scrollHeight=$("#workBookList")[0].scrollTop+objLi.eq(index).offset().top-$("#workBookList").offset().top;
//			$("#workBookList")[0].scrollTop = scrollHeight;
//			objLi.eq(index).click();
//			return false;
//		}
//	});
}
/**
 * 查询所有二级行业
 */
function findSecondLevelTrade(){
	$.axs("/betaStock/btCategory/findBtCategory.do",null,false,function(data){
		if(data.retCode==0000){
			if(data.retData!=null && data.retData.length!=0){
				secondLevelTrade=data.retData;
				initLoadingSecondLevelTrade();
			}
		}
	});
}
/**
 * 初始化加载行业信息
 */
function initLoadingSecondLevelTrade(){
	length=secondLevelTrade.length;//>20?20:secondLevelTrade.length;
	var workBookListHtml='';
	var workBookListHtml='<li data-tradeId="" title="全部行业"><a href="javascript:;">全部行业</a></li>';
	for(var i=0;i<length;i++){
		workBookListHtml+='<li data-tradeId="'+secondLevelTrade[i].categoryId+'" title="'+secondLevelTrade[i].categoryName+'"><a href="javascript:;">'+secondLevelTrade[i].categoryName+'</a></li>';			
	}
	$("#workBookList ul").html(workBookListHtml);
	//初始化头部信息
	$("#workBookList ul").find("li").eq(0).click();
	for (var int = 0; int < secondLevelTrade.length; int++) {
		secondLevelTradeNames[int]=secondLevelTrade[int].categoryName;
	}
}
/**
 * 查询所有指标
 */
function findIndicatorName(){
	$.axs("/betaInvest/common/findWorkBook.do",{type:3,dataType:1},false,function(data){
		if(data.retCode==0000){
			if(data.retData!=null && data.retData.length!=0){
				var resultWorkBook=data.retData;
				$.each(resultWorkBook,function(index,item){
					if(item.id!=432){
						if(item.id==422){
							$(".selectBox p").attr("data-indicatorid",item.id);
							$(".selectBox p").text(item.nameCn);
						}
						var indicatorNameHtml='<li data-indicatorId="'+item.id+'">'+item.nameCn+'</li>';
						$("#indicatorName").append(indicatorNameHtml);
					}
					
				});
			}
		}
	});
}
/**
 * 股票排行行业统计查询
 * @param tradeId 行业Id
 */
function findRankTradeStatistics(tradeId){	
	//调用本方法清空所有数据 
	$("#companiesNum").text("家");
	$("#marketMakingTransfer").text("家");
	$("#priceChangeRatio").text("家");
	$("#priceChangeRatio").css("color","");
	
	$("#upNum").text("家");
	$("#downNum").text("家");
	$("#upStockName").text("");
	$("#downStockName").text("");
	$("#totalValue").text("亿元");
	$("#tradingVolume").text("万股");
	$("#transactionVolume").text("万元");
	$.axs("/betaInvest/tradeRanking/findRankTradeStatistics.do",{tradeId:tradeId},false,function(data){
		if(data.retCode==0000){
			if(data.retData!=null&&data.retData.length!=0){
				var result=data.retData;
				$("#companiesNum").text(result.companiesNum+"家");
				$("#marketMakingTransfer").text(result.marketMakingTransfer+"家");
				if(result.priceChangeRatio==null || result.priceChangeRatio==" " || result.priceChangeRatio==undefined){
					result.priceChangeRatio=="--";
				}else{
					if(result.priceChangeRatio>=0){
						$("#priceChangeRatio").css("color","#f8575f");
					}else{
						$("#priceChangeRatio").css("color","#77c886");
					}
					result.priceChangeRatio=(result.priceChangeRatio).toFixed(2)+"%";
				}
				$("#priceChangeRatio").text(result.priceChangeRatio);
				$("#upNum").text(result.upNum+"家");
				$("#downNum").text(result.downNum+"家");
				if(result.upStockName==null){
					$("#upStockName").text("");
				}else{
					$("#upStockName").text(result.upStockName);
					$("#upStockName").on("click",function(){
						window.location.href="/businessDetails/newTBindex.html?stockName="+result.upStockName+"&stockCode="+result.upStockCode;
					})
				}
				if(result.downStockName==null){
					$("#downStockName").text("");
				}else{
					$("#downStockName").text(result.downStockName);
					$("#downStockName").on("click",function(){
						window.location.href="/businessDetails/newTBindex.html?stockName="+result.downStockName+"&stockCode="+result.downStockCode;
					})
				}
				$("#totalValue").text((result.totalValue/10000).toFixed(2)+"亿元");
				$("#tradingVolume").text((result.tradingVolume).toFixed(2)+"万股");
				$("#transactionVolume").text((result.transactionVolume).toFixed(2)+"万元");
				
			}
		}
	})
}

/**
 * 改变搜索条件
 * @param isClearInputStockCode
 * @returns {Boolean}
 */
function changFindRankingParam(isClearInputStockCode){
	var indicatorId=$(".selectBox p").attr("data-indicatorId");
//	console.log($(".selectBox p").text());
	indicatorName=$(".selectBox p").text();
//	console.log(indicatorName);
	if(indicatorId=="" || indicatorId==null || indicatorId=="undefined"){
		return false;
	}
	var tradeId=null;
	$("#workBookList").find("li").each(function(){
		if($(this).hasClass("bgc")){
			tradeId=$(this).attr("data-tradeId");
		}
	});
//	if(tradeId=="" || tradeId==null || tradeId=="undefined"){
//		return false;
//	}
	var dateTime=null;
//	$("#dataTime").find("a").each(function(){
//		if($(this).hasClass("show")){
//			dateTime=$(this).text();
//		}
//	});
//	if(dateTime=="" || dateTime==null || dateTime=="undefined"){
//		return false;
//	}
	var sortParam=null;
	if($(".industry_top span").find("i").eq(0).hasClass("rotate")){
		sortParam="Asc";
	}else{
		sortParam="Desc";
	}
	if(sortParam=="" || sortParam==null || sortParam=="undefined"){
		return false;
	}
	findRanking(tradeId,dateTime,sortParam,indicatorId,isClearInputStockCode,indicatorName);
}
//图表显示提示数据
var xAixs=[];
var yAixs=[];
var stockCode=[];//动态显示股票代码
var stockCodeAndName=[];//股票代码自动补全
var indicatorName="";//所选择的指标名称
var chg=[];//涨跌幅
var ranking=[];//排名
/**
 * 查询指标排名值
 * @param tradeId 行业主键
 * @param dateTime 时间
 * @param sortParam 排序方式：desc、asc
 * @param indicatorId 指标主键
 */
function findRanking(tradeId,dateTime,sortParam,indicatorId,isClearInputStockCode,indicatorName){
	$(".loadingBox").show();
	//切换数据删除原画图代码，重新生成代码
	$("#stockRanking").remove();
	$(".industry_top").after('<div id="stockRanking" class="stock_rank"></div>');
	//画图数据
	xAixs=new Array();
	yAixs=new Array();
	stockCode=new Array();
	chg=new Array();
	ranking=new Array();
	stockCodeAndName=new Array();
	$.axs("/betaInvest/tradeRanking/findRankCapacity.do",{tradeId:tradeId,sortParam:sortParam,dateTime:dateTime,indicatorId:indicatorId},false,function(data){
		if(data.retCode==0000){
			if(data.retData!=null){
				var result=eval("(" +data.retData + ")");
				//t:更新时间;c:股票代码;n:股票简称;v:指标值;h:涨跌幅
				stockCode=result.c;
				chg=result.h;
				stockCodeAndName=result.c;
				xAixs=result.n;
				yAixs=result.v;
				//更新时间
				$(".new_time").text(((result.t == undefined ? "--" : (result.t).substring(0,10))));
				if(isClearInputStockCode){
					//清空匹配值
					//$("#inputStockCode").val("");
					//fieldRankChart(xAixs,yAixs,1);
					setSlider(indicatorName);
				}else{
					//重新显示地图
					setSlider(indicatorName);
				}
			}
			//废弃的方法:因为数据量太大(2M)导致加载太慢
//			if(data.retData!=null && data.retData.length!=0){
//				var resultList=eval("(" + data.retData + ")");
//				//console.log(resultList);
//				for(var i=0;i<resultList.length;i++){
//					xAixs[i]=resultList[i].stockName;
//					if($("#indicatorName").prev().text()=="净利润" || $("#indicatorName").prev().text()=="营业收入"
//						|| $("#indicatorName").prev().text()=="总资产" || $("#indicatorName").prev().text()=="总股本"){
//						yAixs[i]=(resultList[i].wookBookValue/10000.00).toFixed(2);
//					}else{
//						yAixs[i]=resultList[i].wookBookValue;
//					}
//					stockCode[i]=resultList[i].stockCode;
//					
//					chg[i]=resultList[i].chg;
//					//console.log(chg[i])
//					ranking[i]=resultList[i].ranking;
//					//stockCodeAndName[i]=resultList[i].stockName+"("+resultList[i].stockCode+")";
//					stockCodeAndName[i]=resultList[i].stockCode;
////					if(resultList[i].stockCode=="430002"){
////						console.log(stockCodeAndName[i]+":"+i);
////						console.log(resultList[i].stockCode+":"+resultList[i].chg);
////					}
//					if(resultList[i].createTime!=null){
//						$(".new_time").text(resultList[i].createTime.substring(0,10));
//					}
//				}
//				if(isClearInputStockCode){
//					//清空匹配值
//					//$("#inputStockCode").val("");
//					//fieldRankChart(xAixs,yAixs,1);
//					setSlider(indicatorName);
//				}else{
//					//重新显示地图
//					setSlider(indicatorName);
//				}
//			}
		}
	});
	$(".loadingBox").hide();
}

var itemIndex=null;
function setSlider(indicatorName){
	
	var inputStockCode=$.trim($("#inputStockCode").val());;
	//下标从0开始
//	console.log(stockCodeAndName);
	//console.log("inputStockCode:"+inputStockCode);
	var indexStockCode=inputStockCode.substring(inputStockCode.indexOf("(")+1,inputStockCode.indexOf(")"));
	var index=$.inArray(indexStockCode,stockCodeAndName);
//	console.log(index);
	itemIndex=index;
	if(itemIndex>5){
		fieldRankChart(xAixs,yAixs,(index+1-3),indicatorName);
	}else{
		fieldRankChart(xAixs,yAixs,(1),indicatorName);
	}
}
//图表展示的配置
/**
 * @param xAixs  X轴-公司名称
 * @param name 
 * @param data  Y轴-公司对应的指标值
 * @param startValue 第一个显示的排名位置
 */
function fieldRankChart(xAixs,data,startValue,indicatorName){
	 // 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('stockRanking'));
    var option = {
//      title: {
//          text: "行业地位分析"
//      },
		legend:{
			show:true,
			data:[indicatorName]
		},
        dataZoom: [{
            type: "slider",
            show: true,
            startValue: startValue - 2,
            endValue: startValue + 2 + 11
            				//startValue + 2 + (Math.ceil(data.length / end))
                            // backgroundColor:"#CFEBF2",
                            // dataBackground:{
                            //     areaStyle:{
                            //          color:"#406ac1"
                            //     }
                            // }
        }],
        yAxis: [{
            type: "value",
            data: []
        }],
        xAxis: [{
            type: 'category',
            data: xAixs
        }],
        tooltip:{
        	enterable:true,//鼠标可以进入提示信息里面
        	show:true,
        	trigger:'axis',
        	position:'inside',
      	    formatter: function(params) {
      	    	//7月4日王仙玲修改提示弹窗start
//          	    	console.log(chg[params[0].dataIndex]);
	      	    	var divHtml='<div class="tooltips">';
	      	    		divHtml+='<p style="cursor: pointer;" onclick="javascript:window.location.href=\'/businessDetails/newTBindex.html?stockName='+xAixs[params[0].dataIndex]+'&stockCode='+stockCode[params[0].dataIndex]+'\'">'+xAixs[params[0].dataIndex]+'&nbsp;('+stockCode[params[0].dataIndex]+')</p>';
//	      	    		console.log(chg[params[0].dataIndex]==null);
//	      	    		console.log(chg[params[0].dataIndex]=="");
//	      	    		console.log(chg[params[0].dataIndex]==undefined);
					if(chg[params[0].dataIndex]==null || chg[params[0].dataIndex]==undefined){//chg[params[0].dataIndex]=="" ||
						chg[params[0].dataIndex]=="--";
						//divHtml+='<p style="background-color: #f3565d;">涨跌幅:&nbsp;--%</p>';
						
						divHtml+='<div class="sb_tips_content">'+
	      	    						'<span class="tips_leibie fl">涨跌幅：</span>'+
	      	    						'<span class="tips_leibie_num fl">--%</span>'+
	      	    						'<div class="clr"></div>'+
	      	    					'</div>';
					}else{
						chg[params[0].dataIndex]==Number(chg[params[0].dataIndex]).toFixed(2);
						if(chg[params[0].dataIndex]>=0){
							divHtml+='<div class="sb_tips_content">'+
	      	    						'<span class="tips_leibie fl">涨跌幅：</span>'+
	      	    						'<span class="tips_leibie_num fl" style="background-color: #f3565d;">'+(chg[params[0].dataIndex]).toFixed(2)+'%</span>'+
	      	    						'<div class="clr"></div>'+
	      	    					'</div>';
							
							//divHtml+='<p style="background-color: #f3565d;">涨跌幅&nbsp;'+chg[params.dataIndex]+'%</p>';
						}else{
							divHtml+='<div class="sb_tips_content">'+
	      	    						'<span class="tips_leibie fl">涨跌幅：</span>'+
	      	    						'<span class="tips_leibie_num fl" style="background-color: #5bb85d;">'+(chg[params[0].dataIndex]).toFixed(2)+'%</span>'+
	      	    						'<div class="clr"></div>'+
	      	    					'</div>';
						
							//divHtml+='<p style="background-color: #5bb85d;">涨跌幅&nbsp;'+chg[params.dataIndex]+'%</p>';
						}
					}
					
					if(indicatorName!="涨跌幅"){
						var showDivValue=data[params[0].dataIndex];
						if(showDivValue==null || showDivValue=="null"){
							showDivValue="未批露";
						}else{
							showDivValue=Number(data[params[0].dataIndex]).toFixed(2);
						}
						if(indicatorName.indexOf("率")>-1 && indicatorName!="市盈率"){
							divHtml+='<div class="types_two">';
							divHtml+='<span class="cjl_shuju">'+indicatorName+'</span>';
							divHtml+='<span class="shuju2">'+(showDivValue=="未批露"?showDivValue:showDivValue+"%")+'</span>';
							divHtml+='<div class="clr"></div>';
							divHtml+='</div>';
							
							//divHtml+='<p>'+indicatorName+':&nbsp;'+(data[params.dataIndex]).toFixed(2)+'%</p>';
						}else if(indicatorName.indexOf("每股")>-1){
							divHtml+='<div class="types_two">';
							divHtml+='<span class="cjl_shuju">'+indicatorName+'</span>';
							divHtml+='<span class="shuju2">'+(showDivValue=="未批露"?showDivValue:showDivValue+"元")+'</span>';
							divHtml+='<div class="clr"></div>';
							divHtml+='</div>';
							
							//divHtml+='<p>'+indicatorName+':&nbsp;'+(data[params.dataIndex]).toFixed(2)+'%</p>';
						}else{
							if($("#indicatorName").prev().text()=="净利润" || $("#indicatorName").prev().text()=="营业收入"
								|| $("#indicatorName").prev().text()=="总资产"){
								divHtml+='<div class="types_two">';
								divHtml+='<span class="cjl_shuju">'+indicatorName+'：</span>';
								divHtml+='<span class="shuju2">'+(showDivValue=="未批露"?showDivValue:showDivValue+"万元")+'</span>';
								divHtml+='<div class="clr"></div>';
								divHtml+='</div>';	
								//divHtml+='<p>'+indicatorName+':&nbsp;'+(data[params.dataIndex])+'万元</p>';
							}else if($("#indicatorName").prev().text()=="总股本"){
								divHtml+='<div class="types_two">';
								divHtml+='<span class="cjl_shuju">'+indicatorName+'：</span>';
								divHtml+='<span class="shuju2">'+(showDivValue=="未批露"?showDivValue:showDivValue+"万股")+'</span>';
								divHtml+='<div class="clr"></div>';
								divHtml+='</div>';
								//divHtml+='<p>'+indicatorName+':&nbsp;'+(data[params.dataIndex])+'万股</p>';
							}else{
								divHtml+='<div class="types_two">';
								divHtml+='<span class="cjl_shuju">'+indicatorName+'：</span>';
								divHtml+='<span class="shuju2">'+showDivValue+'</span>';
								divHtml+='<div class="clr"></div>';
								divHtml+='</div>';
								
								//divHtml+='<p>'+indicatorName+':&nbsp;'+(data[params.dataIndex]).toFixed(2)+'</p>';
							}
							
						}
						
					}
//					var stockCodeArray=new Array();
//					if(contrasts!=null){
//						var contrastsArray=contrasts.split(",");
//						$(contrastsArray).each(function(index){
//							if(contrastsArray[index]!=null && contrastsArray[index]!="" && contrastsArray[index]!="undefined"){
//								var val = contrastsArray[index].split("-");
//								stockCodeArray.push(val[0]);
//							}
//						});
//					}
					divHtml+='<p style="background: none;" class="zdf">';
					var duibi = "加入对比";
//					var userId=localStorage.getItem("userId");
//					var showName=localStorage.getItem(userId);
					var showName = findContrastCompany();
					if(showName!=null && showName!="" && showName!==undefined && showName.indexOf(stockCode[params[0].dataIndex])>-1 && showName.indexOf(xAixs[params[0].dataIndex])>-1){
						duibi="删除对比";
					}
					divHtml+='<a href="javascript:void(0);" id="'+stockCode[params[0].dataIndex]+'" onclick="addComparisonStockClass(\''+stockCode[params[0].dataIndex]+'\',\''+xAixs[params[0].dataIndex]+'\')" class="gpph" data-code="'+stockCode[params[0].dataIndex]+'" data-name="'+xAixs[params[0].dataIndex]+'">'+duibi+'</a>';
//					if($.inArray(stockCode[params.dataIndex],stockCodeArray)>-1){
//						//<a href="#" class="gpph">加入自选</a>
//						divHtml+='<a href="javascript:void(0);" onclick="addContrast(this)" class="gpph" data-code="'+stockCode[params.dataIndex]+'" data-name="'+xAixs[params.dataIndex]+'">删除对比</a>';
//					}else{
//						//<a href="#" class="gpph">加入自选</a>
//						divHtml+='<a href="javascript:void(0);" onclick="addContrast(this)" class="gpph" data-code="'+stockCode[params.dataIndex]+'" data-name="'+xAixs[params.dataIndex]+'">加入对比</a>';
//					}
					//加入自选
					if(isTrue(stockCode[params[0].dataIndex])){
						divHtml+='<a href="javascript:void(0);" onclick="addorDeleOptional(this)" id="zxgId" class="gpph" data-value="'+stockCode[params[0].dataIndex]+'">删除自选</a>';
					}else{
						//<a href="#" class="gpph">加入自选</a>
						divHtml+='<a href="javascript:void(0);" onclick="addorDeleOptional(this)" id="zxgId" class="gpph"data-value="'+stockCode[params[0].dataIndex]+'">加入自选</a>';
					}
					divHtml+='</p>';
					divHtml+='<div class="tip"></div>';
					divHtml+='</div>';
	                return divHtml;
	            }
      	    //7月4日王仙玲修改提示弹窗end
        },
        series: [{
            name: indicatorName,
            type: 'bar',
            barWidth:'30',
            data: data,
            label: {
                normal: {
                    show: true,
                    position: "top",
                    offset:[1,100],
                    formatter: function(params) {
                        return "第" + (params.dataIndex+1) + "名";
                    },
                    textStyle:{
                    	color:"#333"
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: function(params) {
//                  	console.log(params.itemIndex);
                    	  // 检索结果颜色
                        if(params.dataIndex == itemIndex) {
                            return "#f3565d";
                        } else {
                            return "#62a6f2";
                        }
//                    	return "#D53A35";
                    }
                },
                emphasis:{
                	color:"#4a8ad3"//鼠标放到柱形图上显示的颜色
                }
            }
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.onresize = myChart.resize;
}



/**
 * 点击下拉显示
 */
$(document).delegate("click", ".selectBox", function() {
	var ul = $(this).find("ul"),
		display = ul.css("display");

	display = display == "block" ? 0 : 1;

	$(".selectBox ul").css("display", "none");

	if(display) {
		ul.css("display", "block");
		display = 0;
		ul.css("display", "none");
		ul.slideDown(100,function(){
			$(this).css("overflow", "auto");
		});
	} else {
		ul.slideUp(100,function(){
			$(this).css("overflow", "auto");
		});
	}
	return false;
});

/**
 * 点击列表 文字和 value 上去
 */
$(document).on("click", ".selectBox ul li", function() {
	var p = $(this).parent().parent().find("p");
	p.text($(this).text());
	p.attr("data-indicatorid", $(this).attr("data-indicatorid"));
	p.css("color", "#fff");
	$(".jiabeijing").hide();
	changFindRankingParam(false);
});

$(document).on("click", function() {
	$(".selectBox ul").slideUp();
});




/**
 * 显示对比公司
 */
//function showContrast(){
//	$(".duibiCompany").remove();
//	if(contrasts != null){
//		var contrast = contrasts.split(",");
//		$(contrast).each(function(){
//			var val = this.split("-");
//			if(val[0] != ""){
//				$("#contrastList_a").before("<span data-code="+val[0]+" data-name="+val[1]+" class='duibiCompany' >"+val[1]+"  ("+val[0]+") <i data-value="+val[0]+" onclick='removeIcon(this)'>X</i></span>");
//			}
//		})
//	}
//}

///**
// * 添加,删除对比公司
// * @param data
// */
//function addContrast(data){
//	var contrast = "";
//	if($(data).text() == "加入对比"){
//		var flag = true;
//		if(contrasts == null){
//			contrasts = ",";
//			contrasts += $(data).attr("data-code") + "-" + $(data).attr("data-name") + ",";
//			$(data).text("删除对比");
//		}else{
//			contrast = contrasts.split(",");
//			if(contrast.length < 7){
//				$(contrast).each(function(){
//					var val = this.split("-");
//					if(val[0] == $(data).attr("data-code")){
//						flag = false;
//					}
//				})
//				if(flag){
//					contrasts += $(data).attr("data-code") + "-" + $(data).attr("data-name") + ",";
//					$(data).text("删除对比");
//				}
//			}else{
//				$.zmAlert("对比企业只能添加五个");
//			}
//		}
//	}else if($(data).text() == "删除对比"){
//		contrast = contrasts.split(",");
//		$(contrast).each(function(){
//			var val = this.split("-");
//			if(val[0] == $(data).attr("data-code")){
//				$(data).text("加入对比");
//				contrasts = contrasts.replace(","+this,"");
//			}
//		})
//	}
//	showContrast();
//	localStorage.setItem(userId,contrasts);
//
//	var wi=$('.right_content').width();
//    var wi2=$('.m_10_box').width();
//	if(wi==null){
//		$(".contrast").css("width",wi2);	
//	}else{
//		$(".contrast").css("width",wi);
//	}
//	$(".contrast_right").show();
//}
//
///**
// * 删除对比公司
// * @param data
// */
//function removeIcon(data){
//	var contrast = contrasts.split(",");
//	$(contrast).each(function(){
//		var val = this.split("-");
//		if(val[0] == $(data).attr("data-value")){
//			contrasts = contrasts.replace(","+this,"");
//		}
//	})
//	$("#duibi").text("对比");
//	localStorage.setItem(userId,contrasts);
//	$(data).parent().remove();
//}

//添加或者删除自选股
function addorDeleOptional(data){
	var zxgType = $("#zxgId").text();
	if(zxgType=="加入自选"){
		var optionalId = addOptional($(data).attr("data-value"),"");
		if(optionalId!=null&&optionalId!=""&&optionalId!=undefined){
			$("#zxgId").text("删除自选");
		}else{
			$.zmAlert("添加自选股失败");
		}
	}else{
	    var resultData = deleteOptionalByStocke($(data).attr("data-value"));
		if(resultData=="0000"){
			$("#zxgId").html("加入自选");
		}else{
			$.zmAlert("删除自选股失败");
		}
	}
}

/**
 * 添加或删除对比
 * @param comparisonStockCode
 * @param comparisonStockName
 */
function addComparisonStockClass(comparisonStockCode,comparisonStockName){
	if($("#"+comparisonStockCode).text()=="删除对比"){
		removeComparisonStock(comparisonStockCode,comparisonStockName);
		$("#"+comparisonStockCode).text("加入对比")
	}else{
		if(addComparisonStock(comparisonStockCode,comparisonStockName)){
			$("#"+comparisonStockCode).text("删除对比")
		}
	}
}

//初始化公司与行业的的一一对应
function findCompanyandIndustry(stock){
	var stock=stock;
	$.axs("/betaInvest/enterpriseData/findCodeOrName.do",{codeName:stock},true,function(data){
		//console.log(data);
		if(data.retCode=='0000'){
			var result=data.retData;
			if(result!="" && result!=null && result!=undefined){
				
				var hyId=result.industry;
				//console.log(hyId);
				//是否查找到
//				var isFinded=isExistsHy(hyId);
//				var i=0;
//				while(!isFinded && i<10){
//					$("#moreTrade").click();
//					isFinded=isExistsHy(hyId);
//					i++;
//				}
//				if(isFinded){
//					//需加载行业数据
//					findRankTradeStatistics(hyId);
//					
//				}
				
				$("#workBookList li").each(function(index,item){
					var id=$(item).attr("data-tradeid");
					if(id==hyId){
						$(item).addClass("bgc").siblings().removeClass("bgc").find("a").removeClass("on");
						$(item).find("a").addClass("on");
						//选择的行业显示
						$(".yx_hy").text($(item).text());
						//查询统计数据
						findRankTradeStatistics(hyId);
						//重新绘制图表
						changFindRankingParam(false);
//						setSlider(indicatorName);
					}
				});
//				changFindRankingParam(false);
			}
		}else{
			
		}
	})
}
//
//function isExistsHy(hyId){
//	var result =false;
//	$("#workBookList li").each(function(index,item){
//		var id=$(item).attr("data-tradeid");
//		if(id==hyId){
//			$(item).addClass("bgc").siblings().removeClass("bgc").find("a").removeClass("on");
//			$(item).find("a").addClass("on");
//			if(index>16){
//				var div = document.getElementById('workBookList');
//				div.scrollTop = div.scrollHeight; 
//			}
////			var scrollTop=$(index);
////			console.log($(index).height)
//			result=true;
//		}
//	});
//	return result;
//}

//选择公司
	function paiming(){
//		console.log(code);
			//回车事件
			if($("#inputStockCode").val() != "") {
				var val = $.trim($("#inputStockCode").val());
				
//				$("#inputTradeName").val("");
				//console.log("0："+$("#inputTradeName").val());
				
//				length=secondLevelTrade.length>20?20:secondLevelTrade.length;
//				var workBookListHtml='';
//				for(var i=0;i<length;i++){
//					workBookListHtml+='<li data-tradeId="'+secondLevelTrade[i].categoryId+'" title="'+secondLevelTrade[i].categoryName+'"><a href="javascript:;">'+secondLevelTrade[i].categoryName.substring(0,8)+'</a></li>';			
//				}
//				$("#workBookList ul").html(workBookListHtml);
				var value=val;
				if(val.indexOf("(")!=-1){
					var index=val.indexOf("(");
					var last=val.indexOf(")");
					value=val.substring(index+1,last);	
				}else if(val.length<6){
					value=code;
				}
				findCompanyandIndustry(value);
//				findRankTradeStatistics(tradeId)
//				setSlider(indicatorName);
//				findCompanyandIndustry(value);
//				if(typeof(searchList)=="undefined" ||searchList ==null ||searchList=="" || searchList==undefined){
//					findCompanyandIndustry(value);
//					setSlider(indicatorName);
//				}
//				if(typeof(searchList)!="undefined" && searchList.length != 0) {
//					$.each(searchList, function(index, flag) {
//						var val = $.trim($("#inputStockCode").val());
//						if(val==null||val==""||val==undefined){
//							$.zmAlert("未找到匹配股票");
//						}else{
//							if((searchList[index].value).indexOf(val)>-1){
//								$("#inputStockCode").val(searchList[index].value);
//								$(".ss_gs em").removeClass("hy_ss_icon");
//								$(".ss_gs em").addClass("hy_sc");
//								$("#ui-id-5").hide();
//								findCompanyandIndustry(value);
//								setSlider(indicatorName);								
//								return false;
//							}
//							
//						}
//					});
//				}else{
//					
//					$.zmAlert("请输入正确的检索信息");
//				}
			} else {
				$.zmAlert("请输入要检索的信息");
			}
			//隐藏查询的值
			$("ul[id^='ui-id']").hide();
	}