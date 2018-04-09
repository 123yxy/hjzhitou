var chartType = ""; //统计类型
var industryId = ""; //行业id
var areaId = ""; //地区id
var placeType = ""; //定增类型
var investorsType = ""; //投资人类型
var zsCode = ""; //指数代码
var mmName = ""; //做市商名称
var orName = ""; //机构名称
var orType = ""; //机构类型
var columns = ""; //指标名称
var interStr = ""; //接口名
var dateType = ""; //时间类型
var stockCode = ""; //股票代码
var stockName = ""; //股票名称
var orderColumn = ""; //排行字段
var financeIndicatorIds = ""; //财务指标

var ZXColumns = ""; //柱形图字段
var lineColumns = ""; //折线图字段
var MJColumns = ""; //面积图字段

var zbText = "";
var chartName="";//echart标题
$(function(){
	
	chartType = decodeURI(getParamByUrl("chartType"));
	industryId = decodeURI(getParamByUrl("industryId"));
	areaId = decodeURI(getParamByUrl("areaId"));
	investorsType = decodeURI(getParamByUrl("investorsType"));
	placeType = decodeURI(getParamByUrl("placeType"));
	zsCode = decodeURI(getParamByUrl("zsCode"));
	mmName = decodeURI(getParamByUrl("mmName"));
	orName = decodeURI(getParamByUrl("orName"));
	orType = decodeURI(getParamByUrl("orType"));
	columns = decodeURI(getParamByUrl("columns"));
	interStr = decodeURI(getParamByUrl("interStr"));
	orderColumn = decodeURI(getParamByUrl("orderColumn"));
	dateType = decodeURI(getParamByUrl("dateType"));
	financeIndicatorIds = decodeURI(getParamByUrl("financeIndicatorIds"));
	stockCode = decodeURI(getParamByUrl("stockCode"));
	
	ZXColumns = decodeURI(getParamByUrl("ZXColumns"));
	lineColumns = decodeURI(getParamByUrl("lineColumns"));
	MJColumns = decodeURI(getParamByUrl("MJColumns"));
	
	zbText = decodeURI(getParamByUrl("zbText"));
	chartName=decodeURI(getParamByUrl("chartName"));
	//请求接口
	judgeRequest();
	
	//点击编辑的时跳转到编辑的页面
	$(".tubiao_btn span").on("click",function(){
		window.location.href="/myResearch/editChart.html" + (window.location.href).substring((window.location.href).indexOf("?"));
	})
	
	//导出
	$("#outBtn").click(function(){
//		method5("outTable");
		// 将 id 为 content 的 div 渲染成 canvas
	    html2canvas(document.getElementById("pdfContent"), {

	        // 渲染完成时调用，获得 canvas
	        onrendered: function(canvas) {
				//console.log(canvas);
	            // 从 canvas 提取图片数据
	            var imgData = canvas.toDataURL('image/jpeg');

	            var doc = new jsPDF("p", "mm", "a4");
	            //                               |
	            // |—————————————————————————————|                     
	            // A0 841×1189                           
	            // A1 594×841                            
	            // A2 420×594                            
	            // A3 297×420                            
	            // A4 210×297                            
	            // A5 148×210                            
	            // A6 105×148                            
	            // A7 74×105                             
	            // A8 52×74                              
	            // A9 37×52                              
	            // A10 26×37             
	            //     |——|———————————————————————————|
	            //                                 |——|——|
	            //                                 |     |      
	            doc.addImage(imgData, 'JPEG', 0, 0,210,297);

	            doc.save('图表分析.pdf');
	        }
	    });
	})
	
})

//判断请求接口
function judgeRequest(){
	if(interStr == "findSBSDayData"){ //查询三板统计按天显示数据
		findSBSDayData();
	}else if(interStr == "findSBSHYData"){ //查询三板统计半年一次的数据
		findSBSHYData();
	}else if(interStr == "findSBSMData"){ //查询月统计的融资数据
		findSBSMData();
	}else if(interStr == "findPlaceMData"){ //查询定增月的统计数据
		findPlaceMData();
	}else if(interStr == "findInvestorMData"){ //查询投资人月统计数据
		findInvestorMData();
	}else if(interStr == "findQTDData"){ //查询行情天的统计数据
		findQTDData();
	}else if(interStr == "findMMDData"){ //查询做市商天统计数据
		findMMDData();
	}else if(interStr == "findEIDData"){ //查询中介机构天统计数据
		findEIDData();
	}else if(interStr == "findFinanceRanking"){ //查询融资排行数据
		findFinanceRanking();
	}else if(interStr == "findInvestRanking"){ //查询投资排行数据
		findInvestRanking();
	}else if(interStr == "findBtTradingWas"){ //交易排行
		findBtTradingWas();
	}else if(interStr == "findFinancialData"){ //查询个股指标
		findFinancialData();
	}
	
}

