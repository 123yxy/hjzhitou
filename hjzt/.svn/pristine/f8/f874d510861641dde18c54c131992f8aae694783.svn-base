$(function(){
	//获取全部区域
	findFirstLevelArea();
	//定增统计
	findPrivatePlacementStatistics();
	//初始化数据
	showBack();
	//检索条件查询
	//findSearchList(3);
	//
	$(".qy_box ul li a").on("click",function(){
		changeParam();
	});
	
	$(".selectBox ul li").on("click",function(){
		var p = $(this).parent().parent().find("p");
		$(".selectBox ul").hide();
		$(".searching").hide();
		$(".jiabeijing").hide();
		p.text(($(this).find("a").text()).indexOf("...") > -1 ? $(this).find("a").attr("title") : $(this).find("a").text());
		p.attr("data-value", $(this).attr("data-value"));
		p.attr("value", $(this).attr("value"));
		
		
		var p = $(this).parent().parent().find("p");
		p.text($(this).find("a").text());
		p.attr("value", $(this).attr("value"));
		changeParam();
	});
	//所属版块 交易方式 定增进度 定增对象
	$(".fenlei a").on("click",function(){
		$(this).parent(".fenlei").find("a").removeClass("on");
		$(this).addClass("on");
		if($("#qd_in").hasClass("on")){
			$(".dingz_qd").show();
			return false;
		}else{
			$(".dingz_qd").hide();
		}
		changeParam();
	});
	
	//清空筛选条件
	$("#clear_tj").on("click",function(){
		clearParam();
	});
	//查询按钮
	$("#search_newCx").on("click",function(){
		changeParam();
	});
	//点击假背景收回区域的框
	$(".jiabeijing").on("click",function(){
		$(".selectBox ul").hide();
		$(".searching").hide();
		$(".jiabeijing").hide();
//		$(".shaix_select ul").slideUp();
	})
});

//定增统计
function findPrivatePlacementStatistics(){
	$.axs("/betaInvest/private/findPrivatePlacementStatistics.do",null,false,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			var jsonObj=jQuery.parseJSON(result);
			if(result!=null){
				$("#showDateTime1").html(jsonObj.statistics_Time);
				$("#statistics_1").html(jsonObj.statistics_1);
				$("#statistics_2").html(jsonObj.statistics_2);
				$("#statistics_3").html(jsonObj.statistics_3);
				$("#showDateTime2").html(jsonObj.statistics_Time);
				$("#statistics_4").html(jsonObj.statistics_4);
			}
		}else{
			errorAlert(data.retCode,data.retMsg)
		}
	});
}

/**
 * 搜索条件改变、点击筛选按钮
 */
