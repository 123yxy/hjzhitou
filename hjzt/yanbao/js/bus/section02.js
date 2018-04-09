var stockCode = "" || UTIL.getPara("stockCode");
var stockName = decodeURI(UTIL.getPara("stockName"));
var dataTime='';
var datas={};
var lbDatas=[];
var tbList;
var lbList;
$(function () {
	//点击上下游关系的tab切换
//	$(".sxyfx .tab-list span").on("click", function () {
//		if ($(this).hasClass("on")) {
//			//			$(this).removeClass("on").siblings().addClass("on");
//			return false;
//		} else {
//			$(this).addClass("on").siblings().removeClass("on");
//			if ($(this).text() == "图表") {
//				$(".gxtul").show();
//				$(".gx-tb").show();
//				$(".gx-table").hide();
//			} else {
//				$(".gxtul").hide();
//				$(".gx-tb").hide();
//				$(".gx-table").show();
//			}
//		}
//
//	})

	

})

function industryRemark() {
	var dataM = {
		stockCode: stockCode
	};
	WF_ajax.industryRemark(dataM, true, function (data) {
		if (data == "" || data == null || data == undefined) {
			$("#industryRemark").text("--");
		} else {
			$("#industryRemark").text(isStrKong(data.remark));
		}
	})
}

/**
 * 查询主营业务收入
 */
function findNewYW2(isPay) {
	//主要产品和服务
	var dataM = {stockCode: stockCode};
	WF_ajax.mainbusiness(dataM, true, function (data) {
		if (data == "" || data == null || data == undefined) {
			$("#mainbusiness").text("--");
		} else {
			$("#mainbusiness").text(isStrKong(data.mainBusiness));
		}
	});
	var isPay=isPay;
	var dataParam={stockCode: stockCode,isPay : isPay};
	//WF_ajax.findAllMainBusiness(dataParam,true,function(data){
	WF_ajax.findAllMainBusinessPay(dataParam,false,function(data){
		if(data=="" || data==null || data==undefined){
			
		}else{
			dataTime=data.timeList;
			tbList=data.tbList;
			var li='';
			$("#timeLists").html("");
			if(dataTime!="" && dataTime!=null && dataTime!=undefined){
				$("#nowDate").html(dataTime[0])
				$(dataTime).each(function(index,item){
					li+='<li data-time="'+item+'">'+item+'</li>'
				})
				$("#timeLists").html(li);
				$("#timeLists").find("li").eq(0).addClass("on");
			}
			//所有的数据
			lbList=data.lbList;
			$("#businessTBody").html("");
			var tr='';
			var moRen='';
			var total=0;
			var percenter=0;
			if(lbList!="" && lbList!=null && lbList!=undefined){
				$(lbList).each(function(index,item){
					datas[item.time]=item.data;
					if(index==0){
						moRen=item.data;
					}
				});
				//console.log(datas)
				$(moRen).each(function(k,v){
					tr+='<tr>';
					tr+='<td><span>'+ v.mainBusinessSituation +'</span></td>';
					tr+='<td class="shuzi">'+ (isSZKong(v.amountMoney) == "-" ? "-" : UTIL.fmtNum3((v.amountMoney/10000).toFixed(2))) +'</td>';
					tr+='<td class="shuzi">'+ v.proportion +'</td>';
					tr+='</tr>';
					if(v.amountMoney=="--"){
						v.amountMoney=0;
					}
					total+=v.amountMoney;
					if(v.proportion=="--"){
						v.proportion=0;
					}
					percenter+=v.proportion;
				});
				
					var jinEr=UTIL.fmtNum3((total/10000).toFixed(2));
					var zhanBi=percenter.toFixed(2);
//					console.log(total)
//					console.log(percenter)
					tr+='<tr class="heji"><td>合计</td><td class="shuzi">'+jinEr+'</td><td>'+zhanBi+'</td></tr>';
					$("#businessTBody").html(tr);
			}
		}
	})
	
	$(".zycpzyyw .tab-list span").on("click", function () {
		if ($(this).hasClass("on")) {
			return false;
		} else {
			$(this).addClass("on").siblings().removeClass("on");
			if ($(this).text() == "图表") {//饼图
				//console.log(tbList)
				initpie(tbList);
				$(".zhongd-sj").removeAttr("style");
				$(".zycpzyyw .echarts-tb").show();
				$(".zycpzyyw .caiwu-table").hide();
				$("#dataList").hide();
			} else {
				$(".zycpzyyw .echarts-tb").hide();
				$(".zycpzyyw .caiwu-table").show();
				payOrNot();
				if(payOrNot()==true){//已付费
					$("#dataList").show();
				}else if(payOrNot()==false || payOrNot()==undefined){//未付款
					$("#dataList").hide();
				}
				
			}
		}
	})
	var initpie = function (data) {
		if(data=="" || data==null || data==undefined){
			$(".zhongd-sj").html(UTIL.oplugins._nodata())
		}else{
			var div='';
			$(".zhongd-sj").html("");
			for(var i=0;i<data.length;i++){
				div+='<div class="echarts-tb" id="pie_' + i +'"></div>';
			}
			$(".zhongd-sj").append(div);
			$(".zhongd-sj").append("<div class='clearfix'></div>");
			
			//画饼图
			var biaoji;
			
			if(data.length==1){
				biaoji=0;//只有一个饼图的
				$(data).each(function(index,item){
					pieChart(dataTime[index],item,"pie_"+index,biaoji);
				})
			}else{
				biaoji=1;//有多个饼图
				$(data).each(function(index,item){
					pieChart(dataTime[index],item,"pie_"+index,biaoji);
				})
			}
			
			
		}
		//console.log(data)
//		getdata(function (_getdata) {
//			//console.log(_getdata)
//			if (_getdata === "") {
//				$(".zhongd-sj").html(UTIL.oplugins._nodata())
//			}
//			else {
				
//				for (i in _getdata) {
//					if(_getdata[i] === null)
//						continue;
//					var reporttime = _getdata[i].reportTime;
//					var Data = _getdata[i].oldData;
//					if (i === "oldData" && i !== null) {
//						pieChart(reporttime, Data, "zycpzyyw_chart_curr")
//					}
//					else {
//						pieChart(reporttime, Data, "zycpzyyw_chart_pre")
//					}
//				}
//			}
//		});

	}
	
	
	/**方法名称 2.1.2主营业务收入饼图
	 * 作	者 shiqi
	 * 时	间 2017/10/19
	 * 接口提供 腾龙
	 * 版	本 1.0
	 * 更	新 
	 */
	var pieChart = function (reporttime, dataList, id,biaoji) {
		var biaoji=biaoji;
		if(biaoji==0){
			var width=$(".zhongd-sj").width()-100;
	//		console.log(width)
			document.getElementById(id).style.width=(width)+"px";
		}else if(biaoji==1){
			var width=$(".zhongd-sj").width();
	//		console.log(width)
			document.getElementById(id).style.width=((width/2.4))+"px";
		}
		
		// 使用刚指定的配置项和数据显示图表。
		//var myChart = echarts.init(document.getElementById(id));
		
		//	console.log(dataList)
		var option = {
			title: {
				text: reporttime,
				textStyle: {
					color: "#666",
					fontSize: 14,
					fontWeight: "normal"
				},
				x: 'center'
			},
			//	        legend:{
			//	        	show:true,
			//	        	data:["中科软"]
			//	        },
			//以下颜色与十大股东一致
			color: ["#248ce6", "#64a4f2", "#41ccdc", "#41dc8e", "#dcda41", "#feb535", "#f8926d", "#f36c77", "#d967dd", "#9675da"],
			tooltip: {
				trigger: 'item',
				formatter: function (params) {
					var val=UTIL.fmtNum3((Number(params.data.value)/10000).toFixed(2));
					return params.data.name +'<br/>' + val + "万元("+params.percent+" %)";
				}
			},
			calculable: true,
			series: [
				{
					type: 'pie',
					radius: '50%',
					center: ['50%', '60%'],
					data: dataList,
					label: {
						normal: {
							show: true,
							formatter: function (params) {
//								console.log(params)
								var names = params.data.name;
								return params.percent + "%\r\n" + names;
							}
						}
					}
				}
			]
		};
//		// 使用刚指定的配置项和数据显示图表。
		var myChart = echarts.init(document.getElementById(id));
		myChart.setOption(option);
		window.addEventListener("resize", function () {
			myChart.resize();
		});
	}

}

