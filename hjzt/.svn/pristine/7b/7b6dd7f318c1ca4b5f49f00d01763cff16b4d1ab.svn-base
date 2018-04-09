// $(function(){
// 	function addheader(){
// 		var strhead = ''
// 		strhead += '<div class="header clear"><div class="logo"><img src="/saasBeta/images/Image/Index/logo.png"></div><ul class="head_ul"><li>首页</li><li>资讯数据</li><li>证券管理</li><li>我的研究</li><li>数据分析</li></ul>';
// 		strhead += '<div class="gerenxinxi"><a href="/personalCenter/personalInformation.html" class="fl" id="imageHead"><img src="../saasBeta/images/morenimg.png" alt="个人头像"></a>';
// 		strhead += '<span class="fr" id="nameHead">18710081227</span>';
// 		strhead += '<div class="user_down" style="display: none;"><div class="dsj"><img src="/saasBeta/images/icon/sjx.png" alt=""></div></div></div></span>';
// 		strhead += '<div class="select"><input type="text" placeholder="搜索资讯、数据、研报"/><span class="find"></span></div></div>';
// 		$('.main').before(strhead);
// 	}
// 	addheader();
// })







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

    //新的模型的树结构
    var stockAlertCss='<link href="/saasBeta/css/stockAlert.css" rel="stylesheet">';
//	var easycss='<link href="/saasBeta/css/easyui.css" rel="stylesheet">';
//	var newModelcss='<link href="/saasBeta/css/newModel.css" rel="stylesheet">';
    $("title").append(stockAlertCss);
//	$("title").append(easycss);
//	$("title").append(newModelcss);
//顶部的搜索框方法
    var compeleted='<script src="/saasBeta/js/bigAutocompleteContent.js"></script>';
    $("body").append(compeleted);

//<!--企业信息搜索补全-->
	var jqueryUi='<script src="/saasBeta/js/jquery-ui.min.js" type="text/javascript" charset="utf-8"></script>';
	$("body").append(jqueryUi);
//	var reportAutocomplete='<script src="/saasBeta/js/reportAutocompleteContent.js"></script>';
//  $("body").append(reportAutocomplete);
		 


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
    var hed='<div class="header newheaders newSassHeader" id="head">';
    hed+='<div class="header_box nes_bj">';
    if(lipth=="businessDetails"){
        hed+='<div class="newlogo fl logoBackground">';
    }else{
        hed+='<div class="newlogo fl">';
    }
    if(urlHtml=="businessRelationship.html" || urlHtml=="shareDetails.html"
        || lipth=="report" || urlHtml=="projectDetails.html"
        || urlHtml=="projectRelease.html"||
        urlHtml=="businessRelationshiptc.html"
    ){
        hed+='<a href="/index.html"><img src="/saasBeta/images/logo3.png"/></a>';

    }else{
        //hed+='<a href="/index.html"><img src="/saasBeta/images/logo2.png"/></a>';
        hed+='<a href="/index.html"><img src="/saasBeta/images/Image/Index/logo.png"/></a>';
    }
    hed+='</div>';
    hed+='<div class="header_center fl news_header">';
    //hed+='<a href="/index.html">研究院</a><a href="#">工作台</a><a href="#">配置</a><a href="#">业务</a><a href="#">运营</a>';
    hed+='<a href="/index.html" class="on">首页</a><a href="/threeLibrary/stockQuotes.html">资讯数据</a><a href="/security/myPreferredStock.html">自选股</a><a href="/myResearch/researchReport.html">我的研究</a><a href="/dataAnalysis/financingAnalysis.html">数据分析</a>';
    hed+='</div>';
    if(imageLs==""||imageLs==null||imageLs==undefined||imageLs=="null"){
        hed+='<div class="header_r fr"><a href="/personalCenter/personalCenter.html" class="fl" id="imageHead" title="个人头像"><img src="/saasBeta/images/morenimg.png"></a><span class="fr" id="nameHead" onclick="javascript:window.location.href=\'/personalCenter/personalCenter.html\'">'+userNameLs+'</span>';
    }else{
        hed+='<div class="header_r fr"><a href="/personalCenter/personalCenter.html" class="fl" id="imageHead" title="个人头像"><img src="'+imageLs+'"></a><span class="fr" id="nameHead" onclick="javascript:window.location.href=\'/personalCenter/personalCenter.html\'">'+userNameLs+'</span>';
    }
    hed+='<div class="user_down">';
    hed+= '<div class="dsj"><img src="/saasBeta/images/icon/sjx.png" alt=""></div>';
    hed+='<ul>';
    hed+='<li class="set_zh"><span id="set_zh_icon"></span><a href="/personalCenter/personalCenter.html">账号设置</a></li>';
    hed+='<li class="updat_psw"><span id="updat_psw_icon"></span><a href="#" id="xgMiMa">修改密码</a></li>';
    hed+='<li class="out_login"><span></span><a href="javascript:;" id="dropOut" style="color:#fff;">退出登录</a></li>';
    hed+='</ul></div></div>';//<div class="email_icon fr"><img src="/saasBeta/images/icon/header_email.png"/><i>8</i></div>';
