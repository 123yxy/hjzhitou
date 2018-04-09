var codeName = getUrlParam("stockCode");
var stockName = getUrlParam("stockName");
$(function() {
	
	getByCodeName();//企业介绍
	findShareTop5();//股东
	findDignitaryTop5();//董监高
	findAllByStock();//查询所有定增信息
	loadRankData("","netAssetValuePerShare"); //行业分析
	findFinancialChartData(); //财务分析
	
	/**
	 * 选择行业指标进行切换数据
	 */
	$("#fieldRankBtns li").click(function(){
		$("#fieldRankBtns").children().attr("class","");
		$(this).attr("class","on");
		loadRankData("",$(this).attr("data-value"));
	})
	
	//企业详情更多
	$("#moreXQ").attr("href","TBenterpriseInformation.html?stockCode="+codeName+"&stockName="+stockName);
	//股权结构更多
	$("#moreGQ").attr("href","TBequityShareholders.html?stockCode="+codeName+"&stockName="+stockName);
	//财务分析更多
	$("#moreCW").attr("href","TBComparisonOfPop.html?stockCode="+codeName+"&stockName="+stockName);
	//行业分析更多
	$("#moreHY").attr("href","TBanalysis.html?stockCode="+codeName+"&stockName="+stockName);
	//高管更多
	$("#moreGG").attr("href","TBboardDirectors.html?stockCode="+codeName+"&stockName="+stockName);
	//发行分配更多
	$("#moreFX").attr("href","TBdistributionAllocation.html?stockCode="+codeName+"&stockName="+stockName);
	
});
//查询已完成定增
function findAllByStock(){
	$.axs("/betaStock/privatePlacement/findAllByStock.do",{stockCode: stockCode},false,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			if(result==null){
				return false;
			}
			for(var i=0;i<result.length;i++){
				var stat=result[i];
				var jindu='';
				if(stat.schedule=='1'){
					jindu='董事会通过';
				}else if(stat.schedule=='2'){
					jindu='股东大会通过';
				}else if(stat.schedule=='3'){
					jindu='停止实施';
				}else if(stat.schedule=='4'){
					jindu='股东大会未通过';
				}else if(stat.schedule=='5'){
					jindu='证监会核准';
				}else if(stat.schedule=='6'){
					jindu='实施中';
				}else if(stat.schedule=='7'){
					jindu='发行失败';
				}else{
					jindu='已完成定向增发';
				}
				var tempPurchaser = stat.purchaserNum;
				if(tempPurchaser==0 || tempPurchaser=="0"){
					tempPurchaser="--";
				}else{
					tempPurchaser
				}
				var html='';
				html+='<tr><td>'+stat.dateTime+'</td>';
				html+='<td>'+jindu+'</td>';
				html+='<td>'+stat.privatePrice+'</td>';
				html+='<td>'+stat.privateNum+'</td>';
				html+='<td class="mjje">'+stat.raisePrice+'</td>';
				if(tempPurchaser=="--"){
					html+='<td >--</td>';
				}else{
					html+='<td > <a href="javascript:void(0);" data-purchaserVale="'+getPurchaserHtml(stat.purchaser,stat.schedule)+'">'+tempPurchaser+'</a></td>';
				}
				html+='<td>'+stat.premiumRate+'%</td></tr>';
				$("#privatePlacement").append(html);
			}
			//绑定显示发行对象事件
			$("#privatePlacement a").on("click", function() {
				var purchaserHtml=$(this).attr("data-purchaserVale");
				$("#purchaserInfo").html(purchaserHtml);
				$(this).parents("table").siblings("#faxfp_dbox_newq").find(".faxfp").show();
				$(this).parents("table").siblings("#faxfp_dbox_newq").find(".faxfp_close2").css("display","block");
			});
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}
/**
 * 发行对象
 * @param purchaser
 * @param type
 * @returns {String}
 */
function getPurchaserHtml(purchaser,type){
	var duixiangHtml='';
		if(type==8){
//			console.log(purchaser);
			var objList=jQuery.parseJSON(purchaser);
			for(var i=0;i<objList.length;i++){
				var obj=objList[i];
				duixiangHtml+='<tr>';
				duixiangHtml+='<td>'+obj.ORGNAME+'</td>';// scope="col" class="tc_fxdx"
				duixiangHtml+='<td>'+obj.F005N_STK236+'</td>';// scope="col" class="tc_rgjg"
				duixiangHtml+='<td>'+obj.F001N_STK236+'</td>';// scope="col" class="tc_rgsl"
				duixiangHtml+='<td>'+(obj.F005N_STK236*obj.F001N_STK236).toFixed(2)+'</td>';// scope="col" class="tc_rgje"
				duixiangHtml+='<td>'+obj.F004N_STK236+'</td>';// scope="col" class="tc_cgqx"
				duixiangHtml+='</tr>';
			}
		}else{
			var str=null;
			if(purchaser.indexOf(",")>-1){
				str=purchaser.split(",");
        	}else if(purchaser.indexOf("；")>-1){
        		str=purchaser.split("；");
        	}else if(purchaser.indexOf(";")>-1){
        		str=purchaser.split(";");
        	}else if(purchaser.indexOf("。")>-1){
        		str=purchaser.split("。");
        	}else if(purchaser.indexOf(".")>-1){
        		str=purchaser.split(".");
        	}else{
        		str=purchaser.split("、");
        	}

			for(var i=0;i<str.length;i++){
				duixiangHtml+='<tr>';
				duixiangHtml+='<td>'+str[i]+'</td>';//scope="col" class="tc_fxdx"
				duixiangHtml+='<td>--</td>';//scope="col" class="tc_rgjg"
				duixiangHtml+='<td>--</td>';//scope="col" class="tc_rgsl"
				duixiangHtml+='<td>--</td>';//scope="col" class="tc_rgje"
				duixiangHtml+='<td>--</td>';//scope="col" class="tc_cgqx"
				duixiangHtml+='</tr>';
			}
		}
	return duixiangHtml;
}
//董监高基础数据
function findDignitaryTop5(){
	$.axs("/betaStock/dignitary/findDignitaryTop5.do",{stockCode: stockCode},false,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			if(result==null){
				return false;
			}
			for(var i=0;i<result.length;i++){
				var stat=result[i];
				var list='<tr><td><i></i>'+stat.position+'</td>'+
						'<td><a href="javascript:;" onclick="openDiv(\''+stat.id+'\')">'+stat.dignitaryName+'</a></td>'+
						'<td>'+stat.sex+'&nbsp&nbsp'+stat.age+'&nbsp&nbsp'+stat.education+'</td>'+
						'<td>'+stat.servingTime+'</td></tr>';
				var html='<div id="div_'+stat.id+'"><a href="javascript:;" class="faxfp_close"><img src="/saasBeta/images/close1.png" alt="关闭"></a>'+
						'<div class="faxfp"><div class="fax_fp_top"><div class="fp_top_l fl"><h2>'+stat.dignitaryName+'</h2></div>'+
						'<div class="fp_top_r fr"><div class="top_r_list"><span>'+stat.position+'</span><span>持股数：'+stat.sharesNumber+'</span>'+
						'</div><div class="top_r_list"><span>'+stat.sex+'&nbsp&nbsp'+stat.age+'&nbsp&nbsp'+stat.education+'</span><span>任期：'+stat.tenure+'</span></div>	</div></div>'+
						'<div class="clr"></div><div class="fp_fax_box"><p>'+stat.personalProfile+'</p><div class="fax_time">'+
						'<span>报告期:'+stat.reportPeriod+'</span>	</div></div><div class="clr"></div></div></div>';
				$("#dignitaryList").append(list);
				$("#dignitaryTable").after(html);
			}
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}
//显示高管详细信息
function openDiv(id){
	$("#div_"+id).show();
	$("#div_"+id+" .faxfp").show();
	$("#div_"+id+" .faxfp_close").css("display","block");
}
//查询股东信息
function findShareTop5(){
	$.axs("/betaStock/topTenShareholderNew/findShareTop5.do", {stockCode: stockCode}, true, function(data){
		if(data.retCode == 0000){
			var result=data.retData;
			if(result==null){
				return false;
			}
			for(var i=0;i<result.length;i++){
				var stat=result[i];
				var html='<tr><td><i></i>'+stat.investor+'</td>'+
					'<td class="clue">'+stat.holdCount+'</td>'+
					'<td>'+stat.shareChange+'</td>'+
					'<td>'+stat.proportion+'</td>'+
					'<td>'+stat.realityAddReduce+'</td>'+
					'<td>'+stat.shareType+'</td></tr>';
				$("#shareList").append(html);
			}
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}
//获取列表
function getByCodeName() {
	$.axs("/betaStock/enterPriseData/findEnterpriseExtend.do", {
		stockCode: stockCode,
	}, true, function(data) {
		if(data.retCode == 0000) {
			var result = data.retData;
			if(result.state==null){//地区
				$("#state").text("--");
			}else{
				$("#state").text(result.state);
			}//所属行业
			if(result.industry==null){
				$("#industry").text("--");		
			}else{
				$("#industry").text(result.industry);
			}//主营业务
			if(result.mainBusiness ==null){
				$("#mainBusiness").text("--");
			}else{
				$("#mainBusiness").text((result.mainBusiness).substring(0,10));
				$("#mainBusiness").attr("title", result.mainBusiness);
			}//上市日期
			if(result.stockDate==null){
				$("#stockDate").text("--");
			}else{
				$("#stockDate").text(result.stockDate);
			}//每股净资产
			if(result.netAssetValuePerShare==null){
				$("#netAssetValuePerShare").text("--");
			}else{
				$("#netAssetValuePerShare").text(result.netAssetValuePerShare);
			}//每股收益
			if(result.earningsPerShare==null){
				$("#earningsPerShare").text("--");
			}else{
				$("#earningsPerShare").text(result.earningsPerShare);
			}//净利润
			if(result.netProfit==null){
				$("#netProfit").text("--");
			}else{
				$("#netProfit").text(result.netProfit);
			}//净利润增长率
			if(result.netProfitGrowthRate==null){
				$("#netProfitGrowthRate").text("--");
			}else{
				$("#netProfitGrowthRate").text(result.netProfitGrowthRate);
			}//营业收入
			if(result.operatingIncome==null){
				$("#operatingIncome").text("--");
			}else{
				$("#operatingIncome").text(result.operatingIncome);
			}//每股现金流
			if(result.cashFlowPerShare==null){
				$("#cashFlowPerShare").text("--");
			}else{
				$("#cashFlowPerShare").text(result.cashFlowPerShare);
			}//每股公积金
			if(result.accumulationFundShare==null){
				$("#accumulationFundShare").text("--");
			}else{
				$("#accumulationFundShare").text(result.accumulationFundShare);
			}//每股未分配利润
			if(result.undistributedProfit==null){
				$("#undistributedProfit").text("--");
			}else{
				$("#undistributedProfit").text(result.undistributedProfit);
			}//普通股总股本
			if(result.generalCapital==null){
				$("#generalCapital").text("--");
			}else{
				$("#generalCapital").text(result.generalCapital);
			}//流通股
			if(result.circulationCapital==null){
				$("#circulationCapital").text("--");
			}else{
				$("#circulationCapital").text(result.circulationCapital);
			}
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}

/**
 * 加载行业排名数据
 * @param dateTime
 * @param indicatorId
 */
function loadRankData(dateTime,indicatorId){
	$.axs("/betaStock/analysis/findAnalysisInfo.do",
			{stockCode:stockCode,dateTime:dateTime,indicatorId:indicatorId,datePageNum:1,datePageSize:3},
			true,
			function(data){
		if(data.retCode=="0000"){
			$("#pageCount").text(data.retData.total);
			$("#industryThree").text(data.retData.industry);
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
		var myChart = echarts.init(document.getElementById('fieldRankChart'));
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

$(document).ready(function(){
	//高管团队以及发行分配点击弹层
/*$(".ggtd_n_table table td a").on("click",function(){
	$(this).parents("table").siblings(".faxfp").show();
	$(this).parents("table").siblings(".faxfp_close2").css("display","block");
	$(this).parents("table").siblings(".faxfp_close").css("display","block");
	
	});*/
//关闭弹层
$(".faxfp_close").on("click",function(){
	$(this).parent().hide();
	//$(this).parent().next(".faxfp").hide();
});
$(".faxfp_close2").on("click",function(){
//	$(this).parent().hide();
	$(this).hide();
	$(this).next(".faxfp").hide();
});
});



//财务详情---财务分析
function findFinancialChartData(){
	$.axs("/betaStock/financial/findChartData.do",{stockCode:codeName},false,function(data){
		if(data.retCode=="0000"){
			if(data.retData==null){
				return false;
			}
			var result=data.retData;
			var dateArray=[];
			var zichanfuzhailv = [];
			var jingLiRun=[];
			var yingYeShouRu=[];
			var jingZiChanShouYiLv=[];
			var xianJinLiu=[];
			var ziChanZongJi=[];
			var meiGuJingZiChan=[];
			for(var i=0;i<result.length;i++){
				var obj=result[i];
				var strDate=obj.dateTime.split("-"); 
				var s=new Date(strDate[0],(strDate[1]-parseInt(1)),strDate[2]);
				var year=(s).Format("yyyy");
				dateArray.push(year);
				zichanfuzhailv.push(obj["3879"]);
				jingLiRun.push(obj["3481"]);
				yingYeShouRu.push(obj["3484"]);
				jingZiChanShouYiLv.push(obj["3908"]);
				xianJinLiu.push((obj["3523"] + obj["3532"] + obj["3543"]));
				ziChanZongJi.push(obj["3417"]);
				meiGuJingZiChan.push(obj["3825"]);
			}
//			console.log(dateArray);
//			console.log(xiaoshoumaolilv);
			myChart1(dateArray,jingLiRun,yingYeShouRu);
			myChart2(dateArray,jingLiRun,yingYeShouRu);
			myChart3(dateArray,jingZiChanShouYiLv);
			myChart4(dateArray,xianJinLiu);
			myChart5(dateArray,ziChanZongJi,meiGuJingZiChan);
			myChart6(dateArray,zichanfuzhailv);
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}


//财务分析图表区
/**
 * 公司业绩增长情况
 * @param data1  净利润
 * @param data2  营业收入
 */
function myChart1(date,data1,data2){
	var myChart1 = echarts.init(document.getElementById("chars01"));
	var option = {
		    tooltip: {
		        trigger: 'axis'
		    },
		     legend: {
		        data:['净利润','营业收入'],
		        top:'15px',
		        right:'10px'
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },  
		    
		    xAxis: {
		        type: 'category',
		        data : date//x时间轴
		    },
		    yAxis: {
		        type: 'value',
		         name:'百万'
		    },
		    series: [
		        {
		            name:'净利润',//第一种数据种类名字
		            type:'bar',
		            // barWidth:
		            data:data1//第一种数据种类数据
		           
		        },
		         {
		            name:'营业收入',//第一种数据种类名字
		            type:'bar',
		             data:data2//第一种数据种类数据
		           
		        }
		    ],
		     color:["#00C1EF","#D3D7DF",]
		}
		;
	myChart1.setOption(option);
}

/**
 * 公司盈利能力情况
 * @param data1 净利润
 * @param data2 营业收入
 */
function myChart2(date,data1,data2){
	var myChart2 = echarts.init(document.getElementById("chars02"));
	var option = {
		    tooltip: {
		        trigger: 'axis'
		    },
		     legend: {
		        data:['毛利率','净利率'],
		        top:'15px',
		        right:'10px'
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },  
		    
		    xAxis: {
		        type: 'category',
		        data : date//x时间轴
		    },
		    yAxis: {
		        type: 'value',
		         name:'百分比'
		    },
		    series: [
		        {
		            name:'净利润',//第一种数据种类名字
		            type:'line',
		            // barWidth:
		            data:data1//第一种数据种类数据
		           
		        },
		         {
		            name:'营业收入',//第一种数据种类名字
		            type:'line',
		             data:data2//第一种数据种类数据
		           
		        }
		    ],
		     color:['#F3563F','#1BAA62',]
		}
		;
	myChart2.setOption(option);
}
	
/**
 * 公司净资产收益率情况
 * @param data  净资产率
 */
function myChart3(date,data){
	var myChart3 = echarts.init(document.getElementById("chars03"));
	var option = {
		    tooltip: {
		        trigger: 'axis'
		    },
		     legend: {
		        data:['净资产率'],
		        top:'15px',
		        right:'10px'
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },  
		    
		    xAxis: {
		        type: 'category',
		        data : date//x时间轴
		    },
		    yAxis: {
		        type: 'value',
		         name:'百分比(%)'
		    },
		    series: [
		        
		         {
		            name:'净资产率',//第一种数据种类名字
		            type:'line',
		             data:data//第一种数据种类数据
		           
		        }
		    ],
		     color:['#F3563F','#1BAA62',]
		}
		;
	myChart3.setOption(option);
}
	
/**
 * 公司净资产收益率情况
 * @param data  现金流
 */
function myChart4(date,data){
	var myChart4 = echarts.init(document.getElementById("chars04"));
	var option = {
		    tooltip: {
		        trigger: 'axis'
		    },
		     legend: {
		        data:['现金流'],
		        top:'15px',
		        right:'10px'
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },  
		    
		    xAxis: {
		        type: 'category',
				data : date//x时间轴
				},
		    yAxis: {
		        type: 'value',
		         name:'万'
		    },
		    series: [
		        
		         {
		            name:'现金流',//第一种数据种类名字
		            type:'line',
		             data:data//第一种数据种类数据
		           
		        }
		    ],
		     color:['#F3563F','#1BAA62',]
		}
		;
	myChart4.setOption(option);
}
	
/**
 * 公司规模情况
 * @param data1   资产总计
 * @param data2   净资产
 */
function myChart5(date,data1,data2){
	var myChart5 = echarts.init(document.getElementById("chars05"));
	var option = {
		    tooltip: {
		        trigger: 'axis'
		    },
		     legend: {
		        data:['资产总计','净资产'],
		        top:'15px',
		        right:'10px'
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },  
		    
		    xAxis: {
		        type: 'category',
		        data : date//x时间轴
		    },
		    yAxis: {
		        type: 'value',
		         name:'元'
		    },
		    series: [
		        {
		            name:'资产总计',//第一种数据种类名字
		            type:'bar',
		            // barWidth:
		            data:data1//第一种数据种类数据
		           
		        },
		         {
		            name:'净资产',//第一种数据种类名字
		            type:'bar',
		             data:data2//第一种数据种类数据
		           
		        }
		    ],
		     color:["#00C1EF","#D3D7DF",]
		}
		;
	myChart5.setOption(option);
}


/**
 * 公司负债情况
 * @param data  资产负债率
 */
function myChart6(date,data){
	var myChart6 = echarts.init(document.getElementById("chars06"));
	var option = {
		    tooltip: {
		        trigger: 'axis'
		    },
		     legend: {
		        data:['资产负债率'],
		        top:'15px',
		        right:'10px'
		    },
		    grid: {
		        left: '6%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },  
		    
		    xAxis: {
		        type: 'category',
		        data : date//x时间轴
		    },
		    yAxis: {
		        type: 'value',
		         name:'百分比(%)'
		    },
		    series: [
		        
		         {
		            name:'资产负债率',//第一种数据种类名字
		            type:'line',
		             data:data//第一种数据种类数据
		           
		        }
		    ],
		     color:['#F3563F','#1BAA62',]
		}
		;
	myChart6.setOption(option);
}