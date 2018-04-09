var paraminfo = ""; //业务参数信息
var serchKey = ""; //搜索key值
var hongnameslist;
var hongname;

var stockCode_xgtb = getUrlParam("stockCode"); //相关图表的stockCode
var stockContent_xgtb = getUrlParam("content");
//map图表传参定义全局变量
var classValuestring = '';
var dataDateTypestring = '';
var businessTypesstring = '';
var linearea = 'line';
var styleline = false;
var timestring = "-7";
var startdate;
var enddate;
var targetTree = []; //指标数组
var targetIds = [];
//数组删除指定元素初始数组方法
Array.prototype.indexOf = function(val) {
	for(var i = 0; i < this.length; i++) {
		if(this[i] == val) return i;
	}
	return -1;
};
Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if(index > -1) {
		this.splice(index, 1);
	}
};

BS.yanbaoRightData = {
	PageInit: function() {
		var obj = this;
		obj.ZBTree(); //指标数型结构
		obj.HGDataTree(); //宏观树形结构
		obj.NewsSerch(); //新闻资讯搜索
		obj.MarketNewsData(serchKey); //新闻列表，最新5条数据
		obj.CompanySerch(); //公司公告搜索
		obj.MarketCompanyData(serchKey); //公司公告列表，最近5条数据
		obj.ReportSerch(); //研报广场搜索
		obj.MarketReportData(serchKey); //研报广场列表，最近5条研报数据
		obj.PolicySerch(); //政策法规收缩
		obj.MarketPolicyData(serchKey); //政策法规列表数据，最新5条
		obj.TuBiaoSerch();
		obj.MyTuBiaoList(serchKey); //我的图表列表
		obj.Abouttb();
		obj.CloudSerch();
		obj.MyCloudResource(serchKey);
		obj.UploadFile();
		obj.eventLiclick(); //相关图表事件点击
	},
	//相关图表弹框
	Abouttb: function() {
		var obj = this;
		$("#close_tb").on("click", function() {
			$(".tb-mask-box").attr("style", "display:none;");
			$(".contents").css("display", "none")
			$("#zb_list li").removeClass('zblisthover');
			$("#zb_list1 li").removeClass('zblisthover');
			//			targetIds.splice(0,targetIds.length);
			obj.allpargraminfos();
			obj.tablepargraminfo();
			obj.tableshepargraminfo();
			obj.mappargraminfo();
		})
	},

	//上传
	UploadFile: function() {
		$("#resourceFile").bind("click", function() {
			window.alert.uploadConfirm();
			$("#formFile .sgBtn.ok").bind("click", function() {
				uploadCloudResource();
			});
		})
	},
	eventLiclick: function() {
		var obj = this;
		//编辑研报页输入框的内容
		if(stockContent) {
			$('.inputselect-color-tu').after("<span stockCode='" + stockCode + "'>" + stockContent + "<i class='del' id='tbdel'></i></span>")
			$("#tbdel").on("click", function() {
				$(this).parents("span").remove();
				$("input.inputselect-color-tu").val("");
				stockCode_xgtb =  "";
				$("#zb_list").css("display", "none");
			});
		}
		//点击相关图表右侧出现弹框
		$("#zb_list li").live('click', function() {
			$(".tankuang").hide();
			$(".tb-mask-box").show();
			$(".tb-mask-box div.contents:first").show();
		});
		//获取右侧左侧菜单栏的id
		//		$("#zb_list li.zb_list_two").live('click',function(){
		//			targetIds.splice(0,targetIds.length);
		//		})
		$("#zb_list li.zb_list_two,#zb_list1 li.zb_list_two").live('click', function() {
			var id = $(this).attr("id");
			$("#zb_list1 li#" + id).addClass('zblisthover');
			$("#zb_list li#" + id).addClass('zblisthover');
			$(this).addClass('zblisthover');
			var numarry = $.inArray(id, targetIds);
			if(numarry == -1) {
				targetIds.push(id);
			} else {
				//alert("请不要重复点击相同的指标")
			}
			obj.allSelect(); //相关图表日期频度显示
			obj.allpargraminfos();
			obj.tablepargraminfo();
			obj.tableshepargraminfo();
			obj.mappargraminfo();
		});
		//弹层图表表格切换
		$("#tabqiehuantubiao span").on('click', function() {
			$(this).addClass('on').siblings().removeClass('on');
			var index = $(this).index();
			$(this).parents(".tb-mask-right").find(".contents").hide();
			$(this).parents(".tb-mask-right").find(".contents").eq(index).show();
			obj.allpargraminfos();
			obj.tablepargraminfo();
			obj.tableshepargraminfo();
			obj.mappargraminfo();
		});
		//图表样式切换1，2，3
		$(".tu3").addClass('on');
		$(".tu1").on('click', function() {
			linearea = 'bar';
			styleline = false;
			$(this).addClass("on").siblings("b").removeClass("on");
			obj.allpargraminfos();
			obj.mappargraminfo();
		});
		$(".tu3").on('click', function() {
			echarts.getInstanceByDom(document.getElementById('tubiaocharttable')).clear();
			linearea = 'line';
			styleline = false;
			$(this).addClass("on").siblings("b").removeClass("on");
			obj.allpargraminfos();
			obj.mappargraminfo();
		});
		$(".tu2").on('click', function() {
			linearea = 'line';
			styleline = true;
			$(this).addClass("on").siblings("b").removeClass("on");
			obj.allpargraminfos();
			obj.mappargraminfo();
		});
		//时间选中获取日期频度
		$(".spanbox span").live('click', function() {
			$(this).addClass('on').siblings().removeClass('on');
			timestring = $(".spanbox span.on").attr("value");
			console.log(startdate);
			obj.allpargraminfos();
			obj.tablepargraminfo();
			obj.mappargraminfo();
			obj.laytime();
		});
		//移除
		$(".removedatabtn").live('click', function() {
			var huoqucodevalue = $(this).siblings(".idcode").attr("value");
			$("#zb_list li#" + huoqucodevalue).removeClass('zblisthover');
			$("#zb_list1 li#" + huoqucodevalue).removeClass('zblisthover');
			targetIds.remove(huoqucodevalue);
			obj.allpargraminfos();
			obj.tablepargraminfo();
			obj.tableshepargraminfo();
			obj.mappargraminfo();
			
		})

	},
	//图表日期频度选择
	allSelect: function() {
		var paraminfo = '{"body":{"type":"38"}}';
		$.axsRequest("FT003", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var list = data.retData.infoList;
				var html = ''
				var code_value = $(".spanbox span").attr("value");
				$(list).each(function(index, item) {
					html += "<span value=" + item.code + ">" + item.name + "</span>"
				})
				$(".spanbox").html(html);
				$(".spanbox span:nth-child(2)").addClass("on");

			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});
	},
	//获取指标数结构信息
	ZBTree: function() {
		var targetTreetmp = "";
		paraminfo = '{"body":{"parentId":"a"}}';
		$.axsRequest("FT701", paraminfo, false, function(data) {
			if(data.retCode == "0000") {
				var html = '';
				var list = data.retData;
				if(list.length == 0) {
					html += '<p>暂无数据</p>';
				} else {
					for(var i = 0; i < list.length; i++) {
						html += "<li id='" + data.retData[i].id + "' title='" + data.retData[i].className + "'>" + data.retData[i].className + "</li>";
						paraminfo = '{"body":{"parentId":"' + data.retData[i].id + '"}}';
						$.axsRequest("FT701", paraminfo, false, function(data1) {
							var list1 = data1.retData;
							for(var j = 0; j < list1.length; j++) {
								html += "<li class='zb_list_two' id='" + data1.retData[j].classValue + "' title='" + data1.retData[j].className + "'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + (data1.retData[j].className.length > 11 ? (data1.retData[j].className.substring(0, 11) + "...") : data1.retData[j].className) + "</li>";
								var classValue = data1.retData[j].classValue;
								var dataDateType = data1.retData[j].dataDateType;
								var businessTypes = data1.retData[j].businessTypes;
								var tmp = '"' + data1.retData[j].classValue + '":{"classValue":"' + classValue + '","dataDateType":"' + dataDateType + '","businessTypes":"' + businessTypes + '"},';
								targetTreetmp = targetTreetmp + tmp;
							}
						});
					}
					if(targetTreetmp != "") {
						targetTreetmp = "{" + targetTreetmp.substring(0, targetTreetmp.length - 1) + "}";
						targetTree = eval('(' + targetTreetmp + ')');;
					}
					//                          console.log(targetTree["HQZJCJ"]);
				}
				$("#zb_list").html(html);
				$("#zb_list1").html(html);
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});
	},
	allpargraminfos: function() {
		var cvstring = '';
		for(var i = 0; i < targetIds.length; i++) {
			targetTree[targetIds[i]]
			cvstring = targetTree[targetIds[i]].classValue + ',';
			classValuestring += cvstring;
			cvstring = '';
			cvstring = targetTree[targetIds[i]].dataDateType + ',';
			dataDateTypestring += cvstring;
			cvstring = '';
			cvstring = targetTree[targetIds[i]].businessTypes + ',';
			businessTypesstring += cvstring;
		}
		classValuestring = (classValuestring.slice(classValuestring.length - 1) == ',') ? classValuestring.slice(0, -1) : classValuestring;
		dataDateTypestring = (dataDateTypestring.slice(dataDateTypestring.length - 1) == ',') ? dataDateTypestring.slice(0, -1) : dataDateTypestring;
		businessTypesstring = (businessTypesstring.slice(businessTypesstring.length - 1) == ',') ? businessTypesstring.slice(0, -1) : businessTypesstring;

	},
	//相关图表表格加载
	tablepargraminfo: function() {
		paraminfo = '{"body":{"indexIds":"' + classValuestring + '","stockCode":"' + stockCode_xgtb + '","dataDateType":"' + dataDateTypestring + '","businessTypes":"' + businessTypesstring + '","dateType":"' + timestring + '"}}';
		$.axsRequest("FT702", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var _data = data.retData;
				var datas = _data.infoList;
				var datazbInfotable = _data.zbInfo;
				//生成图表下的表格
				var zbInfotable = '';
				zbInfotable = '<div><table class="tb-one"><thead><tr>' +
					'<th>指标名称</th>' +
					'<th>日期频度</th>' +
					'<th>单位</th>' +
					'<th>数据来源</th>' +
					'<th>起始时间</th>' +
					'<th>结束时间</th>' +
					'<th>操作</th></tr></thead><tbody>';
				$(datazbInfotable).each(function(index, item) {
					zbInfotable += '<tr><td class="idcode" value="' + item.code + '">' + item.name + '</td>' +
						'<td>' + item.type + '</td>' +
						'<td>' + item.unit + '</td>' +
						'<td>' + item.source + '</td>' +
						'<td class="startdatezb" value="' + item.startDate + '">' + item.startDate + '</td>' +
						'<td class="enddatezb" value="' + item.endDate + '">' + item.endDate + '</td>' +
						'<td class="removedatabtn" style="cursor: pointer;">移除</td>' +
						'</tr>';
				})
				zbInfotable += '</tbody></table></div>';
				$("#tubiaotbone").html(zbInfotable);
			}
		});
	},
	tableshepargraminfo: function() {
		paraminfo = '{"body":{"indexIds":"' + classValuestring + '","stockCode":"' + stockCode_xgtb + '","dataDateType":"' + dataDateTypestring + '","businessTypes":"' + businessTypesstring + '","dateType":"' + timestring + '"}}';
		$.axsRequest("FT702", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var _data = data.retData;
				var datas = _data.infoList;
				var datazbInfotable = _data.zbInfo;
				//数据表格综合
				var zbInfotable2 = '';
				var kongcodelist = [];
				zbInfotable2 += '<div><table class="tb-two"><tr><td style="min-width:130px">指标名称</td>';
				$(datazbInfotable).each(function(index, item) {
					zbInfotable2 += '<td style="min-width:130px">' + item.name + '</td>';
					kongcodelist.push(item.code);
					startdate = item.startDate;
					enddate = item.endDate;
				})
				zbInfotable2 += '</tr><tr><td>频度</td>';
				$(datazbInfotable).each(function(index, item) {
					zbInfotable2 += '<td>' + item.type + '</td>'
				})
				zbInfotable2 += '</tr><tr><td>单位</td>';
				$(datazbInfotable).each(function(index, item) {
					zbInfotable2 += '<td>' + item.unit + '</td>'
				})
				zbInfotable2 += '</tr><tr><td>来源</td>'
				$(datazbInfotable).each(function(index, item) {
					zbInfotable2 += '<td>' + item.source + '</td>'
				})
				zbInfotable2 += '</tr>';
				var kongcodestring = '';
				for(var i = 0; i < kongcodelist.length; i++) {
					kongcodestring += '"' + kongcodelist[i] + '":"-",';
				}
				if(kongcodestring == '') {
					return;
				}
				var kongcodetmp = "{" + kongcodestring.substring(0, kongcodestring.length - 1) + "}";
				kongcodelist = eval('(' + kongcodetmp + ')');;
				for(var k in datas) {
					zbInfotable2 += '<tr><td>' + k + '</td>';
					var tmpkongcodelist;
					$(datas[k]).each(function(index, item) {
						tmpkongcodelist = kongcodelist;
						var code = item.code;
						var data = item.data;
						tmpkongcodelist[code] = data;
					})
					for(var k2 in tmpkongcodelist) {
						if(k2 == "removeByValue") {
							continue;
						}
						zbInfotable2 += '<td>' + tmpkongcodelist[k2] + '</td>'
					}
					zbInfotable2 += '</tr>'

				}
				zbInfotable2 += '</table></div>';
				$("#tubiaotbtwo").html(zbInfotable2);
			}
		});
	},
	mappargraminfo: function() {
		var obj = this;
		var myChart = echarts.init(document.getElementById('tubiaocharttable'));
		if(classValuestring == "" || classValuestring == null || classValuestring == undefined) {
			$("#tubiaotbone tbody").html(" ")
			myChart.clear();
			return;
		}
		console.log(classValuestring)
		paraminfo = '{"body":{"indexIds":"' + classValuestring + '","stockCode":"' + stockCode_xgtb + '","dataDateType":"' + dataDateTypestring + '","businessTypes":"' + businessTypesstring + '","dateType":"' + timestring + '"}}';
		$.axsRequest("FT702", paraminfo, true, function(data) {
			if(data.retCode == "0000") {
				var _data = data.retData;
				var datas = _data.infoList;
				var datazbInfotable = _data.zbInfo;
				console.log(datas);
				console.log(datazbInfotable);
				//图表数据
				var datak = [];
				var codelist = [];
				var datalist = [];
				var n;
				for(var k in datas) {
					datak.push(k);
					$(datas[k]).each(function(index, item) {
						var code = item.code;
						codelist.push(code);
						var data = item.data;
						if(datalist[code] == null) {
							datalist[code] = data;
						} else {
							datalist[code] = datalist[code] + "," + data;
						}
					})

				}
				var tubiaodatas = [];
				var ks = '';
				var varks = '';
				var datanames = [];
				for(var k in datalist) {
					if(k == "removeByValue" || k == "remove") {
						continue;
					}
					var dataname = $("#" + k).attr("title");
					datanames.push(dataname);
					//					var datanames1;
					//					datanames1=dataname+"\",\"";
					//					datanames += datanames1;
					//					datanames=datanames.replace(/,/ig, "\"");
					var val = datalist[k] + "";
					var valArr = val.split(',');
					var tmp = {};
					tmp.type = linearea;
					if(styleline) {
						tmp.itemStyle = {
							normal: {
								areaStyle: {
									type: 'default'
								}
							}
						};
					}
					tmp.name = dataname;
					tmp.data = valArr;
					tmp.symbol = "circle";
					tubiaodatas.push(tmp);
					console.log(tubiaodatas);

				}
				//				datanames=(datanames.slice(datanames.length-1)=='\",\"')?datanames.slice(0,-1):datanames;
				//				datanames=datanames.substring(0,datanames.length-3);
				var width = $(".zdsj").width() * 0.9;
				$("#tubiaocharttable").css("width", width);
				//生成图表
				var option = {
					legend: {
						data: datanames,
						left: 'left',
						selected: {}
					},
					xAxis: {
						show: true,
						type: 'category',
						data: datak
					},
					yAxis: {
						show: true,
						name: '元',
						type: 'value'
					},
					grid: {
						show: true,
						left: '5%',
						right: '5%',
						bottom: '30%'
					},
					series: tubiaodatas,
					dataZoom: [{
						type: 'slider',
						show: true,
						start: '0',
						end: '100',
						bottom: '3%'
					}]
				};
				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option);
				console.log(option.legend);
				$("#tubiaocharttable").parent().append('<input value="tubiaocharttable" type="hidden" idx="0" id="picInfoSrc">');
				var key = 'tubiaocharttable' + '_' + stockCode_xgtb ;
				if(echartsOptions[key] == null)
				{
					var jsonStr = '{"'+key+'":' + JSON.stringify(option) + '}';
					$.extend(echartsOptions, $.parseJSON(jsonStr));
				}
				
				//				var data1 = ['邮件营销', '联盟广告'];
				//				var option1=myChart.getOption();
				//				var legend={data:data1};  
				//				option1.legend=legend;
				//				myChart.setOption(option1,true);
				//				myChart.on('datazoom', function (tubiaodatas){
				var opt = myChart.getOption();
				var dz = opt.dataZoom[0];
				startdate = opt.xAxis[0].data[dz.startValue];
				enddate = opt.xAxis[0].data[dz.endValue];
				if(startdate!=null || startdate!=undefined || startdate !="" || enddate!=null || enddate !=undefined || enddate!=""){
					laydate.render({
						elem: '#tb-start-date',
						position: 'fixed',
						// min: startdate,
						// max: enddate
	
					});
					laydate.render({
						elem: '#tb-end-date',
						// min: startdate,
						// max: enddate,
						done: function() {
							obj.laytime();
						}
					});
					$("#tb-start-date").val(startdate);
					$("#tb-end-date").val(enddate);
				}else{
					laydate.render({
						elem: '#tb-start-date',
						position: 'fixed',
	
					});
					laydate.render({
						elem: '#tb-end-date',
						done: function() {
							obj.laytime();
						}
					});
					$("#tb-start-date").val(" ");
					$("#tb-end-date").val(" ");
				}
				//				})
				window.addEventListener("resize", function() {
					myChart.resize();
				});
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		})
		classValuestring = '';
		dataDateTypestring = '';
		businessTypesstring = '';

	},
	laytime: function() {
		var obj = this;
		startdate = $("#tb-start-date").val();
		enddate = $("#tb-end-date").val();
		if(enddate < startdate) {
			$("#tb-end-date").val(" ")
			alert("请重新选择日期，结束日期不能小于开始日期")
		} else {
			timestring = startdate + "," + enddate;
			obj.allpargraminfos();
			console.log(classValuestring);
			console.log(timestring);
			obj.mappargraminfo();
		}
	},
	//获取宏观数据目录结构
	HGDataTree: function() {
		paraminfo = '{"body":{"parentId":"hg"}}';
		$.axsRequest("FT801", paraminfo, false, function(data) {
			if(data.retCode == "0000") {
				var html = '';
				var list = data.retData;
				//console.log(list);
				if(list.length == 0) {
					html += '<p>暂无数据</p>';
				} else {
					for(var i = 0; i < list.length; i++) {
						html += "<li id='" + data.retData[i].id + "'>" + data.retData[i].class_name + "</li>";
						paraminfo = '{"body":{"parentId":"' + data.retData[i].id + '"}}';
						$.axsRequest("FT801", paraminfo, false, function(data1) {
							var list1 = data1.retData;
							for(var j = 0; j < list1.length; j++) {
								hongnameslist = data1.retData[j].class_name;
								$(hongnameslist).each(function(index, item) {
									hongname = item.class_name;
								})
								//								console.log(hongname);
								html += "<li id='" + data1.retData[j].id + "'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + (data1.retData[j].class_name.length > 8 ? (data1.retData[j].class_name.substring(0, 8) + "...") : data1.retData[j].class_name) + "</li>";
							}
						});
					}
				}
				$("#hg_list").html(html);
				//$("#hg_list1").html(html);
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});
	},
	//新闻搜索
	NewsSerch: function() {
		$("#news_sousuo").on("change", function() {
			var newsKeyWord = $("#news_sousuo").val();
			var obj = this;
			//console.log(this)
			if(newsKeyWord != '' || typeof(newsKeyWord) != "undefined") {
				BS.yanbaoRightData.MarketNewsData(newsKeyWord);
			}
			//obj.MarketNewsData(newsKeyWord);
		})
	},
	//市场数据——新闻资讯数据
	MarketNewsData: function(serchKey) {
		paraminfo = '{"body":{"pageNum":"1","pageSize":"5","serch_key":"' + serchKey + '"}}';
		$.axsRequest("FT306", paraminfo, false, function(data) {
			if(data.retCode == "0000") {
				var html = '';
				var list = data.retData.infoList;

				//console.log(list);
				if(list.length == 0) {
					html += '<p>暂无数据</p>';
				} else {
					for(var i = 0; i < list.length; i++) {
						html += '<div class="massage_ clear"><a class="newsItem" code=' + data.retData.infoList[i].news_url + ' target="_blank" title="' + data.retData.infoList[i].title + '">' + data.retData.infoList[i].title + '<span>' + data.retData.infoList[i].release_time + '</span></a></div>';
					}
				}
				$("#newsList").html(html);
				$("#newsList").on("click", ".massage_", function() {
					// window.location.href="/detail/detail.html?type=sf&stockCode="+$(this).attr("code");
					var i = $(this).index();
					var listObj = JSON.stringify(data.retData.infoList[i]);
					localStorage.setItem('xwzxobj', listObj);
					window.open("/detail/detail.html?type=xw&newsurl=" + $(this).children().attr("code"));
				});
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});
	},

	//研报搜索
	ReportSerch: function() {
		$("#report_sousuo").on("change", function() {
			var reportKeyWord = $("#report_sousuo").val();
			var obj = this;
			//console.log(this)
			if(reportKeyWord != '' || typeof(reportKeyWord) != "undefined") {
				BS.yanbaoRightData.MarketReportData(reportKeyWord);
			}
			//obj.MarketNewsData(newsKeyWord);
		})
	},
	//市场数据——研报广场数据
	MarketReportData: function(serchKey) {
		paraminfo = '{"body":{"pageNum":"1","pageSize":"5","serch_key":"' + serchKey + '"}}';
		$.axsRequest("FT307", paraminfo, false, function(data) {
			if(data.retCode == "0000") {
				var html = '';
				var list = data.retData.infoList;
				//console.log(list);
				if(list.length == 0) {
					html += '<p>暂无数据</p>';
				} else {
					for(var i = 0; i < list.length; i++) {

						html += '<div class="massage_ clear" style="margin-bottom:5px;"><a code=' + data.retData.infoList[i].stock_code + ' target="_blank" title="' + data.retData.infoList[i].title + '"><span class="biati">' + data.retData.infoList[i].rtypename + '</span>' + data.retData.infoList[i].title + '</a><span class="time">' + data.retData.infoList[i].release_time + '</span></div>';
					}
				}
				$("#reportList").html(html);
				$("#reportList").on("click", ".massage_", function() {
					var i = $(this).index();
					var listObj = JSON.stringify(data.retData.infoList[i]);
					localStorage.setItem('sfybobj', listObj);
					// window.location.href="/detail/detail.html?type=sf&stockCode="+$(this).attr("code");
					window.open("/detail/detail.html?type=sf&stockCode=" + $(this).children().attr("code"));
				});
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});
	},

	//企业公告搜索
	CompanySerch: function() {
		$("#company_sousuo").on("change", function() {
			var companyKeyWord = $("#company_sousuo").val();
			var obj = this;
			//console.log(this)
			if(companyKeyWord != '' || typeof(companyKeyWord) != "undefined") {
				BS.yanbaoRightData.MarketCompanyData(companyKeyWord);
			}
			//obj.MarketNewsData(newsKeyWord);
		})
	},

	//市场数据——企业公告数据
	MarketCompanyData: function(serchKey) {
		paraminfo = '{"body":{"pageNum":"1","pageSize":"5","serch_key":"' + serchKey + '"}}';
		$.axsRequest("FT308", paraminfo, false, function(data) {
			if(data.retCode == "0000") {
				var html = '';
				var list = data.retData.infoList;
				//console.log(list);
				if(list.length == 0) {
					html += '<p>暂无数据</p>';
				} else {
					for(var i = 0; i < list.length; i++) {
						html += '<div class="massage_ clear"><a class="newsItem" href="' + data.retData.infoList[i].pdfUrl + '" target="_blank" title="' + data.retData.infoList[i].title + '">' + data.retData.infoList[i].title + '<span>' + data.retData.infoList[i].publishDate + '</span></a></div>';
					}
				}
				$("#companyList").html(html);
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});
	},

	//政策法规搜索
	PolicySerch: function() {
		$("#policy_sousuo").on("change", function() {
			var policyKeyWord = $("#policy_sousuo").val();
			var obj = this;
			//console.log(this)
			if(policyKeyWord != '' || typeof(policyKeyWord) != "undefined") {
				BS.yanbaoRightData.MarketPolicyData(policyKeyWord);
			}
			//obj.MarketNewsData(newsKeyWord);
		})
	},

	//市场数据——政策法规数据
	MarketPolicyData: function(serchKey) {
		paraminfo = '{"body":{"pageNum":"1","pageSize":"5","serch_key":"' + serchKey + '"}}';
		$.axsRequest("FT309", paraminfo, false, function(data) {
			if(data.retCode == "0000") {
				var html = '';
				var list = data.retData.infoList;
				//console.log(list);
				if(list.length == 0) {
					html += '<p>暂无数据</p>';
				} else {
					for(var i = 0; i < list.length; i++) {
						html += '<div class="massage_ clear" style="position:relative"><a class="newsItem" code="" target="_blank" title="' + data.retData.infoList[i].title + '">' + data.retData.infoList[i].title + '<span>' + data.retData.infoList[i].publishDate + '</span></a></div>';
					}
				}
				$("#policyList").html(html);
				$("#policyList").on("click", ".massage_", function() {
					var i = $(this).index();
					var listObj = JSON.stringify(data.retData.infoList[i]);
					localStorage.setItem('zcfgobj', listObj);
					// window.location.href="/detail/detail.html?type=sf&stockCode="+$(this).attr("code");
					window.open("/detail/detail.html?type=fg&postNum=" + $(this).children().attr("code"));
				});
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});
	},

	//云盘资料搜索
	TuBiaoSerch: function() {
		$("#tubiao_sousuo").on("change", function() {
			var policyKeyWord = $("#tubiao_sousuo").val();
			var obj = this;
			//console.log(this)
			if(policyKeyWord != '' || typeof(policyKeyWord) != "undefined") {
				BS.yanbaoRightData.MyTuBiaoList(policyKeyWord);
			}
			//obj.MarketNewsData(newsKeyWord);
		})
	},
	//我的图表列表信息
	MyTuBiaoList: function(serchKey) {
		paraminfo = '{"body":{"serch_key":"' + serchKey + '"}}';
		$.axsRequest("FT339", paraminfo, false, function(data) {

			if(data.retCode == "0000") {
				var html = '';
				if(data.retData == '') {
					return false;
				} else {
					var list = data.retData.infoList;
					//console.log(list);
					if(list.length == 0) {
						html += '<p>暂无数据</p>';
					} else {
						for(var i = 0; i < list.length; i++) {
							html += '<div class="pic"><div>' + list[i].chart_name + '</div><img src="' + list[i].image_url + '" alt="' + list[i].chart_name + '" /><div style="display:none;" class="tb-shadow"  inserturl="' + list[i].image_url + '"><span>点击插入</span></div></div>';
							//html+= '<div class="pic"><div>'+list[i].chart_name+'</div><img src="'+list[i].image_url+'" alt="'+list[i].chart_name+'" title="点击插入" class="clickImgInsert"/></div>';	  
						}
					}
					$("#my_tubiao_list").html(html);
					$(".list_main .wdyp_main .pic").on("mouseover", function() {
						$(this).find(".tb-shadow").show();
					}).on("mouseleave", function() {
						$(this).find(".tb-shadow").hide();
					});
				}

			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		});
	},

	//云盘资料搜索
	CloudSerch: function() {
		$("#cloud_sousuo").on("change", function() {
			var policyKeyWord = $("#cloud_sousuo").val();
			var obj = this;
			//console.log(this)
			if(policyKeyWord != '' || typeof(policyKeyWord) != "undefined") {
				BS.yanbaoRightData.MyCloudResource(policyKeyWord);
			}
			//obj.MarketNewsData(newsKeyWord);
		})
	},
	//我的资料列表信息
	MyCloudResource: function(serchKey) {
		$.PostJsonData("/beta/cloudResource/getResourceList.do", {
				"userId": localStorage.getItem("userId"),
				"currentPage": 1,
				"pageSize": 100000,
				"resourceName": serchKey
			}, false,
			function(data) {
				if(data.code == "0000") {
					var html = "";
					var listData = data.result.content;
					for(var i = 0; i < listData.length; i++) {
						var uploadDate = data.result.content[i].uploadDate;
						var uploadDateSub = uploadDate.substring(0, 10);
						if(data.result.content[i].resourceType == '.doc' || data.result.content[i].resourceType == '.docx') {
							html += '<p class="clear" id="' + data.result.content[i].id + '"><img src="/saasBeta/images/Image/word.png" width="12px" height="14px"/><a href="' + data.result.content[i].resourceUrl + '" target="_blank" title="' + data.result.content[i].resourceName + '">' + data.result.content[i].resourceName + '</a><em><i style="display:none;" class="down" onclick="downloadFiles(\'' + data.result.content[i].resourceUrl + '\')"></i><i style="display:none;" class="del" onclick="delete_resource(' + data.result.content[i].id + ')"></i><i class="uploadDate">' + uploadDateSub + '</i></em></p>';
						} else if(data.result.content[i].resourceType == '.pdf') {
							html += '<p class="clear" id="' + data.result.content[i].id + '"><img src="/saasBeta/images/Image/pdf.png" width="12px" height="14px"/><a href="' + data.result.content[i].resourceUrl + '" target="_blank" title="' + data.result.content[i].resourceName + '">' + data.result.content[i].resourceName + '</a><em><i style="display:none;" class="down" onclick="downloadFiles(\'' + data.result.content[i].resourceUrl + '\')"></i><i style="display:none;" class="del" onclick="delete_resource(' + data.result.content[i].id + ')"></i><i class="uploadDate">' + uploadDateSub + '</i></em></p>';
						} else if(data.result.content[i].resourceType == '.ppt' || data.result.content[i].resourceType == '.pptx') {
							html += '<p class="clear" id="' + data.result.content[i].id + '"><img src="/saasBeta/images/Image/ppt.png" width="12px" height="14px"/><a href="' + data.result.content[i].resourceUrl + '" target="_blank" title="' + data.result.content[i].resourceName + '">' + data.result.content[i].resourceName + '</a><em><i style="display:none;" class="down" onclick="downloadFiles(\'' + data.result.content[i].resourceUrl + '\')"></i><i style="display:none;" class="del" onclick="delete_resource(' + data.result.content[i].id + ')"></i><i class="uploadDate">' + uploadDateSub + '</i></em></p>';
						} else if(data.result.content[i].resourceType == '.png' || data.result.content[i].resourceType == '.jpg') {
							html += '<p class="clear" id="' + data.result.content[i].id + '"><img src="/saasBeta/images/Image/tupian.png" width="12px" height="14px"/><a href="' + data.result.content[i].resourceUrl + '" target="_blank" title="' + data.result.content[i].resourceName + '">' + data.result.content[i].resourceName + '</a><em><i style="display:none;" class="down" onclick="downloadFiles(\'' + data.result.content[i].resourceUrl + '\')"></i><i style="display:none;" class="del" onclick="delete_resource(' + data.result.content[i].id + ')"></i><i class="uploadDate">' + uploadDateSub + '</i></em></p>';
						} else if(data.result.content[i].resourceType == '.xlsx' || data.result.content[i].resourceType == '.xls') {
							html += '<p class="clear" id="' + data.result.content[i].id + '"><img src="/saasBeta/images/Image/excel.png" width="12px" height="14px"/><a href="' + data.result.content[i].resourceUrl + '" target="_blank" title="' + data.result.content[i].resourceName + '">' + data.result.content[i].resourceName + '</a><em><i style="display:none;" class="down" onclick="downloadFiles(\'' + data.result.content[i].resourceUrl + '\')"></i><i style="display:none;" class="del" onclick="delete_resource(' + data.result.content[i].id + ')"></i><i class="uploadDate">' + uploadDateSub + '</i></em></p>';
						} else {
							html += '<p class="clear" id="' + data.result.content[i].id + '"><img src="/saasBeta/images/Image/txt.png" width="12px" height="14px"/><a href="' + data.result.content[i].resourceUrl + '" target="_blank" title="' + data.result.content[i].resourceName + '">' + data.result.content[i].resourceName + '</a><em><i style="display:none;" class="down" onclick="downloadFiles(\'' + data.result.content[i].resourceUrl + '\')"></i><i style="display:none;" class="del" onclick="delete_resource(' + data.result.content[i].id + ')"></i><i class="uploadDate">' + uploadDateSub + '</i></em></p>';
						}
					}
					$("#cloud_list").html(html);
					$("#cloud_list p.clear").on("mouseenter", function() {
						$(this).find(".down").show();
						$(this).find(".del").show();
					}).on("mouseleave", function() {
						$(this).find(".down").hide();
						$(this).find(".del").hide();
					})
				} else {
					errorAlert(data.retCode, data.retMsg);
				}
			})
	}

}

function downloadFiles(url) {
	download(url);
}

function delete_resource(id) {
	var txt = "确认删除该资源信息吗？";
	var option = {
		title: "警告",
		btn: parseInt("0011", 2),
		onOk: function() {
			$.ajax({
				url: '/beta/cloudResource/removeResource.do',
				type: 'post',
				data: {
					"userId": localStorage.getItem("userId"),
					"resourceId": id
				},
				success: function(data) {
					if(data.code == '0000') {
						$("#" + id).hide();
					}
				}
			})
		}
	}
	window.alert.bcConfirm(txt, window.alert.bcConfirm.typeEnum.confirm, option);
}

function uploadCloudResource() {
	var formData = new FormData($("#formFile")[0]);
	var name = encodeURI($(".tit_ipt").val());
	var userId = localStorage.getItem("userId");
	formData.append("userId", userId);
	//formData.delete("resourceName");
	formData.append("resourceName", name);
	if($(".tit_ipt").val().length > 30) {
		var txt = "资源名称超出限制字数，请保持在30个字符以内！";
		var option = {
			title: "警告",
			btn: parseInt("0001", 2)
		}
		window.alert.bcConfirm(txt, window.alert.bcConfirm.typeEnum.confirm, option);
		return false;
	} else if($(".tit_ipt").val() == "" || typeof($(".tit_ipt").val()) == "undefined") {
		var txt = "请输入标题！";
		var option = {
			title: "警告",
			btn: parseInt("0001", 2)
		}
		window.alert.bcConfirm(txt, window.alert.bcConfirm.typeEnum.confirm, option);
		return false;
	} else if($("#file").val() == "" || typeof($("#file").val()) == "undefined") {
		var txt = "请上传文件！";
		var option = {
			title: "警告",
			btn: parseInt("0001", 2)
		}
		window.alert.bcConfirm(txt, window.alert.bcConfirm.typeEnum.confirm, option);
		return false;
	} else {
		$.ajax({
			url: '/beta/cloudResource/insertResource.do',
			type: 'post',
			data: formData,
			processData: false,
			contentType: false,
			success: function(data) {
				if(data.code == '0000') {
					BS.yanbaoRightData.MyCloudResource(null);
					$(".upConfirm").remove();
				}
				BS.yanbaoRightData.MyCloudResource(null);
				$(".upConfirm").remove();
			}
		})
	}
}

$(function() {
	BS.yanbaoRightData.PageInit();
 
	if(stockCode_xgtb != null && stockCode_xgtb != "") {
		$("#zb_list").css("display", "block");

		//$(".inputselect-color-tu").val(getUrlParam("content"));
	} else {
		$("#zb_list").css("display", "none");
	}
	$(".tb-shadow").live('click', function() {
		//console.log("clickImgInsert");
		var newBlock = $(".middle_middle div.table:first");
		//console.log(newBlock);
		if(newBlock && newBlock.length == 1) {
			$(newBlock).html("<div class='img' style='min-height:50px;width:100%'><img width='100%' src='" + $(this).attr("inserturl") + "'/></div>")
			$(newBlock).removeClass("table new_insert_table");
			$('div.import_mask').hide();
			//从蒙层中得到要插入的位置
			var mtradm = $('div.import_mask').attr("mtradm")
			var index = $('div.import_mask').attr("index");

			var sender = $(this);

			//将选择内容插入至研报
			EditContent(mtradm, index, "<div class='img' style='min-height:50px;width:100%'><img width='100%' src='" + $(sender).attr("inserturl") + "'/></div>");
			// $("[mtradm="+mtradm+"][code][name]").nextAll().each(function(i,item){
			// 	if(!$(item).attr("id"))
			// 	{
			// 		file[mtradm].splice(i, 0, {
			// 			"editor": 1,
			// 			"attribute": "table",
			// 			"dom": "<div class='img' style='min-height:50px;width:100%'><img width='100%' src='" + $(sender).attr("inserturl") + "'/></div>"
			// 		})
			// 		return false;
			// 	}
			// })
			refreshList();
		} else {
			alert("请添加新的编辑区域再插入！");
		}
	})
	$("#TUsear").on("click", function() {
		var val = $(".inputselect-color-tu").val();
		if(val == "")
			{
				stockCode_xgtb = "";
				$("#zb_list").hide();
				return;
			}
		var searchSuccess = false;
		$.each(searchObjectList, function(index, flag) {
			if(val.indexOf(flag.code) > -1 || val.indexOf(flag.name) > -1) {
				$("input.inputselect-color-tu").after("<span stockCode='" + flag.code + "'>" + flag.name + "(" + flag.code + ")<i class='del' id='tbdel1'></i></span>");
				$("#tbdel1").on("click", function() {
						$("input.inputselect-color-tu").val("");
						$(this).parents("span").remove();
						stockCode_xgtb =  "";
						$("#zb_list").css("display", "none");
				});
				stockCode_xgtb =  flag.code ;
				$("#zb_list").css("display", "block");
				searchSuccess = true;
			}

		});
        
		var tmpCode = getUrlParam("stockCode");
		if(tmpCode != null && tmpCode != "") {
			isShowmodel = false;
		}
		if(searchSuccess == false)
		{
           $("#zb_list").css("display", "none");
           stockCode_xgtb =  "";
		}
		
		targetIds.splice(0,targetIds.length);
	})
	$("input.inputselect-color-tu").autocomplete({
		minLength: 2,
		source: function(request, response) {
			searchObjecCodetList(request, response);
		},
		delay: 500,
		select: function(event, ui) {
			var item = ui.item;
			var thisSelect = $(this);
			stockCode_xgtb = item.code;
			$("input.inputselect-color-tu").after("<span stockCode='" + item.code + "'>" + item.name + "(" + item.code + ")<i class='del' id='tbdel2'></i></span>");
			$("#tbdel2").on("click", function() {
					$(this).parents("span").remove();
					thisSelect.val("");
					stockCode_xgtb =  "";
					$("#zb_list").css("display", "none");
				});
			$("#zb_list").css("display", "block");
			targetIds.splice(0,targetIds.length);
		}
	}).focus(function() {
		$(this).autocomplete("search");
	});
	$("input.inputselect-color-tu").keydown(function(e) {
		if(e.keyCode == 13) {
			//回车事件
			if($(this).val() != "") {
				var val = $.trim($(this).val());
				var searchSuccess = false;
				if(searchObjectList.length != 0) {
					$.each(searchObjectList, function(index, flag) {
						if(val.indexOf(flag.code) > -1 || val.indexOf(flag.name) > -1) {
							stockCode_xgtb = flag.code;
							searchSuccess = true;
							$("input.inputselect-color-tu").after("<span stockCode='" + flag.code + "'>" + flag.name + "(" + flag.code + ")<i class='del' id='tbdel3'></i></span>");
							$("#tbdel3").on("click", function() {
									$("input.inputselect-color-tu").val("");
									$(this).parents("span").remove();
									stockCode_xgtb =  "";
									$("#zb_list").css("display", "none");
								});
							$("#zb_list").css("display", "block");
							targetIds.splice(0,targetIds.length);
						}
					});
					if(searchSuccess == false)
					{
			           $("#zb_list").css("display", "none");
			           stockCode_xgtb =  "";
					}
				}
			}
			$("#ui-id-2").hide();
		}
	});


});