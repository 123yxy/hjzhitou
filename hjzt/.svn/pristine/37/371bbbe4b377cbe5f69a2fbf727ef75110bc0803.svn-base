$(function(){
	//三板做市统计
	findMakeMarketTB();
	//获取全部行业
	findSecondLevelTrade();
	//获取全部区域
	findFirstLevelArea();
	//头部信息实时更新
	//marketMakingWebsocket();
	//统计数量
	findMakeMarketCount();
	//新增做市数据
	findMakeMarketAdd();
	//退出做市数据
	findMakeMarketExit();
	//全部做市数据
	findMakeMarket();
	
	/*********信息补全开始***********/
	$("#stockCodeParam").keydown(function(e) {
		if(e.keyCode==13){
			$("#stockCodeParam").click();
			$("#ui-id-2").hide();
		}
	});
	
	//首页顶部搜索
	$("#stockCodeParam").autocomplete({
		minLength: 2,
		source: function(request, response) {
			findByCodeName(request, response,2);
		},
		delay: 500,
		select: function(event, ui) {
			var item = ui.item;
		}
	});
	/*********信息补全结束***********/
	
	$(".selectBox ul li").click(function(){
		var p = $(this).parent().parent().find("p");
		$(".selectBox ul").hide();
		$(".searching").hide();
		$(".jiabeijing").hide();
		p.text(($(this).find("a").text()).indexOf("...") > -1 ? $(this).find("a").attr("title") : $(this).find("a").text());
		p.attr("data-value", $(this).attr("data-value"));
		p.attr("value", $(this).attr("value"));
	})
	
	$(".zuoshi_colse").click(function(){
		$(".zuoshi_tcb").hide();
		$(".backbj").hide();
		$("body,html").css("overflow","auto");
	})
	
});

/**
 * 查询所有二级行业
 */
