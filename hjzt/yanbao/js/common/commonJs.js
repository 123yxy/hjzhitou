

// 注册头部
function logHead() {
    var logHead = '<a href="index.html"><img src="/saasBeta/yanbao/images/logo-loginReg.png" alt=""></a>';
    $(".logHead").append(logHead)
};

// 注册尾部
function logFoot() {
    // var logFoot = '<p><a href="">圣康汇金</a>  ·  <a href="">三板数据库</a>  ·  <a href="">微信服务号</a>  ·  <a href="">联系我们</a></p>';
    var logFoot = '<p>service@159jh.com ·  京ICP备11029652号</p>';
    $(".logFoot").append(logFoot)
}

var userId = localStorage.getItem("userId");//20171010 shiqi
var stockCodeParam = UTIL.getPara("stockCode");
var stockNameParam = decodeURI(UTIL.getPara("stockName"));
$(function () {
	//判断用户是否是付费的情况
	payOrNot();
	//点击提交订单
	tiJiaoDingDan();
	if($(".data-select").find("label").eq(0).hasClass("on")){
		$(".dingdan").removeClass("notClick");
	}else{
		$(".dingdan").addClass("notClick");
	}
	
	
	$(".marsk").on("click",function(){
		$("#resume").hide();
		$(this).hide();
		$("#jjgdMX").hide();
        $("#MajorEventsAndMergers").hide();
        $("#BenchmarkingData").hide();
        $("#MajorEvents").hide();
        $(".faxing-tc").hide();
        $("#patentnumTc").hide();
        $("#marketNum").hide();
        $("#copyrightnumTc").hide();
	})
	$(".tc-close").on("click",function(){
		$(this).parent().hide();
		$(".marsk").hide();
        $('#copyrightnumTc').hide();
	})
	
	
	//点击常见问题
	$(".common-problem").on("click",function(){
		$("#cmmomProblem").show();
	})
	$("#cmmomProblem em").on("click",function(){
		$("#cmmomProblem").hide();
	})
	//点击购买说明
	$(".paies").on("click",function(){
		$("#payFor").show();
	})
	$("#payFor em").on("click",function(){
		$("#payFor").hide();
	})
	//点击支付页面的右上角的关闭按钮关闭支付弹窗
	$(".top-name em").on("click",function(){
		$("#payment-page").hide();
	})
	//点击服务协议的勾选
	$(".data-select").on("click",function(){
		if($(this).find("label").eq(0).hasClass("on")){
			$(this).find("label").eq(0).removeClass("on");
			$(".dingdan").addClass("notClick");
		}else{
			$(this).find("label").eq(0).addClass("on");
			$(".dingdan").removeClass("notClick");
		}
	})
	
	
	//点击订单详情里的立即支付按钮、
	$(".zhifu-now").on("click",function(){
		$("#orderDetails").hide();
		$("#zf-ewm").show();
		
	})
	
	
    //首页顶部搜索
    if ($("#topSearch").length > 0) {
        $("#topSearch").autocomplete({
            minLength: 1,
            source: function (request, response) {
                findCodeName(request, response);
            },
            delay: 200,
            select: function (event, ui) {
                var userId = localStorage.getItem("userId");
                var item = ui.item;
                //console.log(item)
                if ($("#topSearch").val() != "") {
                    //var val = $.trim($("#searchCompany").val());
                    var value = item.value;
                    var code = value.substring(value.indexOf("(") + 1, value.indexOf(")"));
                    var name = value.substring(0, value.indexOf("("));

                    $("#topSearch").on("keydown", function (e) {
                        if (e.keyCode == 13) {
                            //			alert(0)
                            var searchStr = $("#topSearch").val();
                            if ($("#topSearch").val() != "") {
                                var searchStr = $("#topSearch").val()
                                if (userId != null && userId != "" && userId != "undefined") {
                                    //						location.href = "./cover.html?stockCode=" + code + "&stockName=" + name;
                                    //						var urlName = "./cover.html?stockCode=" + code + "&stockName=" + name;
                                    location.href = "./searchResultsPage.html?searchStr=" + code;
                                    var urlName = "./searchResultsPage.html?searchStr=" + code;
                                    localStorage.setItem("locaHref", urlName);
                                } else {
                                    location.href = "./login.html?stockCode=" + code + "&stockName=" + name;
                                }
                            }
                        }
                    });


                    if (userId != null && userId != "" && userId != "undefined") {
                        //						location.href = "./cover.html?stockCode=" + code + "&stockName=" + name;
                        //						var urlName = "./cover.html?stockCode=" + code + "&stockName=" + name;
                        location.href = "./searchResultsPage.html?searchStr=" + code;
                        var urlName = "./searchResultsPage.html?searchStr=" + code;
                        localStorage.setItem("locaHref", urlName);
                    } else {
                        location.href = "./login.html?stockCode=" + code + "&stockName=" + name;
                    }
                } else {
                    $.zmAlert("请输入要检索的信息");
                }
                $("#ui-id-2").hide();
                //console.log(item);
            }
        });
    }


    $("#topSearch").on("focus", function () {
        //历史搜索
        var value = $("#topSearch").val();
        $(this).attr("placeholder", "");
        if (value == "" || value == null || value == undefined) {
            findSearchHis();
        };
    });

	$("#topSearch").on("keydown", function (e) {
		if (e.keyCode == 13) {
			//			alert(0)
			var searchStr = $("#topSearch").val();
			if ($("#topSearch").val() != "") {
				var searchStr = $("#topSearch").val();
				var code = searchStr.substring(searchStr.indexOf("(") + 1, searchStr.indexOf(")"));
				if(code.length>0)
					searchStr=code;
				if (userId != null && userId != "" && userId != "undefined") {
					//						location.href = "./cover.html?stockCode=" + code + "&stockName=" + name;
					//						var urlName = "./cover.html?stockCode=" + code + "&stockName=" + name;
					location.href = "./searchResultsPage.html?searchStr=" + searchStr;
					var urlName = "./searchResultsPage.html?searchStr=" + searchStr;
					localStorage.setItem("locaHref", urlName);
				} else {
					location.href = "./login.html?stockCode=" + code + "&stockName=" + name;
				}
			}
		}
	});

	//A股顶部搜索
    if ($("#topSearchA").length > 0) {
        $("#topSearchA").autocomplete({
            minLength: 1,
            source: function (request, response) {
                AfindCodeName(request, response);
            },
            delay: 200,
            select: function (event, ui) {
                var userId = localStorage.getItem("userId");
                var item = ui.item;
                //console.log(item)
                if ($("#topSearchA").val() != "") {
                    //var val = $.trim($("#searchCompany").val());
                    var value = item.value;
                    var code = value.substring(value.indexOf("(") + 1, value.indexOf(")"));
                    var name = value.substring(0, value.indexOf("("));

                    $("#topSearchA").on("keydown", function (e) {
                        if (e.keyCode == 13) {
                            			alert(0)
                            var searchStr = $("#topSearchA").val();
                            if ($("#topSearchA").val() != "") {
                                var searchStr = $("#topSearchA").val()
                                if (userId != null && userId != "" && userId != "undefined") {
                                    //						location.href = "./cover.html?stockCode=" + code + "&stockName=" + name;
                                    //						var urlName = "./cover.html?stockCode=" + code + "&stockName=" + name;
                                    location.href = "./AsearchResultsPage.html?searchStr=" + code;
                                    var urlName = "./AsearchResultsPage.html?searchStr=" + code;
                                    localStorage.setItem("locaHref", urlName);
                                } else {
                                    location.href = "./login.html?stockCode=" + code + "&stockName=" + name;
                                }
                            }
                        }
                    });


                    if (userId != null && userId != "" && userId != "undefined") {
                        //						location.href = "./cover.html?stockCode=" + code + "&stockName=" + name;
                        //						var urlName = "./cover.html?stockCode=" + code + "&stockName=" + name;
                        location.href = "./AsearchResultsPage.html?searchStr=" + code;
                        var urlName = "./AsearchResultsPage.html?searchStr=" + code;
                        localStorage.setItem("locaHref", urlName);
                    } else {
                        location.href = "./login.html?stockCode=" + code + "&stockName=" + name;
                    }
                } else {
                    $.zmAlert("请输入要检索的信息");
                }
                $("#ui-id-2").hide();
                //console.log(item);
            }
        });
    }


    $("#topSearchA").on("focus", function () {
        //历史搜索
        var value = $("#topSearchA").val();
        $(this).attr("placeholder", "");
        if (value == "" || value == null || value == undefined) {
            AfindSearchHis();
        };
    });
	$("#topSearchA").on("keydown", function (e) {
		if (e.keyCode == 13) {
			var searchStr = $("#topSearchA").val();
			if ($("#topSearchA").val() != "") {
				var searchStr = $("#topSearchA").val();
				var code = searchStr.substring(searchStr.indexOf("(") + 1, searchStr.indexOf(")"));
				if(code.length>0)
					searchStr=code;
				if (userId != null && userId != "" && userId != "undefined") {
					//						location.href = "./cover.html?stockCode=" + code + "&stockName=" + name;
					//						var urlName = "./cover.html?stockCode=" + code + "&stockName=" + name;
					location.href = "./AsearchResultsPage.html?searchStr=" + searchStr;
					var urlName = "./AsearchResultsPage.html?searchStr=" + searchStr;
					localStorage.setItem("locaHref", urlName);
				} else {
					location.href = "./login.html?stockCode=" + code + "&stockName=" + name;
				}
			}
		}
	});
    $(".his-search").css("width", $("#topSearch").width());
    //点击其他的地方隐藏下拉框
    $(document).on("click", function (e) {
        //alert(0)
        var e = e || window.event;
        var elem = e.target || e.srcElement;
        var target = $(".top-search");
        while (elem!=null && elem.tagName !== "DIV" && elem.className !== "top-search")
            elem = elem.parentElement;
        if (elem == target[0]) {
            //return
        } else {
            $(".his-search").hide();
        }
        e.stopPropagation();
        e.cancelBubble = true;
    });

    //点击历史搜索清空的时候
    $(".his-search").delegate(".clear-icon", "click", function () {
        UTIL.axs(UTIL.CONFIG.delHisByIds, null, true, function (data) {

        });
        $(".his-search").hide();
    })
    //	$("#topSearch").on("keydown",function(e){
    //		if(e.keyCode==13){
    ////			alert(0)
    //			var searchStr=$("#topSearch").val();
    //			if ($("#topSearch").val() != "") {
    //				var searchStr=$("#topSearch").val()
    //				if (userId != null && userId != "" && userId != "undefined") {
    //					var val=$();
    //					location.href = "./searchResultsPage.html?searchStr="+searchStr;
    //					var urlName = "./searchResultsPage.html?searchStr="+searchStr;
    //					localStorage.setItem("locaHref", urlName);
    //				} else {
    //					location.href = "./login.html?searchStr="+searchStr;
    //				}
    //			}
    //		}
    //	});
    //点击搜索框后面的放大镜
    $(".sy-fdj").on("click", function () {
        var values = $("#topSearch").val();
        //console.log(values)
        if (values != "" && values != null && values != undefined) {
            if (userId != null && userId != "" && userId != "undefined") {
                //					location.href = "./cover.html?stockCode=" + code + "&stockName=" + name;
                //					var urlName = "./cover.html?stockCode=" + code + "&stockName=" + name;
                location.href = "searchResultsPage.html?searchStr=" + values;
                var urlName = "./searchResultsPage.html?searchStr=" + values;
                localStorage.setItem("locaHref", urlName);
            } else {
                location.href = "./login.html?searchStr=" + values;
            }
        }

    })
    //点击历史搜索跳转
    $(".his-search").on("click", "li", function () {
        if ($(this).find("span").eq(0).text() != "历史搜索") {
            var searchStr = $(this).find("span").eq(0).text();
            if (userId != null && userId != "" && userId != "undefined") {
				if(window.location.href.indexOf('')>-1){
					location.href = "AsearchResultsPage.html?searchStr=" + searchStr;
					var urlName = "./AsearchResultsPage.html?searchStr=" + searchStr;
					localStorage.setItem("locaHref", urlName);
				}else{
					location.href = "searchResultsPage.html?searchStr=" + searchStr;
					var urlName = "./searchResultsPage.html?searchStr=" + searchStr;
					localStorage.setItem("locaHref", urlName);
				}
                
            } else {
                location.href = "./login.html?searchStr=" + searchStr;
            }
        }
    });

	$(".marsk").on("click",function(){
		$(this).hide();
		$("#payment-page").hide();	
	})
    
    //点击支付成功的删除符号
	$(".pay-top em").on("click",function(){
		$("#pay-sucess").hide();
		$(".marsk").hide();
	})
	$(".zf-shure").on("click",function(){
		$(".pay-top em").click();
		$(".marsk").hide();
		location.reload();
	})
    	//点击支付页面的右上角的关闭按钮关闭支付弹窗
	$(".top-name em").on("click",function(){
		$("#payment-page").hide();
		$(".marsk").hide();
	})

})

