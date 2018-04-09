$(function(){
	
	if(getUrlParam("pageType") == "1"){
		$("#msgTab").addClass("on");
		$("#rePwdTab").removeClass("on");
		$(".per_infor").hide();
		$(".xg_pass").show();
	}
	
	//toLogin();
	//查询行业
	findCategory();
	//查询用户关注的行业
	findUser();
	//查询个人资料
	findUserMsg();
	
	$("#oldPassword").blur(function(){
		if($("#oldPassword").val() != ""){
			if(isTurePassword($("#oldPassword").val())){
				$("#newPassword").attr("readonly",false);
			}else{
				$("#reNewPassword").val("").attr("readonly",true);
				$("#newPassword").val("").attr("readonly",true);
				$("#upPassword").unbind("click");
				$.zmAlert("您输入的密码有误");
			}
		}
	})
	
	$("#newPassword").blur(function(){
		if($("#newPassword").val() != ""){
			if($("#newPassword").val().length >= 6 && $("#newPassword").val().length <= 16){
				if(isYPassword($("#newPassword").val())){
					$("#reNewPassword").attr("readonly",false);
				}else{
					$("#reNewPassword").val("").attr("readonly",true);
					$.zmAlert("您输入的密码与原密码相同，请重新输入");
				}
			}else{
				$("#reNewPassword").val("").attr("readonly",true);
				$.zmAlert("密码长度6-16位");
			}
		}
	})
	
	$("#reNewPassword").blur(function(){
		if($("#reNewPassword").val() != ""){
			if($("#newPassword").val() == $("#reNewPassword").val()){
				$("#upPassword").click(function(){
					if(updateUserMsg("password",$("#reNewPassword").val())){
						$.zmAlert("修改密码成功，请重新登陆");
						exitLogin();
					};
				})
			}else{
				$.zmAlert("与上面的密码不一致");
			}
		}
	})
	
	//默认基本信息的显示标签隐藏
	$(".gr_base_infor>span").hide();
	//个人信息和修改密码的tab切换
	$(".infor_tab a").on("click",function(){
		$(this).removeClass("on").siblings().addClass("on");
		var tabName=$(this).text();
		if(tabName=="个人资料"){
			$(".xg_pass").hide();
			$(".per_infor").show();	
		}
		if(tabName=="密码修改"){
			$(".per_infor").hide();	
			$(".xg_pass").show();
		}
	})
	//个人信息下的性别选择,点击时显示下拉
	$(".sex_types").delegate("p","click",function(){
		$(".s_sex").slideDown();
		$(".jiabeijing").show();
	})
	//选择性别时下拉回收
	$(".sex_types").delegate("li","click",function(){
		if(updateUserMsg($(this).attr("data-field"),$(this).find("a").text())){
			var sexSelect=$(this).find("a").text();
			$(this).parent().parent().find("p").text(sexSelect);
			$(".s_sex").slideUp();
			$(".jiabeijing").hide();
		}
	});
	$(".jiabeijing").on("click",function(){
		$(this).hide();
		$(".s_sex").slideUp();
	});
//	给各个input添加回车提交
	$("#userNameInp,#email,#weChat,#region,#position,#signature").keydown(function(e) {
		if(e.keyCode==13){
			//回车事件
			if($(this).val() != "") {
				$(this).siblings('i').click();
			} else {
				$.zmAlert("请输入要检索的信息");
			}
		}
	});
	//点击输入框后面的对勾的时候进行保存
	$(".bianji i").on("click",function(){
		if($.trim($(this).prev().prev().val()) != ""){
			if(updateUserMsg($(this).prev().prev().attr("data-field"),$(this).prev().prev().val())){
				var thisVal=$(this).parent().find("input").eq(0).val();
				$(this).parent().hide();
				$(this).parent().siblings("span").show();
				$(this).parent().siblings("span").find("em").show();
				$(this).parents(".gr_base_infor").find("span").eq(0).find("i").removeClass("on");
				$(this).parent().parent().find("span").find("em").text(thisVal);
			}
		}else{
			$.zmAlert("请输入" + $(this).parent().parent().prev().text().replace(":",""));
		}
	})
	//点击输入框说明的取消按钮时默认显示之前的内容
	$(".bianji em").on("click",function(){
//		if($(this).prev().val() != ""){
			$(this).parent().hide();
			$(this).parents(".gr_base_infor").find("span").eq(0).show();
			if($(this).text()==""){
				$(this).parents(".gr_base_infor").find("span").eq(0).find("i").addClass("on");
			}else{
				$(this).parents(".gr_base_infor").find("span").eq(0).find("i").removeClass("on");
			}
//		}
	})
	//鼠标经过内容时显示编辑的按钮
//	$(".gr_base_infor span em").on("mouseenter",function(){
//		
//	})
	$(".gr_base_infor span").mouseover(function(){
		$(this).parent().find("i").addClass("on");
	}).mouseout(function(){
		var te=$(this).find("em").text();
		if(te!=""){
		$(this).parent().find("i").removeClass("on");	
		}else{
			return false;
		}
		
	})
	//点击编辑的小图标时显示内容可以编辑
	$(".gr_base_infor span i").on("click",function(){
		var thisVal=$(this).parent().find("em").text();
		$(this).parent().hide();
		$(this).parent().parent().find("div.bianji").show();
		
		$(this).parents(".gr_base_infor").find("div.bianji").find("input").val(thisVal);
	})
	//关闭弹窗
	$(".tc_modify>span>i").on("click",function(){
		$(".jiabeijing2").hide();
		$(this).parent().parent().hide();
		//关闭弹窗还要回显
		var selectHy=$(this).parent().parent().parent().next().text();
		 selectHy=selectHy.split(",");
		 //console.log(selectHy);
		$(".c_modify .hy_public").each(function(index,item){
			if(selectHy.indexOf($(item).attr("title"))>-1){
				$(item).find("div.hy_icons").find("i").addClass("on");
				$(item).find("em").addClass("on");
			}
		})
	})
	//点击修改
	$(".modify>span").on("click",function(){
		$(".jiabeijing2").show();
		//使用目的
		var shiyongmudi=$("#purpose").text();
		$("#c_modify").find("a").each(function(index,item){
			if(shiyongmudi.indexOf($(item).text())>-1){
				$(item).addClass("on");
			}else{
				$(item).removeClass("on");
			}
		});
		//关注
		$(this).parent().find("div.tc_modify").show();
		var guanzhuhangye=$("#focusArea").text();
		$("#xuanz_hy").find("span").each(function(index,item){
//			console.log($(item).parent().attr("title"));
			if(guanzhuhangye.indexOf($(item).parent().attr("title"))>-1){
				$(item).next().addClass("on");
			}else{
				$(item).next().removeClass("on");
			}
		});
	})
	//选择弹窗里的行业
	$("#xuanz_hy .hy_public").on("click",function(){
		var flag=0;
		$(".c_modify .hy_public").each(function(index,item){
			if($(item).find("em").hasClass("on")){
				flag++;
			}
		})
     	if(flag>=6){
     		if($(this).find("em").hasClass("on")){
     			$(this).find("em").removeClass("on");
     			$(this).find(".hy_icons").find("i").removeClass("on");
     		}else{
     			errorAlert("","最多选择6个行业");
     			$(this).find("em").removeClass("on");
     			$(this).find(".hy_icons").find("i").removeClass("on");
     		}
     	}else{
     		if($(this).find("em").hasClass("on")){
     			$(this).find("em").removeClass("on");
     			$(this).find(".hy_icons").find("i").removeClass("on");
     		}else{
     			$(this).find("em").addClass("on");
     			$(this).find(".hy_icons").find("i").addClass("on");
     		}
     	}
	})
	//点击上面的选择目的
	$("#c_modify a").on("click",function(){
		if($(this).hasClass("on")){
			$(this).removeClass("on");
		}else{
			$(this).addClass("on");
		}
	})
	//点击目的的确定
	$(".mudi_qued").on("click",function(){
		$(".jiabeijing2").hide();
		
		var xzObj=[];
		var flag=0;
		$("#c_modify a").each(function(index,item){
			if($(item).hasClass("on")){
				flag++;
				xzObj[xzObj.length]=$(item).text();
			}
		})
		xzObj=xzObj.join(",");
		if(flag==0){
			errorAlert("","最少选择1个目的");	
		}
		if(flag>=1){
			$("#purpose").text(xzObj);
			$(this).parent().parent().hide();
		}
		updateUser("c_modify");
	})
	
	//点击确定事把选择的行放到对应的位置
	$(".hy_qued").on("click",function(){
		var selectHy=[];
		var flag=0;
		$("#xuanz_hy .hy_public").each(function(index,item){
			if($(item).find("em").hasClass("on")){
				flag++;
				selectHy[selectHy.length]=$(item).attr("title");
			}
		})
		selectHy=selectHy.join("  ,  ");
		if(updateUserMsg($(this).attr("data-field"),selectHy)){
			if(flag>=3){
				$(this).parents(".xg_infor").find("span.selectHy").text(selectHy);
			}
			//$(this).parent().parent().hide();
		}
		$(".jiabeijing2").hide();
		updateUser("xuanz_hy");
	})
	//编辑完成之后输入框失去其点之后去掉外边框
//	$(".infor_show input").on("blur",function(){
//		$(this).parent().hide();
//		$(this).parents(".gr_base_infor").find("span").show();
//		$(this).parents(".gr_base_infor").find("span").find("i").removeClass("on");
//	})
	
})
/**
 * 修改用户信息,修改用户关注的行业
 */
