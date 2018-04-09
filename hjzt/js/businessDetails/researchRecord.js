 //
var stockCode=getUrlParam("stockCode");
var stockName=getUrlParam("stockName");
//var userName=localStorage.getItem("userName");
var pageNum=1;
var pageSize=6;
var pageNum2=1;
var pageSize2=10;

//**图表插件所需参数开始**
var yRColumnArr = [ "class_115", "class_124", "class_142", "class_143",
            		"class_148", "class_151", "class_154", "ZDF", "class_222", "class_225",
            		"class_227", "class_230", "class_232", "class_234", "class_236",
            		"class_238" ]; // 多个的时候需要显示在y轴的右边的数据

//**图表插件所需参数结束**
$(function(){
	findBtUserStudyChart();
	$("#stockNameShow").text(stockName);
	//点击tab切换
	$(".gp_tab a").on("click",function(){
		$(this).addClass("on").siblings().removeClass("on");
		if($(this).text()=="研究图表"){
			$(".jilu_content").show();
			$(".my_yanbao").hide();
			$(".quans_yanbao").hide();
			findBtUserStudyChart();
		}
		else if($(this).text()=="我的研报"){
			$(".jilu_content").hide();
			$(".my_yanbao").show();
			$(".quans_yanbao").hide();
			findBtUserStudyReport();
		}
		else if($(this).text()=="券商研报"){
			$(".jilu_content").hide();
			$(".my_yanbao").hide();
			$(".quans_yanbao").show();
			findBtResearchReportList();
		}
	});
//	是否删除图表信息
		$("#shanchu_tubiao").on("click",function(){
			var id=$(this).attr("data-id");
			deleBtUserStudyChartajax(id)
			$(this).parent().parent().hide();
			$(".tub_tc").hide();
		});
		
	//点击删除弹窗的取消按钮
	$(".shanchu_btn .shanc_qux").on("click",function(){
		$(this).parent().parent().hide();
		$(".tub_tc").hide();
	})
	
	//获取页面的高度
	var height=$(".boar_r").height();
	$(".jilu_content").css("height",height);
	
})

