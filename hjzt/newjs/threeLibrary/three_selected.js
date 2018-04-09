$(function(){
	
	//点击全选的时候让选中所有
	$(".gs_qx").on("click",function(){
		var dxInputLen=$(".gs_dx").find('input[type="checkbox"]');
		if($(this).is(":checked")){
			$(dxInputLen).each(function(index,item){
				$(item).prop("checked",true);
			})
		}else{
			$(dxInputLen).each(function(index,item){
				$(item).prop("checked",false);
			})
		}
	})	
	//点击单选框时
	$(".gs_dx").delegate('input[type="checkbox"]',"click",function(){
		var dxInputLen=$(".gs_dx").find('input[type="checkbox"]');
		var inputLength=$(".gs_dx").find('input[type="checkbox"]').length;
		var flag=0;
		if($(this).is(":checked")){
			$(dxInputLen).each(function(index,item){
				if($(item).is(":checked")){
					flag++;
				}
			})
		}else{
			$(".gs_qx").prop("checked",false);
		}
		if(flag==inputLength){
			$(".gs_qx").prop("checked",true);
		}

	})
	//点击排序

//	$(".sanban_paixu span").on("click",function(){
//		if($(this).hasClass("up")){
//			$(this).removeClass("up");
//			$(this).addClass("down");
//		}else{
//			$(this).addClass("up");
//			$(this).removeClass("down");
//		}
//		$(this).parent().siblings().find("span").removeClass("up");
//		$(this).parent().siblings().find("span").removeClass("down");
//	})
	
	//点击假背景的是让下拉框隐藏
	$(".jiabeijing").on("click",function(){
		$(".selectBox ul").slideUp();
	})
	//融资页面的投资方薯饼经过显示框
	$(".tzf_box").on("mousemove",function(){
		$(this).find("div.tzf_box_table").show();
	})

	$(".tzf_box").on("mouseout",function(){
		$(this).find("div.tzf_box_table").hide();
	})

})
