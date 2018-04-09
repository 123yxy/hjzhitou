var code=UTIL.getPara("code");
var state=UTIL.getPara("state");
(function(){
	localStorage.clear();
	var url=location.href.split('#')[0];
	var json={code:code,state:state};
	$.ajax({
		url: "/user/appUser/getUserOppenId.do",
		data: json,
		async:true,
		type:'post',
		dataType: "json",
		success: function (data) {
			if(data.retCode == "0000"){
				if (data.retData !=null) {
                    da = data.retData;
                    localStorage.setItem('UU', da.UU);
                    localStorage.setItem('userId', da.userId);
                    localStorage.setItem('phone', da.Phone);
                    localStorage.setItem('userName', da.UserName);
                    localStorage.setItem('headImg', da.imageUrl);
                    localStorage.setItem('signature', da.signature);
                    localStorage.setItem('qqName', da.qqName);
                    localStorage.setItem('weChatName', da.weChatName);
                    localStorage.setItem('weiBoName', da.weiBoName);
                }
			}
			window.location.href="index.html";
		}
	});

})();