//历史搜索
function findSearchHis() {
    var param = { pageNum: 1, pageSize: 5 };
    UTIL.axs(UTIL.CONFIG.findSearchHis, param, true, function (data) {
        //console.log(data)
        if (data.retCode == "0000") {
            var result = data.retData;
            if (data.retData != "" && data.retData != null && data.retData != undefined) {
                $(".his-search").show();
                $(".his-search").html("");
                var div = '';
                div += '<li><span>历史搜索</span><b class="clear-icon"></b></li>';
                $(result).each(function (index, item) {
                    div += '<li><span>' + item.searchStr + '</span></li>';
                })
                $(".his-search").html(div);
            } else {
                $(".his-search").hide();
            }
        }
    })
}

function AfindSearchHis(){
	//$(".his-search").show();
	var param={pageNum:1,pageSize:5};
	UTIL.axs(UTIL.CONFIG.AfindSearchHis,param,true,function(data){
		console.log(data)
		if(data.retCode=="0000"){
			var result=data.retData;
			if(result=="" || result==null || result==undefined){
				$(".his-search").hide();
			}else{
				if(data.retData!="" && data.retData!=null &&　data.retData!=undefined){
					$(".his-search").show();
					$(".his-search").html("");
					var div='';
					div+='<li><span>历史搜索</span><b class="clear-icon"></b></li>';
					$(result).each(function(index,item){
						div+='<li><span>'+ item.searchStr +'</span></li>';
					})
					$(".his-search").html(div);
				}		
			}		
		}
	})
}

