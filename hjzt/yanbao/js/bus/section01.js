//第一章节JS
var dataT = { stockCode: UTIL.getPara("stockCode") };//全局变量stockCode
var stockCode = UTIL.getPara("stockCode");
//var dataT = {stockCode:"430002"};
//var stockCode = "430002";
var address = window.location.host;//网站访问地址

//点击表格的查看专利详情
$("#patentnumTc").delegate(".chakan", "click", function (e) {
	//  		alert(1)
	if ($(this).text() == "查看") {
		$(this).text("收起");
		$(this).parent().parent().siblings(".xq-tc").hide();
		$(this).parent().parent().next().show();
		$(this).parent().parent().siblings().find(".chakan").text("查看");
	} else {  
		$(this).text("查看");
		$(this).parent().parent().next().hide();
	}
	e.stopPropagation();
})
//点击表格的查看软件著作权详情
$("#copyrightnumTc").delegate(".chakan", "click", function (e) {
	if ($(this).text() == "查看") {
		$(this).text("收起");
		$(this).parent().parent().siblings(".xq-tc").hide();
		$(this).parent().parent().next().show();
		$(this).parent().parent().siblings().find(".chakan").text("查看");
	} else {
		$(this).text("查看");
		$(this).parent().parent().next().hide();
	}
	e.stopPropagation();
})

// 做市商
$("#marketType").on("click", function () {
//	alert(0)
	$("#marketNum").show();
	$(".marsk").show();
	$("body,html").css("overflow", "hidden");
})

$(".tc-close").on("click", function () {
	// alert(0)
	$(".marsk").hide();
//	$("#copyrightnumTc").css("display","none");
	$(this).parent().hide();
})
//第一章第一节
function sectionOne1() {
	//企业简介方法调用 section0
	UTIL.axs(UTIL.CONFIG.companyIntroduction, dataT, true, function (_data) {
		if (_data.retCode == "0000") {
			var data = _data.retData;
			$("#companyIntroductionId").html("");
			$("#companyIntroductionId").html(isStrKong(data.introduction).replace(/\s+/g, ""));
		}
	});
	//企业工商信息 section0
	UTIL.axs(UTIL.CONFIG.businessInformation, dataT, true, function (_data) {
//		console.log(_data)
		if (_data.retCode == "0000") {
			var data = _data.retData;
			$("#chiname").html(isStrKong(data.chiname));
			$("#legalperson").html(isStrKong(data.legalperson));
			$("#regcapital").html(UTIL.fmtNum3((data.regcapital / 10000).toFixed(2)) + "万元");
			$("#industry").html(isStrKong(data.industry));
			if (isStrKong(data.registeredaddress) != "--" && (data.registeredaddress).length > 24) {
				$("#registeredaddress").html((data.registeredaddress).substring(0, 24) + "...");
				$("#registeredaddress").attr('title', data.registeredaddress);
			} else {
				$("#registeredaddress").html(isStrKong(data.registeredaddress));
			}
			if (isStrKong(data.businessaddress) != "--" && (data.businessaddress).length > 24) {
				$("#businessaddress").html((data.businessaddress).substring(0, 24) + "...");
				$("#businessaddress").attr('title', data.businessaddress);
			} else {
				$("#businessaddress").html(isStrKong(data.businessaddress));
			}
			$("#registrationDate").html(isStrKong(data.registrationDate));
			$("#phone").html(isStrKong(data.phone));
			$("#fax").html(isStrKong(data.fax));
			$("#weburl").html(isStrKong(data.weburl));
			$("#businessterm").html(isStrKong(data.businessterm));
			$("#state").html(isStrKong(data.state));
			if(isStrKong(data.reginstitute) !="--" && (data.reginstitute).length>24){
				$("#reginstitute").html((data.reginstitute).substring(0,24)+"...");	
				$("#reginstitute").attr("title",data.reginstitute);
			}else{
				$("#reginstitute").html(isStrKong(data.reginstitute));
			}
			$("#creditcode").html(isStrKong(data.creditcode));
			$("#businessscope").html(isStrKong(data.businessscope));
			var patentnum = data.patentnum;
			var copyrightnum = data.copyrightnum;
			if (patentnum == null || patentnum == "" || patentnum == undefined || patentnum == 0) {
				//查看失效
				$("#patentnum").addClass("wu").removeClass("zhuanli");
				$("#patentnum").html("无");
				//标签置灰
			} else {
				$("#patentnum").addClass("zhuanli").removeClass("wu");
				$("#patentnum").html("本公司拥有<em class='zl-num'>" + patentnum + "</em>项专利");
			}
			if (copyrightnum == null || copyrightnum == "" || copyrightnum == undefined || copyrightnum == 0) {
				//查看失效
				$("#copyrightnum").addClass("wu").removeClass("zhuanli");
				$("#copyrightnum").html("无");
			} else {
				$("#copyrightnum").addClass("zhuanli").removeClass("wu");
				$("#copyrightnum").html("本公司拥有<em class='zz-num'>" + copyrightnum + "</em>项著作权");
			}
		}
	});
	//点击专利显示弹窗
	$("#patentnum").on("click", function () {
		var dataP = { stockCode: stockCode, pageNum: 1, pageSize: 10000 };
		if($(this).text()=="无"){
			return false;
		}else{
				UTIL.axs(UTIL.CONFIG.patentList, dataP, true, function (_data) {
				var html = "";
				$("#patentnumListT").html("");
				if (_data.retCode == "0000") {
					var result = _data.retData.patentList;
					if (result != null && result != "" && result != undefined && result.length > 0) {
						//渲染列表
						$(result).each(function (index, item) {
							html += "<tr>"
								+ "<td>" + isStrKong(item.patentname) + "</td>"
								+ "<td>" + isStrKong(item.publicatondate) + "</td>"
								+ "<td>" + isStrKong(item.requestnumber) + "</td>"
								+ "<td>" + isStrKong(item.publicationnumber) + "</td>"
								+ "<td class='zhuanli-ck-tc'>"
								+ "<span class='chakan shuzi'>查看</span>"
								+ "</td></tr><tr style='display: none;' class='xq-tc'><td colspan='5'>"
								+ "<div class='chakan-tc'>"
								+ "<i class='zhijian'></i>"
								+ "<h3>专利详情</h3>"
								+ "<div class='zl-list'>"
								//		    					+ "<div class='zhuanli-img'>"
								//		    					+ "<span><img src='images/zhuanli-img.png' alt='' /></span>"
								//		    					+ "</div>"
								+ "<div class='zhuanli-list'>"
								+ "<ul>"
								+ "<li><em>专利名称</em><span>" + isStrKong(item.patentname) + "</span><div class='clearfix'></div></li>"
								+ "<li><em>申请公布号</em><span>" + isStrKong(item.publicationnumber) + "</span><div class='clearfix'></div></li>"
								+ "<li><em>申请号</em><span>" + isStrKong(item.requestnumber) + "</span><div class='clearfix'></div></li>"
								+ "<li><em>分类号</em><span>" + getStr(isStrKong(item.classnumber)) + "</span><div class='clearfix'></div></li>"
								+ "<li><em>地址</em><span>" + isStrKong(item.address) + "</span><div class='clearfix'></div></li>"
								+ "<li><em>发明人</em><span>" + getStr(isStrKong(item.inventor)) + "</span><div class='clearfix'></div></li>"
								+ "<li><em>申请人</em><span>" + getStr(isStrKong(item.applicant)) + "</span><div class='clearfix'></div></li>"
								+ "<li><em>申请日</em><span>" + isStrKong(item.applicationdate) + "</span><div class='clearfix'></div></li>"
								+ "<li><em>申请公布日</em><span>" + isStrKong(item.publicatondate) + "</span><div class='clearfix'></div></li>"
								+ "<li><em>代理机构</em><span>" + isStrKong(item.agency) + "</span><div class='clearfix'></div></li>"
								+ "<li><em>代理人</em><span>" + getStr(isStrKong(item.agent)) + "</span><div class='clearfix'></div></li>"
								+ "<li><em></em><span></span><div class='clearfix'></div></li>"
								+ "<li class='zhuanli-zhaiyao'><em>摘要</em><span>" + isStrKong(item.digest) + "</span><div class='clearfix'></div></li>"
								+ "<div class='clearfix'></div>"
								+ "</ul>"
								+ "</div>"
								+ "</div>"
								+ "</div>"
								+ "</td>"
								+ "</tr>";
						})
						$("#patentnumListT").html(html);
					} else {
						Nohtml = '<tr><td colspan="5"><div class="noDatas">暂无数据</div></td></tr>'
						$("#patentnumListT").append(Nohtml);
					}
				}
			});
		}
		
		$(".marsk").show();
		$("body,html").css("overflow", "hidden");
		$("#patentnumTc").show();
	})

	// $(".marsk").on("click",function(){
	// 	$(".marsk").hide();
	// 	$("body,html").css("overflow","auto");
	// 	$("#patentnumTc").hide();
	// 	$("#copyrightnumTc").hide();
	// 	$(".faxing-tc").hide();
	// 	$("#marketNum").hide();

	// })
	// $(".tc-close").on("click",function(){
	// 	$(".marsk").click();
	// })
	//点击著作权显示弹窗
	$("#copyrightnum").on("click", function () {
		//企业著作权
		var dataP = { stockCode: stockCode, pageNum: 1, pageSize: 10000 };
		if($(this).text()=="无"){
			return false;
		}else{
			UTIL.axs(UTIL.CONFIG.copyrightList, dataP, true, function (_data) {
				var html = "";
				$("#copyrightnumList").html("");
				if (_data.retCode == "0000") {
					var result = _data.retData.copyrightList;
					if (result != null && result != "" && result != undefined && result.length > 0) {
						//渲染列表
						$(result).each(function (index, item) {
							html += "<tr>"
								+ "<td>" + isStrKong(item.softwarefullname) + "</td>"
								+ "<td>" + isStrKong(item.approvaldate) + "</td>"
//								+ "<td>" + isStrKong(item.registrationmark) + "</td>"
								+ "<td>" + (isStrKong(item.registrationmark)=="--"?"--":((item.registrationmark).replace(/\s+/g,""))) + "</td>"
								+ "<td>" + isStrKong(item.versionnumber) + "</td>"
								+ "<td class='zhuanli-ck-tc'>"
								+ "<span class='chakan'>查看</span>"
								+ "</td></tr><tr style='display: none;' class='xq-tc'><td colspan='5'>"
								+ "<div class='chakan-tc'>"
								+ "<i class='zhijian'></i>"
								+ "<h3>专利详情</h3>"
								+ "<div class='zl-list'>"
								//  							 + "<div class='zhuanli-img'>"
								//  							 + "<span><img src='../images/zhuanli-img.png' alt='' /></span>"
								//  							 + "</div>"
								+ "<div class='zhuanli-list'>"
								+ "<ul>"
								+ "<li><em>软件全称</em><span>" + isStrKong(item.fullName) + "</span><div class='clearfix'></div></li>"
								+ "<li><em>软件简称</em><span>" + isStrKong(item.shortName) + "</span><div class='clearfix'></div></li>"
								+ "<li><em>登记号</em><span>" + isStrKong(item.registrationmark) + "</span><div class='clearfix'></div></li>"
								+ "<li><em>分类号</em><span>" + isStrKong(item.classnumber) + "</span><div class='clearfix'></div></li>"
								+ "<li><em>版本号</em><span>" + isStrKong(item.versionnumber) + "</span><div class='clearfix'></div></li>"
								+ "<li><em>著作权人</em><span>" + isStrKong(item.copyrightholder) + "</span><div class='clearfix'></div></li>"
								+ "<li><em>首次发表日期</em><span>" + isStrKong(item.firstdate) + "</span><div class='clearfix'></div></li>"
								+ "<li class='zhuanli-zhaiyao'><em>登记日期</em><span>" + isStrKong(item.recorddate) + "</span><div class='clearfix'></div></li>"
								+ "<div class='clearfix'></div>"
								+ "</ul>"
								+ "</div>"
								+ "</div>"
								+ "</div>"
								+ "</td>"
								+ "</tr>";
						})
						$("#copyrightnumList").append(html);
					} else {
						Nohtml = '<tr><td colspan="5"><div class="noDatas">暂无数据</div></td></tr>'
						$("#copyrightnumList").append(Nohtml);
					}
				}
			});
		}
		
		
		$(".marsk").show();
		$("body,html").css("overflow", "hidden");
		$("#copyrightnumTc").show();
	})

};
//js JSON转字符串
function getStr(data) {
	if (data != "--") {
		var list = JSON.parse(data);
		var str = "";
		$(list).each(function (index, item) {
			str += item + ",";
		});
		return (str.substr(0, str.length - 1));
	}
}
//第一章第二节
function sectionOne2() {
	//企业挂牌信息 section1
	UTIL.axs(UTIL.CONFIG.enlisted, dataT, true, function (_data) {
		if (_data.retCode == "0000") {
			var data = _data.retData;
			$("#stockdate").html(isStrKong(data.stockdate));
			$("#stockname").html(isStrKong(data.stockname));
			$("#stockcode").html(isStrKong(data.stockcode));
			if (data.dealtype == "做市") {
				$("#zuoShiShang").show();
			} else if (data.dealtype == "协议") {
				$("#zuoShiShang").hide();
				$(".zhuanrang").css("width", "100%");
			}
			$("#dealtype").html(isStrKong(data.dealtype));
			$("#stockblock").html(isStrKong(data.stockblock));
			$("#sponsoredbroker").html(isStrKong(data.sponsoredbroker));
			$("#ccountingfirm").html(isStrKong(data.ccountingfirm));
			$("#lawname").html(isStrKong(data.lawname));
			$("#secretary").html(isStrKong(data.secretary));
			$("#shareholder").html(isStrKong(data.shareholder));
			$("#actualcontroller").html(isStrKong(data.actualcontroller));
			$("#totalsharecapital").html(UTIL.fmtNum3((data.totalsharecapital / 10000).toFixed(2)) + "万股");
			$("#circulationcapital").html(UTIL.fmtNum3((data.circulationcapital / 10000).toFixed(2)) + "万股");
		}
	});
}


