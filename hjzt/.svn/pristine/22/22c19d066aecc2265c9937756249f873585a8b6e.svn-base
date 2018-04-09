$(function(){
//	toLogin();
///	findUserMsg();
//	findFollow();
	//用户关注的数据
//	findUserAttention();
	//所有行业
//	findCategory();
	//用户关注的行业以及使用目的
//	findUserIndustry();
	//点击不同的类型显示时显示不同的内容
	$(".top span").on("click",function() {
		var Val=$(this).find("i").text();
		$(this).addClass('on').siblings().removeClass("on");
		if(Val=="公司"){
			$(".gongsi").show();
			$(".zhuanji").hide();
			$(".zhongjie").hide();
			$(".touzr").hide();
			$(".no_icon").find("i").removeClass();
			$(".no_icon").find("i").addClass("gongsi_icon");
			$("#goto").prev().text("没有关注公司");
			$("#goto").attr("href","/threeLibrary/company.html");
			if($("#companyDataNum").text()!=0){
				$(".no_content").hide();
			}else{
				$(".no_content").show();
			}
		}else if(Val=="专辑"){
			$(".gongsi").hide();
			$(".zhuanji").show();
			$(".zhongjie").hide();
			$(".touzr").hide();
			$(".no_icon").find("i").removeClass();
			$(".no_icon").find("i").addClass("zhuanji_icon");
			$("#goto").prev().text("没有关注专辑");
			$("#goto").attr("href","/security/stockAlbum.html");
			if($("#specialDataNum").text()!=0){
				$(".no_content").hide();
			}else{
				$(".no_content").show();
			}
		}else if(Val=="中介"){
			$(".gongsi").hide();
			$(".zhuanji").hide();
			$(".zhongjie").show();
			$(".touzr").hide();
			$(".no_icon").find("i").removeClass();
			$(".no_icon").find("i").addClass("zhongjie_icon");
			$("#goto").prev().text("没有关注中介");
			$("#goto").attr("href","/threeLibrary/agency.html");
			if($("#institutionsDataNum").text()!=0){
				$(".no_content").hide();
			}else{
				$(".no_content").show();
			}
		}else if(Val=="投资人"){
			$(".gongsi").hide();
			$(".zhuanji").hide();
			$(".zhongjie").hide();
			$(".touzr").show();
			$(".no_icon").find("i").removeClass();
			$(".no_icon").find("i").addClass("touziren_icon");
			$("#goto").prev().text("没有关注投资人");
			$("#goto").attr("href","/threeLibrary/Investor.html");
			if($("#investorDataNum").text()!=0){
				$(".no_content").hide();
			}else{
				$(".no_content").show();
			}
		}
	})
	//点击跳转
	$(".no_icon").on("click",function(){
		var value='';
		$(".gz_types>.top>span").each(function(index,item){
			if($(item).hasClass("on")){
				value=$(item).find("i").text();
			}
		})
		if(value=="公司"){
//			alert();
			window.open("/threeLibrary/company.html");
		}else if(value=="专辑"){
			window.open("/security/stockAlbum.html");
		}
		else if(value=="中介"){
			window.open("/threeLibrary/agency.html");
		}
		else if(value=="投资人"){
			window.open("/threeLibrary/Investor.html");
		}
	})
	//点击取消关注的时候删除整条内容
	$(".qxgz span").on("click",function(){
		$.zmAlert("已取消关注");
		$(this).parent().parent().remove();
		var alength=localStorage.getItem("follow_company");
		alength=JSON.parse(alength).length;
		$("#companyDataNum").text(alength);
		var blength=localStorage.getItem("follow_intermediary");
		blength=JSON.parse(blength).length;
		$("#institutionsDataNum").text(blength);
		var clength=localStorage.getItem("follow_investor");
		clength=JSON.parse(clength).length;
		$("#investorDataNum").text(clength);
		var dlength=localStorage.getItem("follow_speciality");
		dlength=JSON.parse(dlength).length;
		$("#specialDataNum").text(dlength);
		var thisTypes=$(".top").find("span");
		var liLenght=$(this).parents(".public_types").find("li").length;
		
		$(thisTypes).each(function(index,item){
			if($(item).hasClass("on")){
				$(item).click();
//				if($(item).find("i").text()=="公司"){
//					$(".no_icon i").addClass("gongsi_icon");
//				}
			}
		});
	});
})


