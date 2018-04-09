
$(document).ready(function(){
	////全选
$("#selectAll").change(function() { 
	var innum = $(".choo").length;
	 if ($(this).prop("checked"))
	  { 
		$(".choo").prop("checked", true); 
	} else {
	   $(".choo").prop("checked", false);
	   
} 
check();
});
$(".choo").live("click",function(){
check();	
});
//	新建文件夹
$("#newfaile").on("click",function(){
	var newfaile = '<tr>';
		newfaile += '<td class="quanxuan"><input type="checkbox" class="choo" name="choo"/></td>';
		newfaile += '<td class="textleft"><span class="folder"><input type="text" value="新建文件夹"/></span><a href="javascript:;" onclick="queding(this)" ><img src="/saasBeta/images/duigou.png" alt="保存" /></a><a href="javascript:;" onclick="quxiao(this)"><img src="/saasBeta/images/cha.png" alt="取消" /></a></td>';
		newfaile += '<td>工程师</td>';
		newfaile += '<td>公司或组织</td>';
		newfaile += '<td>18611534526</td>';
		newfaile += '<td>992637411@qq.com</td>';
		newfaile += '<td>正常</td>';
		newfaile += '<td>2015-06-06</td>';
		newfaile += '</tr>';
		$("#new_list_box").prepend(newfaile);
});

//点击添加url或者添加子集
//$("#add_auth").on("click",function(){
//	$(".tmtc_new").show();
//	$(".auth_tc").show();
//});
//$("#qd_auth").on("click",function(){
//	$(".tmtc_new").hide();
//	$(".auth_tc").hide();
//});

});
//确认添加文件夹并命名
function queding(qthis){
	
    var inval = $(qthis).siblings().children("input").val();
	$(qthis).siblings("span").children("input").hide();
	$(qthis).siblings("span").prepend(inval);
	$(qthis).hide();
	$(qthis).nextAll().hide();
}	
//取消添加文件夹并命名
function quxiao(qthis){
	$(qthis).parents("tr").remove();
}
//单选或者多选同时显示可操作项
function check(){
var choo=document.getElementsByName("choo");
var checsize =0 ;
for(var i=0;i<choo.length;i++){
	if(choo[i].checked){
		checsize++;
	}
}if(checsize>0){
	if(checsize==1){
	 $(".cz_btn").show();
	 $("#rename").show();	
	}else{
	$(".cz_btn").show();
	$("#rename").hide();		
	}
       	
}else{
   $(".cz_btn").hide();	
   $("#rename").hide();	
}
	
}
