//获取地址栏中的参数值
function getRequest() {
	var url = window.location.search; //获取url中"?"符后的字串
	var theRequest = new Object();
	if(url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i++) {

			theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);

		}
	}
	return theRequest;
}
var countMoreNews = 0; //新闻点击加载更多次数
var countMoreYanBao = 0; //研报点击加载更多次数
var countMoreGongGao = 0; //公告点击加载更多次数
var newsTotal = 0; //新闻总条数
var yanBaoTotal = 0; //研报总跳数
var gongGaoTotal = 0; //公告总条数
var newsqtime = ""; //搜索新闻耗时
var yanBaoqtime = ""; //搜索研报耗时
var gongGaoqtime = ""; //搜索公告耗时
var sortType = "0"; //默认按相关性降序排序
var stockcode = getRequest().stockcode;
var type = getRequest().type;
var content = getRequest().content;
var onclickPX = "false"; //默认没有点击排序
var viewMsg = ''; //
var orderStr='desc';
var address = window.location.host; //
$(document).ready(function() {
	$(".gjj_yb_list .con-item").on("click", function() {

		localStorage.setItem('sfybobj', $(this).attr("data-listObj"));
		// window.location.href="/detail/detail.html?type=sf&stockCode="+$(this).attr("code");
		window.open("/detail/detail.html?type=sf&stockCode=" + $(this).attr("code"));
	});
	//公司
	if(type == '1' || type == '2' || type == '3') {
		var datas = content.split(',');
		//判断是否为数字
		var reg = new RegExp("^[0-9]*$");
		//是stockCode
		if(datas.length == 3) {
			if(reg.test(datas[0])) {
				if(datas[1].length > datas[2].length) {
					viewMsg = datas[2] + "(" + datas[0] + ")"
				} else {
					viewMsg = datas[1] + "(" + datas[0] + ")"
				}
			}
			if(reg.test(datas[1])) {
				if(datas[0].length > datas[2].length) {
					viewMsg = datas[2] + "(" + datas[1] + ")"
				} else {
					viewMsg = datas[0] + "(" + datas[1] + ")"
				}
			}
			if(reg.test(datas[2])) {
				if(datas[0].length > datas[1].length) {
					viewMsg = datas[1] + "(" + datas[2] + ")"
				} else {
					viewMsg = datas[0] + "(" + datas[2] + ")"
				}
			}
		}
		if(datas.length == 2) {
			if(reg.test(datas[0])) {
				viewMsg = datas[1] + "(" + datas[0] + ")"
			}
			if(reg.test(datas[1])) {
				viewMsg = datas[0] + "(" + datas[1] + ")"
			}
		}
	} else { //不是公司
		viewMsg = content;
	}
	$("#intelligentNews").text(viewMsg);
	$("#intelligentGongGao").text(viewMsg);
	$("#intelligentYanBao").text(viewMsg);
	findCompanyNews(stockcode, type, content, sortType, 1, 5); //新闻
	findCompanyEvent(stockcode, type, content, sortType, 1, 5); //公告
	findCompanyYanBao(stockcode, type, content, sortType, 1, 5); //研报

	//点击新闻的公司名称跳转到对应的tab页签
	$("#intelligentNews").on("click", function() {
		$("#tab_xw").click();
	})
	//点击公告跳转到对应的页签
	$("#intelligentGongGao").on("click", function() {
		$("#tab_gg").click();
	})
	//点击研报跳转到对应的页签
	$("#intelligentYanBao").on("click", function() {
		$("#tab_yb").click();
	})
	
	$("#tab_xw").on('click',function(){
		$(".list_content ul").html(" ");
		findCompanyNews(stockcode, type, content, sortType, 1, 5); //新闻
	})
	$("#tab_yb").on('click',function(){
		$(".gjj_yb_list ul").html(" ");
		findCompanyYanBao(stockcode, type, content, sortType, 1, 5); //研报
	})

});
//新闻
function findCompanyNews(stockcode, type, content, sortType, pageIndex, pageSize) {
	console.log(sortType)
	
	if(sortType == 2) {
		orderStr = "desc";
	} else if(sortType == 3) {
		orderStr = "asc";
	}
	console.log(orderStr);
	//正在加载添加及显示star
	var logding = '<div class="loadingBox2" style="display: none;"><div class="loading-3"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><span>加载中</span></div>';
	$(".list_content").prepend(logding);
	$(".list_content").find(".loadingBox2").show();
	//正在加载添加及显示end
	//$.axs("/jhhsearch/search.do",{"searchQuery":content,"stockcode":stockcode,"type":type,"sortType":sortType,"dataType":"","pageIndex":pageIndex,"pageSize":pageSize,"sysType":"_news"},true,function(data){
	//	if(data.retCode=="0000"){  
	var pageNum = 0,
		totalPage = 0,
		List = [],
		totalNum = 0;
	var val = content;
	var startTime = "";
	var endTime = "";
	var val2 = '';
	var sTime = 0;
	var eTime = 0;
	if(content != "" && content.indexOf(",") > 0)
		val = content.split(',')[0];
	var paraminfo = '{"body":{"orderStr":"' + orderStr + '","serch_key":"' + val + '","publishStartDate":"' + startTime + '","publishEndDate":"' + endTime + '"}}';
	$.axsRequest("FT306", paraminfo, true, function(data) {
		console.log(data);
		if(data.retCode == "0000") {
			if(data.retData != null) {
				newsTotal = data.retData.totalNum; //新闻总条数
				//newsqtime=data.retData.qtime;//搜索新闻时间
				//newsqtime=(Number(newsqtime)).toFixed(3);
				newsqtime = 0;
				$("#newsTotal").html('约' + newsTotal + '篇'); //新闻总条数
				totalCount += newsTotal;
				if(newsqtime > totalTime) {
					totalTime = newsqtime;
					//$('#totalTime').html(newsqtime);	
				}
				//					newsqtime=newsqtime.toFixed(3);
				$("#tab_xw").attr("data-time", newsqtime);
				//$('#totalCount').html(totalCount);
				$("#tab_xw").attr("data-count", newsTotal);
				//隐藏正在加载的样式
				$(".list_content").find(".loadingBox2").hide();
				var list = data.retData.infoList;
				var html = '';
				var title = "";
				for(var i = 0; i < list.length; i++) {
					html += "<a href='../../slideJump/slideJump.html?txt=" + list[i].pdfUrl + "' class='con-item' target='_blank'><p>" + list[i].title + "</p><div><span>发布时间：" + list[i].release_time + "</span></div><div style='display:none'>" + list[i].typeName + "</div></a>"
				}

				//没有检索到数据
				if(newsTotal == '0') {
					$(".list_content").html('<div class="wj_dataNone">未检索到“<span>' + viewMsg + '”</span>相关新闻</div>');
					$("#moreNews").hide();
					/*if($("#tab_all").hasClass("on")){
						$("#content_xw").hide();
						$(".search_tab li#tab_all").click(function(){
							$("#content_xw").hide();
						});
					}*/
					$("#content_xw").hide();
					blockDiv.content_xw = false;
					$("#xwXGX").hide(); //没有数据隐藏相关性
					$("#xwFBSJ").hide(); //没有数据隐藏发布时间
					$("#changeValue").change();
				} else {
					if(newsTotal <= '5') {
						$("#moreNews").hide(); //少于5条数据隐藏加载更多
					}
					$(".list_content ul").append(html);
				};

			}
		} else {
			//隐藏新闻数据模块div
			$("#content_xw").hide();
			$("#moreNews").hide();
			//errorAlert(data.retCode, data.retMsg);
		}
		changeTime();
	});
}
//新闻详情
function newsDetail(id) {
	$.axs("/betaInvest/btCompanyNews/findNewsBYID.do", {
		"id": id
	}, true, function(data) {
		var listHtml = "";
		$("#newsContent").html("");
		if(data.retCode == "0000") {
			if(data.retData != null) {
				var result = data.retData;
				$("#newsTitle").text(result.contentTitle);
				$("#newsTime").text(result.releaseTime);
				$("#newsSource").text(result.sourceSite);
				var contents = result.newsContent;
				if(contents == "" || contents == null || contents == undefined) {
					//新闻内容为空
				} else {

					var list = jQuery.parseJSON(contents);
					for(var i = 0; i < list.length; i++) {
						if(isContains(list[i], "上一篇") == 1 || isContains(list[i], "下一篇") == 1 || isContains(list[i], "img") == 1) {
							//不追加
						} else {
							listHtml += '<p>' + list[i] + '</p>';
						}
					}
					$("#newsContent").append(listHtml);
				}
			}
		} else {
			errorAlert(data.retCode, data.retMsg);
		}
	});
	//点击新闻的标题显示新闻全屏
	var screenHeight = $(window).height();
	var height2 = screenHeight - 76;
	//$(".news_content").css("max-height",height2);
	$("#new_fullPageNews").css("height", screenHeight);
	$("body", "html").css("overflow", "hidden");
	$("#new_fullPageNews").show();
}
//js判断是否包含某个字符串
function isContains(str, substr) {
	var falg = -1;
	if(str.indexOf(substr) >= 0) {
		falg = 1;
	}
	return falg;
}

