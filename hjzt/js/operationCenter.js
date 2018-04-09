var is_findAllIndicator=0;
var userId=localStorage.getItem("userId");
var shareOpen="0";//开通股价提醒
var reportOpen_oc="1";//开通报告提醒
var userList=[];
$(function(){

	//操作中心
	operationCenter();
	//对比企业
	initComparisonStock();
	//我的研究
	myResearch();
//var url=window.location.pathname;
//if(url=="/businessDetails/newTBindex.html" || url=="/businessDetails/financialData.html" || url=="/businessDetails/relationGraph.html" || url=="/businessDetails/researchRecord.html" || url=="/businessDetails/TBnotice.html" || url=="/businessDetails/newsList.html"){
//	$(".gp_content_nr").delegate(".czzx_tix","click",function(){
//		$(".setTix").show();
//		$(".backbj").show();
//		$("body,html").css("overflow","hidden");
//	})
//}else{
	$(".gp_content_nr").delegate(".czzx_tix","click",function(){
		var stockName=$(this).attr("data-type");
		var stockCode=$(this).attr("data-id");
		addsettixOp(stockName,stockCode);
		findNewPrice_oc(stockCode);
		$(".wjTix_mark").show();
		$(".wjTix_popUP").show();
		$("body,html").css("overflow","hidden");
//		if($(this).hasClass("on")){
//			//console.log(stockCode)
			findBtStockAlertOp_oc(stockCode);
//		}
			//	点击股价提醒展开 
		$(".set_zk").delegate("#setZk","click",function(e){
			if($(this).hasClass("on")){
				$(".set_down").slideDown();
		//		$(".set_down").slideUp();
				$(this).removeClass("on");	
				$(this).html("收起");
		//		
			}else{
				$(".set_down").slideUp();
				$(this).addClass("on");	
				$(this).html("展开");	
			}
			e.stopPropagation();
		});
		//点击股价提醒后的选框
		$("#gjtx_xk>.data-checkbox>label.checkbox").on("click",function(e){
			if($(this).hasClass("on")){
				$(this).removeClass("on");
			}else{
				$(this).addClass("on");
			}
			e.stopPropagation();
		})
		
		//点击公告提醒后的选框
		$("#ggtx_xk>.data-checkbox>label.checkbox").on("click",function(e){
			if($(this).hasClass("on")){
				$(this).removeClass("on");
			}else{
				$(this).addClass("on");
			}
			e.stopPropagation();
		})
		//点击保存addBtStockAlerts(stockCode,stockName)
		$("body").delegate(".setTix_info .baocun","click",function(){
			//alert();
			addBtStockAlerts(stockCode,stockName);
		})
	})
//}

//点击自选的更多跳转
$(".zixuan_btn .zixuan_more").on("click",function(){
	window.open("/security/myPreferredStock.html");
})
//deletTips();
//点击删除自选股
$(".zixuangu_tc").delegate(".czzx_ljk","click",function(){
	deletTips();
	$(".tub_tc_publick").show();
	$(".tips_shanchu_publick").show();
	$(".shanc_btn2").attr("data-id",$(this).attr("data-id"));
	$(".shanc_btn2").attr("data-value",$(this).attr("data-value"));
	$("body,html").css("overflow","hidden");
})
//点击删除自选股的确定按钮
$("body").delegate(".tips_shanchu_publick .shanc_btn2","click",function(){
	var id=$(this).attr("data-id");
	var stockCode=$(this).attr("data-value");
	var stockCodes=getUrlParam("stockcode");
	if(id==stockCodes){	
		$("#addTips").removeClass("on");
	}
	deleteOptional(id,stockCode);
	
	$(".tub_tc_publick").hide();
	$(".tips_shanchu_publick").hide();
	$("body,html").css("overflow","auto");
})
//点击自选股弹窗的取消按钮
$("body").delegate(".tips_shanchu_publick .shanc_qux2","click",function(){
	$(".tub_tc_publick").hide();
	$(".tips_shanchu_publick").hide();
	$("body,html").css("overflow","auto");
})



//股价提醒仿复选框原来的开通提醒
$("body").delegate(".set_check label.checkbox","click", function(e) {
// 此处dataType为1 是开通股价提醒   dataTYpe为2 为开通公告提醒
	var dataType=$(this).parent().find("label").attr("data-type");
	
		if ($(this).hasClass("on")) {
			$(this).removeClass("on");
			$(this).siblings("label").removeClass("on");
//			$(this).siblings("label.checkboxWord").css("color", "");
			if(dataType=='1'){
				shareOpen="0";
			}else{
				reportOpen_oc="0";
			}
		} else {
			$(this).addClass("on");
			$(this).siblings("label").addClass("on");
//			$(this).siblings("label.checkboxWord").css("color", "#2fa6dc");
			if(dataType=='1'){
				shareOpen="1";
			}else{
				reportOpen_oc="1";
			}
		}
		e.stopPropagation();
	});

//点击关闭
	$(document).bind("mousedown",function(event){
		var $target=$(event.target);
		if(!($target.parents().andSelf().is(".czzx_db_box")) && !($target.parents().andSelf().is(".ui-autocomplete"))){
			if($(".czzx_db_box").css("display")=="block"){
				$(".czzx_content").removeClass("on");
				$(".czzx_content").siblings().hide();
				//$(".czzx_db_box").hide();
				$(".czzx_icon").show();
				$(".shanc_czzx").hide();
				$(".czzx_i").css("z-index",-1);
			}
		}
	})
	
	//自选股
	findListCenter();
	$(".shanchu_lajik").hide();
	var circle_wrapper = document.getElementById('circle_wrapper');
	// console.log( circle_wrapper );
	try{startDrag(circle_wrapper, circle_wrapper);}catch(e){}
	
	
	//点击我的研究
	$(".wodeyanjiu").on("click",function(){
		var modelName=$(this).find("a").find("i").text();
		$(".wode_yanjiu").show();
		$(".gegu_zb").hide();
		$(".cz_news").hide();
		$(".yijanfankui").hide();
		$(".zixuangu_tc").hide();
		showGuideResearchReport();
		var users=localStorage.getItem("userList");
		//alert(users);
		//users+=","+modelName;
		if(users==null ||users=="" || users==undefined){
			users="";

		}
		var flag =false;
		$(users.split(",")).each(function(index,item){
			if(item=="我的研究"){
				//flag =false;
				 flag=true;
				return;
			}
		})
		if(flag){

			$(".wode_yanjiu>.xbg_sc_dianji").hide();
		}else{
			$(".wode_yanjiu>.xbg_sc_dianji").show();

			users+=","+modelName;
			addClickHistory(userId,modelName);
			localStorage.setItem("userList",users);
			}
		
	})
	//点击删除号关闭弹窗
	$(".chahao").on("click",function(){
		$(this).parent().hide();
		$(".czzx_bg").hide();
	})

	//点击我的研究的左边的tab
//	$(".xiebg").on("click",function(){
//		$(".yanjiu_neir").show();
//	})
	$(".mox_jisuan").on("click",function(){
		$("#modelSeachStock").val('');
		$("#modelZhibiao").html('');
		$("#selectLeibie").text('(0/5)');
		$("#modelZhibiao").attr("key_id","");
		//清空所有的选择
		$(".mx_zb_list").find("label.checkbox").removeClass("on");
		$(".mx_zb_list").find("label.checkbox").removeClass("danxuan");
		$(".czzx_bg").show();
		$(".mox_tc").show();
		$(".mx_yind").show();
		$("#modelSeachStock").show();
		$(".yd_img_icon").show();
		$(".caiwu_zb_types .zhibiao_list").hide();
		$("#toModelHtml").hide();
	})
	//判断我的研究是否有内容
	showGuideResearchReport();
	//判断个股对标是否有内容
	showStockBenchmarking();
	
	
	
	if($(".xitong_tz ul li").length<=0){
		$(".xitong_tz ul").hide();
		$(".tongzhi_zanwu_shuju").show();
	}else{
		$(".xitong_tz ul").show();
		$(".tongzhi_zanwu_shuju").hide();
	}
	
	if($(".gegu_gg ul li").length<=0){
		$(".gegu_gg ul").hide();
		$(".tongzhi_zanwu_shuju").show();
	}else{
		$(".gegu_gg ul").show();
		$(".tongzhi_zanwu_shuju").hide();
	}
	
	if($(".gujia_tixing ul li").length<=0){
		$(".gujia_tixing ul").hide();
		$(".tongzhi_zanwu_shuju").show();
	}else{
		$(".gujia_tixing ul").show();
		$(".tongzhi_zanwu_shuju").hide();
	}
	
	//点击个股对标
	$(".gegu_duibiao").on("click",function(){
		//alert(0)
		var modelName=$(this).find("a").find("i").text();
		$(".gegu_zb").show();
		$(".wode_yanjiu").hide();
		$(".cz_news").hide();
		$(".yijanfankui").hide();
		$(".zixuangu_tc").hide();
		//判断是否有内容
		showStockBenchmarking();
		//alert(1)
		var users=localStorage.getItem("userList");
		if(users==null ||users=="" || users==undefined){
			users="";
		}
		var flag =false;
		$(users.split(",")).each(function(index,item){
			if(item=="个股对标"){
				//flag =false;
				 flag=true;
				return;
			}
		})
		if(flag){
			$(".gegu_zb>.xbg_sc_dianji").hide();
		}else{
			$(".gegu_zb>.xbg_sc_dianji").show();
			users+=","+modelName;
			addClickHistory(userId,modelName);
			localStorage.setItem("userList",users);
		}
	
	})
	
	
	//点击自选股显示对应的弹窗
	$(".zixuangu").on("click",function(){
		var modelName=$(this).find("a").find("i").text();
		$(".wode_yanjiu").hide();
		$(".gegu_zb").hide();
		$(".cz_news").hide();
		$(".yijanfankui").hide();
		$(".zixuangu_tc").show();
		var left=$("#zixuanguNumTotal").text().indexOf("（");
		var right=$("#zixuanguNumTotal").text().indexOf("）");
		var num=($("#zixuanguNumTotal").text()).substring(left+1,right);
		//console.log(num)
		$(".zx_num").text("（"+num+"）");
		//判断自选股是否有内容
		showOptionalStock();
		var users=localStorage.getItem("userList");
		if(users==null ||users=="" || users==undefined){
			users="";
		}
		var flag =false;
		$(users.split(",")).each(function(index,item){
			if(item=="自选股"){
				//flag =false;
				 flag=true;
				return;
			}
		})
		if(flag){
			$(".zixuangu_tc>.xbg_sc_dianji").hide();
		}else{
			$(".zixuangu_tc>.xbg_sc_dianji").show();
			users+=","+modelName;
			addClickHistory(userId,modelName);
			localStorage.setItem("userList",users);
		}

		
	})
	
	//点击对比
	$(".cz_duibi span").on("click",function(){
		var length=$(".duibi_zb").find("li").length;
		if(length==null || length==0){
			errorAlert("","请添加对比企业");
			return false;
		}
		window.location.href="/contrast/companyBepthComparison.html";
	});
	//点击通知
	$(".tongzhi").on("click",function(){
		var modelName=$(this).find("a").find("i").text();
		$(".wode_yanjiu").hide();
		$(".gegu_zb").hide();
		$(".cz_news").show();
		$(".yijanfankui").hide();
		$(".zixuangu_tc").hide()
		updateBtUserMessage(1);
		if($(".xitong_tz ul li").length<=0){
			$(".xitong_tz ul").hide();
			$(".tongzhi_zanwu_shuju").show();
		}else{
			$(".xitong_tz ul").show();
			$(".tongzhi_zanwu_shuju").hide();
		}
		var users=localStorage.getItem("userList");
		if(users==null ||users=="" || users==undefined){
			users="";
		}
		var flag =false;
		$(users.split(",")).each(function(index,item){
			if(item=="通知"){
				//flag =false;
				 flag=true;
				return;
			}
		})
		if(flag){
			$(".cz_news>.xbg_sc_dianji").hide();
		}else{
			$(".cz_news>.xbg_sc_dianji").show();
			users+=","+modelName;
			addClickHistory(userId,modelName);
			localStorage.setItem("userList",users);
		}

		
	})
	
	//点击通知中的我知道和跳过
	$(".cz_news .shure_btn span").on("click",function(){
		$(this).parent().parent().hide();
	})
	$(".zixuangu_tc .shure_btn span").on("click",function(){
		$(this).parent().parent().hide();
	})
	
//	鼠标经过自选股的弹窗显示删除图标
	$(".zixuan_list").delegate("li","mouseenter",function(){
		$(this).find(".cz_sc").show();
	})
	$(".zixuan_list").delegate("li","mouseleave",function(){
		$(this).find(".cz_sc").hide();
	})
	
//	$(".yijanfankui").on("click",function(){
//		$(this).show();
//		$(".wode_yanjiu").hide();
//		$(".gegu_zb").hide();
//		$(".cz_news").hide();
//	})
	//点击系统通知里的tab切换
	$(".xit_tongzhi").on("click",function(){
		$(this).addClass("on").siblings().removeClass("on");
		$(".xitong_tz").show();
		$(".gegu_gg").hide();
		$(".gujia_tixing").hide();
		updateBtUserMessage(1);
		if($(".xitong_tz ul li").length<=0){
			$(".xitong_tz ul").hide();
			$(".tongzhi_zanwu_shuju").show();
		}else{
			$(".xitong_tz ul").show();
			$(".tongzhi_zanwu_shuju").hide();
		}
	})
	$(".gg_gongao").on("click",function(){
		$(this).addClass("on").siblings().removeClass("on");
		$(".gegu_gg").show();
		$(".xitong_tz").hide();
		$(".gujia_tixing").hide();
		updateBtUserMessage(2);
		if($(".gegu_gg ul li").length<=0){
			$(".gegu_gg ul").hide();
			$(".tongzhi_zanwu_shuju").show();
		}else{
			$(".gegu_gg ul").show();
			$(".tongzhi_zanwu_shuju").hide();
		}
	})
	$(".gg_tixing").on("click",function(){
		$(this).addClass("on").siblings().removeClass("on");
		$(".gujia_tixing").show();
		$(".xitong_tz").hide();
		$(".gegu_gg").hide();
		updateBtUserMessage(3);
		if($(".gujia_tixing ul li").length<=0){
			$(".gujia_tixing ul").hide();
			$(".tongzhi_zanwu_shuju").show();
		}else{
			$(".gujia_tixing ul").show();
			$(".tongzhi_zanwu_shuju").hide();
		}
	})
	//点击通知中的条目删除按钮
	/*$(".gujia_tixing,.gegu_gg,.xitong_tz").delegate("b","click",function(){
		$(this).parent().parent().hide();
	})*/
	//点击我的研究的引导的跳过按钮
	$(".tiaoguo").on("click",function(){
		$(this).parent().hide();
	})
	
	//点击我的研究中的我知道的按钮
	$(".yanjiu_wzd").on("click",function(){
		if($(".show_img1").css("display")=="block"){
			$(".show_img1").hide();
			$(".show_img2").show();
			$(".show_img3").hide();
		}else if($(".show_img2").css("display")=="block"){
			$(".show_img1").hide();
			$(".show_img2").hide();
			$(".show_img3").show();
		}else if($(".show_img3").css("display")=="block"){
			$(this).parent().parent().hide();
		}
	})
	
	//点击个股对标中的我知道按钮
	$(".gegu_wzhidao").on("click",function(){
		if($(".gegu_show_img1").css("display")=="block"){
			$(".gegu_show_img1").hide();
			$(".gegu_show_img2").show();
			$(".gegu_show_img3").hide();
		}else if($(".gegu_show_img2").css("display")=="block"){
			$(".gegu_show_img1").hide();
			$(".gegu_show_img2").hide();
			$(".gegu_show_img3").show();
		}else if($(".gegu_show_img3").css("display")=="block"){
			$(this).parent().parent().hide();
		}
	})
	//鼠标经过我的研究的时候显示删除图标
	$("#myResearchDivShow").delegate("li","mouseenter",function(){
		$(this).find("div.yanjiu_bianji").show();
	})
	$("#myResearchDivShow").delegate("li","mouseleave",function(){
		$(this).find("div.yanjiu_bianji").hide();
	})
	//鼠标经过系统通知的时候显示垃圾筐
	$(".xitong_tz").delegate("li","mouseenter",function(){
		$(this).find(".shanchu_lajik").show();
	})
	$(".xitong_tz").delegate("li","mouseleave",function(){
		$(this).find(".shanchu_lajik").hide();
	})
	//点击系统通知的垃圾筐删除此条消息
	$(".xitong_tz").delegate(".shanchu_lajik","click",function(){
		$(this).parent().parent().remove();
		if($(".xitong_tz ul li").length<=0){
			$(".tongzhi_zanwu_shuju").show();
			$(".xitong_tz ul").hide();
		}else{
			$(".tongzhi_zanwu_shuju").hide();
			$(".xitong_tz ul").show();
		}
	})
	//鼠标通过个股公告显示垃圾筐
	$(".gegu_gg").delegate("li","mouseenter",function(){
		$(this).find(".shanchu_lajik").show();
	})
	$(".gegu_gg").delegate("li","mouseleave",function(){
		$(this).find(".shanchu_lajik").hide();
	})
	//点击个股公告的垃圾筐删除此条消息
	$(".gegu_gg").delegate(".shanchu_lajik","click",function(){
		$(this).parent().parent().remove();
		if($(".gegu_gg ul li").length<=0){
			$(".tongzhi_zanwu_shuju").show();
			$(".gegu_gg ul").hide();
		}else{
			$(".tongzhi_zanwu_shuju").hide();
			$(".gegu_gg ul").show();
		}
	})

	//鼠标通过股价提醒显示垃圾筐
	$(".gujia_tixing").delegate("li","mouseenter",function(){
		$(this).find(".shanchu_lajik").show();
	})
	$(".gujia_tixing").delegate("li","mouseleave",function(){
		$(this).find(".shanchu_lajik").hide();
	})
	//点击股价提醒的垃圾筐删除此条消息
	$(".gujia_tixing").delegate(".shanchu_lajik","click",function(){
		$(this).parent().parent().remove();
		if($(".gujia_tixing ul li").length<=0){
			$(".tongzhi_zanwu_shuju").show();
			$(".gujia_tixing ul").hide();
		}else{
			$(".tongzhi_zanwu_shuju").hide();
			$(".gujia_tixing ul").show();
		}
	})
	
	//点击个股对标下的删除号
	$(".duibi_zb").delegate("i","click",function(){
		var len=$(".duibi_zb li").length-1;
		if(len<=0){
			$(".duibi_zb").hide();
			$(".gegu_searches").show();
			$(".cz_duibi").hide();
			//$(".zwu_shuju").show();
		}else{
			$(".duibi_zb").show();
			$(".gegu_searches").hide();
			$(".cz_duibi").show();
			//$(".zwu_shuju").hide();
		}	
			
		
		$(this).parent().parent().parent().parent().find(".top_titles").find("span").find("em").text('('+len+'/4)');
		$(".gegu_duibiao").find("em.cz_em").html("（"+len+"）");
		$(this).parent().remove();
		var stockSHow=$(this).prev().text();
		var removeClassStockCode=stockSHow.substring(stockSHow.indexOf("(")+1,stockSHow.indexOf(")"));
		//console.log("duibi_"+removeClassStockCode);
		
		$("#duibi_"+removeClassStockCode).removeClass("on");
		if($("#duibi_"+removeClassStockCode).text()=="删除对比"){
			$("#duibi_"+removeClassStockCode).text("加入对比")
		}
		//检索结果页面
//		console.log(location.pathname);
		if(location.pathname=="/searchList.html"){
			if($("#duibi_"+removeClassStockCode+"_caiwu").text()=="取消对比"){
				$("#duibi_"+removeClassStockCode+"_caiwu").text("加入对比");
				$("#duibi_"+removeClassStockCode+"_caiwu").removeClass("on");
			}
		}
		
		//点击自选股的删除符号
//		$(".zixuan_list").delegate(".czzx_ljk","click",function(){
////			alert();
//			$(this).parent().parent().remove();
//			var len=$(".gp_content_nr li").length-1;
//			if(len<=0){
//				$(".zixuan_list").hide();
//				$(".zixuan_btn").hide();
//				$(".zixuan_searches").show();
//			}else{
//				$(".zixuan_list").show();
//				$(".zixuan_btn").show();
//				$(".zixuan_searches").hide();
//			}
//			
//		})
		
		//设置缓存信息
//		setLocalStorage();
		delContrastCompany(removeClassStockCode);
		
		if((window.location.href).indexOf("/companyComparison.html") > -1 || (window.location.href).indexOf("/contrast/multidStockanalysisTable.html") > -1){ //财务对比页
			$("#comparisonStockCode li").remove();
			initComparisonStockHeader();
			//查询数据
			loadData();
		}
		//财务对比三个页面
		var pathName=location.pathname;
		if(pathName.indexOf("comprehensive.html")>-1 || pathName.indexOf("multidStockTrendComparison.html")>-1 || pathName.indexOf("multidStockRankingAnalysis.html")>-1){//指标趋势对比
			//查询数据
			loadData();
		}
		if((window.location.href).indexOf("/security/myPreferredStock.html") > -1){ //自选股页
			if($("#"+removeClassStockCode).text() == "删除对比"){
				$("#"+removeClassStockCode).text("加入对比");
			}
		}
		
	})
	//点击意见反馈
	$(".yijian_fankui").on("click",function(){
		$(".wode_yanjiu").hide();
		$(".gegu_zb").hide();
		$(".cz_news").hide();
		$(".yijanfankui").show();
	})
	//鼠标经过小手的蓝框时显示列表
	$(".czzx_icon").on("click",function(event){
		$(".czzx_db_box").show();
		$(".czzx_content").addClass("on");
		$(this).hide();
		$(".shanc_czzx").show();
		getHistory();
	});
	//点击蓝色的删除号菜单列表隐藏
	$(".shanc_czzx").on("click",function(e){
		$(this).hide();
		$(".czzx_db_box").hide();
		$(".czzx_icon").show();
		$(".czzx_i").css("z-index",2);
		setTimeout(hideCzzxi,1000);
		$(".xitong_tz").hide();
		$(".wode_yanjiu").hide();
		$(".gegu_zb").hide();
		$(".yijanfankui").hide();
	})
	var pathName=location.pathname;
	if(pathName.indexOf("modelReportDetail.html")>-1){
		
		findAllIndicator2();
		
	}else{
		findAllIndicator();
	}
	//点击模型计算弹窗的下拉框
	$(".select_mox_zb p").on("click",function(){
		if($(".mx_zb_list").css("display")=="block"){
			$(".mx_zb_list").slideUp();
		}else{
			$(".mx_zb_list").slideDown();
		}
		
	})
	
	//点击财务分析模型的多指标
	$(".mx_zb_list").delegate(".fx","click",function(e){
		if($(this).parent().parent().hasClass("on")){
			$(this).parent().parent().removeClass("on");
			$(this).parent().parent().parent().find("ul").eq(0).hide();
			e.stopPropagation();
		}else{
			$(this).parent().parent().addClass("on");
			$(this).parent().parent().parent().find("ul").eq(0).show();
			e.stopPropagation();
		}
	})
	
	//点击点击财务分析模型的多指标(指标类型)
	$(".mx_zb_list").delegate(".nodes label.checkboxWord","click",function(){
		var parentId=$(this).parent().parent().parent().attr("id");
		if($(this).parent().parent().hasClass("on")){
			$(this).parent().parent().removeClass("on");
			$("#"+parentId).find("ul").hide();
		}else{
			$(this).parent().parent().addClass("on");
			$("#"+parentId).find("ul").show();
		}
	})
	$(".mx_zb_list").delegate(".nodes label.checkbox","click",function(){
		var li=$("#"+parentId).find("li");
		var parentId=$(this).parent().parent().parent().attr("id");
		var node=0;
		$(".nodes").each(function(index,item){
			if($(item).find("label.checkbox").hasClass("on")){
				node++;
			}
		})
		if(node<=4){
			if($(this).parent().parent().hasClass("on")){
				if($(this).hasClass("on")){
					$(this).removeClass("on");
					$("#"+parentId).find("li").find("label.checkbox").removeClass("on");
					//$("#selectLeibie").text((node-1)+"/5");
				}else{
					$(this).addClass("on").removeClass("danxuan");
					$("#"+parentId).find("li").find("label.checkbox").addClass("on");
					//$("#selectLeibie").text((node+1)+"/5");
				}
			}else{
				$(this).parent().parent().addClass("on");
				$(this).addClass("on");
				$("#"+parentId).find("ul").show();
				$("#"+parentId).find("li").find("label.checkbox").addClass("on");
				//$("#selectLeibie").text((node+1)+"/5");
			}
		}else{
			//errorAlert("最多可选5个指标");
			if($(this).hasClass("on")||$(this).hasClass("danxuan")){
				$(this).removeClass("on").removeClass("danxuan");
				$("#"+parentId).find("li").find("label.checkbox").removeClass("on");
			}else{
				$.zmAlert("最多可选5个指标");
			}
		}
		var yiji=0;
		$(".mx_zb_list>ul>li").each(function(index,item){
			if($(item).find("div.nodes").find("label.checkbox").hasClass("on") || $(item).find("div.nodes").find("label.checkbox").hasClass("danxuan")){
				yiji++;
			}
		})
		$("#selectLeibie").text("("+yiji+"/5)");
		
	})
	//点击操作中心的提交反馈按钮
	$(".tijiao_fankui span").on("click",function(){
		var textinfo = $("#fankui").val();
		if(textinfo.replace(/(^\s*)|(\s*$)/g, "")!=""){
			if(textinfo.length>200){
			$("#fankui_error").html("最多可提交200字").show();
			return false;
			}
			$("#fankui_error").hide();
			$.zmAlert("已提交反馈");
			document.getElementById("fankui").value = "";
			$(this).parent().parent().hide();	
		}else{
			$("#fankui_error").html("请填写反馈信息").show();
		}
		
	})
	//点击财务分析的指标
	var flagArray=[];
	$(".mx_zb_list").delegate("li>div.data-checkbox","click",function(){
		var yijiId=$(this).parent().parent().parent().attr("id");
		var li=$("#"+yijiId).find("li");
		var len=$("#"+yijiId).find("ul li").length;
		var clickLeibie=$(this).parent().parent().parent().attr("data-value");
		var flag=0;
		var nodes=0;
		var no=0;
		$(".nodes").each(function(index,item){
			if($(item).find("label.checkbox").hasClass("on") || $(item).find("label.checkbox").hasClass("danxuan")){
				nodes++;
			}
		})
		//console.log(nodes)
		if((nodes)<=4){
			$(li).each(function(index,item){
				if($(item).find("label.checkbox").hasClass("on")){
					flag++;
				}
			})
			if(flag<len){
				if($(this).find("label.checkbox").hasClass("on")){
					$(this).find("label.checkbox").removeClass("on");
				}else{
					$(this).find("label.checkbox").addClass("on");
				}
				var flags=0;
				$(li).each(function(index,item){
					if($(item).find("label.checkbox").hasClass("on")){
						flags++;
					}
				})
				
				//console.log(flag)
				if(flags==len){
					$("#"+yijiId).find(".nodes").find("label.checkbox").addClass("on").removeClass("danxuan");
					//$("#selectLeibie").text((nodes+no+1)+"/5");
				}else{
					$("#"+yijiId).find(".nodes").find("label.checkbox").addClass("danxuan").removeClass("on");
				}
				if(flags<=0){
					$("#"+yijiId).find(".nodes").find("label.checkbox").removeClass("danxuan").removeClass("on");
					//$("#selectLeibie").text(nodes+no+"/5");
				}
				
				
			}else{
				if($(this).find("label.checkbox").hasClass("on")){
					$(this).find("label.checkbox").removeClass("on");
					var len=0;
					$(li).each(function(index,item){
						if($(item).find("label.checkbox").hasClass("on")){
							len++;
						}
					});
					
					if(len<=0){
						$("#"+yijiId).find(".nodes").find("label.checkbox").removeClass("on").removeClass("danxuan");
					}
				}
				if($("#"+yijiId).find(".nodes").find("label.checkbox").hasClass("on")){
					$("#"+yijiId).find(".nodes").find("label.checkbox").removeClass("on").addClass("danxuan");
				}
			}
			
		}else{
			//errorAlert("最多可选择5个指标");
			//$.zmAlert("最多可选5个指标");
			if($(this).parent().parent().prev().find("label.checkbox").hasClass("on") || $(this).parent().parent().prev().find("label.checkbox").hasClass("danxuan")){
				if($(this).find("label.checkbox").hasClass("on")){
					$(this).find("label.checkbox").removeClass("on");
					//$(this).parent().parent().prev().find("label.checkbox").addClass("danxuan").removeClass("on");
					var b=0;
					$(li).each(function(index,item){
						if($(item).find("label.checkbox").hasClass("on")){
							b++;
						}
					})
					if(a==len){
						$("#"+yijiId).find(".nodes").find("label.checkbox").addClass("on").removeClass("danxuan");
						//$("#selectLeibie").text((nodes+no+1)+"/5");
					}else{
						$("#"+yijiId).find(".nodes").find("label.checkbox").addClass("danxuan").removeClass("on");
					}
					if(b<=0){
						$("#"+yijiId).find(".nodes").find("label.checkbox").removeClass("danxuan").removeClass("on");
						//$("#selectLeibie").text(nodes+no+"/5");
					}
				}else{
					//$.zmAlert("最多可选5个指标");
					if($(this).parent().parent().prev().find("label.checkbox").hasClass("on") || $(this).parent().parent().prev().find("label.checkbox").hasClass("danxuan")){
						$(this).find("label.checkbox").addClass("on");
						var a=0;
						$(li).each(function(index,item){
							if($(item).find("label.checkbox").hasClass("on")){
								a++;
							}
						})
						if(a==len){
							$("#"+yijiId).find(".nodes").find("label.checkbox").addClass("on").removeClass("danxuan");
							//$("#selectLeibie").text((nodes+no+1)+"/5");
						}else{
							$("#"+yijiId).find(".nodes").find("label.checkbox").addClass("danxuan").removeClass("on");
						}
						if(a<=0){
							$("#"+yijiId).find(".nodes").find("label.checkbox").removeClass("danxuan").removeClass("on");
							//$("#selectLeibie").text(nodes+no+"/5");
						}
						//$(this).parent().parent().prev().find("label.checkbox").addClass("danxuan").removeClass("on");
					}else{
						$.zmAlert("最多可选5个指标");
					}
					//$(this).find("label.checkbox").addClass("on");
				}
			}else{
//				alert(0)
				$.zmAlert("最多可选5个指标");
			}
		}
		var yixuan=0;
		$(".mx_zb_list>ul>li").each(function(index,item){
			if($(item).find("div.nodes").find("label.checkbox").hasClass("on") || $(item).find("div.nodes").find("label.checkbox").hasClass("danxuan")){
				yixuan++;
			}
		})
		//console.log(yixuan)
		$("#selectLeibie").text("("+yixuan+"/5)");
		//判断样式
//		if(flagArray.length>=5){
//			if($.inArray(clickLeibie,flagArray)>=0){
//				if($(this).find("label.checkbox").hasClass("on")){
//					$(this).find("label.checkbox").removeClass("on");
//				}else{
//					$(this).find("label.checkbox").addClass("on");
//				}
//			}
//		}else{
//			if($(this).find("label.checkbox").hasClass("on")){
//				$(this).find("label.checkbox").removeClass("on");
//			}else{
//				$(this).find("label.checkbox").addClass("on");
//			}
//		}
		//控制类别的数量
//		$(".mx_zb_list .data-checkbox").each(function(index,item){
//			if($(item).find("label.checkbox").hasClass("on")){
//				var leibie=$(item).parent().parent().parent().attr("data-value");
//				if($.inArray(leibie,flagArray)<=-1){
//					flagArray.push(leibie);
//				}
//			}
//		});
//		$.each(flagArray,function(index,item){
//			if($("#zhibiaoleixing_"+item).find("label.on").length==0){
//				flagArray.splice(index,1);
//			}
//		});
//		$("#selectLeibie").text("("+flagArray.length+"/5)");
	});
	

	//点击确定按钮收起下拉
	$("#selectOkZhibiao").on("click",function(e){
		var liebie='';
		$("#modelZhibiao").html('');
		var html='';
		$(".mx_zb_list .zhib_lists li .data-checkbox").each(function(index,item){
			if($(item).find("label.checkbox").hasClass("on")){
				//选择的一级指标
				var selectLeibieName=$(item).parent().parent().prev().find("label.checkboxWord").text();
				var selectLeibieValue=$(item).parent().parent().parent().attr("data-value");
				if(liebie.indexOf(selectLeibieValue)<=-1){
					if(liebie!=""){
						html+='<div class="clr"></div>';
						html+='</div>';
						html+='<div class="clr"></div>';
						html+='</div>';
					}
					html+='<div class="zhibiao_zhl">';
					html+='<span class="fl" data-value="'+selectLeibieValue+'">'+selectLeibieName+'：</span>';
					html+='<div class="fl zhibiao_ges">';
					liebie+=selectLeibieValue+",";
				}
				var key=$(item).parent().attr("data-value");
				var value=$(item).find("label.checkbox").eq(0).next().text();
				html+='<a href="javascript:;" data-value="'+key+'">'+value+'<i></i></a>';
			}
			if((index+1)==$(".mx_zb_list .zhib_lists li .data-checkbox").length){
				html+='<div class="clr"></div>';
				html+='</div>';
				html+='<div class="clr"></div>';
				html+='</div>';
			}
		});
		$("#modelZhibiao").html(html);
		var hei=$(".zhibiao_zhl").height();
		$(".zhibiao_zhl>span").css("height",hei);
		$(this).parent().slideUp();
		e.stopPropagation();
		//获取选中的指标:包含了所有的父级节点
//		var nodes = $('#modelListet').tree('getChecked', ['checked','indeterminate']);
//		var select=[];
//		//一级标题
//		var dataType_1_name="";
//		//二级标题
//		var dataType_2_name="";
//		//三级标题
//		var dataType_3_name="";
//		$.each(nodes,function(index,node){
//			//判断是指标还是标题 ：为''表示为标题，不为''表示为指标
//			if(node.attributes.keyId==""){//为''表示为标题
//				if(node.attributes.dataType==1){
//					dataType_1_name=node.text;
//				}else if(node.attributes.dataType==2){
//					dataType_2_name=node.text;
//				}else if(node.attributes.dataType==3){
//					dataType_3_name=node.text;
//				}
//			}else{//不为''表示为指标
//				//获取当前选择指标的key_id
//				//获取当前选择指标的名称
//				
//				if(index!=0 || index==(nodes.length-1)){//控制是否是指标
//					//显示的标题，拼接一级标题。二级标题。三级标题（ps：标题不确定层级）
//					var showTitle=dataType_1_name;
//					if(dataType_2_name!=""){
//						showTitle+="."+dataType_2_name
//					}
//					if(dataType_3_name!=""){
//						showTitle+="."+dataType_3_name
//					}
//					//
//					var selectZhibiaoAndName={};
//					selectZhibiaoAndName[showTitle]=node.attributes.keyId+";"+node.text;
////					console.log(selectZhibiaoAndName);
//					select.push(selectZhibiaoAndName);
//					//判断下一个是多少层级，用来清空标题名称
//					if(index==(nodes.length-1)){
//						dataType_1_name="";
//						dataType_2_name="";
//						dataType_3_name="";
//					}else{
//						var nextNode=nodes[index+1];
//						var nextDataType=nextNode.attributes.dataType;
//						if(nextDataType==1){
//							dataType_1_name="";
//							dataType_2_name="";
//							dataType_3_name="";
//						}else if(nextDataType==2){
//							dataType_2_name="";
//							dataType_3_name="";
//						}else if(nextDataType==3){
//							dataType_3_name="";
//						}else if(nextDataType==4){
//							
//						}
//					}
//				}
//			}
//		});
//		console.log(select);
//		var html='';
//		//显示指标：
//		var addZhibiao_zhl_div="";
//		$.each(select,function(index,item){
////			console.log(item);
//			$.each(item,function(key,value){
//				if(addZhibiao_zhl_div.indexOf(key.split("\.")[0])<=-1){
//					if(addZhibiao_zhl_div!=""){
//						html+='<div class="clr"></div>';
//						html+='</div>';
//						html+='<div class="clr"></div>';
//						html+='</div>';
//					}
//					html+='<div class="zhibiao_zhl">';
//					html+='<span class="fl">'+key.split("\.")[0]+'：</span>';
//					html+='<div class="fl zhibiao_ges">';
//					addZhibiao_zhl_div+=key.split("\.")[0]+",";
//				}
//				html+='<a href="javascript:;" data-title="'+key+'" data-value="'+value.split(";")[0]+'">'+value.split(";")[1]+'<i></i></a>';
//				if(index==(select.length-1)){
//					html+='<div class="clr"></div>';
//					html+='</div>';
//					html+='<div class="clr"></div>';
//					html+='</div>';
//				}
//			});
//		});
//		$("#modelZhibiao").html(html);
////		var hei=$(".zhibiao_zhl").height();
////		$(".zhibiao_zhl>span").css("height",hei);
//		$(this).parent().slideUp();
	});
	//删除已选的指标
	$(".moxing_zhibiao").delegate("i","click",function(){
		var data_id=$(this).parent().attr("data-value");
		$(".mx_zb_list .data-checkbox").each(function(index,item){
			if($(item).parent().attr("data-value")==data_id){
				$(item).find("label.checkbox").removeClass("on");
			}
		});
		var thisLength=$(this).parent().parent().find("a").length;
		if(thisLength==1){
			$(this).parent().parent().parent().remove();
		}
		$(this).parent().remove();
	})
	
	//点击我的研究里 的写报告的条目的删除符号
//	$(".yanjiu_neir").delegate("em","click",function(){
//		$(this).parent().parent().remove();
//	})
	//点击我的研究中的编辑按钮
//	$(".yanjiu_neir").delegate("i","click",function(){
//		window.open("/myResearch/editReport.html");
//
//	})
	//我的研究更多
	$("#moreMyResearch").on("click",function(){
		window.location.href='/myResearch/researchReport.html';
	});
	//====================================================模型计算-----开始
	$("#modelSeachStock").autocomplete({
		minLength: 2,
		source: function(request, response) {
			findCodeName(request, response);
		},
		delay: 500,
		select: function(event, ui) {
			var item = ui.item;
			$(".yd_img_icon").hide();
			$(".mx_yind").hide();
			$(".zhibiao_list").show();
			$(".mx_tc_btn").show();
		}
	});
	$("#modelSeachStock").keydown(function(e) {
		if(e.keyCode==13){
			//回车事件
			if($("#modelSeachStock").val() != "") {
				var val = $.trim($("#modelSeachStock").val());
				if(searchList.length != 0) {
					$.each(searchList, function(index, flag) {
						if(val.indexOf(flag.code) > -1  || val.indexOf(flag.name) > -1) {
							$("#modelSeachStock").val(flag.name+"("+flag.code+")");
						}
					});
					if($("#modelSeachStock").val().indexOf("(")<=-1){
						$("#modelSeachStock").val('');
					}
				}else{
					$("#modelSeachStock").val('');
					$.zmAlert("请输入正确的检索信息");
				}
			} else {
				$("#modelSeachStock").val('');
				$.zmAlert("请输入要检索的信息");
			}
			$("#ui-id-2").hide();
		}
	});
	//生成分析报告
	$("#toModelHtml").on("click",function(){
		var stock=$("#modelSeachStock").val();
		stock=$.trim(stock);
//		var zhibiao='';
//		var erjzongzhibiao='';
//		var erjizhibiao='';
//		$("#modelZhibiao").find("div.zhibiao_zhl").each(function(index,item){
//			var leiie=$(item).find("span").eq(0).text();
//			var leibiezhibiao="";
////			var zhibiao='';
//			$(this).find("a").each(function(i,t){
//				leibiezhibiao+=$(t).attr("data-value")+",";
//				//获取指标名称
//				//erjizhibiao+=$(t).text()+",";
//			});
//			leibiezhibiao=leibiezhibiao.substring(0,leibiezhibiao.length-1);
//			zhibiao+=leiie+"*"+leibiezhibiao+";";
//			//erjizhibiao=erjizhibiao.substring(0,erjizhibiao.length-1);//把指标的最后一个逗号去掉
//			//zongzhibiao=leiie+"*"+erjizhibiao+";";
//		});
//		console.log(zhibiao);
//		return false;
		//改版使用前端缓存技术传递参数（ps:因为选择的指标过多，可能导致url的限制问题）
		var selectModelZhibiaoArray=[];
		//循环选中的类别
		$("#modelZhibiao").find("div.zhibiao_zhl").each(function(index,item){
			//类别名称--标题需要重新构造
			var leiie=$(item).find("span").eq(0).text();
			//选中的指标主键
			var leibiezhibiao="";
			//循环选中的指标
			$(this).find("a").each(function(i,t){
				leibiezhibiao+=$(t).attr("data-value")+",";
			});
			leibiezhibiao=leibiezhibiao.substring(0,leibiezhibiao.length-1);
			var selectModelZhibiaoObject={};
			selectModelZhibiaoObject[leiie]=leibiezhibiao;
			selectModelZhibiaoArray.push(selectModelZhibiaoObject);
		});
		var leiieTmp="";
		var leibiezhibiao="";
		$("#modelZhibiao").find("a").each(function(i,t){
			var leiie=$(t).attr("data-title");
			if(leibiezhibiao==leiie){
				
			}
			var leibiezhibiao=$(t).attr("data-value");
		});
//		console.log(selectModelZhibiaoArray);
//		if(zhibiao==""){
//			errorAlert("","请选择指标");
//			return false;
//		}
		if(selectModelZhibiaoArray==null || selectModelZhibiaoArray.length==0){
			errorAlert("","请选择指标");
			return false;
		}
		if(stock==null || stock==""){
			errorAlert("","请检索股票代码");
			return false;
		}else{//如果用户直接输入则查询后台，看此公司是否存在
			$.axs("/betaInvest/enterpriseData/findCodeOrName.do",{codeName:stock},true,function(data){
				if(data.retCode=="0000"){
					var result =data.retData;
					if(result==null || result.stockCode==null){
						errorAlert("","请输入正确的公司名称或编码");
						return false;
					}else{
						stock=result.stockName+"("+result.stockCode+")";
						//zhibiao=zhibiao.substring(0,zhibiao.length-1);
						//zongzhibiao=zongzhibiao.substring(0,zongzhibiao.length-1)
						//主键
						var key_id=$("#modelZhibiao").attr("key_id");
						var modelParam={};
						modelParam.stock=stock;
						modelParam.select=selectModelZhibiaoArray;
						if(key_id==null || key_id=="" || key_id==undefined){
							modelParam.modelId="";
							//window.location.href="/myResearch/modelReportDetail.html?stock="+stock+"&zhibiao="+zhibiao;
						}else{
							modelParam.modelId=key_id;
							//指标回显
							//window.location.href="/myResearch/modelReportDetail.html?stock="+stock+"&zhibiao="+zhibiao+"&key="+key_id;
						}
						//将参数对象转换为字符转存放在缓存中
						localStorage.setItem("modelParam",JSON.stringify(modelParam));
//						console.log(modelParam);
//						return false;
						window.location.href="/myResearch/modelReportDetail.html";
					}
				}
			})
		}
	});
	searchNotice();
	//个股对标自动补全开始---------------------------------------------------------------------
	/*个股对标信息补全开始*/
	$("#SearchStockComparison").keydown(function(e) {
		if(e.keyCode==13){
			//回车事件
			if($("#SearchStockComparison").val() != "") {
				var value = $.trim($("#SearchStockComparison").val());
				if(searchList.length != 0) {
					$.each(searchList, function(index, flag) {
						if(value.indexOf(flag.code) > -1  || val.indexOf(flag.name) > -1) {
							$("#SearchStockComparison").val("");
							addComparisonStock(flag.code,flag.name);
							//window.open('/businessDetails/newTBindex.html?stockCode=' + flag.code + "&stockName=" + flag.name);
						}
					});
				}else{
					//$.zmAlert("请输入正确的检索信息");
				}
			} else {
				//$.zmAlert("请输入要检索的信息");
			}
			$("#ui-id-2").hide();
		}
	});
	
	//个股对标信息补全
	$("#SearchStockComparison").autocomplete({
		minLength: 2,
		source: function(request, response) {
			findCodeNameAddShangShi(request, response);
		},
		delay: 500,
		select: function(event, ui) {
			var item = ui.item;
		
			if($("#SearchStockComparison").val() != "") {
				var value=item.value;
//				console.log(value)
				var comparisonStockCode=item.code;
				var comparisonStockName=item.name;
				addComparisonStock(comparisonStockCode,comparisonStockName);
				$("#SearchStockComparison").val("");
				
			} else {
				//$.zmAlert("请输入要检索的信息");
			}
			$("#ui-id-2").hide();
			//console.log(item);
		}
	});
	
	//添加自选的补全信息-----------------------------------------------
	$("#SearchAddOptional").keydown(function(e) {
		if(e.keyCode==13){
			//回车事件
			if($.trim($("#SearchAddOptional").val()) != "") {
				var value =$.trim($("#SearchAddOptional").val());
				var val='';
				if(value.length>6){
					var first1=value.indexOf("(");
					var last1=value.indexOf(")");
					val=value.substring(first1+1,last1);
				}else{
					val=value;
				}
				addOptional(val,1);
				$("#SearchAddOptional").val("");
			} else {
				$.zmAlert("请输入要检索的信息");
			}
			$("#ui-id-2").hide();
		}
	});
	
	//添加自选的补全信息
	$("#SearchAddOptional").autocomplete({
		minLength: 2,
		source: function(request, response) {
			findCodeName(request, response);
		},
		delay: 500,
		select: function(event, ui) {
			var item = ui.item;
			//console.log(item)
//			console.log($("#SearchAddOptional").val())
			if($("#SearchAddOptional").val() != "") {
				var code=item.code;
				//console.log(code)
				addOptional(code,1);
				$("#SearchAddOptional").val("");
				//addOptionalStock(code);
				
			} else {
//				alert(0)
				//$.zmAlert("请输入要检索的信息");
			}
			$("#ui-id-2").hide();
			//console.log(item);
		}
	});
	
	var data=[{
	"id":1,
	"text":"My Documents",
	"children":[{
		"id":11,
		"text":"Photos",
		"state":"closed",
		"children":[{
			"id":111,
			"text":"Friend",
			"children":[{
			"id":121,
			"text":"Intel"
		}]
		},{
			"id":112,
			"text":"Wife"
		},{
			"id":113,
			"text":"Company"
		}]
	},{
		"id":12,
		"text":"Program Files",
		"children":[{
			"id":121,
			"text":"Intel"
		},{
			"id":122,
			"text":"Java",
			"attributes":{
				"p1":"Custom Attribute1",
				"p2":"Custom Attribute2"
			}
		},{
			"id":123,
			"text":"Microsoft Office"
		},{
			"id":124,
			"text":"Games",
			"checked":true
		}]
	},{
		"id":13,
		"text":"index.html"
	},{
		"id":14,
		"text":"about.html"
	},{
		"id":15,
		"text":"welcome.html"
	}]
}];

	//新模型
//
//function getChecked(){
//	var nodes = $('#modelListet').tree('getChecked');
//	//console.log(nodes)
//	
//	var s = '';
//	for(var i=0; i<nodes.length; i++){
//		if (s != '') s += ',';
//		s += nodes[i].text;
//	}
//	//console.log(s)
//}
/**
 * 树形结构数据
 */
//using('tree', function(){
////	 $.ajax({
////	     type: 'GET',
////	     url: 'tree_data1.json',
////	     success: function (result) {
////	         //var myJson = eval('(' + result + ')');
////	         $('#modelListet').tree({
////				animate:true,
////				checkbox:true,
////				data:result
////				});
//////				getChecked();
////	     }
////	 });
//	$.axs("/betaInvest/common/findWorkBook.do",{type:12},false,function(data){
//		if(data.retCode=="0000"){
//			var result =data.retData;
//			if(result==null || result.length<=0){
//				return false;
//			}
//			//所有父级id相同的指标存在在一个数组中，父级ID为KEY，数据为value存放在map中
//			var key_pid_and_val_treeType={};
//			//当前的数据是多少层级
////			var key_pid_and_val_cengji={};
//			for(var i=0;i<result.length;i++){
//				var obj=result[i];
//				//获取key的数据，为空或者不存在，初始化一个数据
//				var val_treeType_Array=key_pid_and_val_treeType[obj.parentId];
//				if(val_treeType_Array==undefined || val_treeType_Array==null){
//					val_treeType_Array=new Array();
//				}
//				//树形结构的数据格式
//				var treeTypeObj={};
//				treeTypeObj.id=obj.id;
//				treeTypeObj.text=obj.nameCn;
//				treeTypeObj.checked=false;
//				if(obj.nameEn=="" || obj.nameEn==null){
//					treeTypeObj.state="open";
//				}else{
//					treeTypeObj.state="closed";
//				}
//				treeTypeObj.attributes={"keyId":obj.nameEn,"dataType":obj.dataType};
//				//树形结构格式的数据存放在value数组中
//				val_treeType_Array.push(treeTypeObj);
//				//父级ID为KEY，数据为value存放在map中
//				key_pid_and_val_treeType[obj.parentId]=val_treeType_Array;
////				key_pid_and_val_cengji[obj.parentId]=obj.dataType;
//			}
////			console.log(key_pid_and_val_treeType);
//			//组装成tree形结构
//			var treeData=[];
//			$.each(key_pid_and_val_treeType[0],function(index,obj){
//				obj.children=key_pid_and_val_treeType[obj.id];
//				//查看子节点下是否还有子节点
//				$.each(obj.children,function(i,item){
//					if(key_pid_and_val_treeType[item.id]!=null && key_pid_and_val_treeType[item.id]!=undefined){
//						item.children=key_pid_and_val_treeType[item.id];
//						$.each(item.children,function(j,t){
//							t.children=key_pid_and_val_treeType[t.id];
//						});
//					}
//				});
//				treeData.push(obj);
//			});
//			console.log("树形结构数据:");
//			console.log(treeData);
//	        $('#modelListet').tree({
//	        	animate:true,
//	        	checkbox:true,
//	        	data:treeData
//			});
//		}else{
//			errorAlert("",data.retMsg)
//		}
//	});
//});
	
});
function hideCzzxi(){
	$(".czzx_i").css("z-index",-1);
	
}

