$(function(){
	


$(".search_tab li").click(function(){
    $(".serach_info_box").hide();
    $(this).addClass("on").siblings().removeClass("on");
    if($(this)!==0){
        $("body").css("background","#f3f6f9");
        $(".search_nav").css("background","#fff");
        $(".wj_searchTable thead").css("background","#519bdb");
        $(".serach_info_box").addClass("serach_info_box_active");
        $(".gjj_gongg_list").css("height","auto");
        $(".gjj_yb_list").css("height","auto");
        $(".gjj_gongg_list").css("height","auto");
    }
});
$(".search_tab li#tab_all").click(function(){
    $(".list_content").css("height","420px");
    $(".serach_info_box").show();
    $(".gg_totals").css("display","none");
    $(".paixu_types").css("display","none");
    $(".wj_searchTable thead").css("background","#7b9bb6");
    $(".wj_relatedCom").css("max-height","345px");
    $(".gjj_gongg_list").css("max-height","412px");
    $(".list_content").css("max-height","388px");
    $(".gjj_yb_list").css("max-height","486px");
    $(".search_nav").css("background","#fff");
    $("body").css("background","#f3f7fa");
    $(".serach_info_box").removeClass("serach_info_box_active");
    $(".search_tips").show();
    console.log("tab_all");
    var qmStockCode = getUrlParam("stockcode");

    // A股仅显示三部分
    if(!isXSBCompany(qmStockCode))
        {
            window.location.reload();
            console.log("A股:"+$("#content_all").css("display"));
            $("#content_all").css("display","block");
            $("#content_all").removeClass("serach_info_box").addClass("serach_info_box");
            $("#content_gsgk").hide();
            $("#content_sbgs").hide();
            $("#content_xw").hide();
            $("#content_gg").hide();
            $("#content_yb").hide();
    }
//  $(".search_tips p:eq(0)").html("用时:<em id='totalTime'>"+yanBaoqtime+"</em>秒");//搜索研报的总时间
//  $(".search_tips p:eq(1)").html("搜索结果:<em id='totalCount'>"+totalCount+"</em>条");//研报总条数
    var flag=0;
   	$.each(blockDiv,function(key,value){
   		if(!value){
   			$("#"+key).hide();
   			flag++;
   		}
   	})
   	var content=getUrlParam("content");
   	if(flag==12){
		$("#none_datas").show();
		$("#no_data_titles").text(content);
		$("#data_name").text(content);
//		$("#tab_data").hide();
//		$("#tab_yb").hide();
//		$("#tab_xw").hide();
//		$("#tab_gg").hide();
//		$("#tab_gx").hide();
	}else{
		$("#none_datas").hide();
	}
	var countTime=0;
	var totalcount=0;
	$(".search_tab li").each(function(index,item){
		if($(item).attr("data-time")!=null && $(item).attr("data-count")!=null){
			countTime+=Number($(item).attr("data-time"));
			totalcount+=Number($(item).attr("data-count"));
		}
	})
	$("#totalTime").text(countTime);
	$("#totalCount").text((totalcount == undefined ? 0 : totalcount));
});
$(".search_tab li#tab_data").click(function(){
	window.location.href="/businessDetails/financialData.html?stockCode="+qmStockCode+"&stockName="+content.split(",")[0];
//	if(!blockDiv.content_data){
//		$(".xiangguanshuju").find("div.wj_dataNone").remove();
//		
//		var div='<div class="wj_dataNone">未检索到“<span>'+($("#shujuxiangguanKey").text() == undefined ? "--" : $("#shujuxiangguanKey").text())+'</span>”相关数据</div>';
//		$(".xiangguanshuju").append(div);
//		$("#wj_dataCom").hide();
//		$(".wj_btnMoreWrap").hide();
//	}
//	$("#content_data").show();
////	$(".search_tips p:eq(0)").html("用时:<em>"+$("#tab_data").attr("time")+"</em>秒");//搜索研报的总时间
////	$(".search_tips p:eq(1)").html("搜索结果:<em>"+$("#tab_data").attr("totalCount")+"</em>条");//研报总条数
//
//	if($("#tab_data").attr("data-time")==undefined || $("#tab_data").attr("data-time")==null){
//  	$("#totalTime").text("0");
//  }else{
//  	$("#totalTime").text($("#tab_data").attr("data-time"));
//  }
//	
//	if($("#tab_data").attr("data-count")==undefined ||$("#tab_data").attr("data-count")==null){
//		$("#totalCount").text("0");
//	}else{
//		$("#totalCount").text($("#tab_data").attr("data-count"));
//	}
//  $(".search_tips").show();
//  $("#wj_dataCom").css("height","auto");
});
$(".search_tab li#tab_yb").click(function(){
    $("#content_yb").show();
    $(".list_content").css("height","auto");
    $(".gg_totals").css("display","inline-block");
    $(".paixu_types").css("display","inline-block");
    $(".search_tips").show();
    if($("#tab_yb").attr("data-time")==undefined || $("#tab_yb").attr("data-time")==null){
    	$("#totalTime").text("0");
    }else{
    	$("#totalTime").text($("#tab_yb").attr("data-time"));
    }
    if($("#tab_yb").attr("data-count")==undefined ||$("#tab_yb").attr("data-count")==null){
		$("#totalCount").text("0");
	}else{
		$("#totalCount").text($("#tab_yb").attr("data-count"));
	}  
	$("body").scrollTop(0);
//  $(".search_tips p:eq(0)").html("用时:<em>"+yanBaoqtime+"</em>秒");//搜索研报的总时间
//  $(".search_tips p:eq(1)").html("搜索结果:<em>"+yanBaoTotal+"</em>条");//研报总条数
});
$(".search_tab li#tab_xw").click(function(){
    $("#content_xw").show();
    $(".list_content").css("height","auto");
    $(".gg_totals").css("display","inline-block");
    $(".paixu_types").css("display","inline-block");
    $(".search_tips").show();
    if($("#tab_xw").attr("data-time")==undefined || $("#tab_xw").attr("data-time")==null){
    	$("#totalTime").text("0");
    }else{
    	$("#totalTime").text($("#tab_xw").attr("data-time"));
    }
    if($("#tab_xw").attr("data-count")==undefined ||$("#tab_xw").attr("data-count")==null){
		$("#totalCount").text("0");
	}else{
		$("#totalCount").text($("#tab_xw").attr("data-count"));
	}
	$("body").scrollTop(0);
//  $(".search_tips p:eq(0)").html("用时:<em>"+newsqtime+"</em>秒");//搜索研报的总时间
//  $(".search_tips p:eq(1)").html("搜索结果:<em>"+newsTotal+"</em>条");//研报总条数
});
$(".search_tab li#tab_gg").click(function(){
    $("#content_gg").show();
    $(".gjj_gongg_list").css("height","auto");
    $(".gg_totals").css("display","inline-block");
    $(".paixu_types").css("display","inline-block");
    $(".search_tips").show();
    
    if($("#tab_gg").attr("data-time")==undefined || $("#tab_gg").attr("data-time")==null){
    	$("#totalTime").text("0");
    }else{
    	$("#totalTime").text($("#tab_gg").attr("data-time"));
    }
     if($("#tab_gg").attr("data-count")==undefined ||$("#tab_gg").attr("data-count")==null){
		$("#totalCount").text("0");
	}else{
		$("#totalCount").text($("#tab_gg").attr("data-count"));
	}
	$("body").scrollTop(0);
//  $(".search_tips p:eq(0)").html("用时:<em>"+gongGaoqtime+"</em>秒");//搜索研报的总时间
//  $(".search_tips p:eq(1)").html("搜索结果:<em>"+gongGaoTotal+"</em>条");//研报总条数
});
$(".search_tab li#tab_gx").click(function(){
	$(".search_tips").hide();
    $("#content_gxt").show();
   if($("#main").find("g").length<=0){
   		var div='<div class="wj_dataNone">未检索到“<span>'+($("#topSearch").val() == undefined ? "--" : $("#topSearch").val())+'</span>”相关关系图</div>';
   		$("#main").html(div);
   		$(".mao-toolbar").hide();
   		$(".mao_length").hide();
   		$(".gxt_time").hide();
   }

});

})


