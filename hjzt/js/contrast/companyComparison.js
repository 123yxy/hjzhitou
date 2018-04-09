var stockCodes=getUrlParam('stockCodes');
$(function(){
	//回跳
	var obj=localStorage.getItem("companyDuibiHtml");
	obj=JSON.parse(obj);
	var goBackName="发现公司";
	var goBackUrl="";
	if(obj!=null){
		 goBackName=obj.goBackName;
		 goBackUrl=obj.goBackUrl;
	}
	if(goBackUrl==null || goBackUrl=="" || goBackUrl=="undefined"){
		goBackUrl="/threeLibrary/discoveryCompany.html";
	}
	$("#goBackUrl").text(goBackName);
	$("#goBackUrl").on("click",function(){
		location.href=goBackUrl;
	});

	findCompanyComparison();

	//计算我公司对比页面的每个li的宽度
	var screWidth=document.body.clientWidth;
	var screHeight=($(window).height())-300;
	if(screWidth>1600){
		var ulWidth=Math.ceil(($(".com_comparison").width()-50)/4);
		$(".duibi_companys").css("width",ulWidth);
	}else{
		var ulWidth=Math.ceil(($(".com_comparison").width()-52)/4);
		$(".duibi_companys").css("width",ulWidth);
	}
	$(".duib_zanwu_shuju").css("height",screHeight);
	//点击添加按钮
	$(".zanwu_tub span").on("click",function(){
		$(".tmtc_new").show();
		$(".tianjia_tc").show();
	})
	
});

