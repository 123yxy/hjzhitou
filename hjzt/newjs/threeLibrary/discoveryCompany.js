var hyType = "management_industry_id"; //行业类型
var hyId=""; //行业id
var dqId = ""; //地区
var status = ""; //挂牌状态
var dealType = ""; //交易状态
var block = ""; //所属板块
var zbqs = ""; //主办券商
var beginYysr = ""; //营业收入开始
var endYysr = ""; //营业收入结束
var beginZsz = ""; //总市值开始
var endZsz = ""; //总市值结束
var beginJlr = ""; //净利润开始
var endJlr = ""; //净利润结束
var esTime = ""; //股份公司成立时间
var stockDate = ""; //挂牌时间
var sortField = "financingNewTime desc"; //排序字段
var inpVal = "";
var ids = "";//导出excel的行业ID
$(function(){
	
	/**
	 * 查询行业
	 */
	findCategory(0,2);
	
	/**
	 * 查询区域
	 */
	findArea();
	
	/**
	 * 查询主办券商
	 */
	findSponsoredBroker();
	
	/**
	 * 查询股份公司成立时间
	 */
	findEstablishTime();
	
	findEnterpriseData(1, 20);
	
	//点击假背景时让下拉框收回
	$(document).on("click", function() {
		$(".selectBox ul").slideUp();
	});
	
	
	//点击全选的时候让选中所有
	$(".gs_qx").on("click",function(){
		var dxInputLen=$(".gs_dx").find('input[type="checkbox"]');
		if($(this).is(":checked")){
			$(dxInputLen).each(function(index,item){
				$(item).prop("checked",true);
			})
		}else{
			$(dxInputLen).each(function(index,item){
				$(item).prop("checked",false);
			})
		}
		//导出excel数据的单选框
		$("#companyTBody :checkbox").each(function(){
			if(this.checked == true){
				if(getArrIndex(ids.split(","), $(this).attr("id")) == -1){
					ids += $(this).attr("id") + ",";
				}
			}else{
				if(getArrIndex(ids.split(","), $(this).attr("id")) > -1){
					ids = ids.replace($(this).attr("id") + ",", "");
				}
			}
		})
	})
	//点击单选框时
	$(".gs_dx").delegate('input[type="checkbox"]',"click",function(){
		var dxInputLen=$(".gs_dx").find('input[type="checkbox"]');
		var inputLength=$(".gs_dx").find('input[type="checkbox"]').length;
		var flag=0;
		if($(this).is(":checked")){
			$(dxInputLen).each(function(index,item){
				if($(item).is(":checked")){
					flag++;
				}
			})
		}else{
			$(".gs_qx").prop("checked",false);
		}
		if(flag==inputLength){
			$(".gs_qx").prop("checked",true);
		}
		//导出excel数据的单选框
		$("#companyTBody :checkbox").each(function(){
			if(this.checked == true){
				if(getArrIndex(ids.split(","), $(this).attr("id")) == -1){
					ids += $(this).attr("id") + ",";
				}
			}else{
				if(getArrIndex(ids.split(","), $(this).attr("id")) > -1){
					ids = ids.replace($(this).attr("id") + ",", "");
				}
			}
		})
	})
	//点击更多时显示可选择指标
	$(".more_zb").on("click",function(){
		if($(this).parent().find("div.gd_xzzb").hasClass("active")){
			$(this).parent().find("div.gd_xzzb").removeClass('active');
		}else{
			$(this).parent().find("div.gd_xzzb").addClass('active');
		}
	})
	
	//点击收缩
	$(".gs_shous").on("click",function(){
		$(this).parent().removeClass('active');	
	})
	//点击更多指标里的指标
	$(".data-checkbox").on("click",function(){
		
		if($(this).find("label.checkbox").hasClass("on")){
			$(this).find("label.checkbox").removeClass("on");
		}else{
			$(this).find("label.checkbox").addClass("on");
		}
		$(".data-checkbox .checkbox").each(function(){
			if($(this).hasClass("on")){
				$("[name="+$(this).attr("data-value")+"]").show();
			}else{
				$("[name="+$(this).attr("data-value")+"]").hide();
			}
		})
		
	})
	
	$(".selectBox ul li").click(function() {
		var p = $(this).parent().parent().find("p");
		$(".selectBox ul").hide();
		$(".searching").hide();
		$(".jiabeijing").hide();
		p.text(($(this).find("a").text()).indexOf("...") > -1 ? $(this).find("a").text():$(this).find("a").text());
		p.attr("title",$(this).attr("title"));
		p.attr("data-value", $(this).attr("data-value"));
		p.attr("value", $(this).attr("value"));
		
		editConditions(this);
		
		findEnterpriseData(1, 20);
	});
	//点击筛选条件时删除对应的内容
	$(".tj_selected").delegate("i","click",function(){
		$(this).parent().remove();
		if($(".tj_selected a").length==0){
			$(".yixuan_tiaojian").hide();
		}else{
			$(".yixuan_tiaojian").show();
		}
		
		var tyCon = $(this).parent().attr("data-value");
		if(tyCon == "hy"){
			hyId = "";
			$("#hy").prev().text("行业");
		}else if(tyCon == "dq"){
			dqId = "";
			$("#dq").prev().text("地区");
		}else if(tyCon == "status"){
			status = "";
			$("#status").prev().text("挂牌状态");
		}else if(tyCon == "dealType"){
			dealType = "";
			$("#dealType").prev().text("交易状态");
		}else if(tyCon == "block"){
			block = "";
			$("#block").prev().text("所属板块");
		}else if(tyCon == "zbqs"){
			zbqs = "";
			$("#zbqs").prev().text("主办券商");
		}else if(tyCon == "yysr"){
			beginYysr = "";
			endYysr = "";
			$("#yysr").prev().text("营业收入");
		}else if(tyCon == "zsz"){
			beginZsz = "";
			endZsz = "";
			$("#zsz").prev().text("总市值");
		}else if(tyCon == "jlr"){
			beginJlr = "";
			endJlr = "";
			$("#jlr").prev().text("净利润");
		}else if(tyCon == "esTime"){
			esTime = "";
			$("#esTime").prev().text("成立时间");
		}else if(tyCon == "stockDate"){
			stockDate = "";
			$("#stockDate").prev().text("挂牌日期");
		}else if(tyCon == "inpVal"){
			inpVal = "";
		}
		
		findEnterpriseData(1, 20);
	})
	//点击清楚筛选时把选择的清空掉
	$(".yixuan_tiaojian>span").on("click",function(){
		$(".tj_selected a").remove();
		$(this).parent().hide();
		hyId = "";
		dqId = "";
		status = "";
		dealType = "";
		block = "";
		zbqs = "";
		beginYysr = "";
		endYysr = "";
		beginZsz = "";
		endZsz = "";
		beginJlr = "";
		endJlr = "";
		esTime = "";
		stockDate = "";
		inpVal = "";
		$("#hy").prev().text("行业");
		$("#dq").prev().text("地区");
		$("#status").prev().text("挂牌状态");
		$("#dealType").prev().text("交易状态");
		$("#block").prev().text("所属板块");
		$("#zbqs").prev().text("主办券商");
		$("#yysr").prev().text("营业收入");
		$("#zsz").prev().text("总市值");
		$("#jlr").prev().text("净利润");
		$("#esTime").prev().text("成立时间");
		$("#stockDate").prev().text("挂牌日期");
		
		findEnterpriseData(1, 20);
	})

	
	
	//筛选的时候默认隐藏的内容
	$(".show_select").hide();
	
	/**
	 * 排序
	 */
	$("[name='companyTr'] span").click(function(){
		var cla = $(this).attr("class");
		$("[name='companyTr'] span").removeClass("up");
		$("[name='companyTr'] span").removeClass("down");
		if(cla == undefined || cla == "" || cla == "up"){
			$(this).addClass("down");
			sortField = $(this).attr("data-value") + " desc";
		}else if(cla == "down"){
			$(this).addClass("up");
			sortField = $(this).attr("data-value") + " asc";
		}
		findEnterpriseData(1, 20);
	})
	
	/**
	 * 查询条件框
	 */
	$("#inpVal").next().click(function(){
		var inpVals = $.trim($("#inpVal").val());
		if(inpVals != "" && inpVals != null && inpVals != "undefined"){
			updateShowCon("inpVal", $("#inpVal").val());
			inpVal = $("#inpVal").val();
			findEnterpriseData(1, 20);
		}else{
			$.zmAlert("请输入要检索的信息");
		}
		$("#inpVal").val("");
	})
	
	/**
	 * 导出数据
	 */
	/*$("#outData").click(function(){
		var flag = false;
		var th = "";
		$(".changeTd").each(function(){
			if($(this).css("display") != "none"){
				th += "<th>"+$(this).html()+"</th>";
			}
		})
		
		var tr = "";
		$("#companyTBody :checkbox").each(function(){
			if(this.checked == true){
				flag = true;
				tr += "<tr>";
				$(this).parent().parent().children().each(function(){
					if($(this).html().indexOf("checkbox") < 0 && $(this).css("display") != "none"){
						tr += "<td>"+$(this).html()+"</td>";
					}
				})
				tr += "</tr>";
			}
		})
		if(flag){
			$("[name='outTrTitle']").append(th);
			$("#outTable").append(tr);
			$("#outTable .gongju").remove();
			$("#outTable .compamy_logo").remove();
			method5("outTable");
			$("#outTable").empty();
			$("#outTable").html("<tr name='outTrTitle' >"+
							"<th>公司</th>"+
							"<th class='gp_cl_time'>" +
							"<span data-value='establishTime' class=''>成立时间</span>"+
								"<span data-value='stockDate' >挂牌时间</span>"+
							"</th>"+
							"<th>地区</th>"+
							"<th><span data-value='financingNewTime' class='down'>最新融资情况</span></th>"+
						"</tr>");
		}else{
			$.zmAlert("没有要导出的数据");
		}
	})*/
	$("#outData").click(function(){
		if(ids != ""){
			location.href = "/betaInvest/enterpriseData/outExcelMethod.do?ids="+ids.substring(0, ids.length - 1)+"&hyType="+hyType+"&sortField="+sortField;
		}else{
			$.zmAlert("没有要导出的数据");
		}
	})
	
	/*信息补全开始*/
	$("#inpVal").keydown(function(e) {
		if(e.keyCode==13){
			//回车事件
			if($("#inpVal").val() != "") {
				var val = $.trim($("#inpVal").val());
				if(searchList.length != 0) {
					$.each(searchList, function(index, flag) {
						if(val.indexOf(flag.code) > -1  || val.indexOf(flag.name) > -1) {
							
						}
					});
				}else{
					$.zmAlert("请输入正确的检索信息");
				}
			} else {
				$.zmAlert("请输入要检索的信息");
			}
			$("#ui-id-2").hide();
		}
	});
	
	//首页顶部搜索
	$("#inpVal").autocomplete({
		minLength: 2,
		source: function(request, response) {
			findSearchMsg(request, response);
		},
		delay: 500,
		select: function(event, ui) {
			var item = ui.item;
//			console.log(item);
			if(item.value.indexOf(item.code) > -1){
				inpVal = item.code;
			}else{
				inpVal = item.value;
			}
			item.value = "";
			$("#inpVal").attr('placeholder','公司简称/股票代码');
			updateShowCon("inpVal", item.label);
			findEnterpriseData(1, 20);
//			inpVal = "";
		}
	});
	/*信息补全结束*/
	
})


