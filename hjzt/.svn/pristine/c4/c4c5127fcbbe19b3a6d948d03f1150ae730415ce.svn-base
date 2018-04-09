$(function(){

$("#informationList li").on("mouseenter",function(){
	$(this).find("div").addClass("on");
	$(this).siblings().find("div").removeClass("on");
})
	
//挂牌tab切换	
$("#transacteList a").on("click",function(){
	var type = $(this).attr("data-value");
	var text = this.text;
	$(this).addClass("on").siblings().removeClass("on");
	findMarketList(type,text)
})
//交易
findMarketList(1,'新股挂牌')
})

function findMarketList(type,text){
	var pageNum=$("#marketList").attr("data-pageNum");
	if(pageNum==null || pageNum=="" || pageNum=="undefined"){
		pageNum=1;
	}
	var pageSize=$("#marketList").attr("data-pageSize");
	if(pageSize==null || pageSize=="" || pageSize=="undefined"){
		pageSize=10;
	}
	var param = {listType:type,pageIndex:pageNum,pageLimit:pageSize};
	$.axs("/stock/qutation/findMarketList.do",param,true,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			var pageNumResult=result.pageIndex;
			var pageSizeResult=result.pageLimit;
			var totalCountResult=result.totalCount;
			$("#listCount").html(''+text+' <span>'+totalCountResult+'</span>只');
			if(result==null){
				return false;
			}
			var list = result.list;
			if(list!=null && list.length>0){
				var html = '';
				$("#todayList").text(list[0].listingTime)
				for(var i =0;i<list.length;i++){
					var temp=list[i];
					html+='<tr>';
					html+='<td><a target="_blank" href="/businessDetails/newTBindex.html?stockName='+temp.stockName+'&stockCode='+temp.stockCode+'">'+temp.stockName+'('+temp.stockCode+')</a></td>';
					if(temp.priceChangeRatio>0){
						if(temp.newPrice==""||temp.newPrice==null||temp.newPrice==undefined){
							html+='<td class="shuzi">--</td>';
						}else{
							html+='<td class="shuzi red">'+temp.newPrice+'</td>';
						}
						if(temp.priceChangeRatio==""||temp.priceChangeRatio==null||temp.priceChangeRatio==undefined){
							html+='<td class="shuzi">--</td>';
						}else{
							html+='<td class="shuzi red">'+temp.priceChangeRatio+'%</td>';
						}
					}else{
						if(temp.newPrice==""||temp.newPrice==null||temp.newPrice==undefined){
							html+='<td class="shuzi">--</td>';
						}else{
							html+='<td class="shuzi lvse">'+temp.newPrice+'</td>';
						}
						if(temp.priceChangeRatio==""||temp.priceChangeRatio==null||temp.priceChangeRatio==undefined){
							html+='<td class="shuzi">--</td>';
						}else{
							html+='<td class="shuzi lvse">'+temp.priceChangeRatio+'%</td>';
						}
					}
					
					if(temp.marketValue==""||temp.marketValue==null||temp.marketValue==undefined){
						html+='<td class="shuzi">--</td>';
					}else{
						html+='<td class="shuzi">'+temp.marketValue+'</td>';
					}
					if(temp.priceEarningRatio==""||temp.priceEarningRatio==null||temp.priceEarningRatio==undefined){
						html+='<td class="shuzi">--</td>';
					}else{
						html+='<td class="shuzi">'+temp.priceEarningRatio+'</td>';
					}
					if(temp.sellingRate==""||temp.sellingRate==null||temp.sellingRate==undefined){
						html+='<td class="shuzi">--</td>';
					}else{
						html+='<td class="shuzi">'+temp.sellingRate+'</td>';
					}
					if(temp.income==""||temp.income==null||temp.income==undefined){
						html+='<td class="shuzi">--</td>';
					}else{
						html+='<td class="shuzi">'+temp.income+'</td>';
					}
					if(temp.profit==""||temp.profit==null||temp.profit==undefined){
						html+='<td class="shuzi">--</td>';
					}else{
						html+='<td class="shuzi">'+temp.profit+'</td>';
					}
					html+='</tr>';
				}
				$("#marketList").html(html);
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
						$("#marketList").attr("data-pageNum",pageNumber);
						$("#marketList").attr("data-pageSize",size);
						findMarketList(type);
					}
				});
				//修改分页文字
				setPageText2('page');
			}else{
				var html=getNoDataHtml(8);
				$("#marketList").html(html);
			}
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
	
}