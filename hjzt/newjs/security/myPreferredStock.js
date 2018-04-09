//模拟用户ID入缓存
//var userId = localStorage.getItem("userId");
var contrasts = findContrastCompany();
var contrastT = null;
if(contrasts!=null){
	contrastT = contrasts.split(",");
}

$(document).ready(function(){
	//查询我的自选股
	findList();
	$(".mPstock_table").delegate("em","click",function(){
		$(this).siblings(".pre_caozuo").show();
		$(".jiabeijing").show();
	});
	$(".jiabeijing").on("click",function(){
		$(this).hide();
		$(".pre_caozuo").hide();
	});
	
	//添加自选股
	$("#addOptional").on("click",function(){
		var stocke = $("#searchStock").val().replace(/(^\s*)|(\s*$)/g,"");
		if(isNaN(stocke)||stocke==""){
			$("#searchStock").val("");
			$.zmAlert("请输入正确的股票代码");
		}else{
			var isHave = isTrue(stocke);
			$("#searchStock").val("");
			if(isHave){
				$.zmAlert("该股票已经添加或不存在");
			}else{
				addOptional(stocke,1);
			}
		}
	})
	
	
	//信息补全开始
	//首页顶部搜索
	$("#searchStock").autocomplete({
		minLength: 2,
		source: function(request, response) {
			findByCodeName(request, response);
		},
		delay: 500,
		select: function(event, ui) {
			var item = ui.item;
//			console.log(item);
		}
	});
	//回车事件
	$("#searchStock").keydown(function(e) {
		if(e.keyCode==13){
			//回车事件
			if($("#searchStock").val() != "") {
				var val = $.trim($("#searchStock").val());
				if(searchList.length != 0) {
					$.each(searchList, function(index, flag) {
						if(val.indexOf(flag.code) > -1  || val.indexOf(flag.name) > -1) {
							$("#searchStock").val(flag.code);
							$("#addOptional").click();
//							window.location.href = '/businessDetails/newTBindex.html?stockCode=' + flag.code + "&stockName=" + flag.name;
							//window.location.href = '/businessDetails/newTBindex.html?stockCode=430043&stockName=景睿策划'
						}
					});
				}else{
					$.zmAlert("请输入正确的检索信息");
				}
			} else {
				$.zmAlert("请输入要检索的信息");
			}
			$("#ui-id-2").hide();
		}
	});
	//信息补全结束
});


