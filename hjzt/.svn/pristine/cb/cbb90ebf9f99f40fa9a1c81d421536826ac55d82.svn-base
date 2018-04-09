
$(function () {
	//logo链接
	$(".userHead-logo").html(logourl());
	$(".indexTop-user").html(sethead());
	getuserinfo();
	logFoot();
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
	});
	$(".shiyongff").on("click",function(){
		window.location.href="guide.html";
		$(".method span").addClass("on");
		$(".produce span").removeClass("on");
	})
	
	
	
})
