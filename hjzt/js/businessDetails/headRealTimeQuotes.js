//模拟用户ID入缓存
var userId = localStorage.getItem("userId");
var contrasts = localStorage.getItem(userId);
var zxli = "<li data-value=''><a href='javascript:;'>默认</a></li>";
var stockCodeHeard = getUrlParam("stockCode");
/**
 * 加载公司的实时头信息
 */
$(function(){
	
	/**
	 * 更新头部信息并获取信息
	 */
	updateMsgByCode(stockCodeHeard);
	
	/**
	 * 加载实时时间
	 */
	tick();
	
	/**
	 * 显示用户添加的对比公司
	 */
	showContrast();

	/**
	 * 添加用户的股票详情查询记录
	 */
	addQueryStockRecord();
	
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
		
	})
	//判断是否加入自选股
	var isHave = isTrue(stockCodeHeard);
	if(isHave){
		$("#zxgId").html("<img src='/saasBeta/images/icon/sc_zx.png'/>删除自选");
	}else{
		$("#zxgId").html("<img src='/saasBeta/images/icon/jr_zx.png'/>加入自选");
	}
	//添加或者删除自选股
	$("#zxgId").on("click",function(){
		var zxgType = $("#zxgId").text();
		if(zxgType=="加入自选"){
			var optionalId = addOptional(stockCodeHeard,2);
			if(optionalId!=null&&optionalId!=""&&optionalId!=undefined){
				$("#zxgId").html("<img src='/images/icon/sc_zx.png'/>删除自选");
			}else{
				$.zmAlert("添加自选股失败");
			}
		}else{
		    var resultData = deleteOptionalByStocke($("#zxgId").attr("data-trading"));
			if(resultData=="0000"){
				$("#zxgId").html("<img src='/images/icon/jr_zx.png'/>加入自选");
			}else{
				$.zmAlert("删除自选股失败");
			}
		}
	})
})


/**
 * 更改本企业的头部行情信息
 * @param stockCode
 */
