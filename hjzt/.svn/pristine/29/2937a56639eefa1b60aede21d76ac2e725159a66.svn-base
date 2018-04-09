//公司对比公共部分
var comparisonStockNum=4;
$(function(){
	var urlName=window.location.pathname;
	var pathName=urlName.split("/")[2];
	var html='<div class="tmtc_new"  style="display:none;"></div>';
		html+='<div class="tianjia_tc" style="display:none;">';
		html+='<i></i>';
		html+='<div class="tj_title">';
		html+='<span>添加企业</span>';
		html+='</div>';
		html+='<div class="compar_search">';
		html+='<input type="text" id="findStockList" placeholder="请输入公司简称/股票代码"/>';
		html+='</div>';
		html+='<div class="comparis_btn">';
		html+='<span class="tj_btn">添加</span>';
		html+='<span class="qx_btn">取消</span>';
		html+='</div>';
		html+='</div>';
		if(pathName=="multidStockRankingAnalysis.html"){
		html+='<div class="duibi_lists mot">';	
		}
		if(pathName=="companyComparison.html"){
			html+='<div class="duibi_lists" style="display:block">';
		}else{
			
		html+='<div class="duibi_lists">';		
		}
		html+='<div class="duibi_top" id="comparisonStockCode">';
//		html+='<li><a href="javascript:;">天阳科技(835713)</a><i></i></li>';
//		html+='<li><a href="javascript:;">天阳科技(835713)</a><i></i></li>';
//		html+='<li><a href="javascript:;">天阳科技(835713)</a><i></i></li>';
		//html+='<!--<a href="javascript:;">天阳科技（835713）<i></i></a>-->';
		html+='<span class="company_tianjia"><em></em>添加企业</span>';
		//html+='<!--<span class="on"><em></em>添加企业</span>-->';
		html+='<div class="wxtips"><p>温馨提示：可添加4个企业</p></div>';
		html+='<div class="clr"></div>';
		html+='</div>';
		html+='</div>';

	if(pathName=="companyComparison.html"||pathName=="multidStockanalysisTable.html"||pathName=="multidStockTrendComparison.html"){
		$("body").find("div").eq(0).before(html);
	}
	if(pathName=="multidStockRankingAnalysis.html"){
		$("body").find("div").eq(0).before(html);
//		$(".new_indu_nav2").after(html);
	}
	
	//初始化对比公司
	initComparisonStockHeader();
	if($("#comparisonStockCode li").length==4){
		$(".company_tianjia").hide();
	}else{
		$(".company_tianjia").show();
	}
	//点击头部的公司- 删除按钮
	$(".duibi_lists").delegate("i","click",function(){
		var length=$("#comparisonStockCode").find("li").length;
		var cnStr = $(this).prev().text(); //公司代码和简称 如：安泽电工(831945)
		var comStockCode = cnStr.substring(0, cnStr.indexOf("("));
		var comStockName = cnStr.substring(cnStr.indexOf("(") + 1, cnStr.length - 1);
//		console.log(comStockCode + "--" + comStockName)
		//删除对比公司
		removeComparisonStock(comStockCode, comStockName);
		$(this).parent().remove();
		//$("#tipsTitle").html("温馨提示：可添加4个企业");
//		if(length==1){
			//window.open("TBfinancial.html");
//			localStorage.setItem(userId,"");
//			window.location.href="multiStockAnalysis.html";
//		}
		//console.log(length)
		if(length==1){
			if(pathName=="companyComparison.html"){
				$(".duib_zanwu_shuju").show();
				$(".db_company").hide();
				
			}else{
//				var userId=localStorage.getItem("userId");
//				localStorage.setItem(userId,"");
				window.location.href="multidStockanalysisTable.html";
			}
			
		}else{
//			//财务数据页的暂无数据
//			$(".yanjiu_wushuju").hide();
//			$(".caiwu_comparison").show();
		}
		//查询数据
		loadData();
		$(".company_tianjia").show();
		if(length==1){
			//财务数据页的暂无数据
			$(".yanjiu_wushuju").show();
			$(".caiwu_comparison").hide();
			$(".main_add_box").hide();
		}else{
			//财务数据页的暂无数据
			$(".yanjiu_wushuju").hide();
			$(".caiwu_comparison").show();
			$(".main_add_box").show();
		}
	});
	//点击添加企业按钮显示搜索框
	$("body").delegate(".company_tianjia","click",function(){
		var length=$("#comparisonStockCode").find("li").length;
		if(length>=comparisonStockNum){
			errorAlert("","最多可添加"+comparisonStockNum+"个企业")
			return false;
		}
		$(".tmtc_new").show();
		$(".tianjia_tc").show();
		$(".czzx_db_box").hide();
	});
	
	//添加搜索股票
	$("#findStockList").autocomplete({
		minLength: 2,
		source: function(request, response) {
			findCodeName(request, response);
		},
		delay: 500,
		select: function(event, ui) {
//			var item = ui.item;
			//window.location.href = 'TBenterpriseInformation.html?codeName=' + item.code;
//			$("#comparisonStockCode").append("<li>"+item.code+"("+item.code+")"+"<li>");
//			$(".add_tc_box,.tcbackground").hide();
		}
	});
	$("#findStockList").keydown(function(e) {
		if(e.keyCode==13){
			//滚动条生效
			$(document.body).css("overflow","");
			if($("#findStockList").val() != "") {
				var val = $.trim($("#findStockList").val());
				$("#findStockList").val('');
				if(searchList.length != 0) {
					$.each(searchList, function(index, flag) {
						if(val.indexOf(flag.code) > -1  || val.indexOf(flag.name) > -1) {
							var value=flag.name+"("+flag.code+")";
							if(value==null || value==""){
								$.zmAlert("请输入公司简称或股票编码");
								return false;
							}
							//检查是否已经添加过改股票
							var isAddStockCode=false;
							$("#comparisonStockCode").find("li").each(function(){
								var codeAndName=$(this).text();
								if(codeAndName.indexOf(value)>-1){
									$.zmAlert(value+"已存在");
									isAddStockCode=true;
									return false;
								}
							});
							if(isAddStockCode){
								return false;
							}
							//隐藏查询的值
							$("#ui-id-1").hide();
							$("#ui-id-2").hide();
							var ind=$("#comparisonStockCode").find("li").length;
							$(".company_tianjia").before('<li><a target="_blank" href="/businessDetails/newTBindex.html?stockCode='+flag.code+'&stockName='+flag.name+'">'+value+'</a><i></i></li>');
							$(".add_tc_box,.tcbackground").hide();
							//$("#tipsTitle").html("温馨提示：可添加"+(comparisonStockNum-$("#comparisonStockCode").find("li").length)+"个企业");
							$(".tmtc_new").hide();
							$(".tianjia_tc").hide();
							
//							addComparisonStock(flag.code, flag.name);
							
//							$(".tmtc_new").hide();
//							$(".tianjia_tc").hide();
							if($("#comparisonStockCode li").length==4){
								$(".company_tianjia").hide();
							}
							//财务对比页的显示隐藏问题
							$(".yanjiu_wushuju").hide();
							$(".caiwu_comparison").show();
							$(".caiwu_comparison").show();
							$(".main_add_box").show();
							//重新加载数据
							loadData();
						}
					});
					
				}else{
					$.zmAlert("请输入正确的检索信息");
				}
			} else {
				$.zmAlert("请输入要检索的信息");
			}
		}
	});
	
	//点击弹窗的添加qx_btn
	$(".tj_btn").on("click",function(){
		var len=$("#comparisonStockCode li").length;
		if(len==0){
			$(".duib_zanwu_shuju").hide();
			$(".db_company").show();
		}
		var val = $.trim($("#findStockList").val());
		if(val==null || val=="" || val.indexOf("(")<=-1 || val.indexOf(")")<=-1
				|| val.substring(val.indexOf("(")+1,val.indexOf(")")).length!=6
				|| val.substring(0,val.indexOf("(")).length<3){
			$.zmAlert("请选择正确的公司简称或股票编码");
			return false;
		}
		$("#findStockList").val('');
		var isAddStockCode=false;
		$("#comparisonStockCode").find("li").each(function(){
			var codeAndName=$(this).text();
			if(codeAndName.indexOf(val)>-1){
				$.zmAlert(val+"已存在");
				isAddStockCode=true;
				return false;
			}
		});
		if(isAddStockCode){
			return false;
		}
		var start=val.indexOf("(")+1;
		var end=val.indexOf(")");
		var stockCode="'"+val.substring(start,end)+"'";
		var stockName=val.substring(0,start);
		var ind=$("#comparisonStockCode").find("li").length;
		$(".company_tianjia").before('<li><a target="_blank" href="/businessDetails/newTBindex.html?stockCode='+val.substring(start,end)+'&stockName='+val.substring(0,start-1)+'">'+val+'</a><i></i></li>');
		$(".add_tc_box,.tcbackground").hide();
		//$("#tipsTitle").html("温馨提示：可添加"+(comparisonStockNum-$("#comparisonStockCode").find("li").length)+"个企业");
		var comStockName = val.substring(0, val.indexOf("("));
		var comStockCode = val.substring(val.indexOf("(") + 1, val.length - 1);
//		setLocalStorageComparis();
		addComparisonStock(comStockCode, comStockName);
		
		$(".tmtc_new").hide();
		$(".tianjia_tc").hide();
		if($("#comparisonStockCode li").length==4){
			$(".company_tianjia").hide();
		}
		//财务对比页的显示隐藏问题
		$(".yanjiu_wushuju").hide();
		$(".caiwu_comparison").show();
		$(".caiwu_comparison").show();
		$(".main_add_box").show();
		
		//重新加载数据
		loadData();
	});
	//全文检索取消按钮
	$(".qx_btn").on("click",function(){
		$(".tmtc_new").hide();
		$(".tianjia_tc").hide();
	});
	//关闭全文检索
	$(".tianjia_tc i").on("click",function(){
		$(".tmtc_new").hide();
		$(".tianjia_tc").hide();
	});
	var lengths=$("#comparisonStockCode li").length;
	if(lengths<=0){
		//财务数据页的暂无数据
		$(".yanjiu_wushuju").show();
		$(".caiwu_comparison").hide();
		$(".main_add_box").hide();
	}else{
		//财务数据页的暂无数据
		$(".yanjiu_wushuju").hide();
		$(".caiwu_comparison").show();
		$(".main_add_box").show();
	}
});

