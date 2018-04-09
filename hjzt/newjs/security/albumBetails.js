var id=getUrlParam("id");
if(id==null || id=="" || id=="undefined"){
	window.location.href="/security/stockAlbum.html";
}
var stockCodes = "";
$(function(){
	addBrowse();
//	findSbkStatistics();
	findSpecialRecommendationDetailTitle();
	findSpecialRecommendationDetail(null,null);
	//公司对比
//	findDuibi();
	//点击对比时
	//点击对标中已选的企业的删除图标
	//鼠标经过对标企业后显示弹窗
	$(".db_qiye").on("mouseenter", function() {
		$(".duibiao").show();
	})
	$(".db_qiye").on("mouseleave", function() {
		$(".duibiao").hide();
	})

	$("#followNum").parent().on("click",function(){
		toLogin();
		var followId=$(this).attr("data-followid");
		var num=$("#followNum").text();
		if(followId==null){
			return false;
		}
		var path="";
		var value=localStorage.getItem('follow_speciality');
		value=JSON.parse(value);
		if($(this).hasClass("on")){//已经关注，需要取消关注
			$(this).removeClass("on");
			$("#followNum").text(Number(num)-1)
			path="/betaStock/redis/deleFollow.do";
			//已经关注，需要取消关注
			var index=$.inArray(followId,value);
			value.splice(index,1);
			//移除后的结构重新赋值到缓存中
			localStorage.setItem('follow_speciality',JSON.stringify(value));
		}else{//未关注，需要关注
			$(this).addClass("on");
			$("#followNum").text(Number(num)+1)
			path="/betaStock/redis/addFollow.do";
			//添加关注的东西到缓存中
			value.push(followId);
			localStorage.setItem('follow_speciality',JSON.stringify(value));
		}
		if(path==""){
			return false;
		}
		var param={followId:followId,followType:3};
		$.axs(path,param,true,function(data){
//			var value=localStorage.getItem('follow_'+thizType);
//			value+=","+followId;
//			localStorage.setItem('follow_'+thizType,value);
		});
	});
})
/**
 * 添加特色推荐的浏览次数
 * @param:browseId:1.公司2.投资人3.专辑4.中介 
 * @param:browseType :股票代码
 */
