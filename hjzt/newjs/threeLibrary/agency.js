//中介机构
var outData = {};//导出excel全局json变量
$(function(){
	//查询地区
	findArea();
	//查询中介机构
	findInvestmentOrganization(null, null, null, null, null, null);
	/**
	 * 点击列表 文字和 value 上去--更改查询条件
	 */
	$(document).on("click", ".selectBox ul li", function() {
		var p = $(this).parent().parent().find("p");
		$(".selectBox ul").hide();
		$(".searching").hide();
		$(".jiabeijing").hide();
		p.text(($(this).find("a").text()).indexOf("...") > -1 ? $(this).find("a").attr("title") : $(this).find("a").text());
		p.attr("data-value", $(this).attr("data-value"));
		p.attr("value", $(this).attr("value"));
		changeParam();
	});
	
	//点击筛选条件时删除对应的内容
	$(".tj_selected").delegate("i","click",function(){
		//清空选择的条件
		var thisId=$(this).attr("data-value");
		$("#"+thisId).prev().attr("data-value",'');
		if(thisId=="organizationNameSeach"){
			$("#"+thisId).val("");
			$("#"+thisId).attr("data-value","");
		}else if(thisId=="diqu"){
			$("#"+thisId).prev().text("地区");
		}else if(thisId=="jigouleixing"){
			$("#"+thisId).prev().text("中介机构");
		}else if(thisId=="fuwushijian"){
			$("#"+thisId).prev().text("服务时间");
		}else if(thisId=="fuwuchishu"){
			$("#"+thisId).prev().text("服务次数");
		}
		
		$(this).parent().remove();
		if($(".tj_selected a").length==0){
			$(".yixuan_tiaojian").hide();
		}else{
			$(".yixuan_tiaojian").show();
		}
		changeParam();
	})
	//点击清楚筛选时把选择的清空掉
	$(".yixuan_tiaojian>span").on("click",function(){
		$("#organizationNameSeach").val('');
		$("#organizationNameSeach").attr("data-value",'');
		$("#diqu").prev().attr("data-value",'');
		$("#diqu").prev().text('地区');
		$("#jigouleixing").prev().attr("data-value",'');
		$("#jigouleixing").prev().text('中介机构');
		$("#fuwushijian").prev().attr("data-value",'');
		$("#fuwushijian").prev().text('服务时间');
		$("#fuwuchishu").prev().attr("data-value",'');
		$("#fuwuchishu").prev().text('服务次数');
		$(".tj_selected a").remove();
		$(this).parent().hide();
		changeParam();
	})
	
	
	//点击排序
	$(".sanban_paixu span").on("click",function(){
		if($(this).hasClass("up")){
			$(this).removeClass("up");
			$(this).addClass("down");
		}else{
			$(this).addClass("up");
			$(this).removeClass("down");
		}
		$(this).parent().siblings().find("span").removeClass("up");
		$(this).parent().siblings().find("span").removeClass("down");
		//查询数据
		changeParam();
	});
	//导出功能
	$(".pay").on("click",function(){
		//页面导出excel
//		$("#exportTableHtml").html('');
//		var exportTableHtml="";
//		$("#allData").find("input").each(function(index,item){
//			if($(this).is(":checked")){
//				exportTableHtml+="<tr>";
//				exportTableHtml+="<td>"+$(this).parent().next().text()+"</td>";
//				exportTableHtml+="<td>"+$(this).parent().next().next().text()+"</td>";
//				exportTableHtml+="<td>"+$(this).parent().next().next().next().text()+"</td>";
//				exportTableHtml+="<td>"+$(this).parent().next().next().next().next().text()+"</td>";
//				exportTableHtml+="<td>"+$(this).parent().next().next().next().next().next().text()+"</td>";
//				exportTableHtml+="<td>"+$(this).parent().next().next().next().next().next().next().text()+"</td>";
//				exportTableHtml+="</tr>";
//			}
//		});
//		if(exportTableHtml==''){
//			errorAlert("","请选择导出的数据");
//			return false;
//		}
//		$("#exportTableHtml").html(exportTableHtml);
//		method5('exportTable')
		//后台导出excel
		var paramArrayObject={};
		var paramArrayObjectArray=new Array();
		//标题
		var paramArrayObjectArrayObjectTitle={};
		paramArrayObjectArrayObjectTitle[1]="机构简称";
		paramArrayObjectArrayObjectTitle[2]="推荐挂牌公司家数";
		paramArrayObjectArrayObjectTitle[3]="已被终止挂牌公司家数";
		paramArrayObjectArrayObjectTitle[4]="推荐定增成功";
		paramArrayObjectArrayObjectTitle[5]="推荐定增失败";
		paramArrayObjectArrayObjectTitle[6]="最新服务公司";
		paramArrayObjectArray.push(paramArrayObjectArrayObjectTitle);
		for(var key in outData){
			if(!(outData[key] == undefined || outData[key] == "")){
				paramArrayObjectArray.push(outData[key]);
			}
		}
/*		$("#allData").find("input").each(function(index,item){
			if($(this).is(":checked")){
				var paramArrayObjectArrayObject={};
				paramArrayObjectArrayObject[1]=$(this).parent().next().text();
				paramArrayObjectArrayObject[2]=$(this).parent().next().next().text();
				paramArrayObjectArrayObject[3]=$(this).parent().next().next().next().text();
				paramArrayObjectArrayObject[4]=$(this).parent().next().next().next().next().text();
				paramArrayObjectArrayObject[5]=$(this).parent().next().next().next().next().next().text();
				paramArrayObjectArrayObject[6]=$(this).parent().next().next().next().next().next().next().text();
				paramArrayObjectArray.push(paramArrayObjectArrayObject);
			}
		});*/
//		console.log(JSON.stringify(paramArrayObjectArray));
		if(paramArrayObjectArray==null || paramArrayObjectArray.length<=1){
			errorAlert("","请选择导出的数据");
			return false;
		}
		paramArrayObject["中介机构"]=paramArrayObjectArray;
//		console.log(JSON.stringify(paramArrayObject));
		methodExportExcel("中介机构",paramArrayObject);
	});
	//全文检索
	$("#organizationNameSeach").autocomplete({
		minLength: 2,
		source:function(request, response) {
			findOrganizationSearch(request, response);
		},
		delay: 500,
		select: function( event, ui ) {
			var item = ui.item;
		},
		close: function( event, ui ){
			$("#seach").click();
		}
	});
	//全文检索--回车事件
	$(document).keydown(function(e) {
//	$("#organizationNameeach").keydown(function(e) {
		if(e.keyCode==13){
			$("#seach").click();
			$("#ui-id-1").hide();
		}
	});
	//搜索按钮
	$("#seach").on("click",function(){
		changeParam();
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
		opOutData();
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
		opOutData();
	})
	//点击假背景的是让下拉框隐藏
	$(".jiabeijing").on("click",function(){
		$(".selectBox ul").slideUp();
	})
	
});



