var stockCode=getUrlParam("stockCode");
$(function() {
	findShare();
	findPurchasingShare();
	findShareStructure();
})
//所选中标签ID
var showId;
//查询股东信息
function findShare(){
	$.axs("/betaStock/topTenShareholderNew/findShare.do", {stockCode: stockCode}, true, function(data){
		if(data.retCode == 0000){
			var result=data.retData;
			if(result==null){
				return false;
			}
			var date='';
			var html='';
			for(var i=0;i<result.length;i++){
				var stat=result[i];
				if(date!=stat.noticeDate){
					date=stat.noticeDate;
					if(i==0){
						showId=stat.noticeDate;
						$("#dateList").append('<a href="javascript:;" id="a_'+stat.noticeDate+'" onclick=showDate(\''+stat.noticeDate+'\') class="hover">'+stat.noticeDate+'</a>');
						html='<tbody id="dataId_'+stat.noticeDate+'">';
					}else{
						$("#dateList").append('<a href="javascript:;" id="a_'+stat.noticeDate+'" onclick=showDate(\''+stat.noticeDate+'\')>'+stat.noticeDate+'</a>');
						$("#topTenShareList").append(html+'</tbody>');
						html='<tbody id="dataId_'+stat.noticeDate+'" style="display:none">';
					}
				}
					html+='<tr><td class="jjname">'+(stat.investor==null?"--":stat.investor)+'</td>'+
						'<td>'+(stat.holdCount==null?"--":stat.holdCount)+'</td>';
				if(stat.shareChange>0){
					html+='<td class="zhang"><span>'+(stat.shareChange==null?"--":stat.shareChange)+'</span></td>';
				}else if(stat.shareChange<0){
					html+='<td class="die"><span>'+(stat.shareChange==null?"--":stat.shareChange)+'</span></td>';
				}else{
					html+='<td><span>不变</span></td>';
				}
					html+='<td>'+(stat.proportion==null?"--":stat.proportion)+'</td>';
				if(stat.realityAddReduce>0){
					html+='<td class="zhang"><span>'+(stat.realityAddReduce==null?"--":stat.realityAddReduce)+'</span></td>';
				}else if(stat.realityAddReduce<0){
					html+='<td class="die"><span>'+(stat.realityAddReduce==null?"--":stat.realityAddReduce)+'</span></td>';
				}else{
					html+='<td><span>不变</span></td>';
				}
					html+='<td>'+(stat.shareType==null?"--":stat.shareType)+'</td></tr>';
			}
			$("#topTenShareList").append(html+'</tbody>');
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}
//显示其它时间段的股东信息
function showDate(id){
	$("#a_"+id).attr("class","hover");
	$("#a_"+showId).removeClass();
	$("#dataId_"+id).show();
	$("#dataId_"+showId).hide();
	showId=id;
}
//查找增减持
function findPurchasingShare(){
	$.axs("/betaStock/topTenShareholderNew/findPurchasingShare.do", {stockCode: stockCode}, true, function(data){
		if(data.retCode == 0000){
			var result=data.retData;
			if(result==null){
				return false;
			}
			for(var i=0;i<result.length;i++){
				var stat=result[i];
				var html='<tr><td><a href="javascript:;">'+stat.stockname+'</a></td>'+
					'<td>'+stat.sharenumber+'</td>'+
					'<td>'+stat.sortnum+'%</td></tr>';
				if(stat.type==1){
					$("#topTenList").append(html);
				}else{
					$("#lastTenList").append(html);
				}
			}
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}
//股权结构
function findShareStructure(){
	$.axs("/betaStock/topTenShareholderNew/findShareStructure.do", {stockCode: stockCode}, true, function(data){
		if(data.retCode == 0000){
			var result=data.retData;
			if(result==null){
				return false;
			}
			for(var i=0;i<result.length;i++){
				var stat=result[i];
				$("#noticeDate").append("<span>"+stat.noticedate+"</span>");
				$("#generalCapital").append("<span>"+stat.generalcapital+"</span>");
				$("#generalCapitalA").append("<span>"+stat.generalcapitala+"</span>");
				$("#circulationAShares").append("<span>"+stat.circulationashares+"</span>");
				$("#restrictedAShare").append("<span>"+stat.restrictedashare+"</span>");
				$("#causeOfChange").append("<span>"+stat.causeofchange+"</span>");
			}
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}
