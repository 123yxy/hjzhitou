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
	$.axs("/betaStock/qutation/findMarketList.do",param,true,function(data){
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
				//console.log(list)
				for(var i =0;i<list.length;i++){
					var temp=list[i];
					html+='<tr>';
					html+='<td><a target="_blank" href="/businessDetails/newTBindex.html?stockName='+temp.stockName+'&stockCode='+temp.stockCode+'">'+temp.stockName+'('+temp.stockCode+')</a></td>';
					if(temp.priceChangeRatio>=0){
						if((temp.newPrice=="" && temp.newPrice!=0)||temp.newPrice==null||temp.newPrice==undefined){
							html+='<td class="shuzi">--</td>';
						}else{
							html+='<td class="shuzi red">'+(temp.newPrice).toFixed(2)+'</td>';
						}
						if((temp.priceChangeRatio=="" && temp.priceChangeRatio!=0)||temp.priceChangeRatio==null||temp.priceChangeRatio==undefined){
							html+='<td class="shuzi">--</td>';
						}else{
							html+='<td class="shuzi red">'+(temp.priceChangeRatio).toFixed(2)+'%</td>';
						}
					}else{
						if((temp.newPrice=="" && temp.newPrice!=0)||temp.newPrice==null||temp.newPrice==undefined){
							html+='<td class="shuzi">--</td>';
						}else{
							html+='<td class="shuzi lvse">'+(temp.newPrice).toFixed(2)+'</td>';
						}
						if((temp.priceChangeRatio=="" && temp.priceChangeRatio!=0)||temp.priceChangeRatio==null||temp.priceChangeRatio==undefined){
							html+='<td class="shuzi">--</td>';
						}else{
							html+='<td class="shuzi lvse">'+(temp.priceChangeRatio).toFixed(2)+'%</td>';
						}
					}
					
					if((temp.marketValue=="" && temp.marketValue!=0)||temp.marketValue==null||temp.marketValue==undefined){
						html+='<td class="shuzi">--</td>';
					}else{
						html+='<td class="shuzi">'+(temp.marketValue/100000000).toFixed(2)+'</td>';
					}
					if((temp.priceEarningRatio=="" && temp.priceEarningRatio!=0)||temp.priceEarningRatio==null||temp.priceEarningRatio==undefined){
						html+='<td class="shuzi">--</td>';
					}else{
						html+='<td class="shuzi">'+(temp.priceEarningRatio).toFixed(2)+'</td>';
					}
					if((temp.sellingRate=="" && temp.sellingRate!=0)||temp.sellingRate==null||temp.sellingRate==undefined){
						html+='<td class="shuzi">--</td>';
					}else{
						html+='<td class="shuzi">'+(temp.sellingRate).toFixed(2)+'</td>';
					}
					if((temp.income=="" && temp.income!=0)||temp.income==null||temp.income==undefined){
						html+='<td class="shuzi">--</td>';
					}else{
						html+='<td class="shuzi">'+(temp.income/1000000).toFixed(2)+'</td>';
					}
					if((temp.profit=="" && temp.profit!=0)||temp.profit==null||temp.profit==undefined){
						html+='<td class="shuzi">--</td>';
					}else{
						html+='<td class="shuzi">'+(temp.profit/1000000).toFixed(2)+'</td>';
					}
					html+='</tr>';
				}
				$("#marketList").html(html);
				//分页
				if(pageNum==1){
					$('#page1').pagination({
						total: totalCountResult,
						pageSize: pageSize,
						current: pageNum,
						layout: ['first', 'prev', 'links','next'],
						links:0,
						displayMsg:"",
						showPageList:false,
						onSelectPage: function(pageNumber, size) {
							$("#marketList").attr("data-pageNum",pageNumber);
							$("#marketList").attr("data-pageSize",size);
							findMarketList(type,text);
						}
					});
				}
				$('#page1').show();
				//修改分页文字
				setPageText2('page1');
			}else{
				$('#page1').hide();
				var html=getNoDataHtml(8);
				$("#marketList").html(html);
			}
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
	
}