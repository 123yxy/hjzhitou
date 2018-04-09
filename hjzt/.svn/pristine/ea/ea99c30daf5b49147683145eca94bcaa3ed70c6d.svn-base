//行业排行------检索
var findDataStockCode_hangye=getUrlParam("stockcode");
var contrasts = null;
$(function(){
	//判断获取的股票代码不空时查询数据
	if(findDataStockCode_hangye==null || findDataStockCode_hangye=="" || findDataStockCode_hangye==undefined || findDataStockCode_hangye=="null" || findDataStockCode_hangye=="undefined"){
		//隐藏财务数据模块的DIV
		$("#content_gpph").hide();
		blockDiv.content_gpph=false;
		return false;
	}
	contrasts = findContrastCompany();
	//查询指标名称
	findIndicatorName();
	changFindRankingParam();
	/**
	 * 点击下拉显示
	 */
//	$(document).on("click", ".selectBox2", function() {
//		var ul = $(this).find("ul"),
//			display = ul.css("display");
//			
//			
//		display = display == "block" ? 0 : 1;
//		
//		$(".selectBox2 ul").css("display", "none");
//		$(this).removeClass("on");
//		if (display) {
//			ul.css("display", "block");
//			$(this).addClass("on");
//			display = 0;
//			ul.find("li").each(function() {
//				display += $(this).height();
//			});
//			ul.css("display", "none");
//			
//			if (display > 200) {
//				ul.css("height",220);
//				ul.css("overflow", "auto");
//			}
//			
//			ul.slideDown(100);
//		} else {
//			ul.slideUp();
//		}
//		
//		return false;
//	});
	   
	/**
	 * 点击列表 文字和 value 上去
	 */
	$(document).on("click", ".selectBox2 ul li", function() {
		var p = $(this).parent().parent().find("p");
		p.addClass("on");
		p.text($(this).text());
		p.attr("data-indicatorid", $(this).attr("data-indicatorid"));
		$(this).addClass("on").siblings().removeClass("on");
		//切换指标查询数据
		changFindRankingParam();
	});
	
//	$(document).on("click", function() {
//		$(".selectBox2 ul").slideUp();
//	});
	
	//点击加入对比显示弹窗
//	$("#stockRanking").delegate(".gpph","click",function(){
//		$(".czzx_content").addClass("on");
//		$(".gegu_zb").show();
//	})
	/**
	 * 开始对比
	 */
	$("#contrastList_a").click(function(){
		var stockCodes = "";
		var stockNames = "";
		$(".duibiCompany").each(function(){
			stockCodes += $(this).attr("data-code") + ",";
			stockNames += $(this).attr("data-name") + ",";
		})
		if(stockCodes != "" && stockNames != ""){
			location.href = "/multidimensionalStock/multidStockanalysisTable.html";
		}else{
			$.zmAlert("请选择要对比的企业");
		}
	});
	
	/*
	 * 鼠标经过行业排行的指标处显示下拉框
	 */
	$(".gjj_hyph_select .selectBox2").on("mouseenter",function(){
		$(this).addClass("on");
		$(this).find("#indicatorName").stop().slideDown();
	})
	$(".gjj_hyph_select .selectBox2").on("mouseleave",function(){
		$(this).removeClass("on");
		$(this).find("#indicatorName").stop().slideUp();
	})
	//点击下拉的li给样式
//	$("#indicatorName li").on("click",function(){
//		$(this).addClass("on").siblings().removeClass("on");
//	})
	
});
//行业加载跟多控制
var secondLevelTrade=null;//所有行业数据
var secondLevelTradeNames=[];
var stockLevelTrade={};//公司对应的二级行业id
//stockLevelTrade[data.obj.stockcode]=data.obj.hangyeId;
//				{"430002":1812,"430003":1813}
var length=0;//行业数据显示位置
/**
 * 查询所有指标
 */
function findIndicatorName(){
	$.axs("/betaInvest/common/findWorkBook.do",{type:3,dataType:1},true,function(data){
		if(data.retCode==0000){
			if(data.retData!=null && data.retData.length!=0){
				var resultWorkBook=data.retData;
				$.each(resultWorkBook,function(index,item){
					if(item.id!=432){
						if(item.id==422){
							$(".selectBox p").attr("data-indicatorid",item.id);
							$(".selectBox p").text(item.nameCn);
						}
						var indicatorNameHtml='<li data-indicatorId="'+item.id+'">'+item.nameCn+'</li>';
						$("#indicatorName").append(indicatorNameHtml);
					}
					
				});
			}
		}
	});
}

/**
 * 改变搜索条件
 * @param isClearInputStockCode
 * @returns {Boolean}
 */
