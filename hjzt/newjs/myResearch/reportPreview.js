//研究报告-预览界面
var id=getUrlParam("id");

//var stockCode = getUrlParam("stockCode");
//var stockName = getUrlParam("stockName");
$(function(){
	//研究报告内容
	findReportById();
	//日线图
//	dailyData();
	//点击收起时隐藏对应的内容
	$(".gs_mc em").on("click",function(){
		$(this).parent().next().hide();
		$(this).hide();
		$(this).parent().find("b").show();
	})
	//点击展开
	$(".gs_mc b").on("click",function(){
		$(this).parent().next().show();
		$(this).hide();
		$(this).parent().find("em").show();
	})
	//点击编辑
	$(".bgyl_nav span").on("click",function(){
		window.location.href='/myResearch/editReport.html?id='+id;
	});
	
	//点击股票代码跳到股票详情页
	$(".yulan_zb .gs_mc span").on("click",function(){
		var inde=$(this).text().indexOf("(");
		var len=$(this).text().indexOf(")");
		var gpStocke=$(this).text().substring(inde+1,len);
		var stockName=$(this).text().substring(0,inde);
		window.location.href='/businessDetails/newTBindex.html?stockCode='+gpStocke+'&stockName='+stockName+'';

	})
	
	//点击导出
	$(".bgyl_nav em").on("click",function(){
		//图片替换为base64解决不了跨域问题。跨域的图片转成base64不显示
//		$("#pdfContent").find("img").each(function(index,item){
//			var url=$(item).attr("src");
//			var outputFormat='images/'+url.substring(url.lastIndexOf(".")+1,url.length);
//			var canvas = document.createElement("canvas");
//	        var ctx = canvas.getContext('2d');
//	        var img = new Image();  
//		    img.onload = function(){
//		    	canvas.height = img.height;
//			    canvas.width = img.width;
//			    ctx.drawImage(img,0,0);//img转换为canvas
////			    ctx.fillRect(0, 0, img.height, img.width);  
//			    var base64 =canvas.toDataURL('images/jpeg');  //注意是canvas元素才有 toDataURL 方法  
//			    console.log(base64);  
//			    $(item).attr("src",base64);
//		    };
//		    img.src = url;
//		    img.crossOrigin = '*';//解决跨域问题，需在服务器端运行，也可为 anonymous   
//		});
		
		// 将 id 为 content 的 div 渲染成 canvas
	    html2canvas([$("#pdfContent").get(0)], {
	        // 渲染完成时调用，获得 canvas
	        onrendered: function(canvas) {
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

	            doc.save('研究报告.pdf');
	        }
	    });
	});
	//点击线图的tab
	$(".tux_tab span").on("click",function(){
		var text=$(this).text();
		$(this).addClass("on").siblings().removeClass("on");
		var idVal=$(this).attr("data-id");
		var idValIndex=idVal.substring(idVal.length-1,idVal.length);
		if(text=="日线图"){
//			dailyData();

			$("#fenshitu_"+idValIndex).hide();
			$("#rixiantu_"+idValIndex).show();
			$("#shizhitu_"+idValIndex).hide();
		}else if(text=="分时图"){
//			fst();

			$("#fenshitu_"+idValIndex).show();
			$("#rixiantu_"+idValIndex).hide();
			$("#shizhitu_"+idValIndex).hide();
		}else if(text=="市值"){
//			marketValue();
			$("#fenshitu_"+idValIndex).hide();
			$("#rixiantu_"+idValIndex).hide();
			$("#shizhitu_"+idValIndex).show();
		}
	})
	
	
})
//研究对象
var paramStockCodes="";
var paramStockNames="";
//研究报告期望市值
var expectValue="--";
/**
 * 查询研究报告内容
 */
