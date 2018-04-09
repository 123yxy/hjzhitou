$(function(){
	
	//默认隐藏
	$(".closed").hide();
	$("#changeName").hide();
	
	//鼠标放上去出现时关闭按钮
	$("#optionStock").on("mouseenter",function(){
		$(this).find("i").show();
	})
	$("#myDisk").on("mouseenter",function(){
		$(this).find("i").show();
	})
	$("#optionStock").on("mouseleave",function(){
		$(this).find("i").hide();
	})
	$("#myDisk").on("mouseleave",function(){
		$(this).find("i").hide();
	})
	//点击关闭按钮隐藏
	$("#optionStock").find("i").on("click",function(){
		$("#optionStock").hide();
	})
	$("#myDisk").find("i").on("click",function(){
		$("#myDisk").hide();
	})
	
	$(".manual").find("span").on("click",function(){
		$(this).hide();
		var text = $(this).text()
		$(this).siblings("input").show();
		$(this).siblings("input").attr("value",text);
		
	});
	//我的工作台中的我的云盘新建文件夹
	$("#newFiles").on("click",function(){
		var div="";
		div+='<div class="manualMsg">'+
				'<p class="manual">'+
				'<img src="/saasBeta/images/world.png"/>'+
				'<span>《汇金智投》帮助手册</span>'+
				'<input type="text" onblur="fouas(this)"/>'+
				'</p>'+
				'</div>';
		$(".content").append(div);
	})

//权限管理，默认模态框隐藏
$(".bgMask").hide();
$("#changeMsg").hide();
$(".authority_table tbody td a:nth-child(2)").on("click",function(){
	$(".bgMask").show();
	$("#changeMsg").show();
})
$("#changeMsg .treeMsg li>ul").hide();
$("#changeMsg em").hide();
//1级权限里没有内容时
findNext();


//点击显示
$("#changeMsg .treeMsg li i").on("click",function(){
	$(this).siblings("em").show();
	$(this).parent().children().show();
	$(this).hide();
})
////点击建号隐藏
$("#changeMsg .treeMsg li em").on("click",function(){
	$(this).hide();
	$(this).next().next().next().hide();
	$(this).siblings("i").show();
})
//点击确定跳转
$("#changeMsg .sure").on("click",function(){
	$(".bgMask").hide();
	$("#changeMsg").hide();
})

//显示我的自选股
showOptional();

});
function fouas(fthis){
	var v=$(fthis).val();
	$(fthis).siblings("span").html(v).show();
	$(fthis).hide();
}
//1级权限里没有下级权限时
function findNext(){
	
}

//显示我的自选股
function showOptional(){
	$.axs("/stock/optionalkMap/findList.do",null, true, function(data) {
		if(data.retCode == 0000) {
			var result = data.retData;
			var optionList = '';
			$.each(result, function(index, item) {
				var tr = $("<tr>");
				var td1 = $("<td>");
				var td2 = $("<td>");
				var td3 = $("<td>");
				var td4 = $("<td>");
				var td5 = $("<td>");
				var td6 = $("<td>");
				td1.html('<a href="javascript:;">'+item.stockCode+'</a>');
				td2.html('<a href="javascript:;">'+item.stockName+'</a>');
				td3.html('<a href="javascript:;">'+item.newPrice+'</a>');
				td4.html(item.changeAmount);
				td5.html(item.priceChangeRatio);
				td6.html("....");
				tr.append(td1).append(td2).append(td3).append(td4).append(td5).append(td6);
				$("#optionList").append(tr);
			});
		}
	});
}