//财务对比三个页面公用部分
$(document).ready(function(){
	var urlName=window.location.pathname;
	var pathName=urlName.split("/")[2];
	var duibi_html='<div class="clr"></div>';
		
		//新的搜索框start
		duibi_html+='<div class="gongg_title">';
		duibi_html+='<div class="comparis_newserach">';
		duibi_html+='<i class="new_search_icon"></i>';
//		duibi_html+='<div class="yixuan_gs">';
//		duibi_html+='<span>天阳科技（<em>768965</em>）</span>';
//		duibi_html+='<i class="xuanze_shanchu"></i>';
//		duibi_html+='<div class="deleted_select" style="display: none;">';
//		duibi_html+='<span class="sc_tips">删除</span>';
//		duibi_html+='</div>';
//		duibi_html+='</div>';
		duibi_html+='<div class="news_search fl">';
		duibi_html+='<input type="text" class="js_search" id="searchNewSearinput"/>';
		duibi_html+='</div>';	
		duibi_html+='<div class="clr"></div>';
		duibi_html+='</div>';
		duibi_html+='</div>';
		
		//新的搜索框end
	
//		duibi_html+='<div class="search_new_com_box">';
//		duibi_html+='<div class="search_new_result fl">';
//		duibi_html+='<ul id="comparisonStockCode">';
//		duibi_html+='<li><a href="javascript:;">天阳科技(768965) </a><i></i></li>';
//		duibi_html+='<li><a href="javascript:;">天阳科技(768965)</a><i></i></li>';
//		duibi_html+='<li><a href="javascript:;">天阳科技(768965)</a><i></i></li>';
//		duibi_html+='</ul>';
//		duibi_html+='</div>';
//		duibi_html+='<div class="search_new_searinput fr">';
//		duibi_html+='<input type="text" id="searchNewSearinput" value="" placeholder="请输入公司名称和股票代码"/>';
//		duibi_html+='</div>';
//		duibi_html+='<div class="clr"></div>';
//		duibi_html+='</div>';
		
		
		duibi_html+='<div class="new_com_pre_a">';
		duibi_html+='<div class="new_pre_l fl">';
		duibi_html+='<a href="comprehensive.html" class="on">综合指标对比</a>';
		duibi_html+='<a href="multidStockTrendComparison.html">指标趋势对比</a>';
		duibi_html+='<a href="multidStockRankingAnalysis.html">指标行业排名对比</a>';
		duibi_html+='</div>';
		duibi_html+='<div class="new_pre_r fr">';
		duibi_html+='<a href="/contrast/companyBepthComparison.html">公司对比</a>';
		duibi_html+='</div>';
		duibi_html+='<div class="clr"></div>';	
		duibi_html+='</div>';
		$(".duibi_nav").after(duibi_html);
		if(pathName=="comprehensive.html"){
			$(".new_pre_l").find("a").removeClass("on");
			$(".new_pre_l").find("a").eq(0).addClass("on");
		}
		if(pathName=="multidStockTrendComparison.html"){
			$(".new_pre_l").find("a").removeClass("on");
			$(".new_pre_l").find("a").eq(1).addClass("on");
		}
		if(pathName=="multidStockRankingAnalysis.html"){
			$(".new_pre_l").find("a").removeClass("on");
			$(".new_pre_l").find("a").eq(2).addClass("on");
		}
		
		//初始化对比公司
		initComparisonStockHeader();
//		if($("#comparisonStockCode li").length==4){
//			$(".search_new_searinput").hide();
//		}else{
//			$(".search_new_searinput").show();
//		}
		//点击头部的公司- 删除按钮
		$(".comparis_newserach").delegate(".xuanze_shanchu","click",function(event){
			var length=$(".comparis_newserach").find(".yixuan_gs").length;
			var cnStr = $(this).prev().text(); //公司代码和简称 如：安泽电工(831945)
			var comStockCode = cnStr.substring(0, cnStr.indexOf("("));
			var comStockName = cnStr.substring(cnStr.indexOf("(") + 1, cnStr.length - 1);
//			console.log(comStockCode + "--" + comStockName)
			//删除对比公司
			removeComparisonStock(comStockCode, comStockName);
//			$(this).parent().remove();
			//$("#tipsTitle").html("温馨提示：可添加4个企业");
//			if(length==1){
				//window.open("TBfinancial.html");
//				localStorage.setItem(userId,"");
//				window.location.href="multiStockAnalysis.html";
//			}
			//console.log(length)
			//查询数据
//			loadData();
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
			event.stopPropagation();
		});
		/*信息补全开始*/
		//添加搜索股票
		$("#searchNewSearinput").autocomplete({
			minLength: 2,
			source: function(request, response) {
				findCodeNameAddShangShi(request, response);
			},
			delay: 500,
			select: function(event, ui) {
				$("#searchNewSearinput").val('');
				var flag = ui.item;
				//window.location.href = 'TBenterpriseInformation.html?codeName=' + item.code;
//				$("#comparisonStockCode").append("<li>"+item.code+"("+item.code+")"+"<li>");
//				$(".add_tc_box,.tcbackground").hide();
				//检查是否已经添加过改股票
				var isAddStockCode=false;
				$(".comparis_newserach").find("div.yixuan_gs span").each(function(){
					var codeAndName=$(this).text();
					if(codeAndName.indexOf(flag.value)>-1){
						$.zmAlert(flag.value+"已存在");
						isAddStockCode=true;
						return false;
					}
				});
				if(isAddStockCode){
					return false;
				}
				if($(".comparis_newserach .yixuan_gs").length==4){
					errorAlert("","最多可添加四个公司");
					return false;
				}
				var html='<div class="yixuan_gs" data-code="'+flag.code+'" data-name="'+flag.name+'"><span>'+flag.name+'('+flag.code+')</span><i class="xuanze_shanchu"></i></div>';
						$(".comparis_newserach").find(".news_search").eq(0).before(html);
				
				//$("#comparisonStockCode").append('<li><a target="_blank" href="/businessDetails/newTBindex.html?stockCode='+flag.code+'&stockName='+flag.name+'">'+flag.value+'</a><i></i></li>');

				//财务对比页的显示隐藏问题
				$(".yanjiu_wushuju").hide();
				$(".caiwu_comparison").show();
				$(".caiwu_comparison").show();
				$(".main_add_box").show();
				//清空数据
				$("#searchNewSearinput").val('');
				//重新加载数据
				loadData();
				addComparisonStock(flag.code,flag.name);
			},
			close:function(){
				if($("#searchNewSearinput").val().length>7){
					//清空数据
					$("#searchNewSearinput").val('');
				}
				
			}
		});
		$("#searchNewSearinput").keydown(function(event) {
			if(event.keyCode==13){
				//滚动条生效
				$(document.body).css("overflow","");
				if($("#searchNewSearinput").val() != "") {
					var val = $.trim($("#searchNewSearinput").val());
					$("#searchNewSearinput").val('');
					if(searchListAddShangshi.length != 0) {
						$.each(searchListAddShangshi, function(index, flag) {
							//console.log(val);
							if(val.indexOf(flag.code) > -1  || val.indexOf(flag.name) > -1) {
								var value=flag.name+"("+flag.code+")";
								if(value==null || value==""){
									$.zmAlert("请输入公司简称或股票编码");
									return false;
								}
								//检查是否已经添加过改股票
								var isAddStockCode=false;
								$(".comparis_newserach").find("span").each(function(){
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
								//隐藏搜索框
								if($(".comparis_newserach .yixuan_gs").length==4){
									errorAlert("","最多可添加四个公司");
									return false;
								}
//								var ind=$("#comparisonStockCode").find("li").length;
								var html='<div class="yixuan_gs" data-code="'+flag.code+'" data-name="'+flag.name+'"><span>'+flag.name+'('+flag.code+')</span><i class="xuanze_shanchu"></i></div>';
									$(".comparis_newserach").find(".news_search").eq(0).before(html);
								//$("#comparisonStockCode").append('<li><a target="_blank" href="/businessDetails/newTBindex.html?stockCode='+flag.code+'&stockName='+flag.name+'">'+value+'</a><i></i></li>');
//								$(".add_tc_box,.tcbackground").hide();
								//$("#tipsTitle").html("温馨提示：可添加"+(comparisonStockNum-$("#comparisonStockCode").find("li").length)+"个企业");
//								$(".tmtc_new").hide();
//								$(".tianjia_tc").hide();
								
//								addComparisonStock(flag.code, flag.name);
								
//								$(".tmtc_new").hide();
//								$(".tianjia_tc").hide();
								//财务对比页的显示隐藏问题
								$(".yanjiu_wushuju").hide();
								$(".caiwu_comparison").show();
								$(".caiwu_comparison").show();
								$(".main_add_box").show();
								//清空数据
								$("#searchNewSearinput").val('');
								//重新加载数据
								loadData();
								addComparisonStock(flag.code,flag.name);
							}
						});
						
					}else{
//						$.zmAlert("请输入正确的检索信息");
					}
				} else {
//					$.zmAlert("请输入要检索的信息");
				}
			}
			event.stopPropagation();
		});
//		新的搜索框开始
		$(".comparis_newserach").on("click",function(){
			$("#searchNewSearinput").focus();
			$(".comparis_newserach").addClass("on");
		})
		$("#searchNewSearinput").on("blur",function(){
			$(".comparis_newserach").removeClass("on");
		});
		$(".comparis_newserach").keydown(function(e){
		if(e.keyCode==8){
			if($("#searchNewSearinput").val()==""||$("#searchNewSearinput").val()==undefined){
				$($(".comparis_newserach .yixuan_gs")).each(function(index,item){
					if($(item).hasClass("on")){
						$(item).remove();
						removeComparisonStock($(item).attr("data-code"), $(item).attr("data-name"));
						
						var length=$(".comparis_newserach").find(".yixuan_gs").length;
						if(length==0){
//							if(pathName=="companyComparison.html"){
//								$(".duib_zanwu_shuju").show();
//								$(".db_company").hide();
//								
//							}else{
//			//					var userId=localStorage.getItem("userId");
//			//					localStorage.setItem(userId,"");
//								window.location.href="comprehensive.html";
//							}
							$(".yanjiu_wushuju").show();
							var pathName=location.pathname;
							if(pathName.indexOf("comprehensive.html")>-1){//多指标对比
								$(".caiwu_comparison").hide();
							}else if(pathName.indexOf("multidStockTrendComparison.html")>-1){//指标趋势对比
								$(".main_add_box").hide();
							}else if(pathName.indexOf("multidStockRankingAnalysis.html")>-1){//指标趋势对比
								$(".main_add_box").hide();
							}
						}
					}else{
						var len=$(".comparis_newserach .yixuan_gs").length;
						if(len==1){
							$(item).remove();
							removeComparisonStock($(item).attr("data-code"),$(item).attr("data-name"));
							var length=$(".comparis_newserach").find(".yixuan_gs").length;
							if(length==0){
//								if(pathName=="companyComparison.html"){
//									$(".duib_zanwu_shuju").show();
//									$(".db_company").hide();
//								}else{
//				//					var userId=localStorage.getItem("userId");
//				//					localStorage.setItem(userId,"");
//									window.location.href="comprehensive.html";
//								}
								$(".yanjiu_wushuju").show();
								var pathName=location.pathname;
								if(pathName.indexOf("comprehensive.html")>-1){//多指标对比
									$(".caiwu_comparison").hide();
								}else if(pathName.indexOf("multidStockTrendComparison.html")>-1){//指标趋势对比
									$(".main_add_box").hide();
								}else if(pathName.indexOf("multidStockRankingAnalysis.html")>-1){//指标趋势对比
									$(".main_add_box").hide();
								}
							}
						}else{
							$(".comparis_newserach").find(".yixuan_gs").eq(len-1).addClass("on");
						}
					}
				})
				$("#searchNewSearinput").focus();
				//重新加载数据
//				loadData();
			}
		}
		e.stopPropagation();
	})
//		新的搜索框end
		var lengths=$(".comparis_newserach .yixuan_gs").length;
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
		//comparisonStockCodeHtml+='<li><a target="_blank" href="/businessDetails/newTBindex.html?stockCode='+stockCodesSplit[i]+'&stockName='+stockNamesSplit[i]+'">'+stockNamesSplit[i]+'('+stockCodesSplit[i]+')</a><i></i></li>';
		comparisonStockCodeHtml+='<div class="yixuan_gs" data-code="'+stockCodesSplit[i]+'" data-name="'+stockNamesSplit[i]+'"><span>'+stockNamesSplit[i]+'('+stockCodesSplit[i]+')</span><i class="xuanze_shanchu"></i></div>';
	}
	$(".comparis_newserach").find(".news_search").before(comparisonStockCodeHtml);
	//$("#comparisonStockCode").html(comparisonStockCodeHtml);
	//$("#tipsTitle").html("温馨提示：可添加"+(comparisonStockNum-stockCodesSplit.length)+"个企业");
}
/**
 * 获取所有对比的股票代码
 * @returns {String}
 */
function getAllStockCode(){
	var allStockCodes="";
	$(".comparis_newserach").find("span").each(function(){
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
	$(".comparis_newserach").find("span").each(function(){
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
	$(".comparis_newserach").find("span").each(function(){
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
	var paramData={url:url,titleName:titleName,htmlName:"comprehensive.html"};
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
	var paramData={id:id,url:url,titleName:titleName,htmlName:"comprehensive.html"};
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
	if(pathName.indexOf("comprehensive.html")>-1){
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
//	if($("#comparisonStockCode li").length==4){
//		$(".search_new_searinput").hide();
//	}else{
//		$(".search_new_searinput").show();
//	}
}