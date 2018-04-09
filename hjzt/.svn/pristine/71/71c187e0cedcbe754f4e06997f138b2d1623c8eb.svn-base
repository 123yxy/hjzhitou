//第三章---财务数据
var stockCodeParam = UTIL.getPara("stockCode");
var stockNameParam = decodeURI(UTIL.getPara("stockName"));
var desc = UTIL.weiXiRemarks;
var imgUrl = UTIL.imgUrl;

/**
 * 查询核心数据
 */
function findFinanceKernelData() {
	var paramData = { stockCode: stockCodeParam };
	// WF_ajax.findFinanceKernelData(paramData,true,function(_data){
	UTIL.axs(UTIL.CONFIG.findFinanceKernelData, paramData, true, function (result) {
		var _data = result.retData;
		//		console.log(_data);
		if (_data == null || _data == "null") {
			return false;
		}
		$("#finance_3_1_stockName").text(_data.stockName);
		$.each(_data, function (key, item) {
			//			console.log(item);
			//			console.log(item[key+"_showUnit"]);
			var value = item[key + "_value"];
			var avg = item[key + "_avg"];
			var showUnit = item[key + "_showUnit"];
			if (showUnit != null) {
				if (showUnit.indexOf("亿") > -1) {
					value = Number(value) / 100000000.00;
					avg = Number(avg) / 100000000.00;
				} else if (showUnit.indexOf("万") > -1) {
					value = Number(value) / 10000.00;
					avg = Number(avg) / 10000.00;
				}
			}
//			$("#"+key+"_value").prev().text(item[key+"_showName"]+(showUnit==null?"":"("+showUnit+")"));
			$("#"+key+"_value").text(UTIL.fmtNum3(Number(value).toFixed(2)));
			$("#"+key+"_avg").text(UTIL.fmtNum3(Number(avg).toFixed(2)));
			//市值总额  市盈率  市净率
			if($("#ShiZhiZongE_value").text()==0.00 || $("#ShiZhiZongE_value").text()=="0.00"){
				$("#ShiZhiZongE_value").text("--")
			}
			if($("#ShiYingLv_value").text()==0.00 || $("#ShiYingLv_value").text()=="0.00"){
				$("#ShiYingLv_value").text("--")
			}
			if($("#ShiJingLv_value").text()==0.00 || $("#ShiJingLv_value").text()=="0.00"){
				$("#ShiJingLv_value").text("--")
			}
		});
		UTIL.sjly("#hxcwsjly", "hxcwsj", ".hxcwsj", "sjlyy");
		//		setScrollTos();
	});
}

/**
 * 财务核心数据同行业前10名公司(根据营业收入排序)
 */
//function findFinanceKernelDataStockInTrade(){
//	var paramData = { stockCode: stockCodeParam };
//	// WF_ajax.findFinanceKernelDataStockInTrade(paramData,true,function(_data){
//	UTIL.axs(UTIL.CONFIG.findFinanceKernelDataStockInTrade, paramData, true, function (result) {
//		//console.log(result)
//		if(result.retCode=="0000"){
//			var _data = result.retData;
//			var li='';
//			$("#dbList").html("");
//			if(_data!="" && _data!=null && _data!=undefined){
//				$.each(_data, function (index, item) {
//					var kernelDataStockCodeInTrade=item.stockCode;//股票代码
//					var kernelDataStockNameInTrade=item.stockName;//股票简称
//					var kernelDataCompanyNameInTrade=item.companyName;//公司全称
//					//TODO 展示在页面
//					//console.log(kernelDataStockCodeInTrade+":"+kernelDataStockNameInTrade+":"+kernelDataCompanyNameInTrade);
//					li+='<li data-code="'+item.stockCode+'"><span>'+item.companyName+'</span></li>';
//					
//				});
//				//li='<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 公司的控股股东及实际控制人为中国科学院软件研究所。 <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 中国科学院软件研究所，持有本公司股 99,411,840 股，持股比例为 26.05%。中国科学院软件研究所创建于1985 年3 月，是一家按照中国法律设立的事业单位法人。其举办单位为中国科学院；开办资金人民币 5,666 万元；注册地址为北京市海淀区中关村南四街 4 号；统一社会信用代码为 121000004000123696 法定代表人为赵琛。中国科学院软件研究所的宗旨和主要业务为开展软件研制，促进科技发展；进行计算机系统和软件理论与技术的研究；从事计算机软件研制与技术服务；进行相关学历教育、继续教育、学术交流、专业培训和培养博士后；并从事《软件学报》的出版工作。 <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 报告期内，公司控股股东未发生变动。</p>';
//					$("#dbList").html(li);
//			}
//			
//		}
//		
//		//setScrollTos();
//	});
//}

/*	查看对标的数据
 * @param financeName     financeName&fType=1:	净利润
financeName&fType=2:
	净利润增长率
	净资产收益率
financeName&fType=3:
	SJL（市净率）
	 * @param stockCode
	 * @param pageNum
	 * @param pageSize
	 * @param type
	 * @return
 * 
 */
