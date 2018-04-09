var ent = null;
$(document).ready(function(){
    //头像缓存中的头像
    var imageLs = localStorage.getItem("headImg");
    var userNameLs = localStorage.getItem("userName");
    if(userNameLs==""||userNameLs==null||userNameLs==undefined||userNameLs=="null"){
        userNameLs=localStorage.getItem("phone");
    }else{
        userNameLs=userNameLs;
    }
    /*//查询所有的企业信息 入缓存
    ent = JSON.parse(localStorage.getItem("ent"));
    if(ent==null||ent==""||ent=="undefined"){
        findAll();
        ent = JSON.parse(localStorage.getItem("ent"));
    }*/
    
    var skid = localStorage.getItem("skid");
    var scss ='<link href="/saasBeta/css/jquery-ui.min.css" rel="stylesheet">';
    var lscss ='<link href="/saasBeta/css/linshi.css" rel="stylesheet">'
    //新的模型的树结构
    var stockAlertCss='<link href="/saasBeta/css/stockAlert.css" rel="stylesheet">';
//  var easycss='<link href="/saasBeta/css/easyui.css" rel="stylesheet">';
//  var newModelcss='<link href="/saasBeta/css/newModel.css" rel="stylesheet">';
    $("title").append(stockAlertCss);
//  $("title").append(easycss);
//  $("title").append(newModelcss);
    var compeleted='<script src="/saasBeta/js/bigAutocompleteContent.js"></script>';
    $("body").append(compeleted);

    
    
    $("title").after(scss);
        
    if(skid!=null){
    var scss2 ='<link rel="stylesheet" type="text/css" href="/saasBeta/css/'+skid+'.css" id="skinCss">';
    $("head").append(scss2);
    }else{
    var scss3 ='<link rel="stylesheet" type="text/css" href="/saasBeta/css/skin_0.css" id="skinCss">';
    $("head").append(scss3);    
    }
    $("head").append(lscss);
    var jiabj = '<div class="jiabeijing"></div>'
        $("body").append(jiabj);
    
//  头部star
    var hed='<div class="header">';
        hed+='<div class="header_box">';
        hed+='<div class="header_center fl">';
        //hed+='<a href="/index.html">研究院</a><a href="#">工作台</a><a href="#">配置</a><a href="#">业务</a><a href="#">运营</a>';
        hed+='<a href="/index.html">首页</a><a href="/threeLibrary/stockQuotes.html">资讯数据</a><a href="/security/myPreferredStock.html">证券管理</a><a href="/myResearch/researchReport.html">我的研究</a><a href="/dataAnalysis/financingAnalysis.html">数据分析</a>';
        hed+='</div>';
        if(imageLs==""||imageLs==null||imageLs==undefined||imageLs=="null"){
            hed+='<div class="header_r sb_header fr"><a href="/personalCenter/personalCenter.html" class="fl" id="imageHead"><img src="/saasBeta/images/morenimg.png" alt="个人头像"></a><span class="fr" id="nameHead" onclick="javascript:window.location.href=\'/personalCenter/personalCenter.html\'">'+userNameLs+'</span>';
        }else{
            hed+='<div class="header_r sb_header fr"><a href="/personalCenter/personalCenter.html" class="fl" id="imageHead"><img src="'+imageLs+'" alt="个人头像"></a><span class="fr" id="nameHead" onclick="javascript:window.location.href=\'/personalCenter/personalCenter.html\'">'+userNameLs+'</span>';
        }
        hed+='<div class="user_down">';
        hed+= '<div class="dsj"><img src="/saasBeta/images/icon/sjx.png" alt=""></div>';
        hed+='<ul>';
        hed+='<li class="set_zh"><span></span><a href="/personalCenter/personalCenter.html">账号设置</a></li>';
        hed+='<li class="updat_psw"><span></span><a href="#" id="xgMiMa">修改密码</a></li>';
        hed+='<li class="out_login"><span></span><a href="/nlogin.html" id="dropOut">退出登录</a></li>';
        hed+='</ul></div></div>';//<div class="email_icon fr"><img src="/saasBeta/images/icon/email_icon.png"/><i>8</i></div>';
//      hed+='<div class="pifu_icon fr"><img src="/saasBeta/images/icon/pifu.png"/>';
//      hed+='<div class="pifu_down">';
//      hed+= '<div class="pifu_dsj"><img src="/saasBeta/images/icon/sjx.png" alt=""></div>';
//      hed+='<div class="pifu_title"><span>颜色</span></div>'
//      hed+='<ul>';
//      hed+='<li class="on" id="skin_0"><i></i></li>';
//      hed+='<li class="" id="skin_1"><i></i></li>';
//      hed+='<li class="" id="skin_2"><i></i></li>';
//      hed+='<li class="" id="skin_3"><i></i></li>';
//      hed+='<li class="" id="skin_4"><i></i></li>';
//      hed+='<div class="clr"></div>';
//      hed+='</ul></div>';
//      hed+='</div>';
        hed+='<div class="search_icon search_in_put fr headers_two"><input type="text" maxlength="38" isjump="true" class="input select ui-autocomplete-input-head" type="text" maxlength="38" autocomplete="off" placeholder="请输入公司名称/代码"/><span class="new_top_searcher"></span><div class="input_tips" style="display:none;">输入需适度，简洁更丰富！</div></div>';
        hed+='<div class="clr"></div>';
        hed+='</div>';
        hed+='</div>';
        $(".right_main").prepend(hed);
        //下拉检索
       $(".ui-autocomplete-input-head").autocomplete({
            minLength: 2,
            source: function(request, response) {
               
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
      
        $(".ui-autocomplete-input-head").on("keydown",function(e) {
            //console.log(".ui-autocomplete-input-head.e.keyCode:"+e.keyCode);
   //     $(".ui-autocomplete-input-head").keydown(function(e) {
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
//      $("#topSearch").on("focus",function(){
//          $(".new_top_searcher").css("height","34px");
//          $(".new_top_searcher").css("top","11px");
//      })
//      $("#topSearch").on("blur",function(){
//          $(".new_top_searcher").css("height","36px");
//          $(".new_top_searcher").css("top","10px");
//      })
//      鼠标经过头部搜索放大镜的时候展开搜索框
//$(".search_icon input").hover(function(){
//  $(this).addClass("on");
//}).mouseout(function(){
//  $(this).removeClass("on");
//});
//头部end
//尾部star

//
var foot="<div class='footer'><p>版权所有：北京圣康汇金科技有限公司</p><a href='#' id='back_top'><img src='/saasBeta/images/icon/back_top.png' alt='返回顶部'  /></a></div>";
$("body").append(foot);
var path=window.location.pathname;
var pathname=path.split("/")[1];
if(pathname=="searchList.html"){
    return;
}else{
    var lodding ='<div class="loadingBox"><div class="loading-3"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div>'; 
    $("body").append(lodding);
}
    
//尾部end
    var urlpath = window.location.pathname;
    var lipth = urlpath.substring(1,urlpath.lastIndexOf("/"));
    if(localStorage.getItem("leftClass")=="close"&&lipth!=="personalCenter"){
        $(".left_nav").addClass("close");
        $(".header").css("padding-left","50px");
        $(".right_main").addClass("on");
        $(".left_top_image img").css({"opacity":"0","width":"50px","height":"50px"});
        $(".left_nav .left_list ul li span").hide();
        $(".left_nav .left_list ul li b").hide();
        $(".left_nav .left_list ul li").css({"height":"50px"});
        $(".right_main").css("transition","none");
        $("#hexagon").find("img").attr("src","/saasBeta/images/icon/hexa2.png");
    }else{
        $(".header").css("padding-left","170px");
        $(".left_nav").removeClass("close");
        $(".right_main").removeClass("on");
        $(".left_top_image img").css({"opacity":"1","width":"100%","height":"auto"});
        $(".left_nav .left_list ul li span").show();
        $(".left_nav .left_list ul li b").show();
        $(".left_nav .left_list ul li").css({"height":"110px"});
        $("#hexagon").find("img").attr("src","/saasBeta/images/icon/hexa.png");
//      var wid=$(".map_r_info").width();
//      var wids=wid-17*0.95;
//      $(".map_title_wz").css("width",wids);
    }
//  头部导航高亮处理
//首页
    if(lipth=="/"){
    $(".header_center").find("a").removeClass("on");
    $(".header_center").find("a").eq(0).addClass("on");
    }
//  资讯数据
    if(lipth=="threeLibrary"){
    $(".header_center").find("a").removeClass("on");
    $(".header_center").find("a").eq(1).addClass("on");
    }
//  证券管理
    if(lipth=="security"){
    $(".header_center").find("a").removeClass("on");
    $(".header_center").find("a").eq(2).addClass("on");
    }
//  我的研究
    if(lipth=="myResearch"){
    $(".header_center").find("a").removeClass("on");
    $(".header_center").find("a").eq(3).addClass("on");
    }
//  我的研究
    if(lipth=="dataAnalysis"){
    $(".header_center").find("a").removeClass("on");
    $(".header_center").find("a").eq(4).addClass("on");
    }
    //左侧弹框隐藏显示
    $(".left_list ul li.son").hover(function() {
              $(this).children("ul.left_son").show();
              var width=$(this).width();
              $(this).children("ul.left_son").css("left",$(this).width());
              if(width==45){
                  width=200;
                  $(this).children("ul.left_son").stop().animate({width: width}, '500');    
              }else{
                  $(this).children("ul.left_son").stop().animate({width: $(this).width()}, '500');
              }
        }, 
        function() {
            $(this).children("ul.left_son").stop().animate({width: '0px'}, 500, function() {
                $(this).hide();
            });
        }
    );
    
    /*侧导航 end*/
    //个人中心下拉菜单
    $(".header_r.fr").hover(function() {
        $(this).children(".user_down").stop().slideDown();
    }, function() {
        $(this).children(".user_down").stop().slideUp();
    });
//  换肤按钮下拉换肤
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

//选择主题色
$(".pifu_down ul li").on("click",function(){
    $(this).siblings().removeClass("on");
    $(this).addClass("on");
//  $("#"+this.id).addClass("selected").siblings().removeClass("selected");
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


    
    /*侧导航 end*/
    $("#hexagon").on("click", function() {
        $(".right_main").css("transition","all 0.3s ease-in-out");
        if($(".left_nav").hasClass("close")){
            
            localStorage.setItem("leftClass","open");
            $(".left_nav").removeClass("close");
            $(".right_main").removeClass("on");
            $(".left_top_image img").css({"opacity":"1","width":"100%","height":"auto"});
            $(".header,.footer").css("padding-left","170px");
            $(".left_nav .left_list ul li").css({"height":"110px"});
            $(".left_nav .left_list ul li span").show();
            $(".left_nav .left_list ul li b").show();
            $(this).find("img").attr("src","/saasBeta/images/icon/hexa.png");
//          var wid=$(".map_r_info").width();
//          var wids=wid-17*0.95;
//          $(".map_title_wz").css("width",wids);
        }else{
            localStorage.setItem("leftClass","close");
            $(".left_nav").addClass("close");
//          var bodymax=$(document.body).width()
//          var max=bodymax-50;
            
            $(".right_main").addClass("on");
            $(".left_top_image img").css({"opacity":"0","width":"50px","height":"50px"});
            $(".header,.footer").css("padding-left","50px");
            $(".left_nav .left_list ul li span").hide();
            $(".left_nav .left_list ul li b").hide();
            $(".left_nav .left_list ul li").css({"height":"50px"});
            $(this).find("img").attr("src","/saasBeta/images/icon/hexa2.png");
//          var wid=$(".map_r_info").width();
//          var wids=wid-17*0.95;
//          $(".map_title_wz").css("width",wids);
        }
        //$(this).toggleClass("close");
   });
   
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
//                          window.location.href = '/businessDetails/newTBindex.html?stockCode=' + flag.code + "&stockName=" + flag.name;
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
            //console.log(item)
            if($("#searchCompany").val() != "") {
                //var val = $.trim($("#searchCompany").val());
                var value=item.value;
//              if(searchList.length != 0) {
//                  $.each(searchList, function(index, flag) {
//                      if(val.indexOf(flag.code) > -1  || val.indexOf(flag.name) > -1) {
//                          $("#searchCompany").val("");
////                            window.location.href = '/businessDetails/newTBindex.html?stockCode=' + flag.code + "&stockName=" + flag.name;
//                          //window.location.href = '/businessDetails/newTBindex.html?stockCode=430043&stockName=景睿策划'
//                          window.open('/businessDetails/newTBindex.html?stockCode=' + flag.code + "&stockName=" + flag.name);
//                      }
//                  });
//              }else{
//                  $.zmAlert("请输入正确的检索信息");
//              }
                var code=value.substring(value.indexOf("(")+1,value.indexOf(")"));
                var name=value.substring(0,value.indexOf("("));
                window.open('/businessDetails/newTBindex.html?stockCode=' + code + "&stockName=" + name);
            } else {
                $.zmAlert("请输入要检索的信息");
            }
            $("#ui-id-2").hide();
            //console.log(item);
        }
    });
    /*信息补全结束*/
    var htmlName=location.pathname
    if(htmlName!="/multidimensionalStock/multidStockanalysisTable.html" && 
        htmlName!="/multidimensionalStock/multidStockTrendComparison.html" &&
        htmlName!="/multidimensionalStock/multidStockRankingAnalysis.html"){
        localStorage.removeItem("stockAnalyzeComparisonId");
    }
    
    
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
        window.location.href="/personalCenter/personalCenter.html?typeId=3";
//      $(".prop").show();
//      $(".xg_password").show();
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
$(document).ready(function(){
    $(".jiabeijing").click(function(){
        $("#indicatorName,#secondLevelTrade,#firstLevelArea").slideUp();
        $(".pifu_down").slideUp();
        $(".t_dbox").hide();
        $(this).hide();
        $(".pifu_icon").removeClass("e");
        $(".model_list").hide();
    });
    $(".ui-autocomplete").css("top","50px");
});

(function($, window, document, undefined) {
    
    /**
     * 点击下拉显示
     */
    $(document).on("click", ".selectBox p", function() {
        var ul = $(this).parent().find("ul"),
            display = ul.css("display");
            
        display = display == "block" ? 0 : 1;
        
        $(".selectBox ul").css("display", "none");
        $(this).parent().children(".searching").hide();
//      $(".jiabeijing").show();
        
        if (display) {
            $(this).parent().children(".searching").show();
            ul.css("display", "block");
            $(".jiabeijing").show();
            display = 0;
            ul.find("li").each(function() {
                display += $(this).parent().height();
            });
            ul.css("display", "none");
            if (display > 200) {
//              ul.css("height",200);
                ul.css("overflow", "auto");
            }
            
            ul.slideDown(100);
        } else {
            ul.slideUp();
            $(".jiabeijing").hide();
        }
        $(".selectBoxes ul")
        return false;
    });
       
    /**
     * 点击列表 文字和 value 上去
     */
//  $(document).on("click", ".selectBox ul li", function() {
//      var p = $(this).parent().parent().find("p");
//      $(".selectBox ul").hide();
//      $(".searching").hide();
//      $(".jiabeijing").hide();
//      p.text(($(this).find("a").text()).indexOf("...") > -1 ? $(this).find("a").attr("title") : $(this).find("a").text());
//      p.attr("data-value", $(this).attr("data-value"));
//      p.attr("value", $(this).attr("value"));
//  });
    
//  $(document).on("click", function() {
//      alert("sss");
//      $(".searching").hide();
//      $(".selectBox ul").slideUp();
//  });
})(jQuery, window, document);

//查询所有的企业信息(未调用)
function findAll() {
    $.axs("/betaStock/enterPriseData/findAll.do", null, true, function(data){
        if(data.retCode == 0000) {
            if(data.retData == null) {
                return false;
            }
            var stockCodeAndName=[];//股票代码自动补全
            if(data.retData!=null && data.retData.length!=0){
                var resultList=data.retData;
                for(var i=0;i<resultList.length;i++){
                    stockCodeAndName[i]=resultList[i].companyForShort+"("+resultList[i].stockCode+")";
                }
                //入缓存
                ent = stockCodeAndName;
                localStorage.setItem("ent",JSON.stringify(ent));
            }
        } else {
            errorAlert(data.retCode, data.retMsg);
        }
    });
}

