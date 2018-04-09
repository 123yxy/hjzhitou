$(document).ready(function(){
	
//	左边导航star
	var left_nav='<div class="left_nav">'; 
		left_nav+='<div class="left_top_image">';
		left_nav+='<a href="/index.html"><img src="/saasBeta/images/logo2.png" alt="汇金智投"></a></div>';
        left_nav+='<div class="clr"></div>';
		left_nav+='<div class="left_list"><ul>';
		
		left_nav+='<li class="left_index hover" onclick="javascript:window.location.href=\'/index.html\'">';
		left_nav+='<a href="/index.html" style="">首页</a></li>';
		
		left_nav+='<li class="left_dwxg" onclick="javascript:window.location.href=\'/multidimensionalStock/multidStock.html\'">';
		left_nav+='<a href="/multidimensionalStock/multidStock.html" style="">多维选股</a></li>';
		
		left_nav+='<li class="left_yqgz" onclick="javascript:window.location.href=\'/publicSentiment/overviewOfPublic.html\'">';
		left_nav+='<a href="/publicSentiment/overviewOfPublic.html" style="">舆情跟踪</a></li>';
		
		left_nav+='<li class="left_qytp" onclick="javascript:window.location.href=\'/relationMap/businessMapIndex.html\'">';
		left_nav+='<a href="/relationMap/businessMapIndex.html" style="">企业图谱</a></li>';
		
		/*left_nav+='<li class="left_gpdb" onclick="javascript:window.location.href=\'#\'">';
		left_nav+='<a href="#" style="">股票对比</a></li>';*/
		
		/*left_nav+='<li class="left_gpph" onclick="javascript:window.location.href=\'#\'">';
		left_nav+='<a href="/static/stockRanking/stockRanking.html" style="">股票排行</a></li>';
		*/
		left_nav+='<li class="left_qydt" onclick="javascript:window.location.href=\'/enterpriseMap/companyQuotation.html\'">';
		left_nav+='<a href="/enterpriseMap/companyQuotation.html" style="">企业地图</a></li>';
	
		left_nav+='<li class="left_gjfx" onclick="javascript:window.location.href=\'/toolAnalysis/toolMentor.html\'">';
		left_nav+='<a href="/toolAnalysis/toolMentor.html" style="">工具分析</a></li>';
		
		left_nav+='<li class="left_qybg" onclick="javascript:window.location.href=\'/enterpriseReport/enterpriseReport.html\'">';
		left_nav+='<a href="/enterpriseReport/enterpriseReport.html" style="">企业报告</a></li>';
		
		/*left_nav+='<li class="left_sjk" onclick="javascript:window.location.href=\'#\'">';
		left_nav+='<a href="#" style="">数据库</a></li>';*/
		
		left_nav+='<li class="left_xmdt" onclick="javascript:window.location.href=\'/project/projectDynamics.html\'">';
		left_nav+='<a href="/project/projectDynamics.html" style="">项目动态</a></li>';
		
		left_nav+='<div class="clr"></div>';
		left_nav+='</ul>';
        left_nav+='</div>';
		left_nav+='<div class="hexagon" id="hexagon"><img src="/saasBeta/images/icon/hexa.png"/></div></div>';
		$("body").prepend(left_nav);
		urlPa()
//	左边导航end
});
//企业地图(今天  月  年)  选择下拉
$(document).ready(function(){
	$(".map_nav ul li i").on("click",function(){
		if($(this).siblings("ul").hasClass("on")){
		$(this).siblings("ul").slideUp();
		$(this).siblings("ul").removeClass("on");
		
	}else{
		$(this).siblings("ul").slideDown();
		$(this).parent().siblings().find("ul").slideUp();
		$(this).parent().siblings().find("ul").removeClass("on");
		$(this).parent().siblings().removeClass("hover");
		$(this).parent().addClass("hover");
		$(this).siblings("ul").addClass("on");
	}
	});
//行业选择 全选功能
	$("#checkAll").change(function() { 
	 if ($(this).prop("checked"))
	  { 
		$(".choo").prop("checked", true); 
		} else {
		$(".choo").prop("checked", false);
	} 
	var innum = document.getElementsByClassName("choo");
		var checsize =0 ;
		for(var i=0;i<innum.length;i++){
			if(innum[i].checked){
				checsize++;
			}
		}
		$("#che_yx").empty();
		$("#che_yx").html("(" +checsize+ ")");
	});
	$(".choo").change(function(){
		var innum = document.getElementsByClassName("choo");
		var checsize =0 ;
		for(var i=0;i<innum.length;i++){
			if(innum[i].checked){
				checsize++;
			}
		}
		$("#che_yx").empty();
		$("#che_yx").html("(" +checsize+ ")");
	});
//行业选择点击下拉
$(".r_select span").on("click",function(){
	if($(this).hasClass("i")){
		$(this).siblings(".r_industry_sele").slideUp();
		$(this).removeClass("i");
	}else{
	$(this).siblings(".r_industry_sele").slideDown();
	$(this).addClass("i");
	}
});
	
});
//侧导航高亮处理
function urlPa(){
    var urlpath = window.location.pathname;
	var lipth = urlpath.substring(1,urlpath.lastIndexOf("/"));
//	多维选股
	if(lipth=="multidimensionalStock"||lipth=="stockRanking"){
		$(".left_list ul li").removeClass("hover");
		$(".left_list ul li.left_dwxg").addClass("hover");
		return false;
	}
//	舆情跟踪
	if(lipth=="publicSentiment"){
		$(".left_list ul li").removeClass("hover");
		$(".left_list ul li.left_yqgz").addClass("hover");
		return false;
	}
//	企业图谱
	if(lipth=="relationMap"){
		$(".left_list ul li").removeClass("hover");
		$(".left_list ul li.left_qytp").addClass("hover");
		return false;
	}
	//	企业地图
	if(lipth=="enterpriseMap"){
		$(".left_list ul li").removeClass("hover");
		$(".left_list ul li.left_qydt").addClass("hover");
		return false;
	}
	
	//	工具分析
	if(lipth=="toolAnalysis"){
		$(".left_list ul li").removeClass("hover");
		$(".left_list ul li.left_gjfx").addClass("hover");
		return false;
	}
	//	企业报告
	if(lipth=="enterpriseReport"){
		$(".left_list ul li").removeClass("hover");
		$(".left_list ul li.left_qybg").addClass("hover");
		return false;
	}
	//	项目动态
	if(lipth=="project"){
		$(".left_list ul li").removeClass("hover");
		$(".left_list ul li.left_xmdt").addClass("hover");
		return false;
	}else{
	$(".left_list ul li").removeClass("hover");
		$(".left_list ul li.left_index").addClass("hover");
		return false;	
	}
	
}