var financeName=financeName;
var fType=fType;
function findIFinanceData(){
	var data={financeName:financeName,
				fType:fType,stockCode:stockCode,pageNum:1,pageSize:10};
	UTIL.axs(UTIL.CONFIG.findIFinanceData,data,true,function(data){
		//console.log(financeName);
		if(data.retCode=='0000'){
			if(data.retData!="" && data.retData!=null && data.retData!=undefined){
				var result=data.retData;
				var tr='';
				$(result).each(function(index,item){
					tr+='<tr><td data-name="'+item.stockName+'" data-code="'+item.stockCode+'">'+item.stockName+'('+item.stockCode+')</td>';
					if(financeName=="ZSZ"){
						tr+='<td>'+(isSZKong(item.val)=="-"?"--":(UTIL.fmtNum3(((item.val)/100000000).toFixed(2))))+'</td></tr>';
					}else if(financeName=="EBIT" || financeName=="EBITDA" || financeName=="净利润"){
						tr+='<td>'+(isSZKong(item.val)=="-"?"--":(UTIL.fmtNum3(((item.val)/10000).toFixed(2))))+'</td></tr>';
					}else{
						tr+='<td>'+(isSZKong(item.val)=="-"?"--":(UTIL.fmtNum3((item.val).toFixed(2))))+'</td></tr>';
					}
          			
				})
				$("#BenchmarkingList").html(tr);
			}else{
				tr='<td colspan="2">暂无数据</td>';
				$("#BenchmarkingList").html(tr);
			}
		}
	})
}
//点击查看
function chakan(){
	$(".look-data").on("click",function(){
		$("#BenchmarkingData").show();
		$(".marsk").show();
		$("body,html").css("overflow", "hidden");
		financeName=$(this).attr("data-name");
		fType=$(this).attr("data-type");
		if(financeName=="ZSZ"){
			$("#zhibName").html("市值总额");
		}else if(financeName=="SJL"){
			$("#zhibName").html("市净率");
		}else if(financeName=="HQSYL1"){
			$("#zhibName").html("市盈率");
		}else{
			$("#zhibName").html(financeName);
		}
		findIFinanceData();
	})
	
}

/**
 * 公司盈利情况
 */
function findProfitData() {
	var paramData = { stockCode: stockCodeParam };
	// WF_ajax.findProfitData(paramData,true,function(_data){
	UTIL.axs(UTIL.CONFIG.findProfitData, paramData, true, function (result) {
		var _data = result.retData;
		if (_data == null || _data == "null") {
			$("#companyProfitShuoMing").hide();
			$("#companyProfit").hide();
			$("#companyProfit").after(noDataHtml());
			return false;
		}
		UTIL.sjly("#cwsdfxly", "gsylqk", ".cw1", "sjlyy");
		// UTIL.sjly("#cwsdfxly","gsyynlqk",".cw2","sjlyy");
		// UTIL.sjly("#cwsdfxly","cwsdfx",".cw3","sjlyy");
		var shuoming = "<p>截止最近一个会计年度，公司净利润为" + ((_data.stockValue == null || _data.stockValue == "undefined") ? "--" : (_data.stockValue / 1000000.00).toFixed(2)) + "百万，" +
			"在行业内排名" + ((_data.stockRanking == null || _data.stockRanking == "undefined") ? "--" : _data.stockRanking) + "/" + ((_data.stockTotalRanking == null || _data.stockTotalRanking == "undefined") ? "--" : _data.stockTotalRanking) + "，属于行业" + ((_data.rankingName == null || _data.rankingName == "undefined") ? "--" : _data.rankingName) + "。</p>";
		$("#companyProfitShuoMing").html(shuoming);
		//控制显示的起始位置
		var startIndex = 0;
		if (_data.stockRanking > 5) {
			startIndex = Number(_data.stockRanking) / _data.financeValueArrray.length * 100 - 1;
		}
		var stockNameArrrayChart = [];
		$(_data.stockNameArrray).each(function (index, item) {
			if (item == null) {
				item = "";
			}
			stockNameArrrayChart.push(item);
		})
		//控制一屏幕显示多少条
		var endIndex = 15 / _data.financeValueArrray.length * 100;
		var width = $(".page").width()*0.9;
		$("#companyProfit").css("width",width);
		var myChart = echarts.init(document.getElementById('companyProfit'));
		var option = {
			legend: {
				show: true,
				data: ['净利润'],
				//				backgroundColor:"#62a6f2",
				top: '8%'
			},
			color: ['#62a6f2'],
			xAxis: {
				show: true,
				type: 'category',
				//data:['东方证劵','东方时尚','华夏证劵','东方证劵']
				data: stockNameArrrayChart
			},
			yAxis: {
				show: true,
				name: '百万',
				type: 'value'
			},
			grid: {
				show: true,
				left: '5%',
				right: '5%',
				bottom: '30%'
			},
			label: {
				normal: {
					show: true,
					position: 'top'
				}
			},
			dataZoom: {
				type: 'slider',
				show: true,
				start: '0',
				end: 20,
				bottom: '3%',
				zoomLock:true
			},
			series: [{
				type: 'bar',
				name: '净利润',
				barMaxWidth: '30',
				//data:[10,50,20,83]
				data: _data.financeValueArrray,
				//				label: {
				//	                normal: {
				//	                    show: true,
				//	                    position: "top",
				//	                    offset:[1,100],
				//	                    formatter: function(params) {
				//	                    	if(params.dataIndex<10){
				//	                    		 return "第" + (params.dataIndex+1) + "";
				//	                    	}else{
				//	                    		 return "第" + ((_data.stockRanking==null || _data.stockRanking=="undefined")?"--":_data.stockRanking) + "";
				//	                    	}
				//	                    },
				//	                    textStyle:{
				//	                    	color:"#333"
				//	                    }
				//	                }
				//	            },
				itemStyle: {
					normal: {
						color: function (params) {
							// 检索结果颜色
							if (((params.dataIndex + 1) == _data.stockRanking) || (params.dataIndex + 1) == 11) {
								return "#f3565d";
							} else {
								return "#62a6f2";
							}
						}
					},
					emphasis: {
						color: "#4a8ad3"//鼠标放到柱形图上显示的颜色
					}
				}
			}]
		};
		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
		//	    setScrollTos();
		window.addEventListener("resize", function () {
			myChart.resize();
		});
	});


}

/**
 * 公司成长情况
 */