/**
 * 根据json和key获取是否存在值（为字符串空的时候也为-1）
 * @param json
 * @param key
 * @returns {Number}
 */
function getJsonObjIndex(json, key){
	return (json[key] == undefined || json[key] == "") ? false : true;
}

/**
 * 全局变量opOutData数据增减
 */
function opOutData(){
	$("#allData").find("input").each(function(index,item){
		if($(this).is(":checked")){
			var paramArrayObjectArrayObject={};
			var paramArrayObjectArrayObject={};
			paramArrayObjectArrayObject[1]=$(this).parent().next().text();
			paramArrayObjectArrayObject[2]=$(this).parent().next().next().text();
			paramArrayObjectArrayObject[3]=$(this).parent().next().next().next().text();
			paramArrayObjectArrayObject[4]=$(this).parent().next().next().next().next().text();
			paramArrayObjectArrayObject[5]=$(this).parent().next().next().next().next().next().text();
			paramArrayObjectArrayObject[6]=$(this).parent().next().next().next().next().next().next().text();
			if(!getJsonObjIndex(outData, $(this).attr("id"))){
				outData[$(this).attr("id")] = paramArrayObjectArrayObject;
			}
		}else{
			if(getJsonObjIndex(outData, $(this).attr("id"))){
				outData[$(this).attr("id")] = "";
			}
		}
	});
}


/**
 * 全文检索--查询投资者名称
 */
function findOrganizationSearch(request, response){
	$.axs("/betaInvest/investmentOrganization/findOrganizationSearch.do", {organizationName:$.trim(request.term)}, false, function(data) {
		var result = data.retData;
		if(data.retCode == '0000') {
			if(result == null) {
				return false
			}
			var arr = [];
			$.each(result, function(i, item) {
				var obj = {
					label: item,
					value: item
				}
				arr.push(obj);
			});
			searchList = arr;
			response(arr);
//			console.log(response);
		} else {
			errorAlert(data.retCode, data.retMsg);
		}
	})
}


/**
 * 查询地区
 */