/**
 * 查询所有行业
 */
var mapId=[];
var mapName=[];
function findCategory(){
	$.axs("/betaStock/btCategory/findBtCategory.do",null,false,function(data){
		if(data.retCode=="0000"){
			//console.log(data);
			var result = data.retData;
			if(result==null){
				return false;
			}
			for (var i = 0; i < result.length; i++) {
				var obj=result[i];
				mapId[i]= obj.categoryId;
				mapName[i]= obj.categoryName;
			}
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
	
}
/**
 * 查询用户信息,获取用户关注的行业
 * 判断是否进行弹窗提示
 */
function findUserIndustry(){
	$.axs("/betaStock/btUserIndustry/findBtUserIndustry.do",null,false,function(data){
		//console.log(data);
		if(data.retCode=="0000"){
			//console.log(data);
			var result = data.retData;
			var industriesname="";
			if(result.industries != null && result.industries != "" && result.industries != undefined){
				var industries=result.industries;
				var industriesArray=industries.split(",");
				for (var i = 0; i < industriesArray.length; i++) {
					while(industriesArray[i].indexOf("'")>-1){
						industriesArray[i]=industriesArray[i].replace("'","");
					}
					var index=$.inArray(industriesArray[i],mapId);
					industriesname+=mapName[index]+",";
				}
				industriesname=industriesname.substring(0,industriesname.length-1);
			}
			$("#focusArea").text(industriesname == "" ? "--" : industriesname);
			
			var goals=(result.goals == null ? "--" : (result.goals));
			while(goals.indexOf("'")>-1){
				goals=goals.replace("'","");
			}
			$("#purpose").text(goals);
//			if(result==null || result=="" || result=="undefined" || result=="null"){
//				$(".select_hy").show();
//				$(".tmtc_new2").show();
//				$("body,html").css("overflow","hidden");
//				return false;
//			}
//			//关注行业
//			var focusAreaS=result.industries;//用户关注的行业id
//			var focusObjective=result.goals;
//			var guanzHy=[];//关注的行业
//			if(focusAreaS!=null && focusAreaS!="" && focusAreaS!="undefined"){
//				//给已经关注过的行业添加样式
//		 		$("#xuanz_hy").find("div.hy_public").each(function(index,items){
//		 			var autoid=$(items).find("span").attr("data-autoid");
//		   			if(focusAreaS.indexOf(autoid)>-1){
//		   				$(items).find("em").addClass("on");
//		   				$(items).find(".hy_icons").find("i").addClass("on");
//		   				guanzHy[guanzHy.length]=$(items).attr("title");
//		   			}
//		     	});
//		     	guanzHy=guanzHy.join(",");
//		     	$("#focusArea").text(guanzHy);
//			}
//			var selectObj=[];
//			if(focusObjective!=null && focusObjective!="" && focusObjective!=undefined){
//				//给选择的目的添加样式
//				$("#c_modify a").each(function(index,item){
//					var goal=$(item).text();
//					if(focusObjective.indexOf(goal)>-1){
//						$(item).addClass("on");
//						selectObj[selectObj.length]=goal;
//					}
//				})
//				
//				selectObj=selectObj.join(",");
//				$("#purpose").text(selectObj);
//				
//			}
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}
/**
 * 查询用户信息
 */
function findUserMsg(){
	$.axs("/user/user/findUser.do",null,true,function(data){
		var result=data.retData;
		if(data.retCode=='0000'){
			if(result==null){
				return false;
			}
			$("#businessCardUrl").attr("src", ((result.businessCardUrl == null || result.businessCardUrl == "") ? "/www/images/tx.png" : result.businessCardUrl));
			$("#userName").text((result.userName == null || result.userName == "") ? (result.phone) : (result.userName));
			$("#authentication").text(result.authentication == 1 ? "已认证" : "未认证");
			$("#sex").text(result.sex == null ? "--" : (result.sex));
			$("#region").text(result.region == null ? "--" : (result.region));
			
			$("#position").text(((result.companyName == null || result.companyName == "") ? "--" : (result.companyName)) + "," + (result.position == null ? "--" : (result.position)));
//			$("#focusArea").text(result.focusArea == null ? "--" : (result.focusArea));
//			$("#purpose").text(result.purpose == null ? "--" : (result.purpose));
			$("#signature").text(result.signature);
			if(result.weChatOpenId == null){
				$("#weiXin").hide();
			}
			if(result.weiBoOpenId == null){
				$("#weiBo").hide();
			}
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

/**
 * 查询所有已关注过的东西
 */
function findFollow(){
	$.axs("/betaStock/redis/findWwwFollow.do",null,false,function(data){
		if(data.retCode=="0000"){
			var map=data.retData;
			$.each(map,function(key,value){
				var localStorageKey='follow_'+key;
				var localStorageValue=new Array();
				for (var i = 0; i < value.length; i++) {
					var obj=value[i];
					localStorageValue.push(obj.followId);
				}
				localStorage.setItem(localStorageKey,JSON.stringify(localStorageValue));
			});
		}
	});
}
/**
 * 查询用户关注的信息
 */
/*function findUserAttention(){
	$.axs("/betaStock/personInfo/findUserAttention.do",null,false,function(data){
		if(data.retCode=='0000'){
			var result=data.retData;
			if(result==null){
				return false;
			}
			//总数
			$("#totalNum").text(result.totalNum);
			//关注的公司
			$("#companyDataNum").text(result.companyDataNum);
			var companyData=result.companyData;
			var companyHtml=getCompanyDataHtml(companyData);
			$("#companyData").html(companyHtml);
			if(companyData!=null && companyData.length!=0){
				$(".no_content").hide();
			}
			//关注的特色推荐
			$("#specialDataNum").text(result.specialDataNum);
			var specialData=result.specialData;
			var specialHtml=getSpecialDataHtml(specialData);
			$("#specialData").html(specialHtml);
			//关注的中介
			$("#institutionsDataNum").text(result.institutionsDataNum);
			var institutionsData=result.institutionsData;
			var institutionsHtml=getInstitutionsDataHtml(institutionsData);
			$("#institutionsData").html(institutionsHtml);
			//关注的投资人
			$("#investorDataNum").text(result.investorDataNum);
			var investorData=result.investorData;
			var investorHtml=getInvestorDataHtml(investorData);
			$("#investorData").html(investorHtml);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}*/
//关注公司数据
/*function getCompanyDataHtml(list){
	var htm='';
	for ( var i = 0; i < list.length; i++) {
		var obj= list[i];
		htm+='<li>';
		htm+='<div class="fl c_logo">';
		htm+='<a href="javascript:void(0);" onclick="toCompanyHomeHtml(\''+obj.stockCode+'\',\''+(obj.stockname==null?"--":obj.stockname)+'\',\'个人中心\')">';
		htm+='<img src="/www/images/gs_logo.png" alt="" />';
		htm+='</a>';
		htm+='</div>';
		htm+='<div class="fl company_content">';
		//htm+='<a href="/threeLibrary/companyHome.html?stockCode='+obj.stockCode+'&stockName='+(obj.stockname==null?"--":obj.stockname)+'">'+(obj.stockname==null?"--":obj.stockname)+'('+obj.stockCode+')</a>';
		htm+='<a href="javascript:void(0);" onclick="toCompanyHomeHtml(\''+obj.stockCode+'\',\''+(obj.stockname==null?"--":obj.stockname)+'\',\'个人中心\')">'+(obj.stockname==null?"--":obj.stockname)+'('+obj.stockCode+')</a>';
		htm+='<span><em>'+(obj.firstName==null?"--":obj.firstName)+'>'+(obj.secendName==null?"--":obj.secendName)+'</em><i>'+(obj.areaName==null?"--":obj.areaName)+'</i></span>';
		htm+='<p>'+(obj.mainBusiness==null?"--":obj.mainBusiness)+'</p>';
		htm+='</div>';
//		htm+='<div class="fl leixing">';
//			<span>TAG: <em>IT技术</em></span>
//		htm+='</div>';
		htm+='<div class="fr qxgz">';
		htm+='<span class="on" onclick="updateFollow(this,\'company\')" data-followId="'+obj.stockCode+'"><i class="guanzhu_xingx"></i>取消关注</span>';
		htm+='</div>';
		htm+='<div class="clr"></div>';
		htm+='</li>';
	}
	return htm;
}*/
//特色推荐
function getSpecialDataHtml(list){
	var htm='';
	for ( var i = 0; i < list.length; i++) {
		var obj= list[i];
		htm+='<li>';
		htm+='<div class="fl c_logo">';
		htm+='<a href="/security/albumBetails.html?id='+obj.id+'">';
		htm+='<img src="'+obj.picUrl+'" alt="" />';
		htm+='</a>';
		htm+='</div>';
		htm+='<div class="fl company_profile">';
		htm+='<a href="/security/albumBetails.html?id='+obj.id+'">'+obj.name+'投资事件（'+obj.eventNum+'）</a>';
		htm+='<span>'+obj.intro+'</span>';
		htm+='</div>';
		htm+='<div class="fr qxgz">';
		htm+='<span class="on"  onclick="updateFollow(this,\'speciality\')" data-followId="'+obj.id+'"><i class="guanzhu_xingx"></i>取消关注</span>';
		htm+='</div>';
		htm+='<div class="clr"></div>';
		htm+='</li>';
	}
	return htm;
}
//中介机构
function getInstitutionsDataHtml(list){
	var htm='';
	for ( var i = 0; i < list.length; i++) {
		var obj= list[i];
		//console.log(obj);
		htm+='<li>';
		htm+='<div class="fl zj_logo">';
		htm+='<span>';
		htm+='<img src="/www/images/gs_2.png" alt="" />';
		htm+='</span>';
		htm+='<div class="fl jigou_types">';
		var organizationName=(obj.organizationName==null?"--":obj.organizationName);
		if(organizationName.length>5){
			organizationName=organizationName.substring(0,5)+"...";
		}
		htm+='<a href="javascript:void(0)" title="'+obj.organizationName+'">'+organizationName+'</a>';
		var typeName="--";
		var type=""+(obj.type==null?"--":obj.type)+"";
		//1:主办券商,2:律师事务所,3:会计师事务所,4:资产评估公司,5:证券登记结算机构,6:拟挂牌场所
		if(type=="1"){
			typeName="主办券商";
		}else if(type=="2"){
			typeName="律师事务所";
		}else if(type=="3"){
			typeName="会计师事务所";
		}else if(type=="4"){
			typeName="资产评估公司";
		}else if(type=="5"){
			typeName="证券登记结算机构";
		}
		htm+='<span>'+(obj.address==null?"--":obj.address)+'>'+typeName+'</span>';
		htm+='</div>';
		htm+='<div class="clr"></div>';
		htm+='</div>';
		htm+='<div class="fl zj_gpshu">';
		htm+='<span>推荐挂牌公司数</span>';
		htm+='<em class="shuzi">'+obj.inListNum+'</em>';
		htm+='</div>';
		htm+='<div class="fl zj_faxing">';
		htm+='<span>推荐定向发行情况</span>';
		htm+='<div class="cishu">';
		htm+='<span>成功：<em>'+(obj.dzNum==null?0:obj.dzNum)+'</em>次</span>';
		htm+='<span>失败：<em>0</em>次</span>';
		htm+='<div class="clr"></div>';
		htm+='</div>';
		htm+='</div>';
		htm+='<div class="fl c_service">';
		htm+='<span>最新服务的公司</span>';
		htm+='<div class="t_service">';
		htm+='<em>'+obj.maxTime+'</em>';
		htm+='<span style = "cursor:pointer" href="javascript:void(0);" onclick="toCompanyHomeHtml(\''+obj.stockCode+'\',\''+(obj.stockname==null?"--":obj.stockname)+'\',\'个人中心\')">'+obj.stockName+'('+obj.stockCode+')</span>';
		htm+='<i>'+obj.newDateType+'</i>';
		htm+='<div class="clr"></div>';
		htm+='</div>';
		htm+='</div>';
		htm+='<div class="fr qxgz">';
		htm+='<span class="on"  onclick="updateFollow(this,\'intermediary\')" data-followId="'+obj.organizationNameSort+'"><i class="guanzhu_xingx"></i>取消关注</span>';
		htm+='</div>';
		htm+='<div class="clr"></div>';
		htm+='</li>';
	}
	return htm;
}
//投资人
function getInvestorDataHtml(list){
	var htm='';
	for ( var i = 0; i < list.length; i++) {
		var obj= list[i];
		htm+='<li>';
		htm+='<div class="fl p_investor">';
		htm+='<span>';
		htm+='<img src="/www/images/tzr_icon.png" alt="" />';
		htm+='</span>';
		htm+='<div class="fl intrduce">';
		htm+='<span>'+obj.investorName+'</span>';
//		htm+='<p>共青城海棠投资管理合伙企业（有限合伙）成立于2016年5月20日，统一社会信用代码为932115524455554</p>';
		htm+='</div>';
		htm+='<div class="clr"></div>';
		htm+='</div>';
		htm+='<div class="fl total">';
		htm+='<span>投资事件总数</span>';
		htm+='<i class="shuzi">'+obj.investorNum+'</i>';
		htm+='</div>';
		htm+='<div class="fl total">';
		htm+='<span>投资总金额</span>';
		if(obj.investSumTotal==""||obj.investSumTotal==null||obj.investSumTotal==undefined){
			obj.investSumTotal="--";
		}else{
			obj.investSumTotal=(obj.investSumTotal).toFixed(2);
		}
		htm+='<i class="shuzi">'+obj.investSumTotal+'万</i>';
		htm+='</div>';
		htm+='<div class="fl tz_shijian">';
		htm+='<span>最新投资事件</span>';
		htm+='<div class="com_infor" style="text-align:center">';
		htm+='<i>'+obj.noticeDate+'</i>';
		htm+='<span style = "cursor:pointer" href="javascript:void(0);" onclick="toCompanyHomeHtml(\''+obj.stockCode+'\',\''+(obj.stockname==null?"--":obj.stockname)+'\',\'个人中心\')">'+obj.stockName+'（'+obj.stockCode+'）</span>';
		if(obj.investSum==""||obj.investSum==null||obj.investSum==undefined){
			obj.investSum="--";
		}else{
			obj.investSum=(obj.investSum).toFixed(2);
		}
		htm+='<em>'+obj.investSum+'万</em>';
		htm+='<div class="clr"></div>';
		htm+='</div>';
		htm+='</div>';
		htm+='<div class="fr qxgz">';
		htm+='<span class="on"  onclick="updateFollow(this,\'investor\')" data-followId="'+obj.investorName+'"><i class="guanzhu_xingx"></i>取消关注</span>';
		htm+='</div>';
		htm+='<div class="clr"></div>';
		htm+='</li>';
	}
	return htm;
}
