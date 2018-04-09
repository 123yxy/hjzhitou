/**
 *  
 *
 */
var UTIL = {
	DEBUG: false,
	RequestPakage: {},
	CONFIG: {

		localhost: "http://127.0.0.1:8088/page/",
		//wwwhost: "http://192.168.1.143",
		// wwwhost: "http://192.168.1.64",
		// wwwhost: "http://yanbao.159jh.com",
		wwwhost: "http://" + location.host,//+"/znty",
		// twohis: "/betaInvest/topTenShareholderHis/findTWOHis.do",//股本变动情况
		tologin: "/user/appUser/toLogin.do",//登陆
		verificationCode: "/user/common/verificationCode.do",//验证码
		isHaveUser: "/user/appUser/isHaveUser.do",//用户注册用户检查
		insertUser: "/user/appUser/insertUser.do",//用户注册
		updatePassWord: "/user/appUser/updatePassWord.do",//找回密码
		isYPassword: "/user/appUser/isYPassword.do",//判断新密码是否和原密码相同
		uploadUserAvatar: "/user/appUser/uploadUserAvatar.do",//头像上传
		findAppUser: "/user/appUser/findAppUser.do",//用户信息
		updateSignature: "/user/appUser/updateSignature.do",//修改某一信息
		findNotionCon: "/betaInvest/common/findNotionCon.do",//查询关注行业
		updatetUser: "/user/appUser/updatetUser.do",//完善资料
		cancelLogin: "/user/appUser/cancelLogin.do",//退出登录
		validationCode: "/user/appUser/validationCode.do",//验证码有效性
		updatePwd: "/user/appUser/updatePwd.do",//找回密码
		findZJList: "/betaInvest/zntyZjMsg/findZJList.do", //获取章节信息

		companyIntroduction: "/betaInvest/mobileResearch/findIntroduction.do",//企业简介
		businessInformation: "/betaInvest/mobileResearch/findBusinessInformation.do",//查询工商信息
		findStructureTable: "/betaInvest/capitalStructure/findStructure.do", //查询股本变动的表格
		findRiskClassNum: "/betaInvest/risk/findRiskClassNum.do",//风险信息
		findLegal: "/betaInvest/risk/findLegal.do",//法律诉讼
		findAffiche: "/betaInvest/risk/findAffiche.do",//欠税公告
		findPledged: "/betaInvest/risk/findPledged.do",//股权出质
		findAbnormal: "/betaInvest/risk/findAbnormal.do",//经营异常
		findAllMainBusiness:"/betaInvest/operatingConditions/findAllMainBusiness.do",//主营业务修改
		findAllMainBusinessPay:"/betaInvest/operatingConditions/findAllMainBusinessPay.do",//主营业务按年查
		findByNameAndCode: "/betaInvest/operatingConditions/findByNameAndCode.do",//查看主营业务的历史数据
		findSCInfo: "/betaInvest/operatingConditions/findSCInfo.do",//上下游关系文案描述
		findIssueListInfo:"/betaInvest/mobileResearch/findIssueListInfo.do",//投融关系描述
		findShareholdersReportDate:"/betaInvest/mobileResearch/findShareholdersReportDate.do",//查咨十大股东的报告期
		findShareRelationShip:"/betaInvest/mobileResearch/findShareRelationShip.do",//十大股东关系说明

		findIsPay:"/betaInvest/common/findIsPay.do",//用户是否缴费
		doOrder: "/pay-order/wechatpay/doOrder.do",//创建订单信息
		findOrderInfo: "/betaInvest/order/findOrderInfo.do",//查询订单信息
		checkOrder: "/pay-order/wechatpay/checkOrder.do",//支付完成后主动查询订单信息
		findOrderInfoByUser:"/betaInvest/order/findOrderInfoByUser.do",//查询用户所有的订单信息
		findPayParam:"/pay-order/wechatpay/findPayParam.do",//点击立即支付

		patentList: "/betaInvest/mobileResearch/findPatentList.do", //本公司拥有的专利列表
		copyrightList: "/betaInvest/mobileResearch/findCopyrightList.do", //本公司拥有的著作权列表
		patentDetail: "/betaInvest/mobileResearch/findPatentDetail.do", //专利详情
		copyrightDetail: "/betaInvest/mobileResearch/findCopyrightDetail.do", //著作详情
		enlisted: "/betaInvest/mobileResearch/findListed.do", //挂牌信息
		shareholders: "/betaInvest/mobileResearch/findShareholders.do", //十大股东情况图表和饼状图
		eventList: "/betaInvest/mobileResearch/findEventList.do", //重大事件图表
		eventDetail: "/betaInvest/mobileResearch/findEventDetail.do", //重大事件详情列表
		issueList: "/betaInvest/mobileResearch/findIssueList.do", // 融资情况列表
		issueDetail: "/betaInvest/mobileResearch/findIssueDetail.do", //发行对象列表
		investmentAnalysis: "/betaInvest/mobileResearch/findInvestmentAnalysis.do", //投融资分析汇总
		tradeList: "/betaInvest/mobileResearch/findTrade.do", //交易情况
		industryRemark: "/betaInvest/mobileResearch/findRemark.do", //行业简介
		mainbusiness: "/betaInvest/mobileResearch/findMainbusiness.do", //主要产品及服务
		findMarketInventory: "/betaInvest/mobileResearch/findMarketInventory.do",//做市商家数
		findKLineDatas: "/betaInvest/kLineChart/findKLineDatas.do",//K线图
		findMarketInventoryN: "/betaInvest/mobileResearch/findMarketInventoryN.do",//做市商家数

		findACMsg: "/betaInvest/enterpriseData/findACMsg.do", //查询控股股东，实际控制人信息，商业模式，未来规划，普通股股东人数
		findNewYW: "/betaInvest/operatingConditions/findNewYW_2.do", //查询主营业务收入 20171018 shiqi
		findJZDS: "/betaInvest/industryCompete/findJZDS.do", //查询同行业竞争对手
		findSC: "/betaInvest/operatingConditions/findSC.do", //查询主要供应商和主要客户
		findRiskTipsByCode: "/betaInvest/riskTips/findRiskTipsByCode.do", //查询经营风险提示
		findTWOHis: "/betaInvest/topTenShareholderHis/findTWOHis.do", //查询股本变动的图表信息
		findStaffData: "/betaInvest/staffSituation/findStaffData.do", //查询员工信息
		findSXYRelationChart: "/betaInvest/relationChart/findSXYRelationChart.do",//上下游关系图
		findResourceRelation: "/betaStock/equityTies/findResourceRelation.do", //查询上下游关系数据
		findDignForSurvey: "/betaInvest/dignitary/findDignForSurvey.do", //查询员工信息
		findDetailHeder: "/betaInvest/common/findDetailHeder.do", //查询实时行情
		canRead: "/betaInvest/readReportHis/canRead.do", //查询是否可以阅读研报
		findBusinessIncome: "/betaInvest/financeChange/findYYSRZZL.do",//查询营业收入及同比增长率  /betaInvest/financeChange/findYYSRZZL.do
		findTotalProfit: "/betaInvest/financeChange/findLRZEZZL.do",//查询利润总额及同比增长率 /betaInvest/financeChange/findLRZEZZL.do
		findNetProfit: "/betaInvest/financeChange/findJLRZZL.do",//净利润及同比增长率  /betaInvest/financeChange/findJLRZZL.do
		findTotalAssets: "/betaInvest/financeChange/findZZCZZL.do",//总资产及同比增长率  /betaInvest/financeChange/findZZCZZL.do
		findInterestRateChange: "/betaInvest/financeChange/findXSLV.do",//销售毛利率与销售净利率变动情况  /betaInvest/financeChange/findXSLV.do
		findSwot: "/betaInvest/btSwot/findSwotByCode.do",//优劣势
		searchData: "/betaInvest/searchReport/searchData.do", //模糊查询搜索结果
		findDataSourse: "/betaInvest/dataResourse/findDataSourse.do", //查询数据来源
		findHotKey: "/betaInvest/hot/findHotKey.do",//查询首页关键词
		findHotYb: "/betaInvest/hot/findHotYb.do",//查询热搜研报
		findHisYb: "/betaInvest/hot/findHisYb.do",//查询历史研报
		findSearchHis: "betaInvest/searchReport/findSearchHis.do",//查询历史搜索
		delHisByIds: "betaInvest/searchReport/delHisByIds.do",//删除历史记录


		findIndustryAnalysis: "/betaInvest/categoryIndex/findCategoryIndexDataByStockCode.do",//查询所处行业的图表/betaInvest/categoryIndex/findCategoryIndexDataByStockCode.do



		findFinanceKernelData: "/betaInvest/financeChange/findFinanceKernelData.do",//财务核心数据
		findFinanceKernelDataStockInTrade: "/betaInvest/financeChange/findFinanceKernelDataStockInTrade.do",//财务核心数据-同行业公司名称
		findIFinanceData:'/betaInvest/financeChange/findIFinanceData.do',//查询财务数据的的对标数据
		findProfitData: "/betaInvest/financeChange/findProfitData.do",//公司盈利情况
		findGroupData: "/betaInvest/financeChange/findGroupData.do",//公司成长情况
		findPayData: "/betaInvest/financeChange/findPayData.do",//偿债能力
		findOperationData: "/betaInvest/financeChange/findOperationData.do",//运营情况
		findFinanceDepthData: "/betaInvest/financeChange/findFinanceDepthData.do",//财务深度分析
		findFinanceModelData: "/betaInvest/financeChange/findFinanceModelData.do",//综合能力模型分析
		findDubangData: "/betaInvest/financeChange/findDubangData.do",//财务杜邦分析
		findProfitForecastData: "/betaInvest/financeChange/findProfitForecastData.do",//盈利预测


		findOutboundInvestment: "/betaInvest/risk/findOutboundInvestment.do",//盈利预测
		findFinanceCover: "/betaInvest/financeChange/findFinanceCover.do",//封面财务数据	
		findIndexData: "/betaInvest/mobileResearch/findIndexData.do",//获取首页数据
		findTradeHy:"/betaInvest/mobileResearch/findTradeHy.do",//查询行业交易情况
		
		
		//1.7 私募基金投资情况 20171011
		findSmjj: "/betaInvest/mobileResearch/findSmjj.do",
		//1.3 历史沿革 20171011
		findhEvolution: "/betaInvest/mobileResearch/findhEvolution.do",

		//3.1审计意见 20171018
		findAuditReport: "/betaInvest/auditReport/findAuditReport.do",

		//2.1.2主营业务收入 20171019
		findByTimeAndCode: "/betaInvest/operatingConditions/findByTimeAndCode.do",

		isLogin: "/user/appUser/isLogin.do",//判断登陆session

		//查询版本 20171025
		findZntyVersion: "/betaInvest/mobileResearch/findZntyVersion.do",

		//历史研报 20171025
		findResearchReport: "/betaInvest/mobileResearch/findResearchReport.do",

		//删除历史研报 20171028
		deleteResearchReport: "/betaInvest/mobileResearch/deleteResearchReport.do",

		//附录公告 20171028
		findCompanyAnnouncement: "/betaInvest/mobileResearch/findCompanyAnnouncement.do",
		
		
		//A股接口
		AcanRead: "/seinvest/readReportHis/canRead.do", //查询是否可以阅读研报
		AfindStock: "/seinvest/company/findStock.do",//首页A股搜索框的自动补全接口
		AfindZJList: "/seinvest/zntyZjMsg/findZJList.do", //获取章节信息
		AfindCompanyMsgByCode: "/seinvest/company/findCompanyMsgByCode.do",//查询工商信息
		AfindStockSummary:"/seinvest/company/findStockSummary.do",//查询公司概要
		AfindKLineDatas: "/seinvest/kLine/findKLineDatas.do",//K线图
		AfindNewDigData:"/seinvest/dignitary/findNewDigData.do",//查询董监高信息
		AfindStaffData: "/seinvest/staff/findStaffData.do", //查询员工信息
		
		AsearchData: "/seinvest/searchReport/searchData.do",//查选搜索结果页
		AfindAguYb: "/seinvest/hot/findHotYb.do",//A股研报
		AfindGongSixxjj:'/seInvest/company/findCompanyMsgByCode.do',//公司简介和信息
		AfindZhuYaoChanPinFuWu:'/seinvest/company/findCompanyMsgByCode.do',//主要产品和服务
		AfindZhuYingYeWuShouRu:'/seinvest/mainBusiness/findBusinessChangeData.do',//主营业务收入
		AfindGsDzjyqk:'/seinvest/dzjy/findOneYearData.do',//大宗交易
		AfindBingGou:'/seinvest/bgZccz/findBZData.do',//并购重组
		AfindBGDetails: "/seinvest/bgZccz/findBGDetails.do",//并购的详情信息
		AfindZengFa:'/seinvest/zf/findZFData.do',//增发
		AfindPeiGu:"/seinvest/pg/findPgData.do",//配股
		AfindFenHong:'/seinvest/fg/findFhData.do',//分红
		AfindGuQuanBianDong:'/seinvest/dignitary/findDBDData.do',//董监高股权变动
		AfindTingFuPai:'/seinvest/tfp/findTfpByDate.do',//停复牌
		AfindYuanGongChiGu:'/seinvest/staff/findStaffPlansData.do',//员工持股计划
		AfindZhaiJuanFaXing:'/seinvest/notice/findNoticeByType.do',//债券发行公告
		AfindDuiWaiTouZi:'/seinvest/outInvestment/findOIByCode.do',//对外投资
		AfindJieJinYuGao:'/seinvest/jjyg/findJJYGData.do',//解禁预告
		AfindGongYingShang:'/seinvest/majorSuppliers/findNewMSData.do',//供应商
		AfindKeHu:'/seinvest/majorCustomer/findMCNewData.do',//客户
		AfindLegal: "/seinvest/risk/findLegalData.do",//法律诉讼
		AfindOAData: "/seinvest/risk/findOAData.do",//欠税公告
		AfindEPData: "/seinvest/risk/findEPData.do",//股权出质
		AfindAbnormal: "/seinvest/risk/findAbnormalData.do",//经营异常
		AfindShidagudong:'/seinvest/shareHolder/findGDList.do',//十大股东
		AfindShidagudongsj:'/seinvest/shareHolder/findDateList.do',//十大股东时间
		AfindGudongrenshu:'/seinvest/shareHolder/findSHChangeList.do',//股东人数
		AfindJingZhengDuiShou:'/seinvest/jzds/findJzdsData.do',//主要竞争对手数据
		AfindAllMainBusiness:"/seinvest/operatingConditions/findAllMainBusiness.do",//主要产品和服务
		AfindAllMainBusinessPay:"/seinvest/operatingConditions/findAllMainBusinessPay.do",//主营业务收入

		AfindIndustryReMark: "/seinvest/industry/findIndustryReMark.do",//查询行业介绍
		AfindBusinessIncome: "/seinvest/financeChange/findYYSRZZL.do",//查询营业收入及同比增长率  /betaInvest/financeChange/findYYSRZZL.do
		AfindTotalProfit: "/seinvest/financeChange/findLRZEZZL.do",//查询利润总额及同比增长率 /betaInvest/financeChange/findLRZEZZL.do
		AfindNetProfit: "/seinvest/financeChange/findJLRZZL.do",//净利润及同比增长率  /betaInvest/financeChange/findJLRZZL.do
		AfindTotalAssets: "/seinvest/financeChange/findZZCZZL.do",//总资产及同比增长率  /betaInvest/financeChange/findZZCZZL.do
		AfindInterestRateChange: "/seinvest/financeChange/findXSLV.do",//销售毛利率与销售净利率变动情况  /betaInvest/financeChange/findXSLV.do
		AfindFinanceKernelData: "/seinvest/financeChange/findFinanceKernelData.do",//财务核心数据
		AfindIFinanceData:'/seinvest/financeChange/findIFinanceData.do',//查询财务数据的的对标数据
		AfindFinanceModelData: "/seinvest/financeChange/findFinanceModelData.do",//综合能力模型分析
		AfindDubangData: "/seinvest/financeChange/findDubangData.do",//财务杜邦分析
		
		AfindProfitData: "/seinvest/financeChange/findProfitData.do",//公司盈利情况
		AfindGroupData: "/seinvest/financeChange/findGroupData.do",//公司成长情况
		AfindPayData: "/seinvest/financeChange/findPayData.do",//偿债能力
		AfindOperationData: "/seinvest/financeChange/findOperationData.do",//运营情况
		AfindFinanceDepthData: "/seinvest/financeChange/findFinanceDepthData.do",//财务深度分析
		
		AfindTzpjData: "/seinvest/tzjypj/findTzpjData.do",//投资评级
		AfindDetailbyId: "/seinvest/jjyg/findDetailbyId.do",//解禁详情
		AfindSearchHis: "/seinvest/searchReport/findSearchHis.do",//查询历史搜索记录
		AdelHisByIds: "/seinvest/searchReport/delHisByIds.do",//删除历史记录
	},

	ajaxCommon: function () { //修改ajax设置error nieshiqi 
		// $.ajaxSetup({
		$.ajaxSettings = {
			timeout: 3000000,
			type: "post",
			dataType: 'json',
			beforeSend: function (xhr) {
				xhr.setRequestHeader("UU", localStorage.getItem("UU"));
				xhr.setRequestHeader("phone", localStorage.getItem("phone"));
				xhr.setRequestHeader("backUrl", backUrl);

			},
			error: function () {
				this.closeloading();
			}
		}
		// });
	},
	ajax: function (data, _callback) {
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.insertUser,
			data: data,
			success: function (data) {
				_callback(data);
			}

		})
	},

	S4: function () {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	},
	newGUID: function () {
		return (this.S4() + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4());
	},

	closeload: function () {
		// layer.closeAll();
	},
	getSBLength: function (_str) { //验证输入字符长度 
		var byteLen = 0;
		for (var i = 0; i < _str.length; i++) {
			if (_str[i].match(/[^\x00-\xff]/ig) != null)
				byteLen += 2;
			else
				byteLen += 1;
		}
		return byteLen;
	},
	getSBNumber: function (_str) { //验证输入字符为数字 
		var reg = new RegExp("^[0-9]*$"); //整数
		//var obj = document.getElementById("name");
		if (!_str)
			return 1; //输入空白 20150526

		if (!reg.test(_str)) {
			//alert("请输入数字!");
			return 0;
		}
		if (!/^\d{1,3}$/.test(_str)) { // 数位 1-3位
			//alert("请输入数字!");
			return 0;
		}
		if (_str > 100 || (_str < 10 && _str != 0)) { //100以内
			//alert("请输入数字!");
			return 0;
		}
		return 2; //输入数字，并符合要求 20150526
	},
	getUrlPara: function (m) {
		var sValue = location.search.match(new RegExp("[\?\&]" + m + "=([^\&]*)(\&?)", "i"));
		return sValue ? sValue[1] : sValue;
	},

	phoneNum: function (pn) {
		var phone = pn;
		if (!(/^1[34578]\d{9}$/.test(phone))) {
			// alert("手机号码有误，请重填");  
			// $$.toast('手机号格式错误', { duration: 'long', type: 'div' })
			return false;
		}
		return true;
	},
	checkPassword: function (password) {
		// var reg = /^[A-Za-z]+[0-9]+[A-Za-z0-9]*|[0-9]+[A-Za-z]+[A-Za-z0-9]*$/g;
		var reg = /^[0-9a-zA-Z]{6,12}/;
		if (!reg.test(password)) {
			// alert("密码必须由6-12个英文字母和数字的字符串组成！");
			// document.form.password.focus();
			return false;
		}
		return true;
	},

	initdataURLtoBlob:
	{
		options:
		{

			thumbBox: '.thumbBox',

			spinner: '.spinner',

			imgSrc: ''

		},
		cropper: function () {
			return $('.imageBox').cropbox(this.options);
		},

		img: "",
		newBlob: function (data, datatype) {
			var out;
			try {
				out = new Blob([data], {
					type: datatype
				});
			} catch (e) {
				window.BlobBuilder = window.BlobBuilder ||
					window.WebKitBlobBuilder ||
					window.MozBlobBuilder ||
					window.MSBlobBuilder;

				if (e.name == 'TypeError' && window.BlobBuilder) {
					var bb = new BlobBuilder();
					bb.append(data.buffer);
					out = bb.getBlob(datatype);
				} else if (e.name == "InvalidStateError") {
					out = new Blob([data], {
						type: datatype
					});
				} else { }
			}
			return out;
		},
		dataURLtoBlob: function (data) {
			var tmp = data.split(',');

			tmp[1] = tmp[1].replace(/\s/g, '');
			var binary = atob(tmp[1]);
			var array = [];
			for (var i = 0; i < binary.length; i++) {
				array.push(binary.charCodeAt(i));
			}
			return new this.newBlob(new Uint8Array(array), 'image/jpeg');
		},
		upload: function () {
			var _this = this;
			$('#files').on('change', function () {
				var reader = new FileReader();

				//var _this = this;
				reader.onload = function (e) {

					_this.options.imgSrc = e.target.result;

					_this.cropper = $('.imageBox').cropbox(_this.options);

					//			getImg();

				}

				reader.readAsDataURL(this.files[0]);
				//		this.files = [];

				setTimeout(function () {
					_this.img = _this.cropper.getDataURL();
					$('.cropped').html('');

					$('.cropped').append('<img src="' + _this.img + '" align="absmiddle" style="width:90px;margin-top:0px;">');
					$('.cropped').append('<img src="' + _this.img + '" align="absmiddle" style="width:30px;margin-top:10px;" >');
					$(".uptouxia").show();
				}.bind(_this), 80);
			})
		},
		getImg: function (a) {

			this.img = this.cropper.getDataURL();
			$('.cropped').html('');

			$('.cropped').append('<img src="' + this.img + '" align="absmiddle" style="width:90px;margin-top:0px;">');
			$('.cropped').append('<img src="' + this.img + '" align="absmiddle" style="width:30px;margin-top:10px;" >');
			//		if(imgStr == ""){
			////			console.log("第一次进入");
			//			getImg();
			//		}
			$(".uptouxia").show();
		}

	},
	isWeiXin: function () {
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	},
	getPara: function (m) { //获取参数（先从url中获取，没有再从缓存中取）
		var val = "";
		var sValue = location.search.match(new RegExp("[\?\&]" + m + "=([^\&]*)(\&?)", "i"));
		val = sValue ? sValue[1] : sValue;

		if (val != null && val != undefined && val != "") {
			localStorage.setItem(m, val);
			return val;
		}

		return localStorage.getItem(m);
	},
	getParaNoLocalStorage: function (m) { //获取参数（先从url中获取，没有再从缓存中取）
		var val = "";
		var sValue = location.search.match(new RegExp("[\?\&]" + m + "=([^\&]*)(\&?)", "i"));
		val = sValue ? sValue[1] : sValue;

		if (val != null && val != undefined && val != "") {
			//			localStorage.setItem(m, val);
			return val;
		}

		return val;
	},
	setloading: {
		mask: "",
		init: function () {
			this.mask = mui.createMask();
			this.mask.show();
			if ($(".loading").css("display") === "none")
				$(".loading").show();
			else
				$(document.body).append($("<div class=\"loading\"><span></span><span></span><span></span><span></span><span></span></div>"))
			// // $(".mui-backdrop").html("<div class=\"loading\"><span></span><span></span><span></span><span></span><span></span></div>");
			// mask.show();
			// $(document.body).append($("<div class=\"loading\"><span></span><span></span><span></span><span></span><span></span></div>"))
			// return "<div class=\"loading\"><span></span><span></span><span></span><span></span><span></span></div>";
		},
		init_load: function (id, index) {
			if ($("#" + id).css("display") === "none")
				$("#" + id).show();
			else
				// $(document.body)
				var _width = ($(".swiper-slide").eq(index).width() - 80) / 2 + "px";
			$(".swiper-slide").eq(index).append($("<div class=\"loading1\" id=" + id + " style=\"margin-left:" + _width + "\"><span></span><span></span><span></span><span></span><span></span></div>"))
		},
		des_load: function (id) {
			$("#" + id).hide();
		}

	},
	openloading: function () {
		$(".mui-backdrop")[0] ? this.setloading.mask.show() : this.setloading.init();
	},
	closeloading: function () {
		$(".mui-backdrop")[0] ? (this.setloading.mask.close(), $(".loading").hide()) : this.setloading.init();
	},
	lazyload: function () {
		var img = new Image();
		var img = $("<img>");
		img.class = "swiper-lazy";
		// img.dataSrc="";

		return img;


	},
	initimg: function () {
		var surl = "images/catalogue/";
		var ImgUrls = [surl + '1-1.jpg', surl + '1-2.jpg', surl + '1-3.jpg', surl + '1-4.jpg', surl + '1-5.jpg', surl + '1-6.jpg', surl + '1-7.jpg', surl + '1-8.jpg', surl + '2-1.jpg', surl + '2-2.jpg', surl + '2-3.jpg', surl + '2-4.jpg', surl + '3-1.jpg', surl + '3-2.jpg', surl + '3-3.jpg', surl + '3-4.jpg', surl + '4-1.jpg', surl + '4-2.jpg'];
		var Imgs = [];
		for (var i = 0; i < ImgUrls.length; i++) {
			(function (i) {//采用即刻调用函数的形式保存了每一个i
				var img = new Image;
				img.src = ImgUrls[i];
				img.onload = function () {
					Imgs[i] = img;
				}
			})(i);//i 是在这里传入的
		}
	},

	ys: function (img_this, id, dir) {
		var width = img_this.width, height = img_this.height, degree = 0;
		// if (width < 128 && height < 128) {
		// 	return false;
		// }
		// var scale = width / height;
		// width1 = 128;
		// height1 = parseInt(width1 / scale);

		var drawWidth, drawHeight;
		drawWidth = img_this.naturalWidth;
		drawHeight = img_this.naturalHeight;
		//以下改变一下图片大小
		var maxSide = Math.max(drawWidth, drawHeight);
		if (maxSide > 160) {
			var minSide = Math.min(drawWidth, drawHeight);
			minSide = minSide / maxSide * 160;
			maxSide = 160;
			if (drawWidth > drawHeight) {
				drawWidth = maxSide;
				drawHeight = minSide;
			} else {
				drawWidth = minSide;
				drawHeight = maxSide;
			}
		}
		var canvas = document.createElement("canvas");
		canvas.width = width = drawWidth;
		canvas.height = height = drawHeight;
		var ctx = canvas.getContext('2d');

		switch (dir) {
			//iphone横屏拍摄，此时home键在左侧
			case 3:
				degree = 180;
				drawWidth = -width;
				drawHeight = -height;
				break;
			//iphone竖屏拍摄，此时home键在下方(正常拿手机的方向)
			case 6:
				canvas.width = height;
				canvas.height = width;
				degree = 90;
				drawWidth = width;
				drawHeight = -height;
				break;
			//iphone竖屏拍摄，此时home键在上方
			case 8:
				canvas.width = height;
				canvas.height = width;
				degree = 270;
				drawWidth = -width;
				drawHeight = height;
				break;
		}
		ctx.rotate(degree * Math.PI / 180);

		//返回校正图片
		// next(canvas.toDataURL("image/jpeg",.8));

		ctx.drawImage(img_this, 0, 0, drawWidth, drawHeight);
		var cropStr = canvas.toDataURL("image/jpeg", 0.7)
		return cropStr;
	},
	getOffsetTop: function (elm) {
		var mOffsetTop = elm.offsetTop;
		var mOffsetParent = elm.offsetParent;
		while (mOffsetParent) {
			mOffsetTop += mOffsetParent.offsetTop;
			mOffsetParent = mOffsetParent.offsetParent;
		}
		return mOffsetTop;
	},
	axs: function (url, data, async, successfn) {
		var backUrl = window.location.href;
		// if("/"==url.substring(0,1)){
        // 	url="/test"+url;
        // }else{
        // 	url=url;
        // }
		$.ajax({
			type: "post",
			async: async,
			data: data,
			url: url,
			dataType: "json",
			timeout: 30000, //超时时间设置，单位毫秒
			beforeSend: function (xhr) {
				xhr.setRequestHeader("UU", localStorage.getItem("UU"));
				xhr.setRequestHeader("phone", localStorage.getItem("phone"));
				xhr.setRequestHeader("backUrl", backUrl);
				// if (searchhtml != "searchList") {
				// 	$(".loadingBox").show();
				// }

			},
			success: function (d) {
				successfn(d);
				// $(".loadingBox").hide();
			},
			error: function (e) {
				// $(".loadingBox").hide();

			}
		});
	},
	drawchart: function (obj, _option) {
		var div = document.createElement("div");
		div.style = "width:100%;height:300px;"
		var myChart = echarts.init(div);
		var option = _option || {
			color: [
				"#62a6f2", "#feb535"
			],
			calculable: true,
			legend: {
				show: true,
				data: ["营业收入", '增长率']
			},
			grid: {
				show: true,
				right: '10%',
				left: '15%',
				bottom: '30%'
			},
			xAxis: {
				type: 'category',
				data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']//dateList
			},
			label: {
				normal: {
					show: true,
					position: 'top'
				}
			},
			yAxis: [
				{
					type: 'value',
					name: "单位：万元",
					axisLabel: {
						show: true,
						formatter: "{value}"
					}
				},
				{
					type: 'value',
					name: "单位：%",
					splitLine: {
						show: false
					}

				}
			],
			series: [
				{
					name: '营业收入',
					type: 'bar',
					yAxisIndex: 0,
					barMaxWidth: '30',
					data: yingyeDataList//[2.6, 5.9, 80.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
				},
				{
					name: '增长率',
					type: 'line',
					yAxisIndex: 1,
					symbol: "circle",
					data: REVZengZhangLvList,//[51, 20, 56, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
					axisLine: {
						show: false
					}
				}
			]
		};

		myChart.setOption(option);
		window.addEventListener("resize", function () {
			myChart.resize();
		});
		return myChart._dom;
	},

	oplugins: {
		/*
			_data:{
				text:"一、公司概况",
				logo:"images/section-logo.png"
			}
		*/
		_head: function (_data) {
			return "<div class=\"top-tiltes\"><div class=\"top-line\">" +
				"<div class=\"col-lg-6 col-md-6 col-xs-6 col-sm-6 section-name\">" +
				"<span>" + _data.text + "</span>" +
				"</div>" +
				"<div class=\"col-lg-6 col-md-6 col-xs-6 col-sm-6 scetion-logo\">" +
				"<div class=\"action-logo\">" +
				"<img src=" + _data.logo + " alt=\"\" />" +
				"</div>" +
				"</div>" +
				"</div></div>";
		},
		_head1level: function (_text) {
			return "<h2>" + _text + "</h2>";
		},
		/*數據格式說明
			_data:{
				text:"1.1.2工商信息",
				id:"aaaa"//這個id可用于定位
			}
		*/
		_head2level: function (_text) {
			return "<h3>" + _text + "</h3>";

		},
		/*數據格式說明
		ul表格
		_data:{
			_class:"樣式class" 可選
			_data:[
				{
					colname:"公司名称",
					value:"江苏传智播客教育科技股份有限公司"
				},
				{
					colname:"注册资本",
					value:"5937.75万元"
				}
					.
					.
					.				
			]
		}
		*/
		_listul: function (_data) {
			var ul = $("<ul>");
			if (_data._class)
				ul.addClass(_data._class);
			$.each(_data._data, function (k, v) {
				var li = "<li><em>" + v[0] + "</em><span id=\"chiname\">" + v[1] + "</span></li>";
				ul.append(li);
			})
			return ul.prop("outerHTML");
		},
		/*
			_data:{
				thead:[
					"股东","持股比例","持股数量(万股)",....
				],
				body:[
					{
						value1:"黎活明",
						value2:"28%",
						value3:"1479.49",
						  .
						  .
						  .
					},
					{
						value1:"陈琼",
						value2:"24.6%",
						value3:"1299.89",
						  .
						  .
						  .
					},
					      .
					      .
					      .
				]

				
			}
		*/
		_listtable: {
			_createtable: function () {
				var table = $("<table>");
				var thead = $("<thead>");
				var tbody = $("<tbody>");
				table.append(thead);
				table.append(tbody);
				return table;
			},
			_createthead: function (data) {
				// var table = this._createtable();
				var thead = $("<tr>");
				thead.append("<th></th>");
				return thead;
			},
			_createtr: function (data) {
				var tr = $("<tr>");
				tr.append("<td></td>");
				return tr;
			}


			// var table = $("<table>");
			// var thead = $("<thead>");
			// var tbody = $("<tbody>");
			// var tr = $("<tr>");
			// thead.append(tr);
			// table.append(thead);
			// table.append(tbody);
			// $.each(_data.thead, function (k, v) {
			// 	tr.append("<th>" + v + "</th>");
			// })
			// $.each(_data.body, function (k, v) {
			// 	var b_tr = $("<tr>");
			// 	$.each(v, function (k1, v1) {
			// 		var td = $("<td>");
			// 		td.text(v1);
			// 		b_tr.append(td);
			// 	})
			// 	tbody.append(b_tr);
			// })

			// return table.prop("outerHTML");
		},
		/*
		輸出段落
		_data:{
			_class:"樣式class"可選,如果需要樣式
			text:"黎活明直接持有并控制公司 28%的股权；陈琼直接持有并控制公司 24.60%的股权。黎活明与陈琼于"
		}
		*/
		_pcontent: function (_data, id) {
			if (_data._class)
				return "<div id=" + id + " class=" + _data._class + ">" + _data.text + "</div>"
			else
				return "<div id=" + id + " >" + _data.text + "</div>"
		},
		/*
			_data:{
				_class:{
					c1:"echarts-tb",容器样式
					c2:"caiwu-table",容器样式
					_tab:"tab-list"tab样式
				},
				text:[
					"图表","列表"//这里定义是固定的俩个tab切换
				]
			}
		*/
		_tabswitch: function (_data) {
			return {
				__obj: "<span class=\"on\">" + _data.text[0] + "</span><span>" + _data.text[1] + "</span>",
				__c1: "<div class=" + _data._class.c1 + " id=\"gdqk-tb\"></div>",
				__c2: "<div class=" + _data._class.c2 + " style=\"display: none;\">",
				__init: function () {
					return "<div class=" + _data._class._tab + ">" +
						this.__obj +
						// "<span class=\"on\">" + _data.text[0] + "</span> <span>" + _data.text[1] + "</span>" +
						"</div>" + this.__c1 + this.__c2;
				},
				__event: function () {
					// $(".tab-list span").on("click", function () {
					var _this = this;
					$("." + _data._class._tab).delegate("span", "click", function () {
						if ($(this).hasClass("on")) {
							return false;
						} else {
							$(this).addClass("on").siblings().removeClass("on");
							if ($(this).text() == _data.text[0]) {
								// $(".echarts-tb").show();
								// $(".caiwu-table").hide();
								$(_this.__c1).show();
								$(_this.__c2).hide();
							} else {
								// $(".echarts-tb").hide();
								// $(".caiwu-table").show();
								$(_this.__c1).hide();
								$(_this.__c2).show();
							}
						}
					})
				}
			}

			// }


		},

		// 时间轴
		_timeline: {
			_createwraper: function () {
				var div = $("<div>");
				div.addClass("lsyg");
				return div;
			},
			_createcontent: function (_data) {
				var div = $("<div>");
				div.addClass("lsyg-item");
				div.append("<div class=\"lsyg-date\">" + _data.time + "</div><div class=\"lsyg-main\"><p>" + _data.text + "</p></div>");
				return div;
			}

		},
		_litable: {
			// return{
			_createli: function () {
				var li = $("<li>");
				li.addClass("mui-table-view-cell");
				return li;
			},
			_createp: function (key, value, c) {
				var p = $("<p>");
				c ? p.append("<label " + c + ">" + key + "</label><span>" + value + "</span>") : p.append("<label>" + key + "</label><span>" + value + "</span>");
				return p;
			}
			// }

			// return " <li class=\"mui-table-view-cell\"></li>"
			// <p><label>基金产品名称</label><span id="zhouCJL"></span></p>

		},
		_nodata: function () {
			return "<div class='noDatas'>暂无数据</div>";
		},
		_nodatawu: function () {
			return "<div class='noDatas'>无</div>";
		},
	},
	getsection: function (_callback) {
		//localStorage.setItem("input","new");
		var urldata = UTIL.CONFIG.findZJList;		
		var cdata;
		$.ajax({
			url: UTIL.CONFIG.wwwhost + urldata,
			type: "post",
			dataType: 'json',
			// async: true,
			success: function (returnData) {
				var data = returnData.retData;
				_callback(data);
			},
			error:
			function (request, status, error) {
				//alert(request.status)//服务器端异常都是500，不过服务器端要是try..catch捕获了一次，那么还是200状态
				//alert(request.responseText);

			}
		});

	},
	getsectionA: function (_callback) {
		//localStorage.setItem("input","new");
		var urldata = UTIL.CONFIG.AfindZJList;		
		var cdata;
		$.ajax({
			url: UTIL.CONFIG.wwwhost + urldata,
			type: "post",
			dataType: 'json',
			// async: true,
			success: function (returnData) {
				var data = returnData.retData;
				_callback(data);
			},
			error:
			function (request, status, error) {
				//alert(request.status)//服务器端异常都是500，不过服务器端要是try..catch捕获了一次，那么还是200状态
				//alert(request.responseText);

			}
		});

	},
	searchsection: {
		_is: 0,
		_d: [],
		_m: "",
		dosearch: function (_data, levelcode) {
			var _lc = levelcode.split('-');
			if (_lc.length === this._is) {
				this._d.push(this._m);
				this._is = 0;
				return;
			}

			this._d = [];
			var _this = this;
			$.each(_data, function (k, v) {
				// if (v.showData === "false") {
				if (v.zjLevel === 1)
					_this._m = v;
				var lc = v.levelcode.split('-');
				if (_lc[_this._is] === lc[_this._is]) {
					_this._d.push(v);
				}
				// }
			})
			if (this._d.length) {
				this._is += 1;
				this.dosearch(this._d, levelcode, this._is)
			}

		}
	},
	sethidden: function (_data) {
		// $.each(_data)
		var v = document.createElement("p");
		p.name = _data.name;
		p.levelcode = _data.levelcode;
	},
	//阿拉伯数字转换为简写汉字
	Arabia_To_SimplifiedChinese: function (Num) {
		for (i = Num.length - 1; i >= 0; i--) {
			Num = Num.replace(",", "")//替换Num中的“,”
			Num = Num.replace(" ", "")//替换Num中的空格
		}
		if (isNaN(Num)) { //验证输入的字符是否为数字
			//alert("请检查小写金额是否正确");
			return;
		}
		//字符处理完毕后开始转换，采用前后两部分分别转换
		part = String(Num).split(".");
		newchar = "";
		//小数点前进行转化
		for (i = part[0].length - 1; i >= 0; i--) {
			if (part[0].length > 10) {
				//alert("位数过大，无法计算");
				return "";
			}//若数量超过拾亿单位，提示
			tmpnewchar = ""
			perchar = part[0].charAt(i);
			switch (perchar) {
				case "0": tmpnewchar = "零" + tmpnewchar; break;
				case "1": tmpnewchar = "一" + tmpnewchar; break;
				case "2": tmpnewchar = "二" + tmpnewchar; break;
				case "3": tmpnewchar = "三" + tmpnewchar; break;
				case "4": tmpnewchar = "四" + tmpnewchar; break;
				case "5": tmpnewchar = "五" + tmpnewchar; break;
				case "6": tmpnewchar = "六" + tmpnewchar; break;
				case "7": tmpnewchar = "七" + tmpnewchar; break;
				case "8": tmpnewchar = "八" + tmpnewchar; break;
				case "9": tmpnewchar = "九" + tmpnewchar; break;
			}
			switch (part[0].length - i - 1) {
				case 0: tmpnewchar = tmpnewchar; break;
				case 1: if (perchar != 0) tmpnewchar = tmpnewchar + "十"; break;
				case 2: if (perchar != 0) tmpnewchar = tmpnewchar + "百"; break;
				case 3: if (perchar != 0) tmpnewchar = tmpnewchar + "千"; break;
				case 4: tmpnewchar = tmpnewchar + "万"; break;
				case 5: if (perchar != 0) tmpnewchar = tmpnewchar + "十"; break;
				case 6: if (perchar != 0) tmpnewchar = tmpnewchar + "百"; break;
				case 7: if (perchar != 0) tmpnewchar = tmpnewchar + "千"; break;
				case 8: tmpnewchar = tmpnewchar + "亿"; break;
				case 9: tmpnewchar = tmpnewchar + "十"; break;
			}
			newchar = tmpnewchar + newchar;
		}
		//替换所有无用汉字，直到没有此类无用的数字为止
		while (newchar.search("零零") != -1 || newchar.search("零亿") != -1 || newchar.search("亿万") != -1 || newchar.search("零万") != -1) {
			newchar = newchar.replace("零亿", "亿");
			newchar = newchar.replace("亿万", "亿");
			newchar = newchar.replace("零万", "万");
			newchar = newchar.replace("零零", "零");
		}
		//替换以“一十”开头的，为“十”
		if (newchar.indexOf("一十") == 0) {
			newchar = newchar.substr(1);
		}
		//替换以“零”结尾的，为“”
		if (newchar.lastIndexOf("零") == newchar.length - 1) {
			newchar = newchar.substr(0, newchar.length - 1);
		}
		return newchar;
	},
	weiXiRemarks: "圣康汇金\r投研有料出品",//微信分享的备注
	imgUrl: "http://yanbao.159jh.com/wei/znyb_phone/images/logo.jpg",//微信分享的图片
	//第三第四章的登录情况
	nologin: function (htmlName) {
		//判断是否登录
		if (localStorage.getItem('userId') == null || localStorage.getItem('userId') == "" || localStorage.getItem('userId') == "undefined") {
			$.ajax({
				url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.findZJList,
				type: "post",
				dataType: 'json',
				async: false,
				success: function (returnData) {
					var data = returnData.retData;
					muluIndex = 0;
					$.each(data, function (index, item) {
						if (htmlName == item.code) {
							return false;
						}
						//console.log(item)
						// if (item.showData == "true") {
						if (item.zjLevel === 2) {//更新获取历史目录判断方式 20171019 shiqi
							muluIndex += 1;
						}
					});
				}
			});
			var url = location.href;
			if (url.indexOf("&index=") > -1) {
				url = url.substring(0, url.indexOf("&index="));
			}
			location.href = "login.html?reurl=" + url + "&index=" + muluIndex;
		}else{
			//payOrNot();
		}
	},
	//第三第四章的登录情况(A股)
	Anologin: function (htmlName) {
		//判断是否登录
		if (localStorage.getItem('userId') == null || localStorage.getItem('userId') == "" || localStorage.getItem('userId') == "undefined") {
			$.ajax({
				url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.AfindZJList,
				type: "post",
				dataType: 'json',
				async: false,
				success: function (returnData) {
					var data = returnData.retData;
					muluIndex = 0;
					$.each(data, function (index, item) {
						if (htmlName == item.code) {
							return false;
						}
						//console.log(item)
						// if (item.showData == "true") {
						if (item.zjLevel === 2) {//更新获取历史目录判断方式 20171019 shiqi
							muluIndex += 1;
						}
					});
				}
			});
			var url = location.href;
			if (url.indexOf("&index=") > -1) {
				url = url.substring(0, url.indexOf("&index="));
			}
			location.href = "login.html?reurl=" + url + "&index=" + muluIndex;
		}else{
			//payOrNot();
		}
	},
	
	/**
	 * 作	者：shiqi
	 * 功	能：提供数据来源
	 * 时	间：20171026
	 * 接口提供：腾龙
	 */
	sjly: function (id, zjCode, wrpper, _class) {
		var stockCode = UTIL.getPara("stockCode");
		WF_ajax.findDataSourse(true, {
			stockCode: stockCode,
			zjCode: zjCode
		}, function (_data) {
			if ($(id).length) {
				$(id).text(_data);
				return;
			}
			$(wrpper).append(
				UTIL.oplugins._pcontent({
					text: _data,
					_class: _class
				}, id)
			)
		})
	},
	metacache: function (c) {
		var version = "" || this.S4();
		if (c === 1) {//参数1指明conver.html调用，参数自行扩展
			document.write("<s" + "cript type='text/javascript' src='js/bus/section01.js?v=" + version + "'></s" + "cript>");

			document.write("<s" + "cript type='text/javascript' src='js/bus/section02.js?v=" + version + "'></s" + "cript>");

			document.write("<s" + "cript type='text/javascript' src='js/bus/section03.js?v=" + version + "'></s" + "cript>");

			document.write("<s" + "cript type='text/javascript' src='js/bus/section04.js?v=" + version + "'></s" + "cript>");
		}
	},
	isLogin: function (opt,_callback) {
		UTIL.axs(UTIL.CONFIG.isLogin, {}, true, function (data) {
			if (data.retData == true) {
				if(opt === 1){
					return;
				}
				localStorage.clear()
				$.zmAlert("请重新登录");
				setTimeout(function () {
					location.href = "login.html"
				}, 200);
				// location.href = "login.html";
			} else {
				_callback()
			}
		})
	},
	fmtNum3: function (num) {//格式化数字成千分位
		var num = (num || 0).toString(), result = '';
		if(num.indexOf(',')>0)
			return num;
		var xiaoshu="";
		var fushu="";
		if(num.indexOf("-")==0){
			fushu="-";
			num=num.substring(1);
		}
		if(num.indexOf('.')>0){
			xiaoshu=num.substring(num.indexOf("."));
			num=num.substring(0,num.indexOf("."));			
		}
		while (num.length > 3) {
			result = ',' + num.slice(-3) + result;
			num = num.slice(0, num.length - 3);
		}
		if (num) { result = num + result; }
		return fushu+result+xiaoshu;
	},
	resizeWorldMapContainer: function (obj) {
		obj.style.width = window.innerWidth + 'px';
		// obj.style.height = window.innerHeight * 0.7 + 'px';
	}
};
var _hmt = _hmt || [];
(function () {
	var hm = document.createElement("script");
	hm.src = "https://hm.baidu.com/hm.js?b63830859f03ce5d84c3589ed8108002";
	var s = document.getElementsByTagName("script")[0];
	s.parentNode.insertBefore(hm, s);
})();
window.UTIL = UTIL;