function findSecondLevelTrade(){
	$.axs("/betaStock/btCategory/findBtCategory.do",null,false,function(data){
		if(data.retCode==0000){
			if(data.retData!=null && data.retData.length!=0){
				var secondLevelTrade=data.retData;
				var html='';
				html+='<li value="0"><a href="javascript:void(0)">全部</a></li>';
				$.each(secondLevelTrade,function(index,item){
					html+='<li value="'+item.categoryId+'"><a href="javascript:void(0)" title='+item.categoryName+' >'+(item.categoryName.length > 13 ? item.categoryName.substring(0,13)+"..." : item.categoryName)+'</a></li>';
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
 * 今日做市数量统计
 */
function findMakeMarketCount(){
	$.axs("/betaStock/makeMarket/findMakeMarketCount.do",null,false,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			if(result!=null){
				$("#showDateTime1").html(result.marketTime);
				$("#showDateTime2").html(result.marketTime);
				$("#total").html(result.marketTotal);
				$("#add").html(result.marketAdd);
				$("#exit").html(result.marketExit);
			}
		}else{
			errorAlert(data.retCode,data.retMsg)
		}
	});
}

/**
 * 三板做市统计
 */
function findMakeMarketTB(){
	$.axs("/betaStock/makeMarket/findMakeMarketTB.do",null,false,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			if(result!=null){
				var html ='';
				if(result.priceChangeRatio>=0){
					html += '<span class="red">'+(result.newPrice).toFixed(2)+'</span><p><em class="red">'+result.changeAmount+'</em><i class="red">'+result.priceChangeRatio+'%</i></p>';
				}else{
					html += '<span class="lvse">'+(result.newPrice).toFixed(2)+'</span><p><em class="lvse">'+result.changeAmount+'</em><i class="lvse">'+result.priceChangeRatio+'%</i></p>';
				}
				$("#exponentHeader").html(html);
				var newOpen=(result.openPrice).toFixed(2);
				$("#openHeader").html(newOpen);				
				$("#highHeader").removeClass().addClass("red");
				var higher=(result.highPrice).toFixed(2);
				$("#highHeader").html(higher);
				$("#lowHeader").removeClass().addClass("lvse");
				var lower=(result.lowPrice).toFixed(2)
				$("#lowHeader").html(lower);
				$("#amountHeader").html((result.tradingVolume/10000).toFixed(2));
				$("#moneyAmountHeader").html((result.tradingAmount/10000).toFixed(2));
				if(!result.priceEarningRatio){
					$("#peRatioHeader").html("--");
				}else{
					$("#peRatioHeader").html(result.priceEarningRatio);
				}
			}
		}else{
			errorAlert(data.retCode,data.retMsg)
		}
	});
}

/**
 * 新增做市商信息
 */
function findMakeMarketAdd(){
	var pageNum=$("#makeMarketAdd").attr("data-pageNum");
	if(pageNum==null || pageNum=="" || pageNum=="undefined"){
		pageNum=1;
	}
	var pageSize=$("#makeMarketAdd").attr("data-pageSizee");
	if(pageSize==null || pageSize=="" || pageSize=="undefined"){
		pageSize=6;
	}
	$.axs("/betaStock/makeMarket/findMakeMarketAdd.do",{pageNum:pageNum,pageSize:pageSize},true,function(data){
		if(data.retCode=="0000"){
			var pageObj=data.retData;
			var pageNumResult=pageObj.pageIndex;
			$("#makeMarketAdd").attr("data-pageNum",pageNumResult);
			var pageSizeResult=pageObj.pageLimit;
			$("#makeMarketAdd").attr("data-pageSizee",pageSizeResult);
			var totalCountResult=pageObj.totalCount;
			$("#makeMarketAddTotal").html(totalCountResult);
			$("#makeMarketAddPrePage").attr("disabled",true);
//			$("#total").html(result.marketTotal);
//			$("#add").html(totalCountResult);
//			$("#exit").html(result.marketExit);
			if(totalCountResult==0){
				$("#makeMarketAddHome").attr("disabled",true);
				$("#makeMarketAddNextPage").attr("disabled",true);
			}else{
				var pageCount=0
				if(totalCountResult%pageSizeResult==0){
					pageCount=totalCountResult/pageSizeResult;
				}else{
					pageCount=Math.floor(totalCountResult/pageSizeResult)+1;
				}
				$("#makeMarketAdd").attr("data-pageCount",pageCount);
			}
			var result=pageObj.list;
			if(result!=null && result.length>0){
				$("#showDateTime3").html(result[0].dateTime);
				var html='';
				for(var i=0;i<result.length;i++){
					var makeMarketInfo=result[i];
					html+='<tr>';
					html+='<td><a target="_blank" href="/businessDetails/newTBindex.html?stockName='+makeMarketInfo.stockName+'&stockCode='+makeMarketInfo.stockCode+'">'+makeMarketInfo.stockName+'('+makeMarketInfo.stockCode+')</a></td>';
					if(makeMarketInfo.priceChangeRatio<0){
						html+='<td class="lvse">'+((makeMarketInfo.newPrice == null)?"--":(makeMarketInfo.newPrice).toFixed(2))+'</td>';
						html+='<td class="lvse">'+((makeMarketInfo.priceChangeRatio == null)?"--":(makeMarketInfo.priceChangeRatio).toFixed(2))+'%</td>';
					}else{
						html+='<td class="red">'+((makeMarketInfo.newPrice == null)?"--":(makeMarketInfo.newPrice).toFixed(2))+'</td>';
						html+='<td class="red">'+((makeMarketInfo.priceChangeRatio == null)?"--":(makeMarketInfo.priceChangeRatio).toFixed(2))+'%</td>';
					}
					html+='<td class="shuzi">'+((makeMarketInfo.marketValue == null)?"--":(makeMarketInfo.marketValue/100000000).toFixed(2))+'</td>';
					html+='<td class="shuzi">'+((makeMarketInfo.peRatio == null)?"--":(makeMarketInfo.peRatio).toFixed(2))+'</td>';
					html+='<td class="shuzi">'+((makeMarketInfo.salesRatio == null)?"--":(makeMarketInfo.salesRatio).toFixed(2))+'</td>';
					html+='<td class="shuzi">'+((makeMarketInfo.income == null)?"--":(makeMarketInfo.income/1000000).toFixed(2))+'</td>';
					html+='<td class="shuzi">'+((makeMarketInfo.profit == null)?"--":(makeMarketInfo.profit/1000000).toFixed(2))+'</td>';
					html+='</tr> ';
				}
				$("#makeMarketAdd").html(html);
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
							$("#makeMarketAdd").attr("data-pageNum",pageNumber);
							$("#makeMarketAdd").attr("data-pageSizee",size);
							findMakeMarketAdd();
						}
					});
				}
				$('#page_1').show();
				//修改分页文字
				setPageText2('page_1');
			}else{
				var html=getNoDataHtml(8);
				$("#makeMarketAdd").html(html);
			}
		}else{
			errorAlert(data.retCode,data.retMsg)
		}
	});
}
/**
 * 退出做市商信息
 */
