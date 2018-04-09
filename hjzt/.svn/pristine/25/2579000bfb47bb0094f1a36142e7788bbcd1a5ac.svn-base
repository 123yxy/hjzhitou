//投资人
var conditions = ""; //查询条件
var sortFile='';//排序方式
var outData = {};//导出excel全局json变量
$(function() {
//		findSbkStatistics();
		//查找投资领域
		findTrade(0,2);
		//查询地区
		findArea();
		//投资时间
		findInvestmentTime();
		//查询表格的内容的内容
		investmentInformation(null,null, null, null, null, null, null, null, null, null, null)
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
			updateCondition();
		})
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
			updateCondition();
		});
		//删除筛选条件
		$(".tj_selected").delegate("i","click",function(){
			//清空选择的条件
			var thisId=$(this).attr("data-value");
			$("#"+thisId).prev().attr("data-value",'');
			if(thisId=="investorsNameSeach"){
				$("#"+thisId).val("");
				$("#"+thisId).attr("data-value","");
			}else if(thisId=="hangye"){
				$("#"+thisId).prev().text("投资领域");
			}else if(thisId=="diqu"){
				$("#"+thisId).prev().text("地区");
			}else if(thisId=="touzirenleixing"){
				$("#"+thisId).prev().text("投资人类型");
			}else if(thisId=="touzishijian"){
				$("#"+thisId).prev().text("投资时间");
			}else if(thisId=="touzishijianzongshu"){
				$("#"+thisId).prev().text("投资事件总数");
			}else if(thisId=="touzizonge"){
				$("#"+thisId).prev().text("投资总额");
			}
			$(this).parent().remove();
			if($(".tj_selected a").length==0){
				$(".yixuan_tiaojian").hide();
			}else{
				$(".yixuan_tiaojian").show();
			}
			updateCondition();
		})
		//清空筛选条件
		$(".yixuan_tiaojian>span").on("click",function(){
			$("#investorsNameSeach").val('');
			$("#investorsNameSeach").attr("data-value",'');
			$("#hangye").prev().text("投资领域");
			$("#hangye").prev().attr("data-value","");
			$("#diqu").prev().text("地区");
			$("#diqu").prev().attr("data-value","");
			$("#touzirenleixing").prev().text("投资人类型");
			$("#touzirenleixing").prev().attr("data-value","");
			$("#touzishijian").prev().text("投资时间");
			$("#touzishijian").prev().attr("data-value","");
			$("#touzishijianzongshu").prev().text("投资事件总数");
			$("#touzishijianzongshu").prev().attr("data-value","");
			$("#touzizonge").prev().text("投资总额");
			$("#touzizonge").prev().attr("data-value","");
			$(".tj_selected a").remove();
			$(this).parent().hide();
			updateCondition();
		});
	
		//导出功能
		$(".pay").on("click",function(){
			//前台页面导出
//			$("#exportTableHtml").html('');
//			var exportTableHtml="";
//			$("#investmentSituation").find("input").each(function(index,item){
//				if($(this).is(":checked")){
//					exportTableHtml+="<tr>";
//					exportTableHtml+="<td>"+$(this).parent().next().text()+"</td>";
//					exportTableHtml+="<td>"+$(this).parent().next().next().text()+"</td>";
//					exportTableHtml+="<td>"+$(this).parent().next().next().next().text()+"</td>";
//					exportTableHtml+="<td>"+$(this).parent().next().next().next().next().text()+"</td>";
//					exportTableHtml+="</tr>";
//				}
//			});
//			if(exportTableHtml==''){
//				errorAlert("","请选择导出的数据");
//				return false;
//			}
//			$("#exportTableHtml").html(exportTableHtml);
//			method5('exportTable');
			//后台接口导出--前台取数据导出
			var paramArrayObject={};
			var paramArrayObjectArray=new Array();
			//标题
			var paramArrayObjectArrayObjectTitle={};
			paramArrayObjectArrayObjectTitle[1]="投资人";
			paramArrayObjectArrayObjectTitle[2]="投资事件总数";
			paramArrayObjectArrayObjectTitle[3]="投资总金额";
			paramArrayObjectArrayObjectTitle[4]="最新投资事件";
			paramArrayObjectArray.push(paramArrayObjectArrayObjectTitle);
			
			for(var key in outData){
				if(!(outData[key] == undefined || outData[key] == "")){
					paramArrayObjectArray.push(outData[key]);
				}
			}
			//数据
			/*$("#investmentSituation").find("input").each(function(index,item){
				if($(this).is(":checked")){
					var paramArrayObjectArrayObject={};
					paramArrayObjectArrayObject[1]=$(this).parent().next().text();
					paramArrayObjectArrayObject[2]=$(this).parent().next().next().text();
					paramArrayObjectArrayObject[3]=$(this).parent().next().next().next().text();
					paramArrayObjectArrayObject[4]=$(this).parent().next().next().next().next().text();
					paramArrayObjectArray.push(paramArrayObjectArrayObject);
				}
			});*/
			if(paramArrayObjectArray==null || paramArrayObjectArray.length<=1){
				errorAlert("","请选择导出的数据");
				return false;
			}
			console.log(paramArrayObjectArray)
			paramArrayObject["投资人"]=paramArrayObjectArray;
			methodExportExcel("投资人",paramArrayObject);
		});
		//全文检索
		$("#investorsNameSeach").autocomplete({
			minLength: 2,
			source:function(request, response) {
				findInvestorSearch(request, response);
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
//		$("#investorsNameSeach").keydown(function(e) {
			if(e.keyCode==13){
				$("#seach").click();
				$("#ui-id-1").hide();
			}
		});
		//搜索按钮
		$("#seach").on("click",function(){
			updateCondition();
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
})

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
	$("#investmentSituation").find("input").each(function(index,item){
		if($(this).is(":checked")){
			var paramArrayObjectArrayObject={};
			paramArrayObjectArrayObject[1]=$(this).parent().next().text();
			paramArrayObjectArrayObject[2]=$(this).parent().next().next().text();
			paramArrayObjectArrayObject[3]=$(this).parent().next().next().next().text();
			paramArrayObjectArrayObject[4]=$(this).parent().next().next().next().next().text();
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
function findInvestorSearch(request, response){
	$.axs("/betaInvest/investor/findInvestorSearch.do", {investorName:$.trim(request.term)}, false, function(data) {
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
			console.log(response);
		} else {
			errorAlert(data.retCode, data.retMsg);
		}
	})
}
/**
 * 查找投资领域 categorType:行业类型 , levelId：行业级别  
 */
function findTrade(categorType,levelId){
	var param={categorType:categorType,levelId:levelId};
	$.axs("/betaStock/common/findTrade.do",param,true,function(data){
		var result=data.retData;
		if(data.retCode=='0000'){
			if(result==null){
				return false;
			}
			var categorHtml='';//<li data-value=""><a href="javascript:void();">投资领域</a></li>
			$(result).each(function(index,item){
				categorHtml+='<li data-value="'+item.categoryId+'"><a href="javascript:void(0);">'+item.categoryName+'</a></li>';
			})
			$("#hangye").empty();
			$("#hangye").html(categorHtml);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
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
				html+='<li data-value="'+item.id+'"><a href="javascript:void(0);">'+item.nameCn+'</a></li>';
			})
			$("#diqu").empty();
			$("#diqu").html(html);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

/*
 * 查询投资时间
 */
function findInvestmentTime() {
	$.axs("/betaInvest/investor/findInvestorDate.do", null, true, function(data) {
		var result = data.retData;
		if(data.retCode == '0000') {
			if(result == null) {
				return false
			}
			var timeHtml = '';
			$(result).each(function(index, item) {
				if(index!=0){
					timeHtml += '<li data-value="'+item+'年"><a href="javascript:void(0);" class="shuzi" >' + item + '年</a></li>';
				}
			})
			$("#touzishijian").append(timeHtml);
		} else {
			errorAlert(data.retCode, data.retMsg);
		}
	})
}


/**
 * 更改查询条件
 * @
 * @param  
 * @param 
 */
function updateCondition(){
	//初始化清空检索条件
	$("#jiansuotianjian").html('');
	//全文检索--投资者名称
	var investorName=$.trim($("#investorsNameSeach").val());
	if(investorName==null || investorName=="" || investorName=="undefined"){
		investorName=$("#investorsNameSeach").attr("data-value");
		if(investorName==null || investorName=="" || investorName=="undefined"){
			investorName=null;
		}
	}
	$("#investorsNameSeach").val('');
	$("#investorsNameSeach").attr("data-value",investorName);
	//行业类型( 0:股转管理型，1:股转投资型，2:国民经济行业，3:上市公司行业)
	var hangyeType=1;
	//行业主键
	var hangyeId=$("#hangye").prev().attr("data-value");
	if(hangyeId==''||hangyeId==null||hangyeId==undefined){
		hangyeId=null;
	}
	//地区
	var areaId=$("#diqu").prev().attr("data-value");
	if(areaId==''||areaId==null||areaId==undefined){
		areaId=null;
	}
	//投资人类型
	var touzirenleixing=$("#touzirenleixing").prev().attr("data-value");
	if(touzirenleixing==''||touzirenleixing==null||touzirenleixing==undefined){
		touzirenleixing=null;
	}
	//投资时间
	var touzishijian=$("#touzishijian").prev().attr("data-value");
	if(touzishijian==''||touzishijian==null||touzishijian==undefined){
		touzishijian=null;
	}
	//投资事件总数
	var touzishijianzongshu=$("#touzishijianzongshu").prev().attr("data-value");
	if(touzishijianzongshu==''||touzishijianzongshu==null||touzishijianzongshu==undefined){
		touzishijianzongshu=null;
	}
	//投资总额
	var touzizonge=$("#touzizonge").prev().attr("data-value");
	if(touzizonge==''||touzizonge==null||touzizonge==undefined){
		touzizonge=null;
	}
	var sort='';
	$(".sanban_paixu span").each(function(index,item){
		if($(item).hasClass("up") || $(item).hasClass("down")){
			sort=$(item).attr("data-value");
			if($(item).hasClass("up")){
				sort+=" asc";
			}else if($(item).hasClass("down")){
				sort+=" desc";
			}
			return false;
		}
	});
	
	//=============================检索条件显示=====================
	//检索条件判断--投资者名称
	if(investorName!=null){
		$(".yixuan_tiaojian").show();
		$("#jiansuotianjian").append('<a href="javascript:void(0);">检索名称：'+investorName+'<i data-value="investorsNameSeach"></i></a>');
	}
	//检索条件判断--行业
	if(hangyeId!=null){
		$(".yixuan_tiaojian").show();
		var showName=$("#hangye").prev().text();
		$("#jiansuotianjian").append('<a href="javascript:void(0);">服务领域：'+showName+'<i data-value="hangye"></i></a>');
	}
	//检索条件判断--地区
	if(areaId!=null){
		$(".yixuan_tiaojian").show();
		var showName=$("#diqu").prev().text();
		$("#jiansuotianjian").append('<a href="javascript:void(0);">地区：'+showName+'<i data-value="diqu"></i></a>');
	}
	//检索条件判断--投资人类型
	if(touzirenleixing!=null){
		$(".yixuan_tiaojian").show();
		var showName=$("#touzirenleixing").prev().text();
		$("#jiansuotianjian").append('<a href="javascript:void(0);">投资人类型：'+showName+'<i data-value="touzirenleixing"></i></a>');
	}
	//检索条件判断--投资时间
	if(touzishijian!=null){
		$(".yixuan_tiaojian").show();
		var showName=$("#touzishijian").prev().text();
		$("#jiansuotianjian").append('<a href="javascript:void(0);">投资时间：'+showName+'<i data-value="touzishijian"></i></a>');
	}
	//检索条件判断--投资事件总数
	if(touzishijianzongshu!=null){
		$(".yixuan_tiaojian").show();
		var showName=$("#touzishijianzongshu").prev().text();
		$("#jiansuotianjian").append('<a href="javascript:void(0);">投资事件总数：'+showName+'<i data-value="touzishijianzongshu"></i></a>');
	}
	//检索条件判断--投资总额
	if(touzizonge!=null){
		$(".yixuan_tiaojian").show();
		var showName=$("#touzizonge").prev().text();
		$("#jiansuotianjian").append('<a href="javascript:void(0);">投资总额：'+showName+'<i data-value="touzizonge"></i></a>');
	}
	investmentInformation(investorName,hangyeType,hangyeId,areaId,touzirenleixing,touzishijian,touzishijianzongshu,touzizonge,sort,null,null)
}


/**
 * 根据条件查询表格的内容
 * @param hangyeType 行业类型  0: 股转管理型 1: 股转投资型 2:国民经济 3：上市
 * @param hangyeId  行业id
 * @param stateId 地区id
 * @param investorType  投资类型 0:PE/VC;1:个人;2:公司
 * @param investorDate  投资时间:近一周;近一月;近三月;近六月;近一年;YYYY年
 * @param investorEventNum 投资事件总数 1:1-50次;2:50-100次;3:100-200次;4:200次以上
 * @param investorSum 投资总额 1:0-1亿;2:1-10亿;3:10-30亿;4:30-50亿;5:50亿以上
 * @param sortParam 排序字段 
 * @param pageNum 当前页：从1开始
 * @param pageSize 每页长度
 */
function investmentInformation(investorName,hangyeType,hangyeId,stateId,investorType,
		investorDate,investorEventNum,investorSum,sortParam,pageNum,pageSize) {
	if(pageNum==null){
		pageNum=1;
	}
	if(pageSize==null){
		pageSize=20;
	}
	if(pageNum==1){
		$("#pages").remove();
		$(".company_information").after('<div id="pages" class="pages pagination " style="display: none;"></div>')
	}
	var param={investorName:investorName,hangyeType:hangyeType,hangyeId:hangyeId,stateId:stateId,
			investorType:investorType,investorDate:investorDate,
			investorEventNum:investorEventNum,investorSum:investorSum,
			sortParam:sortParam,pageSize:pageSize,pageNum:pageNum};
	$.axs("/betaInvest/investor/findInvestor.do", param, false, function(data) {
		var result = data.retData;
		var list = result.list;
		var investmentHtml = '';
//		console.log(data);
		$(".selection_totals").find("em").text(result.totalCount);
		if(data.retCode == "0000") {
			if(list==null||list==''||list==undefined) {
				$("#investmentSituation").empty();
				$('#pages').hide();
				investmentHtml='<tr><td colspan="6" style="height:50px;line-height:50px">暂无数据</td></tr>';
				$("#investmentSituation").html(investmentHtml);
				return false;
			}		
			$("#investmentSituation").empty();
			//已关注的公司
			var value=localStorage.getItem('follow_investor');
			value=JSON.parse(value);
			$(list).each(function(index, item) {
				investmentHtml += '<tr>';
				investmentHtml += '<td class="nsd_qx"><input '+(getJsonObjIndex(outData, item.id) ? "checked='checked'" : "")+' id='+item.id+' type="checkbox"/></td>';
				investmentHtml += '<td class="company_info investor">';
				investmentHtml += '<div class="compamy_logo fl">';
				if(item.peopleOrCompany=="1"){
					investmentHtml += '<img src="/www/images/touzr_gs.png" alt="" />';
				}
				else if(item.peopleOrCompany=="0"){
					investmentHtml += '<img src="/www/images/touz_geren.png" alt="" />';
				}
				
				investmentHtml += '</div>';
				investmentHtml += '<div class="investor_infor fl touziren_weizhi">';
				investmentHtml += '<span>'+item.investorsName+'</span>';
				//investmentHtml += '<p>'+item.investorsName+':<em class="shuzi">'+item.stockCode+'</em></p>';
				investmentHtml += '</div>';
				investmentHtml += '<div class="clr"></div>';
				investmentHtml += '</td>';
				investmentHtml += '<td class="shuzi">'+item.eventNum+'</td>';			
				investmentHtml += '<td class="shuzi">'+(item.investSum).toFixed(2)+'万</td>';
				investmentHtml += '<td class="company_rz">';
				investmentHtml += '<em class="shuzi">'+item.noticeDate+'</em>';
				investmentHtml += '<i class="shuzi" onclick="toCompanyHomeHtml(\''+item.stockCode+'\',\''+item.stockName+'\',\'发现投资人\')">'+item.stockName+'('+item.stockCode+')</i>';
				investmentHtml += '<span class="shuzi">'+item.newInvestSum.toFixed(2)+'万</span>';
				investmentHtml += '</td>';
				investmentHtml += '<td>';
				if($.inArray(item.investorsName,value)>-1){
					investmentHtml +="<span class='gz_company on' onclick='updateFollow(this,\"investor\")' data-followId='"+item.investorsName+"'>关注</span>";
				}else{
					investmentHtml +="<span class='gz_company' onclick='updateFollow(this,\"investor\")'  data-followId='"+item.investorsName+"'>关注</span>";
				}
				investmentHtml += '</td>';
				investmentHtml += '</tr>';
			});
				
			$("#investmentSituation").html(investmentHtml);
			
			//分页
			if(pageNum==1){
				$('#pages').pagination({
					total: result.totalCount,
					pageSize: pageSize,
					current: pageNum,
//						layout:['list','sep','first','prev','links','next','last','sep','refresh'],
					layout: ['first', 'prev', 'links','next','last'],
					links:5,
					displayMsg:"",
					showPageList:false,
					onSelectPage: function(pageNumber, size) {
						investmentInformation(investorName,hangyeType,hangyeId,stateId,investorType,
								investorDate,investorEventNum,investorSum,sortParam,pageNumber,size);
					}
					
				});
			}
			if(result.totalCount<=pageSize){
				$('#pages').hide();
			}else{
				$('#pages').show();
			}
			setPageText('pages');
		} else {
			errorAlert(data.retCode,data.retMsg);
		}

	})
}