function findReportById(){
	$.axs("/betaInvest/report/findReportByIdToBase64.do",{id:id},false,function(data){
		if(data.retCode=="0000"){
			var result =data.retData;
			if(result==null){
				return false;
			}
			$("#thisTitle").text(result.title);
			if(localStorage.getItem("userName")!=null && localStorage.getItem("userName")!="null" && localStorage.getItem("userName")!="" && localStorage.getItem("userName")!=undefined){
				$("#thisUserName").text(localStorage.getItem("userName"));
			}else{
				$("#thisUserName").text(localStorage.getItem("phone"));
			}
			$("#thisTime").text(result.dateTime.substring(0,16));
			//富文本内容
			$(".yulan_content").html(result.context);
			//期望市值
			if(result.expectValue!=null && result.expectValue!="" && result.expectValue!="undefined"){
				expectValue=(result.expectValue/10000.00).toFixed(2);
//				console.log(expectValue);
//				$("#mubiaoshizhi_"+index).text(result.expectValue);
			}
			//研究对象
			if(result.researchStockCode!=null && result.researchStockCode!="" && result.researchStockCode!=undefined){
				paramStockCodes=result.researchStockCode;
				paramStockNames=result.researchStockName;
				$("#studyName").html(paramStockNames+">");
				//右边数据显示
				showRightData(result.expectValue==null?"":result.expectValue);
			}
			
		}else{
			errorAlert("",data.retMsg)
		}
	});
}
//分时图数据
//var fenshituDataMap={};
//分时图下面数据
var reportPreviewHQMap={};
function showRightData(mubiaoshizhi){
	//查询分时图下面数据
	findReportPreviewHQ(paramStockCodes);
	//循环查询时分图
	$("#researchStockNum").text("（"+paramStockCodes.split(",").length+"）")
	var stockCodeArray=paramStockCodes.split(",");
	var stockNameArray=paramStockNames.split(",");
	var mubiaoshizhiArray=mubiaoshizhi.split(",");
	$.each(stockCodeArray,function(index,item){
		//添加右边的div
		addRightHtml(index);
		//右边数据显示
		//标题
		var value=stockNameArray[index]+"("+stockCodeArray[index]+")";
		$("#codeAndName_"+index).text(value);
		//右边时分图数据
		findGraphData(stockCodeArray[index],index);
		//查询市值和日线图数据
		findRXSZData(stockCodeArray[index],index);
		//分时图下面数据
		var obj=reportPreviewHQMap[stockCodeArray[index]];
		//console.log(obj);
		$("#zuixinjia_"+index).text(obj.zuixinjia==null?"--":obj.zuixinjia);
		$("#zhangdiefu_"+index).text(obj.zhangdiefu==null?"--":obj.zhangdiefu+"%");

		if(obj.zhangdiefu<0){
			$("#zuixinjia_"+index).addClass("green");
			$("#zhangdiefu_"+index).addClass("green");
		}else{
			$("#zuixinjia_"+index).addClass("red");
			$("#zhangdiefu_"+index).addClass("red");
		}
		$("#zongshizhi_"+index).text(obj.zongshizhi==null?"--":(obj.zongshizhi/100000000.00).toFixed(2));
		$("#liutongshizhi_"+index).text(obj.liutongshizhi==null?"--":(obj.liutongshizhi/100000000.00).toFixed(2));

//		console.log(expectValue);
		if(mubiaoshizhiArray[index]!=null && mubiaoshizhiArray[index]!="" && mubiaoshizhiArray[index]!="undefined"){
			//expectValue=(result.expectValue/10000.00).toFixed(2);
			//期望市值
			$("#mubiaoshizhi_"+index).text((mubiaoshizhiArray[index]/100.00).toFixed(2));
		}
		
		
		$("#zongguben_"+index).text(obj.zongguben==null?"--":(obj.zongguben/100000000.00).toFixed(2));
		var hangyemingcheng=obj.hangyemingcheng==null?"--":obj.hangyemingcheng;
		$("#hangye_"+index).attr("title",hangyemingcheng);
//		if(hangyemingcheng.length>5){
//			hangyemingcheng=hangyemingcheng.substring(0,5)+"...";
//		}
		$("#hangye_"+index).text(hangyemingcheng);
		$("#hangyegongsizongshu_"+index).text(obj.totalNum==null?"--":obj.totalNum);
		$("#shiyinglv_"+index).text(obj.shiyinglv==null?"--":obj.shiyinglv);
		$("#shijinglv_"+index).text(obj.shijinglv==null?"--":obj.shijinglv);
		$("#PEhangyezhongzhi_"+index).text(obj.ttm==null?"--":obj.ttm);
		var zhubanquanshang=obj.zhubanquanshang==null?"--":obj.zhubanquanshang;
		$("#zhubanquanshang_"+index).attr("title",zhubanquanshang);
//		if(zhubanquanshang.length>5){
//			zhubanquanshang=zhubanquanshang.substring(0,5)+"...";
//		}
		$("#zhubanquanshang_"+index).text(zhubanquanshang);
		//研究报告
		findBtUserStudyReport(stockCodeArray[index],index);
	});
}
/**
 * 查询分时图数据
 * @param stockCode
 */
