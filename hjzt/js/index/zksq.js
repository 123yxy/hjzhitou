//2017-07-16定增页面筛选条件展开收缩
$(document).ready(function(){
	$(".sq_bbtn span").on("click",function(){
		if($(this).hasClass("on")){
			$(this).removeClass("on").html("更多筛选");
			$(".sqzk_qp").hide();
		}else{
			$(this).addClass("on").html("收起");
			$(".sqzk_qp").show();
		}
	});
});