//公告
function findCompanyEvent(stockcode, type, content, sortType, pageIndex, pageSize) {
	//正在加载添加及显示star
	var logding = '<div class="loadingBox2" style="display: none;"><div class="loading-3"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><span>加载中</span></div>';
	$(".gjj_gongg_list").prepend(logding);
	$(".gjj_gongg_list").find(".loadingBox2").show();
	//正在加载添加及显示end
	$.axs("/jhhsearch/search.do", {
		"searchQuery": content,
		"stockcode": stockcode,
		"type": type,
		"sortType": sortType,
		"dataType": "",
		"pageIndex": pageIndex,
		"pageSize": pageSize,
		"sysType": "_gonggao"
	}, true, function(data) {
		if(data.retCode == "0000") {
			//console.log(data.retData.datas);
			if(data.retData != null) {
				gongGaoTotal = data.retData.total; //公告总条数
				gongGaoqtime = data.retData.qtime; //搜索公告时间
				gongGaoqtime = (Number(gongGaoqtime)).toFixed(3);
				$("#gongGaoTotal").html('约' + gongGaoTotal + '篇'); //公告总条数
				totalCount += gongGaoTotal;
				if(gongGaoqtime > totalTime) {
					totalTime = gongGaoqtime;

				}
				gongGaoqtime = gongGaoqtime.toFixed(3);
				$("#tab_gg").attr("data-time", gongGaoqtime);
				//$('#totalCount').html(totalCount);
				$("#tab_gg").attr("data-count", gongGaoTotal);
				//隐藏正在加载的样式
				$(".gjj_gongg_list").find(".loadingBox2").hide();
				var list = data.retData.datas;
				var html = '';
				var title = "";
				$(list).each(function(index, item) {
					html += '<li><a href="javascript:;" onclick = GGDetail(' + item.id + ')>' + (item.titleSummary == null ? item.title : item.titleSummary) + '</a>';
					if(item.summary == null || item.summary == '') {
						html += '<span>发布时间：' + item.createDate + '</span></li>';
					} else {
						html += '<span>发布时间：' + item.createDate + '</span><p>' + item.summary + '...</p></li>';
					}
				});
				//点击了排序清空原有数据
				if(onclickPX == 'true') {
					$(".gjj_gongg_list ul").html("");
				}
				//没有检索到数据
				if(gongGaoTotal == '0') {
					$(".gjj_gongg_list").html('<div class="wj_dataNone">未检索到“<span>' + viewMsg + '”</span>相关公告</div>');

					$("#moreGongGao").hide(); //隐藏加载更多
					/*if($("#tab_all").hasClass("on")){
						$("#content_gg").hide();
						$(".search_tab li#tab_all").click(function(){
							$("#content_gg").hide();
						});
					}*/
					$("#content_gg").hide();
					blockDiv.content_gg = false;
					$("#ggXGX").hide(); //没有数据隐藏相关性
					$("#ggFBSJ").hide(); //没有数据隐藏发布时间
					$("#changeValue").change();
				} else {
					if(gongGaoTotal <= '5') {
						$("#moreGongGao").hide(); //少于5条数据隐藏加载更多
					}
					$(".gjj_gongg_list ul").append(html);
				}
			}
		} else {
			//隐藏公告数据div
			$("#content_gg").hide();
			$("#moreGongGao").hide(); //隐藏加载更多
			//errorAlert(data.retCode, data.retMsg);
		}
		changeTime();
	});
}
//点击公告的标题显示公告全屏
function GGDetail(id) {
	//id = '6767071';//测试使用
	$.axs("/betaInvest/companyAnnouncement/findGGBYID.do", {
		"id": id
	}, true, function(data) {
		if(data.retCode == "0000") {
			if(data.retData != null) {
				var result = data.retData;
				$("#GGTitle").text(result.announcementName);
				$("#GGTime").text(result.time);
				$("#GGSource").text(result.source);
				$("#ggPDFId").attr("src", "")
				//$("#ggPDFId").attr("src","http://gg.159jh.com/3406818.pdf");
				$("#ggPDFId").attr("src", "http://" + address + "/gonggao" + result.url);
			}
		} else {
			errorAlert(data.retCode, data.retMsg);
		}
	});
	var screenHeight = $(window).height();
	$("#new_fullPageGG").css("height", screenHeight);
	$("body", "html").css("overflow", "hidden");
	$("#new_fullPageGG").show();
}