//发现公司的表格部分鼠标经过行情是显示涨跌幅
function showCompanyData(a){
	$(a).next().show();
}

//发现公司的表格部分鼠标经过行情是显示涨跌幅
function hideCompanyData(a){
	$(a).next().hide();
}

/**
 * 更换条件
 */
function editConditions(thiz){
	
	var tyCon = $(thiz).parent().attr("id"); //条件的类型
	var val = $(thiz).attr("data-value"); //值
	var vals = val.split(",");
	if(tyCon == "hy"){
		hyId = val;
	}else if(tyCon == "dq"){
		dqId = val;
	}else if(tyCon == "status"){
		status = val;
	}else if(tyCon == "dealType"){
		dealType = val;
	}else if(tyCon == "block"){
		block = val;
	}else if(tyCon == "zbqs"){
		zbqs = val;
	}else if(tyCon == "yysr"){
		if(val != ""){
			beginYysr = vals[0];
			endYysr = vals[1];
		}else{
			beginYysr = "";
			endYysr = "";
		}
	}else if(tyCon == "zsz"){
		if(val != ""){
			beginZsz = vals[0];
			endZsz = vals[1];
		}else{
			beginZsz = "";
			endZsz = "";
		}
	}else if(tyCon == "jlr"){
		if(val != ""){
			beginJlr = vals[0];
			endJlr = vals[1];
		}else{
			beginJlr = "";
			endJlr = "";
		}
	}else if(tyCon == "esTime"){
		esTime = val;
	}else if(tyCon == "stockDate"){
		stockDate = val;
	}
	updateShowCon(tyCon, $(thiz).children("a").text());
}

