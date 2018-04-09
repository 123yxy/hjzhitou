$(function(){
	//计算div的高度
	var width=$(".album_content").width();
	var height=Math.floor(width/(355/230));
	var Pheight=Math.floor(width/(355/145));
	$(".task").css("height",height);
	$(".al_p_bj").css("height",Pheight);
	$(".al_p p").css("height",Pheight);
});
var id=getUrlParam("id");
$(function(){
	//查询所有分类
	findAllType();
	//查询特色推荐总数
	findSpecialRecommendationTitleTotal();
	//查询分页数据-默认20条
	findSpecialRecommendationTitle(id,null,null);
	
	var list=$(".selection_list").find("a");
	
	$(list).each(function(index,item){
		if($(item).attr("data-value")==id){
			$(item).addClass("on").siblings().removeClass("on");
//			findSpecialRecommendationTitle(id,null,null);
		}
	})
	//点击特色专辑的标签
	$(".selection_list").delegate(" a","click",function(){
		$(this).addClass("on").siblings().removeClass("on");
		var type=$(this).attr("data-value");
		if(type=="全部"){
			type=null;
		}
		//查询分页数据-默认20条
		findSpecialRecommendationTitle(type,null,null)
	});
	
	//点击筛选条件时全部显示高亮
	$(".sc_select em").on("mouseenter",function(){
		$(this).parent().find("i").eq(0).show();
	});
	$(".sc_select em").on("mouseleave",function(){
		$(this).parent().find("i").eq(0).hide();
	});
	//清楚按钮
	$(".sc_select").on("click",function(){
		$("#allTitle a").eq(0).addClass("on").siblings().removeClass("on");
		$(this).parent().find("i").eq(0).show();
		//查询分页数据-默认20条
		findSpecialRecommendationTitle(null,null,null)
	});
	$("#allData").delegate("div.album_content","click",function(){
		var id=$(this).attr("data-id");
		window.location.href="/security/albumBetails.html?id="+id;
	});
	//点击关注的图标时图标变成橙色
//	$(".album_collect").delegate("i","click",function(){
//		$(this).addClass("on");
//	})
	//鼠标经过名字时显示登陆
//	$("#nameHead").on("mouseenter",function(){
//		$(".user_down").slideDown();
//	})
//	$("#nameHead").on("mouseleave",function(){
//		$(".user_down").slideUp();
//	})
	
	
});


//鼠标经过公司信息时添加背景颜色
/**
 * 获取特色数据标签
 */
function findAllType(){
	$.axs("/betaStock/common/findWorkBook.do",{parentId:0,type:10,dataType:1},false,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			for(var i=0;i<result.length;i++){
				var obj=result[i];
				var html='<a href="javascript:void(0);"  data-value="'+obj.id+'">'+obj.nameCn+'</a>';
				$("#allTitle").append(html);
			}
			$("#allTitle").append('<div class="clr"></div>');
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

/**
 * 查询特色推荐总数
 */
function findSpecialRecommendationTitleTotal(){
	$.axs("/betaInvest/speciality/findSpecialRecommendationTitleTotal.do",null,false,function(data){
		if(data.retCode=="0000"){
			$("#allNum").text("("+data.retData+")");
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}
/**
 * 
 */
function findSpecialRecommendationTitle(type,pageNum,pageSize){
	$('#page').hide();
	if(pageNum==null){
		pageNum=1;
	}
	if(pageSize==null){
		pageSize=12;
	}
	if(pageNum==1){
		$("#page").remove();
		$(".album_collect").append('<div id="page" class="pages pagination " style="display: none;"></div>')
	}
	var param={type:type,pageNum:pageNum,pageSize:pageSize};
	$.axs("/betaInvest/speciality/findSpecialRecommendationTitle.do",param,false,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
//			console.log(result);
			var pageNum=result.pageIndex;
			var pageSize=result.pageLimit;
			var totalCount=result.totalCount;
			$("#totalNum").html(totalCount);
			var list=result.list;
			var html='';
			//已关注的公司
			var value=localStorage.getItem('follow_speciality');
			value=JSON.parse(value);
			for(var i=0;i<list.length;i++){
				var obj=list[i];
				html+='<div class="album_content fl" data-id="'+obj.id+'">';
				html+='<div class="task"></div>';
				html+='<div class="al_p">';
				var picUrl=obj.picUrl;
				if(picUrl=="" || picUrl==null || picUrl=="undefined"){
					picUrl="/www/images/tese_1.png";
				}
				html+='<a href="javascript:;"><img src="'+picUrl+'" alt="" /></a>';
				html+='<div class="al_p_bj">';
				var intro=obj.intro;
				if(intro==null || intro=="undefined"){
					intro="";
				}
				html+='<p>'+intro+'</p>';
				html+='</div>';
				html+='</div>';
				html+='<div class="event_introduction">';
				html+='<div class="even_inde">';
				//投资事件汇总
				html+='<h2><a href="javascript:void(0)">'+obj.name+'<em>('+obj.eventNum+')</em></a></h2>';
				if(obj.updateTime!=null && obj.updateTime!="" && obj.updateTime!="undefined"){
					html+='<span class="creat_time">更新时间：<em>'+obj.updateTime+'</em></span>';
				}else{
					html+='<span class="creat_time">创建时间：<em>'+obj.createTime+'</em></span>';
				}
				html+='<div class="shares">';
				if($.inArray((obj.id).toString(),value)>-1){
					html+='<span class="guanzhu fl on"><i></i><em>'+(obj.followNum==null?0:obj.followNum)+'</em><div class="clr"></div></span>';
				}else{
					html+='<span class="guanzhu fl"><i></i><em>'+(obj.followNum==null?0:obj.followNum)+'</em><div class="clr"></div></span>';
				}
				html+='<span class="read fl"><i></i><em>'+(obj.pageViews==null?0:obj.pageViews)+'</em><div class="clr"></div></span>';
				html+='<div class="clr"></div>';
				html+='</div>';
				html+='</div>';
				html+='<small></small>';
				html+='</div>';
				html+='</div>';
			}
			$("#allData").html(html);
			$("#allData").append('<div class="clr"></div>');
			
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
							findSpecialRecommendationTitle(type,pageNumber,size);
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