function operationCenter(){
	var html='<div class="operation_Center circle_fixed">';
		html+='<div id="circle_wrapper">';
		html+='<b class="tongzhi_icons" style="display: none;"></b>';
		html+='<span class="czzx_icon"></span>';
		html+='<i class="czzx_i"></i>';
		//系统通知的小点
		//html+='<b class="tongzhi_icons"></b>';
		
		html+='<span class="shanc_czzx" style="display: none;"></span>';
		html+='<div class="czzx_db_box">';
		html+='<div class="czzx_content">';
		html+='<h2>操作中心</h2>';
		html+='<ul class="cz_list">';
		html+='<li class="wodeyanjiu">';
		html+='<a href="javascript:;"><i class="cz_ai">我的研究</i><em class="cz_em" id="studyNumTotal">（0）</em><div class="clr"></div></a>';
		html+='</li>';
		html+='<li class="gegu_duibiao">';
		html+='<a href="javascript:void(0);"><i class="cz_ai">个股对标</i><em class="cz_em">（0）</em><div class="clr"></div></a>';
		html+='</li>';
		html+='<li class="zixuangu">';
		html+='<a href="javascript:void(0);"><i class="cz_ai">自选股</i><em class="cz_em" id="zixuanguNumTotal">（0）</em><div class="clr"></div></a>';
		html+='</li>';
		html+='<li class="tongzhi">';
		html+='<a href="javascript:;"><i class="cz_ai">通知</i><em class="cz_em" id="messageNum">（0）</em><div class="clr"></div></a>';
		html+='</li>';
		html+='<li class="yijian_fankui">';
		html+='<a href="javascript:;"><i class="cz_ai">意见反馈</i><div class="clr"></div></a>';
		html+='</li>';
		html+='</ul>';
		html+='</div>';
//			<!--我的研究弹窗-->
		html+='<div class="wode_yanjiu tanc_public" style="display: none;">';
	//研究图表的第一次点击引导的图片内容
		html+='<div class="xbg_sc_dianji tongzhi_yindao_img" style="display: none;">';
		html+='<em class="tiaoguo">跳过</em>';
	//写报告图片
		html+='<div class="show_img1"></div>';
	//图表分析
		html+='<div class="show_img2" style="display: none;"></div>';
	//模型计算
		html+='<div class="show_img3" style="display: none;"></div>';
		
		html+='<div class="shure_btn">';
		html+='<span class="yanjiu_wzd"></span>';
		html+='</div>';
		html+='</div>';
		
		
		html+='<i class="chahao"></i>';
		html+='<div class="top_titles">';
		html+='<span>我的研究</span>';
		html+='</div>';
		html+='<div class="yanjiu_main">';
		html+='<div class="fl yanjiu_leixing">';
		html+='<ul>';
		html+='<li class="xiebg" onClick=window.location.href="/myResearch/add-report.html">';
		html+='<i></i>';
		html+='<a href="javascript:;" src="/saasBeta/myResearch/add-report.html">写报告</a>';
//		html+='<b>写报告</b>';
		html+='</li>';
		html+='<li class="tub_fenxi" onClick=window.location.href="/myResearch/newsindexLibrary.html">';
		html+='<i></i>';
		html+='<a href="javascript:;">图表分析</a>';
		html+='</li>';
		html+='<li class="mox_jisuan">';
		html+='<i></i>';
		html+='<b>模型计算</b>';
		html+='</li>';
		html+='</ul>';
		html+='</div>';
	//立即创建研报提示(没有创建的时候)
		html+='<div class="fl cj_yanbao" style="display: none;">';
		html+='<div class="chuanj_btn">';
		html+='<span onClick=window.location.href="/myResearch/add-report.html">立即创建研报</span>';
		html+='</div>';
		html+='<div class="yanbao_yindao">';
		html+='<span></span>';
		html+='</div>';
		html+='</div>';
	
    //研报内容
		html+='<div class="fl yanjiu_neir">';
		html+='<ul id="myResearchDivShow">';
		
		
//		html+='<li>';
//		html+='<div class="fl yanjiu_time">';
//		html+='<span>天阳科技尽调报告</span>';
//		html+='<p>更新时间：<em>2017-05-23 09:00</em></p>';
//		html+='</div>';
//		html+='<div class="fl yanjiu_bianji" style="display: none;">';
//		html+='<i></i>';
//		html+='<em></em>';
//		html+='</div>';
//		html+='<div class="clr"></div>';
//		html+='</li>';
//		html+='<li>';
//		html+='<div class="fl yanjiu_time">';
//		html+='<span>天阳科技尽调报告</span>';
//		html+='<p>更新时间：<em>2017-05-23 09:00</em></p>';
//		html+='</div>';
//		html+='<div class="fl yanjiu_bianji" style="display: none;">';
//		html+='<i></i>';
//		html+='<em></em>';
//		html+='</div>';
//		html+='<div class="clr"></div>';
//		html+='</li>';
//		html+='<li>';
//		html+='<div class="fl yanjiu_time">';
//		html+='<span>天阳科技尽调报告</span>';
//		html+='<p>更新时间：<em>2017-05-23 09:00</em></p>';
//		html+='</div>';
//		html+='<div class="fl yanjiu_bianji" style="display: none;">';
//		html+='<i></i>';
//		html+='<em></em>';
//		html+='</div>';
//		html+='<div class="clr"></div>';
//		html+='</li>';


		html+='</ul>';
	//原来的暂无数据不需要了
		/*html+='<div class="zwu_shuju" style="display: none;">';
		html+='<div class="wushuj_tub">';
		html+='<span>';
		html+='<img src="/saasBeta/images/zwsj.png" alt="" />';
		html+='</span>';
		html+='<p>暂无数据</p>';
		html+='</div>';
		html+='</div>';*/
		
		html+='<div class="yanjiu_more" id="moreMyResearch">';
		html+='<a href="javascript:;">更多</a>';
		html+='</div>';
		html+='</div>';
		html+='<div class="clr"></div>';
		html+='</div>';
		html+='</div>';
		
	//<!--个股指标的弹窗-->
		html+='<div class="gegu_zb tanc_public" style="display: none;">';
	//个股指标的引导弹窗
		html+='<div class="xbg_sc_dianji" style="display: none;">';
		html+='<em class="tiaoguo">跳过</em>';
	//地图引导图片
		html+='<div class="gegu_show_img1"></div>';
	//行业引导图片
		html+='<div class="gegu_show_img2" style="display: none;"></div>';
	//财务对比引导图片
		html+='<div class="gegu_show_img3" style="display: none;"></div>';
		html+='<div class="shure_btn">';
		html+='<span class="gegu_wzhidao"></span>';
		html+='</div>';
		html+='</div>';
		
		
		html+='<i class="chahao"></i>';
		html+='<div class="top_titles">';
		html+='<span>个股对标<em>（2/4）</em></span>';
		html+='</div>';
		html+='<div class="fl yanjiu_leixing">';
		html+='<ul>';
		html+='<li class="czzx_ditu" onClick=window.location.href="/dataAnalysis/companyQuotation.html">';
		html+='<i></i>';
		html+='<a href="/dataAnalysis/companyQuotation.html">地图选股</a>';
		html+='</li>';
		html+='<li class="czzx_hy" onClick=window.location.href="/dataAnalysis/stockRankings.html">';
		html+='<i></i>';
		html+='<a href="/dataAnalysis/stockRankings.html">行业选股</a>';
		html+='</li>';
		html+='<li class="caiwushuju" onClick=window.location.href="/contrast/comprehensive.html">';
		html+='<i></i>';
		html+='<a href="/contrast/comprehensive.html">深度对比</a>';
		html+='</li>';
		html+='</ul>';
		html+='</div>';
		html+='<div class="fl gegu_zhib">';
		html+='<ul class="duibi_zb">';
		
//		html+='<li>';
//		html+='<a href="javascript:;">天阳科技（835713）</a>';
//		html+='<i></i>';
//		html+='</li>';
//		html+='<li>';
//		html+='<a href="javascript:;">天阳科技（835713）</a>';
//		html+='<i></i>';
//		html+='</li>';
//		html+='<li>';
//		html+='<a href="javascript:;">天阳科技（835713）</a>';
//		html+='<i></i>';
//		html+='</li>';

		html+='</ul>';
		
		/*html+='<div class="zwu_shuju" style="display: none;">';
		html+='<div class="wushuj_tub">';
		html+='<span>';
		html+='<img src="/saasBeta/images/zwsj.png" alt="" />';
		html+='</span>';
		html+='<p>暂无数据</p>';
		html+='</div>';
		html+='</div>';*/
		
		html+='<div class="cz_duibi">';
		html+='<span>对比</span>';
		html+='</div>';
		html+='<div id="duibi_xg_title" style="display:none;"><p style="padding:10px 0 0 20px;">相关企业</p>';
		html+='<ul class="duibi_xg" id="duibi_xg">';
		html+='</ul></div>';
	//个股指标的搜索框
		html+='<div class="fl gegu_searches" style="display: none;">';
		html+='<div class="zixuan_xuank">';
		html+='<input type="text" placeholder="搜索公司简称/代码，添加对比" id="SearchStockComparison"/>';
		html+='<i class="search_zixuan_icon"></i>';
		html+='</div>';
		html+='<div class="yindao_gegu">';
		html+='<span></span>';
		html+='</div>';
		html+='</div>';
		
		html+='<div class="clr"></div>';
		html+='</div>';
	//自选股的弹窗
		html+='<div class="zixuangu_tc tanc_public" style="display: none;">';
	//自选股的引导弹窗
		html+='<div class="xbg_sc_dianji" style="display: none;">';
		html+='<em class="tiaoguo">跳过</em>';
	//地图引导图片
		html+='<div class="zx_show_img1"></div>';
		html+='<div class="shure_btn">';
		html+='<span></span>';
		html+='</div>';
		html+='</div>';
		
		html+='<i class="chahao"></i>';
		html+='<div class="top_titles"><span>自选股<i class="zx_num">（6）</i></span></div>';
	//自选股的搜做框
		html+='<div class="zixuan_searches" style="display: none;">';
		html+='<div class="zixuan_xuank">';
		html+='<input type="text" placeholder="搜索公司简称/代码，添加自选" id="SearchAddOptional" />';
		html+='<i class="search_zixuan_icon"></i>';
		html+='</div>';
		html+='<div class="yindao_zixuan">';
		html+='<span></span>';
		html+='</div>';
		html+='</div>';
	//自选股的内容	
		html+='<div class="zixuan_list">';
		html+='<div class="top">';
		html+='<ul>';
		html+='<li class="gg_titles">';
		html+='<span>股票</span>';
		html+='<span>最新价</span>';
		html+='<span>涨跌幅</span>';
		html+='<span></span>';
		html+='<div class="clr"></div>';
		html+='</li>';
		html+='</ul>';
		html+='</div>';
		html+='<ul class="gp_content_nr">';
		
		//自选股的弹窗
		/*html+='<li>';
		html+='<span class="gs_gg_name">天阳科技（835713）</span>';
		html+='<span class="down">18.44</span>';
		html+='<span class="up">18.44%</span>';
		html+='<span class="cz_sc" style="display: none;">';
		html+='<em class="czzx_tix"></em>';
		html+='<i class="czzx_ljk"></i>';
		html+='</span>';
		html+='<div class="clr"></div>';
		html+='</li>';
		html+='<li>';
		html+='<span class="gs_gg_name">天阳科技（835713）</span>';
		html+='<span class="down">18.44</span>';
		html+='<span class="up">18.44%</span>';
		html+='<span class="cz_sc" style="display: none;">';
		html+='<em class="czzx_tix"></em>';
		html+='<i class="czzx_ljk"></i>';
		html+='</span>';
		html+='<div class="clr"></div>';
		html+='</li>';
		html+='<li>';
		html+='<span class="gs_gg_name">天阳科技（835713）</span>';
		html+='<span class="down">18.44</span>';
		html+='<span class="up">18.44%</span>';
		html+='<span class="cz_sc" style="display: none;">';
		html+='<em class="czzx_tix"></em>';
		html+='<i class="czzx_ljk"></i>';
		html+='</span>';
		html+='<div class="clr"></div>';
		html+='</li>';*/
		
		
		html+='</ul>';
		html+='</div>';
		html+='<div class="zixuan_btn">';
		html+='<span class="zixuan_more">更多</span>';
		html+='</div>';
		html+='</div>';
		
		
	//<!--通知的弹窗-->
		html+='<div class="cz_news" style="display: none;">';
	//通知的引导弹窗
		html+='<div class="xbg_sc_dianji" style="display: none;">';
		html+='<em class="tiaoguo">跳过</em>';
	//通知的引导图片
		html+='<div class="zx_show_img1"></div>';
		html+='<div class="shure_btn">';
		html+='<span></span>';
		html+='</div>';
		html+='</div>';
		
		html+='<i class="chahao"></i>';
		html+='<div class="news_types">';
		html+='<span class="xit_tongzhi on">系统通知</span>';
		html+='<span class="gg_gongao">个股公告</span>';
		html+='<span class="gg_tixing">股价提醒</span>';
		html+='</div>';
//				<!--系统通知-->
		html+='<div class="xitong_tz">';
		html+='<ul>';
						//<!--当消息未读的是em添加on类-->  
		/*html+='<li>';
		html+='<h3><i>金衡数据例行维护统治</i><em class="on"></em><b class="shanchu_lajik"></b></h3>';
		html+='<p class="tz_times">2017-05-23  3:00</p>';
		html+='<p class="tz_neirong">尊敬的用户，我司将于本周六（3月18日）20：00-周日-5：00期间进行系统升级维护服务</p>';
		html+='</li>';
		html+='<li>';
		html+='<h3><i>金衡数据例行维护统治</i><em></em><b class="shanchu_lajik"></b></h3>';
		html+='<p class="tz_times">2017-05-23  3:00</p>';
		html+='<p class="tz_neirong">尊敬的用户，我司将于本周六（3月18日）20：00-周日-5：00期间进行系统升级维护服务</p>';
		html+='</li>';*/
		
		
		html+='</ul>';
	//原来的系统通知的暂无数据	
		html+='<div class="tongzhi_zanwu_shuju" style="display: none;">';
		html+='<div class="wushuj_tub">';
		html+='<span>';
		html+='<img src="/saasBeta/images/zwsj.png" alt="" />';
		html+='</span>';
		html+='<p>暂无数据</p>';
		html+='</div>';
		html+='</div>';
		html+='</div>';
				//<!--个股公告-->
		html+='<div class="gegu_gg" style="display: none;">';
		html+='<ul>';
		
		/*html+='<li>';
		html+='<h2><i>【中科软】关于定向发行股票的相关事宜通知</i><em class="on"></em><b class="shanchu_lajik"></b></h2>';
		html+='<p class="gegu_time">2017-05-23 3:00</p>';
		html+='</li>';
		html+='<li>';
		html+='<h2><i>【中科软】关于定向发行股票的相关事宜通知</i><em></em><b class="shanchu_lajik"></b></h2>';
		html+='<p class="gegu_time">2017-05-23 3:00</p>';
		html+='</li>';
		html+='<li>';
		html+='<h2><i>【中科软】关于定向发行股票的相关事宜通知</i><em class="on"></em><b class="shanchu_lajik"></b></h2>';
		html+='<p class="gegu_time">2017-05-23 3:00</p>';
		html+='</li>';*/
		
		
		html+='</ul>';
		html+='<div class="tongzhi_zanwu_shuju" style="display: none;">';
		html+='<div class="wushuj_tub">';
		html+='<span>';
		html+='<img src="/saasBeta/images/zwsj.png" alt="" />';
		html+='</span>';
		html+='<p>暂无数据</p>';
		html+='</div>';
		html+='</div>';
		
		html+='</div>';
				//<!--股价提醒-->
		html+='<div class="gujia_tixing" style="display: none;">';
		html+='<ul>';
		
		/*html+='<li>';
		html+='<p class="gujia_company"><a href="javascript:;">【中科软430002】</a><i>2017-05-23 3：00</i><em></em><b class="shanchu_lajik"></b></p>';
		html+='<span>最新股价：<em>15.66</em>元</span>';
		html+='<span>卖出目标价：<em>15.00</em>元</span>';
		html+='<span>最新价<em>已高出卖出目标价，</em>请注意！</span>';
		html+='</li>';
		html+='<li>';
		html+='<p class="gujia_company"><a href="javascript:;">【中科软430002】</a><i>2017-05-23 3：00</i><em></em><b class="shanchu_lajik"></b></p>';
		html+='<span>最新股价：<em>15.66</em>元</span>';
		html+='<span>卖出目标价：<em>15.00</em>元</span>';
		html+='<span>最新价<em>已高出卖出目标价，</em>请注意！</span>';
		html+='</li>';
		html+='<li>';
		html+='<p class="gujia_company"><a href="javascript:;">【中科软430002】</a><i>2017-05-23 3：00</i><em></em><b class="shanchu_lajik"></b></p>';
		html+='<span>最新股价：<em>15.66</em>元</span>';
		html+='<span>卖出目标价：<em>15.00</em>元</span>';
		html+='<span>最新价<em>已高出卖出目标价，</em>请注意！</span>';
		html+='</li>';*/
		
		html+='</ul>';
		html+='<div class="tongzhi_zanwu_shuju" style="display: none;">';
		html+='<div class="wushuj_tub">';
		html+='<span>';
		html+='<img src="/saasBeta/images/zwsj.png" alt="" />';
		html+='</span>';
		html+='<p>暂无数据</p>';
		html+='</div>';
		html+='</div>';
		
		html+='</div>';
		html+='</div>';
			//<!--意见反馈的弹窗-->
		html+='<div class="yijanfankui" style="display: none;">';
		html+='<i class="chahao"></i>';
		html+='<h3>感谢您的反馈</h3>';
		html+='<div class="fankiu_main" style="position: relative;">';
		html+='<textarea placeholder="最多输入200字" id="fankui" maxlength="200"></textarea>';
		html+='<label id="fankui_error"></label>'
		html+='</div>';
		html+='<div class="tijiao_fankui">';
		html+='<span>提交</span>';
		html+='</div>';
		html+='</div>';
		html+='</div>';
		html+='</div>';
		html+='</div>';
		html+='<div class="czzx_bg" style="display: none;"></div>';
		//<!--模型计算的弹窗-->
		html+='<div class="mox_tc" style="display: none;">';
		html+='<i class="chahao"></i>';
		html+='<div class="top_titles">';
		html+='<span>财务模型分析</span>';
		html+='</div>';
		html+='<div class="caiwu_zb_types">';
		html+='<div class="mx_yind"><p>请先输入要分析的股票</p></div>';
		html+='<input type="text" placeholder="输入分析股票简称或代码，按回车确认" id="modelSeachStock"/>';
		//未输入股票代码时显示的引导
		
		html+='<div class="yd_img_icon">';
		html+='<span></span>';
		html+='</div>';
		
		
		html+='<div class="zhibiao_list" style="display: none;">';
		html+='<div class="select_mox_zb">';
		html+='<p>选择指标</p>';
		html+='<div class="mx_zb_list" style="display: none;">';
		html+='<span class="fenxi_zb_num">财务分析模型<em id="selectLeibie">(0/5)</em></span>';
		html+='<ul>';
	//新的模型指标的树形结构
//		html+='<div class="easyui-panel" style="width:400px">';
//		html+='<ul id="modelListet" class="easyui-tree" ></ul>';
//		html+='</div>';
//		html+='</ul>';
		html+='<li class="zhib_lists" data-value="4" id="zhibiaoleixing_4">';
		//<!--当span含有on时是闭合的状态-->
//		html+='<span class="nodes on">偿债能力</span>';
		html+='<div class="nodes">';
		html+='<div class="data-checkbox">';
		html+='<input type="checkbox" />';
		html+='<label class="checkbox"></label>';
		html+='<label class="checkboxWord">偿债能力</label>';
		html+='<i class="fx"></i>';
		html+='</div>';
		html+='</div>';
		
		html+='<ul style="display: none;">';
//		html+='<li data-value="4" id="zhibiaoleixing_4">';
//		html+='<div class="data-checkbox">';
//		html+='<input type="checkbox" />';
//		html+='<label class="checkbox on"></label>';
//		html+='<label class="checkboxWord">变现能力比率</label>';
//		html+='</div>';
//		html+='</li>';
//		html+='<li data-value="5" id="zhibiaoleixing_5">';
//		html+='<div class="data-checkbox">';
//		html+='<input type="checkbox" />';
//		html+='<label class="checkbox"></label>';
//		html+='<label class="checkboxWord">资产管理比率</label>';
//		html+='</div>';
//		html+='</li>';
//		html+='<li>';
//		html+='<div class="data-checkbox">';
//		html+='<input type="checkbox" />';
//		html+='<label class="checkbox"></label>';
//		html+='<label class="checkboxWord">负债管理比率</label>';
//		html+='</div>';
//		html+='</li>';
		html+='</ul>';
		html+='</li>';
		html+='<li class="zhib_lists" data-value="5" id="zhibiaoleixing_5">';
		//<!--当span含有on时是闭合的状态-->
//		html+='<span class="nodes on">营运能力</span>';
		html+='<div class="nodes">';
		html+='<div class="data-checkbox">';
		html+='<input type="checkbox" />';
		html+='<label class="checkbox"></label>';
		html+='<label class="checkboxWord">营运能力</label>';
		html+='<i class="fx"></i>';
		html+='</div>';
		html+='</div>';
		
		html+='<ul style="display: none;">';
		html+='</ul>';
		html+='</li>';
		html+='<li class="zhib_lists" data-value="6" id="zhibiaoleixing_6">';
		//<!--当span含有on时是闭合的状态-->
//		html+='<span class="nodes on">负债比率</span>';
		html+='<div class="nodes">';
		html+='<div class="data-checkbox">';
		html+='<input type="checkbox" />';
		html+='<label class="checkbox"></label>';
		html+='<label class="checkboxWord">负债比率</label>';
		html+='<i class="fx"></i>';
		html+='</div>';
		html+='</div>';
		
		html+='<ul style="display: none;">';
		html+='</ul>';
		html+='</li>';
		html+='<li class="zhib_lists" data-value="7" id="zhibiaoleixing_7">';
		//<!--当span含有on时是闭合的状态-->
//		html+='<span class="nodes on">每股指标</span>';
		html+='<div class="nodes">';
		html+='<div class="data-checkbox">';
		html+='<input type="checkbox" />';
		html+='<label class="checkbox"></label>';
		html+='<label class="checkboxWord">每股指标</label>';
		html+='<i class="fx"></i>';
		html+='</div>';
		html+='</div>';
		
		html+='<ul style="display: none;">';
		html+='</ul>';
		html+='</li>';
		html+='<li class="zhib_lists" data-value="8" id="zhibiaoleixing_8">';
		//<!--当span含有on时是闭合的状态-->
//		html+='<span class="nodes on">盈利能力</span>';
		html+='<div class="nodes">';
		html+='<div class="data-checkbox">';
		html+='<input type="checkbox" />';
		html+='<label class="checkbox"></label>';
		html+='<label class="checkboxWord">盈利能力</label>';
		html+='<i class="fx"></i>';
		html+='</div>';
		html+='</div>';
		
		html+='<ul style="display: none;">';
		html+='</ul>';
		html+='</li>';
		html+='<li class="zhib_lists" data-value="9" id="zhibiaoleixing_9">';
		//<!--当span含有on时是闭合的状态-->
//		html+='<span class="nodes on">资本结构</span>';
		html+='<div class="nodes">';
		html+='<div class="data-checkbox">';
		html+='<input type="checkbox" />';
		html+='<label class="checkbox"></label>';
		html+='<label class="checkboxWord">资本结构</label>';
		html+='<i class="fx"></i>';
		html+='</div>';
		html+='</div>';

		html+='<ul style="display: none;">';
		html+='</ul>';
		html+='</li>';
		html+='<li class="zhib_lists" data-value="01" id="zhibiaoleixing_10">';
		//<!--当span含有on时是闭合的状态-->
//		html+='<span class="nodes on">成长能力</span>';
		html+='<div class="nodes">';
		html+='<div class="data-checkbox">';
		html+='<input type="checkbox" />';
		html+='<label class="checkbox"></label>';
		html+='<label class="checkboxWord">成长能力</label>';
		html+='<i class="fx"></i>';
		html+='</div>';
		html+='</div>';
		
		html+='<ul style="display: none;">';
		html+='</ul>';
		html+='</li>';
		html+='<li class="zhib_lists" data-value="11" id="zhibiaoleixing_11">';
		//<!--当span含有on时是闭合的状态-->
//		html+='<span class="nodes on">现金流分析</span>';
		html+='<div class="nodes">';
		html+='<div class="data-checkbox">';
		html+='<input type="checkbox" />';
		html+='<label class="checkbox"></label>';
		html+='<label class="checkboxWord">现金流分析</label>';
		html+='<i class="fx"></i>';
		html+='</div>';
		html+='</div>';
		
		html+='<ul style="display: none;">';
		html+='</ul>';
		html+='</li>';
		html+='<li class="zhib_lists" data-value="12" id="zhibiaoleixing_12">';
		//<!--当span含有on时是闭合的状态-->
//		html+='<span class="nodes on">杜邦分析</span>';
		html+='<div class="nodes">';
		html+='<div class="data-checkbox">';
		html+='<input type="checkbox" />';
		html+='<label class="checkbox"></label>';
		html+='<label class="checkboxWord">杜邦分析</label>';
		html+='<i class="fx"></i>';
		html+='</div>';
		html+='</div>';
//		
		html+='<ul style="display: none;">';
		html+='</ul>';
		html+='</li>';
		html+='<li class="zhib_lists" data-value="13" id="zhibiaoleixing_13">';
		//<!--当span含有on时是闭合的状态-->
//		html+='<span class="nodes on">估值分析</span>';
		html+='<div class="nodes">';
		html+='<div class="data-checkbox">';
		html+='<input type="checkbox" />';
		html+='<label class="checkbox"></label>';
		html+='<label class="checkboxWord">估值分析</label>';
		html+='<i class="fx"></i>';
		html+='</div>';
		html+='</div>';
//		
		html+='<ul style="display: none;">';
		html+='</ul>';
		html+='</li>';
		html+='</ul>';
		html+='<div class="mox_shure" id="selectOkZhibiao"><span>确定</span></div>';
		html+='</div>';
		html+='</div>';
		html+='</div>';
		html+='<div class="moxing_zhibiao" id="modelZhibiao">';
//		html+='<div class="zhibiao_zhl">';
//		html+='<span class="fl">比率分析模型:</span>';
//		html+='<div class="fl zhibiao_ges">';
//		html+='<a href="javascript:;" data-id="">变现能力分析<i></i></a>';
//		html+='<a href="javascript:;" data-id="">变现能力分析<i></i></a>';
//		html+='<a href="javascript:;" data-id="">变现能力分析<i></i></a>';
//		html+='<div class="clr"></div>';
//		html+='</div>';
		html+='<div class="clr"></div>';
		html+='</div>';
		html+='<div class="clr"></div>';
		html+='</div>';
		html+='<div class="mx_tc_btn" id="toModelHtml" style="display:none">生成分析报告</div>';
		html+='</div>';
		html+='</div>';
		//<!--提示保存的弹窗-->
//		html+='<div class="tub_tc" style="display: block;"></div>';
//		html+='<div class="tips_shanchu" style="display: block;">';
//		html+='<b class="tc_shanchu"></b>';
//		html+='<h2>提示</h2>';
//		html+='<p>已提反馈</p>';
//		html+='<div class="shanchu_btn">';
//		html+='<span class="shanc_btn bianji_tub">确定</span>';
//				
//		html+='</div>';
//		html+='</div>';
	
	$("body").append(html);
}


