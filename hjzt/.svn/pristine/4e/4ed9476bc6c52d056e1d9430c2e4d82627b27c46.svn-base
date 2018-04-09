var stockCode = getUrlParam("stockCode");
var stockName = getUrlParam("stockName");
//stockCode='430043';
//stockName='景睿策划';
// 左中栏目
setLeft();
function setLeft() {
	var pathName = window.location.pathname;
	var leftNav = '<div class="boar_l_top"></div>';
    leftNav += '<ul id="leftList">';
	leftNav += '<li><span></span><a href="TBindex.html?stockCode='+stockCode+'&stockName='+stockName+'">首页概览</a></li>';
	leftNav += '<li><span></span><a href="TBenterpriseInformation.html?stockCode='+stockCode+'&stockName='+stockName+'">企业资料</a></li>';
	leftNav += '<li><span></span><a href="TBboardDirectors.html?stockCode='+stockCode+'&stockName='+stockName+'">董事会高管</a></li>';
	leftNav += '<li><span></span><a href="TBnotice.html?stockCode='+stockCode+'&stockName='+stockName+'">公司公告</a></li>';
	leftNav += '<li><span></span><a href="TBequityShareholders.html?stockCode='+stockCode+'&stockName='+stockName+'">股本股东</a></li>';
	leftNav += '<li><span></span><a href="TBComparisonOfPop.html?stockCode='+stockCode+'&stockName='+stockName+'">财务数据</a></li>';
	leftNav += '<li><span></span><a href="TBanalysis.html?stockCode='+stockCode+'&stockName='+stockName+'">行业分析</a></li>';
	leftNav += '<li><span></span><a href="TBdistributionAllocation.html?stockCode='+stockCode+'&stockName='+stockName+'">发行分配</a></li>';
	leftNav += '<li><span></span><a href="OperatingConditions.html?stockCode='+stockCode+'&stockName='+stockName+'">经营情况</a></li>';
	leftNav += '<li><span></span><a href="CorporateEvents.html?stockCode='+stockCode+'&stockName='+stockName+'">公司大事</a></li>';
	leftNav += '<li><span></span><a href="dailyQuotation.html?stockCode='+stockCode+'&stockName='+stockName+'">每日行情</a></li>';
	leftNav += '<li><span></span><a href="researchReport.html?stockCode='+stockCode+'&stockName='+stockName+'">研报</a></li>';
	leftNav += '<div class="clr"></div>';
	leftNav += '</ul>';
	$(".boar_l").html("");
	$(".boar_l").prepend(leftNav);
	var nameList = ["TBindex", "TBenterpriseInformation", "TBboardDirectors", "TBnotice", "TBequityShareholders", "TBComparisonOfPop", "TBanalysis","TBdistributionAllocation","OperatingConditions","CorporateEvents","dailyQuotation","researchReport"];
	$.each(nameList, function(index, item) {
		if(pathName.match(item) != null) {
			$("#leftList li").eq(index).addClass("hover");
		}

	});
	
}
$(document).ready(function(){
	var lBWidth=$(".boar_l").width();
	$(".logoBackground").css("width",lBWidth);

});


