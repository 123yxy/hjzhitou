var smsCodes; //短信验证码计时器
var Phone = localStorage.getItem("phone"); //浏览器缓存手机号
var LoginTimes= localStorage.getItem("login_times");  //登陆次数
var UU = localStorage.getItem("UU"); //浏览器缓存UU
var htmlUrl=location.pathname;
var htmlUrl= window.location.pathname;
var searchhtml= htmlUrl.substring(htmlUrl.lastIndexOf("/")+1,htmlUrl.lastIndexOf("."));
var BS = {};
var logflag = false;

//判断是否登录
	if(UU!=""&&UU!=undefined&&UU!=null&&Phone!=""&&Phone!=undefined&Phone!=null){
		param = {uu:UU,phone:Phone};
		$.ajax({  
			type: "post",
			async: false,
			data: param,
			url: "/user/user/isLogin.do",
			dataType: "json",
			timeout : 30000, //超时时间设置，单位毫秒
			beforeSend: function(xhr) {
				xhr.setRequestHeader("UU", localStorage.getItem("UU"));
				xhr.setRequestHeader("phone", localStorage.getItem("phone"));
			},
			success: function(d) {
				if(d){
					//未登录
					logflag = true;
					loginHtml();
				}
			},
			error: function(e) {
	
			}
		});
		
	}else{
		//未登录
		loginHtml();
	}
/**
 * ajax封装
 * 使用$.axs(url, data, async,function(data){
               alert(data.data);
           });
 * @param url 发送请求的地址 /a/b.do
 * @param data 发送到服务器的数据，数组存储，如：{a:a,b:b} 或者 null   
 * @param async 异步true 同步false
 * @param successfn 成功回调函数 
 */
$.axs = function(url, data, async, successfn) {
	//data = (data==null || data=="" || typeof(data)=="undefined")? {"date": new Date().getTime()} : data;
	var backUrl = window.location.href;
	$.ajax({  
		type: "post",
		async: async,
		data: data,
		url: url,
		dataType: "json",
		timeout : 30000, //超时时间设置，单位毫秒
		beforeSend: function(xhr) {
			xhr.setRequestHeader("UU", localStorage.getItem("UU"));
			xhr.setRequestHeader("phone", localStorage.getItem("phone"));
			xhr.setRequestHeader("backUrl", backUrl);
			if(searchhtml!="searchList"){
				$(".loadingBox").show();
			}

		},
		success: function(d) {
//			if(d.retCode == "3018") {
//				dropOut(d.retData);
//			} else {
//				successfn(d);
//			}
			successfn(d);
			$(".loadingBox").hide();
		},
		error: function(e) {
			$(".loadingBox").hide();
			//弹框
//			errorAlert(data.retCode, data.retMsg);
		}
	});
};
/**
 * ajax封装
 * 使用$.axs(RequestType, data, async,function(data){
               alert(data.data);
           });
 * @param RequestType 请求的类型，标识哪种业务操作
 * @param data 发送到服务器的数据，数组存储，如：{a:a,b:b} 或者 null
 * @param async 异步true 同步false
 * @param successfn 成功回调函数 
 */
$.axsRequest = function(RequestType, data, async, successfn) {
	var backUrl = window.location.href;
	$.ajax({
		type: "post",
		async: async,
		data: {"paraminfo":data},
		url: "/beta/public.do", 
		dataType: "json",
		timeout : 10000, //超时时间设置，单位毫秒
		beforeSend: function(xhr) {
//			xhr.setRequestHeader("UU", localStorage.getItem("UU"));
//			xhr.setRequestHeader("phone", localStorage.getItem("phone"));
//			xhr.setRequestHeader("backUrl", backUrl);
			//HTTP头文件
			xhr.setRequestHeader("RequestType", RequestType);
			xhr.setRequestHeader("AppCode", 002);
			xhr.setRequestHeader("SessionId", '1111');
			xhr.setRequestHeader("PhoneNum", localStorage.getItem("phone"));
			xhr.setRequestHeader("SendTime", generateTimeReqestNumber());
			
//			$(".loadingBox").show();
		},
		success: function(d) {
			//console.log(d)
//			if(d.retCode == "3018") {
//				dropOut(d.retData);
//			} else {
//				successfn(d);
//			}
			successfn(d);
//			$(".loadingBox").hide();
		},
		error: function(e) {
			console.log(e)
//			$(".loadingBox").hide();
			//弹框
//			errorAlert(data.retCode, data.retMsg);
		}
	});
};


$.axsRequestUrl = function(RequestType, data, url, async, successfn) {
	var backUrl = window.location.href;
	$.ajax({
		type: "post",
		async: async,
		data: data,
		url: url,
		dataType: "json",
		timeout : 10000, //超时时间设置，单位毫秒
		beforeSend: function(xhr) {
			xhr.setRequestHeader("RequestType", RequestType);
			xhr.setRequestHeader("AppCode", 002);
			xhr.setRequestHeader("SessionId", '1111');
			xhr.setRequestHeader("PhoneNum", localStorage.getItem("phone"));
			xhr.setRequestHeader("SendTime", generateTimeReqestNumber());
		},
		success: function(d) {
			successfn(d);
		},
		error: function(e) {
			console.log(e)
		}
	});
};


