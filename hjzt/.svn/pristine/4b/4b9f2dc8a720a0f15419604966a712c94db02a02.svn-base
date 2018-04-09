//第四章---预测信息
var stockCodeParam=UTIL.getPara("stockCode");
var stockNameParam=decodeURI(UTIL.getPara("stockName"));
var desc=UTIL.weiXiRemarks;
var imgUrl=UTIL.imgUrl;

/**
 * 盈利预测
 */
function findProfitForecastData(){
	var paramData={stockCode:stockCodeParam};
	// WF_ajax.findProfitForecastData(paramData,true,function(_data){
	UTIL.axs(UTIL.CONFIG.findProfitForecastData, paramData, true, function (result) {
		var _data=result.retData;
		//console.log(_data);
		$("#yuceStockCode").text(_data.stockName+"("+_data.stockCode+")");
		
		$.each(_data.portTime,function(index,item){
			//营业收入
			var f2QZYYSR_value=(_data.f2QZYYSR)[index]==null?"--":(_data.f2QZYYSR)[index];
			if(f2QZYYSR_value!="--"){
				if(_data.f2QZYYSR_showUnit.indexOf("亿")>-1){
					f2QZYYSR_value=(f2QZYYSR_value/100000000.00).toFixed(2);
				}else if(_data.f2QZYYSR_showUnit.indexOf("万")>-1){
					f2QZYYSR_value=(f2QZYYSR_value/10000.00).toFixed(2);
				}
			}
			$("#yuce_f2QZYYSR").find("td").eq(index+1).text(UTIL.fmtNum3(f2QZYYSR_value));
			//营业成本
			var f2QZYYCB_value=(_data.f2QZYYCB)[index]==null?"--":(_data.f2QZYYCB)[index];
			if(f2QZYYCB_value!="--"){
				if(_data.f2QZYYCB_showUnit.indexOf("亿")>-1){
					f2QZYYCB_value=(f2QZYYCB_value/100000000.00).toFixed(2);
				}else if(_data.f2QZYYCB_showUnit.indexOf("万")>-1){
					f2QZYYCB_value=(f2QZYYCB_value/10000.00).toFixed(2);
				}
			}
			$("#yuce_f2QZYYCB").find("td").eq(index+1).text(UTIL.fmtNum3(f2QZYYCB_value));
			//财务费用
			var f2CWFY_value=(_data.f2CWFY)[index]==null?"--":(_data.f2CWFY)[index];
			if(f2CWFY_value!="--"){
				if(_data.f2CWFY_showUnit.indexOf("亿")>-1){
					f2CWFY_value=(f2CWFY_value/100000000.00).toFixed(2);
				}else if(_data.f2CWFY_showUnit.indexOf("万")>-1){
					f2CWFY_value=(f2CWFY_value/10000.00).toFixed(2);
				}
			}
			$("#yuce_f2CWFY").find("td").eq(index+1).text(UTIL.fmtNum3(f2CWFY_value));
			//利润总额
			var f2LRZE_value=(_data.f2LRZE)[index]==null?"--":(_data.f2LRZE)[index];
			if(f2LRZE_value!="--"){
				if(_data.f2LRZE_showUnit.indexOf("亿")>-1){
					f2LRZE_value=(f2LRZE_value/100000000.00).toFixed(2);
				}else if(_data.f2LRZE_showUnit.indexOf("万")>-1){
					f2LRZE_value=(f2LRZE_value/10000.00).toFixed(2);
				}
			}
			$("#yuce_f2LRZE").find("td").eq(index+1).text(UTIL.fmtNum3(f2LRZE_value));
			//所得税费用
			var f2JSDSFY_value=(_data.f2JSDSFY)[index]==null?"--":(_data.f2JSDSFY)[index];
			if(f2JSDSFY_value!="--"){
				if(_data.f2JSDSFY_showUnit.indexOf("亿")>-1){
					f2JSDSFY_value=(f2JSDSFY_value/100000000.00).toFixed(2);
				}else if(_data.f2JSDSFY_showUnit.indexOf("万")>-1){
					f2JSDSFY_value=(f2JSDSFY_value/10000.00).toFixed(2);
				}
			}
			$("#yuce_f2JSDSFY").find("td").eq(index+1).text(UTIL.fmtNum3(f2JSDSFY_value));
			//净利润
			var f2JLR_value=(_data.f2JLR)[index]==null?"--":(_data.f2JLR)[index];
			if(f2JLR_value!="--"){
				if(_data.f2JLR_showUnit.indexOf("亿")>-1){
					f2JLR_value=(f2JLR_value/100000000.00).toFixed(2);
				}else if(_data.f2QZYYSR_showUnit.indexOf("万")>-1){
					f2JLR_value=(f2JLR_value/10000.00).toFixed(2);
				}
			}
			$("#yuce_f2JLR").find("td").eq(index+1).text(UTIL.fmtNum3(f2JLR_value));
			//每股收益-EPS
			var MeiGuShouYi_value=(_data.MeiGuShouYi)[index]==null?"--":((_data.MeiGuShouYi)[index]).toFixed(2);
			$("#yuce_MeiGuShouYi").find("td").eq(index+1).text(UTIL.fmtNum3(MeiGuShouYi_value));
			//息税前利润-EBIT
			var XiShuiQianLiRun_value=(_data.XiShuiQianLiRun)[index]==null?"--":(_data.XiShuiQianLiRun)[index];
			if(XiShuiQianLiRun_value!="--"){
				if(_data.XiShuiQianLiRun_showUnit.indexOf("亿")>-1){
					XiShuiQianLiRun_value=(XiShuiQianLiRun_value/100000000.00).toFixed(2);
				}else if(_data.XiShuiQianLiRun_showUnit.indexOf("万")>-1){
					XiShuiQianLiRun_value=(XiShuiQianLiRun_value/10000.00).toFixed(2);
				}
			}
			$("#yuce_XiShuiQianLiRun").find("td").eq(index+1).text(UTIL.fmtNum3(XiShuiQianLiRun_value));
			//流动资产
			var f1LDZCHJ_value=(_data.f1LDZCHJ)[index]==null?"--":(_data.f1LDZCHJ)[index];
			if(f1LDZCHJ_value!="--"){
				if(_data.f1LDZCHJ_showUnit.indexOf("亿")>-1){
					f1LDZCHJ_value=(f1LDZCHJ_value/100000000.00).toFixed(2);
				}else if(_data.f1LDZCHJ_showUnit.indexOf("万")>-1){
					f1LDZCHJ_value=(f1LDZCHJ_value/10000.00).toFixed(2);
				}
			}
			$("#yuce_f1LDZCHJ").find("td").eq(index+1).text(UTIL.fmtNum3(f1LDZCHJ_value));
			//货币资金
			var f1HBZJ_value=(_data.f1HBZJ)[index]==null?"--":(_data.f1HBZJ)[index];
			if(f1HBZJ_value!="--"){
				if(_data.f1HBZJ_showUnit.indexOf("亿")>-1){
					f1HBZJ_value=(f1HBZJ_value/100000000.00).toFixed(2);
				}else if(_data.f1HBZJ_showUnit.indexOf("万")>-1){
					f1HBZJ_value=(f1HBZJ_value/10000.00).toFixed(2);
				}
			}
			$("#yuce_f1HBZJ").find("td").eq(index+1).text(UTIL.fmtNum3(f1HBZJ_value));
			//应收账款
			var f1YSZK_value=(_data.f1YSZK)[index]==null?"--":(_data.f1YSZK)[index];
			if(f1YSZK_value!="--"){
				if(_data.f1YSZK_showUnit.indexOf("亿")>-1){
					f1YSZK_value=(f1YSZK_value/100000000.00).toFixed(2);
				}else if(_data.f1YSZK_showUnit.indexOf("万")>-1){
					f1YSZK_value=(f1YSZK_value/10000.00).toFixed(2);
				}
			}
			$("#yuce_f1YSZK").find("td").eq(index+1).text(UTIL.fmtNum3(f1YSZK_value));
			//存货
			var f1CH_value=(_data.f1CH)[index]==null?"--":(_data.f1CH)[index];
			if(f1CH_value!="--"){
				if(_data.f1CH_showUnit.indexOf("亿")>-1){
					f1CH_value=(f1CH_value/100000000.00).toFixed(2);
				}else if(_data.f1CH_showUnit.indexOf("万")>-1){
					f1CH_value=(f1CH_value/10000.00).toFixed(2);
				}
			}
			$("#yuce_f1CH").find("td").eq(index+1).text(UTIL.fmtNum3(f1CH_value));
			//固定资产
			var f1GDZC_value=(_data.f1GDZC)[index]==null?"--":(_data.f1GDZC)[index];
			if(f1GDZC_value!="--"){
				if(_data.f1GDZC_showUnit.indexOf("亿")>-1){
					f1GDZC_value=(f1GDZC_value/100000000.00).toFixed(2);
				}else if(_data.f1GDZC_showUnit.indexOf("万")>-1){
					f1GDZC_value=(f1GDZC_value/10000.00).toFixed(2);
				}
			}
			$("#yuce_f1GDZC").find("td").eq(index+1).text(UTIL.fmtNum3(f1GDZC_value));
			//资产总计
			var f1ZCZJ_value=(_data.f1ZCZJ)[index]==null?"--":(_data.f1ZCZJ)[index];
			if(f1ZCZJ_value!="--"){
				if(_data.f1ZCZJ_showUnit.indexOf("亿")>-1){
					f1ZCZJ_value=(f1ZCZJ_value/100000000.00).toFixed(2);
				}else if(_data.f1ZCZJ_showUnit.indexOf("万")>-1){
					f1ZCZJ_value=(f1ZCZJ_value/10000.00).toFixed(2);
				}
			}
			$("#yuce_f1ZCZJ").find("td").eq(index+1).text(UTIL.fmtNum3(f1ZCZJ_value));
			//流动负债
			var f1LDFZHJ_value=(_data.f1LDFZHJ)[index]==null?"--":(_data.f1LDFZHJ)[index];
			if(f1LDFZHJ_value!="--"){
				if(_data.f1LDFZHJ_showUnit.indexOf("亿")>-1){
					f1LDFZHJ_value=(f1LDFZHJ_value/100000000.00).toFixed(2);
				}else if(_data.f1LDFZHJ_showUnit.indexOf("万")>-1){
					f1LDFZHJ_value=(f1LDFZHJ_value/10000.00).toFixed(2);
				}
			}
			$("#yuce_f1LDFZHJ").find("td").eq(index+1).text(UTIL.fmtNum3(f1LDFZHJ_value));
//$("#yuce_f1LDFZHJ").remove();
			//应付账款
			var f1YFZK_value=(_data.f1YFZK)[index]==null?"--":(_data.f1YFZK)[index];
			if(f1YFZK_value!="--"){
				if(_data.f1YFZK_showUnit.indexOf("亿")>-1){
					f1YFZK_value=(f1YFZK_value/100000000.00).toFixed(2);
				}else if(_data.f1YFZK_showUnit.indexOf("万")>-1){
					f1YFZK_value=(f1YFZK_value/10000.00).toFixed(2);
				}
			}
			$("#yuce_f1YFZK").find("td").eq(index+1).text(UTIL.fmtNum3(f1YFZK_value));
			//负债合计
			var f1FZHJ_value=(_data.f1FZHJ)[index]==null?"--":(_data.f1FZHJ)[index];
			if(f1FZHJ_value!="--"){
				if(_data.f1FZHJ_showUnit.indexOf("亿")>-1){
					f1FZHJ_value=(f1FZHJ_value/100000000.00).toFixed(2);
				}else if(_data.f1FZHJ_showUnit.indexOf("万")>-1){
					f1FZHJ_value=(f1FZHJ_value/10000.00).toFixed(2);
				}
			}
			$("#yuce_f1FZHJ").find("td").eq(index+1).text(UTIL.fmtNum3(f1FZHJ_value));
			//股本
			var GB_value=(_data.GB)[index]==null?"--":(_data.GB)[index];
			if(GB_value!="--"){
				if(_data.GB_showUnit.indexOf("亿")>-1){
					GB_value=(GB_value/100000000.00).toFixed(2);
				}else if(_data.GB_showUnit.indexOf("万")>-1){
					GB_value=(GB_value/10000.00).toFixed(2);
				}
			}
			$("#yuce_GB").find("td").eq(index+1).text(UTIL.fmtNum3(GB_value));
			//所有者权益
			var f1SYZQYHJ_value=(_data.f1SYZQYHJ)[index]==null?"--":(_data.f1SYZQYHJ)[index];
			if(f1SYZQYHJ_value!="--"){
				if(_data.f1SYZQYHJ_showUnit.indexOf("亿")>-1){
					f1SYZQYHJ_value=(f1SYZQYHJ_value/100000000.00).toFixed(2);
				}else if(_data.f1SYZQYHJ_showUnit.indexOf("万")>-1){
					f1SYZQYHJ_value=(f1SYZQYHJ_value/10000.00).toFixed(2);
				}
			}
			$("#yuce_f1SYZQYHJ").find("td").eq(index+1).text(UTIL.fmtNum3(f1SYZQYHJ_value));
			//ROA
			var ZongZiChanShouYiLv_value=(_data.ZongZiChanShouYiLv)[index]==null?"--":((_data.ZongZiChanShouYiLv)[index]).toFixed(2);
			$("#yuce_ZongZiChanShouYiLv").find("td").eq(index+1).text(UTIL.fmtNum3(ZongZiChanShouYiLv_value));
			//ROE
			var JingZiChanShouYiLv_value=(_data.JingZiChanShouYiLv)[index]==null?"--":((_data.JingZiChanShouYiLv)[index]).toFixed(2);
			$("#yuce_JingZiChanShouYiLv").find("td").eq(index+1).text(UTIL.fmtNum3(JingZiChanShouYiLv_value));
			//流动比率
			var LiuDongBiLv_value=(_data.LiuDongBiLv)[index]==null?"--":((_data.LiuDongBiLv)[index]).toFixed(2);
			$("#yuce_LiuDongBiLv").find("td").eq(index+1).text(UTIL.fmtNum3(LiuDongBiLv_value));
			//利息保障倍数
			var LiXiBaoZhangBeiShu_value=(_data.LiXiBaoZhangBeiShu)[index]==null?"--":((_data.LiXiBaoZhangBeiShu)[index]).toFixed(2);
			$("#yuce_LiXiBaoZhangBeiShu").find("td").eq(index+1).text(UTIL.fmtNum3(LiXiBaoZhangBeiShu_value));
			//经营现金流净额
			var f3JYHDCSDXJLLJE_value=(_data.f3JYHDCSDXJLLJE)[index]==null?"--":(_data.f3JYHDCSDXJLLJE)[index];
			if(f3JYHDCSDXJLLJE_value!="--"){
				if(_data.f3JYHDCSDXJLLJE_showUnit.indexOf("亿")>-1){
					f3JYHDCSDXJLLJE_value=(f3JYHDCSDXJLLJE_value/100000000.00).toFixed(2);
				}else if(_data.f3JYHDCSDXJLLJE_showUnit.indexOf("万")>-1){
					f3JYHDCSDXJLLJE_value=(f3JYHDCSDXJLLJE_value/10000.00).toFixed(2);
				}
			}
			$("#yuce_f3JYHDCSDXJLLJE").find("td").eq(index+1).text(UTIL.fmtNum3(f3JYHDCSDXJLLJE_value));
//			//总资产周转率
//			var ZongZiChanZhouZhuanLv_value=(_data.ZongZiChanZhouZhuanLv)[index]==null?"--":((_data.ZongZiChanZhouZhuanLv)[index]).toFixed(2);
//			$("#yuce_ZongZiChanZhouZhuanLv").find("td").eq(index+1).text(ZongZiChanZhouZhuanLv_value);
			//PE
			var ShiYingLv_value=(_data.ShiYingLv)[index]==null?"--":((_data.ShiYingLv)[index]).toFixed(2);
			$("#yuce_ShiYingLv").find("td").eq(index+1).text(UTIL.fmtNum3(ShiYingLv_value));
//			//PB
//			var ShiJingLv_value=(_data.ShiJingLv)[index]==null?"--":((_data.ShiJingLv)[index]).toFixed(2);
//			$("#yuce_ShiJingLv").find("td").eq(index+1).text(ShiJingLv_value);
		});
	});
	 // 表格滚动
    $(".table-scroll-fixed").each(function(){
        var tableFixedHeight = $(this).parent().height();
        $(this).siblings(".table-scroll").find(".mui-scroll-wrapper").height(tableFixedHeight);
        $(this).parent().height(tableFixedHeight);
    });
    $("#xyfx-table .mui-scroll-wrapper").height($("#xyfx-table-fixed").height());
    $("#xyfx-table-fixed").parent(".relative").height($("#xyfx-table-fixed").height());
    
    // setScrollTos();
}

/**
 * 获取经营风险信息
 */
function findRiskTipsByCode(){
	// WF_ajax.findRiskTipsByCode(true, {stockCode:stockCodeParam}, function(data){
	UTIL.axs(UTIL.CONFIG.findRiskTipsByCode, {stockCode:stockCodeParam}, true, function (data) {
		if(data.retCode == "0000"){
			var result = data.retData;
			var fxHtml = "";
			var ycHtml = "公司的利润主要来源于："+isStrKong(result.LY)+"，其中可能存在的风险来源有：";
			$("#yc").text(ycHtml);
			if(result.tipsList != null && result.tipsList.length > 0){ //经营风险信息列表
				$(result.tipsList).each(function(i, item){
					fxHtml += "<h3>"+isStrKong(item.riskName)+"</h3>" +
									"<p>"+isStrKong(item.riskDesc)+"</p>";
				})
				
				$("#ycfxTips").html(fxHtml);
			}else{
				$("#ycfxTips").html("<p><div class='noDatas'>暂无数据</div></p>");
			}
		}
	})
}
$(function(){
    var windowHeight = $(window).height()
    $(".yuce-fx .container").height(windowHeight-195);
    $(".contents").height(windowHeight - 280)
})
