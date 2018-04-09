//模拟用户ID入缓存
var userId = localStorage.getItem("userId");
var contrasts = localStorage.getItem(userId);
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
				$.zmAlert("该股票已经添加");
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
			console.log(item);
		}
	});
	//信息补全结束
	
	
});


//查询我的自选股
function findList(){
	$.axs("/stock/optionalkMap/findList.do",null,true,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result!=null && result.length>0){
				var html = '';
				for(var i =0;i<result.length;i++){
					var temp=result[i];
					var duibi = "加入对比";
					if(contrasts.indexOf(temp.stockCode)>-1 && contrasts.indexOf(temp.stockNode)>-1){
						duibi="删除对比";
					}
//					if(contrasts != null){
//						$(contrastT).each(function(){
//							var val = this.split("-");
//							if(val[0] == temp.stockCode){
//								
//							}
//						})
//					}
					html+='<tr>';
					html+='<td><a target="_blank" href="/businessDetails/newTBindex.html?stockName='+temp.stockName+'&stockCode='+temp.stockCode+'">'+temp.stockName+'('+temp.stockCode+')</a></td>';
					if(temp.newPrice==null||temp.newPrice==""||temp.newPrice==undefined){
						html+='<td class="shuzi">--</td>';
					}else{
						html+='<td class="shuzi">'+temp.tradingAmount+'</td>';
					}
					if(temp.tradingAmount==null||temp.tradingAmount==""||temp.tradingAmount==undefined){
						html+='<td class="shuzi">--</td>';
					}else{
						html+='<td class="shuzi">'+temp.tradingAmount+'</td>';
					}
					if(temp.priceEarningRatio==null||temp.priceEarningRatio==""||temp.priceEarningRatio==undefined){
						html+='<td class="shuzi">--</td>';
					}else{
						html+='<td class="shuzi">'+temp.priceEarningRatio+'</td>';
					}
					if(temp.industryName==null||temp.industryName==""||temp.industryName==undefined){
						html+='<td>--</td>';
					}else{
						html+='<td>'+temp.industryName+'</td>';
					}
					if(temp.generalCapital==null||temp.generalCapital==""||temp.generalCapital==undefined){
						html+='<td class="shuzi">--</td>'; 		
					}else{
						html+='<td class="shuzi">'+temp.generalCapital+'</td>'; 		
					}
					if(temp.totalMarketValue==null||temp.totalMarketValue==""||temp.totalMarketValue==undefined){
						html+='<td class="shuzi">--</td>';
					}else{
						html+='<td class="shuzi">'+temp.totalMarketValue+'</td>';
					}
					if(temp.circulationCapital==null||temp.circulationCapital==""||temp.circulationCapital==undefined){
						html+='<td class="shuzi">--</td>';
					}else{
						html+='<td class="shuzi">'+temp.circulationCapital+'</td>';
					}
					if(temp.marketCapitalization==null||temp.marketCapitalization==""||temp.marketCapitalization==undefined){
						html+='<td class="shuzi">--</td>';
					}else{
						html+='<td class="shuzi">'+temp.marketCapitalization+'</td>';
					}
					if(temp.dealType==null||temp.dealType==""||temp.dealType==undefined){
						html+='<td class="shuzi">--</td>';
					}else{
						html+='<td class="shuzi">'+temp.dealType+'</td>';
					}
					html+='<td class="pre_caozuo_btn"><em>···</em>';
					html+='<div class="pre_caozuo">';
					html+='<ul>';
					html+='<li><a href="javascript:;">分享</a></li>';
					html+='<li><a href="javascript:;" id='+temp.stockCode+' onclick="addComparisonStockClass(\''+temp.stockCode+'\',\''+temp.stockName+'\')" data-name='+temp.stockName+' data-code='+temp.stockCode+'>'+duibi+'</a></li>';
					html+='<li><a href="javascript:;" onclick="deleteOptional('+temp.id+','+temp.stockCode+')">删除</a></li>';
					html+='</ul>';
					html+='</div>';
					html+='</td>';
					html+='</tr>'; 
				}
				$("#optionalStock").html(html);	
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
	if($(".news_boar_pk").hasClass("on")){
		removeComparisonStock(comparisonStockCode,comparisonStockName);
		$(".news_boar_pk").removeClass("on");
	}else{
		if(addComparisonStock(comparisonStockCode,comparisonStockName)){
			$(".news_boar_pk").addClass("on");
		}
	}
}