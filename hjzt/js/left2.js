$(document).ready(function(){
	var imageLS = localStorage.getItem("headImg");
//	左边导航star
	var left_nav='<div class="left_nav new_left_nav">';
		left_nav+='<div class="left_top_image"><a href="/index.html"><img src="/saasBeta/images/logo2.png" alt="汇金智投" style="opacity: 1; width: 100%; height: auto;"></a></div>';
		left_nav+='<div class="clr"></div>';
		left_nav+='<div class="new_touxian">';
		left_nav+='<div class="touxiang_dbox">';
		left_nav+='<div class="new_touxiang_img" id="preview_img" onClick="selectimg()">';
		left_nav+='</div>';
		left_nav+='</div>';
		left_nav+='<div class="touxiang_up">';
		left_nav+='<input type="hidden" id="imgFile">';
		left_nav+='<a href="javascript:;" onClick="selectimg()">上传头像</a>';
		left_nav+='<input type="file" id="i-file" onchange="onSelectPhoto(this.files);" style="visibility:hidden;"/>';
		left_nav+='</div>';
		left_nav+='</div>';
		left_nav+='<div class="clr"></div>';
		left_nav+='<div class="left_list new_left_list">';
		left_nav+='<ul>';
		left_nav+='<li class="left_nzhsz hover" onclick="javascript:window.location.href=\'/personalCenter/accountSettings.html\'">';
		left_nav+='<a href="/personalCenter/accountSettings.html" >账号设置</a>';
		left_nav+='</li>';
		left_nav+='<li class="left_nwdxx" onclick="javascript:window.location.href=\'/personalCenter/myMessage.html\'">';
		left_nav+='<a href="/personalCenter/myMessage.html">我的消息<i>8</i></a>';
		left_nav+='</li>';
		left_nav+='<li class="left_nwdzxg" onclick="javascript:window.location.href=\'/personalCenter/myPreferredStock.html\'">';
		left_nav+='	<a href="/personalCenter/myPreferredStock.html">我的自选股</a>';
		left_nav+='</li>';
		left_nav+='<li class="left_nwdgj" onclick="javascript:window.location.href=\'/personalCenter/myTool.html\'">';
		left_nav+='<a href="/personalCenter/myTool.html" >我的工具</a>';
		left_nav+='</li>';
		left_nav+='<li class="left_nwdxm" onclick="javascript:window.location.href=\'/personalCenter/myProject.html\'">';
		left_nav+='	<a href="/personalCenter/myProject.html" >我的项目</a>';
		left_nav+='</li>';
		left_nav+='<li class="left_nfxjl" onclick="javascript:window.location.href=\'/personalCenter/analysisRecord.html\'">';
		left_nav+='	<a href="/personalCenter/analysisRecord.html" >分析记录</a>';
		left_nav+='</li>';
		left_nav+='<li class="left_nwtfk" onclick="javascript:window.location.href=\'/personalCenter/problemFeedback.html\'">';
		left_nav+='	<a href="/personalCenter/problemFeedback.html" >问题反馈</a>';
		left_nav+='</li>';
		left_nav+='<div class="clr"></div>';
		left_nav+='</ul>';
		left_nav+='</div>';
		left_nav+='</div>';	
		$("body").prepend(left_nav);
		urlPa()
		//修改头像
		if(imageLS==""||imageLS==null||imageLS==undefined||imageLS=="null"){
			//默认头像
		}else{
			$("#preview_img").css("background-image", "url(" + imageLS + ")");
		}
//	左边导航end
});

//侧导航高亮处理
function urlPa(){
    var urlpath = window.location.pathname;
	var lipth = urlpath.substring(16,urlpath.lastIndexOf("."));
//	账户设置
	if(lipth=="accountSettings"){
		$(".left_list ul li").removeClass("hover");
		$(".left_list ul li.left_nzhsz").addClass("hover");
		return false;
	}
//	我的消息
	if(lipth=="myMessage"){
		$(".left_list ul li").removeClass("hover");
		$(".left_list ul li.left_nwdxx").addClass("hover");
		return false;
	}
//	我的自选股
	if(lipth=="myPreferredStock"){
		$(".left_list ul li").removeClass("hover");
		$(".left_list ul li.left_nwdzxg").addClass("hover");
		return false;
	}
	//	我的工具
	if(lipth=="myTool"){
		$(".left_list ul li").removeClass("hover");
		$(".left_list ul li.left_nwdgj").addClass("hover");
		return false;
	}
	
	//	我的项目
	if(lipth=="myProject"){
		$(".left_list ul li").removeClass("hover");
		$(".left_list ul li.left_nwdxm").addClass("hover");
		return false;
	}
	//	分析记录
	if(lipth=="analysisRecord"){
		$(".left_list ul li").removeClass("hover");
		$(".left_list ul li.left_nfxjl").addClass("hover");
		return false;
	}
	//	问题反馈
	if(lipth=="problemFeedback"){
		$(".left_list ul li").removeClass("hover");
		$(".left_list ul li.left_nwtfk").addClass("hover");
		return false;
	}
	
}