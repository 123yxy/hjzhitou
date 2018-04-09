$(function(){
	//点击上下游关系的tab切换
	$(".tab-list span").on("click",function(){
		if($(this).hasClass("on")){
//			$(this).removeClass("on").siblings().addClass("on");
			return false;
		}else{
			$(this).addClass("on").siblings().removeClass("on");
			if($(this).text()=="图表"){
				$(".gx-tb").show();
				$(".gx-table").hide();
			}else{
				$(".gx-tb").hide();
				$(".gx-table").show();
			}
		}
		
	})
})