function findGroupData() {
//	alert(1)
	var paramData = { stockCode: stockCodeParam };
	// WF_ajax.findGroupData(paramData,true,function(_data){
	UTIL.axs(UTIL.CONFIG.findGroupData, paramData, true, function (result) {
		var _data = result.retData;
		if (_data == null || _data == "null") {
			$("#companyGrowUpShuoming").hide();
			$("#companyGrowUp").hide();
			$("#companyGrowUp").after(noDataHtml());
			return false;
		}
		//		console.log(_data);
		var shuoming = "<p>截至到" + ((_data.portTime_tips == null || _data.portTime_tips == "undefined") ? "--" : _data.portTime_tips) + "，" +
			"公司的营收增长率为：" + ((_data.REVZengZhangLv_tips == null || _data.REVZengZhangLv_tips == "undefined") ? "--" : Number(_data.REVZengZhangLv_tips).toFixed(2)) + "%，" +
			"净利润增长率为" + ((_data.JingLiRunZengZhangLv_tips == null || _data.JingLiRunZengZhangLv_tips == "undefined") ? "--" : Number(_data.JingLiRunZengZhangLv_tips).toFixed(2)) + "%，" +
			"成长能力在行内排名" + ((_data.stockCodeRank == null || _data.stockCodeRank == "undefined") ? "--" : _data.stockCodeRank) + "/" + ((_data.stockTotalRanking == null || _data.stockTotalRanking == "undefined") ? "--" : _data.stockTotalRanking) + "，行业排名第一的是：" + ((_data.firstRankStockName == null || _data.firstRankStockName == "undefined") ? "--" : _data.firstRankStockName) + "(" + ((_data.firstRankStockCode == null || _data.firstRankStockCode == "undefined") ? "--" : _data.firstRankStockCode) + ")</p>"
		$("#companyGrowUpShuoming").html(shuoming);
		var width = $(".page").width()*0.9;
		$("#companyGrowUp").css("width",width);
		var myChart = echarts.init(document.getElementById('companyGrowUp'));
		var option = {
			legend: {
				show: true,
				data: ['营收增长率', "净利润增长率"],
				top: '5%'
			},
			color: ['#62a6f2', "#feb535"],
			xAxis: {
				show: true,
				type: 'category',
				//data:['2015-11','2015-11','2015-11','2015-11']
				data: _data.portTime
			},
			yAxis: {
				show: true,
				name: '%',
				type: 'value'
			},
			tooltip : {
	            trigger: 'axis',
	            formatter:function(params){
	            	//console.log(params)
	            	var divHtml="";
	            	   divHtml+='<div class="sanban_tips">';
	  	    			divHtml+='<div class="sb_tips_content">';
	  	    			divHtml+='<span class="tips_leibie fl gsczqk" style="background-color: '+params[0].color+';">'+params[0].seriesName+'</span>';
	  	    			if(params[0].value=="" || params[0].value==null || params[0].value==undefined){
	  	    				divHtml+='<span class="tips_leibie_num fl">--</span>';
	  	    			}else{
	  	    				divHtml+='<span class="tips_leibie_num fl">'+params[0].value+'</span>';
	  	    			}
	  	    			
	  	    			divHtml+='<div class="clearfix"></div>';
	  	    			divHtml+='</div>';
	  	    			if(params[1]!="" && params[1]!=null && params[1]!=undefined){
	  	    				divHtml+='<div class="sb_tips_content first-content">';
	  	    				divHtml+='<span class="tips_leibie gsczqk fl" style="background-color: '+params[1].color+';">'+params[1].seriesName+'</span>';
		  	    			if(params[1].value==null || params[1].value=="" || params[1].value==undefined){
		  	    				divHtml+='<span class="tips_leibie_num fl">--</span>';
		  	    			}else{
		  	    				divHtml+='<span class="tips_leibie_num fl">'+params[1].value+'</span>';
		  	    			}
		  	    			divHtml+='<div class="clearfix"></div>';
	  	    				divHtml+='</div>';
	  	    			}
	  	    			divHtml+='</div>';
	                return divHtml;
	            }
	        },
			grid: {
				show: true,
				left: '5%',
				right: '5%',
				bottom: '30%'
			},
			dataZoom:[{
				type:'slider',
				show:true,
				start:'0',
				end:'100',
				bottom:'3%'
			}],
//			label: {
//				normal: {
//					show: true,
//					position: 'top'
//				}
//			},
			series: [{
				type: 'line',
				name: '营收增长率',
				symbol: 'circle',
				//data:[10,50,20,83]
				data: _data.REVZengZhangLv
			},
			{
				type: 'line',
				name: '净利润增长率',
				symbol: 'circle',
				//data:[15,38,40,60]
				data: _data.JingLiRunZengZhangLv
			}]
		};
		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
		//	    setScrollTos();
		window.addEventListener("resize", function () {
			myChart.resize();
		});
	});
}


/**
 * 偿债能力
 */