/**
 * 初始化对比公司
 */
function initComparisonStock(){
//	console.log("进入操作中心初始化")
	//清空对比
	$(".duibi_zb").html('');
	//获取数据
//	var userId=localStorage.getItem("userId");
//	var stockInfo=localStorage.getItem(userId);
	var stockInfo = findContrastCompany();
//	console.log("全部对比：" + stockInfo)
	//TODO 测试数据
	//stockInfo="430035-中兴通融,430003-北京时代,430004-绿创设备"
	if(stockInfo=="" || stockInfo==null || stockInfo=="undefined" || stockInfo==",-," || stockInfo=="," || stockInfo=="-,"){
		//跳转暂无对标企业
//		window.location.href="multiStockAnalysis.html";
		$(".duibi_zb").html('');
		$(".top_titles").find("span").find("em").html("（"+0+"/4）");
		$(".gegu_duibiao").find("em.cz_em").html("（"+0+"）");
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
		var hrefStr = "javascript:;";
		if(isXSBCompany(stockCodesSplit[i])){ //判断是否为新三板公司
			hrefStr = '/businessDetails/newTBindex.html?stockCode='+stockCodesSplit[i]+'&stockName='+stockNamesSplit[i];
		}
		//<a href="javascript:;">天阳科技(835713)<i></i></a>
		comparisonStockCodeHtml+='<li><a '+(isXSBCompany(stockCodesSplit[i]) ? "target='_blank'":"")+' href='+hrefStr+'>'+stockNamesSplit[i]+'('+stockCodesSplit[i]+')</a><i></i></li>';
	}
	$(".duibi_zb").html(comparisonStockCodeHtml);
	$(".top_titles").find("span").find("em").html("（"+stockCodesSplit.length+"/4）");
	$(".gegu_duibiao").find("em.cz_em").html("（"+stockCodesSplit.length+"）");
//	$("#tipsTitle").html("温馨提示：可添加"+(comparisonStockNum-stockCodesSplit.length)+"个企业");
	//设置缓存信息
//	setLocalStorage();
	setContrastCompany();
}
/**
 * 添加对比公司
 * @param comparisonStockCode 股票代码
 * @param comparisonStockName 股票名称
 * @returns {Boolean}
 */