function findMakeMarketExit(){
	var pageNum=$("#makeMarketExit").attr("data-pageNum");
	if(pageNum==null || pageNum=="" || pageNum=="undefined"){
		pageNum=1;
	}
	var pageSize=$("#makeMarketExit").attr("data-pageSizee");
	if(pageSize==null || pageSize=="" || pageSize=="undefined"){
		pageSize=6;
	}
	$.axs("/betaStock/makeMarket/findMakeMarketExit.do",{pageNum:pageNum,pageSize:pageSize},true,function(data){
		if(data.retCode=="0000"){
			var pageObj=data.retData;
			var pageNumResult=pageObj.pageIndex;
			$("#makeMarketExit").attr("data-pageNum",pageNumResult);
			var pageSizeResult=pageObj.pageLimit;
			$("#makeMarketExit").attr("data-pageSizee",pageSizeResult);
			var totalCountResult=pageObj.totalCount;
			$("#makeMarketExitTotal").html(totalCountResult);
			$("#makeMarketExitPrePage").attr("disabled",true);
			if(totalCountResult==0){
				$("#makeMarketExitHome").attr("disabled",true);
				$("#makeMarketExitNextPage").attr("disabled",true);
			}else{
				var pageCount=0
				if(totalCountResult%pageSizeResult==0){
					pageCount=totalCountResult/pageSizeResult;
				}else{
					pageCount=Math.floor(totalCountResult/pageSizeResult)+1;
				}
				$("#makeMarketExit").attr("data-pageCount",pageCount);
			}
//			$("#total").html(result.marketTotal);
//			$("#add").html(result.length);
//			$("#exit").html(totalCountResult);
			var result=pageObj.list;
			if(result!=null && result.length>0){
				$("#showDateTime4").html(result[0].dateTime);
				var html='';
				for(var i=0;i<result.length;i++){
					var makeMarketInfo=result[i];
					html+='<tr>';
					html+='<td><a target="_blank" href="/businessDetails/newTBindex.html?stockName='+makeMarketInfo.stockName+'&stockCode='+makeMarketInfo.stockCode+'">'+makeMarketInfo.stockName+'('+makeMarketInfo.stockCode+')</a></td>';
					/*if(makeMarketInfo.priceChangeRatio<0){
						html+='<td class="lvse">'+(makeMarketInfo.newPrice).toFixed(2)+'</td>';
						html+='<td class="lvse">'+(makeMarketInfo.priceChangeRatio).toFixed(2)+'%</td>';
					}else{
						html+='<td class="red">'+(makeMarketInfo.newPrice).toFixed(2)+'</td>';
						html+='<td class="red">'+(makeMarketInfo.priceChangeRatio).toFixed(2)+'%</td>';
					}*/
					if(makeMarketInfo.priceChangeRatio>=0){
						if((makeMarketInfo.newPrice=="" && makeMarketInfo.newPrice!=0)||makeMarketInfo.newPrice==null||makeMarketInfo.newPrice==undefined){
							html+='<td class="shuzi">--</td>';
						}else{
							html+='<td class="shuzi red">'+(makeMarketInfo.newPrice).toFixed(2)+'</td>';
						}
						if((makeMarketInfo.priceChangeRatio=="" && makeMarketInfo.priceChangeRatio!=0)||makeMarketInfo.priceChangeRatio==null||makeMarketInfo.priceChangeRatio==undefined){
							html+='<td class="shuzi">--</td>';
						}else{
							html+='<td class="shuzi red">'+(makeMarketInfo.priceChangeRatio).toFixed(2)+'%</td>';
						}
					}else{
						if((makeMarketInfo.newPrice=="" && makeMarketInfo.newPrice!=0)||makeMarketInfo.newPrice==null||makeMarketInfo.newPrice==undefined){
							html+='<td class="shuzi">--</td>';
						}else{
							html+='<td class="shuzi lvse">'+(makeMarketInfo.newPrice).toFixed(2)+'</td>';
						}
						if((makeMarketInfo.priceChangeRatio=="" && makeMarketInfo.priceChangeRatio!=0)||makeMarketInfo.priceChangeRatio==null||makeMarketInfo.priceChangeRatio==undefined){
							html+='<td class="shuzi">--</td>';
						}else{
							html+='<td class="shuzi lvse">'+(makeMarketInfo.priceChangeRatio).toFixed(2)+'%</td>';
						}
					}
					html+='<td class="shuzi">'+(makeMarketInfo.marketValue==null?"--":(makeMarketInfo.marketValue/100000000).toFixed(2))+'</td>';
					html+='<td class="shuzi">'+(makeMarketInfo.peRatio).toFixed(2)+'</td>';
					html+='<td class="shuzi">'+(makeMarketInfo.salesRatio).toFixed(2)+'</td>';
					html+='<td class="shuzi">'+(makeMarketInfo.income==null?"--":(makeMarketInfo.income/1000000).toFixed(2))+'</td>';
					html+='<td class="shuzi">'+(makeMarketInfo.profit==null?"--":(makeMarketInfo.profit/1000000).toFixed(2))+'</td>';
					html+='</tr> ';
				}
				$("#makeMarketExit").html(html);
				//分页
				if(pageNum==1){
					$('#page_2').pagination({
						total: totalCountResult,
						pageSize: pageSize,
						current:pageNum,
						layout: ['first', 'prev', 'links','next'],
						links:0,
						displayMsg:"",
						showPageList:false,
						onSelectPage: function(pageNumber, size) {
							$("#makeMarketExit").attr("data-pageNum",pageNumber);
							$("#makeMarketExit").attr("data-pageSizee",size);
							findMakeMarketExit();
						}
					});
				}
				$('#page_2').show();
				//修改分页文字
				setPageText2('page_2');
			}else{
				var html=getNoDataHtml(8);
				$("#makeMarketExit").html(html);
			}
		}else{
			errorAlert(data.retCode,data.retMsg)
		}
	});
}

