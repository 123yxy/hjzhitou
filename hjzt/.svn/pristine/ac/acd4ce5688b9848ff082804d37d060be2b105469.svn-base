var stockCode = getUrlParam("stockCode");
var stockName = getUrlParam("stockName");
$(function(){
	$("#stockNameShow").text(stockName);
	findBtCompanyNews(stockCode,1,10);
})


/**
 * 加载新闻数据
 * @param dateTime
 * @param indicatorId
 */
function findBtCompanyNews(stockCode, pageNum, pageSize){
	if(pageNum==null){
		pageNum=1;
	}
	if(pageSize==null){
		pageSize=10;
	}
	if(pageNum==1){
		$("#pages").remove();
		$(".news_llist").append('<div id="pages" class="pages pagination " style="display: none;"></div><div class="clr"></div>');
	}
	var param={stockCode:stockCode, pageNum:pageNum, pageSize:pageSize};
	$.axs("/betaInvest/btCompanyNews/findBtCompanyNews.do", param, false, function(data) {
			if(data.retCode=="0000"){
				var list = data.retData.companyNews;
				var totalCount = data.retData.total;
				var pageCount = data.retData.pageTotal;
				var html = '';
	//			console.log(data);
				if(list==null||list==''||list==undefined) {
						html+='<div class="zanwu_shuju" style="width:125px; margin:0 auto;padding-top:70px;padding-left:40px"><span></span><p>暂无数据</p></div>';
						$("#newsList").html(html);
						return false;
				}		
				if(pageNum==1){
					$("#newsList").empty();//只有第一次清理数据
				}
				$(list).each(function(index, item) {
					html+='<li><a href="'+item.newsUrl+'" target="_blank">'+item.contentTitle+'</a>';
					var date=toDateTime(item.releaseTime,"yyyy-MM-dd");
					html+='<span>'+date+'</span><em>'+item.sourceSite+'</em>'+
					'<p><i>【摘要】</i>'+item.headline+'</p></li>';
				});

				$("#newsList").html(html);
				//分页
				//分页
				if(pageNum==1){
					$('#pages').pagination({
						total: totalCount,
						pageSize: pageSize,
						current:pageNum,
//							layout:['list','sep','first','prev','links','next','last','sep','refresh'],
						layout: ['first', 'prev', 'links','next','last'],
						links:5,
						displayMsg:"",
						showPageList:false,
						onSelectPage: function(pageNumber, size) {
							findBtCompanyNews(stockCode, pageNumber, size);
							$(document).scrollTop(0);
						}
					});
				}
				if(totalCount<=pageSize){
					$('#pages').hide();
				}else{
					$('#pages').show();
				}
				setPageText('pages');
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}

function toDateTime (time, format) {  
    var x = new Date(parseInt(time)),  
        y = format;  
    var z = {M: x.getMonth() + 1, d: x.getDate(), h: x.getHours(), m: x.getMinutes(), s: x.getSeconds()};  
    y = y.replace(/(M+|d+|h+|m+|s+)/g, function (v) {  
        return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2)  
    });  
    var formatDateTime = y.replace(/(y+)/g, function (v) {  
        return x.getFullYear().toString().slice(-v.length)  
    });  
    return formatDateTime;  
};

