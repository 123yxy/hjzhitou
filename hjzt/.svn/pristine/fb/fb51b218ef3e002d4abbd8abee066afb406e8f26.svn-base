$(document).ready(function(){
	
//	左边导航star
//	var left_nav='<div class="left_nav">'; 
//		left_nav+='<div class="left_top_image">';
//		left_nav+='<a href="/index.html"><img src="/saasBeta/images/logo2.png" alt="汇金智投"></a></div>';
//      left_nav+='<div class="clr"></div>';
//		left_nav+='<div class="left_list"><ul>';
//		 var flpath = window.location.pathname;
//	var fllipth = flpath.substring(flpath.indexOf("/")+1,flpath.lastIndexOf("/"));
//	if(fllipth=="threeLibrary"){
	//		资讯数据
//		left_nav+='<li class="left_newsanb hover" onclick="javascript:window.location.href=\'/threeLibrary/stockQuotes.html\'">';
//		left_nav+='<a href="/threeLibrary/stockQuotes.html" >三板市场</a></li>';
//		left_nav+='<li class="left_newgongs" onclick="javascript:window.location.href=\'/threeLibrary/company.html\'">';
//		left_nav+='<a href="/threeLibrary/company.html" >公司</a></li>';
//		left_nav+='<li class="left_newtzr" onclick="javascript:window.location.href=\'/threeLibrary/Investor.html\'">';
//		left_nav+='<a href="/threeLibrary/Investor.html" >投资人</a></li>';
//		left_nav+='<li class="left_newzjjg" onclick="javascript:window.location.href=\'/threeLibrary/agency.html\'">';
//		left_nav+='<a href="/threeLibrary/agency.html">中介机构</a></li>';
//		left_nav+='<li class="left_newtrzsj" onclick="javascript:window.location.href=\'/threeLibrary/investmentExpress.html\'">';
//		left_nav+='<a href="/threeLibrary/investmentExpress.html" >投融资事件</a></li>';
//	
//	}
//	if(fllipth=="security"){
	//		证券管理
//		left_nav+='<li class="left_newzxg" onclick="javascript:window.location.href=\'/threeLibrary/investmentExpress.html\'">';
//		left_nav+='<a href="/security/myPreferredStock.html" >自选股</a></li>';
//		left_nav+='<li class="left_newzxg" onclick="javascript:window.location.href=\'/threeLibrary/investmentExpress.html\'">';
//		left_nav+='<a href="/security/stockAlbum.html" >股票专辑</a></li>';
//	}
//	if(fllipth=="dataAnalysis"){
	//		数据分析
//		left_nav+='<li class="left_newrzfx" onclick="javascript:window.location.href=\'/dataAnalysis/financingAnalysis.html\'">';
//		left_nav+='<a href="/dataAnalysis/financingAnalysis.html" >融资分析</a></li>';
//		left_nav+='<li class="left_newtrgxfx" onclick="javascript:window.location.href=\'/threeLibrary/investmentExpress.html\'">';
//		left_nav+='<a href="/threeLibrary/investmentExpress.html" >投融关系分析</a></li>';
//		left_nav+='<li class="left_newhyphfx" onclick="javascript:window.location.href=\'/dataAnalysis/stockRanking.html\'">';
//		left_nav+='<a href="/dataAnalysis/stockRanking.html" >行业排行分析</a></li>';
//		left_nav+='<li class="left_newdyfx" onclick="javascript:window.location.href=\'/dataAnalysis/companyQuotation.html\'">';
//		left_nav+='<a href="/dataAnalysis/companyQuotation.html" >地域分析</a></li>';
//		
//	}
	
//		left_nav+='<div class="clr"></div>';
//		left_nav+='</ul>';
//      left_nav+='</div>';
//		left_nav+='<div class="hexagon" id="hexagon"><img src="/saasBeta/images/icon/hexa.png"/></div></div>';
//		$("body").prepend(left_nav);
//		urlPa()
//	左边导航end

	//新的左侧菜单
	
	var left_nav='<div class="left_nav">'; 
		left_nav+='<div class="left_top_image">';
		left_nav+='<a href="/index.html"><img src="/saasBeta/images/Image/Index/logo.png" alt="汇金智投"></a></div>';
        left_nav+='<div class="clr"></div>';
        left_nav+='<div class="left_list">';
		left_nav+='<ul class="new_left">';
		var flpath=window.location.pathname;
		var fillPath=flpath.split("/");
		//console.log(fillPath);
		if(fillPath[1]=="threeLibrary" || fillPath[1]=="xym"){

		//资讯数据
		left_nav+='<li title="三板市场" class="zixun_sanbanshic" onclick="javascript:window.location.href=\'/threeLibrary/stockQuotes.html\'">';
		left_nav+='<i></i>';
		left_nav+='<span>三板市场</span>';
		left_nav+='<b></b>';
		left_nav+='</li>';
		left_nav += '<li title="A股" class="Astock" onclick="window.location.href=\'/xym/rz.html\'">';
		left_nav += '<i class="fa fa-bar-chart" aria-hidden="true"></i>';
		left_nav += '<span>A股</span>';
		left_nav += '<b></b>';
		left_nav += '</li>';
		left_nav += '<li title="公司" class="zixun_gongsi" onclick="window.location.href=\'/threeLibrary/company.html\'">';
		left_nav += '<i></i>';
		left_nav += '<span>公司</span>';
		left_nav += '<b></b>';
		left_nav += '</li>';
//		left_nav += '<li title="投资人" class="zixun_touziren" onclick="window.location.href=\'/threeLibrary/Investor.html\'">';
//		left_nav += '<i></i>';
//		left_nav += '<span>投资人</span>';
//		left_nav += '<b></b>';
//		left_nav += '</li>';
		left_nav += '<li title="中介机构" class="zixun_zjjg" onclick="window.location.href=\'/threeLibrary/agency.html\'">';
		left_nav += '<i></i>';
		left_nav += '<span>中介机构</span>';
//		left_nav += '<b></b>';
		left_nav += '</li>';
//		left_nav += '<li title="投融资事件" class="zixun_trz" onclick="window.location.href=\'/threeLibrary/investmentExpress.html\'">';
//		left_nav += '<i></i>';
//		left_nav += '<span>投融资事件</span>';
//		left_nav += '<b></b>';
//		left_nav += '</li>';
	}
	else if (fillPath[1] == "security") {

		//证券管理
		left_nav+='<li title="自选股" class="zhengq_zxg" onclick="window.location.href=\'/security/myPreferredStock.html\'">';
		left_nav+='<i></i>';
		left_nav+='<span>自选股</span>';
		left_nav+='<b></b>';
		left_nav+='</li>';
		left_nav+='<li title="股票专辑" class="zhengq_gpzj" onclick="window.location.href=\'/security/stockAlbum.html\'">';
		left_nav+='<i></i>';
		left_nav+='<span>股票专辑</span>';
		//left_nav+='<b></b>';
		left_nav+='</li>';
		}
		else if(fillPath[1]=="dataAnalysis"){

		//数据分析
		left_nav+='<li title="融资分析" class="shuj_fenxi" onclick="window.location.href=\'/dataAnalysis/financingAnalysis.html\'">';
		left_nav+='<i></i>';
		left_nav+='<span>融资分析</span>';
		left_nav+='<b></b>';
		left_nav+='</li>';
		left_nav+='<li title="投融关系分析" class="shuj_tourong" onclick="window.location.href=\'/dataAnalysis/financingRelationship.html\'">';
		left_nav+='<i></i>';
		left_nav+='<span>投融关系分析</span>';
		left_nav+='<b></b>';
		left_nav+='</li>';
		left_nav+='<li title="行业排行分析" class="shuj_hangye" onclick="window.location.href=\'/dataAnalysis/stockRankings.html\'">';
		left_nav+='<i></i>';
		left_nav+='<span>行业排行分析</span>';
		left_nav+='<b></b>';
		left_nav+='</li>';
		left_nav+='<li title="地域分析" class="shuj_diqu" onclick="window.location.href=\'/dataAnalysis/companyQuotation.html\'">';
		left_nav+='<i></i>';
		left_nav+='<span>地域分析</span>';
		//left_nav+='<b></b>';
		left_nav+='</li>';
		}
		else if(fillPath[1]=="myResearch"){
		left_nav+='<li title="研究报告" class="yanjiu_bg" onclick="window.location.href=\'/myResearch/researchReport.html\'">';
		left_nav+='<i></i>';
		left_nav+='<span>研究报告</span>';
		left_nav+='<b></b>';
		left_nav+='</li>';
		left_nav+='<li title="研究图表"  class="yanjiu_tb" onclick="window.location.href=\'/myResearch/researchChart.html\'">';
		left_nav+='<i></i>';
		left_nav+='<span>研究图表</span>';
		left_nav += '<b></b>';
		left_nav+='</li>';
		left_nav+='<li title="我的云盘"  class="yanjiu_yp" onclick="window.location.href=\'/myResearch/myResearch.html\'">';
		left_nav+='<i></i>';
		left_nav+='<span>我的云盘</span>';
		left_nav+='</li>';
		}
		left_nav+='</ul>';
		left_nav+='</div>';
		left_nav+='<div class="hexagon" id="hexagon"><img src="/saasBeta/images/icon/hexa.png"/></div>';
        left_nav+='</div>';
		$("body").prepend(left_nav);
		if(fillPath[3]=="multidStockTrendComparison.html"||fillPath[3]=="multidStockRankingAnalysis.html"){
			$(".left_nav").append(left_nav);
		}
		//左侧导航高亮
		urlPa();
		
		//行业选择点击下拉
		$(".r_select span").on("click",function(){
			if($(this).hasClass("i")){
				$(this).siblings(".r_industry_sele").slideUp();
				$(this).removeClass("i");
			}else{
			$(this).siblings(".r_industry_sele").slideDown();
			$(this).addClass("i");
			}
		});
		
		//行业选择 全选功能
		$("#checkAll").change(function() { 
		 if ($(this).prop("checked"))
		  { 
			$(".choo").prop("checked", true); 
			} else {
			$(".choo").prop("checked", false);
		} 
		var innum = document.getElementsByClassName("choo");
			var checsize =0 ;
			for(var i=0;i<innum.length;i++){
				if(innum[i].checked){
					checsize++;
				}
			}
			$("#che_yx").empty();
			$("#che_yx").html("(" +checsize+ ")");
		});
		
		$(".map_nav ul li i").on("click",function(){
			if($(this).siblings("ul").hasClass("on")){
			$(this).siblings("ul").slideUp();
			$(this).siblings("ul").removeClass("on");
			
		}else{
			$(this).siblings("ul").slideDown();
			$(this).parent().siblings().find("ul").slideUp();
			$(this).parent().siblings().find("ul").removeClass("on");
			$(this).parent().siblings().removeClass("hover");
			$(this).parent().addClass("hover");
			$(this).siblings("ul").addClass("on");
		}
		});
});