/**
 * 更改显示的条件
 * @param thiz
 */
function updateShowCon(tyCon, val){
	var flag = true;
	var showText = "";
	if(tyCon == "hy"){ //直接显示标签中的值
		showText = "行业：" + val;
	}else if(tyCon == "dq"){
		showText = "地区：" + val;
	}else if(tyCon == "status"){
		showText = "挂牌状态：" + val;
	}else if(tyCon == "dealType"){
		showText = "交易状态：" + val;
	}else if(tyCon == "block"){
		showText = "所属板块：" + val;
	}else if(tyCon == "zbqs"){
		showText = "主办券商：" + val;
	}else if(tyCon == "yysr"){
		showText = "营业收入：" + val;
	}else if(tyCon == "zsz"){
		showText = "总市值：" + val;
	}else if(tyCon == "jlr"){
		showText = "净利润：" + val;
	}else if(tyCon == "inpVal"){
		showText = "搜索内容：" + val;
	}
	
	$(".tj_selected").children("a").each(function(){
		if(tyCon == $(this).attr("data-value")){ //进行修改
			flag = false;
			$(this).html(showText + "<i></i>");
		}
	})
	
	if(flag){ //进行添加
		if($(".yixuan_tiaojian").css("display") == "none"){
			$(".yixuan_tiaojian").show();
		}
		$("#selectedDiv").before("<a data-value="+tyCon+" href='javascript:;'>"+showText+"<i></i></a>");
	}
}


