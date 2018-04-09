$(function(){
	var regHeader='<div class="res_top">';
		regHeader+='<div class="new_center">';
		regHeader+='<a href="/index.html" class="n_logo"><img src="/saasBeta/images/reg_logo.png"/></a>';
		regHeader+='<a href="javascript:;" class="n_index">首页</a>';
		regHeader+='<a href="javascript:;">资讯数据</a>';
		regHeader+='<a href="javascript:;">证券管理</a>';
		regHeader+='<a href="javascript:;">我的研究</a>';
		regHeader+='<a href="javascript:;">数据分析</a>';
		regHeader+='<div class="clr"></div>';
		regHeader+='</div>';
		regHeader+='</div>';
	$("body").append(regHeader);
	
	var footer='<div class="new_dl_footer">';
		footer+='<p>版权所有：北京圣康汇金科技有限公司</p>';
		footer+='</div>';
	$("body").append(footer);
	$("body").css("background-color","#fff");
	
	$.validator.addMethod("testSex", function (value){
		if(value == "男" || value == "女"){
			return true;
		}
		return false;
	},"请填写正确的性别");
	var rgValidator = $("#perfectMsgForm").validate({
		rules: {
			userName: {
				required: true
			},
			sex: {
				required: true,
				testSex:function(){
					return $("#sex").val();
				}
			},
			companyName: {
				required: true
			},
			position: {
				required: true
			},
			email: {
				required: true,
				email:true
			}
		},
		messages: {
			userName: {
				required: "请填写用户名"
			},
			sex: {
				required: "请填写性别"
			},
			companyName: {
				required: "请填写公司名称"
			},
			position: {
				required: "请填写职位"
			},
			email: {
				required: "请填写邮箱",
				email:"请填写正确的格式"
			}
		}
	});
	
	
	$("#determine").click(function(){
		if($("#perfectMsgForm").valid()) {
			perfectMsg();
		}
	})
})

/**
 *  完善用户信息
 */
function perfectMsg(){
	var param = {
		userName : $("#userName").val(),
		sex : $("#sex").val(),
		companyName : $("#companyName").val(),
		position : $("#position").val(),
		email : $("#email").val()
	};
	$.axs("/user/user/updatetUser.do",param,false,function(data){
		if(data.retCode=="0000"){
			window.location.href = "/index.html";
		}else{
			$.zmAlert(data.retMsg);
		}
	})
}
