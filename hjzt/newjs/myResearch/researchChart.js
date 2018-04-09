var categoryId1=null;
var categoryId2=null;
var studyChartId=null;
var pageNum=1;
var pageSize=6;

var yRColumnArr = [ "class_115", "class_124", "class_142", "class_143",
            		"class_148", "class_151", "class_154", "ZDF", "class_222", "class_225",
            		"class_227", "class_230", "class_232", "class_234", "class_236",
            		"class_238" ]; // 多个的时候需要显示在y轴的右边的数据
$(function(){
	//点击管理分类显示管理分类的弹窗
	$(".guanl_fenlei").on("click",function(){
		$(".tub_tc").show();
		$(".guanli_tc").show();
		if($("#categoryCountList li").length<=0){
			$(".fenlei_shuj").hide();
			$(".leixin_zwsj").show();
		}else{
			$(".fenlei_shuj").show();
			$(".leixin_zwsj").hide();
		}
	})
	//点击管理分类的弹窗的确定按钮
	$(".guanli_btn span").on("click",function(){
		$(this).parent().parent().parent().hide();
		$(".tub_tc").hide();
	})
	//点击新建分类显示新建分类弹窗
	$(".xinj_fenlei").on("click",function(){
		$(".tub_tc2").show();
		$(".xinjian_tc").show();
	})
	//点击弹窗的右上角的关闭按钮
//	$(".tc_shanchu").on("click",function(){
//		$(".tub_tc").hide();
//		$(this).parent().hide();
//	})
	//新建弹窗的确定按钮
	$(".fenlei_qd").on("click",function(){
	var categoryName=$("#categoryName").val();
	if(categoryName==null || categoryName==""){
		$(".search_tips").show();
		return false;
	}
		addUserCategory();
		
		
	})
	//新建弹窗的取消按钮
	$(".fenlei_qx").on("click",function(){
		$(this).parent().parent().hide();
		$(".tub_tc2").hide();
	})
	//点击管理分类里的新建按钮
	$(".now_types a,.xinj_anniu a").on("click",function(){
		$(".xinjian_tc").show();
		$(".tub_tc2").show();
	})
	//点击假背景让下拉框回收
	$(".jiabeijing").on("click",function(){
		$(".selectBox ul").slideUp();
		$(this).hide();
	})
	//点击下拉的li时收回下拉框
	$(".selectBox").delegate("li","click",function(){
		var value=$(this).find("a").text();
		$(this).parent().parent().find("p").eq(0).text(value);
		$(this).parent().slideUp();
		$(".jiabeijing").hide();
	})
	//点击预览跳转到图表预览页面
//	$(".tubiao_list").delegate("i","click",function(){
//		window.location.href="/myResearch/chartPreview.html";
//	})
	//点击删除按钮 显示删除提示框
	$(".tubiao_list,#categoryCountList").delegate("em","click",function(){
		$(".tub_tc2").show();
		$(".shanc_btn").attr("data-id",$(this).attr("data-id"));
		$(".shanc_btn").attr("data-type",$(this).attr("data-type"));
		$(".tips_shanchu").show();
	})
	//点击删除分类按钮 显示删除提示框
	$("#categoryCountList").delegate("em","click",function(){
		$(".tub_tc2").show();
		$(".shanc_btn").attr("data-id",$(this).attr("data-id"));
		$(".shanc_btn").attr("data-type",$(this).attr("data-type"));
		$(".tips_shanchu").show();
	})
	//点击删除弹窗的删除按钮baoc_qx
	$(".shanc_btn").on("click",function(){
		if($(this).attr("data-type")==1){
//			data-type为1的时候 删除图表
		deleBtUserStudyChart($(this).attr("data-id"));
			
		}
		if($(this).attr("data-type")==2){
//			data-type为1的时候 删除分类
		deleUserCategory($(this).attr("data-id"));	
		}
//		$(".tub_tc").hide();
		$(".tub_tc2").hide();
		$(this).parent().parent().hide();
		if($("#studyChartList").find("div").length<=1){
			$(".yanjiu_wushuju").show();
			$("#studyChartList").hide();
		}else{
			$(".yanjiu_wushuju").hide();
			$("#studyChartList").show();
		}
	})
	$(".baoc_qd").on("click",function(){
		updateBtUserStudyChart();
		$(".tub_tc").hide();
		$(this).parent().parent().hide();
	})
	$(".baoc_qd").on("click",function(){
		$(".tub_tc").hide();
		$(this).parent().parent().hide();
	})
	$(".baoc_qx").on("click",function(){
		$(".tub_tc").hide();
		$(this).parent().parent().hide();
	})
	
	//点击取消弹窗的删除按钮
	$(".shanc_qux").on("click",function(){
		$(".tub_tc2").hide();
		$(this).parent().parent().hide();
	})
	$(".guanli_tc>.xinj_top>.tc_shanchu").on("click",function(){
		$(".tub_tc2").hide();
		$(this).parent().parent().hide();
		$(".tub_tc").hide();
	})
	
	$(".xinjian_tc>.xinj_top>.tc_shanchu").on("click",function(){
		$(".tub_tc2").hide();
		$(this).parent().parent().hide();
	})
	$("#searchVal").keydown(function(e) {
		if (e.keyCode == 13) {
			findBtUserStudyChart(0);
		}
	});
	$("#searchNewTubiao").click(function(){
			findBtUserStudyChart(0);
	})

	findBtUserStudyChart(0);
	findUserCategory();
	findUserCategoryCount();
	
	//显示暂无数据
	if($(".echarts_public").length<1){
		$(".baogao_zwsj").show();
		$("#studyChartList").hide();
	}else{
		$(".baogao_zwsj").hide();
		$("#studyChartList").show();
	}
	
})
//查询我的分类图表
function findBtUserStudyChart(num){
	if(num==0){
		pageNum=1;
	}else{
		pageNum+=num;
	}
	var searchVal=$("#searchVal").val();
	var data={categoryId:categoryId1,searchVal:searchVal,pageNum:pageNum,pageSize:pageSize}
	$.axs("/betaInvest/btUserStudyChart/findBtUserStudyChart.do",data,false,function(data){
		var result=data.retData;
		if(data.retCode=='0000'){
			if(result==null){
				return false
			}
			if(pageNum==1){
			$("#studyChartList").empty();
			}
			//console.log(result)
			if(result.length>0){
				var html='';
			$(result).each(function(index,item){
				html+='<div class="fl echarts_public"><div class="top">'+
					'<span>'+item.chartName+'</span><div class="fr echart_icons" style="display: none;">'+
					'<a href="javascript:;" title="编辑" onclick="editUserStudyChart(\''+item.businessUrl+'\',\''+item.chartName+'\','+item.studyChartId+')"></a>'+
					'<em title="删除" data-id="'+item.studyChartId+'" data-type="1"></em>'+
					'<i title="预览"  onclick="findUserStudyChart(\''+item.businessUrl+'\',\''+item.chartName+'\','+item.studyChartId+')"></i>'+
					'<b title="分类" onclick="showDiv(\''+item.studyChartId+'\')"></b><div class="clr"></div></div>'+
					'<div class="fr moren_icon"><em></em></div><div class="clr"></div></div>'+	
					'<div class="draw_echarts" ondblclick="initchart(\''+item.businessUrl+'\','+item.studyChartId+',\''+item.chartName+'\',this)" id='+item.studyChartId+'>'+
//					'<img src="'+item.imageUrl+'" alt="" onclick="findUserStudyChart(\''+item.businessUrl+'\',\''+item.chartName+'\','+item.studyChartId+')" />'+
					'</div></div>';
			})
//			html+="<div class="clr"></div>";
			var d='<div class="clr"></div>';
			$("#studyChartList").append(html);
			$(".draw_echarts").dblclick();
			//清楚绑定事件
			$(".draw_echarts").attr("ondblclick","");
			$("#studyChartList").append(d);
			$(".addmore").show();
			//$(".zwu_shuju").hide();
			}else{
				//$("#loadMore").html('没有更多数据');
				$(".addmore").hide();
				$(".yanjiu_wushuju").show();
			}
			
			//鼠标经过图表上面的标题
			$(".echarts_public .top").on("mouseover",function(){
				$(this).addClass("on");
				$(this).find(".echart_icons").show();
				$(this).find(".moren_icon").hide();
			})
			$(".echarts_public .top").on("mouseout",function(){
				$(this).removeClass("on");
				$(this).find(".echart_icons").hide();
				$(this).find(".moren_icon").show();
			})
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	})
}
//查询我的分类
function findUserCategory(){
	$.axs("/betaInvest/btUserCategory/findUserCategory.do",null,false,function(data){
		var result=data.retData;
		if(data.retCode=='0000'){
			if(result==null){
				return false
			}
			$("#categoryList").empty();
			$("#categoryList2").empty();
			var html='<li onclick="selectCategoryId1(null)"><a href="javascript:;">全部分类</a></li>';
			var html2='';
			$(result).each(function(index,item){
				html+='<li onclick="selectCategoryId1(\''+item.categoryId+'\')"><a href="javascript:;">'+item.categoryName+'</a></li>';
				html2+='<li onclick="selectCategoryId2(\''+item.categoryId+'\')"><a href="javascript:;">'+item.categoryName+'</a></li>';
			})
			$("#categoryList").append(html);
			$("#categoryList2").append(html2);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	})
}

//查询分类信息及分类下的图表数量
function findUserCategoryCount(){
	$.axs("/betaInvest/btUserCategory/findUserCategoryCount.do",null,false,function(data){
		var result=data.retData;
		if(data.retCode=='0000'){
			if(result==null){
				return false
			}
			$("#categoryCountList").empty();
			var html='';
			$(result).each(function(index,item){
				html+='<li><i></i><span>'+item.categoryName+'('+(item.count==null?'0':item.count)+')</span>';
				//if(item.categoryName=='默认分类'){
				//	html+='<em></em><div class="clr"></div></li>';
				//}else{
					html+='<em data-id='+item.categoryId+' data-type="2"></em><div class="clr"></div></li>';
				//}
			})
			$("#categoryCountList").append(html);
			if($("#categoryCountList li").length<=0){
				$(".fenlei_shuj").hide();
				$(".leixin_zwsj").show();
			}else{
				$(".fenlei_shuj").show();
				$(".leixin_zwsj").hide();
			}
			
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	})
}

//添加我的分类
function addUserCategory(){
	var categoryName=$("#categoryName").val();
	if(categoryName==null || categoryName==""){
		errorAlert("","请添加分类信息!");
		return false;
	}
	$.axs("/betaInvest/btUserCategory/addUserCategory.do",{categoryName:categoryName},false,function(data){
		var result=data.retData;
		if(data.retCode=='0000'){
			errorAlert("","添加成功！");
		$(".search_tips").hide();
		$(".fenlei_qd").parent().parent().hide();
		$(".tub_tc2").hide();
		findUserCategory();
		findUserCategoryCount();
		$("#categoryName").val("");
		}else{
			$(".search_tips").html(data.retMsg).show();
		}
	})
}

//删除我的分类
function deleUserCategory(cateId){
	//if () {
		$.axs("/betaInvest/btUserCategory/deleUserCategory.do",{categoryId:cateId},false,function(data){
			var result=data.retData;
			if(data.retCode=='0000'){
				errorAlert("","删除成功！");
				findUserCategoryCount();
				findUserCategory();
				if($("#categoryCountList li").length<=0){
					$(".fenlei_shuj").hide();
					$(".leixin_zwsj").show();
				}else{
					$(".fenlei_shuj").show();
					$(".leixin_zwsj").hide();
				}
				findBtUserStudyChart(0);
				findUserCategory();
				findUserCategoryCount();
				if($(".echarts_public").length<1){
		$(".baogao_zwsj").show();
		$("#studyChartList").hide();
	}else{
		$(".baogao_zwsj").hide();
		$("#studyChartList").show();
	}
			}else{
				errorAlert(data.retCode, data.retMsg);
			}
		})
	$(".tub_tc").show();
}

//删除图表信息
function deleBtUserStudyChart(chartId){
//	if (confirm("确认删除吗？")) {
		$.axs("/betaInvest/btUserStudyChart/deleBtUserStudyChart.do",{id:chartId},false,function(data){
			var result=data.retData;
			if(data.retCode=='0000'){
				errorAlert("","删除成功！");
				//wtl -7.5- 3106 研究图表：删除分类后图表没有删除，需要刷新一下页面才不显示图表
				findBtUserStudyChart(0);
				findUserCategoryCount();
				findUserCategory();
				//显示暂无数据
	if($(".echarts_public").length<1){
		$(".baogao_zwsj").show();
		$("#studyChartList").hide();
	}else{
		$(".baogao_zwsj").hide();
		$("#studyChartList").show();
	}
			}else{
				errorAlert(data.retCode, data.retMsg);
			}
		})
//	} else {
//		return;
//	}
}

//展开选择分类div
function showDiv(chartId){
	studyChartId=chartId;
	//点击分类小图标
	$(".tub_tc").show();
	$(".fenlei_tc").show();
}
//更新图表所在分类
function updateBtUserStudyChart(){
	if(categoryId2==null || categoryId2==''){
		errorAlert("", "请选择分类！");
		return false;
	}
	var data={studyChartId:studyChartId,categoryId:categoryId2}
	$.axs("/betaInvest/btUserStudyChart/updateBtUserStudyChart.do",data,false,function(data){
		var result=data.retData;
		if(data.retCode=='0000'){
			errorAlert("","更新成功！");
			categoryId2=null;
			findUserCategoryCount();
			findUserCategory();
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	})
}

//选择哪个行业ID
function selectCategoryId1(cateId){
	categoryId1=cateId;
	findBtUserStudyChart(0);
	if($(".echarts_public").length<1){
		$(".baogao_zwsj").show();
		$("#studyChartList").hide();
	}else{
		$(".baogao_zwsj").hide();
		$("#studyChartList").show();
	}
}
//选择哪个行业ID
function selectCategoryId2(cateId){
	categoryId2=cateId;
}
//跳转编辑页面
function editUserStudyChart(url,chartName,chartId){
	location.href="/myResearch/newseditChart.html" + url.substring(0, url.indexOf("&ZBQDATA")) +"&chartName=" + chartName + "&chartId=" + chartId;
}
//跳转预览页面
function findUserStudyChart(url,chartName,chartId){
	location.href="/myResearch/newschartPreview.html" + url.substring(0, url.indexOf("&ZBQDATA")) + "&chartName=" + chartName + "&chartId=" + chartId;
}

/**
 * 加载图表
 * @param URL
 * @param id
 */
function initchart(URL,id,chartName,thiz) {
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
				//console.log(params)
				//7月4号玲修改提示弹窗start
				var content='';
				$(params).each(function(index,item){
					
					var str = "";
					if(item.seriesName.indexOf("员工总人数同比变化率（报告期）") > -1 || item.seriesName.indexOf("%") > -1 || item.seriesName.indexOf("比例") > -1 || item.seriesName.indexOf("比率") > -1){
						str = "%";
					}
//					var yushu=index%params.length;
					var bg=color[index];
					//console.log(item)
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
		/*tooltip: {
			trigger:'axis',
			formatter:function(params){
				var showTC = params[0].name + "<br/>";
				$(params).each(function(){
					showTC += this.seriesName + ":" + this.data + "</br>";
				})
				return showTC;
			}
		},*/
		dataZoom: [{
            show: true,
            realtime: true,
            start: 0,
            end:100,
            preventDefaultMouseMove:true
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
	        }//data:dateTemp
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
//	myChart.showLoading();
	
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
//	myChart.hideLoading();
	
	myChart.setOption(option);
	window.addEventListener("resize", function() {
		myChart.resize();
	});
	
	/*$("#"+id).click(function(){
		findUserStudyChart(URL, chartName, id);
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
//			console.log(result)
//			if(result==null){
//				return false;
//			}
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
//	if(r != null){
//		r[2] = encodeURI(r[2]);
//	}
	if(r != null){
		param = decodeURIComponent(r[2]);
	}
//	if("zbText" == paramName){
//		console.log(URL)
	param = encodeURI(param);
//	}
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