function select(){
	$("#timeLists").on("click","li",function(){
		var time=$(this).text();
		$("#nowDate").html(time);
		//console.log(time)
		var selectDateTime;
		if(lbList!="" && lbList!=null && lbList!=undefined){
			$(lbList).each(function(index,item){
				datas[item.time]=item.data;
				selectDateTime=item.data;
				if(time==item.time){
					var tr;
					var totals=0;
					var percenters=0;
					$("#businessTBody").html("");
					$(item.data).each(function(k,v){
						//console.log(v)
						tr+='<tr>';
						tr+='<td><span>'+ v.mainBusinessSituation +'</span></td>';
						tr+='<td>'+ (isSZKong(v.amountMoney) == "-" ? "-" : UTIL.fmtNum3((v.amountMoney/10000).toFixed(2))) +'</td>';
						tr+='<td>'+ v.proportion +'</td>';
						tr+='</tr>';
						if(v.amountMoney=="--"){
							v.amountMoney=0;
						}
						totals+=v.amountMoney;
						if(v.proportion=="--"){
							v.proportion=0;
						}
						percenters+=v.proportion;
					});
					//console.log(totals)
					var jinEr=UTIL.fmtNum3((parseInt(totals)/10000).toFixed(2));
					var zhanBi=percenters.toFixed(2);
//					console.log(total)
//					console.log(percenter)
					tr+='<tr class="heji"><td>合计</td><td>'+jinEr+'</td><td>'+zhanBi+'</td></tr>';
					$("#businessTBody").html(tr);
				}
			});

		}
	})
	
}
//展示主营业务的列表
function findAllMainBusiness(data){
	$("#businessTBody").html("");
	var tr='';
	var total=0;
	var percenter=0;
	$(data).each(function(index,item){
		tr+='<tr>';
		tr+='<td><span>'+ isStrKong(item.mainBusinessSituation) +'</span></td>';
		tr+='<td>'+ (isSZKong(item.amountMoney) == "-" ? "-" : UTIL.fmtNum3((item.amountMoney/10000).toFixed(2))) +'</td>';
		tr+='<td>'+ isStrKong(item.proportion) +'</td>';
		tr+='</tr>';
		if(item.amountMoney=="--"){
			item.amountMoney=0;
		}
		total+=item.amountMoney;
		if(item.proportion=="--"){
			item.proportion=0;
		}
		percenter+=item.proportion;
	});
	var jinEr=UTIL.fmtNum3((total/10000).toFixed(2));
	var zhanBi=percenter.toFixed(2);
//	console.log(total)
//	console.log(percenter)
	tr+='<tr class="heji"><td>合计</td><td>'+jinEr+'</td><td>'+zhanBi+'</td></tr>';
	$("#businessTBody").html(tr);
}


/**
 * 查询商业模式和未来规划 20170928 shiqi
 */
