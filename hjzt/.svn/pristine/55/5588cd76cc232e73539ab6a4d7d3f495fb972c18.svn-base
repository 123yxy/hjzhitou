$(function () {
	//添加未注册/登录头 获取用户登录信息
	// $(".userHead-out").html(sethead());
	// $("#uc").css("margin-right","10px");
	$(".indexTop-user").html(sethead());

	//logo链接
	$(".userHead-logo").html(logourl());
	getuserinfo();
	//切换
	$(".name-list span").on("click", function () {
		$(this).addClass("on").parent().siblings().find("span").removeClass("on");
		if ($(this).parent().hasClass("produce")) {
			$(".produce-content").show();
			$(".method-content").hide();
		} else {
			$(".produce-content").hide();
			$(".method-content").show();
		}
	})


	$(".infor-name").on("click", function () {
		window.location.href = "userCenter.html";
	})
	var tab = location.hash;
	if (tab === "#use") {
		$(".name-list span").eq(1).addClass("on")
		$(".name-list span").eq(0).removeClass("on");
		$(".method-content").show();
		$(".produce-content").hide();
	}

	//	userHead();
})
function userHead() {
	var userHead = '<div class="cotainer">' +
		'<div class="col-lg6 col-md-6 col-sm-6 userHead-logo"><img src="/saasBeta/yanbao/images/logo.png"></div>' +
		'<div class="col-lg6 col-md-6 col-sm-6 userHead-out">' +
		'<div class="infor-name">' +
		'<em>' +
		'<img src="" alt="" />' +
		'</em>' +
		'<span>王宝强</span>' +
		'</div>' +
		'</div>' +
		'</div>';

	$(".qxheader").append(userHead)
}