function changeParam(){
	$("#saveParamTitle").hide();
	//行业-二级行业
	var industry=$("#hy").text();
	if(industry=="请选择企业所在行业"){
		industry="";
		$("#industryJSTJ").remove();
	}
	if(industry!=null && industry!="" && industry!="undefined"){
		
		if($("#industryJSTJ")[0]){
			$("#industryJSTJ").html(industry+"<i></i>");
		}else{
			var jstjStr='<a href="javascript:void(0);" id="industryJSTJ">'+industry+'<i></i></a>';
			$("#clear_tj").after(jstjStr);
		}
	}
	//区域
	var area=$("#city").text();
	if(area=="请选择"){
		area="";
		$("#areaJSTJ").remove();
	}
	if(area!=null && area!="" && area!="undefined"){
		if($("#areaJSTJ")[0]){ 
			$("#areaJSTJ").html(area+"<i></i>");
		}else{
			var jstjStr='<a href="javascript:void(0);" id="areaJSTJ">'+area+'<i></i></a>';
			$("#clear_tj").after(jstjStr);
		}
	}
	//所属板块
	var panelname=$("#panelnameDiv").find("a.on").text();
	if(panelname=="全部"){
		panelname="";
		$("#panelnameJSTJ").remove();
	}
	if(panelname!=null && panelname!="" && panelname!="undefined"){
		if($("#panelnameJSTJ")[0]){ 
			$("#panelnameJSTJ").html(panelname+"<i></i>");
		}else{
			var jstjStr='<a href="javascript:void(0);" id="panelnameJSTJ">'+panelname+'<i></i></a>';
			$("#clear_tj").after(jstjStr);
		}
	}
	//交易方式
	var tradingType=$("#tradingTypeDiv").find("a.on").text();
	if(tradingType=="全部"){
		tradingType="";
		$("#tradingTypeJSTJ").remove();
	}
	if(tradingType!=null && tradingType!="" && tradingType!="undefined"){
		if($("#tradingTypeJSTJ")[0]){ 
			$("#tradingTypeJSTJ").html(tradingType+"<i></i>");
		}else{
			var jstjStr='<a href="javascript:void(0);" id="tradingTypeJSTJ">'+tradingType+'<i></i></a>';
			$("#clear_tj").after(jstjStr);
		}
	}
	//最小定增价格
	var minPrivatePrice=$("#minPrivatePriceInput").val();
	//最大定增价格
	var maxPrivatePrice=$("#maxPrivatePriceInput").val();
	if((minPrivatePrice==null || minPrivatePrice=="" || minPrivatePrice=="undefined") && (maxPrivatePrice==null || maxPrivatePrice=="" || maxPrivatePrice=="undefined")){
		minPrivatePrice=$("#minPrivatePriceInput").attr("data-value");
		maxPrivatePrice=$("#maxPrivatePriceInput").attr("data-value");
	}
	if(minPrivatePrice!=null && minPrivatePrice!="" && minPrivatePrice!="undefined" && maxPrivatePrice!=null && maxPrivatePrice!="" && maxPrivatePrice!="undefined"){
		//判断第二个值大于第一个值
		if(Number(maxPrivatePrice)<Number(minPrivatePrice)){
//			$.zmAlert("请输入正确的定增价格");
//			return false;
			var tmp=minPrivatePrice;
			minPrivatePrice=maxPrivatePrice;
			maxPrivatePrice=tmp;
		}
		if($("#privatePriceJSTJ")[0]){ 
			$("#privatePriceJSTJ").html("定增价格:"+minPrivatePrice+"~"+maxPrivatePrice+"<i></i>");
		}else{
			var jstjStr='<a href="javascript:void(0);" id="privatePriceJSTJ">定增价格：'+minPrivatePrice+"~"+maxPrivatePrice+'<i></i></a>';
			$("#clear_tj").after(jstjStr);
		}
	}else if(minPrivatePrice!=null && minPrivatePrice!="" && minPrivatePrice!="undefined"){
		if($("#privatePriceJSTJ")[0]){ 
			$("#privatePriceJSTJ").html("定增价格:>"+minPrivatePrice+"<i></i>");
		}else{
			var jstjStr='<a href="javascript:void(0);" id="privatePriceJSTJ">定增价格:>'+minPrivatePrice+'<i></i></a>';
			$("#clear_tj").after(jstjStr);
		}
	}else if(maxPrivatePrice!=null && maxPrivatePrice!="" && maxPrivatePrice!="undefined"){
		if($("#privatePriceJSTJ")[0]){ 
			$("#privatePriceJSTJ").html("定增价格:<"+maxPrivatePrice+"<i></i>");
		}else{
			var jstjStr='<a href="javascript:void(0);" id="privatePriceJSTJ">定增价格:<'+maxPrivatePrice+'<i></i></a>';
			$("#clear_tj").after(jstjStr);
		}
	}
	$("#minPrivatePriceInput").attr("data-value",minPrivatePrice);
	$("#maxPrivatePriceInput").attr("data-value",maxPrivatePrice);
	$("#minPrivatePriceInput").val("");
	$("#maxPrivatePriceInput").val("");
	//最小折溢价率
	var minPremiumRate=$("#minPremiumRateInput").val();
	//最大折溢价率
	var maxPremiumRate=$("#maxPremiumRateInput").val();
	if((minPremiumRate==null || minPremiumRate=="" || minPremiumRate=="undefined") && (maxPremiumRate==null || maxPremiumRate=="" || maxPremiumRate=="undefined")){
		minPremiumRate=$("#minPremiumRateInput").attr("data-value");
		maxPremiumRate=$("#maxPremiumRateInput").attr("data-value");
	}
	if(minPremiumRate!=null && minPremiumRate!="" && minPremiumRate!="undefined" && maxPremiumRate!=null && maxPremiumRate!="" && maxPremiumRate!="undefined"){
		//判断第二个值大于第一个值
		if(Number(maxPremiumRate)<Number(minPremiumRate)){
//			$.zmAlert("请输入正确的折溢价率");
//			return false;
			var tmp=minPremiumRate;
			minPremiumRate=maxPremiumRate;
			maxPremiumRate=tmp;
		}
		if($("#premiumRateJSTJ")[0]){ 
			$("#premiumRateJSTJ").html("折溢价率:"+minPremiumRate+"~"+maxPremiumRate+"<i></i>");
		}else{
			var jstjStr='<a href="javascript:void(0);" id="premiumRateJSTJ">折溢价率：'+minPremiumRate+"~"+maxPremiumRate+'<i></i></a>';
			$("#clear_tj").after(jstjStr);
		}
	}else if(minPremiumRate!=null && minPremiumRate!="" && minPremiumRate!="undefined"){
		if($("#premiumRateJSTJ")[0]){ 
			$("#premiumRateJSTJ").html("折溢价率:>"+minPremiumRate+"<i></i>");
		}else{
			var jstjStr='<a href="javascript:void(0);" id="premiumRateJSTJ">折溢价率:>'+minPremiumRate+'<i></i></a>';
			$("#clear_tj").after(jstjStr);
		}
	}else if(maxPremiumRate!=null && maxPremiumRate!="" && maxPremiumRate!="undefined"){
		if($("#premiumRateJSTJ")[0]){ 
			$("#premiumRateJSTJ").html("折溢价率:<"+maxPremiumRate+"<i></i>");
		}else{
			var jstjStr='<a href="javascript:void(0);" id="premiumRateJSTJ">折溢价率:<'+maxPremiumRate+'<i></i></a>';
			$("#clear_tj").after(jstjStr);
		}
	}
	$("#minPremiumRateInput").attr("data-value",minPremiumRate);
	$("#maxPremiumRateInput").attr("data-value",maxPremiumRate);
	$("#minPremiumRateInput").val("");
	$("#maxPremiumRateInput").val("");
	//最小定增股数
	var minPrivateNum=$("#minPrivateNumInput").val();
	//最大定增股数
	var maxPrivateNum=$("#maxPrivateNumInput").val();
	if((minPrivateNum==null || minPrivateNum=="" || minPrivateNum=="undefined") && (maxPrivateNum==null || maxPrivateNum=="" || maxPrivateNum=="undefined")){
		minPrivateNum=$("#minPrivateNumInput").attr("data-value");
		maxPrivateNum=$("#maxPrivateNumInput").attr("data-value");
	}
	if(minPrivateNum!=null && minPrivateNum!="" && minPrivateNum!="undefined" && maxPrivateNum!=null && maxPrivateNum!="" && maxPrivateNum!="undefined"){
		//判断第二个值大于第一个值
		if(Number(maxPrivateNum)<Number(minPrivateNum)){
//			$.zmAlert("请输入正确的定增股数");
//			return false;
			var tmp=minPrivateNum;
			minPrivateNum=maxPrivateNum;
			maxPrivateNum=tmp;
		}
		if($("#privateNumJSTJ")[0]){ 
			$("#privateNumJSTJ").html("定增股数:"+minPrivateNum+"~"+maxPrivateNum+"<i></i>");
		}else{
			var jstjStr='<a href="javascript:void(0);" id="privateNumJSTJ">定增股数：'+minPrivateNum+"~"+maxPrivateNum+'<i></i></a>';
			$("#clear_tj").after(jstjStr);
		}
	}else if(minPrivateNum!=null && minPrivateNum!="" && minPrivateNum!="undefined"){
		if($("#privateNumJSTJ")[0]){ 
			$("#privateNumJSTJ").html("定增股数:>"+minPrivateNum+"<i></i>");
		}else{
			var jstjStr='<a href="javascript:void(0);" id="privateNumJSTJ">定增股数:>'+minPrivateNum+'<i></i></a>';
			$("#clear_tj").after(jstjStr);
		}
	}else if(maxPrivateNum!=null && maxPrivateNum!="" && maxPrivateNum!="undefined"){
		if($("#privateNumJSTJ")[0]){ 
			$("#privateNumJSTJ").html("定增股数:<"+maxPrivateNum+"<i></i>");
		}else{
			var jstjStr='<a href="javascript:void(0);" id="privateNumJSTJ">定增股数:<'+maxPrivateNum+'<i></i></a>';
			$("#clear_tj").after(jstjStr);
		}
	}
	$("#minPrivateNumInput").attr("data-value",minPrivateNum);
	$("#maxPrivateNumInput").attr("data-value",maxPrivateNum);
	$("#minPrivateNumInput").val("");
	$("#maxPrivateNumInput").val("");
	//最小募集资金
	var minRaisePrice=$("#minRaisePriceInput").val();
	//最大募集资金
	var maxRaisePrice=$("#maxRaisePriceInput").val();
	if((minRaisePrice==null || minRaisePrice=="" || minRaisePrice=="undefined") && (maxRaisePrice==null || maxRaisePrice=="" || maxRaisePrice=="undefined")){
		minRaisePrice=$("#minRaisePriceInput").attr("data-value");
		maxRaisePrice=$("#maxRaisePriceInput").attr("data-value");
	}
	if(minRaisePrice!=null && minRaisePrice!="" && minRaisePrice!="undefined" && maxRaisePrice!=null && maxRaisePrice!="" && maxRaisePrice!="undefined"){
		//判断第二个值大于第一个值
		if(Number(maxRaisePrice)<Number(minRaisePrice)){
//			$.zmAlert("请输入正确的募集资金");
//			return false;
			var tmp=minRaisePrice;
			minRaisePrice=maxRaisePrice;
			maxRaisePrice=tmp;
		}
		if($("#raisePriceJSTJ")[0]){ 
			$("#raisePriceJSTJ").html("募集资金:"+minRaisePrice+"~"+maxRaisePrice+"<i></i>");
		}else{
			var jstjStr='<a href="javascript:void(0);" id="raisePriceJSTJ">募集资金：'+minRaisePrice+"~"+maxRaisePrice+'<i></i></a>';
			$("#clear_tj").after(jstjStr);
		}
	}else if(minRaisePrice!=null && minRaisePrice!="" && minRaisePrice!="undefined"){
		if($("#raisePriceJSTJ")[0]){ 
			$("#raisePriceJSTJ").html("募集资金:>"+minRaisePrice+"<i></i>");
		}else{
			var jstjStr='<a href="javascript:void(0);" id="raisePriceJSTJ">募集资金:>'+minRaisePrice+'<i></i></a>';
			$("#clear_tj").after(jstjStr);
		}
	}else if(maxRaisePrice!=null && maxRaisePrice!="" && maxRaisePrice!="undefined"){
		if($("#raisePriceJSTJ")[0]){ 
			$("#raisePriceJSTJ").html("募集资金:<"+maxRaisePrice+"<i></i>");
		}else{
			var jstjStr='<a href="javascript:void(0);" id="raisePriceJSTJ">募集资金:<'+maxRaisePrice+'<i></i></a>';
			$("#clear_tj").after(jstjStr);
		}
	}
	$("#minRaisePriceInput").attr("data-value",minRaisePrice);
	$("#maxRaisePriceInput").attr("data-value",maxRaisePrice);
	$("#minRaisePriceInput").val("");
	$("#maxRaisePriceInput").val("");
	//最小公告日期
	var minPlacementDateStr=$("#minPlacementDateStrInput").val();
	//最大公告日期
	var maxPlacementDateStr=$("#maxPlacementDateStrInput").val();
	if((minPlacementDateStr==null || minPlacementDateStr=="" || minPlacementDateStr=="undefined") && (maxPlacementDateStr==null || maxPlacementDateStr=="" || maxPlacementDateStr=="undefined")){
		minPlacementDateStr=$("#minPlacementDateStrInput").attr("data-value");
		maxPlacementDateStr=$("#maxPlacementDateStrInput").attr("data-value");
	}
	if(minPlacementDateStr!=null && minPlacementDateStr!="" && minPlacementDateStr!="undefined" && maxPlacementDateStr!=null && maxPlacementDateStr!="" && maxPlacementDateStr!="undefined"){
		//判断第二个值大于第一个值
		if(new Date(maxPlacementDateStr).getTime()<new Date(minPlacementDateStr).getTime()){
			var tmp=minPlacementDateStr;
			minPlacementDateStr=maxPlacementDateStr;
			maxPlacementDateStr=minPlacementDateStr;
		}
		if($("#placementDateJSTJ")[0]){ 
			$("#placementDateJSTJ").html("公告日期:"+minPlacementDateStr+"~"+maxPlacementDateStr+"<i></i>");
		}else{
			var jstjStr='<a href="javascript:void(0);" id="placementDateJSTJ">公告日期：'+minPlacementDateStr+"~"+maxPlacementDateStr+'<i></i></a>';
			$("#clear_tj").after(jstjStr);
		}
	}else if(minPlacementDateStr!=null && minPlacementDateStr!="" && minPlacementDateStr!="undefined"){
		if($("#placementDateJSTJ")[0]){ 
			$("#placementDateJSTJ").html("公告日期:>"+minPlacementDateStr+"<i></i>");
		}else{
			var jstjStr='<a href="javascript:void(0);" id="placementDateJSTJ">公告日期:>'+minPlacementDateStr+'<i></i></a>';
			$("#clear_tj").after(jstjStr);
		}
	}else if(maxPlacementDateStr!=null && maxPlacementDateStr!="" && maxPlacementDateStr!="undefined"){
		if($("#placementDateJSTJ")[0]){ 
			$("#placementDateJSTJ").html("公告日期:<"+maxPlacementDateStr+"<i></i>");
		}else{
			var jstjStr='<a href="javascript:void(0);" id="placementDateJSTJ">公告日期:<'+maxPlacementDateStr+'<i></i></a>';
			$("#clear_tj").after(jstjStr);
		}
	}
	$("#minPlacementDateStrInput").attr("data-value",minPlacementDateStr);
	$("#maxPlacementDateStrInput").attr("data-value",maxPlacementDateStr);
	$("#minPlacementDateStrInput").attr("value","");
	$("#maxPlacementDateStrInput").attr("value","");
	//定增对象 确定大于0  不确定为0
	var minPurchaserNum=$("#minPurchaserNumInput").val();
	var maxPurchaserNum=$("#maxPurchaserNumInput").val();
	if((minPurchaserNum==null || minPurchaserNum=="" || minPurchaserNum=="undefined") && (maxPurchaserNum==null || maxPurchaserNum=="" || maxPurchaserNum=="undefined")){
		minPurchaserNum=$("#minPurchaserNumInput").attr("data-value");
		maxPurchaserNum=$("#maxPurchaserNumInput").attr("data-value");
	}
	if($("#wqd").hasClass("on")){
		minPurchaserNum=0;
		maxPurchaserNum=0;
		if($("#purchaserNumJSTJ")[0]){ 
			$("#purchaserNumJSTJ").html("定增对象:未确定<i></i>");
		}else{
			var jstjStr='<a href="javascript:void(0);" id="purchaserNumJSTJ">定增对象:未确定<i></i></a>';
			$("#clear_tj").after(jstjStr);
		}
	}else if($("#wqd").prev().hasClass("on")){
		minPurchaserNum=null;
		maxPurchaserNum=null;
		$("#purchaserNumJSTJ").remove();
	}else{
		if(minPurchaserNum!=null && minPurchaserNum!="" && minPurchaserNum!="undefined" && maxPurchaserNum!=null && maxPurchaserNum!="" && maxPurchaserNum!="undefined"){
			if(Number(maxPurchaserNum)<Number(minPurchaserNum)){
//				$.zmAlert("请输入正确的定增对象");
//				return false;
				var tmp=minPurchaserNum;
				minPurchaserNum=maxPurchaserNum;
				maxPurchaserNum=tmp;
			}
			if($("#purchaserNumJSTJ")[0]){ 
				$("#purchaserNumJSTJ").html("定增对象:"+minPurchaserNum+"~"+maxPurchaserNum+"<i></i>");
			}else{
				var jstjStr='<a href="javascript:void(0);" id="purchaserNumJSTJ">定增对象:'+minPurchaserNum+"~"+maxPurchaserNum+'<i></i></a>';
				$("#clear_tj").after(jstjStr);
			}
		}else if((minPurchaserNum!=null && minPurchaserNum!="" && minPurchaserNum!="undefined") || (minPurchaserNum!="" && minPurchaserNum==0)){
			if($("#purchaserNumJSTJ")[0]){ 
				$("#purchaserNumJSTJ").html("定增对象:>"+minPurchaserNum+"<i></i>");
			}else{
				var jstjStr='<a href="javascript:void(0);" id="purchaserNumJSTJ">定增对象:>'+minPurchaserNum+'<i></i></a>';
				$("#clear_tj").after(jstjStr);
			}
		}else if((maxPurchaserNum!=null && maxPurchaserNum!="" && maxPurchaserNum!="undefined") || (maxPurchaserNum!="" && maxPurchaserNum==0)){
			if($("#purchaserNumJSTJ")[0]){ 
				$("#purchaserNumJSTJ").html("定增对象:<"+maxPurchaserNum+"<i></i>");
			}else{
				var jstjStr='<a href="javascript:void(0);" id="purchaserNumJSTJ">定增对象:<'+maxPurchaserNum+'<i></i></a>';
				$("#clear_tj").after(jstjStr);
			}
		}
	}
	$("#minPurchaserNumInput").attr("data-value",minPurchaserNum);
	$("#maxPurchaserNumInput").attr("data-value",maxPurchaserNum);
	$("#minPurchaserNumInput").val("");
	$("#maxPurchaserNumInput").val("");
	
	//定增进度
	var scheduleValue=$("#scheduleDiv").find("a.on").text();
	if(scheduleValue=="全部"){
		scheduleValue="";
		$("#scheduleJSTJ").remove();
	}
	var schedule=null;
	if(scheduleValue!=null && scheduleValue!="" && scheduleValue!="undefined"){
		if(scheduleValue=="董事会通过"){
			schedule=1;
		}else if(scheduleValue=="股东大会通过"){
			schedule=2;
		}else if(scheduleValue=="证监会通过"){
			schedule=5;
		}else if(scheduleValue=="停止实施"){
			schedule=3;
		}else if(scheduleValue=="已完成"){
			schedule=8;
		}
		if($("#scheduleJSTJ")[0]){ 
			$("#scheduleJSTJ").html(scheduleValue+"<i></i>");
		}else{
			var jstjStr='<a href="javascript:void(0);" id="scheduleJSTJ">'+scheduleValue+'<i></i></a>';
			$("#clear_tj").after(jstjStr);
		}
	}
	// 页数
	var pageNum=1;
	//每页条数
	var pageSize=$("#privatePlacementInfo").attr("data-pageSize");
	if(pageSize==null || pageSize=="" || pageSize=="undefined"){
		pageSize=10;
	}
	//查询数据
	
	
	findPrivatePlacement(industry,area,panelname,
			 tradingType, schedule,
			 minPrivatePrice, maxPrivatePrice,
			 minPremiumRate, maxPremiumRate,
			 minPrivateNum, maxPrivateNum,
			 minRaisePrice, maxRaisePrice,
			 minPlacementDateStr, maxPlacementDateStr,
			 minPurchaserNum, maxPurchaserNum,
			 pageNum, pageSize);
	//添加检索条件删除绑定事件
	$("#jstj a i").on("click",function(){
		$(this).parent().remove();
		var id=$(this).parent().attr("id");
		if(id=="industryJSTJ"){
			$("#hy").text("请选择企业所在行业");
		}else if(id=="areaJSTJ"){//区域
			$("#city").text("请选择");
		}else if(id=="panelnameJSTJ"){//所属板块
			$("#panelnameDiv").find("a").eq(0).addClass('on').siblings().removeClass("on");
		}else if(id=="tradingTypeJSTJ"){//交易方式
			$("#tradingTypeDiv").find("a").eq(0).addClass('on').siblings().removeClass("on");
		}else if(id=="scheduleJSTJ"){//定增进度
			$("#scheduleDiv").find("a").eq(0).addClass('on').siblings().removeClass("on");
		}else if(id=="privatePriceJSTJ"){//定增价格
			$("#minPrivatePriceInput").val('');
			$("#maxPrivatePriceInput").val('');
			$("#minPrivatePriceInput").attr('data-value','');
			$("#maxPrivatePriceInput").attr('data-value','');
		}else if(id=="premiumRateJSTJ"){//折溢价率
			$("#minPremiumRateInput").val('');
			$("#maxPremiumRateInput").val('');
			$("#minPremiumRateInput").attr('data-value','');
			$("#maxPremiumRateInput").attr('data-value','');
		}else if(id=="privateNumJSTJ"){//定增股数
			$("#minPrivateNumInput").val('');
			$("#maxPrivateNumInput").val('');
			$("#minPrivateNumInput").attr('data-value','');
			$("#maxPrivateNumInput").attr('data-value','');
		}else if(id=="raisePriceJSTJ"){//募集资金
			$("#minRaisePriceInput").val('');
			$("#maxRaisePriceInput").val('');
			$("#minRaisePriceInput").attr('data-value','');
			$("#maxRaisePriceInput").attr('data-value','');
		}else if(id=="placementDateJSTJ"){//公告日期
			$("#minPlacementDateStrInput").attr("value","");
			$("#maxPlacementDateStrInput").attr("value","");
			$("#minPlacementDateStrInput").attr("data-value",'');
			$("#maxPlacementDateStrInput").attr("data-value",'');
		}else if(id=="purchaserNumJSTJ"){//定增对象
			$("#minPurchaserNumInput").val('');
			$("#maxPurchaserNumInput").val('');
			$("#minPurchaserNumInput").attr('data-value','');
			$("#maxPurchaserNumInput").attr('data-value','');
			//确定与未确定
			$("#minPurchaserNumInput").parent().hide();
			$("#wqd").prev().addClass("on");
			$("#wqd").removeClass('on');
			$("#qd_in").removeClass('on');
		}
		//查询数据
		changeParam();
	});
}

