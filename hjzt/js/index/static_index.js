//初始化加载
$(function(){
	findIndexListCount();
	//查询用户栏目的集合
	findCMList();
	//实时时间
	tick();
	//查询首页指数
	fingIndex();
	//查询资讯
	findByType(0,1,8);
	
	//查询企业报告	
	findReport();
	//添加应用
	//打开应用列表
	$(".applic_tjyy a").on("click",function(){
		$(".add_app_down").slideDown();
		$(".jiabeijing").show();
	});
	//	关闭应用列表
	$(".jiabeijing").on("click",function(){
		$(".add_app_down").slideUp();
			$(this).hide();
	});
	//添加各项应用
	$(".add_app_down ul li").on("click",function(){
		var ap = $(this).children("b").text();
		var moduletype = $(this).children("b").attr("data-value");
		var tjyy = '<li class="applic_tjyy"><a href="javascript:;"><span></span>添加应用</a></li>';
		if($(this).hasClass("on")){
			$(this).removeClass("on");
			if(ap=="多维选股"){
				var moduleId = $(".app_list li.applic_dwxg").attr("data-value");
				deleteOneCM(moduleId);
				$(".app_list li.applic_dwxg").remove();
				return false;
			}
			if(ap=="股票排行"){
				var moduleId = $(".app_list li.applic_gpph").attr("data-value");
				deleteOneCM(moduleId);
				$(".app_list li.applic_gpph").remove();
				return false;
			}
			if(ap=="工具分析"){
				var moduleId = $(".app_list li.applic_gjfx").attr("data-value");
				deleteOneCM(moduleId);
				$(".app_list li.applic_gjfx").remove();
				return false;
			}
			if(ap=="企业图谱"){
				var moduleId = $(".app_list li.applic_qytp").attr("data-value");
				deleteOneCM(moduleId);
				$(".app_list li.applic_qytp").remove();
				return false;
			}
			if(ap=="舆情跟踪"){
				var moduleId = $(".app_list li.applic_yqgz").attr("data-value");
				deleteOneCM(moduleId);
				$(".app_list li.applic_yqgz").remove();
				return false;
			}
		}else{
			$(this).addClass("on");
			if(ap=="多维选股"){
				var id = addCustomModule(moduletype);
				$(".app_list ul").prepend('<li class="applic_dwxg" data-value='+id+'><a href="/multidimensionalStock/multidStock.html" data-value="1"><span></span>多维选股</a></li>');
				return false;
			}
			if(ap=="股票排行"){
				var id = addCustomModule(moduletype);
				$(".app_list ul").prepend('<li class="applic_gpph" data-value='+id+'><a href="/stockRanking/stockRanking.html" data-value="2"><span></span>股票排行</a></li>');
				return false;
			}
			if(ap=="工具分析"){
				var id = addCustomModule(moduletype);
				$(".app_list ul").prepend('<li class="applic_gjfx" data-value='+id+'><a href="/toolAnalysis/toolMentor.html" data-value="3"><span></span>工具分析</a></li>');
				return false;
			}
			if(ap=="企业图谱"){
				var id = addCustomModule(moduletype);
				$(".app_list ul").prepend('<li class="applic_qytp" data-value='+id+'><a href="/relationMap/businessMapIndex.html" data-value="4"><span></span>企业图谱</a></li>');
				return false;
			}
			if(ap=="舆情跟踪"){
				var id = addCustomModule(moduletype);
				$(".app_list ul").prepend('<li class="applic_yqgz" data-value='+id+'><a href="/publicSentiment/overviewOfPublic.html" data-value="5"><span></span>舆情跟踪</a></li>');
				return false;
			}
		}
	});
	
	//资讯Table切换
	$(".ne_btn a").on("click",function(){
		var type = $(this).attr("data-value");
		if(type==0){
			$(this).siblings().removeClass("on");
			$(this).addClass("on");
			$("#type").text("行业")
			findByType(0,1,8);
		}else if(type==1){
			$(this).siblings().removeClass("on");
			$(this).addClass("on");
			$("#type").text("政策")
			findByType(1,1,8);
		}else if(type==2){
			$(this).siblings().removeClass("on");
			$(this).addClass("on");
			$("#type").text("公司")
			findByType(2,1,8);
		}else{
			$(this).siblings().removeClass("on");
			$(this).addClass("on");
			$("#type").text("市场")
			findByType(3,1,8);
		}
	});
	
	
});

