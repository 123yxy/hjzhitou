//初始化
var codeName = getUrlParam("stockCode");
$(function() {
	findOpMainBusiness(codeName);
});

/**
 * 经营情况
 */
function findOpMainBusiness(){
	$.axs("/betaStock/operatingConditions/findOpMainBusiness.do",{stockCode:codeName},false,function(data){
		if(data.retCode==0000){
			var result=data.retData;
			//经营情况
			var oc = result.oc;
			//主营业务
			var oMBList = result.oMBList;
			//主要客户
			var oMCList = result.oMCList;
			if(result!=null){
				//经营情况
				if(oMBList!=null){
					$("#businessModel").text(oc.businessmodel);
					$("#operatingConditions").text(oc.operatingconditions);
					$("#riskAndValue").text(oc.riskandvalue);
				}
				//主营业务
				if(oMBList.length!=0&&oMBList!=null){
					$("#mainBusiness").text(oMBList[0].mainbusinesssituation);
					var time ="";
					var project ="";
					var trNum = 1;
					var projectNum = 1;
					var isSameProject = false;
					var isSameTime = false;
					var temp = false;
					$.each(oMBList,function(index,item){
						isSameProject = (item.project == project);
						isSameTime = (item.time == time);
						if(!isSameTime){
							time =item.time;
							$("#mainBusinessHead").append('<td colspan="2">'+time+'</td>')
							$("#mainBusinessCenter").append('<td>金额</td><td>比例(%)</td>')
						}
						if(!isSameProject){
							if(index == 0){
								$("#mainBusinessTablde").append('<tr id='+trNum+'><td>'+item.project+'</td>');
								trNum++;
							}
							if(!isSameTime){
								if(index != 0){
									temp = true;
								}
								projectNum = 1;
								$("#"+projectNum).append('<td>'+item.amountmoney+'</td><td>'+item.proportion.toFixed(2)+'%</td></tr>');
								projectNum++;
							}else{
								if(temp){
									$("#"+projectNum).append('<td>'+item.amountmoney+'</td><td>'+item.proportion.toFixed(2)+'%</td></tr>');
									projectNum++;
								}else{
									$("#mainBusinessTablde").append('<tr id='+trNum+'><td>'+item.project+'</td>'
											+'<td>'+item.amountmoney+'</td>'
											+'<td>'+item.proportion.toFixed(2)+'%</td>'
											+'</tr>');
									trNum++;
								}
							}
						}
					});
				}
				//主要客户	
				if(oMCList!=null&&oMCList.length!=0){
					var timeTwo ="";
					var htmlOMC="";
					var oMCId=1;
					$.each(oMCList,function(index,item){
						if(timeTwo!=item.time){
							timeTwo =item.time;
								htmlOMC = '<span class="center">'+timeTwo+'公司前五名客户的销售额及所占经营收入的比例如下:</span>'	
								+'<div class="information">'
								+'<table>'
								+'<thead>'
								+'<tr>'
								+'<th>客户名称</th>'
								+'<th>销售金额(元)</th>'
								+'<th>占营业收入的比例</th>'
								+'</tr>'
								+'</thead>'
								+'<tbody id=OMC'+(oMCId++)+'>'
								+'<tr>'
								+'<td>'+item.customername+'</td>'
								+'<td>'+item.salesamount+'</td>'
								+'<td>'+item.operatingincome+'%</td>'
								+'</tr>'
								+'</tbody>'
								+'</table>'
								+'</div>'
								if(item.chartnotes!=null){
									$("#mainCustomer").append(htmlOMC).append('<span class="center">注释:'+item.chartnotes+'</span>');
								}else{
									$("#mainCustomer").append(htmlOMC);
								}
						}else{
							$("#OMC"+(oMCId - 1)).append('<tr><td>'+item.customername+'</td><td>'+item.salesamount+'</td><td>'+item.operatingincome+'%</td></tr>')
						}
						
					});
				}
			}
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}