function findACMsg() {
	WF_ajax.findACMsg(true, {
		stockCode: stockCode
	}, function (data) {
		if (data.retCode == "0000") {
			//console.log(data)
			if (data.retData.actualControllerMsg != null && data.retData.actualControllerMsg.length > 0){
				$("#SYMS").html(isStrKong(data.retData.businessModel));
				UTIL.sjly("#symsly","syms",".syms","sjlyy");
			}
			else
				$("#SYMS").html("<div class='noDatas'>暂无数据</div>");
			if (data.retData.futurePlanning != null && data.retData.futurePlanning.length > 0){
				$("#WLGH").html(isStrKong(data.retData.futurePlanning));
				UTIL.sjly("#symsly","wlgh",".wlgh","sjlyy");
			}
			else
				$("#WLGH").html("<div class='noDatas'>暂无数据</div>");

		}
	})
}

/**
 * 查询供应商和客户
 */
function findSC() {
	WF_ajax.findSC(true, {
		stockCode: stockCode
	}, function (data) {
		console.log(data)
		findResourceRelation(data); //上下游图
		UTIL.sjly("#sxyfxly","sxyfx",".sxyfx","sjlyy");
		if (data.retCode == "0000") {
			var result = data.retData;

			var khHtml = "";
			if (result.oc != null && result.oc.length > 0) { //主要客户
				$(result.oc).each(function (i, item) {
					khHtml += "<tr>" +
						"<td>" + isStrKong(item.customerName) + "</td>" +
						"<td class='shuzi'>" + (isSZKong(item.salesAmount) == "-" ? "-" : UTIL.fmtNum3(((isSZKong(item.salesAmount) / 10000).toFixed(2)))) + "</td>" +
						"<td class='shuzi'>" + (isSZKong(item.operatingIncome) == "-" ? "-" : (isSZKong(item.operatingIncome).toFixed(2) + "%")) + "</td>" +
						"</tr>";
				})

				$("#sxyKHTBody").html(khHtml);
				// UTIL.sjly("#sxyfxly","sxyfx",".sxyfx","sjlyy");
			} else {
				$("#sxyKHTBody").html("<tr><td colspan='3' ><div class='noDatas'>暂无数据</div></td></tr>");
			}

			var gysHtml = "";
			if (result.ms != null && result.ms.length > 0) { //主要供应商
				$(result.ms).each(function (i, item) {
					gysHtml += "<tr>" +
						"<td>" + isStrKong(item.gysName) + "</td>" +
						"<td class='shuzi'>" + (isSZKong(item.purchaseAmount) == "-" ? "-" : (UTIL.fmtNum3((isSZKong(item.purchaseAmount)).toFixed(2)))) + "</td>" +
						"<td class='shuzi'>" + (isSZKong(item.percentagePurchase) == "-" ? "-" : (isSZKong(item.percentagePurchase).toFixed(2) + "%")) + "</td>" +
						"</tr>";
				})
				
				$("#sxyGYSTBody").html(gysHtml);
				
				// UTIL.sjly("#sxyfxly","sxyfx",".sxyfx","sjlyy");
			} else {
				$("#sxyGYSTBody").html("<tr><td colspan='3'><p><div class='noDatas'>暂无数据</div></p></td></tr>");
			}
		}
	})
}

/**
 * 获取上下游数据
 */
function findResourceRelation(data) {
	//	WF_ajax.findResourceRelation(true,{stockCode:stockCode},function(data){
	if (data.retCode == "0000") {
		var result = data.retData;
		if (result == null || result == "" || result == undefined) {
			return false;
		}

		var customer = result.oc; //主要客户
		var suppliers = result.ms; //主要供应商
		//上下游关系换图--球球图
		//			shangxiayouD3(customer,suppliers);
		//无数据显示的东西
		if ((customer == null || customer.length == 0) && (suppliers == null || suppliers.length == 0)) {
			//				$("#graph_panel").attr("style","height:100px;");
			$("#main").html('<div class="noDatas noDatas-s1">暂无数据</div>');
			$(".tuli-content").hide();
			return false;
		}
		$(".tuli-content").show();
		//上下游关系新图
		var datas = new Array();
		//			{name: '天阳科技(835713)'}
		var centerTitle = {};
		centerTitle.name = stockName + "(" + stockCode + ")";
		datas.push(centerTitle);
		//主要供应商
		for (var i = 0; i < suppliers.length; i++) {
			//				console.log(customer[i]);
			var obj = {};
			//obj.investor+"(持股:"+obj.proportion+"%)";
			obj.name = isStrKong(suppliers[i].gysName);
			obj.edgeText = "金额比例:" + isSZKong(suppliers[i].percentagePurchase) + "%";
			obj.cusType = "mx";
			datas.push(obj);
		}
		//=============数据分隔符============
		//主要客户
		for (var i = 0; i < customer.length; i++) {
			//				console.log(suppliers[i]);
			var obj = {};
			//"(参控股:"+obj.shareholdingRatio+"%)"+obj.subCompanyName;
			obj.name = isStrKong(customer[i].customerName);
			obj.edgeText = "金额比例:" + isSZKong(customer[i].operatingIncome) + "%";
			obj.cusType = "mg";
			datas.push(obj);
		}
		// $("#main").remove();
		// $(".gxtul").after("<div class='gx-tb' id='main' ></div>");
		if (!datas.length) {
			//console.log("aaaa");
		}
		createBootStrapChart(datas, "main");
		//			setScrollTos();
	} else {
		errorAlert(data.retCode, data.retMsg);
	}
	//	})
}

//上下游分析文案
function findSCInfo(){
	var params={stockCode:stockCode};
	UTIL.axs(UTIL.CONFIG.findSCInfo,params,false,function(data){
		//console.log(data);
		if(data.retCode=="0000"){
			var result=data.retData;
			if(result!="" && result!=null &&　result!=undefined){
				var ms=result.ms;
				var oc=result.oc;
				$("#graphTips").html(ms + ";" + oc);
			}
		}
	})
}


