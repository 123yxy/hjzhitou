$(function() {
	// 显示我的自选股
	showOptional();
});
// 显示我的自选股
function showOptional() {
	$.axs("/stock/optionalkMap/findList.do", null, true, function(data) {
		if (data.retCode == 0000) {
			var result = data.retData;
			var myChoice = '';
			$.each(result, function(index, item) {
				var tr = $("<tr>");
				var td1 = $("<td>");
				var td2 = $("<td>");
				var td3 = $("<td>");
				var td4 = $("<td>");
				var td5 = $("<td>");
				var td6 = $("<td>");
				var td7 = $("<td>");
				var td8 = $("<td>");
				var td9 = $("<td>");
				var td10 = $("<td>");
				var td11 = $("<td>");
				var td12 = $("<td>");
				var td13 = $("<td>");
				td1.html(index + 1);
				td2.html(item.stockCode);
				td3.html(item.stockName);
				td4.html(item.newPrice);
				td5.html(item.tradingAmount);
				td6.html(item.priceEarningRatio);
				td7.html("--");
				td8.html("--");
				td9.html("--");
				td10.html("--");
				td11.html("--");
				td12.html("--");
				td13.html("--");
				tr.append(td1).append(td2).append(td3).append(td4).append(td5)
						.append(td6).append(td7).append(td8).append(td9)
						.append(td10).append(td11).append(td12).append(td13);
				$("#myChoice").append(tr);
			});
		}
	});
}