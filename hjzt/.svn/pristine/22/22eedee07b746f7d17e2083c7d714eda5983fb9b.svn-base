$(function(){

//指数查询
fingOverViewIndex("899002");
//指数市场概况分页
findMarketOverview();
//查询地区
findArea2();
//查询行业
findCategory2(0,2);

//tab切换
$("#exponential a").on("click",function(){
	var type=$(this).attr("data-value");
	if(type=="899002"){
		fingOverViewIndex("899002");
	}
	if(type=="899001"){
		fingOverViewIndex("899001");
	}
	$(this).addClass("on").siblings().removeClass("on");
})

$("#informationList li").on("mouseenter",function(){
	$(this).find("div").addClass("on");
	$(this).siblings().find("div").removeClass("on");
})
$(".jiabeijing").on("click",function(){
	$("#hQhy").slideUp();
	$("#hQdq").slideUp();
})
//点击行情里的行业进行筛选
$("#hQhy").on("click","li",function(){
	var industry=$(this).attr("title");
	$(this).parent().slideUp();
	$(this).parent().parent().find("p").text(industry);
	if(industry=="全部"){
		industry=null;
	}
	var area=$("#hqdq").text();
	if(area=="地区" || area=="全部"){
		area=null;
	}
	findMarketOverview(industry,area)
})
//点击行情里的地区进行筛选
$("#hQdq").on("click","li",function(){
	var area=$(this).attr("data-area");
	$(this).parent().slideUp();
	$(this).parent().parent().find("p").text(area);
	if(area=="全部"){
		area=null;
	}
	var industry=$("#hqhy").text();
	if(industry=="行业" || industry=="全部"){
		industry=null;
	}
	findMarketOverview(industry,area)
})

})

