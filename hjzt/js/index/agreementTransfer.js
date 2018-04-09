//协议转让
$(function(){
	//获取协议统计
	findAgreementTransferTotal();
	//行业
	findSecondLevelTrade(0,2);
	//区域
	findFirstLevelArea()
	//今日协议成交
	findAgreementTransferByTodayChangeParam();
	//全部数据
	findAgreementTransferChangeParam();
	
	
	$(".selectBox ul li").click(function(){
		var p = $(this).parent().parent().find("p");
		$(".selectBox ul").hide();
		$(".searching").hide();
		$(".jiabeijing").hide();
		p.text(($(this).find("a").text()).indexOf("...") > -1 ? $(this).find("a").attr("title") : $(this).find("a").text());
		p.attr("data-value", $(this).attr("data-value"));
		p.attr("value", $(this).attr("value"));
	})
	
	/*********协议成交信息补全开始***********/
	$("#stockName").keydown(function(e) {
		if(e.keyCode==13){
			$("#searchHome").click();
			$("#ui-id-2").hide();
		}
	});
	
	$("#searchHome").on("click", function() {
		findAgreementTransferByTodayChangeParam();
	});
	
	$("#seachAllData").on("click",function() {
		findAgreementTransferChangeParam();
	});
	
	$("#stockName").autocomplete({
		minLength: 2,
		source: function(request, response) {
			findByCodeName(request, response,1);
		},
		delay: 500,
		select: function(event, ui) {
			var item = ui.item;
		}
	});
	/*********协议成交信息补全结束***********/
	
	
	/*********全部协议企业信息补全开始***********/
	$("#stockCodeParam").keydown(function(e) {
		if(e.keyCode==13){
			$("#stockCodeParam").click();
			$("#ui-id-2").hide();
		}
	});
	
	$("#stockCodeParam").autocomplete({
		minLength: 2,
		source: function(request, response) {
			findByCodeName(request, response,1);
		},
		delay: 500,
		select: function(event, ui) {
			var item = ui.item;
		}
	});
	/*********全部协议企业信息补全结束***********/
	
	//点击假背景的时候下拉框收缩
	$(".jiabeijing").on("click",function(){
		$(".selectBox ul").hide();
		$(".jiabeijing").hide();
	})
	
});

/**
 * 查询所有二级行业
 */
function findSecondLevelTrade(type,level){
	$.axs("/betaStock/common/findTrade.do", {categorType:type,levelId:level}, false, function(data) {
		if(data.retCode==0000){
			if(data.retData!=null && data.retData.length!=0){
				var secondLevelTrade=data.retData;
				var html='';
				html+='<li value="0"><a href="javascript:void(0)">全部</a></li>';
				$.each(secondLevelTrade,function(index,item){
					html+='<li value="'+item.categoryId+'"><a href="javascript:void(0)" title='+item.categoryName+' >'+item.categoryName+'</a></li>';
				});
				$("#secondLevelTrade").html(html);
			}
		}
	});
}
/**
 * 查询所有区域
 */
function findFirstLevelArea(){
	$.axs("/betaStock/common/findWorkBook.do",{type:1,dataType:1},false,function(data){
		if(data.retCode==0000){
			if(data.retData!=null && data.retData.length!=0){
				var firstLevelArea=data.retData;
				var html='';
				html+='<li value="0"><a href="javascript:void(0)">全部</a></li>';
				$.each(firstLevelArea,function(index,item){
					html+='<li value="'+item.id+'"><a href="javascript:void(0)">'+item.nameCn+'</a></li>';
				});
				$("#firstLevelArea").html(html);
			}
		}
	});
}

/**
 * 协议统计
 */
function findAgreementTransferTotal(){
	$.axs("/betaStock/agreementTransfer/findAgreementTransferTotal.do",null,false,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			var agreementTransfer=jQuery.parseJSON(result);
			if(result!=null){
				$("#showDateTime1").html(agreementTransfer[0].agreementTransferTime);
				$("#showDateTime2").html(agreementTransfer[0].agreementTransferTime);
				$("#total").html(agreementTransfer[0].agreementTransferTotal);
				$("#volume").html(((agreementTransfer[0].tradingCount)/10000.00).toFixed(2));
				$("#amount").html(((agreementTransfer[0].tradingAmount)/10000.00).toFixed(2));
			}
		}else{
			errorAlert(data.retCode,data.retMsg)
		}
	});
}

