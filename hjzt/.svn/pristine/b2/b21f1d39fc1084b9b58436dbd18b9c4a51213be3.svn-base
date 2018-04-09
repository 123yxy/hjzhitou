$(document).ready(function() {
	//筛选条件 更多收起切换	
	$(".ner_r a").on("click", function(e) {
		var i = '<i></i>';
		if($(this).hasClass("more_ngd")) {
			$(this).removeClass("more_ngd").addClass("more_nsq").text("收起").append(i);
			$(this).parents(".ner_shai_list").addClass("on").siblings().removeClass("on");
			$(this).parents(".ner_shai_list").siblings().find(".more_nsq").removeClass("more_nsq").addClass("more_ngd").text("更多").append(i);
			$(this).parents(".ner_shai_list").siblings().find(".ner_info").removeClass("ner_more");
			$(this).parent().siblings(".ner_c").find(".ner_info").addClass("ner_more");
			$('.ner_info').scrollTop(0);
		} else if($(this).hasClass("more_nsq")) {
			$('.ner_info').scrollTop(0);
			$(this).removeClass("more_nsq").addClass("more_ngd").text("更多").append(i);
			$(this).parents(".ner_shai_list").removeClass("on");
			$(this).parent().siblings(".ner_c").find(".ner_info").removeClass("ner_more");
			e.stopPropagation();
		}
	});
	//筛选条件点击效果
	$(".ner_info a").on("click", function() {
		$(this).addClass("on").siblings().removeClass("on");
		$(this).parent().siblings(".ner_all").find("a").removeClass("on");
	});
	//筛选条件点击全部效果
	$(".ner_all a").on("click", function() {
		$(this).addClass("on");
		$(this).parent().siblings(".ner_info").find("a").removeClass("on");
		$()
	});
	//行业选择
	$(".show_hy").on("click",function(){
		if($(".hy_tc").is(":hidden")){
			$(".hy_tc").slideDown();
		}else{
			$(".hy_tc").slideUp();
		}
	})
	$(".hy_tc li").on("click",function(){
		var selectVal=$(this).find("a").text();
		$(this).parents(".hy_tc").hide();
		$(this).parents(".company_hy").find("span").eq(0).find("em").text(selectVal);
	})
	
	//点击显示更多筛选的时候显示更多的筛选条件
	$(".more_select span").on("click", function() {
			if($(this).find("em").eq(0).text() == "显示更多筛选") {
				$(".show_select").show();
				$(this).find("em").eq(0).text("收起筛选");
				$(this).find("i").addClass("on");
			} else {
				$(".show_select").hide();
				$(this).find("em").eq(0).text("显示更多筛选");
				$(this).find("i").removeClass("on");
			}
	})
	
});