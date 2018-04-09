   var userId = localStorage.getItem("userId");//20171010 shiqi
$(function () {
	//添加未注册/登录头 获取用户登录信息
	$(".indexTop-user").html(sethead());
	//logo链接
	$(".userHead-logo").html(logourl());
	 getuserinfo();
	
	//热门公司的数据
	findIndexData();
	AfindIndexData();
	
	
//	var alignMiddle = ($(window).height() - $(".align-middle").height() - 180)/2;
//	var paddingTop=$(window).height()-260-55-200;
//	$(".indexTop-input").css("padding-top",paddingTop)
//	$(".align-middle").css("margin-top",alignMiddle);
//	$(".indexTop").height($(window).height());
//	$(".indexBg").height($(window).height());
	$("#searchInp").on("focus",function(){
		$("#searchInp").attr("placeholder","");
	});
	
	
	var swiper = new Swiper('.swiper-container', {
	  		  pagination: '.swiper-pagination',
		      effect: 'coverflow',
		      centeredSlides: true,
		      slidesPerView: "auto",
		      paginationClickable:true,
		      autoplayDisableOnInteraction : false,
		      autoplay : 2000,
			  speed:500,
			  loop: true,
			  observer: true,//修改swiper自己或子元素时，自动初始化swiper
			  observeParents: true,//修改swiper的父元素时，自动初始化swiper
//		      loopedSlides :5,
		      coverflowEffect: {
		        rotate: 0,
				stretch: 10,
				depth: 150,
				modifier: 1,
				slideShadows: true
		      }
	    });
//	   $(".swiper-container").mouseenter(function(){
//	   	swiper.stopAutoplay();
//	   }).mouseleave(function(){
//	   	swiper.startAutoplay();
//	   })
	//点击首页的打开阅读
	$("#hotData").on("click",".open-read",function(){
		var code=$(this).attr("data-code");
		var name=$(this).attr("data-name");
		if(isXSBCompany(code)){
			localStorage.setItem("input","old");
		}
		window.open("/yanbao/cover.html?stockCode="+code+"&stockName="+name);
	})
	$("#AhotData").on("click",".open-read",function(){
		var code=$(this).attr("data-code");
		var name=$(this).attr("data-name");
		if(!isXSBCompany(code)){
			localStorage.setItem("input","new");
		}
		window.open("/yanbao/coverA.html?stockCode="+code+"&stockName="+name);
	})
	
	
	$("#searchInp,#newSearchInp").on("blur",function(){
		$("#searchInp,#newSearchInp").attr("placeholder","输入股票名称/代码");
	})
	
	$("#searchInp").on("keydown",function(e){
		if(e.keyCode==13){
			var searchStr=$("#searchInp").val();
			if ($("#searchInp").val() != "") {
				localStorage.setItem("input","old");
				var searchStr=$("#searchInp").val()
				if (userId != null && userId != "" && userId != "undefined") {
					location.href = "/saasBeta/yanbao/searchResultsPage.html?searchStr="+searchStr;
				} else {
					var urlName = "/saasBeta/yanbao/searchResultsPage.html?searchStr="+searchStr;
					localStorage.setItem("locaHref", urlName);
					location.href = "/saasBeta/yanbao/login.html?searchStr="+searchStr;
				}
			}
		}
	})
	$("#newSearchInp").on("keydown",function(e){
		if(e.keyCode==13){
			var searchStr=$("#newSearchInp").val();
			if ($("#newSearchInp").val() != "") {
				localStorage.setItem("input","old");
				var searchStr=$("#newSearchInp").val()
				if (userId != null && userId != "" && userId != "undefined") {
					location.href = "/saasBeta/yanbao/AsearchResultsPage.html?searchStr="+searchStr;
				} else {
					var urlName = "/saasBeta/yanbao/AsearchResultsPage.html?searchStr="+searchStr;
					localStorage.setItem("locaHref", urlName);
					location.href = "/saasBeta/yanbao/login.html?searchStr="+searchStr;
				}
			}
		}
	})
	
	//首页新三板的搜索
	$("#searchInp").autocomplete({
		minLength: 1,
		source: function (request, response) {
			$("#ui-id-2").hide();
			findCodeName(request, response);
		},
		delay: 200,
		select: function (event, ui) {
			var userId = localStorage.getItem("userId");
			var item = ui.item;
			//console.log(item)
			if ($("#searchInp").val() != "") {
				localStorage.setItem("input","old");
				var value = item.value;
				var code = value.substring(value.indexOf("(") + 1, value.indexOf(")"));
				var name = value.substring(0, value.indexOf("("));
				if (userId != null && userId != "" && userId != "undefined") {
//					location.href = "/saasBeta/yanbao/cover.html?stockCode=" + code + "&stockName=" + name;
//					var urlName = "/saasBeta/yanbao/cover.html?stockCode=" + code + "&stockName=" + name;
					location.href = "/saasBeta/yanbao/searchResultsPage.html?searchStr="+code;
				} else {
					var urlName = "/saasBeta/yanbao/searchResultsPage.html?searchStr="+code;
					localStorage.setItem("locaHref", urlName);
					location.href = "/saasBeta/yanbao/login.html?stockCode=" + code + "&stockName=" + name;
				}
			} else {
				$.zmAlert("请输入要检索的信息");
			}
			
			//console.log(item);
		}
	});
	
	//首页A股的搜索
	$("#newSearchInp").autocomplete({
		minLength: 1,
		source: function (request, response) {
			$("#Ahis").hide();
			AfindCodeName(request, response);
		},
		delay: 200,
		select: function (event, ui) {
			var userId = localStorage.getItem("userId");
			var item = ui.item;
			if ($("#newSearchInp").val() != "") {
				var value = item.value;
				var code = value.substring(value.indexOf("(") + 1, value.indexOf(")"));
				var name = value.substring(0, value.indexOf("("));
				if (userId != null && userId != "" && userId != "undefined") {
//					location.href = "/saasBeta/yanbao/cover.html?stockCode=" + code + "&stockName=" + name;
//					var urlName = "/saasBeta/yanbao/cover.html?stockCode=" + code + "&stockName=" + name;
					location.href = "/saasBeta/yanbao/AsearchResultsPage.html?searchStr="+code;
				} else {
					var urlName = "/saasBeta/yanbao/AsearchResultsPage.html?searchStr="+code;
					localStorage.setItem("locaHref", urlName);
					location.href = "/saasBeta/yanbao/login.html?stockCode=" + code + "&stockName=" + name;
				}
			} else {
				$.zmAlert("请输入要检索的信息");
			}
			$("#Ahis").hide();
			//console.log(item);
		}
	});
	
	//首页关键词
	findHotKey();
	
	$(".hot-links").on("click","span",function(){
		var searchStr=$(this).text();
		if (userId != null && userId != "" && userId != "undefined") {
//					location.href = "/saasBeta/yanbao/cover.html?stockCode=" + code + "&stockName=" + name;
//					var urlName = "/saasBeta/yanbao/cover.html?stockCode=" + code + "&stockName=" + name;
			window.open("searchResultsPage.html?searchStr="+searchStr);
		} else {
			var urlName = "/saasBeta/yanbao/searchResultsPage.html?searchStr="+searchStr;
			localStorage.setItem("locaHref", urlName);
			location.href = "/saasBeta/yanbao/login.html?searchStr="+searchStr;
		}
		
	})
	var heigth=$(".hot-links").height();
	$(".rs").css("height",heigth);
	
	
	
	
	$("#searchInp").on("focus",function(){
		//历史搜索
		var value=$("#searchInp").val();
		if(value==""||value==null || value==undefined){
			//$("#sbHis").show();
			findSearchHis();
		}
		
	})
	$("#newSearchInp").on("focus",function(){
		$("#newSearchInp").attr("placeholder","");
		//alert(0)
		//历史搜索
		var value=$("#newSearchInp").val();
		if(value==""||value==null || value==undefined){
			//$("#Ahis").show();
			AfindSearchHis();
		}
		
	})
	
	$("#old .sy-fdj").on("click",function(){
		var values=$("#searchInp").val();
		if(values!="" && values!=null && values!=undefined){
			if (userId != null && userId != "" && userId != "undefined") {
//					location.href = "/saasBeta/yanbao/cover.html?stockCode=" + code + "&stockName=" + name;
//					var urlName = "/saasBeta/yanbao/cover.html?stockCode=" + code + "&stockName=" + name;
				location.href="searchResultsPage.html?searchStr="+values;
			} else {
				var urlName = "/saasBeta/yanbao/searchResultsPage.html?searchStr="+values;
				localStorage.setItem("locaHref", urlName);
				location.href = "/saasBeta/yanbao/login.html?searchStr="+values;
			}
		}
		
	})
	$("#new .sy-fdj").on("click",function(){
		var values=$("#newSearchInp").val();
		if(values!="" && values!=null && values!=undefined){
			if (userId != null && userId != "" && userId != "undefined") {
//					location.href = "/saasBeta/yanbao/cover.html?stockCode=" + code + "&stockName=" + name;
//					var urlName = "/saasBeta/yanbao/cover.html?stockCode=" + code + "&stockName=" + name;
				location.href="AsearchResultsPage.html?searchStr="+values;
			} else {
				var urlName = "/saasBeta/yanbao/AsearchResultsPage.html?searchStr="+values;
				localStorage.setItem("locaHref", urlName);
				location.href = "/saasBeta/yanbao/login.html?searchStr="+values;
			}
		}
		
	})
	
	//点击历史搜索跳转
	$("#sbHis").delegate("li","click",function(){
		if($(this).find("span").eq(0).text()=="历史搜索"){
			return
		}else{
			var text=$(this).find("span").eq(0).text();
				if (userId != null && userId != "" && userId != "undefined") {
					location.href="searchResultsPage.html?searchStr="+text;
				} else {
					var urlName = "/saasBeta/yanbao/searchResultsPage.html?searchStr="+text;
					localStorage.setItem("locaHref", urlName);
					location.href = "/saasBeta/yanbao/login.html?searchStr="+text;
				}
		}
	})
	//点击历史搜索跳转
	$("#Ahis").delegate("li","click",function(){
		if($(this).find("span").eq(0).text()=="历史搜索"){
			return
		}else{
			var text=$(this).find("span").eq(0).text();
				if (userId != null && userId != "" && userId != "undefined") {
					location.href="AsearchResultsPage.html?searchStr="+text;
				} else {
					var urlName = "/saasBeta/yanbao/AsearchResultsPage.html?searchStr="+text;
					localStorage.setItem("locaHref", urlName);
					location.href = "/saasBeta/yanbao/login.html?searchStr="+text;
				}
		}
	})
	
	//点击清空的时候
	$("#sbHis").delegate(".clear-icon","click",function(){
		UTIL.axs(UTIL.CONFIG.delHisByIds,null,true,function(data){
			
		});
		$("#sbHis").hide();
	});

	$("#Ahis").delegate(".clear-icon","click",function(){
		UTIL.axs(UTIL.CONFIG.AdelHisByIds,null,true,function(data){
			
		});
		$("#Ahis").hide();
	});
	

	$(document).on("scroll",function(){
			var scrollTop=document.body.scrollTop+document.documentElement.scrollTop;
			var height=($(".indexTop").height())/3;
		if(scrollTop>200 && scrollTop < 800){
			$(".bg-wrap").addClass("active");
		}
		else if(scrollTop>801 || scrollTop <= 200){
			$(".bg-wrap").removeClass("active");
		}

		
	})
	
	
	//点击其他的地方隐藏下拉框
	$(document).on("click",function(e){
		var e = e || window.event;
		var elem= e.target || e.srcElement;
		var target=$("#old");
		while(elem.tagName !== "DIV" && elem.Id !=="old")
			elem = elem.parentElement;
		if(elem==target[0]){
			//return
		}else{
			$("#sbHis").hide();

		}
		e.stopPropagation();
		e.cancelBubble = true;
	})
	//点击其他的地方隐藏下拉框
	$(document).on("click",function(e){
		var e = e || window.event;
		var elem= e.target || e.srcElement;
		var target=$("#new");
		while(elem.tagName !== "DIV" && elem.Id !=="new")
			elem = elem.parentElement;
		if(elem==target[0]){
			//return
		}else{
			$("#Ahis").hide();

		}
		e.stopPropagation();
		e.cancelBubble = true;
	})
});


