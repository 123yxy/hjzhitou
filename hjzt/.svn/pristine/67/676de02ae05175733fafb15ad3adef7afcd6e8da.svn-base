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
	var l=$("#tagName").find("a").length;
	$("#tagName").find("a").eq(l-2).remove();
	$(".diy_zb_tc").hide();
	$(".jiabeijing").hide();
	$("body,html").css("overflow","auto");
});
$(".jiabeijing").click(function(){
	$(".diy_zb_tc").hide();
	$(".jiabeijing").hide();
	var l=$("#tagName").find("a").length;
	$("#tagName").find("a").eq(l-2).remove();
});
//确定按钮
$(".diy_true").on("click",function(){
	var htm="<p>";
	
	var indicatorsList="";
	$(".diy_yx_box").find("a").each(function(index,item){
		var titleName=$(item).attr("title");
		var keyId=$(item).attr("data-keyId");
//		notExist=($(item).attr("title")==thisText?false:true)
//		return notExist;
//		<p><i data-table='bt_finance_hierarchy_data' data-value='37c95b86cc57498c8450779e6bbc4519'>处置固定资产与无形资产和其他长期资产收回的现金净额</i><i data-table='bt_finance_table' data-value='chanquanbilv_zidingyidecaiwuzhibiao'>产权比率（%）</i></p>
		htm+="<i data-table='bt_finance_hierarchy_data' data-value='"+keyId+"'>"+titleName+"</i>";
		if(keyId.indexOf("_")>-1){
			indicatorsList+="bt_finance_table"+"-"+keyId+","
		}else{
			indicatorsList+="bt_finance_hierarchy_data"+"-"+keyId+","
		}
	});
	htm+="</p>";
	var length=$("#tagName").find("a").length;
	var aObj=$("#tagName").find("a").eq(length-2);
	$("#tagValue").html(htm);
	$(aObj).attr("data-html",htm);
	var tagName=aObj.text();
	if(indicatorsList==""){
		errorAlert("","请选择指标");
		return false;
	}
	//重新查询数据
	changeParam();
	$(".diy_zb_tc").hide();
	$(".jiabeijing").hide();
	$("body,html").css("overflow","auto");
//	tagName=tagName.substring(0,tagName.length-1);
	//添加指标
	addOrEditIndicatorsTags(null,tagName,indicatorsList,aObj);
});
});