function findGraphData(stockCode,index){
	$.axs("/betaInvest/quotation/findGraphData.do",{stockCode:stockCode},true,function(data){
		if(data.retCode=="0000"){
//			console.log("分时图：" + data.retData);
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
				});
			}
//			fenshituDataMap[stockCode]={newPrice:newPrice,CJJ:CJJ,ZDF:ZDF,arrCurTime:arrCurTime};
			fst(newPrice,CJJ,ZDF,index);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}
/**
 * 查询市值和日线图数据
 */
function findRXSZData(stockCode,index){
	$.axs("/betaInvest/quotation/findRKSZByDay.do",{stockCode:stockCode,wordDay:20},false,function(data){
		if(data.retCode=="0000"){
			var spj = []; //收盘价
			var cjl = []; //成交量
			
			var zsz = []; //总市值
			var ltsz = []; //流通市值
			
			var dateTime = [];
			
			$(data.retData).each(function(){
				//console.log(this.dataTime);
				spj.push(this.newPrice == null ? 0 : this.newPrice.toFixed(2));
				cjl.push(this.tradingVolume == null ? 0 : (this.tradingVolume/10000).toFixed(2));
				zsz.push(this.totalMarketValue == null ? 0 : (this.totalMarketValue/100000000).toFixed(2));
				ltsz.push(this.marketCapitalization == null ? 0 : (this.marketCapitalization/100000000).toFixed(2));
				dateTime.push(this.dataTime);
			})
			
//			SZDATA = {"zsz":zsz, "ltsz":ltsz, "dateTime":dateTime};
//			RXTDATA = {"spj":spj, "cjl":cjl, "dateTime":dateTime};
			dailyData(dateTime,cjl,spj,index);
			marketValue(dateTime,zsz,ltsz,index);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}
/**
 * 分时图--画图
 */
function fst(newPrice,CJJ,ZDF,index){
//	var newPrice=fenshituDataMap[stockCode].newPrice;
//	var CJJ=fenshituDataMap[stockCode].CJJ;
//	var ZDF=fenshituDataMap[stockCode].ZDF;
	
	var STOCK_CODE = "601099";
	var START_ID = getCurDate() + "0925";
	var END_ID = getCurDate() + "1500";
	var short_date = getCurDate();
	var short_id = "0925";
	var time_pos = "09:25";

	// 基于准备好的dom，初始化echarts实例
	var myChart1 = echarts.init(document.getElementById('fenshitu_'+index));
	// 基于准备好的dom，初始化echarts实例
//	var myChart2 = echarts.init(document.getElementById('newnumber_'+index));


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
	
	for (var i=0; i<=120; i++){
		arrCurTime.push([addZero(dtTimeAM.getHours()), addZero(dtTimeAM.getMinutes())].join(":"));
		dtTimeAM = new Date(dtTimeAM.getTime() + 60*1000);
	}
	var dtTimePM = new Date(dtCurDate.getFullYear(), dtCurDate.getMonth(), dtCurDate.getDate(), 13, 0, 0, 0)
	for (var i=0; i<=120; i++){
		arrCurTime.push([addZero(dtTimePM.getHours()), addZero(dtTimePM.getMinutes())].join(":"));
		dtTimePM = new Date(dtTimePM.getTime() + 60*1000);
	}
	//***************************************************************//
//	最新价格
	var line_data = []/* [8.9,10,25,25.6,25.6,25.6,25.6,25.6,25.6,30,30]*/;
	for (var i=0; i<arrCurTime.length; i++){
		line_data.push( {name: arrCurTime[i], value: ((newPrice[i] == undefined || newPrice[i] == null) ? "-" : newPrice[i])} );
	}
//	最新成交量
//	var bar_data = []/*[15.9,110,254,25.6,25.6,25.6,25.6,25.6,25.6,300,325]*/;
//	for (var i=0; i<arrCurTime.length; i++){
//		bar_data.push( {name: arrCurTime[i], value: ((CJJ[i] == undefined || CJJ[i] == null) ? "-" : CJJ[i])} );
//	}
	//涨跌幅
	var zd_data = []/*[10.9,32,25.4,52.6,33.6,65.6,25.6,44.6,76.6,150,25]*/;
	for (var i=0; i<arrCurTime.length; i++){
		zd_data.push( {name: arrCurTime[i], value: ((ZDF[i] == undefined || ZDF[i] == null) ? "-" : ZDF[i])} );
	}
//	function getDataPos(time){
//		for (var i=0; i<line_data.length; i++){
//			if (time == line_data[i].name) 
//				return i;
//		}
//	}

	option1 = {
//		title : {
//		},
		tooltip : {
			trigger : 'axis',
			axisPointer : {
				type : 'line'
			},
			position : 'top',
			formatter:function(params){
				console.log(params)
				return '<div class="shizhi_tips">'+
							'<span class="shizhi_time">'+params[0].name+'</span>'+
							'<div class="types_one">'+
								'<span class="shoupanjia">'+params[0].seriesName+'：</span>'+
								'<span class="shuju2">'+params[0].value+'元/股</span>'+
								'<div class="clr"></div>'+
							'</div>'+
							'<div class="types_two">'+
								'<span class="cjl_shuju">'+params[1].seriesName+'：</span>'+
								'<span class="shuju2">'+params[1].value+'</span>'+
								'<div class="clr"></div>'+
							'</div>'+
						'</div>';
			}

		},
		legend:{
			show:true,
			top:10,
			data:["当前价格","涨跌幅"]
		},
		grid : {
			top : '20%',
			left : '10%',
			right : '10%',
			bottom : '30%'
		},
		dataZoom:[{
			type:'slider',
			show:true,
			start:0,
			end:100

		}],
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
		},
		{
			scale : true,
			splitArea : {
				show : true
			}
		}],
		series : [ {
			name : '当前价格',
			type:'line',
			symbol:'circle', 
            itemStyle: {
                normal: {
                    color: '#36b8f4'
                }
            },
			data : line_data
		},
		{
			name : '涨跌幅',
			type:'line',
			symbol:'circle', 
            itemStyle: {
                normal: {
                    color: '#62a6f2'
                }
            },
			data : zd_data
		}]
	};

//	option2 = {
//		title : {
//		},
//		tooltip : {
//			trigger : 'axis',
//			axisPointer : {
//				type : 'line'
//			},
//			position : 'top'
//		},
//		grid : {
//			top : '5%',
//			left : '8%',
//			right : '3%',
//			bottom : '15%'
//		},
//		xAxis : {
//			boundaryGap : false,
//			type : 'category',
//			splitLine : {
//				show : true,
//				interval : function (index, value) {
//					if (value == "09:15" 
//						|| value == "09:30"
//						|| value == "10:30"
//						|| value == "11:30"
//						|| value == "14:00"
//						|| value == "15:00") {
//						return true;
//					}
//					else return false;
//				}
//			},
//			data: arrCurTime,
//			scale: true,
//			axisTick : {
//				show : true,
//				interval : function (index, value) {
//					if (value == "09:15" 
//						|| value == "09:30"
//						|| value == "10:30"
//						|| value == "11:30"
//						|| value == "14:00"
//						|| value == "15:00") {
//						return true;
//					}
//					else return false;
//				}
//			},
//			axisLabel : {
//				show : true,
//				interval : 0,
//				formatter: function (value, index) {
//					if (value == "09:15" 
//						|| value == "09:30"
//						|| value == "10:30"
//						|| value == "11:30"
//						|| value == "14:00"
//						|| value == "15:00") {
//						return value;
//					} else {
//						return "";
//					}
//				}
//			},
//		},
//		yAxis : [ {
//			scale : true,
//			splitArea : {
//				show : true
//			}
//		}],
//		series : [ {
//			name : '成交量',
//			type:'bar',
//            itemStyle: {
//                normal: {
//                    color: '#688db1'
//                }
//            },
//			data : bar_data
//		}]
//	};

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
	echarts.connect([myChart1]);
//	echarts.connect([myChart1, myChart2]);
	window.onresize = function(){
		myChart1.resize();
	};
}


//日线图
function dailyData(dateTime,cjl,spj,index){
//	var dateTime = RXTDATA.dateTime;
//	var cjl = RXTDATA.cjl;
//	var spj = RXTDATA.spj;
	//console.log(RXTDATA)
//	$("#newnumber").hide();
	var myChart = echarts.init(document.getElementById('rixiantu_'+index));
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
			left : '10%',
			right : '5%',
			bottom : '30%'
		},
		dataZoom:[{
			type:'slider',
			show:true,
			start:0,
			end:20

		}],
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
	window.onresize = function(){
		myChart.resize();
	};
}