function marketList() {
	var marketType = "";
	var dataParam = { stockCode: stockCode };
	UTIL.axs(UTIL.CONFIG.findMarketInventoryN, dataParam, true, function (data) {
		//console.log(data)
		if (data.retCode == "0000") {
			var result = data.retData;
			if (result != "" && result != null && result != undefined) {
				$("#marketType").html(result.length);
				var trHtml = '';
				$(result).each(function (index, item) {
					trHtml += '<tr>';
					trHtml += '<td>' + item.strBuyername + '</td>';
					if (item.decSharenum != "" && item.decSharenum != null && item.decSharenum != "null" && item.decSharenum != undefined) {
						trHtml += '<td class=shuzi>' + UTIL.fmtNum3(Number(item.decSharenum).toFixed(2)) + '</td>';
					} else {
						trHtml += '<td class=shuzi>--</td>';
					}
					trHtml += '<td>' + item.zsstartdate + '</td>';
					trHtml += '<td>' + isStrKong(item.isFirstMarket) + '</td>';
					trHtml += '<td>' + isStrKong(item.isMainMarket) + '</td>';
					trHtml += '</tr>';
					//console.log(trHtml)
				})
				$("#marketList").html(trHtml);
			} else {
				$("#marketList").html('<tr><td colspan="3"><div class="noDatas-s1">暂无数据</div></td><tr>');
			}
			//$("#marketType").html(result.length).on("click", marketTypeevent)
			// $("#zuoShiShang").on("click",function(){console.log("ss")});

		}
	})
}

//第一章第三节
function sectionOne3() {
    
	//十大股东，实际控制人情况 section2
	UTIL.axs(UTIL.CONFIG.findACMsg, dataT, true, function (data) {
		var data = data.retData;
		$("#shareholder_2").html("<p>" + isStrKong(data.shareholderMsg) + "</P>");
		$("#actualcontroller_2").html("<p>" + isStrKong(data.actualControllerMsg) + "</P>");
	});
	
	var stokCodeParams={stockCode:stockCode};
	UTIL.axs(UTIL.CONFIG.findShareholdersReportDate, stokCodeParams, true, function (data) {
		//console.log(data);
		if(data.retCode=="0000"){
			if(data.retData!="" && data.retData!=null && data.retData!=undefined){
				var result=data.retData;
				$("#reportData").html(result[0].noticeDate);
				var li='';
				$("#gdList").html("");
				$(result).each(function(index,item){
					li+='<li>'+item.noticeDate+'</li>';
				})
				$("#gdList").html(li);
			}
		}
	});
	
	//点击tab切换
	$(".tab-list span").on("click", function () {
		if ($(this).hasClass("on")) {
			return false;
		} else {
			$(this).addClass("on").siblings().removeClass("on");
			if ($(this).text() == "图表") {
				$(".echarts-tb").show();
				$(".caiwu-table").hide();
			} else {
				$(".echarts-tb").hide();
				$(".caiwu-table").show();
			}
		}
	})
}
function findshareholders(time){
	var times=time;
	var params={stockCode:stockCode,reportDate:times};
	//十大股东列表 section2 dataT为股票代码和报告期也就是选择的年份，不传报告期的时候显示的最新一年的数据
	UTIL.axs(UTIL.CONFIG.shareholders, params, true, function (_data) {
		//console.log(_data)
		var html = ""
		var nameList = [];//十大股东图表
		var dataList = [];//十大股东图表
		$("#tenShareholders").html("");
		if (_data.retCode == "0000") {
			var result = _data.retData;
			//console.log(result)
			var totalmarketvalue = (result[0].totalmarketvalue / 100000000).toFixed(2);
			if (result != null && result != "" && result != undefined && result.length > 0) {
				//渲染列表
				$(result).each(function (index, item) {
					html += "<tr>";
					if ((item.investor).length > 16) {
						html += "<td title='" + item.investor + "' style='cursor:pointer;'>" + (item.investor).substring(0, 15) + "..." + "</td>";
					} else {
						html += "<td title='" + item.investor + "' style='cursor:pointer;'>" + item.investor + "</td>";
					}

					html += "<td class='shuzi'>" + item.proportion + "%</td>";
					html += "<td class='shuzi'>" + UTIL.fmtNum3((item.holdcount / 10000).toFixed(2)) + "</td>";
					html += "</tr>";
					nameList.push(item.investor);
					dataList.push({ "value": item.proportion, "name": item.investor,"holdcount":UTIL.fmtNum3((item.holdcount / 10000).toFixed(2)) });
				})
				$("#tenShareholders").html(html);//渲染列表
				pieChartShareholders(totalmarketvalue, nameList, dataList);//十大股东饼状图
				//UTIL.sjly("#sdgdly", "10dgd", ".sdgd", "sjlyy");//天加数据来源
			} else {
				html = "<tr><td colspan = '3'><div class='noDatas'>暂无数据</div></td></tr>";
				$("#tenShareholders").html(html);//渲染列表
				pieChartShareholders(totalmarketvalue, nameList, dataList);//十大股东饼状图
			}
		}
	});
}

