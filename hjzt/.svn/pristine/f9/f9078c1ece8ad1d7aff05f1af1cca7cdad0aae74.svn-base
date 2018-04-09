/*
 * 编辑研报右侧数据中心的弹框内容sanbanby-ylp
 */
var selectedBgq = []; //已选择的日期
var returnData; //返回的数据
var zuoshilength;
var stockCode = getUrlParam("stockCode"); // 研究对象
var stockContent = getUrlParam("content");

var echartsOptions = {}; // 插入的echarts的Options集合
//console.log(stockContent);
//var numzi="";
var stockName = "";
if(stockContent) {
	var numzi = stockContent.indexOf('(');
	if(numzi > 0) {
		stockName = stockContent.substring(0, numzi);
	}
}
var dataTime = '';
var datas = {};
var lbDatas = [];

var tbList;
var lbList;
var newData;
var lastMonth;
//var cn;
//var id;
//var sigin;

var isShowmodel = false; // 是否初始化的标识  8790行改变值

BS.MyCollect = {
	PageInit: function() {
		var obj = this;
		var zuoshilength = obj.zuoshilength;
		obj.EventYbInit();
		obj.hirbox();
		obj.YBmodel();
		obj.searchlistul();
	},
	YBmodel: function() {
		var obj = this;
		if(stockCode == "" || stockCode == undefined) {
			$("#company-ui").hide();
			return;
		}
		if(decodeURI(getUrlParam('newyb'))=="2" || decodeURI(getUrlParam('newyb'))=="3")
		{
			isShowmodel = false;
		}
		obj.yanbaoeditKline(stockCode); //公司信息-k线图
		obj.CompanyMarketData(stockCode);
		obj.ZhishuSelectisSB(stockCode);
		obj.ZhishuMarketData(stockCode);
		//判断是否是新三板公司
		if(isXSBCompany(stockCode)) {
			//弹层出现
			$("#company-ui").show();
			$('.massage_ .sanban').removeClass('list_hide');
			$('.txtBox .sanbandiv').removeClass('list_hide');
			$('.massage_ .Agu').addClass('list_hide');
			$('.txtBox .Agudiv').addClass('list_hide');
			//三版
			obj.gsinfo(); //公司基本信息
			obj.zuoshiinfo(); //做市信息
			obj.guapaiinfo(); //挂牌信息
			obj.guquaninfo(); //股权结构
			obj.jiaobeninfo(); //脚本变动情况-列表
			obj.findTWOHis(); //脚本变动情况-图表
			obj.jiaoyiinfo(); //交易情况-公司交易
			obj.hangyeinfo(); //交易情况-行业交易
			obj.personinfo(); //人员情况-列表
			obj.persontubiao(); //人员情况-图表
			obj.zdinfo(); //重大事件-列表
			obj.zdinfotubiao(); //重大事件-柱状图
			obj.fxflinfo(); //风险信息-法律诉讼
			obj.fxgqinfo(); //风险信息-股权出质
			obj.fxjyinfo(); //风险信息-经营异常
			obj.fxqsinfo(); //风险信息-欠税公告
			obj.rzakinfo(); //投融资分析-融资情况
			obj.rzdzinfo(); //投融资分析-对外投资
			obj.zyywinfo(); //主要产品和服务
			obj.zyywsrinfo(); //主营业务收入
			obj.businessIncome(); //经营情况-营业收入及同比增长率（图表）
			obj.findTotalProfit(); //利润总额及同比增长率（图表）
			obj.findNetProfit(); //净利润及同比增长率(图表)
			obj.findTotalAssets(); //总资产及同比增长率（图表）
			obj.findInterestRateChange(); //销售毛利率与销售净利率变动情况（图表）
			obj.findIndustryAnalysis(); //追加的图表
			obj.findACMsg(); //商业模式及未来规划
			obj.findSC(); //上下游分析
			//obj.findSCInfo(); //上下游分析文案
			obj.findJZDS(); //查询竞争对手
			obj.industryRemark(); //行业简介
			obj.youshifenxi(); //竞争优势
			obj.shenjiyijian(); //审计意见
			obj.findFinanceKernelData(); //核心财务数据
			obj.findProfitData(); //公司盈利情况
			obj.findGroupData(); //公司成长情况
			obj.findPayData(); //偿债能力
			obj.findOperationData(); //运营情况
			obj.findFinanceDepthData(); //财务深度分析
			obj.findFinanceModelData(); //综合能力模型分析
			obj.findDubangData(); //三板杜邦分析法
			obj.findProfitForecastData(); //盈利预测表
			obj.findRiskTipsByCode(); //获取经营风险信息
		} else {
			//弹层出现
			$("#company-ui").show();
			$('.massage_ .Agu').removeClass('list_hide');
			$('.txtBox .Agudiv').removeClass('list_hide');
			$('.massage_ .sanban').addClass('list_hide');
			$('.txtBox .sanbandiv').addClass('list_hide');
			//A股
			obj.Agsinfo(); //工商信息
			obj.findGsDzjyqk();
			obj.shiDaGuDong(); //十大股东
			obj.shiDaLiuTongGuDong(); //十大流通股东
			obj.gdrsbhinfo();
			//			obj.linshiguquanjiegou1();
			obj.Apersoninfo();
			obj.Apersontubiao();
			obj.AfindBingGou();
			obj.findZengFa();
			obj.findPeiGu();
			obj.findFenHong();
			obj.findGuQuanBianDong();
			obj.findTingFuPai();
			obj.findYuanGongChiGu();
			obj.findZhaiJuanFaXingBZ();
			//obj.findZhaiJuanFaXingMJ();//公告其他暂时不需要
			//obj.findZhaiJuanFaXingJG();
			//obj.findZhaiJuanFaXingQT();
			obj.findZhaiJuanFaXingTB(); //特别处理
			obj.findZhaiJuanFaXingJGWX(); //监管
			obj.findDuiWaiTouZi();
			obj.findJieJinYuGao();
			obj.Afxflinfo();
			obj.Afxjyinfo();
			obj.Afxgqinfo();
			obj.Afxqsinfo();
			obj.Azyywinfo();
			obj.Azyywsrinfo();
			obj.AbusinessIncome();
			obj.AfindTotalProfit();
			obj.AfindNetProfit();
			obj.AfindTotalAssets();
			obj.AfindInterestRateChange();
			obj.findGongYingShang();
			obj.findKeHu();
			obj.findTouZiZheGX(); //投资者关系活动记录暂无记录
			obj.AfindFinanceKernelData(); //核心财务数据中心
			obj.AfindProfitData(); //
			obj.AfindGroupData(); //
			obj.AfindPayData(); //
			obj.AfindOperationData(); //
			obj.AfindFinanceModelData(); //
			obj.AfindJZDS(); //
			obj.AfindDubangData(); //A股杜邦分析法
			obj.findDuiShouShiChang();
			obj.Ahangye();
		}
	},
	hirbox: function() {
		//弹框右侧切换
		$('.txtBox .list .list_tab').on('click', function() {
			$(this).addClass('information').siblings().removeClass('information');
			var index = $(this).index();
			if(isXSBCompany(stockCode)) {
				$(this).parents(".sanbandiv").find(".contents").hide();
				$(this).parents(".sanbandiv").find('.contents').eq(index).show();
			} else {
				$(this).parents(".Agudiv").find(".contents").hide();
				$(this).parents(".Agudiv").find('.contents').eq(index).show();
			}
			$(this).parents(".shichanginfobox").find(".contents").hide();
			$(this).parents(".shichanginfobox").find('.contents').eq(index).show();

			//记录触犯点击的事件源name
			var senderObj = $(this).html();
			$('.hyConfirm .popBox .txtBox .sanbandiv .list > .list_tab').parents('.sanbandiv').find('.contents').eq($(this).index()).find("img.yes_no").attr("sender", senderObj)
		})
		//弹框关闭事件
		$(".hyConfirm .clsBtn").on('click', function() {
			$(".hyConfirm").hide();
		})
		//单选框切换图片
		$(".yes_no").unbind("click").click(function() {
			if($(this).hasClass("ok")) {
				$(this).removeClass("ok");
				$(this).attr("name", "0");
				$(this).attr("src", "/saasBeta/images/Image/Index/no.png");
			} else {
				$(".kaik-contents img.yes_no").removeClass("ok").attr("src", "/saasBeta/images/Image/Index/no.png");
				$(this).addClass("ok").attr("src", "/saasBeta/images/Image/Index/ok.png");
				$(this).attr("name", "1");
			}
		});
	},
	//我的图表查询
	searchlistul: function() {
		var paraminfo = '{"body":{}}';
		$.axsRequest("FT345", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var ullist = data.retData;
				var li = '';
				$("#searchClassul li").attr("value");
				li += "<li value=' '>全部</li>"
				$(ullist).each(function(index, item) {
					li += "<li value='" + item.category_id + "'>" + item.category_name + "</li>"
				})
				$("#searchClassul").html(li);
			}
		})
	},
	EventYbInit: function() {
		
		
		$("#classcloud").on("click", function() {
			$(".searchClass ul").toggle(200);
		});
		$("#searchClassul li").live("click", function() {
			var li_value = $(this).attr("value");
			var li_name = $(this).html();
			$(".searchcdiv span").html(li_name);
			$(".searchClass ul").hide();
		});
		var obj = this;
		//判断进编辑研报右侧是否为空
		if(stockCode == "" && stockCode == null && stockCode == undefined) {
			$('.sanban').parent().css("height", "50px");
		}
		//编辑研报页输入框的内容
		if(stockContent) {
			$('.inputselect-color-777').after("<span stockCode='" + stockCode + "'>" + stockContent + "<i class='del'></i></span>");
			$(".inputselect-color-777").next("span").find("i.del").on("click", function() {
				$(this).parents("span").remove();
				stockCode = "";
				stockName = "";
				$("#company-ui").hide();					
			});
		}
		//公司通道搜索模板调用
		$("#sear").on("click", function() {
			var val = $(".inputselect-color-777").val();
			if(val == "")
			{
				stockCode = "";
				stockName = "";
				$("#company-ui").hide();
				return;
			}
			var searchSuccess = false;
			$.each(searchObjectList, function(index, flag) {
				if(val.indexOf(flag.code) > -1 || val.indexOf(flag.name) > -1) {
					//$(".sousuo").find("span").attr("ObjectCode", flag.code);
					$("input.inputselect-color-777").after("<span stockCode='" + flag.code + "'>" + flag.name + "(" + flag.code + ")<i class='del'></i></span>");
				    $(".inputselect-color-777").next("span").find("i.del").on("click", function() {
				    	$("input.inputselect-color-777").val("");
						$(this).parents("span").remove();
						stockCode = "";
						stockName = "";
						$("#company-ui").hide();
						
					}); 
				    stockCode = flag.code;
					stockName = flag.name; 
					searchSuccess = true;
					obj.YBmodel();
					obj.hirbox();
				}
			});

			var tmpCode = getUrlParam("stockCode");
			if(tmpCode != null && tmpCode != "") {
				isShowmodel = false;
			}
		
			if(searchSuccess == false)	 
			{
				$("#company-ui").hide();
				return;
			}
				
				
			
		})
		$("input.inputselect-color-777").autocomplete({
			minLength: 2,
			source: function(request, response) {
				searchObjecCodetList(request, response);
			},
			delay: 500,
			select: function(event, ui) {
				var item = ui.item;
				var thisSelect = $(this);
				$(this).after("<span stockCode='" + item.code + "'>" + item.name + "(" + item.code + ")<i class='del'></i></span>");
				//选中重新调用模版放大
				var tmpCode = getUrlParam("stockCode");
				if(tmpCode != null && tmpCode != "") {
					isShowmodel = false;
				}

				stockCode = $(".sousuo").find("span").attr("stockcode");
				var numsc = $(".sousuo").find("span").html().indexOf('(');
				stockName = $(".sousuo").find("span").html().substring(0, numsc);
				obj.YBmodel();
				obj.hirbox();

				$(".inputselect-color-777").next("span").find("i.del").on("click", function() {
					$(this).parents("span").remove();
					thisSelect.val("");
					stockCode = "";
					stockName = "";
					$("#company-ui").hide();
				});
				$(".yd_img_icon").hide();
				$(".mx_yind").hide();
				$(".zhibiao_list").show();
				$(".mx_tc_btn").show();
				stockCode = item.code;
			}
		}).focus(function() {
			$(this).autocomplete("search");
		});;
		$("input.inputselect-color-777").keydown(function(e) {
			if(e.keyCode == 13) {
				//回车事件
				if($(this).val() != "") {
					var val = $.trim($(this).val());
				
					$.each(searchObjectList, function(index, flag) {
						if(val.indexOf(flag.code) > -1 || val.indexOf(flag.name) > -1) {
							
							//选中重新调用模版放大
							var tmpCode = getUrlParam("stockCode");
							if(tmpCode != null && tmpCode != "") {
								isShowmodel = false;
							}
							$(this).after("<span stockCode='" + flag.code + "'>" + flag.name + "(" + flag.code + ")<i class='del'></i></span>");
							$("input.inputselect-color-777").after("<span stockCode='" + flag.code + "'>" + flag.name + "(" + flag.code + ")<i class='del'></i></span>");
							$(".inputselect-color-777").next("span").find("i.del").on("click", function() {
								$(this).parents("span").remove();
								thisSelect.val("");
								stockCode = "";
								stockName = "";
								$("#company-ui").hide();
							});
						    stockCode = flag.code;
							stockName = flag.name; 
							obj.YBmodel();
							obj.hirbox(); 
						}
					});
						 
					 
				} else {
					//$(this).val('');
					//$(this).removeAttr("ObjectCode");
					//$.zmAlert("请输入要检索的信息");
				}
				$("#ui-id-2").hide();
			}
		});
	},
	//公司信息
	gsinfo: function() {
		var obj = this;
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		var chiname, legalperson, regcapital, industry, registeredaddress, businessaddress, registrationDate, phone, fax, weburl, businessterm, state, reginstitute, creditcode, patentnum, copyrightnum, businessscope;
		//三板
		$.axsRequest("FT501", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var retData = data.retData;
				if(retData == undefined) return;
				//简介
				chiname = retData.chiname; //公司名称
				businessscope = retData.businessscope; //经营范围
				//工商信息
				legalperson = retData.legalperson; //公司法人
				regcapital = retData.regcapital; //注册资本
				industry = retData.industry; //所属行业
				registeredaddress = retData.registeredaddress; //注册地址
				businessaddress = retData.businessaddress; //办公地址
				registrationDate = retData.registrationDate; //成立时间
				phone = retData.phone; //办公电话
				fax = retData.fax; //公司传真
				weburl = retData.weburl; //公司网址
				businessterm = retData.businessterm; //经营期限
				state = retData.state; //经营状态
				reginstitute = retData.reginstitute; //登记机关
				creditcode = retData.creditcode; //统一信用代码
				patentnum = retData.patentnum; //专利
				copyrightnum = retData.copyrightnum; //著作权
				var companyinfos = "<div>" + chiname + businessscope + "</div>";
				$('.jbxxDiv .companyIntroductionId').html(companyinfos);
				if(isShowmodel) {
					obj.fileInit("m7688408067", 0, 1, companyinfos);
				}
				var $kaikContentB = '<div class="table-gsinfo">' +
					'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
					'<table style="width:98%" class="tablemodel"><tr><td style="width:80px">公司名称</td><td>' + chiname + '</td><td style="width:80px">公司法人</td><td>' + legalperson + '</td></tr><tr><td style="width:80px">注册资本</td><td>' + regcapital + '</td><td style="width:80px">所属行业</td><td>' + industry + '</td></tr><tr><td style="width:80px">注册地址</td><td>' + registeredaddress + '</td><td style="width:80px">办公地址</td><td>' + businessaddress + '</td></tr><tr><td style="width:80px">成立时间</td><td>' + registrationDate + '</td><td style="width:80px">办公电话</td><td>' + phone + '</td></tr><tr><td style="width:80px">公司传真</td><td>' + fax + '</td><td style="width:80px">公司网址</td><td>' + weburl + '</td></tr><tr><td style="width:80px">经营期限</td><td>' + businessterm + '</td><td style="width:80px">经营状态</td><td>' + state + '</td></tr><tr><td style="width:80px">登记机关</td><td>' + reginstitute + '</td><td style="width:80px">统一信用代码</td><td>' + creditcode + '</td></tr><tr><td style="width:80px">专利</td><td>' + patentnum + '</td><td style="width:80px">著作权</td><td>' + copyrightnum + '</td></tr><tr><td style="width:80px">经营范围</td><td colspan="3">' + businessscope + '</td></tr></table></div>'
				$(".jbxxDiv .kaikContentB").html($kaikContentB);
				if(isShowmodel) {
					obj.fileInit("m2642747600", 0, 1, $kaikContentB);
				}

			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});
	},
	fileInit: function(id, idindex, type, content) {
		//判断A菇三板
		function GetRequest() {
			var url = location.search; //获取url中"?"符后的字串
			var theRequest = new Object();
			if(url.indexOf("?") != -1) {
				var str = url.substr(1);
				strs = str.split("&");
				for(var i = 0; i < strs.length; i++) {
					theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
				}
			}
			return theRequest;
		}
		var Request = new Object();
		Request = GetRequest();
		var newyb = Request['newyb'];
		if(newyb == 1) {
			//初始化加载到编辑器
			if(type == 1) {

				content = ReplaceAll(content, "null", "--")
				content = ReplaceAll(content, "undefined", "--")
				//公司信息
				file[id][idindex].dom = content;
				$("#" + id + "_" + idindex).html(content);
			} else {
				file[id][idindex].dom = "<div stockCode='" + stockCode + "' class='imgcanvas'><img src='" + content + "' style='width:85%;magin-left:10%' /></div>";
				$("#" + id + "_" + idindex).html("<div stockCode='" + stockCode + "' class='imgcanvas'><img src='" + content + "' style='width:85%;magin-left:10%'/></div>");
			}
		} else {
			return false;
		}
	},
	fileInit1: function(id, idindex, type, content, echartsId) {
		//判断A菇三板
		function GetRequest() {
			var url = location.search; //获取url中"?"符后的字串
			var theRequest = new Object();
			if(url.indexOf("?") != -1) {
				var str = url.substr(1);
				strs = str.split("&");
				for(var i = 0; i < strs.length; i++) {
					theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
				}
			}
			return theRequest;
		}
		var Request = new Object();
		Request = GetRequest();
		var newyb = Request['newyb'];
		var myechart = echarts.getInstanceByDom(document.getElementById(echartsId));
		if(myechart) {
			var option = myechart.getOption();
			var key = echartsId + "_" + stockCode+"_"+idindex;
			if(echartsId=="kLineChart")
			{
				key = echartsId + "_" + stockCode;
			}
			if(echartsOptions[key] == null) {
				var jsonStr = '{"' + key + '":' + JSON.stringify(option) + '}';
				$.extend(echartsOptions, $.parseJSON(jsonStr));
			}

		}
		if(newyb == 1) {
			//初始化加载到编辑器
			if(type == 1) {

				content = ReplaceAll(content, "null", "--")
				content = ReplaceAll(content, "undefined", "--")
				//公司信息
				file[id][idindex].dom = content;
				$("#" + id + "_" + idindex).html(content);
			} else {
			    $("#" + id + "_" + idindex).html("<div echartsId='" + echartsId + "' stockCode='" + stockCode + "' idx='"+idindex+"'  class='imgcanvas'><img src='" + content + "' style='width:85%;magin-left:10%'/></div>");
				file[id][idindex].dom = $("#" + id + "_" + idindex).html();

			}
		} else {
			return false;
		}
	},
	//做市信息
	zuoshiinfo: function() {
		var $zuoshishang = '';
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT504", paraminfo, true, function(data) {
			var strBuyername, decSharenum, zsstartdate, isFirstMarket, isMainMarket;
			if(data.retCode == "0000") {
				var retDatalist = [];
				var retDatalist = data.retData;
				zuoshilength = retDatalist.length;
				if(retDatalist == undefined) return;
				$zuoshishang += '<div class="zhuanli-tc" style="display: block;" id="marketNum"><b class="tc-close"></b><h2>做市商</h2><div class="reyuan-table wj-commonTable zuoshishang">' +
					'<table class="" style="width:98%"><thead><tr><th>机构名称</th><th>库存股（万股）</th><th>做市起始日</th><th>是否首批做市商</th><th>是否主办券商</th></tr></thead>' +
					'<tbody id="marketList">';
				for(var i = 0; i < retDatalist.length; i++) {
					$zuoshishang += '<tr><td>' + retDatalist[i].strBuyername + '</td><td class="shuzi">' + retDatalist[i].decSharenum + '</td><td>' + retDatalist[i].zsstartdate + '</td><td>' + retDatalist[i].isFirstMarket + '</td><td class="zssRi">' + retDatalist[i].isMainMarket + '</td></tr>';
				}
				$zuoshishang += '</tbody></table></div></div>';
			} else {

				errorAlert(data.retCode, data.retMsg);
			}
		});
	},
	//挂牌信息
	guapaiinfo: function() {
		var obj = this;
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT503", paraminfo, true, function(data) {
			var stockdate, stockname, stockcode, stockblock, dealtype, sponsoredbroker, ccountingfirm, lawname, secretary, circulationcapital, totalsharecapital, shareholder, actualcontroller;
			if(data.retCode == "0000") {
				var retData = data.retData;
				if(retData == undefined) return;
				//挂牌信息
				stockdate = retData.stockdate; //挂牌时间
				stockname = retData.stockname; //证券简称
				stockcode = retData.stockcode; //证券代码
				stockblock = retData.stockblock; //所属层级
				dealtype = retData.dealtype; //转让方式
				sponsoredbroker = retData.sponsoredbroker; //主办券商
				ccountingfirm = retData.ccountingfirm; //会计事务所
				lawname = retData.lawname; //律师事务所
				secretary = retData.secretary; //董秘
				circulationcapital = retData.circulationcapital; //流通股本
				totalsharecapital = retData.totalsharecapital; //总股本
				shareholder = retData.shareholder; //控股股东
				actualcontroller = retData.actualcontroller; //实际控股人
				//拼接表格
				var $brand = '';
				$brand += '<div class="table-guapaiinfo">' +
					'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
					'<table style="width:98%" class="tablemodel"><tr><td>挂牌时间</td><td>' + stockdate + '</td><td>证券简称</td><td>' + stockname + '</td></tr>' +
					'<tr><td>证券代码</td><td>' + stockcode + '</td><td>所属层级</td><td>' + stockblock + '</td></tr>';
				if(zuoshilength <= 0) {
					$brand += '<tr><td>转让方式</td><td colspan="3">' + dealtype + '</td></tr>';
				} else {
					$brand += '<tr><td>转让方式</td><td>' + dealtype + '</td><td>做市商</td><td><em class="zuoshishangNum" style="display:inline-block;width:100%;cursor: pointer;">' + zuoshilength + '</em></td></tr>';
				}
				$brand += '<tr><td>主办券商</td><td>' + sponsoredbroker + '</td><td>会计事务所</td><td>' + ccountingfirm + '</td></tr>' +
					'<tr><td>律师事务所</td><td>' + lawname + '</td><td>董秘</td><td>' + secretary + '</td></tr>' +
					'<tr><td>流通股本</td><td>' + circulationcapital + '</td><td>总股本</td><td>' + totalsharecapital + '</td></tr>' +
					'<tr><td>控股股东</td><td colspan="3">' + shareholder + '</td></tr>' +
					'<tr><td>实际控股人</td><td colspan="3">' + actualcontroller + '</td></tr></table></div>';
				$(".gpxxDiv .brand").html($brand);

				if(isShowmodel) {
					obj.fileInit("m2653733876", 0, 1, $brand);
				}
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});
	},
	//股权结构
	guquaninfo: function() {
		var obj = this;
		//股权结构
		var $capital = '';
		var investor, proportion, holdcount;
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		//表格
		$.axsRequest("FT505", paraminfo, true, function(data) {
			var nameList = []; //十大股东图表
			var dataList = []; //十大股东图表
			if(data.retCode == "0000") {
				var result = data.retData;
				var totalmarketvalue = (result[0].totalmarketvalue / 100000000).toFixed(2); //总市值
				if(result != null && result != "" && result != undefined && result.length > 0) {
					//渲染列表
					$capital += "<div class=''>" +
						"<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>" +
						"<table style='width:98%' class='tablemodel'><thead><tr><th>股东</th><th class='shuzi'>持股比例</th><th class='shuzi'>持股数量(万股)</th></tr></thead><tbody>";
					$(result).each(function(index, item) {
						if((item.investor).length > 16) {
							$capital += "<tr><td title='" + item.investor + "' style='cursor:pointer;'>" + (item.investor).substring(0, 15) + "..." + "</td>";
						} else {
							$capital += "<td title='" + item.investor + "' style='cursor:pointer;'>" + item.investor + "</td>";
						}

						$capital += "<td class='shuzi'>" + item.proportion + "%</td>";
						$capital += "<td class='shuzi'>" + (item.holdcount / 10000).toFixed(2) + "</td>";
						$capital += "</tr>";
						nameList.push(item.investor);
						dataList.push({
							"value": item.proportion,
							"name": item.investor,
							"holdcount": (item.holdcount / 10000).toFixed(2)
						});
					})
					$capital += '</tbody></table></div><div >数据来源：2016年年报</div>'
					$(".gqjgDiv .tenShareholders").html($capital); //渲染列表
					if(isShowmodel) {
						obj.fileInit("m9024364451", 0, 1, $capital);
					}
					obj.pieChartShareholders(totalmarketvalue, nameList, dataList);
					obj.myimg("gdqk-tb", echarts.init(document.getElementById('gdqk-tb')), "m9024364451", 1);

					//十大股东饼状图
				} else {
					$(".gqjgDiv .tenShareholders").html("<table><tr><td colspan='4'>暂无数据</td></tr></table>"); //渲染列表
					obj.pieChartShareholders(totalmarketvalue, nameList, dataList);
				}
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});

	},
	//股权结构-饼状图调用echart
	pieChartShareholders: function(totalmarketvalue, nameList, dataList) {
		var obj = this;
		var width = $(".zdsj").width() * 0.9;
		$("#gdqk-tb").css("width", width);
		var myChart = echarts.init(document.getElementById('gdqk-tb'));
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
			animation: false,
			color: ["#248ce6", "#64a4f2", "#41ccdc", "#41dc8e", "#dcda41", "#feb535", "#f8926d", "#f36c77", "#d967dd", "#9675da"],
			tooltip: {
				trigger: 'item',
				formatter: function(d) {
					return d.name + "<br/>" + d.data.holdcount + "万股(" + d.value + "%)";
				}
			},
			calculable: true,
			grid: {
				show: false,
				top: '30px'
			},
			series: [{
				name: '股东',
				type: 'pie',
				radius: '55%',
				center: ['50%', '60%'],
				data: dataList,
				minAngle: 10,
				label: {
					normal: {
						show: true,
						formatter: function(params) {
							var names = params.data.name;
							return params.data.value + "%\n" + names;
						}
					}
				}
			}]
		};
		myChart.setOption(option);
		window.addEventListener("resize", function() {
			//myChart.resize();
		});
	},
	myimg: function(id, myChart, mid, mindex) {
		var obj = this;
		var picInfo = myChart.getDataURL();
		//		console.log(id);
		//$("#"+id).append('<input value="' + picInfo + '" type="hidden" id="picInfoSrc">');

		if($("#" + id).find("#picInfoSrc").length <= 0) {
			$("#" + id).append('<input value="' + id + '" type="hidden" idx="'+mindex+'"id="picInfoSrc">');
		} else {
			$("#" + id + " #picInfoSrc").val(id);
			$("#" + id + " #picInfoSrc").attr("idx",mindex);
		}
		//obj.fileInit(mid, mindex, 2, picInfo)
		if(isShowmodel) {
			obj.fileInit1(mid, mindex, 2, picInfo, id);
		}
	},
	//股本及变动情况
	jiaobeninfo: function() {
		var obj = this;
		var $guben = '';
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT506", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				$guben += '<div class="">' +
					'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
					'<table style="width:98%" class="tablemodel"><thead><tr><th colspan="2">股份性质</th><th colspan="2">期初</th><th>本期变动</th><th colspan="2">期末</th></tr></thead><tbody>'
				if(data.retData.csList != null && data.retData.csList.length == 9) {
					$(data.retData.csList).each(function(i, item) {
						if(i < 8) {
							if(i == 0) {
								$guben += "<tr class='td-gray'><td colspan='2'></td><td>数量（股）</td><td>比例</td><td></td><td>数量（股）</td><td>比例</td></tr><tr>" +
									"<td rowspan='4' class='hebing'>无限售条件股份</td>" +
									"<td>" + item.stockNature + "</td>" +
									"<td>" + item.beginNum + "</td>" +
									"<td>" + item.beginProportion + "</td>" +
									"<td>" + item.thisPeriodChange + "</td>" +
									"<td>" + item.endNum + "</td>" +
									"<td>" + item.endProportion + "</td>" +
									"</tr>";
							} else if(i == 4) {
								$guben += "<tr>" +
									"<td rowspan='4' class='hebing'>有限售条件股份</td>" +
									"<td>" + item.stockNature + "</td>" +
									"<td>" + item.beginNum + "</td>" +
									"<td>" + item.beginProportion + "</td>" +
									"<td>" + item.thisPeriodChange + "</td>" +
									"<td>" + item.endNum + "</td>" +
									"<td>" + item.endProportion + "</td>" +
									"</tr>";
							} else {
								$guben += "<tr>" +
									"<td>" + item.stockNature + "</td>" +
									"<td>" + item.beginNum + "</td>" +
									"<td>" + item.beginProportion + "</td>" +
									"<td>" + item.thisPeriodChange + "</td>" +
									"<td>" + item.endNum + "</td>" +
									"<td>" + item.endProportion + "</td>" +
									"</tr>";
							}

						} else {
							$guben += "<tr>" +
								"<td colspan='2' class='hebing'><b>" + item.stockNature + "</b></td>" +
								"<td>" + item.beginNum + "</td>" +
								"<td>" + item.beginProportion + "</td>" +
								"<td>" + item.thisPeriodChange + "</td>" +
								"<td>" + item.endNum + "</td>" +
								"<td>" + item.endProportion + "</td>" +
								"</tr>";
						}
					})
					$guben += "<tr><td colspan='2' class='hebing'><b>普通股股东人数</b></td><td class='no-border'></td><td class='no-border'><b>" + data.retData.cntShareholder + "</b></td><td class='no-border'></td><td class='no-border'></td><td class='no-border'></td></tr></tbody></table></div>";
				} else {
					for(var i = 0; i < 9; i++) {
						if(i < 8) {
							if(i == 0) {
								$guben += "<tr><td rowspan='4' class='hebing'>无限售条件股份</td><td>--</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>";
							} else if(i == 4) {
								$guben += "<tr><td rowspan='4' class='hebing'>有限售条件股份</td><td>--</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>";
							} else {
								$guben += "<tr><td>--</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>";
							}
						} else {
							$guben += "<tr><td colspan='2' class='hebing'>总股本</td><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td></tr>";
						}
					}
					$guben += "<tr><td colspan='2' class='hebing'><b>普通股股东人数</b></td><td class='no-border'></td><td class='no-border'><b>-</b></td><td class='no-border'></td><td class='no-border'></td><td class='no-border'></td></tr></tbody></table></div>";
				}
				$(".gbbdDiv .capitalStructureTable").html($guben);

				if(isShowmodel) {
					obj.fileInit("m7968168882", 0, 1, $guben);
				}

			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		})

	},
	//脚本变动情况-图表调接口
	findTWOHis: function() {
		var obj = this;
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT507", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				//				console.log(data.retData)
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
				for(a in result) {
					i += 1;
					var obj = {};
					var key = a;
					obj[key] = true;
					selected.push(obj)
					newDate.push(a);
					$.each(result[a], function(k, v) {
						var holdCount = v.holdCount;
						if(holdCount == null || holdCount == undefined || (holdCount == "" && holdCount != 0)) {
							var holdCount = "-";
						} else {
							var holdCount = holdCount;
						}
						oldData.push(holdCount ? 0 : (holdCount.toFixed(2)));
						if(i < 2) {
							xData.push(isStrKong(v.investor));
						}
					})
					newData.push({
						name: a,
						type: 'bar',
						barMaxWidth: '30',
						barMinHeight: '10',
						data: oldData
					})
					oldData = [];
				}
				if(i > 2) {
					$.each(selected, function(k, v) {
						if(k > 1)
							for(var x in v) {
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

						},
						grid: {
							top: '50%',
							left: '12%',
							bottom: '20%'
						}
					}
					eventss = function(param) {

						var iselect = 0;
						for(var i in param.selected) {
							if(param.selected[i])
								iselect += 1;
							if(iselect > 2) {
								for(var i in param.selected) {
									if(i === param.name) {
										param.selected[i] = false;
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
				} else {

					oldDate = {
						series: newData,
						grid: {
							top: '20%',
							left: '15%',
							bottom: '20%'
						}
					}
				}
				BS.MyCollect.equitySituation(newDate, xData, newData, eventss);

				BS.MyCollect.myimg("equitySituation", echarts.init(document.getElementById('equitySituation')), "m7968168882", 1);

			}
		});
	},
	//kaik-contents-图表调用echart
	equitySituation: function(newDate, xData, newData, eventss) {
		var legendList = newDate;
		var selected = {};
		$(legendList).each(function(index, item) {
			if(index <= 1) {
				selected[item] = true;
			} else {
				selected[item] = false
			}
		})
		var myChart = echarts.init(document.getElementById('equitySituation'));
		var length = xData.length;
		var option = {
			color: ["#248ce6", "#64a4f2", "#41ccdc", "#41dc8e", "#dcda41", "#feb535", "#f8926d", "#f36c77", "#d967dd", "#9675da"],
			tooltip: {
				trigger: 'axis',
				formatter: function(params) {
					console.log(params)
					var divHtml = '<div class="sanban_tips">' +
						'<div class="sb_tips_content">' +
						'<span class="tips_leibie fl gqtips" style="background-color:' + params[0].color + ';">' + params[0].seriesName + '</span>' +
						'<span class="tips_leibie_num fl">' + params[0].value + '</span>' +
						'<div class="clearfix"></div>' +
						'</div>' +
						'<div class="sb_tips_content first-content">' +
						'<span class="tips_leibie fl gqtips" style="background-color: ' + params[1].color + ';">' + params[1].seriesName + '</span>' +
						'<span class="tips_leibie_num fl">' + params[1].value + '</span>' +
						'<div class="clearfix"></div>' +
						'</div>' +
						'</div>';
					return divHtml;
				}
			},
			legend: {
				data: legendList,
				top: '1%',
				selected: selected,
				formatter: function(params) {
					return params;
				}

			},
			grid: {
				show: true,
				left: '15%',
				right: '8%',
				bottom: '20%',
				top: '40%'
			},
			dataZoom: {
				type: 'slider',
				show: true,
				bottom: '1%',
				start: 0,
				end: 30
			},
			xAxis: [{
				type: 'category',
				data: xData /*['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']*/
				/*axisLabel:{  
				    interval:0,//横轴信息全部显示  
				    rotate:45,//-30度角倾斜显示  
				}*/
			}],
			yAxis: [{
				type: 'value',
				name: '单位:万股'
			}],
			series: [{
					name: 1,
					type: 'bar',
					barMaxWidth: '30',
					data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
				}
				// {
				//     name:oldDate,
				//     type:'bar',
				//     barMaxWidth:'30',
				//     data:oldData/*[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]*/
				// }
			]
		};
		$.extend(option.series, newData);
		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
		window.addEventListener("resize", function() {
			myChart.resize();
		});
		myChart.on('legendselectchanged', function(param) {
			var unselect = eventss(param);
			if(!unselect)
				return;
			this.dispatchAction(unselect);
		});
	},
	//交易情况-公司交易
	jiaoyiinfo: function() {
		var obj = this;
		var $jyqk = '';
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT510", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var result = data.retData;
				//				console.log(result);
				$jyqk += '<div class="">' +
					'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
					'<table style="width:98%" class="tablemodel"><thead><tr><th>交易时间范围</th><th colspan="2">公司成交量（万股）、金额（万元）</th></tr></thead><tbody class="no-color">'
				$jyqk += '<tr><td>周交易量</td><td>' + result[0].cjje + '</td><td>' + result[0].cjsl + '</td></tr><tr><td>月交易量</td><td>' + result[1].cjje + '</td><td>' + result[1].cjsl + '</td></tr><tr><td>半年度交易量</td><td>' + result[2].cjje + '</td><td>' + result[2].cjsl + '</td></tr><tr><td>年度交易量</td><td>' + result[3].cjje + '</td><td>' + result[3].cjsl + '</td></tr></tbody></table></div>'
				$("#tablegsjy").html($jyqk);
				if(isShowmodel) {
					obj.fileInit("m5630845076", 0, 1, $jyqk)
				}
			} else {
				errorAlert(data.retCode, data.retMsg);
			}

		});

	},
	//交易情况-行业交易
	hangyeinfo: function() {
		var $hyqk = '';
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT511", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var result2 = data.retData;
				$hyqk += '<div class="">' +
					'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
					'<table style="width:98%" class="tablemodel"><thead><tr><th colspan="2">行业成交量（万股）、金额（万元）</th></tr></thead><tbody class="no-color">'
				$hyqk += '<tr><td>' + result2[0].hycjje + '</td><td>' + result2[0].hycjsl + '</td></tr><tr><td>' + result2[1].hycjje + '</td><td>' + result2[1].hycjsl + '</td></tr><tr><td>' + result2[2].hycjje + '</td><td>' + result2[2].hycjsl + '</td></tr><tr><td>' + result2[3].hycjje + '</td><td>' + result2[3].hycjsl + '</td></tr></tbody></table></div>'
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
			$("#tablehyjy").html($hyqk);
		});

	},
	//人员情况-列表董监高列表
	personinfo: function() {
		var obj = this;
		var $ryqk = '';
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT512", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var result2 = data.retData;
				$ryqk += '<div class="">' +
					'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
					'<table style="width:98%" class="tablemodel"><thead><tr><th>姓名</th><th>职务</th><th>性别</th><th>年龄</th><th>学历</th><th class="shuzi">持股数(万股)</th></tr></thead><tbody>'
				$(result2).each(function(index, item) {
					$ryqk += '<tr><td>' + item.dignitaryName + '</td><td>' + item.position + '</td><td>' + item.sex + '</td><td>' + item.age + '</td><td>' + item.education + '</td><td class="shuzi">' + item.shareNumber + '</td></tr>'
				})
				$ryqk += '</tbody></table></div>';
				$ryqk = ReplaceAll($ryqk, "null", "--");
				$ryqk = ReplaceAll($ryqk, "undefined", "--");
				$(".ryqkDiv .djgUL").html($ryqk);
				if(isShowmodel) {
					obj.fileInit("m7061986575", 0, 1, $ryqk);
				}
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});
	},
	//人员情况-图表调用接
	persontubiao: function() {
		var obj = this;
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT549", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var result = data.retData;
				//学历的图表
				var legendXLData = []; //学历名称
				var xlData = []; //学历
				//学历数据
				if(result.xlMap != null && result.xlMap.xlData != null && result.xlMap.xlData.length > 0) {
					$(result.xlMap.xlData).each(function(i, item) {
						legendXLData.push(item.belongClassification);
						xlData.push({
							"value": item.number,
							"name": item.belongClassification
						});
					})

					BS.MyCollect.educational(legendXLData, xlData); //学历

					obj.myimg("educational", echarts.init(document.getElementById('educational')), "m3523550800", 0)

				} else {
					$("#educational").hide();
				}
				var xlIHtml = "<h6>同行业对比分析</h6>";
				//学历同行业
				if(result.xlMap != null && result.xlMap.xlIList != null && result.xlMap.xlIList.length > 0) {
					$(result.xlMap.xlIList).each(function(i, item) { //循环要展示的学历同行业
						if(item.gsBFB != null) {
							if(item.CZ.toString().indexOf("-") == 0) {
								xlIHtml += "<p>公司学历为" + item.gsMC + "的人数占比为" + parseFloat(item.gsBFB).toFixed(2) + "%，比行业均值少" + parseFloat(item.CZ.toString().substring(1)).toFixed(2) + "%。</p>";
							} else if(parseFloat(item.CZ) == 0) {
								xlIHtml += "<p>公司学历为" + item.gsMC + "的人数占比为" + parseFloat(item.gsBFB).toFixed(2) + "%，比去年无变化。</p>";
							} else {
								xlIHtml += "<p>公司学历为" + item.gsMC + "的人数占比为" + parseFloat(item.gsBFB).toFixed(2) + "%，比行业均值多" + parseFloat(item.CZ).toFixed(2) + "%。</p>";
							}
						}
					})
				} else {
					xlIHtml += "<div class='noDatas'>暂无数据</div>";
				}
				//循环要展示的学历与上期
				var xlCHtml = "<h6>水平分析</h6>";
				if(result.xlMap != null && result.xlMap.xlHList != null && result.xlMap.xlHList.length > 0) { //学历与上期
					$(result.xlMap.xlHList).each(function(i, item) {
						if(item.newBFB != null) {
							if(item.CZ.toString().indexOf("-") == 0) {
								xlCHtml += "<p>本年度公司学历为" + item.MC + "的人数占比为" + parseFloat(item.newBFB).toFixed(2) + "%，上一年度人数占比为" + parseFloat(item.oldBFB).toFixed(2) + "%，比去年少" + parseFloat(item.CZ.toString().substring(1)).toFixed(2) + "%。</p>";
							} else if(parseFloat(item.CZ) == 0) {
								xlCHtml += "<p>本年度公司学历为" + item.MC + "的人数占比为" + parseFloat(item.newBFB).toFixed(2) + "%，上一年度人数占比为" + parseFloat(item.oldBFB).toFixed(2) + "%，比去年无变化。</p>";
							} else {
								xlCHtml += "<p>本年度公司学历为" + item.MC + "的人数占比为" + parseFloat(item.newBFB).toFixed(2) + "%，上一年度人数占比为" + parseFloat(item.oldBFB).toFixed(2) + "%，比去年多" + parseFloat(item.CZ).toFixed(2) + "%。</p>";
							}
						}
					})
				} else {
					xlCHtml += "<p><div class='noDatas'>无上一年度数据</div></p>";
				}
				//学历对比，水平分析
				var htmlsxl = "<div class=''>" + xlIHtml + xlCHtml + "</div>";
				$("#xlDBMsg").html(htmlsxl);
				if(isShowmodel) {
					obj.fileInit("m3523550800", 1, 1, htmlsxl);
				}
				//职位分布的图表
				var legendZWData = []; //职位名称
				var zwData = []; //职位
				if(result.zwMap != null && result.zwMap.zwData != null && result.zwMap.zwData.length > 0) { //职位数据
					$(result.zwMap.zwData).each(function(i, item) {
						legendZWData.push(item.belongClassification);
						zwData.push({
							"value": item.number,
							"name": item.belongClassification
						});
					})

					obj.jobDistribution(legendZWData, zwData); //职位

					obj.myimg("employee", echarts.init(document.getElementById('employee')), "m3523550800", 2)

				} else {
					$("#employee").hide();
				}
				var zwIHtml = "<h6>同行业对比分析</h6>";
				if(result.zwMap != null && result.zwMap.zwIList != null && result.zwMap.zwIList.length > 0) { //职位同行业
					$(result.zwMap.zwIList).each(function(i, item) {
						if(item.gsBFB != null) {
							if(item.CZ.toString().indexOf("-") == 0) {
								zwIHtml += "<p>公司" + item.gsMC + "的职工人数比行业均值少" + parseFloat(item.CZ.toString().substring(1)).toFixed(2) + "%。</p>";
							} else if(parseFloat(item.CZ.toString()) == 0) {
								zwIHtml += "<p>公司" + tem.gsMC + "的职工人数与行业均值一样。</p>";
							} else {
								zwIHtml += "<p>公司" + item.gsMC + "的职工人数比行业均值多" + parseFloat(item.CZ).toFixed(2) + "%。</p>";
							}
						}
					})
				} else {
					zwIHtml += "<div class='noDatas'>暂无数据</div>";
				}
				var zwCHtml = "<h6>水平分析</h6>";
				if(result.zwMap != null && result.zwMap.zwHList != null && result.zwMap.zwHList.length > 0) { //与上期比较
					$(result.zwMap.zwHList).each(function(i, item) {
						if(item.newBFB) {
							if(item.CZ.toString().indexOf("-") == 0) {
								zwCHtml += "<p>截止到最近一个会计年度，公司" + item.MC + "类员工与上年同期变化少" + parseFloat(item.CZ.toString().substring(1)).toFixed(2) + "%。</p>";
							} else if(parseFloat(item.CZ) == 0) {
								zwCHtml += "<p>截止到最近一个会计年度，公司" + item.MC + "类员工与上年同期无变化。</p>";
							} else {
								zwCHtml += "<p>截止到最近一个会计年度，公司" + item.MC + "类员工与上年同期变化多" + parseFloat(item.CZ).toFixed(2) + "%。</p>";
							}
						}
					})
				} else {
					zwCHtml += "<div class='noDatas'>暂无数据</div>";
				}
				var htmlzws = "<div class=''>" + zwIHtml + zwCHtml + "</div>";
				$("#zwDBMsg").html("<div class=''>" + htmlzws); //职位
				if(isShowmodel) {
					obj.fileInit("m3523550800", 3, 1, htmlzws);
				}
			} else {
				errorAlert(data.retCode, data.retMsg);
			}

		});
	},
	//人员情况-职位图表调用echart
	jobDistribution: function(legendData, data) {
		var width = $(".zdsj").width() * 0.9;
		$("#employee").css("width", width);
		var myChart = echarts.init(document.getElementById('employee'));
		var option = {
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			animation: false,
			legend: {
				show: true,
				left: 'center',
				data: legendData,
			},
			color: ["#248ce6", "#64a4f2", "#41ccdc", "#41dc8e", "#dcda41", "#feb535", "#f8926d", "#f36c77", "#d967dd", "#9675da"],
			label: {
				normal: {
					show: true,
					formatter: function(params) {
						return params.percent.toFixed(2) + "%\n" + params.name;
					}
				}

			},
			series: [{
				name: '职位分布',
				type: 'pie',
				radius: '55%',
				center: ['50%', '60%'],
				data: data

			}]
		};
		myChart.setOption(option);
	},
	//人员情况-学历图表调用echart
	educational: function(legendData, data) {
		var width = $(".zdsj").width() * 0.9;
		$("#educational").css("width", width);
		var obj = this;
		var myChart = echarts.init(document.getElementById('educational'));
		var option = {
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			animation: false,
			legend: {
				show: true,
				left: 'center',
				data: legendData,
			},
			color: ["#248ce6", "#64a4f2", "#41ccdc", "#41dc8e", "#dcda41", "#feb535", "#f8926d", "#f36c77", "#d967dd", "#9675da"],
			label: {
				normal: {
					show: true,
					formatter: function(params) {
						//		    			console.log(params)
						return params.percent.toFixed(2) + "%\n" + params.name;
					}
				}

			},
			series: [{
				name: '学历分布',
				type: 'pie',
				radius: '55%',
				center: ['50%', '60%'],
				data: data

			}]
		};

		myChart.setOption(option);
	},
	//重大事件-列表
	zdinfo: function() {
		var obj = this;
		var $zdsj = '';
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT513", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var result2 = data.retData;
				$zdsj += '<div class="">' +
					'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
					'<table style="width:98%" class="tablemodel"><thead><tr><th>类型</th><th>时间</th><th>公告名称</th></tr></thead><tbody>'
				$(result2).each(function(index, item) {
					$zdsj += '<tr><td>' + item.eventType + '</td><td class="shuzi">' + item.date + '</td><td style="cursor: pointer" title="">' + item.announcementName + '</td></tr>';
				})
				$zdsj += '</tbody></table></div>';
				$(".zdsjDiv .eventListGG").html($zdsj);
				if(isShowmodel) {
					obj.fileInit("m8160920226", 0, 1, $zdsj)
				}

			} else {
				errorAlert(data.retCode, data.retMsg);
			}

		});
	},
	//重大事件-柱状图调用接口
	zdinfotubiao: function() {
		var obj = this;
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT537", paraminfo, true, function(_data) {
			var ggZy = "";
			var ggNum = 0;
			var nameList = []; //重大事项类型名称
			var dataList = []; //重大事项类型数量
			if(_data.retCode == "0000") {
				var data = _data.retData;
				if(data != null && data != "" && data != undefined && data.length > 0) {
					//数组赋值
					$(data).each(function(index, item) {
						ggNum += item.num;
						ggZy += item.eventType + ":" + item.num + ",";
						nameList.push(item.eventType);
						dataList.push(item.num);
					})
					$("#eventNum").html("<span>近两年来，重大事件" + ggNum + "件</span>(" + (ggZy.substr(0, ggZy.length - 1)) + ")");
					obj.eventListChart(nameList, dataList); //重大事项柱状图

					obj.myimg("importantEvent", echarts.init(document.getElementById('importantEvent')), "m8160920226", 1)

				} else {
					$("#importantEvent").hide();
					$("#eventNum").hide();
				}
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});
	},
	//重大事件-图表调用echart
	eventListChart: function(nameList, dataList) {
		// 使用刚指定的配置项和数据显示图表。
		var width = $(".zdsj").width() * 0.9;
		$("#importantEvent").css("width", width);
		var zdz = document.getElementById('importantEvent');
		var myChart = echarts.init(zdz);
		var option = {
			color: [
				"#62a6f2", "#feb535"
			],
			calculable: true,
			grid: {
				show: true,
				right: '5%',
				left: '5%',
				bottom: '30%'
			},
			xAxis: {
				type: 'category',
				data: nameList //['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
			},
			label: {
				normal: {
					show: true,
					position: 'top'

				}
			},
			yAxis: {
				type: 'value',
				name: "单位：件"
			},
			series: [{
				//              name:'中科软',
				type: 'bar',
				barMaxWidth: '30',
				data: dataList //[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
				//				barMinHeight:10
			}]
		};

		myChart.setOption(option);
		window.addEventListener("resize", function() {
			myChart.resize();
		});
	},
	//风险信息-法律诉讼
	fxflinfo: function() {
		var obj = this;
		var $fxfl = '';
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT514", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var result2 = data.retData;
				$fxfl += '<div class="">' +
					'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
					'<table style="width:98%" class="tablemodel"><thead><tr><th style="width:55%">裁判文书</th><th style="width:10%">案件类型</th><th style="width:15%">日期</th><th>案件号</th></tr></thead><tbody>'
				$(result2).each(function(index, item) {
					$fxfl += '<tr><td>' + item.title + '</td><td>' + item.casetype + '</td><td>' + item.submittime + '</td><td>' + item.caseno + '</td></tr>';
				})
				$fxfl += '</tbody></table></div>'
				$(".fxxxDiv .findLegalData").html($fxfl);
				if(isShowmodel) {
					obj.fileInit("m4167270559", 0, 1, $fxfl)
				}
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});
	},
	//风险信息-经营异常
	fxjyinfo: function() {
		var obj = this;
		var $fxjy = '';
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT515", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var result2 = data.retData;
				$fxjy += '<div class="">' +
					'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
					'<table style="width:98%" class="tablemodel"><thead><tr><th>列入原因</th><th>列入日期</th><th>移出原因</th><th>移出日期</th><th>决定机关</th></tr></thead><tbody>'
				$(result2).each(function(index, item) {
					$fxjy += '<tr><td>' + item.putreason + '</td><td>' + item.putdate + '</td><td>' + item.removereason + '</td><td>' + item.removedate + '</td><td>' + item.putdepartment + '</td></tr>';
				})
				$fxjy += '</tbody></table></div>';
				$fxjy = ReplaceAll($fxjy, "null", "--");
				$fxjy = ReplaceAll($fxjy, "undefined", "--");
				$(".fxxxDiv .findAbnormalData").html($fxjy);
				if(isShowmodel) {
					obj.fileInit("m4167270559", 1, 1, $fxjy)
				}

			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});

	},
	//风险信息-股权出质
	fxgqinfo: function() {
		var obj = this;
		var $fxgq = '';
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT516", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var result2 = data.retData;
				$fxgq += '<div class="">' +
					'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
					'<table style="width:98%" class="tablemodel"><thead><tr><th style="width: 115px;">登记日</th><th style="width: 180px;">登记编号</th><th style="width: 60px;">状态</th><th style="width: 110px;">出质股权数额</th><th style="width: 80px;">出质人</th><th style="width: 180px;">出质人证件号码</th><th style="width: 80px;">质权人</th><th style="width: 170px;">质权人号码</th></tr></thead><tbody>';
				$(result2).each(function(index, item) {
					$fxgq += '<tr><td>' + item.equitypledgedrecorddate + '</td><td>' + item.equitypledgedrecordnumber + '</td><td>' + item.equitypledgedstate + '</td><td>' + item.equitypledgedamount + '</td><td>' + item.equitypledgedperson + '</td><td>' + item.equitypledgedidnumber + '</td><td>' + item.equitypledgedpawnee + '</td><td>' + item.equitypledgedpawneenumber + '</td></tr>';
				})
				$fxgq += '</tbody></table></div>';
				$fxgq = ReplaceAll($fxgq, "null", "--");
				$fxgq = ReplaceAll($fxgq, "undefined", "--");
				$(".fxxxDiv .findPledgedData").html($fxgq);
				if(isShowmodel) {
					obj.fileInit("m4167270559", 2, 1, $fxgq)
				}

			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});

	},
	//风险信息-欠税公告
	fxqsinfo: function() {
		var obj = this;
		var $fxqs = '';
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT517", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var result2 = data.retData;
				$fxqs += '<div class="">' +
					'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
					'<table style="width:98%" class="tablemodel"><thead><tr><th>发布日期</th><th>纳税人识别号</th><th>欠税税种</th><th>欠税余额</th><th>税务机关</th></tr></thead><tbody>';
				$(result2).each(function(index, item) {
					$fxqs += '<tr><td>' + item.releaseDate + '</td><td>' + item.registrationNumber + '</td><td>' + item.qutstandingTaxes + '</td><td>' + item.taxesBalance + '</td><td>' + item.taxAuthority + '</td></tr>';
				})
				$fxqs += '</tbody></table></div>';
				$fxqs = ReplaceAll($fxqs, "null", "--");
				$fxqs = ReplaceAll($fxqs, "undefined", "--");
				$(".fxxxDiv .findAfficheData").html($fxqs);
				if(isShowmodel) {
					obj.fileInit("m4167270559", 3, 1, $fxqs)
				}

			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});
	},
	//投融资分析-融资情况
	rzakinfo: function() {
		var obj = this;
		var $rzak = '';
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT517", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var result2 = data.retData;
				$rzak += '<div class="">' +
					'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
					'<table style="width:98%" class="tablemodel"><thead><tr><th>融资方式</th><th>时间</th><th class="shuzi">募集资金(万元)</th><th class="shuzi">发行价(元)</th><th class="shuzi">发行数量(万股)</th><th class="shuzi">发行对象(个)</th></tr></thead><tbody>'
				$(result2).each(function(index, item) {
					$rzak += ' <tr><td>' + item.type + '</td><td>' + item.date + '</td><td class="shuzi">' + item.mjzj + '</td><td class="shuzi">' + item.issueprice + '</td><td class="shuzi">' + item.issuenumber + '</td><td class="zhuanli-ck-tc"><span class="chakan" onclick="issueDetail(&quot;stockCode&quot;,&quot;10000000000&quot;,&quot;2015-11-02&quot;)">' + item.objectsNum + '</span></td></tr>';
				})
				$rzak += '</tbody></table></div>';
				$(".trzfxDiv .issueList").html($rzak);
				if(isShowmodel) {
					obj.fileInit("m9199377344", 0, 1, $rzak)
				}
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});

	},
	//投融资分析-对外投资
	rzdzinfo: function() {
		var obj = this;
		var $rzdz = '';
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT520", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var result2 = data.retData;
				$rzdz += '<div class="">' +
					'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
					'<table style="width:98%" class="tablemodel"><thead><tr><th style="width:25%">被投资企业名称</th><th style="width:10%">被投资法人</th><th style="width:10%"><span>注册资本(万元)</span></th><th style="width:10%"><span>投资数额(万元)<em class="down"></em></span></th><th style="width:15%"><span>投资占比(%)<em></em></span></th><th class="shijian" style="width:15%"><span>注册时间<em></em></span></th><th>状态</th></tr></thead><tbody>';
				$(result2).each(function(index, item) {
					var regTime = toDateTime(item.regtime, "yyyy-MM-dd");
					$rzdz += '<tr><td title="">' + item.companyname + '</td><td class="shuzi">' + item.realname + '</td><td class="shuzi">' + item.registeredcapital + '</td><td class="shuzi">' + item.investmentamount + '</td><td class="shuzi">' + item.investmentproportion + '</td><td>' + regTime + '</td><td>' + item.statu + '</td></tr>';
				})
				$rzdz += '</tbody></table></div>';
				$rzdz = ReplaceAll($rzdz, "null", "--")
				$rzdz = ReplaceAll($rzdz, "undefined", "--")
				$(".trzfxDiv .outboundInvestment").html($rzdz);
				if(isShowmodel) {
					obj.fileInit("m1974624892", 0, 1, $rzdz)
				}

			} else {
				errorAlert(data.retCode, data.retMsg);
			}

		});

	},
	//公司信息-k线图调用
	yanbaoeditKline: function(stockCode) {
		var picInfo;
		if(isXSBCompany(stockCode)) {
			var isXSB = true;
			ajxCompanyMarketData(isXSB, stockCode, "yanbaoeditKline");

			setTimeout(function() {
				$(".lines-echarts.KLineEcharts").attr("id", "kLineChart");
				picInfo = $("#yanbaoeditKline").find("#picInfoSrc").val();
				$("#yanbaoeditKline").find("#picInfoSrc").val("kLineChart")
				if(isShowmodel) {
					//BS.MyCollect.fileInit("m5100815816", 0, 2, picInfo)
					BS.MyCollect.fileInit1("m5100815816", 0, 2, picInfo, "kLineChart");
				}
			}, 5000);
		} else {
			var isXSB = false;
			ajxCompanyMarketData(isXSB, stockCode, "Acompanyyanbaokline");
			setTimeout(function() {
				$(".lines-echarts.KLineEcharts").attr("id", "kLineChart");
				picInfo = $("#Acompanyyanbaokline").find("#picInfoSrc").val();
				$("#yanbaoeditKline").find("#picInfoSrc").val("kLineChart")
				if(isShowmodel) {
					//	BS.MyCollect.fileInit("m9024364451k", 0, 2, picInfo)
					BS.MyCollect.fileInit1("m9024364451k", 0, 2, picInfo, "kLineChart");
				}
			}, 5000);
		}
	},
	//企业行情数据
	CompanyMarketData: function(stockCode) {
		//判断是否是新三板公司
		if(isXSBCompany(stockCode)) {
			var isXSB = true;
		} else {
			var isXSB = false;
		}
		ajxCompanyMarketData(isXSB, stockCode, "CompanyMarketData");
		$("#CompanyMarketData").find("#picInfoSrc").val("kLineChart");

	},
	//指数行情数据-指数类型
	ZhishuSelectisSB: function(stockCode) {
		var obj = this;
		var ZhishuSelect = [];
		if(isXSBCompany(stockCode)) {
			var isSB = true;
			var paraminfo = '{"body":{"type":"40"}}';
		} else {
			var isSB = false;
			var paraminfo = '{"body":{"type":"41"}}';
		}

		$.axsRequest("FT003", paraminfo, false, function(data) {
			if(data.retCode == "0000") {
				var retData = data.retData;
				if(retData == undefined) return;
				$.each(retData.infoList, function(i, item) {
					ZhishuSelect.push({
						"key": item.code,
						"value": item.name
					});
				});
			}
		});
		var width = $("#zhishu_select").width();
		BS.Common.Select.Create({
			uniqueID: "sel_node_selId_zhishu",
			showID: "zhishu_select", //div id
			isAjax: false, //异步 同步
			DefaultConfig: {
				data: ZhishuSelect //接口返回数据
			},
			width: width, //下拉框宽度
			selectwidth: 24, //箭头图标宽度
			returnFun: function(v) {
				//k线图调用
				ajxrequestdata(v, "zhishu-KLine", isSB);
			},
			defaultKey: ZhishuSelect[0].key, //默认选项
			max_height: 130

		});
	},
	//指数行情数据
	ZhishuMarketData: function(stockCode) {
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		if(isXSBCompany(stockCode)) {
			var isXSB = true;
		} else {
			var isXSB = false;
		}
		//根据企业代码获取企业所属的指数代码
		$.axsRequest("FT338", paraminfo, false, function(data) {
			if(data.retCode == "0000") {
				var code = data.retData.code;
				//k线图调用
				ajxrequestdata(code, "zhishu-KLine", isXSB);
				$("#zhishu-KLine").find("#picInfoSrc").val("kLineChart")
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});
	},
	//主要产品和服务
	zyywinfo: function() {
		var obj = this;
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT521", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				if(data == "" || data == null || data == undefined) {
					$(".zyyw .mainbusiness").html("--");
				} else {
					$(".zyywDiv .mainbusiness").html(data.retData.mainBusiness);
					if(isShowmodel) {
						obj.fileInit("m141651166", 0, 1, data.retData.mainBusiness)
					}
				}
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});
	},
	//主营业务收入
	zyywsrinfo: function() {
		var obj = this;
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT522", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				dataTime = data.retData.timeList; //年度集合
				tbList = data.retData.tbList; //图表集合
				console.log(tbList);
				console.log(dataTime);
				var li = '';
				if(dataTime != "" && dataTime != null && dataTime != undefined) {
					$("#nowDate").html(dataTime[0])
					$(dataTime).each(function(index, item) {
						li += '<li data-time="' + item + '">' + item + '</li>'
					})
					$("#timeLists").html(li);
					$("#timeLists").find("li").eq(0).addClass("on");
					
				}
				//所有的数据
				lbList = data.retData.lbList; //列表集合
				var $zyywsr = '';
				var moRen = '';
				var total = 0; //合计
				var percenter = 0; //占比合计
				$zyywsr += '<div class="">' +
					'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
					'<table style="width:98%" class="tablemodel"><thead><tr><th>项目</th><th class="shuzi">金额(万元)</th><th class="shuzi">占比(%)</th></tr></thead><tbody>';
				if(lbList != "" && lbList != null && lbList != undefined) {
					$(lbList).each(function(index, item) {
						datas[item.time] = item.data;
						if(index == 0) {
							moRen = item.data;
						}
					});
					$(moRen).each(function(k, v) {
						$zyywsr += '<tr><td><span>' + v.mainBusinessSituation + '</span></td><td>' + v.amountMoney + '</td><td>' + v.proportion + '</td></tr>'

						if(v.amountMoney == "--") {
							v.amountMoney = 0;
						}
						total += v.amountMoney;
						if(v.proportion == "--") {
							v.proportion = 0;
						}
						percenter += v.proportion;
					});

					var jinEr = (total / 10000).toFixed(2);
					var zhanBi = percenter.toFixed(2);
					$zyywsr += '<tr class="heji"><td>合计</td><td>' + jinEr + '</td><td>' + zhanBi + '</td></tr></tbody></table></div>';
					$(".zyywDiv .ywsrbt").html($zyywsr);
					if(isShowmodel) {
						obj.fileInit("m833134113", 0, 1, $zyywsr);
					}

				}
				obj.initpie();
				setTimeout(function() {
					obj.myimg("zycpfwpie", echarts.init(document.getElementById("zycpfwpie")), "m833134113", 1)
				}, 3000)
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});

	},
	initpie: function() {
		var obj = this;
		$("#nowDate").on("click",function(){
			$("#timeLists").toggle();
		})
		$("#timeLists").on("click","li",function(){
			var time=$(this).text();
			$("#nowDate").html(time);
			var index=$(this).index();
			obj.pieChart_cpfu(dataTime[index], tbList[index]);
			$("#timeLists").hide();
			obj.myimg("zycpfwpie", echarts.init(document.getElementById("zycpfwpie")), "m833134113", index+1)
		});
		//画饼图
		obj.pieChart_cpfu(dataTime[0], tbList[0]);
		
//		obj.myimg("zycpfwpie", echarts.init(document.getElementById("zycpfwpie")), "m833134113", 1)
	},
	//主营业务收入-图表调用echart
	pieChart_cpfu: function(reporttime, dataList) {
		var width = $(".zdsj").width() * 0.9;
		$("#zycpfwpie").css("width", width);
//		var width = $(".zyywDiv .zhongd-sj").width() - 100;
//		document.getElementById("zycpfwpie").style.width = (width) + "px";
		// 使用刚指定的配置项和数据显示图表。
		var myChart = echarts.init(document.getElementById("zycpfwpie"));
		var option = {
			title: {
				text: reporttime,
				textStyle: {
					color: "#666",
					fontSize: 14,
					fontWeight: "normal"
				},
				x: 'center'
			},
			animation: false,
			//以下颜色与十大股东一致
			color: ["#248ce6", "#64a4f2", "#41ccdc", "#41dc8e", "#dcda41", "#feb535", "#f8926d", "#f36c77", "#d967dd", "#9675da"],
			tooltip: {
				trigger: 'item',
				formatter: function(params) {
					var val = (Number(params.data.value) / 10000).toFixed(2);
					return params.data.name + '<br/>' + val + "万元(" + params.percent + " %)";
				}
			},
			calculable: true,
			series: [{
				type: 'pie',
				data: dataList,
				label: {
					normal: {
						show: true,
						formatter: function(params) {
							//								console.log(params)
							var names = params.data.name;
							return params.percent + "%\r\n" + names;
						}
					}
				}
			}]
		};
		myChart.setOption(option);
//		window.addEventListener("resize", function() {
//			myChart.resize();
//		});
	},
	//经营情况-营业收入及同比增长率（图表）
	businessIncome: function() {
		var obj = this;
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}',
			n = false;
		$.axsRequest("FT538", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				if(data.retData != null && data.retData != "" && data.retData != undefined) {
					var result = data.retData;
					var dateList = result.portTime;
					var yingyeDataList = result.f2QZYYSR; //营业收入
					var REVZengZhangLvList = result.REVZengZhangLv; //增长率
					// 使用刚指定的配置项和数据显示图表。
					var end = (4 / result.portTime.length) * 100;
					var option = {
						color: [
							"#62a6f2", "#feb535"
						],
						calculable: true,
						legend: {
							show: true,
							data: ["营业收入", '增长率']
						},
						tooltip: {
							trigger: 'axis',
							formatter: function(params) {
								var divHtml = "";
								divHtml += '<div class="sanban_tips">';
								divHtml += '<div class="sb_tips_content">';

								divHtml += '<span class="tips_leibie fl yysrhzzl" style="background-color: #1985e2;">' + params[0].seriesName + '</span>';
								if(params[0].value == null || params[0].value == undefined || params[0].value == "") {
									divHtml += '<span class="tips_leibie_num fl">--</span>';
								} else {
									divHtml += '<span class="tips_leibie_num fl">' + params[0].value + '</span>';
								}
								divHtml += '<div class="clearfix"></div>';
								divHtml += '</div>';
								if(params[1] != "" && params[1] != null && params[1] != undefined) {
									divHtml += '<div class="sb_tips_content first-content">';
									divHtml += '<span class="tips_leibie fl yysrhzzl" style="background-color: #fcc530;">' + params[1].seriesName + '</span>';
									if(params[1].value == null || params[1].value == "" || params[1].value == undefined) {
										divHtml += '<span class="tips_leibie_num fl">--</span>';
									} else {
										divHtml += '<span class="tips_leibie_num fl">' + params[1].value + '</span>';
									}
									divHtml += '<div class="clearfix"></div>';
									divHtml += '</div>';
								}
								divHtml += '</div>';
								return divHtml;
							}
						},

						grid: {
							show: true,
							right: '10%',
							left: '10%',
							bottom: '30%'
						},
						xAxis: {
							type: 'category',
							data: dateList //['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
						},
						//					label: {
						//						normal: {
						//							show: true,
						//							position: 'top'
						//						}
						//					},
						dataZoom: {
							type: 'slider',
							show: true,
							start: '0',
							end: end,
							bottom: '3%',
							zoomLock: true
						},
						yAxis: [{
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
									show: true
								}
								//              min:0,
								//              max:100,
								//              axisLabel:{
								//              	show:true,
								//              	formatter:"{value}"
								//              }
							}
						],
						series: [{
								name: '营业收入',
								type: 'bar',
								yAxisIndex: 0,
								barMaxWidth: '30',
								data: yingyeDataList //[2.6, 5.9, 80.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
							},
							{
								name: '增长率',
								type: 'line',
								yAxisIndex: 1,
								symbol: "circle",
								data: REVZengZhangLvList, //[51, 20, 56, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
								axisLine: {
									show: false
								}
							}
						]
					};
					var myChart = echarts.init(document.getElementById('businessIncome'));
					myChart.setOption(option);

					obj.myimg("businessIncome", myChart, "m6206082188", 0)

					window.addEventListener("resize", function() {
						myChart.resize();
					});
					n = true;
				} else {
					$("#businessIncome").html('<div class="noDatas">暂无数据</div>');
					$("#businessIncome").height('auto');
					n = false; //新增 无数据项返回
				}

			}

		})
		if(n)
			return true;
		else
			return false;
	},
	//利润总额及同比增长率（图表）
	findTotalProfit: function(_callback) {
		var obj = this;
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}',
			n = false;
		$.axsRequest("FT539", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				if(data.retData != null && data.retData != "" && data.retData != undefined) {
					var result = data.retData;
					var dateList = result.portTime;
					var yingyeDataList = result.f2LRZE; //营业收入
					var REVZengZhangLvList = result.LiRunZongEZengZhangLv; //增长率
					var end = (4 / dateList.length) * 100;
					// 使用刚指定的配置项和数据显示图表。
					var myChart = echarts.init(document.getElementById('totalProfit'));
					var option = {
						color: [
							"#62a6f2", "#feb535"
						],
						calculable: true,
						legend: {
							show: true,
							data: ["利润总额", '增长率']
						},
						tooltip: {
							trigger: 'axis',
							formatter: function(params) {
								//console.log(params)
								var divHtml = "";
								divHtml += '<div class="sanban_tips">';
								divHtml += '<div class="sb_tips_content">';
								divHtml += '<span class="tips_leibie fl yysrhzzl" style="background-color: #1985e2;">' + params[0].seriesName + '</span>';
								if(params[0].value == null || params[0].value == "" || params[0].value == undefined) {
									divHtml += '<span class="tips_leibie_num fl">--</span>';
								} else {
									divHtml += '<span class="tips_leibie_num fl">' + params[0].value + '</span>';
								}

								divHtml += '<div class="clearfix"></div>';
								divHtml += '</div>';
								if(params[1] != "" && params[1] != null && params[1] != undefined) {
									divHtml += '<div class="sb_tips_content first-content">';
									divHtml += '<span class="tips_leibie fl yysrhzzl" style="background-color: #fcc530;">' + params[1].seriesName + '</span>';
									if(params[1].value == null || params[1].value == "" || params[1].value == undefined) {
										divHtml += '<span class="tips_leibie_num fl">--</span>';
									} else {
										divHtml += '<span class="tips_leibie_num fl">' + params[1].value + '</span>';
									}
									divHtml += '<div class="clearfix"></div>';
									divHtml += '</div>';
								}
								divHtml += '</div>';
								return divHtml;
							}
						},
						grid: {
							show: true,
							right: '10%',
							left: '10%',
							bottom: '30%'
						},
						dataZoom: {
							type: 'slider',
							show: true,
							start: '0',
							end: end,
							bottom: '3%',
							zoomLock: true
						},
						xAxis: {
							type: 'category',
							data: dateList //['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
						},
						//					label: {
						//						normal: {
						//							show: true,
						//							position: 'top'
						//						}
						//					},
						yAxis: [{
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
								//              min:0,
								//              max:100,
								//              axisLabel:{
								//              	show:true,
								//              	formatter:"{value}"
								//              }
							}
						],
						series: [{
								name: '利润总额',
								type: 'bar',
								yAxisIndex: 0,
								barMaxWidth: '30',
								data: yingyeDataList //[2.6, 5.9, 80.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
							},
							{
								name: '增长率',
								type: 'line',
								yAxisIndex: 1,
								//              barMaxWidth:'30',
								symbol: "circle",
								data: REVZengZhangLvList, //[51, 20, 56, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
								axisLine: {
									show: false
								}
							}
						]
					};

					myChart.setOption(option);

					obj.myimg("totalProfit", myChart, "m912698679", 0)

					window.addEventListener("resize", function() {
						myChart.resize();
					});
					n = true;
				} else {
					$("#totalProfit").html('<div class="noDatas">暂无数据</div>');
					$("#totalProfit").height('auto')
					n = false;
				}

			}
		})
		if(n)
			return true;
		else
			return false;
	},
	//净利润及同比增长率(图表)
	findNetProfit: function(_callback) {
		var obj = this;
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}',
			n = false;
		$.axsRequest("FT540", paraminfo, true, function(data) {
			//console.log(data);
			if(data.retCode == "0000") {
				if(data.retData != null && data.retData != "" && data.retData != undefined) {
					var result = data.retData;
					var dateList = result.portTime;
					var yingyeDataList = result.f2JLR; //营业收入
					var REVZengZhangLvList = result.JingLiRunZengZhangLv; //增长率
					var end = (4 / dateList.length) * 100;
					// 使用刚指定的配置项和数据显示图表。
					var myChart = echarts.init(document.getElementById('netProfit'));
					var option = {
						color: [
							"#62a6f2", "#feb535"
						],
						calculable: true,
						legend: {
							show: true,
							data: ["净利润", '增长率']
						},
						tooltip: {
							trigger: 'axis',
							formatter: function(params) {
								//console.log(params)
								var divHtml = "";
								divHtml += '<div class="sanban_tips">';
								divHtml += '<div class="sb_tips_content">';
								divHtml += '<span class="tips_leibie fl jlrhzzl" style="background-color: #1985e2;">' + params[0].seriesName + '</span>';
								if(params[0].value == null || params[0].value == "" || params[0].value == undefined) {
									divHtml += '<span class="tips_leibie_num fl jlrhzzl">--</span>';
								} else {
									divHtml += '<span class="tips_leibie_num fl jlrhzzl">' + params[0].value + '</span>';
								}
								divHtml += '<div class="clearfix"></div>';
								divHtml += '</div>';
								if(params[1] != "" && params[1] != null && params[1] != undefined) {
									divHtml += '<div class="sb_tips_content first-content">';
									divHtml += '<span class="tips_leibie fl jlrhzzl" style="background-color: #fcc530;">' + params[1].seriesName + '</span>';
									if(params[1].value == null || params[1].value == "" || params[1].value == undefined) {
										divHtml += '<span class="tips_leibie_num fl">--</span>';
									} else {
										divHtml += '<span class="tips_leibie_num fl">' + params[1].value + '</span>';
									}
									divHtml += '<div class="clearfix"></div>';
									divHtml += '</div>';
								}
								divHtml += '</div>';
								return divHtml;
							}
						},
						grid: {
							show: true,
							right: '10%',
							left: '10%',
							bottom: '30%'
						},
						xAxis: {
							type: 'category',
							data: dateList //['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
						},
						//					label: {
						//						normal: {
						//							show: true,
						//							position: 'top'
						//						}
						//					},
						dataZoom: {
							type: 'slider',
							show: true,
							start: '0',
							end: end,
							bottom: '3%',
							zoomLock: true
						},
						yAxis: [{
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
									show: true
								}
								//              min:0,
								//              max:100,
								//              axisLabel:{
								//              	show:true,
								//              	formatter:"{value}"
								//              }
							}
						],
						series: [{
								name: '净利润',
								type: 'bar',
								yAxisIndex: 0,
								barMaxWidth: '30',
								data: yingyeDataList //[2.6, 5.9, 80.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
							},
							{
								name: '增长率',
								type: 'line',
								yAxisIndex: 1,
								//              barMaxWidth:'30',
								symbol: "circle",
								data: REVZengZhangLvList, //[51, 20, 56, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
								axisLine: {
									show: false
								}
							}
						]
					};

					myChart.setOption(option);

					obj.myimg("netProfit", myChart, "m5966234340", 0)

					window.addEventListener("resize", function() {
						myChart.resize();
					});
					n = true;
				} else {
					$("#netProfit").html('<div class="noDatas">暂无数据</div>');
					$("#netProfit").height('auto')
					n = false;
				}

			}
		})
		if(n)
			return true;
		else
			return false;
	},
	//总资产及同比增长率（图表）
	findTotalAssets: function(_callback) {
		var obj = this;
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}',
			n = false;
		$.axsRequest("FT541", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				if(data.retData != null && data.retData != "" && data.retData != undefined) {
					var result = data.retData;
					//$("#businessIncomeShowName").html("2.2.1"+data.ZongZiChanZengZhangLv_showName);
					var dateList = result.portTime;
					var yingyeDataList = result.f1ZCZJ; //营业收入
					var REVZengZhangLvList = result.ZongZiChanZengZhangLv; //增长率
					var end = (4 / dateList.length) * 100;
					// 使用刚指定的配置项和数据显示图表。
					var myChart = echarts.init(document.getElementById('totalAssets'));
					var option = {
						color: [
							"#62a6f2", "#feb535"
						],
						calculable: true,
						legend: {
							show: true,
							data: ["总资产", '增长率']
						},
						grid: {
							show: true,
							right: '10%',
							left: '10%',
							bottom: '30%'
						},
						tooltip: {
							trigger: 'axis',
							formatter: function(params) {
								//console.log(params)
								var divHtml = "";
								divHtml += '<div class="sanban_tips">';
								divHtml += '<div class="sb_tips_content">';
								divHtml += '<span class="tips_leibie fl jlrhzzl" style="background-color: #1985e2;">' + params[0].seriesName + '</span>';
								if(params[0].value == "" || params[0].value == null || params[0].value == undefined) {
									divHtml += '<span class="tips_leibie_num fl">--</span>';
								} else {
									divHtml += '<span class="tips_leibie_num fl">' + params[0].value + '</span>';
								}
								divHtml += '<div class="clearfix"></div>';
								divHtml += '</div>';
								if(params[1] != "" && params[1] != null && params[1] != undefined) {
									divHtml += '<div class="sb_tips_content first-content">';
									divHtml += '<span class="tips_leibie fl jlrhzzl" style="background-color: #fcc530;">' + params[1].seriesName + '</span>';
									if(params[1].value == null || params[1].value == "" || params[1].value == undefined) {
										divHtml += '<span class="tips_leibie_num fl">--</span>';
									} else {
										divHtml += '<span class="tips_leibie_num fl">' + params[1].value + '</span>';
									}
									divHtml += '<div class="clearfix"></div>';
									divHtml += '</div>';
								}
								divHtml += '</div>';
								return divHtml;
							}
						},
						dataZoom: {
							type: 'slider',
							show: true,
							start: '0',
							end: end,
							bottom: '3%',
							zoomLock: true
						},
						xAxis: {
							type: 'category',
							data: dateList //['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
						},
						//					label: {
						//						normal: {
						//							show: true,
						//							position: 'top'
						//						}
						//					},
						yAxis: [{
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
									show: true
								}
								//              min:0,
								//              max:100,
								//              axisLabel:{
								//              	show:true,
								//              	formatter:"{value}"
								//              }
							}
						],
						series: [{
								name: '总资产',
								type: 'bar',
								yAxisIndex: 0,
								barMaxWidth: '30',
								data: yingyeDataList //[2.6, 5.9, 80.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
							},
							{
								name: '增长率',
								type: 'line',
								yAxisIndex: 1,
								//              barMaxWidth:'30',
								symbol: "circle",
								data: REVZengZhangLvList, //[51, 20, 56, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
								axisLine: {
									show: false
								}
							}
						]
					};

					myChart.setOption(option);
					obj.myimg("totalAssets", myChart, "m7311084512", 0)

					window.addEventListener("resize", function() {
						myChart.resize();
					});
					n = true;
				} else {
					$("#totalAssets").html('<div class="noDatas">暂无数据</div>');
					$("#totalAssets").height('auto')
					n = false;
				}

			}
		})
		return n;
	},
	//5销售毛利率与销售净利率变动情况（图表）
	findInterestRateChange: function(_callback) {
		var obj = this;
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}',
			n = false;
		$.axsRequest("FT542", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				if(data.retData != null && data.retData != "" && data.retData != undefined) {
					var result = data.retData;
					//$("#businessIncomeShowName").html("2.2.1"+data.REVZengZhangLv_showName);
					var dateList = result.portTime;
					var yingyeDataList = result.XiaoShouMaoLiLv; //营业收入
					var REVZengZhangLvList = result.XiaoShouJingLiRunLv; //增长率
					var end = (4 / dateList.length) * 100;
					// 使用刚指定的配置项和数据显示图表。
					var myChart = echarts.init(document.getElementById('interestRateChange'));
					var option = {
						color: [
							"#62a6f2", "#feb535"
						],
						calculable: true,
						tooltip: {
							trigger: 'axis'
						},
						legend: {
							show: true,
							data: ["销售毛利率", '销售净利率']
						},
						tooltip: {
							trigger: 'axis',
							formatter: function(params) {
								//console.log(params)
								var divHtml = "";
								divHtml += '<div class="sanban_tips">';
								divHtml += '<div class="sb_tips_content">';
								divHtml += '<span class="tips_leibie fl xsmll" style="background-color: ' + params[0].color + ';">' + params[0].seriesName + '</span>';
								if(params[0].value == "" || params[0].value == null || params[0].value == undefined) {
									divHtml += '<span class="tips_leibie_num fl">--</span>';
								} else {
									divHtml += '<span class="tips_leibie_num fl">' + params[0].value + '</span>';
								}
								divHtml += '<div class="clearfix"></div>';
								divHtml += '</div>';
								if(params[1] != "" && params[1] != null && params[1] != undefined) {
									divHtml += '<div class="sb_tips_content first-content">';
									divHtml += '<span class="tips_leibie fl xsmll" style="background-color: ' + params[1].color + ';">' + params[1].seriesName + '</span>';
									if(params[1].value == null || params[1].value == "" || params[1].value == undefined) {
										divHtml += '<span class="tips_leibie_num fl">--</span>';
									} else {
										divHtml += '<span class="tips_leibie_num fl">' + params[1].value + '</span>';
									}
									divHtml += '<div class="clearfix"></div>';
									divHtml += '</div>';
								}
								divHtml += '</div>';
								return divHtml;
							}
						},
						grid: {
							show: true,
							right: '10%',
							left: '10%',
							bottom: '30%'
						},
						dataZoom: {
							type: 'slider',
							show: true,
							start: '0',
							end: end,
							bottom: '3%',
							zoomLock: true
						},
						xAxis: {
							type: 'category',
							data: dateList //['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
						},
						//					label: {
						//						normal: {
						//							show: true,
						//							position: 'top'
						//						}
						//					},
						yAxis: [{
								type: 'value',
								name: "单位：%",
								axisLabel: {
									show: true,
									formatter: "{value}"
								}
							},
							{
								type: 'value',
								name: "单位：%",
								splitLine: {
									show: true
								}
								//              min:0,
								//              max:100,
								//              axisLabel:{
								//              	show:true,
								//              	formatter:"{value}"
								//              }
							}
						],
						series: [{
								name: '销售毛利率',
								type: 'line',
								yAxisIndex: 0,
								symbol: "circle",
								data: yingyeDataList //[2.6, 5.9, 80.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
							},
							{
								name: '销售净利率',
								type: 'line',
								yAxisIndex: 1,
								//              barMaxWidth:'30',
								symbol: "circle",
								data: REVZengZhangLvList, //[51, 20, 56, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
								axisLine: {
									show: false
								}
							}
						]
					};

					myChart.setOption(option);

					obj.myimg("interestRateChange", myChart, "m1633115306", 0)

					window.addEventListener("resize", function() {
						myChart.resize();
					});
					n = true;
				} else {
					$("#interestRateChange").html('<div class="noDatas">无</div>');
					$("#interestRateChange").height('auto')
					n = false;
				}

			}
		})
		return n;
	},
	//追加图表
	findIndustryAnalysis: function() {
		var objss = this;
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT527", paraminfo, true, function(data) {
			if(data != null && data != "" && data != undefined) {

				if(data.chartNum != null && data.chartNum != "" && data.chartNum != undefined) {
					var chartNum = data.chartNum;
					$("#IndustryAnalysis").html('');
					//			$.each(, function(index,item) {
					for(var i = 0; i < chartNum; i++) {
						var item = data['chart_' + (i + 1)];
						//console.log(item)
						//				if(index==0){
						//					return ;
						//				}else{
						//追加图表
						var divHtml = '';
						divHtml += '<div class="yewu-contents">';
						divHtml += '<h4 class="chartH4">' + item.chartName + '</h4>';
						divHtml += '<div class="suochu-hy" id="hyChatrs_' + i + '"></div>';
						divHtml += '</div>';
						$("#IndustryAnalysis").append(divHtml);
						// $(".p16").find($(".kaik-content")).eq(1).html(divHtml);
						//计算图表宽度
						var suochuWidth = $(".hy-charts").width();
						//console.log(suochuWidth)
						$(".suochu-hy").css("width", suochuWidth);

						//			 	//判断图表的类型
						//				var chartType=item.chartType.split(",");
						//				var flag1=0;
						//				var flag2=0;
						//				$.each(chartType, function(key,val) {
						//					if(val=="柱状"){
						//						flag1++;
						//					}else if(val=="折线"){
						//						flag2++;
						//					}
						//				});
						//x轴数据
						var portTime = item.portTime;
						//y轴数据
						var series = [];
						//y轴类型
						var yAxis = new Array(2);
						var legendData = [];
						var type = "";
						//console.log(item.indexNum)
						for(var j = 0; j < item.indexNum; j++) {
							var dataObj = item["indexMap_" + (j + 1)];
							var Yindex = 0;
							var object = {
								name: dataObj.indexName,
								//		                type:type,
								//		                yAxisIndex:j,
								//		                barMaxWidth:'30',
								symbol: "circle",
								data: dataObj.indexData //[2.6, 5.9, 80.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
							}
							//y轴的具体设置
							var Obj = {
								type: 'value',
								name: "单位:" + dataObj.indexUnit,
								axisLabel: {
									show: true,
									formatter: "{value}"
								}
							};
							if(dataObj.indexUnit == "") {
								Obj.name = "";
							}
							//根据单位设置series中数据的线条格式，以及图的属性
							if(dataObj.indexUnit == "%") {
								object.type = "line";
								if(item.indexNum > 1) { //表示图中只有一条线的时候，不设置单位显示在右边
									object.yAxisIndex = 1;
									//控制刻度不显示
									Obj.splitLine = {
										show: true
									};
								}
								yAxis[1] = Obj;
							} else {
								object.type = "bar";
								object.barMaxWidth = "30";
								yAxis[0] = Obj;
							}
							series.push(object);
							Yindex++;
							legendData.push(dataObj.indexName);

						}
						//				console.log(series)
						//判断没有柱状图的时候
						if(yAxis[0] == null) {
							yAxis[0] = yAxis[1];
							if(series.length == 1) { //判断是否只有一个折线图
								yAxis.splice(1, 2);
							}
						}
						//图画
						objss.oneLineAndOneBar('hyChatrs_' + i, legendData, portTime, yAxis, series);
					};
				}
			} else {
				var div = '<div class="noDatas">无</div>';
				$("#IndustryAnalysis").html(div);
				// $(".p16").find($(".kaik-content")).eq(1).html(div);
			}
		})
	},
	//一个折线图和一个柱状图
	oneLineAndOneBar: function(id, legendData, portTime, yAxis, series) {
		var end = (4 / portTime.length) * 100;
		var myChart = echarts.init(document.getElementById(id));
		var option = {
			color: [
				"#62a6f2", "#feb535", "#9675da"
			],
			calculable: true,
			legend: {
				show: true,
				data: legendData //["营业收入",'增长率']
			},
			grid: {
				show: true,
				right: '10%',
				left: '10%',
				bottom: '30%'
			},
			dataZoom: {
				type: 'slider',
				show: true,
				start: '0',
				end: end,
				bottom: '3%',
				zoomLock: true
			},
			xAxis: {
				type: 'category',
				data: portTime //['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
			},
			label: {
				normal: {
					show: true,
					position: 'top'
				}
			},
			yAxis: yAxis,
			series: series
		};

		myChart.setOption(option);
		window.addEventListener("resize", function() {
			myChart.resize();
		});

	},
	//商业模式及未来规划
	findACMsg: function() {
		var obj = this;
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT524", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				//console.log(data)
				if(data.retData.actualControllerMsg != null && data.retData.actualControllerMsg.length > 0) {
					var symshtml = "<div class=''>" + data.retData.businessModel + "</div>";
					$(".SYMS").html(symshtml);
					if(isShowmodel) {
						obj.fileInit("m2405266557", 0, 1, symshtml)
					}

				} else {
					$(".SYMS").html("<div class='noDatas'>暂无数据</div>");
				}
				if(data.retData.futurePlanning != null && data.retData.futurePlanning.length > 0) {
					var wlghhtml = "<div class=''>" + data.retData.futurePlanning + "</div>";
					$(".WLGH").html(wlghhtml);
					//					console.log(isShowmodel);
					if(isShowmodel) {
						obj.fileInit("m725808891", 0, 1, wlghhtml)
					}
					//	console.log(data.retData.futurePlanning);
				} else {
					$(".WLGH").html("<div class='noDatas'>暂无数据</div>");
				}
			}
		})
	},
	//上下游分析
	findSC: function() {
		var obj = this;
		var iframesrc = "/researches/mind.html?stockCode=" + stockCode + "&stockName=" +  encodeURI(stockName);

        $("#mindframe").attr("src", iframesrc);
		var iframes = '<iframe src="' + iframesrc + '" id="myiframe2" scrolling="no" frameborder="0" style="width:760px;height:500px;"></iframe>';
		if(isShowmodel) {
			obj.fileInit("m7797298241", 0, 1, iframes);
			//					$(".middle_middle #m7797298241_0").html(iframes);
		}
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT525", paraminfo, true, function(data) {

			BS.MyCollect.findResourceRelation(data); //上下游图
			//			UTIL.sjly("#sxyfxly","sxyfx",".sxyfx","sjlyy");
			//			console.log("上下游请求结束")
			//			console.log(JSON.stringify( data))
			if(data.retCode == "0000") {

				var result = data.retData;

				var khHtml = '';
				khHtml += '<div>' +
					'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
					'<table style="width:98%" class="tablemodel"><thead>' +
					'<tr>' +
					'<th>供应商名称</th>' +
					'<th class="shuzi">采购金额(万元)</th>' +
					'<th class="shuzi">年度采购占比</th>' +
					'</tr></thead><tbody>'
				if(result.oc != null && result.oc.length > 0) { //主要客户
					$(result.oc).each(function(i, item) {
						khHtml += '<tr><td>' + item.customerName + '</td><td>' + item.salesAmount + '</td><td>' + item.operatingIncome + '</td></tr>';
						//						khHtml += "<tr>" +
						//							"<td>" + isStrKong(item.customerName) + "</td>" +
						//							"<td class='shuzi'>" + isSZKong(item.salesAmount) == "-" ? "-" : (isSZKong(item.salesAmount) / 10000).toFixed(2) + "</td>" +
						//							"<td class='shuzi'>" + isSZKong(item.operatingIncome) == "-" ? "-" : isSZKong(item.operatingIncome).toFixed(2) + "%" + "</td>" +
						//							"</tr>";
					})
					khHtml += '</tbody></table></div>'
					$(".kaik-contents .skehu").html(khHtml);
					if(isShowmodel) {
						obj.fileInit("m7797298241", 1, 1, khHtml)
					}

					// UTIL.sjly("#sxyfxly","sxyfx",".sxyfx","sjlyy");
				} else {
					$(".kaik-contents .skehu").html("<tr><td colspan='3' ><div class='noDatas'>暂无数据</div></td></tr>");
				}

				var gysHtml = "";
				gysHtml += '<div>' +
					'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
					'<table style="width:98%" class="tablemodel"><thead>' +
					'<tr>' +
					'<th>客户名称</th>' +
					'<th class="shuzi">销售金额(万元)	</th>' +
					'<th class="shuzi">年度销售占比</th>' +
					'</tr></thead><tbody>'
				if(result.ms != null && result.ms.length > 0) { //主要供应商
					$(result.ms).each(function(i, item) {
						gysHtml += '<tr><td>' + item.gysName + '</td><td>' + item.purchaseAmount + '</td><td>' + item.percentagePurchase + '</td></tr>'
						//						gysHtml += "<tr>" +
						//							"<td>" + isStrKong(item.gysName) + "</td>" +
						//							"<td class='shuzi'>" + isSZKong(item.purchaseAmount) == "-" ? "-" : isSZKong(item.purchaseAmount).toFixed(2) + "</td>" +
						//							"<td class='shuzi'>" + isSZKong(item.percentagePurchase) == "-" ? "-" : item.percentagePurchase.toFixed(2) + "%" + "</td>" +
						//							"</tr>";
					})
					gysHtml += '</tbody></table></div>';
					$(".kaik-contents .sgongyingshang").html(gysHtml);
					if(isShowmodel) {
						obj.fileInit("m7797298241", 2, 1, gysHtml)
					}

					// UTIL.sjly("#sxyfxly","sxyfx",".sxyfx","sjlyy");
				} else {
					$(".kaik-contents .sgongyingshang").html("<tr><td colspan='3'><p><div class='noDatas'>暂无数据</div></p></td></tr>");
				}
			}
		})
	},
	//获取上下游数据
	findResourceRelation: function(data) {
		if(data.retCode == "0000") {
			var result = data.retData;
			if(result == null || result == "" || result == undefined) {
				return false;
			}

			var customer = result.oc; //主要客户
			var suppliers = result.ms; //主要供应商
			//上下游关系换图--球球图
			//			shangxiayouD3(customer,suppliers);
			//无数据显示的东西
			if((customer == null || customer.length == 0) && (suppliers == null || suppliers.length == 0)) {
				//				$("#graph_panel").attr("style","height:100px;");
				$("#main").html('<div class="noDatas noDatas-s1">暂无数据</div>');
				$(".tuli-content").hide();
				return false;
			}
			//console.log("findResourceRelation: "+$(".tuli-content").html());
			$(".tuli-content").show();
			//上下游关系新图
			var datas = new Array();
			//			{name: '天阳科技(835713)'}
			var centerTitle = {};
			centerTitle.name = stockName + "(" + stockCode + ")";
			datas.push(centerTitle);
			//主要供应商
			for(var i = 0; i < suppliers.length; i++) {
				//				console.log(customer[i]);
				var obj = {};
				//obj.investor+"(持股:"+obj.proportion+"%)";
				obj.name = isStrKong(suppliers[i].gysName);
				obj.edgeText = "金额比例:" + isSZKong(suppliers[i].percentagePurchase) + "%";
				obj.cusType = "mx";
				datas.push(obj);
			}
			//=============数据分隔符============
			//主要客户
			for(var i = 0; i < customer.length; i++) {
				//				console.log(suppliers[i]);
				var obj = {};
				//"(参控股:"+obj.shareholdingRatio+"%)"+obj.subCompanyName;
				obj.name = isStrKong(customer[i].customerName);
				obj.edgeText = "金额比例:" + isSZKong(customer[i].operatingIncome) + "%";
				obj.cusType = "mg";
				datas.push(obj);
			}

			// $("#main").remove();
			// $(".gxtul").after("<div class='gx-tb' id='main' ></div>");
			if(!datas.length) {
				//console.log("aaaa");
			}
			//		console.log("findResourceRelation: createBootStrapChart");
			//createBootStrapChart(datas, "jsmind_container");
			// setScrollTos();
		} else {
			errorAlert(data.retCode, data.retMsg);
		}
	},
	//上下游分析文案
	//	findSCInfo: function() {
	//		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
	//		$.axsRequest("FT525", paraminfo, true, function(data) {
	//			if(data.retCode = "0000") {
	//				var result = data.retData;
	//				if(result != "" && result != null && result != undefined) {
	//					var ms = result.ms;
	//					var oc = result.oc;
	//					$("#graphTips").html(ms + ";" + oc);
	//				}
	//			}
	//		});
	//	},
	//查询竞争对手
	findJZDS: function() {
		var obj = this;
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT526", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var result = data.retData;
				//console.log(result)
				var JZDSHtml = ""; //表格的内容
				if(result != null && result.length > 0) {
					$("#hy_type").html("(所属行业：" + result[0].industryName + ")");
					JZDSHtml += '<div class="caiwu-table">' +
						'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
						'<table style="width:98%" class="tablemodel"><thead><tr><th style="width:20%">对标公司</th><th class="shuzi" style="width:20%">营业收入（万元）</th>' +
						'<th class="shuzi" style="width:20%">净利润（万元）</th><th class="shuzi" style="width:20%">资产负债率（%）</th><th class="shuzi">ROE</th></tr></thead><tbody>'
					$(result).each(function(i, item) {
						JZDSHtml += "<tr>";
						if(stockName == item.stockName) {
							JZDSHtml += "<td><span class='duibiao now-company' data-code='" + item.stockCode + "'>" + item.stockName + "<span></td>";
						} else {
							JZDSHtml += "<td><span class='duibiao' data-code='" + item.stockCode + "'>" + item.stockName + "<span></td>";
						}
						JZDSHtml += "<td>" + item.YYSR.toFixed(2) + "</td>" +
							"<td>" + item.JLR.toFixed(2) + "</td>" +
							"<td>" + item.ZCFZL.toFixed(2) + "</td>" +
							"<td>" + item.ROE.toFixed(2) + "</td>" +
							"</tr>"
					})
					JZDSHtml += '</tbody></table></div>';
					$(".zyjzdsDiv .sicDNTBody").html(JZDSHtml);
					if(isShowmodel) {
						obj.fileInit("m3737948765", 0, 1, JZDSHtml)
					}
				} else {
					$("#sicDNTBody").html("<tr><td colspan='6' ><div class='noDatas'>暂无数据</div></td></tr>");
				}
			}
		})

	},
	//所处行业简介
	industryRemark: function() {
		var obj = this;
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT528", paraminfo, true, function(data) {
			if(data == "" || data == null || data == undefined) {
				$("#industryRemark").html("--");
			} else {
				$("#industryRemark").html(data.remark);
				if(data.remark == null) {
					data.remark = "暂无数据"
				}
				if(isShowmodel) {
					obj.fileInit("m1797073735", 0, 1, data.remark)
				}
			}
		})
	},
	//行业指标分析无数据
	//竞争优势分析
	youshifenxi: function(_callback) {
		var obj = this;
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT527", paraminfo, true, function(data) {
			if(data.retCode == '0000') {
				if(data.retData != null && data.retData != "" && data.retData != undefined) {
					var retData = data.retData;
					for(i = 0; i < retData.length; i++) {
						var h4Main = $("<h4>");
						var pMain = $("<p>");
						var _render = retData[i].swotDesc;
						var _renderTitle = retData[i].swotTitle;
						if(retData[i].swotDesc === "") {
							pMain.append("<div class=\"noDatas\">无</div>");
							// pMain.before(h4Main);
							return true;
						} else if(retData[i].swotTitle === "优势" || retData[i].swotTitle === "劣势") {
							_renderTitle = "";
						}
						// console.log($(".schyfx").html())
						pMain.before(h4Main);
						pMain.append(_render);
						h4Main.append(_renderTitle);
						$("#jingzhengyoushi").append(h4Main);
						$("#jingzhengyoushi").append(pMain);
						if(isShowmodel) {
							obj.fileInit("m2137969819", 0, 1, $("#jingzhengyoushi").html())
						}
					}
				} else {
					var div = '<div class="noDatas">暂无数据</div>';
					$(".schyfxDiv").find("#jingzhengyoushi").append(div)
				}
			}
		});
		//		obj.findIndustryAnalysis();
	},
	//审计意见
	shenjiyijian: function() {
		var obj = this;
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT529", paraminfo, true, function(data) {
			if(data.retCode == '0000') {
				if(data.retData != null && data.retData != "" && data.retData != undefined) {
					var retData = data.retData;
					sjTypehtml = '';
					sjTypehtml += "<div class='caiwu-table'>" +
						"<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>" +
						"<table style='width:98%' class='tablemodel'><thead><th>时间</th><th>会计师事务所及签字注册会计师</th><th>审计意见类型</th><th>非标意见说明</th></thead><tbody>";
					$(retData).each(function(index, item) {
						sjTypehtml += '<tr><td>' + item.reportPeriod + '</td><td>' + item.SJDW + item.QZZCKJS + '</td><td>' + item.auditOpinionsType + '</td><td>' + item.auditOpinionsDesc + '</td></tr>'
					})

					sjTypehtml += '</tbody></table></div>';
					sjTypehtml = ReplaceAll(sjTypehtml, "null", "--")
					sjTypehtml = ReplaceAll(sjTypehtml, "undefined", "--")
					$(".sjyjDiv .sjType").html(sjTypehtml);
					if(isShowmodel) {
						obj.fileInit('m3597370042', 0, 1, sjTypehtml)
					}
				} else {
					var div = '<div class="noDatas noDatas-s1">暂无数据</div>';
					$(".sjyjDiv .sjType").html(div);
				}
			}
		});
	},
	//核心财务数据
	findFinanceKernelData: function() {
		var obj = this;
		var $findFinanceKernelData = '';
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT530", paraminfo, true, function(data) {
			var _data = data.retData;
			if(_data == null || _data == "null") {
				return false;
			}
			var otn = '<div class="AguTable Agu-cw">' +
				'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
				'<table style="width:98%" class="tablemodel">' +
				'<thead>' +
				'<tr>' +
				'<th style="width:30%">核心指标</th>' +
				'<th class="shuzi AguName" style="width:40%">' + _data.stockName + '</th>' +
				'<th>对标平均</th>' +
				'</tr>' +
				'</thead>' +
				'<tbody>' +
				'<tr>' +
				'<td class="zbdqbj">市值总额（亿元）</td>' +
				'<td class="shuzi c1_74_value">' + _data.ShiZhiZongE.ShiZhiZongE_value / 10000.00 + '</td>' +
				'<td class="shuzi ybnbj c1_74_avg">' + _data.ShiZhiZongE.ShiZhiZongE_avg / 10000.00 + '</td>' +
				'</tr>' +
				'<tr>' +
				'<td class="zbdqbj">市盈率（万元）</td>' +
				'<td class="shuzi c1_141_value">' + _data.ShiYingLv.ShiYingLv_value / 10000.00 + '</td>' +
				'<td class="shuzi ybnbj c1_141_avg">' + _data.ShiYingLv.ShiYingLv_avg / 10000.00 + '</td>' +
				'</tr>' +
				'<tr>' +
				'<td class="zbdqbj">市净率（%）</td>' +
				'<td class="shuzi ZiChanFuZhaiLv_value">' + _data.ShiJingLv.ShiJingLv_value + '</td>' +
				'<td class="shuzi ybnbj ZiChanFuZhaiLv_avg">' + _data.ShiJingLv.ShiJingLv_avg + '</td>' +
				'</tr>' +
				'<tr>' +
				'<td class="zbdqbj">每股收益(元/每股)</td>' +
				'<td class="shuzi ZiChanFuZhaiLv_value">' + _data.MeiGuShouYi.MeiGuShouYi_value + '</td>' +
				'<td class="shuzi ybnbj ZiChanFuZhaiLv_avg">' + _data.MeiGuShouYi.MeiGuShouYi_avg + '</td>' +
				'</tr>' +
				'<tr>' +
				'<td class="zbdqbj">每股净资产(元/每股)</td>' +
				'<td class="shuzi ZiChanFuZhaiLv_value">' + _data.MeiGuJingZiChan.MeiGuJingZiChan_value + '</td>' +
				'<td class="shuzi ybnbj ZiChanFuZhaiLv_avg">' + _data.MeiGuJingZiChan.MeiGuJingZiChan_avg + '</td>' +
				'</tr>' +
				'<tr>' +
				'<td class="zbdqbj">每股经营现金流(元/每股)</td>' +
				'<td class="shuzi ZiChanFuZhaiLv_value">' + _data.MeiGuJingYingXianJinLiu.MeiGuJingYingXianJinLiu_value + '</td>' +
				'<td class="shuzi ybnbj ZiChanFuZhaiLv_avg">' + _data.MeiGuJingYingXianJinLiu.MeiGuJingYingXianJinLiu_avg + '</td>' +
				'</tr>' +
				'<tr>' +
				'<td class="zbdqbj">资产负债率(%)</td>' +
				'<td class="shuzi ZiChanFuZhaiLv_value">' + _data.ZiChanFuZhaiLv.ZiChanFuZhaiLv_value + '</td>' +
				'<td class="shuzi ybnbj ZiChanFuZhaiLv_avg">' + _data.ZiChanFuZhaiLv.ZiChanFuZhaiLv_avg + '</td>' +
				'</tr>' +

				'</tbody>' +
				'</table>' +
				'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
				'<table style="width:98%" class="tablemodel">' +
				'<thead>' +
				'<tr>' +
				'<th class="zbdqbj">盈利指标</th>' +
				'<th></th>' +
				'<th></th>' +
				'</tr>' +
				'</thead>' +
				'<tbody>' +
				'<tr>' +
				'<td class="zbdqbj">EBIT(万元)</td>' +
				'<td class="shuzi XiShuiQianLiRun_value">' + _data.XiShuiQianLiRun.XiShuiQianLiRun_value / 10000.00 + '</td>' +
				'<td class="shuzi ybnbj XiShuiQianLiRun_avg">' + _data.XiShuiQianLiRun.XiShuiQianLiRun_avg / 10000.00 + '</td>' +
				'</tr>' +
				'<tr>' +
				'<td class="zbdqbj">EBITDA(万元)</td>' +
				'<td class="shuzi XiShuiZheJiuJiTanXiaoQianLiRun_value">' + _data.XiShuiZheJiuJiTanXiaoQianLiRun.XiShuiZheJiuJiTanXiaoQianLiRun_value / 10000.00 + '</td>' +
				'<td class="shuzi ybnbj XiShuiZheJiuJiTanXiaoQianLiRun_avg">' + _data.XiShuiZheJiuJiTanXiaoQianLiRun.XiShuiZheJiuJiTanXiaoQianLiRun_avg / 10000.00 + '</td>' +
				'</tr>' +
				'<tr>' +
				'<td class="zbdqbj">净利润(万元)</td>' +
				'<td class="shuzi f2JLR_value">' + _data.f2JLR.f2JLR_value.toFixed(2) / 10000.00 + '</td>' +
				'<td class="shuzi ybnbj f2JLR_avg">' + _data.f2JLR.f2JLR_avg.toFixed(2) / 10000.00 + '</td>' +
				'</tr>' +
				'<tr>' +
				'<td class="zbdqbj">净资产收益率(%)</td>' +
				'<td class="shuzi JingZiChanShouYiLv_value">' + _data.JingZiChanShouYiLv.JingZiChanShouYiLv_value.toFixed(2) + '</td>' +
				'<td class="shuzi ybnbj JingZiChanShouYiLv_avg">' + _data.JingZiChanShouYiLv.JingZiChanShouYiLv_avg.toFixed(2) + '</td>' +
				'</tr></tbody></table></div>';
			$.each(_data, function(key, item) {
				var value = item[key + "_value"];
				var avg = item[key + "_avg"];
				var showUnit = item[key + "_showUnit"];
				if(showUnit != null) {
					if(showUnit.indexOf("亿") > -1) {
						value = Number(value) / 100000000.00;
						avg = Number(avg) / 100000000.00;
					} else if(showUnit.indexOf("万") > -1) {
						value = Number(value) / 10000.00;
						avg = Number(avg) / 10000.00;
					}
				}
				$("." + key + "_value").html(Number(value).toFixed(2));
				$("." + key + "_avg").html(Number(avg).toFixed(2));

			});
			$(".hxcwsjDiv .hxcwsj").html(otn);
			if(isShowmodel) {
				obj.fileInit("m7156231092", 0, 1, otn)
			}
		});
	},
	//公司盈利情况
	findProfitData: function() {
		var obj = this;
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT543", paraminfo, true, function(data) {
			var _data = data.retData;
			if(_data == null || _data == "null") {
				$("#companyProfitShuoMing").hide();
				$("#companyProfit").hide();
				$("#companyProfit").after(noDataHtml());
				return false;
			}
			//UTIL.sjly("#cwsdfxly", "gsylqk", ".cw1", "sjlyy");
			var shuoming = "<p>截止最近一个会计年度，公司净利润为" + ((_data.stockValue == null || _data.stockValue == "undefined") ? "--" : (_data.stockValue / 1000000.00).toFixed(2)) + "百万，" +
				"在行业内排名" + ((_data.stockRanking == null || _data.stockRanking == "undefined") ? "--" : _data.stockRanking) + "/" + ((_data.stockTotalRanking == null || _data.stockTotalRanking == "undefined") ? "--" : _data.stockTotalRanking) + "，属于行业" + ((_data.rankingName == null || _data.rankingName == "undefined") ? "--" : _data.rankingName) + "。</p>";
			$("#companyProfitShuoMing").html(shuoming);
			//控制显示的起始位置
			var startIndex = 0;
			if(_data.stockRanking > 5) {
				startIndex = Number(_data.stockRanking) / _data.financeValueArrray.length * 100 - 1;
			}
			var stockNameArrrayChart = [];
			$(_data.stockNameArrray).each(function(index, item) {
				if(item == null) {
					item = "";
				}
				stockNameArrrayChart.push(item);
			})
			//控制一屏幕显示多少条
			var endIndex = 15 / _data.financeValueArrray.length * 100;
			var width = $(".page").width() * 0.9;
			$("#companyProfit").css("width", width);
			var myChart = echarts.init(document.getElementById('companyProfit'));
			var option = {
				legend: {
					show: true,
					data: ['净利润'],
					//				backgroundColor:"#62a6f2",
					top: '8%'
				},
				color: ['#62a6f2'],
				xAxis: {
					show: true,
					type: 'category',
					//data:['东方证劵','东方时尚','华夏证劵','东方证劵']
					data: stockNameArrrayChart
				},
				yAxis: {
					show: true,
					name: '百万',
					type: 'value'
				},
				grid: {
					show: true,
					left: '5%',
					right: '5%',
					bottom: '30%'
				},
				label: {
					normal: {
						show: true,
						position: 'top'
					}
				},
				dataZoom: {
					type: 'slider',
					show: true,
					start: '0',
					end: 20,
					bottom: '3%',
					zoomLock: true
				},
				series: [{
					type: 'bar',
					name: '净利润',
					barMaxWidth: '30',
					//data:[10,50,20,83]
					data: _data.financeValueArrray,
					//				label: {
					//	                normal: {
					//	                    show: true,
					//	                    position: "top",
					//	                    offset:[1,100],
					//	                    formatter: function(params) {
					//	                    	if(params.dataIndex<10){
					//	                    		 return "第" + (params.dataIndex+1) + "";
					//	                    	}else{
					//	                    		 return "第" + ((_data.stockRanking==null || _data.stockRanking=="undefined")?"--":_data.stockRanking) + "";
					//	                    	}
					//	                    },
					//	                    textStyle:{
					//	                    	color:"#333"
					//	                    }
					//	                }
					//	            },
					itemStyle: {
						normal: {
							color: function(params) {
								// 检索结果颜色
								if(((params.dataIndex + 1) == _data.stockRanking) || (params.dataIndex + 1) == 11) {
									return "#f3565d";
								} else {
									return "#62a6f2";
								}
							}
						},
						emphasis: {
							color: "#4a8ad3" //鼠标放到柱形图上显示的颜色
						}
					}
				}]
			};
			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);

			obj.myimg("companyProfit", myChart, "m9558332368", 0)

			//	    setScrollTos();
			window.addEventListener("resize", function() {
				myChart.resize();
			});
		});

	},
	//公司成长情况
	findGroupData: function() {
		var obj = this;
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT544", paraminfo, true, function(data) {
			var _data = data.retData;
			if(_data == null || _data == "null") {
				$("#companyGrowUpShuoming").hide();
				$("#companyGrowUp").hide();
				$("#companyGrowUp").after(noDataHtml());
				return false;
			}
			var shuoming = "<p>截至到" + ((_data.portTime_tips == null || _data.portTime_tips == "undefined") ? "--" : _data.portTime_tips) + "，" +
				"公司的营收增长率为：" + ((_data.REVZengZhangLv_tips == null || _data.REVZengZhangLv_tips == "undefined") ? "--" : Number(_data.REVZengZhangLv_tips).toFixed(2)) + "%，" +
				"净利润增长率为" + ((_data.JingLiRunZengZhangLv_tips == null || _data.JingLiRunZengZhangLv_tips == "undefined") ? "--" : Number(_data.JingLiRunZengZhangLv_tips).toFixed(2)) + "%，" +
				"成长能力在行内排名" + ((_data.stockCodeRank == null || _data.stockCodeRank == "undefined") ? "--" : _data.stockCodeRank) + "/" + ((_data.stockTotalRanking == null || _data.stockTotalRanking == "undefined") ? "--" : _data.stockTotalRanking) + "，行业排名第一的是：" + ((_data.firstRankStockName == null || _data.firstRankStockName == "undefined") ? "--" : _data.firstRankStockName) + "(" + ((_data.firstRankStockCode == null || _data.firstRankStockCode == "undefined") ? "--" : _data.firstRankStockCode) + ")</p>"
			$("#companyGrowUpShuoming").html(shuoming);
			var width = $(".page").width() * 0.9;
			$("#companyGrowUp").css("width", width);
			var myChart = echarts.init(document.getElementById('companyGrowUp'));
			var option = {
				legend: {
					show: true,
					data: ['营收增长率', "净利润增长率"],
					top: '5%'
				},
				color: ['#62a6f2', "#feb535"],
				xAxis: {
					show: true,
					type: 'category',
					//data:['2015-11','2015-11','2015-11','2015-11']
					data: _data.portTime
				},
				yAxis: {
					show: true,
					name: '%',
					type: 'value'
				},
				tooltip: {
					trigger: 'axis',
					formatter: function(params) {
						//console.log(params)
						var divHtml = "";
						divHtml += '<div class="sanban_tips">';
						divHtml += '<div class="sb_tips_content">';
						divHtml += '<span class="tips_leibie fl gsczqk" style="background-color: ' + params[0].color + ';">' + params[0].seriesName + '</span>';
						if(params[0].value == "" || params[0].value == null || params[0].value == undefined) {
							divHtml += '<span class="tips_leibie_num fl">--</span>';
						} else {
							divHtml += '<span class="tips_leibie_num fl">' + params[0].value + '</span>';
						}

						divHtml += '<div class="clearfix"></div>';
						divHtml += '</div>';
						if(params[1] != "" && params[1] != null && params[1] != undefined) {
							divHtml += '<div class="sb_tips_content first-content">';
							divHtml += '<span class="tips_leibie gsczqk fl" style="background-color: ' + params[1].color + ';">' + params[1].seriesName + '</span>';
							if(params[1].value == null || params[1].value == "" || params[1].value == undefined) {
								divHtml += '<span class="tips_leibie_num fl">--</span>';
							} else {
								divHtml += '<span class="tips_leibie_num fl">' + params[1].value + '</span>';
							}
							divHtml += '<div class="clearfix"></div>';
							divHtml += '</div>';
						}
						divHtml += '</div>';
						return divHtml;
					}
				},
				grid: {
					show: true,
					left: '5%',
					right: '5%',
					bottom: '30%'
				},
				dataZoom: [{
					type: 'slider',
					show: true,
					start: '0',
					end: '100',
					bottom: '3%'
				}],
				//			label: {
				//				normal: {
				//					show: true,
				//					position: 'top'
				//				}
				//			},
				series: [{
						type: 'line',
						name: '营收增长率',
						symbol: 'circle',
						//data:[10,50,20,83]
						data: _data.REVZengZhangLv
					},
					{
						type: 'line',
						name: '净利润增长率',
						symbol: 'circle',
						//data:[15,38,40,60]
						data: _data.JingLiRunZengZhangLv
					}
				]
			};
			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);
			obj.myimg("companyGrowUp", myChart, "m2286317098", 0)

			//	    setScrollTos();
			window.addEventListener("resize", function() {
				myChart.resize();
			});
		});
	},
	//偿债能力
	findPayData: function() {
		var obj = this;
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT545", paraminfo, true, function(data) {
			var _data = data.retData;
			//console.log(_data);
			if(_data == null || _data == "null") {
				//alert(0)
				$("#companySinking").hide();
				$("#companySinkingShuoming").hide();
				//			$("#companyProfitShuoMing").hide();
				//			$("#companyProfit").hide();
				$("#companySinking").after(noDataHtml());
				return false;
			}
			var shuoming = "<p>截至到" + ((_data.portTime_tips == null || _data.portTime_tips == "undefined") ? "--" : _data.portTime_tips) + "，" +
				"公司的流动比率为：" + ((_data.LiuDongBiLv_tips == null || _data.LiuDongBiLv_tips == "undefined") ? "--" : Number(_data.LiuDongBiLv_tips).toFixed(2)) + "，" +
				"速动比率为" + ((_data.SuDongBiLv_tips == null || _data.SuDongBiLv_tips == "undefined") ? "--" : Number(_data.SuDongBiLv_tips).toFixed(2)) + "，" +
				"偿债能力在行内排名" + ((_data.stockCodeRank == null || _data.stockCodeRank == "undefined") ? "--" : _data.stockCodeRank) + "/" + ((_data.stockTotalRanking == null || _data.stockTotalRanking == "undefined") ? "--" : _data.stockTotalRanking) + "，行业排名第一的是：" + ((_data.firstRankStockName == null || _data.firstRankStockName == "undefined") ? "--" : _data.firstRankStockName) + "(" + ((_data.firstRankStockCode == null || _data.firstRankStockCode == "undefined") ? "--" : _data.firstRankStockCode) + ")</p>"
			$("#companySinkingShuoming").html(shuoming);
			var width = $(".page").width() * 0.9;
			$("#companySinking").css("width", width);
			var myChart = echarts.init(document.getElementById('companySinking'));
			var option = {
				legend: {
					show: true,
					data: ['流动比率', "速动比率"],
					top: '5%'
				},
				color: ['#62a6f2', "#feb535"],
				xAxis: {
					show: true,
					type: 'category',
					//data:['2015-11','2015-11','2015-11','2015-11']
					data: _data.portTime
				},
				yAxis: {
					show: true,
					name: '',
					type: 'value'
				},
				//			label: {
				//				normal: {
				//					show: true,
				//					position: 'top'
				//				}
				//			},
				grid: {
					show: true,
					left: '5%',
					right: '5%',
					bottom: '30%'
				},
				tooltip: {
					trigger: 'axis',
					formatter: function(params) {
						//console.log(params)
						var divHtml = "";
						divHtml += '<div class="sanban_tips">';
						divHtml += '<div class="sb_tips_content">';
						divHtml += '<span class="tips_leibie fl" style="background-color: ' + params[0].color + ';">' + params[0].seriesName + '</span>';
						if(params[0].value == "" || params[0].value == null || params[0].value == undefined) {

						} else {
							divHtml += '<span class="tips_leibie_num fl">' + params[0].value + '</span>';
						}

						divHtml += '<div class="clearfix"></div>';
						divHtml += '</div>';
						if(params[1] != "" && params[1] != null && params[1] != undefined) {
							divHtml += '<div class="sb_tips_content first-content">';
							divHtml += '<span class="tips_leibie fl" style="background-color: ' + params[1].color + ';">' + params[1].seriesName + '</span>';
							if(params[1].value == null || params[1].value == "" || params[1].value == undefined) {
								divHtml += '<span class="tips_leibie_num fl">--</span>';
							} else {
								divHtml += '<span class="tips_leibie_num fl">' + params[1].value + '</span>';
							}
							divHtml += '<div class="clearfix"></div>';
							divHtml += '</div>';
						}
						divHtml += '</div>';
						return divHtml;
					}
				},
				dataZoom: [{
					type: 'slider',
					show: true,
					start: '0',
					end: '100',
					bottom: '3%'
				}],
				series: [{
						type: 'line',
						name: '流动比率',
						symbol: 'circle',
						//data:[10,50,20,83]
						data: _data.LiuDongBiLv
					},
					{
						type: 'line',
						name: '速动比率',
						symbol: 'circle',
						//data:[15,38,40,60]
						data: _data.SuDongBiLv
					}
				]
			};
			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);
			obj.myimg("companySinking", myChart, "m346237126", 0)

			//	    setScrollTos();
			window.addEventListener("resize", function() {
				myChart.resize();
			});
		});
	},
	//运营情况
	findOperationData: function() {
		var obj = this;
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT546", paraminfo, true, function(data) {
			var _data = data.retData;
			//console.log(_data.CunHuoZhouZhuanLv)
			if(_data == null || _data == "null" ||
				(_data.CunHuoZhouZhuanLv == undefined && _data.YingShouZhangKuanZhouZhuanLv == undefined)) {
				$("#companyOperateShuoming").hide();
				$("#companyOperate").hide();
				$("#companyOperate").after(noDataHtml());
				return false;
			}

			var flag1 = false; //存货周转率是否有值
			var flag2 = false; //应收账款周转率是否有值
			$(_data.CunHuoZhouZhuanLv).each(function(i, item) {
				if(item != null && item != 0) {
					flag1 = true;
				}
			})

			$(_data.YingShouZhangKuanZhouZhuanLv).each(function(i, item) {
				if(item != null && item != 0) {
					flag2 = true;
				}
			})
			if(!flag1 && !flag2) { //都没有值隐藏
				$("#companyOperateShuoming").hide();
				$("#companyOperate").hide();
				$("#companyOperate").after(noDataHtml());
			}
			//		console.log(_data);
			//UTIL.sjly("#cwsdfxly", "gsyynlqk", ".cw2", "sjlyy");
			// UTIL.sjly("#cwsdfxly","cwsdfx",".cw3","sjlyy");
			var shuoming = "<p>截止到" + ((_data.portTime_tips == null || _data.portTime_tips == "undefined") ? "--" : _data.portTime_tips) + "，" +
				"公司的存货周转天数为" + ((_data.CunHuoZhouZhuanLv_tips == null || _data.CunHuoZhouZhuanLv_tips == "undefined") ? "--" : Number(_data.CunHuoZhouZhuanLv_tips).toFixed(2)) + "天，" +
				"应收账款周转天数为" + ((_data.YingShouZhangKuanZhouZhuanLv_tips == null || _data.YingShouZhangKuanZhouZhuanLv_tips == "undefined") ? "--" : Number(_data.YingShouZhangKuanZhouZhuanLv_tips).toFixed(2)) + "天，" +
				"公司的营运能力表现" + ((_data.rankingName == null || _data.rankingName == "undefined") ? "--" : _data.rankingName) + "。</p>"
			$("#companyOperateShuoming").html(shuoming);
			var width = $(".page").width() * 0.9;
			$("#companyOperate").css("width", width);
			var myChart = echarts.init(document.getElementById('companyOperate'));
			var option = {
				legend: {
					show: true,
					data: ['存货周转天数', "应收账款周转天数"],
					top: '5%'
				},
				color: ['#62a6f2', "#feb535"],
				xAxis: {
					show: true,
					type: 'category',
					//data:['2015-11','2015-11','2015-11','2015-11']
					data: _data.portTime
				},
				yAxis: {
					show: true,
					name: '',
					type: 'value'
				},
				//			label: {
				//				normal: {
				//					show: true,
				//					position: 'top'
				//				}
				//			},
				grid: {
					show: true,
					left: '5%',
					right: '5%',
					bottom: '30%'
				},
				tooltip: {
					trigger: 'axis',
					formatter: function(params) {
						//console.log(params)
						var divHtml = "";
						divHtml += '<div class="sanban_tips">';
						divHtml += '<div class="sb_tips_content">';
						divHtml += '<span class="tips_leibie fl yyqk" style="background-color: ' + params[0].color + ';">' + params[0].seriesName + '</span>';
						if(params[0].value == "" || params[0].value == null || params[0].value == undefined) {
							divHtml += '<span class="tips_leibie_num fl">--</span>';
						} else {
							divHtml += '<span class="tips_leibie_num fl">' + params[0].value + '</span>';
						}

						divHtml += '<div class="clearfix"></div>';
						divHtml += '</div>';
						if(params[1] != "" && params[1] != null && params[1] != undefined) {
							divHtml += '<div class="sb_tips_content first-content">';
							divHtml += '<span class="tips_leibie yyqk fl" style="background-color: ' + params[1].color + ';">' + params[1].seriesName + '</span>';
							if(params[1].value == null || params[1].value == "" || params[1].value == undefined) {
								divHtml += '<span class="tips_leibie_num fl">--</span>';
							} else {
								divHtml += '<span class="tips_leibie_num fl">' + params[1].value + '</span>';
							}
							divHtml += '<div class="clearfix"></div>';
							divHtml += '</div>';
						}
						divHtml += '</div>';
						return divHtml;
					}
				},
				dataZoom: [{
					type: 'slider',
					show: true,
					start: '0',
					end: '100',
					bottom: '3%'
				}],
				series: [{
						type: 'line',
						name: '存货周转天数',
						symbol: 'circle',
						//data:[10,50,20,83]
						data: _data.CunHuoZhouZhuanLv
					},
					{
						type: 'line',
						name: '应收账款周转天数',
						symbol: 'circle',
						//data:[15,38,40,60]
						data: _data.YingShouZhangKuanZhouZhuanLv
					}
				]
			};
			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);
			obj.myimg("companyOperate", myChart, "m2559296431", 0)

			//		setScrollTos();
			window.addEventListener("resize", function() {
				myChart.resize();
			});
		});
	},
	//财务深度分析
	findFinanceDepthData: function() {
		var obj = this;
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT547", paraminfo, true, function(result) {
			var _data = result.retData;
			if(_data == null || _data == "null") {
				$("#companyFinancialDepthShuoming").hide();
				$("#companyFinancialDepth1").hide();
				//				$("#companyFinancialDepth1").after(noDataHtml());
				return false;
			}
			// UTIL.sjly("#cwsdfxly","gsyynlqk",".cw2","sjlyy");
			//UTIL.sjly("#cwsdfxly", "cwsdfx", ".cw3", "sjlyy");
			//		console.log(_data);
			var shuoming = "<p>截止到" + ((_data.portTime_tips == null || _data.portTime_tips == "undefined") ? "--" : _data.portTime_tips) + "，公司的利润率水平" + ((_data.M == null || _data.M == "undefined") ? "--" : _data.M) + "，资产负债结构" + ((_data.Z == null || _data.Z == "undefined") ? "--" : _data.Z) + "。</p>"
			$("#companyFinancialDepthShuoming").html(shuoming);
			var width = $(".page").width() * 0.9;
			$("#companyFinancialDepth1").css("width", width);
			var myChart = echarts.init(document.getElementById('companyFinancialDepth1'));
			var option = {
				legend: {
					show: true,
					data: ['销售毛利率', "销售净利率"],
					top: '5%'
				},
				color: ['#62a6f2', "#feb535"],
				xAxis: {
					show: true,
					type: 'category',
					//data:['2015-11','2015-11','2015-11','2015-11']
					data: _data.portTime
				},
				yAxis: {
					show: true,
					name: '%',
					type: 'value'
				},
				//			label: {
				//				normal: {
				//					show: true,
				//					position: 'top'
				//				}
				//			},
				grid: {
					show: true,
					left: '5%',
					right: '5%',
					bottom: '30%'
				},
				tooltip: {
					trigger: 'axis',
					formatter: function(params) {
						//console.log(params)
						var divHtml = "";
						divHtml += '<div class="sanban_tips">';
						divHtml += '<div class="sb_tips_content">';
						divHtml += '<span class="tips_leibie fl xsmll" style="background-color: ' + params[0].color + ';">' + params[0].seriesName + '</span>';
						if(params[0].value == "" || params[0].value == null || params[0].value == undefined) {
							divHtml += '<span class="tips_leibie_num fl">--</span>';
						} else {
							divHtml += '<span class="tips_leibie_num fl">' + params[0].value + '</span>';
						}

						divHtml += '<div class="clearfix"></div>';
						divHtml += '</div>';
						if(params[1] != "" && params[1] != null && params[1] != undefined) {
							divHtml += '<div class="sb_tips_content first-content">';
							divHtml += '<span class="tips_leibie fl xsmll" style="background-color: ' + params[1].color + ';">' + params[1].seriesName + '</span>';
							if(params[1].value == null || params[1].value == "" || params[1].value == undefined) {
								divHtml += '<span class="tips_leibie_num fl">--</span>';
							} else {
								divHtml += '<span class="tips_leibie_num fl">' + params[1].value + '</span>';
							}
							divHtml += '<div class="clearfix"></div>';
							divHtml += '</div>';
						}
						divHtml += '</div>';
						return divHtml;
					}
				},
				dataZoom: [{
					type: 'slider',
					show: true,
					start: '0',
					end: '100',
					bottom: '3%'
				}],
				series: [{
						type: 'line',
						name: '销售毛利率',
						symbol: 'circle',
						//data:[10,50,20,83]
						data: _data.XiaoShouMaoLiLv
					},
					{
						type: 'line',
						name: '销售净利率',
						symbol: 'circle',
						//data:[15,38,40,60]
						data: _data.XiaoShouJingLiRunLv
					}
				]
			};
			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);
			obj.myimg("companyFinancialDepth1", myChart, "m1417396287", 0)

			window.addEventListener("resize", function() {
				myChart.resize();
			});
			var width = $(".page").width() * 0.9;
			$("#companyFinancialDepth2").css("width", width);
			var myChart_1 = echarts.init(document.getElementById('companyFinancialDepth2'));
			var option_1 = {
				legend: {
					show: true,
					data: ['资产负债率', "净资产收益率(权益报酬率)"],
					top: '5%'
				},
				color: ['#62a6f2', "#feb535"],
				xAxis: {
					show: true,
					type: 'category',
					//data:['2015-11','2015-11','2015-11','2015-11']
					data: _data.portTime
				},
				yAxis: {
					show: true,
					name: '%',
					type: 'value'
				},
				//			label: {
				//				normal: {
				//					show: true,
				//					position: 'top'
				//				}
				//			},
				grid: {
					show: true,
					left: '5%',
					right: '5%',
					bottom: '30%'
				},
				tooltip: {
					trigger: 'axis',
					formatter: function(params) {
						//console.log(params)
						var divHtml = "";
						divHtml += '<div class="sanban_tips">';
						divHtml += '<div class="sb_tips_content">';
						divHtml += '<span class="tips_leibie fl zcfzl" style="background-color: ' + params[0].color + ';">' + params[0].seriesName + '</span>';
						if(params[0].value == null || params[0].value == "" || params[0].value == undefined) {
							divHtml += '<span class="tips_leibie_num fl">--</span>';
						} else {
							divHtml += '<span class="tips_leibie_num fl">' + params[0].value + '</span>';
						}

						divHtml += '<div class="clearfix"></div>';
						divHtml += '</div>';
						if(params[1] != "" && params[1] != null && params[1] != undefined) {
							divHtml += '<div class="sb_tips_content first-content">';
							divHtml += '<span class="tips_leibie fl zcfzl" style="background-color: ' + params[1].color + ';">' + params[1].seriesName + '</span>';
							if(params[1].value == null || params[1].value == "" || params[1].value == undefined) {
								divHtml += '<span class="tips_leibie_num fl">--</span>';
							} else {
								divHtml += '<span class="tips_leibie_num fl">' + params[1].value + '</span>';
							}
							divHtml += '<div class="clearfix"></div>';
							divHtml += '</div>';
						}
						divHtml += '</div>';
						return divHtml;
					}
				},
				dataZoom: [{
					type: 'slider',
					show: true,
					start: '0',
					end: '100',
					bottom: '3%'
				}],
				series: [{
						type: 'line',
						name: '资产负债率',
						symbol: 'circle',
						//data:[10,50,20,83]
						data: _data.ZiChanFuZhaiLv
					},
					{
						type: 'line',
						name: '净资产收益率(权益报酬率)',
						symbol: 'circle',
						//data:[15,38,40,60]
						data: _data.JingZiChanShouYiLv
					}
				]
			};
			// 使用刚指定的配置项和数据显示图表。
			myChart_1.setOption(option_1);
			obj.myimg("companyFinancialDepth2", myChart_1, "m1417396287", 1)

			//		setScrollTos();
			window.addEventListener("resize", function() {
				myChart_1.resize();
			});
		});
	},

	//综合能力模型分析
	findFinanceModelData: function() {
		var obj = this;
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT548", paraminfo, true, function(data) {
			var _data = data.retData;
			//		console.log(_data);
			if(_data == null || _data == "null") {
				$("#companyModelAnalysisShuoming").hide();
				$("#companyModelAnalysis").hide();
				$("#companyModelAnalysis").after(noDataHtml());
				return false;
			}
			//UTIL.sjly("#zhnlmxfxly", "zhnlmxfx", ".zhnlmxfx", "sjlyy");
			var shuoming = "<p>公司在" + ((_data.max == null || _data.max == "undefined") ? "--" : _data.max) + "方面表现突出，在" + ((_data.min == null || _data.min == "undefined") ? "--" : _data.min) + "上表现差强人意，有待加强，需要额外关注。</p>"
			$("#companyModelAnalysisShuoming").html(shuoming);
			// document.getElementById('companyModelAnalysis').style.width = document.getElementsByClassName('company-content')[0].offsetWidth * 0.8+ 'px';
			document.getElementById('companyModelAnalysis').style.height = document.getElementsByClassName('contents')[0].offsetHeight * 0.5 + 'px';
			var myChart = echarts.init(document.getElementById('companyModelAnalysis'));
			var option = {
				//			    title: {
				//			        text: '基础雷达图'
				//			    },
				//			    legend: {
				//			        data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
				//			    },
				color: ["#feb535"],
				grid: {
					left: '50%',
					right: '50%'
					//					bottom:'30%'
				},
				radar: {
					// shape: 'circle',
					name: {
						textStyle: {
							color: '#5c666e',
							// backgroundColor: '#999',
							borderRadius: 3,
							padding: [10, 10]
						}
					},
					center: ['50%', '50%'],
					radius: 120,
					indicator: [{
							name: '盈利性',
							max: 6
						},
						{
							name: '安全性',
							max: 6
						},
						{
							name: '利润质量',
							max: 6
						},
						{
							name: '运营能力',
							max: 6
						},
						{
							name: '偿债能力',
							max: 6
						},
						{
							name: '成长性',
							max: 6
						}
					]
				},
				textStyle: {
					cololr: '#000'
				},
				series: [{
					//			        name: '预算 vs 开销（Budget vs spending）',
					type: 'radar',
					symbol: 'circle',
					data: [{
						//			                value : [4300, 10000, 28000, 35000, 50000, 19000],
						value: [_data.YingLiXing, _data.AnQuanXing, _data.LiRunZiLiang, _data.YunYingNengLi, _data.ChangZhaiNengLi, _data.ChengZhangXing]
						//name : '预算分配（Allocated Budget）'
					}]
				}]
			};
			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);

			obj.myimg("companyModelAnalysis", myChart, "m4958752961", 0)

			//	    setScrollTos();
			window.addEventListener("resize", function() {
				myChart.resize();
			});
		});
	},
	//杜邦分析法
	findDubangData: function() {
		var obj = this;
		//默认隐藏掉
		//$(".yincang_1").hide();
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT532", paraminfo, true, function(data) {
			var _data = data.retData;
			var dutable = '<div class="bont-content dbfx2" id="dbtdiv" style="transform: scale(0.8,0.8);-webkit-transform: scale(0.8,0.8);margin-left:-100px">' +

				'<style type="text/css">' +
				'.dbfx2{width: 976px;overflow-x: auto;padding-left: 20px;box-sizing: border-box;}' +
				'.bont-content ul li{position: relative;}' +
				'.bont-content ul li div{position: absolute;}' +
				'.bont-content ul li span{display: table-cell;padding:2px 4px;background-color: #1985e2;color: #fff;font-size: 12px;border-radius: 5px;}' +
				'.dbzb-list{height: 36px;}' +
				'.jsfh{font-size: 14px;color: #f4363e;position: absolute;}' +
				'.dbzb-list em{display: block;width: 100%;text-align: center;font-size: 12px;}' +
				'.db-line{height: 24px;}' +
				'.db-line i{position: absolute;top: 0;}' +
				'.dbzb1{left: 50%;}' +
				'.dbzb2{left: 41%;}' +
				'.gsxx-list1{left: 54%;}' +
				'.dbzb3{left:64%;}' +
				'.dbzb4{left: 34%;}' +
				'.dbzb5{left: 66%;}' +
				'.gsxx-list2{left: 51%;}' +
				'.dbzb6{left: 25.5%;}' +
				'.dbzb7{left: 42%;}' +
				'.gsxx-list3{left:36.5%;}' +
				'.dbzb8{left: 60%;}' +
				'.dbzb9{left: 76.5%;}' +
				'.gsxx-list4{left:70.5%;}' +
				'.dbzb10{left: 0%;}' +
				'.dbzb11{left: 7.5%;}' +
				'.dbzb12{left: 16%;}' +
				'.dbzb13{left: 24%;}' +
				'.dbzb14{left: 36.5%;}' +
				'.dbzb15{left: 49%;}' +
				'.dbzb16{left: 61%;}' +
				'.dbzb17{left: 80%;}' +
				'.gsxx-list5{left:6.5%;}' +
				'.gsxx-list6{left:14%;}' +
				'.gsxx-list7{left:22.5%;}' +
				'.gsxx-list8{left:35%;}' +
				'.gsxx-list9{left:47%;}' +
				'.gsxx-list10{left:73%;}' +
				'.gsxx-list11{left:78%;}' +

				'.line1{display: inline-block;width: 230px;height: 18px;background: url(/saasBeta/js/information/images/db-icon1.png)center center no-repeat;left: 44%;}' +
				'.line2{display: inline-block;width: 330px;height: 18px;background: url(/saasBeta/js/information/images/db-icon4.png)center center no-repeat;left: 36%;}' +
				'.line3{display: inline-block;width: 180px;height: 18px;background: url(/saasBeta/js/information/images/db-icon2.png)center center no-repeat;left: 27%;}' +
				'.line4{display: inline-block;width: 170px;height: 18px;background: url(/saasBeta/js/information/images/db-icon3.png)center center no-repeat;left: 62%;}' +
				'.line5{display: inline-block;width: 496px;height: 18px;background: url(/saasBeta/js/information/images/db-icon5.png)center center no-repeat;left: 2%;}' +
				'.line6{display: inline-block;width: 202px;height: 18px;background: url(/saasBeta/js/information/images/db-icon6.png)center center no-repeat;left: 63%;}' +

				'li.li-public{height: 190px;}' +
				'.cbfy{width: 210px;height: 190px;left: 0;}' +
				'.cbfy-zb1{width: 100%;height: 190px;}' +
				'.dbzb18{left: 32%;top: 10%;}' +
				'.cbfy-zb2{width: 18px;height: 190px;left: 45%;}' +
				'.cbfy-zb2 i{width: 18px;height: 190px;display: block; background: url(/saasBeta/js/information/images/db-icon7.png)top center no-repeat;}' +
				'.cbfy-zb1{width: 96px;left: 0%;}' +
				'.cbfy-zb3{width: 96px;left:57%;}' +
				'li .cbfy-zb3 div{left: 0;}' +
				'.jsfs1{top: 31%;left: 60%;}' +
				'.jsfs2{top: 65%;left: 58%;}' +

				'.dbzb19{top:43%;left: 33%;}' +
				'.dbzb20{top:78%;}' +

				'.cbfy-zb3{height: 190px;}' +
				'.dbzb21{top: 10%;}' +
				'.dbzb22{top: 42%;}' +
				'.dbzb23{top: 78%;}' +
				'li .cbfy-zb3 div.jsfs3{top: 31%;left: 27%;}' +
				'li .cbfy-zb3 div.jsfs4{top: 65%;left: 27%;}' +

				'.ldzc{width: 170px;height: 190px;left: 56%;}' +
				'.ldzc-zb1{width: 66px;height: 190px;left: 0;}' +
				'.ldzc-line{width: 20px;height: 190px;left: 36%;}' +
				'.ldzc-line i{display: block; width: 20px;height: 190px;background: url(/saasBeta/js/information/images/db-icon8.png)top center no-repeat;}' +
				'.ldzc-zb2{width: 120px;height: 190px;left: 53%;}' +
				'.dbzb24{top: 8%;}' +
				'.dbzb25{top: 46%;}' +
				'.jsfs5{top: 31%;left: 40%;}' +
				'.dbzb26{top:8%}' +
				'.dbzb27{top:46%}' +
				'.dbzb28{top:78%}' +
				'.jsfs6{top: 31%;left: 18%;}' +
				'.jsfs7{top: 67%;left: 18%;}' +

				'.fldzc{width: 190px;height: 190px;left: 75%;}' +
				'.fldzc-zb1{width: 88px;height: 190px;}' +
				'.fldzc-line{width: 18px;height: 190px;left: 43%;}' +
				'.fldzc-line i{display: block;width: 18px;height: 190px;background: url(/saasBeta/js/information/images/db-icon9.png)top center no-repeat;}' +
				'.fldzc-zb2{width: 108px;height: 190px;left:54%;}' +
				'.dbzb31,.dbzb29{top: 8%;}' +
				'.dbzb29{left: 23%;}' +
				'.dbzb30,.dbzb32{top: 43%;}' +
				'.jsfs8{top: 31%;left: 40%;}' +
				'.jsfs9{top: 31%;left: 25%;}' +
				'</style>' +
				'<ul style="list-style: none;">' +
				'<li class="dbzb-list" style="position: relative;height: 36px;">' +
				'<div class="dbzb1" style="position: absolute;left:50%">' +
				'<span style="display: table-cell;padding:2px 4px;background-color: #1985e2;color: #fff;font-size: 12px;border-radius: 5px;">净资产收益率ROE</span>' +
				'<em class="JingZiChanShouYiLv_dubang" style="display: block;width: 100%;text-align: center;font-size: 12px;">15.62%</em>' +
				'</div>' +
				'</li>' +
				'<li class="db-line" style="position:relative;height: 24px;"><i class="line1" style="position: absolute;top:0;display: inline-block;width: 230px;height: 18px;background: url(/saasBeta/js/information/images/db-icon1.png)center center no-repeat;left: 44%;"></i></li>' +
				'<li class="dbzb-list" style="position: relative;height:36px">' +
				'<div class="dbzb2" style="position: absolute;left:41%">' +
				'<span style="display: table-cell;padding:2px 4px;background-color: #1985e2;color: #fff;font-size: 12px;border-radius: 5px;">总资产收益率</span>' +
				'<em class="ZongZiChanShouYiLv_dubang" style="display: block;width: 100%;text-align: center;font-size: 12px;">13.19%</em>' +
				'</div>' +
				'<div class="gsxx-list1 jsfh" style="position: absolute;left:54%">x</div>' +
				'<div class="dbzb3" style="position: absolute;">' +
				'<span style="display: table-cell;padding:2px 4px;background-color: #1985e2;color: #fff;font-size: 12px;border-radius: 5px;">权益乘数</span>' +
				'<em class="QuanYiChengShu_dubang" style="display: block;width: 100%;text-align: center;font-size: 12px;">1.18</em>' +
				'</div>' +
				'</li>' +
				'<li class="db-line"><i class="line2"></i></li>' +
				'<li class="dbzb-list">' +
				'<div class="dbzb4">' +
				'<span style="display: table-cell;padding:2px 4px;background-color: #1985e2;color: #fff;font-size: 12px;border-radius: 5px;">营收利润率</span>' +
				'<em class="XiaoShouJingLiRunLv_dubang" style="display: block;width: 100%;text-align: center;font-size: 12px;">23.24%</em>' +
				'</div>' +
				'<div class="gsxx-list2 jsfh">x</div>' +
				'<div class="dbzb5">' +
				'<span style="display: table-cell;padding:2px 4px;background-color: #1985e2;color: #fff;font-size: 12px;border-radius: 5px;">总资产周转率</span>' +
				'<em class="ZongZiChanZhouZhuanLv_dubang" style="display: block;width: 100%;text-align: center;font-size: 12px;">0.57</em>' +
				'</div>' +
				'</li>' +
				'<li class="db-line">' +
				'<i class="line3"></i>' +
				'<i class="line4"></i>' +
				'</li>' +
				'<li class="dbzb-list">' +
				'<div class="dbzb6">' +
				'<span style="display: table-cell;padding:2px 4px;background-color: #1985e2;color: #fff;font-size: 12px;border-radius: 5px;">净利润</span>' +
				'<em class="f2JLR_dubang" style="display: block;width: 100%;text-align: center;font-size: 12px;">50,868.89</em>' +
				'</div>' +
				'<div class="gsxx-list3 jsfh">÷</div>' +
				'<div class="dbzb7">' +
				'<span style="display: table-cell;padding:2px 4px;background-color: #1985e2;color: #fff;font-size: 12px;border-radius: 5px;">营业收入</span>' +
				'<em class="f2YYZSR_dubang_1" style="display: block;width: 100%;text-align: center;font-size: 12px;">218,877.10</em>' +
				'</div>' +
				'<div class="dbzb8">' +
				'<span style="display: table-cell;padding:2px 4px;background-color: #1985e2;color: #fff;font-size: 12px;border-radius: 5px;">营业收入</span>' +
				'<em class="f2YYZSR_dubang_2" style="display: block;width: 100%;text-align: center;font-size: 12px;">218,877.10</em>' +
				'</div>' +
				'<div class="gsxx-list4 jsfh">÷</div>' +
				'<div class="dbzb9">' +
				'<span style="display: table-cell;padding:2px 4px;background-color: #1985e2;color: #fff;font-size: 12px;border-radius: 5px;">总资产</span>' +
				'<em class="f1ZCZJ_dubang" style="display: block;width: 100%;text-align: center;font-size: 12px;">385,697.84</em>' +
				'</div>' +
				'</li>' +
				'<li class="db-line yincang_1" style="display: list-item;">' +
				'<i class="line5"></i>' +
				'<i class="line6"></i>' +
				'</li>' +
				'<li class="dbzb-list yincang_1" style="display: list-item;">' +
				'<div class="dbzb10">' +
				'<span style="display: table-cell;padding:2px 4px;background-color: #1985e2;color: #fff;font-size: 12px;border-radius: 5px;">营业收入</span>' +
				'<em class="f2YYZSR_dubang_3" style="display: block;width: 100%;text-align: center;font-size: 12px;">218,877.10</em>' +
				'</div>' +
				'<div class="gsxx-list5 jsfh">-</div>' +
				'<div class="dbzb11">' +
				'<span style="display: table-cell;padding:2px 4px;background-color: #1985e2;color: #fff;font-size: 12px;border-radius: 5px;">成本费用</span>' +
				'<em class="f2CBFY_dubang" style="display: block;width: 100%;text-align: center;font-size: 12px;">151,099.30</em>' +
				'</div>' +
				'<div class="gsxx-list6 jsfh">+</div>' +
				'<div class="dbzb12">' +
				'<span style="display: table-cell;padding:2px 4px;background-color: #1985e2;color: #fff;font-size: 12px;border-radius: 5px;">投资收益</span>' +
				'<em class="f2TZSY_dubang" style="display: block;width: 100%;text-align: center;font-size: 12px;">18.12</em>' +
				'</div>' +
				'<div class="gsxx-list7 jsfh">+</div>' +
				'<div class="dbzb13">' +
				'<span style="display: table-cell;padding:2px 4px;background-color: #1985e2;color: #fff;font-size: 12px;border-radius: 5px;">公允价值变动损益</span>' +
				'<em class="f2JGYJZBDSY_dubang" style="display: block;width: 100%;text-align: center;font-size: 12px;">--</em>' +
				'</div>' +
				'<div class="gsxx-list8 jsfh">+</div>' +
				'<div class="dbzb14">' +
				'<span style="display: table-cell;padding:2px 4px;background-color: #1985e2;color: #fff;font-size: 12px;border-radius: 5px;">业务外收支净额</span>' +
				'<em class="f2YWWSZJE_dubang" style="display: block;width: 100%;text-align: center;font-size: 12px;">-19.60</em>' +
				'</div>' +
				'<div class="gsxx-list9 jsfh">-</div>' +
				'<div class="dbzb15">' +
				'<span style="display: table-cell;padding:2px 4px;background-color: #1985e2;color: #fff;font-size: 12px;border-radius: 5px;">所得税费用</span>' +
				'<em class="f2JSDSFY_dubang" style="display: block;width: 100%;text-align: center;font-size: 12px;">16,907.42</em>' +
				'</div>' +
				'<div class="dbzb16">' +
				'<span style="display: table-cell;padding:2px 4px;background-color: #1985e2;color: #fff;font-size: 12px;border-radius: 5px;">流动资产</span>' +
				'<em class="f1LDZCHJ_dubang" style="display: block;width: 100%;text-align: center;font-size: 12px;">346,781.20</em>' +
				'</div>' +
				'<div class="gsxx-list10 jsfh">+</div>' +
				'<div class="dbzb17">' +
				'<span style="display: table-cell;padding:2px 4px;background-color: #1985e2;color: #fff;font-size: 12px;border-radius: 5px;">非流动资产</span>' +
				'<em class="f1FLDZCHJ_dubang" style="display: block;width: 100%;text-align: center;font-size: 12px;">38,916.64</em>' +
				'</div>' +
				'</li>' +
				'<li class="dbzb-list li-public yincang_1" style="display: list-item;">' +
				'<div class="cbfy">' +
				'<div class="cbfy-zb1">' +
				'<div class="dbzb18">' +
				'<span style="display: table-cell;padding:2px 4px;background-color: #1985e2;color: #fff;font-size: 12px;border-radius: 5px;">营业成本</span>' +
				'<em class="f2QZYYCB_dubang" style="display: block;width: 100%;text-align: center;font-size: 12px;">103,924.03</em>' +
				'</div>' +
				'<div class="jsfh jsfs1">+</div>' +
				'<div class="dbzb19">' +
				'<span style="display: table-cell;padding:2px 4px;background-color: #1985e2;color: #fff;font-size: 12px;border-radius: 5px;">管理费用</span>' +
				'<em class="f2GLFY_dubang" style="display: block;width: 100%;text-align: center;font-size: 12px;">6,689.21</em>' +
				'</div>' +
				'<div class="jsfh jsfs2">+</div>' +
				'<div class="dbzb20">' +
				'<span style="display: table-cell;padding:2px 4px;background-color: #1985e2;color: #fff;font-size: 12px;border-radius: 5px;">营业税金及附加</span>' +
				'<em class="f2YYSJJFJ_dubang" style="display: block;width: 100%;text-align: center;font-size: 12px;">3,279.86</em>' +
				'</div>' +
				'</div>' +
				'<div class="cbfy-zb2"><i></i></div>' +
				'<div class="cbfy-zb3">' +
				'<div class="dbzb21">' +
				'<span style="display: table-cell;padding:2px 4px;background-color: #1985e2;color: #fff;font-size: 12px;border-radius: 5px;">销售费用</span>' +
				'<em class="f2XSFY_dubang_3" style="display: block;width: 100%;text-align: center;font-size: 12px;">39,157.83</em>' +
				'</div>' +
				'<div class="jsfh jsfs3">+</div>' +
				'<div class="dbzb22">' +
				'<span style="display: table-cell;padding:2px 4px;background-color: #1985e2;color: #fff;font-size: 12px;border-radius: 5px;">财务费用</span>' +
				'<em class="f2CWFY_dubang" style="display: block;width: 100%;text-align: center;font-size: 12px;">-2,192.93</em>' +
				'</div>' +
				'<div class="jsfh jsfs4">+</div>' +
				'<div class="dbzb23">' +
				'<span style="display: table-cell;padding:2px 4px;background-color: #1985e2;color: #fff;font-size: 12px;border-radius: 5px;">资产减值损失</span>' +
				'<em class="f2ZCJZSS_dubang" style="display: block;width: 100%;text-align: center;font-size: 12px;">241.30</em>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'<div class="ldzc">' +
				'<div class="ldzc-zb1">' +
				'<div class="dbzb24">' +
				'<span style="display: table-cell;padding:2px 4px;background-color: #1985e2;color: #fff;font-size: 12px;border-radius: 5px;">货币资金</span>' +
				'<em class="f1HBZJ_dubang" style="display: block;width: 100%;text-align: center;font-size: 12px;">298,946.42</em>' +
				'</div>' +
				'<div class="jsfh jsfs5">+</div>' +
				'<div class="dbzb25">' +
				'<span style="display: table-cell;padding:2px 4px;background-color: #1985e2;color: #fff;font-size: 12px;border-radius: 5px;">应收账款</span>' +
				'<em class="f1YSZK_dubang" style="display: block;width: 100%;text-align: center;font-size: 12px;">14,370.97</em>' +
				'</div>' +
				'</div>' +
				'<div class="ldzc-line"><i></i></div>' +
				'<div class="ldzc-zb2">' +
				'<div class="dbzb26">' +
				'<span style="display: table-cell;padding:2px 4px;background-color: #1985e2;color: #fff;font-size: 12px;border-radius: 5px;">预付款项</span>' +
				'<em class="f1YFKX_dubang" style="display: block;width: 100%;text-align: center;font-size: 12px;">546.78</em>' +
				'</div>' +
				'<div class="jsfh jsfs6">+</div>' +
				'<div class="dbzb27">' +
				'<span style="display: table-cell;padding:2px 4px;background-color: #1985e2;color: #fff;font-size: 12px;border-radius: 5px;">存货</span>' +
				'<em class="f1CH_dubang" style="display: block;width: 100%;text-align: center;font-size: 12px;">29,385.56</em>' +
				'</div>' +
				'<div class="jsfh jsfs7">+</div>' +
				'<div class="dbzb28">' +
				'<span style="display: table-cell;padding:2px 4px;background-color: #1985e2;color: #fff;font-size: 12px;border-radius: 5px;">其他流动资产</span>' +
				'<em class="f1QTLDZC_dubang" style="display: block;width: 100%;text-align: center;font-size: 12px;">3,531.47</em>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'<div class="fldzc">' +
				'<div class="fldzc-zb1">' +
				'<div class="dbzb29">' +
				'<span style="display: table-cell;padding:2px 4px;background-color: #1985e2;color: #fff;font-size: 12px;border-radius: 5px;">固定资产</span>' +
				'<em class="f1GDZC_dubang" style="display: block;width: 100%;text-align: center;font-size: 12px;">32,666.01</em>' +
				'</div>' +
				'<div class="jsfh jsfs8">+</div>' +
				'<div class="dbzb30">' +
				'<span style="display: table-cell;padding:2px 4px;background-color: #1985e2;color: #fff;font-size: 12px;border-radius: 5px;">长期期权投资</span>' +
				'<em class="f1CQGQTZ_dubang" style="display: block;width: 100%;text-align: center;font-size: 12px;">--</em>' +
				'</div>' +
				'</div>' +
				'<div class="fldzc-line"><i></i></div>' +
				'<div class="fldzc-zb2">' +
				'<div class="dbzb31">' +
				'<span style="display: table-cell;padding:2px 4px;background-color: #1985e2;color: #fff;font-size: 12px;border-radius: 5px;">无形资产</span>' +
				'<em class="f1WXZC_dubang" style="display: block;width: 100%;text-align: center;font-size: 12px;">1,656.65</em>' +
				'</div>' +
				'<div class="jsfh jsfs9">+</div>' +
				'<div class="dbzb32">' +
				'<span style="display: table-cell;padding:2px 4px;background-color: #1985e2;color: #fff;font-size: 12px;border-radius: 5px;">其他非流动资产</span>' +
				'<em class="f1QTFLDZC_dubang" style="display: block;width: 100%;text-align: center;font-size: 12px;">4,593.98</em>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'</li>' +

				'</ul></div>';
			$("#dubang").html(dutable);
			sub_dubangtu(".dbfx2", _data);
			// console.log(_data);
			//净资产收益率
			//		$("#JingZiChanShouYiLv_dubang").text(_data.JingZiChanShouYiLv==null?"--":(_data.JingZiChanShouYiLv).toFixed(2)+"%");
			//		$("#ZongZiChanShouYiLv_dubang").text(_data.ZongZiChanShouYiLv==null?"--":(_data.ZongZiChanShouYiLv).toFixed(2)+"%");

			if(isShowmodel) {
				obj.fileInit("m4905685123", 0, 1,dutable);
				sub_dubangtu("#m4905685123_0", _data);
				return;
				if(isIe())
				{
                   //document.getElementById("m4905685123_0").style.transform  = "scale(0.7,0.7)";
                   return;
				}
				html2canvas($(".dbfx2"), {
					onrendered: function(canvas) {
						var imgURL = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
						$("#m4905685123_0 #dbt").attr("src", imgURL);
						$("#m4905685123_0 #dbt").css("display", "block");
						var po = document.getElementById("m4905685123_0");
					    po.removeChild(po.childNodes[1]);
					    obj.fileInit("m4905685123", 0, 1, po.innerHTML);
					}
				});
			}
		});

		function sub_dubangtu(objname, _data) {
			//      	console.log($(objname + "  .QuanYiChengShu_dubang"));
			$(objname + "  .QuanYiChengShu_dubang").html(_data.QuanYiChengShu == null ? "--" : (_data.QuanYiChengShu).toFixed(2));

			//营收利润率
			var XiaoShouJingLiRunLv = ((_data.f2JLR) / (_data.f2QZYYSR)) * 100;
			$(objname + "  .XiaoShouJingLiRunLv_dubang").html(XiaoShouJingLiRunLv == null ? "--" : (XiaoShouJingLiRunLv).toFixed(2) + "%");
			//$("#XiaoShouJingLiRunLv_dubang").text(_data.XiaoShouJingLiRunLv == null ? "--" : UTIL.fmtNum3((_data.XiaoShouJingLiRunLv).toFixed(2)) + "%");
			//		$("#ZongZiChanZhouZhuanLv_dubang").text(_data.ZongZiChanZhouZhuanLv==null?"--":(_data.ZongZiChanZhouZhuanLv).toFixed(2));
			$(objname + "  .f2JLR_dubang").html(_data.f2JLR == null ? "--" : (_data.f2JLR / 10000.00).toFixed(2));
			$(objname + "  .f2YYZSR_dubang_1").html(_data.f2QZYYSR == null ? "--" : (_data.f2QZYYSR / 10000.00).toFixed(2));
			$(objname + "  .f2YYZSR_dubang_2").html(_data.f2QZYYSR == null ? "--" : (_data.f2QZYYSR / 10000.00).toFixed(2));
			$(objname + "  .f1ZCZJ_dubang").html(_data.f1ZCZJ == null ? "--" : (_data.f1ZCZJ / 10000.00).toFixed(2));
			//上面的数据需要重新计算
			var ZongZiChanZhouZhuanLv = (_data.f2QZYYSR == null ? 0 : (_data.f2QZYYSR / 10000.00)) / (_data.f1ZCZJ == null ? 0 : (_data.f1ZCZJ / 10000.00));
			$(objname + "  .ZongZiChanZhouZhuanLv_dubang").html(ZongZiChanZhouZhuanLv.toFixed(2));
			var ZongZiChanShouYiLv = (XiaoShouJingLiRunLv == null ? 0 : (XiaoShouJingLiRunLv)) * ZongZiChanZhouZhuanLv
			$(objname + "  .ZongZiChanShouYiLv_dubang").html(ZongZiChanShouYiLv.toFixed(2) + "%");
			var JingZiChanShouYiLv = ZongZiChanShouYiLv * (_data.QuanYiChengShu == null ? 0 : (_data.QuanYiChengShu));
			$(objname + "  .JingZiChanShouYiLv_dubang").html(JingZiChanShouYiLv.toFixed(2) + "%");
			//新增下面层级：如果不是一般类公司不显示下面的成绩
			if(_data.companyType == 1 || _data.companyType == "1") {
				$(".yincang_1").show();

				//净利润下面的数据
				$(objname + "  .f2YYZSR_dubang_3").html(_data.f2QZYYSR == null ? "--" : (_data.f2QZYYSR / 10000.00).toFixed(2));
				//需要计算:营业成本	＋	销售费用 ＋	管理费用 ＋	财务费用 ＋	营业税金及附加	＋	资产减值损失
				var f2CBFY = (_data.f2QZYYCB == null ? 0 : (_data.f2QZYYCB / 10000.00)) +
					(_data.f2XSFY == null ? 0 : (_data.f2XSFY / 10000.00)) +
					(_data.f2GLFY == null ? 0 : (_data.f2GLFY / 10000.00)) +
					(_data.f2CWFY == null ? 0 : (_data.f2CWFY / 10000.00)) +
					(_data.f2YYSJJFJ == null ? 0 : (_data.f2YYSJJFJ / 10000.00)) +
					(_data.f2ZCJZSS == null ? 0 : (_data.f2ZCJZSS / 10000.00));
				$(objname + "  .f2CBFY_dubang").html(f2CBFY.toFixed(2));
				$(objname + "  .f2TZSY_dubang").html(_data.f2TZSY == null ? "--" : (_data.f2TZSY / 10000.00).toFixed(2));
				$(objname + "  .f2JGYJZBDSY_dubang").html(_data.f2JGYJZBDSY == null ? "--" : (_data.f2JGYJZBDSY / 10000.00).toFixed(2));

				//需要计算:营业外收入 - 营业外支出
				var f2YWWSZJE = (_data.f2YYWSR == null ? 0 : (_data.f2YYWSR / 10000.00)) - (_data.f2YYWZC == null ? 0 : (_data.f2YYWZC / 10000.00));
				$(objname + "  .f2YWWSZJE_dubang").html(f2YWWSZJE.toFixed(2));

				$(objname + "  .f2JSDSFY_dubang").html(_data.f2JSDSFY == null ? "--" : (_data.f2JSDSFY / 10000.00).toFixed(2));

				//成本费用下面的数据
				$(objname + "  .f2QZYYCB_dubang").html(_data.f2QZYYCB == null ? "--" : (_data.f2QZYYCB / 10000.00).toFixed(2));
				$(objname + "  .f2GLFY_dubang").html(_data.f2GLFY == null ? "--" : (_data.f2GLFY / 10000.00).toFixed(2));
				$(objname + "  .f2YYSJJFJ_dubang").html(_data.f2YYSJJFJ == null ? "--" : (_data.f2YYSJJFJ / 10000.00).toFixed(2));
				$(objname + "  .f2XSFY_dubang_3").html(_data.f2XSFY == null ? "--" : (_data.f2XSFY / 10000.00).toFixed(2));
				$(objname + "  .f2CWFY_dubang").html(_data.f2CWFY == null ? "--" : (_data.f2CWFY / 10000.00).toFixed(2));
				$(objname + "  .f2ZCJZSS_dubang").html(_data.f2ZCJZSS == null ? "--" : (_data.f2ZCJZSS / 10000.00).toFixed(2));

				//总资产下面的数据
				$(objname + "  .f1LDZCHJ_dubang").html(_data.f1LDZCHJ == null ? "--" : (_data.f1LDZCHJ / 10000.00).toFixed(2));
				$(objname + "  .f1FLDZCHJ_dubang").html(_data.f1FLDZCHJ == null ? "--" : (_data.f1FLDZCHJ / 10000.00).toFixed(2));

				//流动资产下面的数据
				$(objname + "  .f1HBZJ_dubang").html(_data.f1HBZJ == null ? "--" : (_data.f1HBZJ / 10000.00).toFixed(2));
				$(objname + "  .f1YFKX_dubang").html(_data.f1YFKX == null ? "--" : (_data.f1YFKX / 10000.00).toFixed(2));
				$(objname + "  .f1YSZK_dubang").html(_data.f1YSZK == null ? "--" : (_data.f1YSZK / 10000.00).toFixed(2));
				$(objname + "  .f1CH_dubang").html(_data.f1CH == null ? "--" : (_data.f1CH / 10000.00).toFixed(2));
				//需要计算：流动资产 - 货币资金	-	预付款项	-	应收账款 - 存货

				var f1QTLDZC = (_data.f1LDZCHJ == null ? 0 : (_data.f1LDZCHJ / 10000.00)) -
					(_data.f1HBZJ == null ? 0 : (_data.f1HBZJ / 10000.00)) -
					(_data.f1YFKX == null ? 0 : (_data.f1YFKX / 10000.00)) -
					(_data.f1YSZK == null ? 0 : (_data.f1YSZK / 10000.00)) -
					(_data.f1CH == null ? 0 : (_data.f1CH / 10000.00));

				$(objname + "  .f1QTLDZC_dubang").html(f1QTLDZC.toFixed(2));

				//非流动资产下面的数据
				//流动资产下面的数据
				$(objname + "  .f1GDZC_dubang").html(_data.f1GDZC == null ? "--" : (_data.f1GDZC / 10000.00).toFixed(2));
				$(objname + "  .f1WXZC_dubang").html(_data.f1WXZC == null ? "--" : (_data.f1WXZC / 10000.00).toFixed(2));
				$(objname + "  .f1CQGQTZ_dubang").html(_data.f1CQGQTZ == null ? "--" : (_data.f1CQGQTZ / 10000.00).toFixed(2));
				//需要计算：流动资产 - 货币资金	-	预付款项	-	应收账款 - 存货

				var f1QTFLDZC = (_data.f1FLDZCHJ == null ? 0 : (_data.f1FLDZCHJ / 10000.00)) -
					(_data.f1GDZC == null ? 0 : (_data.f1GDZC / 10000.00)) -
					(_data.f1WXZC == null ? 0 : (_data.f1WXZC / 10000.00)) -
					(_data.f1CQGQTZ == null ? 0 : (_data.f1CQGQTZ / 10000.00));

				$(objname + "  .f1QTFLDZC_dubang").html(f1QTFLDZC.toFixed(2));
			}
		}
	},
	//盈利预测表
	findProfitForecastData: function() {
		var obj = this;
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT533", paraminfo, true, function(result) {
			var _data = result.retData;
			var ylyctable = '<div class="">' +
				'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
				'<table style="width:98%" class="tablemodel">' +
				'<thead>' +
				'<tr>' +
				'<th class="yuceStockCode">--</th>' +
				'<th class="shuzi">2016A</th>' +
				'<th class="shuzi">2017E</th>' +
				'<th class="shuzi">2018E</th>' +
				'<th class="shuzi">2019E</th>' +
				'</tr>' +
				'</thead>' +
				'<tbody>' +
				'<tr class="yuce_f2QZYYSR">' +
				'<td>营业收入(万元)</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'</tr>' +
				'<tr class="yuce_f2QZYYCB">' +
				'<td>营业成本(万元)</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'</tr>' +
				'<tr class="yuce_f2CWFY">' +
				'<td>财务费用(万元)</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'</tr>' +
				'<tr class="yuce_f2LRZE">' +
				'<td>利润总额(万元)</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'</tr>' +
				'<tr class="yuce_f2JSDSFY">' +
				'<td>所得税费用(万元)</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'</tr>' +
				'<tr class="yuce_f2JLR">' +
				'<td>净利润(万元)</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'</tr>' +
				'<tr class="yuce_MeiGuShouYi">' +
				'<td>EPS(元/股)</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'</tr>' +
				'<tr class="yuce_XiShuiQianLiRun">' +
				'<td>EBIT(万元)</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'</tr>' +
				'<tr class="yuce_f1LDZCHJ">' +
				'<td>流动资产(万元)</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'</tr>' +
				'<tr class="yuce_f1HBZJ">' +
				'<td>货币资金(万元)</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'</tr>' +
				'<tr class="yuce_f1YSZK">' +
				'<td>应收账款(万元)</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'</tr>' +
				'<tr class="yuce_f1CH">' +
				'<td>存货(万元)</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'</tr>' +
				'<tr class="yuce_f1GDZC">' +
				'<td>固定资产(万元)</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'</tr>' +
				'<tr class="yuce_f1ZCZJ">' +
				'<td>资产总计(万元)</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'</tr>' +
				'<tr class="yuce_f1LDFZHJ">' +
				'<td>流动负债(万元)</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'</tr>' +
				'<tr class="yuce_f1YFZK">' +
				'<td>应付账款(万元)</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'</tr>' +
				'<tr class="yuce_f1FZHJ">' +
				'<td>负债合计(万元)</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'</tr>' +
				'<tr class="yuce_GB">' +
				'<td>股本(万股)</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'</tr>' +
				'<tr class="yuce_f1SYZQYHJ">' +
				'<td>所有者权益(万元)</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'</tr>' +
				'<tr class="yuce_ZongZiChanShouYiLv">' +
				'<td>ROA(%)</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'</tr>' +
				'<tr class="yuce_JingZiChanShouYiLv">' +
				'<td>ROE(%)</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'</tr>' +
				'<tr class="yuce_LiuDongBiLv">' +
				'<td>流动比率</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'</tr>' +
				'<tr class="yuce_LiXiBaoZhangBeiShu">' +
				'<td>利息保障倍数</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'</tr>' +
				'<tr class="yuce_f3JYHDCSDXJLLJE">' +
				'<td>经营现金流净额(万元)</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'</tr>' +
				'<tr class="yuce_ShiYingLv">' +
				'<td>PE</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'<td class="shuzi">--</td>' +
				'</tr>' +
				'</tbody>' +
				'</table></div>'
			$(".ylycbDiv .ylyc-table").html(ylyctable);
			yuce_tabledata(".tablemodel", _data);
			if(isShowmodel) {
				obj.fileInit("m567070645", 0, 1, ylyctable);
				yuce_tabledata("#m567070645_0", _data);
			}

		});

		function yuce_tabledata(objname, _data) {
			$(objname + "  .yuceStockCode").html(_data.stockName + "(" + _data.stockCode + ")");
			$.each(_data.portTime, function(index, item) {
				//营业收入
				var f2QZYYSR_value = (_data.f2QZYYSR)[index] == null ? "--" : (_data.f2QZYYSR)[index];
				if(f2QZYYSR_value != "--") {
					if(_data.f2QZYYSR_showUnit.indexOf("亿") > -1) {
						f2QZYYSR_value = (f2QZYYSR_value / 100000000.00).toFixed(2);
					} else if(_data.f2QZYYSR_showUnit.indexOf("万") > -1) {
						f2QZYYSR_value = (f2QZYYSR_value / 10000.00).toFixed(2);
					}
				}
				$(objname + "  .yuce_f2QZYYSR").find("td").eq(index + 1).html(f2QZYYSR_value);
				//营业成本
				var f2QZYYCB_value = (_data.f2QZYYCB)[index] == null ? "--" : (_data.f2QZYYCB)[index];
				if(f2QZYYCB_value != "--") {
					if(_data.f2QZYYCB_showUnit.indexOf("亿") > -1) {
						f2QZYYCB_value = (f2QZYYCB_value / 100000000.00).toFixed(2);
					} else if(_data.f2QZYYCB_showUnit.indexOf("万") > -1) {
						f2QZYYCB_value = (f2QZYYCB_value / 10000.00).toFixed(2);
					}
				}
				$(objname + "  .yuce_f2QZYYCB").find("td").eq(index + 1).html(f2QZYYCB_value);
				//财务费用
				var f2CWFY_value = (_data.f2CWFY)[index] == null ? "--" : (_data.f2CWFY)[index];
				if(f2CWFY_value != "--") {
					if(_data.f2CWFY_showUnit.indexOf("亿") > -1) {
						f2CWFY_value = (f2CWFY_value / 100000000.00).toFixed(2);
					} else if(_data.f2CWFY_showUnit.indexOf("万") > -1) {
						f2CWFY_value = (f2CWFY_value / 10000.00).toFixed(2);
					}
				}
				$(objname + "  .yuce_f2CWFY").find("td").eq(index + 1).html(f2CWFY_value);
				//利润总额
				var f2LRZE_value = (_data.f2LRZE)[index] == null ? "--" : (_data.f2LRZE)[index];
				if(f2LRZE_value != "--") {
					if(_data.f2LRZE_showUnit.indexOf("亿") > -1) {
						f2LRZE_value = (f2LRZE_value / 100000000.00).toFixed(2);
					} else if(_data.f2LRZE_showUnit.indexOf("万") > -1) {
						f2LRZE_value = (f2LRZE_value / 10000.00).toFixed(2);
					}
				}
				$(objname + "  .yuce_f2LRZE").find("td").eq(index + 1).html(f2LRZE_value);
				//所得税费用
				var f2JSDSFY_value = (_data.f2JSDSFY)[index] == null ? "--" : (_data.f2JSDSFY)[index];
				if(f2JSDSFY_value != "--") {
					if(_data.f2JSDSFY_showUnit.indexOf("亿") > -1) {
						f2JSDSFY_value = (f2JSDSFY_value / 100000000.00).toFixed(2);
					} else if(_data.f2JSDSFY_showUnit.indexOf("万") > -1) {
						f2JSDSFY_value = (f2JSDSFY_value / 10000.00).toFixed(2);
					}
				}
				$(objname + "  .yuce_f2JSDSFY").find("td").eq(index + 1).html(f2JSDSFY_value);
				//净利润
				var f2JLR_value = (_data.f2JLR)[index] == null ? "--" : (_data.f2JLR)[index];
				if(f2JLR_value != "--") {
					if(_data.f2JLR_showUnit.indexOf("亿") > -1) {
						f2JLR_value = (f2JLR_value / 100000000.00).toFixed(2);
					} else if(_data.f2QZYYSR_showUnit.indexOf("万") > -1) {
						f2JLR_value = (f2JLR_value / 10000.00).toFixed(2);
					}
				}
				$(objname + "  .yuce_f2JLR").find("td").eq(index + 1).html(f2JLR_value);
				//每股收益-EPS
				var MeiGuShouYi_value = (_data.MeiGuShouYi)[index] == null ? "--" : ((_data.MeiGuShouYi)[index]).toFixed(2);
				$(objname + "  .yuce_MeiGuShouYi").find("td").eq(index + 1).html(MeiGuShouYi_value);
				//息税前利润-EBIT
				var XiShuiQianLiRun_value = (_data.XiShuiQianLiRun)[index] == null ? "--" : (_data.XiShuiQianLiRun)[index];
				if(XiShuiQianLiRun_value != "--") {
					if(_data.XiShuiQianLiRun_showUnit.indexOf("亿") > -1) {
						XiShuiQianLiRun_value = (XiShuiQianLiRun_value / 100000000.00).toFixed(2);
					} else if(_data.XiShuiQianLiRun_showUnit.indexOf("万") > -1) {
						XiShuiQianLiRun_value = (XiShuiQianLiRun_value / 10000.00).toFixed(2);
					}
				}
				$(objname + "  .yuce_XiShuiQianLiRun").find("td").eq(index + 1).html(XiShuiQianLiRun_value);
				//流动资产
				var f1LDZCHJ_value = (_data.f1LDZCHJ)[index] == null ? "--" : (_data.f1LDZCHJ)[index];
				if(f1LDZCHJ_value != "--") {
					if(_data.f1LDZCHJ_showUnit.indexOf("亿") > -1) {
						f1LDZCHJ_value = (f1LDZCHJ_value / 100000000.00).toFixed(2);
					} else if(_data.f1LDZCHJ_showUnit.indexOf("万") > -1) {
						f1LDZCHJ_value = (f1LDZCHJ_value / 10000.00).toFixed(2);
					}
				}
				$(objname + "  .yuce_f1LDZCHJ").find("td").eq(index + 1).html(f1LDZCHJ_value);
				//货币资金
				var f1HBZJ_value = (_data.f1HBZJ)[index] == null ? "--" : (_data.f1HBZJ)[index];
				if(f1HBZJ_value != "--") {
					if(_data.f1HBZJ_showUnit.indexOf("亿") > -1) {
						f1HBZJ_value = (f1HBZJ_value / 100000000.00).toFixed(2);
					} else if(_data.f1HBZJ_showUnit.indexOf("万") > -1) {
						f1HBZJ_value = (f1HBZJ_value / 10000.00).toFixed(2);
					}
				}
				$(objname + "  .yuce_f1HBZJ").find("td").eq(index + 1).html(f1HBZJ_value);
				//应收账款
				var f1YSZK_value = (_data.f1YSZK)[index] == null ? "--" : (_data.f1YSZK)[index];
				if(f1YSZK_value != "--") {
					if(_data.f1YSZK_showUnit.indexOf("亿") > -1) {
						f1YSZK_value = (f1YSZK_value / 100000000.00).toFixed(2);
					} else if(_data.f1YSZK_showUnit.indexOf("万") > -1) {
						f1YSZK_value = (f1YSZK_value / 10000.00).toFixed(2);
					}
				}
				$(objname + "  .yuce_f1YSZK").find("td").eq(index + 1).html(f1YSZK_value);
				//存货
				var f1CH_value = (_data.f1CH)[index] == null ? "--" : (_data.f1CH)[index];
				if(f1CH_value != "--") {
					if(_data.f1CH_showUnit.indexOf("亿") > -1) {
						f1CH_value = (f1CH_value / 100000000.00).toFixed(2);
					} else if(_data.f1CH_showUnit.indexOf("万") > -1) {
						f1CH_value = (f1CH_value / 10000.00).toFixed(2);
					}
				}
				$(objname + "  .yuce_f1CH").find("td").eq(index + 1).html(f1CH_value);
				//固定资产
				var f1GDZC_value = (_data.f1GDZC)[index] == null ? "--" : (_data.f1GDZC)[index];
				if(f1GDZC_value != "--") {
					if(_data.f1GDZC_showUnit.indexOf("亿") > -1) {
						f1GDZC_value = (f1GDZC_value / 100000000.00).toFixed(2);
					} else if(_data.f1GDZC_showUnit.indexOf("万") > -1) {
						f1GDZC_value = (f1GDZC_value / 10000.00).toFixed(2);
					}
				}
				$(objname + "  .yuce_f1GDZC").find("td").eq(index + 1).html(f1GDZC_value);
				//资产总计
				var f1ZCZJ_value = (_data.f1ZCZJ)[index] == null ? "--" : (_data.f1ZCZJ)[index];
				if(f1ZCZJ_value != "--") {
					if(_data.f1ZCZJ_showUnit.indexOf("亿") > -1) {
						f1ZCZJ_value = (f1ZCZJ_value / 100000000.00).toFixed(2);
					} else if(_data.f1ZCZJ_showUnit.indexOf("万") > -1) {
						f1ZCZJ_value = (f1ZCZJ_value / 10000.00).toFixed(2);
					}
				}
				$(objname + "  .yuce_f1ZCZJ").find("td").eq(index + 1).html(f1ZCZJ_value);
				//流动负债
				var f1LDFZHJ_value = (_data.f1LDFZHJ)[index] == null ? "--" : (_data.f1LDFZHJ)[index];
				if(f1LDFZHJ_value != "--") {
					if(_data.f1LDFZHJ_showUnit.indexOf("亿") > -1) {
						f1LDFZHJ_value = (f1LDFZHJ_value / 100000000.00).toFixed(2);
					} else if(_data.f1LDFZHJ_showUnit.indexOf("万") > -1) {
						f1LDFZHJ_value = (f1LDFZHJ_value / 10000.00).toFixed(2);
					}
				}
				$(objname + "  .yuce_f1LDFZHJ").find("td").eq(index + 1).html(f1LDFZHJ_value);
				//$("#yuce_f1LDFZHJ").remove();
				//应付账款
				var f1YFZK_value = (_data.f1YFZK)[index] == null ? "--" : (_data.f1YFZK)[index];
				if(f1YFZK_value != "--") {
					if(_data.f1YFZK_showUnit.indexOf("亿") > -1) {
						f1YFZK_value = (f1YFZK_value / 100000000.00).toFixed(2);
					} else if(_data.f1YFZK_showUnit.indexOf("万") > -1) {
						f1YFZK_value = (f1YFZK_value / 10000.00).toFixed(2);
					}
				}
				$(objname + "  .yuce_f1YFZK").find("td").eq(index + 1).html(f1YFZK_value);
				//负债合计
				var f1FZHJ_value = (_data.f1FZHJ)[index] == null ? "--" : (_data.f1FZHJ)[index];
				if(f1FZHJ_value != "--") {
					if(_data.f1FZHJ_showUnit.indexOf("亿") > -1) {
						f1FZHJ_value = (f1FZHJ_value / 100000000.00).toFixed(2);
					} else if(_data.f1FZHJ_showUnit.indexOf("万") > -1) {
						f1FZHJ_value = (f1FZHJ_value / 10000.00).toFixed(2);
					}
				}
				$(objname + "  .yuce_f1FZHJ").find("td").eq(index + 1).html(f1FZHJ_value);
				//股本
				var GB_value = (_data.GB)[index] == null ? "--" : (_data.GB)[index];
				if(GB_value != "--") {
					if(_data.GB_showUnit.indexOf("亿") > -1) {
						GB_value = (GB_value / 100000000.00).toFixed(2);
					} else if(_data.GB_showUnit.indexOf("万") > -1) {
						GB_value = (GB_value / 10000.00).toFixed(2);
					}
				}
				$(objname + "  .yuce_GB").find("td").eq(index + 1).html(GB_value);
				//所有者权益
				var f1SYZQYHJ_value = (_data.f1SYZQYHJ)[index] == null ? "--" : (_data.f1SYZQYHJ)[index];
				if(f1SYZQYHJ_value != "--") {
					if(_data.f1SYZQYHJ_showUnit.indexOf("亿") > -1) {
						f1SYZQYHJ_value = (f1SYZQYHJ_value / 100000000.00).toFixed(2);
					} else if(_data.f1SYZQYHJ_showUnit.indexOf("万") > -1) {
						f1SYZQYHJ_value = (f1SYZQYHJ_value / 10000.00).toFixed(2);
					}
				}
				$(objname + "  .yuce_f1SYZQYHJ").find("td").eq(index + 1).html(f1SYZQYHJ_value);
				//ROA
				var ZongZiChanShouYiLv_value = (_data.ZongZiChanShouYiLv)[index] == null ? "--" : ((_data.ZongZiChanShouYiLv)[index]).toFixed(2);
				$(objname + "  .yuce_ZongZiChanShouYiLv").find("td").eq(index + 1).html(ZongZiChanShouYiLv_value);
				//ROE
				var JingZiChanShouYiLv_value = (_data.JingZiChanShouYiLv)[index] == null ? "--" : ((_data.JingZiChanShouYiLv)[index]).toFixed(2);
				$(objname + "  .yuce_JingZiChanShouYiLv").find("td").eq(index + 1).html(JingZiChanShouYiLv_value);
				//流动比率
				var LiuDongBiLv_value = (_data.LiuDongBiLv)[index] == null ? "--" : ((_data.LiuDongBiLv)[index]).toFixed(2);
				$(objname + "  .yuce_LiuDongBiLv").find("td").eq(index + 1).html(LiuDongBiLv_value);
				//利息保障倍数
				var LiXiBaoZhangBeiShu_value = (_data.LiXiBaoZhangBeiShu)[index] == null ? "--" : ((_data.LiXiBaoZhangBeiShu)[index]).toFixed(2);
				$(objname + "  .yuce_LiXiBaoZhangBeiShu").find("td").eq(index + 1).html(LiXiBaoZhangBeiShu_value);
				//经营现金流净额
				var f3JYHDCSDXJLLJE_value = (_data.f3JYHDCSDXJLLJE)[index] == null ? "--" : (_data.f3JYHDCSDXJLLJE)[index];
				if(f3JYHDCSDXJLLJE_value != "--") {
					if(_data.f3JYHDCSDXJLLJE_showUnit.indexOf("亿") > -1) {
						f3JYHDCSDXJLLJE_value = (f3JYHDCSDXJLLJE_value / 100000000.00).toFixed(2);
					} else if(_data.f3JYHDCSDXJLLJE_showUnit.indexOf("万") > -1) {
						f3JYHDCSDXJLLJE_value = (f3JYHDCSDXJLLJE_value / 10000.00).toFixed(2);
					}
				}
				$(objname + "  .yuce_f3JYHDCSDXJLLJE").find("td").eq(index + 1).html(f3JYHDCSDXJLLJE_value);
				var ShiYingLv_value = (_data.ShiYingLv)[index] == null ? "--" : ((_data.ShiYingLv)[index]).toFixed(2);
				$(objname + "  .yuce_ShiYingLv").find("td").eq(index + 1).html(ShiYingLv_value);
			});
		}
	},
	//获取经营风险信息
	findRiskTipsByCode: function() {
		var obj = this;
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT534", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var result = data.retData;
				var fxHtml = "";
				var ycHtml = "公司的利润主要来源于：" + result.LY + "，其中可能存在的风险来源有：";
				$("#yc").text(ycHtml);
				if(result.tipsList != null && result.tipsList.length > 0) { //经营风险信息列表
					$(result.tipsList).each(function(i, item) {
						fxHtml += "<h3>" + item.riskName + "</h3>" +
							"<p>" + item.riskDesc + "</p>";
					})

					$("#ycfxTips").html(fxHtml);
					if(isShowmodel) {
						obj.fileInit("m2349038176", 0, 1, fxHtml)
					}
				} else {
					$("#ycfxTips").html("<p><div class='noDatas'>暂无数据</div></p>");
				}
			}
		})
	},
	//A股方法开始
	Agsinfo: function() {
		//工商信息
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT601", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var retData = data.retData;
				if(retData == undefined) return;
				//简介
				var chiName = retData.chiName; //公司名称
				var businessScope = retData.businessScope; //经营范围
				//工商信息
				var stockCode = retData.stockCode //A股代码
				var stockName = retData.stockName //A股简称
				var stockCategory = retData.stockCategory //证券类别
				var legalPerson = retData.legalPerson //法人代表
				var managerMan = retData.managerMan //总经理
				var chairMan = retData.managerMan //董事长
				var secretary = retData.secretary //董秘
				var phone = retData.phone //联系电话
				var fax = retData.fax //传真
				var companyMail = retData.companyMail //电子信箱
				var companyUrl = retData.companyUrl //公司网址
				var businessAddress = retData.businessAddress //办公地址
				var registeredAddress = retData.registeredAddress //注册地址
				var state = retData.state //地区
				var registeredCapital = retData.registeredCapital //注册资本
				var registrationNumber = retData.registrationNumber //统一信用代码
				var lawName = retData.lawName //律师事务所
				var accountingFirm = retData.accountingFirm //会计事务所

				var companyinfos = "<div>" + chiName + businessScope + "</div>";
				$('.AjbxxDiv .companyIntroductionId').html(companyinfos);

				if(isShowmodel) {
					BS.MyCollect.fileInit("m7688408067j", 0, 1, companyinfos);
				}
				//				console.log(data.retData);
				var $kaikContentB = '<div class="table-gsinfo">' +
					'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
					'<table style="width:98%" class="tablemodel"><tr><td style="width:80px">公司名称</td><td>' + chiName + '</td><td style="width:80px">A股代码</td><td>' + stockCode + '</td></tr><tr><td style="width:80px">A股简称</td><td>' + stockName + '</td><td style="width:80px">证券类别</td><td>' + stockCategory + '</td></tr><tr><td style="width:80px">法人代表</td><td>' + legalPerson + '</td><td style="width:80px">总经理</td><td>' + managerMan + '</td></tr><tr><td style="width:80px">董事长</td><td>' + chairMan + '</td><td style="width:80px">董秘</td><td>' + secretary + '</td></tr><tr><td style="width:80px">联系电话</td><td>' + phone + '</td><td style="width:80px">传真</td><td>' + fax + '</td></tr><tr><td style="width:80px">电子信箱</td><td>' + companyMail + '</td><td style="width:80px">公司网址</td><td>' + companyUrl + '</td></tr><tr><td style="width:80px">办公地址</td><td>' + businessAddress + '</td><td style="width:80px">注册地址</td><td>' + registeredAddress + '</td></tr><tr><td style="width:80px">地区</td><td>' + state + '</td><td style="width:80px">注册资本</td><td>' + registeredCapital + '</td></tr><tr><td style="width:80px">统一信用代码</td><td>' + registrationNumber + '</td><td style="width:80px">律师事务所</td><td>' + lawName + '</td></tr><tr><td style="width:80px">会计事务所</td><td colspan="3">' + accountingFirm + '</td></tr><tr><td style="width:80px">经营范围</td><td colspan="3">' + businessScope + '</td></tr></table></div>'
				$(".AjbxxDiv .kaikContentB").html($kaikContentB);
				if(isShowmodel) {
					BS.MyCollect.fileInit("m2642747600", 0, 1, $kaikContentB);
				}

			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});
		//股票概要
		$.axsRequest("FT602", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var retData = data.retData;
				if(retData == undefined) return;
				var industryEjName = retData.industryEjName; //所属行业
				var industryGnName = retData.industryGnName //涉及概念
				var pettm = retData.pettm //市盈率（TTM）
				var pe = retData.pe //市盈率（静态）
				var pb = retData.pb //市净率
				var earningsPerShare = retData.earningsPerShare //基本每股收益（元）
				var dilutionEarningsPerShare = retData.dilutionEarningsPerShare //稀释每股收益（元）
				var generalCapital = retData.generalCapital //总股本（万股）
				var totalMarketValue = retData.totalMarketValue //总市值（亿）
				var circulationCapital = retData.circulationCapital //流通股本（万股）
				var marketCapitalization = retData.marketCapitalization //流通市值（亿）
				var financingBalance = retData.financingBalance //融资余额（万元）
				var securitiesBalance = retData.securitiesBalance //融券余额（万元）
				var netAssetValuePerShare = retData.netAssetValuePerShare //每股净资产（元）
				var accumulationFundShare = retData.accumulationFundShare //每股公积金（元）
				var undistributedProfit = retData.undistributedProfit //每股未分配利润（元）
				var operatingCashFlow = retData.operatingCashFlow //每股经营现金流（元）
				var $kaikContentC = '<div class="table-gsinfo">' +
					'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
					'<table style="width:98%" class="tablemodel"><tr><td style="width:80px">所属行业</td><td>' + industryEjName + '</td><td style="width:80px">设计概念</td><td>' + industryGnName + '</td></tr><tr><td style="width:80px">市盈率（TTM）</td><td>' + pettm + '</td><td style="width:80px">市盈率（静态）</td><td>' + pe + '</td></tr><tr><td style="width:80px">市净率</td><td>' + pb + '</td><td style="width:80px">基本每股收益（元）</td><td>' + earningsPerShare + '</td></tr><tr><td style="width:80px">稀释每股收益（元）</td><td>' + dilutionEarningsPerShare + '</td><td style="width:80px">总股本（万股）</td><td>' + generalCapital + '</td></tr><tr><td style="width:80px">总市值（亿）</td><td>' + totalMarketValue + '</td><td style="width:80px">流通股本（万股）</td><td>' + circulationCapital + '</td></tr><tr><td style="width:80px">流通市值（亿）</td><td>' + marketCapitalization + '</td><td style="width:80px">融资余额（万元）</td><td>' + financingBalance + '</td></tr><tr><td style="width:80px">融券余额（万元）</td><td>' + securitiesBalance + '</td><td style="width:80px">每股净资产（元）</td><td>' + netAssetValuePerShare + '</td></tr><tr><td style="width:80px">每股公积金（元）</td><td>' + accumulationFundShare + '</td><td style="width:80px">每股未分配利润（元）</td><td>' + undistributedProfit + '</td></tr><tr><td style="width:80px">每股经营现金流（元）</td><td colspan="3">' + operatingCashFlow + '</td></tr></table></div>'
				$(".AjbxxDiv .gupgk").html($kaikContentC);
				if(isShowmodel) {
					BS.MyCollect.fileInit("m7424700652", 0, 1, $kaikContentC);
				}
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});
	},
	//十大股东时间获取
	gengXinshijian: function() {
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '","sType":"1"}}';
		$.axsRequest("FT646", paraminfo, false, function(data) {
			var data = data.retData;
			//			console.log(data);
			var otn = '';
			$(data).each(function(index, item) {
				otn += '<li>' + item + '</li>'
			})
			$('#xzsdgd').html(otn)
			var ssj = data[0];
			//			console.log(ssj)
			$('#sdgdp').text(ssj);
		});
	},
	//十大流通股东时间获取
	gengXinshijianLt: function() {
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '","sType":"2"}}';
		$.axsRequest("FT646", paraminfo, false, function(data) {
			var data = data.retData;
			var otn = '';
			$(data).each(function(index, item) {
				otn += '<li>' + item + '</li>'
			})
			$('#sdltgd').html(otn)
			var ssj = data[0];
			$('#sdltgdp').text(ssj);
		});
	},
	//十大流通股东
	shiDaLiuTongGuDong: function(reportPeriod) {
		var obj = this;
		obj.gengXinshijianLt();
		var sj = $("#sdltgdp").text()
		//		 console.log(sj)
		//		var paraminfo = {
		//			stockCode: stockCode,
		//			sType: 2,
		//			reportDate: sj
		//		};
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '","sType":"2","reportDate":"' + sj + '"}}';
		$.axsRequest("FT603", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var data = data.retData;
				//				console.log("十大流通股东====="+data);
				var litr = '';
				litr += '<div class="AguTable">' +
					'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
					'<table style="width:98%" class="tablemodel">' +
					'<thead>' +
					'<tr>' +
					'<th class="zbdqbj" style="width:5%">名次</th>' +
					'<th style="width:30%">股东名称</th>' +
					'<th style="width:10%">股东性质</th>' +
					'<th style="width:5%">股份类型</th>' +
					'<th class="shuzi" style="width:15%">持股数（万股）</th>' +
					'<th class="shuzi" style="width:20%">占总流通股本持股比例（%）</th>' +
					'<th class="shuzi">增减情况（股）</th>' +
					'</tr>' +
					'</thead>' +
					'<tbody>';
				if(data == null || data == "" || data == undefined) {
					var trHtml = '<tr><td colspan="7">暂无数据</td></tr>';
					$("#Agultlist").html(trHtml);
				} else {
					$(data).each(function(index, item) {
						if(item.ZJ == "不变") {
							litr += '<tr><td class="zbdqbj">' + item.shareRanking + '</td>';
							if(item.sharehdName != null && item.sharehdName != '' && item.sharehdName != undefined) {
								if(item.sharehdName.length > 15) {
									litr += '<td title="' + item.sharehdName + '">' + item.sharehdName.substring(0, 15) + '...</td>';
								} else {
									litr += '<td>' + item.sharehdName + '</td>';
								}
							} else {
								litr += '<td>--</td>';
							}

							litr += '<td>' + item.sharehdNature + '</td>'
							litr += '<td>' + item.stockType + '</td>'
							litr += '<td>' + item.sharehdNum.toFixed(2) + '</td>'
							litr += '<td>' + item.sharehdNumper + '</td>'
							litr += '<td>' + item.ZJ + '</td></tr>';
						} else if(item.ZJ > 0) {
							litr += '<tr><td>' + item.shareRanking + '</td>';
							if(item.sharehdName != null && item.sharehdName != '' && item.sharehdName != undefined) {
								if(item.sharehdName.length > 15) {
									litr += '<td title="' + item.sharehdName + '">' + item.sharehdName.substring(0, 15) + '...</td>';
								} else {
									litr += '<td>' + item.sharehdName + '</td>';
								}
							} else {
								litr += '<td>--</td>';
							}
							litr += '<td>' + item.sharehdNature + '</td>';
							litr += '<td>' + item.stockType + '</td>';
							litr += '<td>' + item.sharehdNum.toFixed(2) + '</td>';
							litr += '<td>' + item.sharehdNumper.toFixed(2) + '</td>';
							litr += '<td>' + Number(item.ZJ).toFixed(2) + '</td></tr>';
						} else if(item.ZJ < 0) {
							litr += '<tr><td>' + item.shareRanking + '</td>';
							if(item.sharehdName != null && item.sharehdName != '' && item.sharehdName != undefined) {
								if(item.sharehdName.length > 15) {
									litr += '<td title="' + item.sharehdName + '">' + item.sharehdName.substring(0, 15) + '...</td>';
								} else {
									litr += '<td>' + item.sharehdName + '</td>';
								}
							} else {
								litr += '<td class="lfdq">--</td>';
							}
							litr += '<td>' + item.sharehdNature + '</td>';
							litr += '<td>' + item.stockType + '</td>';
							litr += '<td>' + item.sharehdNum.toFixed(2) + '</td>';
							litr += '<td>' + item.sharehdNumper.toFixed(2) + '</td>';
							litr += '<td>' + Number(item.ZJ).toFixed(2) + '</td></tr>';
						} else if(item.ZJ == "新进") {
							litr += '<tr><td>' + item.shareRanking + '</td>';
							if(item.sharehdName != null && item.sharehdName != '' && item.sharehdName != undefined) {
								if(item.sharehdName.length > 15) {
									litr += '<td title="' + item.sharehdName + '">' + item.sharehdName.substring(0, 15) + '...</td>';
								} else {
									litr += '<td>' + item.sharehdName + '</td>';
								}
							} else {
								litr += '<td>--</td>';
							}
							litr += '<td>' + item.sharehdNature + '</td>';
							litr += '<td>' + item.stockType + '</td>';
							litr += '<td>' + item.sharehdNum.toFixed(2) + '</td>';
							litr += '<td>' + item.sharehdNumper + '</td>';
							litr += '<td>' + item.ZJ + '</td></tr>';
						}
					})
					litr += '</tbody></table></div>'
					$("#Agultlist").html(litr);
					if(isShowmodel) {
						BS.MyCollect.fileInit("m968147861", 0, 1, litr);
					}

				}
			}
		});
	},
	//十大股东
	shiDaGuDong: function() {
		var obj = this;
		obj.gengXinshijian();
		var sj = $("#sdgdp").text();
		//		 console.log(sj)
		//		var paraminfo = {
		//			stockCode: stockCode,
		//			sType: 1,
		//			reportDate: sj
		//		};
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '","sType":"1","reportDate":"' + sj + '"}}';
		$.axsRequest("FT603", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var data = data.retData;
				//				console.log("十大股东====="+data);
				var litr = '';
				litr += '<div class="AguTable">' +
					'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
					'<table style="width:98%" class="tablemodel">' +
					'<thead>' +
					'<tr>' +
					'<th class="zbdqbj" style="width:5%">名次</th>' +
					'<th style="width:30%">股东名称</th>' +
					'<th style="width:10%">股东性质</th>' +
					'<th style="width:5%">股份类型</th>' +
					'<th class="shuzi" style="width:15%">持股数（万股）</th>' +
					'<th class="shuzi" style="width:20%">占总股本比例（%）</th>' +
					'<th class="shuzi">增减情况（股）</th>' +
					'</tr>' +
					'</thead>' +
					'<tbody>';
				if(data == null || data == "" || data == undefined) {
					var trHtml = '<tr><td colspan="7">暂无数据</td></tr>';
					$("#AgueventListGG").html(trHtml);
				} else {
					$(data).each(function(index, item) {
						if(item.ZJ == "不变") {
							litr += '<tr><td>' + item.shareRanking + '</td>';
							if(item.sharehdName != null && item.sharehdName != '' && item.sharehdName != undefined) {
								if(item.sharehdName.length > 13) {
									litr += '<td title="' + item.sharehdName + '">' + (item.sharehdName).substring(0, 13) + '...</td>';
								} else {
									litr += '<td>' + item.sharehdName + '</td>';
								}
							} else {
								litr += '<td>--</td>';
							}

							litr += '<td>' + item.sharehdNature + '</td>'
							litr += '<td>' + item.stockType + '</td>'
							litr += '<td>' + item.sharehdNum.toFixed(2) + '</td>'
							litr += '<td>' + item.sharehdNumper + '</td>'
							litr += '<td>' + item.ZJ + '</td></tr>';
						} else if(item.ZJ > 0) {
							litr += '<tr><td>' + item.shareRanking + '</td>';
							if(item.sharehdName != null && item.sharehdName != '' && item.sharehdName != undefined) {
								if(item.sharehdName.length > 13) {
									litr += '<td title="' + item.sharehdName + '">' + (item.sharehdName).substring(0, 13) + '...</td>';
								} else {
									litr += '<td>' + item.sharehdName + '</td>';
								}
							} else {
								litr += '<td>--</td>';
							}
							litr += '<td>' + item.sharehdNature + '</td>';
							litr += '<td>' + item.stockType + '</td>';
							litr += '<td>' + item.sharehdNum.toFixed(2) + '</td>';
							litr += '<td>' + item.sharehdNumper.toFixed(2) + '</td>';
							litr += '<td>' + Number(item.ZJ).toFixed(2) + '</td></tr>';
						} else if(item.ZJ < 0) {
							litr += '<tr><td class="zbdqbj">' + item.shareRanking + '</td>';
							if(item.sharehdName != null && item.sharehdName != '' && item.sharehdName != undefined) {
								if(item.sharehdName.length > 13) {
									litr += '<td class="lfdq" title="' + item.sharehdName + '">' + item.sharehdName.substring(0, 13) + '...</td>';
								} else {
									litr += '<td class="lfdq">' + item.sharehdName + '</td>';
								}
							} else {
								litr += '<td class="lfdq">--</td>';
							}
							litr += '<td>' + item.sharehdNature + '</td>';
							litr += '<td>' + item.stockType + '</td>';
							litr += '<td>' + item.sharehdNum + '</td>';
							litr += '<td>' + item.sharehdNumper + '</td>';
							litr += '<td>' + Number(item.ZJ) + '</td></tr>';
						} else if(item.ZJ == "新进") {
							litr += '<tr><td>' + item.shareRanking + '</td>';
							if(item.sharehdName != null && item.sharehdName != '' && item.sharehdName != undefined) {
								if(item.sharehdName.length > 13) {
									litr += '<td title="' + item.sharehdName + '">' + item.sharehdName.substring(0, 13) + '...</td>';
								} else {
									litr += '<td>' + item.sharehdName + '</td>';
								}
							} else {
								litr += '<td>--</td>';
							}
							litr += '<td>' + item.sharehdNature + '</td>';
							litr += '<td>' + item.stockType + '</td>';
							litr += '<td>' + item.sharehdNum + '</td>';
							litr += '<td>' + item.sharehdNumper + '</td>';
							litr += '<td>' + item.ZJ + '</td></tr>';
						}
					})
					litr += '</tbody></table></div>';
					//					console.log(litr);
					$("#AgueventListGG").html(litr);
					if(isShowmodel) {
						BS.MyCollect.fileInit("m2653733876s", 0, 1, litr);
					}

				}

			}
		});
	},
	//	linshiguquanjiegou1:function(){
	//		var litr="<div>暂无数据</div>"
	//		if(isShowmodel){
	//						BS.MyCollect.fileInit("m2653733876s", 0, 1, litr);
	//					}
	//		if(isShowmodel){
	//						BS.MyCollect.fileInit("m968147861", 0, 1, litr);
	//					}
	//		if(isShowmodel){
	//						BS.MyCollect.fileInit("m2906235396", 0, 1, litr);
	//					}
	//		
	//	},
	// 股东人数变化开始
	gdrsbhinfo: function() {
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT604", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var data = data.retData;
				var zwychtml = "";
				zwychtml += '<div><style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
					'<table style="width:101%" class="tablemodel">' +
					'<thead>' +
					'<tr>' +
					'<th style="text-align: left;padding-left: 20px;box-sizing: border-box;">项目</th>' +
					'</tr>' +
					'</thead>' +
					'<tbody>' +
					'<tr><td>股东户数(户)</td></tr>' +
					'<tr><td class="ghbs">股东户数较上期变化(%)</td></tr>' +
					'<tr><td class="ghbs">户均流通股较上期变化(%)</td></tr>' +
					'<tr><td>股价(元)</td></tr>' +
					'<tr><td class="ghbs">户均持股金额(万元)</td></tr>' +
					'<tr><td>前十大股东持股合计(%)</td></tr>' +
					'<tr><td class="ghbs">前十大流通股东持股合计(%)</td></tr>' +
					'<tr><td>户均流通股(万股)</td></tr>' +
					'</tbody></table></div>';
				$("#zwyc1").html(zwychtml);
				var zwyc2html = '';
				zwyc2html += '<div><style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
					'<table style="width:98%" class="tablemodel" style="overflow-x:auto">' +
					'<thead>' +
					'<tr id="ltTh">' +
					'</tr>' +
					'</thead>' +
					'<tbody id="ltRs">' +
					'</tbody>' +
					'</table>' +
					'</div>' +
					'</div>';
				$("#zwyc2").html(zwyc2html);

				var sjTr = "";
				var sjTh = '';
				$('#ltRs').html("");
				//表头

				$('#ltTh').html("");
				var titles = [];
				if(data == null || data == "" || data == undefined) {
					var trHtml = "<div style='text-align:center'>暂无数据</div>";
					$('#zwyc1').css('display', 'none');
					$('#zwyc2').css('display', 'none');
					//$('#zwxs').html(trHtml);
				} else {
					$(data[0]).each(function(index, item) {
						for(var key in item) {
							if(key == "name") {

							} else {
								sjTh += '<th  class="shuzi">' + key + '</th>';
								titles.push(key);
							}
						}
						$('#ltTh').append(sjTh);
					})
				}

				var WidK = (titles.length) * 112;
				// console.log(WidK);
				$('.nrhdz').css('width', WidK + 'px');
				if(data == null || data == "" || data == undefined) {
					var trHtml = '<tr><td colspan="7">暂无数据</td></tr>';
					$('#ltRs').html(trHtml);
				} else {

					$(data).each(function(index, item) {
						sjTr += '<tr>';

						//股东户数
						if(item['name'] == 'gdrs') {
							$(titles).each(function(index, itemTitle) {
								var cyyw = (item[itemTitle]);
								// console.log('1')
								if(index == titles.length - 1) {
									sjTr += '<td  class="ybdqbj">' + cyyw + '</td>';
								} else {
									sjTr += '<td  class="shuzi">' + cyyw + '</td>';

								}
								// sjTr+='<td class="shuzi">'+((cyyw) == "-" ? "--" : (UTIL.fmtNum3(Number(cyyw))))+'</td>';
							});
						}
						//股东户数较上期变化
						if(item['name'] == 'gdrsJsqbh') {
							$(titles).each(function(index, itemTitle) {
								var cyyw = (item[itemTitle]);

								if(index == titles.length - 1) {
									sjTr += '<td  class="ybdqbj">' + cyyw + '</td>';
								} else {
									sjTr += '<td  class="shuzi">' + cyyw + '</td>';

								}
								// console.log('2')
								// sjTr+='<td class="shuzi">'+((cyyw) == "-" ? "--" : (UTIL.fmtNum3(Number(cyyw))))+'</td>';
							});
						}
						//户均流通股东
						if(item['name'] == 'rjltg') {
							$(titles).each(function(index, itemTitle) {
								var cyyw = ((item[itemTitle] / 10000).toFixed(2));
								// console.log('3')
								if(index == titles.length - 1) {
									sjTr += '<td  class="ybdqbj">' + cyyw + '</td>';
								} else {
									sjTr += '<td  class="shuzi">' + cyyw + '</td>';

								}
								// sjTr+='<td class="shuzi">'+((cyyw) == "-" ? "--" : (UTIL.fmtNum3(Number(cyyw))))+'</td>';
							});
						}
						//户均流通股东较上期变化
						if(item['name'] == 'rjltgJsqbh') {
							$(titles).each(function(index, itemTitle) {
								var cyyw = (item[itemTitle]);
								// console.log('4')
								if(index == titles.length - 1) {
									sjTr += '<td  class="ybdqbj">' + cyyw + '</td>';
								} else {
									sjTr += '<td  class="shuzi">' + cyyw + '</td>';

								}
								// sjTr+='<td  class="shuzi">'+((cyyw) == "-" ? "--" : (UTIL.fmtNum3(Number(cyyw))))+'</td>';
							});
						}
						//股价
						if(item['name'] == 'gj') {
							$(titles).each(function(index, itemTitle) {
								var cyyw = (item[itemTitle]);
								// console.log('5')
								if(index == titles.length - 1) {
									sjTr += '<td  class="ybdqbj">' + cyyw + '</td>';
								} else {
									sjTr += '<td  class="shuzi">' + cyyw + '</td>';

								}
								// sjTr+='<td  class="shuzi">'+((cyyw) == "-" ? "--" : (UTIL.fmtNum3(Number(cyyw))))+'</td>';
							});
						}
						//户均持股金额
						if(item['name'] == 'rjcgje') {
							$(titles).each(function(index, itemTitle) {
								var cyyw = (item[itemTitle]);
								// console.log(cyyw)
								// var cyqw=cyyw;

								if(cyyw == null) {
									cyyw = "--";
								} else {
									cyyw = cyyw.toFixed(2);
								}
								// console.log(cyyw)
								// sjTr+='<td  class="shuzi">'+cyyw+'</td>';
								if(index == titles.length - 1) {
									sjTr += '<td  class="ybdqbj">' + cyyw + '</td>';
								} else {
									sjTr += '<td  class="shuzi">' + cyyw + '</td>';

								}

							});
						}
						//前十大股东持股合计
						if(item['name'] == 'qsdgdcghj') {
							$(titles).each(function(index, itemTitle) {
								var cyyw = (item[itemTitle]);
								// console.log('7')
								if(index == titles.length - 1) {
									sjTr += '<td  class="ybdqbj">' + cyyw + '</td>';
								} else {
									sjTr += '<td  class="shuzi">' + cyyw + '</td>';

								}
								// sjTr+='<td  class="shuzi">'+((cyyw) == "-" ? "--" : (UTIL.fmtNum3(Number(cyyw))))+'</td>';
							});
						}
						//前十大流通股东持股合计
						if(item['name'] == 'qsdltgdcghj') {
							$(titles).each(function(index, itemTitle) {
								var cyyw = (item[itemTitle]);
								// console.log('8')
								// sjTr+='<td  class="shuzi">'+((cyyw) == "-" ? "--" : (UTIL.fmtNum3(Number(cyyw))))+'</td>';
								//console.log(itemTitle.length)

								if(index == titles.length - 1) {
									sjTr += '<td  class="ybdqbj">' + cyyw + '</td>';
								} else {
									sjTr += '<td  class="shuzi">' + cyyw + '</td>';

								}

							});
						}

						sjTr += '</tr>';
						$('#ltRs').html(sjTr)
						//						$('#zwyc2').append();
						setTimeout(function() {
							if(isShowmodel) {
								BS.MyCollect.fileInit("m2906235396", 0, 1, $("#zwxs").html());
							}
						}, 5000)
					})
				}
			}
		});

	},
	//大宗易交易情况
	findGsDzjyqk: function() {
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT606", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var data = data.retData.data;
				$('#tradeList').html('');
				if(data != "" && data != null && data != undefined) {
					var otn = '';
					otn = '<div class="">' +
						'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
						'<table style="width:98%" class="tablemodel"><thead><tr>' +
						'<th style="text-align: left;padding-left: 20px;box-sizing: border-box;">交易日期</th>' +
						'<th>成交价（元）</th>' +
						'<th>成交量（万股）</th>' +
						'<th>成交金额（万元）</th>' +
						'<th>买入营业部</th>' +
						'<th class="shuzi">卖出营业部</th></tr></thead>' +
						'<tbody class="no-color" id="tradeList">';
					$(data).each(function(index, item) {
						otn += '<tr><td class="zbdq" style="line-height:30px;">' + item.tdate + '</td><td class="shuzi sxjz" style="line-height:30px;">' + item.price.toFixed(2) + '</td><td class="shuzi sxjz" style="line-height:30px;">' + item.tvol.toFixed(2) + '</td><td class="shuzi sxjz" style="line-height:30px;">' + item.tval.toFixed(2) + '</td><td  title="' + item.buyerName + '"><em class="xsddd" >' + item.buyerName + '</em></td><td title="' + item.salesName + '"><em class="xsddd">' + item.salesName + '</em></td></tr>';
					})
					otn += '</tbody></table></div>'
					$('.AdzjyqkDiv .zdjy-table').html(otn);
					if(isShowmodel) {
						BS.MyCollect.fileInit("m7968168882", 0, 1, otn);
					}
				} else {
					var tr = '<tr><td colspan="6" style="text-align:center;">暂无数据</td></tr>';
					$('.AdzjyqkDiv .zdjy-table').html(tr);
				}
			}

		});
	},
	//A股人员情况-列表
	Apersoninfo: function() {
		var $ryqk = '';
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT607", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var result2 = data.retData;
				$ryqk += '<div class="">' +
					'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
					'<table style="width:98%" class="tablemodel"><thead><tr><th>姓名</th><th>职务</th><th>性别</th><th>年龄</th><th>学历</th><th class="shuzi">持股数(万股)</th></tr></thead><tbody>'
				$(result2).each(function(index, item) {
					$ryqk += '<tr><td>' + item.dignitaryName + '</td><td>' + item.position + '</td><td>' + item.sex + '</td><td>' + item.age + '</td><td>' + item.education + '</td><td class="shuzi">' + item.shareNumber + '</td></tr>'
				})
				$ryqk += '</tbody></table></div>';
				$ryqk = ReplaceAll($ryqk, "null", "--");
				$ryqk = ReplaceAll($ryqk, "undefined", "--");
				$(".AryqkDiv .djgUL").html($ryqk);
				if(isShowmodel) {
					BS.MyCollect.fileInit("m9718641470", 0, 1, $ryqk);
				}

			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});
	},
	//人员情况-图表调用接口
	Apersontubiao: function() {
		var obj = this;
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT608", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var result = data.retData;

				var legendXLData = []; //学历名称
				var xlData = []; //学历
				if(result.xlMap != null && result.xlMap.xlData != null && result.xlMap.xlData.length > 0) { //学历数据
					$(result.xlMap.xlData).each(function(i, item) {
						legendXLData.push(item.belongClassification);
						xlData.push({
							"value": item.number,
							"name": item.belongClassification
						});
					})

					obj.Aeducational(legendXLData, xlData); //学历
					obj.myimg("Agueducational", echarts.init(document.getElementById('Agueducational')), "m2899127663", 0)

				} else {
					$("#Agueducational").html("暂无图表");
				}

				var xlIHtml = "<h6>同行业对比分析</h6>";
				if(result.xlMap != null && result.xlMap.xlIList != null && result.xlMap.xlIList.length > 0) { //学历同行业
					$(result.xlMap.xlIList).each(function(i, item) { //循环要展示的学历同行业
						if(item.gsBFB != null) {
							if(item.CZ.toString().indexOf("-") == 0) {
								xlIHtml += "<p>公司学历为" + item.gsMC + "的人数占比为" + parseFloat(item.gsBFB).toFixed(2) + "%，比行业均值少" + parseFloat(item.CZ.toString().substring(1)).toFixed(2) + "%。</p>";
							} else if(parseFloat(item.CZ) == 0) {
								xlIHtml += "<p>公司学历为" + item.gsMC + "的人数占比为" + parseFloat(item.gsBFB).toFixed(2) + "%，比去年无变化。</p>";
							} else {
								xlIHtml += "<p>公司学历为" + item.gsMC + "的人数占比为" + parseFloat(item.gsBFB).toFixed(2) + "%，比行业均值多" + parseFloat(item.CZ).toFixed(2) + "%。</p>";
							}
						}
					})
				} else {
					xlIHtml += "<div class='noDatas'>暂无数据</div>";
				}
				var xlCHtml = "<h6>水平分析</h6>";
				if(result.xlMap != null && result.xlMap.xlHList != null && result.xlMap.xlHList.length > 0) { //学历与上期
					$(result.xlMap.xlHList).each(function(i, item) { //循环要展示的学历与上期
						if(item.newBFB != null) {
							if(item.CZ.toString().indexOf("-") == 0) {
								xlCHtml += "<p>本年度公司学历为" + item.MC + "的人数占比为" + parseFloat(item.newBFB).toFixed(2) + "%，上一年度人数占比为" + parseFloat(item.oldBFB).toFixed(2) + "%，比去年少" + parseFloat(item.CZ.toString().substring(1)).toFixed(2) + "%。</p>";
							} else if(parseFloat(item.CZ) == 0) {
								xlCHtml += "<p>本年度公司学历为" + item.MC + "的人数占比为" + parseFloat(item.newBFB).toFixed(2) + "%，上一年度人数占比为" + parseFloat(item.oldBFB).toFixed(2) + "%，比去年无变化。</p>";
							} else {
								xlCHtml += "<p>本年度公司学历为" + item.MC + "的人数占比为" + parseFloat(item.newBFB).toFixed(2) + "%，上一年度人数占比为" + parseFloat(item.oldBFB).toFixed(2) + "%，比去年多" + parseFloat(item.CZ).toFixed(2) + "%。</p>";
							}
						}
					})
				} else {
					xlCHtml += "<p><div class='noDatas'>无上一年度数据</div></p>";
				}
				var aguxlihtmls = "<div class=''>" + xlIHtml + xlCHtml + "</div>";
				$("#AguxlDBMsg").html(aguxlihtmls); //学历
				if(isShowmodel) {
					obj.fileInit("m2899127663", 1, 1, aguxlihtmls)
				}
				var legendZWData = []; //职位名称
				var zwData = []; //职位	
				if(result.zwMap != null && result.zwMap.zwData != null && result.zwMap.zwData.length > 0) { //职位数据
					$(result.zwMap.zwData).each(function(i, item) {
						legendZWData.push(item.belongClassification);
						zwData.push({
							"value": item.number,
							"name": item.belongClassification
						});
					})

					obj.AjobDistribution(legendZWData, zwData); //职位
					obj.myimg("Aguemployee", echarts.init(document.getElementById('Aguemployee')), "m2899127663", 2)

				} else {
					$("#Aguemployee").html("暂无图表")
				}

				var zwIHtml = "<h6>同行业对比分析</h6>";
				if(result.zwMap != null && result.zwMap.zwIList != null && result.zwMap.zwIList.length > 0) { //职位同行业
					$(result.zwMap.zwIList).each(function(i, item) {
						if(item.gsBFB != null) {
							if(item.CZ.toString().indexOf("-") == 0) {
								zwIHtml += "<p>公司" + item.gsMC + "的职工人数比行业均值少" + parseFloat(item.CZ.toString().substring(1)).toFixed(2) + "%。</p>";
							} else if(parseFloat(item.CZ.toString()) == 0) {
								zwIHtml += "<p>公司" + tem.gsMC + "的职工人数与行业均值一样。</p>";
							} else {
								zwIHtml += "<p>公司" + item.gsMC + "的职工人数比行业均值多" + parseFloat(item.CZ).toFixed(2) + "%。</p>";
							}
						}
					})
				} else {
					zwIHtml += "<div class='noDatas'>暂无数据</div>";
				}

				var zwCHtml = "<h6>水平分析</h6>";
				if(result.zwMap != null && result.zwMap.zwHList != null && result.zwMap.zwHList.length > 0) { //与上期比较
					$(result.zwMap.zwHList).each(function(i, item) {
						if(item.newBFB) {
							if(item.CZ.toString().indexOf("-") == 0) {
								zwCHtml += "<p>截止到最近一个会计年度，公司" + item.MC + "类员工与上年同期变化少" + parseFloat(item.CZ.toString().substring(1)).toFixed(2) + "%。</p>";
							} else if(parseFloat(item.CZ) == 0) {
								zwCHtml += "<p>截止到最近一个会计年度，公司" + item.MC + "类员工与上年同期无变化。</p>";
							} else {
								zwCHtml += "<p>截止到最近一个会计年度，公司" + item.MC + "类员工与上年同期变化多" + parseFloat(item.CZ).toFixed(2) + "%。</p>";
							}
						}
					})
				} else {
					zwCHtml += "<div class='noDatas'>暂无数据</div>";
				}
				var Aguzaihtmls = "<div class=''>" + zwIHtml + zwCHtml + "</div>";
				$("#AguzwDBMsg").html(Aguzaihtmls); //职位
				if(isShowmodel) {
					obj.fileInit("m2899127663", 3, 1, Aguzaihtmls)
				}

			} else {
				errorAlert(data.retCode, data.retMsg);
			}

		});
	},
	//人员情况-职位图表调用echart
	AjobDistribution: function(legendData, data) {
		var width = $(".zdsj").width() * 0.9;
		$("#Aguemployee").css("width", width);
		var myChart = echarts.init(document.getElementById('Aguemployee'));
		var option = {
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			animation: false,
			legend: {
				show: true,
				left: 'center',
				data: legendData,
			},
			color: ["#248ce6", "#64a4f2", "#41ccdc", "#41dc8e", "#dcda41", "#feb535", "#f8926d", "#f36c77", "#d967dd", "#9675da"],
			label: {
				normal: {
					show: true,
					formatter: function(params) {
						//console.log(params)
						return params.percent.toFixed(2) + "%\n" + params.name;
					}
				}

			},
			series: [{
				name: '职位分布',
				type: 'pie',
				radius: '55%',
				center: ['50%', '60%'],
				data: data

			}]
		};
		myChart.setOption(option);
	},
	//人员情况-学历图表调用echart
	Aeducational: function(legendData, data) {
		var width = $(".zdsj").width() * 0.9;
		$("#Agueducational").css("width", width);
		var myChart = echarts.init(document.getElementById('Agueducational'));
		var option = {
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			animation: false,
			legend: {
				show: true,
				left: 'center',
				data: legendData,
			},
			color: ["#248ce6", "#64a4f2", "#41ccdc", "#41dc8e", "#dcda41", "#feb535", "#f8926d", "#f36c77", "#d967dd", "#9675da"],
			label: {
				normal: {
					show: true,
					formatter: function(params) {
						//		    			console.log(params)
						return params.percent.toFixed(2) + "%\n" + params.name;
					}
				}

			},
			series: [{
				name: '学历分布',
				type: 'pie',
				radius: '55%',
				center: ['50%', '60%'],
				data: data

			}]
		};
		myChart.setOption(option);
	},
	//重大事件-并购及重大资产重组列表
	AfindBingGou: function() {
		var paraminfo = {
			stockCode: stockCode,
			pageSize: 10,
			pageNum: 10000
		};
		$.axsRequest("FT609", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var result = data.retData.data;
				if(result != null && result != "" && result != undefined) {
					var otn = '';
					otn += '<div class="">' +
						'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
						'<table style="width:98%" class="tablemodel"><thead><tr>' +
						'<th class="zbdqbj">披露日期</th>' +
						'<th>最新公告日</th>' +
						'<th>最新进度</th>' +
						'<th class="shuzi">交易金额（万元）</th>' +
						'<th>币种</th>' +
						'<th class="shuzi">股权转比例（%）</th>' +
						'</tr></thead><tbody>';

					$(result).each(function(index, item) {
						otn += '<tr><td class="zbdq">' + item.firstnoticeDate + '</td><td>' + item.noticeDate + '</td><td>' + item.fajd + '</td><td class="shuzi">' + item.tradeAmount + '</td><td>' + item.currency + '</td><td class="shuzi">' + item.zrbl + '</td></tr>';
					})
					otn += '</tbody></table></div>';
					otn = ReplaceAll(otn, "null", "--")
					otn = ReplaceAll(otn, "undefined", "--")
					$('.AzdsjDiv .Agubinggou').html(otn);
					if(isShowmodel) {
						BS.MyCollect.fileInit("m5100815816b", 0, 1, otn);
					}
				} else {
					var tr = "<tr><td colspan='6'>暂无数据</td></tr>";
					$('.AzdsjDiv .Agubinggou').html(tr);
					if(isShowmodel) {
						BS.MyCollect.fileInit("m5100815816b", 0, 1, tr);
					}
				}
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		})
	},
	//重大事件-并购及重大资产重组详情
	findBGDetails: function(sigin) {
		var paraminfo = '{"body":{"sign":"' + sigin + '"}}';
		$.axsRequest("FT610", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				if(data.retData != "" && data.retData != null && data.retData != undefined) {
					var result = data.retData;
					var bdData = result.bdData; //标的方的数据
					var shellData = result.shellData; //卖方
					var buyData = result.buyData; //买方
					if(bdData != null && bdData != "" && bdData != undefined) {
						var html = '';
						$(bdData).each(function(index, item) {
							html += '<tr>';
							if(item.bdfName == "" || item.bdfName == null || item.bdfName == undefined) {
								html += '<td class="textLe">--</td>';
							} else {
								if(item.stockName.length > 15) {
									html += '<td class="textLe" title="' + item.bdfName + '" style="cursor: pointer;">' + item.bdfName.substring(0, 14) + '...</td>';

								} else {
									html += '<td class="textLe">' + item.bdfName + '</td>';
								}
							}
							html += '<td class="textLe">' + item.plrelaObj + '</td>';
							html += '<td class="textRi">' + item.objType + '</td>';
							html += '</tr>';
						})
						$("#bdData").html(html);
					} else {
						var shellTr = "<tr><td colspan='3'>暂无数据</td></tr>";
						$("#bdData").html(shellTr);
					}
					if(shellData != null && shellData != "" && shellData != undefined) {
						var html = '';
						$(shellData).each(function(index, item) {
							html += '<tr>';
							if(item.nameSell == "" || item.nameSell == null || item.nameSell == undefined) {
								html += '<td class="textLe">--</td>';
							} else {
								if(item.nameSell.length > 15) {
									html += '<td class="textLe" title="' + item.nameSell + '" style="cursor: pointer;">' + item.nameSell.substring(0, 14) + '...</td>';

								} else {
									html += '<td class="textLe">' + item.nameSell + '</td>';
								}
							}

							html += '<td class="textLe">' + item.orgformSell + '</td>';
							html += '<td class="shuzi">' + item.tradeAmount + '</td>';
							html += '<td class="shuzi">' + item.holdnum2Sell + '</td>';
							html += '<td class="textRi">' + item.holdper2Sell + '</td>';
							html += '</tr>';
						})
						$("#shellData").html(html);
					} else {
						var shellTr = "<tr><td colspan='5'>暂无数据</td></tr>";
						$("#shellData").html(shellTr);
					}
					if(buyData != null && buyData != "" && buyData != undefined) {
						var html = '';
						$(buyData).each(function(index, item) {
							html += '<tr>';
							if(item.nameBuy == "" || item.nameBuy == null || item.nameBuy == undefined) {
								html += '<td class="textLe">--</td>';
							} else {
								if(item.nameBuy.length > 15) {
									html += '<td class="textLe" title="' + item.nameBuy + '" style="cursor: pointer;">' + item.nameBuy.substring(0, 14) + '...</td>';
								} else {
									html += '<td class="textLe">' + item.nameBuy + '</td>';
								}
							}

							html += '<td class="textLe">' + item.orgformBuy + '</td>';
							html += '<td class="xqzdq">' + item.plrelaBuy + '</td>';
							html += '<td class="shuzi">' + item.holdnum2Buy + '</td>';
							html += '<td class="textRi">' + item.holdper2Buy + '</td>';
							html += '</tr>';
						})
						$("#buyData").html(html);
					} else {
						var shellTr = "<tr><td colspan='5'>暂无数据</td></tr>";
						$("#buyData").html(shellTr);
					}
				} else {
					var buyData = "<tr><td colspan='5'>暂无数据</td></tr>";
					$("#buyData").html(buyData);
					var shellTr = "<tr><td colspan='5'>暂无数据</td></tr>";
					$("#shellData").html(shellTr);
					var bdData = "<tr><td colspan='3'>暂无数据</td></tr>";
					$("#bdData").html(bdData);
				}
			}
		})
	},
	//1.6.2 增发开始
	findZengFa: function() {
		var paraminfo = {
			stockCode: stockCode,
			pageSize: 10,
			pageNum: 10000
		};
		$.axsRequest("FT612", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var result = data.retData.data;
				if(result != null && result != "" && result != undefined) {
					var otn = '';
					otn += '<div class="AguTable">' +
						'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
						'<table style="width:98%" class="tablemodel">' +
						'<thead>' +
						'<tr>' +
						'<th class="zbdqbj">增发时间</th>' +
						'<th class="shuzi">增发数量（万股）</th>' +
						'<th class="shuzi">募集净额（万元）</th>' +
						'<th class="shuzi">增发价格（元）</th>' +
						'<th>发行方式</th>' +
						'<th>股权登记日</th>' +
						'<th>增发上市日</th>' +
						'<th class="ybdq">资金到账日</th></tr></thead><tbody>';
					$(result).each(function(index, item) {
						otn += '<tr><td class="zbdq">' + item.zfsj + '</td><td class="shuzi">' + item.sjzfsl == "-" ? "-" : item.sjzfsl.toFixed(2) + '</td><td class="shuzi">' + item.sjmjje == "-" ? "-" : item.sjmjje.toFixed(2) + '</td><td class="shuzi">' + item.zfjg == "-" ? "-" : item.zfjg.toFixed(2) + '</td><td title="' + item.fxfs + '"><em class="ycnr" style="margin:0 auto;">' + item.fxfs + '</em></td><td>' + item.gqdjr + '</td><td>' + item.zfssr + '</td><td class="ybdqbj">' + item.zjdzr + '</td></tr>';
					})
					otn += '</tbody></table></div>';
					$('.AzdsjDiv .Aguzengfa').html(otn);
					if(isShowmodel) {
						BS.MyCollect.fileInit("m3629294316", 0, 1, otn);
					}
				} else {
					var tr = "<tr><td colspan='8'>暂无数据</td></tr>"
					$('.AzdsjDiv .Aguzengfa').html(tr)
					if(isShowmodel) {
						BS.MyCollect.fileInit("m3629294316", 0, 1, tr);
					}
				}

			}

		});
	},
	// 1.6.3配股开始
	findPeiGu: function() {
		var paraminfo = {
			stockCode: stockCode,
			pageSize: 10,
			pageNum: 10000
		};
		$.axsRequest("FT611", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var result = data.retData.data;
				if(result != null && result != "" && result != undefined) {
					var otn = '';
					otn += '<div class="AguTable">' +
						'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
						'<table style="width:98%" class="tablemodel">' +
						'<thead>' +
						'<tr>' +
						'<th class="zbdqbj">配股公告日</th>' +
						'<th class="shuzi">配股价格（元）</th>' +
						'<th class="shuzi">实际配股数量（万股）</th>' +
						'<th class="shuzi">实际募资总额（万元）</th>' +
						'<th>股权登记日</th>' +
						'<th>除权基准日</th>' +
						'<th class="ybdq">配股比例</th>' +
						'</tr></thead><tbody>'
					$(result).each(function(index, item) {
						otn += '<tr><td class="zbdq">' + item.pgggr + '</td><td class="shuzi">' + item.pgjg == "-" ? "-" : item.pgjg.toFixed(2) + '</td><td class="shuzi">' + item.sjpgsl == "-" ? "-" : item.sjpgsl.toFixed(2) + '</td><td class="shuzi">' + item.sjmjze == "-" ? "-" : item.sjmjze.toFixed(2) + '</td><td>' + item.gqdjr + '</td><td>' + item.cqjzr + '</td><td class="ybdqbj">' + item.pgfa + '</td></tr>';
					})
					otn += '</tbody></table></div>';
					$('.AzdsjDiv .Agupeigu').html(otn);
					if(isShowmodel) {
						BS.MyCollect.fileInit("m6735302353", 0, 1, otn);
					}
				} else {
					var tr = "<tr><td colspan='7'>暂无数据</td></tr>";
					$('.AzdsjDiv .Agupeigu').html(tr);
					if(isShowmodel) {
						BS.MyCollect.fileInit("m6735302353", 0, 1, tr);
					}
				}
			}

		});
	},
	//1.6.4 分红
	findFenHong: function() {
		var paraminfo = {
			stockCode: stockCode,
			pageSize: 10,
			pageNum: 10000
		};
		$.axsRequest("FT613", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var datas = data.retData.data;
				if(datas != null && datas != "" && datas != undefined) {
					var otn = '';
					otn += '<div class="AguTable">' +
						'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
						'<table style="width:98%" class="tablemodel">' +
						'<thead>' +
						'<tr>' +
						'<th class="zbdqbj">公告日期</th>' +
						'<th>分红方案</th>' +
						'<th>股权登记日</th>' +
						'<th>除权除息日</th>' +
						'<th>派息日</th>' +
						'<th class="ybdq">方案进度</th></tr></thead><tbody>'
					$(datas).each(function(index, item) {
						otn += '<tr><td class="zbdq">' + item.ggrq + '</td><td>' + item.fhfa + '</td><td>' + item.gqdjr + '</td><td>' + item.cqcxr + '</td><td>' + item.pxr + '</td><td class="ybdqbj">' + item.fajd + '</td></tr>';
					})
					otn += '</tbody></table></div>';
					$('.AzdsjDiv .Agufenhong').html(otn);
					if(isShowmodel) {
						BS.MyCollect.fileInit("m4533283960", 0, 1, otn);
					}
				} else {
					var tr = "<tr><td colspan='6'>暂无数据</td></tr>";
					$('.AzdsjDiv .Agufenhong').html(tr);
					if(isShowmodel) {
						BS.MyCollect.fileInit("m4533283960", 0, 1, tr);
					}
				}
			}
		});
	},
	//1.6.5 股权变动公告
	findGuQuanBianDong: function() {
		var paraminfo = {
			stockCode: stockCode,
			pageSize: 10,
			pageNum: 10000
		};
		$.axsRequest("FT614", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var datas = data.retData.data;
				if(datas != null && datas != "" && datas != undefined) {
					var otn = '';
					otn += '<div class="AguTable">' +
						'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
						'<table style="width:98%" class="tablemodel">' +
						'<thead>' +
						'<tr>' +
						'<th class="zbdqbj">姓名</th>' +
						'<th class="ybdq">增持/减持(股)</th>' +
						'<th class="ybdq">变动后持股(股)</th>' +
						'<th class=>时间</th>' +
						'<th>变动人名称</th>' +
						'<th class="ybdq">与董监高关系</th>' +
						'</tr></thead><tbody>';
					$(datas.data).each(function(index, item) {
						otn += '<tr>';
						otn += '<td class="zbdq">' + item.dignitaryName + '</td>';
						otn += '<td class="ybdq">' + item.sharesMsg + '</td>';
						otn += '<td class="ybdq">' + item.sharesNumber + '</td>';
						otn += '<td >' + item.shareDate + '</td>';
						otn += '<td class="fd">' + item.changerName + '</td>';
						otn += '<td class="ybdq rd">' + item.relationShip + '</td>';
						otn += '</tr>';
					})
					otn += '</tbody></table></div>';
					$('.AzdsjDiv .Agubiandong').html(otn);
					if(isShowmodel) {
						BS.MyCollect.fileInit("m3277979406", 0, 1, otn);
					}
				} else {
					var tr = "<tr><td colspan='6'>暂无数据</td></tr>";
					$('.AzdsjDiv .Agubiandong').html(tr);
					if(isShowmodel) {
						BS.MyCollect.fileInit("m3277979406", 0, 1, tr);
					}
				}
			}

		});
	},
	//1.6.6 停复牌
	findTingFuPai: function() {
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT615", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var datas = data.retData;
				if(datas != null && datas != "" && datas != undefined) {
					var otn = '';
					otn += '<div class="AguTable">' +
						'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
						'<table style="width:98%" class="tablemodel">' +
						'<thead>' +
						'<tr>' +
						'<th class="zbdqbj">停牌原因</th>' +
						'<th>停牌起始日期</th>' +
						'<th class="ybdq">停牌截止日期</th>' +
						'</tr></thead><tbody>';
					$(datas).each(function(index, item) {
						otn += '<tr><td class="zbdq">' + item.suspendreason + '</td><td>' + item.suspendsdate + '</td><td class="ybdqbj">' + item.suspendedate + '</td></tr>';
					})
					otn += '</tbody></table></div>';
					$('.AzdsjDiv .Agutingfu').html(otn);
					if(isShowmodel) {
						BS.MyCollect.fileInit("m7700830436", 0, 1, otn);
					}
				} else {
					var tr = "<tr><td colspan='3'>暂无数据</td></tr>";
					$('.AzdsjDiv .Agutingfu').html(tr);
					if(isShowmodel) {
						BS.MyCollect.fileInit("m7700830436", 0, 1, tr);
					}
				}
			}
		});
	},
	//1.6.7员工持股计划完成公告
	findYuanGongChiGu: function() {
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT616", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var datas = data.retData;
				if(datas != null && datas != "" && datas != undefined) {
					var otn = '';
					otn += '<div class="AguTable">' +
						'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
						'<table style="width:98%" class="tablemodel">' +
						'<thead>' +
						'<tr>' +
						'<th class="zbdqbj">最新公告日</th>' +
						'<th class="shuzi">购买总金额（万元）</th>' +
						'<th class="shuzi">购买均价(前复权)(元/股)</th>' +
						'<th class="shuzi">实际持股数（万股）</th>' +
						'<th class="shuzi">实际持股比例（%）</th>' +
						'</tr></thead><tbody>';
					$(datas).each(function(index, item) {
						otn += '<tr><td class="zbdq">' + item.zxggr + '</td><td class="shuzi">' + item.gmzje == "-" ? "-" : item.gmzje.toFixed(2) + '</td><td class="shuzi">' + item.gmjjqfq == "-" ? "-" : item.gmjjqfq.toFixed(2) + '</td><td class="shuzi">' + item.sjcgsl == "-" ? "-" : item.sjcgsl.toFixed(2) + '</td><td class="ybdqbj">' + item.sjcgbl == "-" ? "-" : item.sjcgbl.toFixed(2) + '</td></tr>';
					})
					otn += '</tbody></table></div>';
					$('.AzdsjDiv .Agujihua').html(otn);
					if(isShowmodel) {
						BS.MyCollect.fileInit("m7094447637", 0, 1, otn);
					}
				} else {
					var tr = "<tr><td colspan='5'>暂无数据</td></tr>";
					$('.AzdsjDiv .Agujihua').html(tr);
					if(isShowmodel) {
						BS.MyCollect.fileInit("m7094447637", 0, 1, tr);
					}
				}
			}
		});
	},
	//1.6.8债券发行公告
	//1.6.8.1标准公告
	findZhaiJuanFaXingBZ: function() {
		var paraminfo = {
			stockCode: stockCode,
			categoryLt: 1,
			category: 1,
			pageSize: 10,
			pageNum: 10000
		}
		$.axsRequest("FT617", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var otn = '';
				var _data = data.retData.data;
				if(_data != null && _data != "" && _data != undefined) {
					$(_data).each(function(index, item) {
						if(item.attType == "pdf") {
							otn += "<li><em class='pdf'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" + item.noticeTitle + "</a></em><span class='sjyb'>" + item.reportTime + "</span><div class='clearfix'></div></li>";
						}
						if(item.attType == "doc" || item.attType == "docm" || item.attType == "docx") {
							otn += "<li><em class='word'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" + item.noticeTitle + "</a></em><span class='sjyb'>" + item.reportTime + "</span><div class='clearfix'></div></li>";
						}
						if(item.attType == "xlsx") {
							otn += "<li><em class='excel'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" + item.noticeTitle + "</a></em><span class='sjyb'>" + item.reportTime + "</span><div class='clearfix'></div></li>";
						}
						if(item.attType == "jpg") {
							otn += "<li><em class='jpg'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" + item.noticeTitle + "</a></em><span class='sjyb'>" + item.reportTime + "</span><div class='clearfix'></div></li>";
						}
						if(item.attType == "ppt" || item.attType == "pptx") {
							otn += "<li><em class='ppt'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" + item.noticeTitle + "</a></em><span class='sjyb'>" + item.reportTime + "</span><div class='clearfix'></div></li>";
						}
						if(item.attType == "rar") {
							otn += "<li><em class='rar'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" + item.noticeTitle + "</a></em><span class='sjyb'>" + item.reportTime + "</span><div class='clearfix'></div></li>";
						}

					})
					$('#BZGG').html(otn);
					if(isShowmodel) {
						BS.MyCollect.fileInit("m5307040606", 0, 1, otn);
					}
				} else {
					var tr = "<p>暂无数据</p>";
					$('#BZGG').html(tr);
					if(isShowmodel) {
						BS.MyCollect.fileInit("m5307040606", 0, 1, tr);
					}
				}
			}
		});
	},
	//1.6.8.2募集公告
	findZhaiJuanFaXingMJ: function() {
		var paraminfo = {
			stockCode: stockCode,
			categoryLt: 2,
			category: 1,
			pageSize: 10,
			pageNum: 10000
		}
		$.axsRequest("FT617", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var otn = '';
				var _data = data.retData.data;
				if(_data != null && _data != "" && _data != undefined) {
					$(_data).each(function(index, item) {
						if(item.attType == "pdf") {
							otn += "<li><em class='pdf'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" + item.noticeTitle + "</a></em><span class='sjyb'>" + item.reportTime + "</span><div class='clearfix'></div></li>";
						}
						if(item.attType == "doc" || item.attType == "docm" || item.attType == "docx") {
							otn += "<li><em class='word'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" + item.noticeTitle + "</a></em><span class='sjyb'>" + item.reportTime + "</span><div class='clearfix'></div></li>";
						}
						if(item.attType == "xlsx") {
							otn += "<li><em class='excel'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" + item.noticeTitle + "</a></em><span class='sjyb'>" + item.reportTime + "</span><div class='clearfix'></div></li>";
						}
						if(item.attType == "jpg") {
							otn += "<li><em class='jpg'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" + item.noticeTitle + "</a></em><span class='sjyb'>" + item.reportTime + "</span><div class='clearfix'></div></li>";
						}
						if(item.attType == "ppt" || item.attType == "pptx") {
							otn += "<li><em class='ppt'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" + item.noticeTitle + "</a></em><span class='sjyb'>" + item.reportTime + "</span><div class='clearfix'></div></li>";
						}
						if(item.attType == "rar") {
							otn += "<li><em class='rar'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" + item.noticeTitle + "</a></em><span class='sjyb'>" + item.reportTime + "</span><div class='clearfix'></div></li>";
						}
					})
					$('#MJGG').html(otn)
				} else {
					var tr = "<p>暂无数据</p>";
					$('#MJGG').html(tr);
				}
			}
		});
	},
	//1.6.8.3结果公告
	findZhaiJuanFaXingJG: function() {
		var paraminfo = {
			stockCode: stockCode,
			categoryLt: 3,
			category: 1,
			pageSize: 10,
			pageNum: 10000
		}
		$.axsRequest("FT617", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var _data = data.retData.data;
				var otn = '';
				if(_data != null && _data != "" && _data != undefined) {
					$(_data).each(function(index, item) {
						if(item.attType == "pdf") {
							otn += "<li><em class='pdf'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" + item.noticeTitle + "</a></em><span class='sjyb'>" + item.reportTime + "</span><div class='clearfix'></div></li>";
						}
						if(item.attType == "doc" || item.attType == "docm" || item.attType == "docx") {
							otn += "<li><em class='word'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" + item.noticeTitle + "</a></em><span class='sjyb'>" + item.reportTime + "</span><div class='clearfix'></div></li>";
						}
						if(item.attType == "xlsx") {
							otn += "<li><em class='excel'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" + item.noticeTitle + "</a></em><span class='sjyb'>" + item.reportTime + "</span><div class='clearfix'></div></li>";
						}
						if(item.attType == "jpg") {
							otn += "<li><em class='jpg'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" + item.noticeTitle + "</a></em><span class='sjyb'>" + item.reportTime + "</span><div class='clearfix'></div></li>";
						}
						if(item.attType == "ppt" || item.attType == "pptx") {
							otn += "<li><em class='ppt'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" + item.noticeTitle + "</a></em><span class='sjyb'>" + item.reportTime + "</span><div class='clearfix'></div></li>";
						}
						if(item.attType == "rar") {
							otn += "<li><em class='rar'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" + item.noticeTitle + "</a></em><span class='sjyb'>" + item.reportTime + "</span><div class='clearfix'></div></li>";
						}
					})
					$('#JGGG').html(otn)
				} else {
					var tr = "<p>暂无数据</p>";
					$('#JGGG').html(tr);
				}
			}
		});
	},
	//1.6.8.4其他公告
	findZhaiJuanFaXingQT: function() {
		var paraminfo = {
			stockCode: stockCode,
			categoryLt: 4,
			category: 1,
			pageSize: 10,
			pageNum: 10000
		}
		$.axsRequest("FT617", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var _data = data.retData.data;
				var otn = '';
				if(_data != null && _data != "" && _data != undefined) {
					$(_data).each(function(index, item) {
						if(item.attType == "pdf") {
							otn += "<li><em class='pdf'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" + item.noticeTitle + "</a></em><span class='sjyb'>" + item.reportTime + "</span><div class='clearfix'></div></li>";
						}
						if(item.attType == "doc" || item.attType == "docm" || item.attType == "docx") {
							otn += "<li><em class='word'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" + item.noticeTitle + "</a></em><span class='sjyb'>" + item.reportTime + "</span><div class='clearfix'></div></li>";
						}
						if(item.attType == "xlsx") {
							otn += "<li><em class='excel'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" + item.noticeTitle + "</a></em><span class='sjyb'>" + item.reportTime + "</span><div class='clearfix'></div></li>";
						}
						if(item.attType == "jpg") {
							otn += "<li><em class='jpg'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" + item.noticeTitle + "</a></em><span class='sjyb'>" + item.reportTime + "</span><div class='clearfix'></div></li>";
						}
						if(item.attType == "ppt" || item.attType == "pptx") {
							otn += "<li><em class='ppt'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" + item.noticeTitle + "</a></em><span class='sjyb'>" + item.reportTime + "</span><div class='clearfix'></div></li>";
						}
						if(item.attType == "rar") {
							otn += "<li><em class='rar'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" + item.noticeTitle + "</a></em><span class='sjyb'>" + item.reportTime + "</span><div class='clearfix'></div></li>";
						}
					})
					$('#QTGG').html(otn)
				} else {
					var tr = "<p>暂无数据</p>";
					$('#QTGG').html(tr);
				}

			}

		});
	},
	//1.6.9特别处理
	findZhaiJuanFaXingTB: function() {
		var paraminfo = {
			stockCode: stockCode,
			category: 2,
			pageSize: 10,
			pageNum: 10000
		}
		$.axsRequest("FT617", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var _data = data.retData.data;
				if(_data != null && _data != "" && _data != undefined) {
					var otn = '';
					$(_data).each(function(index, item) {
						if(item.attType == "pdf") {
							otn += "<li><em class='pdf'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" + item.noticeTitle + "</a></em><span class='sjyb'>" + item.reportTime + "</span><div class='clearfix'></div></li>";
						}
						if(item.attType == "doc" || item.attType == "docm" || item.attType == "docx") {
							otn += "<li><em class='word'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" + item.noticeTitle + "</a></em><span class='sjyb'>" + item.reportTime + "</span><div class='clearfix'></div></li>";
						}
						if(item.attType == "xlsx") {
							otn += "<li><em class='excel'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" + item.noticeTitle + "</a></em><span class='sjyb'>" + item.reportTime + "</span><div class='clearfix'></div></li>";
						}
						if(item.attType == "jpg") {
							otn += "<li><em class='jpg'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" + item.noticeTitle + "</a></em><span class='sjyb'>" + item.reportTime + "</span><div class='clearfix'></div></li>";
						}
						if(item.attType == "ppt" || item.attType == "pptx") {
							otn += "<li><em class='ppt'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" + item.noticeTitle + "</a></em><span class='sjyb'>" + item.reportTime + "</span><div class='clearfix'></div></li>";
						}
						if(item.attType == "rar") {
							otn += "<li><em class='rar'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" + item.noticeTitle + "</a></em><span class='sjyb'>" + item.reportTime + "</span><div class='clearfix'></div></li>";
						}
					})
					$('#tbcl').html(otn);
					if(isShowmodel) {
						BS.MyCollect.fileInit("m1828698368", 0, 1, otn);
					}
				} else {
					var p = '<p>暂无数据</p>';
					$('#tbcl').html(p);
					if(isShowmodel) {
						BS.MyCollect.fileInit("m1828698368", 0, 1, p);
					}
				}

			}

		});
	},
	//1.6.10监管问询
	findZhaiJuanFaXingJGWX: function() {
		var paraminfo = {
			stockCode: stockCode,
			category: 3,
			pageSize: 10,
			pageNum: 10000
		}
		$.axsRequest("FT617", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var _data = data.retData.data;
				var otn = '';
				if(_data != null && _data != "" && _data != undefined) {
					$(_data).each(function(index, item) {
						if(item.attType == "pdf") {
							otn += "<li><em class='pdf'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" + item.noticeTitle + "</a></em><span class='sjyb'>" + item.reportTime + "</span><div class='clearfix'></div></li>";
						}
						if(item.attType == "doc" || item.attType == "docm" || item.attType == "docx") {
							otn += "<li><em class='word'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" + item.noticeTitle + "</a></em><span class='sjyb'>" + item.reportTime + "</span><div class='clearfix'></div></li>";
						}
						if(item.attType == "xlsx") {
							otn += "<li><em class='excel'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" + item.noticeTitle + "</a></em><span class='sjyb'>" + item.reportTime + "</span><div class='clearfix'></div></li>";
						}
						if(item.attType == "jpg") {
							otn += "<li><em class='jpg'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" + item.noticeTitle + "</a></em><span class='sjyb'>" + item.reportTime + "</span><div class='clearfix'></div></li>";
						}
						if(item.attType == "ppt" || item.attType == "pptx") {
							otn += "<li><em class='ppt'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" + item.noticeTitle + "</a></em><span class='sjyb'>" + item.reportTime + "</span><div class='clearfix'></div></li>";
						}
						if(item.attType == "rar") {
							otn += "<li><em class='rar'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" + item.noticeTitle + "</a></em><span class='sjyb'>" + item.reportTime + "</span><div class='clearfix'></div></li>";
						}
					})
					$('#jgwx').html(otn);
					if(isShowmodel) {
						BS.MyCollect.fileInit("m4385008318", 0, 1, otn);
					}
				} else {
					var tr = "<p>暂无数据</p>";
					$('#jgwx').html(tr);
					if(isShowmodel) {
						BS.MyCollect.fileInit("m4385008318", 0, 1, tr);
					}
				}

			}
		});

	},
	//1.6.11对外投资
	findDuiWaiTouZi: function() {
		$(".dwtznr").addClass("dwtz");
		var paraminfo = {
			stockCode: stockCode,
			pageSize: 10,
			pageNum: 10000
		}
		$.axsRequest("FT618", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var otn = '';
				otn += ''
				otn += '<div class="AguTable dwtznr">' +
					'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
					'<table style="width:98%" class="tablemodel">' +
					'<thead>' +
					'<tr>' +
					'<th class="zbdqbj">被投资企业名称</th>' +
					'<th>被投资企业法人</th>' +
					'<th class="shuzi">注册资本（万元）</th>' +
					'<th class="shuzi">投资金额（万元）</th>' +
					'<th class="shuzi">投资占比（%）</th>' +
					'<th>注册时间</th>' +
					'<th>状态</th>' +
					'</tr></thead><tbody>';
				var _data = data.retData.data;
				if(_data != null && _data != "" && _data != undefined) {
					$(_data).each(function(index, item) {
						otn += '<tr><td class="zbdq" title="' + item.name + '"><em class="ycnr">' + item.name + '</em></td><td title="' + item.legalPersonName + '"><em class="ycnr">' + item.legalPersonName + '</em></td>';
						if(item.regCapital != "" && item.regCapital != null && item.regCapital != undefined) {
							otn += '<td  class="shuzi">' + item.regCapital + '</td>';
						} else {
							otn += '<td  class="shuzi">--</td>';
						}

						otn += '<td class="shuzi">' + (isSZKong(item.amount) * 10000).toFixed(2) + '</td><td>' + isSZKong(item.percent) + '</td><td  class="shuzi">' + isSZKong(item.estiblishTime) + '</td><td class="ybdqbj">' + isSZKong(item.regStatus) + '</td></tr>';
					})
					otn += '</tbody></table><div class="gqbd" id="gqbdDW"><div class="pagination" id="pagesDWTZ"></div></div></div>'
					$('.AzdsjDiv .Agutouzi').html(otn);
					if(isShowmodel) {
						BS.MyCollect.fileInit("m3142066958", 0, 1, otn);
					}
				} else {
					$(".dwtznr").removeClass("dwtz");
					var tr = "<tr><td colspan='6'>暂无数据</td></tr>";
					$('.AzdsjDiv .Agutouzi').html(tr);
					if(isShowmodel) {
						BS.MyCollect.fileInit("m3142066958", 0, 1, tr);
					}
				}

			}
		});
	},
	//1.6.12解禁预告
	findJieJinYuGao: function() {
		var paraminfo = {
			stockCode: stockCode
		}
		$.axsRequest("FT619", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var otn = '';
				otn += '';
				otn += '<div class="AguTable">' +
					'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
					'<table style="width:98%" class="tablemodel">' +
					'<thead>' +
					'<tr>' +
					'<th class="zbdqbj">解禁时间</th>' +
					'<th class="shuzi">解禁数量（万股）</th>' +
					'<th class="shuzi">总股本占比（%）</th>' +
					'</tr></thead><tbody>';
				var data = data.retData;
				if(data != null && data != "" && data != undefined) {
					$(data).each(function(index, item) {
						otn += '<tr><td class="zbdq">' + item.jjsj + '</td><td class="shuzi">' + item.jjsl + '</td><td  class="shuzi">' + item.zgbzb.toFixed(2) + '</td></tr>';
					})
					otn += '</tbody></table></div>'
					$('.AzdsjDiv .Aguyugao').html(otn);
					if(isShowmodel) {
						BS.MyCollect.fileInit("m7250897720", 0, 1, otn);
					}
				} else {
					var tr = "<tr><td colspan='3'>暂无数据</td></tr>";
					$('.AzdsjDiv .Aguyugao').html(tr);
					if(isShowmodel) {
						BS.MyCollect.fileInit("m7250897720", 0, 1, tr);
					}
				}
			}
		});
	},
	//解禁详情
	AfindDetailbyId: function(id) {
		var id = {
			id: id
		};
		$.axsRequest("FT620", id, true, function(data) {
			if(data.retCode == "0000") {
				if(data.retData != "" && data.retData != null && data.retData != undefined) {
					var result = data.retData;
					var tr = '';
					$(result).each(function(index, item) {
						tr += '<tr>';
						tr += '<td class="zbdqbj">' + item.gdmc + '</td>';
						tr += '<td class="shuzi">' + item.bcjjgfsl + '</td>';
						tr += '<td class="ybnbj">' + item.syyxsgfsl + '</td>';
						tr += '</tr>';
					})
					$("#jjgdList").html(tr);
				} else {
					var tr = '<tr><td colspan="4">暂无数据</td></tr>';
					$("#jjgdList").html(tr);
				}
			}
		})
	},
	//风险信息-法律诉讼
	Afxflinfo: function() {
		var $fxfl = '';
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '","pageSize":"10","pageNum":"10000"}}';
		$.axsRequest("FT621", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var result2 = data.retData;
				if(result2 == "" && result2 == null && result2 == undefined) {
					var divkong = "<div class=''>暂无数据</div>"
					$(".AfxxxDiv .Afalv").html(divkong);
					if(isShowmodel) {
						BS.MyCollect.fileInit("m5630845076", 0, 1, divkong);
					}
				}
				$fxfl += '<div class="">' +
					'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
					'<table style="width:98%" class="tablemodel"><thead><tr><th>裁判文书</th><th>案件类型</th><th>日期</th><th>案件号</th></tr></thead><tbody>'
				$(result2).each(function(index, item) {
					$fxfl += '<tr><td>' + item.title + '</td><td>' + item.casetype + '</td><td>' + item.submittime + '</td><td>' + item.caseno + '</td></tr>';
				})
				$fxfl += '</tbody></table></div>';
				$fxfl = ReplaceAll($fxfl, "null", "--");
				$fxfl = ReplaceAll($fxfl, "undefined", "--");
				$(".AfxxxDiv .Afalv").html($fxfl);
				if(isShowmodel) {
					BS.MyCollect.fileInit("m5630845076", 0, 1, $fxfl);
				}

			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});

	},
	//风险信息-经营异常
	Afxjyinfo: function() {
		var $fxjy = '';
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT622", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var result2 = data.retData;
				if(result2 == "" && result2 == null && result2 == undefined) {
					var divkong = "<div class=''>暂无数据</div>"
					$(".AfxxxDiv .Ajingying").html(divkong);
					if(isShowmodel) {
						BS.MyCollect.fileInit("m2518890554", 0, 1, divkong);
					}
				}
				$fxjy += '<div class="">' +
					'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
					'<table style="width:98%" class="tablemodel"><thead><tr><th>列入原因</th><th>列入日期</th><th>决定机关</th><th>移除原因</th><th>移出日期</th><th class="ybdq">移除机关</th></tr></thead><tbody>'
				$(result2).each(function(index, item) {
					$fxjy += '<tr><td>' + item.putReason + '</td><td>' + item.putDate + '</td><td>' + item.putDepartment + '</td><td>' + item.removeReason + '</td><td>' + item.removeDate + '</td><td>' + item.removeDepartment + '</td></tr>';
				})
				$fxjy += '</tbody></table></div>';
				$fxjy = ReplaceAll($fxjy, "null", "--");
				$fxjy = ReplaceAll($fxjy, "undefined", "--");
				$(".AfxxxDiv .Ajingying").html($fxjy);
				if(isShowmodel) {
					BS.MyCollect.fileInit("m2518890554", 0, 1, $fxjy);
				}

			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});

	},
	//风险信息-股权出质
	Afxgqinfo: function() {
		var $fxgq = '';
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT623", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var result2 = data.retData;
				if(result2 == "" && result2 == null && result2 == undefined) {
					var divkong = "<div class=''>暂无数据</div>"
					$(".AfxxxDiv .Aguquan").html(divkong);
					if(isShowmodel) {
						BS.MyCollect.fileInit("m5630845076g", 0, 1, divkong);
					}
				}
				$fxgq += '<div class="">' +
					'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
					'<table style="width:98%" class="tablemodel"><thead><tr><th style="width: 115px;">登记日</th><th style="width: 180px;">登记编号</th><th style="width: 60px;">状态</th><th style="width: 110px;">出质股权数额</th><th style="width: 80px;">出质人</th><th style="width: 80px;">质权人</th></tr></thead><tbody>';
				$(result2).each(function(index, item) {
					$fxgq += '<tr><td>' + item.equityPledgedRecordDate + '</td><td>' + item.equityPledgedRecordNumber + '</td><td>' + item.equityPledgedState + '</td><td>' + item.equityPledgedAmount + '</td><td>' + item.equityPledgedPerson + '</td><td>' + item.equityPledgedPawnee + '</td></tr>';
				})
				//				console.log($fxgq);
				$fxgq += '</tbody></table></div><div class="yuce-tips"><em>*</em>备注: 所报材料真实合法,一切责任由当事人自负</div>'
				$fxgq = ReplaceAll($fxgq, "null", "--");
				$fxgq = ReplaceAll($fxgq, "undefined", "--");
				$(".AfxxxDiv .Aguquan").html($fxgq);
				if(isShowmodel) {
					BS.MyCollect.fileInit("m5630845076g", 0, 1, $fxgq);
				}
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});

	},
	//风险信息-欠税公告
	Afxqsinfo: function() {
		var $fxqs = '';
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT624", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				if(result2 == "" && result2 == null && result2 == undefined) {
					var divkong = "<div class=''>暂无数据</div>"
					$(".AfxxxDiv .Aqianshui").html(divkong);
					if(isShowmodel) {
						BS.MyCollect.fileInit("m5630845076f", 0, 1, divkong);
					}
				}
				var result2 = data.retData;
				$fxqs += '<div class="">' +
					'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
					'<table style="width:98%" class="tablemodel"><thead><tr><th>发布日期</th><th>纳税人识别号</th><th>欠税税种</th><th>当前发生的欠税额</th><th>欠税余额</th><th>税务机关</th></tr></thead><tbody>';
				$(result2).each(function(index, item) {
					$fxqs += '<tr><td>' + item.releaseDate + '</td><td>' + item.registrationNumber + '</td><td>' + item.qutstandingTaxes + '</td><td>' + item.backTaxes + '</td><td>' + item.taxesBalance + '</td><td>' + item.taxAuthority + '</td></tr>';
				})
				$fxqs += '</tbody></table></div>';
				$fxqs = ReplaceAll($fxqs, "null", "--");
				$fxqs = ReplaceAll($fxqs, "undefined", "--");
				$(".AfxxxDiv .Aqianshui").html($fxqs);
				if(isShowmodel) {
					BS.MyCollect.fileInit("m5630845076f", 0, 1, $fxqs);
				}
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});
	},
	//第二章行业介绍---暂无数据
	Ahangye: function() {
		//		var $fxqs = '';
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT625", paraminfo, true, function(data) {
			//			console.log(data);
			if(data == null || data == "" || data == undefined) {
				var hangyehtmlempty = "<div class=''>暂无数据</div>";
				$("#AindustryRemark").html(hangyehtmlempty);
				if(isShowmodel) {
					BS.MyCollect.fileInit("m141651166h", 0, 1, hangyehtmlempty);
				}
			}
			//			if(data.retCode == "0000") {
			//				var result2 = data.retData;
			//				if(result2 == "" || result2 == null || result2 == undefined){
			//					var hangyehtmlempty="<div class=''>暂无数据</div>";
			//					$("#AindustryRemark").html(hangyehtmlempty);
			//					BS.MyCollect.fileInit("m141651166h", 0, 1, hangyehtmlempty);
			//				}else{
			//					var chiname=result2.infoList.chiName;
			//					var englishName=result2.infoList.englishName;
			//					var companyForShort=result2.infoList.companyForShort;
			//					var stockBlock=result2.infoList.stockBlock;
			//					var AindustryRemarkinfo="<div class=''>"+chiname+englishName+companyForShort+stockBlock+"</div>";
			//					$("#AindustryRemark").html(AindustryRemarkinfo);
			//					BS.MyCollect.fileInit("m141651166h", 0, 1, AindustryRemarkinfo);
			//				}
			//			} else {
			//				errorAlert(data.retCode, data.retMsg);
			//			}
		});
	},
	//主要产品和服务
	Azyywinfo: function() {
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT601", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var productinfos = "<div class=''>" + data.retData.majorProductsDuties + "</div>";
				if(data == "" || data == null || data == undefined) {
					$(".AzyywfxDiv .mainbusiness").html("<div class=''>暂无数据</div>");
				} else {
					$(".AzyywfxDiv .mainbusiness").html(productinfos);
					if(isShowmodel) {
						BS.MyCollect.fileInit("m3597370042", 0, 1, productinfos);
					}
				}
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});
	},
	//主营业务收入
	Azyywsrinfo: function() {
		var obj = this;
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT626", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var data = data.retData;
				var dlength = data.date.length;
				var $zyywsr = '';
				if(data == null || data == "" || data == undefined) {
					$zyywsr += '<div class="">' +
						'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
						'<table style="width:98%" class="tablemodel"><thead><tr><th>项目</th></tr></thead><tbody>';
					$zyywsr += '<tr>';
					$zyywsr += '<td>--</td>';
					$zyywsr += '<tr>';
					$zyywsr += '</tbody></table></div>';
					$('.AzyywfxDiv .ywsrbt').html($zyywsr);
					if(isShowmodel) {
						BS.MyCollect.fileInit("m3507728468", 0, 1, $zyywsr);
					}
				} else {
					if(dlength == 1) {
						var zydate = data.date;
						var zydata = data.data;
						$zyywsr += '<div class="">' +
							'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
							'<table style="width:98%" class="tablemodel"><thead><tr><th>项目</th><th class="shuzi">' + zydate[0] + '</th></tr></thead><tbody>';
						$(zydata).each(function(index, item) {
							$zyywsr += '<tr><td>' + item.project + '</td><td>' + item.newMoney + '</td></tr>';
						})
						$zyywsr += '</tbody></table></div>';
						$('.AzyywfxDiv .ywsrbt').html($zyywsr);
						BS.MyCollect.fileInit("m3507728468", 0, 1, $zyywsr);
					}
					if(dlength == 2) {
						var zydate2 = data.date;
						var zydata2 = data.data;
						$zyywsr += '<div class="">' +
							'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
							'<table style="width:98%" class="tablemodel"><thead><tr><th>项目</th><th class="shuzi">' + zydate2[0] + '</th><th class="shuzi">' + zydate2[1] + '</th><th class="shuzi">变化金额</th><th class="shuzi">增长率</th></tr></thead><tbody>';
						$(zydata2).each(function(index, item) {
							$zyywsr += '<tr><td>' + item.project + '</td><td>' + item.newMoney + '</td><td>' + item.oldMoney + '</td><td>' + item.changeMoney + '</td><td>' + item.changeMoneyLv + '</td></tr>';
						})
						$zyywsr += '</tbody></table></div>';
						$('.AzyywfxDiv .ywsrbt').html($zyywsr);
						if(isShowmodel) {
							BS.MyCollect.fileInit("m3507728468", 0, 1, $zyywsr);
						}

					}
				}
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});
	},
	//营业收入及同比增长率（图表）
	AbusinessIncome: function() {
		n = false;
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT636", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				if(data.retData != null && data.retData != "" && data.retData != undefined) {
					var result = data.retData;
					//WF_ajax.findBusinessIncome(params,true,function(data){
					//$("#businessIncomeShowName").html("2.2.1"+data.REVZengZhangLv_showName);
					var dateList = result.portTime;
					var yingyeDataList = result.f2QZYYSR; //营业收入
					var REVZengZhangLvList = result.REVZengZhangLv; //增长率
					// 使用刚指定的配置项和数据显示图表。
					var start = ((result.portTime.length - 4) / result.portTime.length) * 100;
					var option = {
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
							left: '10%',
							bottom: '30%'
						},
						xAxis: {
							type: 'category',
							data: dateList //['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
						},
						label: {
							normal: {
								show: true,
								position: 'top'
							}
						},
						dataZoom: {
							type: 'slider',
							show: true,
							start: start,
							end: 100,
							bottom: '3%',
							zoomLock: true
						},
						yAxis: [{
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
									show: true
								}
								//              min:0,
								//              max:100,
								//              axisLabel:{
								//              	show:true,
								//              	formatter:"{value}"
								//              }
							}
						],
						series: [{
								name: '营业收入',
								type: 'bar',
								yAxisIndex: 0,
								barMaxWidth: '30',
								data: yingyeDataList //[2.6, 5.9, 80.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
							},
							{
								name: '增长率',
								type: 'line',
								yAxisIndex: 1,
								symbol: "circle",
								data: REVZengZhangLvList, //[51, 20, 56, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
								axisLine: {
									show: false
								}
							}
						]
					};
					var myChart = echarts.init(document.getElementById('AbusinessIncome'));
					myChart.setOption(option);
					BS.MyCollect.myimg("AbusinessIncome", myChart, "m7156231092", 0)

					window.addEventListener("resize", function() {
						myChart.resize();
					});
					n = true;
				} else {
					$("#businessIncome").html('<div class="noDatas">暂无数据</div>');
					$("#businessIncome").height('auto');
					n = false; //新增 无数据项返回
				}

			} else {
				errorAlert(data.retCode, data.retMsg);
			}

		})
		if(n)
			return true;
		else
			return false;
	},
	//利润总额及同比增长率（图表）
	AfindTotalProfit: function(_callback) {
		n = false;
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT637", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				if(data.retData != null && data.retData != "" && data.retData != undefined) {
					var result = data.retData;

					//$("#businessIncomeShowName").html("2.2.1"+data.LiRunZongEZengZhangLv_showName);
					var dateList = result.portTime;
					var yingyeDataList = result.f2LRZE; //营业收入
					var REVZengZhangLvList = result.LiRunZongEZengZhangLv; //增长率
					var end = (4 / dateList.length) * 100;
					// 使用刚指定的配置项和数据显示图表。
					var myChart = echarts.init(document.getElementById('AtotalProfit'));
					var option = {
						color: [
							"#62a6f2", "#feb535"
						],
						calculable: true,
						legend: {
							show: true,
							data: ["利润总额", '增长率']
						},
						grid: {
							show: true,
							right: '10%',
							left: '10%',
							bottom: '30%'
						},
						dataZoom: {
							type: 'slider',
							show: true,
							start: '0',
							end: end,
							bottom: '3%',
							zoomLock: true
						},
						xAxis: {
							type: 'category',
							data: dateList //['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
						},
						label: {
							normal: {
								show: true,
								position: 'top'
							}
						},
						yAxis: [{
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
									show: true
								}
								//              min:0,
								//              max:100,
								//              axisLabel:{
								//              	show:true,
								//              	formatter:"{value}"
								//              }
							}
						],
						series: [{
								name: '利润总额',
								type: 'bar',
								yAxisIndex: 0,
								barMaxWidth: '30',
								data: yingyeDataList //[2.6, 5.9, 80.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
							},
							{
								name: '增长率',
								type: 'line',
								yAxisIndex: 1,
								//              barMaxWidth:'30',
								symbol: "circle",
								data: REVZengZhangLvList, //[51, 20, 56, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
								axisLine: {
									show: false
								}
							}
						]
					};

					myChart.setOption(option);
					BS.MyCollect.myimg("AtotalProfit", myChart, "m5927730195", 0)

					window.addEventListener("resize", function() {
						myChart.resize();
					});
					n = true;
				} else {
					$("#totalProfit").html('<div class="noDatas">暂无数据</div>');
					$("#totalProfit").height('auto')
					n = false;
				}

			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		})
		if(n)
			return true;
		else
			return false;
	},
	//净利润及同比增长率(图表)
	AfindNetProfit: function(_callback) {
		n = false;
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT638", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				if(data.retData != null && data.retData != "" && data.retData != undefined) {
					var result = data.retData;
					//$("#businessIncomeShowName").html("2.2.1"+data.JingLiRunZengZhangLv_showName);
					var dateList = result.portTime;
					var yingyeDataList = result.f2JLR; //营业收入
					var REVZengZhangLvList = result.JingLiRunZengZhangLv; //增长率
					var end = (4 / dateList.length) * 100;
					// 使用刚指定的配置项和数据显示图表。
					var myChart = echarts.init(document.getElementById('AnetProfit'));
					var option = {
						color: [
							"#62a6f2", "#feb535"
						],
						calculable: true,
						legend: {
							show: true,
							data: ["净利润", '增长率']
						},
						grid: {
							show: true,
							right: '10%',
							left: '10%',
							bottom: '30%'
						},
						xAxis: {
							type: 'category',
							data: dateList //['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
						},
						label: {
							normal: {
								show: true,
								position: 'top'
							}
						},
						dataZoom: {
							type: 'slider',
							show: true,
							start: '0',
							end: end,
							bottom: '3%',
							zoomLock: true
						},
						yAxis: [{
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
									show: true
								}
								//              min:0,
								//              max:100,
								//              axisLabel:{
								//              	show:true,
								//              	formatter:"{value}"
								//              }
							}
						],
						series: [{
								name: '净利润',
								type: 'bar',
								yAxisIndex: 0,
								barMaxWidth: '30',
								data: yingyeDataList //[2.6, 5.9, 80.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
							},
							{
								name: '增长率',
								type: 'line',
								yAxisIndex: 1,
								//              barMaxWidth:'30',
								symbol: "circle",
								data: REVZengZhangLvList, //[51, 20, 56, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
								axisLine: {
									show: false
								}
							}
						]
					};

					myChart.setOption(option);
					BS.MyCollect.myimg("AnetProfit", myChart, "m4832488265", 0)

					window.addEventListener("resize", function() {
						myChart.resize();
					});
					n = true;
				} else {
					$("#netProfit").html('<div class="noDatas">暂无数据</div>');
					$("#netProfit").height('auto')
					n = false;
				}

			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		})
		if(n)
			return true;
		else
			return false;
	},
	//总资产及同比增长率（图表）
	AfindTotalAssets: function(_callback) {
		n = false;
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT639", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				if(data.retData != null && data.retData != "" && data.retData != undefined) {
					var result = data.retData;
					//$("#businessIncomeShowName").html("2.2.1"+data.ZongZiChanZengZhangLv_showName);
					var dateList = result.portTime;
					var yingyeDataList = result.f1ZCZJ; //营业收入
					var REVZengZhangLvList = result.ZongZiChanZengZhangLv; //增长率
					var end = (4 / dateList.length) * 100;
					// 使用刚指定的配置项和数据显示图表。
					var myChart = echarts.init(document.getElementById('AtotalAssets'));
					var option = {
						color: [
							"#62a6f2", "#feb535"
						],
						calculable: true,
						legend: {
							show: true,
							data: ["总资产", '增长率']
						},
						grid: {
							show: true,
							right: '10%',
							left: '10%',
							bottom: '30%'
						},
						dataZoom: {
							type: 'slider',
							show: true,
							start: '0',
							end: end,
							bottom: '3%',
							zoomLock: true
						},
						xAxis: {
							type: 'category',
							data: dateList //['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
						},
						label: {
							normal: {
								show: true,
								position: 'top'
							}
						},
						yAxis: [{
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
									show: true
								}
								//              min:0,
								//              max:100,
								//              axisLabel:{
								//              	show:true,
								//              	formatter:"{value}"
								//              }
							}
						],
						series: [{
								name: '总资产',
								type: 'bar',
								yAxisIndex: 0,
								barMaxWidth: '30',
								data: yingyeDataList //[2.6, 5.9, 80.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
							},
							{
								name: '增长率',
								type: 'line',
								yAxisIndex: 1,
								//              barMaxWidth:'30',
								symbol: "circle",
								data: REVZengZhangLvList, //[51, 20, 56, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
								axisLine: {
									show: false
								}
							}
						]
					};

					myChart.setOption(option);
					BS.MyCollect.myimg("AtotalAssets", myChart, "m5756473171", 0)

					window.addEventListener("resize", function() {
						myChart.resize();
					});
					n = true;
				} else {
					$("#totalAssets").html('<div class="noDatas">暂无数据</div>');
					$("#totalAssets").height('auto')
					n = false;
				}

			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		})
		return n;
	},
	//5销售毛利率与销售净利率变动情况（图表）
	AfindInterestRateChange: function(_callback) {
		n = false;
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT640", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				if(data.retData != null && data.retData != "" && data.retData != undefined) {
					var result = data.retData;

					//$("#businessIncomeShowName").html("2.2.1"+data.REVZengZhangLv_showName);
					var dateList = result.portTime;
					var yingyeDataList = result.XiaoShouMaoLiLv; //营业收入
					var REVZengZhangLvList = result.XiaoShouJingLiRunLv; //增长率
					var end = (4 / dateList.length) * 100;
					// 使用刚指定的配置项和数据显示图表。
					var myChart = echarts.init(document.getElementById('AinterestRateChange'));
					var option = {
						color: [
							"#62a6f2", "#feb535"
						],
						calculable: true,
						tooltip: {
							trigger: 'axis'
						},
						legend: {
							show: true,
							data: ["销售毛利率", '销售净利率']
						},
						grid: {
							show: true,
							right: '10%',
							left: '10%',
							bottom: '30%'
						},
						dataZoom: {
							type: 'slider',
							show: true,
							start: '0',
							end: end,
							bottom: '3%',
							zoomLock: true
						},
						xAxis: {
							type: 'category',
							data: dateList //['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
						},
						label: {
							normal: {
								show: true,
								position: 'top'
							}
						},
						yAxis: [{
								type: 'value',
								name: "单位：%",
								axisLabel: {
									show: true,
									formatter: "{value}"
								}
							},
							{
								type: 'value',
								name: "单位：%",
								splitLine: {
									show: true
								}
								//              min:0,
								//              max:100,
								//              axisLabel:{
								//              	show:true,
								//              	formatter:"{value}"
								//              }
							}
						],
						series: [{
								name: '销售毛利率',
								type: 'line',
								yAxisIndex: 0,
								symbol: "circle",
								data: yingyeDataList //[2.6, 5.9, 80.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
							},
							{
								name: '销售净利率',
								type: 'line',
								yAxisIndex: 1,
								//              barMaxWidth:'30',
								symbol: "circle",
								data: REVZengZhangLvList, //[51, 20, 56, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
								axisLine: {
									show: false
								}
							}
						]
					};

					myChart.setOption(option);
					BS.MyCollect.myimg("AinterestRateChange", myChart, "m2230853853", 0)

					window.addEventListener("resize", function() {
						myChart.resize();
					});
					n = true;
				} else {
					$("#interestRateChange").html('<div class="noDatas">无</div>');
					$("#interestRateChange").height('auto')
					n = false;
				}

			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		})
		return n;
	},
	//追加图表
	//一个折线图和一个柱状图
	//3.3 1供应商
	findGongYingShang: function() {
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT628", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var data = data.retData;
				var otn = '';
				otn += '<div class="AguTable">' +
					'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
					'<table style="width:98%" class="tablemodel">' +
					'<thead>' +
					'<tr>' +
					'<th class="zbdq">序号</th>' +
					'<th>供应商名称</th>' +
					'<th class="ybdq">采购金额（万元）</th>' +
					'<th class="ybdq">年度采购占比（%）</th>' +
					'</tr></thead><tbody>';
				if(data == null || data == "" || data == undefined) {
					var trHtml = '<tr><td colspan="4">暂无数据</td></tr>';
					$(".AqwdgysjkhDiv .Agongyingshang").html(trHtml);
					if(isShowmodel) {
						BS.MyCollect.fileInit("m9558332368g", 0, 1, trHtml);
					}
				} else {
					$(data).each(function(index, item) {
						otn += '<tr><td class="zbdq">' + item.ranking + '</td><td>' + item.suppliersName + '</td><td class="shuzi ">' + item.purchaseAmount + '</td><td class="shuzi ybnbj">' + item.percentagePurchase + '</td></tr>';
					})
					otn += '</tbody></table></div>'
					$('.AqwdgysjkhDiv .Agongyingshang').html(otn)
					if(isShowmodel) {
						BS.MyCollect.fileInit("m9558332368g", 0, 1, otn);
					}
				}
			} else {
				errorAlert(data.retCode, data.retMsg);
			}

		});
	},
	//3.3 2客户
	findKeHu: function() {
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT629", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var data = data.retData;
				var otn = '';
				otn += '<div class="AguTable">' +
					'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
					'<table style="width:98%" class="tablemodel">' +
					'<thead>' +
					'<tr>' +
					'<th class="zbdq">序号</th>' +
					'<th>客户名称</th>' +
					'<th class="ybdq">销售金额（万元）</th>' +
					'<th class="ybdq">年度销售占比（%）</th>' +
					'</tr></thead><tbody>'
				$(".AqwdgysjkhDiv .Akehu").html('');
				if(data == null || data == "" || data == undefined) {
					var trHtml = '<tr><td colspan="4">暂无数据</td></tr>';
					$(".AqwdgysjkhDiv .Akehu").html(trHtml);
					if(isShowmodel) {
						BS.MyCollect.fileInit("m2286317098k", 0, 1, trHtml);
					}
				} else {
					$(data).each(function(index, item) {
						otn += '<tr><td class="zbdq">' + item.ranking + '</td><td>' + item.customerName + '</td><td class="shuzi ">' + item.salesAmount + '</td><td class="shuzi ybnbj">' + item.operatingIncome + '</td></tr>';
					})
					otn += '</tbody></table></div>'
					$('.AqwdgysjkhDiv .Akehu').html(otn);
					if(isShowmodel) {
						BS.MyCollect.fileInit("m2286317098k", 0, 1, otn);
					}
				}
			} else {
				errorAlert(data.retCode, data.retMsg);
			}

		});
	},
	// 3.4投资者关系活动记录
	findTouZiZheGX: function() {
		//		alert(000)
		//		var paraminfo = {
		//			stockCode: stockCode,
		//			category: 4,
		//			pageSize: 10,
		//			pageNum: 10000
		//		}
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '","category":"4","pageSize":"10","pageNum":"10000"}}';
		$.axsRequest("FT630", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var otn = '';
				var ssjj = data.retData.data;
				console.log(ssjj);
				if(ssjj != null && ssjj != "" && ssjj != undefined) {
					$(ssjj).each(function(index, item) {
						// console.log(item.attType)
						if(item.attType == "pdf") {
							otn += "<li><em class='pdf'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" + item.noticeTitle + "</a></em><span class='sjyb'>" + item.reportTime + "</span><div class='clearfix'></div></li>";
						}
						if(item.attType == "doc" || item.attType == "docm" || item.attType == "docx") {
							otn += "<li><em class='word'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" + item.noticeTitle + "</a></em><span class='sjyb'>" + item.reportTime + "</span><div class='clearfix'></div></li>";
						}
						if(item.attType == "xlsx") {
							otn += "<li><em class='excel'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" + item.noticeTitle + "</a></em><span class='sjyb'>" + item.reportTime + "</span><div class='clearfix'></div></li>";
						}
						if(item.attType == "jpg") {
							otn += "<li><em class='jpg'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" + item.noticeTitle + "</a></em><span class='sjyb'>" + item.reportTime + "</span><div class='clearfix'></div></li>";
						}
						if(item.attType == "ppt" || item.attType == "pptx") {
							otn += "<li><em class='ppt'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" + item.noticeTitle + "</a></em><span class='sjyb'>" + item.reportTime + "</span><div class='clearfix'></div></li>";
						}
						if(item.attType == "rar") {
							otn += "<li><em class='rar'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" + item.noticeTitle + "</a></em><span class='sjyb'>" + item.reportTime + "</span><div class='clearfix'></div></li>";
						}
						// otn+="<li><em class='hsxtp'></em><em class='btzb'><a href=" + item.noticeUrl + " target=_blank>" +item.noticeTitle + "</a></em><span class='sjyb'>"+isStrKong(item.reportTime)+"</span><div class='clearfix'></div></li>";
						// console.log(otn)
					})
					$('#tzzgx').html(otn)
					if(isShowmodel) {
						BS.MyCollect.fileInit("m4958752961t", 0, 1, otn);
					}

				} else {
					// console.log('2')
					var tr = '<div class="noDatas noDatas-s1">暂无数据</div>';
					$('#tzzgx').html(tr);
					if(isShowmodel) {
						BS.MyCollect.fileInit("m4958752961t", 0, 1, tr);
					}
				}

			} else {
				errorAlert(data.retCode, data.retMsg);
			}

		});
	},
	//3.5.1 主要竞争对手市场表现
	findDuiShouShiChang: function() {
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT631", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var result = data.retData;
				var ttn = '';
				var otn = '';
				if(result == null || result == "" || result == undefined) {
					var trHtml = '<div>暂无数据</div>';
					$(".AzyjzdsDiv .Aduishoushichang").html(trHtml);
					if(isShowmodel) {
						BS.MyCollect.fileInit("m4905685123j", 0, 1, trHtml);
					}
					$(".AzyjzdsDiv .Aduishoucaiwu").html(trHtml);
					if(isShowmodel) {
						BS.MyCollect.fileInit("m207316045j", 0, 1, trHtml);
					}
				}
				ttn += '<div class="AguTable">' +
					'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
					'<table style="width:98%" class="tablemodel">' +
					'<thead>' +
					'<tr>' +
					'<th class="zbdq">公司</th>' +
					'<th class="shuzi">营业收入（万元）</th>' +
					'<th class="shuzi">净利润（万元）</th>' +
					'<th class="shuzi">资产总计（万元）</th>' +
					'<th class="shuzi">EPS（元）</th>' +
					'<th class="ybdq">ROE（%）</th>' +
					'</tr></thead><tbody>';
				$(result).each(function(index, item) {
					if(stockCode == item.stockCode) {
						ttn += '<tr><td class="zbdq">' + item.stockName + '</td>' +
							'<td class="shuzi">' + item.yysr / 10000.00 + '</td>' +
							'<td class="shuzi">' + item.jlr / 10000.00 + '</td>' +
							'<td class="shuzi">' + item.zczj / 10000.00 + '</td>' +
							'<td class="shuzi">' + item.eps.toFixed(2) + '</td>' +
							'<td class="shuzi ybnbj">' + item.roe.toFixed(2) + '</td>' +
							'</tr>';
					} else {
						ttn += '<tr><td class="zbdq">' + item.stockName + '</td>' +
							'<td class="shuzi">' + item.yysr / 10000.00 + '</td>' +
							'<td class="shuzi">' + item.jlr / 10000.00 + '</td>' +
							'<td class="shuzi">' + item.zczj / 10000.00 + '</td>' +
							'<td class="shuzi">' + item.eps.toFixed(2) + '</td>' +
							'<td class="shuzi ybnbj">' + item.roe.toFixed(2) + '</td>' +
							'</tr>';
					}
				})
				ttn += '</tbody></table></div>';
				ttn = ReplaceAll(ttn, "null", "--");
				ttn = ReplaceAll(ttn, "undefined", "--")
				//					console.log(ttn);
				$(".AzyjzdsDiv .Aduishoucaiwu").html(ttn);
				if(isShowmodel) {
					BS.MyCollect.fileInit("m207316045j", 0, 1, ttn);
				}

				otn += '<div class="AguTable">' +
					'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
					'<table style="width:98%" class="tablemodel"><thead><tr>' +
					'<th class="zbdq">公司</th>' +
					'<th class="shuzi">股价(元)</th>' +
					'<th class="shuzi">市值(亿元)</th>' +
					'<th class="shuzi">PE</th>' +
					'<th class="ybdq">PB</th>' +
					'</tr></thead><tbody>';
				$(result).each(function(index, item) {
					if(stockCode == item.stockCode) {
						otn += '<tr><td class="zbdq">' + item.stockName + '</td>' +
							'<td class="shuzi">' + item.gj.toFixed(2) + '</td>' +
							'<td class="shuzi">' + item.sz.toFixed(2) + '</td>' +
							'<td class="shuzi">' + item.pe.toFixed(2) + '</td>' +
							'<td class="shuzi ybdqbj">' + item.pb.toFixed(2) + '</td>' +
							'</tr>';
					} else {
						otn += '<tr><td class="zbdq">' + item.stockName + '</td>' +
							'<td class="shuzi">' + item.gj.toFixed(2) + '</td>' +
							'<td class="shuzi">' + item.sz.toFixed(2) + '</td>' +
							'<td class="shuzi">' + item.pe.toFixed(2) + '</td>' +
							'<td class="shuzi ybdqbj">' + item.pb.toFixed(2) + '</td>' +
							'</tr>';
					}
				})
				otn += '</tbody></table></div>';
				otn = ReplaceAll(otn, "null", "--");
				otn = ReplaceAll(otn, "undefined", "--")
				//					console.log(otn);
				$(".AzyjzdsDiv .Aduishoushichang").html(otn);
				if(isShowmodel) {
					BS.MyCollect.fileInit("m4905685123j", 0, 1, otn);
				}

			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});
	},
	//核心财务数据
	AfindFinanceKernelData: function() {
		var $findFinanceKernelData = '';
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT632", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
			var _data = data.retData;
			if(_data == null || _data == "" || _data == undefined) {
				return false;
				//$(".AhxcwsjDiv .hxcwsj").html("暂无数据");
			}
			var otn = '<div class="AguTable Agu-cw">' +
				'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
				'<table style="width:98%" class="tablemodel">' +
				'<thead>' +
				'<tr>' +
				'<th style="width:30%">核心指标</th>' +
				'<th class="shuzi AguName" style="width:40%">' + _data.stockName + '</th>' +
				'<th>对标平均</th>' +
				'</tr>' +
				'</thead>' +
				'<tbody>' +
				'<tr>' +
				'<td class="zbdqbj">总资产（万元）</td>' +
				'<td class="shuzi c1_74_value">' + _data.c1_74.c1_74_value / 10000.00 + '</td>' +
				'<td class="shuzi ybnbj c1_74_avg">' + _data.c1_74.c1_74_avg / 10000.00 + '</td>' +
				'</tr>' +
				'<tr>' +
				'<td class="zbdqbj">净资产（万元）</td>' +
				'<td class="shuzi c1_141_value">' + _data.c1_141.c1_141_value / 10000.00 + '</td>' +
				'<td class="shuzi ybnbj c1_141_avg">' + _data.c1_141.c1_141_avg / 10000.00 + '</td>' +
				'</tr>' +
				'<tr>' +
				'<td class="zbdqbj">资产负债率（%）</td>' +
				'<td class="shuzi ZiChanFuZhaiLv_value">' + _data.ZiChanFuZhaiLv.ZiChanFuZhaiLv_value + '</td>' +
				'<td class="shuzi ybnbj ZiChanFuZhaiLv_avg">' + _data.ZiChanFuZhaiLv.ZiChanFuZhaiLv_avg + '</td>' +
				'</tr>' +

				'</tbody>' +
				'</table>' +
				'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
				'<table style="width:98%" class="tablemodel">' +
				'<thead>' +
				'<tr>' +
				'<th class="zbdqbj">盈利指标</th>' +
				'<th></th>' +
				'<th></th>' +
				'</tr>' +
				'</thead>' +
				'<tbody>' +
				'<tr>' +
				'<td class="zbdqbj">EBIT(万元)</td>' +
				'<td class="shuzi XiShuiQianLiRun_value">' + _data.XiShuiQianLiRun.XiShuiQianLiRun_value / 10000.00 + '</td>' +
				'<td class="shuzi ybnbj XiShuiQianLiRun_avg">' + _data.XiShuiQianLiRun.XiShuiQianLiRun_avg / 10000.00 + '</td>' +
				'</tr>' +
				'<tr>' +
				'<td class="zbdqbj">EBITDA(万元)</td>' +
				'<td class="shuzi XiShuiZheJiuJiTanXiaoQianLiRun_value">' + _data.XiShuiZheJiuJiTanXiaoQianLiRun.XiShuiZheJiuJiTanXiaoQianLiRun_value / 10000.00 + '</td>' +
				'<td class="shuzi ybnbj XiShuiZheJiuJiTanXiaoQianLiRun_avg">' + _data.XiShuiZheJiuJiTanXiaoQianLiRun.XiShuiZheJiuJiTanXiaoQianLiRun_avg / 10000.00 + '</td>' +
				'</tr>' +
				'<tr>' +
				'<td class="zbdqbj">净利润(万元)</td>' +
				'<td class="shuzi f2JLR_value">' + _data.f2JLR.f2JLR_value / 10000.00 + '</td>' +
				'<td class="shuzi ybnbj f2JLR_avg">' + _data.f2JLR.f2JLR_avg / 10000.00 + '</td>' +
				'</tr>' +
				'<tr>' +
				'<td class="zbdqbj">净资产收益率(%)</td>' +
				'<td class="shuzi JingZiChanShouYiLv_value">' + _data.JingZiChanShouYiLv.JingZiChanShouYiLv_value + '</td>' +
				'<td class="shuzi ybnbj JingZiChanShouYiLv_avg">' + _data.JingZiChanShouYiLv.JingZiChanShouYiLv_avg + '</td>' +
				'</tr>' +
				'<tr>' +
				'<td class="zbdqbj">毛利率(%)</td>' +
				'<td class="shuzi XiaoShouMaoLiLv_value">' + _data.XiaoShouMaoLiLv.XiaoShouMaoLiLv_value + '</td>' +
				'<td class="shuzi ybnbj XiaoShouMaoLiLv_avg">' + _data.XiaoShouMaoLiLv.XiaoShouMaoLiLv_avg + '</td>' +
				'</tr>' +
				'</tbody>' +
				'</table>' +
				'<style>table.tablemodel thead tr{font-size: 14px;}table.tablemodel thead tr th{text-indent: 5px;border: none;background-color: #559cd9;color: #fff;height:30px;line-height: 30px;white-space: nowrap;vertical-align: middle;}table.tablemodel tr td{font-weight: normal;padding:0px 3px;border: none;font-size: 14px;height:30px;line-height: 30px;}table.tablemodel tr td:nth-child(n){color: #7a7a7a;}table.tablemodel tr:nth-child(n){background: #f5f7f9}table.tablemodel tr:nth-child(2n){background: #fff}</style>' +
				'<table style="width:98%" class="tablemodel">' +
				'<thead>' +
				'<tr>' +
				'<th class="zbdqbj">成长性指标</th>' +
				'<th></th>' +
				'<th></th>' +
				'</tr>' +
				'</thead>' +
				'<tbody>' +
				'<tr>' +
				'<td class="zbdqbj" style="width: 469px;">营业收入增长率(%)</td>' +
				'<td class="shuzi REVZengZhangLv_value">' + _data.REVZengZhangLv.REVZengZhangLv_value + '</td>' +
				'<td class="shuzi ybnbj REVZengZhangLv_avg">' + _data.REVZengZhangLv.REVZengZhangLv_avg + '</td>' +
				'</tr>' +
				'<tr>' +
				'<td class="zbdqbj" style="width: 469px;">净利润增长率(%)</td>' +
				'<td class="shuzi JingLiRunZengZhangLv_value">' + _data.JingLiRunZengZhangLv.JingLiRunZengZhangLv_value + '</td>' +
				'<td class="shuzi ybnbj JingLiRunZengZhangLv_avg">' + _data.JingLiRunZengZhangLv.JingLiRunZengZhangLv_avg + '</td>' +
				'</tr></tbody></table></div>';
			$.each(_data, function(key, item) {
				var value = item[key + "_value"];
				var avg = item[key + "_avg"];
				var showUnit = item[key + "_showUnit"];

				if(showUnit != null) {
					if(showUnit.indexOf("亿") > -1) {
						value = value / 100000000.00;
						avg = avg / 100000000.00;
					} else if(showUnit.indexOf("万") > -1) {
						value = value / 10000.00;
						avg = avg / 10000.00;
					}
				}
				$("." + key + "_value").html(Number(value).toFixed(2));
				$("." + key + "_avg").html(Number(avg).toFixed(2));

				//市值总额  市盈率  市净率
				if($(".ShiZhiZongE_value").text() == 0.00 || $(".ShiZhiZongE_value").text() == "0.00") {
					$(".ShiZhiZongE_value").text("--")
				}
				if($(".ShiYingLv_value").text() == 0.00 || $(".ShiYingLv_value").text() == "0.00") {
					$(".ShiYingLv_value").text("--")
				}
				if($(".ShiJingLv_value").text() == 0.00 || $(".ShiJingLv_value").text() == "0.00") {
					$(".ShiJingLv_value").text("--")
				}
				otn = ReplaceAll(otn, "null", "--");
				otn = ReplaceAll(otn, "undefined", "--")
				$(".AhxcwsjDiv .hxcwsj").html(otn);
				if(isShowmodel) {
					BS.MyCollect.fileInit("m567070645", 0, 1, otn);
				}
			});
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});
	},
	//公司盈利情况
	AfindProfitData: function() {
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT641", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
			var _data = data.retData;
			if(_data == null || _data == "null") {
				$("#AcompanyProfitShuoMing").hide();
				$("#AcompanyProfit").hide();
				//				$("#companyProfit").after(noDataHtml());
				return false;
			}
			var shuoming = "<p>截止2016-12-31，公司净利润为" + ((_data.stockValue == null || _data.stockValue == "undefined") ? "--" : (_data.stockValue / 1000000.00).toFixed(2)) + "百万，" +
				"在行业内排名" + ((_data.stockRanking == null || _data.stockRanking == "undefined") ? "--" : _data.stockRanking) + "/" + ((_data.stockTotalRanking == null || _data.stockTotalRanking == "undefined") ? "--" : _data.stockTotalRanking) + "，属于行业" + ((_data.rankingName == null || _data.rankingName == "undefined") ? "--" : _data.rankingName) + "。</p>";
			$("#AcompanyProfitShuoMing").html(shuoming);
			//控制显示的起始位置
			var startIndex = 0;
			if(_data.stockRanking > 5) {
				startIndex = Number(_data.stockRanking) / _data.financeValueArrray.length * 100 - 1;
			}
			var stockNameArrrayChart = [];
			$(_data.stockNameArrray).each(function(index, item) {
				if(item == null) {
					item = "";
				}
				stockNameArrrayChart.push(item);
			})
			//控制一屏幕显示多少条
			var endIndex = 15 / _data.financeValueArrray.length * 100;
			var width = $(".zdsj").width() * 0.9;
			$("#AcompanyProfit").css("width", width);
			var myChart = echarts.init(document.getElementById('AcompanyProfit'));
			var option = {
				legend: {
					show: true,
					data: ['净利润'],
					//				backgroundColor:"#62a6f2",
					top: '8%'
				},
				color: ['#62a6f2'],
				xAxis: {
					show: true,
					type: 'category',
					//data:['东方证劵','东方时尚','华夏证劵','东方证劵']
					data: stockNameArrrayChart
				},
				yAxis: {
					show: true,
					name: '百万',
					type: 'value'
				},
				grid: {
					show: true,
					left: '8%',
					right: '5%',
					bottom: '30%'
				},
				label: {
					normal: {
						show: true,
						position: 'top'
					}
				},
				dataZoom: {
					type: 'slider',
					show: true,
					start: '0',
					end: 20,
					bottom: '3%',
					zoomLock: true
				},
				series: [{
					type: 'bar',
					name: '净利润',
					barMaxWidth: '30',
					//data:[10,50,20,83]
					data: _data.financeValueArrray,
					//				label: {
					//	                normal: {
					//	                    show: true,
					//	                    position: "top",
					//	                    offset:[1,100],
					//	                    formatter: function(params) {
					//	                    	if(params.dataIndex<10){
					//	                    		 return "第" + (params.dataIndex+1) + "";
					//	                    	}else{
					//	                    		 return "第" + ((_data.stockRanking==null || _data.stockRanking=="undefined")?"--":_data.stockRanking) + "";
					//	                    	}
					//	                    },
					//	                    textStyle:{
					//	                    	color:"#333"
					//	                    }
					//	                }
					//	            },
					itemStyle: {
						normal: {
							color: function(params) {
								// 检索结果颜色
								if(((params.dataIndex + 1) == _data.stockRanking) || (params.dataIndex + 1) == 11) {
									return "#f3565d";
								} else {
									return "#62a6f2";
								}
							}
						},
						emphasis: {
							color: "#4a8ad3" //鼠标放到柱形图上显示的颜色
						}
					}
				}]
			};
			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);
			BS.MyCollect.myimg("AcompanyProfit", myChart, "m2349038176", 0)

			//	    setScrollTos();
			window.addEventListener("resize", function() {
				myChart.resize();
			});
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});
	},
	//公司成长情况
	AfindGroupData: function() {
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT642", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
			var _data = data.retData;
			//console.log(_data)
			if(_data == null || _data == "null") {
				$("#AcompanyGrowUpShuoming").hide();
				$("#AcompanyGrowUp").hide();
				//				$("#companyGrowUp").after(noDataHtml());
				return false;
			}
			//		console.log(_data);
			var shuoming = "<p>截止" + ((_data.portTime_tips == null || _data.portTime_tips == "undefined") ? "--" : _data.portTime_tips) + "，" +
				"公司的营收增长率为：" + ((_data.REVZengZhangLv_tips == null || _data.REVZengZhangLv_tips == "undefined") ? "--" : Number(_data.REVZengZhangLv_tips).toFixed(2)) + "%，" +
				"净利润增长率为" + ((_data.JingLiRunZengZhangLv_tips == null || _data.JingLiRunZengZhangLv_tips == "undefined") ? "--" : Number(_data.JingLiRunZengZhangLv_tips).toFixed(2)) + "%，" +
				"成长能力在行内排名" + ((_data.stockCodeRank == null || _data.stockCodeRank == "undefined") ? "--" : _data.stockCodeRank) + "/" + ((_data.stockTotalRanking == null || _data.stockTotalRanking == "undefined") ? "--" : _data.stockTotalRanking) + "，行业排名第一的是：" + ((_data.firstRankStockName == null || _data.firstRankStockName == "undefined") ? "--" : _data.firstRankStockName) + "(" + ((_data.firstRankStockCode == null || _data.firstRankStockCode == "undefined") ? "--" : _data.firstRankStockCode) + ")</p>"
			$("#AcompanyGrowUpShuoming").html(shuoming);
			var width = $(".zdsj").width() * 0.9;
			$("#AcompanyGrowUp").css("width", width);
			var myChart = echarts.init(document.getElementById('AcompanyGrowUp'));
			var option = {
				legend: {
					show: true,
					data: ['营收增长率', "净利润增长率"],
					top: '5%'
				},
				color: ['#62a6f2', "#feb535"],
				xAxis: {
					show: true,
					type: 'category',
					//data:['2015-11','2015-11','2015-11','2015-11']
					data: _data.portTime
				},
				yAxis: {
					show: true,
					name: '%',
					type: 'value'
				},
				grid: {
					show: true,
					left: '5%',
					right: '5%',
					bottom: '30%'
				},
				dataZoom: [{
					type: 'slider',
					show: true,
					start: '0',
					end: '100',
					bottom: '3%'
				}],
				label: {
					normal: {
						show: true,
						position: 'top'
					}
				},
				series: [{
						type: 'line',
						name: '营收增长率',
						symbol: 'circle',
						//data:[10,50,20,83]
						data: _data.REVZengZhangLv
					},
					{
						type: 'line',
						name: '净利润增长率',
						symbol: 'circle',
						//data:[15,38,40,60]
						data: _data.JingLiRunZengZhangLv
					}
				]
			};
			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);
			BS.MyCollect.myimg("AcompanyGrowUp", myChart, "m9325448465", 0)

			//	    setScrollTos();
			window.addEventListener("resize", function() {
				myChart.resize();
			});
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});
	},
	//偿债能力
	AfindPayData: function() {
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT643", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
			var _data = data.retData;
			//console.log(_data);
			if(_data == null || _data == "null") {
				//alert(0)
				$("#AcompanySinking").hide();
				$("#AcompanySinkingShuoming").hide();
				//			$("#companyProfitShuoMing").hide();
				//			$("#companyProfit").hide();
				//				$("#companySinking").after(noDataHtml());
				return false;
			}
			var shuoming = "<p>截止" + ((_data.portTime_tips == null || _data.portTime_tips == "undefined") ? "--" : _data.portTime_tips) + "，" +
				"公司的流动比率为：" + ((_data.LiuDongBiLv_tips == null || _data.LiuDongBiLv_tips == "undefined") ? "--" : Number(_data.LiuDongBiLv_tips).toFixed(2)) + "，" +
				"速动比率为" + ((_data.SuDongBiLv_tips == null || _data.SuDongBiLv_tips == "undefined") ? "--" : Number(_data.SuDongBiLv_tips).toFixed(2)) + "，" +
				"偿债能力在行内排名" + ((_data.stockCodeRank == null || _data.stockCodeRank == "undefined") ? "--" : _data.stockCodeRank) + "/" + ((_data.stockTotalRanking == null || _data.stockTotalRanking == "undefined") ? "--" : _data.stockTotalRanking) + "，行业排名第一的是：" + ((_data.firstRankStockName == null || _data.firstRankStockName == "undefined") ? "--" : _data.firstRankStockName) + "(" + ((_data.firstRankStockCode == null || _data.firstRankStockCode == "undefined") ? "--" : _data.firstRankStockCode) + ")</p>"
			$("#AcompanySinkingShuoming").html(shuoming);
			//			var width = ($(".page").width() - 100) * 0.98;
			//			$("#AcompanySinking").css("width", width);
			var width = $(".zdsj").width() * 0.9;
			$("#AcompanySinking").css("width", width);
			var myChart = echarts.init(document.getElementById('AcompanySinking'));
			var option = {
				legend: {
					show: true,
					data: ['流动比率', "速动比率"],
					top: '5%'
				},
				color: ['#62a6f2', "#feb535"],
				xAxis: {
					show: true,
					type: 'category',
					//data:['2015-11','2015-11','2015-11','2015-11']
					data: _data.portTime
				},
				yAxis: {
					show: true,
					name: '',
					type: 'value'
				},
				label: {
					normal: {
						show: true,
						position: 'top'
					}
				},
				grid: {
					show: true,
					left: '5%',
					right: '5%',
					bottom: '30%'
				},
				dataZoom: [{
					type: 'slider',
					show: true,
					start: '0',
					end: '100',
					bottom: '3%'
				}],
				series: [{
						type: 'line',
						name: '流动比率',
						symbol: 'circle',
						//data:[10,50,20,83]
						data: _data.LiuDongBiLv
					},
					{
						type: 'line',
						name: '速动比率',
						symbol: 'circle',
						//data:[15,38,40,60]
						data: _data.SuDongBiLv
					}
				]
			};
			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);
			BS.MyCollect.myimg("AcompanySinking", myChart, "m7949936853", 0)

			//	    setScrollTos();
			window.addEventListener("resize", function() {
				myChart.resize();
			});
			
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});
	},
	//运营情况
	AfindOperationData: function() {
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT644", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
			var _data = data.retData;
			if(_data == null || _data == "null" ||
				(_data.CunHuoZhouZhuanLv == undefined && _data.YingShouZhangKuanZhouZhuanLv == undefined)) {
				$("#AcompanyOperateShuoming").hide();
				$("#AcompanyOperate").hide();
				//				$("#companyOperate").after(noDataHtml());
				return false;
			}
			var flag1 = false; //存货周转率是否有值
			var flag2 = false; //应收账款周转率是否有值
			$(_data.CunHuoZhouZhuanLv).each(function(i, item) {
				if(item != null && item != 0) {
					flag1 = true;
				}
			})
			$(_data.YingShouZhangKuanZhouZhuanLv).each(function(i, item) {
				if(item != null && item != 0) {
					flag2 = true;
				}
			})
			if(!flag1 && !flag2) { //都没有值隐藏
				$("#AcompanyOperateShuoming").hide();
				$("#AcompanyOperate").hide();
				//				$("#companyOperate").after(noDataHtml());
			}
			//		console.log(_data);
			//UTIL.sjly("#cwsdfxly", "gsyynlqk", ".cw2", "sjlyy");
			// UTIL.sjly("#cwsdfxly","cwsdfx",".cw3","sjlyy");
			var shuoming;
			var chts; //存货天数
			var yszk; //应收账款
			var yynl; //营运能力
			if(_data.CunHuoZhouZhuanLv == null || _data.CunHuoZhouZhuanLv == "" || _data.CunHuoZhouZhuanLv == undefined) {
				chts = "";
			} else {
				chts = "公司的存货周转天数为" + Number(_data.CunHuoZhouZhuanLv_tips).toFixed(2) + "天，";
			}
			if(_data.YingShouZhangKuanZhouZhuanLv == "" || _data.YingShouZhangKuanZhouZhuanLv == null || _data.YingShouZhangKuanZhouZhuanLv == undefined) {
				yszk = "";
			} else {
				yszk = "应收账款周转天数为" + (Number(_data.YingShouZhangKuanZhouZhuanLv_tips).toFixed(2)) + "天，";
			}
			if(_data.rankingName == null || _data.rankingName == "" || _data.rankingName == undefined) {
				yynl = "";
			} else {
				yynl = "公司的营运能力表现" + _data.rankingName + "。</p>";
			}
			shuoming = "<p>截止" + ((_data.portTime_tips == null || _data.portTime_tips == "undefined") ? "--" : _data.portTime_tips) + "，" + chts + yszk + yynl;
			if(shuoming.lastIndexOf(",") > -1) {
				$("#AcompanyOperateShuoming").html(shuoming);
			} else {
				shuoming = shuoming.substring(0, shuoming.length - 1);
				shuoming = shuoming + "。";
				$("#AcompanyOperateShuoming").html(shuoming);
			}

			//			var width = ($(".page").width() - 100) * 0.98;
			//			$("#AcompanyOperate").css("width", width);
			var width = $(".zdsj").width() * 0.9;
			$("#AcompanyOperate").css("width", width);
			var myChart = echarts.init(document.getElementById('AcompanyOperate'));
			var option = {
				legend: {
					show: true,
					data: ['存货周转天数', "应收账款周转天数"],
					top: '5%'
				},
				color: ['#62a6f2', "#feb535"],
				xAxis: {
					show: true,
					type: 'category',
					//data:['2015-11','2015-11','2015-11','2015-11']
					data: _data.portTime
				},
				yAxis: {
					show: true,
					name: '',
					type: 'value'
				},
				label: {
					normal: {
						show: true,
						position: 'top'
					}
				},
				grid: {
					show: true,
					left: '5%',
					right: '5%',
					bottom: '30%'
				},
				dataZoom: [{
					type: 'slider',
					show: true,
					start: '0',
					end: '100',
					bottom: '3%'
				}],
				series: [{
						type: 'line',
						name: '存货周转天数',
						symbol: 'circle',
						//data:[10,50,20,83]
						data: _data.CunHuoZhouZhuanLv
					},
					{
						type: 'line',
						name: '应收账款周转天数',
						symbol: 'circle',
						//data:[15,38,40,60]
						data: _data.YingShouZhangKuanZhouZhuanLv
					}
				]
			};
			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);
			BS.MyCollect.myimg("AcompanyOperate", myChart, "m4976103058", 0)

			//		setScrollTos();
			window.addEventListener("resize", function() {
				myChart.resize();
			});
			
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});
	},
	//综合能力模型分析
	AfindFinanceModelData: function() {
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT645", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
			var _data = data.retData;
			//		console.log(_data);
			if(_data == null || _data == "null") {
				$("#AcompanyModelAnalysisShuoming").hide();
				$("#AcompanyModelAnalysis").hide();
				//				$("#companyModelAnalysis").after(noDataHtml());
				return false;
			}
			//			UTIL.sjly("#zhnlmxfxly", "zhnlmxfx", ".zhnlmxfx", "sjlyy");
			var shuoming = "<p>公司在" + ((_data.max == null || _data.max == "undefined") ? "--" : _data.max) + "方面表现突出，在" + ((_data.min == null || _data.min == "undefined") ? "--" : _data.min) + "上表现差强人意，有待加强，需要额外关注。</p>"
			$("#AcompanyModelAnalysisShuoming").html(shuoming);
			var height = $(".kaik-contents").height();
			// document.getElementById('companyModelAnalysis').style.width = document.getElementsByClassName('company-content')[0].offsetWidth * 0.8+ 'px';
			document.getElementById('AcompanyModelAnalysis').style.height = height * 0.7 + 'px';
			var myChart = echarts.init(document.getElementById('AcompanyModelAnalysis'));
			var option = {
				//			    title: {
				//			        text: '基础雷达图'
				//			    },
				//			    legend: {
				//			        data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
				//			    },
				color: ["#feb535"],
				grid: {
					left: '50%',
					right: '50%'
					//					bottom:'30%'
				},
				radar: {
					// shape: 'circle',
					name: {
						textStyle: {
							color: '#5c666e',
							// backgroundColor: '#999',
							borderRadius: 3,
							padding: [10, 10]
						}
					},
					center: ['50%', '50%'],
					radius: 120,
					indicator: [{
							name: '盈利性',
							max: 6
						},
						{
							name: '安全性',
							max: 6
						},
						{
							name: '利润质量',
							max: 6
						},
						{
							name: '运营能力',
							max: 6
						},
						{
							name: '偿债能力',
							max: 6
						},
						{
							name: '成长性',
							max: 6
						}
					]
				},
				textStyle: {
					cololr: '#000'
				},
				series: [{
					//			        name: '预算 vs 开销（Budget vs spending）',
					type: 'radar',
					symbol: 'circle',
					data: [{
						//			                value : [4300, 10000, 28000, 35000, 50000, 19000],
						value: [_data.YingLiXing, _data.AnQuanXing, _data.LiRunZiLiang, _data.YunYingNengLi, _data.ChangZhaiNengLi, _data.ChengZhangXing]
						//name : '预算分配（Allocated Budget）'
					}]
				}]
			};
			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);
			BS.MyCollect.myimg("AcompanyModelAnalysis", myChart, "m21930802", 0)

			//	    setScrollTos();
			window.addEventListener("resize", function() {
				myChart.resize();
			});
			
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});
	},
	//杜邦分析法
	AfindDubangData: function() {
		var obj = this;
		//默认隐藏掉
		$(".yincang_1").hide();
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT634", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
			var _data = data.retData;
			var dutable2 = '<div class="bont-content sangudbfx2" id="adbtdiv" style="transform: scale(0.8,0.8);-webkit-transform: scale(0.8,0.8);margin-left:-100px">' +
				'<style type="text/css">' +
				'.dbfx2{width: 976px;overflow-x: auto;padding-left: 20px;box-sizing: border-box;}' +
				'.bont-content ul li{position: relative;}' +
				'.bont-content ul li div{position: absolute;}' +
				'.bont-content ul li span{display: table-cell;padding:2px 4px;background-color: #1985e2;color: #fff;font-size: 12px;border-radius: 5px;}' +
				'.dbzb-list{height: 36px;}' +
				'.jsfh{font-size: 14px;color: #f4363e;position: absolute;}' +
				'.dbzb-list em{display: block;width: 100%;text-align: center;font-size: 12px;}' +
				'.db-line{height: 24px;}' +
				'.db-line i{position: absolute;top: 0;}' +
				'.dbzb1{left: 50%;}' +
				'.dbzb2{left: 41%;}' +
				'.gsxx-list1{left: 54%;}' +
				'.dbzb3{left:64%;}' +
				'.dbzb4{left: 34%;}' +
				'.dbzb5{left: 66%;}' +
				'.gsxx-list2{left: 51%;}' +
				'.dbzb6{left: 25.5%;}' +
				'.dbzb7{left: 42%;}' +
				'.gsxx-list3{left:36.5%;}' +
				'.dbzb8{left: 60%;}' +
				'.dbzb9{left: 76.5%;}' +
				'.gsxx-list4{left:70.5%;}' +
				'.dbzb10{left: 0%;}' +
				'.dbzb11{left: 7.5%;}' +
				'.dbzb12{left: 16%;}' +
				'.dbzb13{left: 24%;}' +
				'.dbzb14{left: 36.5%;}' +
				'.dbzb15{left: 49%;}' +
				'.dbzb16{left: 61%;}' +
				'.dbzb17{left: 80%;}' +
				'.gsxx-list5{left:6.5%;}' +
				'.gsxx-list6{left:14%;}' +
				'.gsxx-list7{left:22.5%;}' +
				'.gsxx-list8{left:35%;}' +
				'.gsxx-list9{left:47%;}' +
				'.gsxx-list10{left:73%;}' +
				'.gsxx-list11{left:78%;}' +

				'.line1{display: inline-block;width: 230px;height: 18px;background: url(/saasBeta/js/information/images/db-icon1.png)center center no-repeat;left: 44%;}' +
				'.line2{display: inline-block;width: 330px;height: 18px;background: url(/saasBeta/js/information/images/db-icon4.png)center center no-repeat;left: 36%;}' +
				'.line3{display: inline-block;width: 180px;height: 18px;background: url(/saasBeta/js/information/images/db-icon2.png)center center no-repeat;left: 27%;}' +
				'.line4{display: inline-block;width: 170px;height: 18px;background: url(/saasBeta/js/information/images/db-icon3.png)center center no-repeat;left: 62%;}' +
				'.line5{display: inline-block;width: 496px;height: 18px;background: url(/saasBeta/js/information/images/db-icon5.png)center center no-repeat;left: 2%;}' +
				'.line6{display: inline-block;width: 202px;height: 18px;background: url(/saasBeta/js/information/images/db-icon6.png)center center no-repeat;left: 63%;}' +

				'li.li-public{height: 190px;}' +
				'.cbfy{width: 210px;height: 190px;left: 0;}' +
				'.cbfy-zb1{width: 100%;height: 190px;}' +
				'.dbzb18{left: 32%;top: 10%;}' +
				'.cbfy-zb2{width: 18px;height: 190px;left: 45%;}' +
				'.cbfy-zb2 i{width: 18px;height: 190px;display: block; background: url(/saasBeta/js/information/images/db-icon7.png)top center no-repeat;}' +
				'.cbfy-zb1{width: 96px;left: 0%;}' +
				'.cbfy-zb3{width: 96px;left:57%;}' +
				'li .cbfy-zb3 div{left: 0;}' +
				'.jsfs1{top: 31%;left: 60%;}' +
				'.jsfs2{top: 65%;left: 58%;}' +

				'.dbzb19{top:43%;left: 33%;}' +
				'.dbzb20{top:78%;}' +

				'.cbfy-zb3{height: 190px;}' +
				'.dbzb21{top: 10%;}' +
				'.dbzb22{top: 42%;}' +
				'.dbzb23{top: 78%;}' +
				'li .cbfy-zb3 div.jsfs3{top: 31%;left: 27%;}' +
				'li .cbfy-zb3 div.jsfs4{top: 65%;left: 27%;}' +

				'.ldzc{width: 170px;height: 190px;left: 56%;}' +
				'.ldzc-zb1{width: 66px;height: 190px;left: 0;}' +
				'.ldzc-line{width: 20px;height: 190px;left: 36%;}' +
				'.ldzc-line i{display: block; width: 20px;height: 190px;background: url(/saasBeta/js/information/images/db-icon8.png)top center no-repeat;}' +
				'.ldzc-zb2{width: 120px;height: 190px;left: 53%;}' +
				'.dbzb24{top: 8%;}' +
				'.dbzb25{top: 46%;}' +
				'.jsfs5{top: 31%;left: 40%;}' +
				'.dbzb26{top:8%}' +
				'.dbzb27{top:46%}' +
				'.dbzb28{top:78%}' +
				'.jsfs6{top: 31%;left: 18%;}' +
				'.jsfs7{top: 67%;left: 18%;}' +

				'.fldzc{width: 190px;height: 190px;left: 75%;}' +
				'.fldzc-zb1{width: 88px;height: 190px;}' +
				'.fldzc-line{width: 18px;height: 190px;left: 43%;}' +
				'.fldzc-line i{display: block;width: 18px;height: 190px;background: url(/saasBeta/js/information/images/db-icon9.png)top center no-repeat;}' +
				'.fldzc-zb2{width: 108px;height: 190px;left:54%;}' +
				'.dbzb31,.dbzb29{top: 8%;}' +
				'.dbzb29{left: 23%;}' +
				'.dbzb30,.dbzb32{top: 43%;}' +
				'.jsfs8{top: 31%;left: 40%;}' +
				'.jsfs9{top: 31%;left: 25%;}' +
				'</style>' +
				'<ul style="list-style: none;">' +
				'<li class="dbzb-list" style="position: relative;height: 36px;">' +
				'<div class="dbzb1" style="position: absolute;left:50%">' +
				'<span>净资产收益率ROE</span>' +
				'<em class="JingZiChanShouYiLv_dubang">--</em>' +
				'</div>' +
				'</li>' +
				'<li class="db-line"><i class="line1"></i></li>' +
				'<li class="dbzb-list">' +
				'<div class="dbzb2">' +
				'<span>总资产收益率</span>' +
				'<em class="ZongZiChanShouYiLv_dubang">--</em>' +
				'</div>' +
				'<div class="gsxx-list1 jsfh">x</div>' +
				'<div class="dbzb3">' +
				'<span>权益乘数</span>' +
				'<em class="QuanYiChengShu_dubang">--</em>' +
				'</div>' +
				'</li>' +
				'<li class="db-line"><i class="line2"></i></li>' +
				'<li class="dbzb-list">' +
				'<div class="dbzb4">' +
				'<span>营收利润率</span>' +
				'<em class="XiaoShouJingLiRunLv_dubang">--</em>' +
				'</div>' +
				'<div class="gsxx-list2 jsfh">x</div>' +
				'<div class="dbzb5">' +
				'<span>总资产周转率</span>' +
				'<em class="ZongZiChanZhouZhuanLv_dubang">--</em>' +
				'</div>' +
				'</li>' +
				'<li class="db-line">' +
				'<i class="line3"></i>' +
				'<i class="line4"></i>' +
				'</li>' +
				'<li class="dbzb-list">' +
				'<div class="dbzb6">' +
				'<span>净利润</span>' +
				'<em class="f2JLR_dubang">--</em>' +
				'</div>' +
				'<div class="gsxx-list3 jsfh">÷</div>' +
				'<div class="dbzb7">' +
				'<span>营业收入</span>' +
				'<em class="f2YYZSR_dubang_1">--</em>' +
				'</div>' +
				'<div class="dbzb8">' +
				'<span>营业收入</span>' +
				'<em class="f2YYZSR_dubang_2">--</em>' +
				'</div>' +
				'<div class="gsxx-list4 jsfh">÷</div>' +
				'<div class="dbzb9">' +
				'<span>总资产</span>' +
				'<em class="f1ZCZJ_dubang">--</em>' +
				'</div>' +
				'</li>' +
				'<li class="db-line yincang_1">' +
				'<i class="line5"></i>' +
				'<i class="line6"></i>' +
				'</li>' +
				'<li class="dbzb-list yincang_1">' +
				'<div class="dbzb10">' +
				'<span>营业收入</span>' +
				'<em class="f2YYZSR_dubang_3">--</em>' +
				'</div>' +
				'<div class="gsxx-list5 jsfh">-</div>' +
				'<div class="dbzb11">' +
				'<span>成本费用</span>' +
				'<em class="f2CBFY_dubang">151,099.30</em>' +
				'</div>' +
				'<div class="gsxx-list6 jsfh">+</div>' +
				'<div class="dbzb12">' +
				'<span>投资收益</span>' +
				'<em class="f2TZSY_dubang">18.12</em>' +
				'</div>' +
				'<div class="gsxx-list7 jsfh">+</div>' +
				'<div class="dbzb13">' +
				'<span>公允价值变动损益</span>' +
				'<em class="f2JGYJZBDSY_dubang">--</em>' +
				'</div>' +
				'<div class="gsxx-list8 jsfh">+</div>' +
				'<div class="dbzb14">' +
				'<span>业务外收支净额</span>' +
				'<em class="f2YWWSZJE_dubang">-19.60</em>' +
				'</div>' +
				'<div class="gsxx-list9 jsfh">-</div>' +
				'<div class="dbzb15">' +
				'<span>所得税费用</span>' +
				'<em class="f2JSDSFY_dubang">16,907.42</em>' +
				'</div>' +
				'<div class="dbzb16">' +
				'<span>流动资产</span>' +
				'<em class="f1LDZCHJ_dubang">346,781.20</em>' +
				'</div>' +
				'<div class="gsxx-list10 jsfh">+</div>' +
				'<div class="dbzb17">' +
				'<span>非流动资产</span>' +
				'<em class="f1FLDZCHJ_dubang">38,916.64</em>' +
				'</div>' +
				'</li>' +
				'<li class="dbzb-list li-public yincang_1" style="display: list-item;">' +
				'<div class="cbfy">' +
				'<div class="cbfy-zb1">' +
				'<div class="dbzb18">' +
				'<span>营业成本</span>' +
				'<em class="f2QZYYCB_dubang">103,924.03</em>' +
				'</div>' +
				'<div class="jsfh jsfs1">+</div>' +
				'<div class="dbzb19">' +
				'<span>管理费用</span>' +
				'<em class="f2GLFY_dubang">6,689.21</em>' +
				'</div>' +
				'<div class="jsfh jsfs2">+</div>' +
				'<div class="dbzb20">' +
				'<span>营业税金及附加</span>' +
				'<em class="f2YYSJJFJ_dubang">3,279.86</em>' +
				'</div>' +
				'</div>' +
				'<div class="cbfy-zb2"><i></i></div>' +
				'<div class="cbfy-zb3">' +
				'<div class="dbzb21">' +
				'<span>销售费用</span>' +
				'<em class="f2XSFY_dubang_3">39,157.83</em>' +
				'</div>' +
				'<div class="jsfh jsfs3">+</div>' +
				'<div class="dbzb22">' +
				'<span>财务费用</span>' +
				'<em class="f2CWFY_dubang">-2,192.93</em>' +
				'</div>' +
				'<div class="jsfh jsfs4">+</div>' +
				'<div class="dbzb23">' +
				'<span>资产减值损失</span>' +
				'<em class="f2ZCJZSS_dubang">241.30</em>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'<div class="ldzc">' +
				'<div class="ldzc-zb1">' +
				'<div class="dbzb24">' +
				'<span>货币资金</span>' +
				'<em class="f1HBZJ_dubang">298,946.42</em>' +
				'</div>' +
				'<div class="jsfh jsfs5">+</div>' +
				'<div class="dbzb25">' +
				'<span>应收账款</span>' +
				'<em class="f1YSZK_dubang">14,370.97</em>' +
				'</div>' +
				'</div>' +
				'<div class="ldzc-line"><i></i></div>' +
				'<div class="ldzc-zb2">' +
				'<div class="dbzb26">' +
				'<span>预付款项</span>' +
				'<em class="f1YFKX_dubang">546.78</em>' +
				'</div>' +
				'<div class="jsfh jsfs6">+</div>' +
				'<div class="dbzb27">' +
				'<span>存货</span>' +
				'<em class="f1CH_dubang">29,385.56</em>' +
				'</div>' +
				'<div class="jsfh jsfs7">+</div>' +
				'<div class="dbzb28">' +
				'<span>其他流动资产</span>' +
				'<em class="f1QTLDZC_dubang">3,531.47</em>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'<div class="fldzc">' +
				'<div class="fldzc-zb1">' +
				'<div class="dbzb29">' +
				'<span>固定资产</span>' +
				'<em class="f1GDZC_dubang">32,666.01</em>' +
				'</div>' +
				'<div class="jsfh jsfs8">+</div>' +
				'<div class="dbzb30">' +
				'<span>长期期权投资</span>' +
				'<em class="f1CQGQTZ_dubang">--</em>' +
				'</div>' +
				'</div>' +
				'<div class="fldzc-line"><i></i></div>' +
				'<div class="fldzc-zb2">' +
				'<div class="dbzb31">' +
				'<span>无形资产</span>' +
				'<em class="f1WXZC_dubang">1,656.65</em>' +
				'</div>' +
				'<div class="jsfh jsfs9">+</div>' +
				'<div class="dbzb32">' +
				'<span>其他非流动资产</span>' +
				'<em class="f1QTFLDZC_dubang">4,593.98</em>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'</li>' +

				'</ul></div>';
			$("#Adubang").html(dutable2);
			Adubang_data(".sangudbfx2", _data);

			if(isShowmodel) {

				BS.MyCollect.fileInit("m8528249543", 0, 1, dutable2);
				Adubang_data(".sangudbfx2", _data);
				return;
				if(isIe())
				{
                   //document.getElementById("m8528249543_0").style.transform  = "scale(0.7,0.7)";
                   return;
				}
				html2canvas($(".sangudbfx2"), {
					onrendered: function(canvas) {
						var imgURL = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
						$("#m8528249543_0 #adbt").attr("src", imgURL);
						$("#m8528249543_0 #adbt").css("display", "block");
						var po = document.getElementById("m8528249543_0");
						po.removeChild(po.childNodes[1]);
						BS.MyCollect.fileInit("m8528249543", 0, 1, po.innerHTML);
					}
				});
			}
		} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});

		function Adubang_data(objname, _data) {
			$(objname + " .QuanYiChengShu_dubang").html(_data.QuanYiChengShu == null ? "--" : (_data.QuanYiChengShu).toFixed(2));
			//营收利润率
			var XiaoShouJingLiRunLv = ((_data.f2JLR) / (_data.f2QZYYSR)) * 100;
			$(objname + "  .XiaoShouJingLiRunLv_dubang").html(XiaoShouJingLiRunLv == null ? "--" : (XiaoShouJingLiRunLv).toFixed(2) + "%");
			$(objname + "  .f2JLR_dubang").html(_data.f2JLR == null ? "--" : (_data.f2JLR / 10000.00).toFixed(2));
			$(objname + "  .f2YYZSR_dubang_1").html(_data.f2QZYYSR == null ? "--" : (_data.f2QZYYSR / 10000.00).toFixed(2));
			$(objname + "  .f2YYZSR_dubang_2").html(_data.f2QZYYSR == null ? "--" : (_data.f2QZYYSR / 10000.00).toFixed(2));
			$(objname + "  .f1ZCZJ_dubang").html(_data.f1ZCZJ == null ? "--" : (_data.f1ZCZJ / 10000.00).toFixed(2));
			//上面的数据需要重新计算
			var ZongZiChanZhouZhuanLv = (_data.f2QZYYSR == null ? 0 : (_data.f2QZYYSR / 10000.00)) / (_data.f1ZCZJ == null ? 0 : (_data.f1ZCZJ / 10000.00));
			$(objname + "  .ZongZiChanZhouZhuanLv_dubang").html(ZongZiChanZhouZhuanLv.toFixed(2));
			var ZongZiChanShouYiLv = (XiaoShouJingLiRunLv == null ? 0 : (XiaoShouJingLiRunLv)) * ZongZiChanZhouZhuanLv
			$(objname + "  .ZongZiChanShouYiLv_dubang").html(ZongZiChanShouYiLv.toFixed(2) + "%");
			var JingZiChanShouYiLv = ZongZiChanShouYiLv * (_data.QuanYiChengShu == null ? 0 : (_data.QuanYiChengShu));
			$(objname + "  .JingZiChanShouYiLv_dubang").html(JingZiChanShouYiLv + "%");
			//新增下面层级：如果不是一般类公司不显示下面的成绩
			if(_data.companyType == 1 || _data.companyType == "1") {
				$(".yincang_1").show();
				//净利润下面的数据
				$(objname + "  .f2YYZSR_dubang_3").html(_data.f2QZYYSR == null ? "--" : (_data.f2QZYYSR / 10000.00).toFixed(2));
				//需要计算:营业成本	＋	销售费用 ＋	管理费用 ＋	财务费用 ＋	营业税金及附加	＋	资产减值损失
				var f2CBFY = (_data.f2QZYYCB == null ? 0 : (_data.f2QZYYCB / 10000.00)) +
					(_data.f2XSFY == null ? 0 : (_data.f2XSFY / 10000.00)) +
					(_data.f2GLFY == null ? 0 : (_data.f2GLFY / 10000.00)) +
					(_data.f2CWFY == null ? 0 : (_data.f2CWFY / 10000.00)) +
					(_data.f2YYSJJFJ == null ? 0 : (_data.f2YYSJJFJ / 10000.00)) +
					(_data.f2ZCJZSS == null ? 0 : (_data.f2ZCJZSS / 10000.00));
				$(objname + "  .f2CBFY_dubang").html(f2CBFY.toFixed(2));
				$(objname + "  .f2TZSY_dubang").html(_data.f2TZSY == null ? "--" : (_data.f2TZSY / 10000.00).toFixed(2));
				$(objname + "  .f2JGYJZBDSY_dubang").html(_data.f2JGYJZBDSY == null ? "--" : (_data.f2JGYJZBDSY / 10000.00).toFixed(2));

				//需要计算:营业外收入 - 营业外支出
				var f2YWWSZJE = (_data.f2YYWSR == null ? 0 : (_data.f2YYWSR / 10000.00)) - (_data.f2YYWZC == null ? 0 : (_data.f2YYWZC / 10000.00));
				$(objname + "  .f2YWWSZJE_dubang").html(f2YWWSZJE.toFixed(2));

				$(objname + "  .f2JSDSFY_dubang").html(_data.f2JSDSFY == null ? "--" : (_data.f2JSDSFY / 10000.00).toFixed(2));

				//成本费用下面的数据
				$(objname + "  .f2QZYYCB_dubang").html(_data.f2QZYYCB == null ? "--" : (_data.f2QZYYCB / 10000.00).toFixed(2));
				$(objname + "  .f2GLFY_dubang").html(_data.f2GLFY == null ? "--" : (_data.f2GLFY / 10000.00).toFixed(2));
				$(objname + "  .f2YYSJJFJ_dubang").html(_data.f2YYSJJFJ == null ? "--" : (_data.f2YYSJJFJ / 10000.00).toFixed(2));
				$(objname + "  .f2XSFY_dubang_3").html(_data.f2XSFY == null ? "--" : (_data.f2XSFY / 10000.00).toFixed(2));
				$(objname + "  .f2CWFY_dubang").html(_data.f2CWFY == null ? "--" : (_data.f2CWFY / 10000.00).toFixed(2));
				$(objname + "  .f2ZCJZSS_dubang").html(_data.f2ZCJZSS == null ? "--" : (_data.f2ZCJZSS / 10000.00).toFixed(2));

				//总资产下面的数据
				$(objname + "  .f1LDZCHJ_dubang").html(_data.f1LDZCHJ == null ? "--" : (_data.f1LDZCHJ / 10000.00).toFixed(2));
				$(objname + "  .f1FLDZCHJ_dubang").html(_data.f1FLDZCHJ == null ? "--" : (_data.f1FLDZCHJ / 10000.00).toFixed(2));

				//流动资产下面的数据
				$(objname + "  .f1HBZJ_dubang").html(_data.f1HBZJ == null ? "--" : (_data.f1HBZJ / 10000.00).toFixed(2));
				$(objname + "  .f1YFKX_dubang").html(_data.f1YFKX == null ? "--" : (_data.f1YFKX / 10000.00).toFixed(2));
				$(objname + "  .f1YSZK_dubang").html(_data.f1YSZK == null ? "--" : (_data.f1YSZK / 10000.00).toFixed(2));
				$(objname + "  .f1CH_dubang").html(_data.f1CH == null ? "--" : (_data.f1CH / 10000.00).toFixed(2));
				//需要计算：流动资产 - 货币资金	-	预付款项	-	应收账款 - 存货

				var f1QTLDZC = (_data.f1LDZCHJ == null ? 0 : (_data.f1LDZCHJ / 10000.00)) -
					(_data.f1HBZJ == null ? 0 : (_data.f1HBZJ / 10000.00)) -
					(_data.f1YFKX == null ? 0 : (_data.f1YFKX / 10000.00)) -
					(_data.f1YSZK == null ? 0 : (_data.f1YSZK / 10000.00)) -
					(_data.f1CH == null ? 0 : (_data.f1CH / 10000.00));

				$(objname + "  .f1QTLDZC_dubang").html(f1QTLDZC.toFixed(2));

				//非流动资产下面的数据
				//流动资产下面的数据
				$(objname + "  .f1GDZC_dubang").html(_data.f1GDZC == null ? "--" : (_data.f1GDZC / 10000.00).toFixed(2));
				$(objname + "  .f1WXZC_dubang").html(_data.f1WXZC == null ? "--" : (_data.f1WXZC / 10000.00).toFixed(2));
				$(objname + "  .f1CQGQTZ_dubang").html(_data.f1CQGQTZ == null ? "--" : (_data.f1CQGQTZ / 10000.00).toFixed(2));
				//需要计算：流动资产 - 货币资金	-	预付款项	-	应收账款 - 存货

				var f1QTFLDZC = (_data.f1FLDZCHJ == null ? 0 : (_data.f1FLDZCHJ / 10000.00)) -
					(_data.f1GDZC == null ? 0 : (_data.f1GDZC / 10000.00)) -
					(_data.f1WXZC == null ? 0 : (_data.f1WXZC / 10000.00)) -
					(_data.f1CQGQTZ == null ? 0 : (_data.f1CQGQTZ / 10000.00));

				$(objname + "  .f1QTFLDZC_dubang").html(f1QTFLDZC.toFixed(2));
			}
		}
	},
	//机构评级
	AfindJZDS: function() {
		var obj = this;
		var paraminfo = '{"body":{"stockCode":"' + stockCode + '"}}';
		$.axsRequest("FT635", paraminfo, true, function(data) {
			//			console.log(data)
			//console.log("--------------"+data.retData.length)
			if(data.retCode == "0000") {
				//alert(0)
				//	console.log(",,,,,,,,,,,,,," + data.retData.length)
				if(data.retData != "" && data.retData != null && data.retData != undefined && data.retData.data.length > 0) {
					var result = data.retData;
					newData = result.new;
					lastMonth = result.old;
					var li = '';
					$(result.data).each(function(index, item) {
						li += '<li><span class="jg-date">' + item.rq + '</span><span><em>' + item.jgsl + '</em>家机构维持评级为：<em>' + item.jgpj + '</em>。</span></li>';
					})
					$("#jgList").html(li);
					//console.log(li);
					obj.drawEcharts(newData, lastMonth);
				} else {
					var div = '<div class="noDatas noDatas-s1">暂无数据</div>';
					$(".jgpj-content").html(div);
				}
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		})
	},
	getData: function(cn) {
		switch(cn) {
			case "强烈看跌":
				return 1;
			case "看跌":
				return 3;
			case "看平":
				return 5;
			case "看涨":
				return 7;
			case "强烈看涨":
				return 9;
			default:
				return 0;
		}
	},
	drawEcharts: function(newData, lastMonth) {
		var obj = this;
		//newData 为最新的值
		//lastMonth为上月的值
		newData = obj.getData(newData);
		lastMonth = obj.getData(lastMonth);
		var lastWidth;
		var newWidth;
		var datas;
		var axisLabel;
		var jiacu;
		var fts;
		var ys;
		if(lastMonth == null || lastMonth == "" || lastMonth == undefined || lastMonth == 0) {
			lastWidth = 0;
		} else {
			lastWidth = 5;
		}
		if(newData == null || newData == "" || newData == undefined || newData == 0) {
			newWidth = 0;
		} else {
			newWidth = 5;
		}
		if(newData == null && lastMonth == null) return;
		var option = {
			series: [{
					name: '速度',
					type: 'gauge',
					z: 3,
					min: 0,
					max: 10,
					splitNumber: 10,
					radius: '65%',
					center: ['54%', '35%'], // 默认全局居中
					axisLine: { // 坐标轴线
						lineStyle: { // 属性lineStyle控制线条样式
							width: 10,
							color: [
								[0.2, '#2cab65'],
								[0.4, "#41c97e"],
								[0.6, "#cde123"],
								[0.8, "#f9a538"],
								[1, "#ed3232"]
							]
						}
					},
					pointer: {
						show: true,
						length: '90%',
						width: newWidth
					},
					axisTick: { // 坐标轴小标记
						length: 0, // 属性length控制线长
						lineStyle: { // 属性lineStyle控制线条样式
							color: 'auto'
						}
					},
					splitLine: { // 分隔线
						length: 0, // 属性length控制线长
						lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
							color: 'auto'
						}
					},

					itemStyle: {
						normal: {
							color: "#f9a538"
						}
					},
					axisLabel: {
						formatter: function(value) {
							if(newWidth == 0) {
								return "";
							} else {
								switch(value + "") {
									case "1":
										return "强烈看跌";
									case "3":
										return "看跌";
									case "5":
										return "看平";
									case "7":
										return "看涨";
									case "9":
										return "强烈看涨";
									default:
										return "";
								}
							}
						},
						color: '#333'
					},
					detail: {
						// 其余属性默认使用全局文本样式，详见TEXTSTYLE
						formatter: function(value) { //显示的最新的那里的数据
							return "最新";
						},
						fontWeight: 'bolder',
						fontSize: 18,
						color: '#333',
						rich: {}
					},
					data: [{
						value: newData
					}, {
						name: "最新"
					}] //指针指向的位置
				},
				{
					name: '转速',
					type: 'gauge',
					center: ['34%', '40%'], // 默认全局居中
					radius: '60%',
					min: 0,
					max: 10,
					endAngle: 45,
					splitNumber: 10,
					axisLine: { // 坐标轴线
						lineStyle: { // 属性lineStyle控制线条样式
							width: 8,
							color: [
								[0.2, '#2cab65'],
								[0.4, "#41c97e"],
								[0.6, "#cde123"],
								[0.8, "#f9a538"],
								[1, "#ed3232"]
							]
						}
					},
					axisTick: { // 坐标轴小标记
						length: 0, // 属性length控制线长
						lineStyle: { // 属性lineStyle控制线条样式
							color: 'auto'
						}
					},
					splitLine: { // 分隔线
						length: 0, // 属性length控制线长
						lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
							color: 'auto'
						}
					},
					pointer: {
						show: true,
						length: '90%',
						width: lastWidth
					},
					title: {
						offsetCenter: [0, '-30%'], // x, y，单位px
					},
					itemStyle: {
						normal: {
							color: "#ed3232"
						}
					},
					axisLabel: {
						formatter: function(e) {
							if(lastWidth == 0) {
								return "";
							} else {
								switch(e + "") {
									case "1":
										return "强烈看跌";
									case "3":
										return "看跌";
									case "5":
										return "看平";
									case "7":
										return "看涨";
									case "9":
										return "强烈看涨";
									default:
										return "";
								}
							}

						},
						color: '#333'
					},
					detail: {
						formatter: function(value) { //显示的最新的那里的数据
							var tip = "{a|暂无数据}";
							if(lastWidth == 0) {
								return "上月\n" + tip;
							} else {
								return "上月";
							}

						},
						fontWeight: 'bolder',
						fontSize: 18,
						color: '#333',
						rich: {
							a: {
								fontWeight: "normal",
								fontSize: 14,
								color: '#666',
								height: 26
							}
						}
					},
					data: [{
						value: lastMonth
					}]
				}
			]
		}
		var mycharts = echarts.init(document.getElementById('jgPj'));
		mycharts.setOption(option);
		BS.MyCollect.myimg("jgPj", mycharts, "m2614317476", 0)

		//console.log(option)
		window.addEventListener("resize", function() {
			mycharts.resize();
		});
	}
}
$(function() {
	// 智能模板的场合
	if(!file.YBType) {
		isShowmodel = true; // 许可初始化
	}
	BS.MyCollect.PageInit();
});

function ReplaceAll(str, sptr, sptr1) {
	while(str != null && str.indexOf(sptr) >= 0) {
		str = str.replace(sptr, sptr1);
	}
	return str;
}

function toDateTime(time, format) {
	var x = new Date(parseInt(time)),
		y = format;
	var z = {
		M: x.getMonth() + 1,
		d: x.getDate(),
		h: x.getHours(),
		m: x.getMinutes(),
		s: x.getSeconds()
	};
	y = y.replace(/(M+|d+|h+|m+|s+)/g, function(v) {
		return((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2)
	});
	var formatDateTime = y.replace(/(y+)/g, function(v) {
		return x.getFullYear().toString().slice(-v.length)
	});
	return formatDateTime;
};

//function createMindPic(datas)
//{
//	var _jm;
//      var options = {
//          container:'jsmind_container',
//          theme:'greensea',
//          editable:false
//      };
// var tt = {

// "meta":{
//         "name":"上下游关系图",
//         "author":"",
//         "version":"0.2"
//     },
//     "format":"node_tree",
//     "data":datas
// };
//var tt =
//{"meta":{"name":"jsMind remote","author":"hizzgdev@163.com","version":"0.2"},"format":"node_tree","data":{"id":"root","topic":"jsMind","expanded":true,"children":[{"id":"easy","topic":"Easy","expanded":false,"direction":"left","children":[{"id":"easy1","topic":"Easy to show","expanded":true},{"id":"easy2","topic":"Easy to edit","expanded":true},{"id":"easy3","topic":"Easy to store","expanded":true},{"id":"easy4","topic":"Easy to embed","expanded":true,"children":[{"id":"easy41","topic":"Easy to show","expanded":true},{"id":"easy42","topic":"Easy to edit","expanded":true},{"id":"easy43","topic":"Easy to store","expanded":true},{"id":"open44","topic":"BSD License","expanded":true,"children":[{"id":"open441","topic":"on GitHub","expanded":true},{"id":"open442","topic":"BSD License","expanded":true}]},{"id":"easy45","topic":"Easy to embed","expanded":true}]}]},{"id":"open","topic":"Open Source","expanded":true,"direction":"right","children":[{"id":"open1","topic":"on GitHub","expanded":true},{"id":"open2","topic":"BSD License","expanded":true,"children":[{"id":"open21","topic":"on GitHub","expanded":true},{"id":"open22","topic":"BSD License","expanded":true,"children":[{"id":"open221","topic":"on GitHub","expanded":true},{"id":"open222","topic":"BSD License","expanded":true}]}]}]},{"id":"powerful","topic":"Powerful","expanded":false,"direction":"right","children":[{"id":"powerful1","topic":"Base on Javascript","expanded":true},{"id":"powerful2","topic":"Base on HTML5","expanded":true},{"id":"powerful3","topic":"Depends on you","expanded":false,"children":[{"id":"powerful31","topic":"Base on Javascript","expanded":true},{"id":"powerful32","topic":"Base on HTML5","expanded":true},{"id":"powerful33","topic":"Depends on you","expanded":true}]}]},{"id":"other","topic":"test node","expanded":false,"direction":"left","children":[{"id":"other1","topic":"I'm from ajax","expanded":true},{"id":"other2","topic":"I can do everything","expanded":true}]}]}}
//        var mind = {"meta":{"name":"jsMind remote","author":"hizzgdev@163.com","version":"0.2"},"format":"node_array","data":[{"id":"root","topic":"null(430002)","expanded":true,"isroot":true,"background-color":"#64a4f2","foreground-color":"#fff"},{"id":"l0","topic":"神州共途(北京)信息系统有限公司<br/>金额比例:5.38%","expanded":true,"parentid":"root","direction":"left","background-color":"#9675da","foreground-color":"#fff"},{"id":"l1","topic":"北京中科金财科技股份有限公司<br/>金额比例:1.92%","expanded":true,"parentid":"root","direction":"left","background-color":"#9675da","foreground-color":"#fff"},{"id":"l2","topic":"北京世纪海润建筑工程有限公司<br/>金额比例:1.44%","expanded":true,"parentid":"root","direction":"left","background-color":"#9675da","foreground-color":"#fff"},{"id":"l3","topic":"河北远东通信系统工程有限公司<br/>金额比例:1.42%","expanded":true,"parentid":"root","direction":"left","background-color":"#9675da","foreground-color":"#fff"},{"id":"l4","topic":"华唐中科教育科技(北京)有限公司<br/>金额比例:1.4%","expanded":true,"parentid":"root","direction":"left","background-color":"#9675da","foreground-color":"#fff"},{"id":"r0","topic":"--<br/>金额比例:6.66%","expanded":true,"parentid":"root","direction":"right","background-color":"#64a4f2","foreground-color":"#fff"},{"id":"r1","topic":"--<br/>金额比例:5.43%","expanded":true,"parentid":"root","direction":"right","background-color":"#64a4f2","foreground-color":"#fff"},{"id":"r2","topic":"--<br/>金额比例:1.47%","expanded":true,"parentid":"root","direction":"right","background-color":"#64a4f2","foreground-color":"#fff"},{"id":"r3","topic":"--<br/>金额比例:1.33%","expanded":true,"parentid":"root","direction":"right","background-color":"#64a4f2","foreground-color":"#fff"},{"id":"r4","topic":"--<br/>金额比例:1.13%","expanded":true,"parentid":"root","direction":"right","background-color":"#64a4f2","foreground-color":"#fff"}]}
//  
//     _jm = jsMind.show(options,mind);
//     var mind_data = _jm.get_data('node_tree');
//      var mind_string = jsMind.util.json.json2string(mind_data);
//      console.log("mind_string:");
//      console.log(mind_string);
//}