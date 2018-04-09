$(function(){

//每日市场概览
fingTodayOvCount();

//每日市场概览历史记录
fingTodayListChart(1,"每日新增");

//每日市场概览历史记录分页
fingTodayListHistory();

$('#indicatorName li').on('click',function(){
	var type = $(this).children().attr("data-value");
	var text = $(this).children().text();
	fingTodayListChart(type,text)
});

$(".selectBox ul li").click(function(){
	var p = $(this).parent().parent().find("p");
	$(".selectBox ul").hide();
	$(".searching").hide();
	$(".jiabeijing").hide();
	p.text(($(this).find("a").text()).indexOf("...") > -1 ? $(this).find("a").attr("title") : $(this).find("a").text());
	p.attr("data-value", $(this).attr("data-value"));
	p.attr("value", $(this).attr("value"));
})




})

//每日市场概览
function fingTodayOvCount(){
	$.axs("/betaStock/marketOverView/fingTodayOvCount.do",null,true,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			if(result==null){
				return false;
			}
			$('#listDate').text(result.listingTime);
			var html = '';
			html+='<tr>';
			html+='<td>挂牌公司家数</td>';
			html+='<td class="shuzi">'+(result.marketMaker==null?0:result.marketMaker)+'</td>';
			html+='<td class="shuzi">'+(result.agreementNum==null?0:result.agreementNum)+'</td>';
			html+='<td class="shuzi">'+((result.marketMaker==null?0:result.marketMaker)+(result.agreementNum==null?0:result.agreementNum))+'</td>';
			html+='</tr>';
			html+='<tr>';
			html+='<td>当前新增家数</td>';
			html+='<td class="shuzi">'+(result.newMarketMaker==null?0:result.newMarketMaker)+'</td>';
			html+='<td class="shuzi">'+(result.newAgreementNum==null?0:result.newAgreementNum)+'</td>';
			html+='<td class="shuzi">'+((result.newMarketMaker==null?0:result.newMarketMaker)+(result.newAgreementNum==null?0:result.newAgreementNum))+'</td>';
			html+='</tr>';
			html+='<tr>';
			html+='<td>总股本(亿股)</td>';
			html+='<td class="shuzi">'+((result.generalCapitalZS==null?0:result.generalCapitalZS)/100000000.00).toFixed(2)+'</td>';
			html+='<td class="shuzi">'+((result.generalCapitalXY==null?0:result.generalCapitalXY)/100000000.00).toFixed(2)+'</td>';
			html+='<td class="shuzi">'+(((result.generalCapitalZS==null?0:result.generalCapitalZS)+(result.generalCapitalXY==null?0:result.generalCapitalXY))/100000000.00).toFixed(2)+'</td>';
			html+='</tr>';
			html+='<tr>';
			html+='<td>流通股本(亿股)</td>';
			html+='<td class="shuzi">'+((result.circulateCapitalZS==null?0:result.circulateCapitalZS)/100000000.00).toFixed(2)+'</td>';
			html+='<td class="shuzi">'+((result.circulateCapitalXY==null?0:result.circulateCapitalXY)/100000000.00).toFixed(2)+'</td>';
			html+='<td class="shuzi">'+(((result.circulateCapitalZS==null?0:result.circulateCapitalZS)+(result.circulateCapitalXY==null?0:result.circulateCapitalXY))/100000000.00).toFixed(2)+'</td>';
			html+='</tr>';
			html+='<tr>';
			html+='<td>成交股票只数</td>';
			html+='<td class="shuzi">'+(result.tradedStocksZS==null?0:result.tradedStocksZS)+'</td>';
			html+='<td class="shuzi">'+(result.tradedStocksXY==null?0:result.tradedStocksXY)+'</td>';
			html+='<td class="shuzi">'+((result.tradedStocksZS==null?0:result.tradedStocksZS)+(result.tradedStocksXY==null?0:result.tradedStocksXY))+'</td>';
			html+='</tr>';
			html+='<tr>';
			html+='<td>成交金额(万元)</td>';
			html+='<td class="shuzi">'+((result.tradingAmountZS==null?0:result.tradingAmountZS)/10000.00).toFixed(2)+'</td>';
			html+='<td class="shuzi">'+((result.tradingAmountXY==null?0:result.tradingAmountXY)/10000.00).toFixed(2)+'</td>';
			html+='<td class="shuzi">'+(((result.tradingAmountZS==null?0:result.tradingAmountZS)+(result.tradingAmountXY==null?0:result.tradingAmountXY))/10000.00).toFixed(2)+'</td>';
			html+='	</tr>';
			html+='<tr>';
			html+='<td>成交数量(万股)</td>';
			html+='<td class="shuzi">'+((result.tradingVolumeZS==null?0:result.tradingVolumeZS)/10000.00).toFixed(2)+'</td>';
			html+='<td class="shuzi">'+((result.tradingVolumeXY==null?0:result.tradingVolumeXY)/10000.00).toFixed(2)+'</td>';
			html+='<td class="shuzi">'+(((result.tradingVolumeZS==null?0:result.tradingVolumeZS)+(result.tradingVolumeXY==null?0:result.tradingVolumeXY))/10000.00).toFixed(2)+'</td>';
			html+='</tr>';
		$("#todayCount").html(html);
//		$("#totalGp").html(((result.marketMaker==null?0:result.marketMaker)+(result.agreementNum==null?0:result.agreementNum)));
//		$("#czGs").html((((result.tradingVolumeZS==null?0:result.tradingVolumeZS)+(result.tradingVolumeXY==null?0:result.tradingVolumeXY))/1000000.00).toFixed(2));
//		$("#czJe").html((((result.tradingAmountZS==null?0:result.tradingAmountZS)+(result.tradingAmountXY==null?0:result.tradingAmountXY))/100000000.00).toFixed(2));
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
	
}

//每日市场概览历史记录图表
function fingTodayListChart(type,name){
	$.axs("/betaStock/marketOverView/fingTodayListChart.do",{type:type},true,function(data){
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
		pageSize=20;
	}
	$('#pages').hide();
	var param = {pageNum:pageNum,pageLimit:pageSize};
	$.axs("/betaStock/marketOverView/fingTodayListHistory.do",param,true,function(data){
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
					html+='<td class="shuzi">'+temp.listingTime+'</td>';
					html+='<td class="shuzi">'+((temp.marketMaker==null?0:temp.marketMaker)+(temp.agreementNum==null?0:temp.agreementNum))+'</td>';
					html+='<td class="shuzi">'+((temp.newMarketMaker==null?0:temp.newMarketMaker)+(temp.newAgreementNum==null?0:temp.newAgreementNum))+'</td>';
					html+='<td class="shuzi">'+(((temp.generalCapitalZS==null?0:temp.generalCapitalZS)+(temp.generalCapitalXY==null?0:temp.generalCapitalXY))/100000000.00).toFixed(2)+'</td>';
					html+='<td class="shuzi">'+(((temp.circulateCapitalZS==null?0:temp.circulateCapitalZS)+(temp.circulateCapitalXY==null?0:temp.circulateCapitalXY))/100000000.00).toFixed(2)+'</td>';
					html+='<td class="shuzi">'+(((temp.tradingVolumeZS==null?0:temp.tradingVolumeZS)+(temp.tradingVolumeXY==null?0:temp.tradingVolumeXY))/10000.00).toFixed(2)+'</td>';							
					html+='<td class="shuzi">'+(((temp.tradingAmountZS==null?0:temp.tradingAmountZS)+(temp.tradingAmountXY==null?0:temp.tradingAmountXY))/10000.00).toFixed(2)+'</td>';
					html+='</tr>';
				}
				$("#todayListHistory").html(html);
				
				//分页
				if(pageNum==1){
					$('#pages').pagination({
						total: totalCountResult,
						pageSize: pageSize,
						current:pageNum,
						//layout: ['first', 'prev', 'links','next'],
						links:0,
						displayMsg:"",
						showPageList:false,
						onSelectPage: function(pageNumber, size) {
							$("#todayListHistory").attr("data-pageNum",pageNumber);
							$("#todayListHistory").attr("data-pageSize",size);
							fingTodayListHistory();
						}
					});
				}
				$('#pages').show();
				//修改分页文字
				//setPageText2('page');
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
//      title: {
//          text: name,//"挂牌企业总数"
//          textStyle:{
//          	fontWeight:"normal",
//          	fontSize:16
//          },
//          left:"center"
//      },
		legend:{
        	show:true,
        	data:[name],
        	textStyle:{
            	fontWeight:"normal",
            	fontSize:14
            }
        },
        grid: {
	        left: '1%',
	        right: '1%',
	        containLabel: true
	    },
        toolbox: {
	        feature: {
	            saveAsImage: {
					title:'保存图片',
		            icon:'image:///saasBeta/images/ave.png'
				}
	        },
	        top:0,
	        right:'5%',
	    },
        dataZoom: [{
            type: "slider",
            show: true,
             start:10,
            end:90
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
        	trigger:'axis',
			position:'top',	
      	    formatter: function(params) {
      	    //7月3号王仙玲修改的柱状图的提示框类型start
      	    	//console.log(params)
      	    		var showvalue=params[0].data;
//      	    		if(name.indexOf("亿")>-1){
//      	    			showvalue=(data[params.dataIndex]/100000000.00).toFixed(2);
//      	    		}else if(name.indexOf("万")>-1){
//      	    			showvalue=(data[params.dataIndex]/10000.00).toFixed(2);
//      	    		}else 
      	    		if(name!="挂牌家数" &&  name!="每日新增"){
      	    			showvalue=(params[0].data).toFixed(2);
      	    		}
	      	    	var divHtml='<div class="sanban_tips">'+
	      	    					'<p class="sb_tips_title">'+params[0].name+'</p>'+
	      	    					'<div class="sb_tips_content">'+
	      	    						'<span class="tips_leibie fl">'+name+'</span>'+
	      	    						'<span class="tips_leibie_num fl">'+showvalue+'</span>'+
	      	    						'<div class="clr"></div>'+
	      	    					'</div>'+
	      	    				'</div>';
	                return divHtml;
	            }
      	    //7月3号王仙玲修改的柱状图的提示框类型end
        },
        series: [{
            name: name,
            type: 'bar',
            barWidth:'30',
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
			label:{
				normal:{
					show:true,
					position:'top',
					formatter: function(params) {
						var showvalue=data[params.dataIndex];
	      	    		if(name!="挂牌家数" &&  name!="每日新增"){
	      	    			showvalue=(data[params.dataIndex]).toFixed(2);
	      	    		}
	      	    		return showvalue;
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
                      	return "#62a6f2";
                    }
                },
                emphasis:{
                	color:"#4a8ad3"//鼠标放到柱形图上显示的颜色
                }
            }
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.onresize = myChart.resize;
}