//市值
function marketValue(dateTime,zsz,ltsz,index){
	
//	var dateTime = SZDATA.dateTime;
//	var zsz = SZDATA.zsz;
//	var ltsz = SZDATA.ltsz;
	
//	$("#newnumber").hide();
	var myChart = echarts.init(document.getElementById('shizhitu_'+index));
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
			left : '10%',
			right : '5%',
			bottom : '30%'
		},
		dataZoom:[{
			type:'slider',
			show:true,
			start:0,
			end:100

		}],
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
  window.onresize = function(){
		myChart.resize();
	};
}
/**
 * 时间补0
 * @param val
 * @param len
 * @param top
 * @returns
 */
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
 * 获取当前时间
 * @returns
 */
function getCurDate(){
	return [new Date().getFullYear(), addZero(new Date().getMonth()+1), addZero(new Date().getDate())].join("");
}


/**
 * 查询时分图下面的行情数据
 * @param index 表示是属于哪个公司的
 */
function findReportPreviewHQ(stockCodes){
	$.axs("/betaInvest/report/findReportPreviewHQ.do",{stockCodes:stockCodes},false,function(data){
		if(data.retCode=="0000"){
			var result =data.retData;
			if(result==null){
				return false;
			}
			for(var i=0;i<result.length;i++){
				var obj=result[i];
				reportPreviewHQMap[obj.stockCode]=obj;
			}
		}else{
			errorAlert("",data.retMsg)
		}
	});
}

