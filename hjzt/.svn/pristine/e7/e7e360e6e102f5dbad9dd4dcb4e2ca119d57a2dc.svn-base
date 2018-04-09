// 注册头部
function logHead() {
    var logHead = '<img src="/saasBeta/yanbao/images/logo-loginReg.png" alt="">';
    $(".logHead").append(logHead)
};

// 注册尾部
function logFoot() {
    var logFoot = '<p><a href="">圣康汇金</a>  ·  <a href="">三板数据库</a>  ·  <a href="">微信服务号</a>  ·  <a href="">联系我们</a></p>';
    logFoot += '<p>service@159jh.com  ·  京ICP备11029652号</p>';
    $(".logFoot").append(logFoot)
}

// 个人中心头部
function userHead() {
    var userHead = '<div class="cotainer">';
    userHead += '<div class="col-lg6 col-md-6 col-sm-6 userHead-logo"><img src="/saasBeta/yanbao/images/logo.png"></div>';
    userHead += '</div>';
    $(".userHead").append(userHead)
}

// 发送验证码
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