function updateUser(className){
//	updateUser("changeHangye");
//  	updateUser("initHangye");
	var param=null;
	if(className=="c_modify"){
		//使用目的
		var purpose="";
		$(".c_modify").find("a.on").each(function(index,item){
			purpose+=$(this).text()+"|";
		});
		purpose=purpose.substring(0,purpose.length-1);
		param={goals:purpose}
		if(purpose==""){
			//都没有选择
			errorAlert("","请选择使用目的");
			return false;
		}
	}else{
		//关注行业
		var focusArea="";
		$("#"+className).find("em.on").each(function(index,item){
			focusArea+=$(this).prev().attr("data-autoid")+"|";	
	 	});
		focusArea=focusArea.substring(0,focusArea.length-1);
		focusArea=focusArea.split("|");
		//console.log(focusArea);
		if(focusArea.length<=2){
			//都没有选择
			errorAlert("","至少选择3-6个行业");
			return false;
		}
		focusArea=focusArea.join("|");
		param={industries:focusArea};
	}
	$.axs("/betaStock/btUserIndustry/updateBtUserIndustry.do",param,false,function(data){
		//TODO 修改融资数据
		if(data.retCode=="0000"){
			
			
			$(".tc_modify").hide();

			$("body,html").css("overflow","auto");
			//修改关注行业的图
	     	findIndustryInvestmentData();
		}else{
			//errorAlert(data.retCode, data.retMsg);
		}
	});
}