function changFindRankingParam(){
	var indicatorId=$("#indicatorName").prev().attr("data-indicatorId");
//	console.log($(".selectBox p").text());
	var indicatorName=$("#indicatorName").prev().text();
//	console.log(indicatorName);
	if(indicatorId=="" || indicatorId==null || indicatorId=="undefined"){
		return false;
	}
	
	findRanking(indicatorId,findDataStockCode_hangye,indicatorName);
}
/**
 * 查询指标排名值
 * @param tradeId 行业主键
 * @param dateTime 时间
 * @param sortParam 排序方式：desc、asc
 * @param indicatorId 指标主键
 */
function findRanking(indicatorId,stockCodeRanking,indicatorName){
//	$(".loadingBox2").show();
	var logding='<div class="loadingBox2" style="display: none;"><div class="loading-3"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><span>加载中</span></div>';
	$(".gjj_hangyePh").append(logding);
	$(".gjj_hangyePh").find(".loadingBox2").show();
	//切换数据删除原画图代码，重新生成代码
	$("#stockRanking").remove();
	$(".gjj_hyph_echars").after('<div id="stockRanking" class="gjj_hyph_echars_box"></div>');
	//画图数据
	var xAixs=new Array();
	var yAixs=new Array();
	var stockCodeRanks=new Array();
	var chg=new Array();


	$.axs("/betaInvest/searchBusiness/findTradeRanking.do",{stockCode:stockCodeRanking,id:indicatorId},true,function(data){
		if(data.retCode==0000){
			if(data.retData!=null && data.retData.length!=0){
				$(".gjj_hyph").html('<a href="/dataAnalysis/stockRankings.html?stockCode='+data.retData.stockCode+'&stockName='+data.retData.stockName+'"><i>'+data.retData.stockName+'('+data.retData.stockCode+')</i>-'+data.retData.tradeName+'-行业排名</a>');
				var result=eval("(" +data.retData.result + ")");
				//t:更新时间;c:股票代码;n:股票简称;v:指标值;h:涨跌幅
				stockCode=result.c;
				chg=result.h;
				stockCodeAndName=result.c;
				stockCodeRanks=result.c;
				xAixs=result.n;
				yAixs=result.v;
				//更新时间
				//$(".gjj_hyph_time span").text("更新时间:"+(result.t).substring(0,10));
//				var resultList=eval("(" + data.retData.result + ")");
				//console.log(resultList);
//				for(var i=0;i<resultList.length;i++){
//					xAixs[i]=resultList[i].stockName;
//					if($("#indicatorName").prev().text()=="净利润" || $("#indicatorName").prev().text()=="营业收入"
//						|| $("#indicatorName").prev().text()=="总资产" || $("#indicatorName").prev().text()=="总股本"){
//						yAixs[i]=(resultList[i].wookBookValue/10000.00).toFixed(2);
//					}else{
//						yAixs[i]=resultList[i].wookBookValue;
//					}
//					stockCodeRanks[i]=resultList[i].stockCode;
//					
//					chg[i]=resultList[i].chg;
//					//console.log(chg[i])
//					ranking[i]=resultList[i].ranking;
//					
//					if(resultList[i].createTime!=null){
//						$(".gjj_hyph_time span").text("更新时间:"+resultList[i].createTime.substring(0,10));
//					}
//				}
				blockDiv.content_gpph=true;
				setSlider(xAixs,yAixs,stockCodeRanks,indicatorName,chg,stockCodeRanking);
			}else{
				//隐藏财务数据模块的DIV
				$("#content_gpph").hide();
				blockDiv.content_gpph=false;
			}
		}else{
			//隐藏财务数据模块的DIV
			$("#content_gpph").hide();
			blockDiv.content_gpph=false;
			$("#changeValue").change()
		}
		$(".gjj_hangyePh").find(".loadingBox2").hide();
	});
}

var itemIndex=null;
function setSlider(xAixs,yAixs,stockCodeRanks,indicatorName,chg,stockCodeRanking){
	
	var inputStockCode=$.trim($("#inputStockCode").val());;
	//下标从0开始
	//console.log("inputStockCode:"+inputStockCode);
	var indexStockCode=inputStockCode.substring(inputStockCode.indexOf("(")+1,inputStockCode.indexOf(")"));
	var index=$.inArray(stockCodeRanking,stockCodeRanks);
//	console.log(index);
	itemIndex=index;
	if(itemIndex>5){
		fieldRankChart(xAixs,yAixs,stockCodeRanks,indicatorName,chg,(index+1-3));
	}else{
		fieldRankChart(xAixs,yAixs,stockCodeRanks,indicatorName,chg,(1));
	}
}
//图表展示的配置
/**
 * @param xAixs  X轴-公司名称
 * @param name 
 * @param data  Y轴-公司对应的指标值
 * @param startValue 第一个显示的排名位置
 */