function updateMsgByCode(stockCode){
	$.axs("/betaStock/common/findDetailHeder.do",{stockCode:stockCode}, false, function(data){
		if(data.retCode == 0000){
			var contrast = "";
			if(data.retData != null){
				var obj=jQuery.parseJSON(data.retData);
				$("#stockName").text(obj.stockName); //股票名称
				$("#stockCode").text(obj.stockCode); //股票代码
				var jrzxA = $("<a href='javascript:;' data-trading="+obj.stockCode+" data-zxid="+obj.positionId+" id='zxgId'></a>");
				/*var zxDiv = "<div class='add_zxg'><div class='add_zxg_title'><span>加入自选股</span><i onclick='closeZxDiv(this)' >X</i></div><div class='add_select'><div class='selectBox'><p>请选择</p><ul>"+zxli+"</ul></div><div class='add_se_btn'><a href='javascript:;' onclick='saveZx(this)'>确定</a></div></div></div>";
				if(obj.position == "1"){
					jrzxA.html("<img src='/images/jiahao.png'/>删除自选");
				}
				jrzxA.on("click",function(){
					if($(this).text() == "加入自选"){
						$(this).next().next().show();
					}else{
						removeZx(this);
					}
				})*/
				var duibi = $("<button id='duibi' class='ne_duibi' onclick='contrast(this)' data-name="+obj.stockName.replace(/\s+/g,"")+" data-code="+obj.stockCode+" >加入对比</button>");
				if(contrasts != null){
					contrast = contrasts.split(",");
					$(contrast).each(function(){
						var val = this.split("-");
						if(val[0] == obj.stockCode){
							duibi.removeClass().addClass("nesc_duibi");
							duibi.html("删除对比");
						}
					})
				}
				$("#operation_div").append(jrzxA);
				$("#operation_div").append(duibi);
				//$("#operation_div").append(zxDiv);
				if(obj.flag == 1){
					if(obj.newPrice<obj.openPrice){//如果跌了显示绿色
						$(".top_box").attr("class","top_box down");
						$(".new_price").attr("class","new_price green");
						$("#openPrice").attr("class","green");
					}
					$("#newPrice").text(obj.newPrice.toFixed(2)); //最新价
					$("#changeAmount").text(obj.changeAmount.toFixed(2)); //涨跌额
					$("#priceChangeRatio").text(obj.priceChangeRatio.toFixed(2) + "%"); //涨跌幅
					$("#limitUp").text(obj.limitUp); //涨停
					$("#limitDown").text(obj.limitDown); //跌停
					$("#openPrice").text(obj.openPrice.toFixed(2)); //今开
					$("#yclosePrice").text(obj.yclosePrice.toFixed(2)); //昨收
					$("#totalMarketValue").text((obj.totalMarketValue/100000000).toFixed(2) + "亿"); //总市值
					$("#turnover").text(obj.turnover.toFixed(2) + "%"); //换手
					$("#highPrice").text(obj.highPrice.toFixed(2)); //最高
					$("#tradingVolume").text(obj.tradingVolume.toFixed(2)); //成交量
					$("#cmValue").text((obj.cmValue/100000000).toFixed(2) + "亿"); //流通市值
					$("#netRatio").text(obj.netRatio.toFixed(2)); //市净率
					$("#lowPrice").text(obj.lowPrice.toFixed(2)); //最低
					$("#tradingAmount").text(obj.tradingAmount.toFixed(2)); //成交额
					$("#amplitude").text(obj.amplitude.toFixed(2) + "%"); //振幅
					$("#priceEarningRatio").text(obj.priceEarningRatio.toFixed(2)); //市盈率
				}
			}else{
				errorAlert(0, "获取到的头信息数据为空");
			}
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
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

/**
 * 显示对比公司
 */
function showContrast(){
	$(".duibiCompany").remove();
	if(contrasts != null){
		var contrast = contrasts.split(",");
		$(contrast).each(function(){
			var val = this.split("-");
			if(val[0] != ""){
				$("#contrastList_a").before("<span data-code="+val[0]+" data-name="+val[1]+" class='duibiCompany' >"+val[1]+"  ("+val[0]+") <i data-value="+val[0]+" onclick='removeIcon(this)'>X</i></span>");
			}
		})
	}
}

/**
 * 添加,删除对比公司
 * @param data
 */
function contrast(data){
	var wi = $('.boar_r').width();
	var wi2 = $('.m_10_box').width();
	$(".contrast").css("width", wi);
	$(".contrast").css("width", wi2);
	$(".contrast_right").show();
	$(".contrast_right").removeClass("bounceOutLeft");
	$(".contrast_right").addClass("bounceInLeft");
	$(".contrast_right span").show();
	$(".contra_yc").show();
	var contrast = "";
	if($(data).text() == "加入对比"){
		var flag = true;
		if(contrasts == null){
			contrasts = ",";
			contrasts += $(data).attr("data-code") + "-" + $(data).attr("data-name") + ",";
			$("#duibi").removeClass().addClass("nesc_duibi");
			$(data).text("删除对比");
		}else{
			contrast = contrasts.split(",");
			if(contrast.length < 7){
				$(contrast).each(function(){
					var val = this.split("-");
					if(val[0] == $(data).attr("data-code")){
						flag = false;
					}
				})
				if(flag){
					contrasts += $(data).attr("data-code") + "-" + $(data).attr("data-name") + ",";
					$("#duibi").removeClass().addClass("nesc_duibi");
					$(data).text("删除对比");
				}
			}else{
				$.zmAlert("对比企业只能添加五个");
			}
		}
	}else if($(data).text() == "删除对比"){
		contrast = contrasts.split(",");
		$(contrast).each(function(){
			var val = this.split("-");
			if(val[0] == $(data).attr("data-code")){
				$("#duibi").removeClass().addClass("ne_duibi");
				$(data).text("加入对比");
				contrasts = contrasts.replace(","+this,"");
			}
		})
	}
	showContrast();
	localStorage.setItem(userId,contrasts);
}

/**
 * 删除对比公司
 * @param data
 */
function removeIcon(data){
	var contrast = contrasts.split(",");
	$(contrast).each(function(){
		var val = this.split("-");
		if(val[0] == $(data).attr("data-value")){
			contrasts = contrasts.replace(","+this,"");
		}
	})
	$("#duibi").text("对比");
	localStorage.setItem(userId,contrasts);
	$(data).parent().remove();
}


/**
 * 添加自选股
 */
function saveZx(data){
	var id = $(data).parent().prev().children().first().attr("data-value");
	if(id != undefined){
		var tradingId = $(data).parent().parent().parent().prev().attr("data-code");
		$.axs("/position/addEnterprise.do",{"id":id,"tradingId":tradingId}, false, function(msg){
			if(msg.retCode == 0000){
				$(data).parent().parent().parent().prev().prev().attr("data-zxid",id);
				$(data).parent().parent().parent().prev().prev().html("<img src='images/jiahao.png'/>删除自选");
				$(data).parent().parent().parent().hide();
			}
	    });
	}else{
		$.zmAlert("请先选择自选股种类");
	}
}

/**
 * 关闭自选股框
 */
function closeZxDiv(data){
	$(data).parent().parent().hide(); 
}

/**
 * 信息搜索补全
 * @param request
 * @param response
 */
function autocomplete(request, response) {
	$.axs("/enterpriseData/findCodeName.do", { codeName: request.term, pageNum: 1, pageSize: 5}, false, function(data){
		if(data.retCode == 0000) {
			if(data.retData == null) {
				return false;
			}
			var arr = [];
			$.each(data.retData, function(i, item) {
				var obj = {
					label: item.companyForShort + "（" + item.stockCode + "）",
					value: item.companyForShort + "（" + item.stockCode + "）",
					name: item.companyForShort,
					code: item.stockCode
				}
				arr.push(obj);
			});
			searchList = arr;
			response(arr);
		} else {
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

/**
 * 添加用户股票详情的访问记录
 */
function addQueryStockRecord(){
	$.axs("/betaStock/queryStockRecord/addQueryStockRecord.do", {
		title : getUrlParam("stockName"),
		loadUrl : "/businessDetails/newTBindex.html?stockName="+getUrlParam("stockName")+"&stockCode="+getUrlParam("stockCode")
	}, true, function(msg) {
		if (msg.retCode != 0000) {
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

