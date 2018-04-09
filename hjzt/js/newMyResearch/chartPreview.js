var columns = decodeURI(getParamByUrl("indexCode")); //指标名称
var dateType = decodeURI(getParamByUrl("dateType")); //时间类型
var stockCode = decodeURI(getParamByUrl("stockCode")); //股票代码

var ZXColumns = decodeURI(getParamByUrl("ZXColumns")); //柱形图字段
var lineColumns = decodeURI(getParamByUrl("lineColumns")); //折线图字段
var MJColumns = decodeURI(getParamByUrl("MJColumns")); //面积图字段

var chartName=decodeURI(getParamByUrl("chartName"));//echart标题
var chartId = decodeURI(getParamByUrl("chartId")); //图表id

var indexCodes = decodeURI(getParamByUrl("indexCode")).split(","); //获取指标选取id
var dataDateType = decodeURI(getParamByUrl("dataDateType")); //数据的最小统计单位
var businessTypes = decodeURI(getParamByUrl("businessTypes")); //根据URL获取

var yRColumnArr = [ "class_115", "class_124", "class_142", "class_143",
            		"class_148", "class_151", "class_154", "ZDF", "class_222", "class_225",
            		"class_227", "class_230", "class_232", "class_234", "class_236",
            		"class_238" ]; // 多个的时候需要显示在y轴的右边的数据

var bfhColumnArr = [ "ZDF", "class_222", "class_225", "class_227", "class_232",
             		"class_234", "class_236", "class_238", "class_230",
             		"sudongbilv_zidingyidecaiwuzhibiao",
             		"liudongbilv_zidingyidecaiwuzhibiao" ]; // 需要数据加百分号的
$(function(){
	//回显备注
	$("#chartMS").text(decodeURI(getParamByUrl("chartMS")));
	$("#nedtitle").html(chartName);
	//请求接口
	findZBData();
	findGLLB();
	
	//点击编辑的时跳转到编辑的页面
	$(".tubiao_btn span").on("click",function(){
		window.location.href="/myResearch/newseditChart.html" + (window.location.href).substring((window.location.href).indexOf("?"));
	})
	
	//导出
	$("#outBtn").click(function(){
//		method5("outTable");
		// 将 id 为 content 的 div 渲染成 canvas
	    html2canvas(document.getElementById("pdfContent"), {

	        // 渲染完成时调用，获得 canvas
	        onrendered: function(canvas) {
				//console.log(canvas);
	            // 从 canvas 提取图片数据
	            var imgData = canvas.toDataURL('image/jpeg');

	            var doc = new jsPDF("p", "mm", "a4");
	            //                               |
	            // |—————————————————————————————|                     
	            // A0 841×1189                           
	            // A1 594×841                            
	            // A2 420×594                            
	            // A3 297×420                            
	            // A4 210×297                            
	            // A5 148×210                            
	            // A6 105×148                            
	            // A7 74×105                             
	            // A8 52×74                              
	            // A9 37×52                              
	            // A10 26×37             
	            //     |——|———————————————————————————|
	            //                                 |——|——|
	            //                                 |     |      
	            doc.addImage(imgData, 'JPEG', 0, 0,210,297);

	            doc.save('图表分析.pdf');
	        }
	    });
	});
//	给主体部分一个最小高度
	var min_height = $(window).height()-160;
	$(".main_box").css("min-height",min_height);
	
	
	
	$("#inpVal").focus(function(){
		var glNum = parseInt($("#glTotal").text());
		if(glNum >= 50){
			$.zmAlert("最多可关联50家股票");
			$("#inpVal").attr("readonly", true);
		}else{
			$("#inpVal").attr("readonly", false);
		}
	})
	
	
	/*信息补全开始*/
	//首页顶部搜索
	$("#inpVal").autocomplete({
		minLength: 2,
		source: function(request, response) {
			findCodeName(request, response);
		},
		delay: 500,
//		focus:true,
		select: function(event, ui) {
			var item = ui.item;
			if($("#inpVal").val() != "") {
				var value=item.value;
				var code=value.substring(value.indexOf("(")+1,value.indexOf(")"));
				var name=value.substring(0,value.indexOf("("));
				var glNum = parseInt($("#glTotal").text());
				if(glNum >= 50){
					$.zmAlert("最多可关联50家股票");
				}else{
					addUserStockChart(code,name);
				}
			} else {
				$.zmAlert("请输入要检索的信息");
			}
			//$("#ui-id-2").hide();
		},
		close: function(event, ui){
			$("#inpVal").val("");
		}
	});
	/*信息补全结束*/
})