function findPayData() {
//	alert(0)
	var paramData = { stockCode: stockCodeParam };
	// WF_ajax.findPayData(paramData,true,function(_data){
	UTIL.axs(UTIL.CONFIG.findPayData, paramData, true, function (result) {
		var _data = result.retData;
				//console.log(_data);
		if (_data == null || _data == "null") {
			//alert(0)
			$("#companySinking").hide();
			$("#companySinkingShuoming").hide();
//			$("#companyProfitShuoMing").hide();
//			$("#companyProfit").hide();
			$("#companySinking").after(noDataHtml());
			return false;
		}
		var shuoming = "<p>截至到" + ((_data.portTime_tips == null || _data.portTime_tips == "undefined") ? "--" : _data.portTime_tips) + "，" +
			"公司的流动比率为：" + ((_data.LiuDongBiLv_tips == null || _data.LiuDongBiLv_tips == "undefined") ? "--" : Number(_data.LiuDongBiLv_tips).toFixed(2)) + "，" +
			"速动比率为" + ((_data.SuDongBiLv_tips == null || _data.SuDongBiLv_tips == "undefined") ? "--" : Number(_data.SuDongBiLv_tips).toFixed(2)) + "，" +
			"偿债能力在行内排名" + ((_data.stockCodeRank == null || _data.stockCodeRank == "undefined") ? "--" : _data.stockCodeRank) + "/" + ((_data.stockTotalRanking == null || _data.stockTotalRanking == "undefined") ? "--" : _data.stockTotalRanking) + "，行业排名第一的是：" + ((_data.firstRankStockName == null || _data.firstRankStockName == "undefined") ? "--" : _data.firstRankStockName) + "(" + ((_data.firstRankStockCode == null || _data.firstRankStockCode == "undefined") ? "--" : _data.firstRankStockCode) + ")</p>"
		$("#companySinkingShuoming").html(shuoming);
		var width = $(".page").width()*0.9;
		$("#companySinking").css("width",width);
		var myChart = echarts.init(document.getElementById('companySinking'));
		var option = {
			legend: {
				show: true,
				data: ['流动比率', "速动比率"],
				top: '5%'
			},
			color: ['#62a6f2', "#feb535"],
			xAxis: {
				show: true,
				type: 'category',
				//data:['2015-11','2015-11','2015-11','2015-11']
				data: _data.portTime
			},
			yAxis: {
				show: true,
				name: '',
				type: 'value'
			},
//			label: {
//				normal: {
//					show: true,
//					position: 'top'
//				}
//			},
			grid: {
				show: true,
				left: '5%',
				right: '5%',
				bottom: '30%'
			},
			tooltip : {
	            trigger: 'axis',
	            formatter:function(params){
	            	//console.log(params)
	            	var divHtml="";
	            	   divHtml+='<div class="sanban_tips">';
	  	    			divHtml+='<div class="sb_tips_content">';
	  	    			divHtml+='<span class="tips_leibie fl" style="background-color: '+params[0].color+';">'+params[0].seriesName+'</span>';
	  	    			if(params[0].value=="" || params[0].value==null || params[0].value==undefined){
	  	    				
	  	    			}else{
	  	    				divHtml+='<span class="tips_leibie_num fl">'+params[0].value+'</span>';
	  	    			}
	  	    			
	  	    			divHtml+='<div class="clearfix"></div>';
	  	    			divHtml+='</div>';
	  	    			if(params[1]!="" && params[1]!=null && params[1]!=undefined){
	  	    				divHtml+='<div class="sb_tips_content first-content">';
	  	    				divHtml+='<span class="tips_leibie fl" style="background-color: '+params[1].color+';">'+params[1].seriesName+'</span>';
		  	    			if(params[1].value==null || params[1].value=="" || params[1].value==undefined){
		  	    				divHtml+='<span class="tips_leibie_num fl">--</span>';
		  	    			}else{
		  	    				divHtml+='<span class="tips_leibie_num fl">'+params[1].value+'</span>';
		  	    			}
		  	    			divHtml+='<div class="clearfix"></div>';
	  	    				divHtml+='</div>';
	  	    			}
	  	    			divHtml+='</div>';
	                return divHtml;
	            }
	        },
			dataZoom:[{
				type:'slider',
				show:true,
				start:'0',
				end:'100',
				bottom:'3%'
			}],
			series: [{
				type: 'line',
				name: '流动比率',
				symbol: 'circle',
				//data:[10,50,20,83]
				data: _data.LiuDongBiLv
			},
			{
				type: 'line',
				name: '速动比率',
				symbol: 'circle',
				//data:[15,38,40,60]
				data: _data.SuDongBiLv
			}]
		};
		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
		//	    setScrollTos();
		window.addEventListener("resize", function () {
			myChart.resize();
		});
	});
}

/**
 * 运营情况
 */
function findOperationData() {
	var paramData = { stockCode: stockCodeParam };
	// WF_ajax.findOperationData(paramData,true,function(_data){
	UTIL.axs(UTIL.CONFIG.findOperationData, paramData, true, function (result) {
		var _data = result.retData;
		//console.log(_data.CunHuoZhouZhuanLv)
		if (_data == null || _data == "null" || 
				(_data.CunHuoZhouZhuanLv == undefined && _data.YingShouZhangKuanZhouZhuanLv == undefined)) {
			$("#companyOperateShuoming").hide();
			$("#companyOperate").hide();
			$("#companyOperate").after(noDataHtml());
			return false;
		}
		
		var flag1 = false; //存货周转率是否有值
		var flag2 = false; //应收账款周转率是否有值
		$(_data.CunHuoZhouZhuanLv).each(function(i, item){
			if(item != null && item != 0){
				flag1 = true;
			}
		})
		
		$(_data.YingShouZhangKuanZhouZhuanLv).each(function(i, item){
			if(item != null && item != 0){
				flag2 = true;
			}
		})
		if(!flag1 && !flag2){ //都没有值隐藏
			$("#companyOperateShuoming").hide();
			$("#companyOperate").hide();
			$("#companyOperate").after(noDataHtml());
		}
		//		console.log(_data);
		//UTIL.sjly("#cwsdfxly", "gsyynlqk", ".cw2", "sjlyy");
		// UTIL.sjly("#cwsdfxly","cwsdfx",".cw3","sjlyy");
		var shuoming = "<p>截止到"+((_data.portTime_tips == null || _data.portTime_tips == "undefined") ? "--" : _data.portTime_tips)+"，" +
			"公司的存货周转天数为" + ((_data.CunHuoZhouZhuanLv_tips == null || _data.CunHuoZhouZhuanLv_tips == "undefined") ? "--" : Number(_data.CunHuoZhouZhuanLv_tips).toFixed(2)) + "天，" +
			"应收账款周转天数为" + ((_data.YingShouZhangKuanZhouZhuanLv_tips == null || _data.YingShouZhangKuanZhouZhuanLv_tips == "undefined") ? "--" : Number(_data.YingShouZhangKuanZhouZhuanLv_tips).toFixed(2)) + "天，" +
			"公司的营运能力表现" + ((_data.rankingName == null || _data.rankingName == "undefined") ? "--" : _data.rankingName) + "。</p>"
		$("#companyOperateShuoming").html(shuoming);
		var width = $(".page").width()*0.9;
		$("#companyOperate").css("width",width);
		var myChart = echarts.init(document.getElementById('companyOperate'));
		var option = {
			legend: {
				show: true,
				data: ['存货周转天数', "应收账款周转天数"],
				top: '5%'
			},
			color: ['#62a6f2', "#feb535"],
			xAxis: {
				show: true,
				type: 'category',
				//data:['2015-11','2015-11','2015-11','2015-11']
				data: _data.portTime
			},
			yAxis: {
				show: true,
				name: '',
				type: 'value'
			},
//			label: {
//				normal: {
//					show: true,
//					position: 'top'
//				}
//			},
			grid: {
				show: true,
				left: '5%',
				right: '5%',
				bottom: '30%'
			},
			tooltip : {
	            trigger: 'axis',
	            formatter:function(params){
	            	//console.log(params)
	            	var divHtml="";
	            	   divHtml+='<div class="sanban_tips">';
	  	    			divHtml+='<div class="sb_tips_content">';
	  	    			divHtml+='<span class="tips_leibie fl yyqk" style="background-color: '+params[0].color+';">'+params[0].seriesName+'</span>';
	  	    			if(params[0].value=="" || params[0].value==null ||params[0].value==undefined){
	  	    				divHtml+='<span class="tips_leibie_num fl">--</span>';
	  	    			}else{
	  	    				divHtml+='<span class="tips_leibie_num fl">'+params[0].value+'</span>';
	  	    			}
	  	    			
	  	    			divHtml+='<div class="clearfix"></div>';
	  	    			divHtml+='</div>';
	  	    			if(params[1]!="" && params[1]!=null && params[1]!=undefined){
	  	    				divHtml+='<div class="sb_tips_content first-content">';
	  	    				divHtml+='<span class="tips_leibie yyqk fl" style="background-color: '+params[1].color+';">'+params[1].seriesName+'</span>';
		  	    			if(params[1].value==null || params[1].value=="" || params[1].value==undefined){
		  	    				divHtml+='<span class="tips_leibie_num fl">--</span>';
		  	    			}else{
		  	    				divHtml+='<span class="tips_leibie_num fl">'+params[1].value+'</span>';
		  	    			}
		  	    			divHtml+='<div class="clearfix"></div>';
	  	    				divHtml+='</div>';
	  	    			}
	  	    			divHtml+='</div>';
	                return divHtml;
	            }
	        },
			dataZoom:[{
				type:'slider',
				show:true,
				start:'0',
				end:'100',
				bottom:'3%'
			}],
			series: [{
				type: 'line',
				name: '存货周转天数',
				symbol: 'circle',
				//data:[10,50,20,83]
				data: _data.CunHuoZhouZhuanLv
			},
			{
				type: 'line',
				name: '应收账款周转天数',
				symbol: 'circle',
				//data:[15,38,40,60]
				data: _data.YingShouZhangKuanZhouZhuanLv
			}]
		};
		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
		//		setScrollTos();
		window.addEventListener("resize", function () {
			myChart.resize();
		});
	});
}


