BS.searchList = {
	PageInit: function() {
		var obj = this; 
		var stockCode = getUrlParam("stockcode"); //研究对象code值stockCode
		 obj.selfyb(stockCode);
		obj.BenchmarkeCompany(stockCode);
       
	},
	//对标企业
	BenchmarkeCompany: function(stockCode) {
//		console.log(stockCode)
//		//判断是否是新三板公司
//		if(isXSBCompany(stockCode)) {
//			var code = "FT526";
//		} else {
//			var code = "FT631";
//		}
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '","number":"10"}}';
		isSBorA();
		if(getUrlParam("content") != null){
			var content=getUrlParam("content").split(",");
			$("#BenchmarkeCompany").html(content[0]+"（"+content[1]+"）");
		}
		function isSBorA() {

			$.axsRequest("FT343",paraminfo, true, function(data) {
				if(data.retCode == "0000") {
					console.log(data.retData)
					var retData = data.retData;
					if(retData != null && retData.length>0){
						var html = '';
						for(var i = 0; i < retData.length; i++) {
							html += '<tr>';
							html += '<td>'+retData[i].stockName+'（'+retData[i].stockCode+'）智能研报</td>';
//							html += '<td><a href="/searchList.html?stockcode='+retData[i].stockCode+"&type=2&tj=&content="+retData[i].stockName+','+retData[i].stockCode+'">查看报告</a>';
							html += '<td><a href="../../slideJump/slideJump.html?txt='+retData[i].url+'">查看报告</a>';
							var cs = "stockcode="+retData[i].stockCode+"&content="+retData[i].stockName+"("+retData[i].stockCode+")";
							html += '<a href="/myResearch/add-report.html?'+cs+'">编辑研报</a></td>';
							html += '</tr>';
						}
						$("#Benchmarke").append(html);
					}else{
						$("#Benchmarke").html("<tr><td colspan='2' >暂无数据</td></tr>");
					}
					
				} else {
					errorAlert(data.retCode, data.retMsg);
				}
			});
		}


	},
	selfyb : function (stockCode) {
			var paraminfo = '{"body":{"codes":"' + stockCode + '"}}';
					if(getUrlParam("content") != null){
				var content=getUrlParam("content").split(",");
				$("#Companyself").html(content[0]+"（"+content[1]+"）");
			}
					var retData;
					znyb();
 				function znyb(){
 							$.axsRequest("FT336",paraminfo, true, function(data) {
				if(data.retCode == "0000") {
					console.log(data.retData)
					retData = data.retData.infoList;
					console.log(retData[0].url);
					if(retData != null && retData.length>0){
						var html = '';
						for(var i = 0; i < retData.length; i++) {
							html += '<tr>';
							html += '<td>'+retData[i].stockName+'（'+retData[i].stockCode+'）智能研报</td>';
//							html += '<td><a href="/searchList.html?stockcode='+retData[i].stockCode+"&type=2&tj=&content="+retData[i].stockName+','+retData[i].stockCode+'">查看报告</a>';
							html += '<td><a href="../../slideJump/slideJump.html?txt='+retData[i].url+'">查看报告</a>';
							var cs = "stockcode="+retData[i].stockCode+"&content="+retData[i].stockName+"("+retData[i].stockCode+")";
							html += '<a href="/myResearch/add-report.html?'+cs+'">编辑研报</a></td>';
							//html += '<a href="/researches/researches.html?stockCode='+retData[i].stockCode+"&content="+retData[i].stockName+'('+retData[i].stockCode+')">编辑研报</a></td>';
							html += '</tr>';
						}
						$("#zhnyb").append(html);
					
					}else{
						$("#zhnyb").html("<tr><td colspan='2' >暂无数据</td></tr>");
					}
		
					$("#zhinengclick").click(function(){
//						$(this).attr("href")="../../slideJump/slideJump.html?txt="+retData[0].url;
						location.href="../../slideJump/slideJump.html?txt="+retData[0].url;
//							window.open("../../slideJump/slideJump.html?txt="+retData[0].url);
						})
				} else {
					errorAlert(data.retCode, data.retMsg);
				}
			});
 				}
			
		}



}

$(function() {
	BS.searchList.PageInit();
});