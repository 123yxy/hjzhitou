var stockCode = UTIL.getPara("stockCode");
var dataT = {stockCode:stockCode};
$(function(){
	//点击tab切换
	findRiskClassNum();
	$("#Law").on("click",function(){
		if($("#legal_num").text()!="0"){
			findLegal();
			$(".marsk").show();
			$(".falv-tc").show();
			$("body,html").css("overflow","hidden");
		}
	})
	$("#abnormal").on("click",function(){
		if($("#abnormal_num").text()!="0"){
			findAbnormal();
			$(".marsk").show();
			$(".yichang-tc").show();
			$("body,html").css("overflow","hidden");
		}
	})
	$("#stockRight").on("click",function(){
		if($("#pledged_num").text()!="0"){
			findPledged();
			$(".marsk").show();
			$(".guquan-tc").show();
			$("body,html").css("overflow","hidden");
		}
	})
	$("#Taxes").on("click",function(){
		if($("#affiche_num").text()!="0"){
			findAffiche();
			$(".marsk").show();
			$(".qianshui-tc").show();
			$("body,html").css("overflow","hidden");
		}
	})
	$(".marsk").on("click",function(){
		$("body,html").css("overflow","auto");
		$(".marsk").hide();
		$(".falv-tc").hide();
		$(".yichang-tc").hide();
		$(".qianshui-tc").hide();
		$(".guquan-tc").hide();
	})
	$(".tc-close").on("click",function(){
		$(".marsk").hide();
		$(this).parent().hide();
	})
	
	
})

function findRiskClassNum(){
	// WF_ajax.findRiskClassNum(dataT,true,function(_data){
	UTIL.axs(UTIL.CONFIG.findRiskClassNum, dataT, true, function (_data) {
		$("#legal_num").text(_data.legal);
		$("#abnormal_num").text(_data.abnormal);
		$("#pledged_num").text(_data.pledged);
		$("#affiche_num").text(_data.affiche);
	});
}
//法律诉讼
function findLegal(){
	// WF_ajax.findLegal(dataT,function(_data){
	UTIL.axs(UTIL.CONFIG.findLegal, dataT, true, function (_data) {
		var liHtml='';
		for (var i = 0; i < _data.length; i++) {
			var obj=_data[i];
			liHtml+='<li><p>'+obj.title+'</p>';
			liHtml+='<div><span>案件类型：<cite>'+obj.casetype+'</cite></span>';
			var regTime=toDateTime(obj.submittime,"yyyy-MM-dd");
			liHtml+='<span>日期：<cite>'+regTime+'</cite></span>';
			liHtml+='<span>案件号：<cite>'+obj.caseno+'</cite></span></div></li>';
		}
		$("#findLegalData").html(liHtml);
	});
}
//股权出质
function findPledged(){
	// WF_ajax.findPledged(dataT,function(_data){
	UTIL.axs(UTIL.CONFIG.findPledged, dataT, true, function (_data) {
		var liHtml='';
		for (var i = 0; i < _data.length; i++) {
			var obj=_data[i];
			liHtml+='<tr><td>'+((new Date(obj.equitypledgedrecorddate)).Format("yyyy-MM-dd"))+'</td>';
			liHtml+='<td>'+obj.equitypledgedrecordnumber+'</td>';
			liHtml+='<td>'+obj.equitypledgedstate+'</td>';
			liHtml+='<td>'+obj.equitypledgedamount+'</td>';
			liHtml+='<td class="td-left">'+obj.equitypledgedperson+'</td>';
			liHtml+='<td>'+obj.equitypledgedidnumber+'</td>';
			liHtml+='<td class="td-left">'+obj.equitypledgedpawnee+'</td>';
			liHtml+='<td>'+isStrKong(obj.equitypledgedrecordnumbe)+'</td></tr>';
		}
		$("#findPledgedData").html(liHtml);
	});
}
//经营异常
function findAbnormal(){
	// WF_ajax.findAbnormal(dataT,function(_data){
	UTIL.axs(UTIL.CONFIG.findAbnormal, dataT, true, function (_data) {
		var liHtml='';
		for (var i = 0; i < _data.length; i++) {
			var obj=_data[i];
			liHtml+='<tr><td class="td-left">'+obj.putreason+'</td>';
			liHtml+='<td>'+((new Date(obj.putdate)).Format("yyyy-MM-dd"))+'</td>';
			liHtml+='<td class="td-left">'+obj.removereason+'</td>';
			liHtml+='<td>'+((new Date(obj.removedate)).Format("yyyy-MM-dd"))+'</td>';
			liHtml+='<td>'+obj.putdepartment+'</td></tr>';
		}
		$("#findAbnormalData").html(liHtml);
	});
}
//欠税公告
function findAffiche(){
	// WF_ajax.findAffiche(dataT,function(_data){
	UTIL.axs(UTIL.CONFIG.findAffiche, dataT, true, function (_data) {
		var liHtml='';
		for (var i = 0; i < _data.length; i++) {
			var obj=_data[i];
			liHtml+='<tr><td>'+((new Date(obj.releasedate)).Format("yyyy-MM-dd"))+'</td>';
			liHtml+='<td>'+obj.registrationnumber+'</td>';
			liHtml+='<td>'+obj.qutstandingtaxes+'</td>';
			liHtml+='<td>'+obj.taxesbalance+'</td>';
			liHtml+='<td>'+obj.taxauthority+'</td></tr>';
		}
		$("#findAfficheData").html(liHtml);
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