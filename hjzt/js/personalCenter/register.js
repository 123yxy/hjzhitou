$(function(){
	$.validator.addMethod("testPwdType", function checknum(value) {
        var Regx = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+$/;
        if (Regx.test(value)) {
            return true;
        }else{
            return false;
        }
    },"您输入的密码不符合规则");
	//注册表单验证
	var rgValidator = $("#registerForm").validate({
		rules: {
			phoneNumRe: {
				required: true,
				mobile: true,
				maxlength: 11,
				remote: {
					url: "/user/user/isHaveUser.do", //后台处理程序
					type: "post", //数据发送方式
					dataType: "json", //接受数据格式   
					async:false,
					data: {//要传递的数据
					}
				}
			},
			verCode: {
				required: true,
				digits: true,
				rangelength: [5, 5],
				maxlength: 11,
				remote: {
					url: "/user/common/testVerificationCode.do", //后台处理程序
					type: "post", //数据发送方式
					dataType: "json", //接受数据格式   
					data: { //要传递的数据
					}
				}
			},
			passwordRe: {
				required: true,
				password: true,
				rangelength: [6, 16],
				testPwdType:function(){
					return $("#passwordRe").val()
				}
			},
			rePasswordRe: {
				required: true,
				equalTo: "#passwordRe"
			}
		},
		messages: {
			phoneNumRe: {
				required: "请填写手机号",
				mobile: "手机号格式不正确",
				maxlength: "手机号最大为11位",
				remote: "您的手机号已注册过"
			},
			verCode: {
				required: "请填写短信验证码",
				digits: "短信验证码必须为整数数字",
				rangelength: "验证码长度为5位",
				maxlength: "验证码长度为5位",
				remote: "验证码不正确"
			},
			passwordRe: {
				required: "请填写密码",
				password: "您输入的密码不符合规则",
				rangelength: "密码长度6-16位"
			},
			rePasswordRe: {
				required: "请填写确认密码",
				equalTo: "您两次输入的密码不一致"
			}
		}
	});
	
	//提交注册
	$("#register").on("click", function() {
		if($("#registerForm").valid()) {
			register();
		}
	});
	//取消注册
	$(".reg_qx").on("click",function(){
		window.location.href="/index.html";
	});
	//发送短信验证码
	$("#sendvCodeBtn").on("click", function() {
		if(rgValidator.element("#phoneNumRe")) {
			var me = $(this);
			sendSMS(me);
		}
	});
	
	//注册协议
	$("#checkboxRe").on("click", function() {
		if(this.checked) {
			$("#register").removeAttr("disabled").removeClass("disabled");
		} else {
			$("#register").attr("disabled", "disabled").addClass("disabled");
		}
	});
})

//短信验证码
function sendSMS(me) {
	sendSMSCountdown(me);
	param = {phoneNumber:$("#phoneNumRe").val(),type:1};
	$.axs("/user/common/verificationCode.do",param,true,function(data){
		if(data.retCode=="0000"){
			//发送成功
		}else{
			//发送失败 或者 一分钟只能发一次
			$.zmAlert(data.retMsg);
			me.html("获取验证码").removeClass("disabled").removeAttr("disabled");
			clearInterval(smsCodes);
		}
	});
}

//注册
function register(){
	var pwd = md5($("#passwordRe").val());
	param = {phone:$("#phoneNumRe").val(),password:pwd,verification_Code:$("#verCode").val()};
	$.axs("/user/user/insertUser.do",param,false,function(data){
		if(data.retCode=="0000"){
			result = data.retData;
			//注册成功
			login($("#phoneNumRe").val(),$("#passwordRe").val());
//			localStorage.setItem('UU',result.UU);
//			localStorage.setItem('phone',result.Phone);
//			var tempUserName = result.UserName;
//			if(tempUserName==""||tempUserName==null||tempUserName==undefined){
//				tempUserName = "用户名";
//			}
//			localStorage.setItem('userName',tempUserName);
//			var path=localStorage.getItem("regitToHtml");
//			localStorage.setItem("regitToHtml","");
//			if(path!=null && path!="" && path!="undefined"){
//				window.location.href=path;
//			}else{
//				window.location.href="/register.html";
//			}
		}else{
//			alert(data.retMsg)
			$.zmAlert(data.retMsg);
		}
	});
}



//登录
function login(phone,password){
	var pwdMD5=md5(password);
	param = {phone:phone,password:pwdMD5};
	var url = "/beta/userLogin.do";	
	$.axs("/user/user/toLogin.do",param,false,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result==null){
				return false;
			}else{
				//查询用户已经关注的东西
				findFollow();
				//数据入缓存
				localStorage.setItem('UU',result.UU);
				localStorage.setItem('userId',result.userId);
				localStorage.setItem('phone',result.Phone);
				localStorage.setItem('userName',result.UserName);
				localStorage.setItem('headImg',result.imageUrl);
				localStorage.setItem('signature',result.signature);
				localStorage.setItem('qqName',result.qqName);
				localStorage.setItem('weChatName',result.weChatName);
				localStorage.setItem('weiBoName',result.weiBoName);
				//记住密码
				if($("#checkboxLo").attr("checked") == "checked"){
					localStorage.setItem(result.Phone,$("#passwordLo").val());
				}
				//验证登录次数
				$.axsRequestLogin("U516",param,url,false,function(data){	
//					console.log(data)
					if(data.retCode == "0000") {
						var result = data.retData;
						if(result == null) {
							return false;
						} else {
							//数据入缓存
							localStorage.setItem('login_times', result.login_times);
						}
					}			
				});
				//控制页面跳转
				var path=localStorage.getItem('loginToHtml');
				if(path!=null && path!="" && path!="undefined"){
					localStorage.setItem('loginToHtml',"");
					window.location.href=path;
				}else{
					window.location.href="index.html";
				}
			}
		}else{
			$.zmAlert(data.retMsg)
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
 * 尚未开发的功能调用
 */
function unDevelop(){
	errorAlert("", "功能有待完善,请敬请期待!");
}