//是否是付费的用户
function payOrNot(){
	var selectTime=selectTime;
	var params={stockCode:stockCodeParam,}
	var result;
	UTIL.axs(UTIL.CONFIG.findIsPay,params,false,function(data){
		if(data.retCode=="0000"){
			result=data.retData;
			//console.log(result)
			localStorage.setItem("payFor",result);
			//if(result!="" && result!=null && result!=undefined){
			if(result==true){//已经付费的
				$(".pay-for").hide();
				$(".free-read").html("打开阅读");
			}else if(result==false){//未付费的

			}
		}
		
	})
	return result;
}
//个人中心的我的订单
function MyOrder(){
	$("#orMyOrder").on("click",function(){
		$("#myOrder").show();
		$(".user-title").hide();
	})
}
//点击深度阅读，然后进行付费dingdan
function deepLook(){
	$("body").on("click",".noPay",function(){
		guidePayFor();
	})
}

//引导用户去付费先查询用户是否登录了，然后判断是否付费，然后进行显示内容
function guidePayFor(){
	if (userId != null && userId != "" && userId != "undefined") {
//	  payOrNot();
	  if(payOrNot()){
	  	return;
	  }else{
	  	$("#payment-page").show();
	  	tiJiaoDingDan();
	  }
	} else {
	    location.href = "./login.html?stockCode=" + stockCodeParam + "&stockName=" + stockNameParam;
	}
}
//点击提交订单
function tiJiaoDingDan(){
	//点击支付页面的提交订单关闭支付页面、
	$(".dingdan").on("click",function(){
		if($(".data-select .checkbox-label").hasClass("on")){
			if (userId != null && userId != "" && userId != "undefined") {
				if(payOrNot()){
				  	return;
				}else{
				  //已选择服务协议了   然后进入订单详情页
					$("#payment-page").hide();
					doOrder();	
				}
			} else {
			    location.href = "./login.html?stockCode=" + stockCodeParam + "&stockName=" + stockNameParam;
			}
		}else{
			//提示用户要选择用户服务协议
			
		}	
	})
}