/**
 * 清空筛选--清空查询条件
 */
function clearParam(){
	$("#jstj").find("i").each(function(index){
		var thisId=$(this).parent().attr("id");
		if(thisId!=null && thisId!="" && thisId!="undefined" && thisId.indexOf("JSTJ")>-1){
			$(this).parent().remove();
		}
	});
	//行业
	$("#hy").text("请选择企业所在行业");
	//区域
	$("#city").text("请选择");
	//所属板块
	$("#panelnameDiv").find("a").eq(0).addClass('on').siblings().removeClass("on");
	//交易方式
	$("#tradingTypeDiv").find("a").eq(0).addClass('on').siblings().removeClass("on");
	//最小定增价格
	$("#minPrivatePriceInput").attr('data-value','');
	//最大定增价格
	$("#maxPrivatePriceInput").attr('data-value','');
	//最小折溢价率
	$("#minPremiumRateInput").attr('data-value','');
	//最大折溢价率
	$("#maxPremiumRateInput").attr('data-value','');
	//最小定增股数
	$("#minPrivateNumInput").attr('data-value','');
	//最大定增股数
	$("#maxPrivateNumInput").attr('data-value','');
	//最小募集资金
	$("#minRaisePriceInput").attr('data-value','');
	//最大募集资金
	$("#maxRaisePriceInput").attr('data-value','');
	//公告日期
	$("#minPlacementDateStrInput").attr("data-value",'');
	$("#maxPlacementDateStrInput").attr("data-value",'');
	//定增对象
	$("#minPurchaserNumInput").attr('data-value','');
	$("#maxPurchaserNumInput").attr('data-value','');
	//确定与未确定
	$("#minPurchaserNumInput").parent().hide();
	$("#wqd").prev().addClass("on");
	$("#wqd").removeClass('on');
	$("#qd_in").removeClass('on');
	//定增进度
	$("#scheduleDiv").find("a").eq(0).addClass('on').siblings().removeClass("on");
	changeParam();
}
/**
 * 保存查询条件
 */
