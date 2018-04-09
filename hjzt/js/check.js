// JavaScript Document
$(function() {
	// 模拟所有的单选框、多选框    
	$(".data-radio label").on(
		"click",
		function(e) {
			$(this).parent().find(".radio").addClass("on");
			$(this).parent().find(".radio").next(".radioWord").css("color",
				"#2fa6dc")
			if ($(this).parent().siblings("div").hasClass("data-radio")) {
				$(this).parent().siblings(".data-radio").find(".radio")
					.removeClass("on");
				$(this).parent().siblings(".data-radio").find(".radio")
					.next(".radioWord").css("color", "");
					//确定与未确定
				if($(this).text()=="确定" || $(this).next().text()=="确定"){
					$(this).parent().siblings(".startimeToEnd").show();
					e.stopPropagation();
				}else{
					$(this).parent().siblings(".startimeToEnd").hide();
				}
			} else {
				$(this).parent().parent().siblings().find(".radio")
					.removeClass("on");
			}
			// changeParam();
		});
	$(".data-checkbox label").on("click", function(e) {
		if ($(this).hasClass("on")) {
			$(this).removeClass("on");
			$(this).next(".checkboxWord").css("color", "")
		} else {
			$(this).addClass("on");
			$(this).next(".checkboxWord").css("color", "#2fa6dc");
		}

		e.stopPropagation();
	});
	$(".data-checkbox .checkboxWord").delegate("label","click", function(e) {
		if ($(this).siblings(".checkbox").hasClass("on")) {
			$(this).siblings(".checkbox").removeClass("on");
			$(this).css("color", "")
		} else {
			$(this).siblings(".checkbox").addClass("on");
			$(this).css("color", "#2fa6dc");
		}

		e.stopPropagation();
	});


});
/**地区选择**/
$(document).ready(function(e) {
$("#city").click(function(){
	$(".tmtc_new").show();
	$("#qy_box").show();
	
});
/**行业选择**/

$("#hy").click(function(){
	$("#qy_box").hide();
    $(".tmtc_new").show();
	$("#hy_box").show();

});
	$(".qy_box ul li a").on("click",function(e){
		var tex=$(this).text();
		$(this).parent().parent().parent().siblings("input").attr("value",tex);
		$("#qy_box").hide();
		$("#hy_box").hide();
		$(".tmtc_new").hide();
		e.stopPropagation();
	});	
	////全选
	$("#selectAll").change(function() { 
	var innum = $(".choo").length;
	 if ($(this).prop("checked"))
	  { 
		$(".choo").prop("checked", true); 
		} else {
			 $(".choo").prop("checked", false);
	} });
//行业点击公司名称切换
	$(".hy_title").on("click",function(){
		$(this).parents(".new_increa_table").hide();
		$(".hy_table2").show();
	});
//更多指标
$(".mr_btn").on("click",function(){
	$(this).parent().parent().parent().addClass("mor_zb");
	$(".morezb_box").show();
	$(".tmtc_new").show();
	$(".r_box_list p a").on("click",function(){
		var tex=$(this).text();
		var type=$(this).attr("data-type");
		var value=$(this).attr("data-value");
		$(this).parents(".morezb_box").siblings().find("#regisTime").html(tex);
		$(this).parents(".morezb_box").siblings().find("#regisTime").attr("data-type",type);
		$(this).parents(".morezb_box").siblings().find("#regisTime").attr("data-value",value);
		$(this).parents(".morezb_box").hide();
		$(this).parents(".select_list").removeClass("mor_zb");
	
	});
});
//高管团队以及发行分配点击弹层
$(".ggtd_n_table table td a").on("click",function(){
	$(this).parents("table").siblings(".faxfp").show();
	$(this).parents("table").siblings(".faxfp_close").css("display","block");
	
	});
//关闭弹层
$(".faxfp_close").on("click",function(){
	$(this).parent().hide();
	//$(this).parent().next(".faxfp").hide();
});
$(".faxfp_close2").on("click",function(){
//	$(this).parent().hide();
	$(this).hide();
	$(this).next(".faxfp").hide();
});
	
//公司公告页面标题检索与时间检索切换
$(".classnotice_r a").on("click",function(){
	$(".notic_time_xz").show();
	$(".notice_select,.notice_tab").hide();
	});
	$(".classnotime_r a").on("click",function(){
	$(".notic_time_xz").hide();
	$(".notice_select,.notice_tab").show();
	
	});
//数据分析添加
$("#add_Ri").on("click",function(){
	$(".add_tc_box").show();
	$(".tcbackground").show();
	});
//$("#gb_Ri").on("click",function(){
//	$(".add_tc_box").hide();
//	$(".tcbackground").hide();
//	});
//财务数据对比弹层
$(".top_btn button,.contrast_left span").on("click",function(){
	var wi=$('.boar_r').width();
	var wi2=$('.m_10_box').width();
	if(wi==null){
	$(".contrast").css("width",wi2);	
	}else{
	$(".contrast").css("width",wi);
	}



$(".contrast_right").show();
	$(".contrast_right").removeClass("bounceOutLeft");
	$(".contrast_right").addClass("bounceInLeft");
	$(".contrast_right span").show();
	$(".contra_yc").show();
});
$(".contra_yc span").on("click",function(){
	$(".contrast_right").removeClass("bounceInLeft");
	$(".contrast_right span").hide();
	$(".contrast_right").hide();
	$(".contra_yc").hide();
	$(".contrast").css("width","");
});
//数据分析自定义标签
$(".cxxz_zb a").on("click",function(){
	$("#showIndicators").show();
	$(".morezb_box").show();
});
$(".more_analysis .morezb_box a").on("click",function(){
	var text = $(this).text();
	$("#diy_bq").html(text);
$(".more_analysis .morezb_box").hide();
	});
//$(".hy_rank_tab ul li").on("click",function(){
//	$(this).addClass("on").siblings().removeClass("on");
//	$(this).siblings().prev().find("em").css("color","#fff");
//	});
//点击其他地方关闭弹层
$(".tmtc_new").on("click",function(){
	$("#qy_box").hide();
	$("#hy_box").hide();
	$(".chaktx").hide();
	$(".morezb_box").hide();
	$("#searchNum").parent().next().hide();
	$(".new_sxgd_info").removeClass("hover");
	$(".morezb_box").parent().parent().removeClass("mor_zb");
	$(this).hide();
	$("html,body").css("overflow","auto");
});
//已保存筛选
$(".new_sxgd_info p").live("click",function(){
	var win_width = document.body.offsetWidth;
	var div_width = $(this).offset().left;
	var sy_width = win_width - div_width;
	if(sy_width<385){
		$(".new_sxgd_info ul").css({"left":"-245px","top":"35px"});
	}else{
		$(".new_sxgd_info ul").css({"left":"0","top":"30px"});
	}
	if($(this).parent().attr("class").split(" ")[1] != "am_dashed"){
		if($(this).parent().find("ul").is(":hidden")){
			$(".tmtc_new").show();
			$(this).parent().addClass("hover");
			$(this).parent().find("ul").show();
		}else{
			$(this).parent().removeClass("hover");
			$(".tmtc_new").hide();
			$(this).parent().find("ul").hide();
		}
	}
});
});


