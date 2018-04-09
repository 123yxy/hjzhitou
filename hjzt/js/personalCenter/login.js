$(function(){
	//登录表单验证
	var rgValidator = $("#loginForm").validate({
		rules: {
			phoneNumLo: {
				required: true,
				mobile: true,
				maxlength: 11,
				remote: {
					url: "/user/user/isHaveUserPsw.do", //后台处理程序
					type: "post", //数据发送方式
					dataType: "json", //接受数据格式   
					data: {//要传递的数据
						phoneNumber:function(){
							return $("#phoneNumLo").val();
						}
					}
				}
			},
			passwordLo: {
				required: true,
				password: true,
				rangelength: [6, 12]
			}
		},
		messages: {
			phoneNumLo: {
				required: "请填写手机号",
				mobile: "手机号格式不正确",
				maxlength: "手机号最大为11位",
				remote: "您的手机号还没有注册"
			},
			passwordLo: {
				required: "请填写密码",
				password: "密码仅支持数字、字母、字符",
				rangelength: "密码长度6-12位"
			}
		}
	});
	
	//登录keydown事件
	$("#passwordLo,#phoneNumLo").keydown(function(e) {
		if(e.keyCode==13){
			if($("#loginForm").valid()) {
				login();
			}
		}
	});
	
	//提交登录
	$("#login").on("click", function() {
		if($("#loginForm").valid()) {
			login();
			return false;
		}
	});
	var phonePassWord=localStorage.getItem("phone");
	if(phonePassWord!=null && phonePassWord!=""){
		$("#phoneNumLo").val(phonePassWord);
		$("#passwordLo").val(localStorage.getItem(phonePassWord));
	}
	//记住密码 回显
	$("#phoneNumLo").on("blur",function(){
		$("#passwordLo").val(localStorage.getItem($("#phoneNumLo").val()));
	})
})

//登录
function login(){
	var pwd = md5($("#passwordLo").val());
	param = {phone:$("#phoneNumLo").val(),password:pwd};
	var paraminfo='{"body":{"phone":"'+$("#phoneNumLo").val()+'","password":"'+pwd+'"}}';
	var url = "/beta/userLogin.do";	
	$.axs("/user/user/toLogin.do",param,false,function(data){
		if(data.retCode=="0000"){
			var result = data.retData;
			if(result==null){
				return false;
			}else{
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
				if($("#checkboxLo").is(':checked') == true){
					localStorage.setItem(result.Phone,$("#passwordLo").val());
				}
				$.axsRequestLogin("U516",paraminfo,url,false,function(data){	
//					console.log(data)
					if(data.retCode == "0000") {
						var result = data.retData;
						if(result == null) {
							return false;
						} else {
							//数据入缓存
							localStorage.setItem('login_times', result.login_times);
						}
					} else {
						$.zmAlert(data.retMsg);
					}			
				});
				findFollow();
				window.location.href="index.html";
			}
		}else{
			$.zmAlert(data.retMsg);
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