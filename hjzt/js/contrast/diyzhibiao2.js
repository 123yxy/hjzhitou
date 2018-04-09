$(document).ready(function(){
	$(".diy_zb_tc").hide();
	$(".jiabeijing").hide();
//	指标多选框
		$(".diy_zb_list ul li .data-checkbox label").on("click",function(e) {
			if($(this).hasClass("on")){
				$(this).removeClass("on");
				$(this).siblings("label").removeClass("on");
				$(this).parent().parent("li").removeClass("on");
			}else{
				$(this).addClass("on");
				$(this).siblings("label").addClass("on");
				$(this).parent().parent("li").addClass("on");
//			$(this).parent().parent().siblings("li").removeClass("on");
//		$(this).parent().parent().siblings("li").find("label").removeClass("on");	
			}
		
	});
	
	
//	$(".diy_zb_list ul li .data-checkbox label").on("click", function(e) {
//		if ($(this).hasClass("on")) {
//			$(this).removeClass("on");
//		} else {
//			$(this).addClass("on");
//		}
//
//		e.stopPropagation();
//	});

//关闭自定义指标弹窗
$("#diy_colse,.diy_false").on("click",function(){
	$(".diy_zb_tc").hide();
	$(".jiabeijing").hide();
	$("body,html").css("overflow","auto");
});
$(".jiabeijing").click(function(){
	$(".diy_zb_tc").hide();
	$(".jiabeijing").hide();
});
//确定按钮
$(".diy_true").on("click",function(){
//	var thisText=$(".diy_yx_box").find("a").eq(0).attr("title");
	var text = $(".diy_yx_box").find("a").eq(0).attr("title");
	var column=$(".diy_yx_box").find("a").eq(0).attr("data-keyId");
	$("#tagValue").find("em").eq(0).html(text);
	$("#tagValue").find("em").eq(0).attr("data-value",column);
	//重新查询数据
	changeParam();
	$(".diy_zb_tc").hide();
	$(".jiabeijing").hide();
	$("body,html").css("overflow","auto");
});
});