function findAgreementTransferByTodayChangeParam(){
	var securityCompanyName="";
	var securityCompanyName=$("#securityCompanyName").val().replace(/(^\s*)|(\s*$)/g, "");
	if(securityCompanyName!=null && securityCompanyName!="" && securityCompanyName!="undefined"){
		securityCompanyName=$("#securityCompanyName").val().replace(/(^\s*)|(\s*$)/g, "");
		$("#securityCompanyName").val("");
	}
	var stockName="";
	var stockCode="";
	var stockCodeParam=$.trim($("#stockName").val());
	if(stockCodeParam!=null && stockCodeParam!="" && stockCodeParam!="undefined"){
		if(stockCodeParam.indexOf("(")>-1 && stockCodeParam.indexOf(")")>-1){
			stockCode=stockCodeParam.substring(stockCodeParam.indexOf("(")+1,stockCodeParam.indexOf(")"));
			stockName=stockCodeParam.substring(0,stockCodeParam.indexOf("("));
		}else if(!isNaN(stockCodeParam)){
			stockCode=stockCodeParam;
		}else{
			stockName=stockCodeParam;
		}
	}
	findAgreementTransferByToday(securityCompanyName,stockCode,stockName,1,6);
}
/**
 * 今日协议交易
 */
function findAgreementTransferByToday(securityCompanyName,stockCode,stockName,pageNum,pageSize){
	var paramData={broker:securityCompanyName,stockCode:stockCode,stockName:stockName,pageNum:pageNum,pageSize:pageSize}
	$.axs("/betaStock/agreementTransfer/findAgreementDeal.do",paramData,true,function(data){
		if(data.retCode=="0000"){
			var pageObj=data.retData;
//			console.log(pageObj);
			if(pageObj==null){
				var html=getNoDataHtml(7);
				$("#agreementTransferByToday").html(html);
				return false;
			}
			var pageNumResult=pageObj.pageIndex;
			var pageSizeResult=pageObj.pageLimit;
			var totalCountResult=pageObj.totalCount;
			$("#agreementTransferByTodayTotal").html(totalCountResult);
			var result=pageObj.list;
			if(result!=null && result.length>0){
				var html='';
				$("#showDateTime3").html(result[0].agreementtimeT);
				for(var i=0;i<result.length;i++){
					var makeMarketInfo=result[i];
					html+='<tr>';
					html+='<td><a target="_blank" href="/businessDetails/newTBindex.html?stockName='+makeMarketInfo.stockName+'&stockCode='+makeMarketInfo.stockCode+'">'+makeMarketInfo.stockName+'('+makeMarketInfo.stockCode+')</a></td>';
					html+='<td class="shuzi">'+makeMarketInfo.agreementtime+'</td>';
					html+='<td class="shuzi">'+(makeMarketInfo.tradingprice).toFixed(2)+'</td>';
					html+='<td class="shuzi">'+(makeMarketInfo.sharesnumber).toFixed(2)+'</td>';
					html+='<td class="shuzi">'+(makeMarketInfo.tradingamount).toFixed(2)+'</td>';
					html+='<td>'+makeMarketInfo.buyerbroker+'</td>';
					html+='<td>'+makeMarketInfo.sellerbroker+'</td>';
					html+='</tr> ';
				}
				$("#agreementTransferByToday").html(html);
				//分页
				if(pageNum==1){
					$('#page_1').pagination({
						total: totalCountResult,
						pageSize: pageSize,
						current:pageNum,
						layout: ['first', 'prev', 'links','next'],
						links:0,
						displayMsg:"",
						showPageList:false,
						onSelectPage: function(pageNumber, size) {
							$("#agreementTransferByToday").attr("data-pageNum",pageNumber);
							$("#agreementTransferByToday").attr("data-pageSizee",size);
							findAgreementTransferByToday(securityCompanyName,stockCode,stockName,pageNumber,size)
						}
					});
				}
				$('#page_1').show();
				//修改分页文字
				setPageText2('page_1');
			}else{
				var html=getNoDataHtml(7);
				$("#agreementTransferByToday").html(html);
			}
		}else{
			errorAlert(data.retCode,data.retMsg)
		}
	});
}
/**
 * 全部协议数据
 */