/**
 * 用户对某个公司的研究报告
 * @param stockCode 股票代码
 */
function findBtUserStudyReport(stockCode,index){
	$.axs("/betaInvest/btUserStudyReport/findBtUserStudyReport.do",{stockCode:stockCode},true,function(data){
		if(data.retCode=="0000"){
			var result =data.retData;
			if(result==null || result.length<=0){
				return false;
			}
			for(var i=0;i<result.length;i++){
				var obj=result[i];
				
				
				//当类型是报告时class是baogao，图表为tubiao，券商为quanshang
				//1研究报告，模型报告，3企业报告,2图标分析
				var classname="";
				var baogaoname="";
				var viewUrl="javascript:void(0);";//预览
				var reportType=obj.reportType;
				if(reportType==1){//研究报告
					classname="baogao";
					baogaoname="研究";
					viewUrl="/myResearch/reportPreview.html?id="+obj.keyVlaue;
				}else if(reportType==2){//模型报告
					classname="baogao";
					baogaoname="模型";
//					viewUrl="/myResearch/modelReportDetail.html"+obj.edirParam;
					viewUrl="/myResearch/modelReportDetail.html?key="+obj.keyVlaue;
				}else if(reportType==3){//图标分析
					classname="tubiao";
					baogaoname="图标";
					viewUrl="/myResearch/chartPreview.html"+obj.edirParam;
				}else if(reportType==4){//企业报告
					deleUrl="";
					editUrl="";
					viewUrl="";
				}
//				if(obj.reportType==1){
//					classname="baogao";
//					baogaoname="研究报告";
//					url="/myResearch/reportPreview.html?id="+obj.keyValue;
//				}else if(obj.reportType==2){
//					classname="tubiao";
//					baogaoname="模型报告";
//				}else if(obj.reportType==3){
//					classname="quanshang";
//					baogaoname="企业报告";
//				}
				var titleNameSubString=obj.titleName;
				if(titleNameSubString.length>15){
					titleNameSubString=titleNameSubString.substring(0,13)+"...";
				}
				if(id!=obj.keyVlaue){
					var html='<li title="'+obj.titleName+'"><span class="'+classname+'">'+baogaoname+'</span><a href="'+viewUrl+'">'+titleNameSubString+'</a><b>'+obj.createTime+'</b><div class="clr"></div></li>';
					$("#baogao_"+index).append(html);
				}
				
			}
		}else{
			errorAlert("",data.retMsg)
		}
	});
}

