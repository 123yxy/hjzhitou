$(function(){
	
	getVerifyNum();
	
	//验证用户表单验证
	var rgValidatorUser = $("#testPhoneForm").validate({
		rules: {
			phoneNumber: {
				required: true,
				mobile: true,
				maxlength: 11,
				remote: {
					url: "/user/user/isHaveUserPsw.do", //后台处理程序
					type: "post", //数据发送方式
					dataType: "json", //接受数据格式   
					async:false,
					data: {//要传递的数据
					}
				}
			},
			verifyNum: { //判断图片验证码
				required: true,
				rangelength: [4, 4],
				maxlength: 4,
				remote: {
					url: "/user/valCode/testVerifyNum.do", //后台处理程序
					type: "post", //数据发送方式
					dataType: "json", //接受数据格式   
					data: { //要传递的数据
//						verifyNum : $("#verifyNum").val(),
						verName : $("#VerifyNumImg").attr("data-name")
					}
				}
			},
			verCode: {
				required: true,
				digits: true,
				rangelength: [5, 5],
				remote: {
					url: "/user/common/testVerificationCode.do", //后台处理程序
					type: "post", //数据发送方式
					dataType: "json", //接受数据格式   
					data: { //要传递的数据
					}
				}
			}
		},
		messages: {
			phoneNumber: {
				required: "请填写手机号",
				mobile: "手机号格式不正确",
				maxlength: "手机号最大为11位",
				remote: "您的手机号未注册过"
			},
			verifyNum: {
				required: "请填写图片验证码",
				rangelength: "验证码长度为4位",
				maxlength: "验证码长度为4位",
				remote: "验证码不正确"
			},
			verCode: {
				required: "请填写短信验证码",
				digits: "短信验证码必须为整数数字",
				rangelength: "验证码长度为5位",
				remote: "验证码不正确"
			}
		}
	});
	
	//找回密码表单验证
	var rgValidator = $("#resetPswForm").validate({
		rules: {
			password: {
				required: true,
				password: true,
				rangelength: [6, 16]
			},
			passwordRe: {
				required: true,
				equalTo: "#password"
			}
		},
		messages: {
			password: {
				required: "请填写密码",
				password: "密码仅支持数字、字母、字符",
				rangelength: "密码长度6-16位"
			},
			passwordRe: {
				required: "请填写确认密码",
				equalTo: "与密码不一致"
			}
		}
	});
	
	//发送短信验证码
	$("#sendvCodeBtn").on("click", function() {
		if(rgValidatorUser.element("#phoneNumber")) {
			var me = $(this);
			sendSMS(me);
		}
	});
	
	//提交表单
	$("#resetPswId").on("click", function() {
		if($("#resetPswForm").valid()) {
			resetPsw();
		}
	});
	//点击下一步时切换
	$(".reg_next button").on("click",function(){
		if($("#testPhoneForm").valid()){
			$(".zh_quer").hide();
			$(".mima_quer").show();
			$(".zhanghao").removeClass("on");
			$(".chongzhi").addClass("on");
		}
	})
	//点击上一步
	$(".mima_btn .pre").on("click",function(){
		$(".zh_quer").show();
		$(".mima_quer").hide();
		$(".chongzhi").removeClass("on");
		$(".zhanghao").addClass("on");
	})
	
	
})


//短信验证码
function sendSMS(me) {
	param = {phoneNumber:$("#phoneNumber").val(),type:1};
	$.axs("/user/common/verificationCode.do",param,true,function(data){
		if(data.retCode=="0000"){
			//发送成功
			sendSMSCountdown(me);
		}else{
			//发送失败 或者 一分钟只能发一次
			$.zmAlert(data.retMsg);
		}
	});
}

//修改密码
function resetPsw(){
	var pwdMD5=md5($("#password").val())
	param = {field:$("#password").attr("data-value"),value:pwdMD5,phoneNumber:$("#phoneNumber").val()};
	$.axs("/user/user/updateUserByPhone.do",param,true,function(data){
		if(data.retCode=="0000"){
			window.location.href="/nlogin.html";
		}else{
			$.zmAlert(data.retMsg);
		}
	});
}

function getVerifyNum() { // 图片验证码
	$.axs("/user/valCode/getVerifyNum.do",null,false,function(data){
		if(data.retCode == 0000) {
			var result = data.retData;
			$("#VerifyNumImg").attr("src", result.localip + result.path);
			$("#VerifyNumImg").attr("data-name", result.path);
		} else {
			errorAlert(data.retCode, data.retMsg);
		}
	});
}
