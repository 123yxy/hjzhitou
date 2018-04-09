var date = new Date();
var year = date.getFullYear();
var month = date.getMonth() + 1;
var day = date.getDate();
//var nowTime =(year + '-' + month + '-' + day);
var indPageNum = localStorage.getItem("indPageNum"); //默认进入的页面
//初始化加载
// $(document).ready(function () {

	//获取全部行业
	//	findSecondLevelTrade();
	//获取全部区域
	findFirstLevelArea();
	//所有主办券商
	findHostBrokerage();
	//挂牌企业数
	findListing();
	//挂脾企业走势
	findListingCount(1);
	//新增挂脾企业走势
	findNewList(1);
	//新增挂牌企业列表
	findListNew();
	//全部挂牌企业列表
	findAllList();
	//查询全部挂牌企业 总股本流通股本
	fingListCount();

	/**
	 * 加载页面
	 */
	loadIndPage(indPageNum);
// });
/*********信息补全开始***********/
$("#stockCodeParam").keydown(function (e) {
	if (e.keyCode == 13) {
		$("#stockCodeParam").click();
		$("#ui-id-2").hide();
	}
});

$("#stockCodeParam").on("click", function () {
	findAllList();
});
//首页顶部搜索
$("#stockCodeParam").autocomplete({
	minLength: 2,
	source: function (request, response) {
		findByCodeName(request, response);
	},
	delay: 500,
	select: function (event, ui) {
		var item = ui.item;
	}
});
/*********信息补全结束***********/

//点击假背景的时候下拉框收缩
$(".jiabeijing").on("click", function () {
	$(".selectBox ul").hide();
	$(".jiabeijing").hide();
});

$(".newgp_title ul li").on("click", function () {
	loadIndPage($(this).index());
	localStorage.setItem("indPageNum", $(this).index());

});
$(".selectBox ul li").click(function () {
	var p = $(this).parent().parent().find("p");
	$(".selectBox ul").hide();
	$(".searching").hide();
	$(".jiabeijing").hide();
	p.text(($(this).find("a").text()).indexOf("...") > -1 ? $(this).find("a").attr("title") : $(this).find("a").text());
	p.attr("data-value", $(this).attr("data-value"));
	p.attr("value", $(this).attr("value"));
})


/**
 * 加载页面
 */
function loadIndPage(indPage) {
	$(".newgp_title ul li").eq(indPage).addClass("on").siblings().removeClass("on");
	if (indPage == 0) {
		$(".newgp_dbox").find(".newgp_llist").eq(1).hide();
		$(".newgp_dbox").find(".newgp_llist").eq(indPage).show();
	} else {
		$(".newgp_dbox").find(".newgp_llist").eq(0).hide();
		$(".newgp_dbox").find(".newgp_llist").eq(indPage).show();
		findAllSelectParam();
		//在审挂牌统计
		findInListedCompaniesStatistics();
		//拟挂牌企业总数 近一年 趋势图
		findInListedCompaniesOneYear();
		//新增拟挂牌家数 近一年 趋势图
		findInListedCompaniesAddOneYear();
		//新增拟挂牌
		findInListedCompaniesAdd();
		//全部拟挂牌
		findInListedCompanies();
	}

	$(".selectBox ul li").click(function () {
		var p = $(this).parent().parent().find("p");
		$(".selectBox ul").hide();
		$(".searching").hide();
		$(".jiabeijing").hide();
		p.text(($(this).find("a").text()).indexOf("...") > -1 ? $(this).find("a").attr("title") : $(this).find("a").text());
		p.attr("data-value", $(this).attr("data-value"));
		p.attr("value", $(this).attr("value"));
	})
}

/**
 * 挂牌企业数
 */
