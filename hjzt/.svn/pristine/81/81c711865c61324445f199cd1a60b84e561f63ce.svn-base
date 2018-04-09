$(function(){
	//绑定下拉框单击事件
	$("#selectUrl").find("li").on("click",function(){
		window.location.href=$(this).find("a").eq(0).attr("href");
	});
	//初始化所有指标
	initAllIndicators();
	//初始化对比时间
	findComparisonDate();
	//单击时间
	$("#contrastDate").delegate("label","click",function(e){
		var num=0;
		$("input[name='timeBk']").each(function(){
			if($(this).next().hasClass("on")){
				num++;
			}
		});
		if(num==1){
			if ($(this).parent().find("label.checkbox").hasClass("on")) {
				errorAlert("","至少选择一个日期！");
				return false;
			}
		}
		if ($(this).parent().find("label.checkbox").hasClass("on")) {
			$(this).parent().find("label.checkbox").removeClass("on");
			$(this).parent().find("label.checkboxWord").css("color", "");
		} else {
			$(this).parent().find("label.checkbox").addClass("on");
			$(this).parent().find("label.checkboxWord").css("color", "#2fa6dc");
		}
		changeParam();
	});
	
	$("#comparisonStockCode").delegate("i","click",function(){
		$(this).parent().hide();
	})
	
	//点击重新选择
	$("#cxxz_zb").on("click",function(){
//		$("#showIndicators").show();
		$(".diy_zb_tc").show();
		$(".jiabeijing").show();
		$(".morezb_box").css("display","block");
	})
	//重新选择指标后修改指标的内容
	$("#allIndicators").delegate("a","click",function(){
		var val=$(this).text();
		$("#tagValue em").text(val);
	})
	//点击确定和取消的时候关闭弹窗
	$("#submitButton").on("click",function(){
		$("#showIndicators").hide();
	});
	$("#cancelButton").on("click",function(){
		$("#showIndicators").hide();
	});
	//重新选择指标名称
	$("#allIndicators a").on("click",function(){
		var text = $(this).text();
		var column=$(this).attr("data-value");
		$("#tagValue").find("em").eq(0).html(text);
		$("#tagValue").find("em").eq(0).attr("data-value",column);
		//修改样式
		$(this).parents(".zb_rbox").find("a").removeClass("on");
		$(this).addClass("on");
//		$("#allIndicators").hide();
	});
	//重新选择指标名称---确定按钮
	$("#submitButton").on("click",function(){
		changeParam();
		$("#showIndicators").hide();
	});
	//重新选择指标名称---取消按钮
	$("#cancelButton").on("click",function(){
		var tatileValue=$("#titleName").attr("data-value");
		var titleName=$("#titleName").attr("data-columnValue");
		$("#tagValue").find("em").eq(0).html(titleName);
		$("#tagValue").find("em").eq(0).attr("data-value",tatileValue);
		$("#showIndicators").hide();
		//修改样式
		$("#showIndicators").find("a").removeClass("on");
	});
});

/**
 * 初始化所有指标
 */
function initAllIndicators(){
	$.axs("/betaInvest/finance/findIndicators.do",null,true,function(data){
		if(data.retData!=null){
			var alreadHtml="";
			var indicatorsList=data.retData;
			var letterTmp="";//控制是否追加大写字母
			var html='';
			for(var i=0;i<indicatorsList.length;i++){
				var obj=indicatorsList[i];
				if(alreadHtml.indexOf(obj.indicatorsName)==-1){
					var letter=obj.pinyinHeader;
					if((letterTmp!="" && letterTmp!=letter) || (i+1)==indicatorsList.length){
						html+='</p>';
						html+='</div>';
						html+='<div class="clr"></div>';
						$("#allIndicators").append(html);
						html='';
					}
					if(letterTmp!=letter){
						letterTmp=letter;
						html+='<div class="r_box_list">';
						html+='<span>'+letter+'</span>';
						html+='<p>';
					}
					alreadHtml+=obj.nameCn+",";
					html+='<a href="javascript:void(0);" data-table="'+obj.tableName+'" data-value="'+obj.indicators+'">'+obj.indicatorsName+'</a>';
				}
			}
		}
	});
}
/**
 * 获取财务对比时间
 */