//第一章第六节
function zhongdaShiJian(isPay,pageNum,type){
	if(!pageNum)pageNum=1;
	if(!type)type=1;
	var html = "";
	var isPay=isPay;
	var dataList = { stockCode: stockCode, eventType: null, isPay:isPay,pageSize:10,pageNum:pageNum };
	//重大事件详情
	UTIL.axs(UTIL.CONFIG.eventDetail, dataList, true, function (_data) {
		if (_data.retCode == "0000") {
			var data = _data.retData;
			var totalPages=data.pageTotal;
			if (data.data != null && data.data != "" && data.data != undefined && data.data.length > 0) {
				//渲染列表
				$(data.data).each(function (index, item) {
					html += "<tr>"
						+ "<td>" + isStrKong(item.eventType) + "</td>"
						+ "<td>" + isStrKong(item.date) + "</td>"
					if (isStrKong(item.announcementName) != "--" && (item.announcementName).length > 34) {
						html += "<td style='cursor: pointer' title=" + (item.announcementName) + ">" + isStrKong((item.announcementName).substring(0, 34)) + "</td>"
					} else {
						html += "<td>" + isStrKong(item.announcementName) + "</td>"
					}
					html += "<td><span class='chakan' onclick = 'ggShow(\"" + item.url + "\")'>查看</span></td>"
					html += "</tr>";
				})
				$("#eventListGG").html(html);
				if(totalPages==1){
					$('#ZDSJLB').css('display','none')
				}

				if(type==1){
					$('#ZDSJLB').jqPaginator({
					totalPages: totalPages,
					totalCounts: data.total,
					//visiblePages: 5,//总共显示多少页
					pageSize:10,
					 first: '<li class="prev"> <a href="#" class="first" data-action="first">«</a> </li>',
					prev: '<li class="prev"> <a href="#" class="previous" data-action="previous">‹</a> </li>',
					next: '<li class="next"><a href="javascript:;"class="next" data-action="next">›</a></li>',
					last: '<li class="next"><a href="javascript:;" class="last" data-action="last">»</a></li>',
					page: '<li class="page"><a href="javascript:;">{{page}}</a> </li>',
					currentPage: pageNum,
					onPageChange: function (pageNum) {
						if(type==1){
							type=2;
						}else{
							zhongdaShiJian('',pageNum,2);	
						}				   
					}
				});
				}
				
			} else {
				html = "<tr><td colspan = '4'><div class='noDatas'>暂无数据</div></td></tr>";
				$("#eventListGG").html(html);
			}
		}
	});
}
function sectionOne6(isPay) {//未付费的时候的重大事件数据
	//重大事件列表 section5
	var html = "";
	var isPay=isPay;
	var dataList = { stockCode: stockCode, eventType: null, isPay:isPay };
	UTIL.axs(UTIL.CONFIG.eventList, dataList, true, function (_data) {
		var ggZy = "";
		var ggNum = 0;
		var nameList = [];//重大事项类型名称
		var dataList = [];//重大事项类型数量
		if (_data.retCode == "0000") {
			var data = _data.retData;
			//console.log(data)
			if (data != null && data != "" && data != undefined && data.length > 0) {
				//数组赋值
				$(data).each(function (index, item) {
					ggNum += item.num;
					ggZy += isStrKong(item.eventType) + ":" + isSZKong(item.num) + ",";
					nameList.push(item.eventType);
					dataList.push(item.num);
				})
				if(isPay==null){
					$("#eventNum").html("<span>近两年来，重大事件" + ggNum + "件</span>(" + (ggZy.substr(0, ggZy.length - 1)) + ")");
				}else if(isPay){
					$("#eventNum").html("<span>自挂牌以来，重大事件" + ggNum + "件</span>(" + (ggZy.substr(0, ggZy.length - 1)) + ")");
				}
				
				eventListChart(nameList, dataList);//重大事项柱状图
				//UTIL.sjly("#zdsjly", "zdsj", ".zdsj", "sjlyy");
			} else {
				$("#importantEvent").hide();
				$("#eventNum").hide();
				$("#importantEvent").after('<div class="noDatas">暂无数据</div>');
			}
		}
	});
	
	//点击tab切换
	$(".tab-list span").on("click", function () {
		if ($(this).hasClass("on")) {
			return false;
		} else {
			$(this).addClass("on").siblings().removeClass("on");
			if ($(this).text() == "图表") {
				$(".zhongd-sj").show();
				$(".reyuan-table").hide();
			} else {
				$(".zhongd-sj").hide();
				$(".reyuan-table").show();
			}
		}
	})
}
//查看重大事件 公告
function ggShow(url) {
	if (url != "--") {
		window.open("http://gonggao.159jh.com/gonggao" + url);
	} else {
		//公告路径不存在
		$.zmAlert("公告路径不存在");
	}
}



//第一章第八节
function sectionOne8() {
	//融资情况列表 section7
	UTIL.axs(UTIL.CONFIG.issueList, dataT, true, function (_data) {
		var html = ""
		$("#issueList").html("");
		if (_data.retCode == "0000") {
			var data = _data.retData;
			if (data != null && data != "" && data != undefined && data.length > 0) {
				//渲染列表
				$(data).each(function (index, item) {
					html += "<tr>"
						+ "<td class='trzLeft'>" + isStrKong(item.type) + "</td>"
						+ "<td>" + isStrKong(item.date) + "</td>"
						+ "<td class='shuzi'>" + UTIL.fmtNum3((item.fundraising).toFixed(2)) + "</td>"
						+ "<td class='shuzi'>" + item.issueprice + "</td>"
						+ "<td class='shuzi'>" + UTIL.fmtNum3((item.issuenumber).toFixed(2)) + "</td>"
						+ "<td class='zhuanli-ck-tc shuzi'><span class='chakan' onclick='issueDetail(\"stockCode\",\"" + item.mjzj + "\",\"" + item.date + "\")'>" + isSZKong(item.objectsNum) + "</span>"
					html += "</td></tr>";
				})
				$("#issueList").html(html);
			} else {
				html = "<tr><td colspan = '6'><div class='noDatas'>暂无数据</div></td></tr>";
				$("#issueList").html(html);
			}
		}
	});

}
//查询投融分析的增加的内容
function findIssueListInfo(){
	var dataD = { stockCode: stockCode};
	UTIL.axs(UTIL.CONFIG.findIssueListInfo, dataD, false, function (data) {
		//console.log(data)
		if(data.retCode=="0000"){
			if(data.retData!="" && data.retData!=null && data.retData!=undefined){
				var result=data.retData;
				$(".rzms").html("有息负债："+result.c0_1+"<br/>WACC："+result.c0_2);
			}
		}
	})
}
//融资详情
function issueDetail(th, mjzj, date) {
	var dataD = { stockCode: stockCode, raiseAmount: mjzj, date: date, pageNum: 1, pageSize: 10000 };
	var htmlD = "";
	UTIL.axs(UTIL.CONFIG.issueDetail, dataD, false, function (_data) {
		if (_data.retCode == "0000") {
			var result = _data.retData.issueList;
			if (result != null && result != "" && result != undefined && result.length > 0) {
				$(result).each(function (index, item) {
					htmlD += "<tr>";
					if (item.objectsname != null && 　item.objectsname != "" && item.objectsname != undefined && item.objectsname != "null") {
						if ((item.objectsname).length > 30) {
							var name = item.objectsname.substring(0, 30) + "...";
							htmlD += "<td title='" + item.objectsname + "'>" + name + "</td>";
						} else {
							htmlD += "<td>" + isStrKong(item.objectsname) + "</td>";
						}
					}
					htmlD += "<td class='shuzi'>" + UTIL.fmtNum3((item.sharesnumber).toFixed(2)) + "</td>";
					htmlD += "<td class='shuzi'>" + UTIL.fmtNum3((item.sharesamount).toFixed(2)) + "</td>";
					htmlD += "</tr>";
				})
				$("#faxingNum").html(htmlD);
			} else {
				htmlD = "<tr><td colspan = '3'><div class='noDatas'>暂无数据</div></td></tr>";
				$("#faxingNum").html(htmlD);
			}
		}
	});
	$(".marsk").show();
	$(".faxing-tc").show();
	$("body,html").css("overflow", "hidden");
	//   $(".marsk").on("click",function(){
	//     $(".marsk").hide();
	//     $("body,html").css("overflow","auto");
	//     $("#patentnumTc").hide();
	//     $("#copyrightnumTc").hide();
	//     $(".faxing-tc").hide();
	//     $("#marketNum").hide();
	//   })
	//   $(".tc-close").on("click",function(){
	//     $(".marsk").click();

	//   })
}



//十大股东饼状图
function pieChartShareholders(totalmarketvalue, nameList, dataList) {
	//	console.log(dataList)
	//var width=$("#sdgdWidth").width();
//	var sdgdWidth=document.getElementById("sdgdWidth").style.width;
//	document.getElementById("gdqk-tb").style.width=sdgdWidth+"px";
//	console.log(sdgdWidth)
	//console.log(width)
	var option = {
		title: {
			text: "总市值：" + totalmarketvalue + "亿",
			textStyle: {
				color: "#666",
				fontSize: 14,
				fontWeight: "normal"
			},
			x: 'center'
		},
		// legend: {
		// 	show: true,
		// 	data: nameList
		// },
		//2017/10/19 shiqi 新增
		color: ["#248ce6", "#64a4f2", "#41ccdc", "#41dc8e", "#dcda41", "#feb535", "#f8926d", "#f36c77", "#d967dd", "#9675da"],
		tooltip: {
			trigger: 'item',
			 formatter: function (d) {
			 	//console.log(d) //饼状图点击事件
			 	return d.name+"<br/>"+  d.data.holdcount +"万股("+d.value + "%)" ;
			 }
			//formatter:"{a} <br/>{b} : {c} ({d}%)"
		},
		calculable: true,
		grid:{
			show:false,
			top:'30px'
		},
		series: [
			{
				name: '股东',
				type: 'pie',
				radius: '55%',
				center: ['50%', '60%'],
				data: dataList,
				minAngle:10,
				label: {
					normal: {
						show: true,
						formatter: function (params) {
							//console.log(params)lenght
							var names = params.data.name;
							return params.data.value + "%\n" + names;
						}
					}
				}
			}
		]
	};
	// 使用刚指定的配置项和数据显示图表。
//	var a=document.getElementById("sdgdWidth").style.width;
//	document.getElementById("gdqk-tb").style.width=a+"px";
//	$("#gdqk-tb").find("div").eq(0).css("width",a);
	var width=$(".page").width()*0.9;
	$("#gdqk-tb").css("width",width);
	var myChart = echarts.init(document.getElementById('gdqk-tb'));
	myChart.setOption(option);
	window.addEventListener("resize", function () {
		myChart.resize();
	});
}

