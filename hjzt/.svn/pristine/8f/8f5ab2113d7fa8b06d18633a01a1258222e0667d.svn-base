var hyType = "management_industry_id"; //行业类型
var hyId = ""; //行业id
var stateId = ""; //地区id
var sponsoredBroker = ""; //主办券商（中文）
var dateType = ""; //时间类型
var outType = ""; //退出方式
var dateSort = "desc"; //时间排序类型
var outSort = ""; //股数排序类型
var searchStr = ""; //检索内容
var ids = "";//导出excel的行业ID
$(function(){
	
	findExpressOut(1,20);
	
	/**
	 * 区域
	 */
	findArea();
	
	/**
	 * 行业
	 */
	findCategory(0,2);
	
	/**
	 * 主办券商
	 */
	findSponsoredBroker();
	
	/**
	 * 查询条件框
	 */
	$("#inpVal").next().click(function(){
		searchStr = $.trim($("#inpVal").val());
		if(searchStr != "" && searchStr != null && searchStr != "undefined"){
			searchStr = $("#inpVal").val();
			updateShowCon("searchStr", searchStr);
			findExpressOut(1,20);
		}
		$("#inpVal").val("");
	})
	
	$(".selectBox ul li").click(function() {
		var p = $(this).parent().parent().find("p");
		$(".selectBox ul").hide();
		$(".searching").hide();
		$(".jiabeijing").hide();
		p.text(($(this).find("a").text()).indexOf("...") > -1 ? $(this).find("a").attr("title") : $(this).find("a").text());
		p.attr("data-value", $(this).attr("data-value"));
		p.attr("value", $(this).attr("value"));
		
		editConditions(this);
		
		findExpressOut(1,20);
	});
	
	//点击筛选条件时删除对应的内容
	$(".tj_selected").delegate("i","click",function(){
		$(this).parent().remove();
		if($(".tj_selected a").length==0){
			$(".yixuan_tiaojian").hide();
		}else{
			$(".yixuan_tiaojian").show();
		}
		
		var selShowText = "";
		var tyCon = $(this).parent().attr("data-value");
		if(tyCon == "hy"){
			hyId = "";
			selShowText = "行业";
		}else if(tyCon == "dq"){
			stateId = "";
			selShowText = "地区";
		}else if(tyCon == "outTime"){
			dateType = "";
			selShowText = "退出时间";
		}else if(tyCon == "outType"){
			outType = "";
			selShowText = "退出方式";
		}else if(tyCon == "zbqs"){
			sponsoredBroker = "";
			selShowText = "主办券商";
		}else if(tyCon == "searchStr"){
			searchStr = "";
		}
		$("#" + tyCon).prev().text(selShowText);
		
		findExpressOut(1,20);
	})
	//点击清楚筛选时把选择的清空掉
	$(".yixuan_tiaojian>span").on("click",function(){
		$(".tj_selected a").remove();
		$(this).parent().hide();
		$("#hy").prev().text("行业");
		$("#dq").prev().text("地区");
		$("#outTime").prev().text("退出时间");
		$("#outType").prev().text("退出方式");
		$("#zbqs").prev().text("主办券商");
		hyId = "";
		stateId = "";
		dateType = "";
		outType = "";
		sponsoredBroker = "";
		searchStr = "";
		
		findExpressOut(1,20);
	})
	
	
	/**
	 * 排序
	 */
	$(".sanban_paixu span").click(function(){
		var cla = $(this).attr("class");
		$(".sanban_paixu span").removeClass("up");
		$(".sanban_paixu span").removeClass("down");
		if(cla == undefined || cla == "" || cla == "up"){
			$(this).addClass("down");
			if($(this).attr("data-value") == "date"){ //融资时间
				dateSort = "desc";
				outSort = "";
			}else{ //退出股数
				outSort = "desc";
				dateSort = "";
			}
		}else if(cla == "down"){
			$(this).addClass("up");
			if($(this).attr("data-value") == "date"){ //融资时间
				dateSort = "asc";
				outSort = "";
			}else{ //退出股数
				outSort = "asc";
				dateSort = "";
			}
		}
		findExpressOut(1,20);
	})
	
	/**
	 * 导出数据
	 */
	$("#outData").click(function(){
		if(ids != ""){
			location.href = "/betaInvest/expressOut/outExcelMethod.do?ids="+ids.substring(0, ids.length - 1)+"&dateSort="+dateSort+"&outSort="+outSort+"&hyType="+hyType;
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
			//console.log(item);
			if(item.value.indexOf(item.code) > -1){
				searchStr = item.code;
			}else{
				searchStr = item.value;
			}
			item.value = "";
			$("#inpVal").attr('placeholder','持股公司简称/股票代码/退出方');
			updateShowCon("searchStr", searchStr);
			findExpressOut(1,20);
		}
	});
	/*信息补全结束*/
	
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
		//导出excel数据的全选框
		$("#expressOutBody :checkbox").each(function(){
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
		$("#expressOutBody :checkbox").each(function(){
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
	//点击假背景的是让下拉框隐藏
	$(".jiabeijing").on("click",function(){
		$(".selectBox ul").slideUp();
	})
})

/**
 * 更换条件
 */
function editConditions(thiz){
	var tyCon = $(thiz).parent().attr("id"); //条件的类型
	var val = $(thiz).attr("data-value"); //值
	if(tyCon == "hy"){
		hyId = val;
	}else if(tyCon == "dq"){
		stateId = val;
	}else if(tyCon == "outTime"){
		dateType = val;
	}else if(tyCon == "outType"){
		outType = val;
	}else if(tyCon == "zbqs"){
		sponsoredBroker = val;
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
	if(tyCon == "hy"){
		showText = "行业：" + val;
	}else if(tyCon == "dq"){
		showText = "地区：" + val;
	}else if(tyCon == "outTime"){
		showText = "退出时间：" + val;
	}else if(tyCon == "outType"){
		showText = "退出方式：" + val;
	}else if(tyCon == "zbqs"){
		showText = "主办券商：" + val;
	}else if(tyCon == "searchStr"){
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
				html += "<li data-value="+obj.categoryId+" ><a href='javascript:;' title="+obj.categoryName+">"+obj.categoryName.substring(0, 10)+"</a></li>";
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
 * 查询推出数据
 * @param pageNum
 * @param pageSize
 */
function findExpressOut(pageNum, pageSize){
	if(pageNum==1){
		$("#page").remove();
		$(".company_information").after('<div id="page" class="pages pagination " style="display: none;"></div>')
	}
	var param = {hyType:hyType,hyId:hyId,stateId,stateId,sponsoredBroker:sponsoredBroker,dateType:dateType,
			outType:outType,dateSort:dateSort,outSort:outSort,searchStr:searchStr,pageNum:pageNum,pageSize:pageSize};
	$.axs("/betaInvest/expressOut/findExpressOut.do",param,false,function(data){
		if(data.retCode=='0000'){
			$("#expressOutBody").empty(); //清空表格内容
			$("#total").text(data.retData.total);
			var trHtml = "";
			if(data.retData.list != null && data.retData.list != ""){
				$(data.retData.list).each(function(){
					var sb = "";
					var sbCn = "";
					if(this.stockBlock == "创新层"){
						sb = "ji";
						sbCn = "基";
					}else if(this.stockBlock == "基础层"){
						sb = "chuang";
						sbCn = "创";
					}
					var outT = "";
					if(this.outType == "1"){
						outT = "IPO";
					}else if(this.outType == "2"){
						outT = "吸收合并";
					}else if(this.outType == "3"){
						outT = "被收购";
					}else if(this.outType == "4"){
						outT = "交易退出";
					}
					
					trHtml += "<tr>"
								+"<td class='nsd_qx'><input id="+this.id+" "+(getArrIndex(ids.split(","), this.id) == -1 ? "" : "checked='checked'")+"type='checkbox' /></td>"
								+"<td class='shuzi'>"+this.outTime+"</td>"
								+"<td class='company_types'>"
								+"<!--当公司是创的时候i的类是chuang，是基的时候i的类是ji-->"
								+"<a href='javascript:;' onClick='toCompanyHomeHtml(\""+this.stockCode+"\",\""+this.stockName+"\",\"投资速递\-退出\")' class='shuzi'><i class="+sb+">"+sbCn+"</i>"+((this.stockName == '' || this.stockName == null) ? "--" : this.stockName)+"("+((this.stockCode == '' || this.stockCode == null) ? "--" : this.stockCode)+")</a>"
								+"<span>"+((this.catetoryName == '' || this.catetoryName == null) ? "--" : this.catetoryName)+","+((this.state == '' || this.state == null) ? "--" : this.state)+"</span>"
								+"</td>"
								+"<td>"+((this.leaver == '' || this.leaver == null) ? "--" : this.leaver)+"</td>"
									+"<td>"+outT+"</td>"
									+"<td>"+((this.outAmount == '' || this.outAmount == null) ? "--" : (this.outAmount/10000).toFixed(2))+"</td>"
								+"</tr>";
				})
				
				$("#expressOutBody").html(trHtml);
				//分页
				if(pageNum==1){
					$('#page').pagination({
						total: data.retData.total,
						pageSize: pageSize,
						current: pageNum,
						layout: ['first', 'prev', 'links','next','last'],
						links:5,
						displayMsg:"",
						showPageList:false,
						onSelectPage: function(pageNumber, size) {
							findExpressOut(pageNumber, size);
						}
					});
				}
				$('#page').show();
				//修改分页文字
				setPageText('page');
			}else{
				trHtml="<tr><td colspan='6' style='height:50px;line-height:50px'>暂无数据</td></tr>";
				$("#expressOutBody").html(trHtml);
				$('#page').hide();
			}
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
 * 搜索补全信息查询
 * @param request
 * @param response
 * @param type
 */
function findSearchMsg(request, response) {
	$.axs("/betaInvest/expressOut/findSearchMsg.do", {searchStr:$("#inpVal").val()}, false, function(data){
		if(data.retCode == 0000) {
			if(data.retData == null) {
				return false;
			}
			var arr = [];
			$.each(data.retData, function(i, item) {
				
				var obj = {
						label: item.msg,
						value: item.msg,
						name: item.stockName,
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