function findComparisonDate(){
	$("#contrastDate").html("");
	var comparisonStockCodes=getAllStockCode();
//	$.axs("/betaInvest/finance/findIndicatorsComparisonDate.do",{stockCodes:comparisonStockCodes},false,function(data){
//		if(data.retData!=null){
//			var resultList=data.retData;
//			var html='';
//			for (var int = 0; int < resultList.length; int++) {
//				var result=resultList[int];
//				html+='<div class="data-checkbox">';
//				html+='<input type="checkbox" value="'+result.reportPeriod+'" name="timeBk" />';
//				html+='<label for="time1" class="checkbox on"></label>';
//				html+='<label class="checkboxWord" for="time1" style="color: rgb(47, 166, 220);">'+result.dateTime+'</label>';
//				html+='</div>';
//			}
//			$("#contrastDate").html(html);
//			
//			//初始化页面
//			changeParam();
//		}
//	});
	$.axs("/betaInvest/finance/findIndicatorsComparisonDateAddShangshi.do",{stockCodes:comparisonStockCodes},false,function(data){
		if(data.retData!=null){
			var resultList=data.retData;
			var html='';
			for (var int = 0; int < resultList.length; int++) {
				var result=resultList[int];
				html+='<div class="data-checkbox">';
				html+='<input type="checkbox" value="'+result.reportPeriod+'" name="timeBk" />';
				html+='<label for="time1" class="checkbox on"></label>';
				html+='<label class="checkboxWord" for="time1" style="color: rgb(47, 166, 220);">'+result.dateTime+'</label>';
				html+='</div>';
			}
			$("#contrastDate").html(html);
			
			//初始化页面
			changeParam();
		}
	});
}
/**
 * 改变搜索条件
 */
function changeParam(){
	var codeS=getAllStockCode();
	//日期
	var dateValue="";
	$("input[name='timeBk']").each(function(){
		if($(this).next().hasClass("on")){
			dateValue+="'"+$(this).val()+"',";
		}
	});
	//dateValue="'2016-06-30','2015-12-31','2015-06-30','2014-12-31','2014-06-30'";
	if(dateValue=="" || dateValue==null || dateValue=="undefined"){
		console.log("日期为空:"+dateValue);
		return false;
	}
	dateValue=dateValue.substring(0,dateValue.length-1);
	//财物指标
	var indicatorsNames="";
	$("#tagValue").find("em").each(function(){
		var indicatorsName=$(this).attr("data-value");
		indicatorsNames+="'"+indicatorsName+"',";
	});
	indicatorsNames=indicatorsNames.substring(0,indicatorsNames.length-1);
	if(indicatorsNames=="" || indicatorsNames==null || indicatorsNames=="undefined"){
//		console.log("指标为空:"+indicatorsNames);
		return false;
	}
	//查询财务指标数据
	findComparisonData(codeS,dateValue,indicatorsNames);
}
/**
 * 获取财务对比数据
 */