/**
 * 初始化对比公司
 */
function initComparisonStockHeader(){
//	var userId=localStorage.getItem("userId");
	var stockInfo = findContrastCompany();
	//TODO 测试数据
	//stockInfo="430035-中兴通融,430003-北京时代,430004-绿创设备"
	if(stockInfo=="" || stockInfo==null || stockInfo=="undefined" || stockInfo==",-," || stockInfo=="," || stockInfo=="()"){
		setLocalStorageComparis();
		//跳转暂无对标企业
//		window.location.href="multiStockAnalysis.html";
		return false;
	}
	var stockCodes="";
	var stockNames="";
	for(var i=0;i<stockInfo.split(",").length;i++){
		if(stockInfo.split(",")[i]!="" && stockInfo.split(",")[i]!=null && stockInfo.split(",")[i]!="undefined"){
			stockCodes+=stockInfo.split(",")[i].split("-")[0]+","
			stockNames+=stockInfo.split(",")[i].split("-")[1]+","
		}
	}
	stockCodes=stockCodes.substring(0,stockCodes.length-1);
	stockNames=stockNames.substring(0,stockNames.length-1);
	if(getUrlParam("codeS")!=null && getUrlParam("codeS")!="" && getUrlParam("codeS")!="undefined"){
		stockCodes=getUrlParam("codeS");
		stockNames=getUrlParam("nameS");
	}
	//股票代码
	var stockCodesSplit=stockCodes.split(",");
	//股票名称
	var stockNamesSplit=stockNames.split(",");
	
	var comparisonStockCodeHtml='';
	//股票名称显示
	for(var i=0;i<stockNamesSplit.length;i++){
		//<a href="javascript:;">天阳科技(835713)<i></i></a>
		comparisonStockCodeHtml+='<li><a target="_blank" href="/businessDetails/newTBindex.html?stockCode='+stockCodesSplit[i]+'&stockName='+stockNamesSplit[i]+'">'+stockNamesSplit[i]+'('+stockCodesSplit[i]+')</a><i></i></li>';
	}
	$(".company_tianjia").before(comparisonStockCodeHtml);
	//$("#tipsTitle").html("温馨提示：可添加"+(comparisonStockNum-stockCodesSplit.length)+"个企业");
}
/**
 * 获取所有对比的股票代码
 * @returns {String}
 */
