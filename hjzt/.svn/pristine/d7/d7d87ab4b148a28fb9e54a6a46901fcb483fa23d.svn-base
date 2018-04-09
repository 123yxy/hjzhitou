$(document).ready(function(){
	//头像缓存中的头像
	var imageLs = localStorage.getItem("headImg");
	var userNameLs = localStorage.getItem('userName');
	if(userNameLs==""||userNameLs==null||userNameLs==undefined||userNameLs=="null"){
		userNameLs=localStorage.getItem('phone');
	}else{
		userNameLs=userNameLs;
	}
	//	添加自动补全css以及js
	var skid = localStorage.getItem("skid");
	var scss ='<link href="/saasBeta/css/jquery-ui.min.css" rel="stylesheet">';
	$("title").after(scss);
	if(skid!=null){
	var scss2 ='<link rel="stylesheet" type="text/css" href="/saasBeta/css/'+skid+'.css" id="skinCss">';
	$("head").append(scss2);	
	}else{
	var scss3 ='<link rel="stylesheet" type="text/css" href="/saasBeta/css/skin_0.css" id="skinCss">';
	$("head").append(scss3);	
	}
	var jiabj = '<div class="jiabeijing"></div>'
	$("body").append(jiabj);
	var urlpath = window.location.pathname;
	var lipth = urlpath.substring(1,urlpath.lastIndexOf("/"));
	var index=urlpath.lastIndexOf("\/");
	var urlHtml= urlpath.substring(index+1,urlpath.length);
//	console.log(urlHtml);
//	头部star
	var hed='<div class="header newheaders newSassHeader">';
	    hed+='<div class="header_box newHeader_box">';
	    if(lipth=="businessDetails"){
	     hed+='<div class="newlogo fl logoBackground">';	
	    }else{
	    hed+='<div class="newlogo fl">';
	    }
	    if(urlHtml=="businessRelationship.html" || urlHtml=="shareDetails.html"
	     || lipth=="report" || urlHtml=="projectDetails.html"
	     || urlHtml=="projectRelease.html"||
	    urlHtml=="businessRelationshiptc.html" ||
	    urlHtml=="modelReportDetail.html"){
		hed+='<a href="/index.html"><img src="/saasBeta/images/logo3.png"/></a>';
	    	
	    }else{
			hed+='<a href="/index.html"><img src="/saasBeta/images/logo2.png"/></a>';
	    	
	    }
		hed+='</div>';
		hed+='<div class="header_center fl index_header">';
		//hed+='<a href="/index.html">研究院</a><a href="#">工作台</a><a href="#">配置</a><a href="#">业务</a><a href="#">运营</a>';
		hed+='<a href="/index.html">首页</a><a href="/threeLibrary/stockQuotes.html">资讯数据</a><a href="/security/myPreferredStock.html">证券管理</a><a href="/dataAnalysis/financingAnalysis.html">数据分析</a>';
		hed+='</div>';
		if(imageLs==""||imageLs==null||imageLs==undefined||imageLs=="null"){
			hed+='<div class="header_r fr"><a href="javascript:;" class="fl" id="imageHead"><img src="/saasBeta/images/morenimg.png" alt="个人头像"></a><span class="fr" id="nameHead">'+userNameLs+'</span>';
		}else{
			hed+='<div class="header_r fr"><a href="javascript:;" class="fl" id="imageHead"><img src="'+imageLs+'" alt="个人头像"></a><span class="fr yhm" id="nameHead">'+userNameLs+'</span>';
		}
		hed+='<div class="user_down">';
		hed+= '<div class="dsj"><img src="/saasBeta/images/icon/sjx.png" alt=""></div>';
		hed+='<ul>';
		hed+='<li class="set_zh"><span></span><a href="/personalCenter/personalAlbum.html">账号设置</a></li>';
		hed+='<li class="updat_psw"><span></span><a href="#" id="xgMiMa">修改密码</a></li>';
		hed+='<li class="out_login"><span></span><a href="javascript:;" id="dropOut">退出登录</a></li>';
		hed+='</ul></div></div><div class="email_icon fr"><img src="/saasBeta/images/icon/header_email.png"/><i>8</i></div>';
//		hed+='<div class="pifu_icon fr"><img src="/saasBeta/images/pifu.png"/>';
//		hed+='<div class="pifu_down">';
//		hed+= '<div class="pifu_dsj"><img src="/saasBeta/images/icon/sjx.png" alt=""></div>';
//		hed+='<div class="pifu_title"><span>颜色</span></div>'
//		hed+='<ul>';
//		hed+='<li class="on" id="skin_0"><i></i></li>';
//		hed+='<li class="" id="skin_1"><i></i></li>';
//		hed+='<li class="" id="skin_2"><i></i></li>';
//		hed+='<li class="" id="skin_3"><i></i></li>';
//		hed+='<li class="" id="skin_4"><i></i></li>';
//		hed+='<div class="clr"></div>';
//		hed+='</ul></div>';
//		hed+='</div>';
		hed+='<div class="search_icon fr"><input type="text" name="" id="searchCompany" placeholder="输入公司名称或代码"/></div>';
		hed+='<div class="clr"></div>';
		hed+='</div>';
		hed+='</div>';
		$("body").prepend(hed);
		$("#"+skid).addClass("on").siblings().removeClass("on");
		if(skid!==null){
		$('#skinCss').attr("href","/saasBeta/css/"+skid+".css");
			if(skid=="skin_2"){
				$(".pifu_icon>img").attr("src","/saasBeta/images/icon/head_pifu.png");
				$(".email_icon img").attr("src","/saasBeta/images/icon/header_email.png");
			}else{
				$(".pifu_icon>img").attr("src","/saasBeta/images/icon/pifu.png");
				$(".email_icon img").attr("src","/saasBeta/images/icon/email_icon.png");
			}
		}else{
		$('#skinCss').attr("href","/saasBeta/css/skin_0.css");	
		}
//头部end
//尾部star
var foot="<div class='footer2 newSassFoot'><p>版权所有：北京金衡和科技有限公司</p><a href='#' id='back_top'><img src='/saasBeta/images/icon/back_top.png' alt='返回顶部'  /></a><div class='clr'></div></div>";
$("body").append(foot);
		
	
//尾部end
	
//	logo的宽度
window.onresize = function () {
	$(".newlogo").css("width",$(".nav_left").width());
	$(".header").css("width",$(window).width());
	$(".header_box").css("width",$(window).width());
	
}



	//个人中心下拉菜单
	$(".header_r.fr").hover(function() {
		$(this).children(".user_down").stop().slideDown();
	}, function() {
		$(this).children(".user_down").stop().slideUp();
	});
//	换肤按钮下拉换肤
$(".pifu_icon img").on("click",function() {
	if($(this).parent().hasClass("e")){
		$(".pifu_down").slideUp();
		$(".jiabeijing").hide();
	    $(this).parent().removeClass("e");
	}else{
		$(".pifu_down").slideDown();
		$(".jiabeijing").show();
		$(this).parent().addClass("e");
	}
});

//点击假背景时换肤隐藏
$(".jiabeijing").on("click",function(){
	$(".jiabeijing").hide();
	$(".pifu_down").hide();
	$(".pifu_icon").removeClass("e");
	
})
//选择主题色
$(".pifu_down ul li").on("click",function(){
	$(this).siblings().removeClass("on");
	$(this).addClass("on");
//	$("#"+this.id).addClass("selected").siblings().removeClass("selected");
	$('#skinCss').attr("href","/saasBeta/css/"+(this.id)+".css");
	if($(this).attr("id")=="skin_2"){
		$(".pifu_icon>img").attr("src","/saasBeta/images/icon/head_pifu.png");
		$(".email_icon img").attr("src","/saasBeta/images/icon/header_email.png");
	}else{
		$(".pifu_icon>img").attr("src","/saasBeta/images/icon/pifu.png");
		$(".email_icon img").attr("src","/saasBeta/images/icon/email_icon.png");
	}
	localStorage.setItem("skid",this.id);
});

$("#back_top").click(function() { TweenMax.to(window, 3, {scrollTo:0, ease:Expo.easeInOut});});	


	

	/*信息补全开始*/
	$("#searchCompany").keydown(function(e) {
		if(e.keyCode==13){
			//回车事件
			if($("#searchCompany").val() != "") {
				var val = $.trim($("#searchCompany").val());
				if(searchList.length != 0) {
					$.each(searchList, function(index, flag) {
						if(val.indexOf(flag.code) > -1  || val.indexOf(flag.name) > -1) {
							$("#searchCompany").val("");
//							window.location.href = '/businessDetails/newTBindex.html?stockCode=' + flag.code + "&stockName=" + flag.name;
							//window.location.href = '/businessDetails/newTBindex.html?stockCode=430043&stockName=景睿策划'
							window.open('/businessDetails/newTBindex.html?stockCode=' + flag.code + "&stockName=" + flag.name);
						}
					});
				}else{
					$.zmAlert("请输入正确的检索信息");
				}
			} else {
				$.zmAlert("请输入要检索的信息");
			}
			$("#ui-id-2").hide();
		}
	});
	
	//首页顶部搜索
	$("#searchCompany").autocomplete({
		minLength: 2,
		source: function(request, response) {
			findCodeName(request, response);
		},
		delay: 500,
		select: function(event, ui) {
			var item = ui.item;
		}
	});
	/*信息补全结束*/
	//财务数据对比弹层
	$(".top_btn button,.contrast_left span").on("click",function(){
	var wi=$(window).width();
	console.log(wi);
	var wi2=$('.boar_l').width();
	var wi1=wi-wi2-35;
	$(".contrast_right").css("width",wi1);
	if($(".contrast_right").is(":visible")){
		$(".contrast_right").removeClass("bounceOutLeft");
		$(".contrast_right").hide();
	}else{
		$(".contrast_right").show();
		$(".contrast_right").addClass("bounceInLeft");
		$(".contra_yc").show();
	}
	
});
	//点击隐藏页面隐藏
	$(".contra_yc span").on("click",function(){
	$(".contrast_right").removeClass("bounceInLeft");
	$(".contrast_right span").hide();
	$(".contrast_right").hide();
	$(".contra_yc").hide();
	$(".contrast").css("width","");
	});

	/**********************************修改密码*********************************/	
	 var passwordHtml = '<form id="passwordId">';
	    passwordHtml+='<div class="prop" style="display: none;"></div>';
		passwordHtml+='<div class="xg_password" style="display: none;">';
		passwordHtml+='<div class="top">';
		passwordHtml+='<span>修改密码</span>';
		passwordHtml+='<em class="close_pass"></em>';
		passwordHtml+='</div>';
		passwordHtml+='<div class="content">';
		passwordHtml+='<div class="old_password p_pass">';
		passwordHtml+='<input type="password" placeholder="请输入旧密码" name="old_password" id="old_password"/>';
		passwordHtml+='</div>';
		passwordHtml+='<div class="new_password p_pass">';
		passwordHtml+='<input type="password" placeholder="请输入新密码" name="new_password" id="new_password"/>';
		passwordHtml+='</div>';
		passwordHtml+='<div class="p_pass qr_mm">';
		passwordHtml+='<input type="password" placeholder="请再次输入新密码"  name="new_passwordRe"  id="sure"/>';
		passwordHtml+='</div>';
		passwordHtml+='<div class="btn">';
		passwordHtml+='<span id="pass_btn">确 认</span>';
		passwordHtml+='</div>';
		passwordHtml+='</div>';
		passwordHtml+='</div>';
		passwordHtml+='</form>';
		$("body").append(passwordHtml);
    
	//找回密码表单验证
	//找回密码表单验证
	var rgValidator_2 = $("#passwordId").validate({
		rules: {
			old_password: {
				required: true,
				password: true,
				rangelength: [6, 16],
				remote: {
					url: "/user/user/isTurePassword.do", //后台处理程序
					type: "post", //数据发送方式
					dataType: "json", //接受数据格式   
					data: {//要传递的数据
					}
				}
			},
			new_password: {
				required: true,
				password: true,
				rangelength: [6, 16],
				remote: {
					url: "/user/user/isYPassword.do", //后台处理程序
					type: "post", //数据发送方式
					dataType: "json", //接受数据格式   
					data: {//要传递的数据
					}
				}
			},
			new_passwordRe: {
				required: true,
				equalTo: "#new_password"
			}
		},
		messages: {
			old_password: {
				required: "请填写原密码",
				password: "密码格式不正确",
				rangelength: "密码长度6-16位",
				remote: "原密码不正确"
			},
			new_password: {
				required: "请填写新密码",
				password: "密码仅支持数字、字母、字符",
				rangelength: "密码长度6-16位",
				remote:"新密码不能与原密码一致"
			},
			new_passwordRe: {
				required: "请填写确认密码",
				equalTo: "与新密码不一致"
			}
		}
	});
	
	//点击修改密码
	$("#xgMiMa").on("click",function(){
		window.location.href="/personalCenter/personalInformation.html?pageType=1";
//		$(".prop").show();
//		$(".xg_password").show();
	})
	$(".xg_password input").on("focus",function(){
		$(this).css("border","1px solid #5abbd9")
	})
	$(".xg_password input").on("blur",function(){
		$(this).css("border","1px solid #e4e4e4")
	})
	$(".close_pass").on("click",function(){
		$(".xg_password").hide();
		$(".prop").hide();
	})
	
	//点击确认修密码
	$("#pass_btn").on("click",function(){
		if($("#passwordId").valid()) {
			var nPass=$.trim($("#new_password").val().replace(/\s+/g,""));
			modifyPassword(nPass);
		}
		
	})
	/*****************************修改密码*********************************/
	
});


(function($, window, document, undefined) {
	
	/**
	 * 点击下拉显示
	 */
	$(document).on("click", ".selectBox", function() {
		var ul = $(this).find("ul"),
			display = ul.css("display");
			
		display = display == "block" ? 0 : 1;
		
		$(".selectBox ul").css("display", "none");
		
		if (display) {
			ul.css("display", "block");
			display = 0;
			ul.find("li").each(function() {
				display += $(this).height();
			});
			ul.css("display", "none");
			
			if (display > 200) {
				ul.css("height",220);
				ul.css("overflow", "auto");
			}
			
			ul.slideDown(100);
		} else {
			ul.slideUp();
		}
		
		return false;
	});
	   
	/**
	 * 点击列表 文字和 value 上去
	 */
	$(document).on("click", ".selectBox ul li", function() {
		var p = $(this).parent().parent().find("p");
		
		p.text($(this).find("a").text());
		p.attr("value", $(this).attr("value"));
	});
	
	$(document).on("click", function() {
		$(".selectBox ul").slideUp();
	});
})(jQuery, window, document);
