var stockCode = getUrlParam("stockCode");
var stockName = getUrlParam("stockName");
var pageNum = 1;
$(function(){
	
	loadReportByStockCode(3,stockCode);
	
	/**
	 * 点击更多
	 */
	$("#reportMsg").click(function(){
		loadReportByStockCode(3,stockCode);
	})
})


function loadReportByStockCode(pageSize, stockCode){
	$.axs("/betaStock/researchReport/findReportByStockCode.do", {
		pageNum : pageNum,
		pageSize : pageSize,
		stockCode : stockCode
	}, false, function(data) {
		if(data.retCode=="0000"){
			if(data.retData.reportList != null && data.retData.reportList != ""){
				$(data.retData.reportList).each(function(){
					var html = "<div class='qy_zl'><h2><a href='javascript:;' onclick='seeReport(\""+encodeURIComponent(this.fileUrl)+"\")' >"
							+ this.title
							+ "</a></h2><p class='time'>研究机构 :"
							+ this.organization
							+ "<em>发表时间 :</em><i>"
							+ this.publishTime
							+ "</i></p><div class='qy_nr'><p>"
							+ this.content
							+ "</p></div></div>";
					$("#reportMsgDiv").before(html);
				})
				if(data.retData.pageTotal == pageNum){
					$("#reportMsg").unbind("click");
					$("#reportMsg").text("没有更多数据");
				}
				pageNum++;
			}
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
};

function page(){
	
}

/**
 * 查看公司研报 
 * @param url
 */
function seeReport(url) {
	if(url == null || "" == url) {
		$.zmAlert("文件路径错误！");
	}
	window.open(decodeURIComponent(url));
}