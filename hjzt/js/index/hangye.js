$(document).ready(function(){
	//选择行业弹窗
	$(".selectBox2 p").on("click",function(){
			$(".qy_box").slideDown();
			$(".jiabeijing").show();
		});
	//	关闭行业弹窗
	$(".jiabeijing").click(function(){
		$(".jiabeijing").hide();
		$(".qy_box").slideUp();
		$(".new_sxgd_info ul").slideUp();
		$(".morezb_box").hide();
	});
	//选择行业
	$(".qy_box ul li a").click(function(){
		var tx=$(this).text();
		if(tx.indexOf("...") > -1){
			tx = $(this).attr("title");
		}
		$(".selectBox2 p").html(tx);
		$(".qy_box").slideUp();
		$(".jiabeijing").hide();
	});
	
	//已保存筛选
	$(".new_sxgd_info p").on("click",function(){
	//	var win_width = document.body.offsetWidth;
	//	var div_width = $(this).offset().left;
	//	var sy_width = win_width - div_width;
	//	if(sy_width<385){
	//		$(".new_sxgd_info ul").css({"right":"-245px","top":"45px"});
	//	}else{
	//		$(".new_sxgd_info ul").css({"right":"0","top":"40px"});
	//	}
		if($(this).parent().attr("class").indexOf("am_dashed")==-1){
			if($(this).parent().find("ul").is(":hidden")){
				$(".jiabeijing").show();
				$(this).parent().addClass("hover");
				$(this).parent().find("ul").slideDown();
			}else{
				$(this).parent().removeClass("hover");
				$(".jiabeijing").hide();
				$(this).parent().find("ul").slideUp();
			}
		}
	});
});