function addComparisonStock(comparisonStockCode,comparisonStockName){
	var returnValue=true;
	var length=$(".duibi_zb").find("li").length;
	if(length!=null && length>=4){
		errorAlert("","最多可添加四个公司");
		return false;
	}
//	var userId=localStorage.getItem("userId");
//	var showName=localStorage.getItem(userId);
	var showName = findContrastCompany();
	if(showName!=null && showName!="" && showName!==undefined && showName.indexOf(comparisonStockCode)>-1 && showName.indexOf(comparisonStockName)>-1 ){
		errorAlert("","该公司已存在对比列表");
		return false;
	}
	var hrefStr = "javascript:;";
	console.log(isXSBCompany(comparisonStockCode))
	if(isXSBCompany(comparisonStockCode)){ //判断是否为新三板公司
		hrefStr = '/businessDetails/newTBindex.html?stockCode='+comparisonStockCode+'&stockName='+comparisonStockName;
	}
	$(".duibi_zb").append('<li><a '+(isXSBCompany(comparisonStockCode) ? "target='_blank'":"")+' href="'+hrefStr+'">'+comparisonStockName+'('+comparisonStockCode+')</a><i></i></li>');
	//相关企业
	if(comparisonStockCode){
		var xgHtml='';
		var paraminfo='{"body":{"stockCode":"'+comparisonStockCode+'","number":"3"}}';
		$.axsRequest("FT343",paraminfo,false,function(data){
					var retData=data.retData;
	                 if(data.retCode=="0000"){
			            for(var i=0;i<retData.length;i++){
	                 		xgHtml+='<li StockCode="'+retData[i].stockCode+'"><a>'+retData[i].stockName+'('+retData[i].stockCode+')</a><i></i></li>';
			            		$(".duibi_zb,.duibi_xg").css("height","140px");
			            		$("#duibi_xg_title").show();
			            		$("#duibi_xg").html(xgHtml);
	                 	}
	                 }
	             });
	}
	
	$(".top_titles").find("span").find("em").html("（"+$(".duibi_zb").find("li").length+"/4）");
	$(".gegu_duibiao").find("em.cz_em").html("（"+$(".duibi_zb").find("li").length+"）");
	//设置缓存信息
//	setLocalStorage();
	setContrastCompany();
	var pathName=location.pathname;
	if((pathName.indexOf("comprehensive.html")==-1
			&& pathName.indexOf("multidStockTrendComparison.html")==-1
			&& pathName.indexOf("multidStockRankingAnalysis.html")==-1
			&& pathName.indexOf("companyBepthComparison.html")==-1) || (!$(".gegu_zb").is(":hidden"))){
		//显示操作中心
		$(".czzx_icon").click();
		//显示对比弹框
		$(".gegu_duibiao").click();
	}
	
	if((pathName.indexOf("companyBepthComparison.html") > -1) && (!$(".gegu_zb").is(":hidden"))){
		initHeader();
	}
	return true;
}
/**
 * 删除对比公司
 * @param comparisonStockCode
 * @param comparisonStockName
 */