$.axsRequestLogin = function(RequestType, data, url, async, successfn) {
	var backUrl = window.location.href;
	$.ajax({
		type: "post",
		async: async,
		data: {"paraminfo":data},
		url: url,
		dataType: "json",
		timeout : 10000, //超时时间设置，单位毫秒
		beforeSend: function(xhr) {
			xhr.setRequestHeader("RequestType", RequestType);
			xhr.setRequestHeader("AppCode", 002);
			xhr.setRequestHeader("SessionId", '1111');
			xhr.setRequestHeader("PhoneNum", localStorage.getItem("phone"));
			xhr.setRequestHeader("SendTime", generateTimeReqestNumber());
		},
		success: function(d) {
			successfn(d);
		},
		error: function(e) {
			console.log(e)
		}
	});
};

/*
 *ajax请求封装
 * lrl
 * 2017.12.27
 * */
$.PostJsonData = function(url, data, async, successfn) {
	$.ajax({
		type: "post",
		async: async,
		data: data,
		url: url,
		dataType: "json",
		timeout : 10000, //超时时间设置，单位毫秒
		success: function(d) {
			successfn(d);
		},
		error: function(e) {
			//弹框
			errorAlert(data.retCode, data.retMsg);
		}
	});
};
/*
 *ajax研报操作信息请求封装
 * hc
 * 2017.12.27
 * */
$.YanbaoLogJsonData = function(data, async, successfn) {
	$.ajax({
		type: "post",
		async: async,
		data: data,
		url: "/beta/reportChart/insertReportChart.do",
		dataType: "json",
		timeout : 10000, //超时时间设置，单位毫秒
		success: function(d) {
			successfn(d);
		},
		error: function(e) {
			//弹框
			errorAlert(data.retCode, data.retMsg);
		}
	});
};

/*
 *ajax用户日志请求封装
 * hc
 * 2017.12.27
 * */
$.UserLogJsonData = function(data, async, successfn) {
	$.ajax({
		type: "post",
		async: async,
		data: data,
		url: "/beta/log/insertLog.do",
		dataType: "json",
		timeout : 10000, //超时时间设置，单位毫秒
		success: function(d) {
			successfn(d);
		},
		error: function(e) {
			//弹框
			errorAlert(data.retCode, data.retMsg);
		}
	});
};

/**
 * ajax封装
 * 使用$.axs(url, data, async,function(data){
               alert(data.data);
           });
 * @param url 发送请求的地址 /a/b.do
 * @param data 发送到服务器的数据，数组存储，如：{a:a,b:b} 或者 null
 * @param async 异步true 同步false
 * @param successfn 成功回调函数 
 */
$.axsJson = function(url, data, async, successfn) {
	//data = (data==null || data=="" || typeof(data)=="undefined")? {"date": new Date().getTime()} : data;
	var backUrl = window.location.href;
	$.ajax({
		type: "post",
		async: async,
		data: data,
		url: url,
		contentType:"application/json",
		dataType: "json",
		timeout : 10000, //超时时间设置，单位毫秒
		beforeSend: function(xhr) {
			xhr.setRequestHeader("UU", localStorage.getItem("UU"));
			xhr.setRequestHeader("phone", localStorage.getItem("phone"));
			xhr.setRequestHeader("backUrl", backUrl);
			$(".loadingBox").show();
		},
		success: function(d) {
//			if(d.retCode == "3018") {
//				dropOut(d.retData);
//			} else {
//				successfn(d);
//			}
			successfn(d);
			$(".loadingBox").hide();
		},
		error: function(e) {
			$(".loadingBox").hide();
			//弹框
//			errorAlert(data.retCode, data.retMsg);
		}
	});
};
/**
 * SendTime
 * 格式YYYYMMDDHHMMSS
 * 用于HTTP头文件 接口调用
 * lrl
 */
function pad2(n) { return n < 10 ? '0' + n : n }
function generateTimeReqestNumber() {
		var date = new Date();
		return date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2(date.getDate()) + pad2(date.getHours()) + pad2(date.getMinutes()) + pad2(date.getSeconds());
}
/**
 * 获取地址栏参数
 * @param name 参数名称
 * @result 参数值
 */
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); // 匹配目标参数
	if(r != null)
		return decodeURIComponent(r[2]);
	return null; // 返回参数值
}

//公共的错误处理方法
function errorAlert(code, msg) {
	switch(Number(code)) {
		case 3018:
			//dropOut();
			break;
		default:
			$.zmAlert(msg, 2000, null, "rgba(95,189,211,0.7)");
			break;
	}
}

