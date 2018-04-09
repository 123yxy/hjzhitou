/**
 *  
 *
 */
var WF_ajax = {

	///start by nieshi
	// findtwohis: function (data, _callback) { //获取股本变动方法           
	// 	// UTIL.loadState();
	// 	UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
	// 		stockCode: data.stockCode
	// 	});

	// 	$.ajax({
	// 		// url: UTIL.CONFIG.localhost + UTIL.CONFIG.twohis,
	// 		url: "../../jsontest/stockchange.json",
	// 		data: {
	// 			// JSON_PARAM: JSON.stringify(UTIL.RequestPakage)
	// 		},
	// 		success: function (data) {

	// 			// if (data.retCode === "0000")
	// 			data = JSON.parse(data);
	// 			_callback(data.retData); //模板获取后回调方法
	// 			UTIL.closeload();

	// 		}

	// 	})
	// },

	tologin: function (data, _callback) {
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			phone: data.phone,
			password: data.password
		});

		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.tologin,
			// url: "../../jsontest/stockchange.json",
			data: UTIL.RequestPakage,

			success: function (data) {

				// if (data.retCode === "0000")
				// data = JSON.parse(data);
				_callback(data); //模板获取后回调方法
				// UTIL.closeload();

			}

		})
	},
	verificationcode: function (data, _callback) {
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			phoneNumber: data.phone,
			type: data.type
		});

		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.verificationCode,
			data: UTIL.RequestPakage,
			success: function (data) {

				if (data.retCode === "0000")
					_callback(); //模板获取后回调方法
			}

		})
	},
	isHaveUser: function (data, _callback) {
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			phone: data.phone
		});

		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.isHaveUser,
			data: UTIL.RequestPakage,
			success: function (data) {

				if (data.retCode === "0000") {
					// if (!data.retData)
					_callback(data);
					// else {

					// 	return false;
					// }

				}




			}

		})
	},
	insertUser: function (data, _callback) {
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			mobile: data.phone,
			verification_Code: data.valicode,
			password: data.password
		});

		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.insertUser,
			data: UTIL.RequestPakage,
			success: function (data) {

				// if (data.retCode === "0000")
				// data = JSON.parse(data);
				// if (data.retCode === "0000")
				_callback(data);
				// _callback(data.retData); //模板获取后回调方法
				// UTIL.closeload();

			}

		})
	},
	updatePassWord: function (data, _callback) {
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			mobile: data.phone,
			verification_Code: data.valicode,
			password: data.password
		});

		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.updatePassWord,
			data: UTIL.RequestPakage,
			success: function (data) {

				// if (data.retCode === "0000")
				// data = JSON.parse(data);
				// if (data.retCode === "0000")
				_callback(data);
				// _callback(data.retData); //模板获取后回调方法
				// UTIL.closeload();

			}

		})
	},
	uploadUserAvatar: function (data, _callback) {
		// UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
		// 	file: data.data
		// });

		$.ajax({
			type: "post",
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.uploadUserAvatar,
			data: data,
			async: true,
			processData: false,
			contentType: false,
			success: function (data) {

				// if (data.retCode === "0000")
				// data = JSON.parse(data);
				// if (data.retCode === "0000")
				_callback(data);
				// _callback(data.retData); //模板获取后回调方法
				// UTIL.closeload();

			},
			error:
			function (request, status, error) {
				alert(request.status)//服务器端异常都是500，不过服务器端要是try..catch捕获了一次，那么还是200状态
				alert(request.responseText);
			},
			complete: function (XMLHttpRequest, textStatus) {
				//alert(textStatus);
				UTIL.closeloading();
			}

		})
	},
	findAppUser: function (_callback) {
		// UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
		// 	file: data.data
		// });

		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.findAppUser,
			data: {},//UTIL.RequestPakage,
			success: function (data) {

				// if (data.retCode === "0000")
				// data = JSON.parse(data);
				// if (data.retCode === "0000")
				_callback(data);
				// _callback(data.retData); //模板获取后回调方法
				// UTIL.closeload();

			}

		})
	},
	updateSignature: function (data, _callback) {
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			field: data.field,
			value: data.value
		});
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.updateSignature,
			data: UTIL.RequestPakage,
			success: function (data) {

				// if (data.retCode === "0000")
				// data = JSON.parse(data);
				// if (data.retCode === "0000")
				_callback(data);
				// _callback(data.retData); //模板获取后回调方法
				// UTIL.closeload();

			}

		})
	},
	findNotionCon: function (_callback) {
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.findNotionCon,
			data: {},//UTIL.RequestPakage,
			success: function (data) {

				// if (data.retCode === "0000")
				// data = JSON.parse(data);
				// if (data.retCode === "0000")
				_callback(data);
				// _callback(data.retData); //模板获取后回调方法
				// UTIL.closeload();

			}

		})
	},
	updatetUser: function (data, _callback) {
		// UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
		// 	userName: data.username,
		// 	sex: data.sex,
		// 	wechatNumber:data.wechatnaumber,
		// 	postion:data.pos,
		// 	company:data.company
		// });
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.updatetUser,
			data: {},//UTIL.RequestPakage,
			success: function (data) {

				// if (data.retCode === "0000")
				// data = JSON.parse(data);
				// if (data.retCode === "0000")
				_callback(data);
				// _callback(data.retData); //模板获取后回调方法
				// UTIL.closeload();

			}

		})
	},

	cancelLogin: function (_callback) {
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.cancelLogin,
			data: {},//UTIL.RequestPakage,
			success: function (data) {
				_callback(data);
			}

		})
	},
	validationCode: function (data, _callback) {
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			mobile: data.mobile,
			verification_Code: data.verification_Code
		});
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.validationCode,
			data: UTIL.RequestPakage,
			success: function (data) {
				_callback(data);
			}

		})
	},
	
	isYPassword: function (data, _callback) {

		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.isYPassword,
			data: data,
			success: function (data) {
				_callback(data);
			}

		})
	},
	updatePwd: function (data, _callback) {

		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.updatePwd,
			data: data,
			success: function (data) {
				_callback(data);
			}

		})
	},
	///end by nieshi
	//企业简介
	companyIntroduction: function (data, async, _callback) {
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			stockCode: data.stockCode
		});
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.companyIntroduction,
			data: UTIL.RequestPakage,
			type: "post",
			async: async,
			success: function (data) {
				// if (data.retCode === "0000")
				_callback(data.retData); //模板获取后回调方法
				UTIL.closeload();
			}
		})
	},
	//主营业务收入
	findAllMainBusiness: function (data, async, _callback) {
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			stockCode: data.stockCode
		});
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.findAllMainBusiness,
			data: UTIL.RequestPakage,
			type: "post",
			async: async,
			success: function (data) {
				// if (data.retCode === "0000")
				_callback(data.retData); //模板获取后回调方法
				UTIL.closeload();
			}
		})
	},
	//主营业务收入多年数据并付费
	findAllMainBusinessPay: function (data, async, _callback) {
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			stockCode: data.stockCode,
			isPay:data.isPay
		});
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.findAllMainBusinessPay,
			data: UTIL.RequestPakage,
			type: "post",
			async: async,
			success: function (data) {
				// if (data.retCode === "0000")
				_callback(data.retData); //模板获取后回调方法
				UTIL.closeload();
			}
		})
	},
	//企业工商信息
	findCompanyMsgByCode: function (data, async, _callback) {
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			stockCode: data.stockCode
		});
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.findCompanyMsgByCode,
			data: UTIL.RequestPakage,
			type: "post",
			async: async,
			success: function (data) {
				// if (data.retCode === "0000")
				_callback(data.retData); //模板获取后回调方法
				UTIL.closeload();
			},
			error: function (request, status, error) {
				alert(request.status)//服务器端异常都是500，不过服务器端要是try..catch捕获了一次，那么还是200状态
				alert(request.responseText);
			}
		})
	},
	findHotYb: function (data, async, _callback) {
//		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
//			stockCode: data.stockCode
//		});
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.findHotYb,
			data: UTIL.RequestPakage,
			type: "post",
			async: async,
			success: function (data) {
				// if (data.retCode === "0000")
				_callback(data.retData); //模板获取后回调方法
				UTIL.closeload();
			},
			error: function (request, status, error) {
				alert(request.status)//服务器端异常都是500，不过服务器端要是try..catch捕获了一次，那么还是200状态
				alert(request.responseText);
			}
		})
	},
	findHisYb: function (data, async, _callback) {
//		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
//			stockCode: data.stockCode
//		});
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.findHisYb,
			data: UTIL.RequestPakage,
			type: "post",
			async: async,
			success: function (data) {
				// if (data.retCode === "0000")
				_callback(data.retData); //模板获取后回调方法
				UTIL.closeload();
			},
			error: function (request, status, error) {
				alert(request.status)//服务器端异常都是500，不过服务器端要是try..catch捕获了一次，那么还是200状态
				alert(request.responseText);
			}
		})
	},
	findStructureTable: function (async, dataParam, _callback) { //wtl-获取股东变动表格数据
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.findStructureTable,
			data: dataParam,
			async: async,
			type: "post",
			success: function (data) {
				//				data = JSON.parse(data);
				_callback(data); //模板获取后回调方法
				UTIL.closeload();
			}
		})
	},
	findACMsg: function (async, dataParam, _callback) { //wtl-获取控股股东，实际控制人信息，商业模式，未来规划，普通股股东人数
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.findACMsg,
			data: dataParam,
			async: async,
			type: "post",
			success: function (data) {
				//				data = JSON.parse(data);
				_callback(data); //模板获取后回调方法
				UTIL.closeload();
			}
		})
	},
	findNewYW: function (async, dataParam, _callback) { //wtl-获取主营业务收入表格
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.findNewYW,
			data: dataParam,
			async: async,
			type: "post",
			success: function (data) {
				//				data = JSON.parse(data);
				_callback(data); //模板获取后回调方法
				UTIL.closeload();
			}
		})
	},
	findJZDS: function (async, dataParam, _callback) { //wtl-获取同行业竞争对手
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.findJZDS,
			data: dataParam,
			async: async,
			type: "post",
			success: function (data) {
				//				data = JSON.parse(data);
				_callback(data); //模板获取后回调方法
				UTIL.closeload();
			}
		})
	},
	findSC: function (async, dataParam, _callback) { //wtl-获取供应商和客户
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.findSC,
			data: dataParam,
			async: async,
			type: "post",
			success: function (data) {
				//				data = JSON.parse(data);
				_callback(data); //模板获取后回调方法
				UTIL.closeload();
			}
		})
	},
	findRiskTipsByCode: function (async, dataParam, _callback) { //wtl-获取经营风险提示信息
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.findRiskTipsByCode,
			data: dataParam,
			async: async,
			type: "post",
			success: function (data) {
				//				data = JSON.parse(data);
				_callback(data); //模板获取后回调方法
				UTIL.closeload();
			}
		})
	},
	findTWOHis: function (async, dataParam, _callback) { //wtl-获取股本变动的图数据
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.findTWOHis,
			data: dataParam,
			async: async,
			type: "post",
			success: function (data) {
				//				data = JSON.parse(data);
				_callback(data); //模板获取后回调方法
				UTIL.closeload();
			}
		})
	},
	findStaffData: function (async, dataParam, _callback) { //wtl-获取员工信息
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.findStaffData,
			data: dataParam,
			async: async,
			type: "post",
			success: function (data) {
				//				data = JSON.parse(data);
				_callback(data); //模板获取后回调方法
				UTIL.closeload();
			}
		})
	},
	findSXYRelationChart: function (async, dataParam, _callback) { //wtl-获取上下游数据
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.findSXYRelationChart,
			data: dataParam,
			async: async,
			type: "post",
			success: function (data) {
				//				data = JSON.parse(data);
				_callback(data); //模板获取后回调方法
				UTIL.closeload();
			}
		})
	},
	findResourceRelation: function (async, dataParam, _callback) { //wtl-获取上下游数据
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.findResourceRelation,
			data: dataParam,
			async: async,
			type: "post",
			success: function (data) {
				//				data = JSON.parse(data);
				_callback(data); //模板获取后回调方法
				UTIL.closeload();
			}
		})
	},
	findDignForSurvey: function (async, dataParam, _callback) { //wtl-获取董监高数据
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.findDignForSurvey,
			data: dataParam,
			async: async,
			type: "post",
			success: function (data) {
				//				data = JSON.parse(data);
				_callback(data); //模板获取后回调方法
				UTIL.closeload();
			}
		})
	},
	findOutboundInvestment: function (async, dataParam, _callback) { //wtl-获取董监高数据
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.findOutboundInvestment,
			data: dataParam,
			async: async,
			type: "post",
			success: function (data) {
				//				data = JSON.parse(data);
				_callback(data); //模板获取后回调方法
				UTIL.closeload();
			}
		})
	},
	findDetailHeder: function (async, dataParam, _callback) { //wtl-获取实时行情数据
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.findDetailHeder,
			data: dataParam,
			async: async,
			type: "post",
			success: function (data) {
				//				data = JSON.parse(data);
				_callback(data); //模板获取后回调方法
				UTIL.closeload();
			}
		})
	},
	canRead: function (async, dataParam) { //wtl-获取是否可以阅读研报
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.canRead,
			data: dataParam,
			async: async,
			type: "post",
			success: function (data) {
				if (data.retCode == "3001") {
					mui.toast("今日已阅读" + data.retMsg + "份，明天再继续...", { duration: 5000, type: 'div' });
					setTimeout(function () {
						location.href = 'index.html';
					}, 3000);
				}
			}
		})
	},
	canReadA: function (async, dataParam) { //wtl-获取是否可以阅读研报
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.AcanRead,
			data: dataParam,
			async: async,
			type: "post",
			success: function (data) {
				if (data.retCode == "3001") {
					$.zmAlert("今日已阅读" + data.retMsg + "份，明天再继续...");
					setTimeout(function () {
						location.href = 'index.html';
					}, 2000);
				}
			}
		})
	},
	searchData: function (async, dataParam, _callback) { //wtl-模糊查询搜索结果
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.searchData,
			data: dataParam,
			async: async,
			type: "post",
			success: function (data) {
				_callback(data); //模板获取后回调方法
				UTIL.closeload();
			}
		})
	},
	findDataSourse: function (async, dataParam, _callback) { //wtl-查询数据来源
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.findDataSourse,
			data: dataParam,
			async: async,
			type: "post",
			success: function (data) {
				if (data.retCode === "0000") {
					_callback(data.retData); //模板获取后回调方法
					UTIL.closeload();
				}
			}
		})
	},

























































































































	//投融资分析汇总
	investmentAnalysis: function (data, async, _callback) {
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			stockCode: data.stockCode
		});
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.investmentAnalysis,
			data: UTIL.RequestPakage,
			type: "post",
			async: async,
			success: function (data) {
				// if (data.retCode === "0000")
				_callback(data.retData); //模板获取后回调方法
				UTIL.closeload();
			}
		})
	},
	//企业挂牌信息
	enlisted: function (data, async, _callback) {
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			stockCode: data.stockCode
		});
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.enlisted,
			data: UTIL.RequestPakage,
			type: "post",
			async: async,
			success: function (data) {
				// if (data.retCode === "0000")
				_callback(data.retData); //模板获取后回调方法
				UTIL.closeload();
			}
		})
	},
	//	做市商家数 
	findMarketInventory: function (data, async, _callback) {
		UTIL.findMarketInventory = $.extend(true, UTIL.RequestPakage, {
			stockCode: data.stockCode
		});
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.findMarketInventory,
			data: UTIL.RequestPakage,
			type: "post",
			async: async,
			success: function (data) {
				// if (data.retCode === "0000")
				_callback(data.retData); //模板获取后回调方法
				UTIL.closeload();
			}
		})
	},
	//企业专利信息列表
	patentList: function (data, async, _callback) {
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			stockCode: data.stockCode,
			pageNum: data.pageNum,
			pageSize: data.pageSize
		});
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.patentList,
			data: UTIL.RequestPakage,
			type: "post",
			async: async,
			success: function (data) {
				// if (data.retCode === "0000")
				_callback(data.retData); //模板获取后回调方法
				UTIL.closeload();
			}
		})
	},
	//企业著作权信息列表
	copyrightList: function (data, async, _callback) {
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			stockCode: data.stockCode,
			pageNum: data.pageNum,
			pageSize: data.pageSize
		});
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.copyrightList,
			data: UTIL.RequestPakage,
			type: "post",
			async: async,
			success: function (data) {
				// if (data.retCode === "0000")
				_callback(data.retData); //模板获取后回调方法
				UTIL.closeload();
			}
		})
	},
	//企业专利详情
	patentDetail: function (data, async, _callback) {
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			id: data.id
		});
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.patentDetail,
			data: UTIL.RequestPakage,
			type: "post",
			async: async,
			success: function (data) {
				// if (data.retCode === "0000")
				_callback(data.retData); //模板获取后回调方法
				UTIL.closeload();
			}
		})
	},
	//企业专著作详情
	copyrightDetail: function (data, async, _callback) {
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			id: data.id
		});
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.copyrightDetail,
			data: UTIL.RequestPakage,
			type: "post",
			async: async,
			success: function (data) {
				// if (data.retCode === "0000")
				_callback(data.retData); //模板获取后回调方法
				UTIL.closeload();
			}
		})
	},
	//十大股东情况图表和饼状图
	shareholders: function (data, async, _callback) {
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			stockCode: data.stockCode
		});
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.shareholders,
			data: UTIL.RequestPakage,
			type: "post",
			async: async,
			success: function (data) {
				// if (data.retCode === "0000")
				_callback(data.retData); //模板获取后回调方法
				UTIL.closeload();
			}
		})
	},
	//重大事件图表
	eventList: function (data, async, _callback) {
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			stockCode: data.stockCode
		});
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.eventList,
			data: UTIL.RequestPakage,
			type: "post",
			async: async,
			success: function (data) {
				// if (data.retCode === "0000")
				_callback(data.retData); //模板获取后回调方法
				UTIL.closeload();
			}
		})
	},
	//重大事件详情列表
	eventDetail: function (data, async, _callback) {
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			stockCode: data.stockCode,
			eventType: data.eventType
		});
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.eventDetail,
			data: UTIL.RequestPakage,
			type: "post",
			async: async,
			success: function (data) {
				// if (data.retCode === "0000")
				_callback(data.retData); //模板获取后回调方法
				UTIL.closeload();
			}
		})
	},
	//融资情况列表
	issueList: function (data, async, _callback) {
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			stockCode: data.stockCode
		});
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.issueList,
			data: UTIL.RequestPakage,
			type: "post",
			async: async,
			success: function (data) {
				// if (data.retCode === "0000")
				_callback(data.retData); //模板获取后回调方法
				UTIL.closeload();
			}
		})
	},
	//发行对象列表
	issueDetail: function (data, async, _callback) {
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			stockCode: data.stockCode,
			raiseAmount: data.raiseAmount,
			date: data.date,
			pageNum: data.pageNum,
			pageSize: data.pageSize
		});
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.issueDetail,
			data: UTIL.RequestPakage,
			type: "post",
			async: async,
			success: function (data) {
				// if (data.retCode === "0000")
				_callback(data.retData); //模板获取后回调方法
				UTIL.closeload();
			}
		})
	},
	//交易情况列表
	tradeList: function (data, async, _callback) {
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			stockCode: data.stockCode
		});
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.tradeList,
			data: UTIL.RequestPakage,
			type: "post",
			async: async,
			success: function (data) {
				// if (data.retCode === "0000")
				_callback(data.retData); //模板获取后回调方法
				UTIL.closeload();
			}
		})
	},
	//主要产品及服务
	mainbusiness: function (data, async, _callback) {
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			stockCode: data.stockCode
		});
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.mainbusiness,
			data: UTIL.RequestPakage,
			type: "post",
			async: async,
			success: function (data) {
				// if (data.retCode === "0000")
				_callback(data.retData); //模板获取后回调方法
				UTIL.closeload();
			}
		})
	},
	//行业简介
	industryRemark: function (data, async, _callback) {
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			stockCode: data.stockCode
		});
		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.industryRemark,
			data: UTIL.RequestPakage,
			type: "post",
			async: async,
			success: function (data) {
				// if (data.retCode === "0000")
				_callback(data.retData); //模板获取后回调方法
				UTIL.closeload();
			}
		})
	},
	findBusinessIncome: function (data, async, _callback) {//2.2.1营业收入及同比增长率
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			stockCode: data.stockCode
		});

		$.ajax({
			type: "post",
			url: UTIL.CONFIG.findBusinessIncome,
			async: async,
			data: UTIL.RequestPakage,
			success: function (data) {
				_callback(data.retData);
				UTIL.closeload();
			}

		});
	},
	findTotalProfit: function (data, asycn, _callback) {//利润总额及同比增长率
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			stockCode: data.stockCode
		});
		$.ajax({
			type: "post",
			url: UTIL.CONFIG.findTotalProfit,
			async: asycn,
			data: UTIL.RequestPakage,
			success: function (data) {
				_callback(data.retData);
				UTIL.closeload();
			}
		});
	},
	findNetProfit: function (data, asycn, _callback) {//净利润及同比增长率
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			stockCode: data.stockCode
		});
		$.ajax({
			type: "post",
			url: UTIL.CONFIG.findNetProfit,
			async: asycn,
			data: UTIL.RequestPakage,
			success: function (data) {
				_callback(data.retData);
				UTIL.closeload();
			}
		});
	},
	findTotalAssets: function (data, asycn, _callback) {//总资产及同比增长率
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			stockCode: data.stockCode
		});
		$.ajax({
			type: "post",
			url: UTIL.CONFIG.findTotalAssets,
			async: asycn,
			data: UTIL.RequestPakage,
			success: function (data) {
				_callback(data.retData);
				UTIL.closeload();
			}
		});
	},

	findInterestRateChange: function (data, asycn, _callback) {//销售毛利率与销售净利率变动情况
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			stockCode: data.stockCode
		});
		$.ajax({
			type: "post",
			url: UTIL.CONFIG.findInterestRateChange,
			async: asycn,
			data: UTIL.RequestPakage,
			success: function (data) {
				_callback(data.retData);
				UTIL.closeload();
			}
		});
	},
	findIndustryAnalysis: function (data, asycn, _callback) {//查询行业分析的图表
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			stockCode: data.stockCode
		});
		$.ajax({
			type: "post",
			url: UTIL.CONFIG.findIndustryAnalysis,
			async: asycn,
			data: UTIL.RequestPakage,
			success: function (data) {
				//console.log(data);
				_callback(data.retData);
				UTIL.closeload();
			}
		});
	},
	findFinanceKernelData: function (data, async, _callback) {//财务核心数据
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			stockCode: data.stockCode
		});

		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.findFinanceKernelData,
			data: UTIL.RequestPakage,
			async: async,
			type: "post",
			success: function (data) {

				// if (data.retCode === "0000")
				//				data = JSON.parse(data);
				_callback(data.retData); //模板获取后回调方法
				UTIL.closeload();

			}

		})
	},
	findProfitData: function (data, async, _callback) {//盈利情况
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			stockCode: data.stockCode
		});

		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.findProfitData,
			data: UTIL.RequestPakage,
			async: async,
			type: "post",
			success: function (data) {

				// if (data.retCode === "0000")
				//				data = JSON.parse(data);
				_callback(data.retData); //模板获取后回调方法
				UTIL.closeload();

			}

		})
	},

	findGroupData: function (data, async, _callback) {//成长情况
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			stockCode: data.stockCode
		});

		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.findGroupData,
			data: UTIL.RequestPakage,
			async: async,
			type: "post",
			success: function (data) {

				// if (data.retCode === "0000")
				//					data = JSON.parse(data);
				_callback(data.retData); //模板获取后回调方法
				UTIL.closeload();

			}

		})
	},
	findPayData: function (data, async, _callback) {//偿债能力
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			stockCode: data.stockCode
		});

		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.findPayData,
			data: UTIL.RequestPakage,
			async: async,
			type: "post",
			success: function (data) {

				// if (data.retCode === "0000")
				//					data = JSON.parse(data);
				_callback(data.retData); //模板获取后回调方法
				UTIL.closeload();

			}

		})
	},
	findOperationData: function (data, async, _callback) {//财务核心数据
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			stockCode: data.stockCode
		});

		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.findOperationData,
			data: UTIL.RequestPakage,
			async: async,
			type: "post",
			success: function (data) {

				// if (data.retCode === "0000")
				//					data = JSON.parse(data);
				_callback(data.retData); //模板获取后回调方法
				UTIL.closeload();

			}

		})
	},
	findFinanceDepthData: function (data, async, _callback) {//财务深度数据
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			stockCode: data.stockCode
		});

		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.findFinanceDepthData,
			data: UTIL.RequestPakage,
			async: async,
			type: "post",
			success: function (data) {

				// if (data.retCode === "0000")
				//					data = JSON.parse(data);
				_callback(data.retData); //模板获取后回调方法
				UTIL.closeload();

			}

		})
	},
	findFinanceModelData: function (data, async, _callback) {//综合能力模型分析
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			stockCode: data.stockCode
		});

		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.findFinanceModelData,
			data: UTIL.RequestPakage,
			async: async,
			type: "post",
			success: function (data) {

				// if (data.retCode === "0000")
				//					data = JSON.parse(data);
				_callback(data.retData); //模板获取后回调方法
				UTIL.closeload();

			}

		})
	},
	findDubangData: function (data, async, _callback) {//财务核心数据
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			stockCode: data.stockCode
		});

		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.findDubangData,
			data: UTIL.RequestPakage,
			async: async,
			type: "post",
			success: function (data) {

				// if (data.retCode === "0000")
				//					data = JSON.parse(data);
				_callback(data.retData); //模板获取后回调方法
				UTIL.closeload();

			}

		})
	},
	findProfitForecastData: function (data, async, _callback) {//财务核心数据
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			stockCode: data.stockCode
		});

		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.findProfitForecastData,
			data: UTIL.RequestPakage,
			async: async,
			type: "post",
			success: function (data) {

				// if (data.retCode === "0000")
				//					data = JSON.parse(data);
				_callback(data.retData); //模板获取后回调方法
				UTIL.closeload();

			}

		})
	},

	findRiskClassNum: function (data, async, _callback) {//风险信息
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			stockCode: data.stockCode
		});

		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.findRiskClassNum,
			data: UTIL.RequestPakage,
			async: async,
			type: "post",
			beforeSend: function () {
				// $(".swiper-slide").eq(data.aa).
			},
			success: function (data) {

				// if (data.retCode === "0000")
				//					data = JSON.parse(data);
				_callback(data.retData); //模板获取后回调方法
				UTIL.closeload();

			}

		})
	},
	findLegal: function (data, _callback) {//法律诉讼列
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			stockCode: data.stockCode
		});

		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.findLegal,
			data: UTIL.RequestPakage,
			success: function (data) {

				// if (data.retCode === "0000")
				//					data = JSON.parse(data);
				_callback(data.retData); //模板获取后回调方法
				UTIL.closeload();

			}

		})
	},
	findAffiche: function (data, _callback) {//欠税公告
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			stockCode: data.stockCode
		});

		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.findAffiche,
			data: UTIL.RequestPakage,
			success: function (data) {

				// if (data.retCode === "0000")
				//					data = JSON.parse(data);
				_callback(data.retData); //模板获取后回调方法
				UTIL.closeload();

			}

		})
	},
	findPledged: function (data, _callback) {//股权出质
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			stockCode: data.stockCode
		});

		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.findPledged,
			data: UTIL.RequestPakage,
			success: function (data) {

				// if (data.retCode === "0000")
				//					data = JSON.parse(data);
				_callback(data.retData); //模板获取后回调方法
				UTIL.closeload();

			}

		})
	},
	findAbnormal: function (data, _callback) {//经营异常
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			stockCode: data.stockCode
		});

		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.findAbnormal,
			data: UTIL.RequestPakage,
			success: function (data) {

				// if (data.retCode === "0000")
				//					data = JSON.parse(data);
				_callback(data.retData); //模板获取后回调方法
				UTIL.closeload();

			}

		})
	},
	findFinanceCover: function (data, async, _callback) {//经营异常
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			stockCode: data.stockCode
		});

		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.findFinanceCover,
			data: UTIL.RequestPakage,
			async: async,
			type: "post",
			success: function (data) {

				// if (data.retCode === "0000")
				//					data = JSON.parse(data);
				_callback(data.retData); //模板获取后回调方法
				UTIL.closeload();

			}

		})
	},
	findIndexData: function (data, async, _callback) {//经营异常
		UTIL.RequestPakage = $.extend(true, UTIL.RequestPakage, {
			//stockCode: data.stockCode
		});

		$.ajax({
			url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.findIndexData,
			data: UTIL.RequestPakage,
			async: async,
			success: function (data) {

				// if (data.retCode === "0000")
				//					data = JSON.parse(data);
				_callback(data.retData); //模板获取后回调方法
				UTIL.closeload();

			}

		})
	}
};
window.WF_ajax = WF_ajax;