//研报
function findCompanyYanBao(stockcode, type, content, sortType, pageIndex, pageSize) {
	//正在加载添加及显示star
	var logding = '<div class="loadingBox2" style="display: none;"><div class="loading-3"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><span>加载中</span></div>';
	$(".gjj_yb_list").prepend(logding);
	$(".gjj_yb_list").find(".loadingBox2").show();
	//正在加载添加及显示end
	//	$.axs("/jhhsearch/search.do",{"searchQuery":content,"type":type,"stockcode":stockcode,"sortType":sortType,"dataType":"","pageIndex":pageIndex,"pageSize":pageSize,"sysType":"_yanbao"},true,function(data){

	var pageNum = 0,
		totalPage = 0,
		reportList = [],
		totalNum = 0;
	var val = '';
	var typeId = "";
	if(content != "" && content.indexOf(",") > 0)
		val = content.split(',')[0];
//			var orderStr;
	if(sortType == 2) {
		orderStr = "desc";
	} else if(sortType == 3) {
		orderStr = "asc";
	}
	var paraminfo = '{"body":{"orderStr":"' + orderStr + '","pageSize":"' + pageSize + '"}}';
	console.log(paraminfo)
	$.axsRequest("FT307", paraminfo, true, function(data) {
		console.log(data)
		if(data.retCode == "0000") {
			if(data.retData != null) {
				yanBaoTotal = data.retData.totalNum; //研报总条数
				//yanBaoqtime=data.retData.qtime;//搜索研报时间
				//yanBaoqtime=(Number(yanBaoqtime)).toFixed(3);
				//totalCount+=yanBaoTotal;
				//if(yanBaoqtime>totalTime){
				//	totalTime=yanBaoqtime;

				//						$('#totalTime').html(yanBaoqtime);

				//}
				//					yanBaoqtime=yanBaoqtime.toFixed(3);
				$("#tab_yb").attr("data-time", yanBaoqtime);
				//$('#totalCount').html(totalCount);
				$("#tab_yb").attr("data-count", yanBaoTotal);
				$("#yanBaoTotal").html('约' + yanBaoTotal + '篇'); //研报总条数
				//隐藏正在加载的样式
				$(".gjj_yb_list").find(".loadingBox2").hide();
				var list = data.retData.infoList;
				var html = '';
				var title = "";
				var type = "0"; //默认打开研报不显示市盈率
				for(var i = 0; i < list.length; i++) {
					// console.log(list[i].attach[1])
					var listObj = JSON.stringify(list[i]);

					if(list[i].rating == "") {
						if(list[i].zsz == null || list[i].syl == null && list[i].rating == "") {
							html += "<a href='/detail/detail.html?txt2=" + list[i].pdf_url + "' class='con-item' target='_blank'><p><span>" + list[i].rtypename + "</span>" + list[i].title + "</p><div><span>发布时间：" + list[i].release_time + "</span><span>所属行业：" + list[i].industry_name + "</span><span>来源：" + list[i].rorgname + "</span><span>本次评级：--</span><span>分析师：" + list[i].analyst + "</span></div><div>" + list[i].content + "</div></a></a>"
						} else {
							html += "<a href='/detail/detail.html?txt2=" + list[i].pdf_url + "'  class='con-item' target='_blank'><p><span>" + list[i].rtypename + "</span>" + list[i].title + "</p><div><span>发布时间：" + list[i].release_time + "</span><span>所属行业：" + list[i].industry_name + "</span><span>来源：" + list[i].rorgname + "</span><span>本次评级：--</span><span>分析师：" + list[i].analyst + "</span><span>总市值：<span class='num'>" + list[i].zsz + "</span>亿</span><span>市盈率（静）：<span>" + list[i].syl + "</span></span></div><div>" + list[i].content + "</div></a></a>"
						}
					} else {
						if(list[i].zsz == null || list[i].syl == null && list[i].rating == "") {
							html += "<a href='/detail/detail.html?txt2=" + list[i].pdf_url + "' class='con-item' target='_blank'><p><span>" + list[i].rtypename + "</span>" + list[i].title + "</p><div><span>发布时间：" + list[i].release_time + "</span><span>所属行业：" + list[i].industry_name + "</span><span>来源：" + list[i].rorgname + "</span><span>本次评级：" + list[i].rating + "</span><span>分析师：" + list[i].analyst + "</span></div><div>" + list[i].content + "</div></a></a>"
						} else {
							html += "<a href='/detail/detail.html?txt2=" + list[i].pdf_url + "'  class='con-item' target='_blank'><p><span>" + list[i].rtypename + "</span>" + list[i].title + "</p><div><span>发布时间：" + list[i].release_time + "</span><span>所属行业：" + list[i].industry_name + "</span><span>来源：" + list[i].rorgname + "</span><span>本次评级：" + list[i].rating + "</span><span>分析师：" + list[i].analyst + "</span><span>总市值：<span class='num'>" + list[i].zsz + "</span>亿</span><span>市盈率（静）：<span>" + list[i].syl + "</span></span></div><div>" + list[i].content + "</div></a></a>"
						}
					}
				}
				console.log("yanBaoTotal:" + yanBaoTotal);
				//没有检索到数据
				if(yanBaoTotal == 0) {

					$(".gjj_yb_list").html('<div class="wj_dataNone">未检索到“<span>' + viewMsg + '”</span>相关研报</div>');
					$("#moreYanBao").hide(); //隐藏加载更多
					/*if($("#tab_all").hasClass("on")){
						$("#content_yb").hide();
						$(".search_tab li#tab_all").click(function(){
							$("#content_yb").hide();
						});
					}*/
					$("#content_yb").hide();
					blockDiv.content_yb = false;
					$("#ybXGX").hide(); //没有数据隐藏相关性
					$("#ybFBSJ").hide(); //没有数据隐藏发布时间
					$("#ybYS").hide(); //没有数据隐藏页数
					$("#changeValue").change();
				} else {
					if(yanBaoTotal <= 5) {
						$("#moreYanBao").hide(); //少于5条数据隐藏加载更多
					}else{
						$("#moreYanBao").show(); //
					}
					$(".gjj_yb_list ul").append(html);
				}
			}
		} else {
			//隐藏研报数据div
			$("#content_yb").hide();
			$("#moreYanBao").hide(); //隐藏加载更多
			//errorAlert(data.retCode, data.retMsg);
		}
		changeTime();
	});
}