/**
 * 弹出框、确认框
 */
(function($) {
	$.extend({
		"zmAlert": function(con, time, urls) { //三个参数 内容、时间、跳转地址（如果有的话）
			if($(".zmAlert").size() == 0) {
				var box = $("<div>");
				var close = $("<button>");
				var bg = $("<div>");
				var p = $("<p>");
				box.attr("class", "zmAlert");
				bg.attr("class", "zmBg");
				close.attr("class", "zmClose");
				box.append(close);
				box.append(p);
				$("body").append(box).append(bg);
				close.unbind("click");
				close.bind("click",
					function() {
						box.fadeOut();
						bg.fadeOut();
					});
				bg.unbind("click");
				bg.bind("click",
					function() {
						box.fadeOut();
						bg.fadeOut();
					});
			}
			time == undefined ? time = 1500 : null;
			time < 1000 ? time = 1000 : null;
			time > 5000 ? time = 5000 : null;
			$(".zmAlert").show();
			$(".zmBg").first().show();
			$(".zmAlert p").html(con);
			alertBack(time, urls);
		},
		"zmConfirm": function(val, titleText, f1, f2) { //内容、标题、确认回调、取消回调
			if($(".zmConfirm").size() == 0) {
				var bg = $("<div class='zmBg'>");
				var box = $("<div class='zmConfirm'>");
				var zcTop = $("<div class='zcTop'>");
				var zcContent = $("<div class='zcContent'>");
				var zcBottom = $("<div class='zcBottom'>");
				var title = $("<p class='title'>");
				var close = $("<button class='zmclose'>");
				var sure = $("<button class='zcBtn'>确 定</button>");
				var cancel = $("<button class='zcBtn'>取 消</button>");
				bg.off("click");
				bg.on("click", function() {
					box.fadeOut();
					bg.fadeOut();
				});
				close.on("click", function() {
					box.fadeOut();
					bg.fadeOut();
				});
				zcTop.append(title).append(close);
				zcBottom.append(sure).append(cancel);
				box.append(zcTop).append(zcContent).append(zcBottom);
				$("body").append(box).append(bg);
			}
			$(".zmConfirm").show();
			$(".zmBg").first().show();
			$(".zcBottom .zcBtn").off("click");
			$(".zcContent").text(val);
			$(".zcTop .title").text(titleText);
			if(typeof(f1) == "function") {
				$(".zcBottom .zcBtn").eq(0).on("click",
					function() {
						$(".zmConfirm").fadeOut();
						$(".zmBg").fadeOut();
						f1();
					});
			}

			$(".zcBottom .zcBtn").eq(1).on("click",
				function() {
					if(f2 != false && typeof(f2) == "function") {
						$(".zmConfirm").fadeOut();
						$(".zmBg").fadeOut();
						f2();
					} else {
						$(".zmConfirm").fadeOut();
						$(".zmBg").fadeOut();
					}
				});
		}
	});

	function alertBack(time, urls) {
		setTimeout(showAlert(urls), time);

	}

	function showAlert(urls) {
		return function() {
			showAlert(urls);
			$(".zmAlert").fadeOut();
			$(".zmBg").fadeOut();
			if(urls != undefined && urls != "") {
				window.location.href = urls;
			}

		}
	}
})(window.jQuery);

/**
 * 没有数据的情况合并td
 * @param colspanNum
 * @returns {String}
 */
function getNoDataHtml(colspanNum){
	var html='<tr><td colspan="'+colspanNum+'">暂无数据</td></tr>';
	return html;
}


/**
 * 判断正负数
 */
function judgeSign(num) {
    var reg = new RegExp("^-?[0-9]*.?[0-9]*$");
    if (reg.test(num)) {
        var absVal = Math.abs(num);
        return num==absVal?'正数':'负数';
    } else {
        return '不是数字';
    }
}

//修改分页文字
function setPageText(pageId) {
//	$("#"+pageId+" tr td").eq(0).find(".l-btn-left ").html("首页");
	$("#"+pageId+" tr td").eq(0).hide();
	$("#"+pageId+" tr td").eq(1).find(".l-btn-left ").html("<img src='/www/images/prev.png'/>");
	$("#"+pageId+" tr td").eq(3).find(".l-btn-left ").html("<img src='/www/images/next2.png'/>");
//	$("#"+pageId+" tr td").eq(4).find(".l-btn-left ").html("末页");
	$("#"+pageId+" tr td").eq(4).hide();
}

//修改分页文字
function setPageText2(pageId) {
	$("#"+pageId+" tr td").eq(0).find(".l-btn-left ").html("首页");
	$("#"+pageId+" tr td").eq(1).find(".l-btn-left ").html("上一页");
	$("#"+pageId+" tr td").eq(3).find(".l-btn-left ").html("下一页");
	$("#"+pageId+" tr td").eq(4).find(".l-btn-left ").html("末页");
}


