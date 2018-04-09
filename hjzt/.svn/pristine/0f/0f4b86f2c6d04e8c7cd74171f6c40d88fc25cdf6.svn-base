//放置QQ登录按钮
/*QC.Login({
	btnId:"qqLoginBtn"    //插入按钮的节点id
});
var paras = {};//获取用户信息
QC.api("get_user_info", paras)
	.success(function(s){//成功回调
		//alert("获取用户信息成功！当前用户昵称为："+s.data.nickname);
	})
	.error(function(f){//失败回调
		alert("获取用户信息失败！");
	})
	.complete(function(c){//完成请求回调
		//alert("获取用户信息完成！");
	});*/
/******************QQ分享******************/
/*//从页面收集openapi必要的参数
var paras = {
	images:"http://y.photo.qq.com/img?s=OnbP8BwOF&l=y.jpg",
	title:"#QQ互联JSSDK测试#我是标题啊标题",
	url:"http://connect.qq.com/",
	comment:"我是评论：转发原因",
	summary:"我是摘要：内容说明"
};
//用jssdk调用openapi
QC.api("add_share", paras)
	.success(function(s){//请自行改写成功回调
		alert("分享成功，请到空间内查看！");
	})
	.error(function(f){//请自行改写失败回调
		alert("分享失败！");
	})
	.complete(function(c){//请自行改写完成请求回调
		alert("分享完成！");
	});*/

//微博登录认证功能
WB2.anyWhere(function (W) {
    W.widget.connectButton({
        id: "wb_connect_btn",
        type: '5,4',
        callback: {
            login: function (o) { //登录后的回调函数
                alert("login: " + o.screen_name)
            },
            logout: function () { //退出后的回调函数
                alert('logout');
            }
        }
    });
});