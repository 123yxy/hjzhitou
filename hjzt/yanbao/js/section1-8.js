var stockCode = UTIL.getPara("stockCode");
var dataT = {stockCode:stockCode};
$(function(){
	//点击tab切换
	findOutboundInvestment();
})
function findOutboundInvestment(){
	// WF_ajax.findOutboundInvestment(true, {stockCode:stockCode}, function(data){
    UTIL.axs(UTIL.CONFIG.findOutboundInvestment, {stockCode:stockCode}, true, function (data) {
		if(data.retCode == "0000"){
			var html = "";
			if(data.retData != null && data.retData.length > 0){
				$(data.retData).each(function(i, item){
					html+='<tr><td>'+isStrKong(item.companyname)+'</td>'+
						'<td>'+isStrKong(item.realname)+'</td>'+
						'<td class="shuzi">'+isStrKong(item.registeredcapital)+'</td>'+
						'<td class="shuzi">'+isStrKong(item.investmentamount)+'</td>'+
						'<td class="shuzi">'+isStrKong(item.investmentproportion)+'</td>';
					var regTime=toDateTime(item.regtime,"yyyy-MM-dd");
	                html+='<td class="shuzi">'+regTime+'</td>'+
						'<td>'+isStrKong(item.statu)+'</td></tr>';
				})
			}else{
				html = '<h3 class="touzi-gs"><div class="noDatas">暂无数据</div></h3>';
			}
			$("#outboundInvestment").html(html);
		}
	})
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