//查询我的自选股
function findList(){
	$.axs("/betaStock/optionalkMap/findList.do",null,true,function(data){
		//console.log(data);
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result!=null && result.length>0){
				var html = '';
				for(var i =0;i<result.length;i++){
					var temp=result[i];
					var txFlag = ((temp.isReportOpen == 1 || temp.isReportOpen == 0) || (temp.isShareOpen == 1 || temp.isShareOpen == 0) ? "block" : "none"); //提醒
//					console.log(temp.isReportOpen)
					var ggtxFlag = ((temp.isReportOpen == 1 || temp.isReportOpen == 0) ? "block" : "none"); //公告提醒
					var gjtxFlag = ((temp.isShareOpen == 1 || temp.isShareOpen == 0) ? "block" : "none"); //股价提醒
//					var duibi = "加入对比";
//					var userId=localStorage.getItem("userId");
					var showName=findContrastCompany();
//					if(showName!=null && showName!="" && showName!=undefined &&showName.indexOf(temp.stockCode)>-1 && showName.indexOf(temp.stockName)>-1){
//						duibi="删除对比";
//					}
					html+='<tr>';
					html+='<td class="bbs_gupname">';
					html+='<i class="tixing_lingd" style="display: '+txFlag+';"></i>';
					html+='<a target="_blank" href="/businessDetails/newTBindex.html?stockName='+temp.stockName+'&stockCode='+temp.stockCode+'">'+temp.stockName+'('+temp.stockCode+')</a>';
					html+='<div class="tixing" style="display: none;">';
 					html+='<h2 style="display: '+ggtxFlag+';">已设置公告提醒</h2>';
 					html+='<div class="gujia_tx" style="display: '+gjtxFlag+';">';
 					html+='<span>已设置股价提醒</span>';
 					html+='<ul>';
 					html+='<li>';
 					html+='<em>目标买入价：</em><b>'+(temp.buyPrice == null ? "--" : temp.buyPrice)+'元</b>';
 					html+='</li>';
 					html+='<li>';
 					html+='<em>目标卖出价：</em><b>'+(temp.salePrice == null ? "--" : temp.salePrice)+'元</b>';
 					html+='</li>';
 					html+='<li>';
 					html+='<em>备注：</em><b>'+(temp.content == null ? "--" : temp.content)+'</b>';
 					html+='</li>';
 					html+='</ul>';
 					html+='</div>';
 					html+='</div>';
					html+='</td>';
					if(temp.newPrice==null||temp.newPrice==""||temp.newPrice==undefined){
						html+='<td class="shuzi">--</td>';
					}else{
						html+='<td class="shuzi">'+(temp.newPrice).toFixed(2)+'</td>';
					}
					if(temp.tradingAmount==null||temp.tradingAmount==""||temp.tradingAmount==undefined){
						html+='<td class="shuzi">--</td>';
					}else{
						html+='<td class="shuzi">'+(temp.tradingAmount/10000).toFixed(2)+'</td>';
					}
					if(temp.priceEarningRatio==null||temp.priceEarningRatio==""||temp.priceEarningRatio==undefined){
						html+='<td class="shuzi">--</td>';
					}else{
						html+='<td class="shuzi">'+(temp.priceEarningRatio).toFixed(2)+'</td>';
					}
					if(temp.priceChangeRatio==null||(temp.priceChangeRatio=="" && temp.priceChangeRatio!=0)||temp.priceChangeRatio==undefined){
						html+='<td>--</td>';
					}else{
						if(temp.priceChangeRatio==0){
							html+='<td>'+(temp.priceChangeRatio)+'</td>';	
						}else{
							html+='<td>'+(temp.priceChangeRatio).toFixed(2)+'%</td>';
						}
						
					}
					if(temp.generalCapital==null||temp.generalCapital==""||temp.generalCapital==undefined){
						html+='<td class="shuzi">--</td>'; 		
					}else{
						html+='<td class="shuzi">'+(temp.generalCapital/100000000).toFixed(2)+'</td>'; 		
					}
					if(temp.totalMarketValue==null||temp.totalMarketValue==""||temp.totalMarketValue==undefined){
						html+='<td class="shuzi">--</td>';
					}else{
						html+='<td class="shuzi">'+(temp.totalMarketValue/100000000).toFixed(2)+'</td>';
					}
					if(temp.circulationCapital==null||temp.circulationCapital==""||temp.circulationCapital==undefined){
						html+='<td class="shuzi">--</td>';
					}else{
						html+='<td class="shuzi">'+(temp.circulationCapital/100000000).toFixed(2)+'</td>';
					}
					if(temp.marketCapitalization==null||temp.marketCapitalization==""||temp.marketCapitalization==undefined){
						html+='<td class="shuzi">--</td>';
					}else{
						html+='<td class="shuzi">'+(temp.marketCapitalization/100000000).toFixed(2)+'</td>';
					}
					if(temp.dealType==null||temp.dealType==""||temp.dealType==undefined){
						html+='<td class="shuzi">--</td>';
					}else{
						html+='<td class="shuzi">'+temp.dealType+'</td>';
					}
					html+='<td class="pre_caozuo_btn">';
//					console.log(showName);
					if(showName!=null && showName!="" && showName!=undefined &&showName.indexOf(temp.stockCode)>-1 && showName.indexOf(temp.stockName)>-1){
					html+='<b class="on" id='+temp.stockCode+' onclick="addComparisonStockClass(\''+temp.stockCode+'\',\''+temp.stockName+'\')" data-name='+temp.stockName+' data-code='+temp.stockCode+'></b>';
					}else{
					html+='<b class="" id='+temp.stockCode+' onclick="addComparisonStockClass(\''+temp.stockCode+'\',\''+temp.stockName+'\')" data-name='+temp.stockName+' data-code='+temp.stockCode+'></b>';
					}

					html+='<span onclick="deleteOptional('+temp.id+','+temp.stockCode+')"></span>';
//					html+='<td class="pre_caozuo_btn"><em>···</em>';
//					html+='<div class="pre_caozuo">';
//					html+='<ul>';
//					html+='<li><a href="javascript:;" class="zxu_jiaru_duibi" id='+temp.stockCode+' onclick="addComparisonStockClass(\''+temp.stockCode+'\',\''+temp.stockName+'\')" data-name='+temp.stockName+' data-code='+temp.stockCode+'>'+duibi+'</a></li>';
//					html+='<li><a href="javascript:;" onclick="deleteOptional('+temp.id+','+temp.stockCode+')">删除</a></li>';
//					html+='</ul>';
//					html+='</div>';
					html+='</td>';
					html+='</tr>'; 
				}
				$("#optionalStock").html(html);
				//鼠标经过小铃铛显示弹窗
				$("#optionalStock .tixing_lingd").on("mousemove",function(){
					$(this).next().next().show();
				})
				$("#optionalStock .tixing_lingd").on("mouseout",function(){
					$(this).next().next().hide();
				})
				
				
			}else{
				var html=getNoDataHtml(11);
				$("#optionalStock").html(html);	
			}
			
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

/**
 * 添加或删除对比
 * @param comparisonStockCode
 * @param comparisonStockName
 */
function addComparisonStockClass(comparisonStockCode,comparisonStockName){
	if($("#"+comparisonStockCode).hasClass("on")){
		removeComparisonStock(comparisonStockCode,comparisonStockName);
		$("#"+comparisonStockCode).removeClass("on");
	}else{
		
		if(addComparisonStock(comparisonStockCode,comparisonStockName)){
	$("#"+comparisonStockCode).addClass("on")
		}
	}
}