/**
 * 查询指标数据
 */
function findZBData(){
	var allZBName = {};
	var ZBSZ = JSON.parse(decodeURI(findURLById()));
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
			drawLine(jsonD,lineColumns, ZXColumns, MJColumns);
			showTable(jsonD);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

/**
 * 显示表格
 */
function showTable(tableData){
//	console.log(tableData)
	var showColumns = "";
	showColumns = columns;
	var dateHtml = "<th>指标名称</th>";
	$(tableData.date).each(function(i, item){
		dateHtml += "<th>"+item+"</th>";
	})
	$("#dateTr").html(dateHtml);
	
	var bodyHtml = "";
	var split = showColumns.split(",");
	$(tableData.arr).each(function(index, item){
		$(split).each(function(){
			if(item.code == this){
//				console.log(item.code + "====" + this)
				bodyHtml += "<tr>"
					+ "<td>"+((item.name == undefined || item.name == null || item.name == "") ? "--" : item.name)+"</td>";
				$(item.data).each(function(index, itemd){
					var str = "";
					if($.inArray(item.code,bfhColumnArr) > -1){
						str = "%";
					}
//					console.log(itemd)
					bodyHtml += "<td>"+ ((itemd == null || (itemd == "" && itemd != 0)) ? "--" : (itemd.toFixed(2)) + str) +"</td>";
				})
					bodyHtml += "</tr>";
			}
		})
	})
	$("#msgTbody").html(bodyHtml);
}

//折线图
function drawLine(chartData,showLineColumns,showZXColumns,showAreaColumns) {
	
	var showBFB = 100;
	if(chartData.date.length != 0 && chartData.date != null){
		showBFB = (8/chartData.date.length)*100;
	}
//          郭建杰7月12号修改滚动条起始值
	if(showBFB == 100){
		showBFB=showBFB-8;
	}
	var color=['#62a6f2', '#55c2f4'];
	var myChart = echarts.init(document.getElementById('yulan_tu'));
	option = {
		animation:false,
		color: ['#62a6f2', '#55c2f4'],
//		legend: {
//			data: ['近利润(万)'],
//			top: '10px'
//
//		},
		toolbox: {
			show: true,
			feature: {
				saveAsImage: {
					show: true,
					title:'保存图片',
	        icon:'image:///saasBeta/images/ave.png'

				}
			},
			top: '10px',
			right:'5%'
		},
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
	    			content+='<span class="tips_leibie_num fl">'+ ((item.data == undefined || item.data == null || item.data == undefined || (item.data == "" && item.data != 0)) ? "--" : ((item.data).toFixed(2)) + str) +'</span>';
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
            end:showBFB
        },
        {
            type: 'inside',
            realtime: true,
            start: 0,
            end: showBFB
        }],
		xAxis: [{
			type: 'category',
			data: chartData.date,
			boundaryGap : true,
			show : true,  
	        axisLabel:{//wtl 7.6  3118 所有系统只带公司简称的都需要加链接包括柱形图下面的
	            interval:0,
	            clickable:true
	        },
			triggerEvent:true
		}],
		yAxis: [{
			type: 'value',
			name: '',
			axisLabel: {
				formatter: '{value}'
			}
		}],
		grid: {
			left: '1%',
			right: '1%',
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
	var legendDataArr = []; //显示的legend
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
				            			return ((param.data == 0.00 || param.data == 0) ? "" : (param.data.toFixed(2)) + str);
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
					legendDataArr.push(lineItem.name);
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
							barWidth:"30",
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
				            			return ((param.data == 0.00 || param.data == 0) ? "" : (param.data.toFixed(2)) + str);
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
					legendDataArr.push(zxItem.name);
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
					legendDataArr.push(areaItem.name);
				}
			})
		})
	}
	var legend = {     
			top: '10px',
			data:legendDataArr
		 };
	option.legend = legend;
	myChart.setOption(option);
	window.addEventListener("resize", function() {
		myChart.resize();
	});
	//wtl 7.6  3118 所有系统只带公司简称的都需要加链接包括柱形图下面的
	myChart.on('click', function (params) {
		if(params.componentType == "xAxis"){
			var pv = params.value;
			if(pv != "" && pv != null){
				if(pv.indexOf("(") > -1 && pv.indexOf(")") > -1){
					var stockName = pv.substring(0, pv.indexOf("("));
					var stockCode = pv.substring(pv.indexOf("(") + 1, pv.indexOf(")"));
					location.href = "/businessDetails/newTBindex.html?stockCode="+stockCode+"&stockName="+stockName;
				}
			}
		}
    });
}

