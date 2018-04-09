$(function(){
	findOverViewCount();
})


//每日市场概览历史记录图表
function findOverViewCount(){
	$.axs("/betaStock/marketOverView/findOverViewCount.do",null,false,function(data){
		if(data.retCode=="0000"){
//			console.log(data);
			var result=data.retData;
			if(result==null){
				return false;
			}
			// 市场概况
			var viewCount = result.viewCount;
//			console.log(result.viewCount);
			
			//指数
			var quotationResponseZS = result.quotationResponseZS;
			var quotationResponseCZ = result.quotationResponseCZ;
			//交易提示
			var ipoListing = result.ipoListing;
			var newlySharesListed = result.newlySharesListed;
			var transferModeChange = result.transferModeChange;
			var exDividend = result.exDividend;
			var suspendTransfer = result.suspendTransfer;
			var transferCount = result.transferCount;
			$("#time1").html(viewCount.listingTime);
			$("#totalGp").html(viewCount.marketMaker+viewCount.agreementNum);
			$("#czGs").html(((viewCount.tradingVolumeZS+viewCount.tradingVolumeXY)/1000000.00).toFixed(2));
			$("#czJe").html(((viewCount.tradingAmountZS+viewCount.tradingAmountXY)/100000000.00).toFixed(2));
			$("#time2").html(quotationResponseCZ.listingTime);
			$("#zhishu_1").html((quotationResponseCZ.newPrice).toFixed(2));
			$("#cf_zhishu").html(quotationResponseCZ.priceChangeRatio+"%");
			$("#zhishu_2").html((quotationResponseZS.newPrice).toFixed(2));
			$("#zs_zhishu").html(quotationResponseZS.priceChangeRatio+"%");
			if(quotationResponseCZ.priceChangeRatio>=0){
				$("#cf_zhishu").parent().removeClass("down_number").addClass("up_number");
				$("#zhishu_1").parent().removeClass("down").addClass("up");
			}else{
				$("#cf_zhishu").parent().removeClass("up_number").addClass("down_number");
				$("#zhishu_1").parent().removeClass("up").addClass("down");
			}
			if(quotationResponseZS.priceChangeRatio>=0){
				$("#zs_zhishu").parent().removeClass("down_number").addClass("up_number");
				$("#zhishu_2").parent().removeClass("down").addClass("up");
			}else{
				$("#zs_zhishu").parent().removeClass("up_number").addClass("down_number");
				$("#zhishu_2").parent().removeClass("up").addClass("down");
			}
			$("#time3").html(ipoListing.listingTime);
			$("#xggp").html("共" +ipoListing.transferCount+ "支");
			$("#xfgp").html("共" +newlySharesListed.transferCount+ "支");
			$("#zrbg").html("共" +transferModeChange.transferCount+ "支");
			$("#cqcx").html("共" +exDividend.transferCount+ "支");
			$("#ztzr").html("共" +suspendTransfer.transferCount+ "支");
			$("#hfzr").html("共" +transferCount.transferCount+ "支");
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
}

