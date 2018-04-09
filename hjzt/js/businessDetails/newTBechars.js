var stockCode = getUrlParam("stockCode");
var stockName = getUrlParam("stockName");
var RXTDATA = {}; //日线图数据
var SZDATA = {}; //市值图数据
var FSTDATA = {}; //分时图数据
$(function(){
	
	$("#newnumber").hide();
	
	findRXSZData();
	findGraphData();
	
	/**
	 * 加载日线图
	 */
	dailyData();
	
	//点击tab切换
	$(".gaik_tux span").on("click",function(){
		$(".fen_echars").show();
		$(this).addClass("on").siblings().removeClass("on");
		if($(this).text()=="日线图"){
			dailyData();
		}else if($(this).text()=="市值"){
			marketValue();
		}else if($(this).text()=="分时图"){
			fst();
		}
	})
	
	
})

/**
 * 查询市值和日线图数据
 */
function findRXSZData(){
	$.axs("/betaInvest/quotation/findRKSZ.do",{stockCode:stockCode},false,function(data){
		if(data.retCode=="0000"){
			var spj = []; //收盘价
			var cjl = []; //成交量
			
			var zsz = []; //总市值
			var ltsz = []; //流通市值
			
			var dateTime = [];
			
			$(data.retData).each(function(){
				spj.push(this.newPrice == null ? 0 : this.newPrice.toFixed(2));
				cjl.push(this.tradingVolume == null ? 0 : (this.tradingVolume/10000).toFixed(2));
				zsz.push(this.totalMarketValue == null ? 0 : (this.totalMarketValue/100000000).toFixed(2));
				ltsz.push(this.marketCapitalization == null ? 0 : (this.marketCapitalization/100000000).toFixed(2));
				dateTime.push(this.dataTime);
			})
			
			SZDATA = {"zsz":zsz, "ltsz":ltsz, "dateTime":dateTime};
			RXTDATA = {"spj":spj, "cjl":cjl, "dateTime":dateTime};
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

/**
 * 查询分时图数据
 */
function findGraphData(){
	$.axs("/betaInvest/quotation/findGraphData.do",{stockCode:stockCode},true,function(data){
		if(data.retCode=="0000"){
			//console.log("分时图：" + data.retData);
			var newPrice = [];
			var CJJ = [];
			var ZDF = [];
			var arrCurTime = [];
			if(data.retData != null){
				$(data.retData).each(function(){
					newPrice.push(this.price);
					ZDF.push(this.priceChangeRatio);
					CJJ.push(this.tradingVolume);
					arrCurTime.push(this.date);
				})
			}
			FSTDATA = {"newPrice":newPrice, "CJJ":CJJ, "ZDF":ZDF, "arrCurTime":arrCurTime};
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

function getCurDate(){
	return [new Date().getFullYear(), addZero(new Date().getMonth()+1), addZero(new Date().getDate())].join("");
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
 * 分时图
 */
function fst(){
	$("#newnumber").show();
	var newPrice = FSTDATA.newPrice;
	var CJJ = FSTDATA.CJJ;
	var ZDF = FSTDATA.ZDF;
	var dataDate = FSTDATA.arrCurTime;
	var STOCK_CODE = "601099";
	var START_ID = getCurDate() + "0925";
	var END_ID = getCurDate() + "1500";
	var short_date = getCurDate();
	var short_id = "0925";
	var time_pos = "09:25";

	// 基于准备好的dom，初始化echarts实例
	var myChart1 = echarts.init(document.getElementById('newprice'));
	// 基于准备好的dom，初始化echarts实例
	//var myChart2 = echarts.init(document.getElementById('newnumber'));


	//***************************************************************//
	// 初始化 x轴 
	//***************************************************************//
	var dtCurDate = new Date();
	var arrCurTime = [];
	//arrCurTime.push(new Date(dtCurDate.getFullYear(), dtCurDate.getMonth(), dtCurDate.getDate(), 9, 25, 0, 0));
//	arrCurTime.push("09:25");
//	arrCurTime.push("09:26");
//	arrCurTime.push("09:27");
//	arrCurTime.push("09:28");
//	arrCurTime.push("09:29");
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
	//***************************************************************//
//	最新价格
	var line_data = [] /*[8.9,10,25,25.6,25.6,25.6,25.6,25.6,25.6,30,30]*/;
	for (var i=0; i<arrCurTime.length; i++)
	{
		line_data.push( {name: arrCurTime[i], value: ((newPrice[getArrIndex(dataDate, arrCurTime[i])] == undefined || newPrice[getArrIndex(dataDate, arrCurTime[i])] == null) ? "-" : newPrice[getArrIndex(dataDate, arrCurTime[i])])} );
	}
//	最新成交量
	var bar_data = []/*[15.9,110,254,25.6,25.6,25.6,25.6,25.6,25.6,300,325]*/;
	for (var i=0; i<arrCurTime.length; i++)
	{
		bar_data.push( {name: arrCurTime[i], value: ((CJJ[getArrIndex(dataDate, arrCurTime[i])] == undefined || CJJ[getArrIndex(dataDate, arrCurTime[i])] == null) ? "-" : CJJ[getArrIndex(dataDate, arrCurTime[i])])} );
	}
	//涨跌幅
//	var zd_data = []/*[10.9,32,25.4,52.6,33.6,65.6,25.6,44.6,76.6,150,25]*/;
//	for (var i=0; i<arrCurTime.length; i++)
//	{
//		zd_data.push( {name: arrCurTime[i], value: ((ZDF[getArrIndex(dataDate, arrCurTime[i])] == undefined || ZDF[getArrIndex(dataDate, arrCurTime[i])] == null) ? "-" : ZDF[getArrIndex(dataDate, arrCurTime[i])])} );
//	}
	function getDataPos(time)
	{
		for (var i=0; i<line_data.length; i++)
		{
			if (time == line_data[i].name) return i;
		}
	}
	option1 = {
		title : {
		},
		tooltip : {
			trigger : 'axis',
//			axisPointer : {
//				type : 'line'
//			},
			position : 'top',
			formatter:function(params){
				//console.log(params)
				return '<div class="shizhi_tips">'+
							'<span class="shizhi_time">'+params[0].name+'</span>'+
							'<div class="types_one">'+
								'<span class="shoupanjia">'+params[0].seriesName+'：</span>'+
								'<span class="shuju2">'+params[0].value+'元/股</span>'+
								'<div class="clr"></div>'+
							'</div>'+
							'<div class="types_two">'+
								'<span class="cjl_shuju">'+params[1].seriesName+'：</span>'+
								'<span class="shuju2">'+params[1].value+'万股</span>'+
								'<div class="clr"></div>'+
							'</div>'+
						'</div>';
			}
		},
		legend:{
			show:true,
			top:10,
			data:["成交量","股价"]
		},
		grid : {
			top : '20%',
			left : '5%',
			right : '3%',
			bottom : '10%'
		},
		xAxis : {
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
		},
		yAxis : [ {
			scale : true,
			splitArea : {
				show : true
			}
		}/*,
		{
			scale : true,
			splitArea : {
				show : true
			}
		}*/],
		series : [ {
			name : '股价',
			type:'line',
			symbol:'none',
            itemStyle: {
                normal: {
                    color: '#36b8f4'
                }
            },
			data : line_data
		},
		{
			name : '成交量',
			type:'bar',
			symbol:'none',
			barWidth:'30',
            itemStyle: {
                normal: {
                    color: '#62a6f2'
                }
            },
			data : bar_data
		}]
	};

	option2 = {
		title : {
		},
		tooltip : {
			trigger : 'axis',
			axisPointer : {
				type : 'line'
			},
			position : 'top',
			formatter:function(params){
				//console.log(params)
			}
		},
		grid : {
			top : '5%',
			left : '8%',
			right : '3%',
			bottom : '15%'
		},
		xAxis : {
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
		},
		yAxis : [ {
			scale : true,
			splitArea : {
				show : true
			}
		}],
		series : [ {
			name : '成交量',
			type:'bar',
            itemStyle: {
                normal: {
                    color: '#688db1'
                }
            },
			data : bar_data
		}]
	};

	// 使用刚指定的配置项和数据显示图表。
	myChart1.setOption(option1);
//	myChart2.setOption(option2);
	
	var app = {};
	app.timeTicket = setInterval(function () {
		if (parseInt(short_date + short_id) < parseInt(END_ID))
		{
			// line_data.push(randomData(arrCurTime[pos]));
			// line_data.splice(pos, 1, randomData(arrCurTime[pos]));
		}
		else if (parseInt(short_date+short_id) == parseInt(END_ID))
		{
			// getLineData();
			clearInterval(app.timeTicket);
		}
	}, 1000);
	
	///echarts.connect([myChart1, myChart2]);
	window.onresize = function(){
		// alert("asdfasdfasdf");
		myChart1.resize();
//		myChart2.resize();
	};
}

//日线图
function dailyData(){
	var dateTime = RXTDATA.dateTime;
	var cjl = RXTDATA.cjl;
	var spj = RXTDATA.spj;
	//console.log(RXTDATA)
	$("#newnumber").hide();
	var myChart = echarts.init(document.getElementById('newprice'));
    var option = {
        yAxis: [{
            type: "value",
           // data: []
        }],
        legend:{
        	show:true,
        	data:['成交量','收盘价']
        },
        grid : {
			top : '20%',
			left : '5%',
			right : '3%',
			bottom : '10%'
		},
        xAxis: [{
            type: 'category',
            data: dateTime
        }],
	      tooltip:{
	      	enterable:true,//鼠标可以进入提示信息里面
	      	show:true,
	      	trigger:'axis',
	      	position:'top',
    	    formatter: function(params) {
    	    	//console.log(params)
    	    	var dw = "";
    	    	if(params.seriesName == "收盘价"){
    	    		dw = "元";
    	    	}else{
    	    		dw = "万股";
    	    	}
    	    	//console.log(params)
    	    	return '<div class="shizhi_tips">'+
							'<span class="shizhi_time">'+params[0].name+'</span>'+
							'<div class="types_one">'+
								'<span class="shoupanjia">收盘价（元）</span>'+
								'<span class="shuju2">'+(params[1].data == undefined || params[1].data == null || (params[1].data == "" && params[1].data != 0) ? "-" : params[1].data)+'</span>'+
								'<div class="clr"></div>'+
							'</div>'+
							'<div class="types_two">'+
								'<span class="cjl_shuju">成交量（万股）</span>'+
								'<span class="shuju2">'+(params[0].data == undefined || params[0].data == null || (params[0].data == "" && params[1].data != 0) ? "-" : params[0].data)+'</span>'+
								'<div class="clr"></div>'+
							'</div>'+
						'</div>';		
    	    	//return "日期    " + params.name + "<br />" + params.seriesName + "    " + params.data + dw;
	        }
	      },
        series: [{
            name: "成交量",
            type: 'bar',
            barWidth:'30',
            data: cjl,
            itemStyle:{
            	normal:{
            		color:"#62a6f2"
            	},
            	emphasis:{
                	color:"#4a8ad3"//鼠标放到柱形图上显示的颜色
                }
            },
             label:{
            	normal:{
            		show:true,
            		position:'top',
            		formatter:function(param){
            			return ((param.data == 0.00 || param.data == 0) ? "" : param.data);
            		}
            	}
            }
        },
        {
            name: "收盘价",
            type: 'line',
            symbol:'circle',
            //barWidth:'30',
            data: spj,
            itemStyle:{
            	normal:{
            		color:"#36b8f4"
            	}
            },
            label:{
            	normal:{
            		show:true,
            		position:'top',
            		formatter:function(param){
            			return ((param.data == 0.00 || param.data == 0) ? "" : param.data);
            		}
            	}
            }
        }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.onresize = myChart.resize;
}

//市值
function marketValue(){
	
	var dateTime = SZDATA.dateTime;
	var zsz = SZDATA.zsz;
	var ltsz = SZDATA.ltsz;
	
	$("#newnumber").hide();
	var myChart = echarts.init(document.getElementById('newprice'));
    var option = {
        yAxis: [{
            type: "value"
           // data: []
        }],
        legend:{
        	show:true,
        	data:['总市值','流通市值']
        },
        grid : {
			top : '20%',
			left : '5%',
			right : '3%',
			bottom : '10%'
		},
        xAxis: [{
            type: 'category',
            data: dateTime
        }],
	      tooltip:{
	      	enterable:true,//鼠标可以进入提示信息里面
	      	show:true,
	      	trigger:'axis',
	      	position:'top',
    	    formatter: function(params) {
    	    	//console.log(params)
    	    	return	'<div class="shizhi_tips">'+
							'<span class="shizhi_time">'+params[0].name+'</span>'+
							'<div class="types_one">'+
								'<span class="zong_shizhi">总市值（亿）</span>'+
								'<span class="shuju2">'+(params[0].data == undefined || params[0].data == null || (params[0].data == "" && params[1].data != 0) ? "-" : params[0].data)+'</span>'+
								'<div class="clr"></div>'+
							'</div>'+
							'<div class="types_two">'+
								'<span class="zong_shizhi">流通市值（亿）</span>'+
								'<span class="shuju2">'+(params[1].data == undefined || params[1].data == null || (params[1].data == "" && params[1].data != 0) ? "-" : params[1].data)+'</span>'+
								'<div class="clr"></div>'+
							'</div>'+
						'</div>';	
    	    	
    	    	//return "日期    " + params.name + "<br />" + params.seriesName + "    " + params.data + "亿元";
	        }
	      },
        series: [{
            name: "总市值",
            type: 'line',
            symbol:'circle',
            data: zsz,
            itemStyle:{
            	normal:{
            		color:"#36b8f4"
            	}
            },
             label:{
        		normal:{
        			show:true,
        			position:"top",
            		formatter:function(param){
            			return ((param.data == 0.00 || param.data == 0) ? "" : param.data);
            		}
        		}
        	}
        },
        {
            name: "流通市值",
            type: 'line',
            symbol:'circle',
            //barWidth:'30',
            data: ltsz,
            itemStyle:{
            	normal:{
            		color:"#ffac1c"
            	}
            },
            label:{
        		normal:{
        			show:true,
        			position:"top",
            		formatter:function(param){
            			return ((param.data == 0.00 || param.data == 0) ? "" : param.data);
            		}
        		}
        	}
        }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.onresize = myChart.resize;
}