function saveParam(){
	//检索名称
	var searchName="";
	//textArea文本显示
	var textAreaValue="";
	//URL参数
	var param="";
	//检索条件
	var searchConditionStr='{';
	//行业
	var industry=$("#hy").text();
	if(industry=="请选择企业所在行业"){
		industry="";
	}
	if(industry!=null && industry!="" && industry!="undefined"){
		searchName+=industry+"+";
		textAreaValue+="行业:"+industry+"\n";
		param+="industry="+industry+"&";
		searchConditionStr+='industry:'+industry+',';
	}
	//区域
	var area=$("#city").text();
	if(area=="请选择"){
		area="";
	}
	if(area!=null && area!="" && area!="undefined"){
		searchName+=area+"+";
		textAreaValue+="区域:"+area+"\n";
		param+="area="+area+"&";
		searchConditionStr+='area:'+area+',';
	}
	//所属板块
	var panelname=$("#panelnameDiv").find("a.on").text();
	if(panelname=="全部"){
		panelname="";
	}
	if(panelname!=null && panelname!="" && panelname!="undefined"){
		searchName+=panelname+"+";
		textAreaValue+="所属板块:"+panelname+"\n";
		param+="panelname="+panelname+"&";
		searchConditionStr+='panelname:'+panelname+',';
	}
	//交易方式
	var tradingType=$("#tradingTypeDiv").find("a.on").text();
	if(tradingType=="全部"){
		tradingType="";
	}
	if(tradingType!=null && tradingType!="" && tradingType!="undefind"){
		searchName+=tradingType+"+";
		textAreaValue+="交易方式:"+tradingType+"\n";
		param+="tradingType="+tradingType+"&";
		searchConditionStr+='tradingType:'+tradingType+',';
		
	}
	//最小定增价格
	var minPrivatePrice=$("#minPrivatePriceInput").attr("data-value");
	//最大定增价格
	var maxPrivatePrice=$("#maxPrivatePriceInput").attr("data-value");
	if((minPrivatePrice!=null && minPrivatePrice!="" && minPrivatePrice!="undefined") && 
			(maxPrivatePrice!=null && maxPrivatePrice!="" && maxPrivatePrice!="undefined")	){
		searchName+="定增价格:大于"+minPrivatePrice+"小于"+maxPrivatePrice+"+";
		textAreaValue+="定增价格:大于"+minPrivatePrice+"\n";
		textAreaValue+="定增价格:小于"+maxPrivatePrice+"\n";
		param+="minPrivatePrice="+minPrivatePrice+"&";
		searchConditionStr+='minPrivatePrice:'+minPrivatePrice+',';
		param+="maxPrivatePrice="+maxPrivatePrice+"&";
		searchConditionStr+='maxPrivatePrice:'+maxPrivatePrice+',';
	}else{
		if(minPrivatePrice!=null && minPrivatePrice!="" && minPrivatePrice!="undefined"){
			searchName+="定增价格:大于"+minPrivatePrice+"+";
			textAreaValue+="定增价格:大于"+minPrivatePrice+"\n";
			param+="minPrivatePrice="+minPrivatePrice+"&";
			searchConditionStr+='minPrivatePrice:'+minPrivatePrice+',';
		}
		if(maxPrivatePrice!=null && maxPrivatePrice!="" && maxPrivatePrice!="undefined"){
			searchName+="定增价格:小于"+maxPrivatePrice+"+";
			textAreaValue+="定增价格:小于"+maxPrivatePrice+"\n";
			param+="maxPrivatePrice="+maxPrivatePrice+"&";
			searchConditionStr+='maxPrivatePrice:'+maxPrivatePrice+',';
		}
	}
	//最小折溢价率
	var minPremiumRate=$("#minPremiumRateInput").attr("data-value");
	//最大折溢价率
	var maxPremiumRate=$("#maxPremiumRateInput").attr("data-value");
	if((minPremiumRate!=null && minPremiumRate!="" && minPremiumRate!="undefined") && 
			(maxPremiumRate!=null && maxPremiumRate!="" && maxPremiumRate!="undefined")	){
		searchName+="折溢价率:大于"+minPremiumRate+"小于"+maxPremiumRate+"+";
		textAreaValue+="折溢价率:大于"+minPremiumRate+"\n";
		textAreaValue+="折溢价率:小于"+maxPremiumRate+"\n";
		param+="minPremiumRate="+minPremiumRate+"&";
		searchConditionStr+='minPremiumRate:'+minPremiumRate+',';
		param+="maxPremiumRate="+maxPremiumRate+"&";
		searchConditionStr+='maxPremiumRate:'+maxPremiumRate+',';
	}else{
		if(minPremiumRate!=null && minPremiumRate!="" && minPremiumRate!="undefined"){
			searchName+="折溢价率:大于"+minPremiumRate+"+";
			textAreaValue+="折溢价率:大于"+minPremiumRate+"\n";
			param+="minPremiumRate="+minPremiumRate+"&";
			searchConditionStr+='minPremiumRate:'+minPremiumRate+',';
		}
		if(maxPremiumRate!=null && maxPremiumRate!="" && maxPremiumRate!="undefined"){
			searchName+="折溢价率:小于"+maxPremiumRate+"+";
			textAreaValue+="折溢价率:小于"+maxPremiumRate+"\n";
			param+="maxPremiumRate="+maxPremiumRate+"&";
			searchConditionStr+='maxPremiumRate:'+maxPremiumRate+',';
		}
	}
	//最小定增股数
	var minPrivateNum=$("#minPrivateNumInput").attr("data-value");
	//最大定增股数
	var maxPrivateNum=$("#maxPrivateNumInput").attr("data-value");
	if((minPrivateNum!=null && minPrivateNum!="" && minPrivateNum!="undefined") && 
			(maxPrivateNum!=null && maxPrivateNum!="" && maxPrivateNum!="undefined")	){
		searchName+="定增股数:大于"+minPrivateNum+"小于"+maxPrivateNum+"+";
		textAreaValue+="定增股数:大于"+minPrivateNum+"\n";
		textAreaValue+="定增股数:小于"+maxPrivateNum+"\n";
		param+="minPrivateNum="+minPrivateNum+"&";
		searchConditionStr+='minPrivateNum:'+minPrivateNum+',';
		param+="maxPrivateNum="+maxPrivateNum+"&";
		searchConditionStr+='maxPrivateNum:'+maxPrivateNum+',';
	}else{
		if(minPrivateNum!=null && minPrivateNum!="" && minPrivateNum!="undefined"){
			searchName+="定增股数:大于"+minPrivateNum+"+";
			textAreaValue+="定增股数:大于"+minPrivateNum+"\n";
			param+="minPrivateNum="+minPrivateNum+"&";
			searchConditionStr+='minPrivateNum:'+minPrivateNum+',';
		}
		if(maxPrivateNum!=null && maxPrivateNum!="" && maxPrivateNum!="undefined"){
			searchName+="定增股数:小于"+maxPrivateNum+"+";
			textAreaValue+="定增股数:小于"+maxPrivateNum+"\n";
			param+="maxPrivateNum="+maxPrivateNum+"&";
			searchConditionStr+='maxPrivateNum:'+maxPrivateNum+',';
		}
	}
	//最小募集资金
	var minRaisePrice=$("#minRaisePriceInput").attr("data-value");
	//最大募集资金
	var maxRaisePrice=$("#maxRaisePriceInput").attr("data-value");
	if((minRaisePrice!=null && minRaisePrice!="" && minRaisePrice!="undefined") &&
			(maxRaisePrice!=null && maxRaisePrice!="" && maxRaisePrice!="undefined")	){
		searchName+="募集资金:大于"+minRaisePrice+"小于"+maxRaisePrice+"+";
		textAreaValue+="募集资金:大于"+minRaisePrice+"\n";
		textAreaValue+="募集资金:小于"+maxRaisePrice+"\n";
		param+="minRaisePrice="+minRaisePrice+"&";
		searchConditionStr+='minRaisePrice:'+minRaisePrice+',';
		param+="maxRaisePrice="+maxRaisePrice+"&";
		searchConditionStr+='maxRaisePrice:'+maxRaisePrice+',';
	}else{
		if(minRaisePrice!=null && minRaisePrice!="" && minRaisePrice!="undefined"){
			searchName+="募集资金:大于"+minRaisePrice+"+";
			textAreaValue+="募集资金:大于"+minRaisePrice+"\n";
			param+="minRaisePrice="+minRaisePrice+"&";
			searchConditionStr+='minRaisePrice:'+minRaisePrice+',';
		}
		if(maxRaisePrice!=null && maxRaisePrice!="" && maxRaisePrice!="undefined"){
			searchName+="募集资金:小于"+maxRaisePrice+"+";
			textAreaValue+="募集资金:小于"+maxRaisePrice+"\n";
			param+="maxRaisePrice="+maxRaisePrice+"&";
			searchConditionStr+='maxRaisePrice:'+maxRaisePrice+',';
		}
	}
	//最小公告日期
	var minPlacementDateStr=$("#minPlacementDateStrInput").attr("data-value");
	//最大公告日期
	var maxPlacementDateStr=$("#maxPlacementDateStrInput").attr("data-value");
	if((minPlacementDateStr!=null && minPlacementDateStr!="" && minPlacementDateStr!="undefined") &&
			(maxPlacementDateStr!=null && maxPlacementDateStr!="" && maxPlacementDateStr!="undefined")	){
		searchName+="公告日期:大于"+minPlacementDateStr+"小于"+maxPlacementDateStr+"+";
		textAreaValue+="公告日期:大于"+minPlacementDateStr+"\n";
		textAreaValue+="公告日期:小于"+maxPlacementDateStr+"\n";
		param+="minPlacementDateStr="+minPlacementDateStr+"&";
		searchConditionStr+='minPlacementDateStr:'+minPlacementDateStr+',';
		param+="maxPlacementDateStr="+maxPlacementDateStr+"&";
		searchConditionStr+='maxPlacementDateStr:'+maxPlacementDateStr+',';
	}else{
		if(minPlacementDateStr!=null && minPlacementDateStr!="" && minPlacementDateStr!="undefined"){
			searchName+="公告日期:大于"+minPlacementDateStr+"+";
			textAreaValue+="公告日期:大于"+minPlacementDateStr+"\n";
			param+="minPlacementDateStr="+minPlacementDateStr+"&";
			searchConditionStr+='minPlacementDateStr:'+minPlacementDateStr+',';
		}
		if(maxPlacementDateStr!=null && maxPlacementDateStr!="" && maxPlacementDateStr!="undefined"){
			searchName+="公告日期:小于"+maxPlacementDateStr+"+";
			textAreaValue+="公告日期:小于"+maxPlacementDateStr+"\n";
			param+="maxPlacementDateStr="+maxPlacementDateStr+"&";
			searchConditionStr+='maxPlacementDateStr:'+maxPlacementDateStr+',';
		}
	}
	//定增对象 确定大于0  不确定为0
	if($("#wqd").hasClass("on")){
		searchName+="定增对象:未确定\n";
		textAreaValue+="定增对象:未确定\n";
		param+="minPurchaserNum="+0+"&";
		searchConditionStr+='minPurchaserNum:'+0+',';
		param+="maxPurchaserNum="+0+"&";
		searchConditionStr+='maxPurchaserNum:'+0+',';
	}else if($("#qd_in").hasClass("on")){
		var minPurchaserNum=$("#minPurchaserNumInput").attr("data-value");
		var maxPurchaserNum=$("#maxPurchaserNumInput").attr("data-value");
		if((minPurchaserNum!=null && minPurchaserNum!="" && minPurchaserNum!="undefined") &&
				(maxPurchaserNum!=null && maxPurchaserNum!="" && maxPurchaserNum!="undefined")	){
			searchName+="定增对象:大于"+minPurchaserNum+"小于"+maxPurchaserNum+"+";
			textAreaValue+="定增对象:大于"+minPurchaserNum+"\n";
			textAreaValue+="定增对象:小于"+maxPurchaserNum+"\n";
			param+="minPurchaserNum="+minPurchaserNum+"&";
			searchConditionStr+='minPurchaserNum:'+minPurchaserNum+',';
			param+="maxPurchaserNum="+maxPurchaserNum+"&";
			searchConditionStr+='maxPurchaserNum:'+maxPurchaserNum+',';
		}else{
			if(minPurchaserNum!=null && minPurchaserNum!="" && minPurchaserNum!="undefined"){
				searchName+="定增对象:大于"+minPurchaserNum+"+";
				textAreaValue+="定增对象:大于"+minPurchaserNum+"\n";
				param+="minPurchaserNum="+minPurchaserNum+"&";
				searchConditionStr+='minPurchaserNum:'+minPurchaserNum+',';
			}
			if(maxPurchaserNum!=null && maxPurchaserNum!="" && maxPurchaserNum!="undefined"){
				searchName+="定增对象:小于"+maxPurchaserNum+"+";
				textAreaValue+="定增对象:小于"+maxPurchaserNum+"\n";
				param+="maxPurchaserNum="+maxPurchaserNum+"&";
				searchConditionStr+='maxPurchaserNum:'+maxPurchaserNum+',';
			}
		}
	}
	//定增进度
	var scheduleValue=$("#scheduleDiv").find("a.on").text();
	if(scheduleValue=="全部"){
		scheduleValue="";
	}
	if(scheduleValue!=null && scheduleValue!="" && scheduleValue!="undefined"){
		searchName+=scheduleValue+"+";
		textAreaValue+="定增进度:"+scheduleValue+"\n";
		param+="schedule="+scheduleValue+"&";
		searchConditionStr+='schedule:'+scheduleValue+',';
	}
	param=param.substring(0,param.length-1);
	searchConditionStr=searchConditionStr.substring(0,searchConditionStr.length-1);
	searchConditionStr+='}'
	if(searchName==null || searchName=="" ){
		$("#saveParamTitle").show();
		return false;
	}
	//弹框输入保存的名字
	$("#savaParam").show();
	$(".tcbackground").show();
	
	searchName=searchName.substring(0,searchName.length-1);
	$("#paramName").hide();
	$("#savaParam").find("textarea").text(textAreaValue);
	$("#savaParam").find("input").val("定增:"+searchName);
	$("#savaParam").find("input").on("keyup",function(){
		var paramName=$(this).val();
		paramName=$.trim(paramName);
		if(paramName==null || paramName=="" || paramName=="undefined"){
			$("#paramName").show();
		}else{
			$("#paramName").hide();
		}
	});
	$("#savaParam").find("button.save").on("click",function(){
		var paramName=$("#savaParam").find("input").val();
		paramName=$.trim(paramName);
		if(paramName==null || paramName=="" || paramName=="undefined"){
			$("#paramName").show();
			return false;
		}else{
//			searchType 保存的查询类型--例如:持股查询页面:6
//			analysisUrl 检索url---页面?Param,
//			searchConditionStr 检索条件 "持股查询：行业+区域+..."
//			searchName 持股查询
			var searchType=3;
			var analysisUrl="/index/privatePlacement.html?"+param;
			console.log(analysisUrl);
			//保存检索条件
			saveFindParam(searchType,searchConditionStr,analysisUrl,paramName);
		}
	});
	$("#savaParam").find("button.quxiao").on("click",function(){
		$("#savaParam").hide();
		$(".tcbackground").hide();
		$("#savaParam").find("input").val("");
	});
	$("#savaParam").find("a").on("click",function(){
		$("#savaParam").hide();
		$(".tcbackground").hide();
		$("#savaParam").find("input").val("");
	});
	
}
/**
 * 查询定增信息
 * @param industry 行业-二级行业
 * @param area 区域
 * @param panelname 所属板块
 * @param tradingType 交易方式
 * @param schedule 定增进度
 * @param minPrivatePrice 最小定增价格
 * @param maxPrivatePrice 最大定增价格
 * @param minPremiumRate 最小折溢价率
 * @param maxPremiumRate 最大折溢价率
 * @param minPrivateNum 最小定增股数
 * @param maxPrivateNum 最大定增股数
 * @param minRaisePrice 最小募集资金
 * @param maxRaisePrice 最大募集资金
 * @param minPlacementDateStr 公告日期
 * @param maxPurchaserNum 公告日期
 * @param purchaserNum 定增对象 确定大于0  不确定为0
 * @param sortParam 排序字段
 * @param sortValue 排序方式 -1(倒序)or1(正序)
 * @param pageNum 页数
 * @param pageSize 每页条数
 */