function getAllStockCode(){
	var allStockCodes="";
	$("#comparisonStockCode").find("a").each(function(){
		var tmpName=$(this).text();
		var start=tmpName.indexOf("(")+1;
		var end=tmpName.indexOf(")");
		var stockCode="'"+tmpName.substring(start,end)+"'";
		allStockCodes+=stockCode+",";
	});
	allStockCodes=allStockCodes.substring(0,allStockCodes.length-1);
	return allStockCodes;
}
/**
 * 获取所有对比的股票名称
 * @returns {String}
 */
function getAllStockName(){
	var allStockNames="";
	$("#comparisonStockCode").find("li").each(function(){
		var tmpName=$(this).text();
		var end=tmpName.indexOf("(");
//		var stockName="'"+tmpName.substring(0,end)+"'";
		var stockName=tmpName.substring(0,end);
		allStockNames+=stockName+",";
	});
	allStockNames=allStockNames.substring(0,allStockNames.length-1);
	return allStockNames;
}
/**
 * 设置对比企业缓存
 */
function setLocalStorageComparis(){
	var contrasts="";
	//股票代码
	$("#comparisonStockCode").find("a").each(function(){
		var codeAndName=$(this).text();
		
		if(codeAndName!=null && codeAndName!="" && codeAndName!="undefined"){
			var startIndex=codeAndName.indexOf("(");
			var endIndex=codeAndName.indexOf(")");
			contrasts+= codeAndName.substring(startIndex+1,endIndex) + "-" + codeAndName.substring(0,startIndex) + ",";
		}
	});
	
	/*var userId=localStorage.getItem("userId");
	localStorage.setItem(userId,contrasts);*/
	
	if(contrasts == ""){
		return;
	}else{
		contrasts = contrasts.substring(0, contrasts.length - 1);
	}
	$.axs("/betaInvest/common/setUserCC.do",{cnStr:contrasts},true,function(data){
		if(data.retCode!="0000"){
			errorAlert("", data.retMsg);
		}
	});
	
	//操作中心显示的对比
	initComparisonStock();
}

