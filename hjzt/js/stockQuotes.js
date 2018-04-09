$(function(){

//每日市场概览
fingTodayOvCount();

//每日市场概览历史记录
fingTodayListChart(0,"挂脾家数");

//每日市场概览历史记录分页
fingTodayListHistory();

$('#indicatorName li').on('click',function(){
	var type = $(this).children().attr("data-value");
	var text = $(this).children().text();
	fingTodayListChart(type,text)
});
$("#informationList li").on("mouseenter",function(){
	$(this).find("div").addClass("on");
	$(this).siblings().find("div").removeClass("on");
})



})

//每日市场概览
function fingTodayOvCount(){
	$.axs("/stock/marketOverView/fingTodayOvCount.do",null,true,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			if(result==null){
				return false;
			}
			$('#listDate').text(result.listingTime);
			var html = '';
			html+='<tr>';
			html+='<td>挂牌公司家数</td>';
			html+='<td>'+(result.marketMaker==null?0:result.marketMaker)+'</td>';
			html+='<td>'+(result.agreementNum==null?0:result.agreementNum)+'</td>';
			html+='<td>'+((result.marketMaker==null?0:result.marketMaker)+(result.agreementNum==null?0:result.agreementNum))+'</td>';
			html+='</tr>';
			html+='<tr>';
			html+='<td>当前新增家数</td>';
			html+='<td>'+(result.newMarketMaker==null?0:result.newMarketMaker)+'</td>';
			html+='<td>'+(result.newAgreementNum==null?0:result.newAgreementNum)+'</td>';
			html+='<td>'+((result.newMarketMaker==null?0:result.newMarketMaker)+(result.newAgreementNum==null?0:result.newAgreementNum))+'</td>';
			html+='</tr>';
			html+='<tr>';
			html+='<td>总股本(亿股)</td>';
			html+='<td>'+((result.generalCapitalZS==null?0:result.generalCapitalZS)/100000000.00).toFixed(2)+'</td>';
			html+='<td>'+((result.generalCapitalXY==null?0:result.generalCapitalXY)/100000000.00).toFixed(2)+'</td>';
			html+='<td>'+(((result.generalCapitalZS==null?0:result.generalCapitalZS)+(result.generalCapitalXY==null?0:result.generalCapitalXY))/100000000.00).toFixed(2)+'</td>';
			html+='</tr>';
			html+='<tr>';
			html+='<td>流通股本(亿股)</td>';
			html+='<td>'+((result.circulateCapitalZS==null?0:result.circulateCapitalZS)/100000000.00).toFixed(2)+'</td>';
			html+='<td>'+((result.circulateCapitalXY==null?0:result.circulateCapitalXY)/100000000.00).toFixed(2)+'</td>';
			html+='<td>'+(((result.circulateCapitalZS==null?0:result.circulateCapitalZS)+(result.circulateCapitalXY==null?0:result.circulateCapitalXY))/100000000.00).toFixed(2)+'</td>';
			html+='</tr>';
			html+='<tr>';
			html+='<td>成交股票只数</td>';
			html+='<td>'+(result.tradedStocksZS==null?0:result.tradedStocksZS)+'</td>';
			html+='<td>'+(result.tradedStocksXY==null?0:result.tradedStocksXY)+'</td>';
			html+='<td>'+((result.tradedStocksZS==null?0:result.tradedStocksZS)+(result.tradedStocksXY==null?0:result.tradedStocksXY))+'</td>';
			html+='</tr>';
			html+='<tr>';
			html+='<td>成交金额(万元)</td>';
			html+='<td>'+((result.tradingAmountZS==null?0:result.tradingAmountZS)/10000.00).toFixed(2)+'</td>';
			html+='<td>'+((result.tradingAmountXY==null?0:result.tradingAmountXY)/10000.00).toFixed(2)+'</td>';
			html+='<td>'+(((result.tradingAmountZS==null?0:result.tradingAmountZS)+(result.tradingAmountXY==null?0:result.tradingAmountXY))/10000.00).toFixed(2)+'</td>';
			html+='	</tr>';
			html+='<tr>';
			html+='<td>成交数量(万股)</td>';
			html+='<td>'+((result.tradingVolumeZS==null?0:result.tradingVolumeZS)/10000.00).toFixed(2)+'</td>';
			html+='<td>'+((result.tradingVolumeXY==null?0:result.tradingVolumeXY)/10000.00).toFixed(2)+'</td>';
			html+='<td>'+(((result.tradingVolumeZS==null?0:result.tradingVolumeZS)+(result.tradingVolumeXY==null?0:result.tradingVolumeXY))/10000.00).toFixed(2)+'</td>';
			html+='</tr>';
		$("#todayCount").html(html);
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
	
}

//每日市场概览历史记录图表
function fingTodayListChart(type,name){
	$.axs("/stock/marketOverView/fingTodayListChart.do",{type:type},true,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			if(result==null){
				return false;
			}
			fieldRankChart(result.date,result.num,name);
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}

//每日市场概览历史记录
function fingTodayListHistory(){
	var pageNum=$("#todayListHistory").attr("data-pageNum");
	if(pageNum==null || pageNum=="" || pageNum=="undefined"){
		pageNum=1;
	}
	var pageSize=$("#todayListHistory").attr("data-pageSize");
	if(pageSize==null || pageSize=="" || pageSize=="undefined"){
		pageSize=50;
	}
	var param = {pageNum:pageNum,pageLimit:pageSize};
	$.axs("/stock/marketOverView/fingTodayListHistory.do",param,true,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
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
					html+='<td>'+temp.listingTime+'</td>';
					html+='<td>'+((temp.marketMaker==null?0:temp.marketMaker)+(temp.agreementNum==null?0:temp.agreementNum)).toFixed(2)+'</td>';
					html+='<td>'+((temp.newMarketMaker==null?0:temp.newMarketMaker)+(temp.newAgreementNum==null?0:temp.newAgreementNum)).toFixed(2)+'</td>';
					html+='<td>'+((temp.generalCapitalZS==null?0:temp.generalCapitalZS)+(temp.generalCapitalXY==null?0:temp.generalCapitalXY)).toFixed(2)+'</td>';
					html+='<td>'+((temp.circulateCapitalZS==null?0:temp.circulateCapitalZS)+(temp.circulateCapitalXY==null?0:temp.circulateCapitalXY)).toFixed(2)+'</td>';
					html+='<td>'+((temp.tradingVolumeZS==null?0:temp.tradingVolumeZS)+(temp.tradingVolumeXY==null?0:temp.tradingVolumeXY)).toFixed(2)+'</td>';							
					html+='<td>'+((temp.tradingAmountZS==null?0:temp.tradingAmountZS)+(temp.tradingAmountXY==null?0:temp.tradingAmountXY)).toFixed(2)+'</td>';
					html+='</tr>';
				}
				$("#todayListHistory").html(html);
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
						$("#todayListHistory").attr("data-pageNum",pageNumber);
						$("#todayListHistory").attr("data-pageSize",size);
						fingTodayListHistory();
					}
				});
				//修改分页文字
				setPageText2('page');
			}else{
				var html=getNoDataHtml(7);
				$("#todayListHistory").html(html);
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
function fieldRankChart(date,data,name){
	 // 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('histogram'));
    var option = {
        title: {
            text: name,//"挂牌企业总数"
            textStyle:{
            	fontWeight:"normal",
            	fontSize:16
            },
            textAlign:"left"
        },
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
            data: date//[2016-01,2016-02,2016-03,2016-04,2016-05,2016-06]
        }],
        tooltip:{
        	enterable:true,//鼠标可以进入提示信息里面
        	show:true,
        	trigger:'item',
			position:'top',	
      	    formatter: function(params) {
	      	    	var divHtml='<div class="multi_tip">'+
									'<p class="multi_tips">'+date[params.dataIndex]+name+'<span>'+data[params.dataIndex]+'</span></p>'+
									'<div class="tip_tips"></div>'+
								'</div>';
	                return divHtml;
	            }
        },
        series: [{
            name: "",
            type: 'bar',
            data: data,//[9000,9200,9108,9800,9600,9500],
//          label: {
//              normal: {
//                  show: true,
//                  position: "top",
//                  formatter: function(params) {
//                      return "第" + ranking[params.dataIndex] + "名";
//                  }
//              }
//          },
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
    window.onresize = myChart.resize;
}