//		hed+='<div class="pifu_icon fr"><img src="/saasBeta/images/icon/pifu.png"/>';
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
    hed+='<div class="search_icon search_in_put fr"><input isjump="true" class="input select ui-autocomplete-input-head" type="text" maxlength="38" autocomplete="off" placeholder="请输入公司名称/代码" style="font-size:12px;"/><span class="new_top_searcher"></span>';
    hed+='<div class="input_tips" style="display:none;">输入需适度，简洁更丰富！</div>';
    hed+='</div>';
    hed+='<div class="clr"></div>';
    hed+='</div>';
    hed+='</div>';
    $("body").prepend(hed);
    $("#dropOut").on("click", function() {
        exitLogin();
    });
    //下拉检索
    $(".ui-autocomplete-input-head").autocomplete({
			minLength: 2,
			source: function(request, response) {
				console.log(request)
				searchObjecCodetList(request, response);
			},
			delay: 500,
			select: function(event, ui) {
				var item = ui.item;
				$(this).attr("ObjectCode", item.code);

				if($(this).attr("isjump") == "true") {
					window.location.href = "/searchList.html?stockcode=" + item.code + "&type=" + 2 + "&tj=" + "&content=" + item.name + "," + item.code;
				}
				$(".yd_img_icon").hide();
				$(".mx_yind").hide();
				$(".zhibiao_list").show();
				$(".mx_tc_btn").show();
			}
		}).focus(function () {
            $(this).autocomplete("search");
        });
		$(".ui-autocomplete-input-head").keydown(function(e) {
            
			if(e.keyCode == 13) {
				//回车事件
				if($(this).val() != "") {
					var val = $.trim($(this).val());
					if(searchObjectList.length != 0) {
						$.each(searchObjectList, function(index, flag) {
							if(val.indexOf(flag.code) > -1 || val.indexOf(flag.name) > -1) {
								$(this).val(flag.name + "(" + flag.code + ")");
								$(this).attr("ObjectCode", flag.code);
								if($(this).attr("isjump") == "true") {
									window.location.href = "/searchList.html?stockcode=" + flag.code + "&type=" + 2 + "&tj=" + "&content=" + flag.name + "," + flag.code;
								}
							}
						});
						if($(this).val().indexOf("(") <= -1) {
							$(this).val('');
							$(this).removeAttr("ObjectCode");
                            if($(this).attr("isjump") == "true") {
                                window.location.href = "/companySearchList/companySearchList.html?txt="+val;
                            }
						}
					} else {
						$(this).val('');
						$(this).removeAttr("ObjectCode");
                        if($(this).attr("isjump") == "true") {
                                window.location.href = "/companySearchList/companySearchList.html?txt="+val;
                        }
						//$.zmAlert("请输入正确的检索信息");
					}
				} else {
					$(this).val('');
					$(this).removeAttr("ObjectCode");
					//$.zmAlert("请输入要检索的信息");
				}
				$("#ui-id-2").hide();
			}
		});
 //跳转到搜索结果页
    $(".new_top_searcher").click(function(){

            var val=$(".ui-autocomplete-input-head").val();
            console.log($(".ui-autocomplete-input-head").attr("ObjectCode"))
             if($(".ui-autocomplete-input-head").attr("ObjectCode") && $(".ui-autocomplete-input-head").attr("ObjectCode")!="" && val!="") {
              
                if($(this).attr("isjump") == "true") {
                    window.location.href = "/searchList.html?stockcode=" + flag.code + "&type=" + 2 + "&tj=" + "&content=" + flag.name + "," + flag.code;
                }
            }
            else
            {
                window.location.href = "/companySearchList/companySearchList.html?txt="+val;
            }
           // location.href="/searchList.html?stockcode=" + flag.code + "&type=" + 2 + "&tj=" + "&content=" + flag.name + "," + flag.code;
        })
    $("#"+skid).addClass("on").siblings().removeClass("on");
    if(skid!==null){
        $('#skinCss').attr("href","/css/"+skid+".css");
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

//		$("#topSearch").on("focus",function(){
//			$(".new_top_searcher").css("height","34px");
//			$(".new_top_searcher").css("top","11px");
//		})
//		$("#topSearch").on("blur",function(){
//			$(".new_top_searcher").css("height","36px");
//			$(".new_top_searcher").css("top","10px");
//		})
//头部end

//		鼠标经过头部搜索放大镜的时候展开搜索框
//$(".search_icon input").hover(function(){
//	$(this).addClass("on");
//}).mouseout(function(){
//	$(this).removeClass("on");
//});
//尾部star
    var foot="<div class=\"footer\">©2016-2017 北京圣康汇金科技有限公司 版权所有 | 京ICP备11029652号（为了保证最佳体验，请采用Chrome或IE10以上的浏览器）</div>";
    $("body").append(foot);
    var path=window.location.pathname;
    var pathname=path.split("/")[1];
    if(pathname=="searchList.html"){
        return;
    }else{
//      var lodding ='<div class="loadingBox"><div class="loading-3"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div>';
//      $("body").append(lodding);
    }

//顶部导航高亮
//首页
    if(lipth=="/"){
        $(".header_center").find("a").removeClass("on");
        $(".header_center").find("a").eq(0).addClass("on");
    }
//	资讯数据
    if(lipth=="threeLibrary"){
        $(".header_center").find("a").removeClass("on");
        $(".header_center").find("a").eq(1).addClass("on");
    }
//	证券管理
    if(lipth=="security"){
        $(".header_center").find("a").removeClass("on");
        $(".header_center").find("a").eq(2).addClass("on");
    }
//	我的研究
    if(lipth=="myResearch"){
        $(".header_center").find("a").removeClass("on");
        $(".header_center").find("a").eq(3).addClass("on");
    }
//	我的研究
    if(lipth=="dataAnalysis"){
        $(".header_center").find("a").removeClass("on");
        $(".header_center").find("a").eq(4).addClass("on");
    }

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
    $(".header_r.fr").on("mouseenter",".set_zh",function(){
        $("#set_zh_icon").css("background-position","-157px -56px")
    })
    $(".header_r.fr").on("mouseleave",".set_zh",function(){
        $("#set_zh_icon").css("background-position","-8px -6px")
    })
    $(".header_r.fr").on("mouseenter",".updat_psw",function(){
        $("#updat_psw_icon").css("background-position","-183px -56px")
    })
    $(".header_r.fr").on("mouseleave",".updat_psw",function(){
        $("#updat_psw_icon").css("background-position","-34px -6px")
    })
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
        $('#skinCss').attr("href","/css/"+(this.id)+".css");
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
//	$("#searchCompany").autocomplete({
//		minLength: 2,
//		source: function(request, response) {
//			findCodeName(request, response);
//		},
//		delay: 500,
//		select: function(event, ui) {
//			var item = ui.item;
//			if($("#searchCompany").val() != "") {
//				var value=item.value;
//				var code=value.substring(value.indexOf("(")+1,value.indexOf(")"));
//				var name=value.substring(0,value.indexOf("("));
//				window.open('/businessDetails/newTBindex.html?stockCode=' + code + "&stockName=" + name);
//			} else {
//				$.zmAlert("请输入要检索的信息");
//			}
//			$("#ui-id-2").hide();
//		}
//	});
    /*信息补全结束*/
    //财务数据对比弹层
    $(".top_btn button,.contrast_left span").on("click",function(){
        var wi=$(window).width();
        //console.log(wi);
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
//	var rgValidator_2 = $("#passwordId").validate({
//		rules: {
//			old_password: {
//				required: true,
//				password: true,
//				rangelength: [6, 16],
//				remote: {
//					url: "/user/user/isTurePassword.do", //后台处理程序
//					type: "post", //数据发送方式
//					dataType: "json", //接受数据格式
//					data: {//要传递的数据
//					}
//				}
//			},
//			new_password: {
//				required: true,
//				password: true,
//				rangelength: [6, 16],
//				remote: {
//					url: "/user/user/isYPassword.do", //后台处理程序
//					type: "post", //数据发送方式
//					dataType: "json", //接受数据格式
//					data: {//要传递的数据
//					}
//				}
//			},
//			new_passwordRe: {
//				required: true,
//				equalTo: "#new_password"
//			}
//		},
//		messages: {
//			old_password: {
//				required: "请填写原密码",
//				password: "密码格式不正确",
//				rangelength: "密码长度6-16位",
//				remote: "原密码不正确"
//			},
//			new_password: {
//				required: "请填写新密码",
//				password: "密码仅支持数字、字母、字符",
//				rangelength: "密码长度6-16位",
//				remote:"新密码不能与原密码一致"
//			},
//			new_passwordRe: {
//				required: "请填写确认密码",
//				equalTo: "与新密码不一致"
//			}
//		}
//	});

    //点击修改密码
    $("#xgMiMa").on("click",function(){
//		$(".prop").show();
//		$(".xg_password").show();
        window.location.href = "/personalCenter/personalCenter.html?typeId=3";
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

    });

    /*****************************修改密码*********************************/
//	综合搜索页tab切换
//	$(".search_dbox").find(".search_list").hide();
//	$(".search_dbox").find(".search_list").eq(0).show();
//	$(".search_tab ul li").on("click",function(){
//		var ind=$(this).index();
//		$(this).siblings("li").removeClass("on");
//		$(this).addClass("on");
//		$(".search_dbox").find(".search_list").hide();
//		$(".search_dbox").find(".search_list").eq(ind).show();
//	})
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