function findCompanyComparison(type){
	var codes=getAllStockCode();
	codes=codes.replace(/'/g,"");
	$.axs("/betaStock/companyComparison/findCompanyComparison.do","codes="+codes,true,function(data){
		if(data.retCode=="0000"){
			var result=data.retData;
			if(result==null || result==""||result==undefined){
				$(".duib_zanwu_shuju").show();
				$(".db_company").hide();
			}else{
				$(".duib_zanwu_shuju").hide();
				$(".db_company").show();
				$("#company_duibi").empty();
				$("#company_duibi").append('<li class="duibi_types" id="companyComparison"><ul><li></li><li>基本信息对比</li><li>融资信息对比</li><li>主营业务对比</li><li>行业对比</li></ul></li>');
				var html="";
				//console.log(result);
				$(result).each(function(index,item){
					html+='<li class="duibi_companys" id="'+item.stockCode+'_Div">';
					html+='<ul class="m_company">';
					html+='<li class="companys_name">';
					html+='<a href="javascript:void(0);" onClick=window.location="/businessDetails/newTBindex.html?stockCode='+item.stockCode+'&stockName='+item.stockName+'">'+item.stockName+'('+item.stockCode+')</a>';
					html+='<input type="hidden" value='+item.stockCode+'/>';
					html+='</li>';
					html+='<li class="company_time">';
					if(item.registrationDate==null||item.registrationDate==""||item.registrationDate==undefined){
						item.registrationDate="--";
					}
					html+='<span><em>成立时间：</em><i class="shuzi">'+item.registrationDate+'</i><div class="clr"></div></span>';
					if(item.stockDate==null||item.stockDate==""||item.stockDate==undefined){
						item.stockDate="--";
					}
					html+='<span><em>挂牌时间：</em><i class="shuzi">'+item.stockDate+'</i><div class="clr"></div></span>';
					var zhubqs=item.quanShang;
					if(item.quanShang==null||item.quanShang==""||item.quanShang==undefined){
						zhubqs="--";	
						item.quanShang="--";
					}else{
						if((item.quanShang).length>8){
							zhubqs=((item.quanShang).substring(0,7))+"..."
						}
					}
					
					html+='<span><em>主办券商：</em><i title='+item.quanShang+'>'+zhubqs+'</i><div class="clr"></div></span>';
					var lvsuo=item.lvSuo;
					if(item.lvSuo==null||item.lvSuo==""||item.lvSuo==undefined){
						item.lvSuo="--";
						lvsuo='--';
					}else{
						if((item.lvSuo).length>8){
							lvsuo=((item.lvSuo).substring(0,7))+"...";
						}
					}
					html+='<span><em>律所：</em><i title='+item.lvSuo+'>'+lvsuo+'</i><div class="clr"></div></span>';
					var kjs=item.huiJiSuo;
					if(item.huiJiSuo==null||item.huiJiSuo==""||item.huiJiSuo==undefined){
						kjs="--";
						item.huiJiSuo='--';
					}else{
						if((item.huiJiSuo).length>8){
							kjs=(item.huiJiSuo.substring(0,7))+"...";
						}
					}
					html+='<span><em>会计所：</em><i title='+item.huiJiSuo+'>'+kjs+'</i><div class="clr"></div></span>';
					if(item.state==null||item.state==""||item.state==undefined){
						item.state="--";
					}
					html+='<span><em>地区：</em><i>'+item.state+'</i><div class="clr"></div></span>';
					html+='</li>';
					html+='<li class="company_rzshu">';
					if(item.totalFinancing==null||item.totalFinancing==""||item.totalFinancing==undefined){
						item.totalFinancing="--";
					}else{
						item.totalFinancing=(item.totalFinancing).toFixed(2);
					}
					html+='<span><em>融资总额：</em><i class="shuzi">'+item.totalFinancing+'</i>万元<div class="clr"></div></span>';
					if(item.financingNum==null||item.financingNum==""||item.financingNum==undefined){
						item.financingNum="--";
					}
					html+='<span><em>融资次数：</em><i class="shuzi">'+item.financingNum+'</i>次<div class="clr"></div></span>';
					if(item.latestFinancingAmount==""||item.latestFinancingAmount==null||item.latestFinancingAmount==undefined){
						item.latestFinancingAmount="--";
					}else{
						item.latestFinancingAmount=(item.latestFinancingAmount).toFixed(2)
					}
					html+='<span><em>最近一笔融资：</em><i class="shuzi">'+item.latestFinancingAmount+'</i>万元<div class="clr"></div></span>';
					if(item.latestFinancingTime==null||item.latestFinancingTime==""||item.latestFinancingTime==undefined){
						item.latestFinancingTime="--";
					}
					html+='<span class="rongzi_time"><em class="shuzi">'+item.latestFinancingTime+'</em></span>';
					html+='</li>';
					html+='<li class="company_busniess">';
					if(item.mainBusinessIncome==""||item.mainBusinessIncome==null||item.mainBusinessIncome==undefined){
						item.mainBusinessIncome="--";
					}else{
						item.mainBusinessIncome=(item.mainBusinessIncome).toFixed(2);
					}
					html+='<span><em>主营业务收入：</em><i class="shuzi">'+item.mainBusinessIncome+'</i>亿元<div class="clr"></div></span>';
					var zhuying1=item.businessName1;
					if(item.businessName1==null||item.businessName1==""||item.businessName1==undefined){
						html+='<span><em></em><i class="shuzi"></i><div class="clr"></div></span>';
					}else{
						if((item.businessName1).length>6){
							item.businessName1=(item.businessName1).substring(0,5)+"...";
						}else{
							item.businessName1=item.businessName1;
						}
						if(item.businessNameRatio1==null ||item.businessNameRatio1==""||item.businessNameRatio1==undefined){
							item.businessNameRatio1="--";
							
						}
						html+='<span><em title="'+zhuying1+'">'+item.businessName1+'：</em><i class="shuzi">'+item.businessNameRatio1+'</i>%<div class="clr"></div></span>';	
					}
					var zhuying2=item.businessName2;
					if(item.businessName2==null||item.businessName2==""||item.businessName2==undefined){
						html+='<span><em></em><i class="shuzi"></i><div class="clr"></div></span>';
					}else{
						if((item.businessName2).length>6){
							item.businessName2=(item.businessName2).substring(0,5)+"...";
						}else{
							item.businessName2=item.businessName2;
						}
						if(item.businessNameRatio2==null ||item.businessNameRatio2==""||item.businessNameRatio2==undefined){
							item.businessNameRatio2="--";
						}
						html+='<span><em title="'+zhuying2+'">'+item.businessName2+'：</em><i class="shuzi">'+item.businessNameRatio2+'</i>%<div class="clr"></div></span>';	
					}
					var zhuying3=item.businessName3;
					if(item.businessName3==null||item.businessName3==""||item.businessName3==undefined){
						html+='<span><em></em><i class="shuzi"></i><div class="clr"></div></span>';
					}else{
						if((item.businessName3).length>6){
							item.businessName3=(item.businessName3).substring(0,5)+"...";
						}else{
							item.businessName3=item.businessName3;
						}
						if(item.businessNameRatio3==null ||item.businessNameRatio3==""||item.businessNameRatio3==undefined){
							item.businessNameRatio3="--";
						}
						html+='<span><em title="'+zhuying3+'">'+item.businessName3+'：</em><i class="shuzi">'+item.businessNameRatio3+'</i>%<div class="clr"></div></span>';	
					}
					//html+='<span><em>软件开发：</em><i class="shuzi">43.8</i>%<div class="clr"></div></span>';
					//html+='<span><em>专业测试：</em><i class="shuzi">46.8</i>%<div class="clr"></div></span>';
					//html+='<span><em>运维服务：</em><i class="shuzi">9.4</i>%<div class="clr"></div></span>';
					html+='</li>';
					html+='<li class="gs_hy_duibi">';
					var hy=item.industryName;
					if(item.industryName==null||item.industryName==""||item.industryName==undefined){
						item.industryName="--";
						hy='--';	
					}else{
						if((item.industryName).length>8){
							hy=(item.industryName).substring(0,7)+"...";
						}
					}
					html+='<span><em>所属行业：</em><i title="'+item.industryName+'">'+hy+'</i><div class="clr"></div></span>';
					
					if(item.industryCompanyNum==null||item.industryCompanyNum==""||item.industryCompanyNum==undefined){
						item.industryCompanyNum="--";
					}
					html+='<span><em>行业公司数：</em><i class="shuzi">'+item.industryCompanyNum+'</i>家<div class="clr"></div></span>';
					if(item.industryCompanyRanking==null||item.industryCompanyRanking==""||item.industryCompanyRanking==undefined){
						item.industryCompanyRanking="--";
					}
					html+='<span><em>公司排名：</em><i class="shuzi">'+item.industryCompanyRanking+'</i>名<div class="clr"></div></span>';
					if(item.industryHeat==""||item.industryHeat==null||item.industryHeat==undefined){
						item.industryHeat="--";
					}else{
						item.industryHeat=(item.industryHeat).toFixed(2);
					}
					var hangye=item.industryHeat;
					if(hangye=="--"){
						hangye=0;
					}else{
						hangye=item.industryHeat;
					}
					html+='<span class="hy_redu"><em>行业热度：</em><i class="on"><b style="width: '+hangye+'%;"></b></i><div class="clr"></div></span>';
					html+='<span class="hy_hots"><em class="shuzi">'+item.industryHeat+'</em>%</span>';
					html+='</li>';
					html+='<div class="clr"></div>';
					html+='</ul>';
					html+='</li>';
				})
				html+='<div class="clr"></div>';
				$("#company_duibi").append(html);
				//计算我公司对比页面的每个li的宽度
				var screWidth=document.body.clientWidth;
				if(screWidth>1600){
					var ulWidth=Math.ceil(($(".com_comparison").width()-50)/4);
					$(".duibi_companys").css("width",ulWidth);
				}else{
					var ulWidth=Math.ceil(($(".com_comparison").width()-52)/4);
					$(".duibi_companys").css("width",ulWidth);
				}
			}
		}else{
			errorAlert(data.retCode,data.retMsg);
		}
	})
}
