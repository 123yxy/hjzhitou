//业务相关的公司----检索
$(function(){
	//判断获取的关键字不空时查询数据
	var findDatakeyWorld_yewu=getUrlParam("content");
	if(findDatakeyWorld_yewu==null || findDatakeyWorld_yewu=="" || findDatakeyWorld_yewu==undefined || findDatakeyWorld_yewu=="null" || findDatakeyWorld_yewu=="undefined"){
		//隐藏财务数据模块的DIV
		$("#content_xgyw").hide();
		blockDiv.content_xgyw=false;
		$("#changeValue").change();
		return false;
	}
	//加载更多
	$(".wj_btnMore").on("click",function(){
		var keyWorld=$(".wj_btnMore").attr("data-keyWorld");
		var pageNum=$(".wj_btnMore").attr("data-pageNum");
		var pageSize=$(".wj_btnMore").attr("data-pageSize");
		//查询数据
		findSearchBusiness(keyWorld,Number(pageNum)+1,pageSize);
	});
	//查询数据
	findSearchBusiness(findDatakeyWorld_yewu.split(",")[0],null,null);
});
/**
 * 查询业务相关的公司
 */
function findSearchBusiness(keyWorld,pageNum,pageSize){
	$(".rm_name").text(keyWorld);
	if(pageNum==null || pageNum=="" || pageNum==undefined){
		pageNum=1;
	}
	if(pageSize==null || pageSize=="" || pageSize==undefined){
		pageSize=10;
	}
	$(".wj_btnMore").attr("data-keyWorld",keyWorld);
	$(".wj_btnMore").attr("data-pageNum",pageNum);
	$(".wj_btnMore").attr("data-pageSize",pageSize);
	if(pageNum==1){//第一页初始化信息
		$("#searchBusinessTable").html('');
	}
	$(".loadingBox2").show();
	$.axs("/betaInvest/searchBusiness/findSearchBusiness.do",{keyWorld:keyWorld,pageNum:pageNum,pageSize:pageSize},true,function(data){
		if(data.retCode==0000){
			if(data.retData!=null && data.retData.list!=null && data.retData.list.length!=0){
				var page=data.retData;
				var pageIndex=page.pageIndex;
				var pageLimit=page.pageLimit;
				var totalCount=page.totalCount;
				var list=page.list;
				for (var i = 0; i < list.length; i++) {
					var result=list[i];
					var mainBusinessSituation=result.mainBusinessSituation==null?"":result.mainBusinessSituation;
					var replaceStr='<i class="relatedText">'+keyWorld+'</i>';
					
					var html='<tr>';
						html+='<td><a target="_blank" href="/businessDetails/newTBindex.html?stockCode='+result.stockCode+'&stockName='+result.stockName+'">'+result.stockName+'('+result.stockCode+')</a>';
						html+='</td>';
						if(result.stockBlock==""||result.stockBlock==null||result.stockBlock==undefined){
							result.stockBlock="--"
						}
						html+='<td>'+result.stockBlock+'</td>';
						if((result.totalValue=="" &&　result.totalValue!=0)|| result.totalValue==null || result.totalValue==undefined){
							result.totalValue="--";
						}
						html+='<td class="wj_tRight">'+result.totalValue+'</td>';
						if((result.peRatio==""&&result.peRatio!=0) || result.peRatio==null || result.peRatio==undefined){
							result.peRatio="--";
						}
						html+='<td>'+result.peRatio+'</td>';
						var zhuyingyewu=result.mainBusinessSituation==null?"":result.mainBusinessSituation;
						if(mainBusinessSituation==""||mainBusinessSituation==null ||mainBusinessSituation=="undefined" || mainBusinessSituation=="null"){
							html+='<td class="wj_tLeft" title="'+zhuyingyewu+'">--</td>';
						}else{
							if(mainBusinessSituation.length>=50){
								mainBusinessSituation=mainBusinessSituation.substring(0,48)+"..."
							}
							mainBusinessSituation=mainBusinessSituation.replace(new RegExp(keyWorld,'g'),replaceStr);
							html+='<td class="wj_tLeft" title="'+zhuyingyewu+'">'+mainBusinessSituation+'</td>';
						}
						
						html+='</tr>';//网络<i class="relatedText">游戏</i>（100.0%）
					$("#searchBusinessTable").append(html);
				}
//				console.log("pageNum:"+pageNum+";pageSize:"+pageSize+";totalCount"+totalCount);
//				console.log(pageNum*pageSize>=totalCount);
				//隐藏加载更多
				if(pageNum*pageSize>=totalCount){
					$(".wj_btnMore").hide();
				}
				blockDiv.content_xgyw=true;
			}else{
				if(pageNum==1){
					//隐藏财务数据模块的DIV
					$("#content_xgyw").hide();
					blockDiv.content_xgyw=false;
					$("#changeValue").change();
				}
			}
		}else{
			//隐藏财务数据模块的DIV
			$("#content_xgyw").hide();
			blockDiv.content_xgyw=false;
			$("#changeValue").change();
		}
		$(".loadingBox2").hide();
	});
	
}