//侧导航高亮处理
function urlPa(){
    var urlpath = window.location.pathname;
	//var lipth = urlpath.substring(urlpath.lastIndexOf("/")+1,urlpath.lastIndexOf("."));
	var lipth=urlpath.split("/")[2];
	//console.log(lipth);
//	三板市场
	if(lipth=="stockQuotes.html"||lipth=="monthlyMarket.html"||lipth=="quotation.html"||lipth=="listedCompaniesToListed.html"||lipth=="marketMakingTransfer.html"||lipth=="agreementTransfer.html"||lipth=="newsprivatePlacement.html"){
		$(".left_list ul li").removeClass("on");
		$(".left_list ul li.zixun_sanbanshic").addClass("on");
		return false;
	}
//	公司
	if(lipth=="company.html"){
		$(".left_list ul li").removeClass("on");
		$(".left_list ul li.zixun_gongsi").addClass("on");
		return false;
	}
//	投资人
	if(lipth=="Investor.html"){
		$(".left_list ul li").removeClass("on");
		$(".left_list ul li.zixun_touziren").addClass("on");
		return false;
	}
	//	中介结构
	if(lipth=="agency.html"){
		$(".left_list ul li").removeClass("on");
		$(".left_list ul li.zixun_zjjg").addClass("on");
		return false;
	}
	// 投融资事件
	if(lipth=="investmentExpress.html"||lipth=="investmentMerger.html"||lipth=="signOut.html"){
		$(".left_list ul li").removeClass("on");
		$(".left_list ul li.zixun_trz").addClass("on");
		return false;
	}
	//	自选股
	if(lipth=="myPreferredStock.html"){
		$(".left_list ul li").removeClass("on");
		$(".left_list ul li.zhengq_zxg").addClass("on");
		return false;
	}
	//	股票专辑
	if(lipth=="stockAlbum.html"){
		$(".left_list ul li").removeClass("on");
		$(".left_list ul li.zhengq_gpzj").addClass("on");
		return false;
	}
	
	//	投融资事件
	if(lipth=="investmentExpress.html"){
		$(".left_list ul li").removeClass("on");
		$(".left_list ul li.shuj_tourong").addClass("on");
		return false;
	}
	//投融资关系
	if(lipth=="financingRelationship.html"){
		$(".left_list ul li").removeClass("on");
		$(".left_list ul li.shuj_tourong").addClass("on");
		return false;
	}
	//	融资分析
	if(lipth=="financingAnalysis.html"){
		$(".left_list ul li").removeClass("on");
		$(".left_list ul li.shuj_fenxi").addClass("on");
		return false;
	}
	//	行业排行分析
	if(lipth=="stockRankings.html"){
		$(".left_list ul li").removeClass("hover");
		$(".left_list ul li.shuj_hangye").addClass("on");
		return false;
	}
	//地域分析
	if(lipth=="companyTransaction.html"||lipth=="companyMap.html"||lipth=="companyQuotation.html"){
		$(".left_list ul li").removeClass("hover");
		$(".left_list ul li.shuj_diqu").addClass("on");
		return false;
	}
	//研究报告
	if(lipth=="researchReport.html"||lipth=="editReport.html"){
		$(".left_list ul li").removeClass("hover");
		$(".left_list ul li.yanjiu_bg").addClass("on");
		return false;
	}
	//研究图表
	if(lipth=="researchChart.html"){
        $(".left_list ul li").removeClass("hover");
        $(".left_list ul li.yanjiu_tb").addClass("on");
        return false;
    }
    //我的云盘
    if(lipth=="myResearch.html"){
        $(".left_list ul li").removeClass("hover");
        $(".left_list ul li.yanjiu_yp").addClass("on");
        return false;
    }

    //A股
	if (lipth == "rz.html") {
		$(".left_list ul li").removeClass("on");
		$(".left_list ul li.Astock").addClass("on");
		return false;
	}
	
}