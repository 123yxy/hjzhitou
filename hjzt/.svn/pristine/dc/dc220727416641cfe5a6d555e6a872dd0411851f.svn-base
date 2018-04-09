
function userinfo_submit() {
	var image_hidden= $("#image_hidden1").val();
		image_hidden=image_hidden.split("@");
	$.ajax({
		type: "post",
//		此处为上传图片的接口地址
//		url: url + "/broker/updateBrokerInfo.json",
		async: true,
		data: {
			type: $.cookie("broker_type"),
			org_code: $.cookie("org_code"),
			broker_code: $.cookie("broker_code"),
			self_pic: image_hidden[1],
			sex: $("#sex").val(),
			email: $("#email").val(),
			province: $("#shengshi1").attr("ss"),
			city: $("#shengshi1").attr("sq"),
			area: $("#shengshi1").attr("xs"),
			industry_experience: $("#industryExperience").val()

		},
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", $.cookie("Authorization"));
			xhr.setRequestHeader("user-agents", agent);
		},
		success: function(data) {
			if (data.result == "ok") {
				$.cookie("self_pic", image_hidden[0]+image_hidden[1]);
				alert("保存成功");
				window.location.href = "userCenter.html";
			} else if (data.result == "error") {
				error_alert(data.error_msg,data.error_code);
			}
		}
	});
}