////创建订单信息并支付
var clearIntervalFuc;
var orderId;
function doOrder(){
	var params={orderName:stockNameParam,productId:stockCodeParam};
	UTIL.axs(UTIL.CONFIG.doOrder,params,false,function(data){
		//console.log(data);
		orderId=data.orderId;
		$("#zf-ewm").show();
		$("#code").html("");
		$("#code").qrcode(data.qrCode);//生成二维码
		//主动查询客户是否支付成功
		var start=new Date().getTime();
		clearIntervalFuc=self.setInterval("checkOrder()",1000);
	})
}

//支付完成主动查询订单信息是否支付成功
function checkOrder(){
	var dingdnhao=orderId;
	var params={orderId:dingdnhao}
	UTIL.axs(UTIL.CONFIG.checkOrder,params,false,function(data){
		//console.log(data)
		if(data==true){
			$("#zf-ewm").hide();
			window.clearInterval(clearIntervalFuc);

			findPayParams(params);
		}
	});
}

//支付成功之后显示支付成功的页面
function findPayParams(orderId){
	$("#pay-sucess").show();
	var datas=orderId;
	UTIL.axs(UTIL.CONFIG.findOrderInfo,datas,false,function(data){
		//console.log(data);
		if(data.retCode=="0000"){
			if(data.retData!="" &&　data.retData!=null && data.retData!=undefined){
				var result=data.retData;
				$(".ddxx").html("订单号："+result[0].orderId);
				var payMoney=((result[0].payMoney)/100).toFixed(2);
				$(".zfje").html("￥"+payMoney);
			}
		}
	})
}
//点击支付成功之后的确定按钮
function suceessPay(){
	$(".zf-shure").on("click",function(){
		$(".pay-top em").click();
		$(".marsk").hide();
		$("#code").html("");
		location.reload();
	})
}