function findComparisonData(comparisonStockCodes,dateTimes,financeIndicatorIds){
	
	var titleName=$("#tagValue").find("em").eq(0).text();
	var tatileValue=$("#tagValue").find("em").eq(0).attr("data-value");
	$("#titleName").text("【"+titleName+"】对比");
	$("#titleName").attr("data-value",tatileValue);
	$("#titleName").attr("data-columnValue",titleName);
	
	
//	$("#indicatorsComparisonInfo").html("");
//	
//	var financeIndicatorIdArray=[];
//	var titleTrHtml='';
//	titleTrHtml+='<tr>';
//	titleTrHtml+='<td scope="col">企业/报告期</td>';
//	var dateValueSplit=dateTimes.split(",");
//	for(var j=0;j<dateValueSplit.length;j++){
//		var date=dateValueSplit[j];
//		date=date.substring(1,date.length-1);
//		if(date.indexOf("FY")>-1){
//			date=date.substring(0,4)+"-12-31"
//		}else if(date.indexOf("HY")>-1){
//			date=date.substring(0,4)+"-06-30"
//		}
//		titleTrHtml+='<td scope="col">'+date+'</td>';
//	}
//	titleTrHtml+='</tr>';
//	$("#indicatorsComparisonInfo").append(titleTrHtml);
	
	
//	$.axs("/betaInvest/finance/findTrendComparison.do",{stockCodes:comparisonStockCodes,dateTimes:dateTimes,financeIndicatorId:financeIndicatorIds},true,function(data){
//		if(data.retData!=null){
//			var resultList=data.retData;
//			var stockCodeTr="";
//			$.each(resultList,function(index,result){
//				var dataTrHtml='<tr>';
//				dataTrHtml+='<td scope="row"><a href="/businessDetails/newTBindex.html?stockCode='+result.stockCode+'&stockName='+result.stockName+'" >'+result.stockName+'('+result.stockCode+')</a></td>';
//				$.each(dateValueSplit,function(index,item){
//					$.each(result,function(key,value){
//						if(item.substring(1,item.length-1)==key){
////							console.log("key:"+$("#tagValue").find("em").eq(0).attr("data-value"));
//							if($("#tagValue").find("em").eq(0).attr("data-value").indexOf("_")>-1){
//								console.log($("#tagValue").find("em").eq(0).text());
//								if($("#tagValue").find("em").eq(0).text().indexOf("市值")>-1){
//									dataTrHtml+='<td>'+(value==null?"--":(value/100000000.00).toFixed(2))+'</td>';
//								}else{
//									dataTrHtml+='<td>'+(value==null?"--":value.toFixed(2))+'</td>';
//								}
//							}else{
//								if($("#tagValue").find("em").eq(0).text().indexOf("每股收益")>-1){
//									dataTrHtml+='<td>'+(value==null?"--":value.toFixed(2))+'</td>';
//								}else{
//									dataTrHtml+='<td>'+(value==null?"--":(value/10000).toFixed(2))+'</td>';
//								}
//							}
//							
//						}
//					});
//				});
//				dataTrHtml+='</tr>';
//				$("#indicatorsComparisonInfo").append(dataTrHtml);
//				
//			});
//			//画图
//			chart();
//		}
//	});
	
	
	//改版表格---第一行锁定，后面滑动
	//对比的公司
	$("#zbmcTable").html("");
	//选择的时间
	$("#dataTHead").html("");
	//指标对应的数据
	$("#dataTbody").html("");
	//--时间值
	var titleTrHtml='';
	titleTrHtml+='<tr>';
//	titleTrHtml+='<td scope="col">企业/报告期</td>';
	var dateValueSplit=dateTimes.split(",");
	for(var j=0;j<dateValueSplit.length;j++){
		var date=dateValueSplit[j];
		date=date.substring(1,date.length-1);
		if(date.indexOf("FY")>-1){
			date=date.substring(0,4)+"-12-31"
		}else if(date.indexOf("HY")>-1){
			date=date.substring(0,4)+"-06-30"
		}
		titleTrHtml+='<th class="shuzi">'+date+'</th>';
	}
	titleTrHtml+='</tr>';
	$("#dataTHead").html(titleTrHtml);
	//数据显示-------findTrendComparisonAddShangshi
	$.axs("/betaInvest/finance/findTrendComparisonAddShangshi.do",{stockCodes:comparisonStockCodes,dateTimes:dateTimes,financeIndicatorId:financeIndicatorIds},true,function(data){
		if(data.retData!=null){
			var resultList=data.retData;
			var stockCodeTr="";
			var showDanWeiName="单位:元";
			var stockTrHtml="";
			var dataTrHtml="";
			$.each(resultList,function(index,result){
				//公司加载
				if(isXSBCompany(result.stockCode)){
					stockTrHtml+='<tr><td><a href="/businessDetails/newTBindex.html?stockCode='+result.stockCode+'&stockName='+result.stockName+'"">'+result.stockName+'（<em>'+result.stockCode+'</em>）</a></td></tr> '
				}else{
					stockTrHtml+='<tr><td><a href="javascript:void(0)">'+result.stockName+'（<em>'+result.stockCode+'</em>）</a></td></tr> '
				}
				
				dataTrHtml+='<tr>';
				//dataTrHtml+='<td scope="row"><a href="/businessDetails/newTBindex.html?stockCode='+result.stockCode+'&stockName='+result.stockName+'" >'+result.stockName+'('+result.stockCode+')</a></td>';
				$.each(dateValueSplit,function(index,item){
					$.each(result,function(key,value){
						if(item.substring(1,item.length-1)==key){
							if($("#tagValue").find("em").eq(0).attr("data-value").indexOf("_")>-1){
//								console.log($("#tagValue").find("em").eq(0).text());
								if($("#tagValue").find("em").eq(0).text().indexOf("市值")>-1){
									showDanWeiName="单位:亿元";
									dataTrHtml+='<td>'+(value==null?"--":(value/100000000.00).toFixed(2))+'</td>';
								}else if($("#tagValue").find("em").eq(0).text().indexOf("每股")>-1){
									showDanWeiName="单位:元";
									dataTrHtml+='<td>'+(value==null?"--":value.toFixed(2))+'</td>';
								}else{
									var danwei_1=$("#tagValue").find("em").eq(0).text()
									danwei_1=danwei_1.substring(danwei_1.indexOf("（")+1,danwei_1.indexOf("）"));
									if(danwei_1==null || danwei_1=="" || danwei_1==undefined){
										danwei_1="";
									}
									showDanWeiName="单位:"+danwei_1;
									dataTrHtml+='<td>'+(value==null?"--":value.toFixed(2))+'</td>';
								}
							}else{
								if($("#tagValue").find("em").eq(0).text().indexOf("每股收益")>-1){
									dataTrHtml+='<td>'+(value==null?"--":value.toFixed(2))+'</td>';
								}else{
									showDanWeiName="单位:万元";
									dataTrHtml+='<td>'+(value==null?"--":(value/10000).toFixed(2))+'</td>';
								}
							}
						}
					});
				});
				dataTrHtml+='</tr>';
//				$("#indicatorsComparisonInfo").append(dataTrHtml);
				
			});
			$("#zbmcTable").html(stockTrHtml);
			$("#dataTbody").html(dataTrHtml);
			//画图
			chart(showDanWeiName);
		}
	});
}