function removeComparisonStock(comparisonStockCode,comparisonStockName){
	$(".duibi_zb").find("a").each(function(index,item){
		var showName=$(this).text();
		if(showName!=null && showName!="" && showName!==undefined && showName.indexOf(comparisonStockCode)>-1 && showName.indexOf(comparisonStockName)>-1 ){
			$(this).next().click();
			$(".duibi_zb").css("height","300px");
        		$("#duibi_xg_title").hide();
		}
	});
	//delContrastCompany(comparisonStockCode);
}
/**
 * 设置对比企业缓存
 */
function setLocalStorage(){
	var contrasts="";
	//股票代码
	$(".duibi_zb").find("a").each(function(){
		var codeAndName=$(this).text();
		if(codeAndName!=null && codeAndName!="" && codeAndName!="undefined"){
			var startIndex=codeAndName.indexOf("(");
			var endIndex=codeAndName.indexOf(")");
			contrasts+= codeAndName.substring(startIndex+1,endIndex) + "-" + codeAndName.substring(0,startIndex) + ",";
		}
	});
	//修改全局变量
	var userId=localStorage.getItem("userId");
	localStorage.setItem(userId,contrasts);
	//对比数据显示
//	initComparisonStock();
}

/**
 * 获取加入对比的公司
 * @returns {String}
 */
