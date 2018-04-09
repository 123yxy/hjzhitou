var xzCodes = ""; //所选择的股票代码逗号分隔
var myChart1Url = ""; //规模
var myChart2Url = ""; //融资
var myChart3Url = ""; //经营
var myChart4Url = ""; //市值
var myChart5Url = ""; //核心
var myChart6Url = ""; //风险
$(function(){
	//初始化头部
	initHeader();
	
	//点击显示全屏的按钮
	var num='';
	var numFor = 1;
	var flag = true;
	$(".comparison_icon b").on("click",function(){
		
		var num=$(this).attr("data-num");
		$(".backbj1").show();
		$(".swiper").show();
		//console.log(parseInt($(this).attr("data-num")))
		$(".slide_tb1").show();
//		swiper.slideTo(,1000,false);
		var swiper = new Swiper('.swiper-container', {
	        pagination: '.swiper-pagination',
//	        paginationClickable: true,
	        loop:true,
//	        initialSlide:num,
	        prevButton:'.swiper-button-prev',
			nextButton:'.swiper-button-next'
			
//			onSlideChangeStart:function(){
//				flag = false;
//			},
//			onSlideChangeEnd:function(swiperNum){
//				flag = true;
//			}
	   });
	   $(".swiper-button-prev").click(function(e){
			if(flag){
				numFor--;
				numFor = (numFor == 0 ? 6 : numFor);
				if(numFor == 6){
					swiper.slideTo(numFor,0,false);
				}
			}
			e.stopPropagation();
		})
		
		$(".swiper-button-next").click(function(e){
			if(flag){
				numFor++;
				numFor = (numFor == 7 ? 1 : numFor);
				if(numFor == 1){
					swiper.slideTo(numFor,0,false);
				}
			}
			e.stopPropagation();
		})
		numFor = num;
	   
	    if(num=="1"){
	    	$(".swiper-wrapper").css("transform"," translate3d(-1300px, 0px, 0px)");
	    }else if(num=="2"){
	    	swiper.slideTo(2,0,false);
	    }else if(num=="3"){
	    	swiper.slideTo(3,0,false);
	    }else if(num=="4"){
	    	swiper.slideTo(4,0,false);
	    }else if(num=="5"){
	    	swiper.slideTo(5,0,false);
	    }else if(num=="6"){
	    	swiper.slideTo(6,0,false);
	    }

	})
	
	
	//点击弹窗的删除按钮
	$("body").delegate(".slide_titles i","click",function(){
		$(".backbj1").hide();
		$(".swiper").hide();
		$("body,html").css("overflow","auto");
	})
	//点击导出的小图标
	$(".duibi_daochu").on("mouseover",function(){
		$(this).find(".daochu_xiala").stop().slideDown();
	})
	$(".duibi_daochu").on("mouseout",function(){
		$(this).find(".daochu_xiala").stop().slideUp();
	})
	//点击其他地方关闭下拉框
	$(document).bind("mousedown",function(event){
		var $target=$(event.target);
		if(!($target.parents().andSelf().is(".daochu_xiala"))){
			if($(".daochu_xiala").css("display")=="block"){
				$(".daochu_xiala").hide();
			}
		}
	})
	//点击融资信息的投资方显示弹窗
	$("body").delegate(".gs_tzf","click",function(){
		$(".backbj").show();
		$(".ck_touzifang").show();
		$("body,html").css("overflow","hidden");
		loadInvestorData($(this).attr("data-code"), $(this).attr("data-name"), $(this).attr("data-date"));
	})
	
	//点击查看投资方的关闭按钮
	$(".ck_touzifang i").on("click",function(){
		$(".backbj").hide();
		$(".ck_touzifang").hide();
		$("body,html").css("overflow","auto");
	})
	//点击经营异常的数据显示对应的信息
	$("body").delegate(".yichang_jy","click",function(){
		$(".backbj").show();
		$(".fengxin_tc1").show();
		$("body,html").css("overflow","hidden");
		//查询异常明细
		businessRisk($(this).attr("data-type"), $(this).attr("data-code"), $(this).attr("data-name"));
	})
	//行政处罚的弹窗
	$("body").delegate(".chufa","click",function(){
		$(".backbj").show();
		$(".fengxin_tc2").show();
		$("body,html").css("overflow","hidden");
		//查询异常明细
		businessRisk($(this).attr("data-type"), $(this).attr("data-code"), $(this).attr("data-name"));
	})
	//严重违纪的弹窗
	$("body").delegate(".weiji","click",function(){
		$(".backbj").show();
		$(".fengxin_tc3").show();
		$("body,html").css("overflow","hidden");
		//查询异常明细
		businessRisk($(this).attr("data-type"), $(this).attr("data-code"), $(this).attr("data-name"));
	})
	//点击异常信息查看的关闭按钮
	$(".gs_fx_infor i").on("click",function(){
		$(".backbj").hide();
		$(this).parent().parent().hide();
		$("body,html").css("overflow","auto");
	})
	//点击数据和图表的切换
	$(".comparis_company_types").delegate(".comparison_types>span","click",function(){
		$(this).addClass("on").siblings().removeClass("on");
		var text=$(this).text();
		if(text=='数据'){
			$(this).parent().next().find(".comparison_information").show();
			$(this).parent().next().find(".guimo_duibi").hide();	
		}else if(text=='图表'){
			var num = $(this).parent().prev().children(".comparison_icon").children("b").attr("data-num");
			$(this).parent().next().find(".comparison_information").hide();
			$(this).parent().next().find(".guimo_duibi").show();
			if(num == 1){ //公司规模
				companySizeData();
			}else if(num == 2){ //融资
				financingData();
			}else if(num == 3){ //经营
				productData();
			}else if(num == 4){ //市值
				marketData();
			}else if(num == 5){ //核心
				coreData();
			}else if(num == 6){ //风险
				riskData();
			}
		}
	})
	
	//***********************割***********************
	

	
	/**
	 * 导出数据
	 */
	$("[name='outExcel']").click(function(){
		if(xzCodes != ""){
			var formatCodes = formatCode(xzCodes.substring(0, xzCodes.length - 1));
			location.href = "/betaInvest/companyContrast/"+$(this).attr("data-interface")+".do?stockCodes=" + formatCodes.substring(0, formatCodes.length - 1);
		}else{
			$.zmAlert("没有要导出的数据");
		}
	})
	
	/**
	 * 导出图片
	 */
	$("[name='outPic']").click(function(){
		if(xzCodes != ""){
			var base64Url = "";
			var fileName = "";
			if($(this).attr("data-num") == 1){
				base64Url = myChart1Url;
				fileName = "公司规模对比";
			}else if($(this).attr("data-num") == 2){
				base64Url = myChart2Url;
				fileName = "融资信息对比";
			}else if($(this).attr("data-num") == 3){
				base64Url = myChart3Url;
				fileName = "经营信息对比";
			}else if($(this).attr("data-num") == 4){
				base64Url = myChart4Url;
				fileName = "公司市值对比";
			}else if($(this).attr("data-num") == 5){
				base64Url = myChart5Url;
				fileName = "核心数据对比";
			}else if($(this).attr("data-num") == 6){
				base64Url = myChart6Url;
				fileName = "风险信息对比";
			}

			if(base64Url != ""){
				var body = $(document.body),
	            form = $("<form method='post'></form>"),
	            input;
		        form.attr({"action":"/betaInvest/common/exportPic.do"});
		        
		        input = $("<input type='hidden'>");
		        input.attr({"name":"fileName"});
		        input.val(fileName);
		        form.append(input);
		        
		        input = $("<input type='hidden'>");
		        input.attr({"name":"base64Str"});
		        input.val(base64Url);
		        form.append(input);
	
		        form.appendTo(document.body);
		        form.submit();
		        document.body.removeChild(form[0]);
			}else{
				$.zmAlert("没有要导出的数据");
			}
	        
		}else{
			$.zmAlert("没有要导出的数据");
		}
	})
	
	/*信息补全开始
	//首页顶部搜索
	$("#searchCode").autocomplete({
		minLength: 2,
		source: function(request, response) {
			findCodeName(request, response);
		},
		delay: 500,
		select: function(event, ui) {
			var item = ui.item;
			if($("#searchCode").val() != "") {
				var value=item.value;
				var code=value.substring(value.indexOf("(")+1,value.indexOf(")"));
				var name=value.substring(0,value.indexOf("("));
				addDBGS(code, name);
//				addUserStockChart(code,name);
			} else {
				$.zmAlert("请输入要检索的信息");
			}
//			$("#ui-id-2").hide();
		},
		close: function(event, ui){
			$("#searchCode").val("");
		}
	});
	信息补全结束*/
//	新的搜索框start
	$("#newSearchers").autocomplete({
		minLength: 2,
		source: function(request, response) {
			findCodeNameAddShangShi(request, response);
		},
		delay: 500,
		select: function(event, ui) {
			var item = ui.item;
			if($("#newSearchers").val() != "") {
				var value=item.value;
				var code=value.substring(value.indexOf("(")+1,value.indexOf(")"));
				var name=value.substring(0,value.indexOf("("));
				searchesList(code,name);
//				addDBGS(code, name);				
//				addUserStockChart(code,name);
			} else {
				$.zmAlert("请输入要检索的信息");
			}
//			$("#ui-id-2").hide();
		},
		close: function(event, ui){
			if($("#newSearchers").val().length>7){
				$("#newSearchers").val("")
			}
		}
	});
	//点击已选择的公司
	$(".comparis_newserach").delegate(".yixuan_gs","click",function(event){
		$(this).addClass("on").siblings().removeClass("on");
		event.stopPropagation();
	})
//	$(".comparis_newserach").delegate(".yixuan_gs","contextmenu",function(event){
//		return false;
//	})
	//右键删除显示删除框
//	$(".comparis_newserach").delegate(".yixuan_gs","mousedown",function(event){
//		if(event.which==3){
//			$(this).addClass("on");
//			$(this).siblings().removeClass("on");
//			$(this).find(".deleted_select").show();
//			$(this).siblings().find(".deleted_select").hide();
//		}
//		event.stopPropagation();
//	})
	//点击删除框里的删除
	$(".comparis_newserach").delegate(".xuanze_shanchu","click",function(){
		//调用删除的函数
		$(this).parent().remove();
		delXZCompany($(this).parent().attr("data-code"), $(this).parent().attr("data-name"));
	})
	
	$(".comparis_newserach").on("click",function(){
		$("#newSearchers").focus();
		$(".comparis_newserach").addClass("on");
	})
	$("#newSearchers").on("blur",function(){
		$(".comparis_newserach").removeClass("on");
	});
	$(".comparis_newserach").keydown(function(e){
		if(e.keyCode==8){
			if($("#newSearchers").val()==""||$("#newSearchers").val()==undefined){
				$($(".comparis_newserach .yixuan_gs")).each(function(index,item){
					if($(item).hasClass("on")){
						$(item).remove();
						delXZCompany($(item).attr("data-code"), $(item).attr("data-name"));
					}else{
						var len=$(".comparis_newserach .yixuan_gs").length;
						if(len==1){
							$(item).remove();
							delXZCompany($(item).attr("data-code"), $(item).attr("data-name"));
						}else{
							$(".comparis_newserach").find(".yixuan_gs").eq(len-1).addClass("on");
						}
					}
				})
				$("#newSearchers").focus();
			}
		}
		e.stopPropagation();
	})
//	新的搜索框end
	
})