//十大股东关系说明
function findShareRelationShip(){
	var params={stockCode : stockCode};
	UTIL.axs(UTIL.CONFIG.findShareRelationShip,params,true,function(data){
		//console.log(data)
		if(data.retCode=="0000"){
			if(data.retData!="" && data.retData!=null && data.retData!=undefined){
				var result=data.retData;
				$("#relationDeclaration").html("前十名股东间相互关系说明: "+result[0].shareRelationShip);
			}
		}
	})
}

//重大事项柱状图
function eventListChart(nameList, dataList) {
	// 使用刚指定的配置项和数据显示图表。
	var width=$(".page-wrapper").width()*0.9;
	$("#importantEvent").css("width",width);
	var myChart = echarts.init(document.getElementById('importantEvent'));
	var option = {
		color: [
			"#62a6f2", "#feb535"
		],
		calculable: true,
		//      legend:{
		//      	show:true,
		//      	data:["中科软"]
		//      },
		//      dataZoom: {
		//          type: 'slider',
		//          show : true,
		//          start: 0,
		//          end:80
		//      },
		grid: {
			show: true,
			right: '5%',
			left: '5%',
			bottom: '30%'
		},
		xAxis: {
			type: 'category',
			data: nameList//['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
		},
		label: {
			normal: {
				show: true,
				position: 'top'
				
			}
		},
		yAxis:
		{
			type: 'value',
			name: "单位：件"
		},
		series: [
			{
				//              name:'中科软',
				type: 'bar',
				barMaxWidth: '30',
				data: dataList//[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
//				barMinHeight:10
			}
		]
	};

	myChart.setOption(option);
	window.addEventListener("resize", function () {
		myChart.resize();
	});

	
	myChart.on("click",eConsole);
	
}


function eConsole(param,pageNum,type){
	if(!pageNum){
		pageNum=1;
	}
	if(!type){
		type=1;
	}
		$("#MajorEvents").show();
		$(".marsk").show();
		$("body,html").css("overflow", "hidden");
		$("#EventName").html(param.name);
		//$("#EventName").text();
		var eventType=$("#EventName").text();
		var data={
			stockCode:stockCode,
			eventType:eventType,
			pageSize:10,
			pageNum:pageNum
		};
		UTIL.axs(UTIL.CONFIG.eventDetail, data, true, function (_data) {
			//console.log(_data)
			if (_data.retCode == "0000") {
				var data = _data.retData.data;
				var totalPages=_data.retData.pageTotal;
				var html='';
				if (data != null && data != "" && data != undefined && data.length > 0) {
					//渲染列表
					$(data).each(function (index, item) {
						html += "<tr>";
						html += "<td>" + isStrKong(item.eventType) + "</td>";
						html += "<td class='shuzi'>" + isStrKong(item.date) + "</td>";
						if (isStrKong(item.announcementName) != "--" && (item.announcementName).length > 24) {
							html += "<td style='cursor: pointer' title=" + (item.announcementName) + ">" + isStrKong((item.announcementName).substring(0, 24)) + "...</td>";
						} else {
							html += "<td>" + isStrKong(item.announcementName) + "</td>";
						}
						html += "<td><span class='chakan' onclick = 'ggShow(\"" + item.url + "\")'>查看</span></td>";
						html += "</tr>";
					})
					$("#MajorEventsList").html(html);
					if(_data.retData.pageTotal==1){
						$('#zdsjXQ').css('display','none')
					}else{
						$('#zdsjXQ').show();
					}
					if(type==1){
						$('.pagination').jqPaginator({                                           
			                totalPages: totalPages,                 
			                visiblePages: 5,
			                currentPage: pageNum,
			                first: '<li class="prev"> <a href="#" class="first" data-action="first">«</a> </li>',
			                prev: '<li class="prev"> <a href="#" class="previous" data-action="previous">‹</a> </li>',
			                next: '<li class="next"><a href="javascript:;"class="next" data-action="next">›</a></li>',
			                last: '<li class="next"><a href="javascript:;" class="last" data-action="last">»</a></li>',
			                page: '<li class="page"><a href="javascript:;">{{page}}</a> </li>',
			                onPageChange: function (pageNum) {
			                	if(type==1){
			                		type=2
			                		
			                	}else{
			                		eConsole('',pageNum,2); 
			                	}                                                                                                                                                                                                                          
			                }
			            });
					}
					
					
					
				} else {
					html = "<tr><td colspan = '4'><div class='noDatas'>暂无数据</div></td></tr>";
					$("#MajorEventsList").html(html);
				}
			}
		})
	};


/**
 * 查询股东变动表格
 */
function findStructureTable() {

	// WF_ajax.findStructureTable(true, {stockCode:stockCode}, function(data){
	UTIL.axs(UTIL.CONFIG.findStructureTable, { stockCode: stockCode }, true, function (data) {
		//console.log(data)
		if (data.retCode == "0000") {
			var csHtml = "<tr class='td-gray'><td colspan='2'></td><td>数量（股）</td><td>比例</td><td></td><td>数量（股）</td><td>比例</td></tr>";
			if (data.retData.csList != null && data.retData.csList.length == 9) {
				$(data.retData.csList).each(function (i, item) {
					if (i < 8) {
						if (i == 0) {
							csHtml += "<tr>" +
								"<td rowspan='4' class='hebing'>无限售条件股份</td>" +
								"<td>" + (isStrKong(item.stockNature) == "--" ? "--" : isStrKong(item.stockNature).replace("有限售--", "").replace("无限售--", "")) + "</td>" +
								"<td>" + (isStrKong(item.beginNum) == "--" ? "-" : isStrKong(item.beginNum)) + "</td>" +
								"<td>" + (isStrKong(item.beginProportion) == "--" ? "-" : ((isStrKong(item.beginProportion).indexOf("%") > -1 || isStrKong(item.beginProportion) == "-") ? isStrKong(item.beginProportion) : (isStrKong(item.beginProportion) + "%"))) + "</td>" +
								"<td>" + (isStrKong(item.thisPeriodChange) == "--" ? "-" : isStrKong(item.thisPeriodChange)) + "</td>" +
								"<td>" + (isStrKong(item.endNum) == "--" ? "-" : isStrKong(item.endNum)) + "</td>" +
								"<td>" + (isStrKong(item.endProportion) == "--" ? "-" : (isStrKong(item.endProportion).indexOf("%") > -1 ? isStrKong(item.endProportion) : (isStrKong(item.endProportion) + "%"))) + "</td>" +
								"</tr>";
						} else if (i == 4) {
							csHtml += "<tr>" +
								"<td rowspan='4' class='hebing'>有限售条件股份</td>" +
								"<td>" + (isStrKong(item.stockNature) == "--" ? "--" : isStrKong(item.stockNature).replace("有限售--", "").replace("无限售--", "")) + "</td>" +
								"<td>" + (isStrKong(item.beginNum) == "--" ? "-" : isStrKong(item.beginNum)) + "</td>" +
								"<td>" + (isStrKong(item.beginProportion) == "--" ? "-" : ((isStrKong(item.beginProportion).indexOf("%") > -1 || isStrKong(item.beginProportion) == "-") ? isStrKong(item.beginProportion) : (isStrKong(item.beginProportion) + "%"))) + "</td>" +
								"<td>" + (isStrKong(item.thisPeriodChange) == "--" ? "-" : isStrKong(item.thisPeriodChange)) + "</td>" +
								"<td>" + (isStrKong(item.endNum) == "--" ? "-" : isStrKong(item.endNum)) + "</td>" +
								"<td>" + (isStrKong(item.endProportion) == "--" ? "-" : ((isStrKong(item.endProportion).indexOf("%") > -1 || isStrKong(item.endProportion) == "-") ? isStrKong(item.endProportion) : (isStrKong(item.endProportion) + "%"))) + "</td>" +
								"</tr>";
						} else {
							csHtml += "<tr>" +
								"<td>" + (isStrKong(item.stockNature) == "--" ? "--" : isStrKong(item.stockNature).replace("有限售--", "").replace("无限售--", "")) + "</td>" +
								"<td>" + (isStrKong(item.beginNum) == "--" ? "-" : isStrKong(item.beginNum)) + "</td>" +
								"<td>" + (isStrKong(item.beginProportion) == "--" ? "-" : ((isStrKong(item.beginProportion).indexOf("%") > -1 || isStrKong(item.beginProportion) == "-") ? isStrKong(item.beginProportion) : (isStrKong(item.beginProportion) + "%"))) + "</td>" +
								"<td>" + (isStrKong(item.thisPeriodChange) == "--" ? "-" : isStrKong(item.thisPeriodChange)) + "</td>" +
								"<td>" + (isStrKong(item.endNum) == "--" ? "-" : isStrKong(item.endNum)) + "</td>" +
								"<td>" + (isStrKong(item.endProportion) == "--" ? "-" : ((isStrKong(item.endProportion).indexOf("%") > -1 || isStrKong(item.endProportion) == "-") ? isStrKong(item.endProportion) : (isStrKong(item.endProportion) + "%"))) + "</td>" +
								"</tr>";
						}

					} else {
						csHtml += "<tr>" +
							"<td colspan='2' class='hebing'><b>" + (isStrKong(item.stockNature) == "--" ? "--" : isStrKong(item.stockNature).replace("有限售--", "").replace("无限售--", "")) + "</b></td>" +
							"<td><b>" + (isStrKong(item.beginNum) == "--" ? "-" : isStrKong(item.beginNum)) + "</b></td>" +
							"<td><b>" + (isStrKong(item.beginProportion) == "--" ? "-" : ((isStrKong(item.beginProportion).indexOf("%") > -1 || isStrKong(item.beginProportion) == "-") ? isStrKong(item.beginProportion) : (isStrKong(item.beginProportion) + "%"))) + "</b></td>" +
							"<td><b>" + (isStrKong(item.thisPeriodChange) == "--" ? "-" : isStrKong(item.thisPeriodChange)) + "</b></td>" +
							"<td><b>" + (isStrKong(item.endNum) == "--" ? "-" : isStrKong(item.endNum)) + "</b></td>" +
							"<td><b>" + (isStrKong(item.endProportion) == "--" ? "-" : ((isStrKong(item.endProportion).indexOf("%") > -1 || isStrKong(item.endProportion) == "-") ? isStrKong(item.endProportion) : (isStrKong(item.endProportion) + "%"))) + "</b></td>" +
							"</tr>";
					}
				})
				csHtml += "<tr><td colspan='2' class='hebing'><b>普通股股东人数</b></td><td class='no-border'></td><td class='no-border'><b>" + isSZKong(data.retData.cntShareholder) + "</b></td><td class='no-border'></td><td class='no-border'></td><td class='no-border'></td></tr>";
			} else {
				for (var i = 0; i < 9; i++) {
					if (i < 8) {
						if (i == 0) {
							csHtml += "<tr><td rowspan='4' class='hebing'>无限售条件股份</td><td>--</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>";
						} else if (i == 4) {
							csHtml += "<tr><td rowspan='4' class='hebing'>有限售条件股份</td><td>--</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>";
						} else {
							csHtml += "<tr><td>--</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>";
						}
					} else {
						csHtml += "<tr><td colspan='2' class='hebing'><b>总股本</b></td><td><b>-</b></td><td><b>-</b></td><td><b>-</b></td><td><b>-</b></td><td><b>-</b></td></tr>";
					}
				}
				csHtml += "<tr><td colspan='2' class='hebing'><b>普通股股东人数</b></td><td class='no-border'></td><td class='no-border'><b>-</b></td><td class='no-border'></td><td class='no-border'></td><td class='no-border'></td></tr>";
			}
			$("#capitalStructureTable").append(csHtml);
		}
	})

}