function findPrivatePlacement(industry,area,panelname,
		 tradingType, schedule,
		 minPrivatePrice, maxPrivatePrice,
		 minPremiumRate, maxPremiumRate,
		 minPrivateNum, maxPrivateNum,
		 minRaisePrice, maxRaisePrice,
		 minPlacementDateStr, maxPlacementDateStr,
		 minPurchaserNum, maxPurchaserNum,
		 pageNum, pageSize){
	if(pageNum==null){
		pageNum=1;
	}
	if(pageSize==null){
		pageNum=10;
	}
	if(pageNum==1){
		$("#page").remove();
		$(".title_page").find("div.fr").html('<div id="page" class="pages pagination " style="display: none;"></div>')
	}
	//清空页面数据
	$("#dataTotal").text(0);
	$("#privatePlacementInfo").html("");
	$('#page').hide();
	var paramData={industry:industry,area:area,panelname:panelname,tradingType:tradingType,schedule:schedule,
			minPrivatePrice:minPrivatePrice,maxPrivatePrice:maxPrivatePrice,
			minPremiumRate:minPremiumRate,maxPremiumRate:maxPremiumRate,
			minPrivateNum:minPrivateNum,maxPrivateNum:maxPrivateNum,
			minRaisePrice:minRaisePrice,maxRaisePrice:maxRaisePrice,
			minPlacementDateStr:minPlacementDateStr,maxPlacementDateStr:maxPlacementDateStr,
			minPurchaserNum:minPurchaserNum,maxPurchaserNum:maxPurchaserNum,
			pageNum:pageNum,pageSize:pageSize};
	$.axs("/betaInvest/private/findPrivatePlacement.do",paramData,true,function(data){
//		console.log(data);
		if(data.retCode=="0000"){
			var page=data.retData;
			if(page==null){
				$("#page").hide();
				$("#privatePlacementInfo").html("<tr><td  colspan='9' >没有符合条件的数据</td></tr>");
				return false;
			}
			var pageSize=page.pageLimit;
			$("#privatePlacementInfo").attr("data-pageSize",pageSize);
			var pageNum=page.pageIndex;
			$("#privatePlacementInfo").attr("data-pageNum",pageNum);
			var dataTotal=page.totalCount;
			$("#dataTotal").text(dataTotal);
			var resultList=page.list;
			if(resultList==null){
				$("#page").hide();
				$("#privatePlacementInfo").html("<tr><td  colspan='9' >没有符合条件的数据</td></tr>");
				return false;
			}
			var html='';
			for(var i=0;i<resultList.length;i++){
				var result=resultList[i];
				html+='<tr>';
				html+='<td>';
				html+='<a target="_blank" href="/businessDetails/newTBindex.html?stockCode='+result.stockCode+'&stockName='+result.stockName+'">'+result.stockName+'('+result.stockCode+')</a>';
				html+='</td>';
				html+='<td>'+result.dateTime+'</td>';
				var scheduleValue=result.schedule;
				if(scheduleValue==1){
					html+='<td>董事会通过</td>';
				}else if(scheduleValue==2){
					html+='<td>股东大会通过</td>';
				}else if(scheduleValue==3){
					html+='<td>停止实施</td>';
				}else if(scheduleValue==4){
					html+='<td>股东大会未通过</td>';
				}else if(scheduleValue==5){
					html+='<td>证监会核准</td>';
				}else if(scheduleValue==6){
					html+='<td>实施中</td>';
				}else if(scheduleValue==7){
					html+='<td>发行失败</td>';
				}else if(scheduleValue==8){
					html+='<td>已完成</td>';
				}
				html+='<td class="shuzi">'+(result.privatePrice==null?"--":(result.privatePrice).toFixed(2))+'</td>';
				html+='<td class="shuzi">'+(result.privateNum==null?"--":(result.privateNum).toFixed(2))+'</td>';
				html+='<td class="shuzi">'+(result.raisePrice==null?"--":(result.raisePrice).toFixed(2))+'</td>';
//				html+='<td class="shuzi">'+(result.financingRatio==null?"--":(result.financingRatio).toFixed(2))+'</td>';
//				html+='<td class="shuzi">'+(result.premiumRate==null?"--":(result.premiumRate).toFixed(2))+'</td>';
				html+='<td class="chakan">';
				if(result.purchaserNum>0){
					var id = result.purchaser;
					if(result.schedule == 8 ){
						id = result.hashcode;
					}
					html+='<a href="javascript:;" data-index='+i+'  data-schedule='+result.schedule+' data-purchaser='+id+' data-purchaserNum='+result.purchaserNum+'>查看</a>';
//					var purchaserHtml=getPurchaserHtml(id,result.schedule,result.purchaserNum);
//					html+=purchaserHtml;
				}else{
					html+='--';
				}
				html+='</td>';
				html+='</tr>';
			}
			$("#privatePlacementInfo").html(html);
			//分页
			if(pageNum==1){
				$('#page').pagination({
					total: dataTotal,
					pageSize: pageSize,
					current:pageNum,
					layout: ['first', 'prev', 'links','next'],
					links:0,
					displayMsg:"",
					showPageList:false,
					onSelectPage: function(pageNumber, size) {
//						$("#privatePlacementInfo").attr("data-pageNum",pageNumber);
//						$("#privatePlacementInfo").attr("data-pageSize",size);
						findPrivatePlacement(industry,area,panelname,
								 tradingType, schedule,
								 minPrivatePrice, maxPrivatePrice,
								 minPremiumRate, maxPremiumRate,
								 minPrivateNum, maxPrivateNum,
								 minRaisePrice, maxRaisePrice,
								 minPlacementDateStr, maxPlacementDateStr,
								 minPurchaserNum, maxPurchaserNum,
								 pageNumber, size);
					}
				});
			}
			$('#page').show();
			//修改分页文字
			setPageText2('page');
			//绑定显示发行对象事件
//			发行对象弹框
			$(".chakan a").on("click",function(){
				if($(this).parent().find('div.fxdx_dbox').length<1){
					var schedule = $(this).attr("data-schedule");
					var purchaser = $(this).attr("data-purchaser");
					var purchasernum = $(this).attr("data-purchasernum");
					var index = $(this).attr("data-index");
					var html = getPurchaserHtml(purchaser,schedule,purchasernum);
					$(this).parent().append(html);
				}
				
				$(this).parent().parent().siblings().find("div.fxdx_dbox").hide();//让其他弹框影藏
				$(this).next().show();
//			关闭发行对象弹框
				$(".fxdx_test").on("click",function(){
					$(this).parent().parent().hide();
				});
			});
		}else{
			$('#page').hide();
			$("#privatePlacementInfo").html("<tr><td  colspan='11' >没有符合条件的数据</td></tr>");
			errorAlert(data.retCode,data.retMsg);
		}
	});
}