/**
 * 通过URL获取参数值
 */
function getParamByUrl(paramName){
	var param = "";
	var reg = new RegExp("(^|&)"+paramName+"=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); // 匹配目标参数
	if(r != null){
		param = decodeURIComponent(r[2]);
	}
	param = encodeURI(param);
	return param;
}

/**
 * 添加用户关联企业
 */
function addUserStockChart(sCode,sName){
	$.axs("/betaInvest/btUserStockChart/insertStockChart.do",{stockCode:sCode, stockName:sName, chartId:chartId, chartName:chartName},true,function(data){
		if(data.retCode=='0000'){
			var result=data.retData;
			findGLLB();
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	})
}

/**
 * 查询关联列表
 */
function findGLLB(){
	$.axs("/betaInvest/btUserStockChart/findByChartId.do",{chartId:chartId},true,function(data){
		if(data.retCode=='0000'){
			var result=data.retData;
			if(result != null && result.length > 0){
				$(".chart_seach_result").show();
				$(".chart_zanwugegu").hide();
				var lb = "";
				$("#glTotal").text(result.length);
				$(result).each(function(i, item){
					var className = "red";
					if(item.ZDF != null && item.ZDF < 0){
						className = "green";
					}
					lb += "<div class='chart_info'>" +
							"<div class='chart_gp fl'>" +
									"<h2>"+item.stockName+"</h2>" +
									"<span>"+item.stockCode+"</span>" +
								"</div>" +
								"<div class='chart_gp_newsprice fl'>" +
									"<span class="+className+">"+(item.newPrice == null || (item.newPrice == "" && item.newPrice != 0) ? "-" : item.newPrice.toFixed(2))+"</span>" +
									"<p>最新价</p>" +
								"</div>" +
								"<div class='chart_gp_zdf fl'>" +
									"<span class="+className+">"+(item.ZDF == null || (item.ZDF == "" && item.ZDF != 0) ? "--" : (item.ZDF.toFixed(2)+"%"))+"</span>" +
									"<p>涨跌幅</p>" +
								"</div>" +
								"<div data-value="+item.stockCode+" class='chart_caozuo fr'>" +
									"<i></i>" +
								"</div>" +
								"<div class='clr'></div>" +
							"</div>";
				})
				$(".chart_result_list").html(lb);
				
				//跳转链接
				$(".chart_gp").click(function(){
					location.href = "/businessDetails/newTBindex.html?stockCode="+$(this).children("span").text()+"&stockName="+$(this).children("h2").text();
				})
				
				//删除此关联代码
				$(".chart_caozuo").click(function(){
					delSC($(this).attr("data-value"));
				})
			}else{
				$(".chart_seach_result").hide();
				$(".chart_zanwugegu").show();
			}
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	})
}

/**
 * 删除关联代码
 * @param sCode
 */
function delSC(sCode){
	$.axs("/betaInvest/btUserStockChart/delSCByUserId.do",{stockCode:sCode, chartId:chartId},true,function(data){
		if(data.retCode!='0000'){
			errorAlert(data.retCode, data.retMsg);
		}else{
			findGLLB();
		}
	})
}

//根据图表id查询URL
function findURLById(){
	var zbd = "";
	$.axs("/betaInvest/btUserStudyChart/findUrlById.do",
			{chartId:chartId}, false,function(data){
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