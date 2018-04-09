var industryIds = ""; //行业id
var investorTypes = ""; //投资人类型
var searchStr = ""; //搜索内容
var dateType = "月"; //日期类型
var chartDateType = "周"; //图表的日期
var pageNum = 1;
var pageSize = 30;
var checkedHYIds = []; //选中的行业id集合

//全屏需要的参数
var quanpingdatas = [];
var iq = 0; //外循环
var jq = 0; //内循环
$(function () {

	//	//查询行业
	//	findCategory(0,2);
	//	1.5版本查询行业
	findAllCategory(0, 2);

	//统计公司融资情况
	findInvestorSituation();

	//查询投融资关系图
	findFinancingRelation();

	//点击融资情况里的时间
	$(".rz_time a").on("click", function () {
		$(this).addClass("on").siblings().removeClass("on");

		//			editShowCon("dt", "时间范围：" + $(this).text());
		dateType = $(this).text();

		//添加查询
		$(".erjiguanxitc").hide();
		$(".investorDiv").hide();
		//统计公司融资情况
		findInvestorSituation();
	})

	//点击图表选择时间
	$(".ty_leix a").click(function () {
		$(this).addClass("on").siblings().removeClass("on");
		$(".guanxi_tc").hide();
		$(".ty_guanxt").remove();//$("#ty_guanxt1").siblings

		pageNum = 1;
		chartDateType = $(this).text();
		//查询投融资关系图
		findFinancingRelation();
	})
	//删除已选的条件
	$(".hy_shaixuan").delegate("i", "click", function () {
		$(this).parent().remove();

		if ($(this).parent().attr("data-type") == "hy") { //行业种类
			industryIds = "";
			$(".indexhy_tc i").addClass("on"); //改变行业样式
			$(".indexhy_tc em").addClass("on"); //改变行业样式
		} else if ($(this).parent().attr("data-type") == "dt") { //时间类型
			dateType = "月";
			$(".rz_time a").each(function () {
				if ($(this).text() == "月") {
					$(this).addClass("on");
				} else {
					$(this).removeClass("on");
				}
			})
		} else if ($(this).parent().attr("data-type") == "ft") { //融资类型
			investorTypes = "";
			$(".hangy_qk .data-checkbox").addClass("on");
		} else if ($(this).parent().attr("data-type") == "search") { //搜索条件
			searchStr = "";
		}

		//添加查询
		$(".erjiguanxitc").hide();
		$(".investorDiv").hide();

		pageNum = 1;
		$(".ty_guanxt").remove();
		//统计公司融资情况
		findInvestorSituation();
		//查询投融资关系图
		findFinancingRelation();
	})
	//鼠标经过设置显示下拉指标
	$(".rz_shezhi").on("mouseenter", function () {
		$(".rz_shezhi_zb").show();
	})
	$(".hangy_qk .rz_shezhi").on("mouseleave", function () {
		$(".rz_shezhi_zb").hide();
	})
	//点击所有行业显示行业弹窗
	$(".hangye>span").on("click", function () {
		if ($(this).parent().find(".news_change_hy").is(":hidden")) {
			$(this).parent().find(".news_change_hy").show();
			$("#changgelist li").find("input").prop("checked", false);
			if (checkedHYIds.length == 0) {
				$("#changgelist li").find("input").prop("checked", true);
			} else {
				$(checkedHYIds).each(function (i, item) { //循环加上选中效果
					$("#changgelist li").each(function (j, item1) {
						if ($(item1).attr("data-value") == item) {
							$(item1).find("input").prop("checked", true);
						}
					});

				});
			}
			allchk();
		} else {
			$(this).parent().find(".news_change_hy").hide();
		}
	})
	//弹窗里的关注行业
	$(".indexhy_tc .hy_public").on("click", function () {
		var flag = 0;
		$(".indexhy_tc .hy_public").each(function (index, item) {
			if ($(item).find("em").hasClass("on")) {
				flag++;
			}
		})
		//			if(flag >= 6) {
		//				if($(this).find("em").hasClass("on")) {
		//					$(this).find("em").removeClass("on");
		//					$(this).find(".hy_icons").find("i").removeClass("on");
		//				}
		//				console.log($(this).find("span").text());
		//			} else {
		if ($(this).find("em").hasClass("on")) {
			$(this).find("em").removeClass("on");
			$(this).find(".hy_icons").find("i").removeClass("on");
		} else {
			$(this).find("em").addClass("on");
			$(this).find(".hy_icons").find("i").addClass("on");
		}
		//			}
	})
	//点击弹窗的确定按钮
	//	$(".hy_shure>span").on("click", function() {
	//		var flag = true;
	//   	industryIds = ""; //选择行业的id
	//   	var yixuanHy = "行业："; //显示的条件
	//   	$(".indexhy_tc .hy_public").each(function(index,item){
	//			if($(item).find("em").hasClass("on")){
	//				industryIds += $(this).find("span").attr("data-value") + ",";
	//				yixuanHy += $(this).find("span").parent().attr("title") + "、";
	//			}
	//		})
	//		if(industryIds != ""){ //有选择的行业
	//			industryIds = industryIds.substring(0, industryIds.length - 1);
	//			yixuanHy = yixuanHy.substring(0, yixuanHy.length - 1);
	//			
	//			editShowCon("hy",yixuanHy);
	//			
	//			//添加查询
	//			$(".erjiguanxitc").hide();
	//			$(".investorDiv").hide();
	//			
	//			pageNum = 1;
	//			$(".ty_guanxt").remove();
	//			
	//			//统计公司融资情况
	//			findInvestorSituation();
	//			//查询投融资关系图
	//			findFinancingRelation();
	//		}else{
	//			$.zmAlert("请选择行业");
	//		}
	//   	$(this).parents(".rz_hy_tc").hide();
	//	})



	//1.5版本2017-07-17郭建杰添加行业选择确定按钮开始

	$(".chagege_true").on("click", function () {
		var flag = true;
		industryIds = ""; //选择行业的id
		var yixuanHy = "行业："; //显示的条件
		$("[name='checkname']").each(function (index, item) {
			if ($(item).siblings("input").prop("checked")) {
				industryIds += "'" + $(item).attr("data-value") + "',";
				yixuanHy += $(item).attr("title") + "、";
			}
		});
		if (industryIds != "") { //有选择的行业
			$(".news_change_hy").hide();
			industryIds = industryIds.substring(0, industryIds.length - 1);
			yixuanHy = yixuanHy.substring(0, yixuanHy.length - 1);
			editShowCon("hy", yixuanHy);
			//添加查询
			$(".erjiguanxitc").hide();
			$(".investorDiv").hide();

			pageNum = 1;
			$(".ty_guanxt").remove();

			//统计公司融资情况
			findInvestorSituation();
			//查询投融资关系图
			findFinancingRelation();

		} else {
			$.zmAlert("至少选择一个行业");
		}
		checkedHYIds = [];

		$("[name='check']").each(function () {
			if (this.checked) {
				checkedHYIds.push($(this).parent("li").attr("data-value"));
			}
		})

	});
	//	点击取消 关闭选择行业弹层
	$(".chagege_false").on("click", function () {
		$(".news_change_hy").hide();
	})
	//1.5版本2017-07-17郭建杰添加行业选择确定按钮结束


	//点击清除检索条件
	$(".qingc_tj").on("click", function () {
		$(this).siblings("a").remove();

		industryIds = "";
		$(".indexhy_tc i").addClass("on"); //改变行业样式
		$(".indexhy_tc em").addClass("on"); //改变行业样式

		//改变选择时间类型样式
		dateType = "月";
		$("[data-btType='sx']").remove();
		$(".rz_time a").each(function () {
			if ($(this).text() == "月") {
				$(this).addClass("on");
			} else {
				$(this).removeClass("on");
			}
		})

		//改变融资类型样式
		investorTypes = "";
		$(".hangy_qk .data-checkbox").addClass("on");

		searchStr = "";
		//添加查询
		$(".erjiguanxitc").hide();
		$(".investorDiv").hide();

		pageNum = 1;
		$(".ty_guanxt").remove();
		//统计公司融资情况
		findInvestorSituation();
		//查询投融资关系图
		findFinancingRelation();
	})
	//点击行业后边的那个多选
	$(".data-checkbox").on("click", function () {
		if ($(this).find(".checkboxWord").text() == "全部") {
			if ($(this).hasClass("on")) {
				$(this).removeClass("on");
				$(this).parent().children(".data-checkbox").removeClass("on");
			} else {
				$(this).addClass("on");
				$(this).parent().find(".data-checkbox").addClass("on");
			}
		} else {
			if ($(this).hasClass("on")) {
				if ($(".hangy_qk .data-checkbox.on").length > 1) {
					$(this).removeClass("on");
				} else {
					$.zmAlert("至少选择一个");
				}


				//       		$(this).parent().find(".data-checkbox").eq(0).removeClass("on");
			} else {
				var flag = 0;
				$(".hangy_qk .data-checkbox").each(function (index, item) {
					if ($(item).hasClass("on")) {
						flag++;
					}
				})
				$(this).addClass("on");
				if (flag == 1) {
					//       			$(this).parent().find(".data-checkbox").eq(0).addClass("on");
				}
			}
		}
		var ivShowText = "投资人类型：";
		investorTypes = "";
		$(".hangy_qk .data-checkbox").each(function () {
			if ($(this).children(".checkboxWord").text() != "全部") {
				if ($(this).hasClass("on")) {
					ivShowText += $(this).children(".checkboxWord").text() + "、";
					investorTypes += $(this).attr("data-value") + ",";
				}
			}
		})
		ivShowText = ivShowText.substring(0, ivShowText.length - 1);//去掉最后的“、”号
		if (investorTypes != "") {
			investorTypes = investorTypes.substring(0, investorTypes.length - 1);
			editShowCon("ft", ivShowText);
			//添加查询
			$(".erjiguanxitc").hide();
			$(".investorDiv").hide();

			pageNum = 1;
			$(".ty_guanxt").remove();
			//统计公司融资情况
			findInvestorSituation();
			//查询投融资关系图
			findFinancingRelation();
		} else {
			$(".hy_shaixuan [data-type='ft']").remove();
			$.zmAlert("请选择投资人类型");
		}
	})
	//点击隐藏时弹窗隐藏
	$(".guanxi_tc").delegate("i", "click", function () {
		$("#moreMsg").show();
		$(this).parent().hide();
	})

	/**
	 * 点击搜索按钮
	 */
	$("#searchStr").next().click(function () {
		if ($.trim($("#searchStr").val()) != null && $.trim($("#searchStr").val()) != "") {
			industryIds = "";
			investorTypes = "";
			$(".indexhy_tc i").addClass("on"); //改变行业样式
			$(".indexhy_tc em").addClass("on"); //改变行业样式
			//改变融资类型样式
			$(".hangy_qk .data-checkbox").addClass("on");
			$("#searchStr").attr('placeholder', '公司简称/股票代码/投资机构名称，看投融关系');
			searchStr = $("#searchStr").val();
			editShowCon("search", "搜索条件：" + $("#searchStr").val());

			$(".hy_shaixuan a").each(function () { //删除筛选条件
				if ($(this).attr("data-type") == "hy" || $(this).attr("data-type") == "ft") {
					$(this).remove();
				}
			})

			pageNum = 1;
			$(".ty_guanxt").remove();
			//统计公司融资情况
			findInvestorSituation();
			//查询投融资关系图
			findFinancingRelation();

			$("#searchStr").val("");
		}
	})

	//加载更多
	$("#moreMsg").click(function () {
		if ($(this).text() != "暂无数据") {
			pageNum++;
			findFinancingRelation();
		}
	})

	/*信息补全开始*/
	$("#searchStr").keydown(function (e) {
		if (e.keyCode == 13) {
			//回车事件
			if ($("#searchStr").val() != "") {
				var val = $.trim($("#searchStr").val());
				/*if(searchList.length != 0) {
					$.each(searchList, function(index, flag) {
						if(val.indexOf(flag.code) > -1  || val.indexOf(flag.name) > -1) {
							
						}
					});
				}else{
					$.zmAlert("请输入正确的检索信息");
				}*/
			} else {
				$.zmAlert("请输入要检索的信息");
			}
			$("#ui-id-2").hide();
		}
	});

	//首页顶部搜索
	$("#searchStr").autocomplete({
		minLength: 2,
		source: function (request, response) {
			findSearchMsg(request, response);
		},
		delay: 500,
		select: function (event, ui) {
			var item = ui.item;
			//			console.log(item);
			searchStr = item.code;
			var showText = item.label;
			item.value = "";
			industryIds = "";
			investorTypes = "";
			$(".indexhy_tc i").addClass("on"); //改变行业样式
			$(".indexhy_tc em").addClass("on"); //改变行业样式
			//改变融资类型样式
			$(".hangy_qk .data-checkbox").addClass("on");
			$("#searchStr").attr('placeholder', '公司简称/股票代码/投资机构名称，看投融关系');

			editShowCon("search", "搜索条件：" + showText);

			$(".hy_shaixuan a").each(function () { //删除筛选条件
				if ($(this).attr("data-type") == "hy" || $(this).attr("data-type") == "ft") {
					$(this).remove();
				}
			})
			pageNum = 1;
			$(".ty_guanxt").remove();
			//统计公司融资情况
			findInvestorSituation();
			//查询投融资关系图
			findFinancingRelation();
		}
	});
	/*信息补全结束*/
	//	2017-07-16行业选择全选
	$("#allcheck").click(function () {
		if (this.checked) {
			$("#changgelist :checkbox").prop("checked", true);
			allchk()
		} else {
			$("#changgelist :checkbox").prop("checked", false);
			allchk()
		}
	});
	$("#changgelist :checkbox").click(function () {
		allchk();
	});
	//	点击文字选中该行业
	$("#changgelist li a").click(function () {
		if ($($(this).prev()).prop("checked")) {

			$(this).siblings("input").prop("checked", false);
		} else {
			$(this).siblings("input").prop("checked", true);
		}
		allchk();
	});

	//	点击全屏按钮弹出全屏关系图
	$("#quanping").on("click", function () {
		var windowsHeight = $(window).height();
		$(".tzgx_qpdobx").css("height", windowsHeight);
		$(".tzgx_qpdobx").show();
		$("html,body").css("overflow", "hidden");
		$(".erjiguanxitc").hide();
		$(".investorDiv").hide();
		draw_util_quanping();

	});
	$("#gbquanping").on("click", function () {
		$("html,body").css("overflow", "auto");
		$(".erjiguanxitc01").hide();
		$(".investorDiv01").hide();
		$(".tzgx_qpdobx").hide();
	});
	$("#close_tzf_center").on("click", function () {
		$(".tzf_center_tc").hide();
		$(".tmtc_new").hide();
	})
});