//点击研报的标题显示研报全屏
function YBDetail(id, ZSZ, SYL, type) {
	if(type == '0') { //不显示总市值、市盈率
		$("#yanbao_syl").hide();
		$("#yanbao_zsz").hide();
	} else {
		$("#yanbao_syl").show();
		$("#yanbao_zsz").show();
		$("#ZSZYB").text(ZSZ);
		$("#SYLYB").text(SYL);
	}
	$.axs("/betaInvest/companyAnnouncement/findYBByID.do", {
		"id": id
	}, true, function(data) {
		if(data.retCode == "0000") {
			if(data.retData != null) {
				var result = data.retData;
				$("#YBTitle").text(result.title);
				$("#YBTime").text(result.time);
				$("#YBSource").text(result.source);
				$("#yanbaoPDFID").attr("src", "");
				//$("#yanbaoPDFID").attr("src","http://gg.159jh.com/1.pdf");
				$("#yanbaoPDFID").attr("src", "http://" + address + "/yanbao" + result.url);
			}
		} else {
			errorAlert(data.retCode, data.retMsg);
		}
	});
	//点击公告的标题显示公告全屏
	var screenHeight = $(window).height();
	var height1 = screenHeight - 80;
	$("#new_fullPageYB").css("height", screenHeight);
	$("#YBContent").css("max-height", height1)
	$("body", "html").css("overflow", "hidden");
	$("#new_fullPageYB").show();
}
//加载更多新闻
$("#moreNews").click(function() {
	onclickPX = 'false';
	//$(".list_content").css({height:"645px"});
	function countMore() {
		$("#tab_xw").addClass("on").siblings().removeClass("on");
		$(".serach_info_box").hide();
		$("#content_xw").show();
		$(".list_content").css("height", "auto");
		$(".mew_listes").find(".paixu_types").show();
		$(".mew_listes").find(".gg_totals").show();
		// $(".search_tips p:eq(0)").text("用时:"+newsqtime+"秒");//搜索新闻的总时间
		// $(".search_tips p:eq(1)").text("搜索结果:"+newsTotal+"条");//新闻总条数
	}
	if($("#tab_xw").hasClass("on")) {
		if(countMoreNews >= 3) {
			countMore();
			//				alert(0)
			var height = $(".list_content ul").height();
			$(".list_content").scrollTo(0, height);
		}
	} else {
		if(countMoreNews >= 3) {
			countMore();
			$("body").scrollTo(0, 0);
			$(".list_content").scrollTo(0, 0);
		}
		/*if(countMoreNews==1){   
			$("#content_xw .list_content").scrollTo(0,389);   
		}else if(countMoreNews==2){
			$("#content_xw .list_content").scrollTo(0,778);
		}else if(countMoreNews==3){
			$("#content_xw .list_content").scrollTo(0,1167);
		}*/
	}
	/*if(countMoreNews>=3){
	    $("#tab_xw").addClass("on").siblings().removeClass("on");
	    $(".serach_info_box").hide();
	    $("#content_xw").show();
	    $(".list_content").css("height","auto");
	    $("body").scrollTop(0);
	    $(".mew_listes").find(".paixu_types").show();
	    $(".mew_listes").find(".gg_totals").show();
	    $(".search_tips p:eq(0)").text("用时:"+newsqtime+"秒");//搜索新闻的总时间
	    $(".search_tips p:eq(1)").text("搜索结果:"+newsTotal+"条");//新闻总条数
	};*/
	countMoreNews = countMoreNews + 1;
	if((countMoreNews + 1) <= (newsTotal % 5 == 0 ? parseInt(newsTotal / 5) : parseInt(newsTotal / 5) + 1)) {
		findCompanyNews(stockcode, type, content, sortType, countMoreNews + 1, 5);
	} else {
		//没有数据-------加载更多改成没有更多数据
		$("#moreNews").html("没有更多数据");
	}

})

