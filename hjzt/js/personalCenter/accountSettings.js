//微博登录
var status = WB2.checkLogin();//检测微博登录状态
$(document).ready(function(){
//初始化数据
	
findUser();

//修改个人信息
$(".account_user_box ul li em").on("click",function(){
		var pText=$(this).text();
		$(".user_edit input").attr("value",pText);
		$(this).hide();
		$(this).siblings(".user_edit").show();
		$(this).siblings(".user_edit").find("input").focus();
		$(".jiabeijing").show();
	});
	
//	修改个人信息确认
	$(".user_duigou").on("click",function(){
		var editText = $(this).siblings("input").attr("value");
		var pField=$(this).siblings("input").attr("data-value");
		//修改用户信息
		updateSignature(pField,editText);
		$(this).parent(".user_edit").siblings("em").html(editText).show();
		$(".jiabeijing").hide();
		$(this).parent(".user_edit").hide();
	});
//	取消个人信息
	$(".user_cha").on("click",function(){
		$(this).parent(".user_edit").siblings("em").show();
		$(".jiabeijing").hide();
		$(this).parent(".user_edit").hide();
	});
	
//QQ绑定
	$("#qqLogin").on("click",function(){
		var qqText = $("#qqLogin").text();
		if(qqText=="绑定"){
			QQDinding();
		}else{
			CancelQQDinding();
		}
	
	})
	//微信绑定
	$("#weChatLogin").on("click",function(){
		var weChatText = $("#weChatLogin").text();
		if(weChatText=="绑定"){
			loginweChat();
		}else{
			logoutweChat();
		}
	})
	//微博绑定
	$("#weiBoId").on("click",function(){
		var weiBoText = $("#weiBoId").text();
		if(weiBoText=="绑定"){
			loginWeiBo();
			return false;
		}else{
			logoutWeiBo();
		}
	})
});

//查询用户个人信息
function findUser(){
	$.axs("/user/user/findUser.do",null,true,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result==""||result==null||result==undefined){
				//登录成功刷新本页面
			}else{
				if(result.userName==""||result.userName==null||result.userName==undefined){
					$("#userName").html("");
				}else{
					$("#userName").html(result.userName);
				}
				if(result.sex==""||result.sex==null||result.sex==undefined){
					$("#sex").html("");
				}else{
					$("#sex").html(result.sex);
				}
				if(result.companyName==""||result.companyName==null||result.companyName==undefined){
					$("#companyName").html("");
				}else{
					$("#companyName").html(result.companyName);
				}
				if(result.position==""||result.position==null||result.position==undefined){
					$("#position").html("");
				}else{
					$("#position").html(result.position);
				}
				if(result.contact==""||result.contact==null||result.contact==undefined){
					$("#contact").html("");
				}else{
					$("#contact").html(result.contact);
				}
				if(result.qqName==""||result.qqName==null||result.qqName==undefined){
					$("#qqName").html("");
					$("#qqLogin").text("绑定");
				}else{
					$("#qqName").html(result.qqName);
					$("#qqLogin").text("取消绑定");
				}
				if(result.weChatName==""||result.weChatName==null||result.weChatName==undefined){
					$("#weChatName").html("");
					$("#weChatLogin").text("绑定");
				}else{
					$("#weChatName").html(result.weChatName);
					//入缓存
					localStorage.setItem("weChatName",result.weChatName);
					$("#weChatLogin").text("取消绑定");
				}
				if(result.weiBoName==""||result.weiBoName==null||result.weiBoName==undefined){
					$("#weiBoName").html("");
					$("#weiBoId").text("绑定");
				}else{
					$("#weiBoName").html(result.weiBoName);
					//入缓存
					localStorage.setItem("weiBoName",result.weiBoName);
					$("#weiBoId").text("取消绑定");
				}
			}
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}
//QQ绑定成功
function QQDinding(){
	//第三方登录弹框
	window.open('https://graph.qq.com/oauth2.0/authorize?client_id=101386002&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fqzonestyle.gtimg.cn%2Fqzone%2Fopenapi%2Fredirect-1.0.1.html', 'oauth2Login_10514' ,'height=525,width=585, toolbar=no, menubar=no, scrollbars=no, status=no, location=yes, resizable=yes');
	var paras = {};
	//放置QQ登录按钮
	/*QC.Login({
		btnId:"qqLoginBtn"	//插入按钮的节点id
	})*/
	//获取用户信息
	QC.api("get_user_info", paras)
	.success(function(s){//成功回调
		//页面显示昵称
		$("#qqName").html(s.data.nickname);
		//修改用户QQ昵称
		updateSignature("qqName",s.data.nickname);
		//入缓存
		localStorage.setItem("qqName",s.data.nickname);
	})
	.error(function(f){//失败回调
		$.zmAlert("绑定失败！");
	})
	.complete(function(c){//完成请求回调
		$("#qqLogin").text("取消绑定");
		$(".wbd_qq").addClass("gr_qq").removeClass("wbd_qq");
		//获取openId
		if(QC.Login.check()){//如果已登录
			QC.Login.getMe(function(openId, accessToken){
				//增加用户QQ唯一标识
				updateSignature("qqOpenId",openId);
			});
			//这里可以调用自己的保存接口
			//...
		}
	});
}
//QQ取消绑定
function CancelQQDinding(){
	//退出登录
	QC.Login.signOut();
	//清空qq三方信息
	updateSignature("qqName",null);
	updateSignature("qqOpenId",null);
	//变换按钮状态
	$("#qqName").text("");
	$("#qqLogin").text("绑定");
	localStorage.removeItem("qqName");
	$(".gr_qq").addClass("wbd_qq").removeClass("gr_qq");
}

//微信授权绑定
function loginweChat(){
	//二维码授权弹框获取到code测试 
	window.open('https://open.weixin.qq.com/connect/qrconnect?appid=wx26400ec773c29762&redirect_uri=http%3a%2f%2fsaas.159jh.net%2fuser%2fcommon%2fweChatGetCode.do&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect');
	//二维码授权弹框获取到code 本地
	//window.open('https://open.weixin.qq.com/connect/qrconnect?appid=wx26400ec773c29762&redirect_uri=http%3a%2f%2fwww.159jh.comt%2fuser%2fuser%2fweChatGetCode.do&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect');
	//微信绑定成功样式更改
	$(".wbd_weixin").addClass("gr_weixin").removeClass("wbd_weixin");
	$("#weChatLogin").text("取消绑定");
}
//微信取消绑定
function logoutweChat(){
	//变换按钮状态
	$("#weChatName").text("");
	$("#weChatLogin").text("绑定");
	localStorage.removeItem("weChatName");
	$(".gr_weixin").addClass("wbd_weixin").removeClass("gr_weixin");
}

//微博绑定
function loginWeiBo() {
	//第三方登录弹框
	window.open('https://api.weibo.com/oauth2/authorize?client_id=1910342924&response_type=code&forcelogin=true&redirect_uri=http://www.159jh.com/user/common/weiboGetCode.do');
	$(".wbd_weibo").addClass("gr_weibo").removeClass("wbd_weibo");
	$("#weiBoId").text("取消绑定");
}
//微博取消绑定
function logoutWeiBo() {
	//变换按钮状态
	$("#weiBoName").text("");
	$("#weiBoId").text("绑定");
	localStorage.removeItem("weiBoName");
	$(".gr_weibo").addClass("wbd_weibo").removeClass("gr_weibo");
}
