var ids = "";//导出excel的ID
$(document).ready(function(){
//	findSbkStatistics();
	//筛选的时候默认隐藏的内容
	$(".show_select").hide();
	//查询行业
	queryIndustry(0,2);
	//查询地区
	queryArea();
	//查询主办券商
	queryQuanshang();
	//按条件查询公司
	findInvestment(null,null, null, null, null, null, null, null, null, null, null, null);
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
		if(thisId=="privateNameSeach"){
			$("#"+thisId).val("");
			$("#"+thisId).attr("data-value","");
		}else if(thisId=="invest_hy"){
			$("#"+thisId).prev().text("行业");
		}else if(thisId=="queryArea"){
			$("#"+thisId).prev().text("地区");
		}else if(thisId=="query_qs"){
			$("#"+thisId).prev().text("主办券商");
		}else if(thisId=="rongzijine"){
			$("#"+thisId).prev().text("融资金额");
		}else if(thisId=="dingzengzhuangtai"){
			$("#"+thisId).prev().text("定增状态");
		}else if(thisId=="touzifangleixing"){
			$("#"+thisId).prev().text("投资方类型");
		}else if(thisId=="gonggaoshijian"){
			$("#"+thisId).prev().text("公告时间");
		}
		$(this).parent().remove();
		if($(".tj_selected a").length==0){
			$(".yixuan_tiaojian").hide();
		}else{
			$(".yixuan_tiaojian").show();
		}
		changeParam();
	})
	//点击清除筛选时把选择的清空掉
	$(".yixuan_tiaojian>span").on("click",function(){
		$("#privateNameSeach").val('');
		$("#privateNameSeach").attr("data-value",'');
		$("#invest_hy").prev().text('行业');
		$("#invest_hy").prev().attr("data-value",'');
		$("#queryArea").prev().text('地区');
		$("#queryArea").prev().attr("data-value",'');
		$("#query_qs").prev().text('主办券商');
		$("#query_qs").prev().attr("data-value",'');
		$("#rongzijine").prev().text('融资金额');
		$("#rongzijine").prev().attr("data-value",'');
		$("#dingzengzhuangtai").prev().text('定增状态');
		$("#dingzengzhuangtai").prev().attr("data-value",'');
		$("#touzifangleixing").prev().text('投资方类型');
		$("#touzifangleixing").prev().attr("data-value",'');
		$("#gonggaoshijian").prev().text('公告时间');
		$("#gonggaoshijian").prev().attr("data-value",'');
		$(".tj_selected a").remove();
		$(this).parent().hide();
		changeParam();
	})
	
	
	
	//导出功能
	$(".pay").click(function(){
		if(ids != ""){
			var hyType='management_industry_id';
			//排序
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
			location.href = "/betaInvest/private/outExcelMethod.do?ids="+ids.substring(0, ids.length - 1)+"&sortType="+sort+"&hyType="+hyType;
		}else{
			$.zmAlert("没有要导出的数据");
		}
	})
	//全文检索
	$("#privateNameSeach").autocomplete({
		minLength: 2,
		source:function(request, response) {
			//console.log(request)
			findInvestorSearch(request, response);
		},
		delay: 500,
		select: function( event, ui ) {
			var item = ui.item;
//			console.log(item)
			changeParam();
		},
		close: function( event, ui ){
			$("#seach").click();
		}
	});
	//全文检索--回车事件
	$(document).keydown(function(e) {
//	$("#privateNameSeach").keydown(function(e) {
		if(e.keyCode==13){
			$("#seach").click();
			$("#ui-id-1").hide();
		}
	});
	//搜索按钮
	$("#seach").on("click",function(){
		changeParam();
	});
	$(document).click(function(){
		$(".tzf_box_table").hide();
//		$(".touzifang_tc").hide();
//		$(".backbj").hide();
	});
	$("#close_touzifang").click(function(){
		$(".touzifang_tc").hide();
		$(".backbj").hide();
	});
	$(".backbj").click(function(){
		$(".touzifang_tc").hide();
		$(".backbj").hide();
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
		$("#find_investMent :checkbox").each(function(){
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
		$("#find_investMent :checkbox").each(function(){
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
	//融资页面的投资方薯饼经过显示框
	$(".tzf_box").on("mousemove",function(){
		$(this).find("div.tzf_box_table").show();
	})

	$(".tzf_box").on("mouseout",function(){
		$(this).find("div.tzf_box_table").hide();
	})

});

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
 * 全文检索--查询投资者名称
 */
function findInvestorSearch(request, response){
	$.axs("/betaInvest/enterpriseData/findSearchMsg.do", {searchStr:$.trim(request.term)}, false, function(data) {
		var result = data.retData;
//		console.log(result)
		if(data.retCode == '0000') {
			if(result == null) {
				return false
			}
			var arr = [];
			$.each(result, function(i, item) {
				var obj = {
					label: item.msg,
					value: item.msg
				}
				arr.push(obj);
			});
			searchList = arr;
			response(arr);
			//console.log(response);
		} else {
			errorAlert(data.retCode, data.retMsg);
		}
	})
}
//查询行业
function queryIndustry(type,level){
	var param={categorType:type,levelId:level};
		$.axs("/betaStock/common/findTrade.do",param,true,function(data){
			if(data.retCode=="0000"){
				var result = data.retData;
				if(result==null){
					return false;
				}
				var htm='';
				for( var i =0; i<result.length; i++){
					var obj=result[i];
					htm+='<li data-value='+obj.categoryId+'><a href="javascript:;">'+obj.categoryName+'</a></li>';
				}
				$("#invest_hy").html(htm);
			}else{
				errorAlert(data.retCode,data.retMsg);
			}
	});
}
//查询地区
function queryArea(){
	var param={dataType:1,type:1,parentId:0}
		$.axs("/betaStock/common/findWorkBookByPid.do",param,true,function(data){
			if(data.retCode=="0000"){
				var result = data.retData;
				if(result==null){
					return false;
				}
				var htm='';
				for( var i =0; i<result.length; i++){
					var obj=result[i];
					htm+='<li data-value='+obj.id+'><a href="javascript:;">'+obj.nameCn+'</a></li>';
				}
				$("#queryArea").html(htm);
			}else{
				errorAlert(data.retCode,data.retMsg);
			}
	});
}
//查询券商
function queryQuanshang(){
	var param={parentId:0,type:5,dataType:1};
	$.axs("/betaStock/common/findWorkBook.do",param,true,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result==null){
				return false;
			}
			var htm='';
			for(var i=0;i<result.length;i++){
				var obj=result[i];
				htm+='<li data-value="'+obj.nameCn+'"><a href="javascript:;">'+obj.nameCn+'</a></li>';
			}
			$("#query_qs").html(htm);
		}
	});
}

//更改查询条件
function changeParam(){
	//初始化清空检索条件
	$("#jiansuotianjian").html('');
	//检索内容
	var privateName=$.trim($("#privateNameSeach").val());
	//console.log(privateName)
	if(privateName==null || privateName=="" || privateName=="undefined"){
		privateName=$("#privateNameSeach").attr("data-value");
		if(privateName==null || privateName=="" || privateName=="undefined"){
			privateName=null;
		}
	}
	$("#privateNameSeach").val('');
	$("#privateNameSeach").attr("data-value",privateName);
	//行业类型
	var hyType='management_industry_id';
	//行业
	var hyId=$("#invest_hy").prev().attr("data-value");
	if(hyId==null || hyId=="" || hyId=="undefined"){
		hyId=null;
	}
	//地区
	var stateId=$("#queryArea").prev().attr("data-value");
	if(stateId==null || stateId=="" || stateId=="undefined"){
		stateId=null;
	}
	//主办券商
	var sponsoredBroker=$("#query_qs").prev().attr("data-value");
	if(sponsoredBroker==null || sponsoredBroker=="" || sponsoredBroker=="undefined"){
		sponsoredBroker=null;
	}
	//融资金额类型
	var amountType=$("#rongzijine").prev().attr("data-value");
	if(amountType==null || amountType=="" || amountType=="undefined"){
		amountType=null;
	}
	//定增状态
	var privateType=$("#dingzengzhuangtai").prev().attr("data-value");
	if(privateType==null || privateType=="" || privateType=="undefined"){
		privateType=null;
	}
	// 投资方类型
	var investorType=$("#touzifangleixing").prev().attr("data-value");
	if(investorType==null || investorType=="" || investorType=="undefined"){
		investorType=null;
	}
	// 公告时间
	var dateType=$("#gonggaoshijian").prev().attr("data-value");
	if(dateType==null || dateType=="" || dateType=="undefined"){
		dateType=null;
	}
	//排序
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
	if(privateName!=null){
		$(".yixuan_tiaojian").show();
		$("#jiansuotianjian").append('<a href="javascript:void(0);">检索名称：'+privateName+'<i data-value="privateNameSeach"></i></a>');
	}
	//检索条件判断--行业
	if(hyId!=null){
		$(".yixuan_tiaojian").show();
		var showName=$("#invest_hy").prev().text();
		$("#jiansuotianjian").append('<a href="javascript:void(0);">行业：'+showName+'<i data-value="invest_hy"></i></a>');
	}
	//检索条件判断--地区
	if(stateId!=null){
		$(".yixuan_tiaojian").show();
		var showName=$("#queryArea").prev().text();
		$("#jiansuotianjian").append('<a href="javascript:void(0);">地区：'+showName+'<i data-value="queryArea"></i></a>');
	}
	//检索条件判断--主办券商
	if(sponsoredBroker!=null){
		$(".yixuan_tiaojian").show();
		var showName=$("#query_qs").prev().text();
		$("#jiansuotianjian").append('<a href="javascript:void(0);">主办券商：'+showName+'<i data-value="query_qs"></i></a>');
	}
	//检索条件判断--融资金额
	if(amountType!=null){
		$(".yixuan_tiaojian").show();
		var showName=$("#rongzijine").prev().text();
		$("#jiansuotianjian").append('<a href="javascript:void(0);">融资金额：'+showName+'<i data-value="rongzijine"></i></a>');
	}
	//检索条件判断--定增状态
	if(privateType!=null){
		$(".yixuan_tiaojian").show();
		var showName=$("#dingzengzhuangtai").prev().text();
		$("#jiansuotianjian").append('<a href="javascript:void(0);">定增状态：'+showName+'<i data-value="dingzengzhuangtai"></i></a>');
	}
	//检索条件判断--投资方类型
	if(investorType!=null){
		$(".yixuan_tiaojian").show();
		var showName=$("#touzifangleixing").prev().text();
		$("#jiansuotianjian").append('<a href="javascript:void(0);">投资方类型：'+showName+'<i data-value="touzifangleixing"></i></a>');
	}
	//检索条件判断--公告时间
	if(dateType!=null){
		$(".yixuan_tiaojian").show();
		var showName=$("#gonggaoshijian").prev().text();
		$("#jiansuotianjian").append('<a href="javascript:void(0);">公告时间：'+showName+'<i data-value="gonggaoshijian"></i></a>');
	}
	
	findInvestment(privateName,hyType, hyId,stateId,sponsoredBroker,amountType,privateType,investorType,dateType,sort,null,null)
}

/**
 * 查询公告信息
 * @param privateName 检索内容
 * @param hyType 行业类型 nationalIndustryId:国发经济，listedIndustryId:上市公司，managementIndustryId:管理型，industry:投资型
 * @param hyId 行业ID 取接口返回的ID
 * @param stateId 地区ID 取接口返回的ID
 * @param sponsoredBroker 主办券商  直接取页面券商的名字
 * @param amountType 融资金额类型  1:２亿以上,2:1-2亿,3:5000万-1亿,4:5000万以下
 * @param privateType 定增状态  1:定向增发预案审批中,2:停止实施预案,3:已完成定向增发
 * @param investorType 投资方类型  0:PE/vc投资人1:个人投资者2:机构投资者
 * @param dateType 时间范围类型  近一周，近一月，近三月，近六月，近一年，2016年，2015年，2014年，2013年
 * @param sortType 排序类型    desc,asc
 * @param pageNum 页数  1，2，3，4，5，6
 * @param pageSize 条数，默认20条
 * @return
 */
function findInvestment(privateName,hyType, hyId,stateId,sponsoredBroker,amountType,privateType,investorType,dateType,sortType,pageNum,pageSize){
	if(pageNum==null){
		pageNum=1;
	}
	if(pageSize==null){
		pageSize=20;
	}
	if(pageNum==1){
		$("#page").remove();
		$(".feature_select").append('<div id="page" class="pages pagination " style="display: none;"></div>')
	}
	var param ={privateName:privateName,hyType:hyType,hyId:hyId,stateId:stateId,sponsoredBroker:sponsoredBroker,amountType:amountType,
			privateType:privateType,investorType:investorType,dateType:dateType,sortType:sortType,pageNum:pageNum,pageSize:pageSize};
	$("#page").hide();
	$.axs("/betaInvest/private/findFinancing.do",param,false,function(data){
		if(data.retCode=="0000"){
//			console.log(data.retData)
			if(data.retData==null){
				$("#jieguo").text(0);
				htm='<tr><td colspan="7" style="height:50px;line-height:50px">暂无数据</td></tr>';
				$("#find_investMent").html(htm);
				return false;
			}
			var result = data.retData.list;
			$("#jieguo").text(data.retData.total);
			if(result==null){
				$("#jieguo").text(0);
				htm='<tr><td colspan="7" style="height:50px;line-height:50px">暂无数据</td></tr>';
				$("#find_investMent").html(htm);
				return false;
			}
			var htm='';
			//已关注的公司
			var value=localStorage.getItem('follow_company');
			if(investorType==null||investorType ==undefined){
				var tempType = "";
			}else{
				var tempType = investorType;
			}
			value=JSON.parse(value);
			for(var i=0;i<result.length;i++){
				var obj=result[i];
				htm+='<tr>';
				htm+='<td class="nsd_qx"><input id='+obj.id+' '+(getArrIndex(ids.split(","), obj.id) == -1 ? "" : "checked='checked'")+' type="checkbox" /></td>';
				if(obj.dateTime==null){
				htm+='<td class="shuzi">--</td>';	
				}else{
				htm+='<td class="shuzi">'+obj.dateTime+'</td>';
				}
				htm+='<td class="company_types">';
//					当公司是创的时候i的类是chuang，是基的时候i的类是ji
//                  所属板块
                var stockBlock = obj.stockBlock;
                if(stockBlock!==null){
                	if(stockBlock=="基础层"){
					htm+='<a href="javascript:void(0);" class="shuzi" onClick="toCompanyHomeHtml(\''+obj.stockCode+'\',\''+obj.stockName+'\',\'投资速递\-融资\')"><i class="ji">基</i>'+obj.stockName+'('+obj.stockCode+')</a>';
                		
                	}else if(stockBlock=="创新层"){
					htm+='<a href="javascript:void(0);" class="shuzi" onClick="toCompanyHomeHtml(\''+obj.stockCode+'\',\''+obj.stockName+'\',\'投资速递\-融资\')"><i class="chuang">创</i>'+obj.stockName+'('+obj.stockCode+')</a>';
                	}
                }else{
					htm+='<a href="javascript:void(0);" class="shuzi" onClick="toCompanyHomeHtml(\''+obj.stockCode+'\',\''+obj.stockName+'\',\'投资速递\-融资\')"><i class="chuang">创</i>'+obj.stockName+'('+obj.stockCode+')</a>';
                }
//                  行业名称
                var catetoryName=obj.catetoryName;
                if(catetoryName!==null){
                	htm+='<span>'+catetoryName+'</span>';
                }else{
                	htm+='<span>--</span>';
                }
				htm+='</td>';
//					地区city
				var city=obj.state;
				if(city!==null){
				htm+='<td>'+city+'</td>';	
				}else{
				htm+='<td>--</td>';	
				}
				
				var price=obj.raisePrice;
//				console.log(price);
				if(price==null){
					price=0
				}
				var data_time=obj.dateTime;
				var stock_Code=obj.stockCode;
				var stock_name=obj.stockName;
				htm+='<td class="shuzi">'+price.toFixed(2)+'万</td>';
				htm+='<td class="tzf_box" onClick="findtouziList(this,\''+stock_Code+'\',\''+data_time+'\',\''+stock_name+'\',\''+tempType+'\',null,null)">';
				htm+='查看';
//				htm+='<div class="tzf_box_table">';
//				htm+='<div class="triangle-down"></div>';
//				htm+='<table><thead>';
//				htm+='<tr><th>发行量(万股)</th><th>发行价(元)</th><th>投资总额(万元)</th><th class="fax_dx">发行对象(2)</th></tr>';
//				htm+='</thead><tbody class="tzf_LList">';
//				htm+='</tbody></table></div>';
				htm+='</td>';
				if($.inArray(obj.stockCode,value)>-1){
					htm+='<td><span class="gz_company on" onclick="updateFollow(this,\'company\')" data-followId="'+obj.stockCode+'">关注</span></td>';
				}else{
					htm+='<td><span class="gz_company" onclick="updateFollow(this,\'company\')" data-followId="'+obj.stockCode+'">关注</span></td>';
				}
				
				htm+='</tr>';
			}
			if(data.retData.total==0){
				htm='<tr><td colspan="7" style="height:50px;line-height:50px">暂无数据</td></tr>';
			}
			$("#find_investMent").html(htm);
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

						findInvestment(privateName,hyType, hyId,stateId,sponsoredBroker,amountType,privateType,investorType,dateType,sortType,pageNumber,size)
					}
				});
			}
			if(data.retData.total>20){
				$('#page').show();
			}
			setPageText('page');
		}
	});
}
/**
 * 查询投资方列表
 * @param cc 投资方HTML对象this
 * @param stockCode 股票代码
 * @param dateTime 融资时间
 */