/**
 * 全部做市商信息
 */
function findMakeMarket(){
	var stockCodeParam=$("#stockCodeParam").val().replace(/(^\s*)|(\s*$)/g, "");
	var stcokName = "";
	var stcokCode = "";
	if(!isNaN(stockCodeParam)){
		stcokCode=stockCodeParam;
	}else{
		stcokName=stockCodeParam;
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
	loadData(tradeName,areaName,stcokCode,stcokName,1,10);
}

function loadData(tradeName,areaName,stcokCode,stcokName,pageNum,pageSize){
	var paramData={trade:tradeName,area:areaName,stockCode:stcokCode,stcokName:stcokName,pageNum:pageNum,pageSize:pageSize};
	$.axs("/betaStock/makeMarket/findMakeMarket.do",paramData,true,function(data){
		if(data.retCode=="0000"){
			var pageObj=data.retData;
			var pageNumResult=pageObj.pageIndex;
			var pageSizeResult=pageObj.pageLimit;
			var totalCountResult=pageObj.totalCount;
//			$("#total").html(totalCountResult);
//			$("#add").html(result.length);
//			$("#exit").html(result.length);
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
						html+='<td class="shuzi red">'+(makeMarketInfo.priceChangeRatio).toFixed(2)+'%</td>';
					}
					html+='<td class="shuzi">'+(makeMarketInfo.amount/10000).toFixed(2)+'</td>';
					html+='<td class="shuzi">'+(makeMarketInfo.priceAmount/10000).toFixed(2)+'</td>';
					html+='<td class="chakan"><a href="javascript:;" onclick="showMaketMaker(this,'+makeMarketInfo.stockCode+')">查看</a></td>';
					html+='</tr>';
				}
				$("#makeMarket").html(html);
				//分页
				if(pageNum==1){
					$('#page_3').pagination({
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
							loadData(tradeName,areaName,stcokCode,stcokName,pageNumber,size);
						}
					});
				}
				$('#page_3').show();
				//修改分页文字
				setPageText2('page_3');
			}else{
				$('#page_3').hide();
				var html=getNoDataHtml(9);
				$("#makeMarket").html(html);
			}
		}else{
			errorAlert(data.retCode,data.retMsg)
		}
	});
}

/**
 * 显示做市商
 */
function showMaketMaker(thiz,stockCode){
	$("#tcTitle").text($(thiz).parent().parent().children().first().text() + "-做市商");
	$(".zuoshi_tcb").show();
	$(".backbj").show();
	$.axs("/betaInvest/marketMaker/findMarketMakerByCode.do",{stockCode:stockCode},true,function(data){
		if(data.retCode=="0000"){
			$("#tcTitle")
			if(data.retData != null && data.retData != ""){
				var mmHtml = "";
				$(data.retData).each(function(){
					mmHtml += "<tr>"
								+"<td>"+(this.marketMaker == null ? "--" : this.marketMaker)+"</td>"
								+"<td class='shuzi'>"+(this.treasuryStock == null ? "--" : (this.treasuryStock).toFixed(2))+"</td>"
								+"<td class='shuzi'>"+(this.stockCost == null ? "--" : (this.stockCost).toFixed(2))+"</td>"
								+"<td class='shuzi'>"+(this.newPrice == null ? "--" : (this.newPrice).toFixed(2))+"</td>"
								+"<td class='shuzi'>"+(this.marketReturn == null ? "--" : ((this.marketReturn).toFixed(2)+"%"))+"</td>"
								+"<td class='shuzi'>"+(this.marketDate == null ? "--" : this.marketDate)+"</td>"
								+"</tr>";
				})
				$("#mmTbody").html(mmHtml);
			}else{
				$("#mmTbody").html("<tr><td colspan='6' >暂无数据</td></tr>");
			}
		}else{
			errorAlert(data.retCode,data.retMsg)
		}
	});
	$("body,html").css("overflow","hidden");
}
