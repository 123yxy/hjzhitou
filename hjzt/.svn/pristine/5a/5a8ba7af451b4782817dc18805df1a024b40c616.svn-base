$(function(){

//指数查询
fingOverViewIndex("899002");
//指数市场概况分页
findMarketOverview();
//tab切换
$("#exponential a").on("click",function(){
	var type=$(this).attr("data-value");
	if(type=="899002"){
		fingOverViewIndex("899002");
	}
	if(type=="899001"){
		fingOverViewIndex("899001");
	}
	$(this).addClass("on").siblings().removeClass("on");
})

$("#informationList li").on("mouseenter",function(){
	$(this).find("div").addClass("on");
	$(this).siblings().find("div").removeClass("on");
})

})

//指数查询
function fingOverViewIndex(stockCode){
	$.axs("/stock/qutation/fingOverViewIndex.do",{stockCode:stockCode},true,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			if(result==null){
				return false;
			}
			var keyZS = result.keyZS;
			var keyCF = result.keyCF;
			if(keyZS!=null&&keyZS!=""&&keyZS!=undefined){
				//指数图表
				if(stockCode=="899002"){
					var keyZS = jQuery.parseJSON(keyZS);
					fieldRankChart(keyZS.data,keyZS.openPrice,keyZS.tradingVolume)
				}
			}
			if(keyCF!=null&&keyCF!=""&&keyCF!=undefined){
				if(stockCode=="899001"){
					var keyCF = jQuery.parseJSON(keyCF);
					fieldRankChart(keyCF.data,keyCF.openPrice,keyCF.tradingVolume)
				}
			}
			var index = result.index;
			if(index!=null&&index!=""&&index!=undefined){
				$("#zs_zz").html((index.newPrice).toFixed(2));
				$("#kp_zz").html((index.openPrice).toFixed(2));
				$("#zg_zz").html((index.highPrice).toFixed(2));
				$("#zd_zz").html((index.lowPrice).toFixed(2));
				if(index.changeAmount>0){
					$("#zde_zz").removeClass("green").addClass("red");
				}else if(index.changeAmount<0){
					$("#zde_zz").removeClass("red").addClass("green");
				}else{
					$("#zde_zz").removeClass("red").removeClass("green");
				}
				$("#zde_zz").html((index.changeAmount)+"%");
				if(index.priceChangeRatio>0){
					$("#zdf_zz").removeClass("green").addClass("red");
				}else if(index.priceChangeRatio<0){
					$("#zdf_zz").removeClass("red").addClass("green");
				}else{
					$("#zdf_zz").removeClass("red").removeClass("green");
				}
				$("#zdf_zz").html((index.priceChangeRatio)+"%");
				$("#zjl_zz").html(Math.round(index.tradingAmount/1000000));
				$("#zje_zz").html((index.tradingVolume/1000000).toFixed(2));
				
			/*	
				html+='<li>';
				html+='<p>'+index.newPrice+'</p>';
				html+='<p>最新</p>';
				html+='</li>';
				html+='<li>';
				html+='<p>'+index.openPrice+'</p>';
				html+='<p>开盘</p>';
				html+='</li>';
				html+='<li>';
				html+='<p>'+index.highPrice+'</p>';
				html+='<p>最高</p>';
				html+='</li>';
				html+='<li>';
				html+='<p>'+index.lowPrice+'</p>';
				html+='<p>最低</p>';
				html+='</li>';
				html+='<li>';
				if(index.changeAmount>0){
					html+='<p class="red">'+index.changeAmount+'</p>';
				}else{
					html+='<p>'+index.changeAmount+'</p>';
				}
				html+='<p>涨跌额</p>';
				html+='</li>';
				html+='<li>';
				if(index.priceChangeRatio>0){
					html+='<p class="red">'+index.priceChangeRatio+'%</p>';
				}else{
					html+='<p>'+index.priceChangeRatio+'%</p>';
				}
				html+='<p>涨跌幅</p>';
				html+='</li>';
				html+='<li title="成交量(百万股)">';
				html+='<p>'+index.tradingAmount+'</p>';
				html+='<p>成交量</p>';
				html+='</li>';
				html+='<li title="成交额(百万元)">';
				html+='<p>'+index.tradingVolume+'</p>';
				html+='<p>成交额</p>';
				html+='</li>';*/
			}
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}

//指数市场概况分页
function findMarketOverview(){
	var pageNum=$("#marketOverview").attr("data-pageNum");
	if(pageNum==null || pageNum=="" || pageNum=="undefined"){
		pageNum=1;
	}
	var pageSize=$("#marketOverview").attr("data-pageSize");
	if(pageSize==null || pageSize=="" || pageSize=="undefined"){
		pageSize=50;
	}
	var param = {pageIndex:pageNum,pageLimit:pageSize};
	$.axs("/stock/qutation/findMarketOverview.do",param,true,function(data){
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
					html+='<td><a target="_blank" href="/businessDetails/newTBindex.html?stockName='+temp.stockName+'&stockCode='+temp.stockCode+'">'+temp.stockName+'('+temp.stockCode+')</a></td>';
					if(temp.newPrice==null){
						html+='<td class="shuzi">--</td>';
					}else{
						html+='<td class="shuzi">'+temp.newPrice+'</td>';
					}
					if(temp.priceChangeRatio>0){
						html+='<td class="shuzi red">'+temp.priceChangeRatio+'%</td>';
					}else{
						html+='<td class="shuzi lvse">'+temp.priceChangeRatio+'%</td>';
					}
					if(temp.marketValue==null){
						html+='<td class="shuzi">--</td>';
					}else{
						html+='<td class="shuzi">'+temp.marketValue+'</td>';
					}
					if(temp.priceEarningRatio==null){
						html+='<td class="shuzi">--</td>';
					}else{
						html+='<td class="shuzi">'+temp.priceEarningRatio+'</td>';
					}
					if(temp.sellingRate==null){
						html+='<td class="shuzi">--</td>';
					}else{
						html+='<td class="shuzi">'+temp.sellingRate+'</td>';
					}
					if(temp.income==null){
						html+='<td class="shuzi">--</td>';
					}else{
						html+='<td class="shuzi">'+temp.income+'</td>';
					}
					if(temp.profit==null){
						html+='<td class="shuzi">--</td>';
					}else{
						html+='<td class="shuzi">'+temp.profit+'</td>';
					}
					html+='</tr>';
				}
				$("#marketOverview").html(html);
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
						$("#marketOverview").attr("data-pageNum",pageNumber);
						$("#marketOverview").attr("data-pageSize",size);
						findMarketOverview();
					}
				});
				//修改分页文字
				setPageText2('page');
			}else{
				var html=getNoDataHtml(8);
				$("#marketOverview").html(html);
			}
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}

