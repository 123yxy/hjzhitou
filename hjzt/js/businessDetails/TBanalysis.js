var stockCode = getUrlParam("stockCode");
var stockName = getUrlParam("stockName");
var dateList = [];
var dataArr = [];

$(function(){
	
	/**
	 * 初始化加载数据
	 */
	loadRankData("","netAssetValuePerShare");
	
	/**
	 * 选择指标进行切换数据
	 */
	$("#analysisData li").click(function(){
		$("#analysisData").children().attr("class","");
		$(this).attr("class","on");
		getConditionSearch();
	})
	
	$(dateList).each(function(index,item){
		if(index == 0){
			$("#dateDiv").before("<span class='color' name='dateTime' data-value="+this+" >"+this+"-12-31</span>");
		}else{
			$("#dateDiv").before("<span name='dateTime' data-value="+this+" >"+this+"-12-31</span>");
		}
	})
	/**
	 * 选择时间进行切换数据
	 */
	$("[name='dateTime']").click(function(){
		$("[name='dateTime']").attr("class","");
		$(this).attr("class","color");
		getConditionSearch();
	})
	
})

/**
 * 获取条件进行查询
 */
function getConditionSearch(){
	var dateTime = null;
	var indicatorId = null;
	$("#analysisData li").each(function(){
		if($(this).attr("class") == "on"){
			indicatorId = $(this).attr("data-value");
		}
	})
	
	$("[name='dateTime']").each(function(){
		if($(this).attr("class") == "color"){
			dateTime = $(this).attr("data-value");
		}
	})
	loadRankData(dateTime,indicatorId);
}

/**
 * 加载行业排名数据
 * @param dateTime
 * @param indicatorId
 */
