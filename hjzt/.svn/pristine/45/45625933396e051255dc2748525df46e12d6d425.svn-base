$(function(){
	
	/**
	 * 提交反馈
	 */
	$(".yun_btn").click(function(){
		if($.trim($("#content").val()) != ""){
			addProblemBack();
		}else{
			$.zmAlert("请填写意见！");
		}
	})
})

/**
 * 显示可输入字数
 */
function textNumber(){
	//目前没有这个功能
//	var problem = $.trim($("#content").val()).length;
//	$("#contentNum").text(300-Number(problem));
}

/**
 * 提交反馈
 */
function addProblemBack(){
	$.axs("/user/problemBack/addProblemBack.do",{"content":$("#content").val()},false,function(data){
		if(data.retCode=="0000"){
			$("#content").val("");
			$.zmAlert("提交成功！");
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}