//加载更多公告
$("#moreGongGao").click(function() {
	onclickPX = 'false';

	function countMore() {
		$("#tab_gg").addClass("on").siblings().removeClass("on");
		$(".serach_info_box").hide();
		$("#content_gg").show();
		$(".gjj_gongg_list").css("height", "auto");
		$(".gjj_sear_gonggao").find(".paixu_types").show();
		$(".gjj_sear_gonggao").find(".gg_totals").show();
		$(".search_tips p:eq(0)").text("用时:" + gongGaoqtime + "秒"); //搜索公告的总时间
		$(".search_tips p:eq(1)").text("搜索结果:" + gongGaoTotal + "条"); //公告总条数
	}
	if($("#tab_gg").hasClass("on")) {
		if(countMoreGongGao >= 3) {
			countMore();
			var height = $(".gjj_gongg_list ul").height();
			$(".gjj_gongg_list").scrollTo(0, height);
		}
	} else {
		if(countMoreGongGao >= 3) {
			countMore();
			$("body").scrollTo(0, 0);
			$("#content_gg").scrollTo(0, 0);
		}
		/*if(countMoreGongGao==1){
			$("#content_gg .gjj_gongg_list").scrollTo(0,412);
		}else if(countMoreGongGao==2){
			$("#content_gg .gjj_gongg_list").scrollTo(0,824);
		}else if(countMoreGongGao==3){
			$("#content_gg .gjj_gongg_list").scrollTo(0,1236);
		}*/
	}
	// $(".gjj_gongg_list").css({height:"645px"});
	/*if(countMoreGongGao>=3){
	    $("#tab_gg").addClass("on").siblings().removeClass("on");
	    $(".serach_info_box").hide();
	    $("#content_gg").show();
	    $(".gjj_gongg_list").css("height","auto");
	    $("body").scrollTop(0);
	    $(".gjj_sear_gonggao").find(".paixu_types").show();
	    $(".gjj_sear_gonggao").find(".gg_totals").show();
	    $(".search_tips p:eq(0)").text("用时:"+gongGaoqtime+"秒");//搜索公告的总时间
	    $(".search_tips p:eq(1)").text("搜索结果:"+gongGaoTotal+"条");//公告总条数
	};*/
	countMoreGongGao = countMoreGongGao + 1;

	if((countMoreGongGao + 1) <= (gongGaoTotal % 5 == 0 ? parseInt(gongGaoTotal / 5) : parseInt(gongGaoTotal / 5) + 1)) {
		findCompanyEvent(stockcode, type, content, sortType, countMoreGongGao + 1, 5);
	} else {
		//没有数据-------加载更多改成没有更多数据
		$("#moreGongGao").html("没有更多数据");
	}
})
//加载更多研报
$("#moreYanBao").click(function() {
	console.log(88)
	onclickPX = 'false';

	function countMore() {
		$("#tab_yb").addClass("on").siblings().removeClass("on");
		$(".serach_info_box").hide();
		$("#content_yb").show();
		$(".gjj_yb_list").css("height", "auto");
		$(".gjj_bxxiangyanbao").find(".paixu_types").show();
		$(".gjj_bxxiangyanbao").find(".gg_totals").show();
		$(".search_tips p:eq(0)").text("用时:" + yanBaoqtime + "秒"); //搜索研报的总时间
		$(".search_tips p:eq(1)").text("搜索结果:" + yanBaoTotal + "条"); //研报总条数
	}
	// $(".gjj_yb_list").css({height:"645px"});
	if($("#tab_yb").hasClass("on")) {
		if(countMoreYanBao >= 3) {
			countMore();
			//				alert(0);
			var height = $(".gjj_yb_list ul").height();
			// $(".gjj_yb_list").scrollTo(0,height);
		}
	} else {
		if(countMoreYanBao >= 3) {
			countMore();
			$("body").scrollTo(0, 0);
			$(".gjj_bxxiangyanbao").scrollTo(0, 0);
		}
		/*if(countMoreYanBao==1){
			$("#content_yb .gjj_yb_list").scrollTo(0,412);
		}else if(countMoreYanBao==2){
			$("#content_yb .gjj_yb_list").scrollTo(0,824);
		}else if(countMoreYanBao==3){
			$("#content_yb .gjj_yb_list").scrollTo(0,1236);
		}*/
	}
	//	    if(countMoreYanBao>=3){
	////	        $("#tab_yb").addClass("on").siblings().removeClass("on");
	////	        $(".serach_info_box").hide();
	////	        $("#content_yb").show();
	////	        $(".gjj_yb_list").css("height","auto");
	////	        $(".gjj_bxxiangyanbao").find(".paixu_types").show();
	////	        $(".gjj_bxxiangyanbao").find(".gg_totals").show();
	////	        $(".search_tips p:eq(0)").text("用时:"+yanBaoqtime+"秒");//搜索研报的总时间
	////	        $(".search_tips p:eq(1)").text("搜索结果:"+yanBaoTotal+"条");//研报总条数
	////	        $("body").scrollTop(0)
	//
	//	    };
	countMoreYanBao = countMoreYanBao + 1;
	if((countMoreYanBao + 1) <= (yanBaoTotal % 5 == 0 ? parseInt(yanBaoTotal / 5) : parseInt(yanBaoTotal / 5) + 1)) {
		 findCompanyYanBao(stockcode, type, content, sortType, countMoreYanBao + 1, 5);
	} else {
		//没有数据-------加载更多改成没有更多数据
		$("#moreYanBao").html("没有更多数据");
	}
})
/**
 *排序 
 */