/**
 * 财务深度分析
 */
function findFinanceDepthData() {
	var paramData = { stockCode: stockCodeParam };
	// WF_ajax.findFinanceDepthData(paramData,true,function(_data){
	UTIL.axs(UTIL.CONFIG.findFinanceDepthData, paramData, true, function (result) {
		var _data = result.retData;
		if (_data == null || _data == "null") {
			$("#companyFinancialDepthShuoming").hide();
			$("#companyFinancialDepth1").hide();
			$("#companyFinancialDepth1").after(noDataHtml());
			return false;
		}
		// UTIL.sjly("#cwsdfxly","gsyynlqk",".cw2","sjlyy");
		//UTIL.sjly("#cwsdfxly", "cwsdfx", ".cw3", "sjlyy");
		//		console.log(_data);
		var shuoming = "<p>截止到"+((_data.portTime_tips == null || _data.portTime_tips == "undefined") ? "--" : _data.portTime_tips)+"，公司的利润率水平" + ((_data.M == null || _data.M == "undefined") ? "--" : _data.M) + "，资产负债结构" + ((_data.Z == null || _data.Z == "undefined") ? "--" : _data.Z) + "。</p>"
		$("#companyFinancialDepthShuoming").html(shuoming);
		var width = $(".page").width()*0.9;
		$("#companyFinancialDepth1").css("width",width);
		var myChart = echarts.init(document.getElementById('companyFinancialDepth1'));
		var option = {
			legend: {
				show: true,
				data: ['销售毛利率', "销售净利率"],
				top: '5%'
			},
			color: ['#62a6f2', "#feb535"],
			xAxis: {
				show: true,
				type: 'category',
				//data:['2015-11','2015-11','2015-11','2015-11']
				data: _data.portTime
			},
			yAxis: {
				show: true,
				name: '%',
				type: 'value'
			},
//			label: {
//				normal: {
//					show: true,
//					position: 'top'
//				}
//			},
			grid: {
				show: true,
				left: '5%',
				right: '5%',
				bottom: '30%'
			},
			tooltip : {
	            trigger: 'axis',
	            formatter:function(params){
	            	//console.log(params)
	            	var divHtml="";
	            	   divHtml+='<div class="sanban_tips">';
	  	    			divHtml+='<div class="sb_tips_content">';
	  	    			divHtml+='<span class="tips_leibie fl xsmll" style="background-color: '+params[0].color+';">'+params[0].seriesName+'</span>';
	  	    			if(params[0].value=="" || params[0].value==null || params[0].value==undefined){
	  	    				divHtml+='<span class="tips_leibie_num fl">--</span>';
	  	    			}else{
	  	    				divHtml+='<span class="tips_leibie_num fl">'+params[0].value+'</span>';
	  	    			}
	  	    			
	  	    			divHtml+='<div class="clearfix"></div>';
	  	    			divHtml+='</div>';
	  	    			if(params[1]!="" && params[1]!=null && params[1]!=undefined){
	  	    				divHtml+='<div class="sb_tips_content first-content">';
	  	    				divHtml+='<span class="tips_leibie fl xsmll" style="background-color: '+params[1].color+';">'+params[1].seriesName+'</span>';
		  	    			if(params[1].value==null || params[1].value=="" || params[1].value==undefined){
		  	    				divHtml+='<span class="tips_leibie_num fl">--</span>';
		  	    			}else{
		  	    				divHtml+='<span class="tips_leibie_num fl">'+params[1].value+'</span>';
		  	    			}
		  	    			divHtml+='<div class="clearfix"></div>';
	  	    				divHtml+='</div>';
	  	    			}
	  	    			divHtml+='</div>';
	                return divHtml;
	            }
	        },
			dataZoom:[{
				type:'slider',
				show:true,
				start:'0',
				end:'100',
				bottom:'3%'
			}],
			series: [{
				type: 'line',
				name: '销售毛利率',
				symbol: 'circle',
				//data:[10,50,20,83]
				data: _data.XiaoShouMaoLiLv
			},
			{
				type: 'line',
				name: '销售净利率',
				symbol: 'circle',
				//data:[15,38,40,60]
				data: _data.XiaoShouJingLiRunLv
			}]
		};
		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
		window.addEventListener("resize", function () {
			myChart.resize();
		});
		var width = $(".page").width()*0.9;
		$("#companyFinancialDepth2").css("width",width);
		var myChart_1 = echarts.init(document.getElementById('companyFinancialDepth2'));
		var option_1 = {
			legend: {
				show: true,
				data: ['资产负债率', "净资产收益率(权益报酬率)"],
				top: '5%'
			},
			color: ['#62a6f2', "#feb535"],
			xAxis: {
				show: true,
				type: 'category',
				//data:['2015-11','2015-11','2015-11','2015-11']
				data: _data.portTime
			},
			yAxis: {
				show: true,
				name: '%',
				type: 'value'
			},
//			label: {
//				normal: {
//					show: true,
//					position: 'top'
//				}
//			},
			grid: {
				show: true,
				left: '5%',
				right: '5%',
				bottom: '30%'
			},
			tooltip : {
	            trigger: 'axis',
	            formatter:function(params){
	            	//console.log(params)
	            	var divHtml="";
	            	   divHtml+='<div class="sanban_tips">';
	  	    			divHtml+='<div class="sb_tips_content">';
	  	    			divHtml+='<span class="tips_leibie fl zcfzl" style="background-color: '+params[0].color+';">'+params[0].seriesName+'</span>';
	  	    			if(params[0].value==null || params[0].value=="" || params[0].value==undefined){
	  	    				divHtml+='<span class="tips_leibie_num fl">--</span>';
	  	    			}else{
	  	    				divHtml+='<span class="tips_leibie_num fl">'+params[0].value+'</span>';
	  	    			}
	  	    			
	  	    			divHtml+='<div class="clearfix"></div>';
	  	    			divHtml+='</div>';
	  	    			if(params[1]!="" && params[1]!=null && params[1]!=undefined){
	  	    				divHtml+='<div class="sb_tips_content first-content">';
	  	    				divHtml+='<span class="tips_leibie fl zcfzl" style="background-color: '+params[1].color+';">'+params[1].seriesName+'</span>';
		  	    			if(params[1].value==null || params[1].value=="" || params[1].value==undefined){
		  	    				divHtml+='<span class="tips_leibie_num fl">--</span>';
		  	    			}else{
		  	    				divHtml+='<span class="tips_leibie_num fl">'+params[1].value+'</span>';
		  	    			}
		  	    			divHtml+='<div class="clearfix"></div>';
	  	    				divHtml+='</div>';
	  	    			}
	  	    			divHtml+='</div>';
	                return divHtml;
	            }
	        },
			dataZoom:[{
				type:'slider',
				show:true,
				start:'0',
				end:'100',
				bottom:'3%'
			}],
			series: [{
				type: 'line',
				name: '资产负债率',
				symbol: 'circle',
				//data:[10,50,20,83]
				data: _data.ZiChanFuZhaiLv
			},
			{
				type: 'line',
				name: '净资产收益率(权益报酬率)',
				symbol: 'circle',
				//data:[15,38,40,60]
				data: _data.JingZiChanShouYiLv
			}]
		};
		// 使用刚指定的配置项和数据显示图表。
		myChart_1.setOption(option_1);
		//		setScrollTos();
		window.addEventListener("resize", function () {
			myChart_1.resize();
		});
	});
}


