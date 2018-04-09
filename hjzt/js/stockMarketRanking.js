/*
* @Author: Administrator
* @Date:   2016-11-27 21:52:09
* @Last Modified by:   Administrator
* @Last Modified time: 2016-11-27 22:00:28
*/

$(function(){

//做市 涨幅榜 初始化
fingMarketRanking('做市',0);

//做市涨幅榜分页 初始化
findMarketRankinList('做市',0);

//涨跌幅 升降序切换
$('#changeType a').on('click',function(){
	var type = $(this).attr("data-value");
	if(type==0){
		fingMarketRanking('做市',0);
		findMarketRankinList('做市',0);
		$(this).siblings().removeClass("on");
		$(this).addClass("on");
		//
		$("#page_1").hide();
		$("#page").show();
		$("#upList").show();
		$("#dealList").hide();
	}else if(type==1){
		fingMarketRanking('做市',1);
		findMarketRankinList('做市',1);
		$(this).siblings().removeClass("on");
		$(this).addClass("on");
		//
		$("#page_1").hide();
		$("#page").show();
		$("#upList").show();
		$("#dealList").hide();
	}else{
		fingMarketRanking('做市',2);
		findMarketRankinList('做市',2);
		$(this).siblings().removeClass("on");
		$(this).addClass("on");
		//
		$("#page_1").show();
		$("#page").hide();
		$("#upList").hide();
		$("#dealList").show();
	}
});

$("#informationList li").on("mouseenter",function(){
	$(this).find("div").addClass("on");
	$(this).siblings().find("div").removeClass("on");
})

})


//做市排行
function fingMarketRanking(dealType,type){
	var param = {dealType:dealType,type:type};
	$.axs("/stock/qutation/fingMarketRanking.do",param,true,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			if(result==null){
				return false;
			}
			//柱形图
			if(type==0){
				var typeName = "涨幅";
				fieldRankChart(result.dataName,result.dataNum,typeName);
			}
			if(type==1){
				var typeName = "跌幅";
				fieldRankChart(result.dataName,result.dataNum,typeName);		
			}
			if(type==2){
				var typeName = "成交额";
				fieldRankChart(result.dataName,result.dataNum,typeName);
			}
			
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}

//做市分页
function findMarketRankinList(dealType,type){
	if(type==2){
		var pageNum=$("#todayList").attr("data-pageNum");
		if(pageNum==null || pageNum=="" || pageNum=="undefined"){
			pageNum=1;
		}
		var pageSize=$("#todayList").attr("data-pageSize");
		if(pageSize==null || pageSize=="" || pageSize=="undefined"){
			pageSize=50;
		}
	}else{
		var pageNum=$("#marketRankinList").attr("data-pageNum");
		if(pageNum==null || pageNum=="" || pageNum=="undefined"){
			pageNum=1;
		}
		var pageSize=$("#marketRankinList").attr("data-pageSize");
		if(pageSize==null || pageSize=="" || pageSize=="undefined"){
			pageSize=50;
		}
	}
	var paramData={dealType:dealType,type:type,pageIndex:pageNum,pageLimit:pageSize};
	$.axs("/stock/qutation/findMarketRankinList.do",paramData,true,function(data){
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
					//排行
					if(type==2){
						html+='<tr>';
						html+='<td class="shuzi"><a target="_blank" href="/businessDetails/newTBindex.html?stockName='+temp.stockName+'&stockCode='+temp.stockCode+'">'+temp.stockName+'('+temp.stockCode+')</a></td>';
						if(temp.priceChangeRatio>0){
							html+='<td class="shuzi red">'+temp.newPrice+'</td>';	
							html+='<td class="shuzi red">'+(temp.priceChangeRatio).toFixed(2)+'%</td>';
						}else{
							html+='<td class="shuzi lvse">'+temp.newPrice+'</td>';
							html+='<td class="shuzi lvse">'+(temp.priceChangeRatio).toFixed(2)+'%</td>';
						}
						html+='<td class="shuzi">'+temp.tradingAmount+'</td>';
						html+='</tr>';
					}else{
						html+='<tr>';
						html+='<td class="shuzi"><a target="_blank" href="/businessDetails/newTBindex.html?stockName='+temp.stockName+'&stockCode='+temp.stockCode+'">'+temp.stockName+'('+temp.stockCode+')</a></td>';
						html+='<td class="shuzi">'+temp.newPrice+'</td>';
						if(temp.priceChangeRatio>0){
							html+='<td class="shuzi red">'+(temp.changeAmount).toFixed(2)+'</td>';	
							html+='<td class="shuzi red">'+(temp.priceChangeRatio).toFixed(2)+'%</td>';
						}else{
							html+='<td class="shuzi lvse">'+(temp.changeAmount).toFixed(2)+'</td>';	
							html+='<td class="shuzi lvse">'+(temp.priceChangeRatio).toFixed(2)+'%</td>';
						}
						html+='<td class="shuzi">'+temp.openPrice+'</td>';
						html+='<td class="shuzi">'+temp.highPrice+'</td>';
						html+='<td class="shuzi">'+temp.lowPrice+'</td>';
						html+='<td class="shuzi">'+temp.tradingVolume+'</td>';
						html+='<td class="shuzi">'+temp.tradingAmount+'</td>';
						html+='<td class="shuzi">'+temp.priceEarningRatio+'</td>';
						html+='</tr>';
					}
				}
				if(type==2){
					$("#paihang").html(html);
					$('#page_1').show();
					//分页
					$('#page_1').pagination({
						total: totalCountResult,
						pageSize: pageSize,
						current:pageNum,
						layout: ['first', 'prev', 'links','next'],
						links:0,
						displayMsg:"",
						showPageList:false,
						onSelectPage: function(pageNumber, size) {
							$("#paihang").attr("data-pageNum",pageNumber);
							$("#paihang").attr("data-pageSize",size);
							findMarketRankinList(dealType,type);
						}
					});
					//修改分页文字
					setPageText2('page_1');
				}else{
					$("#marketRankinList").html(html);
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
							$("#marketRankinList").attr("data-pageNum",pageNumber);
							$("#marketRankinList").attr("data-pageSize",size);
							findMarketRankinList(dealType,type);
						}
					});
					//修改分页文字
					setPageText2('page');
				}
			}else{
				if(type==2){
					var html=getNoDataHtml(4);
					$("#paihang").html(html);
				}else{
					var html=getNoDataHtml(10);
					$("#marketRankinList").html(html);
				}
			}
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}