function findtouziList(cc,stockCode,dateTime,dataNmae,investorType,pageNum,pageSize){
	if(pageNum==null){
		pageNum=1;
	}
	if(pageSize==null){
		pageSize=15;
	}
	if(pageNum==1){
		$("#pagedd").show();
	}
	var param ={stockCode:stockCode,dateTime:dateTime,investorType:investorType,pageNum:pageNum,pageSize:pageSize}
		$.axs("/betaStock/private/findInvestor.do",param,true,function(data){
			if(data.retCode=="0000"){
				var htm=""
				$(".tzf_box_table").hide();
				var result = data.retData;
				if(result==null){
					return false;
				}
				var list = result.investorList;
				$("#fxdx_nnumber").html("("+result.total+")");
				$("#name_code").html(dataNmae+"("+stockCode+")");
				for(var i=0;i<list.length;i++){
					var obj=list[i];
					htm+='<tr><td class="fxl_touzif">'+(obj.investNumber).toFixed(2)+'</td><td class="fxl_touzif">'+obj.sharePrice+'</td><td class="fxl_touzif">'+(obj.investSum).toFixed(2)+'</td><td>'+obj.investorsName+'</td></tr>';
				}
				if(list.length==0){
					htm+='<tr><td colspan="4" style="height:50px;line-height:50px">暂无数据</td></tr>';
				}
				$("#fxdx_tablie_info").html(htm);
				//分页
			if(pageNum==1){
				$('#pagedd').pagination({
					total: result.total,
					pageSize: pageSize,
					current: pageNum,
//						layout:['list','sep','first','prev','links','next','last','sep','refresh'],
					layout: ['first', 'prev', 'links','next','last'],
					links:5,
					displayMsg:"",
					showPageList:false,
					onSelectPage: function(pageNumber, size) {
						findtouziList(cc,stockCode,dateTime,dataNmae,investorType,pageNumber,size)
					}
				});
			}
			if(data.retData.total>15){
				$('#pagedd').show();
			}
			setPageText('pagedd');
				$(".touzifang_tc").show();
				$(".backbj").show();
			}
		}
	);
}
//隐藏投资方弹层
function boxhide(n){
	$(n).find(".tzf_box_table").hide();
}
function boxTablehide(n){
	$(n).hide();
}