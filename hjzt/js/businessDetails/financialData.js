//财务数据
var stockCode=getUrlParam("stockCode");
var stockName=getUrlParam("stockName");
localStorage.setItem("data_name","财务摘要");
//股票代码为空，回退页面
if(stockCode==null || stockCode=="" || stockCode=="undefined"){
//	 errorAlert("","请选择股票代码");
	 window.history.go(-1);
}
var yearText='';
$(function(){
	var height=$(window).height()-180;
	$("#financeDataTable").css("height",height);
	$("#stockNameShow").text(stockName);
	//查询财务数据
	findEaseUIFinanceData();
	//财务数据名称(层级关系)
//	findFinanceName();
	
	//计算li的宽度
//	var Lwidth1=Math.ceil($(".cw_shuju").width()*0.187);
//	$(".zhibiao_shuju").css("width",Lwidth1);
	//点击tab切换
	$(".gp_tab a").on("click",function(){
		$(this).addClass("on").siblings().removeClass("on");
		yearText=$(".list_times").find("p").text();
		var data_name=$(this).text();
		localStorage.setItem("data_name",data_name);
		//查询数据
//		findFinanceName();
		findEaseUIFinanceData();
	});
	//点击年报的框
	$(".data-checkbox").on("click",function(){
		if($(this).find("label.checkbox").hasClass("on")){
			//判断年报、半年报 选择的只剩下一个不允许取消选择
			if($(this).parent().hasClass("nianbao")){
				var length=$(".nianbao").find("label.on").length;
				if(length==1){
					errorAlert("","至少选择一个财务类型");
					return false;
				}
			}
			$(this).find("label.checkbox").removeClass("on");
		}else{
			$(this).find("label.checkbox").addClass("on");
		}
		if($(this).find("label.checkbox").attr("id")!="yincangkongshuju"){
			//查询数据
//			findFinanceName();
			findEaseUIFinanceData();
		}else{
			//隐藏空数据---画图
//			$(".zhibiao_titles ").find("li.addbgc").click();
			//easyUi单击事件
			$(".datagrid-btable").find("tr.datagrid-row-selected").click();
		}
	});
	//点击单位的时候切换单位
	$(".list_danwei li").on("click",function(){
		var danwei=$(this).find("a").text();
		$(".caiwu_danwei span").text(danwei);
		var p = $(this).parent().prev();
		p.attr("data-value", $(this).attr("data-value"));
		$("#showDanwei").text(danwei);
		localStorage.setItem("danwei","单位:"+danwei);
		//查询数据
//		findFinanceName();
		findEaseUIFinanceData();
//		//点击单位计算表格
//		var li1Width=$(".nianbao_shuju>ul>li.zhibiao_titles").width();
//		var width=($(".nianbao_shuju").width())-li1Width;
//		var liwidth='';
//		var time=$(".list_times p").attr("data-value");
//		if(time=='2'){
//			liwidth=width/4;
//			$(".nianbao_shuju>ul>li.zhibiao_shuju").css("width",liwidth)
//		}else if(time=='3'){
//			liwidth=width/6;
//			$(".nianbao_shuju>ul>li.zhibiao_shuju").css("width",liwidth)
//		}else if(time=='5'){
//			liwidth=width/10;
//			$(".nianbao_shuju>ul>li.zhibiao_shuju").css("width",liwidth)
//		}

		
		
	});
	//导出数据
	$(".dao_shuj").on("click",function(){
		//清空导出的html
//		$("#exportTable thead tr").html('');
//		$("#exportTableHtml").html('');
//		//导出的数据
//		$("#financeData").find("li.zhibiao_titles").each(function(culomn,culomnObj){
//			$("#exportTable thead tr").append("<th>"+$(culomnObj).find("li").eq(0).text()+"</th>");
//			$(culomnObj).find("li").each(function(row,rowObj){
//				if(row!=0){
//					$("#exportTableHtml").append("<tr><td>"+($(rowObj).attr("title")==undefined?$(rowObj).text():$(rowObj).attr("title"))+"</td></tr>");
//				}
//			});
//		});
//		$("#financeData").find("li.zhibiao_shuju").each(function(culomn,culomnObj){
////			console.log($(culomnObj).find("li").length);
//			$("#exportTable thead tr").append("<th>"+$(culomnObj).find("li").eq(0).text()+"</th>");
//			$(culomnObj).find("li").each(function(row,rowObj){
//				if(row!=0){
//					if($(rowObj).text()!="--" && $(rowObj).text()!=null && $(rowObj).text()!=''  && $(rowObj).text()!=undefined){
//						var showDanweiExcel=$("#showDanwei").text();
//						console.log(showDanweiExcel);
//						var titleName=$("#exportTableHtml").find("tr").eq(row-1).find("td").eq(0).text();
//						if(titleName.indexOf("率")>-1){
//							showDanweiExcel="%";
//						}else if(titleName.indexOf("倍数")>-1){
//							showDanweiExcel="倍";
//						}else if(titleName.indexOf("股本")>-1){
//							if(titleName.length=2){
//								showDanweiExcel=showDanweiExcel.substring(0,1)+"股";
//							}else{
//								showDanweiExcel="股";
//							}
//						}
//						$("#exportTableHtml").find("tr").eq(row-1).append("<td>"+$(rowObj).text()+showDanweiExcel+"</td>");
//					}else{
//						$("#exportTableHtml").find("tr").eq(row-1).append("<td>"+$(rowObj).text()+"</td>");
//					}
//					
//				}
//			});
//		});
//		method5('exportTable');
		var param={stockCode:stockCode,stockName:stockName}
		window.location.href='/betaInvest/finance/exportExcel.do?stockCode='+stockCode+"&stockName="+stockName
		//$.axs("/betaInvest/finance/exportExcel.do",param,false,function(data){});
	});
	//点击一级标题，隐藏掉所有数据
	$(".yiji_title").on("click",function(){
		//当前标签的位置
		var thisIndex=$(this).index();
		
		if($(this).hasClass("on")){
			$(this).removeClass("on");
			//所有列表中的同级中去掉on
			$("#financeData").find("ul.eve_zhibiao").each(function(index,item){
				$(item).find("li").eq(thisIndex).removeClass("on");
				//隐藏 单击标签中同级别标签后面所有的标签
				$(item).find("li").each(function(index,item){
					if(index>thisIndex){
						$(item).hide();
					}
				});
			});
			
		}else{
			$(this).addClass("on");
			//所有列表中的同级中添加on
			$("#financeData").find("ul.eve_zhibiao").each(function(index,item){
				$(item).find("li").eq(thisIndex).addClass("on");
				//显示 单击标签中同级别标签后面所有的标签
				$(item).find("li").each(function(index,item){
					if(index>thisIndex){
						$(item).show();
					}
				});
			});
		}
	})
	//点击二级标题，对应的数据显示下拉或者隐藏
	$(".nianbao_shuju").delegate(".erji_title","click",function(){
		//当前是第几个li标签
		var thisIndex=$(this).index();
		//获取下一个li中有ON类的标签下标
		var nextObj=$(this).next();
		var nextIndex=$(this).next().index();
		
		if($(this).hasClass("on")){
			//循环判断下一个li中是标题的标签下标
			while (!nextObj.hasClass("on") && !nextObj.hasClass("erji_title")) {
				nextObj=nextObj.next();
				nextIndex=nextObj.index();
				//判断是不是最后一个LI，如果是取最大长度
				if(nextIndex>=((".zhibiao_titles  ul.eve_zhibiao li").length-1) || nextIndex==-1){
					nextIndex=$(".zhibiao_titles  ul.eve_zhibiao li").length;
					break;
				}
			}
//			console.log(thisIndex+"-"+nextIndex);
			//添加收缩样式
			$(this).removeClass("on");
			//所有列表中的同级中添加收缩样式
			$("#financeData").find("ul.eve_zhibiao").each(function(index,item){
				$(item).find("li").eq(thisIndex).removeClass("on");
			});
			//隐藏掉当前标签开始，到下一个标题标签的所有数据项
			$(".eve_zhibiao li").each(function(index,item){
				if(index>thisIndex && index<nextIndex){
					$(item).hide();
					$("#financeData").find("li.zhibiao_shuju").each(function(i,obj){
						$(obj).find("ul").eq(0).find("li").eq(index).hide();
					});
				}
			});
		}else{
			//循环判断下一个li中是标题的标签下标
			while (nextObj.is(":hidden") && !nextObj.hasClass("erji_title")) {
				nextObj=nextObj.next();
				nextIndex=nextObj.index();
				//判断是不是最后一个LI，如果是取最大长度
				if(nextIndex>=((".zhibiao_titles  ul.eve_zhibiao li").length-1) || nextIndex==-1){
					nextIndex=(".zhibiao_titles  ul.eve_zhibiao li").length;
					break;
				}
			}
			//添加展开样式
			$(this).addClass("on");
			//所有列表中的同级中添加展开样式
			$("#financeData").find("ul.eve_zhibiao").each(function(index,item){
				$(item).find("li").eq(thisIndex).addClass("on");
			});
			//显示掉当前标签开始，到下一个标题标签的所有数据项
			$(".eve_zhibiao li").each(function(index,item){
				if(index>thisIndex && index<nextIndex){
					$(item).show();
					$("#financeData").find("li.zhibiao_shuju").each(function(i,obj){
						$(obj).find("ul").eq(0).find("li").eq(index).show();
					});
				}
			});
		}
	});
	//单击数据项，绘制echart图
	$(".nianbao_shuju").delegate(".eiji_shuji","click",function(){
		var titleIndex=$(this).index();
		var thisText=$(this).parent().parent().parent().find("li.zhibiao_titles").find("li").eq(titleIndex).text()
//		console.log(thisText);
		if(thisText.length>=13){
			thisText=$(this).parent().parent().parent().find("li.zhibiao_titles").find("li").eq(titleIndex).attr("title");
		}
		localStorage.setItem("data_name",thisText);
		var echartDataValue=new Array();
		var echartDataDate=new Array();
		//当前是第几个li标签
		var thisIndex=$(this).index();
		$("#financeData").find("ul.eve_zhibiao").each(function(index,item){
			//给单击的行添加背景图
			$(item).find("li").eq(thisIndex).addClass("addbgc").siblings().removeClass("addbgc");
			if(index!=0){//不为标题的情况下获取值
				var value=$(item).find("li").eq(thisIndex).text();
//				console.log(value);
				var dateShow=$(item).find("li").eq(0).text();
//				console.log(value+"--"+dateShow);
				if(value=="--"){
					value=0;
				}
				if($("#yincangkongshuju").hasClass("on") && value==0){
					//继续循环
					return true; 
				}
				echartDataValue.push(value);
				echartDataDate.push(dateShow);
			}
		});
		var echartDataValueTmp=[];
		var echartDataDateTmp=[];
		for (var i = echartDataDate.length; i > 0; i--) {
			echartDataDateTmp.push(echartDataDate[i-1]);
			echartDataValueTmp.push(echartDataValue[i-1]);
		}
		echartDataDate=echartDataDateTmp;
		echartDataValue=echartDataValueTmp;
		//绘制图表
		drawEcharts(echartDataDate,echartDataValue);
	});
	//点击上面的下拉时间计算出下面表格的li的宽度
	$(".list_times").delegate("li","click",function(){
		yearText=$(this).find("a").text();
		var p = $(this).parent().prev();
		p.attr("data-value", $(this).attr("data-value"));

		//查询数据
	//	findFinanceName();
		findEaseUIFinanceData();
	});
	//绘制图表
//	drawEcharts(echartDataDate,echartDataValue);
	
	//默认单击第一个绘制图片
	$(".eve_zhibiao").find("li.eiji_shuji").eq(0).click();
	
	//显示缩略图
	
	$(".boar_r").scroll(function() {//页面滚动显示元素。
		if($(".boar_r ").scrollTop()>=400){
			$("#nianbao_minDom").show();
		}else{
			$("#nianbao_minDom").hide();
		}
	});
//	关闭缩略图显示小图标
$("#close_minDom").click(function(){
	$("#nianbao_minDom").css({"opacity":"0","z-index":"-1"});
	$(".small_minDom").show();
});
//点击显示小图标打开缩略图
$(".small_minDom").click(function(){
	$("#nianbao_minDom").css({"opacity":"1","z-index":"2"});
	$(".small_minDom").hide();
});
})
/**
 * 财务数据名称(层级关系)
 */