/**
 * 查询区域
 */
function findArea(){
	var param={dataType:1,type:1,parentId:0}
	$.axs("/betaStock/common/findWorkBookByPid.do",param,false,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result==null){
				return false;
			}
			var html="";			
			for (var i = 0; i < result.length; i++) {
				var obj=result[i];
				html += "<li data-value="+obj.id+" ><a href='javascript:;'>"+obj.nameCn+"</a></li>";
			}
			$("#dq").empty();
			$("#dq").html(html);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

/**
 * 查询所有行业
 */
function findCategory(type,level){
	$.axs("/betaStock/common/findTrade.do", {categorType:type,levelId:level}, false, function(data) {
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result==null){
				return false;
			}
			var html="";
			for (var i = 0; i < result.length; i++) {
				var obj=result[i];
				var  hy=obj.categoryName;
				if(obj.categoryName.length>12){
					hy=obj.categoryName.substring(0,12)+"...";
				}else{
					hy=obj.categoryName;
				}
				html += "<li data-value="+obj.categoryId+" title="+obj.categoryName+"><a href='javascript:;'>"+hy+"</a></li>";
			}
			$("#hy").empty();
			$("#hy").html(html);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

/*
 * 查询主办券商
 */
function findSponsoredBroker(){
	var param={parentId:0,type:5,dataType:1};
	$.axs("/betaStock/common/findWorkBook.do",param,false,function(data){
		var result=data.retData;
		if(data.retCode=='0000'){
			if(result==null){
				return false;
			}
			var brokerHtml="";
			$(result).each(function(index,item){
				brokerHtml+='<li data-value='+item.nameCn+'><a href="javascript:;">'+item.nameCn+'</a></li>';
			})
			$("#zbqs").empty();
			$("#zbqs").html(brokerHtml);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	})
}

/**
 * 查询股份公司成立时间
 */
function findEstablishTime(){
	$.axs("/betaInvest/enterpriseData/findEstablishTime.do",null,false,function(data){
		var result=data.retData;
		if(data.retCode=='0000'){
			if(result==null){
				return false;
			}
			var timeHtml="";
			$(result).each(function(index,item){
				timeHtml+='<li data-value='+item+'><a href="javascript:;">'+item+'年</a></li>';
			})
			$("#esTime").empty();
			$("#esTime").html(timeHtml);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	})
}

/**
 * 根据数组及值获取下标
 * @param {Object} arr
 */
function getArrIndex(arr, d){
	var i = -1;
	$(arr).each(function(index, item){
		if(arr[index] == d){
			i = index;
		}
	})
	return i;
}

/**
 * 根据条件查找公司
 */
function findEnterpriseData(pageNum, pageSize){
	if(pageNum==1){
		$("#page").remove();
		$(".feature_select").append('<div id="page" class="pages pagination " style="display: none;"></div>');
	}
	var param = {
		hyType : hyType,
		hyId : hyId,
		stateId : dqId,
		sponsoredBroker : zbqs,
		stockDate : stockDate,
		dealType : dealType,
		stockBlock : block,
		beginOperatingIncome : beginYysr,
		endOperatingIncome :  endYysr,
		beginNetProfit :  beginJlr,
		endNetProfit : endJlr,
		establishTime : esTime,
		beginTotalMarketValue : beginZsz,
		endTotalMarketValue : endZsz,
		listingStatus : status,
		inpVal : inpVal,
		sortField : sortField,
		pageNum : pageNum,
		pageSize : pageSize
	};
	//console.log(param);
	$.axs("/betaInvest/enterpriseData/findEnterpriseData.do", param, false, function(data) {
		if(data.retCode=='0000'){
	//			判断是否已经点过对比
//		var sfdb=localStorage.getItem("companyDuibi");
//		var codes_sfdb = "";
//		$(eval(sfdb)).each(function(){
//			codes_sfdb += this.stockCode + ",";
//		});
	//	if(sfdb==null || sfdb=="" || sfdb=="undefined"){
	//		return false;
	//	}
//			console.log(conditions);
			//导出公司excel的id
			/*if(ids==""||ids==null||ids==undefined){
				$("#companyTBody :checkbox").each(function(){
					if(this.checked == true){
						ids += $(this).attr("id") + ",";
					}
				})
			}else{
				alert(ids.split(","));
				$("#companyTBody :checkbox").each(function(){
					if(this.checked == true){
						ids.replace($(this).attr("id"),"")
						ids.replace(","+$(this).attr("id"),"")
						ids += $(this).attr("id") + ",";
					}
				})
				alert(ids)
			}*/
			$("#companyTBody").empty(); //清空表格内容
//			console.log(data.retData)
			$("#total").text(data.retData.total);
			var trNum = 1;
			if(data.retData.enterpriseDataList != null && data.retData.enterpriseDataList != ""){
				//已关注的公司
				var value=localStorage.getItem('follow_company');
				value=JSON.parse(value);
				//已加入对比公司
				/*var userId=localStorage.getItem("userId");
				var showName=localStorage.getItem(userId);*/
				var showName = findContrastCompany();
				//页面数据
				var trHtml = "";
				$(data.retData.enterpriseDataList).each(function(){//     ../images/gs_logo.png
					var establishTime = "";
					var stockDate = "";
					trHtml += "<tr data-value="+trNum+" >";
					trHtml += "<td class='nsd_qx'><input id="+this.id+" "+(getArrIndex(ids.split(","), this.id) == -1 ? "" : "checked='checked'")+" type='checkbox'/></td>";
					trHtml += "<td class='company_info gs_infor bbs_gongsi'>";
					trHtml	+= "<div>";
					trHtml += "<div class='compamy_logo fl'>";
					trHtml += "<img src='/saasBeta/images/gs_logo.png' alt='' />";
					trHtml += "</div>" +
							"<div class='compamy_msg fl'>" +
							"<a href='javascript:;' class='on shuzi' onClick='toCompanyHomeHtml(\""+this.stockCode+"\",\""+this.companyForShort+"\",\"发现公司\")'>"+this.companyForShort+"("+this.stockCode+")</a>" +
							"<span>"+this.industry+"</span>" +
							"<div class='gongju'>";
					if($.inArray(this.stockCode,value)>-1){
						trHtml +="<span class='gz_company on fl' onclick='updateFollow(this,\"company\")' data-followId='"+this.stockCode+"'>关注</span>";
					}else{
						trHtml +="<span class='gz_company fl' onclick='updateFollow(this,\"company\")'  data-followId='"+this.stockCode+"'>关注</span>";
					}
					if(showName!=null && showName!="" && showName!=undefined && showName.indexOf(this.stockCode)>-1 && showName.indexOf(this.companyForShort)>-1){
						trHtml +="<span class='duib_company fl on' onclick='addComparisonStockClass(\""+this.stockCode+"\",\""+this.companyForShort+"\")' id='duibi_"+this.stockCode+"'>对比</span>";
					}else{
						trHtml +="<span class='duib_company fl' onclick='addComparisonStockClass(\""+this.stockCode+"\",\""+this.companyForShort+"\")' id='duibi_"+this.stockCode+"'>对比</span>";
					}
					trHtml += "<div class='clr'></div></div></div><div class='clr'></div></div></div><div class='clr'></div></div></td>" +
							"<td class='cl_times'>" +
							"<span>" +
							"<em>成立</em>";
							if(this.establishTime != null && this.establishTime != "" && this.establishTime != undefined && this.establishTime != "该01该"){
								establishTime = (this.establishTime).replace("-",".").substring(0,7);
							}else{
								establishTime = "--";
							}
					trHtml += "<i class='shuzi'>"+establishTime+"</i>" +
								"</span>" +
								"<span>" +
								"<em>挂牌</em>";
							if(this.stockDate != null && this.stockDate != "" && this.stockDate != undefined && this.stockDate != "(01-"){
								stockDate = (this.stockDate).replace("-",".").substring(0,7);
							}else{
								stockDate = "--";
							}
					trHtml += "<i class='shuzi'>"+stockDate+"</i>" +
							"</span></td>" +
							"<td class='bbs_diqu'>"+(this.state == null ? "--" : this.state)+"</td>" +
							"<td class='company_rz bbs_rongzi'>";
							if(this.financingNewTime != null || this.financingNewAmount != null || this.privatePrice != null){
								trHtml += "<em class='shuzi'>"+(this.financingNewTime == null ? "--" : this.financingNewTime)+"</em>";
								trHtml += "<i class='shuzi'>"+(this.financingNewAmount == null ? "--" : ((this.financingNewAmount).toFixed(2) + "万"))+"</i>";
								trHtml += "<span>"+(this.privatePrice == null ? "--" : ((this.privatePrice).toFixed(2) + "元/股")) + "</span>";
							}else{
								trHtml +="无";
							}
					trHtml += "</td>" +
							"<td class='shuzi' name='yysr' >"+(this.operatingIncome == null ? "--" : ((this.operatingIncome/10000.00).toFixed(2) + "万"))+"</td>" +
							"<td class='shuzi' name='jlr'>"+(this.netProfit == null ? "--" : ((this.netProfit/10000.00).toFixed(2) + "万"))+"</td>" +
							"<td class='shuzi' name='zsz'>"+(this.totalMarketValue == null ? "--" : ((this.totalMarketValue/10000.00).toFixed(2) + "万"))+"</td>" +
							"<td class='shuzi' name='zdf'>"+(this.priceChangeRatio == null ? "--" : ((this.priceChangeRatio).toFixed(2) + "%"))+"</td>" +
							"<td class='shuzi' name='zxj'>"+(this.newPrice == null ? "--" : ((this.newPrice).toFixed(2) + "元"))+"</td>" +


							"<td class='shuzi' name='zzc'>"+(this.totalAssets == null ? "--" : ((this.totalAssets/10000.00).toFixed(2) + "万"))+"</td>" +
							"<td class='shuzi' name='jzc'>"+(this.netAssets == null ? "--" : ((this.netAssets/10000.00).toFixed(2) + "万"))+"</td>" +
							"<td class='shuzi' name='jzcl'>"+(this.returnEquity == null ? "--" : ((this.returnEquity).toFixed(2) + "%"))+"</td>" +
							"<td class='shuzi' name='syl'>"+(this.priceEarningRatio == null ? "--" : (this.priceEarningRatio).toFixed(2))+"</td>" +
							"<td class='shuzi' name='sjl'>"+(this.marketRate == null ? "--" : (this.marketRate).toFixed(2))+"</td>" +
							"<td class='shuzi' name='sxl'>"+(this.sellingRate == null ? "--" : (this.sellingRate).toFixed(2))+"</td>" +
							"<td class='shuzi' name='cjl'>"+(this.tradingVolume == null ? "--" : ((this.tradingVolume).toFixed(2) + "股"))+"</td>" +

						"</tr>";
					trNum++;
				})
				$("#companyTBody").append(trHtml);
				$(".data-checkbox .checkbox").each(function(){
					if($(this).hasClass("on")){
						$("[name="+$(this).attr("data-value")+"]").show();
					}else{
						$("[name="+$(this).attr("data-value")+"]").hide();
					}
				})
				//分页
				if(pageNum==1){
					$('#page').pagination({
						total: data.retData.total,
						pageSize: pageSize,
						current: pageNum,
//						layout:['list','sep','first','prev','links','next','last','sep','refresh'],
						layout: ['first', 'prev', 'links','next','last'],
						links:5,
						displayMsg:"",
						showPageList:false,
						onSelectPage: function(pageNumber, size) {
							findEnterpriseData(pageNumber,size);
						}
					});
				}
				$('#page').show();
				//修改分页文字
				setPageText('page');
			}else{
				var len=$(".compan_new_table thead tr th").length;
				trHtml="<tr><td colspan="+len+" style='height:50px;line-height:50px'>暂无数据</td></tr>";
				$("#companyTBody").html(trHtml);
				$('#page').hide();
			}
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	})
}

/**
 * 搜索补全信息查询
 * @param request
 * @param response
 * @param type
 */
function findSearchMsg(request, response) {
	$.axs("/betaInvest/enterpriseData/findSearchMsg.do", {searchStr:$("#inpVal").val()}, false, function(data){
		if(data.retCode == 0000) {
			if(data.retData == null) {
				return false;
			}
			var arr = [];
			$.each(data.retData, function(i, item) {
				
				var obj = {
					label: item.msg,
					value: item.msg,
					name: item.companyForShort,
					code: item.stockCode
				}
				arr.push(obj);
			});
			searchList = arr;
			response(arr.slice(0, 5));
		} else {
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

/**
 * 添加或删除对比
 * @param comparisonStockCode
 * @param comparisonStockName
 */
function addComparisonStockClass(comparisonStockCode,comparisonStockName){
	if($("#duibi_"+comparisonStockCode).hasClass("on")){
		$("#duibi_"+comparisonStockCode).removeClass("on");
		removeComparisonStock(comparisonStockCode,comparisonStockName);
	}else{
		if(addComparisonStock(comparisonStockCode,comparisonStockName)){
			$("#duibi_"+comparisonStockCode).addClass("on");
		}
	}
}