//指数查询
function fingOverViewIndex(stockCode){
	
	$.axs("/betaStock/qutation/fingOverViewIndex.do",{stockCode:stockCode},true,function(data){
		
		if(data.retCode=="0000"){
			var result=data.retData;
			if(result==null){
				return false;
			}
			
			var keyZS = result.keyZS;
//			console.log(keyZS);
			var keyCF = result.keyCF;
			//wtl 7.6 3140 三板市场>挂牌页面，统计新增的协议和做市的地方数据只显示新增的
			
			//wtl 7.11 将判断代码放在外层 并添加无数据时进行初始化图表 同下
			//指数图表
			if(stockCode=="899002"){
				var dateTime = [];
				var openPrice = [];
				var tradingAmount = [];
				if(keyZS!=null&&(keyZS.length > 0)&&keyZS!=undefined){
					$(keyZS).each(function(i, item){
						if(i == 0){
							$("#newHQDate").text("日期：" + item.createDate);
						}
						dateTime.push(item.data_);
						openPrice.push(item.openPrice);
						tradingAmount.push(item.tradingAmount);
					})
					fieldRankChart(dateTime,openPrice,tradingAmount);
				}else{
					fieldRankChart(dateTime,openPrice,tradingAmount);
				}
			}
			
			if(stockCode=="899001"){
				var dateTime = [];
				var openPrice = [];
				var tradingAmount = [];
				if(keyCF!=null&&(keyCF.length > 0)&&keyCF!=undefined){
					$(keyCF).each(function(i, item){
						dateTime.push(item.data_);
						openPrice.push(item.openPrice);
						tradingAmount.push(item.tradingAmount);
					})
					fieldRankChart(dateTime,openPrice,tradingAmount);
				}else{
					fieldRankChart(dateTime,openPrice,tradingAmount);
				}
			}
			var index = result.index;
			if(index!=null&&index!=""&&index!=undefined){
				$("#zs_zz").html((index.newPrice).toFixed(2));
				$("#kp_zz").html((index.openPrice).toFixed(2));
				$("#zg_zz").html((index.highPrice).toFixed(2));
				$("#zd_zz").html((index.lowPrice).toFixed(2));
				if(index.changeAmount>=0){
					$("#zde_zz").removeClass("green").addClass("red");
				}else{
					$("#zde_zz").removeClass("red").addClass("green");
				}
//				else{
//					$("#zde_zz").removeClass("red").removeClass("green");
//				}
				$("#zde_zz").html(index.changeAmount);
				if(index.priceChangeRatio>=0){
					$("#zdf_zz").removeClass("green").addClass("red");
				}else{
					$("#zdf_zz").removeClass("red").addClass("green");
				}
//				}else{
//					$("#zdf_zz").removeClass("red").removeClass("green");
//				}
				$("#zdf_zz").html((index.priceChangeRatio)+"%");
				$("#zjl_zz").html((index.tradingVolume/1000000.00).toFixed(2));
				$("#zje_zz").html((index.tradingAmount/1000000.00).toFixed(2));
			}
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}

//指数市场概况分页
function findMarketOverview(industry,area){
	var pageNum=$("#marketOverview").attr("data-pageNum");
	if(pageNum==null || pageNum=="" || pageNum=="undefined"){
		pageNum=1;
	}
	var pageSize=$("#marketOverview").attr("data-pageSize");
	if(pageSize==null || pageSize=="" || pageSize=="undefined"){
		pageSize=20;
	}
	var param = {pageIndex:pageNum,pageLimit:pageSize,industry:industry,area:area};
//	var param = {pageIndex:pageNum,pageLimit:pageSize};
	$.axs("/betaStock/qutation/findMarketOverview.do",param,true,function(data){
		//console.log(data)
		if(data.retCode=="0000"){
			var result=data.retData;
			var pageNumResult=result.pageIndex;
			var pageSizeResult=result.pageLimit;
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
					html+='<td><a target="_blank" href="/businessDetails/newTBindex.html?stockName='+temp.stockName+'&stockCode='+temp.stockCode+'">'+temp.stockName+'('+temp.stockCode+')</a></td>';
					if(temp.newPrice==null){
						html+='<td class="shuzi">--</td>';
					}else{
						html+='<td class="shuzi">'+(temp.newPrice).toFixed(2)+'</td>';
					}
					if(temp.volume==null || temp.volume=="" || temp.volume==undefined){
						html+='<td class="shuzi">--</td>';
					}else{
						html+='<td class="shuzi">'+temp.volume+'</td>';
					}
					if(temp.trading_volume==null || temp.trading_volume=="" || temp.trading_volume==undefined){
						html+='<td class="shuzi">--</td>';
					}else{
						html+='<td class="shuzi">'+(Number(temp.trading_volume)/10000).toFixed(2)+'</td>';
					}
					if(temp.priceChangeRatio != null){
						if(temp.priceChangeRatio>=0){
							html+='<td class="shuzi red">'+(temp.priceChangeRatio).toFixed(2)+'%</td>';
						}else{
							html+='<td class="shuzi lvse">'+(temp.priceChangeRatio).toFixed(2)+'%</td>';
						}
					}else{
						html+='<td class="shuzi red">--%</td>';
					}
					if(temp.marketValue==null){
						html+='<td class="shuzi">--</td>';
					}else{   
						html+='<td class="shuzi">'+(temp.marketValue/100000000.00).toFixed(2)+'</td>';
					}
					if(temp.priceEarningRatio==null){
						html+='<td class="shuzi">--</td>';
					}else{
						html+='<td class="shuzi">'+(temp.priceEarningRatio).toFixed(2)+'</td>';
					}
					if(temp.sellingRate==null){
						html+='<td class="shuzi">--</td>';
					}else{
						html+='<td class="shuzi">'+(temp.sellingRate).toFixed(2)+'</td>';
					}
					if(temp.income==null){
						html+='<td class="shuzi">--</td>';
					}else{
						html+='<td class="shuzi">'+(temp.income/1000000).toFixed(2)+'</td>';
					}
					if(temp.profit==null){
						html+='<td class="shuzi">--</td>';
					}else{
						html+='<td class="shuzi">'+(temp.profit/1000000).toFixed(2)+'</td>';
					}
					html+='</tr>';
				}
				$("#marketOverview").html(html);
				//分页
				if(pageNum==1){
					$('#pages').pagination({
						total: totalCountResult,
						pageSize: pageSize,
						current: pageNum,
						layout: ['first', 'prev', 'links','next'],
						links:0,
						displayMsg:"",
						showPageList:false,
						onSelectPage: function(pageNumber, size) {
							$("#marketOverview").attr("data-pageNum",pageNumber);
							$("#marketOverview").attr("data-pageSize",size);
							findMarketOverview(industry,area);
						}
					});
				}
				$('#pages').show();
				//修改分页文字
				setPageText2('pages');
			}else{
				var html=getNoDataHtml(10);
				$("#marketOverview").html(html);
			}
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}

/**
 * 查询区域
 */
function findArea2(){
	var param={dataType:1,type:1,parentId:0}
	$.axs("/betaStock/common/findWorkBookByPid.do",param,false,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result==null){
				return false;
			}
			var html="";
			html += "<li data-value='' title='全部'><a href='javascript:;'>全部</a></li>";
			for (var i = 0; i < result.length; i++) {
				var obj=result[i];
				html += "<li data-value="+obj.id+" data-area='"+obj.nameCn+"'><a href='javascript:;'>"+obj.nameCn+"</a></li>";
			}
			$("#hQdq").empty();
			$("#hQdq").html(html);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}
/**
 * 查询所有行业
 */
function findCategory2(type,level){
	$.axs("/betaStock/common/findTrade.do", {categorType:type,levelId:level}, false, function(data) {
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result==null){
				return false;
			}
			var html="";
			html += "<li data-value='' title='全部'><a href='javascript:;'>全部</a></li>";
			for (var i = 0; i < result.length; i++) {
				var obj=result[i];
				var  hy=obj.categoryName;
				if(obj.categoryName.length>12){
					hy=obj.categoryName.substring(0,12)+"...";
				}else{
					hy=obj.categoryName;
				}
				html += "<li data-value="+obj.categoryId+" title="+obj.categoryName+"><a href='javascript:;'>"+hy+"</a></li>";
			}
			$("#hQhy").empty();
			$("#hQhy").html(html);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

function addZero(val, len, top){
	if (!arguments[1]) len = 2;
	if (!arguments[2]) top = true;

	if (val.toString().length < len) 
	{
		while (len != val.toString().length)
		{
			if (top) val = "0" + val.toString();
			else val = val.toString() + "0";
		}
	}
	return val.toString();
}

/**
 * 根据数组及值获取下标
 * @param {Object} arr
 */
function getArrIndex(arr, d){
	var i = -1;
	$(arr).each(function(index, item){
		if(arr[index] == d){
			i = index;
		}
	})
	return i;
}

/**
 * 
 * @param data日期
 * @param openPrice 指数
 * @param tradingVolume 成交量
 */
function fieldRankChart(date,openPrice,tradingVolume){
	var lowPrice=Math.ceil(openPrice.sort(sortNumber)[0]-5);
	var higherPrice=Math.ceil(openPrice.sort(sortNumber)[openPrice.length-1])+5;
	/*
	//倒序循环--判断时间超出交易范围(09:30-11:30;13:00-15:00)--移除下标
	for(var i=date.length;i>0;i--){
		var dateTime=date[i-1];
//		console.log(dateTime);
		var dateTimeH=dateTime.split(":")[0];//小时
		var dateTimeM=dateTime.split(":")[1];//分钟
		if(Number(dateTimeH)<Number("09") || (Number(dateTimeH)<=Number("09") && Number(dateTimeM)<Number("30"))){
//			console.log(Number(dateTimeH)<Number("09") || (Number(dateTimeH)<=Number("09") && Number(dateTimeM)<Number("30") ));
			//移除下标数据
			date.splice(i,1);
			openPrice.splice(i,1);
			tradingVolume.splice(i,1);
		}else if(
				(Number(dateTimeH)>Number("11") || (Number(dateTimeH)>=Number("11") && Number(dateTimeM)>Number("30")))
				&& 
				(Number(dateTimeH)<Number("13"))
//				dateTime<"13:00"
		){
//			console.log(dateTime>"11:30" && dateTime<"13:00");
			//移除下标数据
			date.splice(i,1);
			openPrice.splice(i,1);
			tradingVolume.splice(i,1);
		}else if(Number(dateTimeH)>Number("15")){
//			console.log(dateTime<"15:00");
			//移除下标数据
			date.splice(i,1);
			openPrice.splice(i,1);
			tradingVolume.splice(i,1);
		}
	}*/
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('boardChart'));
//	console.log(tradingVolume)
	
	//wtl -7.5- 修改 3114 行情中：时间的刻度显示成分时图一样的时间刻度
	var dtCurDate = new Date();
	var arrCurTime = [];
	var dtTimeAM = new Date(dtCurDate.getFullYear(), dtCurDate.getMonth(), dtCurDate.getDate(), 9, 30, 0, 0)
	
	for (var i=0; i<=120; i++)
	{
		arrCurTime.push([addZero(dtTimeAM.getHours()), addZero(dtTimeAM.getMinutes())].join(":"));
		dtTimeAM = new Date(dtTimeAM.getTime() + 60*1000);
	}
	var dtTimePM = new Date(dtCurDate.getFullYear(), dtCurDate.getMonth(), dtCurDate.getDate(), 13, 0, 0, 0)
	for (var i=0; i<=120; i++)
	{
		arrCurTime.push([addZero(dtTimePM.getHours()), addZero(dtTimePM.getMinutes())].join(":"));
		dtTimePM = new Date(dtTimePM.getTime() + 60*1000);
	}
	
//	指数
	var line_data = [];
	for (var i=0; i<arrCurTime.length; i++)
	{
		line_data.push(((openPrice[getArrIndex(date, arrCurTime[i])] == undefined || openPrice[getArrIndex(date, arrCurTime[i])] == null) ? '' : openPrice[getArrIndex(date, arrCurTime[i])]));
	}
//	成交量
	var bar_data = [];
	for (var i=0; i<arrCurTime.length; i++)
	{
		bar_data.push(((tradingVolume[getArrIndex(date, arrCurTime[i])] == undefined || tradingVolume[getArrIndex(date, arrCurTime[i])] == null) ? '' : tradingVolume[getArrIndex(date, arrCurTime[i])]));
	}
	option = {
		    tooltip: {
		    	show:true,
		        trigger: 'axis',
		        formatter: function(params) {
		        	
		        	var chengjiaoer=Number(params[0].data).toFixed(2);
		        	var zhishu=Number(params[1].data).toFixed(2);
      	    	//console.log(params);
			//7月3号王仙玲修改的柱状图的提示框类型start
				return '<div class="shizhi_tips">'+
							'<span class="shizhi_time">'+params[0].name+'</span>'+
							'<div class="types_one">'+
								'<span class="shoupanjia">'+params[1].seriesName+'</span>'+
								'<span class="shuju2">'+zhishu+'</span>'+
								'<div class="clr"></div>'+
							'</div>'+
							'<div class="types_two">'+
								'<span class="cjl_shuju">'+params[0].seriesName+'</span>'+
								'<span class="shuju2">'+chengjiaoer+'</span>'+
								'<div class="clr"></div>'+
							'</div>'+
						'</div>';		
					

	            }
      	    //7月3号王仙玲修改的柱状图的提示框类型end
		    },
		   color:['#62a6f2','#36b8f4'],
		    legend: {
		        data:['成交额(百万)','指数']
//		        top:10
		    },
		    xAxis: {
				boundaryGap : false,
				type : 'category',
				splitLine : {
					show : true,
					interval : function (index, value) {
						if (value == "09:15" 
							|| value == "09:30"
							|| value == "10:30"
							|| value == "11:30"
							|| value == "14:00"
							|| value == "15:00") {
							return true;
						}
						else return false;
					}
				},
				data: arrCurTime,
				scale: true,
				axisTick : {
					show : true,
					interval : function (index, value) {
						if (value == "09:15" 
							|| value == "09:30"
							|| value == "10:30"
							|| value == "11:30"
							|| value == "14:00"
							|| value == "15:00") {
							return true;
						}
						else return false;
					}
				},
				axisLabel : {
					show : true,
					interval : 0,
					formatter: function (value, index) {
						if (value == "09:15" 
							|| value == "09:30"
							|| value == "10:30"
							|| value == "11:30"
							|| value == "14:00"
							|| value == "15:00") {
							return value;
						} else {
							return "";
						}
					}
				},
			}/*[
		        {
		            type: 'category',
		            data: date//['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
		        }
		    ]*/,
		    yAxis: [
		        {
		            type: 'value',
		            name: '成交额(百万)',
//		            min: 10,
//		            max: 20,
//		            min: 0,
//		            max: 250,
//		            interval: 50,

		            axisLabel: {
		                formatter: '{value}'
		            }
		        },
		        {
		            type: 'value',
		            name: '指数',
		            min: lowPrice,
		            max: higherPrice,
//		            interval: 5,
		            axisLabel: {
		                formatter: '{value}'
		            }
		        }
		    ],
		    grid: {
		        left: '3%',
		        right: '1%',
		        bottom:'2%',
		        containLabel: true
		    },
		    series: [
		    		
		        {
		        	
		            name:'成交额(百万)',
		            type:'bar',
		            itemStyle:{
		            	normal:{
		            		color:"#62a6f2"
		            	},
		            	emphasis:{
		                	color:"#4a8ad3"//鼠标放到柱形图上显示的颜色
		                }
		            },
//		            label:{
//		            	normal:{
//		            		show:true,
//		            		position:'top'
//		            	}
//		            },
		            data:bar_data//[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
		        },
		       
		        {
		        	
		            name:'指数',
		            type:'line',
		            symbol:'none',
		            yAxisIndex: 1,
		            data:line_data//[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
		        }
		    ]
		};
 // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.onresize = myChart.resize;
}
function sortNumber(a,b){
	return a - b;
}