/**
 * 查询竞争对手
 */
function findJZDS() {
	WF_ajax.findJZDS(true, {
		stockCode: stockCode
	}, function (data) {
		if (data.retCode == "0000") {
			var result = data.retData;
			//console.log(result)
			var JZDSHtml = ""; //表格的内容
			if (result != null && result.length > 0) {
				$("#hy_type").html("(所属行业：" + result[0].industryName + ")");
				$(result).each(function (i, item) {
					JZDSHtml += "<tr>";
					if(stockName==item.stockName){
						JZDSHtml += "<td><span class='duibiao now-company' data-code='"+item.stockCode+"'>" + isStrKong(item.stockName) + "<span></td>";
					}else{
						JZDSHtml += "<td><span class='duibiao' data-code='"+item.stockCode+"'>" + isStrKong(item.stockName) + "<span></td>";
					}
					JZDSHtml += "<td class='shuzi'>" + (isSZKong(item.YYSR) == "-" ? isSZKong(item.YYSR) : UTIL.fmtNum3(isSZKong(item.YYSR).toFixed(2))) + "</td>";
					JZDSHtml += "<td class='shuzi'>" + (isSZKong(item.JLR) == "-" ? isSZKong(item.JLR) : UTIL.fmtNum3(isSZKong(item.JLR).toFixed(2))) + "</td>";
					JZDSHtml += "<td class='shuzi'>" + (isSZKong(item.ZCFZL) == "-" ? isSZKong(item.ZCFZL) : UTIL.fmtNum3(isSZKong(item.ZCFZL).toFixed(2))) + "</td>";
					JZDSHtml += "<td class='shuzi'>" + (isSZKong(item.ROE) == "-" ? isSZKong(item.ROE) : UTIL.fmtNum3(isSZKong(item.ROE).toFixed(2))) + "</td>";
						//"<td class='shuzi'>（"+isStrKong(item.industryName)+"）</td>" +
					JZDSHtml += "</tr>";
				})

				$("#sicDNTBody").html(JZDSHtml);
				UTIL.sjly("#zyjzdsly","zyjzds",".zyjzds","sjlyy");
			} else {
				$("#sicDNTBody").html(JZDSHtml + "<tr><td colspan='6' ><div class='noDatas'>暂无数据</div></td></tr>");
			}
		}
	})

}
$(function () {
	var windowHeight = $(window).height()
	$(".company-business .container").height(windowHeight - 195);
	$(".contents").height(windowHeight - 280)

	
})

/**
 * 引	用：jyqkyw.html
 * 创建日期：
 * 修	改：shiqi
 * 修改日期：20171020
 * 版	本：v2.0
 */
