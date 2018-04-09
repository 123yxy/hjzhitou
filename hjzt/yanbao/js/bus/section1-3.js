$(function(){
	//点击tab切换
	$(".tab-list span").on("click",function(){
		if($(this).hasClass("on")){
			return false;
		}else{
			$(this).addClass("on").siblings().removeClass("on");
			if($(this).text()=="图表"){
				$(".echarts-tb").show();
				$(".caiwu-table").hide();
			}else{
				$(".echarts-tb").hide();
				$(".caiwu-table").show();
			}
		}
	})
})
