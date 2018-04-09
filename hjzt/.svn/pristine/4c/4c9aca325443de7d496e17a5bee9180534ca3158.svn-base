var areaName = ""; //地区名称
var sponsoredBroker = ""; //主办券商
var beginTransactionAmount = ""; //起始金额
var endTransactionAmount = ""; //结束金额
var equityRatio = ""; //比例值
var operator = ""; //对比比例值运算符
var targetType = ""; //标的类型
var eventType = ""; //事件标识
var dateType = ""; //公告时间条件（传参数值为页面显示值）
var sortField = "announcement_time desc"; //排序字段
var industryId = ""; //行业id
var industryType = "1"; //行业类型
var inpVal = "";
var ids = "";//导出excel的行业ID
$(function(){

	findExpressMerger(1,20);
	
	findArea(); //地区
	
	findCategory(0,2); //行业
	
	findSponsoredBroker(); //主办券商
	
	$(".selectBox ul li").click(function() {
		var p = $(this).parent().parent().find("p");
		$(".selectBox ul").hide();
		$(".searching").hide();
		$(".jiabeijing").hide();
		p.text(($(this).find("a").text()).indexOf("...") > -1 ? $(this).find("a").attr("title") : $(this).find("a").text());
		p.attr("data-value", $(this).attr("data-value"));
		p.attr("value", $(this).attr("value"));
		
		editConditions(this);
		
		findExpressMerger(1,20);
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
			industryId = "";
			$("#hy").prev().text("行业");
		}else if(tyCon == "dq"){
			areaName = "";
			$("#dq").prev().text("地区");
		}else if(tyCon == "zbqs"){
			sponsoredBroker = "";
			$("#zbqs").prev().text("主办券商");
		}else if(tyCon == "jyje"){
			beginTransactionAmount = "";
			endTransactionAmount = "";
			$("#jyje").prev().text("交易金额");
		}else if(tyCon == "gqzb"){
			operator = "";
			equityRatio = "";
			$("#gqzb").prev().text("股权占比");
		}else if(tyCon == "bd"){
			targetType = "";
			$("#bd").prev().text("标的类型");
		}else if(tyCon == "sjbs"){
			eventType = "";
			$("#sjbs").prev().text("事件标识");
			$($(".selectBoxes .data-checkbox")).each(function(index,item){
				$(item).find("label.checkbox").removeClass("on");
			})
		}else if(tyCon == "ggsj"){
			dateType = "";
			$("#ggsj").prev().text("公告时间");
		}else if(tyCon == "inpVal"){
			inpVal = "";
		}
		
		findExpressMerger(1,20);
	})
	//点击清楚筛选时把选择的清空掉
	$(".yixuan_tiaojian>span").on("click",function(){
		$(".tj_selected a").remove();
		$(this).parent().hide();
		
		industryId = "";
		$("#hy").prev().text("行业");
		
		areaName = "";
		$("#dq").prev().text("地区");
		
		sponsoredBroker = "";
		$("#zbqs").prev().text("主办券商");
		
		beginTransactionAmount = "";
		endTransactionAmount = "";
		$("#jyje").prev().text("交易金额");
		
		operator = "";
		equityRatio = "";
		$("#gqzb").prev().text("股权占比");
		
		targetType = "";
		$("#bd").prev().text("标的类型");
		
		eventType = "";
		$("#sjbs").prev().text("事件标识");
		$($(".selectBoxes .data-checkbox")).each(function(index,item){
			$(item).find("label.checkbox").removeClass("on");
		})
		
		dateType = "";
		$("#ggsj").prev().text("公告时间");
		
		inpVal = "";
		
		findExpressMerger(1,20);
	})
	//双击事件标识时下俩框guanbi
	$(".shijian_biaoshi p").on("dbclick",function(){
		var flag=0;
		$($(".selectBoxes .data-checkbox")).each(function(index,item){
			//console.log(item);
			if($(item).find("label.checkbox").hasClass("on")){
				flag++;
				bdSlected[bdSlected.length]=$(item).find("label.checkboxWord").text();
			}
		})
		var bdSlected=bdSlected.join("、");
		//console.log(bdSlected.length)
		if(bdSlected.length>=10){
			var pText='';
			pText=bdSlected.substring(0,10)+"...";
			$(this).text(pText);
		}else{
			$(this).text(bdSlected);
		}
		var div='<a href="javascript:;" data-value="sjbs">事件标识：'+bdSlected+'<i></i></a>';	
		if(flag>0){
			if($(".yixuan_tiaojian span").is(":hidden")){
				$(".yixuan_tiaojian").show();
				$(".tj_selected").find("div.clr").before(div);
			}else{
				$($(".tj_selected a")).each(function(index,item){
					var itemVal=$(item).text().substring(0,2);
					//console.log(itemVal);
					if(itemVal=="事件"){
						$(item).html("事件标识："+bdSlected+"<i></i>");
					}else{
						$(".tj_selected").find("div.clr").before(div);
					}
				})
			}
		}
		$(this).next().slideUp();		
		$(".jiabeijing").hide();
	})
	
	//点击事件标识的的下拉框
	$(".shijian_biaoshi p").on("click",function(){
		$(this).next().slideDown();
		$(".selectBox ul").slideUp();
		$(".jiabeijing").show();
	})

	//点击事件标识下的li
	$(".selectBoxes").delegate("li","click",function(){
		if($(this).find("label").eq(0).hasClass("on")){
			$(this).find("label").eq(0).removeClass("on")	
		}else{
			$(this).find("label").eq(0).addClass("on");	
		}
		var bsType=[];
		var bs=[];
		var flags=0;
		$($(".selectBoxes .data-checkbox")).each(function(index,item){
			//console.log(item);
			if($(item).find("label.checkbox").hasClass("on")){
				flags++;
				bsType[bsType.length]=$(item).parent().attr("data-type");
				bs[bs.length]=$(item).find("label.checkboxWord").text();
			}
		})	
		bs=bs.join("、");
		if(bs != "" && bs != undefined){
			updateShowCon($(this).parent().attr("id"),bs);
			if(bs.length>=10){
				var pText='';
				pText=bs.substring(0,10)+"...";
				$(this).parent().parent().find("p").text(pText);
			}else{
				$(this).parent().parent().find("p").text(bs);
			}
		}else{
			$("#sjbs").prev().text("事件标识");
			var aNum = 0;
			$($(".tj_selected a")).each(function(index,item){
				aNum = index;
				var val=$(item).text().substring(0,2);
				if(val=="事件"){
					$(item).remove();
				}
			})
			if(aNum == 0){
				$(".yixuan_tiaojian").hide();
			}
		}
		
		eventType=bsType.join(",");
		findExpressMerger(1,20);
	})
	//点击假背景时下拉框回收
	$(".jiabeijing").on("click",function(index,item){
		$(".selectBoxes ul").slideUp();
		$(".jiabeijing").hide();
	})
	
	
	
	
	/**
	 * 导出数据
	 */
	/*$("#outData").click(function(){
		var tr = "";
		var flag = false;
		$("#mergerBody :checkbox").each(function(){
			if(this.checked == true){
				flag = true;
				tr += "<tr>";
				$(this).parent().parent().children().each(function(){
					if($(this).html().indexOf("checkbox") < 0){
						tr += "<td>"+$(this).html()+"</td>";
					}
				})
				tr += "</tr>";
			}
		})
		
		if(flag){
			$("#outBody").append(tr);
			$("#outBody img").remove();
			method5("outTable");
			$("#outBody").empty();
		}else{
			$.zmAlert("没有要导出的数据");
		}
	})*/
	$("#outData").click(function(){
		if(ids != ""){
			location.href = "/betaInvest/expressMerger/outExcelMethod.do?ids="+ids.substring(0, ids.length - 1)+"&sortField="+sortField+"&industryType="+industryType;
		}else{
			$.zmAlert("没有要导出的数据");
		}
	})
	
	/**
	 * 排序
	 */
	$(".sanban_paixu span").click(function(){
		var cla = $(this).attr("class");
		$(".sanban_paixu span").removeClass("up");
		$(".sanban_paixu span").removeClass("down");
		var type = $(this).attr("data-value");//时间排序还是金额排序
		if(cla == undefined || cla == "" || cla == "up"){
			$(this).addClass("down");
			if(type == "announcement_time"){
				sortField = type + " desc";
			}else{
				sortField = $(this).attr("data-value") + "+0 desc";
			}
		}else if(cla == "down"){
			$(this).addClass("up");
			if(type == "announcement_time"){
				sortField = type + " asc";
			}else{
				sortField = $(this).attr("data-value") + "+0 asc";
			}
		}
		findExpressMerger(1,20);
	})
	
	/**
	 * 查询条件框
	 */
	$("#inpVal").next().click(function(){
		inpVal = $.trim($("#inpVal").val());
//		updateShowCon("inpVal", inpVal);
		if(inpVal != "" && inpVal != null && inpVal != "undefined"){
			inpVal = $("#inpVal").val();
			updateShowCon("inpVal", inpVal);
			findExpressMerger(1,20);
		}
		$("#inpVal").val("");
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
				inpVal = item.code;
			}else{
				inpVal = item.value;
			}
			item.value = "";
			$("#inpVal").attr('placeholder','持股公司简称/股票代码/标的');
			updateShowCon("inpVal", inpVal);
			findExpressMerger(1,20);
		}
	});
	/*信息补全结束*/
	$("#seach").on("click",function(){
		editConditions();
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
		$("#mergerBody :checkbox").each(function(){
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
		$("#mergerBody :checkbox").each(function(){
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
	var vals = val.split(",");
	if(tyCon == "hy"){
		industryId = val;
	}else if(tyCon == "dq"){
		areaName = val;
	}else if(tyCon == "zbqs"){
		sponsoredBroker = val;
	}else if(tyCon == "jyje"){
		if(val != ""){
			beginTransactionAmount = vals[0];
			endTransactionAmount = vals[1];
		}else{
			beginTransactionAmount = "";
			endTransactionAmount = "";
		}
	}else if(tyCon == "gqzb"){
		if(val != ""){
			operator = vals[0];
			equityRatio = vals[1];
		}else{
			operator = "";
			equityRatio = "";
		}
	}else if(tyCon == "bd"){
		targetType = val;
	}else if(tyCon == "sjbs"){
		eventType = val;
	}else if(tyCon == "ggsj"){
		dateType = val;
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
	}else if(tyCon == "zbqs"){
		showText = "主办券商：" + val;
	}else if(tyCon == "jyje"){
		showText = "交易金额：" + val;
	}else if(tyCon == "gqzb"){
		showText = "股权占比：" + val;
	}else if(tyCon == "bd"){
		showText = "标的类型：" + val;
	}else if(tyCon == "sjbs"){
		showText = "事件标识：" + val;
	}else if(tyCon == "ggsj"){
		showText = "公告时间：" + val;
	}else if(tyCon == "inpVal"){
		showText = "搜索内容：" + val;
	}
	$(".tj_selected a").each(function(index,item){
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
				html += "<li data-value="+obj.nameCn+" ><a href='javascript:;'>"+obj.nameCn+"</a></li>";
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
};

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
 * 查询并购信息
 */
function findExpressMerger(pageNum,pageSize){
	if(pageNum==1){
		$("#pages").remove();
		$(".company_information").after('<div id="pages" class="pages pagination " style="display: none;"></div>')
	}
	var param={
			industryType:industryType,
			industryId:industryId,
			areaName:areaName,
			sponsoredBroker:sponsoredBroker,
			beginTransactionAmount:beginTransactionAmount,
			endTransactionAmount:endTransactionAmount,
			equityRatio:equityRatio,
			operator:operator,
			targetType:targetType,
			eventType:eventType,
			dateType:dateType,
			sortField:sortField,
			searchStr:inpVal,
			pageNum:pageNum,
			pageSize:pageSize
		};
	$.axs("/betaInvest/expressMerger/findExpressMerger.do",param,false,function(data){
		//console.log(data);
		if(data.retCode=='0000'){
			var result=data.retData;
			var list=result.mergerList;
			$("#total").text(result.total);
			if(result==null||result==''||result==undefined){
				return false;
			}
			var mergerHtml='';
			$(list).each(function(index,item){
				mergerHtml+='<tr>';
				mergerHtml+='<td class="nsd_qx"><input id='+this.id+' '+(getArrIndex(ids.split(","), this.id) == -1 ? "" : "checked='checked'")+' type="checkbox" /></td>';
				mergerHtml+='<td>'+item.announcement_time+'</td>';
				//mergerHtml+='<td class="company_info">';
				//多个公司
				var trading_buyer='';//股票代码
				trading_buyer=item.trading_buyer.split(",");
				var daima='';
				var stockNames = item.buyer_name.split(",");//公司名称
				var stockName = "";
				var industry_names=item.industry_name.split(",");//公司行业
				var industry_name="";
				$(trading_buyer).each(function(index,items){
					$(stockNames).each(function(){
						if(this.indexOf(items) > -1){						
							stockName = this.substring(this.indexOf(":") + 1);
						}
					})
					$(industry_names).each(function(){
						if(this.indexOf(items)>-1){
							//把前面的代码截取掉，只要行业；
							industry_name = this.substring(this.indexOf(":") + 1);
						}
					})
					
					daima+='<div class="compamy_logo fl">';
					daima+='<img src="/www/images/gs_logo.png" alt="" />';
					daima+='</div>';
					daima+='<div class="compamy_msg fl">';
					daima+='<a href="javascript:void(0);" onClick="toCompanyHomeHtml(\''+items+'\',\''+stockName+'\',\'投资速递\-并购\')" class="shuzi on">'+stockName+'('+items+')</a>';
					daima+='<span class="dq_company">'+industry_name+'</span>';
					daima+='</div>';
					//daima+='<br />';
					daima+='<div class="clr"></div>';
				})
				mergerHtml+='<td class="company_info">'+daima+'</td>';
				var events_type=item.event_type;
				if(events_type==1){
					events_type="收购";
				}
				else if(events_type==2){
					events_type="对外投资";
				}
				else if(events_type==3){
					events_type="吸收合并";
				}
				else if(events_type==4){
					events_type="发行股份购买资产";
				}
				else if(events_type==5){
					events_type="重大资产重组";
				}
				mergerHtml+='<td>'+events_type+'</td>';
				//标的会有多个
				var target_name=item.target_name.split(",");
				var biaodi='';
				$(target_name).each(function(index,items){
					biaodi+='<span>'+items+'</span><br/>';
				})
				mergerHtml+='<td>'+biaodi+'</td>';
				var targets_type=item.target_type;
				if(targets_type==1){
					targets_type="资产";
				}
				else if(targets_type==2){
					targets_type="股权";
				}
				mergerHtml+='<td>'+targets_type+'</td>';
					//股权占比会有多个
				var gqzb='';
				if(item.equity_ratio != null && item.equity_ratio != ""){
					var guquan=item.equity_ratio.split(",");
					$(guquan).each(function(index,items){
						
						if(items==""||items==null||items==undefined){
							items="--";
						}else{
							items=Number(items).toFixed(2);
						}
						var zhanbi="";
						if(items=="--"){
							zhanbi=0;
							gqzb+='<div class="inve_jdt"><div class="jdt_zt"><i style="width: '+zhanbi+'%"></i></div><em>'+items+'</em></div>'
						}else{
							zhanbi=items;
							gqzb+='<div class="inve_jdt"><div class="jdt_zt"><i style="width: '+zhanbi+'%"></i></div><em>'+items+'%</em></div>'
						}
						
					})
				}else{
					gqzb+='<div class="inve_jdt"><div class="jdt_zt"><i style="width: 0%"></i></div><em>--</em></div>';
				}
//				console.log(targets_type);
				//股权类型显示数据
				if(targets_type=="股权"){
					var equityRatio=item.equity_ratio;
					if(equityRatio==null||equityRatio==''||equityRatio==undefined){
						equityRatio='--';
					}else{
						equityRatio+="%";
					}
					mergerHtml+='<td>'+equityRatio+'</td>';
				}else{//资产类型显示公司
					var counterparty=item.counterparty;
					if(counterparty==null||counterparty==''||counterparty==undefined){
						counterparty='--';
					}
					mergerHtml+='<td>'+counterparty+'</td>';
				}
//				console.log(item.transaction_amount)
				if(!isNaN(item.transaction_amount)){
					mergerHtml+='<td class="shuzi">'+(item.transaction_amount == 0 ? "--" : (Number(item.transaction_amount).toFixed(2)))+'</td>';
				}else{
					mergerHtml+='<td class="shuzi">--</td>';
				}
				
				mergerHtml+='</tr>';
			})
			if(result.total==0){
				mergerHtml='<tr><td colspan="9" style="height:50px;line-height:50px">暂无数据</td></tr>';
			}
			$("#mergerBody").html(mergerHtml);
			//分页
			if(pageNum==1){
				$("#pages").pagination({
					total:result.total,
					pageSize:pageSize,
					current: pageNum,
					layout:['first','prev','links','next','last'],
					links:5,
					displayMsg:'',
					showPageList:false,
					onSelectPage:function(pageNum,pageSize){
						findExpressMerger(pageNum,pageSize);
					}
				})
			}
			if(result.total<=20){
				$("#pages").hide();
			}else{
				$("#pages").show();
			}
			setPageText('pages');
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	});
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
	$.axs("/betaInvest/expressMerger/findSearchMsg.do", {searchStr:$("#inpVal").val()}, false, function(data){
		if(data.retCode == 0000) {
			if(data.retData == null) {
				return false;
			}
			var arr = [];
			$.each(data.retData, function(i, item) {
				
				var obj = {
					label: item.msg,
					value: item.msg,
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