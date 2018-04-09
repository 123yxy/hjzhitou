logHead();
logFoot();

$(function () {
    //登录表单验证
    var rgValidator = $("#loginForm").validate({
        rules: {
            phoneNumLo: {
                required: true,
                mobile: true,
                maxlength: 11,
                remote: {
                    url: UTIL.CONFIG.wwwhost + UTIL.CONFIG.isHaveUser, //后台处理程序
                    type: "post", //数据发送方式
                    dataType: "json", //接受数据格式   
                    data: {//要传递的数据
                        phone: function () {
                            return $("#phoneNumLo").val();
                        }
                    },
                    //nieshi 20170907 接口返回Json格式,如接口返回true/false,无需下面代码
                    dataType: 'json',

                    dataFilter: function (data, type) {

                        // console.log(data);
                        var data = JSON.parse(data);
                        result = data.retData;//这个result在ajax外定义了

                        // console.log("result:" + result);

                    }
                }
            },
            // passwordLo: {
            //     required: true,
            //     password: true,
            //     rangelength: [6, 16]
            // }
        },
        messages: {
            phoneNumLo: {
                required: "请填写手机号",
                mobile: "手机号格式不正确",
                maxlength: "手机号最大为11位",
                remote: "您的手机号还没有注册"
            },
            // passwordLo: {
            //     required: "请填写密码",
            //     // password: "密码仅支持数字、字母、字符",
            //     password: "密码格式不正确",
            //     rangelength: "密码长度6-12位"
            // }
        },
        // errorClass: "error",
        errorElement: "span", //可以用其他标签，记住把样式也对应修改
        success: function (label) {
            //label指向上面那个错误提示信息标签em
            // label.text(" ")        //清空错误提示消息
            //     .addClass("icon-success");  //加上自定义的success类
        },
        showErrors: function (errorMap, errorList) {
            // if (!errorList.length)
            //     return;
            // $("#passwordLo-error").removeClass("icon-success");
            $("#phoneNumLo-error").removeClass("icon-success");
            this.defaultShowErrors();
        }

    });

    //登录keydown事件
    $("#passwordLo,#phoneNumLo").keydown(function (e) {
        if (e.keyCode == 13) {
            if ($("#loginForm").valid()) {
                login();
            }
        }
    });

    //提交登录
    $("#login").on("click", function () {
        if ($("#loginForm").valid()) {
            login();
            return false;
        }
    });
    var phonePassWord = localStorage.getItem("phone");
    if (phonePassWord != null && phonePassWord != "") {
        $("#phoneNumLo").val(phonePassWord);
        $("#passwordLo").val(localStorage.getItem(phonePassWord));
    }
    //记住密码 回显
    $("#phoneNumLo").on("blur", function () {
        $("#passwordLo").val(localStorage.getItem($("#phoneNumLo").val()));
    })
})

//登录
function login() {
    var pwd = md5($("#passwordLo").val());
    param = { phone: $("#phoneNumLo").val(), password: pwd };
    UTIL.axs(UTIL.CONFIG.wwwhost + UTIL.CONFIG.tologin, param, false, function (data) {
        if (data.retCode == "0000") {
            var result = data.retData;
            if (result == null) {
                return false;
            } else {
                //数据入缓存
                localStorage.setItem('UU', result.UU);
                localStorage.setItem('userId', result.userId);
                localStorage.setItem('phone', result.Phone);
                localStorage.setItem('userName', result.UserName);
                localStorage.setItem('headImg', result.imageUrl);
                localStorage.setItem('signature', result.signature);
                localStorage.setItem('qqName', result.qqName);
                localStorage.setItem('weChatName', result.weChatName);
                localStorage.setItem('weiBoName', result.weiBoName);
                //记住密码
                if ($("#checkboxLo").is(':checked') == true) {
                    localStorage.setItem(result.Phone, $("#passwordLo").val());
                } else {
                    localStorage.setItem(result.Phone, '');
                }
                findFollow();
                //获取url中 的index地址，回跳到当前 章节 
                 
                if(localStorage.getItem("locaHref") != null && localStorage.getItem("locaHref") != "undefined" && localStorage.getItem("locaHref") != "") {
                	//搜索结果
                	window.location.href = localStorage.getItem("locaHref");
                }else if (UTIL.getParaNoLocalStorage("reurl") != null && UTIL.getParaNoLocalStorage("reurl") != "undefined" && UTIL.getParaNoLocalStorage("reurl") != "") {
                    var thisUrl = location.href;
                    thisUrl = thisUrl.substring(thisUrl.indexOf("?reurl=") + 7, thisUrl.length);
                    window.location.href = thisUrl;
                }else if (UTIL.getParaNoLocalStorage("stockCode") != null && UTIL.getParaNoLocalStorage("stockCode") != "undefined" && UTIL.getParaNoLocalStorage("stockCode") != "") {
                    var thisUrl = location.href;
                    thisUrl = thisUrl.replace('login','cover');
                    window.location.href = thisUrl;
                } else {
                    window.location.href = "index.html";
                }

            }
        } else if (data.retCode == "3002") {
            $.zmAlert("手机号未注册");
        } else {
            //20171017 shiqi
            // $("#passwordLo-error").removeClass("icon-success")
            $("#passwordLo").val("");
            $.zmAlert(data.retMsg);
        }
    });
}


/**
 * 查询所有已关注过的东西
 */
function findFollow() {
    UTIL.axs(UTIL.CONFIG.wwwhost + UTIL.CONFIG.findNotionCon, null, false, function (data) {
        if (data.retCode == "0000") {
            var map = data.retData;
            $.each(map, function (key, value) {
                var localStorageKey = 'follow_' + key;
                var localStorageValue = new Array();
                for (var i = 0; i < value.length; i++) {
                    var obj = value[i];
                    localStorageValue.push(obj.followId);
                }
                localStorage.setItem(localStorageKey, JSON.stringify(localStorageValue));
            });
        }
    });
}