/*
 * 综合模型分析雷达图
 */
function findFinanceModelData() {
	var paramData = { stockCode: stockCodeParam };
	// WF_ajax.findFinanceModelData(paramData,true,function(_data){
	UTIL.axs(UTIL.CONFIG.findFinanceModelData, paramData, true, function (result) {
		var _data = result.retData;
		//		console.log(_data);
		if (_data == null || _data == "null") {
			$("#companyModelAnalysisShuoming").hide();
			$("#companyModelAnalysis").hide();
			$("#companyModelAnalysis").after(noDataHtml());
			return false;
		}
		UTIL.sjly("#zhnlmxfxly", "zhnlmxfx", ".zhnlmxfx", "sjlyy");
		var shuoming = "<p>公司在" + ((_data.max == null || _data.max == "undefined") ? "--" : _data.max) + "方面表现突出，在" + ((_data.min == null || _data.min == "undefined") ? "--" : _data.min) + "上表现差强人意，有待加强，需要额外关注。</p>"
		$("#companyModelAnalysisShuoming").html(shuoming);
		// document.getElementById('companyModelAnalysis').style.width = document.getElementsByClassName('company-content')[0].offsetWidth * 0.8+ 'px';
		document.getElementById('companyModelAnalysis').style.height = document.getElementsByClassName('container')[0].offsetHeight * 0.5 + 'px';
		var myChart=echarts.init(document.getElementById('companyModelAnalysis'));
		var option = {
//			    title: {
//			        text: '基础雷达图'
//			    },
//			    legend: {
//			        data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
//			    },
				color:["#feb535"],
				grid:{
					left:'50%',
					right:'50%'
//					bottom:'30%'
				},
			    radar: {
			        // shape: 'circle',
			        name: {
			            textStyle: {
			                color: '#5c666e',
			                // backgroundColor: '#999',
			                borderRadius: 3,
			                padding: [10, 10]
			           }
			        },
			        center: ['50%', '50%'],
			        radius: 120,
			        indicator: [
			           { name: '盈利性', max: 6},
			           { name: '安全性', max: 6},
			           { name: '利润质量', max: 6},
			           { name: '运营能力', max: 6},
			           { name: '偿债能力', max: 6},
			           { name: '成长性', max: 6}
			        ]
			    },
			    textStyle:{
			    	cololr:'#000'
			    },
			    series: [{
//			        name: '预算 vs 开销（Budget vs spending）',
			        type: 'radar',
			        symbol:'circle',
			        data : [
			            {
//			                value : [4300, 10000, 28000, 35000, 50000, 19000],
			                value : [_data.YingLiXing, _data.AnQuanXing,  _data.LiRunZiLiang, _data.YunYingNengLi,  _data.ChangZhaiNengLi, _data.ChengZhangXing]
			                //name : '预算分配（Allocated Budget）'
			            }
			        ]
			    }]
			};
		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
		//	    setScrollTos();
		window.addEventListener("resize", function () {
			myChart.resize();
		});
	});
}