function findCodeName(request, response, type) {
	$("#sbHis").hide();
	if (type == null || type == "" || type == "undefined") {
		type = null;
	} else {
		type = type;
	}
	$.ajax({
		url: UTIL.CONFIG.wwwhost + "/betaInvest/enterpriseData/findStock.do",
		data: { searchInfo: request.term },
		type: "POST",
		success: function (data) {
			//console.log(data)
			if (data.retCode == 0000) {
				if (data.retData == null) {
					return false;
				}
				var arr = [];
				$.each(data.retData, function (i, item) {
					var obj = {
						label: item.companyForShort + "(" + item.stockCode + ")",
						value: item.companyForShort + "(" + item.stockCode + ")",
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
		}

	})
}

/**
 * 获取首页新三板热门公司数据
 */
function findIndexData() {
	//获取推荐数据
	WF_ajax.findHotYb(null, false, function (_data) {
		if (_data == null || _data.length <= 0) {
			return false;
		}
		var indexDataHtml = '';
		for (var i = 0; i < _data.length; i++) {
			var obj = _data[i];
			indexDataHtml += '<div class="swiper-slide">';
			indexDataHtml += '<div class="newYb">';
			indexDataHtml += '<div class="indexTitle-top"><h3>' + obj.stockName + '(' + obj.stockCode + ')</h3></div>';
			indexDataHtml += '<p class="bg-yb"><img src="/saasBeta/yanbao/images/oldSwiper.png" alt="" /></p>';
			indexDataHtml += '<p class="index-hy"><span>'+obj.manageName+'</span></p>';
//			indexDataHtml += '<p class="index-dq"><span>'+obj.addressName+'</span></p>';
			indexDataHtml += '<div class="open-read" data-code="'+obj.stockCode+'" data-name="'+obj.stockName+'">打开阅读</div>';
			indexDataHtml += '</div>';
			indexDataHtml += '</div>';
		}
		$("#hotData").html(indexDataHtml);
	})
}

//A股的热门公司
function AfindIndexData() {
	
	//获取推荐数据
	UTIL.axs(UTIL.CONFIG.wwwhost + UTIL.CONFIG.AfindAguYb,null, false, function (_data) {

		console.log(_data.retCode)
		if(_data.retCode=="0000"){
			var result=_data.retData;
			if (result == null || result.length <= 0) {
				return false;
			}
			 console.log(result)
			var indexDataHtml = '';
			for (var i = 0; i < result.length; i++) {
				var obj = result[i];
				indexDataHtml += '<div class="swiper-slide">';
				indexDataHtml += '<div class="newYb sbyb">';
				indexDataHtml += '<div class="indexTitle-top"><h3>' + obj.stockName + '(' + obj.stockCode + ')</h3></div>';
				indexDataHtml += '<p class="bg-yb"><img src="/saasBeta/yanbao/images/oldSwiper.png" alt="" /></p>';
				indexDataHtml += '<p class="index-hy"><span>'+obj.industryName+'</span></p>';
//				indexDataHtml += '<p class="index-dq"><span>'+obj.state+'</span></p>';
				indexDataHtml += '<div class="open-read" data-code="'+obj.stockCode+'" data-name="'+obj.stockName+'">打开阅读</div>';
				indexDataHtml += '</div>';
				indexDataHtml += '</div>';
			}
			$("#AhotData").html(indexDataHtml);
		}
	})
}

//查询首页的关键词
function findHotKey(){
	UTIL.axs(UTIL.CONFIG.findHotKey,null,true,function(data){
		//console.log(data)
		if(data.retCode=="0000"){
			var result=data.retData;
			var div='';
			$(result).each(function(index,item){
				div+='<span>'+item.showName+'</span>';
			})
			
			$(".hot-links").html(div);
		}
	})
}

//历史搜索
function findSearchHis(){
	var param={pageNum:1,pageSize:5};
	UTIL.axs(UTIL.CONFIG.findSearchHis,param,true,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			if(result=="" || result==null || result==undefined){
				$("#sbHis").hide();
			}else{
				if(data.retData!="" && data.retData!=null &&　data.retData!=undefined){
					$("#sbHis").show();
					$("#sbHis").html("");
					var div='';
					div+='<li><span>历史搜索</span><b class="clear-icon"></b></li>';
					$(result).each(function(index,item){
						div+='<li><span>'+ item.searchStr +'</span></li>';
					})
					$("#sbHis").html(div);
				}		
			}		
		}
	})
}

function AfindSearchHis(){
	var param={pageNum:1,pageSize:5};
	UTIL.axs(UTIL.CONFIG.AfindSearchHis,param,true,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			if(result=="" || result==null || result==undefined){
				$("#Ahis").hide();
			}else{
				if(data.retData!="" && data.retData!=null &&　data.retData!=undefined){
					$("#Ahis").show();
					$("#Ahis").html("");
					var div='';
					div+='<li><span>历史搜索</span><b class="clear-icon"></b></li>';
					$(result).each(function(index,item){
						div+='<li><span>'+ item.searchStr +'</span></li>';
					})
					$("#Ahis").html(div);
				}		
			}		
		}
	})
}