/**
 * 查询用户信息
 */
function findUserMsg(){
	$.axs("/user/user/findUser.do",null,true,function(data){
		//console.log(data)
		var result=data.retData;
		if(data.retCode=='0000'){
			if(result==null){
				return false;
			}
			if(result.businessCardUrl != null){
//				$("#preview_img").css({"background-image":"url("+result.businessCardUrl+")"});
				$(".avatar_img img").attr("src",result.businessCardUrl == null ? "/saasBeta/images/tx.png" : result.businessCardUrl);
				$(".img_infor").find("span").text("修改头像");
			}
			if(result.userName != null && result.userName != ""){
//				alert(result.userName)
				$("#userNameInp").val(result.userName);
				$("#userNameShow").text(result.userName);
				$("#userNameInp").parent().hide();
				$("#userNameShow").parent().show();
			}else if(result.userName == null || result.userName == ""){
				/*$("#userNameInp").parent(".bianji").hide();
				$("#userNameInp").parent(".bianji").next().show()
				$("#userNameInp").parent(".bianji").next().find("em").hide();
				$("#userNameShow").siblings("i").addClass("on").show();*/
				
				$("#userNameInp").val(result.phone);
				$("#userNameShow").text(result.phone);
				$("#userNameInp").parent().hide();
				$("#userNameShow").parent().show();
				
			}
			if(result.phone != null && result.phone != ""){
				$("#phone").val(result.phone);
				$("#phoneShow").text(result.phone);
				$("#phone").parent().hide();
				$("#phoneShow").parent().show();
			}else if(result.phone==null || result.phone == ""){
				$("#phone").parent(".bianji").hide();
				$("#phone").parent(".bianji").next().show()
				$("#phone").parent(".bianji").next().find("em").hide();
				$("#phoneShow").siblings("i").addClass("on").show();
			}
			if(result.email != null && result.email != ""){
				$("#email").val(result.email);
				$("#emailShow").text(result.email);
				$("#email").parent().hide();
				$("#emailShow").parent().show();
			}else if(result.email==null || result.email == ""){
				$("#email").parent(".bianji").hide();
				$("#email").parent(".bianji").next().show()
				$("#email").parent(".bianji").next().find("em").hide();
				$("#emailShow").siblings("i").addClass("on").show();
			}
			if(result.weChat != null && result.weChat != ""){
				$("#weChat").val(result.weChat);
				$("#weChatShow").text(result.weChat);
				$("#weChat").parent().hide();
				$("#weChatShow").parent().show();
			}else if(result.weChat==null || result.weChat == ""){
				$("#weChat").parent(".bianji").hide();
				$("#weChat").parent(".bianji").next().show()
				$("#weChat").parent(".bianji").next().find("em").hide();
				$("#weChatShow").siblings("i").addClass("on").show();
			}
			if(result.region != null && result.region != ""){
				$("#region").val(result.region);
				$("#regionShow").text(result.region);
				$("#region").parent().hide();
				$("#regionShow").parent().show();
			}else if(result.region == null || result.region != ""){
				$("#region").parent(".bianji").hide();
				$("#region").parent(".bianji").next().show()
				$("#region").parent(".bianji").next().find("em").hide();
				$("#regionShow").siblings("i").addClass("on").show();
			}
			if(result.position != null && result.position != ""){
				$("#position").val(result.position);
				$("#positionShow").text(result.position);
				$("#position").parent().hide();
				$("#positionShow").parent().show();
			}else if(result.position == null || result.position != ""){
				$("#position").parent(".bianji").hide();
				$("#position").parent(".bianji").next().show()
				$("#position").parent(".bianji").next().find("em").hide();
				$("#positionShow").siblings("i").addClass("on").show();
			}
			if(result.signature != null && result.signature != ""){
				$("#signature").val(result.signature);
				$("#signatureShow").text(result.signature);
				$("#signature").parent().hide();
				$("#signatureShow").parent().show();
			}else if(result.signature == null || result.signature != ""){
				$("#signature").parent(".bianji").hide();
				$("#signature").parent(".bianji").next().show()
				$("#signature").parent(".bianji").next().find("em").hide();
				$("#signatureShow").siblings("i").addClass("on").show();
			}
//			if(result.purpose != null && result.purpose != ""){
//				$("#purpose").text(result.purpose);
//			}
//			if(result.focusArea != null && result.focusArea != ""){
//				$("#focusArea").text(result.focusArea);
//			}
			$("#sex").text(result.sex);
			if(result.weChatOpenId == null){
				$("#weiXin").hide();
			}
			if(result.weiBoOpenId == null){
				$("#weiBo").hide();
			}
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}

/**
 * 修改用户信息
 */
function updateUserMsg(field, value){
	if(field=="password"){//当为密码是md5加密
		value=md5(value);
	}
	var flag = false;
	$.axs("/user/user/updateSignature.do",{field:field, value:value},false,function(data){
		if(data.retCode=='0000'){
			if(field == "userName"){
				$("#nameHead").text(value);
				localStorage.setItem('userName',value);
			}
			flag = true;
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
	return flag;
}

/**
 * 查询原密码是否正确
 * @param oldPassword
 * @returns {Boolean}
 */
function isTurePassword(oldPassword){
	var pwdMD5 = md5(oldPassword);
	var flag = false;
	$.axs("/user/user/isTurePassword.do",{old_password:pwdMD5},false,function(data){
		flag = data;
	});
	return flag;
}

function isYPassword(newPassword){
	var pwdMD5 = md5(newPassword);
	var flag = false;
	$.axs("/user/user/isYPassword.do",{new_password:pwdMD5},false,function(data){
		flag = data;
	});
	return flag;
}

/**
 * 查询所有行业
 */
function findCategory(){
	$.axs("/betaStock/btCategory/findBtCategory.do",null,false,function(data){
		if(data.retCode=="0000"){
			//console.log(data);
			var result = data.retData;
			if(result==null){
				return false;
			}
			var htm='';
			for (var i = 0; i < result.length; i++) {
				var obj=result[i];
				var categoryName=obj.categoryName;
				htm+='<div class="hy_public fl '+obj.pinyin+'" title="'+categoryName+'">';
				htm+='<div class="hy_icons">';
				htm+='<i></i>';
				htm+='</div>';
				if(categoryName.length>6){
					categoryName=categoryName.substring(0,5)+"...";
				}
				htm+='<span data-autoid="'+obj.categoryId+'">'+categoryName+'</span>';
				htm+='<em></em>';
				htm+='</div>';
			}
			htm+='<div class="clr"></div>';
			$("#xuanz_hy").html(htm);
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
	
}

/**
 * 查询用户信息,获取用户关注的行业
 * 判断是否进行弹窗提示
 */
function findUser(){
	$.axs("/betaStock/btUserIndustry/findBtUserIndustry.do",null,false,function(data){
		//console.log(data);
		if(data.retCode=="0000"){
			//console.log(data);
			var result = data.retData;
			if(result==null || result=="" || result=="undefined" || result=="null"){
				$(".select_hy").show();
				$(".tmtc_new2").show();
				$("body,html").css("overflow","hidden");
				return false;
			}
			//关注行业
			var focusAreaS=result.industries;//用户关注的行业id
			var focusObjective=result.goals;
			var guanzHy=[];//关注的行业
			if(focusAreaS!=null && focusAreaS!="" && focusAreaS!="undefined"){
				//给已经关注过的行业添加样式
		 		$("#xuanz_hy").find("div.hy_public").each(function(index,items){
		 			var autoid=$(items).find("span").attr("data-autoid");
		   			if(focusAreaS.indexOf(autoid)>-1){
		   				$(items).find("em").addClass("on");
		   				$(items).find(".hy_icons").find("i").addClass("on");
		   				guanzHy[guanzHy.length]=$(items).attr("title");
		   			}
		     	});
		     	guanzHy=guanzHy.join(",");
		     	$("#focusArea").text(guanzHy);
			}
			var selectObj=[];
			if(focusObjective!=null && focusObjective!="" && focusObjective!=undefined){
				//给选择的目的添加样式
				$("#c_modify a").each(function(index,item){
					var goal=$(item).text();
					if(focusObjective.indexOf(goal)>-1){
						$(item).addClass("on");
						selectObj[selectObj.length]=goal;
					}
				})
				
				selectObj=selectObj.join(",");
				$("#purpose").text(selectObj);
				
			}
		}else{
			errorAlert(data.retCode, data.retMsg);
		}
	});
}