/**
 * 添加右边代码
 */
function addRightHtml(index){
	var html='';
	html+='<div class="company_inform">';
	//标题
	html+='<div class="gs_mc">';
	html+='<span id="codeAndName_'+index+'">天阳科技(835713)</span>';
	html+='<em>收起</em>';
	html+='<b style="display: none;">展开</b>';
	html+='<div calss="clr"></div>';
	html+='</div>';
	//图片
	html+='<div class="shouqi_nr">';
	html+='<div class="zhexian_types">';
	html+='<div class="tux_tab">';
	html+='<span class="rxt on" data-id="fenshitu_'+index+'">日线图</span>';
	html+='<span class="fst" data-id="rixiantu_'+index+'">分时图</span>';
	html+='<span class="szt" data-id="shizhitu_'+index+'">市值</span>';
	html+='<div class="clr"></div>';
	html+='</div>';
//	html+='分时图';
	html+='<div class="baogao_tubiao1" style="display: none" id="fenshitu_'+index+'"></div>';
	html+='<div class="baogao_tubiao1"  id="rixiantu_'+index+'"></div>';
	html+='<div class="baogao_tubiao1" style="display: none" id="shizhitu_'+index+'"></div>';
	html+='</div>';
//	html+='<div class="baogao_tubiao2" id="newnumber_'+index+'">';
//	html+='</div>';
	//表格
	html+='<div class="gongsi_xq">';
	html+='<ul>';
	html+='<li><span>最新价</span><em id="zuixinjia_'+index+'">--</em></li>';
	html+='<li><span>涨跌幅%</span><em id="zhangdiefu_'+index+'">--</em></li>';
	html+='<li><span>总市值（亿）</span><em id="zongshizhi_'+index+'">--</em></li>';
	html+='<li><span>流通市值（亿）</span><em id="liutongshizhi_'+index+'">--</em></li>';
	html+='<li><span>目标市值（亿）</span><em id="mubiaoshizhi_'+index+'">--</em></li>';
	html+='<li><span>总股本（亿）</span><em id="zongguben_'+index+'">--</em></li>';
	html+='<li><span>行业</span><em id="hangye_'+index+'">--</em></li>';
	html+='<li><span title="行业三板公司总数">行业三板公司总数</span><em id="hangyegongsizongshu_'+index+'">--</em></li>';
	html+='<li><span>市盈率</span><em id="shiyinglv_'+index+'">--</em></li>';
	html+='<li><span>市净率</span><em id="shijinglv_'+index+'">--</em></li>';
	html+='<li><span title="PE(TTM)行业中值">PE(TTM)行业中值</span><em id="PEhangyezhongzhi_'+index+'">--</em></li>';
	html+='<li><span>主办券商</span><em id="zhubanquanshang_'+index+'">--</em></li>';
	html+='<div class="clr"></div>';
	html+='</ul>';
	html+='</div>';
//	html+='研究记录';
	html+='<div class="yjjilu">';
	html+='<div class="yanjiujilu">';
	html+='<span>研究记录</span>';
	html+='<em onclick="location.href=\'/myResearch/researchReport.html\'">查看全部</em>';
	html+='<div class="clr"></div>';
	html+='</div>';
	html+='<ul class="baog_types" id="baogao_'+index+'">';
	//此处是循环添加
//	html+='<li>';
//	//html+='当类型是报告时class是baogao，图表为tubiao，券商为quanshang';
//	html+='<span class="baogao">报告</span>';
//	html+='<a href="javascript:;">关于财务软件研究分析报告</a>';
//	html+='<b>2017-06-25</b>';
//	html+='<div class="clr"></div>';
//	html+='</li>';
	html+='</ul>';
	html+='</div>';
	html+='</div>';
	html+='</div>';
	$(".yulan_zb").append(html);
}