/**
 * 发行对象
 * @param purchaser	 唯一标识
 * @param type 
 * @returns {String} 
 */
function getPurchaserHtml(purchaser,type,purchaserNum){
	//<!--查看对象弹窗 star-->
	var duixiangHtml='<div class="fxdx_dbox">';
		duixiangHtml+='<div class="fxdx_title"><span>发行对象</span>';
		duixiangHtml+='<a class="fxdx_test" href="javascript:;"><img src="/saasBeta/images/icon/alertClose.png" /></a>';
		duixiangHtml+='</div>';
		duixiangHtml+='<div class="fxdx_info_box">';
		duixiangHtml+='<table>';
		duixiangHtml+='<thead>';
		duixiangHtml+='<tr>';
		duixiangHtml+='<th scope="col">发行对象</th>';
		duixiangHtml+='<th scope="col">认购价格(元)</th>';
		duixiangHtml+='<th scope="col">认购数量(万股)</th>';
		duixiangHtml+='<th scope="col">认购金额(万元)</th>';
		duixiangHtml+='<th scope="col">持股期限(月)</th>';
		duixiangHtml+='</tr>';
		duixiangHtml+='</thead>';
		duixiangHtml+='<tbody>';
		if(type==8){
//			var objList=jQuery.parseJSON(purchaser);
			//当状态为已完成时  purchaser值为 hashcode
			var paramData={hashcode:purchaser};
			$.axs("/betaInvest/private/findPrivateIssueObject.do",paramData,false,function(data){
//				console.log(data);
				if(data.retCode=="0000"){
					if(data.retData.length>0){
						for(var i=0;i<data.retData.length;i++){
							var obj=data.retData[i];
							duixiangHtml+='<tr>';
							duixiangHtml+='<th  >'+obj.tz+'</th>';
							duixiangHtml+='<th  class="shuzi">'+parseFloat(obj.zfjg).toFixed(2)+'</th>';
							duixiangHtml+='<th  class="shuzi">'+parseFloat(obj.cgs).toFixed(2)+'</th>';
							duixiangHtml+='<th  class="shuzi">'+(obj.tze).toFixed(2)+'</th>';
							duixiangHtml+='<th  class="shuzi">'+obj.sdzt+'</th>';
							duixiangHtml+='</tr>';
							duixiangHtml+='<tbody>';
							duixiangHtml+='<tbody>';
							duixiangHtml+='<tbody>';
							duixiangHtml+='<tbody>';
						}
					}else{
						duixiangHtml+='<tr>';
						duixiangHtml+='<th  >--</th>';
						duixiangHtml+='<th  class="shuzi">--</th>';
						duixiangHtml+='<th  class="shuzi">-</th>';
						duixiangHtml+='<th  class="shuzi">-</th>';
						duixiangHtml+='<th  class="shuzi">--</th>';
						duixiangHtml+='</tr>';
					}
					
				}else{
					duixiangHtml+='<tr>';
					duixiangHtml+='<th  >--</th>';
					duixiangHtml+='<th  class="shuzi">--</th>';
					duixiangHtml+='<th  class="shuzi">-</th>';
					duixiangHtml+='<th  class="shuzi">-</th>';
					duixiangHtml+='<th  class="shuzi">--</th>';
					duixiangHtml+='</tr>';
				}
			});
			
		}else{
			if(purchaserNum==0){
				duixiangHtml+='<tr>';
				duixiangHtml+='<th  class="tc_fxdx">'+purchaser+'</th>';
				duixiangHtml+='<th  class="tc_rgjg">--</th>';
				duixiangHtml+='<th  class="tc_rgsl">--</th>';
				duixiangHtml+='<th  class="tc_rgje">--</th>';
				duixiangHtml+='<th  class="tc_cgqx">--</th>';
				duixiangHtml+='</tr>';
			}else{
				var str=null;
				if(purchaser.indexOf(",")>-1){
					str=purchaser.split(",");
	        	}else if(purchaser.indexOf("；")>-1){
	        		str=purchaser.split("；");
	        	}else if(purchaser.indexOf(";")>-1){
	        		str=purchaser.split(";");
	        	}else if(purchaser.indexOf("。")>-1){
	        		str=purchaser.split("。");
	        	}else if(purchaser.indexOf(".")>-1){
	        		str=purchaser.split(".");
	        	}else{
	        		str=purchaser.split("、");
	        	}
				for(var i=0;i<str.length;i++){
					duixiangHtml+='<tr>';
					duixiangHtml+='<th  class="tc_fxdx">'+str[i]+'</th>';
					duixiangHtml+='<th  class="tc_rgjg">--</th>';
					duixiangHtml+='<th  class="tc_rgsl">--</th>';
					duixiangHtml+='<th  class="tc_rgje">--</th>';
					duixiangHtml+='<th  class="tc_cgqx">--</th>';
					duixiangHtml+='</tr>';
				}
			}
		}		
		duixiangHtml+='</tbody>';
		duixiangHtml+='</table>';
		duixiangHtml+='</div>';
		duixiangHtml+='</div>';
	return duixiangHtml;
}