/**
 * 查询首页指数
 */
function fingIndex(){
	$.axs("/betaInvest/threeBoardIndex/findIndex.do",null,true,function(data){
		if(data.retCode=="0000"){
			var resultCZ=data.retData.indexOne;
			var resultZS=data.retData.indexTwo;
			var indexCZ=data.retData.indexCZ;
			var indexZS=data.retData.indexZS;
			if(resultCZ==null||resultZS==null||indexCZ==null||indexZS==null){
				return false;
			}
			var indexHtml="";
			var zsHtml="";
			var czHtml="";
			if(resultZS.newPrice>0){
				zsHtml+='<em class="red">'+(resultZS.newPrice).toFixed(2)+'</em><i class="red">'+resultZS.priceChangeRatio+'%</i>';
			}else{
				zsHtml+='<em>'+(resultZS.newPrice).toFixed(2)+'</em><i>'+resultZS.priceChangeRatio+'%</i>';
			}
			if(resultCZ.newPrice>0){
				czHtml+='<em class="red">'+(resultCZ.newPrice).toFixed(2)+'</em><i class="red">'+resultCZ.priceChangeRatio+'%</i>';
			}else{
				czHtml+='<em>'+(resultCZ.newPrice).toFixed(2)+'</em><i>'+resultCZ.priceChangeRatio+'%</i>';
			}
			$("#zx_zs").html((resultZS.newPrice).toFixed(2));
			$("#kp_zs").html((resultZS.openPrice).toFixed(2));
			$("#zg_zs").html((resultZS.highPrice).toFixed(2));
			$("#zd_zs").html((resultZS.lowPrice).toFixed(2));
			if(resultZS.changeAmount>0){
				$("#zde_zs").removeClass("green").addClass("red");
			}else if(resultZS.changeAmount<0){
				$("#zde_zs").removeClass("red").addClass("green");
			}else{
				$("#zde_zs").removeClass("red").removeClass("green");
			}
			$("#zde_zs").html(resultZS.changeAmount+"%");
			if(resultZS.priceChangeRatio>0){
				$("#zdf_zs").removeClass("green").addClass("red");
			}else if(resultZS.priceChangeRatio<0){
				$("#zdf_zs").removeClass("red").addClass("green");
			}else{
				$("#zdf_zs").removeClass("red").removeClass("green");
			}
			$("#zdf_zs").html(resultZS.priceChangeRatio+"%");
			$("#cjl_zs").html(Math.round(resultZS.tradingVolume/1000000));
			$("#cjl_zs").parent().attr("title","成交量(百万股)");
			$("#cje_zs").html((resultZS.tradingAmount/1000000).toFixed(2));
			$("#cje_zs").parent().attr("title","成交额(百万元)");
			$("#zx_cf").html((resultCZ.newPrice).toFixed(2));
			$("#kp_cf").html((resultCZ.openPrice).toFixed(2));
			$("#zg_cf").html((resultCZ.highPrice).toFixed(2));
			$("#zd_cf").html((resultCZ.lowPrice).toFixed(2));
			if(resultCZ.changeAmount>0){
				$("#zde_cf").removeClass("green").addClass("red");
			}else if(resultCZ.changeAmount<0){
				$("#zde_cf").removeClass("red").addClass("green");
			}else{
				$("#zde_cf").removeClass("red").removeClass("green");
			}
			$("#zde_cf").html(resultCZ.changeAmount+"%");
			if(resultCZ.priceChangeRatio>0){
				$("#zdf_cf").removeClass("green").addClass("red");
			}else if(resultCZ.priceChangeRatio<0){
				$("#zdf_cf").removeClass("red").addClass("green");
			}else{
				$("#zdf_cf").removeClass("red").removeClass("green");
			}
			$("#zdf_cf").html(resultCZ.priceChangeRatio+"%");
			$("#cjl_cf").html(Math.round(resultCZ.tradingVolume/1000000));
			$("#cjl_cf").parent().attr("title","成交量(百万股)");
			$("#cje_cf").html((resultCZ.tradingAmount/1000000).toFixed(2));
			$("#cje_cf").parent().attr("title","成交额(百万元)");
			$("#zsHtml").html(zsHtml);
			$("#czHtml").html(czHtml);
			var eZS=jQuery.parseJSON(indexZS);
			showChartOne(eZS.tradingVolume,eZS.openPrice,eZS.data);
			var eCZ=jQuery.parseJSON(indexCZ);
			showChartTwo(eCZ.tradingVolume,eCZ.openPrice,eCZ.data);
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
	
}



/**
 * 三板指数 图表
 * @param tradingVolume 成交量数组
 * @param openPrice 指数数组
 * @param dateTemp 日期数组
 */
function showChartOne(tradingVolume,openPrice,dateTemp){
	//三板成分指数 图表
	var myChart6 = echarts.init(document.getElementById('three_zs'));
	option = {
	    tooltip: {
	        trigger: 'axis'
	    },
	   color:['#90b4e6','#5581bf'],
	    legend: {
	        data:['成交额(百万)','指数'],
	        bottom:10
	    },
	    xAxis: [
	        {
	            type: 'category',
	            data: dateTemp//['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value',
	            name: '成交额(百万)',
//	            min: 0,
//	            max: 250,
//	            interval: 50,

	            axisLabel: {
	                formatter: '{value}'
	            }
	        },
	        {
	            type: 'value',
	            name: '指数',
//	            min: 0,
//	            max: 25,
//	            interval: 5,
	            axisLabel: {
	                formatter: '{value}'
	            }
	        }
	    ],
	    grid: {
	        left: '1%',
	        right: '1%',
	        containLabel: true
	    },
	    series: [
	    		
	        {
	        	
	            name:'成交额(百万)',
	            type:'bar',
	            data:tradingVolume//[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
	        },
	       
	        {
	        	
	            name:'指数',
	            type:'line',
	            yAxisIndex: 1,
	            data:openPrice//[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
	        }
	    ]
	};
	myChart6.setOption(option);
	window.addEventListener("resize",function(){
                                      myChart6.resize();
                });	
}

function showChartTwo(tradingVolume,openPrice,dateTemp){
	//三板成分指数 图表
	var myChart5 = echarts.init(document.getElementById('three_cf'));
	option = {
	    tooltip: {
	        trigger: 'axis'
	    },
	   color:['#90b4e6','#5581bf'],
	    legend: {
	        data:['成交额(百万)','指数'],
	        bottom:10
	    },
	    xAxis: [
	        {
	            type: 'category',
	            data:dateTemp// ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value',
	            name: '成交额(百万)',
	            axisLabel: {
	                formatter: '{value}'
	            }
	        },
	        {
	            type: 'value',
	            name: '指数',
	            axisLabel: {
	                formatter: '{value}'
	            }
	        }
	    ],
	     grid: {
	        left: '1%',
	        right: '1%',
	        containLabel: true
	    },
	    series: [
	        {
	            name:'成交额(百万)',
	            type:'bar',
	            data:tradingVolume//[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
	        },
	       
	        {
	            name:'指数',
	            type:'line',
	            yAxisIndex: 1,
	            data:openPrice//[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
	        }
	    ]
	};
	myChart5.setOption(option);
window.addEventListener("resize",function(){
                                      myChart5.resize();
                });	
}

/**
 * 加载实时时间
 */
function tick() {
	var years,months,days,hours, minutes, seconds;
	var intYears,intMonths,intDays,intHours, intMinutes, intSeconds;
	var today;
	today = new Date(); //系统当前时间
	intYears = today.getFullYear(); //得到年份,getFullYear()比getYear()更普适
	intMonths = today.getMonth() + 1; //得到月份，要加1
	intDays = today.getDate(); //得到日期
	intHours = today.getHours(); //得到小时
	intMinutes = today.getMinutes(); //得到分钟
	intSeconds = today.getSeconds(); //得到秒钟
	years = intYears + "-";
	if(intMonths < 10 ){
		months = "0" + intMonths +"-";
	} else {
		months = intMonths +"-";
	}
	if(intDays < 10 ){
		days = "0" + intDays +" ";
	} else {
		days = intDays + " ";
	}
	if (intHours == 0) {
		hours = "00:";
	} else if (intHours < 10) {
		hours = "0" + intHours+":";
	} else {
		hours = intHours + ":";
	}
	if (intMinutes < 10) {
		minutes = "0"+intMinutes+":";
	} else {
		minutes = intMinutes+":";
	}
	if (intSeconds < 10) {
		seconds = "0"+intSeconds+" ";
	} else {
		seconds = intSeconds+" ";
	}
	timeString = years+months+days+hours+minutes+seconds;
	realTime.innerHTML = timeString;
	window.setTimeout("tick();", 1000);
}

$(document).ready(function(){
$(".zhishu_tab ul li").mouseover(function(){
	var nx =$(this).index();
	$(".zhishu_tab ul li").not(this).removeClass("on");
	$(this).addClass("on");
	$(".zhishu_info_dbox").find(".zhishu_list").eq(nx).show().siblings().hide();
});
});


/**
 * 查询用户应用栏目的集合
 */
function findCMList(){
	//模块类型（1.多维选股2.股票排行3.工具分析4.企业图谱5.舆情跟踪）
	$.axs("/stock/customModule/findCMList.do",{staffId:1},true,function(data){
		if(data.retCode=="0000"){
			result = data.retData;
			if(result==null){
				return false;
			}
			$.each(result,function(index,item){
				var type = item.moduletype;
				if(type==1){
					$(".app_list ul").prepend('<li data-value='+item.id+' class="applic_dwxg"><a href="/multidimensionalStock/multidStock.html" data-value="1"><span></span>多维选股</a></li>');
					$(".add_app_down ul li").eq(0).addClass("on");
				}else if(type==2){
					$(".app_list ul").prepend('<li data-value='+item.id+' class="applic_gpph"><a href="/stockRanking/stockRanking.html" data-value="2"><span></span>股票排行</a></li>');
					$(".add_app_down ul li").eq(1).addClass("on");
				}else if(type==3){
					$(".app_list ul").prepend('<li data-value='+item.id+' class="applic_gjfx"><a href="/toolAnalysis/toolMentor.html" data-value="3"><span></span>工具分析</a></li>');
					$(".add_app_down ul li").eq(2).addClass("on");
				}else if(type==4){
					$(".app_list ul").prepend('<li data-value='+item.id+' class="applic_qytp"><a href="/relationMap/businessMapIndex.html" data-value="4"><span></span>企业图谱</a></li>');
					$(".add_app_down ul li").eq(3).addClass("on");
				}else if(type==5){
					$(".app_list ul").prepend('<li data-value='+item.id+' class="applic_yqgz"><a href="/publicSentiment/overviewOfPublic.html" data-value="5"><span></span>舆情跟踪</a></li>');
					$(".add_app_down ul li").eq(4).addClass("on");
				}
			});
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}
	//添加一个栏目
	function addCustomModule(moduletype){
		//模块类型（1.多维选股2.股票排行3.工具分析4.企业图谱5.舆情跟踪）
		var modulename = "";
		if(moduletype==1){
			modulename= "多维选股";
		}else if(moduletype==2){
			modulename= "股票排行";
		}else if(moduletype==3){
			modulename= "工具分析";
		}else if(moduletype==4){
			modulename= "企业图谱";
		}else if(moduletype==5){
			modulename= "舆情跟踪";
		}else {
			modulename= "应用类型";
		}
		param = {moduletype:moduletype,modulename:modulename};
		var id = '';
		$.axs("/stock/customModule/addCustomModule.do",param,false,function(data){
			if(data.retCode=="0000"){
				var result = data.retData;
				if(result==null){
					return false;
				}
				id = result;
			}else{
				errorAlert(data.retCode,data.retMsg);
			}
		});
		return id;
	}
		
	//删除一个栏目
	function deleteOneCM(id){
		param = {id:id};
		$.axs("/stock/customModule/deleteOneCM.do",param,true,function(data){
			if(data.retCode=="0000"){
				result = data.retData;
				if(result==null){
					return false;
				}
				//删除成功
			}else{
				errorAlert(data.retCode,data.retMsg);
			}
		});
	}

	//查询首页挂牌企业 再审挂脾 做市转让数据...
	function findIndexListCount(){
		$.axs("/betaInvest/threeBoardIndex/findIndexListCount.do",null,false,function(data){
			var html='';
			if(data.retCode=="0000"){
				result = data.retData;
				if(result==null){
					return false;
				}
				var temp = jQuery.parseJSON(result);
				html+='<li class="da_gpqy">';
				html+='<a href="/index/listedCompanies.html">';
				html+='<span></span>';
				html+='<h2 class="show01">挂牌企业</h2>';
				html+='<p class="show01 timer" data-to="'+temp.totalList+'" data-speed="1500">'+temp.totalList+'</p>';
				html+='<h2 class="show02">新增挂牌</h2>';
				html+='<p class="show02">'+temp.newTotalList+'</p>';
				html+='<i class="show02_time">'+temp.dataTime+'</i>';
				html+='</a>';
				html+='</li>';
				html+='<li class="da_zsgp">';
				html+='<a href="/index/listedCompaniesToListed.html">';
				html+='<span></span>';
				html+='<h2 class="show01">在审挂牌公司</h2>';
				html+='<p class="show01 timer" data-to="'+temp.retrialListing+'" data-speed="1500">'+temp.retrialListing+'</p>';
				html+='<h2 class="show02">在审进展</h2>';
				html+='<p class="show02">'+temp.retrialProgress+'</p>';
				html+='<i class="show02_time">'+temp.dataTime+'</i>';
				html+='</a>';
				html+='</li>';
				html+='<li class="da_zszr">';
				html+='<a href="/index/marketMakingTransfer.html">';
				html+='<span></span>';
				html+='<h2 class="show01">做市转让</h2>';
				html+='<p class="show01 timer" data-to="'+temp.marketMakingTransfer+'" data-speed="1500">'+temp.marketMakingTransfer+'</p>';
				html+='<h2 class="show02">加入做市</h2>';
				html+='<p class="show02">'+temp.marketMaking+'</p>';
				html+='<i class="show02_time">'+temp.dataTime+'</i>';
				html+='</a>';
				html+='</li>';
				html+='<li class="da_xyzr">';
				html+='<a href="/index/agreementTransfer.html">';
				html+='<span></span>';
				html+='<h2 class="show01">协议转让</h2>';
				html+='<p class="show01 timer" data-to="'+temp.agreementTransfer+'" data-speed="1500">'+temp.agreementTransfer+'</p>';
				html+='<h2 class="show02">转让成交</h2>';
				html+='<p class="show02">'+temp.agreementDeal+'</p>';
				html+='<i class="show02_time">'+temp.dataTime+'</i>';
				html+='</a>';
				html+='</li>';
				html+='<li class="da_dzzgs">';
				html+='<a href="/index/privatePlacement.html">';
				html+='<span></span>';
				html+='<h2 class="show01">定增中公司</h2>';
				html+='<p class="show01 timer" data-to="'+temp.fixedCompany+'" data-speed="1500">'+temp.fixedCompany+'</p>';
				html+='<h2 class="show02">定增新进度</h2>';
				html+='<p class="show02">'+temp.fixedSchedule+'</p>';
				html+='<i class="show02_time">'+temp.dataTime+'</i>';
				html+='</a>';
				html+='</li>';
				/*html+='<li class="da_yjjk">';
				html+='<a href="#">';
				html+='<span></span>';
				html+='<h2 class="show01">预警监控</h2>';
				html+='<p class="show01 timer" data-to="2010" data-speed="1500">2010</p>';
				html+='</a>';
				html+='</li>';*/
				$("#indexListCount").html(html);
			    $('.timer').each(count); 
			}else{
				errorAlert(data.retCode,data.retMsg);
			}
		});
	}
	
	
	
	// 分页查询资讯
	function findByType(type,pageIndex,pageLimit){
		param = {type:type,pageIndex:pageIndex,pageLimit:pageLimit};
		$.axs("/stock/information/findByType.do",param,true,function(data){
			if(data.retCode=="0000"){
				var result=data.retData;
				if(result==null){
					return false;
				}
				var list = result.list;
				if(list!=null && list.length>0){
					var html = '';
					for(var i =0;i<list.length;i++){
						var temp=list[i];
						html+='<li><a href="'+temp.url+'" target="_blank">'+temp.theme+'</a><span>'+temp.createtimeH+'</span></li>';
					}
						$("#information").html(html);
				}else{
					$("#information").html(html);
				}
				
				
			}else{
				errorAlert(data.retCode,data.retMsg);
			}
		});
	}
	
/**
 * 查询企业报告
 */
function findReport(){
	$.axs("/stock/reports/list.do",{currpage:1,pagesize:4},true,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			if(result==null){
				return false;
			}
			var list = result.list;
			if(list!=null && list.length>0){
				var html = '';
				for(var i =0;i<list.length;i++){
					var temp=list[i];
					if(i==1){
						html+='<div class="fxzb_list fl" id=report'+i+'>';
						html+='<a href="/report/report_'+temp.xxzqdm+'.html" target="_blank" class="slt_zb"><img src="/saasBeta/images/index_01.jpg"/></a>';
						html+='<div class="fxzb_r fl">';
						html+='<h2><a href="/report/report_'+temp.xxzqdm+'.html" target="_blank">'+temp.title+'</a></h2>';
						html+='<div class="fx_zz">';
						html+='<div class="zz_info">';
						html+='<span></span>';
						html+='<i>'+temp.create_time+'</i>';
						html+='</div>';
						html+='<div class="clr"></div>';
						html+='</div>';
						html+='<div class="clr"></div>';
						html+='</div>';
						html+='<div class="clr"></div>';
						html+='</div>';
						html+='<div class="clr"></div>';
						html+='<div class="lines"></div>';
					}else if(i==3){
						html+='<div class="fxzb_list fl" id=report'+i+'>';
						html+='<a href="/report/report_'+temp.xxzqdm+'.html" target="_blank" class="slt_zb"><img src="/saasBeta/images/index_01.jpg"/></a>';
						html+='<div class="fxzb_r fl">';
						html+='<h2><a href="/report/report_'+temp.xxzqdm+'.html" target="_blank">'+temp.title+'</a></h2>';
						html+='<div class="fx_zz">';
						html+='<div class="zz_info">';
						html+='<span></span>';
						html+='<i>'+temp.create_time+'</i>';
						html+='</div>';
						html+='<div class="clr"></div>';
						html+='</div>';
						html+='<div class="clr"></div>';
						html+='</div>';
						html+='<div class="clr"></div>';
						html+='</div>';
						html+='<div class="clr"></div>';
					}else{
						html+='<div class="fxzb_list fl" id=report'+i+'>';
						html+='<a href="/report/report_'+temp.xxzqdm+'.html" target="_blank" class="slt_zb"><img src="/saasBeta/images/index_01.jpg"/></a>';
						html+='<div class="fxzb_r fl">';
						html+='<h2><a href="/report/report_'+temp.xxzqdm+'.html" target="_blank">'+temp.title+'</a></h2>';
						html+='<div class="fx_zz">';
						html+='<div class="zz_info">';
						html+='<span></span>';
						html+='<i>'+temp.create_time+'</i>';
						html+='</div>';
						html+='<div class="clr"></div>';
						html+='</div>';
						html+='<div class="clr"></div>';
						html+='</div>';
						html+='<div class="clr"></div>';
						html+='</div>';
					}
				}
				$("#report").html(html);
				var img_Height=	$(".slt_zb img").height();
				$(".fxzb_r").css("height",img_Height);
			}else{
				$("#report").html("");
				var img_Height=	$(".slt_zb img").height();
				$(".fxzb_r").css("height",img_Height);
			}
			
			
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}
	