function businessIncome() {
	var params = {
		stockCode: stockCode
	}, n = false;
	UTIL.axs(UTIL.CONFIG.findBusinessIncome, params, false, function (data) {
		//console.log(data);
		if (data.retCode == "0000") {
			if (data.retData != null && data.retData != "" && data.retData != undefined) {
				var result = data.retData;
				//WF_ajax.findBusinessIncome(params,true,function(data){
				//$("#businessIncomeShowName").html("2.2.1"+data.REVZengZhangLv_showName);
				var dateList = result.portTime;
				var yingyeDataList = result.f2QZYYSR; //营业收入
				var REVZengZhangLvList = result.REVZengZhangLv; //增长率
				// 使用刚指定的配置项和数据显示图表。
				var end=(4/result.portTime.length)*100;
				var option = {
					color: [
						"#62a6f2", "#feb535"
					],
					calculable: true,
					legend: {
						show: true,
						data: ["营业收入", '增长率']
					},
					 tooltip : {
			            trigger: 'axis',
			            formatter:function(params){
			            	//console.log(params)
			            	var divHtml="";
			            	   divHtml+='<div class="sanban_tips">';
			  	    			divHtml+='<div class="sb_tips_content">';
			  	    			
			  	    			divHtml+='<span class="tips_leibie fl yysrhzzl" style="background-color: #1985e2;">'+params[0].seriesName+'</span>';
			  	    			if(params[0].value==null || params[0].value==undefined || params[0].value==""){
			  	    				divHtml+='<span class="tips_leibie_num fl">--</span>';
			  	    			}else{
			  	    				divHtml+='<span class="tips_leibie_num fl">'+params[0].value+'</span>';
			  	    			}
			  	    			divHtml+='<div class="clearfix"></div>';
			  	    			divHtml+='</div>';
			  	    			if(params[1]!="" && params[1]!=null && params[1]!=undefined){
			  	    				divHtml+='<div class="sb_tips_content first-content">';
				  	    			divHtml+='<span class="tips_leibie fl yysrhzzl" style="background-color: #fcc530;">'+params[1].seriesName+'</span>';
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
						right: '10%',
						left: '10%',
						bottom: '30%'
					},
					xAxis: {
						type: 'category',
						data: dateList //['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
					},
//					label: {
//						normal: {
//							show: true,
//							position: 'top'
//						}
//					},
					dataZoom: {
						type: 'slider',
						show: true,
						start: '0',
						end: end,
						bottom: '3%',
						zoomLock:true
					},
					yAxis: [{
						type: 'value',
						name: "单位：万元",
						axisLabel: {
							show: true,
							formatter: "{value}"
						}
					},
					{
						type: 'value',
						name: "单位：%",
						splitLine: {
							show: false
						}
						//              min:0,
						//              max:100,
						//              axisLabel:{
						//              	show:true,
						//              	formatter:"{value}"
						//              }
					}
					],
					series: [{
						name: '营业收入',
						type: 'bar',
						yAxisIndex: 0,
						barMaxWidth: '30',
						data: yingyeDataList //[2.6, 5.9, 80.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
					},
					{
						name: '增长率',
						type: 'line',
						yAxisIndex: 1,
						symbol: "circle",
						data: REVZengZhangLvList, //[51, 20, 56, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
						axisLine: {
							show: false
						}
					}
					]
				};
				var myChart = echarts.init(document.getElementById('businessIncome'));
				myChart.setOption(option);
				window.addEventListener("resize", function () {
					myChart.resize();
				});
				n = true;
			} else {
				$("#businessIncome").html('<div class="noDatas">暂无数据</div>');
				$("#businessIncome").height('auto');
				n = false; //新增 无数据项返回
			}

		}

	})
	if (n)
		return true;
	else
		return false;
}
/**
 * 引	用：jyqkyw.html
 * 创建日期：
 * 修	改：shiqi
 * 修改日期：20171020
 * 版	本：v2.0
 */
function findTotalProfit(_callback) {
	var params = {
		stockCode: stockCode
	}, n = false;
	//WF_ajax.findTotalProfit(params,true,function(data){
	UTIL.axs(UTIL.CONFIG.findTotalProfit, params, false, function (data) {
		//console.log(data);
		if (data.retCode == "0000") {
			if (data.retData != null && data.retData != "" && data.retData != undefined) {
				var result = data.retData;

				//$("#businessIncomeShowName").html("2.2.1"+data.LiRunZongEZengZhangLv_showName);
				var dateList = result.portTime;
				var yingyeDataList = result.f2LRZE; //营业收入
				var REVZengZhangLvList = result.LiRunZongEZengZhangLv; //增长率
				var end=(4/dateList.length)*100;
				// 使用刚指定的配置项和数据显示图表。
				var myChart = echarts.init(document.getElementById('totalProfit'));
				var option = {
					color: [
						"#62a6f2", "#feb535"
					],
					calculable: true,
					legend: {
						show: true,
						data: ["利润总额", '增长率']
					},
					tooltip : {
			            trigger: 'axis',
			            formatter:function(params){
			            	//console.log(params)
			            	var divHtml="";
			            	   divHtml+='<div class="sanban_tips">';
			  	    			divHtml+='<div class="sb_tips_content">';
			  	    			divHtml+='<span class="tips_leibie fl yysrhzzl" style="background-color: #1985e2;">'+params[0].seriesName+'</span>';
			  	    			if(params[0].value==null || params[0].value=="" || params[0].value==undefined){
			  	    				divHtml+='<span class="tips_leibie_num fl">--</span>';
			  	    			}else{
			  	    				divHtml+='<span class="tips_leibie_num fl">'+params[0].value+'</span>';
			  	    			}
			  	    			
			  	    			divHtml+='<div class="clearfix"></div>';
			  	    			divHtml+='</div>';
			  	    			if(params[1]!="" && params[1]!=null && params[1]!=undefined){
			  	    				divHtml+='<div class="sb_tips_content first-content">';
				  	    			divHtml+='<span class="tips_leibie fl yysrhzzl" style="background-color: #fcc530;">'+params[1].seriesName+'</span>';
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
						right: '10%',
						left: '10%',
						bottom: '30%'
					},
					dataZoom: {
						type: 'slider',
						show: true,
						start: '0',
						end: end,
						bottom: '3%',
						zoomLock:true
					},
					xAxis: {
						type: 'category',
						data: dateList //['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
					},
//					label: {
//						normal: {
//							show: true,
//							position: 'top'
//						}
//					},
					yAxis: [{
						type: 'value',
						name: "单位：万元",
						axisLabel: {
							show: true,
							formatter: "{value}"
						}
					},
					{
						type: 'value',
						name: "单位：%",
						splitLine: {
							show: false
						}
						//              min:0,
						//              max:100,
						//              axisLabel:{
						//              	show:true,
						//              	formatter:"{value}"
						//              }
					}
					],
					series: [{
						name: '利润总额',
						type: 'bar',
						yAxisIndex: 0,
						barMaxWidth: '30',
						data: yingyeDataList //[2.6, 5.9, 80.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
					},
					{
						name: '增长率',
						type: 'line',
						yAxisIndex: 1,
						//              barMaxWidth:'30',
						symbol: "circle",
						data: REVZengZhangLvList, //[51, 20, 56, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
						axisLine: {
							show: false
						}
					}
					]
				};

				myChart.setOption(option);
				window.addEventListener("resize", function () {
					myChart.resize();
				});
				n = true;
			} else {
				$("#totalProfit").html('<div class="noDatas">暂无数据</div>');
				$("#totalProfit").height('auto')
				n = false;
			}


		}
	})
	if (n)
		return true;
	else
		return false;
}
/**
 * 引	用：jyqkyw.html
 * 创建日期：
 * 修	改：shiqi
 * 修改日期：20171020
 * 版	本：v2.0
 */
function findNetProfit(_callback) {
	var params = {
		stockCode: stockCode
	},n=false;
	//WF_ajax.findNetProfit(params,true,function(data){
	UTIL.axs(UTIL.CONFIG.findNetProfit, params, false, function (data) {
		//console.log(data);
		if (data.retCode == "0000") {
			if (data.retData != null && data.retData != "" && data.retData != undefined) {
				var result = data.retData;
				//$("#businessIncomeShowName").html("2.2.1"+data.JingLiRunZengZhangLv_showName);
				var dateList = result.portTime;
				var yingyeDataList = result.f2JLR; //营业收入
				var REVZengZhangLvList = result.JingLiRunZengZhangLv; //增长率
				var end=(4/dateList.length)*100;
				// 使用刚指定的配置项和数据显示图表。
				var myChart = echarts.init(document.getElementById('netProfit'));
				var option = {
					color: [
						"#62a6f2", "#feb535"
					],
					calculable: true,
					legend: {
						show: true,
						data: ["净利润", '增长率']
					},
					tooltip : {
			            trigger: 'axis',
			            formatter:function(params){
			            	//console.log(params)
			            	var divHtml="";
			            	   divHtml+='<div class="sanban_tips">';
			  	    			divHtml+='<div class="sb_tips_content">';
			  	    			divHtml+='<span class="tips_leibie fl jlrhzzl" style="background-color: #1985e2;">'+params[0].seriesName+'</span>';
			  	    			if(params[0].value==null ||params[0].value=="" || params[0].value==undefined){
			  	    				divHtml+='<span class="tips_leibie_num fl jlrhzzl">--</span>';
			  	    			}else{
			  	    				divHtml+='<span class="tips_leibie_num fl jlrhzzl">'+params[0].value+'</span>';
			  	    			}
			  	    			divHtml+='<div class="clearfix"></div>';
			  	    			divHtml+='</div>';
			  	    			if(params[1]!="" && params[1]!=null && params[1]!=undefined){
			  	    				divHtml+='<div class="sb_tips_content first-content">';
				  	    			divHtml+='<span class="tips_leibie fl jlrhzzl" style="background-color: #fcc530;">'+params[1].seriesName+'</span>';
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
						right: '10%',
						left: '10%',
						bottom: '30%'
					},
					xAxis: {
						type: 'category',
						data: dateList //['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
					},
//					label: {
//						normal: {
//							show: true,
//							position: 'top'
//						}
//					},
					dataZoom: {
						type: 'slider',
						show: true,
						start: '0',
						end: end,
						bottom: '3%',
						zoomLock:true
					},
					yAxis: [{
						type: 'value',
						name: "单位：万元",
						axisLabel: {
							show: true,
							formatter: "{value}"
						}
					},
					{
						type: 'value',
						name: "单位：%",
						splitLine: {
							show: false
						}
						//              min:0,
						//              max:100,
						//              axisLabel:{
						//              	show:true,
						//              	formatter:"{value}"
						//              }
					}
					],
					series: [{
						name: '净利润',
						type: 'bar',
						yAxisIndex: 0,
						barMaxWidth: '30',
						data: yingyeDataList //[2.6, 5.9, 80.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
					},
					{
						name: '增长率',
						type: 'line',
						yAxisIndex: 1,
						//              barMaxWidth:'30',
						symbol: "circle",
						data: REVZengZhangLvList, //[51, 20, 56, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
						axisLine: {
							show: false
						}
					}
					]
				};

				myChart.setOption(option);
				window.addEventListener("resize", function () {
					myChart.resize();
				});
				n = true;
			} else {
				$("#netProfit").html('<div class="noDatas">暂无数据</div>');
				$("#netProfit").height('auto')
				n = false;
			}


		}
	})
	if(n)
	return true;
	else
	return false;
}
/**
 * 引	用：jyqkyw.html
 * 创建日期：
 * 修	改：shiqi
 * 修改日期：20171020
 * 版	本：v2.0
 */
function findTotalAssets(_callback) {
	var params = {
		stockCode: stockCode
	},n=false;
	//WF_ajax.findTotalAssets(params,true,function(data){
	UTIL.axs(UTIL.CONFIG.findTotalAssets, params, false, function (data) {
		//console.log(data);
		if (data.retCode == "0000") {
			if (data.retData != null && data.retData != "" && data.retData != undefined) {
				var result = data.retData;
				//$("#businessIncomeShowName").html("2.2.1"+data.ZongZiChanZengZhangLv_showName);
				var dateList = result.portTime;
				var yingyeDataList = result.f1ZCZJ; //营业收入
				var REVZengZhangLvList = result.ZongZiChanZengZhangLv; //增长率
				var end=(4/dateList.length)*100;
				// 使用刚指定的配置项和数据显示图表。
				var myChart = echarts.init(document.getElementById('totalAssets'));
				var option = {
					color: [
						"#62a6f2", "#feb535"
					],
					calculable: true,
					legend: {
						show: true,
						data: ["总资产", '增长率']
					},
					grid: {
						show: true,
						right: '10%',
						left: '10%',
						bottom: '30%'
					},
					tooltip : {
			            trigger: 'axis',
			            formatter:function(params){
			            	//console.log(params)
			            	var divHtml="";
			            	   divHtml+='<div class="sanban_tips">';
			  	    			divHtml+='<div class="sb_tips_content">';
			  	    			divHtml+='<span class="tips_leibie fl jlrhzzl" style="background-color: #1985e2;">'+params[0].seriesName+'</span>';
			  	    			if(params[0].value=="" || params[0].value==null || params[0].value==undefined){
			  	    				divHtml+='<span class="tips_leibie_num fl">--</span>';
			  	    			}else{
			  	    				divHtml+='<span class="tips_leibie_num fl">'+params[0].value+'</span>';
			  	    			}
			  	    			divHtml+='<div class="clearfix"></div>';
			  	    			divHtml+='</div>';
			  	    			if(params[1]!="" && params[1]!=null && params[1]!=undefined){
			  	    				divHtml+='<div class="sb_tips_content first-content">';
				  	    			divHtml+='<span class="tips_leibie fl jlrhzzl" style="background-color: #fcc530;">'+params[1].seriesName+'</span>';
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
					dataZoom: {
						type: 'slider',
						show: true,
						start: '0',
						end: end,
						bottom: '3%',
						zoomLock:true
					},
					xAxis: {
						type: 'category',
						data: dateList //['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
					},
//					label: {
//						normal: {
//							show: true,
//							position: 'top'
//						}
//					},
					yAxis: [{
						type: 'value',
						name: "单位：万元",
						axisLabel: {
							show: true,
							formatter: "{value}"
						}
					},
					{
						type: 'value',
						name: "单位：%",
						splitLine: {
							show: false
						}
						//              min:0,
						//              max:100,
						//              axisLabel:{
						//              	show:true,
						//              	formatter:"{value}"
						//              }
					}
					],
					series: [{
						name: '总资产',
						type: 'bar',
						yAxisIndex: 0,
						barMaxWidth: '30',
						data: yingyeDataList //[2.6, 5.9, 80.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
					},
					{
						name: '增长率',
						type: 'line',
						yAxisIndex: 1,
						//              barMaxWidth:'30',
						symbol: "circle",
						data: REVZengZhangLvList, //[51, 20, 56, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
						axisLine: {
							show: false
						}
					}
					]
				};

				myChart.setOption(option);
				window.addEventListener("resize", function () {
					myChart.resize();
				});
				 n = true;
			} else {
				$("#totalAssets").html('<div class="noDatas">暂无数据</div>');
				$("#totalAssets").height('auto')
				n = false;
			}


		}
	})
	return n;
}
/**
 * 引	用：jyqkyw.html
 * 创建日期：
 * 修	改：shiqi
 * 修改日期：20171020
 * 版	本：v2.0
 */
function findInterestRateChange(_callback) {
	var params = {
		stockCode: stockCode
	},n=false;
	//WF_ajax.findInterestRateChange(params,true,function(data){
	UTIL.axs(UTIL.CONFIG.findInterestRateChange, params, false, function (data) {
		//console.log(data);
		if (data.retCode == "0000") {
			if (data.retData != null && data.retData != "" && data.retData != undefined) {
				var result = data.retData;

				//$("#businessIncomeShowName").html("2.2.1"+data.REVZengZhangLv_showName);
				var dateList = result.portTime;
				var yingyeDataList = result.XiaoShouMaoLiLv; //营业收入
				var REVZengZhangLvList = result.XiaoShouJingLiRunLv; //增长率
				var end=(4/dateList.length)*100;
				// 使用刚指定的配置项和数据显示图表。
				var myChart = echarts.init(document.getElementById('interestRateChange'));
				var option = {
					color: [
						"#62a6f2", "#feb535"
					],
					calculable: true,
					tooltip:{
						trigger:'axis'
					},
					legend: {
						show: true,
						data: ["销售毛利率", '销售净利率']
					},
					tooltip : {
			            trigger: 'axis',
			            formatter:function(params){
			            	//console.log(params)
			            	var divHtml="";
			            	   divHtml+='<div class="sanban_tips">';
			  	    			divHtml+='<div class="sb_tips_content">';
			  	    			divHtml+='<span class="tips_leibie fl xsmll" style="background-color: '+params[0].color+';">'+params[0].seriesName+'</span>';
			  	    			if(params[0].value=="" || params[0].value==null ||params[0].value==undefined){
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
					grid: {
						show: true,
						right: '10%',
						left: '10%',
						bottom: '30%'
					},
					dataZoom: {
						type: 'slider',
						show: true,
						start: '0',
						end: end,
						bottom: '3%',
						zoomLock:true
					},
					xAxis: {
						type: 'category',
						data: dateList //['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
					},
//					label: {
//						normal: {
//							show: true,
//							position: 'top'
//						}
//					},
					yAxis: [{
						type: 'value',
						name: "单位：%",
						axisLabel: {
							show: true,
							formatter: "{value}"
						}
					},
					{
						type: 'value',
						name: "单位：%",
						splitLine: {
							show: false
						}
						//              min:0,
						//              max:100,
						//              axisLabel:{
						//              	show:true,
						//              	formatter:"{value}"
						//              }
					}
					],
					series: [{
						name: '销售毛利率',
						type: 'line',
						yAxisIndex: 0,
						symbol: "circle",
						data: yingyeDataList //[2.6, 5.9, 80.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
					},
					{
						name: '销售净利率',
						type: 'line',
						yAxisIndex: 1,
						//              barMaxWidth:'30',
						symbol: "circle",
						data: REVZengZhangLvList, //[51, 20, 56, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
						axisLine: {
							show: false
						}
					}
					]
				};

				myChart.setOption(option);
				window.addEventListener("resize", function () {
					myChart.resize();
				});
				n = true;
			} else {
				$("#interestRateChange").html('<div class="noDatas">无</div>');
				$("#interestRateChange").height('auto')
				n = false;
			}


		}
	})
	return n;
}

function findIndustryAnalysis() {
	var params = {
		stockCode: stockCode
	};
	//console.log(params)
	//params={stockCode:831775};
	//	WF_ajax.findInterestRateChange(params,true,function(data){
	WF_ajax.findIndustryAnalysis(params, true, function (data) {
		//console.log(data)
		if (data != null && data != "" && data != undefined) {

			if (data.chartNum != null && data.chartNum != "" && data.chartNum != undefined) {
				var chartNum = data.chartNum;
				$("#IndustryAnalysis").html('');
				//			$.each(, function(index,item) {
				for (var i = 0; i < chartNum; i++) {
					var item = data['chart_' + (i + 1)];
					//console.log(item)
					//				if(index==0){
					//					return ;
					//				}else{
					//追加图表
					var divHtml = '';
					divHtml += '<div class="yewu-contents">';
					divHtml += '<h4 class="chartH4">' + item.chartName + '</h4>';
					divHtml += '<div class="suochu-hy" id="hyChatrs_' + i + '"></div>';
					divHtml += '</div>';
					$("#IndustryAnalysis").append(divHtml);
					// $(".p16").find($(".kaik-content")).eq(1).html(divHtml);
					//计算图表宽度
					var suochuWidth = $(".hy-charts").width();
					//console.log(suochuWidth)
					$(".suochu-hy").css("width", suochuWidth);

					//			 	//判断图表的类型
					//				var chartType=item.chartType.split(",");
					//				var flag1=0;
					//				var flag2=0;
					//				$.each(chartType, function(key,val) {
					//					if(val=="柱状"){
					//						flag1++;
					//					}else if(val=="折线"){
					//						flag2++;
					//					}
					//				});
					//x轴数据
					var portTime = item.portTime;
					//y轴数据
					var series = [];
					//y轴类型
					var yAxis = new Array(2);
					var legendData = [];
					var type = "";
					//console.log(item.indexNum)
					for (var j = 0; j < item.indexNum; j++) {
						var dataObj = item["indexMap_" + (j + 1)];
						var Yindex = 0;
						var object = {
							name: dataObj.indexName,
							//		                type:type,
							//		                yAxisIndex:j,
							//		                barMaxWidth:'30',
							symbol: "circle",
							data: dataObj.indexData //[2.6, 5.9, 80.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
						}
						//y轴的具体设置
						var Obj = {
							type: 'value',
							name: "单位:" + dataObj.indexUnit,
							axisLabel: {
								show: true,
								formatter: "{value}"
							}
						};
						if (dataObj.indexUnit == "") {
							Obj.name = "";
						}
						//根据单位设置series中数据的线条格式，以及图的属性
						if (dataObj.indexUnit == "%") {
							object.type = "line";
							if (item.indexNum > 1) { //表示图中只有一条线的时候，不设置单位显示在右边
								object.yAxisIndex = 1;
								//控制刻度不显示
								Obj.splitLine = {
									show: false
								};
							}
							yAxis[1] = Obj;
						} else {
							object.type = "bar";
							object.barMaxWidth = "30";
							yAxis[0] = Obj;
						}
						series.push(object);
						Yindex++;
						legendData.push(dataObj.indexName);

					}
					//				console.log(series)
					//判断没有柱状图的时候
					if (yAxis[0] == null) {
						yAxis[0] = yAxis[1];
						if (series.length == 1) { //判断是否只有一个折线图
							yAxis.splice(1, 2);
						}
					}
					//图画
					oneLineAndOneBar('hyChatrs_' + i, legendData, portTime, yAxis, series);
				};
			}
		} else {
			var div = '<div class="noDatas">无</div>';
			$("#IndustryAnalysis").html(div);
			// $(".p16").find($(".kaik-content")).eq(1).html(div);
		}
	})
}

//一个折线图和一个柱状图
function oneLineAndOneBar(id, legendData, portTime, yAxis, series) {
	var end=(4/portTime.length)*100;
	var myChart = echarts.init(document.getElementById(id));
	var option = {
		color: [
			"#62a6f2", "#feb535", "#9675da"
		],
		calculable: true,
		legend: {
			show: true,
			data: legendData //["营业收入",'增长率']
		},
		grid: {
			show: true,
			right: '10%',
			left: '10%',
			bottom: '30%'
		},
		dataZoom: {
			type: 'slider',
			show: true,
			start: '0',
			end: end,
			bottom: '3%',
			zoomLock:true
		},
		xAxis: {
			type: 'category',
			data: portTime //['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
		},
		label: {
			normal: {
				show: true,
				position: 'top'
			}
		},
		yAxis: yAxis,
		series: series
	};

	myChart.setOption(option);
	window.addEventListener("resize", function () {
		myChart.resize();
	});

}


var name=name;
function clickTC(){
	$("#businessTBody").on("click","span",function(){
//		alert(0)
		var name=$(this).text();
		$("#hisName").html(name);
		var legend=name;
		//调接口得数据然后画图
		$("#mainBusniess").show();
		$(".marsk").show();
		$("body,html").css("overflow", "hidden");
		var data={name:name,stockCode:stockCode};
		UTIL.axs(UTIL.CONFIG.findByNameAndCode,data,false,function(data){
			//console.log(data);
			if(data.retCode=="0000"){
				if(data.retData!="" && data.retData!=null && data.retData!=undefined){
					//console.log(data);
					var result=data.retData;
					var xData=[];
					var seriesData=[];
					$(result).each(function(index,item){
						xData[xData.length]=item.time;
						seriesData[seriesData.length]=((item.amountMoney)/10000).toFixed(2);
					})
					MainBusiness(legend,xData,seriesData);
				}
			}
		})
		

		
	})
	
}

function MainBusiness(legend,xData,seriesData){
//	console.log(legend)
	var width=$("#mainBusniess").width()-50;
	//document.getElementById("#MainBusiness").style.width=width+"px";
	$("#MainBusiness").css("width",width);
	//alert(0)
//	var legend={show:true,
//		left:'center',
//		data:[{
//			name:legend
//		}]};
	// 使用刚指定的配置项和数据显示图表。
	var myChart = echarts.init(document.getElementById('MainBusiness'));
	var option = {
		color: [
			"#62a6f2", "#feb535"
		],
		calculable: true,
	      legend:{
	      	show:true,
	      	data:[legend],
	      	left:"center"
	      },
		//      dataZoom: {
		//          type: 'slider',
		//          show : true,
		//          start: 0,
		//          end:80
		//      },
		grid: {
			show: true,
			right: '0%',
			left: '10%',
			bottom: '15%',
			top:'15%'
		},
		xAxis: {
			type: 'category',
			data:xData //['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
		},
		label: {
			normal: {
				show: true,
				position: 'top'
			}
		},
		yAxis:
		{
			type: 'value',
			name: "单位：万元"
		},
		series: [
			{
				name:legend,
				type: 'bar',
				barMaxWidth: '30',
				data:seriesData //[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
			}
		]
	};
	 //option.legend=legend; 
	myChart.setOption(option);
	window.addEventListener("resize", function () {
		myChart.resize();
	});
}