//查询三板统计按天显示数据
function findSBSDayData(){
	$.axs("/betaInvest/indexLibrary/findSBSDayData.do",
			{industryId:industryId,areaId:areaId,dateType:dateType,columns:columns},
			false,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result==null){
				return false;
			}
			
			var lcn = []; //挂牌公司家数
			var mtn = []; //做市转让公司家数
			var atn = []; //协议转让总数
			var bcn = []; //基础层公司总数
			var icn = []; //创新层公司总数
			var lcsn = []; //挂牌公司总股本（亿股）
			var tcsn = []; //做市转让总股本（亿股）
			var atsn = []; //协议转让总股本（亿股）
			var lcfn = []; //挂牌公司流通股本（亿股）
			var tcfn = []; //做市转让流通股本（亿股）
			var atfn = []; //协议转让流通股本（亿股）
			var nmtn = []; //新增做市转让家数
			var natn = []; //新增协议转让家数
			var nbcn = []; //新加入基础层总数
			var nicn = []; //新加入创新层总数
			var pln = []; //拟挂牌公司总数
			var npln = []; //新增拟挂牌公司总数
			var lvn = []; //挂牌公司总成交数量(万股)
			var mvn = []; //做市转让成交数量(万股)
			var ltn = []; //挂牌公司总成交金额(万元)
			var mtn1 = []; //做市转让成交金额(万元)
			var atn1 = []; //协议转让成交金额(万元)
			var ltan = []; //挂牌公司总成交均价(元)
			var mtan = []; //做市转让成交均价(元)
			var atan = []; //协议转让成交均价(元)
			var ltt = []; //挂牌总成交笔数
			var mtt = []; //做市转让成交笔数
			var att = []; //协议转让成交笔数
			var st = []; //日期
			
			$(result.sbsDayData).each(function(){
				lcn.push(this.listedCompanyNum);
				mtn.push(this.marketTransfersNum);
				atn.push(this.agreementTransfersNum);
				bcn.push(this.baseCompaniesNum);
				icn.push(this.innovationCompaniesNum);
				lcsn.push((this.listedCompanyScNum == null ? "" : this.listedCompanyScNum.toFixed(2)));
				tcsn.push((this.transferCapitalScNum == null ? "" : this.transferCapitalScNum.toFixed(2)));
				atsn.push((this.agreementTransfersScNum == null ? "" : this.agreementTransfersScNum.toFixed(2)));
				lcfn.push((this.listedCompanyFeNum == null ? "" : this.listedCompanyFeNum.toFixed(2)));
				tcfn.push((this.transferCapitalFeNum == null ? "" : this.transferCapitalFeNum.toFixed(2)));
				atfn.push((this.agreementTransfersFeNum == null ? "" : this.agreementTransfersFeNum.toFixed(2)));
				nmtn.push(this.newMarketTransfersNum);
				natn.push(this.newAgreementTransfersNum);
				nbcn.push(this.newBaseCompaniesNum);
				nicn.push(this.newInnovationCompaniesNum);
				pln.push(this.proposedListedNum);
				npln.push(this.newProposedListedNum);
				lvn.push((this.lcVolumeNum == null ? "" : this.lcVolumeNum.toFixed(2)));
				mvn.push((this.mtVolumeNum == null ? "" : this.mtVolumeNum.toFixed(2)));
				ltn.push((this.lcTurnoverNum == null ? "" : this.lcTurnoverNum.toFixed(2)));
				mtn1.push((this.mtTurnoverNum == null ? "" : this.mtTurnoverNum.toFixed(2)));
				atn1.push((this.atTurnoverNum == null ? "" : this.atTurnoverNum.toFixed(2)));
				ltan.push((this.lcTpAvgNum == null ? "" : this.lcTpAvgNum.toFixed(2)));
				mtan.push((this.mtTpAvgNum == null ? "" : this.mtTpAvgNum.toFixed(2)));
				atan.push((this.atTpAvgNum == null ? "" : this.atTpAvgNum.toFixed(2)));
				ltt.push(this.lcTransactionsTotal);
				mtt.push(this.mtTransactionsTotal);
				att.push(this.atTransactionsTotal);
				st.push(this.storageTime);
			})
			
			var jsonD = {"date":st};
			var sbsDArr = [];
			
			var json = {};
			json.code = "listed_company_num";
			json.name = "挂牌公司家数";
			json.data = lcn;
			sbsDArr.push(json);
			
			json = {};
			json.code = "market_transfers_num";
			json.name = "做市转让公司家数";
			json.data = mtn;
			sbsDArr.push(json);
			
			json = {};
			json.code = "agreement_transfers_num";
			json.name = "协议转让总数";
			json.data = atn;
			sbsDArr.push(json);
			
			json = {};
			json.code = "base_companies_num";
			json.name = "基础层公司总数";
			json.data = bcn;
			sbsDArr.push(json);
			
			json = {};
			json.code = "innovation_companies_num";
			json.name = "创新层公司总数";
			json.data = icn;
			sbsDArr.push(json);
			
			json = {};
			json.code = "listed_company_sc_num";
			json.name = "挂牌公司总股本（亿股）";
			json.data = lcsn;
			sbsDArr.push(json);
			
			json = {};
			json.code = "transfer_capital_sc_num";
			json.name = "做市转让总股本（亿股）";
			json.data = tcsn;
			sbsDArr.push(json);
			
			json = {};
			json.code = "agreement_transfers_sc_num";
			json.name = "协议转让总股本（亿股）";
			json.data = atsn;
			sbsDArr.push(json);

			json = {};
			json.code = "listed_company_fe_num";
			json.name = "挂牌公司流通股本（亿股）";
			json.data = lcfn;
			sbsDArr.push(json);
			
			json = {};
			json.code = "transfer_capital_fe_num";
			json.name = "做市转让流通股本（亿股）";
			json.data = tcfn;
			sbsDArr.push(json);
			
			json = {};
			json.code = "agreement_transfers_fe_num";
			json.name = "协议转让流通股本（亿股）";
			json.data = atfn;
			sbsDArr.push(json);

			json = {};
			json.code = "new_market_transfers_num";
			json.name = "新增做市转让家数";
			json.data = nmtn;
			sbsDArr.push(json);
			
			json = {};
			json.code = "new_agreement_transfers_num";
			json.name = "新增协议转让家数";
			json.data = natn;
			sbsDArr.push(json);
			
			json = {};
			json.code = "new_base_companies_num";
			json.name = "新加入基础层总数";
			json.data = nbcn;
			sbsDArr.push(json);
			
			json = {};
			json.code = "new_innovation_companies_num";
			json.name = "新加入创新层总数";
			json.data = nicn;
			sbsDArr.push(json);
			
			json = {};
			json.code = "proposed_listed_num";
			json.name = "拟挂牌公司总数";
			json.data = pln;
			sbsDArr.push(json);

			json = {};
			json.code = "new_proposed_listed_num";
			json.name = "新增拟挂牌公司总数";
			json.data = npln;
			sbsDArr.push(json);
			
			json = {};
			json.code = "lc_volume_num";
			json.name = "挂牌公司总成交数量(万股)";
			json.data = lvn;
			sbsDArr.push(json);
			
			json = {};
			json.code = "mt_volume_num";
			json.name = "做市转让成交数量(万股)";
			json.data = mvn;
			sbsDArr.push(json);
			
			json = {};
			json.code = "lc_turnover_num";
			json.name = "挂牌公司总成交金额(万元)";
			json.data = ltn;
			sbsDArr.push(json);
			
			json = {};
			json.code = "mt_turnover_num";
			json.name = "做市转让成交金额(万元)";
			json.data = mtn;
			sbsDArr.push(json);
			
			json = {};
			json.code = "at_turnover_num";
			json.name = "协议转让成交金额(万元)";
			json.data = atn1;
			sbsDArr.push(json);
			
			json = {};
			json.code = "lc_tp_avg_num";
			json.name = "挂牌公司总成交均价(元)";
			json.data = ltan;
			sbsDArr.push(json);
			
			json = {};
			json.code = "mt_tp_avg_num";
			json.name = "做市转让成交均价(元)";
			json.data = mtan;
			sbsDArr.push(json);
			
			json = {};
			json.code = "at_tp_avg_num";
			json.name = "协议转让成交均价(元)";
			json.data = atan;
			sbsDArr.push(json);
			
			json = {};
			json.code = "lc_transactions_total";
			json.name = "挂牌总成交笔数";
			json.data = ltt;
			sbsDArr.push(json);
			
			json = {};
			json.code = "mt_transactions_total";
			json.name = "做市转让成交笔数";
			json.data = mtt;
			sbsDArr.push(json);
			
			json = {};
			json.code = "at_transactions_total";
			json.name = "协议转让成交笔数";
			json.data = att;
			sbsDArr.push(json);
			jsonD.arr = sbsDArr;
//			console.log(st);
			
			SBSDayData = jsonD;
			drawLine(jsonD,lineColumns, ZXColumns, MJColumns);
			showTable(jsonD);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

//查询三板统计半年一次的数据
function findSBSHYData(){
	$.axs("/betaInvest/indexLibrary/findSBSHYData.do",
			{industryId:industryId,areaId:areaId,dateType:dateType,columns:columns},
			false,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result==null){
				return false;
			}
			
			var lcn = []; //挂牌公司总数
			var mtn = []; //做市转让总数
			var atn = []; //协议转让总数
			var nln = []; //新增挂牌公司数
			var sn = []; //总股本（亿股）
			var fn = []; //流通股本（亿股）
			var ta = []; //总资产合计(万元) 
			var taa = []; //总资产均值(万元) 
			var tna = []; //净资产合计(万元) 
			var tnaa = []; //净资产均值(万元)
			var toi = []; //营业收入合计(万元) 
			var toia = []; //营业收入均值(万元) 
			var tnp = []; //净利润合计(万元) 
			var tnpa = []; //净利润均值(万元)
			var st = []; //日期
			
			$(result.sbsHYData).each(function(){
				lcn.push(this.listedCompanyNum);
				mtn.push(this.marketTransfersNum);
				atn.push(this.agreementTransfersNum);
				nln.push(this.newLcNum);
				sn.push((this.scNum == null ? "" : this.scNum.toFixed(2)));
				fn.push((this.feNum == null ? "" : this.feNum.toFixed(2)));
				ta.push((this.totalAssets == null ? "" : this.totalAssets.toFixed(2)));
				taa.push((this.totalAssetsAvg == null ? "" : this.totalAssetsAvg.toFixed(2)));
				tna.push((this.totalNetAssets == null ? "" : this.totalNetAssets.toFixed(2)));
				tnaa.push((this.totalNetAssetsAvg == null ? "" : this.totalNetAssetsAvg.toFixed(2)));
				toi.push((this.totalOperatingIncome == null ? "" : this.totalOperatingIncome.toFixed(2)));
				toia.push((this.totalOperatingIncomeAvg == null ? "" : this.totalOperatingIncomeAvg.toFixed(2)));
				tnp.push((this.totalNetProfit == null ? "" : this.totalNetProfit.toFixed(2)));
				tnpa.push((this.totalNetProfitAvg == null ? "" : this.totalNetProfitAvg.toFixed(2)));
				st.push(this.statisticsTime);
			})
			
			var jsonD = {"date":st};
			var sdArr = [];
			
			var json = {};
			json.code = "listed_company_num";
			json.name = "挂牌公司总数";
			json.data = lcn;
			sdArr.push(json);
			
			json = {};
			json.code = "market_transfers_num";
			json.name = "做市转让总数";
			json.data = mtn;
			sdArr.push(json);
			
			json = {};
			json.code = "agreement_transfers_num";
			json.name = "协议转让总数";
			json.data = atn;
			sdArr.push(json);
			
			json = {};
			json.code = "new_lc_num";
			json.name = "新增挂牌公司数";
			json.data = nln;
			sdArr.push(json);
			
			json = {};
			json.code = "sc_num";
			json.name = "总股本（亿股）";
			json.data = nln;
			sdArr.push(json);
			
			json = {};
			json.code = "fe_num";
			json.name = "流通股本（亿股）";
			json.data = fn;
			sdArr.push(json);
			
			json = {};
			json.code = "total_assets";
			json.name = "总资产合计(万元) ";
			json.data = ta;
			sdArr.push(json);
			
			json = {};
			json.code = "total_assets_avg";
			json.name = "总资产均值(万元) ";
			json.data = taa;
			sdArr.push(json);
			
			json = {};
			json.code = "total_net_assets";
			json.name = "净资产合计(万元) ";
			json.data = tna;
			sdArr.push(json);
			
			json = {};
			json.code = "total_net_assets_avg";
			json.name = "净资产均值(万元)";
			json.data = tnaa;
			sdArr.push(json);
			
			json = {};
			json.code = "total_operating_income";
			json.name = "营业收入合计(万元) ";
			json.data = toi;
			sdArr.push(json);
			
			json = {};
			json.code = "total_operating_income_avg";
			json.name = "营业收入均值(万元) ";
			json.data = toia;
			sdArr.push(json);
			
			json = {};
			json.code = "total_net_profit";
			json.name = "净利润合计(万元) ";
			json.data = tnp;
			sdArr.push(json);
			
			json = {};
			json.code = "total_net_profit_avg";
			json.name = "净利润均值(万元)";
			json.data = tnpa;
			sdArr.push(json);
			
//			console.log(pmArr);
			jsonD.arr = sdArr;
//			console.log(jsonD);
			
			SBSHYData = jsonD;
			drawLine(jsonD,lineColumns, ZXColumns, MJColumns);
			showTable(jsonD);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

//查询月统计的融资数据
function findSBSMData(){
	$.axs("/betaInvest/indexLibrary/findSBSMData.do",
			{industryId:industryId,dateType:dateType,columns:columns},
			false,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result==null){
				return false;
			}
			
			var ct = []; //融资企业家数
			var ft = []; //融资事件次数
			var as = []; //融资总额
			var am = []; //最高单笔融资金额
			var aa = []; //平均融资金额
			var AQQGR = []; //融资金额环比增长率
			var PNGR = []; //融资事件次数环比增长率
			var dt = []; //日期
			$(result.SBSMData).each(function(){
				ct.push(this.companyTotal);
				ft.push(this.financeTotal);
				as.push((this.amountSum == null ? "" : this.amountSum.toFixed(2)));
				am.push((this.amountMax == null ? "" : this.amountMax.toFixed(2)));
				aa.push((this.amountAvg == null ? "" : this.amountAvg.toFixed(2)));
				AQQGR.push((this.AQQGR == null ? "" : this.AQQGR.toFixed(2)));
				PNGR.push((this.PNGR == null ? "" : this.PNGR.toFixed(2)));
				dt.push(this.dateTime);
			})
			
			var jsonD = {"date":dt};
			var pmArr = [];
			
			var json = {};
			json.code = "companyTotal";
			json.name = "融资企业家数";
			json.data = ct;
			pmArr.push(json);
			
			json = {};
			json.code = "financeTotal";
			json.name = "融资事件次数";
			json.data = ft;
			pmArr.push(json);
			
			json = {};
			json.code = "amountSum";
			json.name = "融资总额";
			json.data = as;
			pmArr.push(json);
			
			json = {};
			json.code = "amountMax";
			json.name = "最高单笔融资金额";
			json.data = am;
			pmArr.push(json);
			
			json = {};
			json.code = "amountAvg";
			json.name = "平均融资金额";
			json.data = aa;
			pmArr.push(json);
			
			json = {};
			json.code = "AQQGR";
			json.name = "融资金额环比增长率";
			json.data = AQQGR;
			pmArr.push(json);
			
			json = {};
			json.code = "PNGR";
			json.name = "融资事件次数环比增长率";
			json.data = PNGR;
			pmArr.push(json);
//			console.log(pmArr);
			jsonD.arr = pmArr;
//			console.log(jsonD);
			
			SBSMData = jsonD;
			drawLine(jsonD,lineColumns, ZXColumns, MJColumns);
			showTable(jsonD);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

//查询定增月的统计数据
function findPlaceMData(){
	$.axs("/betaInvest/indexLibrary/findPlaceMData.do",
			{placeType:placeType,dateType:dateType,columns:columns},
			false,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result==null){
				return false;
			}
			
			var pc = []; //增发次数
			var ct = []; //增发公司家数
			var pn = []; //增发数量(万股)
			var rp = []; //募资总额(亿元)
			var dt = []; //日期
			$(result.mData).each(function(){
				pc.push(this.placeCount);
				ct.push(this.companyTotal);
				pn.push((this.privateNum == null ? "" : this.privateNum.toFixed(2)));
				rp.push((this.raisePrice == null ? "" : this.raisePrice.toFixed(2)));
				dt.push(this.dateTime);
			})
			
			var jsonD = {"date":dt};
			var pmArr = [];
			
			var json = {};
			json.code = "placeCount";
			json.name = "增发次数";
			json.data = pc;
			pmArr.push(json);
			
			json = {};
			json.code = "companyTotal";
			json.name = "增发公司家数";
			json.data = ct;
			pmArr.push(json);
			
			json = {};
			json.code = "privateNum";
			json.name = "增发数量(万股)";
			json.data = pn;
			pmArr.push(json);
			
			json = {};
			json.code = "raisePrice";
			json.name = "募资总额(亿元)";
			json.data = rp;
			pmArr.push(json);
			
//			console.log(pmArr);
			jsonD.arr = pmArr;
//			console.log(jsonD);
			
			PlaceMData = jsonD;
			drawLine(jsonD,lineColumns, ZXColumns, MJColumns);
			showTable(jsonD);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

//查询投资人月统计数据
function findInvestorMData(){
	$.axs("/betaInvest/indexLibrary/findInvestorMData.do",
			{investorsType:investorsType,dateType:dateType,columns:columns},
			false,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result==null){
				return false;
			}
			
			var it = []; //投资事件总数
			var is = []; //投资总金额
			var nd = []; //日期
			$(result.investorData).each(function(){
				it.push(this.invesTotal);
				is.push((this.investSum == null ? "" : this.investSum.toFixed(2)));
				nd.push(this.noticeDate);
			})
			
			var jsonD = {"date":nd};
			var imArr = [];
			
			var json = {};
			json.code = "invesTotal";
			json.name = "投资事件总数";
			json.data = it;
			imArr.push(json);
			
			json = {};
			json.code = "investSum";
			json.name = "投资总金额";
			json.data = is;
			imArr.push(json);
			
//			console.log(imArr);
			jsonD.arr = imArr;
//			console.log(jsonD);
			
			InvestorMData = jsonD;
			drawLine(jsonD,lineColumns, ZXColumns, MJColumns);
			showTable(jsonD);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

//查询行情天的统计数据
function findQTDData(){
	$.axs("/betaInvest/indexLibrary/findQTDData.do",
			{stockCode:zsCode,dateType:dateType,columns:columns},
			false,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result==null){
				return false;
			}
			
			var np = []; //指数
			var pcr = []; //涨跌幅
			var dt = []; //日期
			$(result.qtdData).each(function(){
				np.push((this.newPrice == null ? "" : this.newPrice.toFixed(2)));
				pcr.push((this.pcr == null ? "" : this.pcr.toFixed(2)));
				dt.push(this.dataTime);
			})
			var jsonD = {"date":dt};
			var qtdArr = [];
			
			var json = {};
			json.code = "newPrice";
			json.name = "指数";
			json.data = np;
			qtdArr.push(json);
			
			json = {};
			json.code = "pcr";
			json.name = "涨跌幅";
			json.data = pcr;
			qtdArr.push(json);
			
			jsonD.arr = qtdArr;
			
			QTDData = jsonD;
			drawLine(jsonD,lineColumns, ZXColumns, MJColumns);
			showTable(jsonD);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

//查询做市商天统计数据
function findMMDData(){
	$.axs("/betaInvest/indexLibrary/findMMDData.do",
			{mmName:mmName,dateType:dateType,columns:columns},
			false,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result==null){
				return false;
			}
			
			var rn = []; //推荐家数
			var sn = []; //成功家数
			var dt = []; //日期
			$(result.mmdData).each(function(){
				rn.push(this.recommendNum);
				sn.push(this.successNum);
				dt.push(this.dateTime);
			})
			var jsonD = {"date":dt};
			var mdArr = [];
			
			var json = {};
			json.code = "recommendNum";
			json.name = "推荐家数";
			json.data = rn;
			mdArr.push(json);
			json = {};
			json.code = "successNum";
			json.name = "成功家数";
			json.data = sn;
			mdArr.push(json);
			
			jsonD.arr = mdArr;
			
			MMDData = jsonD;
			drawLine(jsonD,lineColumns, ZXColumns, MJColumns);
			showTable(jsonD);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

//查询中介机构天统计数据
function findEIDData(){
	$.axs("/betaInvest/indexLibrary/findEIDData.do",
			{orType:orType,orName:orName,dateType:dateType,columns:columns},
			false,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result==null || result.eidData == null){
				return false;
			}
			
			var rn = []; //推荐家数
			var sn = []; //成功家数
			var dt = []; //日期
			$(result.eidData).each(function(){
				rn.push(this.recommendNum);
				sn.push(this.successNum);
				dt.push(this.dateTime);
			})
			var jsonD = {"date":dt};
			var eiArr = [];
			
			var json = {};
			json.code = "recommendNum";
			json.name = "推荐家数";
			json.data = rn;
			eiArr.push(json);
			json = {};
			json.name = "成功家数";
			json.code = "successNum";
			json.data = sn;
			eiArr.push(json);
			jsonD.arr = eiArr;
			
			EIDData = jsonD;
			drawLine(jsonD,lineColumns, ZXColumns, MJColumns);
			showTable(jsonD);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

/**
 * 查询融资排行
 */
function findFinanceRanking(){
	$.axs("/betaInvest/rankingList/findFinanceRanking.do",
			{industryId:industryId,dateType:dateType,orderColumn:orderColumn},
			false,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result==null){
				return false;
			}
			
			var sa = []; //融资总金额
			var at = []; //融资总次数
			var scSN = []; //股票代码与名称
			$(result).each(function(){
				sa.push((this.sumAmount == null ? "" : this.sumAmount.toFixed(2)));
				at.push(this.amountTotal);
				scSN.push(this.stockName + "("+this.stockCode+")");
			})
			var jsonD = {"date":scSN};
			var frArr = [];
			
			var json = {};
			json.code = "sumAmount";
			json.name = "融资总金额";
			json.data = sa;
			frArr.push(json);
			json = {};
			json.code = "amountTotal";
			json.name = "融资总次数";
			json.data = at;
			frArr.push(json);
			jsonD.arr = frArr;
			
			frData = jsonD;
			drawLine(jsonD,lineColumns, ZXColumns, MJColumns);
			showTable(jsonD);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

/**
 * 查询投资排行
 */
function findInvestRanking(){
	$.axs("/betaInvest/rankingList/findInvestRanking.do",
			{investorsType:investorsType,dateType:dateType,orderColumn:orderColumn},
			false,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result==null){
				return false;
			}
			
			var it = []; //投资事件总数
			var is = []; //投资总金额
			var scSN = []; //股票代码与名称
			$(result).each(function(){
				it.push(this.investTotal);
				is.push((this.investSum == null ? "" : this.investSum.toFixed(2)));
				scSN.push(this.stockName + "("+this.stockCode+")");
			})
			var jsonD = {"date":scSN};
			var firArr = [];
			
			var json = {};
			json.code = "investTotal";
			json.name = "投资事件总数";
			json.data = it;
			firArr.push(json);
			json = {};
			json.code = "investSum";
			json.name = "投资总金额";
			json.data = is;
			firArr.push(json);
			jsonD.arr = firArr;
			
			firData = jsonD;
			
			drawLine(jsonD,lineColumns, ZXColumns, MJColumns);
			showTable(jsonD);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

/**
 * 查询交易排行
 */
function findBtTradingWas(){
	$.axs("/betaInvest/shareIndex/findBtTradingWas.do",
			{industryId:industryId,dateType:dateType,orderColumn:orderColumn},
			false,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result==null){
				return false;
			}
			
			var op = []; //开盘价
			var cp = []; //收盘价
			var map = []; //最高价
			var mip = []; //最低价
			var da = []; //成交量
			var ds = []; //成交额
			var scSN = []; //股票代码与名称
			$(result).each(function(){
				op.push((this.openinPprice == null ? "" : this.openinPprice.toFixed(2)));
				cp.push((this.closingPrice == null ? "" : this.closingPrice.toFixed(2)));
				map.push((this.maxPrice == null ? "" : this.maxPrice.toFixed(2)));
				mip.push((this.minPrice == null ? "" : this.minPrice.toFixed(2)));
				da.push((this.dealAmount == null ? "" : this.dealAmount.toFixed(2)));
				ds.push((this.dealSum == null ? "" : this.dealSum.toFixed(2)));
				
				scSN.push(this.stockName + "("+this.stockCode+")");
			})
			var jsonD = {"date":scSN};
			var bwArr = [];
			
			var json = {};
			json.code = "opening_price";
			json.name = "开盘价";
			json.data = op;
			bwArr.push(json);
			json = {};
			json.code = "closing_price";
			json.name = "收盘价";
			json.data = cp;
			bwArr.push(json);
			jsonD.arr = bwArr;
			json = {};
			json.code = "max_price";
			json.name = "最高价";
			json.data = map;
			bwArr.push(json);
			jsonD.arr = bwArr;
			json = {};
			json.code = "min_price";
			json.name = "最低价";
			json.data = mip;
			bwArr.push(json);
			jsonD.arr = bwArr;
			json = {};
			json.code = "deal_amount";
			json.name = "成交量（万股）";
			json.data = da;
			bwArr.push(json);
			jsonD.arr = bwArr;
			json = {};
			json.code = "deal_sum";
			json.name = "成交额（万元）";
			json.data = ds;
			bwArr.push(json);
			jsonD.arr = bwArr;
			
			bwData = jsonD;
			
			drawLine(jsonD,lineColumns, ZXColumns, MJColumns);
			showTable(jsonD);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

/**
 * 查询财务指标
 */
function findFinancialData(){
	$.axs("/betaInvest/shareIndex/findFinancialData.do",
			{stockCode:stockCode,dateType:dateType,financeIndicatorIds:financeIndicatorIds/*fids.substring(0, fids.length - 1)*/},
			false,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result==null){
				return false;
			}
			var jsonD = {};
			var dateTime = []; //日期集合
			var fdArr = [];
			var leibie_zhibiao_data={}; //{指标名称:数据,指标名称:数据}
			var fsplit = financeIndicatorIds.split(",");
			$(fsplit).each(function(){
//				console.log(this)
				leibie_zhibiao_data[this] = [];
			})
			$(result).each(function(i,obj){
				var reportPeriod = obj.reportPeriod;
				if(reportPeriod.indexOf("FY") > -1){
					reportPeriod=reportPeriod.substring(0,4)+"-12";
				}else if(reportPeriod.indexOf("HY") > -1){
					reportPeriod=reportPeriod.substring(0,4)+"-06";
				}
				dateTime.push(reportPeriod);
				
				for(var column in obj){ //column就是指标名
					if(leibie_zhibiao_data[column]!=undefined){
						leibie_zhibiao_data[column].push(obj[column]);
					}
				}
//				fdArr.push(leibie_zhibiao_data);
			})
			var allZBName = {};
			var zbSplit=zbText.split(",");
			$(financeIndicatorIds.split(",")).each(function(index, item){
//				console.log(this)
				allZBName[item] = zbSplit[index];
			})
			for (var i = 0; i < fsplit.length; i++) {
				var json={};
//				console.log(leibie_zhibiao_data[fsplit[i]])
				var dd=leibie_zhibiao_data[fsplit[i]];
				json.code = fsplit[i];
				json.name=allZBName[fsplit[i]];
				json.data=dd;
				fdArr.push(json);
			}
			
//			console.log(fdArr)
			
			jsonD.date = dateTime;
			jsonD.arr = fdArr;
			
			zbData = jsonD;
			drawLine(jsonD,lineColumns, ZXColumns, MJColumns);
			showTable(jsonD);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

/**
 * 显示表格
 */
function showTable(tableData){
	var showColumns = "";
	if(columns != null && columns != ""){
		showColumns = columns;
	}
	if(orderColumn != null && orderColumn != ""){
		showColumns = orderColumn;
	}
	if(financeIndicatorIds != null && financeIndicatorIds != ""){
		showColumns = financeIndicatorIds;
	}
	var dateHtml = "<th>指标名称</th>";
	$(tableData.date).each(function(){
		dateHtml += "<th>"+this+"</th>";
	})
	$("#dateTr").html(dateHtml);
	
	var bodyHtml = "";
	var split = showColumns.split(",");
	$(tableData.arr).each(function(index, item){
		$(split).each(function(){
			if(item.code == this){
//				console.log(item.code + "====" + this)
				bodyHtml += "<tr>"
					+ "<td>"+item.name+"</td>";
				$(item.data).each(function(index, itemd){
//					console.log(itemd)
					bodyHtml += "<td>"+ (itemd == null ? "--" : itemd) +"</td>";
				})
					bodyHtml += "</tr>";
			}
		})
	})
	$("#msgTbody").html(bodyHtml);
}

//折线图
function drawLine(chartData,showLineColumns,showZXColumns,showAreaColumns) {
	var showBFB = 100;
	if(chartData.date.length != 0 && chartData.date != null){
		showBFB = (10/chartData.date.length)*100;
	}
	var myChart = echarts.init(document.getElementById('yulan_tu'));
	option = {
		title:{
			text:chartName
//		    left:'center'
		},
		animation:false,
		color: ['#7cb5ec', '#f7a35c'],
//		legend: {
//			data: ['近利润(万)'],
//			top: '10px'
//
//		},
		toolbox: {
			show: true,
			feature: {
				saveAsImage: {
					show: true,
					title:'保存图片',
	        icon:'image:///saasBeta/images/ave.png'

				}
			},
			top: '10px'
		},
		tooltip: {
			show:true,
        	trigger:'axis',
			formatter:function(params){
				//7月4号玲修改提示弹窗start
				var content='';
				$(params).each(function(index,item){
//					var yushu=index%params.length;
					var bg=color[index];
					//console.log(item)
					content+='<div class="sb_tips_content">';
	    			content+='<span class="tips_leibie fl"  style="background:'+bg+';">'+item.seriesName+'</span>';
	    			content+='<span class="tips_leibie_num fl">'+ ((item.data == undefined || item.data == null || item.data == undefined || (item.data == "" && item.data != 0)) ? "--" : item.data) +'</span>';
	    			content+='<div class="clr"></div>';
	    			content+='</div>';
					
				});
				var divHtml='<div class="sanban_tips">'+
	    					'<p class="sb_tips_title">'+params[0].name+'</p>'+content+'</div>';
	    			return divHtml;
			}
		},
		dataZoom: [{
            show: true,
            realtime: true,
            start: 0,
            end:showBFB
        },
        {
            type: 'inside',
            realtime: true,
            start: 0,
            end: showBFB
        }],
		xAxis: [{
			type: 'category',
			data: chartData.date,
			boundaryGap : true,
			show : true,  
	        axisLabel:{//wtl 7.6  3118 所有系统只带公司简称的都需要加链接包括柱形图下面的
	            interval:0,
	            clickable:true
	        },
			triggerEvent:true
		}],
		yAxis: [{
			type: 'value',
			name: '',
			axisLabel: {
				formatter: '{value}'
			}
		}],
		grid: {
			left: '1%',
			right: '1%',
			containLabel: true
		},
		series: [/*{
			name: '净利润金额(万)',
			type: 'line',
			data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
			//data:tradingVolume
			label: {
				normal: {
					show: true,
					position: 'top'
				}
			}
		}*/]
	};
	var legendDataArr = []; //显示的legend
	if(showLineColumns != "" && showLineColumns != null){ //折线图
		var showLineArr = showLineColumns.split(",");
		$(chartData.arr).each(function(index, lineItem){
			$(showLineArr).each(function(){
				if(this == lineItem.code){
					for (var int = 0; int < lineItem.data.length; int++) {
						lineItem.data[int] = (lineItem.data[int] == null ? 0 : lineItem.data[int]);
					}
					var serData = {
							name: lineItem.name,
							type: 'line',
							symbol: 'circle',
							data: lineItem.data,
							//data:tradingVolume
							label: {
								normal: {
									show: true,
									position: 'top'
								}
							}
						};
					option.series.push(serData);
					legendDataArr.push(lineItem.name);
				}
			})
		})
	}
	if(showZXColumns != "" && showZXColumns != null){ //柱形图
		var showZXArr = showZXColumns.split(",");
		$(chartData.arr).each(function(index, zxItem){
			$(showZXArr).each(function(){
				if(this == zxItem.code){
					for (var int = 0; int < zxItem.data.length; int++) {
						zxItem.data[int] = (zxItem.data[int] == null ? 0 : zxItem.data[int]);
					}
					var serData = {
							name: zxItem.name,
							type: 'bar',
							data: zxItem.data,
							//data:tradingVolume
							label: {
								normal: {
									show: true,
									position: 'top'
								}
							}
						};
					option.series.push(serData);
					legendDataArr.push(zxItem.name);
				}
			})
		})
	}
	if(showAreaColumns != "" && showAreaColumns != null){ //面积图
		var showAreaArr = showAreaColumns.split(",");
		$(chartData.arr).each(function(index, areaItem){
			$(showAreaArr).each(function(){
				if(this == areaItem.code){
					for (var int = 0; int < areaItem.data.length; int++) {
						areaItem.data[int] = (areaItem.data[int] == null ? 0 : areaItem.data[int]);
					}
					var serData = {
				            name:areaItem.name,
				            type:'line',
				            smooth:true,
				            symbol: 'none',
				            sampling: 'average',
				            itemStyle: {
				                normal: {
				                    color: 'rgb(255, 70, 131)'
				                }
				            },
				            areaStyle: {
				                normal: {
				                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
				                        offset: 0,
				                        color: 'rgb(255, 158, 68)'
				                    }, {
				                        offset: 1,
				                        color: 'rgb(255, 70, 131)'
				                    }])
				                }
				            },
				            data: areaItem.data
				        };
					option.series.push(serData);
					legendDataArr.push(areaItem.name);
				}
			})
		})
	}
	var legend = {     
			top: '10px',
			data:legendDataArr
		 };
	option.legend = legend;
	myChart.setOption(option);
	window.addEventListener("resize", function() {
		myChart.resize();
	});
	//wtl 7.6  3118 所有系统只带公司简称的都需要加链接包括柱形图下面的
	myChart.on('click', function (params) {
		if(params.componentType == "xAxis"){
			var pv = params.value;
			if(pv != "" && pv != null){
				if(pv.indexOf("(") > -1 && pv.indexOf(")") > -1){
					var stockName = pv.substring(0, pv.indexOf("("));
					var stockCode = pv.substring(pv.indexOf("(") + 1, pv.indexOf(")"));
					location.href = "/businessDetails/newTBindex.html?stockCode="+stockCode+"&stockName="+stockName;
				}
			}
		}
    });
}

/**
 * 通过URL获取参数值
 */
function getParamByUrl(paramName){
	var param = "";
	var reg = new RegExp("(^|&)"+paramName+"=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); // 匹配目标参数
	if(r != null){
		param = decodeURIComponent(r[2]);
	}
	param = encodeURI(param);
	return param;
}