//查询股东图表信息
function findTWOHis() {
	// WF_ajax.findTWOHis(true, {stockCode:stockCode}, function(data){
	UTIL.axs(UTIL.CONFIG.findTWOHis, { stockCode: stockCode }, true, function (data) {
		//console.log(data);
		if (data.retCode == "0000") {
			var newDate = [];
			var oldDate = {};
			var xData = []; //x轴数据
			var newData = []; //最新一期的持股
			var oldData = []; //上一期的持股
			var result = data.retData;
			var selected = [];
			var selects = {};
			var eventss;

			var i = 0;
			for (a in result) {
				i += 1;
				var obj = {};
				var key = a;
				obj[key] = true;
				selected.push(obj)
				// console.log(a);

				// xData.push(isStrKong(v.investor));
				newDate.push(a);
				$.each(result[a], function (k, v) {
					var holdCount = v.holdCount;
					oldData.push(isSZKong(holdCount) === "-" ? 0 : (holdCount.toFixed(2)));
					if (i < 2) {
						xData.push(isStrKong(v.investor));
					}
				})
				// var list = v.list;
				// var oldData = [], noticeDatea = []; //上一期的持股
				// $.each(list, function (k1, v1) {
				// 	var holdCount = v1.holdCount;
				// 	var noticeDate = v1.noticeDate;
				// 	noticeDatea.push(noticeDate);
				// 	oldData.push(isSZKong(holdCount) === "-" ? 0 : (holdCount.toFixed(2)));

				// })
				newData.push({
					name: a,
					type: 'bar',
					barMaxWidth: '30',
					barMinHeight: '10',
					data: oldData
				})
				oldData=[];
			}
			if (i > 2) {
				$.each(selected, function (k, v) {
					if (k > 1)
						for (var x in v) {
							v[x] = false;
						}
					Object.assign(selects, v);
				})
				oldDate = {
					series: newData,
					dataZoom: {
						end: 1
					},
					legend: {
						selected: selects,
						// orient: 'vertical',

					},
					grid: {
						top: '50%',
						left: '12%',
						bottom: '20%'
					}
				}
				eventss = function (param) {

					var iselect = 0;
					for (var i in param.selected) {
						// if (i === param.name && param.selected[i]) {
						// 	param.selected[i] = false;
						// 	return {
						// 		type: 'legendUnSelect',
						// 		name: param.name
						// 	}
						// }
						if (param.selected[i])
							iselect += 1;
						if (iselect > 2) {
							for (var i in param.selected) {
								if (i === param.name) {
									param.selected[i] = false;
									// alert("最多只能选择俩个年份查看")
									$.zmAlert('最多只能选择俩个年份查看');
									return {
										type: 'legendUnSelect',
										name: param.name
									}
								}
							}
						}


					}
				}
			}

			else {

				oldDate = {
					series: newData,
					grid: {
						top: '20%',
						left: '15%',
						bottom: '20%'
					}
				}
			}
			
			equitySituation(newDate,xData, newData,eventss);
		}
	})
}

//股本及变动情况
function equitySituation(newDate,xData, newData,eventss) {
	var legendList=newDate;
	//console.log(legendList)
	var selected={};
	$(legendList).each(function(index,item){
		if(index<=1){
			selected[item]=true;
		}else{
			selected[item]=false
		}
	})
	var myChart = echarts.init(document.getElementById('equitySituation'));
	var length=xData.length;
	
	 var option = {
        color: ["#248ce6", "#64a4f2", "#41ccdc", "#41dc8e", "#dcda41", "#feb535", "#f8926d", "#f36c77", "#d967dd", "#9675da"],
        tooltip : {
            trigger: 'axis',
            formatter:function(params){
              	//console.log(params)
            	var divHtml='<div class="sanban_tips">'+
  	    					'<div class="sb_tips_content">'+
  	    						'<span class="tips_leibie fl gqtips" style="background-color:'+params[0].color+';">'+params[0].seriesName+'</span>'+
  	    						'<span class="tips_leibie_num fl">'+params[0].value+'</span>'+
  	    						'<div class="clearfix"></div>'+
  	    					'</div>'+
  	    					'<div class="sb_tips_content first-content">'+
  	    						'<span class="tips_leibie fl gqtips" style="background-color: '+params[1].color+';">'+params[1].seriesName+'</span>'+
  	    						'<span class="tips_leibie_num fl">'+params[1].value+'</span>'+
  	    						'<div class="clearfix"></div>'+
  	    					'</div>'+
  	    				'</div>';
                return divHtml;
            }
        },
        legend: {
            data:legendList,
            top:'1%',
            selected:selected,
            formatter:function(params){
            	return params;
            }
            
        },
        // calculable : true,
        grid:{
			show:true,
			left:'15%',
			right:'8%',
			bottom:'20%',
			top:'40%'	
			},
        dataZoom: {
            type: 'slider',
            show : true,
			// height:'20',
			// top:'2%',
            bottom:'1%',
            start: 0,
            end:30
        },
//      label:{
//      	normal:{
//      		show:true,
//      		position:'top'
//      	}
//      },
        xAxis : [
            {
                type : 'category',
                data : xData/*['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']*/
                /*axisLabel:{  
                    interval:0,//横轴信息全部显示  
                    rotate:45,//-30度角倾斜显示  
                }*/
            }
        ],
        yAxis : [
            {
                type : 'value',
                name:'单位:万股'
            }
        ],
        series : [
            {
                name:1,
                type:'bar',
                barMaxWidth:'30',
                data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
            }
            // {
            //     name:oldDate,
            //     type:'bar',
            //     barMaxWidth:'30',
            //     data:oldData/*[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]*/
            // }
        ]
	};
	//console.log(option)
	$.extend(option.series,newData);
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
	window.addEventListener("resize",function(){
        myChart.resize();
    });
    myChart.on('legendselectchanged', function (param) {
      	//console.log(param)
		var unselect = eventss(param);
		if (!unselect)
			return;
		this.dispatchAction(unselect);
	});

}

/**
 * 查询董监高信息
 * 修改：shiqi
 * 更细内容：1）股数没有时，不显示
 * 日期：2017/10/16
 */