//初始化头部
function initHeader(){
	var stockInfo = findContrastCompany();
	console.log(stockInfo)
	$(".public_header span").remove();
	xzCodes = "";
	if(stockInfo != ""){
		$(stockInfo.split(",")).each(function(i, item){
			searchesList(item.split("-")[0], item.split("-")[1], 0);
		})
	}
	//初始化数据
	initData();
}

/**
 * 添加对比的公司标签
 * @param stockCode
 * @param stockName
 */
function addDBGS(stockCode, stockName, type){
	if(xzCodes.split(",").length <= 4){ //有个一为空所以多判断一个
		
		if($.inArray(stockCode,xzCodes.split(",")) == -1){
			var dbHtml = "<span>"+stockName+"（<em>"+stockCode+"</em>）<i data-code="+stockCode+" data-name="+stockName+" ></i></span>";
			$("#searchCode").before(dbHtml);
			xzCodes += stockCode + ",";
			
			if(type != 0){
				//初始化信息
				initData();
				//添加对比公司
				addComparisonStock(stockCode, stockName);
			}
			
			//删除选择的公司
			$(".public_header span i").click(function(){
				xzCodes = xzCodes.replace($(this).prev().text() + ",", "");
				$(this).parent().remove();
				//初始化信息
				initData();
				
				//删除对比公司
				removeComparisonStock($(this).attr("data-code"), $(this).attr("data-name"));
			})
		}
		
	}else{
		$.zmAlert("最多选择四家公司");
	}
}

/**
 * 初始化数据
 */
function initData(){
//	codes = ((codes == undefined) ? xzCodes : codes);
//	console.log("进行初始化")
	if(xzCodes != ""){
		//基础信息
		basicData();
		
		//公司规模
		companySizeData();
		
		//融资信息
		financingData();
		
		//经营信息
		productData();
		
		//市值信息
		marketData();
		
		//核心信息
		coreData();
		
		//经营风险信息
		riskData();
	}else{
//		console.log("进行暂无数据")
		//基础信息
		$("#zbmcTable").html("<tr><td></td></tr>");
		$("#dataTbody").html("<tr><td colspan='11'><span class='ZWSJ' >暂无数据</span></td></tr>");
		
		//公司规模
		$("#companySizeUpdateTime").text("--");
		$("#duibi_tux1").html("<div class='biaoge_wushuju' ><div class='wushuju_img'></div><p>暂无数据</p></div>");
		$("#slide_tb1").html("<div class='biaoge_wushuju' ><div class='wushuju_img'></div><p>暂无数据</p></div>");
		$("[name='companySizeHead']").html("<tr><td></td></tr>");
		$("[name='companySizeTBody']").html("<tr><td colspan='3'><span class='ZWSJ' >暂无数据</span></td></tr>");
		
		//融资信息
		$("#financingUpdateTime").text("--");
		$("#duibi_tux2").html("<div class='biaoge_wushuju' ><div class='wushuju_img'></div><p>暂无数据</p></div>");
		$("#slide_tb2").html("<div class='biaoge_wushuju' ><div class='wushuju_img'></div><p>暂无数据</p></div>");
		$("[name='financingHead']").html("<tr><td></td></tr>");
		$("[name='financingBody']").html("<tr><td colspan='4'><span class='ZWSJ' >暂无数据</span></td></tr>");
		
		//经营信息
		$("#productUpdateTime").text("--");
		$("#duibi_tux3").html("<div class='biaoge_wushuju' ><div class='wushuju_img'></div><p>暂无数据</p></div>");
		$("#slide_tb3").html("<div class='biaoge_wushuju' ><div class='wushuju_img'></div><p>暂无数据</p></div>");
		$("[name='productHead']").html("<tr><td></td></tr>");
		$("[name='productBody']").html("<tr><td colspan='4'><span class='ZWSJ' >暂无数据</span></td></tr>");
		
		//市值信息
		$("#marketUpdateTime").text("--");
		$("#duibi_tux4").html("<div class='biaoge_wushuju' ><div class='wushuju_img'></div><p>暂无数据</p></div>");
		$("#slide_tb4").html("<div class='biaoge_wushuju' ><div class='wushuju_img'></div><p>暂无数据</p></div>");
		$("[name='marketHead']").html("<tr><td></td></tr>");
		$("[name='marketBody']").html("<tr><td colspan='4'><span class='ZWSJ' >暂无数据</span></td></tr>");
		
		//核心信息
		$("#coreUpdateTime").text("--");
		$("#duibi_tux5").html("<div class='biaoge_wushuju' ><div class='wushuju_img'></div><p>暂无数据</p></div>");
		$("#slide_tb5").html("<div class='biaoge_wushuju' ><div class='wushuju_img'></div><p>暂无数据</p></div>");
		$("[name='coreHead']").html("<tr><td></td></tr>");
		$("[name='coreBody']").html("<tr><td colspan='6'><span class='ZWSJ' >暂无数据</span></td></tr>");
		
		//经营风险信息
		$("#riskUpdateTime").text("--");
		$("#duibi_tux6").html("<div class='biaoge_wushuju' ><div class='wushuju_img'></div><p>暂无数据</p></div>");
		$("#slide_tb6").html("<div class='biaoge_wushuju' ><div class='wushuju_img'></div><p>暂无数据</p></div>");
		$("[name='riskHead']").html("<tr><td></td></tr>");
		$("[name='riskBody']").html("<tr><td colspan='3'><span class='ZWSJ' >暂无数据</span></td></tr>");
	}
	
}