//图表展示的配置
/**
 * @param xAixs  X轴-公司名称
 * @param name 
 * @param data  Y轴-公司对应的指标值
 * @param startValue 第一个显示的排名位置
 */
function fieldRankChart(stockName,data,name){
	var data=data;//[9000,9200,9108,9800,9600,9500];
	if(name=="跌幅"){
		datas=data;
	}else{
		var datas=data.sort(function(a,b){
			return b-a;
		});
	}
	 // 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('stockRank'));
    var option = {
//      title: {
//          text: "挂牌企业总数"
//      },
        dataZoom: [{
            type: "slider",
            show: true
//          startValue: startValue - 2,
//          endValue: startValue + 2 + 8
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
//          data:xAixs,
            data:  stockName//[2016-01,2016-02,2016-03,2016-04,2016-05,2016-06]
        }],
        tooltip:{
        	enterable:true,//鼠标可以进入提示信息里面
        	show:true,
        	trigger:'item',
			position:'top',	
      	    formatter: function(params) {
      	    		if(name=="成交额"){
      	    			var divHtml='<div class="multi_tip">'+
						'<p>'+stockName[params.dataIndex]+'<span>'+name+':'+data[params.dataIndex]+'万元</span></p>'+
						'<div class="tip_tips"></div>'+
						'</div>';
      	    			return divHtml;
      	    		}else{
      	    			var divHtml='<div class="multi_tip">'+
						'<p>'+stockName[params.dataIndex]+'<span>'+name+':'+data[params.dataIndex].toFixed(2)+'%</span></p>'+
						'<div class="tip_tips"></div>'+
						'</div>';
      	    			return divHtml;
      	    		}
	            }
        },
        series: [{
            name: "",
            type: 'bar',
            data:datas,
            label: {
                normal: {
                    show: true,
                    position: "top",
                    formatter: function(params) {
                        return "第"+(params.dataIndex +1)+"名";
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: function(params) {
                    	  // 检索结果颜色
//                      if(params.dataIndex == itemIndex) {
//                          return "#00C1EF";
//                      } else {
//                          return "#D53A35";
//                      }
                      	return "#6ac8f9";
                    }
                },
                emphasis:{
                	color:"#37a4dc"//鼠标放到柱形图上显示的颜色
                }
            }
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