//新三板自动补全
function findCodeName(request, response, type) {
    $(".his-search").hide();
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


//A股自动补全
function AfindCodeName(request, response, type) {
    $(".his-search").hide();
    if (type == null || type == "" || type == "undefined") {
        type = null;
    } else {
        type = type;
    }
    $.ajax({
        url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.AfindStock,
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
                        label: item.stockName + "(" + item.stockCode + ")",
                        value: item.stockName + "(" + item.stockCode + ")",
                        name: item.stockName,
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

// 个人中心头部
// function userHead() {
//     var userHead = '<div class="cotainer">';
//     userHead += '<div class="col-lg6 col-md-6 col-sm-6 userHead-logo"><img src="/saasBeta/yanbao/images/logo.png"></div>';
//     userHead += '</div>';
//     $(".userHead").append(userHead)
// }
function sendcode() {
    var time = 120;
    var checkCode = $(".check-code");
    function countDown() {
        checkCode.attr("disabled", true).val("剩余(" + time + "s)");
        if (time == 0) {
            checkCode.val("获取验证码").removeAttr("disabled");
            clearInterval(countdown);
        }
        time--;
    }
    var countdown = setInterval(countDown, 1000);
}
//未登录/注册页面头部
function sethead() {

    return "<div class=\"infor-name\"><div style=\"float:right; text-align:left;\"><div class=\"userPhoto\" style=\"position:relative;width:30px;height:30px;border-radius: 20px;\"><img id=\"header\" src=\"images/userPhoto.png\"><div class=\"user-Menu\"><ul><li><a id=\"uc\">个人中心</a></li><li><a class=\"exit\">退出</a></li></ul></div></div></div><div style=\"float:right; height:30px;line-height:30px; text-align:left; margin-right:10px\"><a id=\"re\" href=\"reg.html\">注册 | </a><a id=\"lo\" href=\"login.html\" style=\"text-decoration:none;\"><e id=\"username\" style=\"white-space:nowrap\">登录</e></a></div></div>"
};
function userPhoto() {
    $(".userPhoto").on("mouseover mouseout", function (event) {
        if ($("#re").is(":hidden")) {
            if (event.type == "mouseover") {
                $(".user-Menu").show()
            } else if (event.type == "mouseout") {
                $(".user-Menu").hide()
            }
        }
    })
};
function exit() {
    $(".exit").on("click", function (event) {
        UTIL.axs(UTIL.CONFIG.wwwhost + UTIL.CONFIG.cancelLogin, {}, true, function (_data) {
            if (_data.retCode === "0000") {
                // localStorage.clear();
                // location.href = "login.html";

                $("#header").attr("src", "images/userPhoto.png");
                $("#lo").attr("href", "login.html");
                $("#re").css("display", "inline");
                $("#username").text("登录");
                $(".user-Menu").hide()
                var localStoragePhone = localStorage.getItem('phone');
                var localStoragePassword = localStorage.getItem(localStoragePhone);
                localStorage.clear();
                localStorage.setItem('phone', localStoragePhone);
                localStorage.setItem(localStoragePhone, localStoragePassword);
                if (location.href.indexOf("index.html") <= -1) {
                    location.href = 'index.html';
                }
            }
        })

    })
}
// $("#userout").on("tap", function () {




// })
//logo返回首页
function logourl() {
    return "<a href=\"index.html\"><img src=\"images/newLogo.png\"></a>";
}
//获取用户登录数据
function getuserinfo() {
    // UTIL.isLogin(function(){
    // 添加控制userId为空的时候跳转首页
    if (!localStorage["userId"] || localStorage["userId"] == "null") {
        //		$("#username").text("sasadas");
        //需要登录的页面--用户中心，修改密码，首页
        var needLoginHtml = ["userCenter.html", "index.html", "userChangePW.html",
            "userAccount.html", "userAgreement.html",
            "userFocus.html", "perfectUserInfo.html"];
        var thisHref = location.href;
        var lastIndex = thisHref.lastIndexOf("/");
        var htmlIndex = thisHref.lastIndexOf(".html");
        thisHref = thisHref.substring(lastIndex + 1, htmlIndex + 5)
        //console.log(thisHref);
        if (location.href.indexOf("index.html") <= -1 && $.inArray(thisHref, needLoginHtml) > -1) {
            location.href = "index.html";
        }
        sethead();
        return false;
    }
    UTIL.isLogin("1", function () {
        if (localStorage["headImg"] && localStorage["headImg"] !== "null") {
            $("#uc").attr("href", "userCenter.html");
            $("#header").attr("src", localStorage["headImg"]);
            // $("#username").css("display", "none");
            $("#lo").attr("href", "userCenter.html");
            $("#re").css("display", "none");
            userPhoto();
            exit();

        }

        if (localStorage["userName"] && localStorage["userName"] !== "null") {
            $("#uc").attr("href", "userCenter.html");
            $("#username").text(localStorage["userName"]);
            // $("#lo").css("display", "none");
            $("#lo").attr("href", "userCenter.html");
            $("#re").css("display", "none");
            userPhoto();
            exit();
        }
        else if (localStorage["phone"]) {
            $("#uc").attr("href", "userCenter.html");
            $("#username").text(localStorage["phone"]);
            // $("#lo").css("display", "none");
            $("#lo").attr("href", "userCenter.html");
            $("#re").css("display", "none");
            userPhoto();
            exit();
        }
    })

    // })



}
//用户中心
function userinfo() {
    if (localStorage["headImg"] && localStorage["headImg"] !== "null") {
        $("#headimg").attr("src", localStorage["headImg"]);
    }
    if (localStorage["userName"] && localStorage["userName"] !== "null") {
        $(".userCenter-name").text(localStorage["userName"]);
    }
    else if (localStorage["phone"] && localStorage["phone"] !== "null") {
        $(".userCenter-name").text(localStorage["phone"]);
    }
}
function uploadPhoto(_callback, id) {
    var $_file = document.getElementById("files");
    // var img_box = document.getElementById("img_box");
    $_file.addEventListener('change', function () {
        var file = $_file.files[0];

        //获取图片元信息 2017.9.6 nieshi
        var orientation;
        EXIF.getData(file, function () {
            orientation = EXIF.getTag(this, 'Orientation');
        });


        var readerFile = new FileReader();
        // var Max_Width = 128, Max_Height = 128;

        readerFile.onload = function (ev) {
            var data = ev.target.result;
            // var img = img_box.children[0];
            // img.setAttribute("src", data);
            //UTIL.ys(data);
            var image = new Image();
            image.onload = function () {
                // var width = image.width;
                // var height = image.height;
                // isAllow = width >= Max_Width && height >= Max_Height;
                //alert(orientation);
                var a = UTIL.ys(image, id, orientation);
                // if (!a) {
                //     _callback(data);                  
                // }
                // else {
                //     _callback(a);
                //     data = a;

                // }
                _callback(a);
                // 
            };
            image.src = data;

        }
        readerFile.readAsDataURL(file);
    });
};


/**
 * 判断字符串是否为空
 * @param str
 * @returns
 */
function isStrKong(str) {
    return ((str == null || str == "" || str == "null" || str == undefined) ? "--" : str);
}

/**
 * 判断数字是否为空
 * @param str
 * @returns
 */
function isSZKong(sz) {
    return ((sz == null || sz == undefined || (sz == "" && sz != 0)) ? "-" : sz);
}
function substrch(ch, len) {
    if (ch.length > len)
        return {
            is: true,
            str: ch.substr(0, len)
        };
    else return {
        is: false
    };
}

//对Date的扩展，将 Date 转化为指定格式的String   
//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
//例子：   
//(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18  
Date.prototype.Format = function (fmt) { //author: meizz   
    var o = {
        "M+": this.getMonth() + 1,                 //月份   
        "d+": this.getDate(),                    //日   
        "h+": this.getHours(),                   //小时   
        "m+": this.getMinutes(),                 //分   
        "s+": this.getSeconds(),                 //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
//---------扩展表单校验规则

if (jQuery.validator) {
    jQuery.validator.addMethod("mobile", function (value, element) {
        var tel = /^1[3|4|5|7|8]{1}[\d]{9}$/;
        return this.optional(element) || (tel.test(value));
    }, "请正确填写您的手机号");
    jQuery.validator.addMethod("password", function (value, element) {
        // var tel = /^[a-zA-Z0-9~!@#$%^&*()_+\-={}:;<>?,.\/]{6,12}$/;
        var tel = /^[a-zA-Z0-9~!@#$%^&*()_+\-={}:;<>?,.\/]{6,12}$/;
        return this.optional(element) || (tel.test(value));
    }, "您输入的密码格式不正确");
    jQuery.validator.addMethod("notEqualTo", function (value, element, param) {
        return this.optional(element) || (value != $(param).val());
    }, "新密码不能与原密码一致!");
    $.validator.addMethod("right", function (value, element, params) {
        // if (value.length > 1) {
        // 	return false;
        // }
        // if (value >= params[0] && value <= params[1]) {
        // 	return true;
        // } else {
        // 	return false;
        // }
        var tel = /^[a-zA-Z0-9~!@#$%^&*()_+\-={}:;<>?,.\/]{6,12}$/;
        if (tel.test(value)) {
            return true;
        }
    }, "您输入的密码格式不正确");
}


/**
 * 弹出框、确认框
 */
(function ($) {
    $.extend({
        "zmAlert": function (con, time, urls) { //三个参数 内容、时间、跳转地址（如果有的话）
            if ($(".zmAlert").size() == 0) {
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
                    function () {
                        box.fadeOut();
                        bg.fadeOut();
                    });
                bg.unbind("click");
                bg.bind("click",
                    function () {
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
        "zmConfirm": function (val, titleText, f1, f2) { //内容、标题、确认回调、取消回调
            if ($(".zmConfirm").size() == 0) {
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
                bg.on("click", function () {
                    box.fadeOut();
                    bg.fadeOut();
                });
                close.on("click", function () {
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
            if (typeof (f1) == "function") {
                $(".zcBottom .zcBtn").eq(0).on("click",
                    function () {
                        $(".zmConfirm").fadeOut();
                        $(".zmBg").fadeOut();
                        f1();
                    });
            }

            $(".zcBottom .zcBtn").eq(1).on("click",
                function () {
                    if (f2 != false && typeof (f2) == "function") {
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
        return function () {
            showAlert(urls);
            $(".zmAlert").fadeOut();
            $(".zmBg").fadeOut();
            if (urls != undefined && urls != "") {
                window.location.href = urls;
            }

        }
    };
  
})(window.jQuery); 
  
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