function addBrowse(){
	var param={browseType:"3",browseId:id};
	$.axs("/betaStock/redis/addBrowse.do",param,true,function(data){
		//console.log(data);
		if(data.retCode=="0000"){
			
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	})
}
/**
 * 查询公司信息
 */
function findSpecialRecommendationDetailTitle(){
	$.axs("/betaInvest/speciality/findSpecialRecommendationDetailTitle.do",{id:id},false,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			//console.log(result);
			var obj=result[0];
			if(obj==null){
				return;
			}
			//已关注的推荐
			var value=localStorage.getItem('follow_speciality');
			value=JSON.parse(value);
			var picUrl=obj.picUrl;
			if(picUrl==null || picUrl=="" || picUrl=="undefined"){
				picUrl="/www/images/zhuanji.png";
			}
			$("#picUrl").attr("src",picUrl);
			$("#createTime").html(obj.createTime);
			$("#followNum").html(obj.followNum);
			$("#name").html(obj.name+"投资事件");
			$("#pageViews").html(obj.pageViews);
			$("#followNum").parent().attr("data-followId",id);
			if($.inArray(id,value)>-1){
				$("#followNum").parent().addClass("on");
			}
			//面包屑位置
			$(".dangq").html(obj.name);
//			if(obj.attention=="true"){
//				$("#followNum").parent().addClass("on");
//			}
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

/**
 * 查询特色推荐的公司收藏的公司
 */
function findSpecialRecommendationDetail(pageNum,pageSize){
	if(pageNum==null){
		pageNum=1;
	}
	if(pageSize==null){
		pageSize=20;
	}
	var param={id:id,pageNum:pageNum,pageSize:pageSize};
	$.axs("/betaInvest/speciality/findSpecialRecommendationDetail.do",param,false,function(data){
//		console.log(data);
		if(data.retCode=="0000"){
			var result=data.retData;
			//已关注的推荐
			var value=localStorage.getItem('follow_company');
			value=JSON.parse(value);
//			console.log(result)
			var pageNum=result.pageIndex;
			var pageSize=result.pageLimit;
			var totalCount=result.totalCount;
			$("#totalNum").html(totalCount);
			var list=result.list;
			var html='';
			for (var i = 0; i < list.length; i++) {
				var obj=list[i];
				html+='<tr>';
				html+='<td class="company_info ns_td_yw">';
				html+='<div class="compamy_logo fl" style="width:56px">';
				html+='<img src="/www/images/gs_logo.png" alt="" />';
				html+='</div>';
				html+='<div class="compamy_msg fl"style="width:250px">';
				//页面跳转
				html+='<a href="javascript:void(0);" class="on shuzi" onClick="toCompanyHomeHtml(\''+obj.stockCode+'\',\''+obj.stockName+'\',\'专辑详情\')">'+obj.stockName+'('+obj.stockCode+')</a>';
				html+='<span>'+(obj.firstName==undefined?"--":obj.firstName)+'>'+(obj.categoryName==undefined?"--":obj.categoryName)+'</span>';
				html+='</div>';
				html+='<div class="clr"></div>';
				html+='</td>';
				//data_red是红色，data_green是绿色
				html+='<td class="zyyew">'+(obj.mainBusiness==undefined?"--":obj.mainBusiness)+'</td>';
				var yingyeshouru=obj.yingyeshouru;
				if(yingyeshouru!=null&&yingyeshouru!=undefined&&yingyeshouru!=""){
					yingyeshouru=(yingyeshouru/10000000).toFixed(2);
				}else{
					yingyeshouru="--";
				}
				html+='<td class="shuzi">'+yingyeshouru+'</td>';
				var yingyezhengfu=obj.yingyezhengfu;
				if(yingyezhengfu!=null&&yingyezhengfu!=undefined&&yingyezhengfu!=""){
					yingyezhengfu=yingyezhengfu.toFixed(2);
				}else{
					yingyezhengfu="--";
				}
				if(yingyezhengfu>0){
					html+='<td class="shuzi data_red">'+yingyezhengfu+'</td>';
				}else if(yingyezhengfu<0){
					html+='<td class="shuzi data_green">'+yingyezhengfu+'</td>';
				}else{
					html+='<td class="shuzi">'+yingyezhengfu+'</td>';
				}
				var jinglirun=obj.jinglirun;
				if(jinglirun!=null&&jinglirun!=undefined&&jinglirun!=""){
					jinglirun=(jinglirun/10000).toFixed(2);
				}else{
					jinglirun="--";
				}
				if(jinglirun>0){
					html+='<td class="shuzi data_red">'+jinglirun+'</td>';
				}else if(jinglirun<0){
					html+='<td class="shuzi data_green">'+jinglirun+'</td>';
				}else{
					html+='<td class="shuzi">'+jinglirun+'</td>';
				}
				html+='<td>';
				if($.inArray(obj.stockCode,value)>-1){
					html +="<span class='gz_company on' onclick='updateFollow(this,\"company\")' data-followId='"+obj.stockCode+"'>关注</span>";
				}else{
					html +="<span class='gz_company' onclick='updateFollow(this,\"company\")'  data-followId='"+obj.stockCode+"'>关注</span>";
				}
				//对比样式
				var userId=localStorage.getItem("userId");
				var showName=localStorage.getItem(userId);
				if(showName!=null && showName!="" && showName!==undefined && showName.indexOf(obj.stockCode)>-1 && showName.indexOf(obj.stockName)>-1){
					html+='<a href="javascript:void(0);"  class="duib_company on" id="duibi_'+obj.stockCode+'" onclick="addComparisonStockClass(\''+obj.stockCode+'\',\''+obj.stockName+'\')">对比</a>';
				}else{
					html+='<a href="javascript:void(0);" class="duib_company"  id="duibi_'+obj.stockCode+'"  onclick="addComparisonStockClass(\''+obj.stockCode+'\',\''+obj.stockName+'\')">对比</a>';
				}
				html+='</td>';
				html+='</tr>';
			}
			$("#allData").html(html);
			
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
							findSpecialRecommendationDetail(pageNumber,size);
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

/**
 * 添加或删除对比
 * @param comparisonStockCode
 * @param comparisonStockName
 */
function addComparisonStockClass(comparisonStockCode,comparisonStockName){
	if($("#duibi_"+comparisonStockCode).hasClass("on")){
		removeComparisonStock(comparisonStockCode,comparisonStockName);
		$("#duibi_"+comparisonStockCode).removeClass("on");
	}else{
		if(addComparisonStock(comparisonStockCode,comparisonStockName)){
			$("#duibi_"+comparisonStockCode).addClass("on");
		}
	}
}

/**
 * 导出财务数据
 */
function exportAbumBetails(){
	//后台导出excel
	var paramArrayObject={};
	var paramArrayObjectArray=new Array();
	//标题
	var paramArrayObjectArrayObjectTitle={};
	paramArrayObjectArrayObjectTitle[1]="公司";
	paramArrayObjectArrayObjectTitle[2]="主营业务";
	paramArrayObjectArrayObjectTitle[3]="营业收入(亿元)";
	paramArrayObjectArrayObjectTitle[4]="收入增幅(%)";
	paramArrayObjectArrayObjectTitle[5]="净利润(万元)";
	paramArrayObjectArray.push(paramArrayObjectArrayObjectTitle);
	$("#allData").find("tr").each(function(index,item){
		var paramArrayObjectArrayObject={};
		paramArrayObjectArrayObject[1]=$(this).find("td").eq(0).text();
		paramArrayObjectArrayObject[2]=$(this).find("td").eq(1).text();
		paramArrayObjectArrayObject[3]=$(this).find("td").eq(2).text();
		paramArrayObjectArrayObject[4]=$(this).find("td").eq(3).text();
		paramArrayObjectArrayObject[5]=$(this).find("td").eq(4).text();
		paramArrayObjectArray.push(paramArrayObjectArrayObject);
	});
//	console.log(JSON.stringify(paramArrayObjectArray));
	if(paramArrayObjectArray==null || paramArrayObjectArray.length<=1){
		errorAlert("","请选择导出的数据");
		return false;
	}
	paramArrayObject[$("#name").text()]=paramArrayObjectArray;
//	console.log(JSON.stringify(paramArrayObject));
	methodExportExcel("特色专辑-"+$("#name").text(),paramArrayObject);
}