function findFinanceName(){
	var dataType=$(".gp_tab").find("a.on").attr("data-value");
	var dataTypeName=$(".gp_tab").find("a.on").text();
	var param={dataType:dataType, stockCode:stockCode}
	$.axs("/betaInvest/finance/findFinanceName.do",param,false,function(data){
		if(data.retCode=='0000'){
			var result=data.retData;
			if(result==null){
				return false;
			}
			//console.log(result);
//			var html='<li class="zhibiao_titles fl"></li>';
			//$("#financeData").html(html);
			
//			html+='<ul class="eve_zhibiao"></ul>';
			//$(".zhibiao_titles").html(html);
			var html='<li class="zhibiao_titles fl">';
			html+='<ul class="eve_zhibiao">';
			
			html+='<li class="cw_titles xiangmu" id="reportPeriod">项目</li>';
			html+='<li class="cw_yiji yiji_title on">'+dataTypeName+'</li>';
			//$(".eve_zhibiao").html(html);
			
			var resultDataType='';
			$(result).each(function(index,item){
				//1:资产负债;2:利润;3:现金流量;4:偿债能力;5:成长情况;6:盈利能力;7:营运情况;8:股本情况;9:非经常性损益
				if(resultDataType.indexOf(item.dataType)==-1){
					if(item.dataType==1){
						html+='<li class="erji_title on" id="'+item.dataType+'">资产负债</li>';
						//$(".eve_zhibiao").append('<li class="erji_title on" id="'+item.dataType+'">资产负债</li>');
					}else if(item.dataType==2){
						html+='<li class="erji_title on" id="'+item.dataType+'">利润</li>';
						//$(".eve_zhibiao").append('<li class="erji_title on" id="'+item.dataType+'">利润</li>');
					}else if(item.dataType==3){
						html+='<li class="erji_title on" id="'+item.dataType+'">现金流量</li>';
						//$(".eve_zhibiao").append('<li class="erji_title on" id="'+item.dataType+'">现金流量</li>');
					}else if(item.dataType==4){
						html+='<li class="erji_title on" id="'+item.dataType+'">偿债能力</li>';
						//$(".eve_zhibiao").append('<li class="erji_title on" id="'+item.dataType+'">偿债能力</li>');
					}else if(item.dataType==5){
						html+='<li class="erji_title on" id="'+item.dataType+'">成长情况</li>';
						//$(".eve_zhibiao").append('<li class="erji_title on" id="'+item.dataType+'">成长情况</li>');
					}else if(item.dataType==6){
						html+='<li class="erji_title on" id="'+item.dataType+'">盈利能力</li>';
						//$(".eve_zhibiao").append('<li class="erji_title on" id="'+item.dataType+'">盈利能力</li>');
					}else if(item.dataType==7){
						html+='<li class="erji_title on" id="'+item.dataType+'">营运情况</li>';
						//$(".eve_zhibiao").append('<li class="erji_title on" id="'+item.dataType+'">营运情况</li>');
					}else if(item.dataType==8){
						html+='<li class="erji_title on" id="'+item.dataType+'">股本情况</li>';
						//$(".eve_zhibiao").append('<li class="erji_title on" id="'+item.dataType+'">股本情况</li>');
					}else if(item.dataType==9){
						html+='<li class="erji_title on" id="'+item.dataType+'">非经常性损益</li>';
						//$(".eve_zhibiao").append('<li class="erji_title on" id="'+item.dataType+'">非经常性损益</li>');
					}
					resultDataType+=item.dataType+",";
				}
				
				var nbspNum=(item.levelClass-1)*4;
				var nbspJs='';
				var nbspHtml='';
				//for(i=0;i<nbspNum;i++){
				//	nbspJs+='\v';
				//	nbspHtml+="&nbsp;";
				//}
				//var showName=nbspJs+item.nameCn;
				var showName=item.nameCn;
//				if(showName.length>10){
//					showName=showName.substring(0,10)+"...";
//				}
				if(item.parentKey=="0" || item.parentKey==0){
					html+='<li class="eiji_shuji" id="'+item.uuId+'" title='+item.nameCn+'>'+showName+'</li>';
					//$("#"+item.dataType).after('<li class="eiji_shuji" id="'+item.uuId+'" title='+item.nameCn+'>'+nbspHtml+showName+'</li>');
				}else{
					html+='<li class="eiji_shuji" id="'+item.uuId+'" title='+item.nameCn+'>'+showName+'</li>';
					//$("#"+item.parentKey).after('<li class="eiji_shuji" id="'+item.uuId+'" title='+item.nameCn+'>'+nbspHtml+showName+'</li>');
				}
			});
			html+='</ul></li><div class="data_info_cw fl"><div id="data_info_cw" style="width:2000px"></div><div class="clr"></div></div><div class="clr"></div>';
//			calculationWidth();
			$("#financeData").html(html);
			//查询财务数据
			findFinanceData();
			var zhibiaoLength= $(".zhibiao_shuju").length;
			if(zhibiaoLength>4){
				$(".zhibiao_titles").css("border-right","1px solid #d9d8de");
			}
			
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}
/**
 * 
 */
function findFinanceData(){
	//单位
	var danwei=$("#danwei").attr("data-value");
//	$("#showDanwei").text($("#danwei").text());
	//年报、半年报
	var reportPeriod='';
	$(".nianbao").find("label.checkbox").each(function(index,item){
		if($(item).hasClass("on")){
			reportPeriod+=$(item).attr("data-value")+",";
		}
	});
	reportPeriod=reportPeriod.substring(0,reportPeriod.length-1);
	//显示的长度
	var showLength=$("#showLength").attr("data-value");
	showLength=showLength*(reportPeriod.split(",").length);
	
	var dataType=$(".gp_tab").find("a.on").attr("data-value");
	var param={stockCode:stockCode,dataType:dataType,reportPeriod:reportPeriod}
	$.axs("/betaInvest/finance/findFinanceData.do",param,false,function(data){
		if(data.retCode=='0000'){
			var result=data.retData;
			if(result==null){
				return false;
			}
			var zhibiaoshujuLeng=result.length;
			var dataLiLength=$(".zhibiao_titles").find("ul").eq(0).find("li").length-3;
			for (var i = 0; i < zhibiaoshujuLeng; i++) {
				if(i>=showLength){
					break;
				}
//				$("#"+key).outerHeight();
//				$("#financeData").find("li.zhibiao_shuju").eq(index).find("ul").eq(0).find("li").eq(dataIndex).css("height",(firstLiHeight)+"px");
				var html='<li class="zhibiao_shuju fl">';
				html+='<ul class="eve_zhibiao">';
				html+='<li class="'+$(".zhibiao_titles").find("ul").eq(0).find("li").eq(0).attr("class")+'" style="height:'+$("#financeData").find("li.zhibiao_titles").eq(0).find("ul").eq(0).find("li").eq(0).outerHeight()+'px"></li>';//'+item.reportPeriod+'
				html+='<li class="'+$(".zhibiao_titles").find("ul").eq(0).find("li").eq(1).attr("class")+'" style="height:'+$("#financeData").find("li.zhibiao_titles").eq(0).find("ul").eq(0).find("li").eq(1).outerHeight()+'px"></li>';
				html+='<li class="'+$(".zhibiao_titles").find("ul").eq(0).find("li").eq(2).attr("class")+'" style="height:'+$("#financeData").find("li.zhibiao_titles").eq(0).find("ul").eq(0).find("li").eq(2).outerHeight()+'px"></li>';
				for (var j = 0; j < dataLiLength; j++) {
					var firstLiHeight=$("#financeData").find("li.zhibiao_titles").eq(0).find("ul").eq(0).find("li").eq(j+3).outerHeight();
					var liClassName=$(".zhibiao_titles").find("ul").eq(0).find("li").eq(j+3).attr("class");
					html+='<li class="'+liClassName+'" style="height:'+firstLiHeight+'px;line-height:'+firstLiHeight+'px"></li>';
				}
				html+='</ul>';
				html+='</li>';
//				$("#financeData").empty();

				$("#data_info_cw").prepend(html);
				var wi=$(window).width();
				if(wi<1600){
				$("#data_info_cw").css("width",$("#data_info_cw li.zhibiao_shuju").length*190);
					
				}else{
				$("#data_info_cw").css("width",$("#data_info_cw li.zhibiao_shuju").length*290);	
				}

			}
//			console.log($("#financeData").find("li.zhibiao_shuju").length);
			var resultDataType='';
			$(result).each(function(index,item){
				if(index>=showLength){
					return false;
				}
				$.each(item,function(key,value){
//					console.log(key+":"+value);
					var dataIndex=$("#"+key).index();
					var showValue="--";
					if(key=="reportPeriod" || key=="stockCode"){
						showValue=value;
					}else{
						if(dataType!=1 && dataType!=2 && dataType!=3){
							if($("#"+key).attr("title").indexOf("率")>-1 || $("#"+key).attr("title").indexOf("倍数")>-1){
								showValue=(value==null?"--":value);
							}else{
								showValue=(value==null?"--":(value/danwei).toFixed(2));
							}
						}else{
							showValue=(value==null?"--":(value/danwei).toFixed(2));
						}
					}
					
					if(showValue<0){
						$("#financeData").find("li.zhibiao_shuju").eq(index).find("ul").eq(0).find("li").eq(dataIndex).addClass("red");
						$("#financeData").find("li.zhibiao_shuju").eq(index).find("ul").eq(0).find("li").eq(dataIndex).text(showValue);
					}else{
						$("#financeData").find("li.zhibiao_shuju").eq(index).find("ul").eq(0).find("li").eq(dataIndex).text(showValue);
					}
					
				});
			});
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
//		calculationWidth();
		$(".eve_zhibiao").find("li.eiji_shuji").eq(0).click();
	});
}
//年报折线图
function drawEcharts(echartDataDate,echartDataValue,dataName){
//	var dataName= localStorage.getItem("data_name");
	
	var danwei= localStorage.getItem("danwei");
	if(danwei==null){
		danwei="单位:万元";
	}
	//<div class="caiwu_tb" id="nianbao"></div>
	//$("#nianbao").remove();
	//$("#financeDataTable").parent().before('<div class="caiwu_tb" id="nianbao"></div>');
	var myChart=echarts.init(document.getElementById("nianbao"));
	var myChart_min=echarts.init(document.getElementById("nianbao_min"));
	var option={
		legend: {
			show:true,
			left:'center',
	        data:[''+dataName+'']
	    },
	    color:["#36b8f4"],
	    tooltip:{
	    	show:true,
	    	trigger: 'axis',
	    	position:"top",
//	    	borderWidth:0,
//	    	borderColor:"#64bee5",
	    	padding:0,
	    	formatter:function(params){
				//console.log(params)
				return '<div class="shizhi_tips">'+
							'<span class="shizhi_time">'+params[0].name+'</span>'+
							'<div class="types_one">'+
								'<span class="shoupanjia fl">'+params[0].seriesName+'</span>'+
								'<span class="shuju2 fl">'+(params[0].data==undefined?"":params[0].data)+'('+$("#danwei").text()+')</span>'+
								'<div class="clr"></div>'+
							'</div>'+
						'</div>';	
				//return '<div class="caiw_tips">'+params[0].name+'<br><span>'+params[0].data+'('+$("#danwei").text()+')</span></div>';
	    	},
	    	
	    },
    	xAxis:  {
	        type: 'category',
	        boundaryGap: false,
	        data: echartDataDate//['2016年12月','2016年11月','2016年10月','2016年9月','2016年8月','2016年7月','2016年6月']
	    },
	    yAxis: {
	        type: 'value',
	        name:danwei,
//	        name:"单位:"+$("#danwei").text(),
	        nameTextStyle:{
	        	color:'#999'
	        }
	       
	    },
	    grid: {
		        left: '3%',
		        right: '10%',
		        bottom: '3%',
		        containLabel: true
		    }, 
    	 series: [
	        {
	            name:dataName,
	            type:'line',
	            symbol: 'circle',
	            data:echartDataValue,//[2630.00, 451.32, 5876.0, 124.80, 86235.00, 98561, 456122],
	           	itemStyle:{
	           		normal:{
	           			color:"#36b8f4",
	           			label : {show: true}
	           		}
	           	}
	          }]
	    
	}
 	// 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    myChart_min.setOption(option);
}
//根据所选的年份不一样需要计算li的宽度
function calculationWidth(){
	var value=$(".list_times").find("p").text();
	if(yearText=="2年"){
		var Lwidth1=Math.ceil($(".cw_shuju").width()*0.187);
		$(".zhibiao_shuju").css("width",Lwidth1);
	}
	
	else if(yearText=="3年"){
		var Lwidth2=Math.ceil($(".cw_shuju").width()*0.123);
		$(".zhibiao_shuju").css("width",Lwidth2);
	}
	else if(yearText=="5年"){
		var Lwidth3=Math.ceil($(".cw_shuju").width()*0.075);
		$(".zhibiao_shuju").css("width",Lwidth3);
	}
	var new_heigh = $(".new_boar_lir").height();
	$(".boar_l").css("height", new_heigh);
	
}


/**
 * 查询财务数据返回easeUI格式的数据
 */
function findEaseUIFinanceData(){
	//单位
	var danwei=$("#danwei").attr("data-value");
//	$("#showDanwei").text($("#danwei").text());
	//年报、半年报
	var reportPeriod='';
	$(".nianbao").find("label.checkbox").each(function(index,item){
		if($(item).hasClass("on")){
			reportPeriod+=$(item).attr("data-value")+",";
		}
	});
	reportPeriod=reportPeriod.substring(0,reportPeriod.length-1);
	//显示的长度
	var showLength=$("#showLength").attr("data-value");
	showLength=showLength*(reportPeriod.split(",").length);
	//数据类型 1资产负债  2利润 3现金流量  4 财务摘要
	var dataType=$(".gp_tab").find("a.on").attr("data-value");
	var param={stockCode:stockCode,dataType:dataType,reportPeriod:reportPeriod,length:showLength};
	//树形结构数据
	var treeDataShow=[];
	//标题
	$.axs("/betaInvest/finance/findFinanceName.do",param,false,function(data){
		if(data.retCode=='0000'){
			var result=data.retData;
			if(result==null){
				return false;
			}
			
			var int = 1;
			var titleObj={};
			titleObj.children=[];
			titleObj.uuid="";
			$(result).each(function(index,item){
				if(dataType == 2){
					if(index == 0){
						titleObj.id=1;
						titleObj.titileName="利润";
					}
				}else{
					if(item.parentKey == "0"){
						if(index != 0){
							treeDataShow.push(titleObj);
						}
						titleObj={};
						titleObj.children=[];
						titleObj.uuid="";
						titleObj.id=int;
						titleObj.titileName=item.nameCn;
						int++;
						return true;
					}
				}
				
				//获取分类下面的标题列表
				var titleObjChildren=titleObj.children;
				//分类标题不存在，重新创建一个列表
				if(titleObjChildren==null || titleObjChildren=="" ||titleObjChildren==undefined){
					titleObjChildren=new Array();
				}
				//创意标题列表中一个对象
				var titleObjChildrenObject={};
				titleObjChildrenObject.id=Number(item.dataType+""+(titleObjChildren.length+1));
				titleObjChildrenObject.titileName=item.nameCn;
				titleObjChildrenObject.uuid=item.uuId;
				//存放在列表中
				titleObjChildren.push(titleObjChildrenObject);
				titleObj.children=titleObjChildren;
				
				if(index == (result.length - 1)){
					treeDataShow.push(titleObj);
				}
			})
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
	//显示表格中第一行的日期
	var columnsNames=[];
	//数据
	$.axs("/betaInvest/finance/findFinanceData.do",param,false,function(data){
		if(data.retCode=='0000'){
			var result=data.retData;
			if(result==null){
				return false;
			}
			var columnsNamesArray=[];
			//columnsNamesArray.push({field: 'titileName', title: '项目',width: 300,nowrap:false});
	
			$(result).each(function(index,item){
				if(index>=showLength){
					return false;
				}
				//显示表格中第一行的日期
				var showDate=item.reportPeriod;
				columnsNamesArray.push({field: showDate, title: showDate,width: 200,styler:function(value,row,index){
					 if (value < 0){ 
						 return 'color:red;'; 
				     } 
				}});
				//数据
				$.each(item,function(key,value){//循环map取值
					//判断获取数据那个大分类下面
					var titleObj={};
					for (var i = 0; i < treeDataShow.length; i++) {
						var children=treeDataShow[i].children;
						$.each(children,function(childrenIndex,childrenItem){
							if(childrenItem.uuid==key){//判断数据的key是在那个里面
								//TODO 单位换算
								if(childrenItem.titileName.indexOf("率")>-1 || childrenItem.titileName.indexOf("倍数")>-1){
									showValue=(value==null?"--":value);
								}else{
									showValue=(value==null?"--":(value/danwei).toFixed(2));
								}
								(treeDataShow[i].children[childrenIndex])[showDate]=showValue;
								return false;
							}
						});
					}
				});
				for (var i = 0; i < treeDataShow.length; i++) {
					$.each(treeDataShow[i].children,function(childrenIndex,childrenItem){
						if((treeDataShow[i].children[childrenIndex])[showDate]==null ||
								(treeDataShow[i].children[childrenIndex])[showDate]=="null"	)
							(treeDataShow[i].children[childrenIndex])[showDate]="--";
					});
				}
			});
			columnsNames.push(columnsNamesArray);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
	//初始所有数据都是“--”
	
//	console.log(treeDataShow);
//	console.log(columnsNames);
	using('treegrid', function(){

	 $('#financeDataTable').treegrid({
		 idField: 'id',
		 treeField: 'titileName',
         fit: false, //是否100%显示
         border: false,
         //列数据
         columns: columnsNames,
//         columns: [[
				//{field: 'titileName', title: '项目', width: 300}
//             
//         ]],
		frozenColumns:[[
			{field:'titileName',title:'项目',width:500,nowrap:false}
			
		]],
         onLoadSuccess:function(node,data){//加载数据完毕
        	//默认一个单击事件--去画图
        	$(".nianbao_shuju").find("tr.treegrid-tr-tree").eq(0).find("tr.datagrid-row").eq(0).click();
        	
         },
//        fitColumns:true,  
		nowrap:false,
		//单击行出发方法
         onClickRow: function (row) {
        	 var echartDataDate=[];
        	 var echartDataValue=[];
        	 if(row.uuid!=""){
//        		 console.log(row);
        		 var columnsNameArray=columnsNames[0];
        		 for (var i = columnsNameArray.length; i > 0; i--) {
        			 var chartData=row[columnsNameArray[i-1].title];
        			 //隐藏空数据
        			if($("#yincangkongshuju").hasClass("on") && chartData=="--"){
     					//继续循环
     					continue;
     				}
        			if(chartData=="--"){
        				chartData=0;
        			}
        			echartDataDate.push(columnsNameArray[i-1].title);
        			echartDataValue.push(chartData); 
				 }
        		 //画图
        		 drawEcharts(echartDataDate,echartDataValue,row.titileName);
        	 }else{
        		 //TODO 调用收起方法
        		 //console.log("收起");
        	 }
         },
          data:treeDataShow
//         data:[{
//        		"id":1,
//        		"name":"C",
//        		"size":"",
//        		"date":"02/19/2010",
//        		"children":[{
//        			"id":2,
//        			"name":"Program Files",
//        			"size":"120 MB",
//        			"date":"03/20/2010",
//        			"children":[{
//        				"id":21,
//        				"name":"Java",
//        				"size":"",
//        				"date":"01/13/2010",
//        				"state":"closed",
//        				"children":[{
//        					"id":211,
//        					"name":"java.exe",
//        					"size":"142 KB",
//        					"date":"01/13/2010"
//        				},{
//        					"id":212,
//        					"name":"jawt.dll",
//        					"size":"5 KB",
//        					"date":"01/13/2010"
//        				}]
//        			},{
//        				"id":22,
//        				"name":"MySQL",
//        				"size":"",
//        				"date":"01/13/2010",
//        				"state":"closed",
//        				"children":[{
//        					"id":221,
//        					"name":"my.ini",
//        					"size":"10 KB",
//        					"date":"02/26/2009"
//        				},{
//        					"id":222,
//        					"name":"my-huge.ini",
//        					"size":"5 KB",
//        					"date":"02/26/2009"
//        				},{
//        					"id":223,
//        					"name":"my-large.ini",
//        					"size":"5 KB",
//        					"date":"02/26/2009"
//        				}]
//        			}]
//        		},{
//        			"id":3,
//        			"name":"eclipse",
//        			"size":"",
//        			"date":"01/20/2010",
//        			"children":[{
//        				"id":31,
//        				"name":"eclipse.exe",
//        				"size":"56 KB",
//        				"date":"05/19/2009"
//        			},{
//        				"id":32,
//        				"name":"eclipse.ini",
//        				"size":"1 KB",
//        				"date":"04/20/2010"
//        			},{
//        				"id":33,
//        				"name":"notice.html",
//        				"size":"7 KB",
//        				"date":"03/17/2005"
//        			}]
//        		}]
//        	}]

			//view:groupview, //分组视图开关
			//groupField:'productid', //分组依据
			//格式化分组项显示内容
//			groupFormatter:function(value,rows){
//				return value + ' - ' + rows.length + ' 条数据';
//			}
         /*,
			//数据初始化完成后默认关闭所有分组
			onLoadSuccess:function(data){
				var gridObj = $(this);
				$.each(data.rows,function(index,value){
					gridObj.datagrid('collapseGroup', index);
				})
			}*/
     });
	});
	
//	var height=$(document).innerHeight()-56;
//	$("#financeDataTable").css("height",height);
}