/**
 * 用户对比记录
 */
function financeComparisonUser(){
	var nameS=getAllStockName();
	var tagName="";
	$("#tagName").find("a").each(function(){
		if($(this).hasClass("on")){
			tagName=$(this).text();
			return false;
		}
	});
	var dateValue="";
	$("input[name='timeBk']").each(function(){
		if($(this).next().hasClass("on")){
			dateValue=$(this).val();
			return false; //跳出循环
		}
	});
	var url="?codeS="+getAllStockCode()+"&nameS="+nameS+"&dateTimes="+dateValue+"&tagName="+tagName;
	var nameArray=nameS.split(",");
	nameArray.sort();
	var titleName="股票对比:"+nameArray.join(',');
	var stockAnalyzeComparisonId=localStorage.getItem("stockAnalyzeComparisonId");
	if(stockAnalyzeComparisonId==null || stockAnalyzeComparisonId=="" || stockAnalyzeComparisonId=="undefined"){
		addFinanceComparisonUser(url,titleName);
	}else{
		editFinanceComparisonUser(stockAnalyzeComparisonId,url,titleName);
	}
}
/**
 * 用户对比记录
 * @param url
 * @param titleName
 */
function addFinanceComparisonUser(url,titleName){
	var paramData={url:url,titleName:titleName,htmlName:"multidStockanalysisTable.html"};
	$.axs("/stock/financial/addFinanceComparisonUser.do",paramData,false,function(data){
		if(data.retCode=="0000"){
			localStorage.setItem("stockAnalyzeComparisonId",data.retData);
		}
	});
}
/**
 * 用户对比记录
 * @param id
 * @param url
 * @param titleName
 */
function editFinanceComparisonUser(id,url,titleName){
	var paramData={id:id,url:url,titleName:titleName,htmlName:"multidStockanalysisTable.html"};
	$.axs("/stock/financial/editFinanceComparisonUser.do",paramData,false,function(data){
		if(data.retCode=="0000"){
			localStorage.setItem("stockAnalyzeComparisonId",data.retData);
		}
	});
}

/**
 * 重新加载数据
 */
function loadData(){
	var pathName=location.pathname;
	if(pathName.indexOf("multidStockanalysisTable.html")>-1){
		//根据股票代码查询拥有的相同时间
		findComparisonDate();
		initAllIndicators();
	}else if(pathName.indexOf("companyComparison.html")>-1){//多指标对比
		findCompanyComparison();
	}else if(pathName.indexOf("multidStockTrendComparison.html")>-1){//指标趋势对比
		findComparisonDate();
	}else if(pathName.indexOf("multidStockRankingAnalysis.html")>-1){//指标趋势对比
		findTradeList();
	}
	if($("#comparisonStockCode li").length==4){
		$(".company_tianjia").hide();
	}else{
		$(".company_tianjia").show();
	}
}