function findContrastCompany(){
	var dbqy = "";
	$.axs("/betaInvest/common/findUserCC.do",null,false,function(data){
		if(data.retCode=="0000"){
			if(data.retData != null && data.retData.length > 0){
//				console.log(data.retData)
				$(data.retData).each(function(i, item){
					dbqy += item.stockCode + "-" + item.stockName + ",";
				})
			}
		}
	});
	if(dbqy != ""){
		dbqy = dbqy.substring(0, dbqy.length - 1);
	}
	return dbqy;
}

/**
 * 删除用户对比企业
 * @param conStockCode
 */
function delContrastCompany(conStockCode){
	$.axs("/betaInvest/common/delUserCC.do",{stockCode:conStockCode},false,function(data){
		if(data.retCode!="0000"){
			errorAlert("", data.retMsg);
		}
	});
	//删除财务对比里面的操作中心的公司。重新画图
	var pathName=location.pathname;
	if(pathName.indexOf("comprehensive.html")>-1
			|| pathName.indexOf("multidStockTrendComparison.html")>-1
			|| pathName.indexOf("multidStockRankingAnalysis.html")>-1
			|| pathName.indexOf("companyBepthComparison.html")>-1){
		$(".comparis_newserach").find("span").each(function(){
			if($(this).text().indexOf(conStockCode)>-1){
				$(this).parent().remove();
			}
		});
	}
	if(pathName.indexOf("multidStockRankingAnalysis.html")>-1){
		findTradeSort();
	}else if(pathName.indexOf("comprehensive.html")>-1){
		changeParam();
	}else if(pathName.indexOf("multidStockTrendComparison.html")>-1){//指标趋势对比
		findComparisonDate();
	}else if(pathName.indexOf("companyBepthComparison.html")>-1 && (!$(".gegu_zb").is(":hidden"))){
		initHeader();
	}
	//"comprehensive.html","multidStockTrendComparison.html","multidStockRankingAnalysis.html"
}

/**
 * 设置用户对比
 */
function setContrastCompany(){
	var contrasts="";
	//股票代码
	$(".duibi_zb").find("a").each(function(){
		var codeAndName=$(this).text();
		if(codeAndName!=null && codeAndName!="" && codeAndName!="undefined"){
			var startIndex=codeAndName.indexOf("(");
			var endIndex=codeAndName.indexOf(")");
			contrasts+= codeAndName.substring(startIndex+1,endIndex) + "-" + codeAndName.substring(0,startIndex) + ",";
		}
	});
	if(contrasts == ""){
		return;
	}else{
		contrasts = contrasts.substring(0, contrasts.length - 1);
	}
	$.axs("/betaInvest/common/setUserCC.do",{cnStr:contrasts},false,function(data){
		if(data.retCode!="0000"){
			errorAlert("", data.retMsg);
		}
	});
}

//================我的研究==================
/**
 * 我的研究
 */
function myResearch(){
	researchReport();
}

/**
 * 研究报告
 */