/**
 * 根据参数回显示
 */
function showBack(){
	//行业
	if(getUrlParam("industry")!=null && getUrlParam("industry")!="" && getUrlParam("industry")!="undefined"){
		$("#hy").text(getUrlParam("industry"));
	}
	//区域
	if(getUrlParam("area")!=null && getUrlParam("area")!="" && getUrlParam("area")!="undefined"){
		$("#city").text(getUrlParam("area"));
	}
	//板块
	if(getUrlParam("panelname")!=null && getUrlParam("panelname")!="" && getUrlParam("panelname")!="undefined"){
		$("#panelnameDiv").find("a").each(function(){
			if($(this).text()==getUrlParam("panelname")){
				$(this).addClass("on").siblings().removeClass("on");
			}
		});
	}
	//交易方式
	if(getUrlParam("tradingType")!=null && getUrlParam("tradingType")!="" && getUrlParam("tradingType")!="undefined"){
		$("#tradingTypeDiv").find("a").each(function(){
			if($(this).text()==getUrlParam("tradingType")){
				$(this).addClass("on").siblings().removeClass("on");
			}
		});
	}
	//定增价格
	if(getUrlParam("minPrivatePrice")!=null && getUrlParam("minPrivatePrice")!="" && getUrlParam("minPrivatePrice")!="undefined"){
		$("#minPrivatePriceInput").attr("data-value",getUrlParam("minPrivatePrice"));
	}
	if(getUrlParam("maxPrivatePrice")!=null && getUrlParam("maxPrivatePrice")!="" && getUrlParam("maxPrivatePrice")!="undefined"){
		$("#maxPrivatePriceInput").attr("data-value",getUrlParam("maxPrivatePrice"));
	}
	//折溢价比例
	if(getUrlParam("minPremiumRate")!=null && getUrlParam("minPremiumRate")!="" && getUrlParam("minPremiumRate")!="undefined"){
		$("#minPremiumRateInput").attr("data-value",getUrlParam("minPremiumRate"));
	}
	if(getUrlParam("maxPremiumRate")!=null && getUrlParam("maxPremiumRate")!="" && getUrlParam("maxPremiumRate")!="undefined"){
		$("#maxPremiumRateInput").attr("data-value",getUrlParam("maxPremiumRate"));
	}
	//定增股数
	if(getUrlParam("minPrivateNum")!=null && getUrlParam("minPrivateNum")!="" && getUrlParam("minPrivateNum")!="undefined"){
		$("#minPrivateNumInput").attr("data-value",getUrlParam("minPrivateNum"));
	}
	if(getUrlParam("maxPrivateNum")!=null && getUrlParam("maxPrivateNum")!="" && getUrlParam("maxPrivateNum")!="undefined"){
		$("#maxPrivateNumInput").attr("data-value",getUrlParam("maxPrivateNum"));
	}
	//募集资金
	if(getUrlParam("minRaisePrice")!=null && getUrlParam("minRaisePrice")!="" && getUrlParam("minRaisePrice")!="undefined"){
		$("#minRaisePriceInput").attr("data-value",getUrlParam("minRaisePrice"));
	}
	if(getUrlParam("maxRaisePrice")!=null && getUrlParam("maxRaisePrice")!="" && getUrlParam("maxRaisePrice")!="undefined"){
		$("#maxRaisePriceInput").attr("data-value",getUrlParam("maxRaisePrice"));
	}
	//公告日期
	if(getUrlParam("minPlacementDateStr")!=null && getUrlParam("minPlacementDateStr")!="" && getUrlParam("minPlacementDateStr")!="undefined"){
		$("#minPlacementDateStrInput").attr("data-value",getUrlParam("minPlacementDateStr"));
	}
	if(getUrlParam("maxPlacementDateStr")!=null && getUrlParam("maxPlacementDateStr")!="" && getUrlParam("maxPlacementDateStr")!="undefined"){
		$("#maxPlacementDateStrInput").attr("data-value",getUrlParam("maxPlacementDateStr"));
	}
	//定增对象
	var minPurchaserNum=null;
	if(getUrlParam("minPurchaserNum")!=null && getUrlParam("minPurchaserNum")!="" && getUrlParam("minPurchaserNum")!="undefined"){
		minPurchaserNum=getUrlParam("minPurchaserNum");
		if(minPurchaserNum!=0){
			$("#minPurchaserNumInput").attr("data-value",minPurchaserNum);
		}
	}
	var maxPurchaserNum=null; 
	if(getUrlParam("maxPurchaserNum")!=null && getUrlParam("maxPurchaserNum")!="" && getUrlParam("maxPurchaserNum")!="undefined"){
		maxPurchaserNum=getUrlParam("maxPurchaserNum");
		if(maxPurchaserNum!=0){
			$("#maxPurchaserNumInput").attr("data-value",maxPurchaserNum);
		}
	}
	//都为0时表示未确定定增对象
	if(minPurchaserNum!=null || maxPurchaserNum!=null){
		if(minPurchaserNum==0 && maxPurchaserNum==0){
			$("#wqd").addClass("on");
		}else{
			$("#qd_in").addClass("on");
			$(".dingz_qd").show();
		}
	}
	//定增进度
	if(getUrlParam("schedule")!=null && getUrlParam("schedule")!="" && getUrlParam("schedule")!="undefined"){
		$("#scheduleDiv").find("a").each(function(){
			if($(this).text()==getUrlParam("schedule")){
				$(this).addClass("on").siblings().removeClass("on");
			}
		});
	}
	//查询数据
	changeParam();
}


/**
 * 查询所有区域
 */
function findFirstLevelArea(){
	$.axs("/betaStock/common/findWorkBook.do",{type:1,dataType:1},false,function(data){
		if(data.retCode==0000){
			if(data.retData!=null && data.retData.length!=0){
				var firstLevelArea=data.retData;
				var html='';
				//html+='<li value="0"><a href="javascript:void(0)">全部</a></li>';
				$.each(firstLevelArea,function(index,item){
					html+='<li value="'+item.id+'"><a href="javascript:void(0)">'+item.nameCn+'</a></li>';
				});
				$("#firstLevelArea").html(html);
			}
		}
	});
}
/**
 * 时间范围判断
 */
function dateJudge(){
	//最小公告日期
	var minPlacementDateStr=$("#minPlacementDateStrInput").val();
	//最大公告日期
	var maxPlacementDateStr=$("#maxPlacementDateStrInput").val();
	if(minPlacementDateStr>maxPlacementDateStr){
		$.zmAlert("请选择大于开始日期");
		$("#maxPlacementDateStrInput").attr("value","");
	}
}