/**
 * 杜邦分析
 */
function findDubangData() {
	//默认隐藏掉
	$(".yincang_1").hide();
	var paramData = { stockCode: stockCodeParam };
	// WF_ajax.findDubangData(paramData,true,function(_data){
	UTIL.axs(UTIL.CONFIG.findDubangData, paramData, true, function (result) {
		var _data = result.retData;
		// console.log(_data);
		//净资产收益率
		//		$("#JingZiChanShouYiLv_dubang").text(_data.JingZiChanShouYiLv==null?"--":(_data.JingZiChanShouYiLv).toFixed(2)+"%");
		//		$("#ZongZiChanShouYiLv_dubang").text(_data.ZongZiChanShouYiLv==null?"--":(_data.ZongZiChanShouYiLv).toFixed(2)+"%");
		$("#QuanYiChengShu_dubang").text(_data.QuanYiChengShu == null ? "--" : UTIL.fmtNum3((_data.QuanYiChengShu).toFixed(2)));
		//营收利润率
		var XiaoShouJingLiRunLv=((_data.f2JLR)/(_data.f2QZYYSR))*100;
		$("#XiaoShouJingLiRunLv_dubang").text(XiaoShouJingLiRunLv == null ? "--" : UTIL.fmtNum3((XiaoShouJingLiRunLv).toFixed(2)) + "%");
		//$("#XiaoShouJingLiRunLv_dubang").text(_data.XiaoShouJingLiRunLv == null ? "--" : UTIL.fmtNum3((_data.XiaoShouJingLiRunLv).toFixed(2)) + "%");
		//		$("#ZongZiChanZhouZhuanLv_dubang").text(_data.ZongZiChanZhouZhuanLv==null?"--":(_data.ZongZiChanZhouZhuanLv).toFixed(2));
		$("#f2JLR_dubang").text(_data.f2JLR == null ? "--" : UTIL.fmtNum3((_data.f2JLR / 10000.00).toFixed(2)));
		$("#f2YYZSR_dubang_1").text(_data.f2QZYYSR == null ? "--" : UTIL.fmtNum3((_data.f2QZYYSR / 10000.00).toFixed(2)));
		$("#f2YYZSR_dubang_2").text(_data.f2QZYYSR == null ? "--" : UTIL.fmtNum3((_data.f2QZYYSR / 10000.00).toFixed(2)));
		$("#f1ZCZJ_dubang").text(_data.f1ZCZJ == null ? "--" : UTIL.fmtNum3((_data.f1ZCZJ / 10000.00).toFixed(2)));
		//上面的数据需要重新计算
		var ZongZiChanZhouZhuanLv=(_data.f2QZYYSR==null?0:(_data.f2QZYYSR/10000.00))/(_data.f1ZCZJ==null?0:(_data.f1ZCZJ/10000.00));
		$("#ZongZiChanZhouZhuanLv_dubang").text(UTIL.fmtNum3(ZongZiChanZhouZhuanLv.toFixed(2)));
		var ZongZiChanShouYiLv=(XiaoShouJingLiRunLv==null?0:(XiaoShouJingLiRunLv))*ZongZiChanZhouZhuanLv
		$("#ZongZiChanShouYiLv_dubang").text(UTIL.fmtNum3(ZongZiChanShouYiLv.toFixed(2))+"%");
		var JingZiChanShouYiLv=ZongZiChanShouYiLv*(_data.QuanYiChengShu==null?0:(_data.QuanYiChengShu));
		$("#JingZiChanShouYiLv_dubang").text(UTIL.fmtNum3(JingZiChanShouYiLv.toFixed(2))+"%");
		//新增下面层级：如果不是一般类公司不显示下面的成绩
		if (_data.companyType == 1 || _data.companyType == "1") {
			$(".yincang_1").show();

			//净利润下面的数据
			$("#f2YYZSR_dubang_3").text(_data.f2QZYYSR == null ? "--" : UTIL.fmtNum3((_data.f2QZYYSR / 10000.00).toFixed(2)));
			//需要计算:营业成本	＋	销售费用 ＋	管理费用 ＋	财务费用 ＋	营业税金及附加	＋	资产减值损失
			var f2CBFY=(_data.f2QZYYCB==null?0:(_data.f2QZYYCB/10000.00))+
						(_data.f2XSFY==null?0:(_data.f2XSFY/10000.00))+
						(_data.f2GLFY==null?0:(_data.f2GLFY/10000.00))+
						(_data.f2CWFY==null?0:(_data.f2CWFY/10000.00))+
						(_data.f2YYSJJFJ==null?0:(_data.f2YYSJJFJ/10000.00))+
						(_data.f2ZCJZSS==null?0:(_data.f2ZCJZSS/10000.00));
			$("#f2CBFY_dubang").text(UTIL.fmtNum3(f2CBFY.toFixed(2)));
			$("#f2TZSY_dubang").text(_data.f2TZSY == null ? "--" : UTIL.fmtNum3((_data.f2TZSY / 10000.00).toFixed(2)));
			$("#f2JGYJZBDSY_dubang").text(_data.f2JGYJZBDSY == null ? "--" : UTIL.fmtNum3((_data.f2JGYJZBDSY / 10000.00).toFixed(2)));

			//需要计算:营业外收入 - 营业外支出
			var f2YWWSZJE=(_data.f2YYWSR==null?0:(_data.f2YYWSR/10000.00))-(_data.f2YYWZC==null?0:(_data.f2YYWZC/10000.00));
			$("#f2YWWSZJE_dubang").text(UTIL.fmtNum3(f2YWWSZJE.toFixed(2)));

			$("#f2JSDSFY_dubang").text(_data.f2JSDSFY == null ? "--" : UTIL.fmtNum3((_data.f2JSDSFY / 10000.00).toFixed(2)));

			//成本费用下面的数据
			$("#f2QZYYCB_dubang").text(_data.f2QZYYCB == null ? "--" : UTIL.fmtNum3((_data.f2QZYYCB / 10000.00).toFixed(2)));
			$("#f2GLFY_dubang").text(_data.f2GLFY == null ? "--" : UTIL.fmtNum3((_data.f2GLFY / 10000.00).toFixed(2)));
			$("#f2YYSJJFJ_dubang").text(_data.f2YYSJJFJ == null ? "--" : UTIL.fmtNum3((_data.f2YYSJJFJ / 10000.00).toFixed(2)));
			$("#f2XSFY_dubang_3").text(_data.f2XSFY == null ? "--" : UTIL.fmtNum3((_data.f2XSFY / 10000.00).toFixed(2)));
			$("#f2CWFY_dubang").text(_data.f2CWFY == null ? "--" : UTIL.fmtNum3((_data.f2CWFY / 10000.00).toFixed(2)));
			$("#f2ZCJZSS_dubang").text(_data.f2ZCJZSS == null ? "--" : UTIL.fmtNum3((_data.f2ZCJZSS / 10000.00).toFixed(2)));

			//总资产下面的数据
			$("#f1LDZCHJ_dubang").text(_data.f1LDZCHJ == null ? "--" : UTIL.fmtNum3((_data.f1LDZCHJ / 10000.00).toFixed(2)));
			$("#f1FLDZCHJ_dubang").text(_data.f1FLDZCHJ == null ? "--" : UTIL.fmtNum3((_data.f1FLDZCHJ / 10000.00).toFixed(2)));

			//流动资产下面的数据
			$("#f1HBZJ_dubang").text(_data.f1HBZJ == null ? "--" : UTIL.fmtNum3((_data.f1HBZJ / 10000.00).toFixed(2)));
			$("#f1YFKX_dubang").text(_data.f1YFKX == null ? "--" : UTIL.fmtNum3((_data.f1YFKX / 10000.00).toFixed(2)));
			$("#f1YSZK_dubang").text(_data.f1YSZK == null ? "--" : UTIL.fmtNum3((_data.f1YSZK / 10000.00).toFixed(2)));
			$("#f1CH_dubang").text(_data.f1CH == null ? "--" : UTIL.fmtNum3((_data.f1CH / 10000.00).toFixed(2)));
			//需要计算：流动资产 - 货币资金	-	预付款项	-	应收账款 - 存货

			var f1QTLDZC=(_data.f1LDZCHJ==null?0:(_data.f1LDZCHJ/10000.00))-
							(_data.f1HBZJ==null?0:(_data.f1HBZJ/10000.00))-
							(_data.f1YFKX==null?0:(_data.f1YFKX/10000.00))-
							(_data.f1YSZK==null?0:(_data.f1YSZK/10000.00))-
							(_data.f1CH==null?0:(_data.f1CH/10000.00));

			$("#f1QTLDZC_dubang").text(UTIL.fmtNum3(f1QTLDZC.toFixed(2)));

			//非流动资产下面的数据
			//流动资产下面的数据
			$("#f1GDZC_dubang").text(_data.f1GDZC == null ? "--" : UTIL.fmtNum3((_data.f1GDZC / 10000.00).toFixed(2)));
			$("#f1WXZC_dubang").text(_data.f1WXZC == null ? "--" : UTIL.fmtNum3((_data.f1WXZC / 10000.00).toFixed(2)));
			$("#f1CQGQTZ_dubang").text(_data.f1CQGQTZ == null ? "--" : UTIL.fmtNum3((_data.f1CQGQTZ / 10000.00).toFixed(2)));
			//需要计算：流动资产 - 货币资金	-	预付款项	-	应收账款 - 存货

			var f1QTFLDZC=(_data.f1FLDZCHJ==null?0:(_data.f1FLDZCHJ/10000.00))-
							(_data.f1GDZC==null?0:(_data.f1GDZC/10000.00))-
							(_data.f1WXZC==null?0:(_data.f1WXZC/10000.00))-
							(_data.f1CQGQTZ==null?0:(_data.f1CQGQTZ/10000.00));

			$("#f1QTFLDZC_dubang").text(UTIL.fmtNum3(f1QTFLDZC.toFixed(2)));
		}
		UTIL.sjly("#dbfxfly", "dbfxf", ".dbfxf", "sjlyy");
		//		$("#f2JLR_dubang").text(_data.f2JLR==null?"--":(_data.f2JLR).toFixed(2)+"");
		//		$("#f2YYZSR_dubang_1").text(_data.f2YYZSR==null?"--":(_data.f2YYZSR).toFixed(2)+"");
		//		$("#f2YYZSR_dubang_2").text(_data.f2YYZSR==null?"--":(_data.f2YYZSR).toFixed(2)+"");
		//		$("#f1ZCZJ_dubang").text(_data.f1ZCZJ==null?"--":(_data.f1ZCZJ).toFixed(2)+"");
		//		setScrollTos();


	});
}

$(function () {
	var windowHeight = $(window).height()
	$(".company-analysis .container").height(windowHeight - 195);
	$(".company-main").height(windowHeight - 280)
})

function noDataHtml() {
	return '<div class="noDatas">暂无数据</div>';
}