/**
 * 
 * @param data日期
 * @param openPrice 指数
 * @param tradingVolume 成交量
 */
function fieldRankChart(date,openPrice,tradingVolume){
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('boardChart'));
	var	option = {
		tooltip: {
		    trigger: 'axis'
		    },
		    color:['#90b4e6','#5581bf'],
		    legend: {
		        data:['成交额(百万)','指数'],
		        bottom:10
		    },
		    xAxis: [
		        {
		        type: 'category',
		        data:date//['9:00','9:05','9:10','9:15','9:20','9:30','9:35','9:40','9:45','9:50','9:55','10:00']
		    }
		],
		yAxis: [
		    {
		        type: 'value',
		        name: '成交额(百万)',
		        axisLabel: {
		            formatter: '{value}百万'
		        }
		    },
		    {
		        type: 'value',
		        name: '指数',
		        min:'dataMin',
		        max:'dataMax',
		        axisLabel: {
		            formatter: '{value}'
		        }
		    }
		],
		grid: {
	        left: '1%',
	        right: '1%',
	        containLabel: true
	    },
		series: [
		    {
		        name:'成交额(百万)',
		        type:'bar',
		        data:tradingVolume//[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
		    },
		    {
		        name:'指数',
		        type:'line',
		            yAxisIndex: 1,
		            data:openPrice//[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
		        }
		    ]
		};
 // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.onresize = myChart.resize;
}