function findDignForSurvey() {
	// WF_ajax.findDignForSurvey(true, {stockCode:stockCode}, function(data){
	UTIL.axs(UTIL.CONFIG.findDignForSurvey, { stockCode: stockCode }, true, function (data) {
		if (data.retCode == "0000") {
			var jdgHtml = "";
			if (data.retData != null && data.retData.length > 0) {
				$(data.retData).each(function (i, item) {

					jdgHtml += "<tr>" +
						"<td>" + isStrKong(item.dignitaryName) + "</td>" +
						"<td>" + isStrKong(item.position) + "</td>" +
						"<td>" + isStrKong(item.sex) + "</td>" +
						"<td>" + isStrKong(item.age) + "</td>" +
						"<td>" + isStrKong(item.education) + "</td>" +
//						"<td>" + isStrKong(item.tenure).replace(/\s+/g, "") + "</td>" +
						"<td class=shuzi>" + (isSZKong(item.sharesNumber) == "-" ? "--" : (((item.sharesNumber / 10000).toFixed(2) == 0) ? "" : UTIL.fmtNum3((item.sharesNumber / 10000).toFixed(2)))) + "</td>" +
						"<td><span class='chakan'>查看</span>";
					jdgHtml += '<div class="chakan-tc jl-tc">' +
						'<em class="jianli_sj"></em>' +
						'<div class="jianli_content">' +
						'<div class="jiben_xinx infor_public">' +
						'<ul>' +
						'<b class="infor_yd"></b>' +
						'<li class="jiben_titles"><span>基本信息</span></li>' +
						'<li class="zw_list"><span>姓名：<em>' + isStrKong(item.dignitaryName) + '</em></span><span>性别：<em>' + isStrKong(item.sex) + '</em></span><span>年龄：<em>' + isStrKong(item.age) + '</em></span><span>国籍：<em>' + isStrKong(item.nationality) + '</em></span><span>现居地：<em>' + isStrKong(item.livingPlace) + '</em></span><div class="clearfix"></div></li>' +
						'</ul>' +
						'</div>' +
						'<div class="jiaoyu_jl infor_public">' +
						'<ul>' +
						'<b class="infor_yd"></b>' +
						'<li class="jiben_titles"><span>教育经历</span></li>';
					if (isStrKong(item.edExperience) != "--" && item.edExperience.indexOf(";") > -1) {
						var splitED = item.edExperience.split(";");

						$(splitED).each(function () {
							jdgHtml += "<li><em>" + this + "</em></li>";
						})
					} else {
						if (isStrKong(item.edExperience) != "" && isStrKong(item.edExperience) != null && isStrKong(item.edExperience) != "null" && isStrKong(item.edExperience) != undefined && isStrKong(item.edExperience) != "--") {
							jdgHtml += "<li><em>" + isStrKong(item.edExperience) + "</em></li>";
						} else {
							jdgHtml += '<li><span>暂无</span></li>';
						}
					}

					jdgHtml += '</ul>' +
						'</div>' +
						'<div class="cy_jl infor_public">' +
						'<ul>' +
						'<b class="infor_yd"></b>' +
						'<li class="jiben_titles"><span>任职经历</span></li>';

					if (isStrKong(item.workExperience) != "--" && item.workExperience.indexOf(";") > -1) {
						var splitWE = item.workExperience.split(";");
						$(splitWE).each(function () {
							jdgHtml += "<li><em>" + this + "</em></li>";
						})
					} else {
						if (isStrKong(item.workExperience) != "" && isStrKong(item.workExperience) != null && isStrKong(item.workExperience) != "null" && isStrKong(item.workExperience) != undefined && isStrKong(item.workExperience) != "--") {
							jdgHtml += "<li><em>" + isStrKong(item.workExperience) + "</em></li>";
						} else {
							jdgHtml += '<li><span>暂无</span></li>';
						}
					}
					jdgHtml += '</ul>' +
						'</div>' +
						'<div class="clearfix"></div>' +
						'</div></div></td></tr>';
				})
			} else {
				jdgHtml = "<tr>" +
					"<td colspan='8' ><div class='noDatas'>暂无数据</div></td>" +
					"</tr>";
			}

			$("#djgUL").html(jdgHtml);
			var djgWidth = $(".dongjiangao").width();
			$("#djgUL .jl-tc").css("width", djgWidth - 20);

			UTIL.sjly("#ryqkly", "ryqk", ".djg", "sjlyy");
			//			$("[name='djgA']").on('tap',function(){ //改成jquery
			//				hqJL(this);
			//			});
		}
	})
}

/**
 * 查询员工信息
 */
function findStaffData() {

	// WF_ajax.findStaffData(true, {stockCode:stockCode}, function(data){
	UTIL.axs(UTIL.CONFIG.findStaffData, { stockCode: stockCode }, true, function (data) {
		if (data.retCode == "0000") {
			var result = data.retData;

			var legendXLData = []; //学历
			var xlData = []; //学历

			var legendZWData = []; //职位
			var zwData = []; //职位
			if (result.zwMap != null && result.zwMap.zwData != null && result.zwMap.zwData.length > 0) { //职位数据
				$(result.zwMap.zwData).each(function (i, item) {
					legendZWData.push(item.belongClassification);
					zwData.push({ "value": item.number, "name": item.belongClassification });
				})

				jobDistribution(legendZWData, zwData); //职位
			} else {
				$("#employee").hide();
			}

			if (result.xlMap != null && result.xlMap.xlData != null && result.xlMap.xlData.length > 0) { //学历数据
				$(result.xlMap.xlData).each(function (i, item) {
					legendXLData.push(item.belongClassification);
					xlData.push({ "value": item.number, "name": item.belongClassification });
				})

				educational(legendXLData, xlData); //学历
			} else {
				$("#educational").hide();
			}


			var xlIHtml = "<h6>同行业对比分析</h6>";
			if (result.xlMap != null && result.xlMap.xlIList != null && result.xlMap.xlIList.length > 0) { //学历同行业
				$(result.xlMap.xlIList).each(function(i, item){ //循环要展示的学历同行业
					if(item.gsBFB != null){
						if (item.CZ.toString().indexOf("-") == 0) {
							xlIHtml += "<p>公司学历为" + isStrKong(item.gsMC) + "的人数占比为" + parseFloat(item.gsBFB).toFixed(2) + "%，比行业均值少" + parseFloat(item.CZ.toString().substring(1)).toFixed(2) + "%。</p>";
						} else if (parseFloat(item.CZ) == 0) {
							xlIHtml += "<p>公司学历为" + isStrKong(item.gsMC) + "的人数占比为" + parseFloat(item.gsBFB).toFixed(2) + "%，比去年无变化。</p>";
						} else {
							xlIHtml += "<p>公司学历为" + isStrKong(item.gsMC) + "的人数占比为" + parseFloat(item.gsBFB).toFixed(2) + "%，比行业均值多" + parseFloat(item.CZ).toFixed(2) + "%。</p>";
						}
					}
				})
			} else {
				xlIHtml += "<div class='noDatas'>暂无数据</div>";
			}

			var xlCHtml = "<h6>水平分析</h6>";
			if (result.xlMap != null && result.xlMap.xlHList != null && result.xlMap.xlHList.length > 0) { //学历与上期
				$(result.xlMap.xlHList).each(function(i, item){ //循环要展示的学历与上期
					if(item.newBFB != null){
						if (item.CZ.toString().indexOf("-") == 0) {
							xlCHtml += "<p>本年度公司学历为" + isStrKong(item.MC) + "的人数占比为" + parseFloat(item.newBFB).toFixed(2) + "%，上一年度人数占比为"+parseFloat(item.oldBFB).toFixed(2)+"%，比去年少" + parseFloat(item.CZ.toString().substring(1)).toFixed(2) + "%。</p>";
						} else if (parseFloat(item.CZ) == 0) {
							xlCHtml += "<p>本年度公司学历为" + isStrKong(item.MC) + "的人数占比为" + parseFloat(item.newBFB).toFixed(2) + "%，上一年度人数占比为"+parseFloat(item.oldBFB).toFixed(2)+"%，比去年无变化。</p>";
						} else {
							xlCHtml += "<p>本年度公司学历为" + isStrKong(item.MC) + "的人数占比为" + parseFloat(item.newBFB).toFixed(2) + "%，上一年度人数占比为"+parseFloat(item.oldBFB).toFixed(2)+"%，比去年多" + parseFloat(item.CZ).toFixed(2) + "%。</p>";
						}
					}
				})
			} else {
				xlCHtml += "<p><div class='noDatas'>无上一年度数据</div></p>";
			}

			$("#xlDBMsg").html(xlIHtml + xlCHtml); //学历


			var zwIHtml = "<h6>同行业对比分析</h6>";
			if (result.zwMap != null && result.zwMap.zwIList != null && result.zwMap.zwIList.length > 0) { //职位同行业
				$(result.zwMap.zwIList).each(function(i, item){
					if(item.gsBFB != null){
						if (item.CZ.toString().indexOf("-") == 0) {
							zwIHtml += "<p>公司" + isStrKong(item.gsMC) + "的职工人数比行业均值少" + parseFloat(item.CZ.toString().substring(1)).toFixed(2) + "%。</p>";
						} else if (parseFloat(item.CZ.toString()) == 0) {
							zwIHtml += "<p>公司" + isStrKong(item.gsMC) + "的职工人数与行业均值一样。</p>";
						} else {
							zwIHtml += "<p>公司" + isStrKong(item.gsMC) + "的职工人数比行业均值多" + parseFloat(item.CZ).toFixed(2) + "%。</p>";
						}
					}
				})
			} else {
				zwIHtml += "<div class='noDatas'>暂无数据</div>";
			}

			var zwCHtml = "<h6>水平分析</h6>";
			if (result.zwMap != null && result.zwMap.zwHList != null && result.zwMap.zwHList.length > 0) { //与上期比较
				$(result.zwMap.zwHList).each(function(i, item){
					if(item.newBFB){
						if (item.CZ.toString().indexOf("-") == 0) {
							zwCHtml += "<p>截止到最近一个会计年度，公司" + isStrKong(item.MC) + "类员工与上年同期变化少" + parseFloat(item.CZ.toString().substring(1)).toFixed(2) + "%。</p>";
						} else if (parseFloat(item.CZ) == 0) {
							zwCHtml += "<p>截止到最近一个会计年度，公司" + isStrKong(item.MC) + "类员工与上年同期无变化。</p>";
						} else {
							zwCHtml += "<p>截止到最近一个会计年度，公司" + isStrKong(item.MC) + "类员工与上年同期变化多" + parseFloat(item.CZ).toFixed(2) + "%。</p>";
						}
					}
				})
			} else {
				zwCHtml += "<div class='noDatas'>暂无数据</div>";
			}

			$("#zwDBMsg").html(zwIHtml + zwCHtml); //职位
			UTIL.sjly("#ryqk1ly", "ryqk", ".ygqk", "sjlyy");
		}
	})

}