function findListing() {
	$.axs("/betaStock/threeBoardIndex/findListing.do", null, false, function (data) {
		if (data.retCode == "0000") {
			var resultTemp = data.retData;
			if (resultTemp == null || resultTemp == "") {
				return false;
			}
			//			console.log(resultTemp)
			var result = jQuery.parseJSON(resultTemp);
			//console.log(result)
			var listingAllHtml = "";
			var listingNewHtml = "";
			//全部挂牌企业
			listingAllHtml += '<div class="gp_info_l_top">';
			listingAllHtml += '<span>挂牌企业总数</span>';
			listingAllHtml += '<h2 class="timer" data-to="9480" data-speed="1500">' + result.totallisting + '<em></em></h2>';
			listingAllHtml += '</div>';
			listingAllHtml += '<div class="gp_info_l_btn">';
			listingAllHtml += '<ul>';
			listingAllHtml += '<li class="gp_zs">';
			listingAllHtml += '<span></span>';
			listingAllHtml += '<em>做市(家)</em>';
			listingAllHtml += '<h2>' + result.marketmaker + '</h2>';
			listingAllHtml += '</li>';
			listingAllHtml += '<li class="gp_xy">';
			listingAllHtml += '<span></span>';
			listingAllHtml += '<em>协议(家)</em>';
			listingAllHtml += '<h2>' + result.agreementnum + '</h2>';
			listingAllHtml += '</li>';
			listingAllHtml += '</ul>';
			listingAllHtml += '<div class="clr"></div>';
			listingAllHtml += '</div>';
			//今日新增挂牌企业
			listingNewHtml += '<div class="gp_info_l_top">';
			listingNewHtml += '<span>今日新增挂牌 <i>' + result.listingtime + '</i></span>';
			listingNewHtml += '<h2 class="timer" data-to="9485" data-speed="1500">' + result.newtotallisting + '<em></em></h2>';
			listingNewHtml += '</div>';
			listingNewHtml += '<div class="gp_info_l_btn">';
			listingNewHtml += '<ul>';
			listingNewHtml += '<li class="xzgp_zs">';
			listingNewHtml += '<span></span>';
			listingNewHtml += '<em>做市(家)</em>';
			listingNewHtml += '<h2>' + result.newlistmarketnum + '</h2>';
			listingNewHtml += '</li>';
			listingNewHtml += '<li class="xzgp_xy">';
			listingNewHtml += '<span></span>';
			listingNewHtml += '<em>协议(家)</em>';
			listingNewHtml += '<h2>' + result.newlistagreementnum + '</h2>';
			listingNewHtml += '</li>';
			listingNewHtml += '</ul>';
			listingNewHtml += '<div class="clr"></div>';
			listingNewHtml += '</div>';
			$("#listingAll").html(listingAllHtml);
			$("#listingNew").html(listingNewHtml);
			findListingAll(result.marketmaker, result.agreementnum);
			//wtl 7.6 3140 三板市场>挂牌页面，统计新增的协议和做市的地方数据只显示新增的
			findListingNew(result.newlistmarketnum, result.newlistagreementnum);
		} else {
			errorAlert(data.retCode, data.retMsg);
		}
	});
}
//挂牌企业总数
function findListingAll(zs, xy) {
	var myChart = echarts.init(document.getElementById('gp_info_r'));
	option = {
		color: ['#fcda6f', '#fd8a8f'],
		series: [
			{
				name: '访问来源',
				type: 'pie',
				radius: '85%',
				//	            提示文字显示到饼图里
				label: {
					normal: {
						position: 'inner'
					}
				},
				center: ['50%', '50%'],
				data: [
					{ value: zs, name: '做市' },
					{ value: xy, name: '协议' },

				],
				itemStyle: {
					emphasis: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}
		]
	};
	myChart.setOption(option);
	window.addEventListener("resize", function () {
		myChart.resize();
	});


}


//今日新增挂牌公司
function findListingNew(zsN, xyN) {
	var data = [];
	var color = [];
	if (zsN != 0) {
		var zuoshiObj = {}
		zuoshiObj.value = zsN;
		zuoshiObj.name = '做市';
		data.push(zuoshiObj);
		color.push('#cb93dd');
	}
	if (xyN != 0) {
		var xieyiObj = {}
		xieyiObj.value = xyN;
		xieyiObj.name = '协议';
		data.push(xieyiObj);
		color.push('#90b4e6');
	}

	var myChart2 = echarts.init(document.getElementById('xzgp_info_r'));
	option = {
		color: color,
		series: [
			{
				name: '访问来源',
				type: 'pie',
				//	            提示文字显示到饼图里
				label: {
					normal: {
						position: 'inner'
					}
				},
				radius: '85%',
				center: ['50%', '50%'],
				data: data,
				//	            [
				//	                {value:zsN, name:'做市'},
				//	                {value:xyN, name:'协议'},
				//	               
				//	            ],
				itemStyle: {
					emphasis: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}
		]
	};
	myChart2.setOption(option);
	window.addEventListener("resize", function () {
		myChart2.resize();
	});
}

//挂牌数量走势图 近一年/近一月
$('#listCount li').on('click', function () {
	var type = this.dataset.value;
	if (type == 0) {
		findListingCount(type);
		$(this).siblings().removeClass("on");
		$(this).addClass("on");
	} else if (type == 1) {
		findListingCount(type);
		$(this).siblings().removeClass("on");
		$(this).addClass("on");
	} else {
		findListingCount(1);
	}
});

//挂牌数量走势图
function findListingCount(type) {
	var types = type;
	//console.log(types)
	$.axs("/betaStock/threeBoardIndex/findListCount.do", { type: type }, false, function (data) {
		if (data.retCode == "0000") {
			var resultTemp = data.retData;
			if (resultTemp == null) {
				return false;
			}
			var result = jQuery.parseJSON(resultTemp);
			//挂牌数量走势图
			listingCount(result.date, result.num, types);
		} else {
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

//挂牌数量走势图
function listingCount(date, num, type) {
	var nums = [];
	$(num).each(function (index, item) {
		nums[nums.length] = Number(item);
	})
	nums = nums.sort(sortNumber);
	var lowNum = nums[0] - 20;
	var higherNum = nums[nums.length - 1] + 20;
	var myChart3 = echarts.init(document.getElementById('newgp_zst_sjmap'));
	option = {
		//	    title:{
		//	        show:true,
		//	        text:'挂牌企业总数',
		//	        textStyle:{
		//	            fontWeight:'normal',
		//	        },
		//	    },
		legend: {
			show: true,
			data: ["挂牌企业总数"]
		},
		color: ['#6ac8f9'],

		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},

		xAxis: [
			{
				type: 'category',
				data: date//['2016-01', '2016-02', '2016-03', '2016-04', '2016-05', '2016-06', '2016-07', '2016-08'],
				//	            axisTick: {
				//	                alignWithLabel: true
				//	            }
			}
		],
		yAxis: [{
			type: 'value',
			min: lowNum,
			max: higherNum
		}],
		//yAxis:yAxi,
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
					'<span class="tips_leibie_num fl">' + params[0].value + '</span>' +
					'<div class="clr"></div>' +
					'</div>' +
					'</div>';
				return divHtml;
				//7月3号王仙玲修改的柱状图的提示框类型end
			}
			//	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
			//	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			//	        }
		},
		series: [
			{
				name: '挂牌企业总数',
				type: 'bar',
				barWidth: '30',
				label: {
					normal: {
						show: true,
						position: 'top'
					}
				},
				data: num,//[10, 52, 200, 334, 390, 330, 500 , 220]
				itemStyle: {
					normal: {
						color: function (params) {
							// 检索结果颜色
							//                      if(params.dataIndex == itemIndex) {
							//                          return "#00C1EF";
							//                      } else {
							//                          return "#D53A35";
							//                      }
							return "#62a6f2";
						}
					},
					emphasis: {
						color: "#4a8ad3"//鼠标放到柱形图上显示的颜色
					}
				}
			},


		]
	};
	myChart3.setOption(option);
	window.addEventListener("resize", function () {
		myChart3.resize();
	});

}


//挂牌数量走势图 近一年/近一月
$('#listCountN li').on('click', function () {
	var type = this.dataset.value;
	if (type == 0) {
		findNewList(type);
		$(this).siblings().removeClass("on");
		$(this).addClass("on");
	} else if (type == 1) {
		findNewList(1);
		$(this).siblings().removeClass("on");
		$(this).addClass("on");
	} else {
		findNewList(1);
	}
});

//新增挂牌数量走势图
function findNewList(type) {
	//console.log(type)
	$.axs("/betaStock/threeBoardIndex/findNewList.do", { type: type }, false, function (data) {
		if (data.retCode == "0000") {
			var resultTemp = data.retData;
			if (resultTemp == null) {
				return false;
			}
			var result = jQuery.parseJSON(resultTemp);
			//console.log(result)
			//挂牌数量走势图
			listingCountNew(result.dateNew, result.numNew);
		} else {
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

//挂牌企业总数一年的
function listingCountNew(date, num) {

	var myChart4 = echarts.init(document.getElementById('newxzgp_zst_sjmap'));
	option = {
		//	    title:{
		//	        show:true,
		//	        text:'新增挂牌家数',
		//	        textStyle:{
		//	            fontWeight:'normal',
		//	        },
		//	    },
		legend: {
			show: true,
			data: ['新增挂牌家数']
		},
		color: ['#6ac8f9'],
		tooltip: {
			show: true,
			trigger: 'item',
			//	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
			//	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			//	        }
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},

		xAxis: [
			{
				type: 'category',
				data: date,//['10-01', '10-02', '10-03', '10-04', '10-05', '10-06', '10-07', '10-08', '10-09', '10-10', '10-11', '10-12', '10-13', '10-14'],
				axisTick: {
					alignWithLabel: true
				}
			}
		],
		yAxis: [
			{
				type: 'value'
			}
		],
		tooltip: {
			show: true,
			trigger: 'axis',
			formatter: function (params) {
				var divHtml = '<div class="sanban_tips">' +
					'<p class="sb_tips_title">' + params[0].name + '</p>' +
					'<div class="sb_tips_content">' +
					'<span class="tips_leibie fl">' + params[0].seriesName + '</span>' +
					'<span class="tips_leibie_num fl">' + params[0].value + '</span>' +
					'<div class="clr"></div>' +
					'</div>' +
					'</div>';
				return divHtml;
			}
			//	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
			//	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			//	        }
		},
		series: [
			{
				name: '新增挂牌家数',
				type: 'bar',
				barWidth: '30',
				label: {
					normal: {
						show: true,
						position: 'top'
					}
				},
				data: num,//[10, 52, 200, 334, 390, 330, 220,10, 52, 200, 334, 390, 330, 220]
				itemStyle: {
					normal: {
						color: function (params) {
							// 检索结果颜色
							//                      if(params.dataIndex == itemIndex) {
							//                          return "#00C1EF";
							//                      } else {
							//                          return "#D53A35";
							//                      }
							return "#62a6f2";
						}
					},
					emphasis: {
						color: "#4a8ad3"//鼠标放到柱形图上显示的颜色
					}
				}
			}
		]
	};
	myChart4.setOption(option);
	window.addEventListener("resize", function () {
		myChart4.resize();
	});
}

//新增挂牌企业列表
function findListNew() {
	var pageNum = $("#findListNew").attr("data-pageNum");
	if (pageNum == null || pageNum == "" || pageNum == "undefined") {
		pageNum = 1;
	}
	var pageSize = $("#findListNew").attr("data-pageSize");
	if (pageSize == null || pageSize == "" || pageSize == "undefined") {
		pageSize = 6;
	}
	var paramData = { pageNum: pageNum, pageSize: pageSize };
	$.axs("/betaStock/threeBoardIndex/findListNew.do", paramData, true, function (data) {
		if (data.retCode == "0000") {
			var result = data.retData;
			var pageNumResult = result.pageIndex;
			var pageSizeResult = result.pageLimit;
			var totalCountResult = result.totalCount;
			if (result == null) {
				return false;
			}
			$("#listNewCount").text(totalCountResult);
			var list = result.list;
			if (list != null && list.length > 0) {
				var html = '';
				for (var i = 0; i < list.length; i++) {
					var listNew = list[i];
					if (i == 0) {
						$("#noWTime").text(listNew.listingTime);
					}
					html += '<tr>';
					html += '<td class="shuzi"><a target="_blank" href="/businessDetails/newTBindex.html?stockName=' + (listNew.stockName == null ? "--" : listNew.stockName) + '&stockCode=' + (listNew.stockCode == null ? "--" : listNew.stockCode) + '">' + (listNew.stockName == null ? "--" : listNew.stockName) + '(' + (listNew.stockCode == null ? "--" : listNew.stockCode) + ')</a></td>';
					html += '<td>' + (listNew.dealtype == null ? "--" : listNew.dealtype) + '</td>';
					html += '<td>' + (listNew.tradeName == null ? "--" : listNew.tradeName) + '</td>';
					html += '<td>' + (listNew.state == null ? "--" : listNew.state) + '</td>';
					html += '<td>' + (listNew.sponsoredbroker == null ? "--" : listNew.sponsoredbroker) + '</td>';
					//console.log(listNew)
					if (listNew.priceChangeRatio == null || listNew.priceChangeRatio == " " || listNew.priceChangeRatio == undefined || listNew.priceChangeRatio == "--") {
						listNew.priceChangeRatio = "--";
						html += '<td>' + (listNew.newPrice == null ? "--" : (listNew.newPrice).toFixed(2)) + '</td>';
						html += '<td>' + listNew.priceChangeRatio + '%</td>';
					} else {
						if (listNew.priceChangeRatio > 0) {
							html += '<td class="red">' + (listNew.newPrice == null ? "--" : (listNew.newPrice).toFixed(2)) + '</td>';
							html += '<td class="red">' + listNew.priceChangeRatio + '%</td>';
						} else {
							html += '<td class="lvse">' + (listNew.newPrice == null ? "--" : (listNew.newPrice).toFixed(2)) + '</td>';
							html += '<td class="lvse">' + listNew.priceChangeRatio + '%</td>';
						}
					}
					html += '<td class="shuzi">' + (listNew.amount == null ? "--" : (listNew.amount).toFixed(2)) + '</td>';
					html += '<td class="shuzi">' + (listNew.priceAmount == null ? "--" : (listNew.priceAmount).toFixed(2)) + '</td>';
					html += '</tr> ';
				}
				$("#findListNew").html(html);
				$('#newpage_1').show();
				//分页
				$('#newpage_1').pagination({
					total: totalCountResult,
					pageSize: pageSize,
					current: pageNum,
					layout: ['first', 'prev', 'links', 'next'],
					links: 0,
					displayMsg: "",
					showPageList: false,
					onSelectPage: function (pageNumber, size) {
						$("#findListNew").attr("data-pageNum", pageNumber);
						$("#findListNew").attr("data-pageSize", size);
						findListNew();
					}
				});
				//修改分页文字
				setPageText2('newpage_1');
			} else {
				$("#noWTime").text("--");
				$('#newpage_1').hide();
				var html = getNoDataHtml(10);
				$("#findListNew").html(html);
			}
		} else {
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

//全部挂牌企业列表
function findAllList() {
	//转让方式
	var transferType = "";
	var transferValue = $("#transferType").prev().attr("value");
	if (transferValue != null && transferValue != "" && transferValue != "undefined" && transferValue != 0) {
		transferType = $("#transferType").prev().text();
	}
	//行业
	var tradeName = "";
	var tradeValue = $("#newsecondLevelTrade").prev().attr("value");
	if (tradeValue != null && tradeValue != "" && tradeValue != "undefined" && tradeValue != 0) {
		tradeName = $("#newsecondLevelTrade").prev().attr("value");
	}
	//地区
	var areaName = "";
	var areaValue = $("#newfirstLevelArea").prev().attr("value");
	if (areaValue != null && areaValue != "" && areaValue != "undefined" && areaValue != 0) {
		areaName = $("#newfirstLevelArea").prev().text();
	}
	//主办券商
	var sponsoredName = "";
	var asponsoredValue = $("#newhostBrokerage").prev().attr("value");
	if (asponsoredValue != null && asponsoredValue != "" && asponsoredValue != "undefined" && asponsoredValue != 0) {
		sponsoredName = $("#newhostBrokerage").prev().text();
	}
	//股票代码或者简称
	var stockCodeParam = $("#stockCodeParam").val();
	var stcokName = "";
	var stcokCode = "";
	if (!isNaN(stockCodeParam)) {
		stcokCode = stockCodeParam;
	} else {
		stcokName = stockCodeParam;
	}
	//条件
	loadData(transferType, tradeName, areaName, sponsoredName, stcokCode, stcokName, 1, 10)
}


function loadData(transferType, tradeName, areaName, sponsoredName, stcokCode, stcokName, pageNum, pageSize) {
	var paramData = { dealType: transferType, industry: tradeName, state: areaName, sponsoredBroker: sponsoredName, stockCode: stcokCode, companyForShort: stcokName, pageIndex: pageNum, pageLimit: pageSize };
	$.axs("/betaStock/enterPriseData/findAllList.do", paramData, true, function (data) {
		if (data.retCode == "0000") {
			var result = data.retData;
			var pageNumResult = result.pageIndex;
			var pageSizeResult = result.pageLimit;
			var totalCountResult = result.totalCount;
			if (result == null) {
				return false;
			}
			$("#listAllCount").text(totalCountResult);
			var list = result.list;
			if (list != null && list.length > 0) {
				var html = '';
				for (var i = 0; i < list.length; i++) {
					var temp = list[i];
					html += '<tr>';
					html += '<td class="shuzi"><a target="_blank" href="/businessDetails/newTBindex.html?stockName=' + temp.stockName + '&stockCode=' + temp.stockCode + '">' + temp.stockName + '(' + temp.stockCode + ')</a></td>';
					html += '<td>' + (temp.dealtype == null ? "--" : temp.dealtype) + '</td>';
					html += '<td>' + (temp.tradeName == null ? "--" : temp.tradeName) + '</td>';
					html += '<td>' + (temp.state == null ? "--" : temp.state) + '</td>';
					html += '<td>' + (temp.sponsoredbroker == null ? "--" : temp.sponsoredbroker) + '</td>';
					if (temp.priceChangeRatio >= 0) {
						html += '<td class="red">' + (temp.newPrice == null ? "--" : (temp.newPrice).toFixed(2)) + '</td>';
						html += '<td class="red">' + (temp.priceChangeRatio == null ? "--" : (temp.priceChangeRatio).toFixed(2)) + '%</td>';
					} else {
						html += '<td class="lvse">' + (temp.newPrice == null ? "--" : (temp.newPrice).toFixed(2)) + '</td>';
						html += '<td class="lvse">' + (temp.priceChangeRatio == null ? "--" : (temp.priceChangeRatio).toFixed(2)) + '%</td>';
					}
					html += '<td class="shuzi">' + (temp.amount == null ? "--" : (temp.amount / 10000).toFixed(2)) + '</td>';
					html += '<td class="shuzi">' + (temp.priceAmount == null ? "--" : (temp.priceAmount / 10000).toFixed(2)) + '</td>';
					html += '</tr> ';
				}
				$("#listAll").html(html);
				$('#page_2').show();
				//分页
				$('#page_2').pagination({
					total: totalCountResult,
					pageSize: pageSize,
					current: pageNum,
					layout: ['first', 'prev', 'links', 'next'],
					links: 0,
					displayMsg: "",
					showPageList: false,
					onSelectPage: function (pageNumber, size) {
						$("#listAll").attr("data-pageNum", pageNumber);
						$("#listAll").attr("data-pageSize", size);
						loadData(transferType, tradeName, areaName, sponsoredName, stcokCode, stcokName, pageNumber, size);
					}
				});
				//修改分页文字
				setPageText2('page_2');
			} else {
				$('#page_2').hide();
				var html = getNoDataHtml(10);
				$("#listAll").html(html);
			}
		} else {
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

//查询全部挂牌企业 总股本流通股本 计算总值
function fingListCount() {
	$.axs("/betaStock/qutation/fingListCount.do", null, true, function (data) {
		if (data.retCode == "0000") {
			var result = data.retData;
			if (result == null) {
				return false;
			}
			//console.log(result)
			$("#totalShareVapital").html((result.generalCapital == null || result.generalCapital == "") ? "--" : result.generalCapital.toFixed(2));
			$("#flowOfEquity").html((result.circulateCapital == null || result.circulateCapital == "") ? "--" : result.circulateCapital.toFixed(2));
			$("#turnoverQuantity").html((result.tradingVolume == null || result.tradingVolume == "") ? "--" : result.tradingVolume.toFixed(2));
			$("#turnoverAmount").html((result.tradingAmount == null || result.tradingAmount == "") ? "--" : result.tradingAmount.toFixed(2));
		} else {
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

/**
* 查询所有二级行业
*/
function findSecondLevelTrade() {
	$.axs("/betaStock/btCategory/findBtCategory.do", null, false, function (data) {
		if (data.retCode == 0000) {
			if (data.retData != null && data.retData.length != 0) {
				var newsecondLevelTrade = data.retData;
				var html = '';
				html += '<li value="0"><a href="javascript:void(0)">全部</a></li>';
				$.each(newsecondLevelTrade, function (index, item) {
					html += '<li value="' + item.categoryId + '"><a href="javascript:void(0)" title = ' + item.categoryName + ' >' + (item.categoryName.length > 12 ? item.categoryName.substring(0, 12) + "..." : item.categoryName) + '</a></li>';
				});
				$("#newsecondLevelTrade").html(html);
			}
		}
	});
}
/**
* 查询所有区域
*/
function findFirstLevelArea() {
	$.axs("/betaStock/common/findWorkBook.do", { type: 1, dataType: 1 }, false, function (data) {
		if (data.retCode == 0000) {
			if (data.retData != null && data.retData.length != 0) {
				var newfirstLevelArea = data.retData;
				var html = '';
				html += '<li value="0"><a href="javascript:void(0)">全部</a></li>';
				$.each(newfirstLevelArea, function (index, item) {
					html += '<li value="' + item.id + '"><a href="javascript:void(0)">' + item.nameCn + '</a></li>';
				});
				$("#newfirstLevelArea").html(html);
			}
		}
	});
}

/**
 * 所有主办券商
 */
function findHostBrokerage() {
	$.axs("/betaStock/common/findWorkBook.do", { type: 5, dataType: 1 }, false, function (data) {
		if (data.retCode == 0000) {
			if (data.retData != null && data.retData.length != 0) {
				var newfirstLevelArea = data.retData;
				var html = '';
				html += '<li value="0"><a href="javascript:void(0)">全部</a></li>';
				$.each(newfirstLevelArea, function (index, item) {
					html += '<li value="' + item.id + '"><a href="javascript:void(0)">' + item.nameCn + '</a></li>';
				});
				$("#newhostBrokerage").html(html);
			}
		}
	});
}

function sortNumber(a, b) {
	return a - b;
}