/**
 * 画图
 */
function chart(showDanWeiName){
	// 指标对标
	var myChart01 = echarts.init(document.getElementById('sj_zhuxingtu'));
	//X轴--时间值
	var columns=new Array();
	$("#dataTHead").find("tr").each(function(index){
		if(index==0){
			$(this).find("th").each(function(d){
//				if(d!=0){
					columns.push($(this).text());
//				}
			});
			return false;
		}
	});
	var columnsTmp=[];
	for (var i = columns.length-1; i >=0; i--) {
		columnsTmp.push(columns[i]);
	}
	columns=columnsTmp;
//	console.log(columns.length);
//	console.log(columns)
//	var nameS=getAllStockName();
	//股票名称
//	var stockNamesSplit=nameS.split(",");
	//公司名字集合
	var titleNames=new Array();
//	for(var i=0;i<stockNamesSplit.length;i++){
//		titleNames.push(stockNamesSplit[i]);
//	}
	$("#zbmcTable").find("a").each(function(){
		var stock=$(this).text();
		titleNames.push(stock.substring(0,stock.indexOf("（")));
	});
	
	var colorArray=['#62a6f2','#55c2f4','#ae90db','#909edb'];
	option = {
	    tooltip : {
	        trigger: 'axis',
	        show:true,
	        formatter:function(params){
//	        	console.log(params);
	        	if(params.length==1){
	        		var divHtml='<div class="sanban_tips">'+
      	    					'<p class="sb_tips_title">'+params[0].name+'</p>'+
      	    					'<div class="sb_tips_content">'+
      	    						'<span class="tips_leibie fl" style="background-color: '+colorArray[0]+';">'+params[0].seriesName+'：</span>'+
      	    						'<span class="tips_leibie_num fl">'+params[0].value+'</span>'+
      	    						'<div class="clr"></div>'+
      	    					'</div>'+
      	    				'</div>';
                	return divHtml;
	        	}else if(params.length==2){
	        		var divHtml='<div class="sanban_tips">'+
      	    					'<p class="sb_tips_title">'+params[0].name+'</p>'+
      	    					'<div class="sb_tips_content">'+
      	    						'<span class="tips_leibie fl" style="background-color: '+colorArray[0]+';">'+params[0].seriesName+'：</span>'+
      	    						'<span class="tips_leibie_num fl">'+params[0].value+'</span>'+
      	    						'<div class="clr"></div>'+
      	    					'</div>'+
      	    					'<div class="sb_tips_content">'+
      	    						'<span class="tips_leibie fl" style="background-color: '+colorArray[1]+';">'+params[1].seriesName+'：</span>'+
      	    						'<span class="tips_leibie_num fl">'+params[1].value+'</span>'+
      	    						'<div class="clr"></div>'+
      	    					'</div>'+
      	    				'</div>';
                	return divHtml;
	        	}else if(params.length==3){
	        		var divHtml='<div class="sanban_tips">'+
      	    					'<p class="sb_tips_title">'+params[0].name+'</p>'+
      	    					'<div class="sb_tips_content">'+
      	    						'<span class="tips_leibie fl" style="background-color: '+colorArray[0]+';">'+params[0].seriesName+'：</span>'+
      	    						'<span class="tips_leibie_num fl">'+params[0].value+'</span>'+
      	    						'<div class="clr"></div>'+
      	    					'</div>'+
      	    					'<div class="sb_tips_content">'+
      	    						'<span class="tips_leibie fl" style="background-color: '+colorArray[1]+';">'+params[1].seriesName+'：</span>'+
      	    						'<span class="tips_leibie_num fl">'+params[1].value+'</span>'+
      	    						'<div class="clr"></div>'+
      	    					'</div>'+
      	    					'<div class="sb_tips_content">'+
      	    						'<span class="tips_leibie fl" style="background-color: '+colorArray[2]+';">'+params[2].seriesName+'：</span>'+
      	    						'<span class="tips_leibie_num fl">'+params[2].value+'</span>'+
      	    						'<div class="clr"></div>'+
      	    					'</div>'+
      	    				'</div>';
                	return divHtml;
	        	}else if(params.length==4){
	        		var divHtml='<div class="sanban_tips">'+
      	    					'<p class="sb_tips_title">'+params[0].name+'</p>'+
      	    					'<div class="sb_tips_content">'+
      	    						'<span class="tips_leibie fl" style="background-color: '+colorArray[0]+';">'+params[0].seriesName+'：</span>'+
      	    						'<span class="tips_leibie_num fl">'+params[0].value+'</span>'+
      	    						'<div class="clr"></div>'+
      	    					'</div>'+
      	    					'<div class="sb_tips_content">'+
      	    						'<span class="tips_leibie fl" style="background-color: '+colorArray[1]+';">'+params[1].seriesName+'：</span>'+
      	    						'<span class="tips_leibie_num fl">'+params[1].value+'</span>'+
      	    						'<div class="clr"></div>'+
      	    					'</div>'+
      	    					'<div class="sb_tips_content">'+
      	    						'<span class="tips_leibie fl" style="background-color: '+colorArray[2]+';">'+params[2].seriesName+'：</span>'+
      	    						'<span class="tips_leibie_num fl">'+params[2].value+'</span>'+
      	    						'<div class="clr"></div>'+
      	    					'</div>'+
      	    					'<div class="sb_tips_content">'+
      	    						'<span class="tips_leibie fl" style="background-color: '+colorArray[3]+';">'+params[3].seriesName+'：</span>'+
      	    						'<span class="tips_leibie_num fl">'+params[3].value+'</span>'+
      	    						'<div class="clr"></div>'+
      	    					'</div>'+
      	    				'</div>';
                	return divHtml;
	        	}
	        }
	    },
	    color:colorArray,//['#62a6f2','#55c2f4','#ae90db','#909edb'],
	    legend: {
	        data:titleNames
	    },
	    calculable : true,
	    xAxis : [
	        {
	            type : 'category',
	            data : columns
	        }
	    ],
	    yAxis : [
	        {
				name : showDanWeiName,
	            type : 'value'
	        }
	    ],
		//color:['#ff3333','#339966',],
	    series : function(){
	    	var serie=new Array();
	    	$("#dataTbody").find("tr").each(function(index){
//	    		if(index!=0){
	    			var seriesData=new Array();
	    			$(this).find("td").each(function(d){
//	    				if(d!=0){
	    					var a='';
	    					if($(this).text()=='--'){
	    						a=0;
	    					}else{
	    						a=$(this).text();
	    					}
	    					//console.log(a)
	    					seriesData.push(a);
//	    				}
	    			});
	    			var seriesDataTmp=new Array();
	    			for (var i = seriesData.length-1; i >=0; i--) {
	    				seriesDataTmp.push(seriesData[i]);
	    			}
	    			var object={
			    	        name:titleNames[index],
			    	        type:'line',
			    	        symbol: 'circle',
			    	        data:seriesDataTmp,
			    			label: {
			    	            normal: {
			    	                show: true,
			    	                position: 'top'
			    	            }
			    	        }
			    	    }
		    		serie.push(object)
//	    		}
	    	});
	    	return serie;
    	}()
	};

	myChart01.setOption(option);
	window.addEventListener("resize", function() {
		myChart01.resize();
	});
}