//职位分布的饼图
function jobDistribution(legendData, data) {
	var myChart = echarts.init(document.getElementById('employee'));
	var option = {
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
			show: true,
			left: 'center',
			data: legendData,
		},
		color: ["#248ce6", "#64a4f2", "#41ccdc", "#41dc8e", "#dcda41", "#feb535", "#f8926d", "#f36c77", "#d967dd", "#9675da"],
		label: {
			normal: {
				show: true,
				formatter: function (params) {
					//console.log(params)
					return params.percent.toFixed(2) + "%\n" + params.name;
				}
			}

		},
		series: [
			{
				name: '职位分布',
				type: 'pie',
				radius: '55%',
				center: ['50%', '60%'],
				data: data

			}
		]
	};
	myChart.setOption(option);
}


//学历分布的饼图
function educational(legendData, data) {
	var myChart = echarts.init(document.getElementById('educational'));
	var option = {
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
			show: true,
			left: 'center',
			data: legendData,
		},
		color: ["#248ce6", "#64a4f2", "#41ccdc", "#41dc8e", "#dcda41", "#feb535", "#f8926d", "#f36c77", "#d967dd", "#9675da"],
		label: {
			normal: {
				show: true,
				formatter: function (params) {
					//		    			console.log(params)
					return params.percent.toFixed(2) + "%\n" + params.name;
				}
			}

		},
		series: [
			{
				name: '学历分布',
				type: 'pie',
				radius: '55%',
				center: ['50%', '60%'],
				data: data

			}
		]
	};
	myChart.setOption(option);
}
$(function () {
	var windowHeight = $(window).height()
	$(".yuce-fx .container").height(windowHeight - 195);
	$(".contents").height(windowHeight - 280)
})








function findRiskClassNum() {
	// WF_ajax.findRiskClassNum(dataT,true,function(_data){
	UTIL.axs(UTIL.CONFIG.findRiskClassNum, dataT, true, function (data) {
		if (data.retCode == "0000") {
			var _data = data.retData;
			$("#legal_num").text(_data.legal);
			$("#abnormal_num").text(_data.abnormal);
			$("#pledged_num").text(_data.pledged);
			$("#affiche_num").text(_data.affiche);
		}
	});
}
//法律诉讼
function findLegal() {
	// WF_ajax.findLegal(dataT,function(_data){
	UTIL.axs(UTIL.CONFIG.findLegal, dataT, true, function (data) {
		//console.log(data)
		if (data.retCode == '0000') {
			var _data = data.retData;
//			console.log(_data)
			var tr = '';
			if(_data!=null &&　_data　!="" &&_data!=undefined){
//				$("#Law").find(".noDatas").hide();
//				$("#Law").find(".caiwu-table").show();
				$(_data).each(function(index,item){
					tr+='<tr>';
					if(item.title.length>15){
						tr+='<td title="'+item.title+'">'+item.title.substring(0,15)+ "..." +'</td>';	
					}else{
						tr+='<td>'+item.title+'</td>';
					}
					tr+='<td>'+item.casetype+'</td>';
					var regTime = toDateTime(item.submittime, "yyyy-MM-dd");
					tr+='<td>'+regTime+'</td>';
					if(item.caseno.length>15){
						tr+='<td title="'+item.caseno+'">'+item.caseno.substring(0,15)+ "..." +'</td>';	
					}else{
						tr+='<td>'+item.caseno+'</td>';
					}
					tr+='</tr>';
				});	
				$("#findLegalData").html(tr);
			}else{
//				var div='<div class="noDatas">暂无数据</div>';
//				$("#Law").find("div.caiwu-table").hide();
				var trHtml='<tr><td colspan="4" class="falv"  style="text-align: center;">暂无数据</td></tr>';
				$("#findLegalData").html(trHtml);
			}
		}
	});
}
//股权出质
function findPledged(pageNum,type) {
	if(!pageNum){
		pageNum=1;
	}
	if(!type){
		type=1;
	}
	// WF_ajax.findPledged(dataT,function(_data){
		var dataT = { stockCode: UTIL.getPara("stockCode"),pageSize:10,pageNum:pageNum };//全局变量stockCode
	UTIL.axs(UTIL.CONFIG.findPledged, dataT, true, function (data) {
		if (data.retCode == "0000") {
			var _data = data.retData;
			var liHtml = '';
			if( _data.data==null ||  _data.data=="" ||  _data.data==undefined){
				var trHtml='<tr><td colspan="8" style="text-align: center;">暂无数据</td></tr>';
				$("#findPledgedData").html(trHtml);
			}else{
				for (var i = 0; i < _data.data.length; i++) {
					var obj = (_data.data)[i];
					liHtml += '<tr><td style="width: 115px;">' + ((new Date(obj.equitypledgedrecorddate)).Format("yyyy-MM-dd")) + '</td>';
					liHtml += '<td class="shuzi">' + isStrKong(obj.equitypledgedrecordnumber) + '</td>';
					liHtml += '<td>' + isStrKong(obj.equitypledgedstate) + '</td>';
					liHtml += '<td class="shuzi">' + isStrKong(obj.equitypledgedamount) + '</td>';
					if(obj.equitypledgedperson!=null && obj.equitypledgedperson!="" && obj.equitypledgedperson!=undefined){
						if((obj.equitypledgedperson).length>8){
							liHtml += '<td class="td-left" title="'+obj.equitypledgedperson+'">' + (obj.equitypledgedperson).substring(0,8) + '...</td>';
						}else{
							liHtml += '<td class="td-left">' + obj.equitypledgedperson + '</td>';
						}
						
					}else{
						liHtml += '<td class="td-left">--</td>';
					}
					if(obj.equitypledgedpawnee!=null && obj.equitypledgedpawnee!="" && obj.equitypledgedpawnee!=undefined){
						if((obj.equitypledgedpawnee).length>8){
							liHtml += '<td class="td-left" title="'+obj.equitypledgedpawnee+'">' + (obj.equitypledgedpawnee).substring(0,8) + '...</td>';
						}else{
							liHtml += '<td class="td-left">' + obj.equitypledgedpawnee + '</td>';
						}
						
					}else{
						liHtml += '<td class="td-left">--</td>';
					}

				}
				$("#findPledgedData").html(liHtml);
				if(totalPages==1){
					$('#GQCZ').css('display','none')
				}

				if(type==1){
					$('#GQCZ').jqPaginator({
					totalPages: _data.pageTotal,
					totalCounts: _data.total,
					//visiblePages: 5,//总共显示多少页
					pageSize:10,
					 first: '<li class="prev"> <a href="#" class="first" data-action="first">«</a> </li>',
					prev: '<li class="prev"> <a href="#" class="previous" data-action="previous">‹</a> </li>',
					next: '<li class="next"><a href="javascript:;"class="next" data-action="next">›</a></li>',
					last: '<li class="next"><a href="javascript:;" class="last" data-action="last">»</a></li>',
					page: '<li class="page"><a href="javascript:;">{{page}}</a> </li>',
					currentPage: pageNum,
					onPageChange: function (pageNum) {
						if(type==1){
							type=2;
						}else{
							findPledged(pageNum,2);	
						}				   
					}
				});
				}
			}
		}
	});
}
//经营异常
function findAbnormal() {
	// WF_ajax.findAbnormal(dataT,function(_data){
	UTIL.axs(UTIL.CONFIG.findAbnormal, dataT, true, function (_data) {
		//  	console.log(_data)
		if (_data.retCode == "0000") {
			var result = _data.retData;
			var liHtml = '';
			if(result=="" || result==null || result==undefined){
				var trHtml='<tr><td colspan="5" class="yc"  style="text-align: center;">暂无数据</td></tr>';
				$("#findAbnormalData").html(trHtml);
			}else{
				for (var i = 0; i < result.length; i++) {
					var obj = result[i];
					if(obj.putreason.length>13){
						liHtml += '<tr><td class="td-left" title="'+obj.putreason+'">' + obj.putreason.substring(0,13)+"..." + '</td>';
					}else{
						liHtml += '<tr><td class="td-left">' + obj.putreason + '</td>';
					}
					liHtml += '<td>' + ((new Date(obj.putdate)).Format("yyyy-MM-dd")) + '</td>';
					if(obj.removereason.length>10){
						liHtml += '<td class="td-left" title="'+obj.removereason+'">' + obj.removereason.substring(0,10)+"..." + '</td>';
					}else{
						liHtml += '<td class="td-left">' + obj.removereason + '</td>';
					}
					liHtml += '<td>' + ((new Date(obj.removedate)).Format("yyyy-MM-dd")) + '</td>';
					if(obj.putdepartment.length>12){
						liHtml += '<td class="td-left" title="'+obj.putdepartment+'">' + obj.putdepartment.substring(0,12)+"..." + '</td></tr>';
					}else{
						liHtml += '<td class="td-left">' + obj.putdepartment + '</td></tr>';
					}
				}
				$("#findAbnormalData").html(liHtml);
			}
			
		}
	});
}
//欠税公告
function findAffiche() {
	// WF_ajax.findAffiche(dataT,function(_data){
	UTIL.axs(UTIL.CONFIG.findAffiche, dataT, true, function (_data) {
		if (_data.retCode == "0000") {
			var result = _data.retData;
			var liHtml = '';
			if(result=="" || result==null || result==undefined){
				var trHtml='<tr><td colspan="5" style="text-align: center;">暂无数据</td></tr>';
				$("#findAfficheData").html(trHtml);
			}else{
				for (var i = 0; i < result.length; i++) {
					var obj = result[i];
					liHtml += '<tr><td>' + ((new Date(obj.releasedate)).Format("yyyy-MM-dd")) + '</td>';
					liHtml += '<td>' + isSZKong(obj.registrationnumber) + '</td>';
					liHtml += '<td>' + isStrKong(obj.qutstandingtaxes) + '</td>';
//					if(obj.backTaxes==null || obj.backTaxes=="" || obj.backTaxes==undefined){
//						liHtml += '<td class="shuzi">--</td>';
//					}else{
//						liHtml += '<td class="shuzi">' + UTIL.fmtNum3(Number(obj.backTaxes).toFixed(2)) + '</td>';
//					}
					
					if(obj.taxesbalance==null || obj.taxesbalance=="" || obj.taxesbalance==undefined){
						liHtml += '<td class="shuzi">--</td>';
					}else{
						liHtml += '<td class="shuzi">' + UTIL.fmtNum3(Number(obj.taxesbalance).toFixed(2)) + '</td>';
					}
					liHtml += '<td>' + isStrKong(obj.taxauthority) + '</td></tr>';
				}
				$("#findAfficheData").html(liHtml);
			}
		}
	});
}