//基础信息
function basicData(){
	var searchCode = "";
	if(xzCodes != ""){
		searchCode = xzCodes.substring(0, xzCodes.length - 1);
	}
	searchCode = formatCode(searchCode);
	$.axs("/betaInvest/companyContrast/findBasisContrast.do",
			{stockCodes:searchCode.substring(0, searchCode.length - 1)}, false,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result == null){
				return false;
			}
			
			var bodyHtml = "";
			var headHtml = "";
			$(result).each(function(i, item){ //列表数据
				bodyHtml += "<tr>" +
								"<td>"+ (item.registrationDate == null || item.registrationDate == "" ? "--" : item.registrationDate) +"</td>" +
								"<td>"+ (item.dateOfListing == null || item.dateOfListing == "" ? "--" : item.dateOfListing) +"</td>" +
								"<td>"+ (item.stockBlock == null || item.stockBlock == "" ? "--" : item.stockBlock) +"</td>" +
								"<td>"+ (item.industryName == null || item.industryName == "" ? "--" : item.industryName) +"</td>" +
								"<td>"+ (item.registeredAddress == null || item.registeredAddress == "" ? "--" : item.registeredAddress) +"</td>" +
								"<td>"+ (item.registeredCapital == null || (item.registeredCapital == "" && item.registeredCapital != 0) ? "--" : (parseInt(item.registeredCapital)/10000).toFixed(2)) +"</td>" +
								"<td>"+ (item.generalCapital == null || (item.generalCapital == "" && item.generalCapital != 0) ? "--" : item.generalCapital.toFixed(2)) +"</td>" +
								"<td>"+ (item.legalPerson == null || item.legalPerson == "" ? "--" : item.legalPerson) +"</td>" +
								"<td>"+ (item.staffNumber == null || (item.staffNumber == "" && item.staffNumber != 0) ? "--" : item.staffNumber) +"</td>" +
								"<td>"+ (item.guanLi == null || (item.guanLi == "" && item.guanLi != 0) ? "--" : item.guanLi) +"</td>" +
								"<td>"+ (item.lvShi == null || item.lvShi == "" ? "--" : item.lvShi) +"</td>" +
								"<td>"+ (item.kuaiJi == null || item.kuaiJi == "" ? "--" : item.kuaiJi) +"</td>" +
							"</tr>";
				var hrefStr = "javascript:;";
				if(isXSBCompany(item.stockCode)){ //判断是否为新三板公司
					hrefStr = '/businessDetails/newTBindex.html?stockCode='+item.stockCode+'&stockName='+item.stockName;
				}
				headHtml += "<tr>" +
									"<td>" +
										"<a href="+hrefStr+">"+item.stockName+"（<em>"+item.stockCode+"</em>）</a>" +
									"</td>" +
								"</tr>";
				
			})
			
			if(headHtml == ""){
				$("#zbmcTable").html("<tr><td></td></tr>");
				$("#dataTbody").html("<tr><td colspan='11'><span class='ZWSJ' >暂无数据</span></td></tr>");
			}else{
				$("#zbmcTable").html(headHtml);
				$("#dataTbody").html(bodyHtml);
			}
			
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

/**
 * 公司规模
 */
function companySizeData(){
	var searchCode = "";
	if(xzCodes != ""){
		searchCode = xzCodes.substring(0, xzCodes.length - 1);
	}else{
		return false;
	}
	searchCode = formatCode(searchCode);
	$.axs("/betaInvest/companyContrast/findScaleContrast.do",
			{stockCodes:searchCode.substring(0, searchCode.length - 1)}, true,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result == null){
				return false;
			}
			
			$("#companySizeUpdateTime").text((result.latestTime == null || result.latestTime == "") ? "--" : result.latestTime);
			
			//表格变量开始
			var sizeBodyHtml = ""; //表格数据
			var sizeHeadHtml = ""; //表格头部信息（第一列）
			//表格变量结束
			
			//图表变量开始
			var companySizeData = []; //图表数据
			var legendData = [];
			var json = {}; //对象
			var dd = []; //数据
			//图表变量结束
			$(result.dataList).each(function(i, item){ //列表数据
				sizeBodyHtml += "<tr>" +
										"<td>"+ (item.staffNumber == null || (item.staffNumber == "" && item.staffNumber != 0) ? "--" : item.staffNumber) +"</td>" +
										"<td>"+ (item.yingyeshouru == null || (item.yingyeshouru == "" && item.yingyeshouru != 0) ? "--" : item.yingyeshouru.toFixed(2)) +"</td>" +
										"<td>"+ (item.zichanzonge == null || (item.zichanzonge == "" && item.zichanzonge != 0) ? "--" : item.zichanzonge.toFixed(2)) +"</td>" +
									"</tr>";
				
				var hrefStr = "javascript:;";
				if(isXSBCompany(item.stockCode)){ //判断是否为新三板公司
					hrefStr = '/businessDetails/newTBindex.html?stockCode='+item.stockCode+'&stockName='+item.stockName;
				}
				sizeHeadHtml += "<tr>" +
									"<td>" +
										"<a href="+hrefStr+">"+item.stockName+"（<em>"+item.stockCode+"</em>）</a>" +
									"</td>" +
								"</tr>";
				
				//图表
				json = {};
				dd = [];
				
				dd.push(item.staffNumber == null || item.staffNumber == "" ? 0 : item.staffNumber);
				dd.push(item.yingyeshouru == null || item.yingyeshouru == "" ? 0 : item.yingyeshouru.toFixed(2));
				dd.push(item.zichanzonge == null || item.zichanzonge == "" ? 0 : item.zichanzonge.toFixed(2));
				json.name = item.stockName;
				json.data = dd;
				json.index = i;
				
				legendData.push(item.stockName);
				companySizeData.push(json);
			})

			if(legendData.length > 0){
				//加载图表
				CompanySizeComparison(legendData, companySizeData);
			}else{
				$("#duibi_tux1").html("<div class='biaoge_wushuju' ><div class='wushuju_img'></div><p>暂无数据</p></div>");
				$("#slide_tb1").html("<div class='biaoge_wushuju' ><div class='wushuju_img'></div><p>暂无数据</p></div>");
			}
			
			//加载表格
			
			if(sizeHeadHtml == ""){
				$("[name='companySizeHead']").html("<tr><td></td></tr>");
				$("[name='companySizeTBody']").html("<tr><td colspan='3'><span class='ZWSJ' >暂无数据</span></td></tr>");
			}else{
				$("[name='companySizeHead']").html(sizeHeadHtml);
				$("[name='companySizeTBody']").html(sizeBodyHtml);
			}
			
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

//公司规模对比的柱状图
function CompanySizeComparison(legendData, chartData){
	var myChart1 = echarts.init(document.getElementById('duibi_tux1'));
	var myCharts1=echarts.init(document.getElementById('slide_tb1'));
	var color=['#62a6f2','#55c2f4','#ae90db','#909edb'];
	option = {
		animation:false,
	    tooltip: {
	        trigger: 'axis',
	        show:true,  
	        formatter: function(params) {
            	//console.log(params)
            	var content='';
            	$(params).each(function(index,item){
            		var bgc=color[index];
            		content+='<div class="sb_tips_content">';
	    			content+='<span class="tips_leibie fl"  style="background:'+bgc+';">'+item.seriesName+'</span>';
	    			content+='<span class="tips_leibie_num fl">'+item.value+'</span>';
	    			content+='<div class="clr"></div>';
	    			content+='</div>';
            	})
      	    	var divHtml='<div class="sanban_tips">'+
	    					'<p class="sb_tips_title">'+params[0].name+'</p>'+content+'</div>';
                return divHtml;
	        }
	    },
	    color:color,
	   legend:{
//	    	show:true,
	    	data:legendData/*['天阳科技','中科软','中科招商','天合一众']*/
	    },
	    toolbox: {
	       /* feature: {
	           
	            saveAsImage: {
	            	title:'保存图片',
		            icon:'image:///saasBeta/images/ave.png'
								
	            }
	        },*/
	        top:0,
	        right:'8%',
	    },
	    title:{
//	    	text:"累计融资金额",
	    	textStyle:{
	    		fontSize:'14px',
	    		color:"#4c4c4c"
	    	}
	    },
	    xAxis: [
	        {
	            type: 'category',
	            boundaryGap:true,
	            data: ['从业人员','营业收入（万元）','资产总额（万元）'],
	        	//data:dateTemp
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value',
	            
	            //name: '累计融资金额(亿)',
	            axisLabel: {
	                formatter: '{value}'
	            }
	        }
	    ],
	     grid: {
	        left: '3%',
	        right: '1%',
	        containLabel: true
	    },
	   dataZoom:[
	    	 {
	            show: true,
	            realtime: true,
	            start: 0,
	            end: 100
	        },
	        {
	            type: 'inside',
	            realtime: true,
	            start:0,
	            end: 100
	        }
	    	
	    ],

	    series: [
	        /*{
	            name:'天阳科技',
	            type:'bar',
	            barWidth: '30',
	            itemStyle:{
					normal:{
						color:'#62a6f2'
					},
					emphasis:{
	                	color:"#4a8ad3"//鼠标放到柱形图上显示的颜色
	                }
				},
	            data:[2.0, 4.9, 7.0],
	        	//data:tradingVolume,
	        	label:{
	        		normal:{
	        			show:true,
	        			position:"top"
	        		}
	        	}
	        }*/
	    ]
	};
	
	$(chartData).each(function(i, item){
		var series = {
			            name:item.name,
			            type:'bar',
			            barWidth: '30',
			            data:item.data,
			        	//data:tradingVolume,
			        	label:{
			        		normal:{
			        			show:true,
			        			position:"top"
			        		}
			        	}
			        };
		option.series.push(series);
	})
	
	myChart1.setOption(option);
	window.addEventListener("resize",function(){
                   myChart1.resize();
                });	
     myCharts1.setOption(option);
	window.addEventListener("resize",function(){
                   myCharts1.resize();
                });	
	
	myChart1Url = myChart1.getDataURL("png");
}

/**
 * 融资信息
 */
function financingData(){
	var searchCode = "";
	if(xzCodes != ""){
		searchCode = xzCodes.substring(0, xzCodes.length - 1);
	}else{
		return false;
	}
	searchCode = formatCode(searchCode);
	$.axs("/betaInvest/companyContrast/findFinancingContrast.do",
			{stockCodes:searchCode.substring(0, searchCode.length - 1)}, true,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result == null){
				return false;
			}
			$("#financingUpdateTime").text((result.latestTime == null || result.latestTime == "") ? "--" : result.latestTime);
			
			//图表变量开始
			var financingData = []; //图表数据
			var legendData = [];
			var json = {}; //对象
			var dd = []; //数据
			//图表变量结束
			$(result.dataList).each(function(i, item){ //列表数据
				//图表
				json = {};
				dd = [];
				
				dd.push(item.zonge == null || item.zonge == "" ? 0 : item.zonge.toFixed(2));
				dd.push(item.ciShu == null || item.ciShu == "" ? 0 : item.ciShu);
				dd.push(item.raisePrice == null || item.raisePrice == "" ? 0 : item.raisePrice.toFixed(2));
				json.name = item.stockName;
				json.data = dd;
				
				legendData.push(item.stockName);
				financingData.push(json);
			})
			
			if(legendData.length > 0){
				//加载图表
				financingInformationComparison(legendData, financingData);
			}else{
				$("#duibi_tux2").html("<div class='biaoge_wushuju' ><div class='wushuju_img'></div><p>暂无数据</p></div>");
				$("#slide_tb2").html("<div class='biaoge_wushuju' ><div class='wushuju_img'></div><p>暂无数据</p></div>");
			}
			
			//加载表格
			var bodyHtml = ""; //表格数据
			var headHtml = ""; //表格头部信息（第一列）
			$(result.tableList).each(function(i, item){
				bodyHtml += "<tr>" +
								"<td>"+ (item.fangShi == null || item.fangShi == "" ? "--" : item.fangShi) +"</td>" +
								"<td>"+ (item.dateTime == null || item.dateTime == "" ? "--" : item.dateTime) +"</td>" +
								"<td>"+ (item.raisePrice == null || (item.raisePrice == "" && item.raisePrice != 0) ? "--" : (item.raisePrice.toFixed(2) + "百万")) +"</td>" +
								"<td>"+ (item.privatePrice == null || (item.privatePrice == "" && item.privatePrice != 0) ? "--" : item.privatePrice.toFixed(2)) +"</td>" +
								"<td>"+ (item.privateNum == null || (item.privateNum == "" && item.privateNum != 0) ? "--" : (item.privateNum.toFixed(2) + "万股")) +"</td>" +
								"<td><span class='gs_tzf' data-name="+item.stockName+" data-code="+item.stockCode+" data-date="+item.dateTime+" >投资方</span></td>" +
							"</tr>";
				
				var hrefStr = "javascript:;";
				if(isXSBCompany(item.stockCode)){ //判断是否为新三板公司
					hrefStr = '/businessDetails/newTBindex.html?stockCode='+item.stockCode+'&stockName='+item.stockName;
				}
				headHtml += "<tr>" +
								"<td>" +
									"<a href="+hrefStr+">"+item.stockName+"（<em>"+item.stockCode+"</em>）</a>" +
								"</td>" +
							"</tr>";
			})
			if(headHtml == ""){
				$("[name='financingHead']").html("<tr><td></td></tr>");
				$("[name='financingBody']").html("<tr><td colspan='4'><span class='ZWSJ' >暂无数据</span></td></tr>");
			}else{
				$("[name='financingHead']").html(headHtml);
				$("[name='financingBody']").html(bodyHtml);
			}
			
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

/**
 * 加载投资方信息
 */
function loadInvestorData(stockCode, stockName, noticeDate){
	$("#tzrTCHead").html(stockName + "<em>（"+stockCode+"）</em>");
	$.axs("/betaInvest/companyContrast/findInvestorList.do",
			{stockCode:stockCode, noticeDate:noticeDate}, true,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result == null){
				return false;
			}
			var bodyHtml = ""; //表格数据
			$(result).each(function(i, item){ //列表数据
				bodyHtml += "<tr>" +
								"<td>"+ (item.investNumber == null || (item.investNumber == "" && item.investNumber != 0) ? "--" : item.investNumber.toFixed(2)) +"</td>" +
								"<td>"+ (item.sharePrice == null || (item.sharePrice == "" && item.sharePrice != 0) ? "--" : item.sharePrice.toFixed(2)) +"</td>" +
								"<td>"+ (item.investSum == null || (item.investSum == "" && item.investSum != 0) ? "--" : item.investSum.toFixed(2)) +"</td>" +
								"<td>"+ (item.investorsName == null || item.investorsName == "" ? "--" : item.investorsName) +"</td>" +
							"</tr>";
			})
			
			if(bodyHtml == ""){
				$("#investorBody").html("<tr><td colspan='4'>暂无数据</td></tr>");
			}else{
				$("#investorBody").html(bodyHtml);
			}
			
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}
//融资信息对比
function financingInformationComparison(legendData, chartData){
	var myChart2 = echarts.init(document.getElementById('duibi_tux2'));
	var myCharts2 = echarts.init(document.getElementById('slide_tb2'));	
	var color=['#62a6f2','#55c2f4','#ae90db','#909edb'];
	option = {
		animation:false,
	    tooltip: {
	        trigger: 'axis',
	        show:true,
	        formatter: function(params) {
          	  	var content='';
            	$(params).each(function(index,item){
            		var bgc=color[index];
            		content+='<div class="sb_tips_content">';
	    			content+='<span class="tips_leibie fl"  style="background:'+bgc+';">'+item.seriesName+'</span>';
	    			content+='<span class="tips_leibie_num fl">'+item.value+'</span>';
	    			content+='<div class="clr"></div>';
	    			content+='</div>';
            	})
      	    	var divHtml='<div class="sanban_tips">'+
	    					'<p class="sb_tips_title">'+params[0].name+'</p>'+content+'</div>';
                return divHtml;

	        }
	    },
	    color:color,
	   legend:{
//	    	show:true,
	    	data:legendData
	    },
	    toolbox: {
	        /*feature: {
	           
	            saveAsImage: {
	            	title:'保存图片',
		            icon:'image:///saasBeta/images/ave.png'
								
	            }
	        },*/
	        top:0,
	        right:'8%',
	    },
	    title:{
//	    	text:"累计融资金额",
	    	textStyle:{
	    		fontSize:'14px',
	    		color:"#4c4c4c"
	    	}
	    },
	    xAxis: [
	        {
	            type: 'category',
	            boundaryGap:true,
	            data: ['融资金额（百万）','融资次数','最近一次融资金额（百万）'],
	        	//data:dateTemp
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value',
	            //name: '累计融资金额(亿)',
	            axisLabel: {
	                formatter: '{value}'
	            }
	        }
	    ],
	     grid: {
	        left: '3%',
	        right: '1%',
	        containLabel: true
	    }/*,
	    dataZoom:[
	    	 {
	            show: true,
	            realtime: true,
	            start: 0,
	            end: 20
	        },
	        {
	            type: 'inside',
	            realtime: true,
	            start:0,
	            end: 20
	        }
	    	
	    ]*/,

	    series: [/*
	        {
	            name:'天阳科技',
	            type:'bar',
	            barWidth: '30',
	            itemStyle:{
					normal:{
						color:'#62a6f2'
					},
					emphasis:{
	                	color:"#4a8ad3"//鼠标放到柱形图上显示的颜色
	                }
				},
	            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
	        	//data:tradingVolume,
	        	label:{
	        		normal:{
	        			show:true,
	        			position:"top"
	        		}
	        	}
	        }
	    */]
	};
	
	$(chartData).each(function(i, item){
		var series = {
	            name:item.name,
	            type:'bar',
	            barWidth: '30',
	            data:item.data,
	        	//data:tradingVolume,
	        	label:{
	        		normal:{
	        			show:true,
	        			position:"top"
	        		}
	        	}
	        };
		option.series.push(series);
	})
	myChart2.setOption(option);
	window.addEventListener("resize",function(){
       myChart2.resize();
    });	
    myCharts2.setOption(option);
	window.addEventListener("resize",function(){
       myCharts2.resize();
    });
	
	myChart2Url = myChart2.getDataURL("png");
}

//经营信息
function productData(){
	var searchCode = "";
	if(xzCodes != ""){
		searchCode = xzCodes.substring(0, xzCodes.length - 1);
	}else{
		return false;
	}
	searchCode = formatCode(searchCode);
	$.axs("/betaInvest/companyContrast/findProductContrast.do",
			{stockCodes:searchCode.substring(0, searchCode.length - 1)}, true,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result == null){
				return false;
			}
			$("#productUpdateTime").text((result.latestTime == null || result.latestTime == "") ? "--" : result.latestTime);
			
			//表格变量开始
			var bodyHtml = ""; //表格数据
			var headHtml = ""; //表格头部信息（第一列）
			//表格变量结束
			
			//图表变量开始
			var productData = []; //图表数据
			var legendData = [];
			var json = {}; //对象
			var dd = []; //数据
			var color = [];
			var wz = [];
			var companyColor = ["98,166,242", "85,194,244", "174,144,219", "144,158,219"]; //公司的颜色
			var colorTMD = [".9", ".8", ".7", ".6", ".5"]; //颜色的透明度
			var companyWZ = [['30%', '30%'],['70%', '30%'],['30%', '80%'],['70%', '80%']]; //饼图的位置
			//图表变量结束
			if(searchCode != ""){
				var codeArr = []; //公司代码集合
				var codeData = []; //公司的数据
				var listData = result.dataList; //所有的公司数据对象
//				console.log(listData)
				codeArr = xzCodes.substring(0, xzCodes.length - 1).split(",");
				var codeNum = 0;
				for(var li in listData){
					if(listData[li] != null && listData[li] != undefined && listData[li].length > 0){
						codeNum++;
					}
				}
				
				if(codeNum == 1){
					companyWZ = [['50%', '50%']];
				}else if(codeNum == 2){
					companyWZ = [['30%', '50%'],['70%', '50%']];
				}else if(codeNum == 3){
					companyWZ = [['30%', '30%'],['70%', '30%'],['30%', '70%']];
				}
				
				var j = 0;
//				var j = 0; j < codeArr.length; j++
				for (var code in listData) {
					codeData = listData[code];
					var stockName = "";
					var productName = ""; //产品名称
					var amountMoneyNum = 0; //金额
					var proportion = 0; //比例占比
					if(codeData != null && codeData.length > 0){
						productName = ""; //产品名称
						amountMoneyNum = 0; //金额
						proportion = 0; //比例占比
						
						//图表
						json = {};
						dd = [];
//						color = [];
						wz = [];
						$(codeData).each(function(i, item){ //公司产品数据
							var itemStyle={
							            	normal:{
							            		color:["rgba("+companyColor[j]+","+colorTMD[i]+")"]
							            	}
							           };
							stockName = item.stockName;
							productName += (item.productName == null || item.productName == "" ? "--" : item.productName) + "、";
							amountMoneyNum += (item.amountMoney == null || item.amountMoney == "" ? 0 : item.amountMoney);
							proportion += (item.proportion == null || item.proportion == "" ? 0 : item.proportion);
							
							dd.push({
									value: (item.amountMoney == null || item.amountMoney == "" ? 0 : item.amountMoney),
									name: (item.productName == null || item.productName == "" ? "--" : item.productName),
									itemStyle:itemStyle
								});
//							color.push("rgba("+companyColor[j]+","+colorTMD[i]+")");
						})
						json.name = stockName;
						json.data = dd;
//						json.color = color;
						json.wz = companyWZ[j];
						
						legendData.push(stockName);
						productData.push(json);
						
						productName = productName.substring(0, productName.length - 1);
						if(codeData != null && codeData != undefined && codeData.length > 0){
							var hrefStr = "javascript:;";
							if(isXSBCompany(code)){ //判断是否为新三板公司
								hrefStr = '/businessDetails/newTBindex.html?stockCode='+code+'&stockName='+stockName;
							}
							headHtml += "<tr>" +
											"<td>" +
												"<a href="+hrefStr+">"+stockName+"（<em>"+code+"</em>）</a>" +
											"</td>" +
										"</tr>";
			
							bodyHtml += "<tr>" +
											"<td title="+ productName +" >"+ ((productName.length > 7) ? (productName.substring(0, 7) + "...") : productName) +"</td>" +
											"<td>"+ (amountMoneyNum/10000).toFixed(2) +"万元</td>" +
											"<td>"+ proportion.toFixed(2) +"%</td>" +
										"</tr>";
						}
						j++;
					}
				}
			}
			if(legendData.length > 0){
				//加载图表
				businessInformationComparison(legendData, productData);
			}else{
				$("#duibi_tux3").html("<div class='biaoge_wushuju' ><div class='wushuju_img'></div><p>暂无数据</p></div>");
				$("#slide_tb3").html("<div class='biaoge_wushuju' ><div class='wushuju_img'></div><p>暂无数据</p></div>");
			}
			
			//加载表格
			
			if(headHtml == ""){
				$("[name='productHead']").html("<tr><td></td></tr>");
				$("[name='productBody']").html("<tr><td colspan='4'><span class='ZWSJ' >暂无数据</span></td></tr>");
			}else{
				$("[name='productHead']").html(headHtml);
				$("[name='productBody']").html(bodyHtml);
			}
			
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}
//经营信息对比
function businessInformationComparison(legendData, chartData){
	var myChart3 = echarts.init(document.getElementById('duibi_tux3'));
	var myCharts3 = echarts.init(document.getElementById('slide_tb3'));
	option = {
		animation:false,
	    tooltip : {
	        trigger: 'item',
	        formatter: function(params){
	        	//console.log(params);
	        	return	'<div class="shizhi_tips">'+
						'<span class="shizhi_time">'+params.seriesName+'</span>'+
						'<div class="types_one">'+
							'<span class="zong_shizhi"  style="background-color:#36b8f4;">'+params.name+'：</span>'+
							'<span class="shuju2">'+(params.value/10000).toFixed(2)+'万元('+params.percent+'%)</span>'+
							'<div class="clr"></div>'+
						'</div>'+
					'</div>';
	        }
	    },
	    color:['#62a6f2','#55c2f4','#ae90db','#909edb'],
	   legend:{
//	    	show:true,
	    	data:legendData
	    },
	   // color:["rgba(98,166,242,.9)","rgba(98,166,242,.7)","rgba(98,166,242,.6)","rgba(98,166,242,.5)","rgba(98,166,242,.4)"],
	    series : [
	        /*{
	            name: '天阳科技',
	            type: 'pie',
	            radius : '30%',
   				label:{
	            	normal:{
	            		show:true,
	            		formatter:function(params){
	            			return params.value+'\n'+params.name;
	            		},
	            		textStyle:{
	            			color:['rgba(98,166,242,.8)','rgba(98,166,242,.6)','rgba(98,166,242,.4)'],
	            			fontSize:14
	            		}
	            	}
	            },
	            center: ['30%', '30%'],
	            data:[
	                {value:335, name:'产品构成',},
	                {value:310, name:'金额'},
	                {value:234, name:'比例占比'}
	            ],
	            itemStyle: {
	            	normal:{
	            		color:['rgba(98,166,242,.8)','rgba(98,166,242,.6)','rgba(98,166,242,.4)'],
	            	},
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	       }*/
	        
	    ]
	};
	$(chartData).each(function(i, item){
		var series = {
			            name: item.name,
			            type: 'pie',
			            radius : '30%',
		   				label:{
			            	normal:{
			            		show:false/*,
			            		formatter:function(params){
			            			return params.value+'\n'+params.name;
			            		},
			            		textStyle:{
			            			color:'#666'['rgba(98,166,242,.8)','rgba(98,166,242,.6)','rgba(98,166,242,.4)'],
			            			fontSize:14
			            		}*/
			            	}
			            },
			            center: item.wz,
			            data:item.data,
			            itemStyle: {
			                emphasis: {
			                    shadowBlur: 10,
			                    shadowOffsetX: 0,
			                    shadowColor: 'rgba(0, 0, 0, 0.5)'
			                }
			            }
			       };
		option.series.push(series);
	})
	 myCharts3.setOption(option);
	 window.onresize = myCharts3.resize;
	 myChart3.setOption(option);
	 window.onresize = myChart3.resize;
	 
	 myChart3Url = myChart3.getDataURL("png");
}

//市值信息
function marketData(){
	var searchCode = "";
	if(xzCodes != ""){
		searchCode = xzCodes.substring(0, xzCodes.length - 1);
	}else{
		return false;
	}
	searchCode = formatCode(searchCode);
	$.axs("/betaInvest/companyContrast/findMarketContrast.do",
			{stockCodes:searchCode.substring(0, searchCode.length - 1)}, true,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result == null){
				return false;
			}
			$("#marketUpdateTime").text((result.latestTime == null || result.latestTime == "") ? "--" : result.latestTime);
			
			//表格变量开始
			var bodyHtml = ""; //表格数据
			var headHtml = ""; //表格头部信息（第一列）
			//表格变量结束
			
			//图表变量开始
			var marketData = []; //图表数据
			var legendData = [];
			var json = {}; //对象
			var dd = []; //数据
			//图表变量结束
			$(result.dataList).each(function(i, item){ //列表数据
				bodyHtml += "<tr>" +
								"<td>"+ (item.shiYingLv == null || (item.shiYingLv == "" && item.shiYingLv != 0) ? "--" : item.shiYingLv.toFixed(2)) +"</td>" +
								"<td>"+ (item.shiJingLv == null || (item.shiJingLv == "" && item.shiJingLv != 0) ? "--" : item.shiJingLv.toFixed(2)) +"</td>" +
								"<td>"+ (item.zongShiZhi == null || (item.zongShiZhi == "" && item.zongShiZhi != 0) ? "--" : item.zongShiZhi.toFixed(2)) +"</td>" +
								"<td>"+ (item.liuTongShiZhi == null || (item.liuTongShiZhi == "" && item.liuTongShiZhi != 0) ? "--" : item.liuTongShiZhi.toFixed(2)) +"</td>" +
							"</tr>";
				
				var hrefStr = "javascript:;";
				if(isXSBCompany(item.stockCode)){ //判断是否为新三板公司
					hrefStr = '/businessDetails/newTBindex.html?stockCode='+item.stockCode+'&stockName='+item.stockName;
				}
				headHtml += "<tr>" +
									"<td>" +
										"<a href="+hrefStr+">"+item.stockName+"（<em>"+item.stockCode+"</em>）</a>" +
									"</td>" +
								"</tr>";
				
				//图表
				json = {};
				dd = [];
				
				dd.push(item.shiYingLv == null || item.shiYingLv == "" ? 0 : item.shiYingLv.toFixed(2));
				dd.push(item.shiJingLv == null || item.shiJingLv == "" ? 0 : item.shiJingLv.toFixed(2));
				dd.push(item.zongShiZhi == null || item.zongShiZhi == "" ? 0 : item.zongShiZhi.toFixed(2));
				dd.push(item.liuTongShiZhi == null || item.liuTongShiZhi == "" ? 0 : item.liuTongShiZhi.toFixed(2));
				json.name = item.stockName;
				json.data = dd;
				
				legendData.push(item.stockName);
				marketData.push(json);
			})
			
			if(legendData.length > 0){
				//加载图表
				marketCapitalizationComparison(legendData, marketData);
			}else{
				$("#duibi_tux4").html("<div class='biaoge_wushuju' ><div class='wushuju_img'></div><p>暂无数据</p></div>");
				$("#slide_tb4").html("<div class='biaoge_wushuju' ><div class='wushuju_img'></div><p>暂无数据</p></div>");
			}
			
			//加载表格
			
			if(headHtml == ""){
				$("[name='marketHead']").html("<tr><td></td></tr>");
				$("[name='marketBody']").html("<tr><td colspan='4'><span class='ZWSJ' >暂无数据</span></td></tr>");
			}else{
				$("[name='marketHead']").html(headHtml);
				$("[name='marketBody']").html(bodyHtml);
			}
			
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

//公司市值对比
function marketCapitalizationComparison(legendData, chartData){
	var myChart4 = echarts.init(document.getElementById('duibi_tux4'));
	var myCharts4 = echarts.init(document.getElementById('slide_tb4'));
	var color=['#62a6f2','#55c2f4','#ae90db','#909edb'];
	option = {
		animation:false,
	    tooltip: {
	        trigger: 'axis',
	        show:true,
	        formatter: function(params) {
          	  	var content='';
            	$(params).each(function(index,item){
            		var bgc=color[index];
            		content+='<div class="sb_tips_content">';
	    			content+='<span class="tips_leibie fl"  style="background:'+bgc+';">'+item.seriesName+'</span>';
	    			content+='<span class="tips_leibie_num fl">'+item.value+'</span>';
	    			content+='<div class="clr"></div>';
	    			content+='</div>';
            	})
      	    	var divHtml='<div class="sanban_tips">'+
	    					'<p class="sb_tips_title">'+params[0].name+'</p>'+content+'</div>';
                return divHtml;
	        }
	    },
	    color:color,
	   legend:{
//	    	show:true,
	    	data:legendData
	    },
	    toolbox: {
	        /*feature: {
	           
	            saveAsImage: {
	            	title:'保存图片',
		            icon:'image:///saasBeta/images/ave.png'
								
	            }
	        },*/
	        top:0,
	        right:'8%',
	    },
	    title:{
//	    	text:"累计融资金额",
	    	textStyle:{
	    		fontSize:'14px',
	    		color:"#4c4c4c"
	    	}
	    },
	    xAxis: [
	        {
	            type: 'category',
	            boundaryGap:true,
	            data: ['市盈率','市净率','总市值（亿）','流通市值（亿）'],
	        	//data:dateTemp
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value',
	         	
	            //name: '累计融资金额(亿)',
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
	    dataZoom:[
	    	 {
	            show: true,
	            realtime: true,
	            start: 0,
	            end: 100
	        },
	        {
	            type: 'inside',
	            realtime: true,
	            start:0,
	            end: 100
	        }
	    	
	    ],

	    series: [
	        /*{
	            name:'天阳科技',
	            type:'bar',
	            barWidth: '30',
	            itemStyle:{
					normal:{
						color:'#62a6f2'
					},
					emphasis:{
	                	color:"#4a8ad3"//鼠标放到柱形图上显示的颜色
	                }
				},
	            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
	        	//data:tradingVolume,
	        	label:{
	        		normal:{
	        			show:true,
	        			position:"top"
	        		}
	        	}
	        }*/
	    ]
	};
	
	$(chartData).each(function(i, item){
		var series = {
			            name:item.name,
			            type:'bar',
			            barMaxWidth:'30', 

			            data:item.data,
			        	//data:tradingVolume,
			        	label:{
			        		normal:{
			        			show:true,
			        			position:"top"
			        		}
			        	}
			        };
			option.series.push(series);
	})
	myChart4.setOption(option);
	window.addEventListener("resize",function(){
       myChart4.resize();
    });	
    myCharts4.setOption(option);
	window.addEventListener("resize",function(){
       myCharts4.resize();
    });
	
	myChart4Url = myChart4.getDataURL("png");
}

//核心数据信息
function coreData(){
	var searchCode = "";
	if(xzCodes != ""){
		searchCode = xzCodes.substring(0, xzCodes.length - 1);
	}else{
		return false;
	}
	
	searchCode = formatCode(searchCode);
	$.axs("/betaInvest/companyContrast/findCoreDataContrast.do",
			{stockCodes:searchCode.substring(0, searchCode.length - 1)}, true,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result == null){
				return false;
			}
			$("#coreUpdateTime").text((result.latestTime == null || result.latestTime == "") ? "--" : result.latestTime);
			
			//表格变量开始
			var bodyHtml = ""; //表格数据
			var headHtml = ""; //表格头部信息（第一列）
			//表格变量结束
			
			//图表变量开始
			var coreData = []; //图表数据
			var legendData = [];
			var json = {}; //对象
			var dd = []; //数据
			//图表变量结束
			$(result.dataList).each(function(i, item){ //列表数据
				bodyHtml += "<tr>" +
								"<td>"+ (item.yiYeShouRu == null || (item.yiYeShouRu == "" && item.yiYeShouRu != 0) ? "--" : item.yiYeShouRu.toFixed(2)) +"</td>" +
								"<td>"+ (item.jingLiRun == null || (item.jingLiRun == "" && item.jingLiRun != 0) ? "--" : item.jingLiRun.toFixed(2)) +"</td>" +
								"<td>"+ (item.jingZiChan == null || (item.jingZiChan == "" && item.jingZiChan != 0) ? "--" : item.jingZiChan.toFixed(2)) +"</td>" +
								"<td>"+ (item.roa == null || (item.roa == "" && item.roa != 0) ? "--" : item.roa.toFixed(2)) +"</td>" +
								"<td>"+ (item.roe == null || (item.roe == "" && item.roe != 0) ? "--" : item.roe.toFixed(2)) +"</td>" +
								"<td>"+ (item.ziChanFuZhaiLv == null || (item.ziChanFuZhaiLv == "" && item.ziChanFuZhaiLv != 0) ? "--" : item.ziChanFuZhaiLv.toFixed(2)) +"</td>" +
							"</tr>";
				
				var hrefStr = "javascript:;";
				if(isXSBCompany(item.stockCode)){ //判断是否为新三板公司
					hrefStr = '/businessDetails/newTBindex.html?stockCode='+item.stockCode+'&stockName='+item.stockName;
				}
				headHtml += "<tr>" +
									"<td>" +
										"<a href="+hrefStr+">"+item.stockName+"（<em>"+item.stockCode+"</em>）</a>" +
									"</td>" +
								"</tr>";
				
				//图表
				json = {};
				dd = [];
				
				dd.push(item.yiYeShouRu == null || item.yiYeShouRu == "" ? 0 : item.yiYeShouRu.toFixed(2));
				dd.push(item.jingLiRun == null || item.jingLiRun == "" ? 0 : item.jingLiRun.toFixed(2));
				dd.push(item.jingZiChan == null || item.jingZiChan == "" ? 0 : item.jingZiChan.toFixed(2));
				dd.push(item.roa == null || item.roa == "" ? 0 : item.roa.toFixed(2));
				dd.push(item.roe == null || item.roe == "" ? 0 : item.roe.toFixed(2));
				dd.push(item.ziChanFuZhaiLv == null || item.ziChanFuZhaiLv == "" ? 0 : item.ziChanFuZhaiLv.toFixed(2));
				json.name = item.stockName;
				json.data = dd;
				
				legendData.push(item.stockName);
				coreData.push(json);
			})
			
			if(legendData.length > 0){
				//加载图表
				coreDataComparison(legendData, coreData);
			}else{
				$("#duibi_tux5").html("<div class='biaoge_wushuju' ><div class='wushuju_img'></div><p>暂无数据</p></div>");
				$("#slide_tb5").html("<div class='biaoge_wushuju' ><div class='wushuju_img'></div><p>暂无数据</p></div>");
			}
			
			//加载表格
			
			if(headHtml == ""){
				$("[name='coreHead']").html("<tr><td></td></tr>");
				$("[name='coreBody']").html("<tr><td colspan='6'><span class='ZWSJ' >暂无数据</span></td></tr>");
			}else{
				$("[name='coreHead']").html(headHtml);
				$("[name='coreBody']").html(bodyHtml);
			}
			
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

//核心数据对比
function coreDataComparison(legendData, chartData){
	var myChart5 = echarts.init(document.getElementById('duibi_tux5'));
	var myCharts5 = echarts.init(document.getElementById('slide_tb5'));
	var color=['#62a6f2','#55c2f4','#ae90db','#909edb'];
	option = {
		animation:false,
	    tooltip: {
	        trigger: 'axis',
	        show:true,
	        formatter: function(params) {
          	  	var content='';
            	$(params).each(function(index,item){
            		var bgc=color[index];
            		content+='<div class="sb_tips_content">';
	    			content+='<span class="tips_leibie fl"  style="background:'+bgc+';">'+item.seriesName+'</span>';
	    			content+='<span class="tips_leibie_num fl">'+item.value+'</span>';
	    			content+='<div class="clr"></div>';
	    			content+='</div>';
            	})
      	    	var divHtml='<div class="sanban_tips">'+
	    					'<p class="sb_tips_title">'+params[0].name+'</p>'+content+'</div>';
                return divHtml;
	        }
	    },
	    color:color,
	   legend:{
//	    	show:true,
	    	data:legendData
	    },
	    toolbox: {
	       /* feature: {
	           
	            saveAsImage: {
	            	title:'保存图片',
		            icon:'image:///saasBeta/images/ave.png'
								
	            }
	        },*/
	        top:0,
	        right:'8%',
	    },
	    title:{
//	    	text:"累计融资金额",
	    	textStyle:{
	    		fontSize:'14px',
	    		color:"#4c4c4c"
	    	}
	    },
	    xAxis: [
	        {
	            type: 'category',
	            boundaryGap:true,
	            data: ['营业收入（万元）','净利润（万元）','净资产（万元）','总资产报酬率（ROA）%','净资产收益率（ROE）%','资产负债率%'],
	        	//data:dateTemp
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value',
	            //name: '累计融资金额(亿)',
	            axisLabel: {
	                formatter: '{value}'
	            }
	        }
	    ],
	     grid: {
	        left: '3%',
	        right: '1%',
	        containLabel: true
	    },
	    dataZoom:[
	    	 {
	            show: true,
	            realtime: true,
	            start: 0,
	            end: 100
	        },
	        {
	            type: 'inside',
	            realtime: true,
	            start:0,
	            end:100
	        }
	    	
	    ],
	    series: [
	        /*{
	            name:'天阳科技',
	            type:'bar',
	            barWidth: '30',
	            itemStyle:{
					normal:{
						color:'#62a6f2'
					},
					emphasis:{
	                	color:"#4a8ad3"//鼠标放到柱形图上显示的颜色
	                }
				},
	            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
	        	//data:tradingVolume,
	        	label:{
	        		normal:{
	        			show:true,
	        			position:"top"
	        		}
	        	}
	        }*/
	    ]
	};
	
	$(chartData).each(function(i, item){
		var series = {
	            name:item.name,
	            type:'bar',
//	            barWidth: '30',
	            data: item.data/*[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]*/,
	        	//data:tradingVolume,
	        	label:{
	        		normal:{
	        			show:true,
	        			position:"top"
	        		}
	        	}
	        };
			option.series.push(series);
	})
	
	myChart5.setOption(option);
	window.addEventListener("resize",function(){
       myChart5.resize();
    });	
    myCharts5.setOption(option);
	window.addEventListener("resize",function(){
       myCharts5.resize();
    });
	
	myChart5Url = myChart5.getDataURL("png");
}

//风险信息
function riskData(){
	var searchCode = "";
	if(xzCodes != ""){
		searchCode = xzCodes.substring(0, xzCodes.length - 1);
	}else{
		return false;
	}
	
	searchCode = formatCode(searchCode);
	$.axs("/betaInvest/companyContrast/findRiskContrast.do",
			{stockCodes:searchCode.substring(0, searchCode.length - 1)}, true,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result == null){
				return false;
			}
			$("#riskUpdateTime").text((result.latestTime == null || result.latestTime == "") ? "--" : result.latestTime);
			
			//表格变量开始
			var bodyHtml = ""; //表格数据
			var headHtml = ""; //表格头部信息（第一列）
			//表格变量结束
			
			//图表变量开始
			var riskData = []; //图表数据
			var legendData = [];
			var json = {}; //对象
			var dd = []; //数据
			//图表变量结束
			$(result.dataList).each(function(i, item){ //列表数据
				bodyHtml += "<tr>" +
								"<td><span class='yichang_jy' data-type='1' data-name="+item.stockName+" data-code="+item.stockCode+">"+ (item.jingying == null || (item.jingying == "" && item.jingying != 0) ? "--" : item.jingying) +"</span></td>" +
								"<td><span class='chufa' data-type='2' data-name="+item.stockName+" data-code="+item.stockCode+">"+ (item.xingzheng == null || (item.xingzheng == "" && item.xingzheng != 0) ? "--" : item.xingzheng) +"</span></td>" +
								"<td><span class='weiji' data-type='3' data-name="+item.stockName+" data-code="+item.stockCode+">"+ (item.weiji == null || (item.weiji == "" && item.weiji != 0) ? "--" : item.weiji) +"</span></td>" +
							"</tr>";
				
				var hrefStr = "javascript:;";
				if(isXSBCompany(item.stockCode)){ //判断是否为新三板公司
					hrefStr = '/businessDetails/newTBindex.html?stockCode='+item.stockCode+'&stockName='+item.stockName;
				}
				headHtml += "<tr>" +
									"<td>" +
										"<a href="+hrefStr+">"+item.stockName+"（<em>"+item.stockCode+"</em>）</a>" +
									"</td>" +
								"</tr>";
				
				//图表
				json = {};
				dd = [];
				
				dd.push(item.jingying == null || item.jingying == "" ? 0 : item.jingying);
				dd.push(item.xingzheng == null || item.xingzheng == "" ? 0 : item.xingzheng);
				dd.push(item.weiji == null || item.weiji == "" ? 0 : item.weiji);
				json.name = item.stockName;
				json.data = dd;
				
				legendData.push(item.stockName);
				riskData.push(json);
			})
			
			if(legendData.length > 0){
				//加载图表
				riskInformationComparison(legendData, riskData);
			}else{
				$("#duibi_tux6").html("<div class='biaoge_wushuju' ><div class='wushuju_img'></div><p>暂无数据</p></div>");
				$("#slide_tb6").html("<div class='biaoge_wushuju' ><div class='wushuju_img'></div><p>暂无数据</p></div>");
			}
			
			//加载表格
			
			if(headHtml == ""){
				$("[name='riskHead']").html("<tr><td></td></tr>");
				$("[name='riskBody']").html("<tr><td colspan='3'><span class='ZWSJ' >暂无数据</span></td></tr>");
			}else{
				$("[name='riskHead']").html(headHtml);
				$("[name='riskBody']").html(bodyHtml);
			}
			
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

function businessRisk(riskType, stockCode, stockName){
	$.axs("/betaInvest/companyContrast/findBusinessRisk.do",
			{stockCode:stockCode, riskType:riskType}, true,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result == null){
				return false;
			}
			
			var bodyHtml = ""; //表格数据
			if(riskType == 1){ //经营异常
				$("#jyTitle").text(stockName + "-经营异常");
				$(result).each(function(i, item){
					bodyHtml += "<li class='yichang_list'>"+
									"<i class='list_yuandian'></i>"+
									"<ul>"+
										"<li>"+
											"<span>列入日期：<em class=''lieru_times'>"+(item.put_date == null || item.put_date == "" ? "--" : toDateTime(item.put_date, "yyyy-MM-dd"))+"</em></span>"+
										"</li>"+
										"<li>"+
											"<span>列入原因：<em>"+(item.put_reason == null || item.put_reason == "" ? "--" : item.put_reason)+"</em></span>"+
										"</li>"+
										"<li>"+
											"<span>决定机关：<em>"+(item.putDepartment == null || item.putDepartment == "" ? "--" : item.putDepartment)+"</em></span>"+
										"</li>"+
									"</ul>"+
								"</li>";
				})
				if(bodyHtml == ""){
					$("#ycBody").hide();
					$("#ycBody").prev().show();
				}else{
					$("#ycBody").html(bodyHtml);
					$("#ycBody").prev().hide();
					$("#ycBody").show();
				}
			}else if(riskType == 2){ //行政处罚
				$("#xzTitle").text(stockName + "-行政处罚");
				$(result).each(function(i, item){
					bodyHtml += "<li class='yichang_list'>"+
									"<i class='list_yuandian'></i>"+
									"<ul><li><span>决定书文号：<em class='lieru_times'>"+(item.penaltyNumber == null || item.penaltyNumber == "" ? "--" : item.penaltyNumber)+"</em></span>"+
										"</li><li><span>类型：<em>"+(item.penaltyType == null || item.penaltyType == "" ? "--" : item.penaltyType)+"</em></span>"+
										"</li><li><span>处罚内容：<em>"+(item.punishingMatter == null || item.punishingMatter == "" ? "--" : item.punishingMatter)+"</em></span>"+
										"</li><li><span>决定日期：<em class='lieru_times'>"+(item.setaDate == null || item.setaDate == "" ? "--" : toDateTime(item.setaDate, "yyyy-MM-dd"))+"</em></span>"+
										"</li><li><span>决定机关：<em>"+(item.putDepartment == null || item.putDepartment == "" ? "--" : item.putDepartment)+"</em></span>"+
//										"</li><li><span>列入原因：<em>"+(item.put_reason == null || item.put_reason == "" ? "--" : item.put_reason)+"</em></span>"+
										"</li><li><span>法人：<em>"+(item.legalPerson == null || item.legalPerson == "" ? "--" : item.legalPerson)+"</em></span>"+
										"</li><li><span>备注：<em>"+(item.remark == null || item.remark == "" ? "--" : item.remark)+"</em></span>"+
										"</li></ul></li>";
				})
				if(bodyHtml == ""){
					$("#xzBody").hide();
					$("#xzBody").prev().show();
				}else{
					$("#xzBody").html(bodyHtml);
					$("#xzBody").prev().hide();
					$("#xzBody").show();
				}
			}else if(riskType == 3){ //严重违纪
				$("#wjTitle").text(stockName + "-严重违纪");
				$(result).each(function(i, item){
					bodyHtml += "<li class='yichang_list'><i class='list_yuandian'></i>"+
									"<ul><li><span>列入日期：<em class='lieru_times'>"+(item.put_date == null || item.put_date == "" ? "--" : item.put_date)+"</em></span>"+
										"</li><li><span>列入原因：<em>"+(item.put_reason == null || item.put_reason == "" ? "--" : item.put_reason)+"</em></span>"+
										"</li><li><span>决定机关：<em>"+(item.putDepartment == null || item.putDepartment == "" ? "--" : item.putDepartment)+"</em></span></li>"+
									"</ul></li>";
				})
				if(bodyHtml == ""){
					$("#wjBody").hide();
					$("#wjBody").prev().show();
				}else{
					$("#wjBody").html(bodyHtml);
					$("#wjBody").prev().hide();
					$("#wjBody").show();
				}
			}
			
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

//风险信息对比
function riskInformationComparison(legendData, chartData){
	var myChart6 = echarts.init(document.getElementById('duibi_tux6'));
	var myCharts6 = echarts.init(document.getElementById('slide_tb6'));
	var color=['#62a6f2','#55c2f4','#ae90db','#909edb'];
	option = {
		animation:false,
	    tooltip: {
	        trigger: 'axis',
	        show:true,
	        formatter: function(params) {
          	  	var content='';
            	$(params).each(function(index,item){
            		var bgc=color[index];
            		content+='<div class="sb_tips_content">';
	    			content+='<span class="tips_leibie fl"  style="background:'+bgc+';">'+item.seriesName+'</span>';
	    			content+='<span class="tips_leibie_num fl">'+item.value+'</span>';
	    			content+='<div class="clr"></div>';
	    			content+='</div>';
            	})
      	    	var divHtml='<div class="sanban_tips">'+
	    					'<p class="sb_tips_title">'+params[0].name+'</p>'+content+'</div>';
                return divHtml;
	        }
	    },
	    color:color,
	   legend:{
//	    	show:true,
	    	data:legendData
	    },
	    toolbox: {
	        /*feature: {
	           
	            saveAsImage: {
	            	title:'保存图片',
		            icon:'image:///saasBeta/images/ave.png'
								
	            }
	        },*/
	        top:0,
	        right:'8%',
	    },
	    title:{
//	    	text:"累计融资金额",
	    	textStyle:{
	    		fontSize:'14px',
	    		color:"#4c4c4c"
	    	}
	    },
	    xAxis: [
	        {
	            type: 'category',
	            boundaryGap:true,
	            data: ['经营异常','行政处罚','严重违纪'],
	        	//data:dateTemp
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value',
	            //name: '累计融资金额(亿)',
	            axisLabel: {
	                formatter: '{value}'
	            }
	        }
	    ],
	     grid: {
	        left: '3%',
	        right: '1%',
	        containLabel: true
	    },
	    series: [
	        /*{
	            name:'天阳科技',
	            type:'bar',
	            barWidth: '30',
	            itemStyle:{
					normal:{
						color:'#62a6f2'
					},
					emphasis:{
	                	color:"#4a8ad3"//鼠标放到柱形图上显示的颜色
	                }
				},
	            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
	        	//data:tradingVolume,
	        	label:{
	        		normal:{
	        			show:true,
	        			position:"top"
	        		}
	        	}
	        }*/
	    ]
	};
	
	$(chartData).each(function(i, item){
		var series = {
			            name:item.name,
			            type:'bar',
			            barWidth: '30',
			            data:item.data,
			        	//data:tradingVolume,
			        	label:{
			        		normal:{
			        			show:true,
			        			position:"top"
			        		}
			        	}
			        };
			option.series.push(series);
	})
	myChart6.setOption(option);
	window.addEventListener("resize",function(){
                   myChart6.resize();
                });	
    myCharts6.setOption(option);
	window.addEventListener("resize",function(){
                   myCharts6.resize();
                });	
	
	myChart6Url = myChart6.getDataURL("png");
}

/**
 * 数字日期转格式
 * @param time
 * @param format
 * @returns
 */
function toDateTime (time, format) {
    var x = new Date(parseInt(time)),  
        y = format;  
    var z = {M: x.getMonth() + 1, d: x.getDate(), h: x.getHours(), m: x.getMinutes(), s: x.getSeconds()};  
    y = y.replace(/(M+|d+|h+|m+|s+)/g, function (v) {  
        return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2)  
    });  
    var formatDateTime = y.replace(/(y+)/g, function (v) {  
        return x.getFullYear().toString().slice(-v.length)  
    });  
    return formatDateTime;  
};

/**
 * 格式化成传参格式
 * @param codes
 * @returns {String}
 */
function formatCode(codes){
	var codeArr = codes.split(",");
	codes = "";
	$(codeArr).each(function(){
		codes += "'"+this+"',";
	})
	return codes;
}



//新的搜索框
function searchesList(stockCode,stockName,type){
	
	if(xzCodes.split(",").length <= 4){ //有个一为空所以多判断一个
		if($.inArray(stockCode,xzCodes.split(",")) == -1){
			var dbHtml='<div class="yixuan_gs" data-code="'+stockCode+'" data-name="'+stockName+'">'+
						'<span>'+stockName+'(<em>'+stockCode+'</em>)</span>'+
						'<i class="xuanze_shanchu"></i>'+
//						'<div class="deleted_select" style="display: none;">'+
//							'<span class="sc_tips">删除</span>'+
//						'</div>'+
					'</div>';
			$(".comparis_newserach").find(".news_search").before(dbHtml);
//			var dbHtml = "<span>"+stockName+"（<em>"+stockCode+"</em>）<i data-code="+stockCode+" data-name="+stockName+" ></i></span>";
//			$("#searchCode").before(dbHtml);
			xzCodes += stockCode + ",";
			
			if(type != 0){				
				$("#newSearchers").focus();				
				$("#newSearchers").val("");
				//初始化信息
				initData();
				//添加对比公司
				addComparisonStock(stockCode, stockName);
			}
			//删除选择的公司
//			$(".public_header span i").click(function(){
//				xzCodes = xzCodes.replace($(this).prev().text() + ",", "");
//				$(this).parent().remove();
//				//初始化信息
//				initData();
//				
//				//删除对比公司
//				removeComparisonStock($(this).attr("data-code"), $(this).attr("data-name"));
//			})
		}
	}else{
		$.zmAlert("最多选择四家公司");
	}
}

function delXZCompany(code, name){
	xzCodes = xzCodes.replace(code + ",", "");
	//初始化信息
	initData();
	//删除对比公司
	removeComparisonStock(code, name);
}