function fieldRankChart(xAixs,data,stockCodeRanks,indicatorName,chg,startValue){
	 // 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('stockRanking'));
    var option = {
//      title: {
//          text: "行业地位分析"
//      },
		legend:{
			show:true,
			data:[indicatorName]
		},
        dataZoom: [{
            type: "slider",
            show: true,
            startValue: startValue - 2,
            endValue: startValue + 2 + 11
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
            data: xAixs
        }],
        tooltip:{
        	enterable:true,//鼠标可以进入提示信息里面
        	show:true,
        	trigger:'axis',
        	enterable:true,
        	position:function(point){
        		return [point[0],'10%'];
        	},
      	    formatter: function(params) {
      	    
	      	    	var divHtml='<div class="tooltips">';
	      	    		divHtml+='<p style="cursor: pointer;" onclick="javascript:window.location.href=\'/businessDetails/newTBindex.html?stockName='+xAixs[params[0].dataIndex]+'&stockCode='+stockCodeRanks[params[0].dataIndex]+'\'">'+xAixs[params[0].dataIndex]+'&nbsp;('+stockCodeRanks[params[0].dataIndex]+')</p>';
					if(chg[params[0].dataIndex]==null || chg[params[0].dataIndex]==undefined){//chg[params[0].dataIndex]=="" ||
						chg[params[0].dataIndex]=="--";
						divHtml+='<div class="sb_tips_content">'+
	      	    						'<span class="tips_leibie fl">涨跌幅：</span>'+
	      	    						'<span class="tips_leibie_num fl">--%</span>'+
	      	    						'<div class="clr"></div>'+
	      	    					'</div>';
					}else{
						chg[params[0].dataIndex]==Number(chg[params[0].dataIndex]).toFixed(2);
						if(chg[params[0].dataIndex]>=0){
							divHtml+='<div class="sb_tips_content">'+
	      	    						'<span class="tips_leibie fl">涨跌幅：</span>'+
	      	    						'<span class="tips_leibie_num fl">'+(chg[params[0].dataIndex]).toFixed(2)+'%</span>'+
	      	    						'<div class="clr"></div>'+
	      	    					'</div>';
						}else{
							divHtml+='<div class="sb_tips_content">'+
	      	    						'<span class="tips_leibie fl">涨跌幅：</span>'+
	      	    						'<span class="tips_leibie_num fl">'+(chg[params[0].dataIndex]).toFixed(2)+'%</span>'+
	      	    						'<div class="clr"></div>'+
	      	    					'</div>';
						}
					}
					
					if(indicatorName!="涨跌幅"){
						var showDivValue=data[params[0].dataIndex];
						if(showDivValue==null || showDivValue=="null"){
							showDivValue="未批露";
						}else{
							showDivValue=Number(data[params[0].dataIndex]).toFixed(2);
						}
						if(indicatorName.indexOf("率")>-1 && indicatorName!="市盈率"){
							divHtml+='<div class="types_two">';
							divHtml+='<span class="tips_leibie">'+indicatorName+'</span>';
							divHtml+='<span class="shuju2">'+(showDivValue=="未批露"?showDivValue:showDivValue+"%")+'</span>';
							divHtml+='<div class="clr"></div>';
							divHtml+='</div>';
						}else if(indicatorName.indexOf("每股")>-1){
							divHtml+='<div class="types_two">';
							divHtml+='<span class="tips_leibie">'+indicatorName+'</span>';
							divHtml+='<span class="shuju2">'+(showDivValue=="未批露"?showDivValue:showDivValue+"元")+'</span>';
							divHtml+='<div class="clr"></div>';
							divHtml+='</div>';
						}else{
							if($("#indicatorName").prev().text()=="净利润" || $("#indicatorName").prev().text()=="营业收入"
								|| $("#indicatorName").prev().text()=="总资产"){
								divHtml+='<div class="types_two">';
								divHtml+='<span class="tips_leibie">'+indicatorName+'：</span>';
								divHtml+='<span class="shuju2">'+(showDivValue=="未批露"?showDivValue:showDivValue+"万元")+'</span>';
								divHtml+='<div class="clr"></div>';
								divHtml+='</div>';	
								//divHtml+='<p>'+indicatorName+':&nbsp;'+(data[params.dataIndex])+'万元</p>';
							}else if($("#indicatorName").prev().text()=="总股本"){
								divHtml+='<div class="types_two">';
								divHtml+='<span class="tips_leibie">'+indicatorName+'：</span>';
								divHtml+='<span class="shuju2">'+(showDivValue=="未批露"?showDivValue:showDivValue+"万股")+'</span>';
								divHtml+='<div class="clr"></div>';
								divHtml+='</div>';
								//divHtml+='<p>'+indicatorName+':&nbsp;'+(data[params.dataIndex])+'万股</p>';
							}else{
								divHtml+='<div class="types_two">';
								divHtml+='<span class="tips_leibie">'+indicatorName+'：</span>';
								divHtml+='<span class="shuju2">'+showDivValue+'</span>';
								divHtml+='<div class="clr"></div>';
								divHtml+='</div>';
							}
							
						}
						
					}
					divHtml+='<p style="background: none;" class="zdf">';
					var duibi = "加入对比";
					var showName = findContrastCompany();
					if(showName!=null && showName!="" && showName!==undefined && showName.indexOf(stockCodeRanks[params[0].dataIndex])>-1 && showName.indexOf(xAixs[params[0].dataIndex])>-1){
						duibi="删除对比";
					}
					divHtml+='<a href="javascript:void(0);" id="'+stockCodeRanks[params[0].dataIndex]+'" onclick="addComparisonStockClass_paihang(\''+stockCodeRanks[params[0].dataIndex]+'\',\''+xAixs[params[0].dataIndex]+'\')" class="gpph" data-code="'+stockCodeRanks[params[0].dataIndex]+'" data-name="'+xAixs[params[0].dataIndex]+'">'+duibi+'</a>';
					//加入自选
					if(isTrue(stockCodeRanks[params[0].dataIndex])){
						divHtml+='<a href="javascript:void(0);" onclick="addorDeleOptional(this)" id="zxgId" class="gpph on" data-value="'+stockCodeRanks[params[0].dataIndex]+'">删除自选</a>';
					}else{
						//<a href="#" class="gpph">加入自选</a>
						divHtml+='<a href="javascript:void(0);" onclick="addorDeleOptional(this)" id="zxgId" class="gpph jiaru_duibi" data-value="'+stockCodeRanks[params[0].dataIndex]+'">加入自选</a>';
					}
					divHtml+='</p>';
					divHtml+='<div class="tip"></div>';
					divHtml+='</div>';
	                return divHtml;
	            }

        },
        series: [{
            name: indicatorName,
            type: 'bar',
            barWidth:'30',
            data: data,
            label: {
                normal: {
                    show: true,
                    position: "top",
                    offset:[1,100],
                    formatter: function(params) {
                        return "第" + (params.dataIndex+1) + "名";
                    },
                    textStyle:{
                    	color:"#333"
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: function(params) {
//                  	console.log(params.itemIndex);
                    	  // 检索结果颜色
                        if(params.dataIndex == itemIndex) {
                            return "#f3565d";
                        } else {
                            return "#62a6f2";
                        }
//                    	return "#D53A35";
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

//添加或者删除自选股
function addorDeleOptional(data){
	var zxgType = $("#zxgId").text();
	if(zxgType=="加入自选"){
		var optionalId = addOptional($(data).attr("data-value"),"");
		if(optionalId!=null&&optionalId!=""&&optionalId!=undefined){
			if(findDataStockCode_hangye == $(data).attr("data-value")){ //修改行情模块的加入自选样式
				$(".wj_searchAdd").attr("data-opId",optionalId);
				$(".wj_searchAdd").toggleClass("wj_searchCut");
			    $(".wj_searchAdd").siblings(".wj_searchMsg").toggle();
			}
			$("#zxgId").text("删除自选");
			$("#zxgId").addClass("on");
		}else{
			$.zmAlert("添加自选股失败");
		}
	}else{
	    var resultData = deleteOptionalByStocke($(data).attr("data-value"));
		if(resultData=="0000"){
			if(findDataStockCode_hangye == $(data).attr("data-value")){ //修改行情模块的加入自选样式
				$(".wj_searchAdd").toggleClass("wj_searchCut");
			    $(".wj_searchAdd").siblings(".wj_searchMsg").toggle();
			}
			$("#zxgId").html("加入自选");
			$("#zxgId").removeClass("on");
		}else{
			$.zmAlert("删除自选股失败");
		}
	}
}

/**
 * 添加或删除对比
 * @param comparisonStockCode
 * @param comparisonStockName
 */
function addComparisonStockClass_paihang(comparisonStockCode,comparisonStockName){
	if($("#"+comparisonStockCode).text()=="删除对比"){
		removeComparisonStock(comparisonStockCode,comparisonStockName);
		$("#"+comparisonStockCode).text("加入对比");
		$("#"+comparisonStockCode).removeClass("tips1");
	}else{
		if(addComparisonStock(comparisonStockCode,comparisonStockName)){
			$("#"+comparisonStockCode).text("删除对比");
			$("#"+comparisonStockCode).addClass("tips1");
		}
	}
	return false;
}