function findAgreementTransferChangeParam(){
	var stockCodeParam=$("#stockCodeParam").val().replace(/(^\s*)|(\s*$)/g, "");
	var stockName = "";
	var stockCode = "";
	if(stockCodeParam!=null && stockCodeParam!="" && stockCodeParam!="undefined"){
		if(stockCodeParam.indexOf("(")>-1 && stockCodeParam.indexOf(")")>-1){
			stockCode=stockCodeParam.substring(stockCodeParam.indexOf("(")+1,stockCodeParam.indexOf(")"));
			stockName=stockCodeParam.substring(0,stockCodeParam.indexOf("("));
		}else if(!isNaN(stockCodeParam)){
			stockCode=stockCodeParam;
		}else{
			stockName=stockCodeParam;
		}
	}
	var tradeName="";
	var tradeValue=$("#secondLevelTrade").prev().attr("value");
	if(tradeValue!=null && tradeValue!="" && tradeValue!="undefined" && tradeValue!=0){
		tradeName=$("#secondLevelTrade").prev().attr("value");
	}
	var areaName="";
	var areaValue=$("#firstLevelArea").prev().attr("value");
	if(areaValue!=null && areaValue!="" && areaValue!="undefined" && areaValue!=0){
		areaName=$("#firstLevelArea").prev().text();
	}
	findAgreementTransfer(tradeName,areaName,stockCode,stockName,1,10);
}
//加载数据
function findAgreementTransfer(tradeName,areaName,stcokCode,stcokName,pageNum,pageSize){
	var paramData={trade:tradeName,area:areaName,stockCode:stcokCode,stcokName:stcokName,pageNum:pageNum,pageSize:pageSize};
	$.axs("/betaStock/agreementTransfer/findAgreementTransfer.do",paramData,true,function(data){
		if(data.retCode=="0000"){
			var pageObj=data.retData;
			if(pageObj==null){
				var html=getNoDataHtml(8);
				$("#makeMarket").html(html);
				return false;
			}
//			console.log(pageObj);
			var pageNumResult=pageObj.pageIndex;
			$("#makeMarket").attr("data-pageNum",pageNumResult);
			var pageSizeResult=pageObj.pageLimit;
			$("#makeMarket").attr("data-pageSizee",pageSizeResult);
			var totalCountResult=pageObj.totalCount;
			$("#makeMarketTotal").html(totalCountResult);
			var result=pageObj.list;
			if(result!=null && result.length>0){
				var html='';
				for(var i=0;i<result.length;i++){
					var makeMarketInfo=result[i];
					html+='<tr>';
					html+='<td><a target="_blank" href="/businessDetails/newTBindex.html?stockName='+makeMarketInfo.stockName+'&stockCode='+makeMarketInfo.stockCode+'">'+makeMarketInfo.stockName+'('+makeMarketInfo.stockCode+')</a></td>';
					html+='<td>'+makeMarketInfo.tradeName+'</td>';
					html+='<td>'+makeMarketInfo.state+'</td>';
					if(makeMarketInfo.priceChange<0){
						html+='<td class="shuzi lvse">'+(makeMarketInfo.newPrice).toFixed(2)+'</td>';
						html+='<td class="shuzi lvse">'+(makeMarketInfo.priceChange).toFixed(2)+' </td>';
						html+='<td class="shuzi lvse">'+(makeMarketInfo.priceChangeRatio).toFixed(2)+'%</td>';
					}else{
						html+='<td class="shuzi red">'+(makeMarketInfo.newPrice).toFixed(2)+'</td>';
						html+='<td class="shuzi red">'+(makeMarketInfo.priceChange).toFixed(2)+' </td>';
						html+='<td class="shuzi red">'+(makeMarketInfo.priceChangeRatio == null ? "--" : (makeMarketInfo.priceChangeRatio).toFixed(2))+'%</td>';
					}
					html+='<td class="shuzi">'+((makeMarketInfo.amount)/10000).toFixed(2)+'</td>';
					html+='<td class="shuzi">'+((makeMarketInfo.priceAmount)/10000).toFixed(2)+'</td>';
					html+='</tr>';
				}
				$("#makeMarket").html(html);
				//分页
				if(pageNum==1){
					$('#page').pagination({
						total: totalCountResult,
						pageSize: pageSize,
						current:pageNum,
						layout: ['first', 'prev', 'links','next'],
						links:0,
						displayMsg:"",
						showPageList:false,
						onSelectPage: function(pageNumber, size) {
							$("#makeMarket").attr("data-pageNum",pageNumber);
							$("#makeMarket").attr("data-pageSizee",size);
							findAgreementTransfer(tradeName,areaName,stcokCode,stcokName,pageNumber,size);
						}
					});
				}
				$('#page').show();
				//修改分页文字
				setPageText2('page');
			}else{
				$('#page').hide();
				var html=getNoDataHtml(8);
				$("#makeMarket").html(html);
			}
		}else{
			errorAlert(data.retCode,data.retMsg)
		}
	});
}

/**
 * 协议成交搜索补全(只返回股票代码)
 * @param request
 * @param response
 */
function findAgreementCodeName(request, response) {
	$.axs("/betaStock/agreementTransfer/findAgreementCodeName.do", {codeName: request.term}, false, function(data){
		if(data.retCode == 0000) {
			if(data.retData == null) {
				return false;
			}
			var arr = [];
			$.each(data.retData, function(i, item) {
				var obj = {
					label: item.companyForShort + "(" + item.stockCode + ")",
					value: item.stockCode,
					name: item.companyForShort,
					code: item.stockCode
				}
				arr.push(obj);
			});
			searchList = arr;
			response(arr);
		} else {
			errorAlert(data.retCode, data.retMsg);
		}
	});
}