//初始化数据
$(function(){
	findTodaylist();
	$("#informationList li").on("mouseenter",function(){
	$(this).find("div").addClass("on");
	$(this).siblings().find("div").removeClass("on");
})
	
})
//今日挂牌股
function findTodaylist(){
	var pageNum=$("#todayList").attr("data-pageNum");
	if(pageNum==null || pageNum=="" || pageNum=="undefined"){
		pageNum=1;
	}
	var pageSize=$("#todayList").attr("data-pageSize");
	if(pageSize==null || pageSize=="" || pageSize=="undefined"){
		pageSize=10;
	}
	var param = {pageIndex:pageNum,pageLimit:pageSize};
	$.axs("/stock/qutation/findTodaylist.do",param,true,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			var pageNumResult=result.pageIndex;
			var pageSizeResult=result.pageLimit;
			var totalCountResult=result.totalCount;
			if(result==null){
				return false;
			}
			var list = result.list;
			if(list!=null && list.length>0){
				var html = '';
				for(var i =0;i<list.length;i++){
					var temp=list[i];
					html+='<tr>';
					html+='<td class="shuzi"><a target="_blank" href="/businessDetails/newTBindex.html?stockName='+temp.stockName+'&stockCode='+temp.stockCode+'">'+temp.stockName+'('+temp.stockCode+')</a></td>';
					html+='<td class="shuzi">'+temp.newPrice+'</td>';
					if(judgeSign(temp.priceChangeRatio)=="正数"){
						html+='<td class="shuzi red">'+temp.changeAmount+'</td>';
						html+='<td class="shuzi red">'+temp.priceChangeRatio+'%</td>';			
					}else{
						html+='<td class="shuzi lvse">'+temp.changeAmount+'</td>';
						html+='<td class="shuzi lvse">'+temp.priceChangeRatio+'%</td>';	
					}
					html+='<td class="shuzi">'+temp.openPrice+'</td>';
					html+='<td class="shuzi">'+temp.highPrice+'</td>';
					html+='<td class="shuzi">'+temp.lowPrice+'</td>';
					html+='<td class="shuzi">'+temp.tradingVolume+'</td>';
					html+='<td class="shuzi">'+temp.tradingAmount+'</td>';
					html+='<td class="shuzi">'+temp.priceEarningRatio+'</td>';
					html+='</tr>';
				}
				$("#todayList").html(html);
				$('#page').show();
				//分页
				$('#page').pagination({
					total: totalCountResult,
					pageSize: pageSize,
					current:pageNum,
					layout: ['first', 'prev', 'links','next'],
					links:0,
					displayMsg:"",
					showPageList:false,
					onSelectPage: function(pageNumber, size) {
						$("#todayList").attr("data-pageNum",pageNumber);
						$("#todayList").attr("data-pageSize",size);
						findMarketRankinList(dealType,type);
					}
				});
				//修改分页文字
				setPageText2('page');
			}else{
				var html=getNoDataHtml(10);
				$("#todayList").html(html);
			}
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}