/**
 * 查找行业信息-只查询二级行业
 */
function findTradeSecond(){
	$.axs("/betaStock/btCategory/findBtCategory.do",null,false,function(data){
		//	console.log(data);
		if (data.retCode==0000) {
			if(data.retData==null){
				return false;
			}
			var tradeList=data.retData;
			var letterTmp="";//控制是否追加大写字母
			var html='';
			for(var i=0;i<tradeList.length;i++){
				var trade=tradeList[i];
				if((i!=0 && i%8==0) || i==tradeList.length-1){
					if(i==tradeList.length-1){
						if(letterTmp!=trade.pinyinHeader){
							letterTmp=trade.pinyinHeader;
							html+='<li><span><em>'+trade.pinyinHeader+'</em></span><a href="javascript:;" title='+trade.categoryName+' >'+(trade.categoryName.length > 8 ? trade.categoryName.substring(0,8)+"..." : trade.categoryName)+'</a></li>';
						}else{
							html+='<li><span></span><a href="javascript:;" title='+trade.categoryName+' >'+(trade.categoryName.length > 8 ? trade.categoryName.substring(0,8)+"..." : trade.categoryName)+'</a></li>';
						}
					}
					html+='</ul>';
				}
				if(i%8==0 && i!=tradeList.length-1){
					html+='<ul>';
				}
				if(i!=tradeList.length-1){
					if(letterTmp!=trade.pinyinHeader){
						letterTmp=trade.pinyinHeader;
						html+='<li><span><em>'+trade.pinyinHeader+'</em></span><a href="javascript:;" title='+trade.categoryName+' >'+(trade.categoryName.length > 8 ? trade.categoryName.substring(0,8)+"..." : trade.categoryName)+'</a></li>';
					}else{
						html+='<li><span></span><a href="javascript:;" title='+trade.categoryName+' >'+(trade.categoryName.length > 8 ? trade.categoryName.substring(0,8)+"..." : trade.categoryName)+'</a></li>';
					}
				}
			}
			$("#qy_box").html(html);
		} else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}
/**
 * 保存检索条件
 * @param searchType 保存的查询类型--1:行业,2:壳概念,3:定增,4:财务指标查询,5:公告查询,6:持股查询
 * @param analysisUrl 检索url  "/XXX.html?"+Param,
 * @param searchConditionStr 检索条件 {\"secondaryIndustries\":公路铁路运输,\"territory\":河北省}
 * @param searchName "找财报：公路铁路运输+河北省"
 */
function saveFindParam(searchType,searchConditionStr,analysisUrl,searchName){
	var paramData={type:searchType,conditionInfo:searchConditionStr,
			analysisUrl:analysisUrl,conditionName:searchName}
	$.axs("/betaStock/stockConditionOperation/addStockCondition.do",paramData,false,function(data){
		if (data.retCode==0000) {
			$.zmAlert("添加成功！");
			//遮盖层隐藏
			$("#savaParam").find("input").val("");
		} else{
			errorAlert(data.retCode,data.retMsg);
		}
		$("#savaParam").hide();
		$(".tcbackground").hide();
		//已保存查询条件--刷新
		findSearchList(searchType)
	});
	//遮盖层隐藏
}

/**
 * 查询保存检索列表
 * @param paramData searchType
 */
function findSearchList(type){
	$.axs("/betaStock/stockConditionOperation/findStockCondition.do",{type:type},true,function(data){
		if (data.retCode=="0000") {
			$("#searchNum").parent().next().empty();
			if(data.retData != null && data.retData != ""){
				$("#conditionsList").show();
				$("#searchNum").parent().parent().removeClass("am_dashed");
				$("#searchNum").text("("+data.retData.length+")");
				var name = "";
				$.each(data.retData,function(index,item){
					var id = item.id;
					if(item.conditionName.length > 15){
						name = item.conditionName.substring(0,15) + "……";
					}else{
						name = item.conditionName;
					}
					var li = $("<li><a href="+item.analysisUrl+" title="+item.conditionName+">"+name+"</a></li>");
					var b = $("<i>");
					b.on("click",function(){
						deleteSearch(id,this);
					})
					li.append(b);
					$("#searchNum").parent().next().append(li);
				})
			}else{
				$("#conditionsList").hide();
			}
		} else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}

/**
 * 删除单个筛选条件
 * @param id
 * 
 */
function deleteSearch(id,own){
	$.axs("/betaStock/stockConditionOperation/deleStockCondition.do",{id:id},true,function(data){
		if (data.retCode == 0000) {
			$(own).parent().remove();
			var num = ($("#searchNum").text().substring(1,$("#searchNum").text().length - 1) - 1);
			$("#searchNum").text("("+num+")");
			if(num == 0){
				/*$("#searchNum").parent().parent().addClass("am_dashed");
				$("#searchNum").parent().parent().removeClass("hover");
				$("#searchNum").parent().next().hide();
				$(".tmtc_new").hide();*/
				$("#conditionsList").hide();
			}
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}

/**
 * 点击筛选
 * @param str
 * @param data
 */
function screenCommon(str,data,type){
	if($.trim($(data).parent().prev().val()) != ""){
		var value = $(data).parent().prev().val();
		if(str == "stock"){
			value = value.substring(value.indexOf("(") + 1,value.indexOf("(") + 7);
		}
		var flag = true;
		$("[name='condition']").each(function(){
			if($(this).attr("data-name") == str){
				flag = false;
				$(this).attr("data-value",value);
				$(this).text($(data).parent().prev().val());
				var i = $("<i>");
				i.on("click",function(){
					$(this).parent().remove();
					$(this).parent().remove();
					if(type == "director"){
						loadDirectorMsg(1,5,getConditions());
					}else if(type == "hold"){
						loadHoldMsg(1,5,getConditions());
					}else if(type == "maker"){
						loadMakerMsg(1,5,getConditions());
					}else if(type == "laws"){
						loadLawsMsg(1,5,getConditions());
					}else if(type == "broker"){
						loadBrokerMsg(1,5,getConditions());
					}
				})
				$(this).append(i);
			}
		})
		if(flag){
			var a = $("<a name='condition' href='javascript:;'>");
			a.attr("data-name",str);
			a.attr("data-value",value);
			a.text($(data).parent().prev().val());
			var i = $("<i>");
			i.on("click",function(){
				$(this).parent().remove();
				if(type == "director"){
					loadDirectorMsg(1,5,getConditions());
				}else if(type == "hold"){
					loadHoldMsg(1,5,getConditions());
				}else if(type == "maker"){
					loadMakerMsg(1,5,getConditions());
				}else if(type == "laws"){
					loadLawsMsg(1,5,getConditions());
				}else if(type == "broker"){
					loadBrokerMsg(1,5,getConditions());
				}
			})
			a.append(i);
			$("#clear_tj").after(a);
			$("#saveParamTitle").hide();
		}
		$(data).parent().prev().val("");
	}
}

/**
 * 回显是显示条件样式
 * @param type 哪个页面
 * @param name 参数名字
 * @param value 参数值
 * @param showText 显示时使用的文字
 */
function showCondtion(type,name,value,showText){
	var a = $("<a name='condition' href='javascript:;'>");
	a.attr("data-name",name);
	a.attr("data-value",value);
	a.text(showText);
	var i = $("<i>");
	i.on("click",function(){
		$(this).parent().remove();
		if(type == "director"){
			loadDirectorMsg(1,5,getConditions());
		}else if(type == "hold"){
			loadHoldMsg(1,5,getConditions());
		}else if(type == "maker"){
			loadMakerMsg(1,5,getConditions());
		}else if(type == "laws"){
			loadLawsMsg(1,5,getConditions());
		}else if(type == "broker"){
			if(name == "addressId"){
				$("#firstLevelArea").prev().text("请选择企业所在地区");
			}
			if(name == "type"){
				$("[name='leixing']").each(function(){
					this.checked = false;
				})
			}
			loadBrokerMsg(1,5,getConditions());
		}
	})
	a.append(i);
	$("#clear_tj").after(a);
}

/**
 * 获取条件
 */
function getConditions(){
	var conditions = "";
	$("[name='condition']").each(function(){
		conditions += '&' + $(this).attr("data-name") + '=' + $(this).attr("data-value");
	})
	return conditions;
}

/**
 * 初始化MQ
 * 每个页面只需要初始化一次即可
 * @param time轮询时间,默认12s轮询一次
 * @returns activemq对象
 */
function initAMQ(time){
	var amq = org.activemq.Amq;
	amq.init({
      uri: 'amq',
      logging: true,
      timeout: time
    });
	return amq;
}
/**
 * 监听activemq消息队列
 * @param amq   activemq对象
 * @param topicName  监听的广播名称
 * @param handler  监听到数据的处理方法
 */
function addListener(amq,topicName,handler){
	amq.addListener(topicName,"topic://"+topicName,handler);
}
/**
 * 发送activemq消息队列
 * @param amq  activemq对象
 * @param topicName 发送消息的广播名称
 * @param msg 发送的消息
 */
function sendMessage(amq,topicName,msg){
	amq.sendMessage("topic://"+topicName,msg);
} 

/**
 * 企业信息搜索补全（返回股票代码和企业简称）
 * @param request
 * @param response
 * 
 */
var searchList=[];
function findCodeName(request, response,type) {
	if(type==null||type==""||type==undefined){
		type=null;
	}else{
		type = type;
	}
	$.axs("/betaStock/enterPriseData/findCodeName.do", {codeName: request.term,type:type}, false, function(data){
		if(data.retCode == 0000) {
			if(data.retData == null) {
				return false;
			}
			var arr = [];
			$.each(data.retData, function(i, item) {
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
	});
}

/**
 * 企业信息搜索补全（返回股票代码和企业简称）
 * @param request
 * @param response
 * 
 */
var searchObjectList=[];
function searchObjecCodetList(request,response) {
	console.log("searchObjecCodetList")
	var paraminfo='{"body":{"serch_key":"'+request.term+'","size":"10"}}';
	$.axsRequest("FT334",paraminfo,false,function(data){
	 	if(data.retCode=="0000"){
	 		var dataList=data.retData.infoList;
			if(dataList == null) {
				return false;
			}
			var arr = [];
			$.each(dataList, function(i, item) {
				var obj = {
					label: item.name + "(" + item.code + ")",
					value: item.name + "(" + item.code + ")",
					name: item.name,
					code: item.code
				}
				arr.push(obj);
			});
			searchObjectList = arr;
			response(arr);
		} else {
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

/**
 * 企业信息搜索补全（返回股票代码和企业简称）
 * @param request
 * @param response
 * 
 */
var searchListAddShangshi=[];
function findCodeNameAddShangShi(request, response) {
//	console.log(request.term);
	$.axs("/betaInvest/common/findCodeName.do", {codeName: request.term}, false, function(data){
		if(data.retCode == 0000) {
			if(data.retData == null) {
				return false;
			}
			var arr = [];
			$.each(data.retData, function(i, item) {
				var obj = {
					label: item.stockName + "(" + item.stockCode + ")",
					value: item.stockName + "(" + item.stockCode + ")",
					name: item.stockName,
					code: item.stockCode
				}
				arr.push(obj);
			});
			searchListAddShangshi = arr;
			response(arr);
		} else {
			errorAlert(data.retCode, data.retMsg);
		}
	});
}


/**
 * 企业信息搜索补全(只返回股票代码)
 * @param request
 * @param response
 */
function findByCodeName(request, response,type) {
	if(type==null||type==""||type==undefined){
		type=null;
	}else{
		type = type;
	}
	$.axs("/betaStock/enterPriseData/findCodeName.do", {codeName: request.term,type:type}, false, function(data){
		if(data.retCode == 0000) {
			if(data.retData == null) {
				return false;
			}
			var arr = [];
			$.each(data.retData, function(i, item) {
				var obj = {
					label: item.companyForShort + "(" + item.stockCode + ")",
					value: item.stockCode,
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
 * 股票代码自动补全数据
 */
function findAutocompleteStockCodeAndName() {
	$.axs("/betaStock/enterPriseData/findAll.do", null, true, function(data){
		if(data.retCode == 0000) {
			if(data.retData!=null && data.retData.length!=0){
				var resultList=data.retData;
				var autocompleteStockCodeAndName=[];
				for(var i=0;i<resultList.length;i++){
					autocompleteStockCodeAndName[i]=resultList[i].companyForShort+"("+resultList[i].stockCode+")";
				}
				//入缓存
				var autocompleteDate=(new Date()).Format("yyyy-MM-dd");
				localStorage.setItem(autocompleteDate,JSON.stringify(autocompleteStockCodeAndName));
			}
		} else {
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

/**
 * 公共pdf预览方法
 * @param url: 
 */
function downloadPdf(url) {
	if(url == null || "" == url) {
		$.zmAlert("文件路径错误！");
	}
	//window.location.href='http://bdata.159jh.com/home/bdata/files/pdf1/disclosure/2006/0314/16565007.pdf';
	//window.location="/common/downLoad.do?fileName="+fileName+"&url="+url;
	//window.open("/common/downLoad.do?fileName="+decodeURIComponent(fileName)+"&url="+decodeURIComponent(url));
	//js截取
	var urlT = decodeURIComponent(url).replace("/home/miniweb/files", "");
	//window.open("http://pdf.159jh.com"+urlT);
	window.open(urlT);
}
/**************************************************登录注册js***********************************************************/
$(function() {
	//退出登录
	$("#dropOut").on("click", function() {
		exitLogin();
	});
	//判断是否登录
//	if(UU!=""&&UU!=undefined&&UU!=null&&Phone!=""&&Phone!=undefined&Phone!=null){
//		//后台判断及是否登录
//		isLogin();
//	}else{
//		//未登录
//		loginHtml();
//	}
	

});
//跳转登录页面
function loginHtml(){
	var backUrl = window.location.href;
	if (backUrl.indexOf("nlogin.html") < 0
			&& backUrl.indexOf("nresetPsw.html") < 0
			&& backUrl.indexOf("nregister.html") < 0
			&& backUrl.indexOf("userAgreement.html") < 0
			&& backUrl.indexOf("ImprovePersonalInformation.html") < 0) {
			window.location.href="/nlogin.html";
	}
}
//判断是否登录
function isLogin(){
	param = {uu:UU,phone:Phone};
	$.axs("/user/user/isLogin.do",param,false,function(data){

		if(data){
			//未登录
			//
			logflag = true;
			loginHtml();
		}
	});
}


//退出登录
function exitLogin(){
	var phoneNum=localStorage.getItem("phone");
			var pass=localStorage.getItem(phoneNum);
			localStorage.clear();
			localStorage.setItem("phone",phoneNum);
			localStorage.setItem(phoneNum,pass);
			logflag = false;
			loginHtml();
	$.axs("/user/user/cancelLogin.do",param,true,function(data){
		if(data.retCode=="0000"){

		}
	});
}

//短信验证码
function sendSMS(me) {
	sendSMSCountdown(me);
	param = {phoneNumber:$("#phoneNumRe").val(),type:1};
	$.axs("/user/common/verificationCode.do",param,true,function(data){
		if(data.retCode=="0000"){
			//发送成功
			$("#new_error3").hide();
		}else{
			//发送失败 或者 一分钟只能发一次
			$("#new_error3").empty().html(data.retMsg).show();
		}
	});
}

// 短信验证码倒计时
function sendSMSCountdown(me) {
	clearInterval(smsCodes);
	countDown = 60
	me.addClass("disabled").attr("disabled", "disabled").html(
		countDown + "秒后再发送"); // 最后这个html去掉定时器一秒的延迟
	smsCodes = setInterval(function second() {
		countDown--;
		if(countDown != 0) {
			me.html(countDown + "秒后再发送");
		} else {
			me.html("获取验证码").removeClass("disabled").removeAttr("disabled");
			clearInterval(smsCodes);
		}

	}, 1000);
}

//---------扩展表单校验规则
if(jQuery.validator) {
	jQuery.validator.addMethod("mobile", function(value, element) {
		var tel = /^1[3|4|5|7|8]{1}[\d]{9}$/;
		return this.optional(element) || (tel.test(value));
	}, "请正确填写您的手机号");
	jQuery.validator.addMethod("password", function(value, element) {
		var tel = /^[a-zA-Z0-9~!@#$%^&*()_+\-={}:;<>?,.\/]{6,16}$/;
		return this.optional(element) || (tel.test(value));
	}, "您输入的密码格式不正确");
	jQuery.validator.addMethod("notEqualTo", function(value, element, param) {
		return this.optional(element) || (value != $(param).val());
	}, "新密码不能与原密码一致!");
}

/*******************************************我的自选股相关************************************/
//删除一个自选股
function deleteOptional(id,stockCode){
	//deletTips();
	$.axs("/betaStock/optionalkMap/deleteOptional.do",{opId:id},true,function(data){
		if(data.retCode=="0000"){
			deleteTX(stockCode); //删除提醒
			if(window.location.href.indexOf("/security/myPreferredStock.html") > -1){
				findList();
			}
			//移除缓存
			/*$(contrastT).each(function(){
				var val = this.split("-");
				if(val[0] == stockCode){
					contrasts = contrasts.replace(","+this,"");
				}
			})
			localStorage.setItem(userId,contrasts);*/
//			showContrast();
			addOptionalStock();
			
			if(window.location.href.indexOf("searchList.html") == -1){
				$.zmAlert("删除成功");
			}else{
				$(".wj_searchAdd").removeClass("wj_searchCut");
				$(".wj_searchMsg").removeClass("wj_searchMsg_checked");
				$(".wj_searchMsg").hide();
//				$(".wj_searchAdd").toggleClass("wj_searchCut");
//			    $(".wj_searchAdd").siblings(".wj_searchMsg").toggle();
			}
			
			var zxNumOld = parseInt($("#zixuanguNumTotal").text().replace("（", "").replace("）", ""));
			if(zxNumOld<=0 || zxNumOld=="0"){
				$("#zixuanguNumTotal").text("（0）");
				$(".zx_num").text("（0）");
			}else{
				$("#zixuanguNumTotal").text("（"+ (zxNumOld-1) +"）");
				$(".zx_num").text("（"+ (zxNumOld-1) +"）");
			}
			$("#SearchAddOptional").val("");
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

//删除一个自选股
function deleteOptionalByStocke(stocke){
	var resultData = "";
	$.axs("/betaStock/optionalkMap/deleteOptionalByStocke.do",{stocke:stocke},false,function(data){
		if(data.retCode=="0000"){
			deleteTX(stocke); //删除提醒
			resultData =data.retCode;
			var zxNumOld = parseInt($("#zixuanguNumTotal").text().replace("（", "").replace("）", ""));
			if(zxNumOld<=0 || zxNumOld=="0" ){
				$("#zixuanguNumTotal").text("（0）");
			}else{
				$("#zixuanguNumTotal").text("（"+ (zxNumOld-1) +"）");
			}
			$(".czzx_icon").click();
			$(".zixuangu").click();
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
	return resultData;
}


//查询该股票代码在我的自选股是否存在
function isTrue(stockCode){
	var isBoolean = false;
	$.axs("/betaStock/optionalkMap/isTrue.do",{stockCode:stockCode},false,function(data){
		isBoolean = data;
	});
	return isBoolean;
}

//添加自选股
function addOptional(stcoke,type){
	var optionalId = null;
	//console.log(stcoke)
	$.axs("/betaStock/optionalkMap/addOptional.do",{stockedId:stcoke},false,function(data){
		if(data.retCode=="0000"){
			if(type==1){
				if(window.location.href.indexOf("/security/myPreferredStock.html") > -1){
					findList();
				}
				//findList();
				$.zmAlert("添加成功");
			}else if(type==2){
				$.zmAlert("添加成功");
			}else{
				optionalId = data.retData;
			}
			var param={followId:stcoke,followType:1};
			var path="/betaStock/redis/addFollow.do";
			$.axs(path,param,false,function(data){
    			console.log(data);
    		});
			//console.log(data);
			addOptionalStock();
			var zxNumOld = parseInt($("#zixuanguNumTotal").text().replace("（", "").replace("）", ""));
			$("#zixuanguNumTotal").text("（"+ (++zxNumOld) +"）");
			$(".czzx_icon").click();
			$(".zixuangu").click();
			
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
	return optionalId;
}

/**
 * 删除提醒
 * @param stockCode
 */
function deleteTX(stockCode){
	$.axs("/betaInvest/shareAlert/deleBtStockAlert.do",{stockCode:stockCode},true,function(data){});
}

/**
 * echart图片保存到服务器
 * @param myChart 对象:chart 
 * @return 返回一个可直接访问的路径
 */
function echartPngToServer(myChart){
//	console.log(myChart.getDataURL("png"));
	var httpUrl="";
	var param={urlCode:myChart.getDataURL("png")};
	$.axs("/betaInvest/common/saveEchartImg.do",param,false,function(data){
		console.log(data);
		httpUrl=data;
	});
	return httpUrl;
}

/**
 * 单位换算
 * 使用方法$.unitsFormat(10000,'万')
 * 使用方法$.unitsFormat(10000,'4')
 * @param numVal 值
 * @param units 单位(可为数字,数字的含义为单位的位数(例:万=5;万是5位数))
 * 				单位(可为汉字,以汉字单位表示(个、十、百、千、万、十万、百万、千万、亿、十亿));汉字单位表示到十亿
 * @returns
 */
$.unitsFormat=function(numVal,units){
	//判断值为空
	if(numVal==null || numVal=="" || numVal==undefined){
		return "--";
	}
	//判断参数不是数字
	if(isNaN(numVal)){
		return "--";
	}
	//判断参数不是数字
	if(isNaN(units)){
		return "--";
	}
	//任何数除以1都是这个数本身,顾默认的单位为1
	var danweiVal=1;
	units=Number(units);
	for (var i = 1; i < units; i++) {
		danweiVal+="0";
	}
	danweiVal+=".00";
	danweiVal=Number(danweiVal);
//	if(isNaN(danwei)){
//		switch(danwei){
//		    case '个'	: danweiVal=1.00;break;
//		    case '十'	: danweiVal=10.00;break;
//		    case '百'	: danweiVal=100.00;break;
//		    case '千'	: danweiVal=1000.00;break;
//		    case '万'	: danweiVal=10000.00;break;
//		    case '十万'	: danweiVal=100000.00;break;
//		    case '百万'	: danweiVal=1000000.00;break;
//		    case '千万'	: danweiVal=10000000.00;break;
//		    case '亿' 	: danweiVal=100000000.00;break;
//		    case '十亿'	: danweiVal=1000000000.00;break;
//		    default:danweiVal=1;break;
//		}
//	}else{
//		
//	}
	return (numVal/danweiVal).toFixed(2);
}

/**
 * 判断是否是新三板公司
 * @param code
 * @returns {Boolean}
 */
function isXSBCompany(code){
	var flag4 = false;
	var flag8 = false;
	
	var fdStart4 = code.indexOf("4");
	var fdStart8 = code.indexOf("8");
	
	if(fdStart4 == 0){
		flag4 = true;
	}
	
	if(fdStart8 == 0){
		flag8 = true;
	}
	return (flag4 || flag8);
}

//***************************//
//获取版本号
function getProjectVersion(){
	return "2.0.1";
}

/**
 * 判断URL是否可以正常访问
 * @param url
 * @returns
 */
function isHaveUrl(url){
	var flag = true;
	$.axs("/betaInvest/common/testUrl.do",{testUrl:url},false,function(data){
		if(data.retCode=="0000"){
			flag = data.retData;
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
	return flag;
}
/**
 * 判断字符串是否为空
 * @param str
 * @returns
 */
function isStrKong(str) {
    return ((str == null || str == "" || str == undefined) ? "--" : str);
}
/**
 * 判断数字是否为空
 * @param sz
 * @returns
 */
function isSZKong(sz) {
    return ((sz == null || sz == undefined || (sz == "" && sz != 0)) ? "-" : sz);
}