//选中个数
function allchk() {
	var chknum = $("#changgelist :checkbox").size();//选项总个数
	var chk = 0;
	$("#changgelist :checkbox").each(function () {
		if ($(this).prop("checked") == true) {
			chk++;
		}
	});
	$("#checnknumber").html(chk);
	if (chknum == chk) {//全选 
		$("#allcheck").prop("checked", true);
	} else {//不全选 
		$("#allcheck").prop("checked", false);
	}
}
/**
 * 更改筛选显示的条件
 * @param dataType
 * @param showText
 */
function editShowCon(dataType, showText) {
	var flag = true;
	var yShowText = showText;

	if (showText.length > 30) {
		showText = showText.substring(0, 30) + "...";
	}/*else{
		showText = showText.substring(0,showText.length-1);
	}*/

	$(".hy_shaixuan a").each(function () {
		if ($(this).attr("data-type") == dataType) {
			flag = false;
			$(this).attr("title", yShowText);
			$(this).html(showText + "<i></i>");
		}
	})

	if (flag) {
		var a = '<a href="javascript:void(0)" data-btType="sx" data-type=' + dataType + ' title=' + yShowText + ' >' + showText + '<i></i></a>';
		$(".xuanze_zhib_leix").append(a);
	}
}


/**
 * 查询所有行业
 */
