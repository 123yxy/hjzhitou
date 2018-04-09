var qqName = localStorage.getItem("qqName");
//微信绑定返回
var weChatNameHeard= getUrlParam("weixinName");
if(weChatNameHeard==null||weChatNameHeard==""||weChatNameHeard==undefined){
	var weChatName = localStorage.getItem("weChatName");
}else{
	var weChatName = weChatNameHeard;
	localStorage.setItem("weixinName",weChatName);
}
//微博绑定返回
var weiBoNameHeard= getUrlParam("weiBoName");
if(weiBoNameHeard==null||weiBoNameHeard==""||weiBoNameHeard==undefined){
	var weiBoName = localStorage.getItem("weiBoName");
}else{
	var weiBoName = weiBoNameHeard;
	localStorage.setItem("weiBoName",weiBoName);
}

$(document).ready(function(){
	var signatureLS= localStorage.getItem('signature');
	var phoneLS= localStorage.getItem('phone');
	if(signatureLS==""||signatureLS==null||signatureLS==undefined||signatureLS=="null"){
		signatureLS="";
	}else{
		signatureLS=signatureLS;
	}
	if(phoneLS==""||phoneLS==null||phoneLS==undefined||phoneLS=="null"){
		phoneLS="";
	}else{
		phoneLS=phoneLS;
	}
	var user_center ='<div class="new_account_top">';
	    user_center +='<div class="new_acc_l fl">';
		user_center +='<div class="grzh_top">';
		user_center +='<span>登录账号:</span><em id="account">'+phoneLS+'</em>';
		user_center +='<div class="clr"></div>';
		user_center +='</div>';
		user_center +='<div class="grzh_icon">';
//		此处图标已绑定状态使用gr_开头的class 未绑定使用wbd_开头的class
		if(qqName==null||qqName==""||qqName==undefined){
			user_center +='	<i class="wbd_qq"></i>';
		}else{
			user_center +='	<i class="gr_qq"></i>';
		}
		if(weChatName==null||weChatName==""||weChatName==undefined){
			user_center +='	<i class="wbd_weixin"></i>';
		}else{
			user_center +='	<i class="gr_weixin"></i>';
		}
		if(weiBoName==null||weiBoName==""||weiBoName==undefined){
			user_center +='	<i class="wbd_weibo"></i>';
		}else{
			user_center +='	<i class="gr_weibo"></i>';
		}
		user_center +='	<a href="javascript:;">修改密码</a>';
		user_center +='</div>';
	    user_center +='	</div>';
	    user_center +='	<div class="new_acc_r fr">';
		user_center +='	<span>个性签名:</span>';
		user_center +='	<div class="new_acc_r_info">';
		user_center +='	<p id="signature">'+signatureLS+'</p>';
		user_center +='	<div class="edit_input"><input type="text" data-value="signature" value=""/><i class="gx_cha"></i><i class="gx_duigou"></i></div>';
		user_center +='	</div>';
		user_center +='</div>';
		user_center +='<div class="clr"></div>';
	    user_center +='</div>';
	    $(".main").prepend(user_center);
/****************************************修改密码**********************************************/	
	//点击修改密码
	$(".grzh_icon a").on("click",function(){
		$(".prop").show();
		$(".xg_password").show();
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
	//点击确认
	$("#pass_btn").on("click",function(){
		if($("#passwordId").valid()) {
			var nPass=$.trim($("#new_password").val().replace(/\s+/g,""));
			modifyPassword(nPass);
		}
		
	})
	
		
		$(".new_acc_r_info p").on("click",function(){
			var pText=$(this).text();
			$(".edit_input input").attr("value",pText);
			$(this).hide();
			$(".edit_input").show();
			$(".edit_input input").focus();
			$(".jiabeijing").show();
		});
	//	修改个性签名确认
		$(".gx_duigou").on("click",function(){
			var editText = $(this).siblings("input").attr("value");
			var edFiled = $(this).siblings("input").attr("data-value");
			//修改用户签名signature
			updateSignature(edFiled,editText);
			$(".new_acc_r_info p").html(editText).show();
			$(".jiabeijing").hide();
			$(".edit_input").hide();
		});
	//	取消修改个性签名
	$(".gx_cha").on("click",function(){
			$(".new_acc_r_info p").show();
			$(".jiabeijing").hide();
			$(".edit_input").hide();
		});
	//	点击空白处取消修改个性签名
	$(".jiabeijing").on("click",function(){
		$(".new_acc_r_info p").show();
		$(".jiabeijing").hide();
		$(".edit_input").hide();
		$(".user_edit").hide();
		$(".account_user_box ul li em").show();
	});
	
	
});

//查询用户个人信息field:更新的字段名称 value:字段的值
function updateSignature(field,value){
	$.axs("/user/user/updateSignature.do",{field:field,value:value},true,function(data){
		if(data.retCode=="0000"){
			//更改成功
			if(field=="signature"){
				//入缓存
				localStorage.setItem('signature',value);
			}
			if(field=="userName"){
				if(value==""||value==null||value==undefined){
					value="用户名";
				}
				$("#nameHead").html(value);
				//入缓存
				localStorage.setItem('userName',value);	
		}
		}else{
			$.zmAlert(data.retMsg);
		}
	});
}