function researchReport(){
	$("#myResearchDivShow").html('');
	$.axs("/betaInvest/btUserStudyReport/findBtUserStudyReport.do",null,true,function(data){
		if(data.retCode=="0000"){
			var result =data.retData;
			//console.log(result)
			if(result==null || result.length<=0){
				return false;
			}
			$("#studyNumTotal").text("（"+result.length+"）");
			for(var i=0;i<result.length;i++){
//				if(i>=4){
//					break;
//				}
				var obj=result[i];
				
				//当类型是报告时class是baogao，图表为tubiao，券商为quanshang
				//1研究报告，模型报告，3企业报告,2图标分析
				var deleUrl="";//删除
				var editUrl="";//编辑
				var viewUrl="";//预览
				var reportType=obj.reportType;
				if(reportType==1){//研究报告
					deleUrl="/betaInvest/report/deleteReport.do";
					editUrl="/myResearch/editReport.html"+obj.edirParam;
					viewUrl="/myResearch/reportPreview.html?id="+obj.keyVlaue;
				}else if(reportType==2){//模型报告
					deleUrl="/betaInvest/report/deleModelReport.do";
//					editUrl="/myResearch/modelReportDetail.html"+obj.edirParam;
//					viewUrl="/myResearch/modelReportDetail.html"+obj.edirParam;
					editUrl="/myResearch/modelReportDetail.html?key="+obj.keyVlaue;
					viewUrl="/myResearch/modelReportDetail.html?key="+obj.keyVlaue;
				}else if(reportType==3){//图标分析
					deleUrl="/betaInvest/btUserStudyChart/deleBtUserStudyChart.do";
					editUrl="/myResearch/editChart.html"+obj.edirParam;
					viewUrl="/myResearch/chartPreview.html"+obj.edirParam;
				}else if(reportType==4){//企业报告
					deleUrl="";
					editUrl="";
					viewUrl="";
				}
				var html='';
				html+='<li>';
				html+='<div class="fl yanjiu_time" onclick="javascript:location.href=\''+viewUrl+'\'">';
				var titleName=obj.titleName;
				if(titleName.length>=14){
					titleName=titleName.substring(0,13)+"...";
				}
				html+='<span title="'+obj.titleName+'">'+titleName+'</span>';
				html+='<p>更新时间：<em>'+obj.createTime+'</em></p>';
				html+='</div>';
				html+='<div class="fl yanjiu_bianji" style="display: none;">';
				html+='<i onclick="javascript:location.href=\''+editUrl+'\'"></i>';
				html+='<em onclick="deleConfirmationCenter(\''+deleUrl+'\',\''+obj.keyVlaue+'\',this)"></em>';
				html+='</div>';
				html+='<div class="clr"></div>';
				html+='</li>';
//				var html='<li><span class="'+classname+'">'+baogaoname+'</span><a href="'+url+'">'+obj.titleName+'</a><b>'+obj.createTime+'</b><div class="clr"></div></li>';
				$("#myResearchDivShow").append(html);
			}
		}else{
			errorAlert("",data.retMsg)
		}
	});
}
//点击删除的图标时
function deleConfirmationCenter(delUrl,reportId,thiz){
//	studyReportId=reportId;
//	deleMyStudy=delUrl;//删除链接
	$.axs(delUrl,{id:reportId},false,function(data){
		var result=data.retData;
		if(data.retCode=='0000'){
//			errorAlert("","删除成功！");
//			findBtUserStudyReport();
			$(thiz).parent().parent().remove();
			var num=$("#myResearchDivShow li").length;
			$("#studyNumTotal").text("（"+num+"）");
			showGuideResearchReport();
			if(location.pathname.indexOf("researchReport.html")>-1){
				//当前页不跳转
				var pageNum=$("#pages").attr("data-pageNum");
				var pageSize=$("#pages").attr("data-pageSize");
				findBtUserStudyReport(pageNum,pageSize);
			}
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}
/**
 * 获取所有指标
 */
function findAllIndicator(){
	$.axs("/betaInvest/common/findWorkBook.do",{type:6},false,function(data){
		if(data.retCode=="0000"){
			var result =data.retData;
			if(result==null || result.length<=0){
				return false;
			}
			for(var i=0;i<result.length;i++){
				var obj=result[i];
				if(obj.dataType<4){
					continue;
				}
				var dataType=obj.dataType;
				var html='';
				html+='<li data-value="'+obj.nameEn+'">';
				html+='<div class="data-checkbox">';
				html+='<input type="checkbox" />';
				html+='<label class="checkbox"></label>';
				html+='<label class="checkboxWord">'+obj.nameCn+'</label>';
				html+='</div>';
				html+='</li>';
				$("#zhibiaoleixing_"+dataType).find("ul").append(html);
			}
		}else{
			errorAlert("",data.retMsg)
		}
	});
}

//findAllIndicatorV2_0();
/**
 * 模型报告----指标初始化
 * 2017-07-18 改版东西
 */
function findAllIndicatorV2_0(){
	$.axs("/betaInvest/common/findWorkBook.do",{type:12},false,function(data){
		if(data.retCode=="0000"){
			var result =data.retData;
			if(result==null || result.length<=0){
				return false;
			}
			//所有父级id相同的指标存在在一个数组中，父级ID为KEY，数据为value存放在map中
			var key_pid_and_val_treeType={};
			//当前的数据是多少层级
//			var key_pid_and_val_cengji={};
			for(var i=0;i<result.length;i++){
				var obj=result[i];
				//获取key的数据，为空或者不存在，初始化一个数据
				var val_treeType_Array=key_pid_and_val_treeType[obj.parentId];
				if(val_treeType_Array==undefined || val_treeType_Array==null){
					val_treeType_Array=new Array();
				}
				//树形结构的数据格式
				var treeTypeObj={};
				treeTypeObj.id=obj.id;
				treeTypeObj.text=obj.nameCn;
				treeTypeObj.checked=false;
				treeTypeObj.state="closed";
				treeTypeObj.attributes={"keyId":obj.nameEn};
				//树形结构格式的数据存放在value数组中
				val_treeType_Array.push(treeTypeObj);
				//父级ID为KEY，数据为value存放在map中
				key_pid_and_val_treeType[obj.parentId]=val_treeType_Array;
//				key_pid_and_val_cengji[obj.parentId]=obj.dataType;
			}
//			console.log(key_pid_and_val_treeType);
			//组装成tree形结构
			var treeData=[];
			$.each(key_pid_and_val_treeType[0],function(index,obj){
				obj.children=key_pid_and_val_treeType[obj.id];
				//查看子节点下是否还有子节点
				$.each(obj.children,function(i,item){
					if(key_pid_and_val_treeType[item.id]!=null && key_pid_and_val_treeType[item.id]!=undefined){
						item.children=key_pid_and_val_treeType[item.id];
						$.each(item.children,function(j,t){
							t.children=key_pid_and_val_treeType[t.id];
						});
					}
				});
				treeData.push(obj);
			});
			//console.log("树形结构数据:");
			//console.log(treeData);
		}else{
			errorAlert("",data.retMsg)
		}
	});
}

//查询我的自选股
function findListCenter(){
	$.axs("/betaStock/optionalkMap/findList.do",null,true,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result!=null){
				$("#zixuanguNumTotal").text("（"+result.length+"）")
			}
   		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}
//查询通知
var test='';
function searchNotice(){
	$.axs("/betaInvest/shareAlert/findBtUserMessage.do",null,false,function(data){
		if(data.retCode=="0000"){
			var result =data.retData;
			if(result==null || result.length<=0){
				return false;
			}
			var xttzHtml = "";
			var ggggHtml = "";
			var gjtxHtml = "";
			var length=0;
			//console.log(result)
			$(result).each(function(){
				var date=toDateTime(this.releaseTime,"yyyy-MM-dd hh:mm");
				if(this.messageType == 1){ //系统通知
					
					xttzHtml+='<li id="ul_li_'+this.readId+'">';
					xttzHtml+='<h3><i>'+this.title+'</i>';
					if(this.isRead=='0'){
						xttzHtml+='<em class="on"></em>';
						length++;
						if(!(test.indexOf("1")>-1)){
							test+="1";
						}
					}else{
						xttzHtml+='<em></em>';
					}
					xttzHtml+='<b class="shanchu_lajik" onclick="deleBtUserMessage(\''+this.readId+'\')"></b></h3>';
					xttzHtml+='<p class="tz_times">'+date+'</p>';
					xttzHtml+='<p class="tz_neirong">'+this.releaseContent+'</p>';
					xttzHtml+='</li>';
					
				}
				if(this.messageType == 2){ //个股公告
					ggggHtml+='<li id="ul_li_'+this.readId+'" >';
					ggggHtml+='<h2>';
					if(this.isRead=='0'){
						ggggHtml+='<em class="on"></em>';
						length++;
						if(!(test.indexOf("2")>-1)){
							test+="2";
						}
					}else{
						ggggHtml+='<em></em>';
					}
					ggggHtml+='</em><i onclick="javascript:window.open(\''+this.messageUrl+'\')">'+this.title+'</i><b class="shanchu_lajik" onclick="deleBtUserMessage(\''+this.readId+'\')"></b></h2>';
					ggggHtml+='<p class="gegu_time">'+this.releaseTime+'</p>';
					ggggHtml+='</li>';
				}
				if(this.messageType == 3 || this.messageType == 4){ //股价提醒
					var tiShi1="最新股价";
					if(this.messageType == 4){
						tiShi1="最新涨跌幅"
					}
					//onclick="javascript:window.open(\'/businessDetails/newTBindex.html?'+this.messageUrl+'\')"
					gjtxHtml+='<li id="ul_li_'+this.readId+'" >';
					gjtxHtml+='<p class="gujia_company"><a href="/businessDetails/newTBindex.html?'+this.messageUrl+'" >'+this.title+'</a><i>'+date+'</i>';
					if(this.isRead=='0'){
						gjtxHtml+='<em class="on"></em>';
						length++;
						if(!(test.indexOf("3")>-1)){
							test+="3";
						}
					}else{
						gjtxHtml+='<em></em>';
					}
					gjtxHtml+='<b class="shanchu_lajik" onclick="deleBtUserMessage(\''+this.readId+'\')"></b></p>';
					gjtxHtml+='<span>'+tiShi1+'：<em>'+this.newPrice+'</em>元</span>';
					if(this.newPrice>this.salePrice){
						if(this.messageType == 4){
							gjtxHtml+='<span>目标涨跌幅：<em>'+this.salePrice+'</em>元</span>';
						}else{
							gjtxHtml+='<span>卖出目标价：<em>'+this.salePrice+'</em>元</span>';
						}
					}else{
						gjtxHtml+='<span>买入目标价：<em>'+this.salePrice+'</em>元</span>';
					}
					gjtxHtml+='<span>'+tiShi1+'<em>'+this.releaseContent+'，</em>请注意！</span>';
					gjtxHtml+='</li>';
				}
			})
			$(".xitong_tz").children("ul").html(xttzHtml);
			$(".gegu_gg").children("ul").html(ggggHtml);
			$(".gujia_tixing").children("ul").html(gjtxHtml);
			$("#messageNum").html("（"+length+"）");
			if(length>0){
				$(".tongzhi_icons").show();
			}
			//鼠标经过的时候显示删除图标
			$(".shanchu_lajik").hide();
			$(".wode_yanjiu li,.gegu_zb li,.cz_news li").on("mouseenter",function(){
				$(this).find(".yanjiu_bianji").show();
				$(this).find(".shanchu_lajik").show();
			})
			$(".wode_yanjiu li,.gegu_zb li,.cz_news li").on("mouseleave",function(){
				$(this).find(".yanjiu_bianji").hide();
				$(this).find(".shanchu_lajik").hide();
			})
		}else{
			errorAlert("",data.retMsg)
		}
	});
}

//我额研究鼠标经过事件
//function mouseenter(this){
//	$(this).find(".yanjiu_bianji").show();
//}

//删除消息
function deleBtUserMessage(messageReadId){
	$("#ul_li_"+messageReadId).hide();
	$.axs("/betaInvest/shareAlert/deleBtUserMessage.do",{messageReadId:messageReadId},false,function(data){
		if(data.retCode=="0000"){
			errorAlert("","删除成功！")
		}else{
			errorAlert("",data.retMsg)
		}
	})
}

//更新消息
function updateBtUserMessage(messageType){
	//console.log(test)
//	var len=test.join(",")
	test.replace(messageType,"");
	$.axs("/betaInvest/shareAlert/updateBtUserMessage.do",{messageType:messageType},false,function(data){
		if(data.retCode=="0000"){
			if(test==""){
				//qu  yang shi;
				$(".tongzhi_icons").hide();
			}
		}
	})
}

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


//圆点拖拽
var params = {
	left: 0,
	top: 0,
	currentX: 0,
	currentY: 0,
	flag: false
};

var getCss = function(o,key){
	return o.currentStyle? o.currentStyle[key] : document.defaultView.getComputedStyle(o,false)[key]; 	
};


var startDrag = function(bar, target, callback,event){
	if(getCss(target, "left") !== "auto"){
		params.left = getCss(target, "left");
	}
	if(getCss(target, "top") !== "auto"){
		params.top = getCss(target, "top");
	}
	var cf_=$("#myResearchDivShow");
	//if(!cf_.is(event.target) && cf_.has(event.target).length===0){
		
	
	
	bar.onmousedown = function(event){
		event.stopPropagation();
		params.flag = true;
		if(!event){
			event = window.event;
			
			bar.onselectstart = function(){
				return false;
			}  
		}
		var e = event;
		params.currentX = e.clientX;
		params.currentY = e.clientY;
	};
	document.onmouseup = function(event){
		event.stopPropagation();
		params.flag = false;	
		if(getCss(target, "left") !== "auto"){
			params.left = getCss(target, "left");
		}
		if(getCss(target, "top") !== "auto"){
			params.top = getCss(target, "top");
		}
		circleHasLook();
	};
	document.onmousemove = function(event){
		event.stopPropagation();
		var e = event ? event: window.event;
		if(params.flag){
			var nowX = e.clientX, nowY = e.clientY;
			var disX = nowX - params.currentX, disY = nowY - params.currentY;
			target.style.left = parseInt(params.left) + disX + "px";
			target.style.top = parseInt(params.top) + disY + "px";
			if (event.preventDefault) {
				event.preventDefault();
			}
			return false;
		}
		
		if (typeof callback == "function") {
			callback(parseInt(params.left) + disX, parseInt(params.top) + disY);
		}
	}
	//}
};


//判断圆球是否在浏览器显示区域内
	function circleHasLook(){
		var a = $("#circle_wrapper").offset().top;
		var b = $("#circle_wrapper").offset().left;
		if (!(a >= $(window).scrollTop() && a < ($(window).scrollTop() + $(window).height()))) { //不在可视范围内
			$("#circle_wrapper").removeAttr("style");
		}
		//判断是否距离上边过近
		if(a<400){
			$(".czzx_content").css({"bottom":"-160px"});
			$(".tanc_public").css({"bottom":"-320px"});
		}else{
			$(".czzx_content").css({"bottom":"60px"});
			$(".tanc_public").css({"bottom":"40px"});
		}
		//判断是否距离左边过近
		if(b<-1250){
			$(".czzx_content").css({"right":"-170px"});
			$(".tanc_public").css({"right":"-600px"});
		}else{
			$(".czzx_content").css({"right":"70px"});
			$(".tanc_public").css({"right":"240px"});
		}
		
	}

//新模型显示

	
	
//判断我的研究中是否有内容	
function showGuideResearchReport(){
	if($("#myResearchDivShow li").length<=0){
		$(".cj_yanbao").show();
		$("#myResearchDivShow").hide();
		$("#moreMyResearch").hide();
//			$(".zwu_shuju").show();
	}else{
		$("#myResearchDivShow").show();
		$(".cj_yanbao").hide();
		$("#moreMyResearch").show();
//			$(".zwu_shuju").hide();
	}
}

//判断个股对标是否有内容问题
function showStockBenchmarking(){

	if($(".duibi_zb li").length<=0){
		$(".duibi_zb").hide();
		$(".gegu_searches").show();
		$(".cz_duibi").hide();
		//$(".zwu_shuju").show();
	}else{
		$(".duibi_zb").show();
		$(".gegu_searches").hide();
		$(".cz_duibi").show();
		//$(".zwu_shuju").hide();
	}
}

//判断自选股是否有内容
function showOptionalStock(){
	addOptionalStock();
}

//添加自选股
/*
 * params:stocke：股票代码
 */
function addOptionalStock(stocke){
	var stocke=stocke;
	$.axs("/betaStock/optionalkMap/findList.do",null,false,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			if(result!="" && result!=null && result!=undefined){
				var htmlLi='';
				$(".zixuan_list").show();
				$(".gp_content_nr").empty();
				$(result).each(function(index,item){
					htmlLi+='<li>';
					htmlLi+='<span class="gs_gg_name"><a target="_blank" href="/businessDetails/newTBindex.html?stockName='+item.stockName+'&stockCode='+item.stockCode+'">'+item.stockName+"（"+item.stockCode+'）</a></span>';
					
					if(item.priceChangeRatio==null || (item.priceChangeRatio==""&&item.priceChangeRatio!=0) || item.priceChangeRatio==undefined){
						//console.log(item.priceChangeRatio)
						item.priceChangeRatio="--";

						htmlLi+='<span>--</span>';
						htmlLi+='<span>'+item.priceChangeRatio+'</span>';
					}else{
						if(item.priceChangeRatio>0){

							htmlLi+='<span class="up">'+((item.newPrice==""&&item.newPrice!=0)||item.newPrice==null?"--":item.newPrice.toFixed(2))+'</span>';
							htmlLi+='<span class="up">'+(item.priceChangeRatio).toFixed(2)+'%</span>';
						}else if(item.priceChangeRatio==0){

							htmlLi+='<span class="up">'+((item.newPrice==""&&item.newPrice!=0)||item.newPrice==null?"--":item.newPrice.toFixed(2))+'</span>';
							htmlLi+='<span class="up">'+item.priceChangeRatio+'</span>';
						}else if(item.priceChangeRatio<0){

							htmlLi+='<span class="down">'+((item.newPrice==""&&item.newPrice!=0)||item.newPrice==null?"--":item.newPrice.toFixed(2))+'</span>';
							htmlLi+='<span class="down">'+(item.priceChangeRatio).toFixed(2)+'%</span>';
						}	
					}
					htmlLi+='<span class="cz_sc" style="display: none;">';
					var txFlag = ((item.isReportOpen == 1 || item.isReportOpen == 0) || (item.isShareOpen == 1 || item.isShareOpen == 0) ? "on" : ""); //提醒
//					if(findBtStockAlertOp(item.stockCode)){
						htmlLi+='<em class="czzx_tix '+txFlag+'" data-id="'+item.stockCode+'" data-type="'+item.stockName+'"></em>';
					//}else{
					//}
					//htmlLi+='<i class="czzx_ljk" onclick="deleteOptional('+item.id+','+item.stockCode+')"></i>';
					htmlLi+='<i class="czzx_ljk" data-id="'+item.id+'" data-value="'+item.stockCode+'"></i>';
					htmlLi+='</span>';
					htmlLi+='<div class="clr"></div>';
					htmlLi+='</li>';
				})
				$(".gp_content_nr").html(htmlLi);
				$(".zixuan_btn").show();
				$(".zixuan_searches").hide();
			}else{
				$(".zixuan_searches").show();
				$(".zixuan_list").hide();
				$(".zixuan_btn").hide();
			}
		}else{
			errorAlert(data.retCode, data.retMsg);
		}		
	})
}


//获取用户的历史点击记录
function getHistory(){
	$.axs("/betaInvest/user/findModelList.do",{userId:userId},false,function(data){
		//console.log(data);
		if(data.retCode=="0000"){
			var result=data.retData;
			if(result!="" && result!=null && result!=undefined){			
				$(result).each(function(index,item){
					userList.push(item.modelName);
				})
				localStorage.setItem("userList",userList);
			}else{
				
			}
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	})
};
//添加点击纪录
function addClickHistory(userId,modelName){
	$.axs("/betaInvest/user/insertModel.do",{userId:userId,modelName:modelName},false,function(data){
		if(data.retCode=="0000"){

		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	})
};


/*************************************股价提醒*************************************/

/**
 * 查询公司是否有股票提醒
 */
function findBtStockAlertOp_oc(stockCode){
	$.axs("/betaInvest/shareAlert/findBtStockAlert.do",{stockCode:stockCode},true,function(data){
		if(data.retCode=="0000"){
			if(data.retData != null){
				$(".news_boar_tongzhi").addClass("on");
				var item=data.retData;
				$("#oc_buyPrice").val(item.buyPrice);
				$("#oc_salePrice").val(item.salePrice);
				$("#oc_changeAmount").val(item.changeAmount);
				//$("#content").val(item.content);
				if(item.isReportOpen==1){
					$("#oc_checkbox_div").find("label").addClass("on");//取消全选
					reportOpen_oc="1";//开通报告提醒
				}else{
					$("#oc_checkbox_div").find("label").removeClass("on");//取消全选
					reportOpen_oc="0";//开通报告提醒
				}
			}
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

//显示股票提醒的弹框
function addsettixOp(stockName,stockCode){
	$(".wjTix_mark").remove();
	$(".wjTix_popUP").remove();
//	var settixOp ='<div class="setTix">';
//	settixOp +='<div class="n_gs_close">';
//	settixOp +='<span onClick=closeAlert()></span>';
//	settixOp +='<h2 class="gjgs_xinxi">'+stockName+'('+stockCode+')-提醒设置</h2>';
//	settixOp +='</div>';
//	settixOp +='<div class="setTix_info">';
//	settixOp +='<ul>';
//	settixOp +='<li>';
//	settixOp +='<div class="set_tix_box">';
//	settixOp +='<span class="fl">股价提醒</span>';
//	settixOp +='<div class="fl set_check">';
//	settixOp +='<div class="data-checkbox fl gjtx_xk" id="checkbox_div1">';
//	settixOp +='<input type="checkbox" id="time1" value="开通提醒" name="timeBk" />';
//	settixOp +='<label for="time1" class="checkbox" data-type="1"></label>';
//	settixOp +='<label class="checkboxWord" for="time1"></label>';
//	settixOp +='</div>';
//	settixOp +='</div>';
//	settixOp +='<div class="settixOpCaozuo fr">';
//	settixOp +='<div class="set_zk fr on   ">';
//	settixOp +='<i id="setZk">收起</i>';
//	settixOp +='</div>';
//	settixOp +='<div class="clr"></div>';
//	settixOp +='</div>';
//	settixOp +='<div class="clr"></div>';
//	settixOp +='</div>';
//	settixOp +='<div class="set_down">';
//	settixOp +='<div class="set_dow_title">';
//	settixOp +='<p>当前价格:<em id="g_newPrice">15.65</em></p>';
//	settixOp +='</div>';
//	settixOp +='<div class="set_dow_input">';
//	settixOp +='<input type="text" placeholder="买入目标价" id="buyPrice"/>';
//	settixOp +='<em class="mubiao_yuan">元</em>';
//	settixOp +='<input type="text" placeholder="卖出目标价" id="salePrice"/>';
//	settixOp +='<em>元</em>';
//	settixOp +='<div class="clr"></div>';
//	settixOp +='</div>';
//	settixOp +='<div class="set_dow_textar">';
//	settixOp +='<b>备注</b>';
//	settixOp +='<textarea name="" rows="" cols="" id="content" placeholder="" maxlength="100"></textarea>';
//	settixOp +='</div>';
//	settixOp +='</div>';
//	settixOp +='</li>';
//	settixOp +='<li>';
//	settixOp +='<div class="set_tix_box">';
//	settixOp +='<span class="fl">公告提醒</span>';
//	settixOp +='<div class="fl set_check">';
//	settixOp +='<div class="data-checkbox ggtx_xk" id="checkbox_div2">';
//	settixOp +='<input type="checkbox" id="time1" value="开通提醒" name="timeBk" />';
//	settixOp +='<label for="time1" class="checkbox" data-type="2"></label>';
//	settixOp +='<label class="checkboxWord" for="time1"></label>';
//	settixOp +='</div>';
//	settixOp +='</div>';
//	settixOp +='<div class="clr"></div>';
//	settixOp +='</div>';
//	settixOp +='</li>';
//	settixOp +='<li>';
//	settixOp +='<a href="javascript:;" class="baocun">保存</a>';
//	settixOp +='<a href="javascript:;" class="qxb" onClick=closeAlert()>取消</a>';
//	settixOp +='<div class="clr"></div>';
//	settixOp +='</li>';
//	settixOp +='</ul>';
//	settixOp +='</div>';
//	settixOp +='</div>';
//	settixOp +='<div class="backbj" style="display: none;"></div>';
	var searchMsg = '<div class="wjTix_mark"></div>';
	searchMsg += '<div class="wjTix_popUP">';
	searchMsg += '<div class="wj_popUP_close"></div>';
	searchMsg += '<div class="wj_popUP_wrap">';
	searchMsg += '<div class="wj_popUP_tit">'+stockName+'('+stockCode+')-股价提醒<span>（<i>*</i> 提示：操作中心-通知，查看提醒）</span></div>';
	searchMsg += '<div class="wj_currentPrice">当前价：<span id="oc_newPrice">15.65</span></div>';
	searchMsg += '<ul class="wj_priceList wj_clear">';
	searchMsg += '<li><label>买入目标价</label><div class="wj_popUPInput"><input type="text" id="oc_buyPrice" onkeyup="inputNumber(this)">元</div></li>';
	searchMsg += '<li><label>卖出目标价</label><div class="wj_popUPInput"><input type="text" id="oc_salePrice" onkeyup="inputNumber(this)">元</div></li>';
	searchMsg += '<li><label>涨跌幅</label><div class="wj_popUPInput"><input type="text" id="oc_changeAmount" onkeyup="inputNumber(this)">%</div></li>';
	searchMsg += '</ul>';
	searchMsg += '<div class="wj_popUP_btn">';
	searchMsg += '<a class="wj_btn wj_btnSubmit wj_pop_btnSubmit" onClick=addBtStockAlert_oc("'+stockCode+'","'+stockName+'")>确定</a>';
	searchMsg += '<a class="wj_btn wj_btnCancel wj_pop_btnCancel" onClick=closeAlertTix()>取消</a>';
	searchMsg += '<div class="wj_checkbox">';
	searchMsg += '<div class="data-checkbox" id="oc_checkbox_div"><input type="checkbox"><label class="checkbox on"></label><label class="checkboxWord">公告提醒</label><i class="fx"></i></div>';
	searchMsg += '</div>';
	searchMsg += '</div>';
	searchMsg += '</div>';
	searchMsg += '</div>';
	$("body").append(searchMsg);
	//checkbox状态样式
	$("#oc_checkbox_div").on('click',function(e){
	    	if($(this).find("label").hasClass("on")){
	    		reportOpen_oc=0;
	    		$(this).find("label").removeClass("on");
	    		e.stopPropagation()
	    	}else{
	    		reportOpen_oc=1;
	    		$(this).find("label").addClass("on");
	    		e.stopPropagation()
	    	}
	});
}
//查询最新价
function findNewPrice_oc(stockCode){
	$.axs("/betaInvest/shareAlert/findNewPrice.do",{stockCode:stockCode},true,function(data){
		if(data.retCode=="0000"){
			if(data.retData!=null&& data.retData!=" " && data.retData!=undefined){
				if(data.retData.newPrice==null || (data.retData.newPrice=="" && data.retData.newPrice!=0) || data.retData.newPrice==undefined){
					data.retData.newPrice="--"
				}
				$("#oc_newPrice").html(data.retData.newPrice);
			}
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}
//隐藏弹框
function closeAlertTix(){
//	$(".setTix").hide();
//	$(".backbj").hide();
	$(".wjTix_mark").hide();
    $(".wjTix_popUP").hide();
	$("body,html").css("overflow","auto");
};
 	//点击空白处关闭股价提醒
$("body").on('click',".wjTix_mark",function(){
    closeAlertTix()
});
//点击X关闭股价提醒
$("body").on('click',".wj_popUP_close",function(){
    closeAlertTix()
});

//input获得焦点样式
$("body").on('focus',".wj_popUPInput input",function(){
		$(this).parent().css("border-color","#1e7bcd")
});
//input失去焦点样式
$("body").on('blur',".wj_popUPInput input",function(){
		$(this).parent().css("border-color","#d1d9df")
});

//添加股价通知
function addBtStockAlert_oc(stockCode,stockName){
	//修改于16-8-11
	var buyPrice=$("#oc_buyPrice").val();
	var salePrice=$("#oc_salePrice").val();
	var changeAmount=$("#oc_changeAmount").val();
	//var content=$("#content").val();
	var reg=/^\d+(\.\d+)?$/;
	if(buyPrice!=null && buyPrice!="" && !reg.test(buyPrice)){
		errorAlert(null,"请输入正确的买入价格！");
		return false;
	}
	if(salePrice!=null && salePrice!="" && !reg.test(salePrice)){
		errorAlert(null,"请输入正确的卖出价格！");
		return false;
	}
	if(changeAmount!=null && changeAmount!="" && !reg.test(changeAmount)){
		errorAlert(null,"请输入正确的涨跌幅！");
		return false;
	}
	var data={stockCode:stockCode,stockName:stockName,buyPrice:buyPrice,salePrice:salePrice,changeAmount:changeAmount,reportOpen:reportOpen_oc}
	if((changeAmount==null || changeAmount=="") && (salePrice==null || salePrice=="") && (buyPrice==null || buyPrice=="") && !($(".wj_checkbox label.checkbox").hasClass("on"))){
		deleBtStockAlert_oc();
		closeAlertTix();
	}else{
		$.axs("/betaInvest/shareAlert/addBtStockAlert.do",data,true,function(data){
			if(data.retCode=="0000"){
				$(".news_boar_tongzhi").addClass("on");
				//检索结果也添加股价提醒的样式
				if(location.pathname=="/searchList.html" && stockCode==getUrlParam("stockcode")){
					$(".wj_searchMsg").addClass("wj_searchMsg_checked");
				}
				errorAlert(null,"保存成功！");
				closeAlertTix();
			}else{
				errorAlert(data.retCode, data.retMsg);
			}
		});
	}
}
function deleBtStockAlert_oc(){
	var data={stockCode:stockCode}
	$.axs("/betaInvest/shareAlert/deleBtStockAlert.do",data,true,function(data){
		if(data.retCode=="0000"){
			$(".news_boar_tongzhi").removeClass("on");
			$("#oc_buyPrice").val("");
			$("#oc_salePrice").val("");
			$("#oc_changeAmount").val("");
			//$("#checkbox_div").find("label").addClass("on");//取消全选
			reportOpen="1";//开通报告提醒
			$("#checkbox_div").find("label").addClass("on");//取消全选
		}
	});
}
//删除弹窗提示
function deletTips(){
	$(".tub_tc_publick").remove();
	$(".tips_shanchu_publick").remove();
	var tc='<div class="tub_tc_publick" style="display:block;"></div>';
	var html="";
	html+='<div class="tips_shanchu_publick" style="display:block;">';
	html+='<b class="tc_shanchu"></b>';
	html+='<h2>删除提示</h2>';
	html+='<p>确定删除吗？</p>';
	html+='<div class="shanchu_btn2">';
	html+='<span class="shanc_btn2">删除</span>';
	html+='<span class="shanc_qux2">取消</span>';
	html+='</div>';
	html+='</div>';
	$("body").append(tc);
	$("body").append(html);
}