function findArea(){
	var param={parentId:0,type:1,dataType:1};
	$.axs("/betaStock/common/findWorkBookByPid.do",param,true,function(data){
		var result=data.retData;
		if(data.retCode=='0000'){
			if(result==null){
				return false;
			}
			var html='';//<li data-value=""><a href="javascript:void();">地区</a></li>
			$(result).each(function(index,item){
				html+='<li data-value="'+item.nameCn+'"><a href="javascript:void(0);">'+item.nameCn+'</a></li>';
			})
			$("#diqu").empty();
			$("#diqu").html(html);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

/**
 * 改变搜索条件-去搜索结果
 */
function changeParam(){
	//初始化清空检索条件
	$("#jiansuotianjian").html('');
	//机构名称
	var organizationName=$.trim($("#organizationNameSeach").val());
	if(organizationName==null || organizationName=="" || organizationName=="undefined"){
		organizationName=$("#organizationNameSeach").attr("data-value");
		if(organizationName==null || organizationName=="" || organizationName=="undefined"){
			organizationName=null;
		}
	}
	$("#organizationNameSeach").val('');
	$("#organizationNameSeach").attr("data-value",organizationName);
	//地区
	var areaName=$("#diqu").prev().attr("data-value");
	if(areaName==null || areaName=='' || areaName=="undefined"){
		areaName=null;
	}
	//机构类型
	var organizationType=$("#jigouleixing").prev().attr("data-value");
	if(organizationType==null || organizationType=='' || organizationType=="undefined"){
		organizationType=null;
	}
	//服务时间
	var dateName=$("#fuwushijian").prev().attr("data-value");
	if(dateName==null || dateName=='' || dateName=="undefined"){
		dateName=null;
	}
	//服务次数
	var eventNum=$("#fuwuchishu").prev().attr("data-value");
	if(eventNum==null || eventNum=='' || eventNum=="undefined"){
		eventNum=null;
	}
	//排序条件
	var sortParam=null;
	$(".sanban_paixu span").each(function(index,item){
		if($(item).hasClass("up") || $(item).hasClass("down")){
			sortParam=$(item).attr("data-value");
			if($(item).hasClass("up")){
				sortParam+=" asc";
			}else if($(item).hasClass("down")){
				sortParam+=" desc";
			}
			return false;
		}
	});
	
	//=============================检索条件显示=====================
	//检索条件判断--投资者名称
	if(organizationName!=null){
		$(".yixuan_tiaojian").show();
		$("#jiansuotianjian").append('<a href="javascript:void(0);">检索名称：'+organizationName+'<i data-value="organizationNameSeach"></i></a>');
	}
	//检索条件判断--地区
	if(areaName!=null){
		$(".yixuan_tiaojian").show();
		var showName=$("#diqu").prev().text();
		$("#jiansuotianjian").append('<a href="javascript:void(0);">地区：'+showName+'<i data-value="diqu"></i></a>');
	}
	//检索条件判断--机构类型
	if(organizationType!=null){
		$(".yixuan_tiaojian").show();
		var showName=$("#jigouleixing").prev().text();
		$("#jiansuotianjian").append('<a href="javascript:void(0);">机构类型：'+showName+'<i data-value="jigouleixing"></i></a>');
	}
	//检索条件判断--服务时间
	if(dateName!=null){
		$(".yixuan_tiaojian").show();
		var showName=$("#fuwushijian").prev().text();
		$("#jiansuotianjian").append('<a href="javascript:void(0);">服务时间：'+showName+'<i data-value="fuwushijian"></i></a>');
	}
	//检索条件判断--服务次数
	if(eventNum!=null){
		$(".yixuan_tiaojian").show();
		var showName=$("#fuwuchishu").prev().text();
		$("#jiansuotianjian").append('<a href="javascript:void(0);">服务次数：'+showName+'<i data-value="fuwuchishu"></i></a>');
	}
	
	//查询数据
	findInvestmentOrganization(organizationName, areaName, organizationType, dateName, eventNum, sortParam, null, null)
}
/**
 * 中介结构数据
 * @param organizationName 机构名称
 * @param areaName  地区名称
 * @param organizationType  机构类型
 * @param dateName 时间范围:一周内，一月内，一年内，XXXX年
 * @param eventNum 服务次数
 * @param sortParam 排序字段即排序类型
 * @param pageNum 页数
 * @param pageSize 页长度
 */
function findInvestmentOrganization(organizationName,areaName,organizationType,dateName,eventNum,sortParam,pageNum,pageSize){
	$('#page').hide();
	if(sortParam==null){
		sortParam="maxTime desc";
	}
	if(pageNum==null){
		pageNum=1;
	}
	if(pageSize==null){
		pageSize=20;
	}
	if(pageNum==1){
		$("#page").remove();
		$(".company_information").after('<div id="page" class="pages pagination " style="display: none;"></div>');
	}
	var param={organizationName:organizationName,areaName:areaName,organizationType:organizationType,dateName:dateName,eventNum:eventNum,sortParam:sortParam,pageNum:pageNum,pageSize:pageSize}
	//console.log(param);
	$.axs("/betaInvest/investmentOrganization/findInvestmentOrganization.do",param,false,function(data){
		var result=data.retData;
		var html='';
		if(data.retCode=='0000'){
			//console.log(result);
			if(result==null){
				//alert();
				html='<tr><td colspan="8" style="height:50px;line-height:50px">暂无数据</td></tr>';
				$("#allData").html(html);
				return false;
			}
			var pageIndex=result.pageIndex;
			var pageLimit=result.pageLimit;
			var totalCount=result.totalCount;
			$("#totalCount").text(totalCount);
			var list=result.list;
			if(list==null || list.length<=0){
				html='<tr><td colspan="8" style="height:50px;line-height:50px">暂无数据</td></tr>';
				$("#allData").html(html);
				return false;
			}
			//已关注的公司
			var value=localStorage.getItem('follow_intermediary');
			value=JSON.parse(value);
			//console.log(list);
			for (var i = 0; i < list.length; i++) {
				var obj=list[i];
				html+='<tr>';
				html+='<td class="nsd_qx"><input '+(getJsonObjIndex(outData, obj.id) ? "checked='checked'" : "")+' id='+obj.id+' type="checkbox"/></td>';
				html+='<td class="company_info">';
				html+='<div class="compamy_logo fl">';
				html+='<img src="/saasBeta/images/gs_logo.png" alt="" />';
				html+='</div>';
				html+='<div class="compamy_msg fl">';
				html+='<a href="javascript:void(0);" class="on">'+obj.organizationNameSort+'</a>';
				var type=obj.type;
				var typename="";
				if(type==1){
					typename="券商";
				}else if(type==2){
					typename="律所";
				}else if(type==3){
					typename="会计所";
				}else if(type==4){
					typename="资产评估机构";
				}else if(type==5){
					typename="证券登记结算机构";
				}
				if(obj.address==null||obj.address==""||obj.address==undefined){
					obj.address="--";
				}
				html+='<span class="dq_company">'+obj.address+'>'+typename+'</span>';
				html+='</div>';
				html+='</td>';
				html+='<td class="shuzi">'+obj.inListNum+'</td>';
				html+='<td>'+(obj.unInListNum==null?0:obj.unInListNum)+'</td>';
				html+='<td class="shuzi">'+(obj.dzNum==null?"0":obj.dzNum)+'</td>';
				html+='<td class="shuzi">0</td>';
				html+='<td class="company_rz">';
				html+='<em class="shuzi">'+obj.maxTime+'</em>';
				if(obj.stockName==null||obj.stockName==""||obj.stockName==undefined){
					obj.stockName="--";
				}
				if(obj.stockCode==null||obj.stockCode==""||obj.stockCode==undefined){
					obj.stockCode="--";
				}
				if(obj.newDateType==null||obj.newDateType==""||obj.newDateType==undefined){
					obj.newDateType="--";
				}
				html+='<i class="shuzi" onclick="toCompanyHomeHtml(\''+obj.stockCode+'\',\''+obj.stockName+'\',\'发现中介机构\')">'+obj.stockName+'('+obj.stockCode+')</i>';
				html+='<b class="company_dz">'+obj.newDateType+'</b>';
				html+='</td>';
				html+='<td>';
				if($.inArray(obj.organizationNameSort,value)>-1){
					html +="<span class='gz_company on' onclick='updateFollow(this,\"intermediary\")' data-followId='"+obj.organizationNameSort+"'>关注</span>";
				}else{
					html +="<span class='gz_company' onclick='updateFollow(this,\"intermediary\")'  data-followId='"+obj.organizationNameSort+"'>关注</span>";
				}
				html+='</td>';
				html+='</tr>';
			}
			$("#allData").html(html);
			//分页
			if(totalCount>pageSize){
				//分页
				if(pageNum==1){
					$('#page').pagination({
						total: totalCount,
						pageSize: pageSize,
						current: pageNum,
//						layout:['list','sep','first','prev','links','next','last','sep','refresh'],
						layout: ['first', 'prev', 'links','next','last'],
						links:5,
						displayMsg:"",
						showPageList:false,
						onSelectPage: function(pageNumber, size) {
							findInvestmentOrganization(organizationName, areaName, organizationType, dateName, eventNum, sortParam, pageNumber, size)
						}
					});
				}
				$('#page').show();
				//修改分页文字
				setPageText('page');
			}
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}