function loadRankData(dateTime,indicatorId){
	$.axs("/betaStock/analysis/findAnalysisInfo.do",
			{stockCode:stockCode,dateTime:dateTime,indicatorId:indicatorId,datePageNum:1,datePageSize:3},
			false,
			function(data){
		if(data.retCode=="0000"){
			$("#pageCount").text(data.retData.total);
			$("#industry").text(data.retData.industry);
			if(data.retData.analysisList != null && data.retData.analysisList != ""){
				dataArr = data.retData.analysisList;
				var stockNameArr = [];
				var stockDataArr = [];
				var startValue = 0;
				$(data.retData.analysisList).each(function(index, item){
					if (item.stock_code == stockCode) {
			            startValue = index;
			        }
					stockNameArr.push(item.stock_name); //获取股票代码集合
					if(indicatorId == "netAssetValuePerShare"){ //每股净资产
						stockDataArr.push(item.netAssetValuePerShare);
					}else if(indicatorId == "netCashFlowPerShare"){ //每股现金流
						stockDataArr.push(item.netCashFlowPerShare);
					}else if(indicatorId == "netProfit"){ //净利润
						stockDataArr.push(item.netProfit);
					}else if(indicatorId == "operatingIncome"){ //营业收入
						stockDataArr.push(item.operatingIncome);
					}else if(indicatorId == "totalAssets"){ //总资产
						stockDataArr.push(item.totalAssets);
					}else if(indicatorId == "netAssetsIncomeRate"){ //净资产收益率
						stockDataArr.push(item.netAssetsIncomeRate);
					}else if(indicatorId == "grossProfitMargin"){ //销售毛利率
						stockDataArr.push(item.grossProfitMargin);
					}else if(indicatorId == "capitalStock"){ //总股本
						stockDataArr.push(item.capitalStock);
					}
				})
				dateList = data.retData.dateList;
				dataPage(1,3);
				initRankChart(stockNameArr,stockDataArr,startValue);
			}else{
				$("#rankMsg").append("<tr><td colspan='11'>暂无数据</td></tr>");
				$("#m_analysis").hide();
			}
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}

/**
 * 数据分页
 */
function dataPage(pageNum, pageSize){
	$("#rankMsg").empty();
	var dataArrS = dataArr.slice((pageNum - 1)*pageSize, ((pageNum - 1)*pageSize)+pageSize);
	$(dataArrS).each(function(index, item){
		var tr = "<tr><td>" + (index + 1) + "</td><td><a href='/businessDetails/newTBindex.html?stockName="+item.stock_name+"&stockCode="+item.stock_code+"'>"
				+ item.stock_name + "("+ item.stock_code +")</a></td><td>"
				+ item.netAssetValuePerShare + "</td><td>"
				+ item.netCashFlowPerShare + "</td><td>"
				+ item.netProfit + "</td><td>"
				+ item.operatingIncome + "</td><td>"
				+ item.totalAssets + "</td><td>"
				+ item.netAssetsIncomeRate.toFixed(2) + "</td><td>"
				+ item.grossProfitMargin.toFixed(2) + "</td><td>"
				+ item.capitalStock + "</td></tr>";
		$("#rankMsg").append(tr);
	})
	$('#page').show();
	//分页
	$('#page').pagination({
		total: $("#pageCount").text(),
		pageSize: pageSize,
		current:pageNum,
		layout: ['first', 'prev', 'links','next'],
		links:0,
		displayMsg:"",
		showPageList:false,
		onSelectPage: function(pageNumber, size) {
			dataPage(pageNumber,size);
		}
	});
	//修改分页文字
	setPageText2('page');
}

/**
 * 初始化行业分析图表
 * @param stockNameArr
 * @param stockDataArr
 * @param startValue
 */
function initRankChart(stockNameArr, stockDataArr, startValue){
	
	var end = 7;
    if(stockNameArr.length > 170 && stockNameArr.length <= 500) {//170-500
        end = 30;
    } else if(100 < stockNameArr.length && stockNameArr.length <= 170) {//100-170
        end = 13;
    } else if(40 < stockNameArr.length && stockNameArr.length <= 100) {//40-100
        end = 7;
    } else if(stockNameArr.length <= 40) {//0-40
        end = 5;
    } else if(stockNameArr.length > 500) {//500-∞
        end = 170;
    }
    
	//图表展示的配置
	/**
	 * @param xAixs  X轴-公司名称
	 * @param name 
	 * @param data  Y轴-公司对应的指标值
	 * @param startValue 第一个显示的排名位置
	 */
	 // 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('m_analysis'));
	    var option = {
//	      title: {
//	          text: "行业地位分析"
//	      },
	        dataZoom: [{
	            type: "slider",
	            show: true,
	            startValue: startValue - 2,
	            endValue: startValue + 2 + (Math.ceil(stockNameArr.length / end))
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
	             data : []
	        }],
	        xAxis: [{
	            type: 'category',
	           data : stockNameArr/*['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']*/
	        }],
	        tooltip:{
	        	enterable:true,//鼠标可以进入提示信息里面
	        	show:true,
	        	trigger:'item',
	        	position:'top',
	      	    formatter: function(params) {
//		      	    	var divHtml='<div class="tooltips">';
//		      	    		divHtml+='<p>'+xAixs[params.dataIndex]+'&nbsp;&nbsp;&nbsp;&nbsp;('+stockCode[params.dataIndex]+')</p>';
//						if(chg[params.dataIndex]>0){
//							divHtml+='<p style="background-color: #f3565d;">涨跌幅&nbsp;'+chg[params.dataIndex]+'%</p>';
//						}else{
//							divHtml+='<p style="background-color: #5bb85d;">涨跌幅&nbsp;'+chg[params.dataIndex]+'%</p>';
//						}
//						if(indicatorName!="涨跌幅"){
//							divHtml+='<p>'+indicatorName+':&nbsp;'+data[params.dataIndex]+'</p>';
//						}
//							divHtml+='<p><a href="#">加入自选</a><a href="#">加入对比</a></p>';
//							divHtml+='<div class="tip"></div>';
//							divHtml+='</div>';
//		                return divHtml;
		            }
	        },
	        series: [{
	            name: "Thu",
	            type: 'bar',
	            data: stockDataArr/*[10, 52, 200, 334, 390, 330, 220,10, 52, 200, 334, 390, 330, 220]*/,
	            label: {
	                normal: {
	                    show: true,
	                    position: "top",
	                    formatter: function(params) {
	                      return "第" + (params.dataIndex + 1) + "名";
	                    }
	                }
	            },
	            itemStyle: {
	                normal: {
	                    color: function(params) {
	                    	  // 检索结果颜色
	                    	if(params.dataIndex == startValue) {
	                            return "#00C1EF";
	                        } else {
	                            return "#D53A35";
	                        }
	                    }
	                },
	                emphasis:{
	                	color:"#2c96b6"//鼠标放到柱形图上显示的颜色
	                }
	            }
	        }]
	    };
	    // 使用刚指定的配置项和数据显示图表。
	    myChart.setOption(option);
	    window.onresize = myChart.resize;
}

    