//查询我的分类图表
function findBtUserStudyChart(){
	var data={stockCode:stockCode,pageNum:pageNum,pageSize:pageSize}
	$.axs("/betaInvest/btUserStockChart/findstockChart.do",data,false,function(data){
		var result=data.retData;
		if(data.retCode=='0000'){
			if(result==null || result=='' || result==undefined){
				var htm='<div class="zanwu_shuju" style="padding-top:30px"><span></span><p>暂无数据</p></div>'
				$("#studyChartList").html(htm);				
				return false
			}
			$(".jilu_content").show();
			$(".zanwu_shuju").hide();
			$("#studyChartList").empty();
			var html='';
			$(result).each(function(index,item){
				html+='<div class="tubiao_public fl"><div class="tb_titles">'+
					'<span>'+item.chartName+'</span>'+
				'<i title="预览" data-id='+item.studyChartId+' class="yulan" onclick="findUserStudyChart(\''+item.businessUrl+'\',\''+item.chartName+'\','+item.studyChartId+')"></i>'+
					'<em title="删除" class="shanchu" onclick="deleBtUserStudyChart(\''+item.studyChartId+'\')"></em>'+
					'<b title="编辑" class="shanchu" onclick="editUserStudyChart(\''+item.businessUrl+'\',\''+item.chartName+'\','+item.studyChartId+')"></b>'+
					'<div class="clr"></div></div><div class="fenxi_tub">'+
					'<div class="draw_echarts" ondblclick="initchart(\''+item.businessUrl+'\','+item.studyChartId+',\''+item.chartName+'\',this)" id='+item.studyChartId+'></div></div></div>';
//					'<img src="'+item.imageUrl+'"/></a></div></div>';
			})
			html+='<div class="clr"></div>';
			$("#studyChartList").html(html);
			$(".draw_echarts").dblclick();
			//清楚绑定事件
			$(".draw_echarts").attr("ondblclick","");
			//鼠标经过图表的标题时显示右边的小图标
			$(".tb_titles").on("mouseenter",function(){
				$(this).children().show();
			})
			$(".tb_titles").on("mouseleave",function(){
				$(this).children().hide();
				$(this).find("span").show();
			})
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	})
}

//查询我的分类图表
function findBtUserStudyReport(){
	var data={stockCode:stockCode}
	//findReportByStockCode
	$.axs("/betaInvest/report/findReportByStockCode.do",data,false,function(data){
		var result=data.retData;
		if(data.retCode=='0000'){
			if(result==null || result=='' || result==undefined){
				var htm='<div class="zanwu_shuju" style="padding-top:70px;padding-left:40px"><span></span><p>暂无数据</p></div>';
				$("#studyReportList").html(htm);	
				return false
			}
			$(".my_yanbao").show();
			$(".zanwu_shuju").hide();
//			$("#studyReportList").empty();
			var html='';
			$(result).each(function(index,item){
				var editUrl="";
				if(item.reportType==1){
					editUrl="/myResearch/reportPreview.html?id="+item.id;
					//'<a href="/myResearch/reportPreview.html?id='+item.id+'">'+title+'</a>'+
				}else{
//					editUrl="/myResearch/modelReportDetail.html"+item.edirParam+"&key="+item.id;
					editUrl="/myResearch/modelReportDetail.html?key="+item.id;
				}
//				html+='<li><div class="gongs_name fl">'+
//					'<span class="fl biaoshi">'+(item.holdStatus==""?"--":item.holdStatus)+'</span><div class="com_name fl" title="'+item.title+'">'+
//					'<a href="'+editUrl+'">'+title+'</a>'+
//					'<em>更新时间：'+item.dateTime+'</em></div></div><div class="importer fl"><span>重要度：</span>'+
//					'<div class="xingx fl"><div class="hui_xingx"></div>'+
//					'<div class="huang_xingx" style="width: '+item.importanceValue*20+'%;"></div>'+
//					'</div><div class="clr"></div></div><div class="gongsi_caiwu fl">'+
//					'<span>期望市值（万元）：'+(item.expectValue==null?"--":item.expectValue)+'</span>'+
//					'<span>当前市值（万元）：'+(item.thisValue==null?"--":item.thisValue)+'</span></div>'+
//					'<div class="yanjiu_chjianren fl"><em>创建人：<b>'+(item.userName==null||item.userName=="null"?"--":item.userName)+'</b></em></div><div class="clr"></div></li>';
				
				
				html+='<li>';
				html+='<div class="gongs_name fl">';
				html+='<span class="fl biaoshi">'+(item.holdStatus==""?"--":item.holdStatus)+'</span>';
				html+='<div class="com_name fl">';
				var title=(item.title==null?"--":item.title);
				if(title.length>18){
					title=title.substring(0,15)+"...";
				}
				html+='<span class="yanb_mc" title="'+title+'" onclick="javascript:window.location.href=\''+editUrl+'\'">'+title+'</span>';
				var date=item.dateTime.substring(0,10);//toDateTime(item.dateTime,"yyyy-MM-dd");
				var userName=item.userName;
				if(userName.length>6){
					userName=userName.substring(0,6)+"..."
				}
				html+='<p><em class="yjbg_cjr" title="'+item.userName+'">'+userName+'</em><b class="yjbg_shij" title="'+item.dateTime+'">'+date+'</b></p>';
				html+='<div class="yanbao_zyd">';
				html+='<span class="zhyd">重要度：</span>';
				html+='<div class="yb_xx fl">';
				html+='<b class="bg_hui"></b>';
				html+='<em class="ynb_pj" style="width:'+item.importanceValue*20+'%"></em>';
				html+='</div>';
				html+='<div class="clr"></div>';
				html+='</div>';
				html+='</div>';
				html+='</div>';
				html+='<div class="gongsi_caiwu fl">';
				html+='<ul class="gongs_list">';
				if(item.stockName!=null && item.stockName!=''){
					var stockCodeArray=item.stockCode.split(",");
					var stockNameArray=item.stockName.split(",");
					for (var i = 0; i < stockNameArray.length; i++) {
						html+='<li>';
						html+='<i></i>';
						html+='<span class="company_mc">'+stockNameArray[i]+'（<b>'+stockCodeArray[i]+'</b>）</span>';
						if(item.thisValue!=null && item.thisValue!="" && item.thisValue!=undefined){
							var showThisValue=item.thisValue.split(",")[i];
							if(showThisValue==null || showThisValue=="" || showThisValue==undefined){
								showThisValue="--"
							}
							html+='<p>当前市值：<em>'+showThisValue+'</em>百万</p>';
						}else{
							html+='<p>当前市值：<em>--</em>百万</p>';
						}
						if(item.expectValue!=null && item.expectValue!="" && item.expectValue!=undefined){
							var showExpectValue=item.expectValue.split(",")[i];
							if(showExpectValue==null || showExpectValue=="" || showExpectValue==undefined){
								showExpectValue="--"
							}
							html+='<p>期望市值：<em>'+showExpectValue+'</em>百万</p>';
						}else{
							html+='<p>期望市值：<em>--</em>百万</p>';
						}
						html+='</li>';
					}
				}
//				html+='<li>';
//				html+='<i></i>';
//				html+='<span class="company_mc">天阳科技（<b>876433</b>）</span>';
//				html+='<p>当前市值：<em>765</em>亿</p>';
//				html+='<p>当前市值：<em>987</em>亿</p>';
//				html+='</li>';
//				html+='<li>';
//				html+='<i></i>';
//				html+='<span class="company_mc">天阳科技（<b>876433</b>）</span>';
//				html+='<p>当前市值：<em>765</em>亿</p>';
//				html+='<p>当前市值：<em>987</em>亿</p>';
//				html+='</li>';
//				html+='<li>';
//				html+='<i></i>';
//				html+='<span class="company_mc">天阳科技（<b>876433</b>）</span>';
//				html+='<p>当前市值：<em>765</em>亿</p>';
//				html+='<p>当前市值：<em>987</em>亿</p>';
//				html+='</li>';
				html+='<div class="clr"></div>';
				html+='</ul>';
				html+='</div>';
				html+='<div class="clr"></div>';
				html+='</li>';
			})
			$("#studyReportList").html(html);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	})
}

//删除图表信息
function deleBtUserStudyChart(chartId){
	$("#shanchu_tubiao").attr("data-id",chartId)
	$(".tub_tc,.tips_shanchu").show();
}

function deleBtUserStudyChartajax(chartId){
	
	$(".tub_tc,.tips_shanchu").show();
//	if (confirm("确认删除吗？")) {
		/*$.axs("/betaInvest/btUserStudyChart/deleBtUserStudyChart.do",{id:chartId},false,function(data){
			var result=data.retData;
			if(data.retCode=='0000'){
				errorAlert("","删除成功！");
				findBtUserStudyChart();
				$(".tub_tc,.tips_shanchu").hide();
			}else{
				errorAlert(data.retCode, data.retMsg);
			}
		})*/
		$.axs("/betaInvest/btUserStockChart/delSCByUserId.do",{stockCode:stockCode,chartId:chartId},false,function(data){
			var result=data.retData;
			if(data.retCode=='0000'){
				errorAlert("","删除成功！");
				findBtUserStudyChart();
			}else{
				errorAlert(data.retCode, data.retMsg);
			}
		})
//	} 
//	else {
//		return;
//	}
	
	
}
/**
 * 加载券商研报
 * @param dateTime
 * @param indicatorId
 */
function findBtResearchReportList(){
	$.axs("/betaInvest/btResearchReport/findBtResearchReport.do",
			{stockCode:stockCode},
			false,
			function(data){
		if(data.retCode=="0000"
		){
			if(data.retData != null && data.retData != "" && data.retData != undefined){
				$("#newsList").empty();
				var html="";
				$(data.retData).each(function(index, item){
					html+='<li>'+
//					<div class="fl quans_leib"><span class="qiangtui">'+(item.status==null?"--":item.status)+'</span></div>'+
						'<div class="fl quans_name"><span class="quans_titles" onclick="openPage(\''+item.newsUrl+'\')">'+(item.contentTitle==null?"--":item.contentTitle)+'</span>';
					var date=toDateTime(item.releaseTime,"yyyy-MM-dd");
					html+='<div class="quans_produce"><span>'+date+'</span>'+
						'<em>'+(item.releaseName==null?"--":item.releaseName)+'</em>'+
						'<i>'+(item.industryName==null?"--":item.industryName)+'</i>'+
						'<b>'+(item.reportType==null?"--":item.reportType)+'</b>'+
						'<div class="clr"></div></div>'+
//						'<div class="com_produce"><span>【摘要】</span>'+
//						'<div class="com_produce">'+
//						'<div class="fl compan_pro"><p>'+(item.headline==null?"--":item.headline)+'</p></div>
						'<div class="clr"></div></div></div><div class="clr"></div></li>';
				})
				$("#newsList").html(html);
			}else{
				var htm='<div class="zanwu_shuju" style="padding-top:30px"><span></span><p>暂无数据</p></div>'
				$("#newsList").html(htm);	
//				$("#newsList").html('<li class="newszwsj"><b>暂无数据</b></li>');
			}
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}
//打开研报页面
function openPage(url){
	window.open(url);
}

function toDateTime (time, format) {  
    var x = new Date(parseInt(time)),  
        y = format;  
    var z = {M: x.getMonth() + 1, d: x.getDate(), h: x.getHours(), m: x.getMinutes(), s: x.getSeconds()};  
    y = y.replace(/(M+|d+|h+|m+|s+)/g, function (v) {  
        return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2)  
    });  
    var formatDateTime = y.replace(/(y+)/g, function (v) {  
        return x.getFullYear().toString().slice(-v.length)  
    });  
    return formatDateTime;  
};
//跳转编辑页面
function editUserStudyChart(url,chartName,chartId){
	url = url.substring(0, url.indexOf("&ZBQDATA"));
	location.href="/myResearch/newseditChart.html"+url+"&chartName="+chartName + "&chartId=" + chartId;
}
//跳转预览页面
function findUserStudyChart(url,chartName,chartId){
	url = url.substring(0, url.indexOf("&ZBQDATA"));
	location.href="/myResearch/newschartPreview.html"+url+"&chartName="+chartName + "&chartId=" + chartId;
}

//********研究图表插件加载开始*******
/**
 * 加载图表
 * @param URL
 * @param id
 */
function initchart(URL, id, chartName, thiz) {
	var chartType = decodeURI(getParamByUrl(URL, "chartType")); //统计类型
	var columns = decodeURI(getParamByUrl(URL, "columns")); //指标名称
	var dateType = decodeURI(getParamByUrl(URL, "dateType")); //时间类型
	var stockCode = decodeURI(getParamByUrl(URL, "stockCode")); //股票代码

	var showZXColumns = decodeURI(getParamByUrl(URL, "ZXColumns")); //柱形图字段
	var showLineColumns = decodeURI(getParamByUrl(URL, "lineColumns")); //折线图字段
	var showAreaColumns = decodeURI(getParamByUrl(URL, "MJColumns")); //面积图字段
	
	var indexCodes = decodeURI(getParamByUrl(URL, "indexCode")).split(","); //获取指标选取id
	var dataDateType = decodeURI(getParamByUrl(URL, "dataDateType")); //数据的最小统计单位
	var businessTypes = decodeURI(getParamByUrl(URL, "businessTypes")); //根据URL获取

	var chartData = {};
	var myChart = echarts.init(document.getElementById(id));
	var color=['#64a4f2', '#36b8f4','#41ccdc','#feb535','#fd865b','#f36c77'];
	option = {
		animation:false,
		color: ['#7cb5ec', '#f7a35c'],
//		legend: {
//			data: ['近利润(万)'],
//			top: '10px'
//
//		},
		tooltip: {
			show:true,
        	trigger:'axis',
			formatter:function(params){
				//7月4号玲修改提示弹窗start
				var content='';
				$(params).each(function(index,item){
					
					var str = "";
					if(item.seriesName.indexOf("员工总人数同比变化率（报告期）") > -1 || item.seriesName.indexOf("%") > -1 || item.seriesName.indexOf("比例") > -1 || item.seriesName.indexOf("比率") > -1){
						str = "%";
					}
					var bg=color[index];
					content+='<div class="sb_tips_content">';
	    			content+='<span class="tips_leibie fl"  style="background:'+bg+';">'+item.seriesName+'</span>';
	    			content+='<span class="tips_leibie_num fl">'+ ((item.data == undefined || item.data == null || item.data == undefined || (item.data == "" && item.data != 0)) ? "--" : (item.data.toFixed(2)) + str) +'</span>';
	    			content+='<div class="clr"></div>';
	    			content+='</div>';
					
				});
				var divHtml='<div class="sanban_tips">'+
	    					'<p class="sb_tips_title">'+params[0].name+'</p>'+content+'</div>';
	    			return divHtml;
			}
			//7月4号玲修改提示弹窗end
		},
		dataZoom: [{
            show: true,
            realtime: true,
            start: 0,
            end:100
        },
        {
            type: 'inside',
            realtime: true,
            start: 0,
            end: 100
        }],
		xAxis: [{
			type: 'category',
			data: [],
			boundaryGap : true,
			show : true,  
	        axisLabel:{  
	            interval:0
	        }
		}],
		yAxis: [{
			type: 'value',
			name: '',
			axisLabel: {
				formatter: '{value}'
			}
		}],
		grid: {
			left: '3%',
			right: '5%',
			containLabel: true
		},
		series: [/*{
			name: '净利润金额(万)',
			type: 'line',
			data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
			//data:tradingVolume
			label: {
				normal: {
					show: true,
					position: 'top'
				}
			}
		}*/]
	};
	
	myChart.setOption(option);
	myChart.showLoading();
	
	//获取图表数据
	var chartData = findZBData(indexCodes,stockCode,dataDateType,businessTypes,dateType,id);
//	var legendDataArr = []; //显示的legend
	if(showLineColumns != "" && showLineColumns != null){ //折线图
		var showLineArr = showLineColumns.split(",");
		$(chartData.arr).each(function(index, lineItem){
			$(showLineArr).each(function(){
				if(this == lineItem.code){
					for (var int = 0; int < lineItem.data.length; int++) {
						lineItem.data[int] = (lineItem.data[int] == null ? 0 : lineItem.data[int]);
					}
					var serData = {
							name: lineItem.name,
							type: 'line',
							symbol: 'circle',
							data: lineItem.data,
							yAxisIndex:0,
							label: {
								normal: {
									show: true,
									position: 'top',
									formatter:function(param){
				            			var str = "";
				    					
				    					if(param.seriesName.indexOf("员工总人数同比变化率（报告期）") > -1 || param.seriesName.indexOf("%") > -1 || param.seriesName.indexOf("比例") > -1 || param.seriesName.indexOf("比率") > -1){
				    						str = "%";
				    					}
				            			return ((param.data == 0.00 || param.data == 0) ? "" : ((param.data).toFixed(2)) + str);
				            		}
								}
							}
						};
					
					if(($.inArray(lineItem.code,yRColumnArr)>-1) && (indexCodes.length > 1)){ //将指定的指标用y轴的右侧
						serData["yAxisIndex"] = 1;
						option.yAxis.push({
										type: 'value',
										name: '',
										axisLabel: {
											formatter: '{value}'
										}
									});
					}
					option.series.push(serData);
//					legendDataArr.push(lineItem.name);
				}
			})
		})
	}
	if(showZXColumns != "" && showZXColumns != null){ //柱形图
		var showZXArr = showZXColumns.split(",");
		$(chartData.arr).each(function(index, zxItem){
			$(showZXArr).each(function(){
				if(this == zxItem.code){
					for (var int = 0; int < zxItem.data.length; int++) {
						zxItem.data[int] = (zxItem.data[int] == null ? 0 : zxItem.data[int]);
					}
					var serData = {
							name: zxItem.name,
							type: 'bar',
							data: zxItem.data,
							yAxisIndex:0,
							label: {
								normal: {
									show: true,
									position: 'top',
									formatter:function(param){
				            			var str = "";
				    					
				    					if(param.seriesName.indexOf("员工总人数同比变化率（报告期）") > -1 || param.seriesName.indexOf("%") > -1 || param.seriesName.indexOf("比例") > -1 || param.seriesName.indexOf("比率") > -1){
				    						str = "%";
				    					}
				            			return ((param.data == 0.00 || param.data == 0) ? "" : ((param.data).toFixed(2)) + str);
				            		}
								}
							}
						};
					
					if(($.inArray(zxItem.code,yRColumnArr)>-1) && (indexCodes.length > 1)){ //将指定的指标用y轴的右侧
						serData["yAxisIndex"] = 1;
						option.yAxis.push({
										type: 'value',
										name: '',
										axisLabel: {
											formatter: '{value}'
										}
									});
					}
					option.series.push(serData);
//					legendDataArr.push(zxItem.name);
				}
			})
		})
	}
	if(showAreaColumns != "" && showAreaColumns != null){ //面积图
		var showAreaArr = showAreaColumns.split(",");
		$(chartData.arr).each(function(index, areaItem){
			$(showAreaArr).each(function(){
				if(this == areaItem.code){
					for (var int = 0; int < areaItem.data.length; int++) {
						areaItem.data[int] = (areaItem.data[int] == null ? 0 : areaItem.data[int]);
					}
					var serData = {
				            name:areaItem.name,
				            type:'line',
				            smooth:true,
				            symbol: 'none',
				            sampling: 'average',
				            yAxisIndex:0,
				            itemStyle: {
				                normal: {
				                    color: 'rgb(255, 70, 131)'
				                }
				            },
				            areaStyle: {
				                normal: {
				                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
				                        offset: 0,
				                        color: 'rgb(255, 158, 68)'
				                    }, {
				                        offset: 1,
				                        color: 'rgb(255, 70, 131)'
				                    }])
				                }
				            },
				            data: areaItem.data
				        };
					
					if(($.inArray(areaItem.code,yRColumnArr)>-1) && (indexCodes.length > 1)){ //将指定的指标用y轴的右侧
						serData["yAxisIndex"] = 1;
						option.yAxis.push({
										type: 'value',
										name: '',
										axisLabel: {
											formatter: '{value}'
										}
									});
					}
					option.series.push(serData);
//					legendDataArr.push(areaItem.name);
				}
			})
		})
	}
	
	var showBFB = 100;
	if(chartData.date.length != 0 && chartData.date != null){
		showBFB = (4/chartData.date.length)*100;
	}
	/*var legend = {     
			top: '10px',
			data:legendDataArr
		 };*/
//	option.legend = legend;
	option.xAxis[0].data = chartData.date;
	option.dataZoom[0].end = showBFB;
	option.dataZoom[1].end = showBFB;
	myChart.hideLoading();
	
	myChart.setOption(option);
	window.addEventListener("resize", function() {
		myChart.resize();
	});
	
	/*$("#"+id).click(function(){
		findUserStudyChart(URL,chartName,id);
	})*/
}

/**
 * 查询指标数据
 */
function findZBData(indexCodes,stockCode,dataDateType,businessTypes,dateType,id){
	var showTData = {};
	var allZBName = {};
	var ZBSZ = JSON.parse(decodeURI(findURLById(id)));
	$(ZBSZ).each(function(i, item){
		if(item.isIndex == 1){
			allZBName[item.classValue] = item.className;
		}
	})
	
	var codes = "";
	$(indexCodes).each(function(i, item){
		codes += item + ",";
	})
	if(codes != ""){
		codes = codes.substring(0, codes.length - 1);
	}
	$.axs("/betaInvest/btStockIndex/findStockIndexData.do",
			{indexIds:codes, stockCode:stockCode, dataDateType:dataDateType, businessTypes:businessTypes, dateType:dateType},
			false,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			/*if(result==null){
				return false;
			}*/
			var jsonD = {};
			var xShowData = []; //X轴集合
			var fdArr = []; //数据集合
			var leibie_zhibiao_data={}; //{指标名称:数据,指标名称:数据}
			$(indexCodes).each(function(){ //先将选中的添加进去值为空
				leibie_zhibiao_data[this] = [];
			})
			$(result).each(function(i,obj){
				var xShow = obj.dataDateValue; //时间字段按照返回的字段名改
				if(dataDateType == "W"){
					xShowData.push(xShow + "W");
				}else{
					xShowData.push(xShow);
				}
				
				for(var column in obj){ //column就是指标名
					if(leibie_zhibiao_data[column]!=undefined){
						leibie_zhibiao_data[column].push(obj[column]);
					}
				}
			})
			
			for (var i = 0; i < indexCodes.length; i++) {
				var json={};
				var dd = leibie_zhibiao_data[indexCodes[i]];
				json.code = indexCodes[i];
				json.name=allZBName[indexCodes[i]];
				json.data=dd;
				fdArr.push(json);
			}
			
			jsonD.date = xShowData;
			jsonD.arr = fdArr;
			
			showTData = jsonD;
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
	return showTData;
}

/**
 * 通过URL获取参数值
 */
function getParamByUrl(URL, paramName){
	var param = "";
	var reg = new RegExp("(^|&)"+paramName+"=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
	var r = URL.substr(1).match(reg); // 匹配目标参数
	if(r != null){
		param = decodeURIComponent(r[2]);
	}
	param = encodeURI(param);
	return param;
}

//根据图表id查询URL
function findURLById(id){
	var zbd = "";
	$.axs("/betaInvest/btUserStudyChart/findUrlById.do",
			{chartId:id}, false,function(data){
		if(data.retCode=="0000"){
			var reg = new RegExp("(^|&)ZBQDATA=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
			var r = data.retData.businessUrl.substr(1).match(reg); // 匹配目标参数
			if(r != null)
				zbd = decodeURIComponent(r[2]);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
	return encodeURI(zbd);
}

//********研究图表插件加载结束*******