function findCategory(type, level) {
	$.axs("/betaStock/common/findTrade.do", { categorType: type, levelId: level }, false, function (data) {
		if (data.retCode == "0000") {
			var result = data.retData;
			if (result == null) {
				return false;
			}
			var htm = '';
			for (var i = 0; i < result.length; i++) {
				var obj = result[i];
				var categoryName = obj.categoryName;
				htm += '<div class="hy_public fl ' + obj.pinyin + '" title="' + categoryName + '">';
				htm += '<div class="hy_icons">';
				htm += '<i class="on" ></i>';
				htm += '</div>';
				if (categoryName.length > 6) {
					categoryName = categoryName.substring(0, 5) + "...";
				}
				htm += '<span data-value="' + obj.categoryId + '">' + categoryName + '</span>';
				htm += '<em class="on" ></em>';
				htm += '</div>';
			}
			htm += '<div class="clr"></div>';
			$("div.indexhy_tc").html(htm);
		} else {
			errorAlert(data.retCode, data.retMsg);
		}
	});
}


/**
 * 1.5版2017-7-17查询所有行业
 */
function findAllCategory(type, level) {
	$.axs("/betaStock/common/findTrade.do", { categorType: type, levelId: level }, false, function (data) {
		if (data.retCode == "0000") {
			var result = data.retData;
			if (result == null) {
				return false;
			}
			var htm = '';
			for (var i = 0; i < result.length; i++) {
				var obj = result[i];
				var categoryName = obj.categoryName;
				htm += '<li data-value="' + obj.categoryId + '">';
				htm += '<input type="checkbox" name="check" checked="checked"/>';
				htm += '<a href="javascript:;" name="checkname" title="' + categoryName + '" data-value="' + obj.categoryId + '">';
				if (categoryName.length > 6) {
					categoryName = categoryName.substring(0, 5) + "...";
				}
				htm += '' + categoryName + '</a>';
				htm += '<div class="clr"></div>';
				htm += '</li>';
			}
			$("#changgelist").html(htm);
			//			$("input[name='check']").prop("checked",true);
			//			$(".news_change_hy").hide();

		} else {
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

/**
 * 统计公司融资情况
 */
function findInvestorSituation() {
	$.axs("/betaInvest/investor/findInvestorSituation.do",
		{
			industryIds: industryIds, investorTypes: investorTypes,
			investor: searchStr, dateType: dateType
		},
		false, function (data) {
			if (data.retCode == "0000") {
				var result = data.retData.IS;
				if (result == null) {
					return false;
				}
				var str = data.retData.beginTime;
				var str2 = data.retData.endTime;
				if (str.length > 7 && str2.length > 7) {
					var arr = [str.split("-")[0], str.split("-")[1], str.split("-")[2]];
					var time1 = arr[0] + "年" + arr[1] + "月" + arr[2] + "日";
					var arr2 = [str2.split("-")[0], str2.split("-")[1], str2.split("-")[2]];
					var time2 = arr2[0] + "年" + arr2[1] + "月" + arr2[2] + "日";
				} else {
					var arr = [str.split("-")[0], str.split("-")[1]];
					var time1 = arr[0] + "年" + arr[1] + "月";
					var arr2 = [str2.split("-")[0], str2.split("-")[1]];
					var time2 = arr2[0] + "年" + arr2[1] + "月";
				}
				//			console.log(str.length);
				$("#timeRange").text(time1 + "—" + time2);
				$("#investorNum").text((result.investors == null ? "--" : result.investors));
				$("#companyNum").text((result.company == null ? "--" : result.company));
				$("#amountNum").text((result.amount == null ? "--" : result.amount));
				$("#amountAddNet").text((result.sum == null ? "--" : result.sum) + "%");
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});
}

/**
 * 查询投融资关系图
 */
function findFinancingRelation() {
	//quanpingdatas=[];
	$.axs("/betaInvest/investor/findFinancingRelation.do",
		{
			industryIds: industryIds, investorTypes: investorTypes,
			investor: searchStr, dateType: chartDateType, pageNum: pageNum, pageSize: pageSize
		},
		false, function (data) {
			if (data.retCode == "0000") {
				var result = data.retData;
				if (result == null) {
					return false;
				}

				var isShow = true;
				if (pageNum != 1) {
					isShow = false;
				}
				if (result.stockList != null && result.stockList.length > 0) {
					if (pageNum == 1) {
						$("#ty_guanxt1").show();
						quanpingdatas["project"] = [];
						quanpingdatas["vc"] = [];

						iq = 0;
						jq = 0;
					}
					var scArr = result.stockList; //公司代码集合
					var dataChart = {}; //{"公司代码":[数字集合]}
					$(scArr).each(function (index, item) {
						dataChart[item] = [];
					})
					//				console.log(dataChart)
					$(result.frList).each(function (index, item) {
						if (dataChart[item.stockCode] != null && dataChart[item.stockCode] != undefined) {
							dataChart[item.stockCode].push(item);
						}
					})
					//console.log(dataChart)
					var tzrData = []; //投资人数据
					var gsData = []; //公司的数据
					$(dataChart).each(function (index, item) {

					})
					var i = 0; //外循环
					var j = 0; //内循环
					var tzrIdArr = [];
					var companyNameJieQu = "";//公司截取名称
					var companyShortName = ""//公司简称
					var tzrIdQPArr = []; //全屏参数的添加集合
					for (var co in dataChart) { //进行拼装数据
						tzrIdArr = [];
						tzrIdQPArr = [];
						$(dataChart[co]).each(function (index, item) { //投资人
							//投资公司
							if (item.people_or_company == '1') {
								companyNameJieQu = item.investors_name_short;
								companyShortName = item.investors_name_short;
								if (companyNameJieQu != null) {
									if (companyNameJieQu.length > 6) {
										companyNameJieQu = companyNameJieQu.substring(0, 3) + "\n" + companyNameJieQu.substring(3, 6) + "..";
									} else {
										if (companyNameJieQu.length > 3) {
											companyNameJieQu = companyNameJieQu.substring(0, 3) + "\n" + companyNameJieQu.substring(3, companyNameJieQu.length);
										}
									}
								}
							} else {
								companyNameJieQu = item.investorsName;
								companyShortName = item.investorsName;
							}
							tzrData.push({
								"id": j,
								"shouName": (companyShortName == null ? "--" : companyShortName),
								"fullName": (item.investorsName == null ? "--" : item.investorsName),
								"name": (companyNameJieQu == null ? "--" : companyNameJieQu),
								"total": (item.number == null ? "--" : item.number),
								"round": {
									"angle": 0,
									"a": 2,
									"b": 0,
									"c": 0,
									"d": 0,
									"ipo": 0,
									"merge": 0,
									"strategic": 0,
									"unknown": 0,
									"pre_ipo": 0
								}
							});

							quanpingdatas["vc"].push({
								"id": jq,
								"shouName": (companyShortName == null ? "--" : companyShortName),
								"fullName": (item.investorsName == null ? "--" : item.investorsName),
								"name": (companyNameJieQu == null ? "--" : companyNameJieQu),
								"total": (item.number == null ? "--" : item.number),
								"round": {
									"angle": 0,
									"a": 2,
									"b": 0,
									"c": 0,
									"d": 0,
									"ipo": 0,
									"merge": 0,
									"strategic": 0,
									"unknown": 0,
									"pre_ipo": 0
								}
							});
							tzrIdArr.push(j);
							tzrIdQPArr.push(jq);

							j++;
							jq++;
						})

						//公司
						gsData.push({
							"pid": i,
							"name": (dataChart[co][0].stockName == null ? "--" : dataChart[co][0].stockName),
							"cnt": (dataChart[co][0].amount == null ? "--" : dataChart[co][0].amount),
							"code": (dataChart[co][0].stockCode == null ? "--" : dataChart[co][0].stockCode),
							"money": (dataChart[co][0].rental == null ? "--" : dataChart[co][0].rental.toFixed(2)),
							"vc": tzrIdArr
						});

						quanpingdatas["project"].push({
							"pid": iq,
							"name": (dataChart[co][0].stockName == null ? "--" : dataChart[co][0].stockName),
							"cnt": (dataChart[co][0].amount == null ? "--" : dataChart[co][0].amount),
							"code": (dataChart[co][0].stockCode == null ? "--" : dataChart[co][0].stockCode),
							"money": (dataChart[co][0].rental == null ? "--" : dataChart[co][0].rental.toFixed(2)),
							"vc": tzrIdQPArr
						});
						i++;
						iq++;
					}

					var chartsData = { "project": gsData, "vc": tzrData };
					//				console.log(JSON.stringify(chartsData))
					$("#moreMsg").parent().before("<div class='ty_guanxt' id='ty_guanxt" + pageNum + "'></div>");
					draw_util(chartsData, isShow);
					if (result.stockList.length < 30) {
						$("#moreMsg").text("已显示全部数据");
					} else {
						$("#moreMsg").text("加载更多");
					}
				} else {
					if (pageNum == 1) {
						$("#ty_guanxt1").hide();
						$("#moreMsg").text("暂无数据");
						quanpingdatas = [];
					} else {
						$("#moreMsg").text("已显示全部数据");
					}
					//				draw_util({"project":[],"vc":[]}, isShow);
				}
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});
}

// 创建股权关系ECharts图表
/**
 * chartsData 加载的数据
 * isShow 是否显示legend
 * isQP 是否是全屏
 */
function draw_util(chartsData, isShow, isQP) {

	var _cache = {};
	var _last_req = {};
	var _ajax_flag = false;
	
	if((chartsData.project==null||chartsData.project=="" || chartsData.project==undefined) && (chartsData.vc==null || chartsData.vc=="" || chartsData.vc==undefined)){
		$(".gxt-zwsj").show();
	}else{
		$(".gxt-zwsj").hide();
	}
	if (isQP) {
		$(".ty_guanxit_more").hide();
		$(".tzgx_qpdobx").css("height", $(window).height());
		$("#gxt_echart").css("height", $(window).height());
		$(".qpwbox_gdt").css("width", $(window).width() + 17);
		myChart = echarts.init(document.getElementById('gxt_echart'));
		
	} else {
		myChart = echarts.init(document.getElementById('ty_guanxt' + pageNum));
	}

	var json = {
		"data": chartsData
	}
	var data = json.data;
	var data1 = [];
	var inx = 0;
	for (var i = 0; i < data.project.length; i++) {
		var n = {}, p = data.project[i];
		n['name'] = p.name;
		n['shouName'] = p.shouName;
		n['fullName'] = p.fullName;
		n['code'] = p.code;
		n['pid'] = p.pid;
		n['category'] = 0;
		n['id'] = 'p' + p.pid;
		n['symbol'] = 'circle';
		n['symbolSize'] = 70;
		n['value'] = 20;
		n['inx'] = inx++;
		n['money'] = p.money;
		n['cnt'] = p.cnt;
		n['itemStyle'] = {
			'emphasis': {
				'color': '#f7a35c',
				'borderColor': '#ffffff',
				'borderWidth': 2
			}
		}
		data1.push(n);
	}
	var data2 = [];
	var inx = data.project.length;
	for (var i = 0; i < data.vc.length; i++) {
		var n = {}, p = data.vc[i];
		n['name'] = p.name;
		n['shouName'] = p.shouName;
		n['fullName'] = p.fullName;
		n['category'] = 1;
		n['id'] = 'v' + p.id;
		n['vid'] = p.id;
		n['symbol'] = 'circle';
		n['symbolSize'] = 50;
		n['value'] = 10;
		n['round'] = p.round;
		n['total'] = p.total;
		n['inx'] = inx++;
		n['total'] = p.total;
		n['itemStyle'] = {
			'emphasis': {
				'color': '#80b8f1',
				'borderColor': '#ffffff',
				'borderWidth': 2
			}
		}
		data2.push(n);
	}
	var link = [];
	var id = 0;
	for (var i = 0; i < data.project.length; i++) {
		var n = data.project[i];
		var vc = data.project[i].vc;
		if (vc && vc.length > 0) {
			for (var j = 0; j < vc.length; j++) {
				var v = vc[j];
				var t = {};
				t['source'] = 'p' + n.pid;
				t['target'] = 'v' + v;
				t['id'] = id++;
				//                            t['lineStyle'] = {
				//                                'emphasis':{
				//                                    'color':'rgb(255,0,0)'
				//                                }
				//                            }
				link.push(t);
			}
		}
	}
	_cache['project'] = data1;
	_cache['vc'] = data2;
	_cache['link'] = link;
	_cache['category'] = [{ 'name': '融资公司', 'itemStyle': { 'normal': { 'color': '#b5a1e7' } } }, { 'name': '投资人', 'itemStyle': { 'normal': { 'color': '#3fa9e2' } } }];
	var option = {
		title: {
			text: '',
			subtext: '',
			top: 'bottom',
			left: 'right'
		},
		tooltip: {
			formatter: function (e) {
				if (e.data && e.data.category == 1) {
					//机构
					return e.data.shouName + '    <br/>' + '投资' + e.data.total + '笔';
				} else if (e.data && e.data.category == 0) {
					//项目
					return (e.data.name + "(" + e.data.code + ")") + '    <br/>' + '融资' + e.data.cnt + '次<br/>' + '融资金额' + e.data.money + '万元<br/>';
				}
			}
		},
		legend: [{
			// selectedMode: 'single',
			data: _cache['category'].map(function (e) { return e.name }),
			left: 'center',
			top: '2%',
			show: isShow
		}],
		//          grid: {
		//	        left: '5%',
		//	        right: '1%',
		//	        top:'middle',
		//	        containLabel: true
		//	    },
		animationDuration: 1500,
		animationEasingUpdate: 'quinticInOut',
		series: [
			{
				name: '投融资关系图',
				type: 'graph',
				layout: 'force',
				 force: {
				 	edgeLength: 100,
				 	repulsion: 200,
				 	gravity: 0.1,
				 	layoutAnimation : true
				 },

				// symbolSize: 380,
				roam: true,
				draggable: true,
				 label: {
				 	normal: {
				 		show: true,
				 		//                          position: 'right',
				 		formatter: '{b}'
				 	}
				 },
				 lineStyle: {
				 	normal: {
				 		curveness: 0
				 	}
				 },
				data: _cache['project'].concat(_cache['vc']),
				links: _cache['link'],
				categories: _cache['category'],
			}
		]
	};

	myChart.setOption(option);
	myChart.on("click", function (params) {
		$("#moreMsg").hide();
		$('html,body').animate({ scrollTop: document.body.scrollHeight }, 800);
		if (params.data.code == undefined) { //投资人
			if (isQP) {
				$(".investorDiv01").css("width", $(window).width());
				$(".erjiguanxitc01").css("width", $(window).width());
				findCompanyORInvestor01(params.data.fullName, 2);
			} else {
				findCompanyORInvestor(params.data.fullName, 2);
			}

		} else { //公司
			if (isQP) {
				$(".investorDiv01").css("width", $(window).width());
				$(".erjiguanxitc01").css("width", $(window).width());
				findCompanyORInvestor01(params.data.code, 1);
			} else {
				findCompanyORInvestor(params.data.code, 1);
			}

		}
		
	})

}
//创建股权关系ECharts图表(全屏)
function draw_util_quanping() {
	$("#gxt_echart").css("height", $(window).height());

	//	$("#gxt_echart").css("height", $(".ty_guanxt").length * $(window).height());
	$(".qpwbox_gdt").css("width", $(window).width() + 17);
	//console.log(quanpingdatas)
	draw_util(quanpingdatas, true, true);
}
/**
 * 搜索补全信息查询
 * @param request
 * @param response
 * @param type
 */
function findSearchMsg(request, response) {
	$.axs("/betaInvest/investor/findCodeNameInvestor.do",
		{ codeName: $("#searchStr").val() },
		false, function (data) {
			if (data.retCode == 0000) {
				if (data.retData == null) {
					return false;
				}
				var arr = [];
				$.each(data.retData, function (i, item) {

					if (item.investorsName == null) {
						var obj = {
							label: item.stockName + "(" + item.stockCode + ")",
							code: item.stockCode
						}
					} else {
						var obj = {
							label: item.investorsName,
							code: item.investorsName
						}
					}
					arr.push(obj);
				});
				searchList = arr;
				response(arr); //.slice(0, 5)
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});
}

/**
 * 查询公司或者投资人的融资信息
 * @param searchStr
 * @param type 1：公司，2：投资人
 */
function findCompanyORInvestor(searchCI, type) {
	if (type == 1) {//公司
		$.axs("/betaInvest/investor/findCompanyORInvestorTongJi.do",
			{ searchStr: searchCI, dateType: chartDateType },
			false, function (data) {
				if (data.retCode == 0000) {
					if (data.retData == null) {
						return false;
					}

					var companyHtml = "";
					var ftNum = 0;
					$(data.retData).each(function (index, item) {
						companyHtml += "<tr>"
							+ "<td>" + (this.noticeDate == null ? "--" : this.noticeDate) + "</td>"
							+ "<td>" + this.financeType + "</td>"
							+ "<td class='shuzi'>" + (this.investSum == null ? "--" : this.investSum.toFixed(2)) + "</td>"
							+ "<td ><a href='javascript:;'  onClick='showGongsi(\"" + this.stockCode + "\",\"" + this.noticeDate + "\")'>" + (this.investorsName == null ? "--" : this.investorsName) + "家</a></td>";
						+"</tr>";

						if ((index + 1) == data.retData.length) {
							$("#stock").text((this.stockName == null ? "--" : this.stockName) + "(" + (this.stockCode == null ? "--" : this.stockCode) + ")");
							var name = this.stockName;
							var code = this.stockCode;
							$("#stock").click(function () {
								window.location.href = '/businessDetails/newTBindex.html?stockName=' + name + '&stockCode=' + code + '';
							});
							$("#industryName").text((this.industryName == null ? "--" : this.industryName));
							$("#companyFTNum").text(data.retData.length);
						}
						ftNum += (this.investSum == null ? 0 : this.investSum);
					})
					$("#ftNum").text(ftNum.toFixed(2));
					$("#companyTBody").html(companyHtml);
					$(".investorDiv").hide();
					$(".erjiguanxitc").show();
				} else {
					errorAlert(data.retCode, data.retMsg);
				}
			});
	}
	if (type == 2) {//投资人
		$.axs("/betaInvest/investor/findCompanyORInvestor.do",
			{ searchStr: searchCI, dateType: chartDateType },
			false, function (data) {
				if (data.retCode == 0000) {
					if (data.retData == null) {
						return false;
					}
					var investorHtml = "";
					var rzMoney = 0;//投资金额
					$(data.retData).each(function (index, item) {
						investorHtml += "<tr>"
							+ "<td> <a target='_blank' href='/businessDetails/newTBindex.html?stockCode=" + this.stockCode + "&stockName=" + this.stockName + "'>" + (this.stockName == null ? "--" : this.stockName) + "</a></td>"
							+ "<td>" + this.financeType + "</td>"
							+ "<td class='shuzi'>" + (this.investSum == null ? "--" : this.investSum.toFixed(2)) + "</td>"
							+ "<td>" + (this.industryName == null ? "--" : this.industryName) + "</td>";
						var showInvestor = this.investorsName;
						if (this.investorsName != null && this.investorsName != "" && (this.investorsName).length > 5) {
							showInvestor = (this.investorsName.substring(0, 5)) + "...";
						}
						investorHtml += "<td title=" + (this.investorsName == null ? "--" : this.investorsName) + " >" + (showInvestor == null ? "--" : showInvestor) + "</td>"
							+ "<td class='shuzi'>" + (this.noticeDate == null ? "--" : this.noticeDate) + "</td>"
							+ "</tr>";

						if ((index + 1) == data.retData.length) {
							$("#investorName").text((this.investorsName == null ? "--" : this.investorsName));
							$("#investorFTNum").text(data.retData.length);
						}
						rzMoney += (this.investSum == null ? 0 : this.investSum);
					})
					$("#investorMsg").text(rzMoney.toFixed(2) + "万");
					$("#investorTBody").html(investorHtml);
					$(".erjiguanxitc").hide();
					$(".investorDiv").show();
				} else {
					errorAlert(data.retCode, data.retMsg);
				}
			});
	}

}


function findCompanyORInvestor01(searchCI, type) {
	if (type == 1) {//公司
		$.axs("/betaInvest/investor/findCompanyORInvestorTongJi.do",
			{ searchStr: searchCI, dateType: chartDateType },
			false, function (data) {
				if (data.retCode == 0000) {
					if (data.retData == null) {
						return false;
					}

					var companyHtml = "";
					var ftNum = 0;
					$(data.retData).each(function (index, item) {
						companyHtml += "<tr>"
							+ "<td>" + (this.noticeDate == null ? "--" : this.noticeDate) + "</td>"
							+ "<td>" + this.financeType + "</td>"
							+ "<td class='shuzi'>" + (this.investSum == null ? "--" : this.investSum.toFixed(2)) + "</td>"
							+ "<td ><a href='javascript:;'  onClick='showGongsi(\"" + this.stockCode + "\",\"" + this.noticeDate + "\")'>" + (this.investorsName == null ? "--" : this.investorsName) + "家</a></td>";
						+"</tr>";

						if ((index + 1) == data.retData.length) {
							$("#stock01").text((this.stockName == null ? "--" : this.stockName) + "(" + (this.stockCode == null ? "--" : this.stockCode) + ")");
							var name = this.stockName;
							var code = this.stockCode;
							$("#stock01").click(function () {
								window.location.href = '/businessDetails/newTBindex.html?stockName=' + name + '&stockCode=' + code + '';
							});
							$("#industryName01").text((this.industryName == null ? "--" : this.industryName));
							$("#companyFTNum01").text(data.retData.length);
						}
						ftNum += (this.investSum == null ? 0 : this.investSum);
					})
					$("#ftNum01").text(ftNum.toFixed(2));
					$("#companyTBody01").html(companyHtml);
					$(".investorDiv01").hide();
					$(".erjiguanxitc01").show();

				} else {
					errorAlert(data.retCode, data.retMsg);
				}
			});
	}
	if (type == 2) {//投资人
		$.axs("/betaInvest/investor/findCompanyORInvestor.do",
			{ searchStr: searchCI, dateType: chartDateType },
			false, function (data) {
				if (data.retCode == 0000) {
					if (data.retData == null) {
						return false;
					}
					var investorHtml = "";
					var rzMoney = 0;//投资金额
					$(data.retData).each(function (index, item) {
						investorHtml += "<tr>"
							+ "<td> <a target='_blank' href='/businessDetails/newTBindex.html?stockCode=" + this.stockCode + "&stockName=" + this.stockName + "'>" + (this.stockName == null ? "--" : this.stockName) + "</a></td>"
							+ "<td>" + this.financeType + "</td>"
							+ "<td class='shuzi'>" + (this.investSum == null ? "--" : this.investSum.toFixed(2)) + "</td>"
							+ "<td>" + (this.industryName == null ? "--" : this.industryName) + "</td>";
						var showInvestor = this.investorsName;
						if (this.investorsName != null && this.investorsName != "" && (this.investorsName).length > 5) {
							showInvestor = (this.investorsName.substring(0, 5)) + "...";
						}
						investorHtml += "<td title=" + (this.investorsName == null ? "--" : this.investorsName) + " >" + (showInvestor == null ? "--" : showInvestor) + "</td>"
							+ "<td class='shuzi'>" + (this.noticeDate == null ? "--" : this.noticeDate) + "</td>"
							+ "</tr>";

						if ((index + 1) == data.retData.length) {
							$("#investorName01").text((this.investorsName == null ? "--" : this.investorsName));
							$("#investorFTNum01").text(data.retData.length);
						}
						rzMoney += (this.investSum == null ? 0 : this.investSum);
					})
					$("#investorMsg01").text(rzMoney.toFixed(2) + "万");
					$("#investorTBody01").html(investorHtml);
					$(".erjiguanxitc01").hide();
					$(".investorDiv01").show();
				} else {
					errorAlert(data.retCode, data.retMsg);
				}
			});
	}

}
function showGongsi(stockCode, noticeDate, pageNum, pageSize) {
	$(".tmtc_new").show();
	$(".tzf_center_tc").show();
	if (pageNum == null) {
		pageNum = 1;
	}
	if (pageSize == null) {
		pageSize = 15;
	}
	if (pageNum == 1) {
		$("#pagedd").show();
	}
	$.axs("/betaInvest/investor/findCompanyORInvestorByNoticeDate.do",
		{ searchStr: stockCode, noticeDate: noticeDate, pageNum: pageNum, pageSize: pageSize },
		false, function (data) {
			if (data.retCode == 0000) {
				if (data.retData == null) {
					return false;
				}
				var companyHtml = "";
				var msg = "--";
				$(data.retData.list).each(function (index, item) {
					companyHtml += "<tr>"
						+ "<td class='fxl_touzif'>" + this.investorsName + "</td>"
						+ "<td class='fxl_touzije'>" + this.investSum.toFixed(2) + "</td>"
						+ "</tr>";
					msg = this.stockName + "（" + this.stockCode + "）-定增" + this.noticeDate
				})
				$("#name_code").text(msg);
				$("#fxdx_tablie_info").html(companyHtml);
				//分页
				if (pageNum == 1) {
					$('#pagedd').pagination({
						total: data.retData.total,
						pageSize: pageSize,
						current: pageNum,
						layout: ['first', 'prev', 'links', 'next', 'last'],
						links: 5,
						displayMsg: "",
						showPageList: false,
						onSelectPage: function (pageNumber, size) {
							showGongsi(stockCode, noticeDate, pageNumber, size)
						}
					});
				}
				if (data.retData.total > 15) {
					$('#pagedd').show();
				}
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});
}