$(".paixu_types span").click(function() {
	$(this).toggleClass("wj_sort_down").addClass("wj_sort_up").siblings().removeClass("wj_sort_down").removeClass("wj_sort_up");
});
$("#ybXGX").click(function() {
	if($(this).hasClass("wj_sort_down")) {
		sortType = "0"; //研报相关性降序
	} else {
		sortType = "1"; //研报相关性升序
	}
	onclickPX = "true"; //点击了排序
	findCompanyYanBao(stockcode, type, content, sortType, 1, 5 * (countMoreYanBao + 1)); //研报
});
$("#ybFBSJ").click(function() {
	if($(this).hasClass("wj_sort_down")) {
		 sortType="2";//研报发布时间降序
//		console.log(1111)
//		paraminfo = '{"body":{"orderStr":"desc"}}';
	} else {
		 sortType="3";//研报发布时间升序
	}
	 onclickPX="true";//点击了排序
	 $(".gjj_yb_list ul").html(" ");
	 findCompanyYanBao(stockcode,type,content,sortType,1,5*(countMoreYanBao+1));//研报
});
$("#ybYS").click(function() {
	if($(this).hasClass("wj_sort_down")) {
		sortType = "4"; //研报页数降序
	} else {
		sortType = "5"; //研报页数升序
	}
	onclickPX = "true"; //点击了排序
	findCompanyYanBao(stockcode, type, content, sortType, 1, 5 * (countMoreYanBao + 1)); //研报
});
$("#xwXGX").click(function() {
	if($(this).hasClass("wj_sort_down")) {
		sortType = "0"; //新闻相关性降序
	} else {
		sortType = "1"; //新闻相关性升序
	}
	onclickPX = "true"; //点击了排序
	findCompanyNews(stockcode, type, content, sortType, 1, 5 * (countMoreNews + 1)); //新闻
});
$("#xwFBSJ").click(function() {
	if($(this).hasClass("wj_sort_down")) {
		console.log(33333)
			sortType="2";//新闻发布时间降序
//		paraminfo = '{"body":{"orderStr":"desc"}}';
	} else {
		 	sortType="3";//新闻发布时间升序
		console.log(44444)
//		paraminfo = '{"body":{"orderStr":"asc"}}';
	}
		onclickPX="true";//点击了排序 
		$(".list_content ul").html(" ");
		findCompanyNews(stockcode,type,content,sortType,1,5*(countMoreNews+1));//新闻
});
$("#ggXGX").click(function() {
	if($(this).hasClass("wj_sort_down")) {
		sortType = "0"; //公告相关性降序
	} else {
		sortType = "1"; //公告相关性升序
	}
	onclickPX = "true"; //点击了排序
	findCompanyEvent(stockcode, type, content, sortType, 1, 5 * (countMoreGongGao + 1)); //公告
});
$("#ggFBSJ").click(function() {
	if($(this).hasClass("wj_sort_down")) {
		sortType = "2"; //公告发布时间降序
	} else {
		sortType = "3"; //公告发布时间升序   
	}
	onclickPX = "true"; //点击了排序
	findCompanyEvent(stockcode, type, content, sortType, 1, 5 * (countMoreGongGao + 1)); //公告
});