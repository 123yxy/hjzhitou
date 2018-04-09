var dateType = "月"; //日期类型
var financeTypes = ""; //融资类型
var industryIds = ""; //行业id
var dateData = []; //日期集合
var AmountData = []; //融资总额
var countData = []; //融资次数
var AQQGRData = []; //金额同比
var PNGRData = []; //次数同比
var maxData = []; //最高金额
var avgData = []; //平均金额
var checkedHYIds = []; //选中的行业id集合
var num = "";
var year = "2018";
var areaIds = "";
var year1 = ""
var num1 = ""


$(function () {
	financeinit.init()
	//查询行业
	//	findCategory(1,2);
	//	1.5版本查询行业
	findAllCategory(0, 2);

	//融资情况数据
	findFinancingSituation();
	//融资情况图
	findFinanceSituationChart();
	//融资排行
	findFinanceRanking(1, 20);
	//融资分布图
	findFinanceDistribution();

	financeinit.condition()
	//点击融资情况里的时间
	// $(".rz_time a").on("click", function () {
	// 	$(this).addClass("on").siblings().removeClass("on");
	// 	//		editShowCon("dt", "时间范围：" + $(this).text());
	// 	dateType = $(this).text();
	// 	//添加查询
	// 	dateData = []; //日期集合
	// 	AmountData = []; //融资总额
	// 	countData = []; //融资次数
	// 	AQQGRData = []; //金额同比
	// 	PNGRData = []; //次数同比
	// 	maxData = []; //最高金额
	// 	avgData = []; //平均金额
	// 	//融资情况数据
	// 	// findFinancingSituation();
	// 	//融资情况图
	// 	// findFinanceSituationChart();
	// 	//融资排行
	// 	// findFinanceRanking(1, 20);
	// 	//融资分布图
	// 	// findFinanceDistribution();
	// })
	//删除已选的条件
	$(".hy_shaixuan").delegate("i", "click", function (e) {
		//console.log("abc");
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
			financeTypes = "";
			$(".hangy_qk .data-checkbox").addClass("on");
		}

		//添加查询
		dateData = []; //日期集合
		AmountData = []; //融资总额
		countData = []; //融资次数
		AQQGRData = []; //金额同比
		PNGRData = []; //次数同比
		maxData = []; //最高金额
		avgData = []; //平均金额
		//融资情况数据
		findFinancingSituation();
		//融资情况图
		findFinanceSituationChart();
		//融资排行
		findFinanceRanking(1, 20);
		//融资分布图
		findFinanceDistribution();
		var e = e || event;
		e.stopPropagation();
	})
	//鼠标经过设置显示下拉指标
	$(".rz_shezhi").on("mouseenter", function () {
		$(".rz_shezhi_zb").show();
	})
	//鼠标离开时隐藏下拉指标
	$(".rz_shezhi").on("mouseleave", function () {
		$(".rz_shezhi_zb").hide();
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
		//     	if(flag>=6){
		//     		if($(this).find("em").hasClass("on")){
		//     			$(this).find("em").removeClass("on");
		//     			$(this).find(".hy_icons").find("i").removeClass("on");
		//     		}
		//     		console.log($(this).find("span").text());
		//     	}else{
		if ($(this).find("em").hasClass("on")) {
			$(this).find("em").removeClass("on");
			$(this).find(".hy_icons").find("i").removeClass("on");
		} else {
			$(this).find("em").addClass("on");
			$(this).find(".hy_icons").find("i").addClass("on");
		}
		//     	}
	})
	//选择地区
	$("#qy").on("click", "li", function (e) {
		$(this).parent().parent().find("p").html($(this).find("a").text());
		//console.log($(this).find("a").text())
		if ($(this).find("a").text() == "全部") {
			areaIds = null;
		} else {
			areaIds = $(this).attr("data-value");
		}
		//		融资排行
		findFinanceRanking(1, 20, areaIds);
		$(this).parent().slideUp();
		$(".jiabeijing").hide();
		var e = e || event;
		e.stopPropagation();
	})
	$("#rzfbQY").on("click", "li", function (e) {
		$(this).parent().parent().find("p").html($(this).find("a").text());
		//console.log($(this).find("a").text())
		if ($(this).find("a").text() == "全部") {
			areaIds = null;
		} else {
			areaIds = $(this).attr("data-value");
		}
		//		融资排行
		findFinanceDistribution(areaIds);
		$(this).parent().slideUp();
		$(".jiabeijing").hide();
		var e = e || event;
		e.stopPropagation();
	})
	//点击行业弹窗的确定按钮
	$(".chagege_true").on("click", function () {
		var flag = true;
		industryIds = ""; //选择行业的id
		var yixuanHy = "行业："; //显示的条件
		$("[name='checkname']").each(function (index, item) {
			if ($(item).siblings("input").prop("checked")) {
				industryIds += $(item).attr("data-value") + ",";
				yixuanHy += $(item).attr("title") + "、";
			}
		})
		if (industryIds != "") { //有选择的行业
			$(this).parents(".news_change_hy").hide();
			industryIds = industryIds.substring(0, industryIds.length - 1);
			yixuanHy = yixuanHy.substring(0, yixuanHy.length - 1);

			editShowCon("hy", yixuanHy);

			//添加查询
			dateData = []; //日期集合
			AmountData = []; //融资总额
			countData = []; //融资次数
			AQQGRData = []; //金额同比
			PNGRData = []; //次数同比
			maxData = []; //最高金额
			avgData = []; //平均金额
			//融资情况数据
			findFinancingSituation();
			//融资情况图
			findFinanceSituationChart();
			//融资排行
			findFinanceRanking(1, 20);
			//融资分布图
			findFinanceDistribution();
		} else {
			$.zmAlert("至少选择一个行业");
		}
		checkedHYIds = [];

		$("[name='check']").each(function () {
			if (this.checked) {
				checkedHYIds.push($(this).parent("li").attr("data-value"));
			}
		})


	})
	//	点击取消 关闭选择行业弹层
	$(".chagege_false").on("click", function () {
		$(".news_change_hy").hide();
	})
	//点击清除检索条件
	$(".qingc_tj").on("click", function () {
		$(this).siblings("a").remove();
		industryIds = null;
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
		financeTypes = "";
		$(".hangy_qk .data-checkbox").addClass("on");
		//添加查询
		dateData = []; //日期集合
		AmountData = []; //融资总额
		countData = []; //融资次数
		AQQGRData = []; //金额同比
		PNGRData = []; //次数同比
		maxData = []; //最高金额
		avgData = []; //平均金额
		//融资情况数据
		findFinancingSituation();
		//融资情况图
		findFinanceSituationChart();
		//融资排行
		findFinanceRanking(1, 20);
		//融资分布图
		findFinanceDistribution();
	})
	//选择设置下的指标
	$(".rz_shezhi_zb .data-checkbox").on("click", function () {
		var yixuanzb = $(this).find(".checkboxWord").text();
		var flag = 0;
		var zhiBiao = [];//设置下的选择的指标数组
		$(".rz_shezhi_zb .data-checkbox").each(function (index, item) {
			if ($(item).hasClass("on")) {
				flag++;//判断设置下的选择指标的个数
			}
		})
		if (flag > 2) {
			if ($(this).hasClass("on")) {
				$(this).removeClass("on");
				$(".rz_number [data-value='" + $(this).attr("data-value") + "']").remove();
			}
		} else if (flag == 2) {
			if ($(this).hasClass("on")) {
				$(this).removeClass("on");
				$(".rz_number [data-value='" + $(this).attr("data-value") + "']").remove();
				var yData0 = []; //y轴数据0
				var yData1 = []; //y轴数据1
				var yText0 = ""; //y轴指标名0
				var yText1 = ""; //y轴指标名1
				var yType0 = ""; //y轴类型0
				var yType1 = "bar"; //y轴类型1 //必须给默认值
				var showTypes = "";
				$(".rz_number .data-checkbox").each(function () {
					showTypes += $(this).attr("data-value") + ",";
				})
				if (showTypes != "") {
					showTypes = showTypes.substring(0, showTypes.length - 1);
					var tys = showTypes.split(",");
					if (tys[0] == "sumAmount") {
						yData0 = AmountData;
						yText0 = "融资金额(亿)";
						yType0 = "bar";
					} else if (tys[0] == "count") {
						yData0 = countData;
						yText0 = "融资笔数";
						yType0 = "bar";
					} else if (tys[0] == "AQQGR") {
						yData0 = AQQGRData;
						yText0 = "融资金额同比增长率";
						yType0 = "line";
					} else if (tys[0] == "PNGR") {
						yData0 = PNGRData;
						yText0 = "融资笔数同比增长率";
						yType0 = "line";
					} else if (tys[0] == "maxAmount") {
						yData0 = maxData;
						yText0 = "最高单笔融资金额";
						yType0 = "bar";
					} else if (tys[0] == "avgAmount") {
						yData0 = avgData;
						yText0 = "平均融资金额";
						yType0 = "bar";
					}

					if (tys[1] == "sumAmount") {
						yData1 = AmountData;
						yText1 = "融资金额(亿)";
						yType1 = "bar";
					} else if (tys[1] == "count") {
						yData1 = countData;
						yText1 = "融资笔数";
						yType1 = "bar";
					} else if (tys[1] == "AQQGR") {
						yData1 = AQQGRData;
						yText1 = "融资金额同比增长率";
						yType1 = "line";
					} else if (tys[1] == "PNGR") {
						yData1 = PNGRData;
						yText1 = "融资笔数同比增长率";
						yType1 = "line";
					} else if (tys[1] == "maxAmount") {
						yData1 = maxData;
						yText1 = "最高单笔融资金额";
						yType1 = "bar";
					} else if (tys[1] == "avgAmount") {
						yData1 = avgData;
						yText1 = "平均融资金额";
						yType1 = "bar";
					}
					//融资情况柱状图
					financingSituationChart(yText0, yText1, dateData, yData0, yData1, yType0, yType1);
				}
				else {
					$.zmAlert("请选择要显示的指标");
				}
			}

		} else {
			if ($(this).hasClass("on")) {
				$(this).removeClass("on");
				$(".rz_number [data-value='" + $(this).attr("data-value") + "']").remove();
			} else {
				$(this).addClass("on");
				var zbHtml = '<div class="fl data-checkbox on" data-value=' + $(this).attr("data-value") + '>';
				zbHtml += '<input type="checkbox" />';
				zbHtml += '<label class="checkbox"></label>';
				zbHtml += '<label class="checkboxWord">' + yixuanzb + '</label>';
				zbHtml += '</div>';
				$(".rz_number").find("div.clr").before(zbHtml);
			}
			var yData0 = []; //y轴数据0
			var yData1 = []; //y轴数据1
			var yText0 = ""; //y轴指标名0
			var yText1 = ""; //y轴指标名1
			var yType0 = ""; //y轴类型0
			var yType1 = "bar"; //y轴类型1 //必须给默认值
			var showTypes = "";
			$(".rz_number .data-checkbox").each(function () {
				showTypes += $(this).attr("data-value") + ",";
			})
			if (showTypes != "") {
				showTypes = showTypes.substring(0, showTypes.length - 1);
				var tys = showTypes.split(",");

				if (tys[0] == "sumAmount") {
					yData0 = AmountData;
					yText0 = "融资金额(亿)";
					yType0 = "bar";
				} else if (tys[0] == "count") {
					yData0 = countData;
					yText0 = "融资笔数";
					yType0 = "bar";
				} else if (tys[0] == "AQQGR") {
					yData0 = AQQGRData;
					yText0 = "融资金额同比增长率";
					yType0 = "line";
				} else if (tys[0] == "PNGR") {
					yData0 = PNGRData;
					yText0 = "融资笔数同比增长率";
					yType0 = "line";
				} else if (tys[0] == "maxAmount") {
					yData0 = maxData;
					yText0 = "最高单笔融资金额";
					yType0 = "bar";
				} else if (tys[0] == "avgAmount") {
					yData0 = avgData;
					yText0 = "平均融资金额";
					yType0 = "bar";
				}

				if (tys[1] == "sumAmount") {
					yData1 = AmountData;
					yText1 = "融资金额(亿)";
					yType1 = "bar";
				} else if (tys[1] == "count") {
					yData1 = countData;
					yText1 = "融资笔数";
					yType1 = "bar";
				} else if (tys[1] == "AQQGR") {
					yData1 = AQQGRData;
					yText1 = "融资金额同比增长率";
					yType1 = "line";
				} else if (tys[1] == "PNGR") {
					yData1 = PNGRData;
					yText1 = "融资笔数同比增长率";
					yType1 = "line";
				} else if (tys[1] == "maxAmount") {
					yData1 = maxData;
					yText1 = "最高单笔融资金额";
					yType1 = "bar";
				} else if (tys[1] == "avgAmount") {
					yData1 = avgData;
					yText1 = "平均融资金额";
					yType1 = "bar";
				}
				//融资情况柱状图
				financingSituationChart(yText0, yText1, dateData, yData0, yData1, yType0, yType1);
			}
			//   	else{
			//   		$.zmAlert("请选择要显示的指标");
			//   	}

		}


	})
	//点击行业后边的那个多选
	$(".hangy_qk .data-checkbox").on("click", function () {

		if ($(this).find("label.checkboxWord").text() == "全部") {
			if ($(this).hasClass("on")) {
				$(this).parent().children(".data-checkbox").removeClass("on");
			} else {
				$(this).parent().children(".data-checkbox").addClass("on");
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
				//       		if(flag>=5){
				////       			$(this).parent().find(".data-checkbox").eq(0).addClass("on");
				//       		}
			}
		}
		var ftShowText = "融资类型：";
		financeTypes = "";
		$(".hangy_qk .data-checkbox").each(function () {
			if ($(this).children(".checkboxWord").text() != "全部") {
				if ($(this).hasClass("on")) {
					ftShowText += $(this).children(".checkboxWord").text() + "、";
					financeTypes += $(this).attr("data-value") + ",";
				}
			}
		})

		if (financeTypes != "") {
			financeTypes = financeTypes.substring(0, financeTypes.length - 1);
			editShowCon("ft", ftShowText);
			//添加查询
			dateData = []; //日期集合
			AmountData = []; //融资总额
			countData = []; //融资次数
			AQQGRData = []; //金额同比
			PNGRData = []; //次数同比
			maxData = []; //最高金额
			avgData = []; //平均金额
			//融资情况数据
			findFinancingSituation();
			//融资情况图
			findFinanceSituationChart();
			//融资排行
			findFinanceRanking(1, 20);
			//融资分布图
			findFinanceDistribution();
		} else {
			$(".hy_shaixuan [data-type='ft']").remove();
			$.zmAlert("请选择融资类型");
		}

	});
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


})
// function getPreMonth(date) {
// 	// var arr = date.split('-');
// 	// var year = arr[0]; //获取当前日期的年份
// 	// var month = arr[1]; //获取当前日期的月份
// 	// var day = arr[2]; //获取当前日期的日
// 	var year = date.getFullYear()
// 	var month =date.getMonth() + 1
// 	var day = date.getDate()
// 	var days = new Date(year, month, 0);
// 	days = days.getDate(); //获取当前日期中月的天数
// 	var year2 = year;
// 	var month2 = parseInt(month) - 1;
// 	if (month2 == 0) {//如果是1月份，则取上一年的12月份
// 		year2 = parseInt(year2) - 1;
// 		month2 = 12;
// 	}
// 	var day2 = day;
// 	var days2 = new Date(year2, month2, 0);
// 	days2 = days2.getDate();
// 	if (day2 > days2) {//如果原来日期大于上一月的日期，则取当月的最大日期。比如3月的30日，在2月中没有30
// 		day2 = days2;
// 	}
// 	if (month2 < 10) {
// 		month2 = '0' + month2;//月份填补成2位。
// 	}
// 	var t2 = year2 + '-' + month2 + '-' + day2;
// 	return t2;
// }
function getCurrentMonthLast() {
	var date = new Date();
	// var date = getPreMonth(new Date())
	var currentMonth = date.getMonth();
	// var currentMonth = date.split('-')[1]
	var nextMonth = ++currentMonth;
	var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
	var oneDay = 1000 * 60 * 60 * 24;
	return new Date(nextMonthFirstDay - oneDay).getDate();
}
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

	if (showText.length > 40) {
		showText = showText.substring(0, 40) + "...";
	} else {
		showText = showText.substring(0, showText.length - 1);
	}

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
	$.axs("/betaStock/common/findTrade.do", { categorType: type, levelId: level }, true, function (data) {
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
	$.axs("/betaStock/common/findTrade.do", { categorType: type, levelId: level }, true, function (data) {
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
				htm += '<input type="checkbox" name="check"/>';
				htm += '<a href="javascript:;" name="checkname" title="' + categoryName + '" data-value="' + obj.categoryId + '">';
				if (categoryName.length > 6) {
					categoryName = categoryName.substring(0, 5) + "...";
				}
				htm += '' + categoryName + '</a>';
				htm += '<div class="clr"></div>';
				htm += '</li>';
			}
			$("#changgelist").html(htm);
		} else {
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

/**
 * 查询融资情况信息
 */
function findFinancingSituation() {
	$.axs("/betaInvest/financingAnalysis/findFinancingSituation.do",
		{
			dateType: dateType, financeTypes: financeTypes, industryIds: industryIds,
			year: year, num: num, areaIds: ""
		},
		true, function (data) {
			if (data.retCode == "0000") {
				if (data.retData) {
					var str = data.retData.beginTime;
					var str2 = data.retData.endTime;
					getTime(str, str2);
					$("#financingAmount").text(((data.retData.financingAmount == null) || isNaN(data.retData.financingAmount)) ? "--" : (data.retData.financingAmount / 10000).toFixed(2));
					$("#AQQGR").text(((data.retData.AQQGR == null) || isNaN(parseInt(data.retData.AQQGR))) ? "--" : (data.retData.AQQGR).toFixed(2) + "%");
					$("#timesTotal").text((data.retData.timesTotal == null ? "--" : data.retData.timesTotal));
					$("#PNGR").text((data.retData.PNGR == null ? "--" : (data.retData.PNGR).toFixed(2) + "%"));
				}
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});
}

/**
 * 查询融资情况图表数据
 */
function findFinanceSituationChart() {
	$.axs("/betaInvest/financingAnalysis/findFinanceSituationChart.do",
		{
			dateType: dateType, financeTypes: financeTypes, industryIds: industryIds,
			year: year, num: num, areaIds: ""
		},
		true, function (data) {
			dateData = [];
			AmountData = []
			countData = []
			AQQGRData = []
			PNGRData = []
			maxData = []
			avgData = []
			if (data.retCode == "0000") {
				if (data.retData != null) {

					$(data.retData).each(function () {
						//					console.log(data.retData)
						dateData.push(this.createDate); //日期集合
						AmountData.push((this.sumAmount == null ? 0 : (this.sumAmount / 10000).toFixed(2))); //融资总额
						countData.push(this.count); //融资次数
						AQQGRData.push(((this.AQQGR == null || this.AQQGR == "Infinity") ? 0 : (this.AQQGR.toFixed(2)))); //金额同比
						PNGRData.push(((this.PNGR == null || this.PNGR == "Infinity") ? 0 : this.PNGR.toFixed(2))); //次数同比
						maxData.push((this.maxAmount == null ? 0 : this.maxAmount.toFixed(2))); //最高金额
						avgData.push((this.avgAmount == null ? 0 : this.avgAmount.toFixed(2))); //平均金额
					})

				}
				//融资情况柱状图
				//初始化选择框
				$(".rz_shezhi_zb .data-checkbox").each(function (index, item) {
					var typeTemp = $(this).attr("data-value")
					if (typeTemp == "sumAmount" || typeTemp == "AQQGR") {
						$(this).addClass("on");
					} else {
						$(this).removeClass("on");
					}
				})
				financingSituationChart("融资金额(亿)", "融资金额同比增长率", dateData, AmountData, AQQGRData, "bar", "line");
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});
}
/*融资情况柱状图
 * 
 */
function financingSituationChart(yLInfo, yRInfo, dateDataJ, yLData, yRData, yLType, yRType) {
	//	console.log(yLInfo)
	//	console.log(yRInfo)
	//	console.log(yLType)
	//	console.log(yRType)
	//yRType是柱状图
	if (yLInfo.indexOf("率") > -1) {
		yLInfo += "(%)"
	}
	if (yRInfo.indexOf("率") > -1) {
		yRInfo += "(%)"
	}
	var types = '';
	var barWidth = '';
	var lineColor = '';
	if (yRType == "line") {
		types = 'circle';
	};
	if (yLType == "line") {
		types = 'circle';
	};
	if (yRType == "bar") {
		barWidth = '30';
	}
	if (yLType == "bar") {
		barWidth = '30';
	}
	var end = '';
	if (yRType == "bar" && yLType == "bar") {
		barWidth = '30';
		end = '40';
	} else {
		barWidth = '30';
		end = "100";
	}
	var myChart5 = echarts.init(document.getElementById('rz_jine_qk'));
	option = {
		color: ['#62a6f2', '#36b8f4'],
		tooltip: {
			show: true,
			trigger: 'axis',
			formatter: function (params) {
				var showHtml = "";
				if (params[1].seriesName != "") {
					showHtml = '<div class="types_one">' +
						'<span class="shoupanjia">' + params[1].seriesName + '</span>' +
						'<span class="shuju2">' + ((params[1].data == null || params[1].data == "") ? 0 : params[1].data) + '</span>' +
						'<div class="clr"></div>' +
						'</div>';
				}
				//        	  	console.log(params)
				//7月3号王仙玲修改的柱状图的提示框类型start
				return '<div class="shizhi_tips">' +
					'<span class="shizhi_time">' + params[0].name + '</span>' +
					showHtml +
					'<div class="types_two">' +
					'<span class="cjl_shuju">' + params[0].seriesName + '</span>' +
					'<span class="shuju2">' + ((params[0].data == null || params[0].data == "") ? 0 : params[0].data) + '</span>' +
					'<div class="clr"></div>' +
					'</div>' +
					'</div>';
				//7月3号王仙玲修改的柱状图的提示框类型end
			}
		},

		legend: {
			data: [yLInfo, yRInfo]
			//			left:'left'

		},
		toolbox: {
			show: true,
			feature: {
				saveAsImage: {
					show: true,
					title: '保存图片',
					icon: 'image:///saasBeta/images/ave.png'

				}
			},
			right: '5%'
		},
		dataZoom: [{
			show: true,
			realtime: true,
			start: 0,
			end: end
		},
		{
			type: 'inside',
			realtime: true,
			start: 0,
			end: end
		}],
		xAxis: [{
			type: 'category',
			//			axisLabel :{  
			//			    interval:0   
			//			} ,
			data: dateDataJ/*['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']*/
			//	        	 data:dateTemp
		}],
		yAxis: [{
			type: 'value',
			name: yLInfo,
			axisLabel: {
				formatter: '{value}'
			}
		}, {
			type: 'value',
			name: yRInfo,
			axisLabel: {
				formatter: '{value}'
			}
		}],
		grid: {
			top: '25%',
			bottom: '20%',
			left: '3%',
			right: '5%',
			containLabel: true
		},
		series: [{
			name: yLInfo,
			type: yLType,
			symbol: types,
			barWidth: barWidth,
			//				lineStyle:lineStyle,
			label: {
				normal: {
					show: true,
					position: 'top',
					formatter: function (param) {
						return ((param.value == null || param.value == "" || param.value == 0) ? "" : param.value);
					}
				}
			},
			itemStyle: {
				normal: {
					color: "#62a6f2"

					//	                    color: function(params) {
					//	                      	//return "#62a6f2";
					//	                      	return "pink";
					//	                    }
				},
				emphasis: {
					color: "#4a8ad3"//鼠标放到柱形图上显示的颜色
				}
			},
			data: yLData/*[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]*/
			//data:tradingVolume
		},
		{
			name: yRInfo,
			type: yRType,
			symbol: types,
			barWidth: barWidth,
			//				lineStyle:lineStyle,
			yAxisIndex: 1,
			label: {
				normal: {
					show: true,
					position: 'top',
					//						margin:3,
					formatter: function (param) {
						return ((param.value == null || param.value == "" || param.value == 0) ? "" : param.value);
					}
				}
			},
			itemStyle: {
				normal: {
					color: "#36b8f4"

				}
				//	                emphasis:{
				//	                	color:"#4a8ad3"//鼠标放到柱形图上显示的颜色
				//	                }
			},
			data: yRData/*[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]*/
			//data:openPrice
		}
		]
	};
	myChart5.setOption(option);
	window.addEventListener("resize", function () {
		myChart5.resize();
	});
}
var dates;
function getTime(str, str2) {
	var time1 = "XX";
	var time2 = "XX";
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
	//	$("[name='timeRange']").text(time1 + "—" + time2);
	$("#rz_qk1").text(time1 + "—" + time2);
	dates = time1 + "—" + time2;
}
/**
 * 融资排行数据
 */
function findFinanceRanking(pageNum, pageSize, areaIds) {
	var stockRData = [];
	var amountRData = [];
	if (pageNum == 1) {
		$("#page").remove();
		$(".guapai_table").after('<div id="page" class="pages pagination " style="display: none;"></div>');
	}

	$.axs("/betaInvest/financingAnalysis/findFinanceRanking.do",
		{
			dateType: dateType, financeTypes: financeTypes, industryIds: industryIds,
			year: year1, num: num1, areaIds: areaIds,
			pageNum: pageNum, pageSize: pageSize
		},
		true, function (data) {
			if (data.retCode == "0000") {
				if (data.retData) {
					if (data.retData.list != null) {
						//console.log(data.retData.list);
						$("#rz_qk2").text(year1 + "年" + num1 + "月01日—" + year1 + "年" + num1 + "月" + getCurrentMonthLast() + "日");
						var rankingHtml = "";
						$(data.retData.list).each(function (index, item) {
							stockRData.push(item.stockName);
							amountRData.push(item.totalAmount == null ? null : (item.totalAmount / 10000).toFixed(2));
							rankingHtml += "<tr>",
								rankingHtml += "<td class='shuzi'>" + item.rowNo + "</td>",
								rankingHtml += "<td class='shuzi tiaozhaun' onClick='toCompanyHomeHtml(\"" + item.stockCode + "\",\"" + item.stockName + "\",\"融资分析\")'>" + (item.stockName == null ? "--" : item.stockName) + "（" + (item.stockCode == null ? "--" : item.stockCode) + "）</td>",
								rankingHtml += "<td class='shuzi'>" + (item.totalAmount == null ? "--" : (item.totalAmount / 10000.00).toFixed(2)) + "</td>",
								rankingHtml += "<td class='shuzi'>" + (item.maxAmount == null ? "--" : item.maxAmount.toFixed(2)) + "</td>",
								rankingHtml += "<td class='shuzi'>" + (item.lastDate == null ? "--" : item.lastDate) + "</td>",
								rankingHtml += "<td class='shuzi'>" + (item.stockDate == null ? "--" : item.stockDate) + "</td>",
								rankingHtml += "<td class='shuzi'>" + (item.newPrice == null ? "--" : item.newPrice.toFixed(2)) + "</td>";
							if ((item.priceChangeRatio != null && item.priceChangeRatio != "") || item.priceChangeRatio == 0) {
								if ((item.priceChangeRatio) >= 0) {

									rankingHtml += "<td class='shuzi zhangfu red'>" + (item.priceChangeRatio == null ? "--" : item.priceChangeRatio.toFixed(2)) + "%</td>";
								} else {
									rankingHtml += "<td class='shuzi zhangfu lvse'>" + (item.priceChangeRatio == null ? "--" : item.priceChangeRatio.toFixed(2)) + "%</td>";
								}
							}
							//					console.log(item.priceChangeRatio)
							rankingHtml += "<td class='shuzi'>" + (item.tradingVolume == null ? "--" : (item.tradingVolume / 10000.00).toFixed(2)) + "</td>",
								rankingHtml += "<td class='shuzi'>" + (item.totalValue == null ? "--" : (item.totalValue / 100000000.00).toFixed(2)) + "</td>",
								rankingHtml += "<td class='shuzi'>" + (item.priceEarningRatio == null ? "--" : item.priceEarningRatio.toFixed(2)) + "</td>",

								rankingHtml += "</tr>";
						})

						$("#rankTbody").html(rankingHtml);

						//分页
						if (pageNum == 1) {
							$('#page').pagination({
								total: data.retData.total,
								pageSize: pageSize,
								current: pageNum,
								//						layout:['list','sep','first','prev','links','next','last','sep','refresh'],
								layout: ['first', 'prev', 'links', 'next', 'last'],
								links: 5,
								displayMsg: "",
								showPageList: false,
								onSelectPage: function (pageNumber, size) {
									findFinanceRanking(pageNumber, size, areaIds);
								}
							});
						}
						$('#page').show();
						//修改分页文字
						setPageText('page');
					}
				}
				else {
					$("#rankTbody").html("<tr><td colspan='11' >暂无数据</td></tr>");
				}

				//加载融资排行数据
				financingRankingChart(stockRData, amountRData);
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});
}

/*融资排行
 * 
 */
function financingRankingChart(stockRData, amountRData) {
	var myChart5 = echarts.init(document.getElementById('rz_paihang'));
	option = {
		tooltip: {
			show: true,
			trigger: 'axis',
			formatter: function (params) {
				//      	  	console.log(params)
				//7月3号王仙玲修改的柱状图的提示框类型start
				var divHtml = '<div class="sanban_tips">' +
					'<p class="sb_tips_title">' + params[0].name + '</p>' +
					'<div class="sb_tips_content">' +
					'<span class="tips_leibie fl">' + params[0].seriesName + '</span>' +
					'<span class="tips_leibie_num fl">' + ((params[0].value == null || params[0].value == "") ? 0 : params[0].value) + '</span>' +
					'<div class="clr"></div>' +
					'</div>' +
					'</div>';
				return divHtml;
				//7月3号王仙玲修改的柱状图的提示框类型end
			}
		},
		color: ['#7cb5ec', '#f7a35c'],
		legend: {
			data: ['累计融资金额(亿)'],
			top: '10px'

		},
		toolbox: {
			show: true,
			right: '50px',
			feature: {
				saveAsImage: {
					show: true,
					title: '保存图片',
					icon: 'image:///saasBeta/images/ave.png'

				}
			},
			top: '10px'
		},
		xAxis: [{
			type: 'category',
			data: stockRData/*['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']*/
			//	        	 data:dateTemp
		}],
		yAxis: [{
			type: 'value',
			//			name: '累计融资金额(亿)',
			axisLabel: {
				formatter: '{value}'
			}
		}],
		grid: {
			left: '1%',
			right: '1%',
			containLabel: true
		},
		series: [{
			name: '累计融资金额(亿)',
			type: 'bar',
			barWidth: '30',
			itemStyle: {
				normal: {
					color: "#62a6f2"
				},
				emphasis: {
					color: "#4a8ad3"//鼠标放到柱形图上显示的颜色
				}
			},
			data: amountRData/*[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]*/,
			//data:tradingVolume
			label: {
				normal: {
					show: true,
					position: 'top',
					formatter: function (param) {
						return ((param.data == 0.00 || param.data == 0) ? "" : param.data);
					}
				}
			}
		}]
	};
	myChart5.setOption(option);
	window.addEventListener("resize", function () {
		myChart5.resize();
	});
}

/**
 * 融资分布图数据
 */
function findFinanceDistribution(areaIds) {
	$.axs("/betaInvest/financingAnalysis/findFinanceDistribution.do",
		{
			dateType: dateType, financeTypes: financeTypes, industryIds: industryIds,
			year: year1, num: num1, areaIds: areaIds
		},
		true, function (data) {
			if (data.retCode == "0000") {
				if (data.retData != null) {
					//				investmentFever(data.retData);
					var disData = []; //总的数据
					var oneMillionDown = []; //一千万一下的数据
					var oTMillion = []; //一千万到三千万的数据
					var tFMillion = []; //三千万到五千万的数据
					var fMOHM = []; //五千万到一亿的数据
					var OFHM = []; //一亿到五亿的数据
					var FHMUp = []; //五亿以上的数据
					var disTemp = [];
					// $("#rz_qk3").text(dates);
					$("#rz_qk3").text(year1 + "年" + num1 + "月01日—" + year1 + "年" + num1 + "月" + getCurrentMonthLast() + "日");
					$(data.retData).each(function () {
						var n = 3000000;
						if (dateType == "周") {
							n = 7000000;
						} else if (dateType == "年") {
							n = 500000;
						}
						if (this.totalNum != 0) {
							if (this.jine == 1) { //一千万一下的数据
								disTemp.push("1000万以下");
							} else if (this.jine == 2) { //一千万到三千万的数据
								disTemp.push("1000-3000万");
							} else if (this.jine == 3) { //三千万到五千万的数据
								disTemp.push("3000-5000万");
							} else if (this.jine == 4) { //五千万到一亿的数据
								disTemp.push("5000万-1亿");
							} else if (this.jine == 5) { //一亿到五亿的数据
								disTemp.push("1-5亿");
							} else if (this.jine == 6) { //五亿以上的数据
								disTemp.push("5亿以上");
							}
							disTemp.push(this.totalNum);
							disTemp.push(this.totalNum * n);
							disTemp.push("融资次数：" + this.totalNum + "次");
							if (this.jine == 1) { //一千万一下的数据
								oneMillionDown.push(disTemp);
							} else if (this.jine == 2) { //一千万到三千万的数据
								oTMillion.push(disTemp);
							} else if (this.jine == 3) { //三千万到五千万的数据
								tFMillion.push(disTemp);
							} else if (this.jine == 4) { //五千万到一亿的数据
								fMOHM.push(disTemp);
							} else if (this.jine == 5) { //一亿到五亿的数据
								OFHM.push(disTemp);
							} else if (this.jine == 6) { //五亿以上的数据
								FHMUp.push(disTemp);
							}
							disTemp = [];
						}
					})

					disData.push(oneMillionDown);
					disData.push(oTMillion);
					disData.push(tFMillion);
					disData.push(fMOHM);
					disData.push(OFHM);
					disData.push(FHMUp);

					financingDistributionChart(disData);
				}
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});
}
/*融资分布图
 * 
 */
function financingDistributionChart(disData) {
	var s = 0;
	var myChart5 = echarts.init(document.getElementById('rz_fenbu'));
	var data = disData/*[
		[
			[28604, 77, 17096869, 'Australia'],
			[31163, 77.4, 27662440, 'Canada'],
			[1516, 68, 1154605773, 'China'],
			[13670, 74.7, 10582082, 'Cuba'],
			[28599, 75, 4986705, 'Finland'],
			[29476, 77.1, 56943299, 'France'],
			[31476, 75.4, 78958237, 'Germany'],
			[28666, 78.1, 254830, 'Iceland'],
			[1777, 57.7, 870601776, 'India'],
			[29550, 79.1, 122249285, 'Japan'],
			[2076, 67.9, 20194354, 'North Korea'],
			[12087, 72, 42972254, 'South Korea'],
			[24021, 75.4, 3397534, 'New Zealand'],
			[43296, 76.8, 4240375, 'Norway'],
			[10088, 70.8, 38195258, 'Poland'],
			[19349, 69.6, 147568552, 'Russia'],
			[10670, 67.3, 53994605, 'Turkey'],
			[26424, 75.7, 57110117, 'United Kingdom'],
			[37062, 75.4, 252847810, 'United States']
		],
		[
			[44056, 81.8, 23968973, 'Australia'],
			[43294, 81.7, 35939927, 'Canada'],
			[13334, 76.9, 1376048943, 'China'],
			[21291, 78.5, 11389562, 'Cuba'],
			[38923, 80.8, 5503457, 'Finland'],
			[37599, 81.9, 64395345, 'France'],
			[44053, 81.1, 80688545, 'Germany'],
			[42182, 82.8, 329425, 'Iceland'],
			[5903, 66.8, 1311050527, 'India'],
			[36162, 83.5, 126573481, 'Japan'],
			[1390, 71.4, 25155317, 'North Korea'],
			[34644, 80.7, 50293439, 'South Korea'],
			[34186, 80.6, 4528526, 'New Zealand'],
			[64304, 81.6, 5210967, 'Norway'],
			[24787, 77.3, 38611794, 'Poland'],
			[23038, 73.13, 143456918, 'Russia'],
			[19360, 76.5, 78665830, 'Turkey'],
			[38225, 81.4, 64715810, 'United Kingdom'],
			[53354, 79.1, 321773631, 'United States']
		]
	]*/;

	option = {
		backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
			offset: 0,
			color: '#f7f8fa'
		}, {
			offset: 1,
			color: '#fff'
		}]),
		color: ['#62a6f2', '#2db9f4', '#38cbdc', '#ffb433', '#ff895a', '#f57177'],
		legend: {
			//			right: 10,
			data: ['1000万以下', '1000-3000万', '3000-5000万', '5000万-1亿', '1-5亿', '5亿以上']
		},
		toolbox: {
			show: true,
			right: "50px",
			feature: {
				saveAsImage: {
					show: true,
					title: '保存图片',
					icon: 'image:///saasBeta/images/ave.png'

				}
			},
			top: '10px'
		},
		xAxis: {
			splitLine: {
				lineStyle: {
					type: 'dashed'
				}
			}/*,
			axisLabel:{
				formatter:function(param){
					console.log(param)
					if(){
						
					}
					s++;
					return param;
				}
			}*/
			, data: ['1000万以下', '1000-3000万', '3000-5000万', '5000万-1亿', '1-5亿', '5亿以上']
		},
		yAxis: {
			splitLine: {
				lineStyle: {
					type: 'dashed'
				}
			},
			scale: true
		},

		grid: {
			top: '15%',
			left: '5%',
			right: '5%',
			bottom: '2%',
			containLabel: true
		},
		series: [{
			name: '1000万以下',
			data: data[0],
			type: 'scatter',
			symbolSize: function (data) {
				return Math.sqrt(data[2]) / 5e2;
			},
			label: {
				emphasis: {
					show: true,
					formatter: function (param) {
						return param.data[3];
					},
					position: 'right'
				}
			},
			itemStyle: {
				normal: {
					color: '#62a6f2'
					//					shadowBlur: 10,
					//					shadowColor: 'rgba(161, 161, 164, 0.5)',
					//					shadowOffsetY: 5,
					//					color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
					//						offset: 0,
					//						color: 'rgb(251, 118, 123)'
					//					}, {
					//						offset: 1,
					//						color: 'rgb(204, 46, 72)'
					//					}])
				}
			}
		}, {
			name: '1000-3000万',
			data: data[1],
			type: 'scatter',
			symbolSize: function (data) {
				return Math.sqrt(data[2]) / 5e2;
			},
			label: {
				emphasis: {
					show: true,
					formatter: function (param) {
						return param.data[3];
					},
					position: 'right'
				}
			},
			itemStyle: {
				normal: {
					color: '#2db9f4'
					//					shadowBlur: 10,
					//					shadowColor: 'rgba(188, 234, 178, 0.5)',
					//					shadowOffsetY: 5,
					//					color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
					//						offset: 0,
					//						color: 'rgb(129, 227, 238)'
					//						}, {
					//							offset: 1,
					//							color: 'rgb(25, 183, 207)'
					//						}])
				}
			}
		}, {
			name: '3000-5000万',
			data: data[2],
			type: 'scatter',
			symbolSize: function (data) {
				return Math.sqrt(data[2]) / 5e2;
			},
			label: {
				emphasis: {
					show: true,
					formatter: function (param) {
						return param.data[3];
					},
					position: 'right'
				}
			},
			itemStyle: {
				normal: {
					color: '#38cbdc'
					//					shadowBlur: 10,
					//					shadowColor: 'rgba(188, 234, 178, 0.5)',
					//					shadowOffsetY: 5,
					//					color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
					//						offset: 0,
					//						color: 'rgb(129, 227, 238)'
					//					}, {
					//						offset: 1,
					//						color: 'rgb(25, 183, 207)'
					//					}])
				}
			}
		}, {
			name: '5000万-1亿',
			data: data[3],
			type: 'scatter',
			symbolSize: function (data) {
				return Math.sqrt(data[2]) / 5e2;
			},
			label: {
				emphasis: {
					show: true,
					formatter: function (param) {
						return param.data[3];
					},
					position: 'right'
				}
			},
			itemStyle: {
				normal: {
					color: '#ffb433'
					//					shadowBlur: 10,
					//					shadowColor: 'rgba(188, 234, 178, 0.5)',
					//					shadowOffsetY: 5,
					//					color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
					//						offset: 0,
					//						color: 'rgb(129, 227, 238)'
					//					}, {
					//						offset: 1,
					//						color: 'rgb(25, 183, 207)'
					//					}])
				}
			}
		}, {
			name: '1-5亿',
			data: data[4],
			type: 'scatter',
			symbolSize: function (data) {
				return Math.sqrt(data[2]) / 5e2;
			},
			label: {
				emphasis: {
					show: true,
					formatter: function (param) {
						return param.data[3];
					},
					position: 'right'
				}
			},
			itemStyle: {
				normal: {
					color: '#ff895a'
					//					shadowBlur: 10,
					//					shadowColor: 'rgba(188, 234, 178, 0.5)',
					//					shadowOffsetY: 5,
					//					color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
					//						offset: 0,
					//						color: 'rgb(129, 227, 238)'
					//					}, {
					//						offset: 1,
					//						color: 'rgb(25, 183, 207)'
					//					}])
				}
			}
		}, {
			name: '5亿以上',
			data: data[5],
			type: 'scatter',
			symbolSize: function (data) {
				return Math.sqrt(data[2]) / 5e2;
			},
			label: {
				emphasis: {
					show: true,
					formatter: function (param) {
						return param.data[3];
					},
					position: 'right'
				}
			},
			itemStyle: {
				normal: {
					color: '#f57177'
				}
			}
		}]
	};
	myChart5.setOption(option);
	window.addEventListener("resize", function () {
		myChart5.resize();
	});
}

var financeinit = {
	yclick: function (id) {
		$(".list6").on("click", function () {
			// if (id === "1")
			// 	setTimeout(function () {
			// 		$(".list10").removeAttr("style")
			// 	}, 100);
			// else if (id === "2")
			// 	setTimeout(function () {
			// 		$(".list9").removeAttr("style")
			// 	}, 100);
			// else if (id === "3")
			// 	setTimeout(function () {
			// 		$(".list8").removeAttr("style")
			// 	}, 100);
			// $(".list9 ul").removeAttr("style")
		}).on("mouseover", "li", function () {

			if (id === "1")
				setTimeout(function () {
					$(".list10").removeAttr("style")
					$(".list10 ul").removeAttr("style")
				}, 100);
			else if (id === "2")
				setTimeout(function () {
					$(".list9").removeAttr("style")
					$(".list9 ul").removeAttr("style")
				}, 100);
			else if (id === "3")
				setTimeout(function () {
					$(".list8").removeAttr("style")
					$(".list8 ul").removeAttr("style")
				}, 100);
			// $(".list9 ul").removeAttr("style")

			year = this.innerText;
			$(".list6").find(".qyp").text(this.innerText)
		})
	},
	init: function () {
		var nowdate = new Date();
		nowdate.setMonth(nowdate.getMonth() - 1);
		var y = nowdate.getFullYear();
		var m = nowdate.getMonth() + 1;
		var d = nowdate.getDate();
		var formatwdate = y + '-' + m + '-' + d;
		year = year1 = y;
		num = num1 = m;
		this.yclick("2")
		// console.log(formatwdate)
		// $("#fdate").datebox("setValue", formatwdate);
	},
	_getdata: function (url, _callback, param, isload) {
		$.axs(url, param, true, function (_data) {
			if (_data.retCode === "0000") {
				var renderdata = _data.retData;
				if (renderdata instanceof Array) {
					if (_data.retData.length)
						_callback(renderdata);
					else
						_callback(0)
				}
				else
					_callback(renderdata);
			}
			else
				_callback("");
		}, isload)
	},
	condition: function () {
		var getyear = new Date().getFullYear();
		var nowyear = getyear - 4;
		var div = $("<div>")
		for (var i = nowyear; i <= getyear; i++) {
			div.append("<li data-value=" + i + "><a href=\"javascript:;\">" + i + "</a></li>");
		}
		$("#year").html(div.html());
		$(".list6 .qyp").text(year + " " + num + "月")
		div.html("");
		for (var i = 1; i < 53; i++) {
			div.append("<li data-value=" + i + "><a href=\"javascript:;\">第" + i + "周</a></li>")
		}
		$("#week").html(div.html())
		div.html("");
		for (var i = 1; i < 13; i++) {
			div.append("<li data-value=" + i + "><a href=\"javascript:;\">" + i + "月</a></li>")
		}
		$("#month").html(div.html())
		// $(".list6 .qyp").text(num)
		// $(".list9 .qyp").text(num)
		this._getdata("/betaStock/common/findWorkBookByPid.do", function (data) {
			if (data) {
				var div = $("<div>");
				div.append("<li data-value=''><a href=\"javascript:;\">全部</a> </li>")
				$.each(data, function (k, v) {
					// div.append("<option value=" + v.id + ">" + v.nameCn + "</option>")
					div.append("<li data-value=" + v.id + "><a href=\"javascript:;\">" + v.nameCn + "</a> </li>")
				})
				$("#qy").html(div.html())
				$("#rzfbQY").html(div.html())
			}
		}, {
				dataType: 1,
				type: 1,
				parentId: 0
			}, 1)


		$(document).on("click", function (e) {
			var evt = e || event;
			var target = evt.target;
			// if (target.tagName === "UL" && target.parentElement.getAttribute("id") !== "year")
			$(".selectBox1 ul").slideUp(200, function () {
				$(".listt").hide(300)
			});

		});
		// $("#year").on("mouseover", function () {
		// 	if (dateType === "月") {
		// 		$(".list9").removeAttr("style")
		// 	}
		// }).on("mouseout", function () {
		// 	$(".list9").css("display", "none")
		// })
		$(".list8,.list9,.list10").on("click", "li", function () {
			var ul = $(this).parent(),
				display = ul.css("display");

			display = display == "block" ? 0 : 1;
			if (display) {
				$(this).parent().children(".searching").show();
				ul.css("display", "block");
				$(".jiabeijing").show();
				display = 0;
				ul.find("li").each(function () {
					display += $(this).parent().height();
				});
				ul.css("display", "none");
				if (display > 200) {
					//				ul.css("height",200);
					// ul.css("overflow", "auto");
				}

				ul.slideDown(100);
			} else {
				ul.slideUp();
				$(".jiabeijing").hide();
			}
			// var evt = e || event;
			// var target = evt.target;
			num = this.getAttribute("data-value");
			var te = $(".list6").find(".qyp").text().substr(0, 4) + "&nbsp;&nbsp;" + this.innerText
			// var p = $(this).find("p");
			$(".list6").find(".qyp").html(te)
			$(this).parent().css("display", "none");;
			$("#year").hide();
			//融资情况数据
			findFinancingSituation();
			//融资情况图
			findFinanceSituationChart();
			//			//融资排行
			//			findFinanceRanking(1, 20);
			//			//融资分布图
			//			findFinanceDistribution();
		})

		$(".selectBox1").on("click", function (e) {
			var ul = $(this).parent().find("ul"),
				display = ul.css("display");
				$("#year").hide()
				$("#quarter").hide()
				$("#week").hide()
				$("#month").hide()
			display = display == "block" ? 0 : 1;

			$(".selectBox1 ul").css("display", "none");
			$(this).parent().children(".searching").hide();
			//		$(".jiabeijing").show();

			if (display) {
				$(this).parent().children(".searching").show();
				ul.css("display", "block");
				$(".jiabeijing").show();
				display = 0;
				ul.find("li").each(function () {
					display += $(this).parent().height();
				});
				ul.css("display", "none");
				if (display > 200) {
					//				ul.css("height",200);
					// ul.css("overflow", "auto");
				}

				ul.slideDown(100);
			} else {
				ul.slideUp();
				$(".jiabeijing").hide();
			}
			var evt = e || event;
			var target = evt.target;
			var te = target.innerText
			if (target.tagName === "A")
				target = target.parentElement;
			if (target.tagName === "LI") {
				// dateData = AmountData = AQQGRData = [];
				// dateData = AmountData = countData = AQQGRData = PNGRData = maxData = avgData = [];
				var p = $(target).parent().parent().find("p");
				var vl = target.getAttribute("data-value");
				if (target.parentElement.getAttribute("id") !== "year")
					$(".selectBox1 ul").hide();

				$(".searching").hide();
				$(".jiabeijing").hide();
				evt.stopPropagation()
				p.text(te)
				var whi = target.parentElement;
				var id = whi.getAttribute("id")
				if (id === "qy")
					areaIds = vl
				else if (id === "year")
					year = vl
				else if (id === "week" || id === "quarter" || id === "month")
					num = vl
				if (id === "datetype") {
					$(".list6").off("mouseover", "li")
					financeinit.yclick(vl)
					year = num = ""
					$(".list6").removeAttr("style")
					if (vl === "1") {
						dateType = "周"
						// $(".list10").removeAttr("style").siblings().css("display", "none")

					}

					else if (vl === "2") {
						dateType = "月"
						// $(".list9").removeAttr("style").siblings().css("display", "none")
					}

					else if (vl === "3") {
						dateType = "季"
						// $(".list8").removeAttr("style").siblings().css("display", "none")
					}

					else {
						dateType = "年"
						// $("#childcon").children().css("display", "none")
					}

				}
				else {
					//融资情况数据
					findFinancingSituation();
					//融资情况图
					findFinanceSituationChart();
					//					//融资排行
					//					findFinanceRanking(1, 20);
					//					//融资分布图
					//					findFinanceDistribution();
				}



				//console.log(dateType + "\\" + year + "\\" + num)
				// if(dataType === "年")
				// rz.prom(function (resolve, reject) {
				// 	rz.rerender(resolve, reject);
				// }).then(function (data) {
				// 	$(".loadingBox").hide();
				// }).catch(function (errmsg) {
				// 	// var ul1 = $("<div class='zwshuj'>暂无数据</div>");
				// 	$(".lis").html("<div class='zwshuj'>暂无数据</div>");
				// 	$(".loadingBox").hide();
				// })
			}

			return false;
		});
		// $(".selectBox1").on("click", function (e) {
		// 	var evt = e || event;
		// 	var target = evt.target;
		// 	var te = target.innerText

		// 	// while (target.tagName !== "LI")
		// 	//     target = target.parentElement;
		// 	if (target.tagName === "A")
		// 		target = target.parentElement;
		// 	if (target.tagName === "LI") {
		// 		dateData = AmountData = AQQGRData = [];
		// 		var p = $(target).parent().parent().find("p");
		// 		var vl = target.getAttribute("data-value");
		// 		if (target.parentElement.getAttribute("id") !== "year")
		// 			$(".selectBox1 ul").hide();

		// 		$(".searching").hide();
		// 		$(".jiabeijing").hide();
		// 		evt.stopPropagation()
		// 		p.text(te)
		// 		var whi = target.parentElement;
		// 		var id = whi.getAttribute("id")
		// 		if (id === "qy")
		// 			areaIds = vl
		// 		else if (id === "year")
		// 			year = vl
		// 		else if (id === "week" || id === "quarter" || id === "month")
		// 			num = vl
		// 		if (id === "datetype") {
		// 			yclick(vl)
		// 			year = num = ""
		// 			$(".list6").removeAttr("style")
		// 			if (vl === "1") {
		// 				dateType = "周"
		// 				// $(".list10").removeAttr("style").siblings().css("display", "none")

		// 			}

		// 			else if (vl === "2") {
		// 				dateType = "月"
		// 				// $(".list9").removeAttr("style").siblings().css("display", "none")
		// 			}

		// 			else if (vl === "3") {
		// 				dateType = "季"
		// 				// $(".list8").removeAttr("style").siblings().css("display", "none")
		// 			}

		// 			else {
		// 				dateType = "年"
		// 				// $("#childcon").children().css("display", "none")
		// 			}

		// 		}
		// 		else {
		// 			//融资情况数据
		// 			findFinancingSituation();
		// 			//融资情况图
		// 			findFinanceSituationChart();
		// 			//融资排行
		// 			findFinanceRanking(1, 20);
		// 			//融资分布图
		// 			findFinanceDistribution();
		// 		}



		// 		console.log(dateType + "\\" + year + "\\" + num)
		// 		// if(dataType === "年")
		// 		// rz.prom(function (resolve, reject) {
		// 		// 	rz.rerender(resolve, reject);
		// 		// }).then(function (data) {
		// 		// 	$(".loadingBox").hide();
		// 		// }).catch(function (errmsg) {
		// 		// 	// var ul1 = $("<div class='zwshuj'>暂无数据</div>");
		// 		// 	$(".lis").html("<div class='zwshuj'>暂无数据</div>");
		// 		// 	$(".loadingBox").hide();
		// 		// })
		// 	}


		// 	// findEnterpriseData(1, 20);
		// });
	}
}