//公司交易情况
function findTradeList() {
	UTIL.axs(UTIL.CONFIG.tradeList, dataT, true, function (_data) {
		//console.log(_data);
		var tr1 = "<tr><td>周交易量</td>";
		var tr2 = "<tr><td>月交易量</td>";
		if (_data.retCode == "0000") {
			var data = _data.retData;
			if (data != null && data != "" && data != undefined && data.length > 0) {
//				//渲染列表
//				$(data).each(function (index, item) {
//					//console.log(item)
//					tr1 += "<td class='shuzi'>" + UTIL.fmtNum3((item.cjsl == null ? 0 : item.cjsl).toFixed(2)) + "</td>"
//					tr2 += "<td class='shuzi'>" + UTIL.fmtNum3((item.cjje == null ? 0 : item.cjje).toFixed(2)) + "</td>";
//				})
//				tr1 += "</tr>";
//				tr2 += "</tr>"
//				$("#tradeList").html(tr1 + tr2);//渲染列表
				var tr='';
				$("#tradeList").html("");
				$(".jy_noData").hide();
				$(data).each(function(index,item){
					if(index==0){
						tr+='<tr>';
						tr+='<td>周交易量</td>';
						tr+='<td>'+UTIL.fmtNum3((item.cjsl==null || item.cjsl=="" || item.cjsl==undefined)?0:((item.cjsl).toFixed(2)))+'</td>';
						tr+='<td>'+UTIL.fmtNum3((item.cjje==null || item.cjje=="" || item.cjje==undefined)?0:((item.cjje).toFixed(2)))+'</td>';													
						tr+='</tr>';
					}else if(index==1){
						tr+='<tr>';
						tr+='<td>月交易量</td>';
						tr+='<td>'+UTIL.fmtNum3((item.cjsl==null || item.cjsl=="" || item.cjsl==undefined)?0:((item.cjsl).toFixed(2)))+'</td>';
						tr+='<td>'+UTIL.fmtNum3((item.cjje==null || item.cjje=="" || item.cjje==undefined)?0:((item.cjje).toFixed(2)))+'</td>';													
						tr+='</tr>';
					}else if(index==2){
						tr+='<tr>';
						tr+='<td>半年度交易量</td>';
						tr+='<td>'+UTIL.fmtNum3((item.cjsl==null || item.cjsl=="" || item.cjsl==undefined)?0:((item.cjsl).toFixed(2)))+'</td>';
						tr+='<td>'+UTIL.fmtNum3((item.cjje==null || item.cjje=="" || item.cjje==undefined)?0:((item.cjje).toFixed(2)))+'</td>';													
						tr+='</tr>';
					}else if(index==3){
						tr+='<tr>';
						tr+='<td>年度交易量</td>';
						tr+='<td>'+UTIL.fmtNum3((item.cjsl==null || item.cjsl=="" || item.cjsl==undefined)?0:((item.cjsl).toFixed(2)))+'</td>';
						tr+='<td>'+UTIL.fmtNum3((item.cjje==null || item.cjje=="" || item.cjje==undefined)?0:((item.cjje).toFixed(2)))+'</td>';													
						tr+='</tr>';
					}
						
				});
				$("#tradeList").html(tr);
			} else {
				$(".jy_noData").show();
			}
		}
	});
}
//行业交易情况
function findTradeListHy() {
	UTIL.axs(UTIL.CONFIG.findTradeHy, dataT, true, function (_data) {
		//console.log(_data);
		if (_data.retCode == "0000") {
			var data = _data.retData;
			if (data != null && data != "" && data != undefined && data.length > 0) {
				var tr='';
				$("#tradeListHy").html("");
				$(".jy_noData").hide();
				$(data).each(function(index,item){
					//console.log(item)
					tr+='<tr>';													
					tr+='<td>'+UTIL.fmtNum3((item.hycjsl==null || item.hycjsl=="" || item.hycjsl==undefined)?0:((item.hycjsl).toFixed(2)))+'</td>';
					tr+='<td>'+UTIL.fmtNum3((item.hycjje==null || item.hycjje=="" || item.hycjje==undefined)?0:((item.hycjje).toFixed(2)))+'</td>';	
					tr+='</tr>';
				})
				$("#tradeListHy").html(tr);
			} else {
				$(".jy_noData").show();
			}
		}
	});
}



function toDateTime(time, format) {
	var x = new Date(parseInt(time)),
		y = format;
	var z = { M: x.getMonth() + 1, d: x.getDate(), h: x.getHours(), m: x.getMinutes(), s: x.getSeconds() };
	y = y.replace(/(M+|d+|h+|m+|s+)/g, function (v) {
		return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2)
	});
	var formatDateTime = y.replace(/(y+)/g, function (v) {
		return x.getFullYear().toString().slice(-v.length)
	});
	return formatDateTime;
};
var sortType='';
function findOutboundInvestment() {
	// WF_ajax.findOutboundInvestment(true, {stockCode:stockCode}, function(data){
		var params={sortType:sortType, stockCode: stockCode};
	UTIL.axs(UTIL.CONFIG.findOutboundInvestment, params, true, function (data) {
		if (data.retCode == "0000") {
			var html = "";
			if (data.retData != null && data.retData.length > 0) {
				$(data.retData).each(function (i, item) {
					html += '<tr>';
					if ((item.companyname).length > 16) {
						html += '<td title="' + item.companyname + '">' + (isStrKong(item.companyname)).substring(0, 15) + "..." + '</td>';
					} else {
						html += '<td title="' + item.companyname + '">' + isStrKong(item.companyname) + '</td>';
					}

					html += '<td>' + isStrKong(item.realname) + '</td>';
					html += '<td class="shuzi">' + isStrKong(item.registeredcapital) + '</td>';
					html += '<td class="shuzi">' + UTIL.fmtNum3(isStrKong(item.investmentamount)) + '</td>';
					html += '<td class="shuzi">' + isStrKong(item.investmentproportion) + '</td>';
					var regTime = toDateTime(item.regtime, "yyyy-MM-dd");
					html += '<td class="shuzi">' + regTime + '</td>';
					html += '<td>' + isStrKong(item.statu) + '</td>';
					html += '</tr>';
				})
			} else {
				html = '<tr><td colspan=7><div class="noDatas">暂无数据</div></td></tr>';
			}
			$("#outboundInvestment").html(html);
		}
	})
}
function clickPaiXu(){
	$("#tzPaiXu span").on("click",function(){
		if($(this).find("em").eq(0).attr("class")=="up"){
			$(this).find("em").eq(0).removeClass("up").addClass("down");
		}else if($(this).find("em").eq(0).attr("class")=="down"){
			$(this).find("em").eq(0).removeClass("down").addClass("up");
		}else if($(this).find("em").eq(0).attr("class")==null || $(this).find("em").eq(0).attr("class")=="" ||$(this).find("em").eq(0).attr("class")==undefined){
			$(this).find("em").eq(0).addClass("down");
		}
		var sortType1=$("#tzPaiXu").find("th").eq(5).find("em").attr("class");//注册时间
		if(sortType1=="" || sortType1==null || sortType1==undefined || sortType1=="down"){
			//默认的降序
			sortType1="regTime DESC";
		}else if(sortType1=="up"){
			//升序
			sortType1="regTime ASC";
		}
		var sortType2=$("#tzPaiXu").find("th").eq(3).find("em").attr("class");//投资数额
		if(sortType2=="" || sortType2==null || sortType2==undefined || sortType2=="down"){
			//默认的降序
			sortType2="investmentAmountP DESC";
		}else if(sortType2=="up"){
			//升序
			sortType2="investmentAmountP ASC";
		}
		var sortType3=$("#tzPaiXu").find("th").eq(4).find("em").attr("class");//投资占比
		if(sortType3=="" || sortType3==null || sortType3==undefined || sortType3=="down"){
			//默认的降序DESC
			sortType3="investmentProportionP DESC";
		}else if(sortType3=="up"){
			//升序Asc
			sortType3="investmentProportionP ASC";
		}
		var text=$(this).text();
		if(text=="投资数额(万元)"){
			sortType=sortType2+","+sortType1+","+sortType3;
		}else if(text=="投资占比(%)"){
			sortType=sortType3+","+sortType1+","+sortType2;
		}else if(text=="注册时间"){
			sortType=sortType1+","+sortType3+","+sortType2;
		}
		findOutboundInvestment();
		
	})
}

function toDateTime(time, format) {
	var x = new Date(parseInt(time)),
		y = format;
	var z = { M: x.getMonth() + 1, d: x.getDate(), h: x.getHours(), m: x.getMinutes(), s: x.getSeconds() };
	y = y.replace(/(M+|d+|h+|m+|s+)/g, function (v) {
		return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2)
	});
	var formatDateTime = y.replace(/(y+)/g, function (v) {
		return x.getFullYear().toString().slice(-v.length)
	});
	return formatDateTime;
};





